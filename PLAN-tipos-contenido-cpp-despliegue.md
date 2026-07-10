# Plan: Tipos de Contenido + Cuestionarios C++ + Despliegue

> Documento de planificación para ser **leído y ejecutado por otro agente de IA**.
> Tres cambios sobre el proyecto `app-tesis` (React + Vite + React Router + Supabase):
> 1. Etiqueta de **tipo de contenido** (video, imagen, etc.) con emoji.
> 2. **Seeder de cuestionarios en C++** con una distribución exacta de tipos de pregunta por nivel.
> 3. **Preparación para despliegue**: scripts de seed/limpieza, guía de despliegue y limpieza de archivos.
>
> El agente ejecutor debe respetar los **patrones y esquemas ya existentes** (que se documentan abajo). No reinventar arquitectura.

---

## Contexto y esquemas actuales (referencia obligatoria)

### Tipos de pregunta (esquema exacto, ver `src/utils/calcularResultado.js` y `src/components/preguntas/*`)

| Tipo | Campos | Ejemplo de respuesta correcta |
|---|---|---|
| `seleccion-simple` | `{ tipo, enunciado, opciones: string[], respuestaCorrecta: number }` | índice de la opción correcta |
| `seleccion-multiple` | `{ tipo, enunciado, opciones: string[], respuestasCorrectas: number[] }` | array de índices correctos |
| `verdadero-falso` | `{ tipo, enunciado, respuestaCorrecta: boolean }` | `true` o `false` |
| `numerica` | `{ tipo, enunciado, respuestaCorrecta: number, tolerancia: number }` | número (con margen `tolerancia`) |
| `pareo` | `{ tipo, enunciado, izquierda: string[], derecha: string[], correspondencias: number[] }` | `correspondencias[i]` = índice en `derecha` que corresponde a `izquierda[i]` |

- La nota se calcula `(correctas / total) * 20`. `umbralAprobacion` por defecto **15** (aprueba si `nota > umbral`).
- `src/components/Quiz.jsx` renderiza el `enunciado` en un `<legend>` y despacha al componente según `pregunta.tipo`.

### Datos y servicios de contenidos (ya existentes, del plan anterior)
- `src/data/contenidos.js`: `CONTENIDOS[tema][dificultad] = [{ nombre, descripcion, url }]`.
- `src/services/contenidos.js`: `obtenerContenidos` / `listarContenidos` / `guardarContenidos` (Supabase con fallback a JSON).
- `src/components/BotonContenido.jsx`: renderiza cada contenido como enlace externo.
- `src/pages/AdminEditorContenido.jsx`: editor inline (título, descripción, enlace) en el panel admin.
- `scripts/seedContenidos.mjs`: siembra `contenidos.js` en la tabla `contenidos`.

### Seeders y esquema
- `scripts/esquema.sql`: tablas `cuestionarios`, `resultados`, `contenidos` + RLS.
- `scripts/seedCuestionarios.mjs`: lee `src/data/quizzes.js` y hace upsert en `cuestionarios` (mapea `umbralAprobacion`→`umbral_aprobacion`, normaliza cada pregunta con `tipo` por defecto `seleccion-simple`; si la pregunta ya trae `tipo`, se respeta).
- Los 8 temas están en `src/data/temas.js`: `variables`, `tipos-datos`, `condicionales`, `bucles`, `arreglos`, `estructuras-datos`, `funciones`, `poo`. Dificultades: `principiante`, `intermedio`, `avanzado`.

---

# FUNCIONALIDAD 1 — Etiqueta de tipo de contenido con emoji

## Objetivo
Cada contenido debe mostrar, como una **etiqueta (chip)**, el **tipo de recurso** que es (video, imagen, infografía, juego, lectura, guía, artículo, etc.) con su **emoji** correspondiente. Editable desde el panel admin.

## 1.1 — Catálogo de tipos: `src/data/tiposContenido.js` (NUEVO)

Definir un conjunto canónico de tipos con etiqueta y emoji, más un valor por defecto y un helper:

```js
export const TIPOS_CONTENIDO = {
  video:         { etiqueta: 'Video',        emoji: '🎬' },
  imagen:        { etiqueta: 'Imagen',       emoji: '🖼️' },
  infografia:    { etiqueta: 'Infografía',   emoji: '📊' },
  juego:         { etiqueta: 'Juego',        emoji: '🎮' },
  lectura:       { etiqueta: 'Lectura',      emoji: '📖' },
  guia:          { etiqueta: 'Guía',         emoji: '🧭' },
  articulo:      { etiqueta: 'Artículo',     emoji: '📰' },
  documentacion: { etiqueta: 'Documentación',emoji: '📚' },
  ejercicio:     { etiqueta: 'Ejercicio',    emoji: '✏️' },
  podcast:       { etiqueta: 'Podcast',      emoji: '🎧' },
};

export const TIPO_CONTENIDO_POR_DEFECTO = 'articulo';

export function obtenerTipoContenido(tipo) {
  return TIPOS_CONTENIDO[tipo] || TIPOS_CONTENIDO[TIPO_CONTENIDO_POR_DEFECTO];
}
```

## 1.2 — Modelo de datos: añadir `tipo` a cada contenido

- El nuevo shape de cada ítem es `{ nombre, descripcion, url, tipo }` (donde `tipo` es una clave de `TIPOS_CONTENIDO`).
- En `src/data/contenidos.js`, **añadir `tipo` a cada ítem existente** con un valor sensato según el recurso (la mayoría son artículos/documentación de MDN/W3Schools/freeCodeCamp → `articulo` o `documentacion`; ajustar donde claramente sea otro).
- Retrocompatibilidad: `BotonContenido` y el editor deben tolerar ítems **sin** `tipo` usando `obtenerTipoContenido(tipo)` (que cae al valor por defecto). Así, contenidos ya guardados en Supabase sin `tipo` no rompen.

## 1.3 — Mostrar la etiqueta: `src/components/BotonContenido.jsx` + CSS

- Importar `obtenerTipoContenido` y renderizar un chip con emoji + etiqueta dentro del botón-enlace, por ejemplo encima o junto al nombre:
  ```jsx
  const info = obtenerTipoContenido(contenido.tipo);
  // ...
  <span className="boton-contenido-tipo">{info.emoji} {info.etiqueta}</span>
  ```
- Añadir estilos en `src/components/BotonContenido.css` para `.boton-contenido-tipo` (chip pequeño: fondo suave, `border-radius: 999px`, `font-size` reducido, `align-self: flex-start`). Mantener coherencia visual con el resto.

## 1.4 — Editar el tipo desde admin: `src/pages/AdminEditorContenido.jsx`

- Importar `TIPOS_CONTENIDO` y `TIPO_CONTENIDO_POR_DEFECTO`.
- En `itemVacio()` incluir `tipo: TIPO_CONTENIDO_POR_DEFECTO`.
- Añadir en cada fila de contenido un `<select>` "Tipo" con las opciones de `TIPOS_CONTENIDO` (`value` = clave, texto = `emoji + ' ' + etiqueta`), enlazado con `actualizarCampo(indice, 'tipo', valor)`.
- Al guardar (`manejarGuardar`), incluir `tipo` en el objeto de cada ítem (respetando el filtrado de ítems vacíos ya existente; si falta `tipo`, asignar el valor por defecto).
- Ajustar el grid de `AdminEditorContenido.css` para acomodar la nueva columna del select (o pasar a un layout que envuelva bien en móvil).

## Verificación F1
1. En el front (tema/nivel), cada contenido muestra su chip con emoji + etiqueta.
2. En admin → Contenidos → editar: se puede elegir el tipo por ítem, guardar, y el cambio se refleja en el front.
3. Contenidos antiguos sin `tipo` muestran el tipo por defecto sin romper.

---

# FUNCIONALIDAD 2 — Seeder de cuestionarios en C++

## Objetivo
Poblar **los 8 temas × 3 niveles** con cuestionarios cuyas preguntas están **en el contexto del lenguaje C++**, siguiendo una **distribución exacta de tipos por nivel**. El contenido vive en `src/data/quizzes.js` (que alimenta tanto el fallback JSON como el seeder `scripts/seedCuestionarios.mjs`).

## 2.1 — Distribución obligatoria por nivel (para CADA uno de los 8 temas)

| Nivel | Total | verdadero-falso | seleccion-simple | seleccion-multiple | pareo | numerica |
|---|---|---|---|---|---|---|
| **principiante** | 8 | 3 | 3 | 2 | 0 | 0 |
| **intermedio** | 10 | 2 | 3 | 3 | 2 | 0 |
| **avanzado** | 10 | 2 | 2 | 2 | 2 | 2 |

- Total de preguntas a redactar: 8 temas × (8 + 10 + 10) = **224 preguntas**. El agente ejecutor **debe redactarlas todas**, en español, técnicamente correctas y en contexto **C++**.
- `umbralAprobacion: 15` en todos (mantener la convención actual).
- **Todas** las preguntas deben incluir explícitamente el campo `tipo`.

## 2.2 — Requisito especial de las preguntas `numerica` (solo nivel avanzado)

Cada pregunta numérica debe **mostrar un enunciado y un fragmento de código C++**, y el estudiante ingresa el **resultado final** de operar dicho fragmento. Para ello se añade un campo nuevo `codigo` al objeto de la pregunta:

```js
{
  tipo: 'numerica',
  enunciado: '¿Cuál es el valor final de la variable resultado?',
  codigo: 'int a = 3;\nint b = 4;\nint resultado = a * b + 2;',
  respuestaCorrecta: 14,
  tolerancia: 0,
}
```

- El fragmento debe ser **determinista** (un único resultado entero/numérico claro).
- `tolerancia: 0` salvo que el resultado sea decimal, donde se puede permitir un pequeño margen.

### Soporte de `codigo` en la UI (cambios necesarios)
El campo `codigo` hoy no se renderiza. Añadir soporte:

1. **`src/components/Quiz.jsx`**: tras el `<legend>`, si `pregunta.codigo` existe, renderizar un bloque de código:
   ```jsx
   {pregunta.codigo && (
     <pre className="quiz-codigo"><code>{pregunta.codigo}</code></pre>
   )}
   ```
   (Colocarlo antes del `<ComponentePregunta .../>`.) Esto lo hace genérico para cualquier tipo, aunque por ahora solo lo usen las numéricas.
2. **`src/components/Quiz.css`**: estilos para `.quiz-codigo` (fondo oscuro, `font-family: monospace`, `white-space: pre`, `overflow-x: auto`, padding, `border-radius`).
3. **`src/components/admin/EditorPregunta.jsx`**: en `estadoVacioPorTipo('numerica')` añadir `codigo: ''`; y en el bloque de edición del tipo `numerica`, añadir un `<textarea>` "Fragmento de código (opcional)" enlazado a `datos.codigo`. Incluirlo en el objeto que se envía en `onAgregar` (ya usa `{ tipo, ...datos }`, así que basta con que `codigo` esté en `datos`).

## 2.3 — Reescribir `src/data/quizzes.js`

- **Reemplazar por completo** el contenido actual (preguntas orientadas a JavaScript) por los nuevos cuestionarios C++ con la distribución de 2.1.
- Mantener la estructura `QUIZZES[tema][dificultad] = { umbralAprobacion, preguntas: [...] }`.
- Orden sugerido de preguntas dentro de cada nivel: agrupar por tipo o intercalar; es indiferente para la lógica.
- Ejemplos de plantilla (uno por tipo, en C++) que el agente debe seguir y multiplicar:

```js
// verdadero-falso
{ tipo: 'verdadero-falso', enunciado: 'En C++, una variable declarada con const debe inicializarse al declararse.', respuestaCorrecta: true },

// seleccion-simple
{ tipo: 'seleccion-simple', enunciado: '¿Cuál declara correctamente un entero en C++?', opciones: ['int x = 5;', 'integer x = 5;', 'var x = 5;', 'x := 5;'], respuestaCorrecta: 0 },

// seleccion-multiple
{ tipo: 'seleccion-multiple', enunciado: '¿Cuáles son tipos fundamentales de C++?', opciones: ['int', 'float', 'std::string', 'bool'], respuestasCorrectas: [0, 1, 3] },

// pareo
{ tipo: 'pareo', enunciado: 'Empareja cada tipo de C++ con su descripción.', izquierda: ['int', 'char', 'bool'], derecha: ['Número entero', 'Un carácter', 'Verdadero o falso'], correspondencias: [0, 1, 2] },

// numerica (solo avanzado, con fragmento de código)
{ tipo: 'numerica', enunciado: '¿Cuál es el valor final de resultado?', codigo: 'int a = 3;\nint b = 4;\nint resultado = a * b + 2;', respuestaCorrecta: 14, tolerancia: 0 },
```

- Las preguntas deben ser **coherentes con el tema**: p. ej. en `bucles` los fragmentos numéricos usan `for`/`while` que acumulan un valor; en `arreglos` operaciones sobre `int arr[]`; en `funciones` el retorno de una función; en `poo` el resultado de invocar un método, etc.

## 2.4 — Sembrar en Supabase
- El seeder existente `scripts/seedCuestionarios.mjs` **ya sirve** (lee `quizzes.js`). Tras reescribir los datos, ejecutar `node scripts/seedCuestionarios.mjs` para actualizar la tabla `cuestionarios`.
- Verificar que `seedCuestionarios.mjs` preserva los campos nuevos: como hace `upsert` del array `preguntas` completo como `jsonb`, el campo `codigo` se guarda sin cambios. (No requiere modificar el seeder.)

## Verificación F2
1. `node scripts/seedCuestionarios.mjs` completa sin error y la tabla refleja 24 cuestionarios.
2. En el front, un quiz **principiante** muestra 8 preguntas (3 V/F, 3 simple, 2 múltiple); **intermedio** 10 (2/3/3/2); **avanzado** 10 (2/2/2/2 + 2 numéricas con bloque de código visible).
3. Responder una numérica calculando el fragmento C++ da la nota esperada (probar respuesta correcta e incorrecta).
4. En admin, el editor de preguntas permite crear una numérica con fragmento de código.

---

# FUNCIONALIDAD 3 — Preparación para despliegue

## Objetivo
Dejar el proyecto listo para desplegar en un servidor/hosting estático, con **base de datos y código limpios**, **scripts de seed y limpieza**, una **guía de despliegue** y **sin archivos innecesarios**.

## 3.1 — Script de limpieza de base de datos: `scripts/limpiarBaseDatos.mjs` (NUEVO)

Copiar el patrón de carga de `.env` de los seeders existentes (incluido `pathToFileURL` para Windows). Funcionalidad:
- Por defecto, **vaciar la tabla `resultados`** (borra las notas de prueba de usuarios): `supabase.from('resultados').delete().neq('id', '00000000-0000-0000-0000-000000000000')` (o usar un filtro `gte('creado_en', ...)` — lo importante es borrar todo respetando RLS).
- Aceptar un flag opcional `--todo` que además limpie `cuestionarios` y `contenidos` antes de re-sembrar (para un reset total).
- Loguear claramente qué borró. **Pedir doble confirmación no es necesario** (es un script de mantenimiento), pero debe imprimir un aviso antes de borrar.

> Nota: la RLS actual permite `delete` en `resultados`? Revisar `esquema.sql`: la política de `resultados` solo define `select` e `insert`. Para permitir el borrado desde el script con la clave anónima, **añadir una política de delete** en `esquema.sql`:
> ```sql
> drop policy if exists "borrar_resultados" on resultados;
> create policy "borrar_resultados" on resultados for delete using (true);
> ```
> (Alcance de tesis; documentar que en producción real se restringiría.)

## 3.2 — Scripts npm en `package.json`

Añadir para simplificar el flujo de despliegue/mantenimiento:
```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "lint": "oxlint",
  "preview": "vite preview",
  "seed:cuestionarios": "node scripts/seedCuestionarios.mjs",
  "seed:contenidos": "node scripts/seedContenidos.mjs",
  "seed": "npm run seed:cuestionarios && npm run seed:contenidos",
  "db:limpiar": "node scripts/limpiarBaseDatos.mjs"
}
```

## 3.3 — Configuración de rutas SPA (crítico)

La app usa `BrowserRouter`; al desplegar en un hosting estático, las rutas profundas (p. ej. `/tema/variables/principiante/quiz`, `/admin`) devuelven 404 si el servidor no reescribe todo a `index.html`. Añadir **según el hosting elegido**:
- **Netlify**: crear `public/_redirects` con:
  ```
  /*    /index.html   200
  ```
- **Vercel**: crear `vercel.json` en la raíz con:
  ```json
  { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
  ```
- Documentar ambas opciones en la guía; incluir al menos una en el repo (recomendado `public/_redirects`, que Vite copia tal cual a `dist/`).

## 3.4 — Guía de despliegue: `DESPLIEGUE.md` (NUEVO)

Documento paso a paso que cubra:
1. **Requisitos**: Node LTS, cuenta de Supabase, (opcional) cuenta de Zapier para el chatbot.
2. **Variables de entorno** (`.env` local y variables en el hosting): `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` (clave **anónima** `sb_anon_`/`anon`, no la secreta), `VITE_ADMIN_PASSWORD`, `VITE_ZAPIER_CHATBOT_ID`. Remarcar que la clave anónima es la pública del cliente.
3. **Base de datos**: ejecutar `scripts/esquema.sql` en el SQL Editor de Supabase (crea las 3 tablas + RLS).
4. **Sembrar datos**: `npm install` → `npm run seed` (siembra cuestionarios y contenidos).
5. **Chatbot Zapier**: crear el chatbot, copiar su `chatbot-id` real (no el slug de la URL pública) a `VITE_ZAPIER_CHATBOT_ID`. Referenciar `PLAN-contenidos-y-chatbot.md`.
6. **Build local**: `npm run build` → genera `dist/`. Probar con `npm run preview`.
7. **Despliegue** en Netlify/Vercel: conectar repo o subir `dist/`, configurar variables de entorno en el panel del hosting, asegurar la reescritura SPA (3.3).
8. **Mantenimiento**: `npm run db:limpiar` para vaciar resultados antes de una demo; `npm run seed` para re-sembrar.
9. **Notas de seguridad**: RLS de escritura abierta es solo para alcance de tesis; en producción real restringir escritura de `cuestionarios`/`contenidos` y el borrado de `resultados`.

## 3.5 — Reemplazar `README.md`

El `README.md` actual es el genérico de la plantilla Vite. Sustituirlo por uno real del proyecto: descripción breve de la app (cartelera educativa con niveles, quizzes C++, panel admin y chatbot), stack, cómo correr en local (`npm install`, `.env`, `npm run dev`), y un enlace a `DESPLIEGUE.md`.

## 3.6 — Eliminar archivos innecesarios

**Antes de borrar cada archivo, verificar que no esté referenciado** (grep de imports/usos). Candidatos:
- `PLAN-mejoras.md`, `PLAN-contenidos-y-chatbot.md` y este mismo `PLAN-tipos-contenido-cpp-despliegue.md` (los planes ya ejecutados; eliminarlos al finalizar).
- `src/assets/vite.svg` — logo de la plantilla; **verificar** que no se importe en ningún `.jsx` antes de borrar.
- Carpeta `dist/` local (artefacto de build; ya está en `.gitignore`, no debe versionarse; se puede borrar del disco).
- Revisar `public/icons.svg` y `dist/icons.svg`: **verificar si `icons.svg` se usa** (referencias en el código/HTML) antes de decidir; si no se usa, eliminarlo; si se usa, conservarlo.
- Confirmar que **`.env` NO se versiona** (ya cubierto por `.gitignore`: `.env`, `.env.*`, excepto `.env.example`). Verificar que `.env.example` esté completo con las 4 variables.

## Verificación F3
1. `npm run build` genera `dist/` sin errores; `npm run preview` sirve la app y las rutas profundas (`/admin`, `/tema/.../quiz`) cargan directo (con la config SPA aplicada).
2. `npm run seed` puebla cuestionarios y contenidos; `npm run db:limpiar` vacía `resultados`.
3. `DESPLIEGUE.md` permite a alguien nuevo levantar el proyecto de cero.
4. No quedan archivos de plantilla ni planes obsoletos; `.env` fuera del control de versiones.

---

## Resumen de archivos afectados

### F1 — Tipo de contenido
| Archivo | Acción |
|---|---|
| `src/data/tiposContenido.js` | **Nuevo** — catálogo tipo→{etiqueta, emoji} |
| `src/data/contenidos.js` | Añadir `tipo` a cada ítem |
| `src/components/BotonContenido.jsx` + `.css` | Mostrar chip emoji + etiqueta |
| `src/pages/AdminEditorContenido.jsx` + `.css` | Select de tipo por ítem |

### F2 — Cuestionarios C++
| Archivo | Acción |
|---|---|
| `src/data/quizzes.js` | **Reescribir** con 224 preguntas C++ (distribución exacta) |
| `src/components/Quiz.jsx` + `Quiz.css` | Renderizar `pregunta.codigo` en bloque `<pre>` |
| `src/components/admin/EditorPregunta.jsx` | Campo `codigo` (textarea) para numéricas |
| `scripts/seedCuestionarios.mjs` | Sin cambios (verificar que persiste `codigo`) |

### F3 — Despliegue
| Archivo | Acción |
|---|---|
| `scripts/limpiarBaseDatos.mjs` | **Nuevo** — vaciar resultados / reset total |
| `scripts/esquema.sql` | Añadir política `delete` en `resultados` |
| `package.json` | Scripts `seed`, `seed:*`, `db:limpiar` |
| `public/_redirects` y/o `vercel.json` | **Nuevo** — reescritura SPA |
| `DESPLIEGUE.md` | **Nuevo** — guía de despliegue |
| `README.md` | Reemplazar el genérico por uno real |
| `PLAN-*.md`, `src/assets/vite.svg`, `dist/` | Eliminar (verificando usos) |

---

## Orden de ejecución sugerido
1. **F2 primero** (es el grueso del contenido y no depende de lo demás): soporte de `codigo` en la UI → reescribir `quizzes.js` con C++ → sembrar.
2. **F1** (tipo de contenido): catálogo → datos → BotonContenido → editor admin.
3. **F3** (despliegue): política SQL + script de limpieza → npm scripts → config SPA → guía → limpieza de archivos.
4. Ejecutar la app de verdad (`npm run dev` y luego `npm run build` + `npm run preview`) y recorrer los flujos de verificación de las tres funcionalidades antes de dar por cerrado.

## Notas para el agente ejecutor
- **No romper** la arquitectura de fallback: todo debe seguir funcionando sin Supabase (avisos claros, sin crashes) y sin Zapier.
- Reutilizar clases CSS existentes donde aplique; mantener textos de UI en español.
- Respetar el detalle de `pathToFileURL` en los scripts `.mjs` (Windows).
- Las preguntas C++ deben ser **técnicamente correctas**; verificar mentalmente cada fragmento numérico para que el `respuestaCorrecta` sea exacto.
- Al terminar, listar al usuario las acciones manuales: ejecutar el SQL actualizado (política delete), correr `npm run seed`, configurar variables en el hosting y la reescritura SPA.
```
