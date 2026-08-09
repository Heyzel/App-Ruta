// Reordena aleatoriamente las opciones (selección simple/múltiple) y las
// columnas de pareo de los cuestionarios en Supabase (producción), sin
// cambiar cuál es la respuesta correcta — solo su posición. Corrige el
// patrón detectado: en selección simple/múltiple las correctas tendían a
// ser las primeras opciones, y en pareo la correspondencia siempre era
// identidad (elemento 1 izq. -> elemento 1 der., etc.).
//
// Antes de escribir, guarda un respaldo del contenido actual completo de la
// tabla `cuestionarios` (con las respuestas correctas) fuera del repo.
//
// Ejecutar con: node scripts/aleatorizarPatronesCuestionarios.mjs <carpeta-backup>
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
  console.error('Uso: node scripts/aleatorizarPatronesCuestionarios.mjs <carpeta-backup>');
  process.exit(1);
}

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

function barajar(array) {
  const copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

// permutacion[nuevaPosicion] = indiceOriginal
function permutacionAleatoria(n) {
  return barajar(Array.from({ length: n }, (_, i) => i));
}

function esIdentidad(permutacion) {
  return permutacion.every((valor, i) => valor === i);
}

// Igual que permutacionAleatoria, pero garantiza que el resultado no sea la
// identidad (relevante para pareo, que partía de 100% identidad).
function permutacionNoIdentidad(n) {
  if (n <= 1) return Array.from({ length: n }, (_, i) => i);
  let intento = permutacionAleatoria(n);
  let vueltas = 0;
  while (esIdentidad(intento) && vueltas < 20) {
    intento = permutacionAleatoria(n);
    vueltas += 1;
  }
  return intento;
}

function reordenarPregunta(pregunta) {
  if (pregunta.tipo === 'seleccion-simple') {
    const permutacion = permutacionAleatoria(pregunta.opciones.length);
    return {
      ...pregunta,
      opciones: permutacion.map((i) => pregunta.opciones[i]),
      respuestaCorrecta: permutacion.indexOf(pregunta.respuestaCorrecta),
    };
  }

  if (pregunta.tipo === 'seleccion-multiple') {
    const permutacion = permutacionAleatoria(pregunta.opciones.length);
    return {
      ...pregunta,
      opciones: permutacion.map((i) => pregunta.opciones[i]),
      respuestasCorrectas: pregunta.respuestasCorrectas
        .map((indiceOriginal) => permutacion.indexOf(indiceOriginal))
        .sort((a, b) => a - b),
    };
  }

  if (pregunta.tipo === 'pareo') {
    const permutacion = permutacionNoIdentidad(pregunta.derecha.length);
    return {
      ...pregunta,
      derecha: permutacion.map((i) => pregunta.derecha[i]),
      correspondencias: pregunta.correspondencias.map((indiceOriginal) => permutacion.indexOf(indiceOriginal)),
    };
  }

  return pregunta;
}

async function migrar() {
  const { data, error } = await supabase.from('cuestionarios').select('*').order('tema').order('dificultad');
  if (error) {
    console.error('Error al consultar Supabase:', error.message);
    process.exit(1);
  }

  mkdirSync(carpetaBackup, { recursive: true });
  const rutaBackup = join(carpetaBackup, `cuestionarios-backup-${Date.now()}.json`);
  writeFileSync(rutaBackup, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`Respaldo guardado en: ${rutaBackup}`);

  let filasActualizadas = 0;
  let preguntasReordenadas = 0;

  for (const fila of data) {
    const nuevasPreguntas = (fila.preguntas || []).map((pregunta) => {
      if (['seleccion-simple', 'seleccion-multiple', 'pareo'].includes(pregunta.tipo)) {
        preguntasReordenadas += 1;
        return reordenarPregunta(pregunta);
      }
      return pregunta;
    });

    const { error: errorUpdate } = await supabase
      .from('cuestionarios')
      .update({ preguntas: nuevasPreguntas })
      .eq('id', fila.id);

    if (errorUpdate) {
      console.error(`Error actualizando ${fila.tema}/${fila.dificultad}:`, errorUpdate.message);
      process.exit(1);
    }
    filasActualizadas += 1;
  }

  console.log(`✓ ${filasActualizadas} cuestionarios actualizados, ${preguntasReordenadas} preguntas reordenadas.`);
}

migrar();
