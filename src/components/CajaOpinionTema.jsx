import { useState } from 'react';
import { DIFICULTADES, NOMBRE_DIFICULTAD } from '../data/temas';
import { useProgreso } from '../context/ProgresoContext';
import { enviarOpinionTema } from '../services/opiniones';
import { EstrellasRating } from './EstrellasRating';
import './CajaOpinion.css';

export function CajaOpinionTema({ temaId }) {
  const { haEnviadoOpinionTema, marcarOpinionTemaEnviada } = useProgreso();
  const [abierto, setAbierto] = useState(false);
  const [calificacion, setCalificacion] = useState(0);
  const [aprendioAlgoNuevo, setAprendioAlgoNuevo] = useState('');
  const [contenidosAdecuados, setContenidosAdecuados] = useState('');
  const [nivelFavorito, setNivelFavorito] = useState('');
  const [comentario, setComentario] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');

  const yaEnviada = haEnviadoOpinionTema(temaId);

  if (yaEnviada) {
    return (
      <button
        type="button"
        className="caja-opinion-boton caja-opinion-boton-enviada"
        disabled
        title="Ya enviaste tu opinión sobre este tema. ¡Gracias!"
      >
        ✓ ¡Gracias por tu opinión!
      </button>
    );
  }

  async function manejarEnvio(evento) {
    evento.preventDefault();
    if (!calificacion) {
      setError('Elige una calificación antes de enviar.');
      return;
    }
    setEnviando(true);
    setError('');
    const { error: errorEnvio } = await enviarOpinionTema({
      tema: temaId,
      calificacion,
      aprendioAlgoNuevo: aprendioAlgoNuevo === 'si',
      contenidosAdecuados: contenidosAdecuados === 'si',
      nivelFavorito: nivelFavorito || null,
      comentario: comentario.trim(),
    });
    setEnviando(false);
    if (errorEnvio) {
      setError('No se pudo enviar tu opinión. Intenta de nuevo.');
      return;
    }
    marcarOpinionTemaEnviada(temaId);
    setAbierto(false);
  }

  return (
    <>
      {!abierto && (
        <button type="button" className="caja-opinion-boton" onClick={() => setAbierto(true)}>
          💬 Danos tu opinión
        </button>
      )}

      {abierto && (
        <div className="caja-opinion-panel" role="dialog" aria-label="Danos tu opinión sobre este tema">
          <header className="caja-opinion-encabezado">
            <h2>Danos tu opinión</h2>
            <button
              type="button"
              className="caja-opinion-cerrar"
              onClick={() => setAbierto(false)}
              aria-label="Cerrar"
            >
              ✕
            </button>
          </header>

          <form className="caja-opinion-cuerpo" onSubmit={manejarEnvio}>
            <p className="caja-opinion-descripcion">
              Ya recorriste este tema: cuéntanos cómo fue tu experiencia. Tus respuestas nos ayudan
              a mejorar los niveles para los próximos estudiantes.
            </p>

            <fieldset className="caja-opinion-campo">
              <legend>¿Aprendiste algo nuevo?</legend>
              <label>
                <input
                  type="radio"
                  name="aprendio-algo-nuevo"
                  checked={aprendioAlgoNuevo === 'si'}
                  onChange={() => setAprendioAlgoNuevo('si')}
                />
                Sí
              </label>
              <label>
                <input
                  type="radio"
                  name="aprendio-algo-nuevo"
                  checked={aprendioAlgoNuevo === 'no'}
                  onChange={() => setAprendioAlgoNuevo('no')}
                />
                No
              </label>
            </fieldset>

            <fieldset className="caja-opinion-campo">
              <legend>¿Los contenidos y recursos te parecieron adecuados?</legend>
              <label>
                <input
                  type="radio"
                  name="contenidos-adecuados"
                  checked={contenidosAdecuados === 'si'}
                  onChange={() => setContenidosAdecuados('si')}
                />
                Sí
              </label>
              <label>
                <input
                  type="radio"
                  name="contenidos-adecuados"
                  checked={contenidosAdecuados === 'no'}
                  onChange={() => setContenidosAdecuados('no')}
                />
                No
              </label>
            </fieldset>

            <fieldset className="caja-opinion-campo">
              <legend>¿Cuál fue el nivel que te gustó más?</legend>
              {DIFICULTADES.map((dificultad) => (
                <label key={dificultad}>
                  <input
                    type="radio"
                    name="nivel-favorito"
                    checked={nivelFavorito === dificultad}
                    onChange={() => setNivelFavorito(dificultad)}
                  />
                  {NOMBRE_DIFICULTAD[dificultad]}
                </label>
              ))}
            </fieldset>

            <textarea
              className="caja-opinion-textarea"
              placeholder="Destruye nuestro ego"
              value={comentario}
              onChange={(evento) => setComentario(evento.target.value)}
              maxLength={1000}
            />

            <EstrellasRating nombre="calificacion-tema" valor={calificacion} onCambiar={setCalificacion} />

            {error && <p className="caja-opinion-error">{error}</p>}

            <button type="submit" className="caja-opinion-enviar" disabled={enviando}>
              {enviando ? 'Enviando…' : 'Enviar opinión'}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
