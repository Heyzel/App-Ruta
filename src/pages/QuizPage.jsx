import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { obtenerTema, NOMBRE_DIFICULTAD, DIFICULTADES } from '../data/temas';
import { useProgreso } from '../context/ProgresoContext';
import { Quiz } from '../components/Quiz';
import { ModalNombre } from '../components/ModalNombre';
import { calcularResultado } from '../utils/calcularResultado';
import { obtenerCuestionario } from '../services/cuestionarios';
import { guardarResultado } from '../services/resultados';
import './QuizPage.css';

export function QuizPage() {
  const { temaId, dificultad } = useParams();
  const tema = obtenerTema(temaId);
  const { progreso, estaDesbloqueado, registrarResultado, setNombreUsuario } = useProgreso();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [pidiendoNombre, setPidiendoNombre] = useState(false);
  const [respuestasPendientes, setRespuestasPendientes] = useState(null);
  const [avisoGuardado, setAvisoGuardado] = useState(null);

  useEffect(() => {
    let cancelado = false;
    setCargando(true);
    obtenerCuestionario(temaId, dificultad).then((datos) => {
      if (!cancelado) {
        setQuiz(datos);
        setCargando(false);
      }
    });
    return () => {
      cancelado = true;
    };
  }, [temaId, dificultad]);

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

  async function procesarEnvio(respuestas, nombre) {
    const resultado = calcularResultado(quiz, respuestas);
    registrarResultado(temaId, dificultad, resultado);

    const { error } = await guardarResultado({
      nombre: nombre ?? progreso.nombreUsuario,
      tema: temaId,
      dificultad,
      ...resultado,
    });

    if (error) {
      setAvisoGuardado('No se pudo guardar el resultado en el servidor, pero tu progreso local se conservó.');
    }

    navigate(`/tema/${temaId}/${dificultad}/resultado`);
  }

  function manejarEnvio(respuestas) {
    if (!progreso.nombreUsuario) {
      setRespuestasPendientes(respuestas);
      setPidiendoNombre(true);
      return;
    }
    procesarEnvio(respuestas);
  }

  if (cargando) {
    return (
      <div className="pagina-quiz">
        <p>Cargando quiz…</p>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="pagina-quiz">
        <p>Aún no hay un quiz disponible para este nivel.</p>
        <Link to={`/tema/${temaId}/${dificultad}`}>Volver a los contenidos</Link>
      </div>
    );
  }

  return (
    <div className="pagina-quiz">
      <h1>
        Quiz · {tema.nombre} · {NOMBRE_DIFICULTAD[dificultad]}
      </h1>
      <p className="quiz-ayuda">Responde todas las preguntas y envía el formulario para ver tu resultado.</p>
      {avisoGuardado && <p className="quiz-aviso-error">{avisoGuardado}</p>}
      <Quiz quiz={quiz} onEnviar={manejarEnvio} />

      {pidiendoNombre && (
        <ModalNombre
          onGuardar={(nombre) => {
            setNombreUsuario(nombre);
            setPidiendoNombre(false);
            procesarEnvio(respuestasPendientes, nombre);
          }}
          onCancelar={() => setPidiendoNombre(false)}
        />
      )}
    </div>
  );
}
