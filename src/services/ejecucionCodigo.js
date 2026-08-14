// Ejecuta código C++ con la API pública de Wandbox (https://wandbox.org).
//
// A diferencia del resto de servicios, este no pasa por Supabase ni por
// `src/data/`: es un servicio externo que se llama directo desde el navegador,
// porque Wandbox responde con `Access-Control-Allow-Origin: *` y no requiere
// clave de API. Por eso no hace falta una función serverless que haga de proxy.
//
// Sigue el contrato de `retroalimentacion.js`: nunca lanza. Cualquier fallo
// (sin red, servicio caído, bucle infinito) se devuelve como
// `{ ok: false, mensaje }` para que la UI degrade con un aviso.

const URL_WANDBOX = 'https://wandbox.org/api/compile.json';
// Versión fija a propósito: `gcc-head` es una compilación experimental que
// cambia cada día y podría romper el playground sin que toquemos nada.
const COMPILADOR = 'gcc-13.2.0';
const OPCIONES = 'warning,c++17';
const TIEMPO_LIMITE_MS = 20000;
const MAX_CARACTERES = 10000;
// Wandbox ya trunca la salida en 128 KB, así que este tope solo actúa si
// algún día cambian ese límite. Renderizar megabytes de texto en un <pre>
// congelaría la pestaña del estudiante.
const MAX_SALIDA = 200000;

// Todo lo que llega de un servicio externo se normaliza a texto antes de
// entregárselo a la UI. Un valor de tipo inesperado (un objeto, un número)
// haría fallar el render de React y tumbaría la página entera; así, en el
// peor caso, se muestra texto raro pero la aplicación sigue en pie.
function comoTexto(valor) {
  if (typeof valor === 'string') return valor.slice(0, MAX_SALIDA);
  if (valor === null || valor === undefined) return '';
  return String(valor).slice(0, MAX_SALIDA);
}

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

    // Cómo distinguir un error de compilación de un fallo en ejecución:
    // cuando la compilación falla, Wandbox NO incluye la clave `program_output`
    // en la respuesta. Si el programa llegó a ejecutarse la clave está presente
    // (aunque venga vacía, como en un segfault). No sirve mirar `compiler_error`
    // —los warnings también lo llenan— ni `status`, que en una ejecución
    // correcta es el código de salida del programa.
    const compilo = Object.hasOwn(datos, 'program_output');

    return {
      ok: true,
      compilo,
      salida: comoTexto(datos.program_output),
      errorEjecucion: comoTexto(datos.program_error),
      // Con `compilo === true` esto son warnings; con `false`, los errores.
      mensajesCompilador: comoTexto(datos.compiler_error),
      codigoSalida: comoTexto(datos.status),
    };
  } catch (err) {
    if (err.name === 'AbortError') {
      return {
        ok: false,
        mensaje: 'El programa tardó demasiado en responder. Revisa si tienes un bucle infinito.',
      };
    }
    return { ok: false, mensaje: 'No se pudo conectar con el servicio de compilación.' };
  } finally {
    clearTimeout(temporizador);
  }
}

// Traduce a lenguaje de estudiante los códigos de salida que más confunden.
// Devuelve null cuando el programa terminó bien (0) o cuando no hay nada útil
// que explicar.
export function explicarCodigoSalida(codigoSalida) {
  if (codigoSalida === undefined || codigoSalida === null) return null;
  if (codigoSalida === '0') return null;
  if (codigoSalida === '139') {
    return 'El programa se interrumpió por un acceso inválido a memoria (por ejemplo, usar un puntero nulo o salirse de un arreglo).';
  }
  if (codigoSalida === '136') {
    return 'El programa se interrumpió por un error aritmético (por ejemplo, una división entre cero).';
  }
  if (codigoSalida === '137') {
    return 'El servicio detuvo el programa por tardar demasiado. Revisa si tienes un bucle infinito.';
  }
  return `El programa terminó con el código de salida ${codigoSalida}.`;
}
