import { supabase, supabaseConfigurado } from '../lib/supabase';

// Best effort: si no hay Supabase o no hay nombre, no interrumpe el flujo del examen.
export async function guardarResultadoExamen({ nombre, nota, correctas, total, detalle }) {
  if (!supabaseConfigurado || !nombre) return { error: null };
  return supabase
    .from('resultados_examen')
    .insert({ nombre, nota, correctas, total, detalle });
}

export async function listarResultadosExamen() {
  if (!supabaseConfigurado) {
    return { data: [], error: new Error('Supabase no está configurado.') };
  }
  return supabase.from('resultados_examen').select('*').order('creado_en', { ascending: false });
}
