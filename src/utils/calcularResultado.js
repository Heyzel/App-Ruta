export function calcularResultado(quiz, respuestas) {
  const total = quiz.preguntas.length;
  const correctas = quiz.preguntas.reduce((acumulado, pregunta, indice) => {
    return respuestas[indice] === pregunta.respuestaCorrecta ? acumulado + 1 : acumulado;
  }, 0);

  const nota = Math.round(((correctas / total) * 20 + Number.EPSILON) * 100) / 100;
  const aprobado = nota > quiz.umbralAprobacion;

  return { nota, aprobado, correctas, total };
}
