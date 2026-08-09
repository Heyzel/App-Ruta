// Exporta a Markdown los cuestionarios actualmente cargados en Supabase
// (producción), NO los del JSON local (src/data/quizzes.js).
// Ejecutar con: node scripts/exportarCuestionarios.mjs <ruta-de-salida.md>
// Requiere que .env tenga VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY definidos.
//
// El .md generado contiene las respuestas correctas de los cuestionarios:
// pásale una ruta fuera del repositorio si no quieres exponer las respuestas
// a quien tenga acceso al proyecto (p. ej. estudiantes con el repo clonado).
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
if (!env.VITE_SUPABASE_URL || !env.VITE_SUPABASE_ANON_KEY) {
  console.error('Faltan VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY en .env');
  process.exit(1);
}

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

const urlTemas = pathToFileURL(join(__dirname, '..', 'src', 'data', 'temas.js')).href;
const { TEMAS, DIFICULTADES, NOMBRE_DIFICULTAD } = await import(urlTemas);

function formatearPregunta(pregunta, indice) {
  const lineas = [];
  const numero = indice + 1;

  switch (pregunta.tipo) {
    case 'verdadero-falso':
      lineas.push(`${numero}. **[Verdadero/Falso]** ${pregunta.enunciado}`);
      lineas.push(`   - Respuesta correcta: **${pregunta.respuestaCorrecta ? 'Verdadero' : 'Falso'}**`);
      break;

    case 'seleccion-simple':
      lineas.push(`${numero}. **[Selección simple]** ${pregunta.enunciado}`);
      pregunta.opciones.forEach((opcion, i) => {
        const esCorrecta = i === pregunta.respuestaCorrecta;
        lineas.push(`   - ${esCorrecta ? `**${opcion}** ✅` : opcion}`);
      });
      break;

    case 'seleccion-multiple':
      lineas.push(`${numero}. **[Selección múltiple]** ${pregunta.enunciado}`);
      pregunta.opciones.forEach((opcion, i) => {
        const esCorrecta = (pregunta.respuestasCorrectas || []).includes(i);
        lineas.push(`   - ${esCorrecta ? `**${opcion}** ✅` : opcion}`);
      });
      break;

    case 'numerica':
      lineas.push(`${numero}. **[Numérica]** ${pregunta.enunciado}`);
      lineas.push(
        `   - Respuesta correcta: **${pregunta.respuestaCorrecta}**${pregunta.tolerancia ? ` (tolerancia: ±${pregunta.tolerancia})` : ''}`
      );
      break;

    case 'pareo':
      lineas.push(`${numero}. **[Pareo]** ${pregunta.enunciado}`);
      (pregunta.correspondencias || []).forEach((indiceDerecha, i) => {
        lineas.push(`   - ${pregunta.izquierda[i]} → **${pregunta.derecha[indiceDerecha]}**`);
      });
      break;

    default:
      lineas.push(`${numero}. **[${pregunta.tipo}]** ${pregunta.enunciado}`);
      lineas.push('   - (tipo de pregunta no reconocido por el exportador, revisar manualmente)');
  }

  return lineas.join('\n');
}

async function exportar() {
  const { data, error } = await supabase
    .from('cuestionarios')
    .select('*')
    .order('tema')
    .order('dificultad');

  if (error) {
    console.error('Error al consultar Supabase:', error.message);
    process.exit(1);
  }

  const porClave = new Map((data || []).map((fila) => [`${fila.tema}:${fila.dificultad}`, fila]));

  const partes = [];
  partes.push('# Cuestionarios cargados en producción (Supabase)');
  partes.push('');
  partes.push(
    `_Generado el ${new Date().toLocaleString('es', { dateStyle: 'long', timeStyle: 'short' })}. Refleja el contenido de la tabla \`cuestionarios\` en Supabase, no el JSON local (\`src/data/quizzes.js\`)._`
  );
  partes.push('');

  let totalEncontrados = 0;
  const faltantes = [];

  for (const tema of TEMAS) {
    for (const dificultad of DIFICULTADES) {
      const clave = `${tema.id}:${dificultad}`;
      const fila = porClave.get(clave);

      if (!fila) {
        faltantes.push(`${tema.nombre} — ${NOMBRE_DIFICULTAD[dificultad]}`);
        continue;
      }

      totalEncontrados += 1;
      partes.push(`## ${tema.nombre} — ${NOMBRE_DIFICULTAD[dificultad]}`);
      partes.push('');
      partes.push(`**Umbral de aprobación:** ${fila.umbral_aprobacion}/20`);
      partes.push('');
      (fila.preguntas || []).forEach((pregunta, indice) => {
        partes.push(formatearPregunta(pregunta, indice));
        partes.push('');
      });
    }
  }

  if (faltantes.length > 0) {
    partes.push('## Niveles sin cuestionario cargado en la base de datos');
    partes.push('');
    partes.push(
      '_Estos niveles no tienen fila en la tabla `cuestionarios`; la app usa como respaldo el JSON local (`src/data/quizzes.js`) para ellos:_'
    );
    partes.push('');
    faltantes.forEach((nombre) => partes.push(`- ${nombre}`));
    partes.push('');
  }

  const rutaSalida = process.argv[2];
  if (!rutaSalida) {
    console.error('Uso: node scripts/exportarCuestionarios.mjs <ruta-de-salida.md>');
    process.exit(1);
  }
  writeFileSync(rutaSalida, partes.join('\n'), 'utf-8');
  console.log(`✓ Exportados ${totalEncontrados} cuestionarios (${faltantes.length} niveles sin fila en la BD).`);
  console.log(`Archivo generado: ${rutaSalida}`);
}

exportar();
