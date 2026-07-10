import { NOMBRE_DIFICULTAD } from '../data/temas';
import './Feedback.css';

export function Feedback({ tema, dificultad, resultado, siguiente, nombre, onIrSiguienteNivel, onVolverContenidos }) {
  const { nota, aprobado, correctas, total } = resultado;

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
    </div>
  );
}
