// Analiza (solo lectura) los cuestionarios cargados en Supabase (producción)
// buscando patrones posicionales en las respuestas correctas de preguntas de
// selección múltiple/simple y de pareo.
// Ejecutar con: node scripts/analizarPatronesCuestionarios.mjs
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
const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

const { data, error } = await supabase.from('cuestionarios').select('*').order('tema').order('dificultad');
if (error) {
  console.error('Error al consultar Supabase:', error.message);
  process.exit(1);
}

let totalSimple = 0;
let simplePrimeraOpcion = 0; // respuestaCorrecta === 0

let totalMultiple = 0;
let multiplePrefijo = 0; // respuestasCorrectas es exactamente [0..k-1] (las primeras k)

let totalPareo = 0;
let pareoIdentidad = 0; // correspondencias es exactamente [0,1,2,...]

const detalleMultipleNoPrefijo = [];
const detallePareoNoIdentidad = [];
const detalleSimpleNoPrimera = [];

for (const fila of data) {
  for (const [indice, pregunta] of (fila.preguntas || []).entries()) {
    const ref = `${fila.tema} / ${fila.dificultad} / #${indice + 1}`;

    if (pregunta.tipo === 'seleccion-simple') {
      totalSimple += 1;
      if (pregunta.respuestaCorrecta === 0) {
        simplePrimeraOpcion += 1;
      } else {
        detalleSimpleNoPrimera.push(`${ref}: correcta en índice ${pregunta.respuestaCorrecta}`);
      }
    }

    if (pregunta.tipo === 'seleccion-multiple') {
      totalMultiple += 1;
      const correctas = [...pregunta.respuestasCorrectas].sort((a, b) => a - b);
      const esPrefijo = correctas.every((valor, i) => valor === i);
      if (esPrefijo) {
        multiplePrefijo += 1;
      } else {
        detalleMultipleNoPrefijo.push(`${ref}: correctas en índices [${correctas.join(',')}] de ${pregunta.opciones.length} opciones`);
      }
    }

    if (pregunta.tipo === 'pareo') {
      totalPareo += 1;
      const correspondencias = pregunta.correspondencias || [];
      const esIdentidad = correspondencias.every((valor, i) => valor === i);
      if (esIdentidad) {
        pareoIdentidad += 1;
      } else {
        detallePareoNoIdentidad.push(`${ref}: correspondencias [${correspondencias.join(',')}]`);
      }
    }
  }
}

console.log('=== Selección simple ===');
console.log(`Total: ${totalSimple}. Respuesta correcta = primera opción (índice 0): ${simplePrimeraOpcion} (${((simplePrimeraOpcion / totalSimple) * 100).toFixed(1)}%)`);
if (detalleSimpleNoPrimera.length) {
  console.log('Casos donde NO es la primera opción:');
  detalleSimpleNoPrimera.forEach((l) => console.log('  ' + l));
}

console.log('\n=== Selección múltiple ===');
console.log(`Total: ${totalMultiple}. Correctas = las primeras k opciones (prefijo): ${multiplePrefijo} (${((multiplePrefijo / totalMultiple) * 100).toFixed(1)}%)`);
if (detalleMultipleNoPrefijo.length) {
  console.log('Casos donde NO son un prefijo (primeras k):');
  detalleMultipleNoPrefijo.forEach((l) => console.log('  ' + l));
}

console.log('\n=== Pareo ===');
console.log(`Total: ${totalPareo}. Correspondencias = identidad [0,1,2,...]: ${pareoIdentidad} (${((pareoIdentidad / totalPareo) * 100).toFixed(1)}%)`);
if (detallePareoNoIdentidad.length) {
  console.log('Casos donde NO es identidad:');
  detallePareoNoIdentidad.forEach((l) => console.log('  ' + l));
}
