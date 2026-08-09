import { useEffect, useRef } from 'react';
import { NOMBRE_DIFICULTAD } from '../data/temas';
import { useAudio } from '../context/AudioContext';
import './Feedback.css';

export function Feedback({
  tema,
  dificultad,
  resultado,
  siguiente,
  nombre,
  onIrSiguienteNivel,
  onVolverContenidos,
  onVolverTema,
}) {
  const { nota, aprobado, correctas, total } = resultado;
  const { playSfx } = useAudio();
  const yaSonoRef = useRef(false);

  useEffect(() => {
    // El ref evita que StrictMode duplique el sonido en desarrollo.
    if (aprobado && !yaSonoRef.current) {
      yaSonoRef.current = true;
      playSfx('exito');
    }
  }, [aprobado, playSfx]);

  return (
    <div className={`feedback ${aprobado ? 'feedback-aprobado' : 'feedback-reprobado'}`}>
      <h2>{aprobado ? '¡Felicidades!' : 'Sigue practicando'}</h2>
      <p className="feedback-nota">
        {nombre ? `${nombre}, obtuviste` : 'Obtuviste'} <strong>{nota}/20</strong> ({correctas} de {total}{' '}
        correctas) en{' '}
        <strong>
          {tema.nombre} · {NOMBRE_DIFICULTAD[dificultad]}
        </strong>
        .
      </p>

      {aprobado && siguiente && (
        <>
          <p>Puedes avanzar al nivel <strong>{NOMBRE_DIFICULTAD[siguiente]}</strong>.</p>
          <button onClick={onIrSiguienteNivel}>Ir a {NOMBRE_DIFICULTAD[siguiente]} →</button>
        </>
      )}

      {aprobado && !siguiente && <p>¡Completaste todos los niveles de este tema!</p>}

      {!aprobado && (
        <>
          <p>Te recomendamos volver a repasar los contenidos de este nivel antes de continuar.</p>
          <button onClick={onVolverContenidos}>Volver a los contenidos</button>
        </>
      )}

      <button className="feedback-boton-secundario" onClick={onVolverTema}>
        Regresar a {tema.nombre}
      </button>
    </div>
  );
}
