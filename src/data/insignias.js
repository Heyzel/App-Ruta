import { TEMAS, DIFICULTADES } from './temas';

// Catálogo de recompensas de la ruta de aprendizaje. Cada tipo tiene su
// sprite en public/insignias/ y un total alcanzable que se deriva del
// catálogo de temas (no se escribe a mano: si se agrega un tema, los totales
// del contador se actualizan solos).
export const INSIGNIAS = {
  trofeo: {
    id: 'trofeo',
    sprite: '/insignias/trophy.png',
    nombre: 'Trofeo',
    alt: 'Trofeo de la ruta completa',
  },
  medalla: {
    id: 'medalla',
    sprite: '/insignias/medal.png',
    nombre: 'Medalla',
    alt: 'Medalla de tema completado',
  },
  estrella: {
    id: 'estrella',
    sprite: '/insignias/star.png',
    nombre: 'Estrella',
    alt: 'Estrella de nivel completado',
  },
};

// Orden en que se muestran en el contador: trofeo · medalla · estrella.
export const ORDEN_INSIGNIAS = ['trofeo', 'medalla', 'estrella'];

export const TOTAL_TROFEOS = 1;
export const TOTAL_MEDALLAS = TEMAS.length;
export const TOTAL_ESTRELLAS = TEMAS.length * DIFICULTADES.length;

export const TOTALES = {
  trofeo: TOTAL_TROFEOS,
  medalla: TOTAL_MEDALLAS,
  estrella: TOTAL_ESTRELLAS,
};

// Cuenta las recompensas a partir del progreso guardado (no se lleva un
// contador aparte): así los niveles exonerados por el examen de suficiencia
// también suman, y borrar el progreso reinicia el contador sin más.
export function contarInsignias(progreso) {
  const nivelesMarcados = progreso?.nivelesMarcados || {};
  const temasMarcados = progreso?.temasMarcados || [];

  const estrellas = TEMAS.reduce((total, tema) => {
    const niveles = nivelesMarcados[tema.id] || [];
    return total + niveles.filter((d) => DIFICULTADES.includes(d)).length;
  }, 0);

  const medallas = TEMAS.filter((tema) => temasMarcados.includes(tema.id)).length;

  return {
    estrella: estrellas,
    medalla: medallas,
    trofeo: medallas === TOTAL_MEDALLAS ? 1 : 0,
  };
}
