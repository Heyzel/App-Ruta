import { supabase, supabaseConfigurado } from '../lib/supabase';

// Valoración de los contenidos de un nivel según el modelo LORI (Learning
// Object Review Instrument). Cada ítem corresponde a una dimensión LORI y se
// puntúa de 1 a 5; ver la tabla `valoraciones_lori` en scripts/esquema.sql.
export async function enviarValoracionLori({
  tema,
  dificultad,
  calidadContenido,
  alineacionObjetivos,
  motivacion,
  disenoPresentacion,
  interaccionUsabilidad,
  comentario,
}) {
  if (!supabaseConfigurado) {
    return { error: new Error('Supabase no está configurado (faltan variables de entorno).') };
  }
  return supabase.from('valoraciones_lori').insert({
    tema,
    dificultad,
    calidad_contenido: calidadContenido,
    alineacion_objetivos: alineacionObjetivos,
    motivacion,
    diseno_presentacion: disenoPresentacion,
    interaccion_usabilidad: interaccionUsabilidad,
    comentario,
  });
}

export async function listarValoracionesLori() {
  if (!supabaseConfigurado) {
    return { data: [], error: new Error('Supabase no está configurado (faltan variables de entorno).') };
  }
  return supabase.from('valoraciones_lori').select('*').order('creado_en', { ascending: false });
}
