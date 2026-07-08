// Ejecutar con: node scripts/seedCuestionarios.mjs
// Requiere que .env tenga VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY definidos.
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'node:fs';
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

// Import dinámico de quizzes.js (ESM) usando ruta relativa al script.
const rutaQuizzes = join(__dirname, '..', 'src', 'data', 'quizzes.js');
const urlQuizzes = pathToFileURL(rutaQuizzes).href;
const { QUIZZES } = await import(urlQuizzes);

function normalizarPregunta(pregunta) {
  return { tipo: 'seleccion-simple', ...pregunta };
}

async function sembrar() {
  const filas = [];
  for (const [tema, niveles] of Object.entries(QUIZZES)) {
    for (const [dificultad, quiz] of Object.entries(niveles)) {
      filas.push({
        tema,
        dificultad,
        umbral_aprobacion: quiz.umbralAprobacion,
        preguntas: quiz.preguntas.map(normalizarPregunta),
      });
    }
  }

  console.log(`Sembrando ${filas.length} cuestionarios...`);
  const { error } = await supabase
    .from('cuestionarios')
    .upsert(filas, { onConflict: 'tema,dificultad' });

  if (error) {
    console.error('Error al sembrar:', error.message);
    process.exit(1);
  }
  console.log('Semilla completada correctamente.');
}

sembrar();
