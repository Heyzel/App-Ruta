import { useState } from 'react';
import './Quiz.css';

export function Quiz({ quiz, onEnviar }) {
  const [respuestas, setRespuestas] = useState(() => Array(quiz.preguntas.length).fill(null));

  const todasRespondidas = respuestas.every((respuesta) => respuesta !== null);

  function seleccionarOpcion(indicePregunta, indiceOpcion) {
    setRespuestas((prev) => {
      const nuevas = [...prev];
      nuevas[indicePregunta] = indiceOpcion;
      return nuevas;
    });
  }

  function manejarEnvio(evento) {
    evento.preventDefault();
    if (!todasRespondidas) return;
    onEnviar(respuestas);
  }

  return (
    <form className="quiz" onSubmit={manejarEnvio}>
      {quiz.preguntas.map((pregunta, indicePregunta) => (
        <fieldset key={indicePregunta} className="quiz-pregunta">
          <legend>
            {indicePregunta + 1}. {pregunta.enunciado}
          </legend>
          {pregunta.opciones.map((opcion, indiceOpcion) => (
            <label key={indiceOpcion} className="quiz-opcion">
              <input
                type="radio"
                name={`pregunta-${indicePregunta}`}
                checked={respuestas[indicePregunta] === indiceOpcion}
                onChange={() => seleccionarOpcion(indicePregunta, indiceOpcion)}
              />
              {opcion}
            </label>
          ))}
        </fieldset>
      ))}
      <button type="submit" className="quiz-enviar" disabled={!todasRespondidas}>
        Enviar respuestas
      </button>
    </form>
  );
}
