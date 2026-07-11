export const TEMAS = [
  {
    id: 'propedeutico-aritmetica',
    nombre: 'Propedéutico de aritmética',
    descripcion:
      'Repaso de aritmética de educación primaria y secundaria: operaciones, fracciones, potencias y más. Tema 0 opcional para reforzar las bases antes de programar.',
    // Tema 0: los tres niveles están desbloqueados desde el inicio y los
    // cuestionarios no tienen umbral de aprobación (son de práctica).
    desbloqueadoCompleto: true,
    sinUmbral: true,
  },
  {
    id: 'variables',
    nombre: 'Variables',
    descripcion: 'Declaración, asignación y ámbito de variables en programación.',
  },
  {
    id: 'tipos-datos',
    nombre: 'Tipos de datos',
    descripcion: 'Números, cadenas, booleanos y otros tipos primitivos y compuestos.',
  },
  {
    id: 'condicionales',
    nombre: 'Condicionales',
    descripcion: 'Toma de decisiones con if, else y switch.',
  },
  {
    id: 'bucles',
    nombre: 'Bucles',
    descripcion: 'Repetición de instrucciones con for, while y do-while.',
  },
  {
    id: 'arreglos',
    nombre: 'Arreglos',
    descripcion: 'Colecciones ordenadas de datos y sus operaciones básicas.',
  },
  {
    id: 'estructuras-datos',
    nombre: 'Estructuras de datos',
    descripcion: 'Pilas, colas, listas enlazadas y otras formas de organizar datos.',
  },
  {
    id: 'funciones',
    nombre: 'Funciones',
    descripcion: 'Bloques de código reutilizables, parámetros y valores de retorno.',
  },
  {
    id: 'poo',
    nombre: 'Programación orientada a objetos',
    descripcion: 'Clases, objetos, herencia, encapsulamiento y polimorfismo.',
  },
];

export const DIFICULTADES = ['principiante', 'intermedio', 'avanzado'];

export const NOMBRE_DIFICULTAD = {
  principiante: 'Principiante',
  intermedio: 'Intermedio',
  avanzado: 'Avanzado',
};

export function obtenerTema(temaId) {
  return TEMAS.find((tema) => tema.id === temaId);
}

// Indica si un tema debe tener todos sus niveles desbloqueados desde el inicio.
export function esTemaDesbloqueadoCompleto(temaId) {
  return Boolean(obtenerTema(temaId)?.desbloqueadoCompleto);
}

// Indica si los cuestionarios de un tema no tienen umbral de aprobación
// (se aprueban siempre; sirven solo como práctica).
export function esTemaSinUmbral(temaId) {
  return Boolean(obtenerTema(temaId)?.sinUmbral);
}

export function siguienteDificultad(dificultad) {
  const indice = DIFICULTADES.indexOf(dificultad);
  if (indice === -1 || indice === DIFICULTADES.length - 1) return null;
  return DIFICULTADES[indice + 1];
}
