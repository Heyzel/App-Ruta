# Arquitectura de la plataforma

Este documento explica los componentes del proyecto y cómo se comunican entre sí. Está pensado como referencia rápida antes de tocar código y como material de apoyo para la documentación de la tesis.

## Visión general

La aplicación es una **SPA de React** (servida como estáticos por Vercel) que:

- Renderiza páginas y componentes con **React Router**.
- Guarda el progreso del estudiante en **`localStorage`** del navegador.
- Lee y escribe cuestionarios, contenidos, resultados y métricas en **Supabase** (Postgres + RLS), con un **respaldo local en JSON** cuando Supabase no está configurado.
- Embebe un chatbot de IA (**Algorimi**) como servicio externo (Zapier).

El principio transversal de todo el sistema es este: **la capa de servicios (`src/services/*.js`) es el único punto que habla con la persistencia.** Ninguna página o componente llama a Supabase directamente; siempre pasa por un servicio, que decide de dónde vienen los datos.

```
Página/Componente → Contexto o Servicio → (Supabase | datos locales) → localStorage (progreso)
```

---

## 1. Arranque de la aplicación

**Archivos:** `src/main.jsx`, `src/App.jsx`

El punto de entrada monta los providers en este orden:

```
<BrowserRouter>
  <ProgresoProvider>
    <App />
  </ProgresoProvider>
</BrowserRouter>
```

`App.jsx` define las rutas con `react-router-dom` y monta dos componentes **globales** que se renderizan en todas las páginas (excepto `/admin`):

- `BotonInicio` — botón flotante para volver a `/temas`.
- `ChatbotPanel` — panel lateral derecho con Algorimi.

### Mapa de rutas

| Ruta | Página | Propósito |
|---|---|---|
| `/` | `Bienvenida` | Pantalla de entrada: objetivo de la plataforma, flujo recomendado, campo de nombre y botón "Comenzar" |
| `/temas` | `Inicio` | Cartelera de temas (incluye el tema 0) |
| `/tema/:temaId` | `Tema` | Selector de dificultad |
| `/tema/:temaId/:dificultad` | `Contenidos` | Lista de contenidos del nivel |
| `/tema/:temaId/:dificultad/juego/:indice` | `JuegoDesafio` | Pantalla previa a un contenido de tipo juego |
| `/tema/:temaId/:dificultad/quiz` | `QuizPage` | Cuestionario del nivel |
| `/tema/:temaId/:dificultad/resultado` | `Resultado` | Retroalimentación y avance de nivel |
| `/admin` | `Admin` | Panel: cuestionarios, contenidos, resultados, estudiantes |
| `/admin/cuestionario/:temaId/:dificultad` | `AdminEditor` | Editor de preguntas |
| `/admin/contenido/:temaId/:dificultad` | `AdminEditorContenido` | Editor de contenidos |

---

## 2. Capa de presentación (páginas y componentes)

**Carpetas:** `src/pages/`, `src/components/`

Las páginas orquestan la pantalla: leen parámetros de la URL (`useParams`), piden datos a los servicios o al contexto, y componen componentes más pequeños pasándoles **props**.

Ejemplos de composición:

- `Tema` → `SelectorDificultad` (recibe `estaDesbloqueado` y `obtenerResultado` del contexto como props)
- `Contenidos` → `BotonContenido` (uno por cada ítem de contenido)
- `QuizPage` → `Quiz` → `preguntas/PreguntaSeleccionSimple`, `PreguntaSeleccionMultiple`, `PreguntaVerdaderoFalso`, `PreguntaNumerica`, `PreguntaPareo` (según el tipo de cada pregunta)
- `Resultado` → `Feedback`
- `Admin` → `EditorPregunta` (dentro de `AdminEditor`)

Los componentes no llaman servicios directamente casi nunca — la excepción es `BotonContenido`, que registra una métrica de consulta al hacer clic (ver sección 6). El resto delega en la página contenedora o en el contexto de progreso.

**Comunicación:** props hacia abajo, callbacks hacia arriba (p. ej. `onEnviar`, `onGuardar`), y lectura/escritura del estado global vía el hook `useProgreso()`.

---

## 3. Estado global: `ProgresoContext`

**Archivo:** `src/context/ProgresoContext.jsx`

Es el **estado compartido** de toda la app en el cliente, expuesto mediante el hook `useProgreso()`. Internamente usa `useLocalStorage` (`src/hooks/useLocalStorage.js`) para persistir en la clave `progreso-app-tesis` de `localStorage`.

Guarda:

- `nivelesDesbloqueados` — qué dificultades tiene abiertas el estudiante por tema.
- `resultadosQuiz` — última nota por `tema:dificultad`.
- `ultimaUbicacion` — para el aviso "continuar donde lo dejaste".
- `nombreUsuario` — el nombre capturado en la Bienvenida o en `ModalNombre`.

Expone funciones que las páginas consumen directamente:

- `estaDesbloqueado(temaId, dificultad)` — también fuerza `true` si el tema tiene la marca `desbloqueadoCompleto` (el tema 0).
- `obtenerResultado`, `registrarResultado` — al aprobar, desbloquea el siguiente nivel.
- `actualizarUbicacion`, `setNombreUsuario`.

**Comunicación:** cualquier página o componente llama `useProgreso()` para leer/escribir sin pasar por props intermedios. Es la alternativa a "prop drilling" para el estado que necesita estar disponible en toda la app.

---

## 4. Lógica de dominio pura

**Archivos:** `src/utils/calcularResultado.js`, `src/data/temas.js`

- `calcularResultado(quiz, respuestas)` — corrige cada pregunta según su tipo (`esCorrecta`), calcula la nota sobre 20 y determina `aprobado`. Respeta `esTemaSinUmbral(quiz.tema)`: los cuestionarios del tema 0 siempre se consideran aprobados (son de práctica).
- `data/temas.js` — catálogo de temas con helpers puros: `obtenerTema`, `siguienteDificultad`, `esTemaDesbloqueadoCompleto`, `esTemaSinUmbral`.

Estas funciones no tienen efectos secundarios ni dependen de React: se importan tanto desde componentes como desde el contexto.

---

## 5. Capa de servicios (acceso a datos)

**Carpeta:** `src/services/`

Cuatro módulos, cada uno con la misma forma: exponen funciones `async` que primero verifican `supabaseConfigurado` (de `src/lib/supabase.js`).

| Servicio | Responsabilidad |
|---|---|
| `cuestionarios.js` | Obtener/listar/guardar/eliminar cuestionarios |
| `contenidos.js` | Obtener/listar/guardar/eliminar contenidos |
| `resultados.js` | Guardar y listar resultados de quiz |
| `metricas.js` | Registrar consultas de contenido y agregar métricas por estudiante |

Patrón repetido en `obtenerCuestionario` y `obtenerContenidos`:

```js
if (!supabaseConfigurado) return datosDesdeJson(tema, dificultad); // fallback
const { data, error } = await supabase.from(tabla).select(...);
if (error || !data) return datosDesdeJson(tema, dificultad);       // fallback también si falla
return filaATipoDeDominio(data);
```

Este patrón es lo que permite que **la app funcione sin backend configurado**: en desarrollo local sin `.env`, o si Supabase falla, todo sigue operando contra los datos estáticos de `src/data/`.

**`src/lib/supabase.js`** crea el cliente único con `@supabase/supabase-js`, usando `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`. Si faltan, `supabaseConfigurado` es `false` y ningún servicio intenta la llamada de red.

---

## 6. Persistencia y datos

### 6.1 Supabase (Postgres + RLS)

**Esquema:** `scripts/esquema.sql`

| Tabla | Contenido |
|---|---|
| `cuestionarios` | `tema`, `dificultad`, `umbral_aprobacion`, `preguntas` (jsonb) |
| `contenidos` | `tema`, `dificultad`, `items` (jsonb) |
| `resultados` | `nombre`, `tema`, `dificultad`, `nota`, `correctas`, `total`, `aprobado` |
| `consultas_contenido` | `nombre`, `tema`, `dificultad`, `contenido`, `tipo` — una fila por cada vez que un estudiante abre un contenido |

Todas tienen RLS habilitado con políticas abiertas (alcance de tesis: lectura pública, escritura sin restricción por clave anónima).

### 6.2 Datos locales (fallback)

**Carpeta:** `src/data/`

- `quizzes.js` — cuestionarios embebidos (incluye el tema 0 `propedeutico-aritmetica`).
- `contenidos.js` — recursos externos embebidos.
- `temas.js` — catálogo de temas y helpers (sección 4).
- `tiposContenido.js` — catálogo de tipos de contenido (video, artículo, juego, etc.) con etiqueta y emoji.

### 6.3 `localStorage` (navegador)

- `progreso-app-tesis` — todo el estado de `ProgresoContext` (sección 3).
- Sesión del panel admin (`src/utils/adminAuth.js`) — autenticación simple por contraseña.

---

## 7. Métricas de estudiantes

**Archivos:** `src/services/metricas.js`, `src/components/BotonContenido.jsx`, `src/pages/Admin.jsx`

Flujo de registro:

1. El estudiante hace clic en un contenido → `BotonContenido` dispara `registrarConsultaContenido({ nombre, tema, dificultad, contenido, tipo })`.
2. El servicio inserta una fila en `consultas_contenido` (si Supabase está configurado; si no, no hace nada — es "best effort", no bloquea la navegación).

Flujo de agregación (panel admin, pestaña **Estudiantes**):

1. `Admin.jsx` carga en paralelo `listarResultados()` y `listarConsultas()`.
2. `agregarMetricasPorEstudiante(resultados, consultas)` agrupa por `nombre` y calcula: intentos totales, cuestionarios distintos, repeticiones (intentos que exceden el primer intento por cuestionario), nota promedio, mejor nota, aprobados y contenidos consultados.
3. Se renderiza como tabla, ordenada por última actividad.

---

## 8. Servicio externo: Algorimi (chatbot de IA)

**Archivo:** `src/components/ChatbotPanel.jsx`

Es independiente del resto del sistema — no pasa por la capa de servicios ni por Supabase. Monta el web component `<zapier-interfaces-chatbot-embed>` con el id configurado en `VITE_ZAPIER_CHATBOT_ID`, dentro de un panel lateral derecho. Si la variable de entorno no está definida, muestra un aviso en vez del chatbot.

---

## 9. Tooling: scripts y despliegue

### 9.1 Scripts Node (offline, fuera del navegador)

**Carpeta:** `scripts/`

- `seedCuestionarios.mjs` / `seedContenidos.mjs` — leen `src/data/*.js` y hacen `upsert` directo en Supabase con la clave anónima (leen `.env` manualmente con `fs.readFileSync`, no usan Vite).
- `limpiarBaseDatos.mjs` — vacía `resultados` y `consultas_contenido` (o también `cuestionarios`/`contenidos` con `--todo`).

Se ejecutan con `npm run seed` / `npm run db:limpiar`, nunca desde la app en producción.

### 9.2 Build y despliegue

- `vite build` genera el bundle estático.
- Vercel sirve ese bundle; `vercel.json` y `public/_redirects` reescriben cualquier ruta hacia `index.html` para que React Router pueda manejar rutas profundas (p. ej. recargar `/tema/variables/principiante` no debe dar 404).

---

## Flujos de comunicación clave (paso a paso)

### A. Enviar un cuestionario

```
QuizPage
  → calcularResultado(quiz, respuestas)          [utils, puro]
  → registrarResultado(temaId, dificultad, r)     [ProgresoContext → localStorage]
  → guardarResultado({...})                       [services/resultados.js → Supabase]
  → navigate a /resultado → Feedback
```

### B. Cargar contenidos de un nivel

```
Contenidos (useEffect al montar)
  → obtenerContenidos(tema, dificultad)            [services/contenidos.js]
      → si supabaseConfigurado: SELECT en Supabase
      → si no, o si falla: contenidosDesdeJson()   [data/contenidos.js]
  → BotonContenido × N
```

### C. Registrar que un estudiante consultó un contenido

```
BotonContenido (onClick del link)
  → registrarConsultaContenido({...})              [services/metricas.js]
  → INSERT en consultas_contenido (Supabase)
```

### D. Panel admin — pestaña Estudiantes

```
Admin (useEffect al autenticarse)
  → listarResultados() + listarConsultas()         [Promise.all]
  → agregarMetricasPorEstudiante(resultados, consultas)  [puro, en cliente]
  → tabla "Estudiantes"
```

---

## Por qué está organizado así

- **Separar servicios de componentes** permite que toda la lógica de "¿de dónde vienen los datos?" viva en un solo lugar (`src/services/`), y que las páginas no sepan ni les importe si están hablando con Supabase o con un JSON local.
- **El fallback a datos locales** hace que el proyecto sea usable sin credenciales de Supabase — útil para desarrollo y para que la demo no dependa de que el backend esté arriba.
- **El progreso vive en el navegador** (no en Supabase) porque no hay autenticación de usuarios: el "usuario" es solo un nombre libre, así que no tiene sentido sincronizar progreso entre dispositivos: cada navegador es la fuente de verdad de su propio avance.
- **Las métricas sí van a Supabase** porque, a diferencia del progreso, le interesan al profesor/administrador consultarlas desde el panel admin, no solo al propio estudiante.
