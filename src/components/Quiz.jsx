import { useState } from 'react';
import { PreguntaSeleccionSimple } from './preguntas/PreguntaSeleccionSimple';
import { PreguntaSeleccionMultiple } from './preguntas/PreguntaSeleccionMultiple';
import { PreguntaVerdaderoFalso } from './preguntas/PreguntaVerdaderoFalso';
import { PreguntaNumerica } from './preguntas/PreguntaNumerica';
import { PreguntaPareo } from './preguntas/PreguntaPareo';
import './Quiz.css';

const COMPONENTES_POR_TIPO = {
  'seleccion-simple': PreguntaSeleccionSimple,
  'seleccion-multiple': PreguntaSeleccionMultiple,
  'verdadero-falso': PreguntaVerdaderoFalso,
  numerica: PreguntaNumerica,
  pareo: PreguntaPareo,
};

const ETIQUETAS_TIPO = {
  'verdadero-falso': 'Verdadero o falso',
  'seleccion-simple': 'Selección simple',
  'seleccion-multiple': 'Selección múltiple',
  numerica: 'Respuesta numérica',
  pareo: 'Pareo',
};

const DESCRIPCIONES_TIPO = {
  'verdadero-falso': 'Escoge verdadero o falso.',
  'seleccion-simple': 'Escoge solo 1 respuesta correcta.',
  'seleccion-multiple': 'Escoge todas las respuestas que consideres correctas.',
  numerica: 'Analiza la pregunta y responde con un número.',
  pareo: 'Escoge el par que se ajusta para cada caso.',
};

function valorInicialPara(pregunta) {
  const tipo = pregunta.tipo || 'seleccion-simple';
  if (tipo === 'seleccion-multiple') return [];
  if (tipo === 'pareo') return Array(pregunta.izquierda.length).fill(null);
  return null;
}

function estaRespondida(pregunta, valor) {
  const tipo = pregunta.tipo || 'seleccion-simple';
  const Componente = COMPONENTES_POR_TIPO[tipo];
  return Componente.estaRespondida(valor, pregunta);
}

export function Quiz({ quiz, onEnviar }) {
  const [respuestas, setRespuestas] = useState(() => quiz.preguntas.map(valorInicialPara));

  const todasRespondidas = quiz.preguntas.every((pregunta, indice) =>
    estaRespondida(pregunta, respuestas[indice])
  );

  function actualizarRespuesta(indicePregunta, nuevoValor) {
    setRespuestas((prev) => {
      const nuevas = [...prev];
      nuevas[indicePregunta] = nuevoValor;
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
      {quiz.preguntas.map((pregunta, indicePregunta) => {
        const tipo = pregunta.tipo || 'seleccion-simple';
        const ComponentePregunta = COMPONENTES_POR_TIPO[tipo];
        return (
          <fieldset key={indicePregunta} className="quiz-pregunta">
            <legend className="quiz-pregunta-legend">
              <span className="quiz-pregunta-enunciado">
                {indicePregunta + 1}. {pregunta.enunciado}
              </span>
              <span className="quiz-pregunta-tipo">
                <span className="quiz-pregunta-tipo-etiqueta">{ETIQUETAS_TIPO[tipo]}</span>
                <span className="quiz-pregunta-tipo-info" tabIndex={0}>
                  <span className="quiz-pregunta-tipo-info-icono" aria-hidden="true">
                    ℹ️
                  </span>
                  <span className="quiz-pregunta-tipo-info-tooltip" role="tooltip">
                    {DESCRIPCIONES_TIPO[tipo]}
                  </span>
                </span>
              </span>
            </legend>
            {pregunta.codigo && (
              <pre className="quiz-codigo">
                <code>{pregunta.codigo}</code>
              </pre>
            )}
            <ComponentePregunta
              pregunta={pregunta}
              valor={respuestas[indicePregunta]}
              onChange={(nuevoValor) => actualizarRespuesta(indicePregunta, nuevoValor)}
            />
          </fieldset>
        );
      })}
      <button type="submit" className="quiz-enviar" disabled={!todasRespondidas}>
        Enviar respuestas
      </button>
    </form>
  );
}
