import { useAudio } from '../context/AudioContext';
import './ControlAudio.css';

export function ControlAudio() {
  const { musicaActiva, toggleMusica } = useAudio();

  return (
    <button
      type="button"
      className={`control-audio${musicaActiva ? ' control-audio--activo' : ''}`}
      onClick={toggleMusica}
      aria-pressed={musicaActiva}
      title={musicaActiva ? 'Silenciar música' : 'Reproducir música de fondo'}
    >
      {musicaActiva ? '🎵' : '🔇'}
    </button>
  );
}
