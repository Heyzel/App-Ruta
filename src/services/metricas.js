import { supabase, supabaseConfigurado } from '../lib/supabase';

// Registra que un estudiante consultó un contenido. Es "best effort":
// si Supabase no está configurado o falla, no interrumpe la navegación.
export async function registrarConsultaContenido({ nombre, tema, dificultad, contenido, tipo }) {
  if (!supabaseConfigurado || !nombre) return { error: null };
  return supabase
    .from('consultas_contenido')
    .insert({ nombre, tema, dificultad, contenido, tipo });
}

export async function listarConsultas() {
  if (!supabaseConfigurado) {
    return { data: [], error: new Error('Supabase no está configurado.') };
  }
  return supabase.from('consultas_contenido').select('*').order('creado_en', { ascending: false });
}

// Agrega resultados de cuestionarios y consultas de contenido en métricas por
// estudiante (agrupadas por nombre). Devuelve un arreglo listo para mostrar en
// una tabla, ordenado por última actividad.
export function agregarMetricasPorEstudiante(resultados = [], consultas = []) {
  const porEstudiante = new Map();

  function obtener(nombre) {
    if (!porEstudiante.has(nombre)) {
      porEstudiante.set(nombre, {
        nombre,
        intentos: 0,
        cuestionariosUnicos: new Set(),
        sumaNotas: 0,
        mejorNota: 0,
        aprobados: 0,
        contenidosConsultados: 0,
        ultimaActividad: null,
      });
    }
    return porEstudiante.get(nombre);
  }

  function marcarActividad(estudiante, fecha) {
    if (!fecha) return;
    const t = new Date(fecha).getTime();
    if (!estudiante.ultimaActividad || t > new Date(estudiante.ultimaActividad).getTime()) {
      estudiante.ultimaActividad = fecha;
    }
  }

  for (const r of resultados) {
    if (!r.nombre) continue;
    const est = obtener(r.nombre);
    est.intentos += 1;
    est.cuestionariosUnicos.add(`${r.tema}:${r.dificultad}`);
    est.sumaNotas += Number(r.nota) || 0;
    est.mejorNota = Math.max(est.mejorNota, Number(r.nota) || 0);
    if (r.aprobado) est.aprobados += 1;
    marcarActividad(est, r.creado_en);
  }

  for (const c of consultas) {
    if (!c.nombre) continue;
    const est = obtener(c.nombre);
    est.contenidosConsultados += 1;
    marcarActividad(est, c.creado_en);
  }

  return Array.from(porEstudiante.values())
    .map((est) => {
      const unicos = est.cuestionariosUnicos.size;
      return {
        nombre: est.nombre,
        intentos: est.intentos,
        cuestionariosUnicos: unicos,
        // Repeticiones: intentos que exceden el primer intento de cada cuestionario.
        repeticiones: Math.max(0, est.intentos - unicos),
        notaPromedio: est.intentos > 0 ? Math.round((est.sumaNotas / est.intentos) * 100) / 100 : 0,
        mejorNota: est.mejorNota,
        aprobados: est.aprobados,
        contenidosConsultados: est.contenidosConsultados,
        ultimaActividad: est.ultimaActividad,
      };
    })
    .sort((a, b) => {
      const ta = a.ultimaActividad ? new Date(a.ultimaActividad).getTime() : 0;
      const tb = b.ultimaActividad ? new Date(b.ultimaActividad).getTime() : 0;
      return tb - ta;
    });
}
