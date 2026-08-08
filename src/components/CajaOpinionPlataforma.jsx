import { useState } from 'react';
import { useProgreso } from '../context/ProgresoContext';
import { enviarOpinionPlataforma } from '../services/opiniones';
import { EstrellasRating } from './EstrellasRating';
import './CajaOpinion.css';

const OPCIONES_RECOMENDACION = [
  { valor: 'comenzando', etiqueta: 'A quienes están comenzando' },
  { valor: 'con_experiencia', etiqueta: 'Solo a quienes ya tienen conocimientos previos' },
  { valor: 'ambos', etiqueta: 'A ambos' },
  { valor: 'ninguno', etiqueta: 'A ninguno' },
];

export function CajaOpinionPlataforma({ puedeOpinar }) {
  const { progreso, marcarOpinionPlataformaEnviada } = useProgreso();
  const [abierto, setAbierto] = useState(false);
  const [calificacion, setCalificacion] = useState(0);
  const [experiencia, setExperiencia] = useState('');
  const [sugerencia, setSugerencia] = useState('');
  const [recomendacionRutas, setRecomendacionRutas] = useState('');
  const [leGustoElegir, setLeGustoElegir] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');

  const yaEnviada = progreso.opinionPlataformaEnviada;

  if (yaEnviada) {
    return (
      <button
        type="button"
        className="caja-opinion-boton caja-opinion-boton-enviada"
        disabled
        title="Ya enviaste tu opinión sobre la plataforma. ¡Gracias!"
      >
        ✓ ¡Gracias por tu opinión!
      </button>
    );
  }

  if (!puedeOpinar) {
    return (
      <div className="caja-opinion-tooltip-envoltura">
        <button type="button" className="caja-opinion-boton caja-opinion-boton-bloqueada" disabled>
          🔒 Danos tu opinión
        </button>
        <span className="caja-opinion-tooltip" role="tooltip">
          Bloqueado hasta haber superado 1 nivel en cada tema
        </span>
      </div>
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
    const { error: errorEnvio } = await enviarOpinionPlataforma({
      calificacion,
      experiencia: experiencia.trim(),
      sugerencia: sugerencia.trim(),
      recomendacionRutas: recomendacionRutas || null,
      leGustoElegir: leGustoElegir === 'si',
    });
    setEnviando(false);
    if (errorEnvio) {
      setError('No se pudo enviar tu opinión. Intenta de nuevo.');
      return;
    }
    marcarOpinionPlataformaEnviada();
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
        <div className="caja-opinion-panel" role="dialog" aria-label="Danos tu opinión sobre la plataforma">
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
              Ya recorriste varios temas. Cuéntanos qué te pareció la experiencia general con la
              plataforma.
            </p>

            <fieldset className="caja-opinion-campo">
              <legend>¿Qué te pareció la experiencia?</legend>
              <textarea
                className="caja-opinion-textarea"
                placeholder="Destruye nuestro ego"
                value={experiencia}
                onChange={(evento) => setExperiencia(evento.target.value)}
                maxLength={1000}
              />
            </fieldset>

            <fieldset className="caja-opinion-campo">
              <legend>¿Tienes alguna sugerencia de mejora?</legend>
              <textarea
                className="caja-opinion-textarea"
                placeholder="¿Qué cambiarías?"
                value={sugerencia}
                onChange={(evento) => setSugerencia(evento.target.value)}
                maxLength={1000}
              />
            </fieldset>

            <fieldset className="caja-opinion-campo">
              <legend>
                ¿Recomendarías usar rutas personalizadas a alguien que está comenzando, o solo a
                quienes ya tienen conocimientos previos?
              </legend>
              {OPCIONES_RECOMENDACION.map((opcion) => (
                <label key={opcion.valor}>
                  <input
                    type="radio"
                    name="recomendacion-rutas"
                    checked={recomendacionRutas === opcion.valor}
                    onChange={() => setRecomendacionRutas(opcion.valor)}
                  />
                  {opcion.etiqueta}
                </label>
              ))}
            </fieldset>

            <fieldset className="caja-opinion-campo">
              <legend>¿Te gustó poder elegir tú mismo los temas y contenidos didácticos?</legend>
              <label>
                <input
                  type="radio"
                  name="le-gusto-elegir"
                  checked={leGustoElegir === 'si'}
                  onChange={() => setLeGustoElegir('si')}
                />
                Sí
              </label>
              <label>
                <input
                  type="radio"
                  name="le-gusto-elegir"
                  checked={leGustoElegir === 'no'}
                  onChange={() => setLeGustoElegir('no')}
                />
                No
              </label>
            </fieldset>

            <EstrellasRating
              nombre="calificacion-plataforma"
              valor={calificacion}
              onCambiar={setCalificacion}
            />

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
