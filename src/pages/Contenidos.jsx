import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { obtenerTema, NOMBRE_DIFICULTAD, DIFICULTADES } from '../data/temas';
import { obtenerContenidos } from '../services/contenidos';
import { useProgreso } from '../context/ProgresoContext';
import { BotonContenido } from '../components/BotonContenido';
import { ModalValoracionLori } from '../components/ModalValoracionLori';
import './Contenidos.css';

export function Contenidos() {
  const { temaId, dificultad } = useParams();
  const tema = obtenerTema(temaId);
  const {
    estaDesbloqueado,
    actualizarUbicacion,
    haEnviadoValoracionLori,
    marcarValoracionLoriEnviada,
  } = useProgreso();
  const [contenidos, setContenidos] = useState([]);
  const [cargandoContenidos, setCargandoContenidos] = useState(true);
  const [valoracionAbierta, setValoracionAbierta] = useState(false);

  const rutaActual = `/tema/${temaId}/${dificultad}`;

  useEffect(() => {
    if (tema && DIFICULTADES.includes(dificultad) && estaDesbloqueado(temaId, dificultad)) {
      actualizarUbicacion(rutaActual, temaId, dificultad);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [temaId, dificultad]);

  useEffect(() => {
    setCargandoContenidos(true);
    obtenerContenidos(temaId, dificultad).then((items) => {
      setContenidos(items);
      setCargandoContenidos(false);
    });
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

  const yaValorado = haEnviadoValoracionLori(temaId, dificultad);

  return (
    <div className="pagina-contenidos">
      <Link className="contenidos-volver" to={`/tema/${temaId}`}>
        ← Regresar a {tema.nombre}
      </Link>

      <h1>
        {tema.nombre} · {NOMBRE_DIFICULTAD[dificultad]}
      </h1>
      <p className="contenidos-ayuda">
        Revisa los siguientes contenidos y luego responde el quiz para avanzar de nivel.
        <br />
        Si consideras que ya tienes los conocimientos para responder el quiz, te invitamos a hacerlo y avanzar directamente al siguiente nivel.
      </p>

      <div className="lista-contenidos">
        {cargandoContenidos && <p>Cargando contenidos…</p>}
        {!cargandoContenidos && contenidos.length === 0 && (
          <p>Aún no hay contenidos cargados para este nivel.</p>
        )}
        {!cargandoContenidos &&
          contenidos.map((contenido, indice) => (
            <BotonContenido
              key={indice}
              contenido={contenido}
              temaId={temaId}
              dificultad={dificultad}
              indice={indice}
            />
          ))}
      </div>

      <div className="contenidos-acciones">
        <Link className="boton-responder-quiz" to={`/tema/${temaId}/${dificultad}/quiz`}>
          Responder quiz →
        </Link>

        {/* Cuestionario LORI sobre los contenidos del nivel: una sola
            valoración por tema + dificultad (ver ProgresoContext). */}
        {yaValorado ? (
          <button type="button" className="boton-valorar-contenidos boton-valorar-contenidos--enviada" disabled>
            ✓ ¡Gracias por calificar!
          </button>
        ) : (
          <button
            type="button"
            className="boton-valorar-contenidos"
            onClick={() => setValoracionAbierta(true)}
          >
            ★ Califica los contenidos
          </button>
        )}
      </div>

      {valoracionAbierta && (
        <ModalValoracionLori
          temaId={temaId}
          dificultad={dificultad}
          onCerrar={() => setValoracionAbierta(false)}
          onEnviada={() => {
            marcarValoracionLoriEnviada(temaId, dificultad);
            setValoracionAbierta(false);
          }}
        />
      )}
    </div>
  );
}
