import { supabase, supabaseConfigurado } from '../lib/supabase';
import { CONTENIDOS } from '../data/contenidos';

function contenidosDesdeJson(tema, dificultad) {
  return CONTENIDOS[tema]?.[dificultad] ?? [];
}

function filaAContenidos(fila) {
  return {
    id: fila.id,
    tema: fila.tema,
    dificultad: fila.dificultad,
    items: fila.items || [],
  };
}

export async function obtenerContenidos(tema, dificultad) {
  if (!supabaseConfigurado) {
    return contenidosDesdeJson(tema, dificultad);
  }

  const { data, error } = await supabase
    .from('contenidos')
    .select('*')
    .eq('tema', tema)
    .eq('dificultad', dificultad)
    .maybeSingle();

  if (error || !data) {
    return contenidosDesdeJson(tema, dificultad);
  }

  return data.items || [];
}

export async function listarContenidos() {
  if (!supabaseConfigurado) {
    return { data: [], error: new Error('Supabase no está configurado.') };
  }
  const { data, error } = await supabase
    .from('contenidos')
    .select('*')
    .order('tema')
    .order('dificultad');

  return { data: (data || []).map(filaAContenidos), error };
}

export async function guardarContenidos({ tema, dificultad, items }) {
  if (!supabaseConfigurado) {
    return { error: new Error('Supabase no está configurado.') };
  }
  return supabase.from('contenidos').upsert(
    {
      tema,
      dificultad,
      items,
    },
    { onConflict: 'tema,dificultad' }
  );
}

export async function eliminarContenidos(id) {
  if (!supabaseConfigurado) {
    return { error: new Error('Supabase no está configurado.') };
  }
  return supabase.from('contenidos').delete().eq('id', id);
}
