// Contenidos por tema y dificultad. Cada ítem es un botón-link a un recurso externo.
export const CONTENIDOS = {
  variables: {
    principiante: [
      { nombre: '¿Qué es una variable?', descripcion: 'Introducción al concepto de variable en programación.', url: 'https://www.freecodecamp.org/news/variables-in-programming/' },
      { nombre: 'Declarar variables en JavaScript', descripcion: 'Sintaxis básica con var, let y const.', url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Grammar_and_types' },
      { nombre: 'Nombres de variables', descripcion: 'Buenas prácticas para nombrar variables.', url: 'https://www.w3schools.com/js/js_variables.asp' },
    ],
    intermedio: [
      { nombre: 'Ámbito de variables (scope)', descripcion: 'Diferencias entre ámbito global, de función y de bloque.', url: 'https://developer.mozilla.org/es/docs/Glossary/Scope' },
      { nombre: 'let vs const vs var', descripcion: 'Comparación detallada y casos de uso.', url: 'https://www.freecodecamp.org/news/var-let-and-const-whats-the-difference/' },
      { nombre: 'Hoisting en JavaScript', descripcion: 'Cómo el motor de JS mueve las declaraciones.', url: 'https://developer.mozilla.org/es/docs/Glossary/Hoisting' },
    ],
    avanzado: [
      { nombre: 'Closures y variables', descripcion: 'Cómo las funciones capturan variables de su entorno.', url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Closures' },
      { nombre: 'Variables inmutables vs mutables', descripcion: 'Impacto en el diseño de programas robustos.', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Mutable' },
    ],
  },

  'tipos-datos': {
    principiante: [
      { nombre: 'Tipos de datos primitivos', descripcion: 'Números, cadenas, booleanos, null y undefined.', url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Data_structures' },
      { nombre: 'Cadenas de texto (strings)', descripcion: 'Creación y manipulación básica de texto.', url: 'https://www.w3schools.com/js/js_strings.asp' },
      { nombre: 'Números y operaciones', descripcion: 'Operadores aritméticos y tipo Number.', url: 'https://www.w3schools.com/js/js_numbers.asp' },
    ],
    intermedio: [
      { nombre: 'Conversión de tipos (type coercion)', descripcion: 'Conversión implícita y explícita entre tipos.', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion' },
      { nombre: 'Objetos en JavaScript', descripcion: 'Estructura clave-valor y propiedades.', url: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Objects' },
      { nombre: 'typeof y comparación de tipos', descripcion: 'Cómo verificar el tipo de un valor.', url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/typeof' },
    ],
    avanzado: [
      { nombre: 'Tipado estático vs dinámico', descripcion: 'Comparación conceptual entre lenguajes.', url: 'https://www.freecodecamp.org/news/static-vs-dynamic-typing-in-programming-languages/' },
      { nombre: 'Estructuras de datos tipadas', descripcion: 'Introducción a TypeScript y tipos avanzados.', url: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html' },
    ],
  },

  condicionales: {
    principiante: [
      { nombre: 'Sentencia if / else', descripcion: 'Tomar decisiones básicas en el código.', url: 'https://www.w3schools.com/js/js_if_else.asp' },
      { nombre: 'Operadores de comparación', descripcion: '==, ===, >, <, y sus diferencias.', url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Comparison_operators' },
      { nombre: 'Operadores lógicos', descripcion: 'AND, OR y NOT en condiciones.', url: 'https://www.w3schools.com/js/js_comparisons.asp' },
    ],
    intermedio: [
      { nombre: 'Switch statement', descripcion: 'Alternativa a múltiples if/else encadenados.', url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/switch' },
      { nombre: 'Operador ternario', descripcion: 'Condicionales en una sola línea.', url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Conditional_operator' },
      { nombre: 'Condiciones anidadas', descripcion: 'Buenas prácticas para evitar código anidado excesivo.', url: 'https://www.freecodecamp.org/news/how-to-write-clean-conditionals/' },
    ],
    avanzado: [
      { nombre: 'Patrones de guard clauses', descripcion: 'Simplificar lógica condicional compleja.', url: 'https://www.freecodecamp.org/news/how-to-write-cleaner-code-with-guard-clauses/' },
      { nombre: 'Short-circuit evaluation', descripcion: 'Uso avanzado de && y || para control de flujo.', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators#short-circuit_evaluation' },
    ],
  },

  bucles: {
    principiante: [
      { nombre: 'Bucle for', descripcion: 'Repetir instrucciones un número determinado de veces.', url: 'https://www.w3schools.com/js/js_loop_for.asp' },
      { nombre: 'Bucle while', descripcion: 'Repetir mientras se cumpla una condición.', url: 'https://www.w3schools.com/js/js_loop_while.asp' },
      { nombre: 'break y continue', descripcion: 'Control del flujo dentro de un bucle.', url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/break' },
    ],
    intermedio: [
      { nombre: 'Bucle do-while', descripcion: 'Ejecutar al menos una vez antes de evaluar la condición.', url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/do...while' },
      { nombre: 'for...of y for...in', descripcion: 'Iterar sobre arreglos y objetos.', url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/for...of' },
      { nombre: 'Bucles anidados', descripcion: 'Recorrer estructuras multidimensionales.', url: 'https://www.freecodecamp.org/news/nested-loops-in-javascript/' },
    ],
    avanzado: [
      { nombre: 'Recursividad vs iteración', descripcion: 'Cuándo usar recursión en lugar de bucles.', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Recursion' },
      { nombre: 'Complejidad de bucles', descripcion: 'Análisis de rendimiento en bucles anidados.', url: 'https://www.freecodecamp.org/news/big-o-notation-explained/' },
    ],
  },

  arreglos: {
    principiante: [
      { nombre: '¿Qué es un arreglo?', descripcion: 'Colecciones ordenadas de elementos.', url: 'https://www.w3schools.com/js/js_arrays.asp' },
      { nombre: 'Acceder y modificar elementos', descripcion: 'Índices, longitud y asignación.', url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Indexed_collections' },
      { nombre: 'Métodos básicos: push, pop', descripcion: 'Agregar y quitar elementos de un arreglo.', url: 'https://www.w3schools.com/jsref/jsref_push.asp' },
    ],
    intermedio: [
      { nombre: 'map, filter y reduce', descripcion: 'Métodos funcionales para transformar arreglos.', url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map' },
      { nombre: 'Ordenar arreglos', descripcion: 'Uso del método sort y comparadores.', url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/sort' },
      { nombre: 'Arreglos multidimensionales', descripcion: 'Matrices y arreglos de arreglos.', url: 'https://www.freecodecamp.org/news/javascript-multidimensional-arrays/' },
    ],
    avanzado: [
      { nombre: 'Desestructuración de arreglos', descripcion: 'Sintaxis moderna para extraer valores.', url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment' },
      { nombre: 'Complejidad algorítmica en arreglos', descripcion: 'Big O de búsqueda, inserción y ordenamiento.', url: 'https://www.freecodecamp.org/news/big-o-notation-why-it-matters-and-why-it-doesnt-1674cfa8a23c/' },
    ],
  },

  'estructuras-datos': {
    principiante: [
      { nombre: 'Introducción a estructuras de datos', descripcion: 'Por qué existen y para qué se usan.', url: 'https://www.freecodecamp.org/news/data-structures-101/' },
      { nombre: 'Pilas (Stacks)', descripcion: 'Estructura LIFO y sus operaciones.', url: 'https://www.freecodecamp.org/news/stack-data-structure/' },
      { nombre: 'Colas (Queues)', descripcion: 'Estructura FIFO y sus operaciones.', url: 'https://www.freecodecamp.org/news/queue-data-structure/' },
    ],
    intermedio: [
      { nombre: 'Listas enlazadas', descripcion: 'Nodos, punteros y recorrido de listas.', url: 'https://www.freecodecamp.org/news/linked-lists-in-javascript/' },
      { nombre: 'Tablas hash (Hash Maps)', descripcion: 'Almacenamiento clave-valor eficiente.', url: 'https://www.freecodecamp.org/news/hash-tables/' },
      { nombre: 'Conjuntos (Sets)', descripcion: 'Colecciones de valores únicos.', url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Set' },
    ],
    avanzado: [
      { nombre: 'Árboles binarios', descripcion: 'Estructura jerárquica y recorridos.', url: 'https://www.freecodecamp.org/news/binary-search-trees/' },
      { nombre: 'Grafos', descripcion: 'Modelado de relaciones y algoritmos de recorrido.', url: 'https://www.freecodecamp.org/news/graph-data-structure/' },
    ],
  },

  funciones: {
    principiante: [
      { nombre: '¿Qué es una función?', descripcion: 'Bloques de código reutilizables.', url: 'https://www.w3schools.com/js/js_functions.asp' },
      { nombre: 'Parámetros y argumentos', descripcion: 'Cómo pasar datos a una función.', url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Functions' },
      { nombre: 'La instrucción return', descripcion: 'Devolver valores desde una función.', url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/return' },
    ],
    intermedio: [
      { nombre: 'Funciones flecha (arrow functions)', descripcion: 'Sintaxis moderna y diferencias con function.', url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Functions/Arrow_functions' },
      { nombre: 'Funciones como valores', descripcion: 'Funciones de primera clase y callbacks.', url: 'https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function' },
      { nombre: 'Parámetros por defecto y rest', descripcion: 'Valores por defecto y ...args.', url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Functions/Default_parameters' },
    ],
    avanzado: [
      { nombre: 'Funciones de orden superior', descripcion: 'Funciones que reciben o devuelven funciones.', url: 'https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function#higher-order_functions' },
      { nombre: 'Recursividad', descripcion: 'Funciones que se llaman a sí mismas.', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Recursion' },
    ],
  },

  poo: {
    principiante: [
      { nombre: '¿Qué es la POO?', descripcion: 'Conceptos básicos de la programación orientada a objetos.', url: 'https://www.freecodecamp.org/news/object-oriented-programming-concepts-21bb035f7260/' },
      { nombre: 'Clases y objetos', descripcion: 'Definición de clases y creación de instancias.', url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Classes' },
      { nombre: 'Constructores', descripcion: 'Inicializar objetos con el método constructor.', url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Classes/constructor' },
    ],
    intermedio: [
      { nombre: 'Encapsulamiento', descripcion: 'Propiedades y métodos privados.', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_properties' },
      { nombre: 'Herencia', descripcion: 'Extender clases con extends y super.', url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Classes/extends' },
      { nombre: 'Getters y setters', descripcion: 'Controlar el acceso a propiedades.', url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Functions/get' },
    ],
    avanzado: [
      { nombre: 'Polimorfismo', descripcion: 'Sobrescritura de métodos entre clases.', url: 'https://www.freecodecamp.org/news/object-oriented-programming-concepts-21bb035f7260/#polymorphism' },
      { nombre: 'Interfaces y abstracción', descripcion: 'Diseño de contratos entre clases.', url: 'https://www.freecodecamp.org/news/object-oriented-programming-concepts-21bb035f7260/#abstraction' },
    ],
  },
};
