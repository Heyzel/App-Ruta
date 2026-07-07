export const TEMAS = [
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

export function siguienteDificultad(dificultad) {
  const indice = DIFICULTADES.indexOf(dificultad);
  if (indice === -1 || indice === DIFICULTADES.length - 1) return null;
  return DIFICULTADES[indice + 1];
}
