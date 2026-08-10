// Ejecutar con: node scripts/limpiarBaseDatos.mjs
// Vacía únicamente las tablas de datos generados por el uso de la plataforma
// (resultados, resultados_examen, consultas_contenido, opiniones_tema,
// opiniones_plataforma). Nunca toca `cuestionarios` ni `contenidos`.
// Requiere que .env tenga VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY definidos.
// Nota: cada tabla necesita su política de delete de scripts/esquema.sql.
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
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

// Filtro que selecciona todas las filas (id distinto de un UUID imposible).
const TODAS = ['id', '00000000-0000-0000-0000-000000000000'];

async function vaciar(tabla) {
  const { error, count } = await supabase.from(tabla).delete({ count: 'exact' }).neq(...TODAS);
  if (error) {
    console.error(`Error al vaciar ${tabla}:`, error.message);
    process.exit(1);
  }
  console.log(`✓ ${tabla}: ${count ?? 0} fila(s) eliminada(s).`);
}

async function limpiar() {
  console.log('Limpiando datos de uso (no se tocan cuestionarios ni contenidos)…');
  await vaciar('resultados');
  await vaciar('resultados_examen');
  await vaciar('consultas_contenido');
  await vaciar('opiniones_tema');
  await vaciar('opiniones_plataforma');
  console.log('Limpieza completada.');
}

limpiar();
