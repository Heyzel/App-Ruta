import { useAudio } from '../context/AudioContext';
import './ControlAudio.css';

export function ControlAudio() {
  const { musicaActiva, volumen, toggleMusica, setVolumen } = useAudio();
  const porcentaje = Math.round(volumen * 100);

  return (
    <div className="control-audio-envoltura">
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
