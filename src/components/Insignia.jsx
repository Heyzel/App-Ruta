import { INSIGNIAS } from '../data/insignias';
import './Insignia.css';

// Sprite de una recompensa (estrella, medalla o trofeo). Se usa en tres
// sitios: el contador de la esquina, la insignia fija junto a los botones de
// completado y el sprite que vuela en CapaRecompensas.
export function Insignia({ tipo, tamano = 26, className = '', titulo, style, ...resto }) {
  const insignia = INSIGNIAS[tipo];
  if (!insignia) return null;

  return (
    <img
      src={insignia.sprite}
      alt={insignia.alt}
      title={titulo ?? insignia.nombre}
      width={tamano}
      height={tamano}
      className={`insignia ${className}`.trim()}
      style={{ width: `${tamano}px`, height: `${tamano}px`, ...style }}
      draggable={false}
      {...resto}
    />
  );
}
