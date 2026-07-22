import { DIFICULTADES, siguienteDificultad } from '../data/temas';

const ORDEN = { principiante: 0, intermedio: 1, avanzado: 2 };

function menor(a, b) {
  return ORDEN[a] <= ORDEN[b] ? a : b;
}

// correcto: { principiante: boolean, intermedio: boolean, avanzado: boolean }
// Devuelve el arreglo de niveles desbloqueados para un tema, según la regla del examen:
// aprobar un nivel exonera ese nivel y habilita el siguiente, pero fallar la pregunta
// fácil impide saltar más de un nivel aunque se acierten las difíciles.
export function nivelesDesbloqueadosTema(correcto) {
  const correctas = DIFICULTADES.filter((d) => correcto[d]); // ordenadas fácil→difícil
  const fallos = DIFICULTADES.filter((d) => !correcto[d]);

  const mejorCorrecta = correctas.length ? correctas[correctas.length - 1] : null;
  const primerFallo = fallos.length ? fallos[0] : null;

  const techo = mejorCorrecta ? (siguienteDificultad(mejorCorrecta) ?? 'avanzado') : 'principiante';
  const cap = primerFallo ? (siguienteDificultad(primerFallo) ?? 'avanzado') : 'avanzado';

  const nivelFinal = menor(techo, cap);
  return DIFICULTADES.filter((d) => ORDEN[d] <= ORDEN[nivelFinal]);
}
