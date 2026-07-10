import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { obtenerTema, siguienteDificultad, DIFICULTADES } from '../data/temas';
import { useProgreso } from '../context/ProgresoContext';
import { Feedback } from '../components/Feedback';
import './Resultado.css';

export function Resultado() {
  const { temaId, dificultad } = useParams();
  const tema = obtenerTema(temaId);
  const { progreso, obtenerResultado } = useProgreso();
  const navigate = useNavigate();

  if (!tema || !DIFICULTADES.includes(dificultad)) {
    return (
      <div className="pagina-resultado">
        <p>Resultado no encontrado.</p>
        <Link to="/">Volver al inicio</Link>
      </div>
    );
  }

  const resultado = obtenerResultado(temaId, dificultad);

  if (!resultado) {
    return <Navigate to={`/tema/${temaId}/${dificultad}/quiz`} replace />;
  }

  const siguiente = siguienteDificultad(dificultad);

  return (
    <div className="pagina-resultado">
      <Feedback
        tema={tema}
        dificultad={dificultad}
        resultado={resultado}
        siguiente={siguiente}
        nombre={progreso.nombreUsuario}
        onIrSiguienteNivel={() => navigate(`/tema/${temaId}/${siguiente}`)}
        onVolverContenidos={() => navigate(`/tema/${temaId}/${dificultad}`)}
      />
    </div>
  );
}
