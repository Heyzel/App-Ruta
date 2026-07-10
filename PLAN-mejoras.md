# Plan de mejoras: Nombre de usuario, resultados en base de datos y tipos de pregunta

> Documento para ser ejecutado por otro agente de IA sobre el proyecto existente
> (`app-tesis`, React + Vite + React Router, con progreso en `localStorage`).

## Contexto

La aplicación actual es una **cartelera de contenido educativo** frontend-only: el usuario
elige tema → dificultad → ve contenidos (links externos) → responde un quiz → recibe feedback
y desbloquea el siguiente nivel si su nota es > 15 (escala 0–20). Todo el progreso se guarda en
`localStorage` mediante `ProgresoContext`. Los cuestionarios hoy son **JSON predefinidos** en
[src/data/quizzes.js](src/data/quizzes.js) y solo soportan preguntas de **selección simple**.

Se requieren tres mejoras:
1. **Nombre de usuario en sesión**: el estudiante coloca su nombre y este se conserva en la sesión.
2. **Guardar resultados en una base de datos** (nombre, tema, dificultad, calificación, fecha).
3. **Ampliar los tipos de pregunta**: selección simple, selección múltiple, verdadero/falso,
   respuesta numérica y pareo (emparejar columnas), configurables desde un **panel admin visual**.

### Decisiones confirmadas por el usuario
- **Base de datos:** **Supabase** (PostgreSQL en la nube, cliente `supabase-js`, sin servidor propio).
- **Autoría de cuestionarios:** **Panel admin visual** (ruta `/admin`). En consecuencia, los
  cuestionarios pasan a almacenarse en Supabase (fuente de verdad), sembrados una vez desde el
  JSON actual, que se conserva como respaldo/semilla offline.

### Archivos clave existentes (reutilizar / modificar)
- [src/data/quizzes.js](src/data/quizzes.js) — quices actuales (semilla).
- [src/components/Quiz.jsx](src/components/Quiz.jsx) — motor de renderizado del quiz (reescribir).
- [src/utils/calcularResultado.js](src/utils/calcularResultado.js) — cálculo de nota (reescribir).
- [src/context/ProgresoContext.jsx](src/context/ProgresoContext.jsx) — estado global (extender).
- [src/pages/QuizPage.jsx](src/pages/QuizPage.jsx) — carga del quiz + envío (modificar).
- [src/pages/Resultado.jsx](src/pages/Resultado.jsx) — feedback (modificar mínimamente).
- [src/App.jsx](src/App.jsx) — rutas (añadir `/admin`, captura de nombre).
- [src/data/temas.js](src/data/temas.js) — helpers `obtenerTema`, `DIFICULTADES`, etc. (reutilizar).

---

## 1. Configuración de Supabase

1. Crear un proyecto en supabase.com (plan gratuito).
2. Instalar el cliente: `npm install @supabase/supabase-js`.
3. Variables de entorno en un archivo `.env` en la raíz (Vite expone las que empiezan por `VITE_`):
   ```
   VITE_SUPABASE_URL=https://xxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJ...
   VITE_ADMIN_PASSWORD=una-clave-para-el-panel
   ```
   Añadir `.env` al `.gitignore` (ya existe el archivo) y crear un `.env.example` sin valores reales.
4. Crear `src/lib/supabase.js`:
   ```js
   import { createClient } from '@supabase/supabase-js';
   export const supabase = createClient(
     import.meta.env.VITE_SUPABASE_URL,
     import.meta.env.VITE_SUPABASE_ANON_KEY
   );
   ```

### Esquema SQL (ejecutar en el editor SQL de Supabase)
```sql
create table cuestionarios (
  id uuid primary key default gen_random_uuid(),
  tema text not null,
  dificultad text not null,
  umbral_aprobacion numeric not null default 15,
  preguntas jsonb not null,          -- arreglo de preguntas (ver sección 3)
  creado_en timestamptz default now(),
  unique (tema, dificultad)
);

create table resultados (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  tema text not null,
  dificultad text not null,
  nota numeric not null,
  correctas int,
  total int,
  aprobado boolean,
  creado_en timestamptz default now()
);

alter table cuestionarios enable row level security;
alter table resultados enable row level security;

-- Alcance de tesis (clave anónima). Lectura pública; escritura abierta.
-- NOTA DE SEGURIDAD: en producción real habría que restringir la escritura.
create policy "leer_cuestionarios" on cuestionarios for select using (true);
create policy "escribir_cuestionarios" on cuestionarios for all using (true) with check (true);
create policy "leer_resultados" on resultados for select using (true);
create policy "insertar_resultados" on resultados for insert with check (true);
```

### Semilla inicial
Crear un script `scripts/seedCuestionarios.mjs` que recorra `QUIZZES` de
[src/data/quizzes.js](src/data/quizzes.js), transforme cada pregunta al nuevo modelo
(añadiendo `tipo: 'seleccion-simple'`) e inserte/upsertee una fila por tema+dificultad en la
tabla `cuestionarios` (usar `upsert` con `onConflict: 'tema,dificultad'`). Ejecutar una vez con
`node scripts/seedCuestionarios.mjs`.

---

## 2. Nombre de usuario en sesión

Extender [src/context/ProgresoContext.jsx](src/context/ProgresoContext.jsx):
- Añadir `nombreUsuario` al estado persistido en `localStorage` (misma clave `progreso-app-tesis`)
  y una función `setNombreUsuario(nombre)`.
- Inicializar `nombreUsuario: ''` en `estadoInicial()`.

Flujo de captura (modo "pedir al entrar", coherente con el patrón actual):
- Crear `src/components/ModalNombre.jsx`: si `nombreUsuario` está vacío, mostrar un modal/overlay
  con un input y botón "Comenzar". Renderizarlo a nivel de `App` (o dentro de `Inicio`) de modo
  que aparezca en la primera visita. También ofrecer editar el nombre desde `Inicio` (un pequeño
  "Hola, {nombre} · cambiar").
- No es necesario bloquear la navegación; basta con exigir el nombre **antes de enviar un quiz**
  (si estuviera vacío, abrir el modal). Reutilizar el nombre al guardar el resultado.

---

## 3. Nuevos tipos de pregunta — modelo de datos

Cada pregunta lleva un campo `tipo`. Ejemplos del `jsonb` guardado en `cuestionarios.preguntas`:

```js
// 1) Selección simple (una correcta) — tipo por defecto si falta `tipo`
{ tipo: 'seleccion-simple', enunciado: '...', opciones: ['a','b','c'], respuestaCorrecta: 0 }

// 2) Selección múltiple (varias correctas)
{ tipo: 'seleccion-multiple', enunciado: '...', opciones: ['a','b','c','d'], respuestasCorrectas: [0,2] }

// 3) Verdadero / Falso
{ tipo: 'verdadero-falso', enunciado: '...', respuestaCorrecta: true }

// 4) Respuesta numérica
{ tipo: 'numerica', enunciado: '...', respuestaCorrecta: 42, tolerancia: 0 }

// 5) Pareo (emparejar izquierda ↔ derecha)
{ tipo: 'pareo', enunciado: '...',
  izquierda: ['País', 'Río'],
  derecha:   ['Egipto', 'Nilo'],
  // correspondencias[i] = índice en `derecha` que corresponde a izquierda[i]
  correspondencias: [0, 1] }
```

**Compatibilidad hacia atrás:** si una pregunta no tiene `tipo`, tratarla como `seleccion-simple`.

### Estructura de las respuestas del estudiante (por tipo)
- `seleccion-simple`: `number | null` (índice elegido)
- `seleccion-multiple`: `number[]` (índices marcados)
- `verdadero-falso`: `boolean | null`
- `numerica`: `number | null`
- `pareo`: `number[]` donde `respuesta[i]` = índice de `derecha` asignado a `izquierda[i]`

---

## 4. Motor del quiz: renderizado y calificación

### Renderizado — reescribir [src/components/Quiz.jsx](src/components/Quiz.jsx)
Mantener la firma `<Quiz quiz={...} onEnviar={(respuestas) => ...} />` y el estado `respuestas`
como arreglo (una entrada por pregunta), pero delegar el render de cada pregunta a subcomponentes
según `pregunta.tipo`. Crear en `src/components/preguntas/`:
- `PreguntaSeleccionSimple.jsx` (radios — como hoy)
- `PreguntaSeleccionMultiple.jsx` (checkboxes)
- `PreguntaVerdaderoFalso.jsx` (dos radios: Verdadero / Falso)
- `PreguntaNumerica.jsx` (`<input type="number">`)
- `PreguntaPareo.jsx` (por cada ítem de `izquierda`, un `<select>` con las opciones de `derecha`;
  idealmente mostrar `derecha` en orden fijo y dejar que el usuario asigne)

Cada subcomponente recibe `pregunta`, `valor` y `onChange(nuevoValor)`. La validación de
"todas respondidas" debe adaptarse por tipo (p. ej. en `seleccion-multiple` basta ≥1 marcada; en
`pareo` todas las filas asignadas; en `numerica` un número válido).

### Calificación — reescribir [src/utils/calcularResultado.js](src/utils/calcularResultado.js)
Mantener la salida `{ nota, aprobado, correctas, total }` y la escala 0–20
(`nota = (correctas / total) * 20`, `aprobado = nota > quiz.umbralAprobacion`). Añadir una función
`esCorrecta(pregunta, respuesta)` que despache por tipo:
```js
function esCorrecta(pregunta, respuesta) {
  const tipo = pregunta.tipo || 'seleccion-simple';
  switch (tipo) {
    case 'seleccion-simple':
    case 'verdadero-falso':
      return respuesta === pregunta.respuestaCorrecta;
    case 'numerica':
      return respuesta != null &&
             Math.abs(respuesta - pregunta.respuestaCorrecta) <= (pregunta.tolerancia ?? 0);
    case 'seleccion-multiple': {
      const sel = [...(respuesta || [])].sort((a, b) => a - b);
      const cor = [...pregunta.respuestasCorrectas].sort((a, b) => a - b);
      return sel.length === cor.length && sel.every((v, i) => v === cor[i]);
    }
    case 'pareo':
      return Array.isArray(respuesta) &&
             pregunta.correspondencias.every((r, i) => respuesta[i] === r);
    default:
      return false;
  }
}
```
Cada pregunta vale 1 punto (correcta/incorrecta, sin crédito parcial) para mantener la escala simple.

---

## 5. Guardar resultados en Supabase

- Crear `src/services/resultados.js` con:
  ```js
  import { supabase } from '../lib/supabase';
  export async function guardarResultado({ nombre, tema, dificultad, nota, correctas, total, aprobado }) {
    return supabase.from('resultados').insert({ nombre, tema, dificultad, nota, correctas, total, aprobado });
  }
  export async function listarResultados() {
    return supabase.from('resultados').select('*').order('creado_en', { ascending: false });
  }
  ```
- En [src/pages/QuizPage.jsx](src/pages/QuizPage.jsx), en `manejarEnvio`:
  1. Si `nombreUsuario` está vacío → abrir `ModalNombre` y no continuar.
  2. Calcular resultado con `calcularResultado`.
  3. Registrar en `ProgresoContext` (desbloqueo local, como hoy).
  4. `await guardarResultado({ nombre: nombreUsuario, tema, dificultad, ...resultado })`
     (con manejo de error: si falla la red, mostrar aviso pero permitir ver el feedback local).
  5. Navegar a `/resultado`.
- Mostrar el nombre en el feedback ([src/components/Feedback.jsx](src/components/Feedback.jsx)):
  "{nombre}, obtuviste {nota}/20…".

---

## 6. Panel admin visual (`/admin`)

Ruta protegida con una **clave simple** (`VITE_ADMIN_PASSWORD`) comprobada en el cliente y
recordada en `sessionStorage`. (Nota: es un candado ligero suficiente para una tesis; no es
seguridad real porque la clave viaja al cliente. Si se requiere robustez, migrar a Supabase Auth.)

Páginas/rutas nuevas en [src/App.jsx](src/App.jsx):
- `/admin` — login simple + listado de cuestionarios (por tema y dificultad) con acciones
  Crear / Editar / Eliminar, y opcionalmente una pestaña "Resultados" que use `listarResultados()`.
- `/admin/cuestionario/:temaId/:dificultad` — editor del cuestionario.

Editor (`src/pages/AdminEditor.jsx` + `src/components/admin/EditorPregunta.jsx`):
- Selector de tema (de `TEMAS`) y dificultad (de `DIFICULTADES`), campo `umbralAprobacion`.
- Lista de preguntas; botón "Agregar pregunta" que pide el **tipo** y muestra el formulario
  correspondiente (enunciado, opciones, marcar correcta(s), etc.).
- Guardar → `upsert` en `cuestionarios` (`onConflict: 'tema,dificultad'`).
- Crear `src/services/cuestionarios.js` con `listarCuestionarios()`, `obtenerCuestionario(tema, dificultad)`,
  `guardarCuestionario(...)`, `eliminarCuestionario(id)`.

El flujo del estudiante ([src/pages/QuizPage.jsx](src/pages/QuizPage.jsx)) debe cargar el quiz
desde Supabase con `obtenerCuestionario(tema, dificultad)`; si falla o no existe, usar el JSON de
[src/data/quizzes.js](src/data/quizzes.js) como respaldo (normalizando a `tipo: 'seleccion-simple'`).

---

## 7. Resumen de archivos

| Acción | Archivo | Propósito |
|--------|---------|-----------|
| Crear | `src/lib/supabase.js` | Cliente Supabase |
| Crear | `src/services/resultados.js` | Guardar/listar resultados |
| Crear | `src/services/cuestionarios.js` | CRUD de cuestionarios |
| Crear | `src/components/ModalNombre.jsx` | Captura del nombre |
| Crear | `src/components/preguntas/*.jsx` | Un componente por tipo de pregunta |
| Crear | `src/pages/Admin.jsx`, `src/pages/AdminEditor.jsx` | Panel admin |
| Crear | `src/components/admin/EditorPregunta.jsx` | Formulario por tipo |
| Crear | `scripts/seedCuestionarios.mjs` | Semilla de quices → Supabase |
| Crear | `.env`, `.env.example` | Credenciales |
| Modificar | `src/context/ProgresoContext.jsx` | `nombreUsuario` + setter |
| Reescribir | `src/components/Quiz.jsx` | Render por tipo |
| Reescribir | `src/utils/calcularResultado.js` | Calificación por tipo |
| Modificar | `src/pages/QuizPage.jsx` | Cargar quiz de Supabase + guardar resultado |
| Modificar | `src/components/Feedback.jsx` | Mostrar nombre |
| Modificar | `src/App.jsx` | Rutas `/admin`, ModalNombre |

---

## 8. Pasos de implementación (orden sugerido)

1. Instalar `@supabase/supabase-js`, crear proyecto Supabase, `.env` y `src/lib/supabase.js`.
2. Ejecutar el SQL (tablas + RLS). Correr el script de semilla.
3. Extender `ProgresoContext` con `nombreUsuario`; crear `ModalNombre` e integrarlo en `App`/`Inicio`.
4. Definir el nuevo modelo de preguntas y reescribir `calcularResultado.js` con `esCorrecta`.
5. Reescribir `Quiz.jsx` + crear los 5 subcomponentes de pregunta; ajustar validación por tipo.
6. Crear `services/resultados.js`; conectar el guardado en `QuizPage.manejarEnvio`; mostrar nombre en `Feedback`.
7. Crear `services/cuestionarios.js`; hacer que `QuizPage` cargue el quiz desde Supabase (con respaldo JSON).
8. Construir el panel `/admin` (login simple, listado, editor con formularios por tipo, CRUD).
9. Estilos coherentes con las variables CSS actuales (`--color-primario`, etc.).

---

## 9. Verificación (end-to-end)

1. `npm run dev`. En la primera visita aparece el modal de nombre; escribir un nombre y comenzar.
2. **Tipos de pregunta:** desde `/admin`, crear un cuestionario de prueba con una pregunta de cada
   tipo (simple, múltiple, V/F, numérica, pareo); guardarlo.
3. Como estudiante, responder ese cuestionario y comprobar que **cada tipo se renderiza y califica**
   correctamente (probar respuestas correctas e incorrectas y verificar la nota /20).
4. **Persistencia en BD:** tras enviar, verificar en la tabla `resultados` de Supabase que se guardó
   una fila con nombre, tema, dificultad, nota y fecha. También comprobarlo desde la pestaña
   "Resultados" del panel admin (`listarResultados`).
5. **Nombre en sesión:** cerrar y reabrir el navegador → el nombre persiste (localStorage) y el
   feedback lo muestra.
6. **Compatibilidad:** un quiz sembrado desde el JSON antiguo (solo selección simple) sigue
   funcionando sin cambios.
7. **Regresión:** el desbloqueo de niveles (nota > 15) y el botón flotante de inicio siguen operativos.
```

