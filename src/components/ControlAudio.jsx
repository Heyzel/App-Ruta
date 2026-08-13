import { useLocation } from 'react-router-dom';
import { useAudio } from '../context/AudioContext';
import './ControlAudio.css';

// Botón de silenciar/reproducir + popover de volumen. Se usa tanto en el
// widget flotante global de aquí abajo como, en vista de teléfono, dentro de
// la cartelera de temas junto al botón de examen de suficiencia (ver
// Inicio.jsx) — ambos leen el mismo AudioContext, así que quedan en sync.
export function BotonAudio({ className = '' }) {
  const { musicaActiva, volumen, toggleMusica, setVolumen } = useAudio();
  const porcentaje = Math.round(volumen * 100);

  return (
    <div className={`control-audio-envoltura ${className}`.trim()}>
      <button
        type="button"
        className={`control-audio${musicaActiva ? ' control-audio--activo' : ''}`}
        onClick={toggleMusica}
        aria-pressed={musicaActiva}
        title={musicaActiva ? 'Silenciar música' : 'Reproducir música de fondo'}
      >
        {musicaActiva ? '🔊' : '🔇'}
      </button>

      <div className="control-audio-volumen" role="group" aria-label="Volumen de la música">
        <input
          type="range"
          min="0"
          max="100"
          value={porcentaje}
          onChange={(evento) => setVolumen(Number(evento.target.value) / 100)}
          aria-label="Volumen de la música"
        />
        <span className="control-audio-volumen-valor">{porcentaje}%</span>
      </div>
    </div>
  );
}

export function ControlAudio() {
  const location = useLocation();

  // Se oculta en la pantalla de bienvenida.
  if (location.pathname === '/') return null;

  // En la cartelera de temas, vista de teléfono, este widget flotante se
  // oculta: Inicio.jsx muestra una copia in-line junto al botón de examen de
  // suficiencia (ver .control-audio-envoltura--fila en ControlAudio.css).
  const enCartelera = location.pathname === '/temas';

  return <BotonAudio className={enCartelera ? 'control-audio-envoltura--cartelera' : ''} />;
}
