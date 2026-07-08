import { supabase, supabaseConfigurado } from '../lib/supabase';
import { QUIZZES } from '../data/quizzes';

function normalizarPregunta(pregunta) {
  return pregunta.tipo ? pregunta : { tipo: 'seleccion-simple', ...pregunta };
}

function quizDesdeJson(tema, dificultad) {
  const quiz = QUIZZES[tema]?.[dificultad];
  if (!quiz) return null;
  return {
    tema,
    dificultad,
    umbralAprobacion: quiz.umbralAprobacion,
    preguntas: quiz.preguntas.map(normalizarPregunta),
  };
}

function filaAQuiz(fila) {
  return {
    id: fila.id,
    tema: fila.tema,
    dificultad: fila.dificultad,
    umbralAprobacion: fila.umbral_aprobacion,
    preguntas: (fila.preguntas || []).map(normalizarPregunta),
  };
}

export async function obtenerCuestionario(tema, dificultad) {
  if (!supabaseConfigurado) {
    return quizDesdeJson(tema, dificultad);
  }

  const { data, error } = await supabase
    .from('cuestionarios')
    .select('*')
    .eq('tema', tema)
    .eq('dificultad', dificultad)
    .maybeSingle();

  if (error || !data) {
    return quizDesdeJson(tema, dificultad);
  }

  return filaAQuiz(data);
}

export async function listarCuestionarios() {
  if (!supabaseConfigurado) {
    return { data: [], error: new Error('Supabase no está configurado.') };
  }
  const { data, error } = await supabase
    .from('cuestionarios')
    .select('*')
    .order('tema')
    .order('dificultad');

  return { data: (data || []).map(filaAQuiz), error };
}

export async function guardarCuestionario({ tema, dificultad, umbralAprobacion, preguntas }) {
  if (!supabaseConfigurado) {
    return { error: new Error('Supabase no está configurado.') };
  }
  return supabase.from('cuestionarios').upsert(
    {
      tema,
      dificultad,
      umbral_aprobacion: umbralAprobacion,
      preguntas,
    },
    { onConflict: 'tema,dificultad' }
  );
}

export async function eliminarCuestionario(id) {
  if (!supabaseConfigurado) {
    return { error: new Error('Supabase no está configurado.') };
  }
  return supabase.from('cuestionarios').delete().eq('id', id);
}
