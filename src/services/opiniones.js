import { supabase, supabaseConfigurado } from '../lib/supabase';

export async function enviarOpinionTema({
  tema,
  calificacion,
  aprendioAlgoNuevo,
  contenidosAdecuados,
  nivelFavorito,
  comentario,
}) {
  if (!supabaseConfigurado) {
    return { error: new Error('Supabase no está configurado (faltan variables de entorno).') };
  }
  return supabase.from('opiniones_tema').insert({
    tema,
    calificacion,
    aprendio_algo_nuevo: aprendioAlgoNuevo,
    contenidos_adecuados: contenidosAdecuados,
    nivel_favorito: nivelFavorito,
    comentario,
  });
}

export async function listarOpinionesTema() {
  if (!supabaseConfigurado) {
    return { data: [], error: new Error('Supabase no está configurado (faltan variables de entorno).') };
  }
  return supabase.from('opiniones_tema').select('*').order('creado_en', { ascending: false });
}

export async function enviarOpinionPlataforma({
  calificacion,
  experiencia,
  sugerencia,
  recomendacionRutas,
  leGustoElegir,
}) {
  if (!supabaseConfigurado) {
    return { error: new Error('Supabase no está configurado (faltan variables de entorno).') };
  }
  return supabase.from('opiniones_plataforma').insert({
    calificacion,
    experiencia,
    sugerencia,
    recomendacion_rutas: recomendacionRutas,
    le_gusto_elegir: leGustoElegir,
  });
}

export async function listarOpinionesPlataforma() {
  if (!supabaseConfigurado) {
    return { data: [], error: new Error('Supabase no está configurado (faltan variables de entorno).') };
  }
  return supabase.from('opiniones_plataforma').select('*').order('creado_en', { ascending: false });
}
