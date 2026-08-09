// Actualiza en Supabase (producción) el umbral de aprobación por nivel de
// dificultad, uniformemente para todos los temas: principiante 13/20,
// intermedio 16/20, avanzado 20/20.
// Requiere que calcularResultado.js use "nota >= umbral" (no ">") para que
// el umbral de 20/20 en avanzado sea alcanzable con un examen perfecto.
//
// Ejecutar con: node scripts/actualizarUmbrales.mjs <carpeta-backup>
// Requiere que .env tenga VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY definidos.
import { createClient } from '@supabase/supabase-js';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
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

const carpetaBackup = process.argv[2];
if (!carpetaBackup) {
  console.error('Uso: node scripts/actualizarUmbrales.mjs <carpeta-backup>');
  process.exit(1);
}

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

const UMBRALES = {
  principiante: 13,
  intermedio: 16,
  avanzado: 20,
};

async function actualizar() {
  const { data: antes, error: errorLectura } = await supabase
    .from('cuestionarios')
    .select('*')
    .order('tema')
    .order('dificultad');

  if (errorLectura) {
    console.error('Error al consultar Supabase:', errorLectura.message);
    process.exit(1);
  }

  mkdirSync(carpetaBackup, { recursive: true });
  const rutaBackup = join(carpetaBackup, `cuestionarios-umbrales-backup-${Date.now()}.json`);
  writeFileSync(rutaBackup, JSON.stringify(antes, null, 2), 'utf-8');
  console.log(`Respaldo guardado en: ${rutaBackup}`);

  let totalActualizados = 0;

  for (const [dificultad, umbral] of Object.entries(UMBRALES)) {
    const { data, error } = await supabase
      .from('cuestionarios')
      .update({ umbral_aprobacion: umbral })
      .eq('dificultad', dificultad)
      .select('tema, dificultad');

    if (error) {
      console.error(`Error actualizando dificultad "${dificultad}":`, error.message);
      process.exit(1);
    }

    console.log(`✓ ${dificultad} -> ${umbral}/20 (${data.length} cuestionario(s))`);
    totalActualizados += data.length;
  }

  console.log(`\nTotal de cuestionarios actualizados: ${totalActualizados}`);
}

actualizar();
