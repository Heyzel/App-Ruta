// Exporta, para cada tema/dificultad, las preguntas del cuestionario junto
// con los contenidos disponibles — pensado para auditar si los contenidos
// alcanzan para responder las preguntas. Datos de producción (Supabase).
// Ejecutar con: node scripts/exportarAuditoriaContenidos.mjs <ruta-salida.md>
import { createClient } from '@supabase/supabase-js';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

function cargarEnv() {
  const rutaEnv = join(__dirname, '..', '.env');
  const contenido = readFileSync(rutaEnv, 'utf-8');
  const variables = {};
  for (const linea of contenido.split('\n')) {
    const match = linea.match(/^([A-Z_]+)=(.*)$/);
    if (match) variables[match[1]] = match[2].trim();
  }
  return variables;
}

const env = cargarEnv();
const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

const urlTemas = pathToFileURL(join(__dirname, '..', 'src', 'data', 'temas.js')).href;
const { TEMAS, DIFICULTADES, NOMBRE_DIFICULTAD } = await import(urlTemas);

const rutaSalida = process.argv[2];
if (!rutaSalida) {
  console.error('Uso: node scripts/exportarAuditoriaContenidos.mjs <ruta-salida.md>');
  process.exit(1);
}

function enunciadoPregunta(pregunta) {
  switch (pregunta.tipo) {
    case 'verdadero-falso':
      return `[V/F] ${pregunta.enunciado}`;
    case 'seleccion-simple':
      return `[Sel. simple] ${pregunta.enunciado} (opciones: ${pregunta.opciones.join(' | ')})`;
    case 'seleccion-multiple':
      return `[Sel. múltiple] ${pregunta.enunciado} (opciones: ${pregunta.opciones.join(' | ')})`;
    case 'numerica':
      return `[Numérica] ${pregunta.enunciado}${pregunta.codigo ? `\n   código:\n${pregunta.codigo}` : ''}`;
    case 'pareo':
      return `[Pareo] ${pregunta.enunciado} (izquierda: ${pregunta.izquierda.join(', ')} | derecha: ${pregunta.derecha.join(', ')})`;
    default:
      return `[${pregunta.tipo}] ${pregunta.enunciado}`;
  }
}

async function exportar() {
  const [{ data: cuestionarios, error: e1 }, { data: contenidos, error: e2 }] = await Promise.all([
    supabase.from('cuestionarios').select('*'),
    supabase.from('contenidos').select('*'),
  ]);

  if (e1 || e2) {
    console.error('Error al consultar Supabase:', (e1 || e2).message);
    process.exit(1);
  }

  const cuestPorClave = new Map(cuestionarios.map((f) => [`${f.tema}:${f.dificultad}`, f]));
  const contPorClave = new Map(contenidos.map((f) => [`${f.tema}:${f.dificultad}`, f]));

  const partes = [];
  partes.push('# Auditoría: preguntas vs. contenidos disponibles (producción)');
  partes.push('');

  for (const tema of TEMAS) {
    for (const dificultad of DIFICULTADES) {
      const clave = `${tema.id}:${dificultad}`;
      const cuest = cuestPorClave.get(clave);
      const cont = contPorClave.get(clave);

      partes.push(`## ${tema.nombre} — ${NOMBRE_DIFICULTAD[dificultad]}`);
      partes.push('');

      partes.push('### Contenidos disponibles');
      if (!cont || !cont.items || cont.items.length === 0) {
        partes.push('_(sin contenidos en la base de datos)_');
      } else {
        cont.items.forEach((item, i) => {
          partes.push(`${i + 1}. **${item.nombre}** [${item.tipo}] — ${item.descripcion}`);
          partes.push(`   URL: ${item.url}`);
          if (item.instrucciones) {
            partes.push(`   Instrucciones: ${item.instrucciones.replace(/\n/g, ' ')}`);
          }
        });
      }
      partes.push('');

      partes.push('### Preguntas del cuestionario');
      if (!cuest || !cuest.preguntas || cuest.preguntas.length === 0) {
        partes.push('_(sin cuestionario en la base de datos)_');
      } else {
        cuest.preguntas.forEach((p, i) => {
          partes.push(`${i + 1}. ${enunciadoPregunta(p)}`);
        });
      }
      partes.push('');
    }
  }

  writeFileSync(rutaSalida, partes.join('\n'), 'utf-8');
  console.log(`✓ Auditoría exportada a: ${rutaSalida}`);
}

exportar();
