# Plan: Edición de Contenidos + Chatbot IA (Zapier)

> Documento de planificación para ser **leído y ejecutado por otro agente de IA**.
> Describe dos funcionalidades nuevas sobre el proyecto `app-tesis` (React + Vite + React Router + Supabase).
> El agente ejecutor debe seguir los patrones **ya existentes** en el repo (servicio con fallback a JSON + panel admin espejo). No reinventar arquitectura.

---

## Contexto del proyecto (estado actual)

- **Stack:** React + Vite, React Router, Supabase (con fallback a datos JSON locales cuando Supabase no está configurado).
- **Patrón establecido** (referencia obligatoria para copiar): los cuestionarios ya funcionan así:
  - Datos semilla en `src/data/quizzes.js`.
  - Servicio `src/services/cuestionarios.js` → lee de Supabase o cae al JSON local (`obtenerCuestionario`, `listarCuestionarios`, `guardarCuestionario`, `eliminarCuestionario`).
  - Tabla Supabase `cuestionarios` + políticas RLS en `scripts/esquema.sql`.
  - Seeder `scripts/seedCuestionarios.mjs` que migra el JSON a la tabla.
  - Panel admin: `src/pages/Admin.jsx` (login + pestañas + tabla de 24 combinaciones tema×dificultad) y `src/pages/AdminEditor.jsx` (editor por tema/dificultad).
  - Autenticación admin: `src/utils/adminAuth.js` (`estaAutenticado`, `autenticar`, `cerrarSesionAdmin`), contraseña en `VITE_ADMIN_PASSWORD`.
- **Contenidos actuales:** `src/data/contenidos.js` exporta `CONTENIDOS[tema][dificultad] = [{ nombre, descripcion, url }, ...]`. Se consumen **directamente** (import estático) en `src/pages/Contenidos.jsx` y se renderizan con `src/components/BotonContenido.jsx`.
- **Cliente Supabase:** `src/lib/supabase.js` exporta `supabase` y `supabaseConfigurado`.
- **Rutas:** definidas en `src/App.jsx`. Provider global de progreso en `src/main.jsx`.
- **Temas/dificultades:** `src/data/temas.js` exporta `TEMAS`, `DIFICULTADES`, `NOMBRE_DIFICULTAD`, `obtenerTema`. Hay 8 temas × 3 dificultades = 24 combinaciones.

### Variables de entorno actuales (`.env`)
```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_ADMIN_PASSWORD=admin123
```

---

# FUNCIONALIDAD 1 — Panel de edición de contenidos

## Objetivo
Permitir que desde el panel de administrador se **cree/edite** la lista de contenidos de cada tema×dificultad. Cada contenido tiene tres campos editables: **título** (`nombre`), **descripción** (`descripcion`) y **enlace** (`url`). Se debe poder agregar, editar y eliminar ítems, y guardar en Supabase.

Se replica **exactamente** el patrón de cuestionarios, pero para contenidos (que son más simples: un array de objetos planos, sin tipos).

## 1.1 — Base de datos (Supabase)

Añadir al final de `scripts/esquema.sql` una nueva tabla `contenidos` con la misma filosofía de RLS que `cuestionarios` (lectura pública, escritura abierta — alcance de tesis con clave anónima):

```sql
create table if not exists contenidos (
  id uuid primary key default gen_random_uuid(),
  tema text not null,
  dificultad text not null,
  items jsonb not null default '[]'::jsonb,
  creado_en timestamptz default now(),
  unique (tema, dificultad)
);

alter table contenidos enable row level security;

drop policy if exists "leer_contenidos" on contenidos;
create policy "leer_contenidos" on contenidos for select using (true);

drop policy if exists "escribir_contenidos" on contenidos;
create policy "escribir_contenidos" on contenidos for all using (true) with check (true);
```

- Formato de cada elemento de `items`: `{ "nombre": "...", "descripcion": "...", "url": "..." }`.
- El agente ejecutor debe indicar al usuario que **ejecute este SQL** en Supabase (Dashboard → SQL Editor) antes de sembrar.

## 1.2 — Servicio `src/services/contenidos.js` (NUEVO)

Copiar la estructura de `src/services/cuestionarios.js`. Debe exponer:

- `obtenerContenidos(tema, dificultad)` → `Promise<Array<{nombre,descripcion,url}>>`
  - Si `!supabaseConfigurado`: devuelve `CONTENIDOS[tema]?.[dificultad] ?? []` (import desde `../data/contenidos`).
  - Si está configurado: `select` sobre `contenidos` con `.eq('tema',tema).eq('dificultad',dificultad).maybeSingle()`. Si hay error o no hay fila → **fallback** al JSON local (mismo comportamiento que `obtenerCuestionario`). Si hay fila → devolver `fila.items`.
- `listarContenidos()` → `Promise<{ data, error }>`
  - Si no configurado: `{ data: [], error: new Error('Supabase no está configurado.') }`.
  - Si configurado: `select('*').order('tema').order('dificultad')`, devolviendo filas normalizadas `{ tema, dificultad, items }`.
- `guardarContenidos({ tema, dificultad, items })` → upsert con `onConflict: 'tema,dificultad'`. Si no configurado → `{ error: new Error('Supabase no está configurado.') }`.
- `eliminarContenidos(id)` (opcional, por consistencia con cuestionarios).

**Importante:** mantener el mismo estilo de manejo de errores y los mismos nombres de columnas (`tema`, `dificultad`, `items`).

## 1.3 — Seeder `scripts/seedContenidos.mjs` (NUEVO)

Copiar `scripts/seedCuestionarios.mjs` (incluida la lógica de `cargarEnv()` y el import dinámico con `pathToFileURL` — **respetar ese detalle**, ya que sin él falla en Windows). En vez de `quizzes.js`, importar `src/data/contenidos.js` y construir filas:

```js
for (const [tema, niveles] of Object.entries(CONTENIDOS)) {
  for (const [dificultad, items] of Object.entries(niveles)) {
    filas.push({ tema, dificultad, items });
  }
}
// supabase.from('contenidos').upsert(filas, { onConflict: 'tema,dificultad' })
```

Debe usar `VITE_SUPABASE_ANON_KEY`. Log de progreso igual que el seeder existente. Instruir al usuario a ejecutarlo con `node scripts/seedContenidos.mjs`.

## 1.4 — Consumir contenidos desde el servicio en `src/pages/Contenidos.jsx`

Actualmente importa `CONTENIDOS` estáticamente y hace `const contenidos = CONTENIDOS[temaId]?.[dificultad] ?? []`. Cambiar a carga asíncrona con estado:

- Quitar el import estático de `CONTENIDOS`; importar `obtenerContenidos` de `../services/contenidos`.
- Añadir `const [contenidos, setContenidos] = useState([])` y `const [cargandoContenidos, setCargandoContenidos] = useState(true)`.
- En un `useEffect` (dependencias `[temaId, dificultad]`): llamar `obtenerContenidos(temaId, dificultad)` y guardar el resultado. Manejar estado de carga.
- **No romper** la guarda de desbloqueo ni la lógica de `actualizarUbicacion` existentes.
- Mientras carga: mostrar "Cargando contenidos…". Si vacío tras cargar: mantener el mensaje actual "Aún no hay contenidos cargados para este nivel.".
- `BotonContenido` **no cambia** (sigue recibiendo `{ contenido }` con `nombre`, `descripcion`, `url`). Ojo: hoy usa `key={contenido.url}`; como ahora las URLs podrían repetirse o venir de BD, usar `key={index}` o un id si existe.

## 1.5 — Panel admin: nueva pestaña "Contenidos" en `src/pages/Admin.jsx`

- Añadir un tercer botón de pestaña `contenidos` junto a `cuestionarios` y `resultados`.
- Cargar la lista con `listarContenidos()` dentro del `Promise.all` existente del `useEffect` (o una llamada adicional). Guardar en estado `contenidos`.
- Cuando `pestana === 'contenidos'`: renderizar una tabla igual a la de cuestionarios recorriendo `TEMAS.flatMap(... DIFICULTADES.map(...))`, mostrando:
  - Tema, Dificultad, Estado (`${n} contenidos` si existe la fila / `Sin crear (usa JSON local)` si no), y un `<Link to={/admin/contenido/${tema.id}/${dificultad}}>` con texto `Editar`/`Crear`.
- Reutilizar los estilos de `Admin.css` (`.admin-tabla`, `.admin-tabs`).

## 1.6 — Página editor `src/pages/AdminEditorContenido.jsx` (NUEVO)

Modelar sobre `src/pages/AdminEditor.jsx`, pero para contenidos. Requisitos:

- Ruta protegida: si `!estaAutenticado()` → `<Navigate to="/admin" replace />`.
- Validar `tema` y `dificultad` (usar `obtenerTema` y `DIFICULTADES`); si inválidos, mensaje + link a `/admin`.
- `useEffect`: `obtenerContenidos(temaId, dificultad)` → `setItems(...)`.
- Estado: `items` = array de `{ nombre, descripcion, url }`.
- **UI de edición inline** (a diferencia del editor de preguntas, aquí los campos se editan directo):
  - Por cada ítem, tres inputs controlados: título (text), descripción (text/textarea), enlace (url). Al cambiar, actualizar ese índice en el array.
  - Botón "Eliminar" por ítem.
  - Botón "Agregar contenido" que hace `setItems(prev => [...prev, { nombre:'', descripcion:'', url:'' }])`.
- Botón "Guardar contenidos" → `guardarContenidos({ tema: temaId, dificultad, items })`. Mostrar mensaje de éxito/error igual que `AdminEditor` (`.admin-mensaje`, `.admin-mensaje-exito`, `.admin-mensaje-error`).
- Aviso si `!supabaseConfigurado` (mismo texto/estilo que en `AdminEditor`).
- Validación mínima antes de guardar: descartar ítems totalmente vacíos; opcionalmente validar que `url` empiece por `http`.
- Crear `src/pages/AdminEditorContenido.css` (o reutilizar clases de `AdminEditor.css`).

## 1.7 — Ruta nueva en `src/App.jsx`

Añadir junto a la ruta del editor de cuestionarios:

```jsx
import { AdminEditorContenido } from './pages/AdminEditorContenido';
// ...
<Route path="/admin/contenido/:temaId/:dificultad" element={<AdminEditorContenido />} />
```

## Verificación de la Funcionalidad 1
1. Ejecutar el SQL de `contenidos` en Supabase y luego `node scripts/seedContenidos.mjs`; confirmar que la tabla se llena (24 filas).
2. Abrir la app, entrar a un tema/nivel y confirmar que los contenidos se ven igual que antes (ahora vienen de Supabase; sin Supabase, del JSON).
3. `/admin` → login → pestaña **Contenidos** → tabla con 24 combinaciones y su estado.
4. Editar un contenido (cambiar título, descripción y enlace), agregar uno nuevo, eliminar otro, **Guardar** → mensaje de éxito.
5. Volver al front (tema/nivel editado) y confirmar que los cambios se reflejan (el enlace abre en pestaña nueva).
6. Consola sin errores 401/RLS.

---

# FUNCIONALIDAD 2 — Chatbot IA (Zapier) en panel lateral colapsable

## Objetivo
Añadir un **panel lateral derecho colapsable** disponible en toda la app con un **chatbot de IA** integrado mediante **Zapier Chatbots** (Zapier Interfaces). El chatbot debe estar configurado con el **contexto de los temas** de la app para poder responder dudas del estudiante sobre variables, tipos de datos, condicionales, bucles, arreglos, estructuras de datos, funciones y POO.

## 2.1 — Configuración del chatbot en Zapier (acción del usuario, documentar en el plan)

El agente ejecutor **no puede crear la cuenta de Zapier**; debe dejar instrucciones claras para el usuario y parametrizar el `chatbot-id`. Pasos a documentar:

1. Entrar a **Zapier Chatbots** (`https://chatbots.zapier.com` / Zapier Interfaces) e iniciar sesión.
2. **Create Chatbot**. En la configuración (Directive/Instructions) pegar el rol y el contexto de los temas. Sugerir un directive como:
   > "Eres un tutor de programación para una app educativa. Los temas cubiertos son: Variables, Tipos de datos, Condicionales, Bucles, Arreglos, Estructuras de datos, Funciones y Programación Orientada a Objetos, cada uno con niveles principiante/intermedio/avanzado. Responde dudas de estudiantes de forma clara, con ejemplos breves. No inventes contenido fuera de estos temas."
3. **Knowledge sources (opcional pero recomendado):** subir/pegar los contenidos (se puede exportar el texto de `src/data/contenidos.js` y `src/data/quizzes.js`) para que el bot tenga el contexto exacto de la app.
4. Publicar el chatbot y copiar su **Chatbot ID** (aparece en el código de *Embed*).
5. Guardar el ID en `.env` como `VITE_ZAPIER_CHATBOT_ID=...` y documentarlo en `.env.example`.

> Nota técnica: Zapier expone un **web component** para embeber. El componente lo consumimos como iframe/custom-element; no requiere backend propio. El "contexto de los temas" vive en la configuración del bot en Zapier (directive + knowledge), no se inyecta desde el front.

## 2.2 — Cargar el script del web component de Zapier

Zapier entrega un snippet de embed de la forma:
```html
<script async type="module"
  src="https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js"></script>
<zapier-interfaces-chatbot-embed is-popup="false" chatbot-id="ID" height="600px" width="400px">
</zapier-interfaces-chatbot-embed>
```

Añadir el `<script async type="module" src="...">` en `index.html` (dentro de `<head>`), para que el custom element `zapier-interfaces-chatbot-embed` quede registrado globalmente.
- **Alternativa** (si se prefiere no tocar `index.html`): inyectar el script dinámicamente en el `useEffect` del componente (crear `<script>`, `document.head.appendChild`, comprobar que no se duplique). Elegir **una** de las dos; la del `index.html` es más simple.
- Verificar la URL exacta del script en el snippet real que da Zapier al usuario (puede variar de versión). El plan usa la conocida a fecha de redacción; el ejecutor debe usar la que aparezca en el embed del usuario.

## 2.3 — Componente `src/components/ChatbotPanel.jsx` (NUEVO)

Panel lateral derecho, fijo, colapsable. Requisitos:

- Estado `abierto` (bool). Persistir opcionalmente en `localStorage` (clave `chatbot-abierto`) para recordar preferencia — no obligatorio.
- **Botón flotante** (burbuja) fijo en la esquina inferior derecha (`position: fixed`), similar en espíritu a `BotonInicio` pero del lado opuesto para no solaparse (`BotonInicio` ya ocupa una esquina; coordinar posiciones en CSS para que no choquen). Icono/emoji de chat (p. ej. 💬) y `aria-label`.
- Al hacer clic, alterna `abierto`. Cuando `abierto`:
  - Renderizar un panel deslizante desde la derecha (ancho ~360–400px, alto casi completo, `position: fixed; right: 0; top: 0; bottom: 0`), con encabezado (título "Asistente" + botón ✕ para cerrar) y el cuerpo con el web component:
    ```jsx
    <zapier-interfaces-chatbot-embed
      is-popup="false"
      chatbot-id={import.meta.env.VITE_ZAPIER_CHATBOT_ID}
      height="100%"
      width="100%"
    />
    ```
  - En JSX, los atributos con guiones (`is-popup`, `chatbot-id`) se pasan tal cual como strings (React los reenvía a custom elements sin problema).
- **Manejo de ID ausente:** si `!import.meta.env.VITE_ZAPIER_CHATBOT_ID`, mostrar dentro del panel un aviso: "Chatbot no configurado. Define VITE_ZAPIER_CHATBOT_ID en .env." (para no romper la app en entornos sin la variable).
- Transición CSS de apertura/cierre (slide/fade). Responsivo: en móvil, panel a ancho completo (`width: 100%` bajo `@media (max-width: 480px)`).
- Accesibilidad: `role="dialog"`, `aria-label`, cerrar con tecla `Esc` (opcional).
- Crear `src/components/ChatbotPanel.css`.

## 2.4 — Montar el panel globalmente en `src/App.jsx`

Renderizar `<ChatbotPanel />` junto a `<BotonInicio />`, fuera de `<Routes>`, para que esté disponible en todas las páginas:

```jsx
<>
  <BotonInicio />
  <ChatbotPanel />
  <Routes> ... </Routes>
</>
```

Decidir si mostrarlo también en `/admin` (recomendado ocultarlo en rutas de admin; se puede leer `useLocation()` dentro de `ChatbotPanel` y no renderizar si la ruta empieza con `/admin`). Documentar la decisión en el código.

## 2.5 — Variables de entorno

- Añadir a `.env`: `VITE_ZAPIER_CHATBOT_ID=<id-del-chatbot>`.
- Añadir a `.env.example`: `VITE_ZAPIER_CHATBOT_ID=` con comentario explicativo.

## Verificación de la Funcionalidad 2
1. Con `VITE_ZAPIER_CHATBOT_ID` definido y `npm run dev`: aparece la burbuja de chat en la esquina inferior derecha en las páginas del front.
2. Clic en la burbuja → se despliega el panel lateral con el chatbot cargado (se ve la UI de Zapier). Enviar un mensaje de prueba (p. ej. "¿Qué es una variable?") y confirmar respuesta coherente con los temas.
3. Botón ✕ / clic en la burbuja de nuevo → se colapsa el panel.
4. La burbuja del chat **no** se solapa con el `BotonInicio`.
5. Sin `VITE_ZAPIER_CHATBOT_ID` → el panel muestra el aviso de "no configurado" y la app no se rompe.
6. (Si se implementó) en `/admin` el chatbot no aparece.
7. Sin errores de consola por el script de Zapier (CSP no aplica: es app Vite normal, scripts externos permitidos).

---

## Resumen de archivos afectados

### Funcionalidad 1 (Contenidos)
| Archivo | Acción |
|---|---|
| `scripts/esquema.sql` | Añadir tabla `contenidos` + RLS |
| `src/services/contenidos.js` | **Nuevo** — servicio con fallback a JSON |
| `scripts/seedContenidos.mjs` | **Nuevo** — seeder de contenidos |
| `src/pages/Contenidos.jsx` | Cargar contenidos vía servicio (async) |
| `src/pages/Admin.jsx` | Nueva pestaña "Contenidos" + tabla |
| `src/pages/AdminEditorContenido.jsx` | **Nuevo** — editor inline de contenidos |
| `src/pages/AdminEditorContenido.css` | **Nuevo** — estilos (o reutilizar) |
| `src/App.jsx` | Ruta `/admin/contenido/:temaId/:dificultad` |
| `src/components/BotonContenido.jsx` | Ajuste menor de `key` (no de props) |

### Funcionalidad 2 (Chatbot)
| Archivo | Acción |
|---|---|
| `index.html` | Cargar script del web component de Zapier |
| `src/components/ChatbotPanel.jsx` | **Nuevo** — panel lateral colapsable |
| `src/components/ChatbotPanel.css` | **Nuevo** — estilos del panel/burbuja |
| `src/App.jsx` | Montar `<ChatbotPanel />` global |
| `.env` / `.env.example` | `VITE_ZAPIER_CHATBOT_ID` |

---

## Orden de ejecución sugerido
1. **Contenidos primero** (es autocontenido y sigue un patrón ya probado): SQL → servicio → seeder → `Contenidos.jsx` → admin (pestaña + editor + ruta) → verificar.
2. **Chatbot después**: configurar bot en Zapier (usuario) → script en `index.html` → `ChatbotPanel` → montar en `App.jsx` → env → verificar.
3. Ejecutar la app de verdad (`npm run dev`) y recorrer ambos flujos de verificación end-to-end antes de dar por cerrado.

## Notas para el agente ejecutor
- **No cambiar** la arquitectura de fallback: todo debe funcionar aunque Supabase o Zapier no estén configurados (avisos claros, sin crashes).
- Reutilizar clases CSS existentes (`Admin.css`, `AdminEditor.css`) donde aplique para mantener consistencia visual.
- Respetar el detalle de `pathToFileURL` en los seeders (Windows).
- Mantener textos de UI en español, consistentes con el resto de la app.
- Al terminar, listar al usuario las acciones manuales pendientes: ejecutar SQL en Supabase, correr el seeder, crear el chatbot en Zapier y rellenar `VITE_ZAPIER_CHATBOT_ID`.
