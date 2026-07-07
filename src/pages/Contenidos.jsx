import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { obtenerTema, NOMBRE_DIFICULTAD, DIFICULTADES } from '../data/temas';
import { CONTENIDOS } from '../data/contenidos';
import { useProgreso } from '../context/ProgresoContext';
import { BotonContenido } from '../components/BotonContenido';
import './Contenidos.css';

export function Contenidos() {
  const { temaId, dificultad } = useParams();
  const tema = obtenerTema(temaId);
  const { estaDesbloqueado, actualizarUbicacion } = useProgreso();

  const rutaActual = `/tema/${temaId}/${dificultad}`;

  useEffect(() => {
    if (tema && DIFICULTADES.includes(dificultad) && estaDesbloqueado(temaId, dificultad)) {
      actualizarUbicacion(rutaActual, temaId, dificultad);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [temaId, dificultad]);

  if (!tema || !DIFICULTADES.includes(dificultad)) {
    return (
      <div className="pagina-contenidos">
        <p>Contenido no encontrado.</p>
        <Link to="/">Volver al inicio</Link>
      </div>
    );
  }

  if (!estaDesbloqueado(temaId, dificultad)) {
    return <Navigate to={`/tema/${temaId}`} replace />;
  }

  const contenidos = CONTENIDOS[temaId]?.[dificultad] ?? [];

  return (
    <div className="pagina-contenidos">
      <h1>
        {tema.nombre} · {NOMBRE_DIFICULTAD[dificultad]}
      </h1>
      <p className="contenidos-ayuda">
        Revisa los siguientes contenidos y luego responde el quiz para avanzar de nivel.
      </p>

      <div className="lista-contenidos">
        {contenidos.length === 0 && <p>Aún no hay contenidos cargados para este nivel.</p>}
        {contenidos.map((contenido) => (
          <BotonContenido key={contenido.url} contenido={contenido} />
        ))}
      </div>

      <Link className="boton-responder-quiz" to={`/tema/${temaId}/${dificultad}/quiz`}>
        Responder quiz →
      </Link>
    </div>
  );
}
