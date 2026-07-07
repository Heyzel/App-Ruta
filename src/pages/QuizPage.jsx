import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { obtenerTema, NOMBRE_DIFICULTAD, DIFICULTADES } from '../data/temas';
import { QUIZZES } from '../data/quizzes';
import { useProgreso } from '../context/ProgresoContext';
import { Quiz } from '../components/Quiz';
import { calcularResultado } from '../utils/calcularResultado';
import './QuizPage.css';

export function QuizPage() {
  const { temaId, dificultad } = useParams();
  const tema = obtenerTema(temaId);
  const { estaDesbloqueado, registrarResultado } = useProgreso();
  const navigate = useNavigate();

  if (!tema || !DIFICULTADES.includes(dificultad)) {
    return (
      <div className="pagina-quiz">
        <p>Quiz no encontrado.</p>
        <Link to="/">Volver al inicio</Link>
      </div>
    );
  }

  if (!estaDesbloqueado(temaId, dificultad)) {
    return <Navigate to={`/tema/${temaId}`} replace />;
  }

  const quiz = QUIZZES[temaId]?.[dificultad];

  if (!quiz) {
    return (
      <div className="pagina-quiz">
        <p>Aún no hay un quiz disponible para este nivel.</p>
        <Link to={`/tema/${temaId}/${dificultad}`}>Volver a los contenidos</Link>
      </div>
    );
  }

  function manejarEnvio(respuestas) {
    const resultado = calcularResultado(quiz, respuestas);
    registrarResultado(temaId, dificultad, resultado);
    navigate(`/tema/${temaId}/${dificultad}/resultado`);
  }

  return (
    <div className="pagina-quiz">
      <h1>
        Quiz · {tema.nombre} · {NOMBRE_DIFICULTAD[dificultad]}
      </h1>
      <p className="quiz-ayuda">Responde todas las preguntas y envía el formulario para ver tu resultado.</p>
      <Quiz quiz={quiz} onEnviar={manejarEnvio} />
    </div>
  );
}
