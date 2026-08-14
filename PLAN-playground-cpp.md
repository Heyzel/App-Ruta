# Plan: Playground de C++ (compilador embebido)

> Documento de planificación para ser **leído y ejecutado por otro agente de IA**.
> Añade a `app-tesis` una página donde el estudiante escribe código C++, lo ejecuta y ve la salida real.
>
> Restricciones que definen este plan: **sin presupuesto** (nada de VPS ni APIs de pago), **sin backend
> propio**, **sin dependencias npm nuevas** y con el **mínimo de código añadido**. El agente ejecutor debe
> respetar los patrones existentes documentados en `ARQUITECTURA.md`. No reinventar arquitectura.

---

## Decisión técnica (ya investigada y verificada — no volver a evaluarla)

**Se usa la API pública de Wandbox llamada directamente desde el navegador.**

Verificaciones hechas el 2026-08-13 contra `https://wandbox.org/api/compile.json`:

| Comprobación | Resultado |
|---|---|
| Requiere API key / registro | **No** |
| Cabecera CORS | `Access-Control-Allow-Origin: *` → **el navegador puede llamarla directo** |
| Compilador estable disponible | `gcc-13.2.0` (también 12.3.0, 11.4.0, 10.5.0…; `gcc-head` cambia, **no usarlo**) |
| Ejecución correcta | `{"status":"0", "program_output":"14\n"}` |
| Errores de compilación | Llegan en `compiler_error` con el diagnóstico real de g++ |
| Entrada estándar (`stdin`) | Soportada, funciona (`std::cin`) |
| Costo | Cero |

**Consecuencia clave: NO se crea ninguna función serverless.** No hay API key que esconder, así que un proxy
en `api/` solo añadiría un punto de fallo, latencia y consumo de la cuota de Vercel. Esto reduce el trabajo a
**un servicio + un componente + una página + una ruta**.

### Por qué no las otras opciones (contexto, no reevaluar)
- **Judge0 auto-hospedado**: requiere VPS con Docker y cgroup v1 → hay presupuesto cero. Descartado.
- **Judge0 en RapidAPI**: cuota gratuita insuficiente para una clase entera y exige registro con tarjeta. Descartado.
- **Piston (emkc.org)**: desde febrero de 2026 su API pública ya no es de acceso libre; requiere autorización manual. Descartado.
- **clang compilado a WASM**: sin costo pero implica decenas de MB de descarga y configuración de cabeceras de aislamiento. Demasiada complejidad para el tiempo disponible. Descartado.
- **JSCPP** (intérprete JS): solo soporta un subconjunto tipo C; se rompe con clases y STL, lo que contradice los temas `poo` y `estructuras-datos`. Descartado.

---

## ⚠️ Decisión de diseño obligatoria: el playground va en su PROPIA página

`src/components/Quiz.jsx` (línea ~90) ya renderiza `pregunta.codigo` en un `<pre className="quiz-codigo">`.
Es tentador poner ahí el botón "Ejecutar", **pero NO se debe hacer**: esos fragmentos pertenecen a las
preguntas de tipo `numerica` del nivel avanzado, cuyo enunciado pide al estudiante **calcular mentalmente**
el resultado. Un botón de ejecutar en el cuestionario le regalaría la respuesta y anularía la evaluación.

Por tanto:
- El playground vive en una **ruta nueva e independiente**: `/practica`.
- **No se toca `Quiz.jsx` ni `calcularResultado.js`.** No se añade ningún tipo de pregunta nuevo.
- (Extensión futura, fuera de este plan: permitir ejecutar los fragmentos en `Resultado`, es decir *después*
  de calificar, como herramienta de repaso.)

---

## Archivos afectados (resumen)

| Archivo | Acción |
|---|---|
| `src/services/ejecucionCodigo.js` | **Nuevo** — habla con Wandbox; nunca lanza |
| `src/components/EditorCodigo.jsx` | **Nuevo** — textarea + stdin + botón + panel de salida |
| `src/components/EditorCodigo.css` | **Nuevo** — estilos (reutilizar la paleta de `.quiz-codigo`) |
| `src/pages/Practica.jsx` | **Nuevo** — página contenedora con título y plantillas |
| `src/pages/Practica.css` | **Nuevo** — estilos de la página |
| `src/App.jsx` | Añadir la ruta `/practica` |
| `src/pages/Inicio.jsx` | Añadir el enlace de entrada |
| `ARQUITECTURA.md` | Documentar el nuevo servicio externo |

**Dependencias npm nuevas: ninguna.** El editor es un `<textarea>` monoespaciado. No instalar CodeMirror ni
Monaco: el resaltado de sintaxis no justifica el peso ni el tiempo en este alcance.

---

## Paso 1 — `src/services/ejecucionCodigo.js` (NUEVO)

Sigue el mismo contrato que `src/services/retroalimentacion.js`: **es `async`, nunca lanza, y ante cualquier
fallo devuelve un objeto de error legible** para que la UI degrade con elegancia.

```js
// Ejecuta código C++ usando la API pública de Wandbox (sin API key, CORS abierto).
// Nunca lanza: cualquier fallo se devuelve como { ok: false, mensaje }.

const URL_WANDBOX = 'https://wandbox.org/api/compile.json';
const COMPILADOR = 'gcc-13.2.0';
const OPCIONES = 'warning,c++17';
const TIEMPO_LIMITE_MS = 20000;
const MAX_CARACTERES = 10000;

export async function ejecutarCodigo({ codigo, entrada = '' }) {
  if (!codigo || !codigo.trim()) {
    return { ok: false, mensaje: 'Escribe algo de código antes de ejecutar.' };
  }
  if (codigo.length > MAX_CARACTERES) {
    return { ok: false, mensaje: 'El código es demasiado largo para ejecutarlo aquí.' };
  }

  const controlador = new AbortController();
  const temporizador = setTimeout(() => controlador.abort(), TIEMPO_LIMITE_MS);

  try {
    const resp = await fetch(URL_WANDBOX, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code: codigo,
        compiler: COMPILADOR,
        options: OPCIONES,
        stdin: entrada,
        save: false,
      }),
      signal: controlador.signal,
    });

    if (!resp.ok) {
      return { ok: false, mensaje: 'El servicio de compilación no respondió. Inténtalo de nuevo.' };
    }

    const datos = await resp.json();

    // Cuando la compilación falla, Wandbox NO incluye la clave `program_output`.
    // Ese es el criterio fiable: no sirve mirar `compiler_error` (los warnings
    // también lo llenan) ni `status` (en una ejecución correcta es el código de
    // salida del programa: 0 al terminar bien, 139 en un segfault, etc.).
    const compilo = Object.hasOwn(datos, 'program_output');

    return {
      ok: true,
      compilo,
      salida: datos.program_output || '',
      errorEjecucion: datos.program_error || '',
      mensajesCompilador: datos.compiler_error || '', // warnings si compiló; errores si no
      codigoSalida: datos.status,
    };
  } catch (err) {
    if (err.name === 'AbortError') {
      return {
        ok: false,
        mensaje: 'El programa tardó demasiado. Revisa si tienes un bucle infinito.',
      };
    }
    return { ok: false, mensaje: 'No hay conexión con el servicio de compilación.' };
  } finally {
    clearTimeout(temporizador);
  }
}
```

Notas para el ejecutor:
- `status` llega como **string** (`"0"` = el programa terminó bien). No compararlo con el número `0`.
- Un programa puede compilar con *warnings*: `compiler_error` trae texto pero `status` es `"0"`. Mostrar los
  warnings sin tratarlos como fallo.
- Códigos de salida frecuentes que conviene traducir al estudiante: `139` (acceso inválido a memoria) y
  `136` (error aritmético, p. ej. división entre cero).
- No añadir reintentos automáticos: Wandbox es un servicio gratuito de cortesía y no conviene abusar.

## Paso 2 — `src/components/EditorCodigo.jsx` (NUEVO)

Componente controlado, sin estado global ni contexto. Props: `codigoInicial` (string, opcional).

Estado interno: `codigo`, `entrada`, `resultado`, `cargando`.

Requisitos de comportamiento:
1. `<textarea>` para el código, con `spellCheck={false}`, `autoCapitalize="off"`, `autoCorrect="off"`,
   fuente monoespaciada y unas 16 filas.
2. Insertar dos espacios al pulsar `Tab` dentro del textarea, en vez de saltar de campo (mejora enorme por
   muy poco código; recordar `event.preventDefault()` y reposicionar el cursor).
3. `<textarea>` secundario, más pequeño y **plegable**, para la entrada estándar (`stdin`), con la etiqueta
   "Entrada (para `std::cin`)". Sirve para los ejercicios que leen datos.
4. Botón **"▶ Ejecutar"**: deshabilitado mientras `cargando` sea `true` (evita ráfagas de peticiones) y con
   el texto "Compilando…" en ese estado.
5. Panel de salida debajo, que distingue tres casos:
   - **Error de compilación** (`errorCompilacion` con `status !== '0'`): mostrarlo en un bloque con borde
     rojo, encabezado "Errores de compilación". Es el diagnóstico real de g++ — mostrarlo tal cual, es
     material didáctico valioso.
   - **Ejecución correcta**: bloque con la `salida` y encabezado "Salida del programa". Si `salida` está
     vacía, escribir "(el programa no imprimió nada)".
   - **Fallo del servicio** (`ok: false`): mostrar `mensaje` en un aviso neutro, nunca un crash.
6. Botón secundario **"Limpiar"** que restablece el código a `codigoInicial` y borra el resultado.
7. Accesibilidad: el panel de salida con `aria-live="polite"` para que se anuncie al terminar.

## Paso 3 — `src/components/EditorCodigo.css` (NUEVO)

Reutilizar la paleta del bloque de código ya existente en `src/components/Quiz.css` (`.quiz-codigo`:
fondo `#0b0b12`, texto `#e6e6f0`, borde `var(--color-borde, #33334d)`, fuente `'Consolas', 'Courier New',
monospace`) para que el playground se vea parte de la misma plataforma y no de otra app.

Puntos a cubrir: `width: 100%` y `box-sizing: border-box` en los textarea; `white-space: pre` +
`overflow-x: auto` en la salida; y comprobar el layout en ancho de teléfono (el proyecto ya cuida la vista
móvil en el resto de pantallas).

## Paso 4 — `src/pages/Practica.jsx` (NUEVO)

Página delgada: encabezado + `<EditorCodigo />`. Debe incluir:

1. Título ("Practica C++") y una línea explicando que el código se compila con g++ real y que el resultado
   no afecta al progreso ni a las notas.
2. Un `<select>` de **plantillas** para no empezar con la página en blanco. Al elegir una, se carga en el
   editor. Mínimo cuatro, coherentes con los temas del proyecto (`src/data/temas.js`):
   - *Hola mundo* — `std::cout` básico.
   - *Variables y operaciones* — declarar, operar e imprimir.
   - *Bucle `for`* — acumular una suma.
   - *Función* — definir y llamar una función que retorna un valor.
   Definir las plantillas como una constante al inicio del archivo (`const PLANTILLAS = [{ nombre, codigo }]`),
   no dispersas en el JSX.
3. La plantilla *Hola mundo* es el `codigoInicial` por defecto.

**No** conectar esta página con `ProgresoContext`, `localStorage` ni Supabase. No registra métricas, no da
insignias, no desbloquea nada. Mantenerla completamente aislada es lo que hace que este cambio sea barato y
de riesgo casi nulo.

## Paso 5 — Ruta en `src/App.jsx`

Importar `Practica` junto a las demás páginas y añadir, después de la ruta del examen de suficiencia:

```jsx
<Route path="/practica" element={<Practica />} />
```

No tocar el orden de los providers ni los componentes globales: el playground hereda `BotonInicio`,
`ChatbotPanel` y `ControlAudio` automáticamente, que es justo lo deseable (el estudiante puede preguntarle a
Algorimi sobre el error que le acaba de salir).

## Paso 6 — Entrada desde `src/pages/Inicio.jsx`

Añadir un `<Link to="/practica">` con el mismo patrón visual del botón de examen de suficiencia
(`examen-suficiencia-boton`, ver `Inicio.jsx` ~línea 165): icono emoji `💻` + texto "Practica C++".

Colocarlo dentro de `.examen-suficiencia-fila` **solo si el layout móvil lo aguanta** — esa fila ya reparte
tres elementos en teléfono (audio, examen, opinión). Si queda apretado, ponerlo como una fila propia debajo
del encabezado. Verificar en ancho de teléfono antes de dar el paso por cerrado.

## Paso 7 — Documentar en `ARQUITECTURA.md`

Añadir una subsección corta junto a la sección 8 (Algorimi), ya que es el segundo servicio externo del
sistema: qué es Wandbox, que se llama directo desde el navegador sin backend, que no pasa por la capa de
servicios de Supabase, y que si falla la app sigue funcionando igual. Actualizar también el mapa de rutas de
la sección 1 con `/practica`.

---

## Verificación

1. `npm run dev` → ir a `/practica`. La plantilla *Hola mundo* se ejecuta y muestra su salida.
2. Introducir un error de sintaxis a propósito (p. ej. `int x = ;`) → aparece el diagnóstico de g++ en el
   bloque de errores, no un crash ni una pantalla en blanco.
3. Programa con `std::cin` + valor en el campo de entrada → la salida refleja el dato introducido.
4. Bucle infinito (`while(true){}`) → a los 20 s aparece el mensaje de tiempo excedido y el botón vuelve a
   habilitarse (la página no queda bloqueada).
5. Con el navegador en modo sin conexión → mensaje "No hay conexión con el servicio de compilación"; el resto
   de la app sigue navegable.
6. Recargar `/practica` directamente en el navegador → carga bien (la reescritura SPA de `vercel.json` ya lo
   cubre).
7. Comprobar en ancho de teléfono que ningún textarea desborda horizontalmente.
8. Recorrer un cuestionario avanzado y **confirmar que las preguntas `numerica` siguen sin botón de
   ejecutar**.
9. `npm run lint` y `npm run build` sin errores.

---

## Riesgos y plan B

- **Wandbox es un servicio gratuito de cortesía**: puede caer, volverse lento o limitar el uso. La app
  degrada con un mensaje, nunca se rompe, pero la funcionalidad podría no estar disponible el día de una
  demostración. **Antes de la defensa, probar el playground el mismo día.**
- **Plan B ya verificado**: la API de Compiler Explorer (`https://godbolt.org/api/compiler/g142/compile`,
  con `Accept: application/json`) también es gratuita, sin key, y ejecuta C++ enviando
  `options.compilerOptions.executorRequest: true` y `options.filters.execute: true`. Devuelve la salida en
  `stdout` como array de `{ text }`. **El cambio queda contenido en `src/services/ejecucionCodigo.js`**: si
  Wandbox desaparece, se reescribe ese único archivo y nada más del proyecto se entera. Mantener esa
  frontera es el principal motivo de que el servicio esté separado del componente.
- **No convertir esto en ejercicios calificados** dentro de este plan: casos de prueba, normalización de
  salida y editor de casos en el panel admin son un rediseño del motor de calificación, no una extensión.

## Esfuerzo estimado

Media jornada de trabajo. Cinco archivos nuevos, dos retocados, cero dependencias, cero infraestructura,
cero costo recurrente.
