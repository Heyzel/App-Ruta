import { useState } from 'react';
import { enviarValoracionLori } from '../services/valoracionesLori';
import './ModalValoracionLori.css';

// Cinco ítems tomados del modelo LORI (Learning Object Review Instrument),
// redactados lo más breves posible para que el estudiante pueda responder en
// menos de un minuto. `ayuda` es la dimensión original del instrumento.
const PREGUNTAS = [
  {
    clave: 'calidadContenido',
    etiqueta: '¿El contenido fue claro y correcto?',
    ayuda: 'Calidad del contenido',
  },
  {
    clave: 'alineacionObjetivos',
    etiqueta: '¿Te sirvió para lo que debías aprender en este nivel?',
    ayuda: 'Alineación con el objetivo de aprendizaje',
  },
  {
    clave: 'motivacion',
    etiqueta: '¿Te mantuvo con interés y ganas de seguir?',
    ayuda: 'Motivación',
  },
  {
    clave: 'disenoPresentacion',
    etiqueta: '¿Se veía y se escuchaba bien (textos, imágenes, audio)?',
    ayuda: 'Diseño de la presentación',
  },
  {
    clave: 'interaccionUsabilidad',
    etiqueta: '¿Fue fácil de usar y navegar?',
    ayuda: 'Interacción y usabilidad',
  },
];

// `null` = todavía sin responder; 1-5 = puntuación; NO_APLICA = el estudiante
// eligió N/A (se envía como null a Supabase, ver manejarEnvio).
const NO_APLICA = 'na';

const PUNTAJES = [1, 2, 3, 4, 5];

const RESPUESTAS_VACIAS = {
  calidadContenido: null,
  alineacionObjetivos: null,
  motivacion: null,
  disenoPresentacion: null,
  interaccionUsabilidad: null,
};

function EscalaLori({ nombre, etiqueta, valor, onCambiar }) {
  return (
    <fieldset className="escala-lori">
      <legend>{etiqueta}</legend>
      <div className="escala-lori-opciones">
        {PUNTAJES.map((puntaje) => (
          <label
            key={puntaje}
            className={`escala-lori-opcion${valor === puntaje ? ' escala-lori-opcion--activa' : ''}`}
            title={`${puntaje} de 5`}
          >
            <input
              type="radio"
              name={nombre}
              value={puntaje}
              checked={valor === puntaje}
              onChange={() => onCambiar(puntaje)}
            />
            {puntaje}
          </label>
        ))}
        <label
          className={`escala-lori-opcion escala-lori-opcion--na${
            valor === NO_APLICA ? ' escala-lori-opcion--activa' : ''
          }`}
          title="No aplica"
        >
          <input
            type="radio"
            name={nombre}
            value={NO_APLICA}
            checked={valor === NO_APLICA}
            onChange={() => onCambiar(NO_APLICA)}
          />
          N/A
        </label>
      </div>
    </fieldset>
  );
}

export function ModalValoracionLori({ temaId, dificultad, onCerrar, onEnviada }) {
  const [respuestas, setRespuestas] = useState(RESPUESTAS_VACIAS);
  const [comentario, setComentario] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');

  function responder(clave, valor) {
    setRespuestas((prev) => ({ ...prev, [clave]: valor }));
  }

  async function manejarEnvio(evento) {
    evento.preventDefault();
    if (PREGUNTAS.some(({ clave }) => respuestas[clave] === null)) {
      setError('Responde las 5 preguntas antes de enviar (puedes elegir N/A).');
      return;
    }
    setEnviando(true);
    setError('');
    // N/A viaja como null: la tabla `valoraciones_lori` admite null en los
    // puntajes justamente para distinguir "no aplica" de una nota baja.
    const puntajes = Object.fromEntries(
      PREGUNTAS.map(({ clave }) => [clave, respuestas[clave] === NO_APLICA ? null : respuestas[clave]])
    );
    const { error: errorEnvio } = await enviarValoracionLori({
      tema: temaId,
      dificultad,
      ...puntajes,
      comentario: comentario.trim(),
    });
    setEnviando(false);
    if (errorEnvio) {
      setError('No se pudo enviar tu valoración. Intenta de nuevo.');
      return;
    }
    onEnviada();
  }

  return (
    <div
      className="modal-lori-overlay"
      role="presentation"
      onClick={(evento) => {
        if (evento.target === evento.currentTarget) onCerrar();
      }}
    >
      <form
        className="modal-lori"
        role="dialog"
        aria-modal="true"
        aria-label="Califica los contenidos de este nivel"
        onSubmit={manejarEnvio}
      >
        <header className="modal-lori-encabezado">
          <h2>Califica los contenidos</h2>
          <button type="button" className="modal-lori-cerrar" onClick={onCerrar} aria-label="Cerrar">
            ✕
          </button>
        </header>

        <p className="modal-lori-descripcion">
          Cinco preguntas rápidas sobre los contenidos de este nivel. Puntúa cada una del 1 (muy
          deficiente) al 5 (excelente), o elige N/A si esa pregunta no aplica a lo que viste aquí.
        </p>

        <div className="modal-lori-preguntas">
          {PREGUNTAS.map(({ clave, etiqueta, ayuda }, indice) => (
            <div className="modal-lori-pregunta" key={clave}>
              <EscalaLori
                nombre={`lori-${clave}`}
                etiqueta={`${indice + 1}. ${etiqueta}`}
                valor={respuestas[clave]}
                onCambiar={(valor) => responder(clave, valor)}
              />
              <span className="modal-lori-dimension">{ayuda}</span>
            </div>
          ))}
        </div>

        <textarea
          className="modal-lori-textarea"
          placeholder="¿Algo que mejorarías? (opcional)"
          value={comentario}
          onChange={(evento) => setComentario(evento.target.value)}
          maxLength={1000}
        />

        {error && <p className="modal-lori-error">{error}</p>}

        <button type="submit" className="modal-lori-enviar" disabled={enviando}>
          {enviando ? 'Enviando…' : 'Responder'}
        </button>
      </form>
    </div>
  );
}
