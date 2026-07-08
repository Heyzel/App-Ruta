import { supabase, supabaseConfigurado } from '../lib/supabase';

export async function guardarResultado({ nombre, tema, dificultad, nota, correctas, total, aprobado }) {
  if (!supabaseConfigurado) {
    return { error: new Error('Supabase no está configurado (faltan variables de entorno).') };
  }
  return supabase
    .from('resultados')
    .insert({ nombre, tema, dificultad, nota, correctas, total, aprobado });
}

export async function listarResultados() {
  if (!supabaseConfigurado) {
    return { data: [], error: new Error('Supabase no está configurado (faltan variables de entorno).') };
  }
  return supabase.from('resultados').select('*').order('creado_en', { ascending: false });
}
