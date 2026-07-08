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
            <legend>
              {indicePregunta + 1}. {pregunta.enunciado}
            </legend>
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
