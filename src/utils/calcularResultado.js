import { esTemaSinUmbral } from '../data/temas';

function esCorrecta(pregunta, respuesta) {
  const tipo = pregunta.tipo || 'seleccion-simple';

  switch (tipo) {
    case 'seleccion-simple':
    case 'verdadero-falso':
      return respuesta === pregunta.respuestaCorrecta;

    case 'numerica':
      return (
        respuesta !== null &&
        respuesta !== undefined &&
        respuesta !== '' &&
        Math.abs(Number(respuesta) - Number(pregunta.respuestaCorrecta)) <= (pregunta.tolerancia ?? 0)
      );

    case 'seleccion-multiple': {
      const sel = [...(respuesta || [])].sort((a, b) => a - b);
      const cor = [...(pregunta.respuestasCorrectas || [])].sort((a, b) => a - b);
      return sel.length === cor.length && sel.every((v, i) => v === cor[i]);
    }

    case 'pareo':
      return (
        Array.isArray(respuesta) &&
        Array.isArray(pregunta.correspondencias) &&
        pregunta.correspondencias.length === respuesta.length &&
        pregunta.correspondencias.every((r, i) => respuesta[i] === r)
      );

    default:
      return false;
  }
}

export function calcularResultado(quiz, respuestas) {
  const total = quiz.preguntas.length;
  const correctas = quiz.preguntas.reduce((acumulado, pregunta, indice) => {
    return esCorrecta(pregunta, respuestas[indice]) ? acumulado + 1 : acumulado;
  }, 0);

  const nota = Math.round(((correctas / total) * 20 + Number.EPSILON) * 100) / 100;
  // Los temas sin umbral (p. ej. el tema 0 propedéutico) no reprueban: son
  // cuestionarios de práctica y siempre se consideran aprobados.
  const aprobado = esTemaSinUmbral(quiz.tema) ? true : nota > quiz.umbralAprobacion;

  return { nota, aprobado, correctas, total };
}

export { esCorrecta };
