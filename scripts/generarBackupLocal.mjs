// Regenera el backup local de cuestionarios y contenidos (src/data/quizzes.js
// y src/data/contenidos.js) a partir de lo que hay actualmente en Supabase
// (producción). Estos archivos ya son el fallback que usan
// src/services/cuestionarios.js y src/services/contenidos.js cuando
// Supabase no está configurado o la consulta falla — este script solo se
// encarga de mantenerlos sincronizados con producción.
//
// Los tema/dificultad que NO tienen fila en Supabase (p. ej. el propedéutico
// de aritmética, que nunca se sembró en la base de datos) se conservan tal
// cual estaban en el archivo local: no se borran ni se tocan.
//
// Ejecutar con: node scripts/generarBackupLocal.mjs
// Requiere que .env tenga VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY definidos.
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

const rutaQuizzes = join(__dirname, '..', 'src', 'data', 'quizzes.js');
const rutaContenidos = join(__dirname, '..', 'src', 'data', 'contenidos.js');

const { QUIZZES: quizzesActuales } = await import(pathToFileURL(rutaQuizzes).href);
const { CONTENIDOS: contenidosActuales } = await import(pathToFileURL(rutaContenidos).href);

function normalizarPregunta(pregunta) {
  return pregunta.tipo ? pregunta : { tipo: 'seleccion-simple', ...pregunta };
}

async function generar() {
  const [{ data: filasCuestionarios, error: errorCuest }, { data: filasContenidos, error: errorCont }] =
    await Promise.all([
      supabase.from('cuestionarios').select('*'),
      supabase.from('contenidos').select('*'),
    ]);

  if (errorCuest || errorCont) {
    console.error('Error al consultar Supabase:', (errorCuest || errorCont).message);
    process.exit(1);
  }

  // Parte de una copia de lo que ya había localmente (conserva temas sin
  // fila en producción, como el propedéutico) y sobreescribe con lo que sí
  // existe en producción.
  const quizzesNuevos = JSON.parse(JSON.stringify(quizzesActuales));
  let cuestionariosActualizados = 0;
  for (const fila of filasCuestionarios) {
    quizzesNuevos[fila.tema] ??= {};
    quizzesNuevos[fila.tema][fila.dificultad] = {
      umbralAprobacion: fila.umbral_aprobacion,
      preguntas: (fila.preguntas || []).map(normalizarPregunta),
    };
    cuestionariosActualizados += 1;
  }

  const contenidosNuevos = JSON.parse(JSON.stringify(contenidosActuales));
  let contenidosActualizadosCount = 0;
  for (const fila of filasContenidos) {
    contenidosNuevos[fila.tema] ??= {};
    contenidosNuevos[fila.tema][fila.dificultad] = fila.items || [];
    contenidosActualizadosCount += 1;
  }

  const fecha = new Date().toISOString().slice(0, 10);

  const encabezadoQuizzes = `// Backup local de los cuestionarios (respaldo de la tabla \`cuestionarios\` de
// Supabase). src/services/cuestionarios.js usa este archivo como respaldo
// automático cuando Supabase no está configurado o la consulta falla.
//
// Generado automáticamente desde producción el ${fecha} con
// scripts/generarBackupLocal.mjs — no editar preguntas de temas que sí
// existen en producción directamente aquí, hazlo desde el panel de admin y
// vuelve a correr el script. Los temas que no tienen fila en Supabase (p.
// ej. el propedéutico de aritmética) sí se mantienen y editan solo aquí.
// Umbral de aprobación en escala 0-20 (aprueba si nota >= umbral).
export const QUIZZES = `;

  const encabezadoContenidos = `// Backup local de los contenidos (respaldo de la tabla \`contenidos\` de
// Supabase). src/services/contenidos.js usa este archivo como respaldo
// automático cuando Supabase no está configurado o la consulta falla.
//
// Generado automáticamente desde producción el ${fecha} con
// scripts/generarBackupLocal.mjs — no editar contenidos de temas que sí
// existen en producción directamente aquí, hazlo desde el panel de admin y
// vuelve a correr el script. Los temas que no tienen fila en Supabase (p.
// ej. el propedéutico de aritmética) sí se mantienen y editan solo aquí.
// El campo \`tipo\` corresponde a una clave de TIPOS_CONTENIDO (ver
// src/data/tiposContenido.js).
export const CONTENIDOS = `;

  writeFileSync(rutaQuizzes, encabezadoQuizzes + JSON.stringify(quizzesNuevos, null, 2) + ';\n', 'utf-8');
  writeFileSync(rutaContenidos, encabezadoContenidos + JSON.stringify(contenidosNuevos, null, 2) + ';\n', 'utf-8');

  console.log(`✓ src/data/quizzes.js regenerado (${cuestionariosActualizados} cuestionarios desde producción).`);
  console.log(`✓ src/data/contenidos.js regenerado (${contenidosActualizadosCount} contenidos desde producción).`);
}

generar();
