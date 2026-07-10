// Contenidos por tema y dificultad. Cada ítem es un botón-link a un recurso externo.
// El campo `tipo` corresponde a una clave de TIPOS_CONTENIDO (ver src/data/tiposContenido.js).
export const CONTENIDOS = {
  variables: {
    principiante: [
      { nombre: '¿Qué es una variable?', descripcion: 'Introducción al concepto de variable en programación.', url: 'https://www.freecodecamp.org/news/variables-in-programming/', tipo: 'articulo' },
      { nombre: 'Declarar variables en JavaScript', descripcion: 'Sintaxis básica con var, let y const.', url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Grammar_and_types', tipo: 'documentacion' },
      { nombre: 'Nombres de variables', descripcion: 'Buenas prácticas para nombrar variables.', url: 'https://www.w3schools.com/js/js_variables.asp', tipo: 'guia' },
    ],
    intermedio: [
      { nombre: 'Ámbito de variables (scope)', descripcion: 'Diferencias entre ámbito global, de función y de bloque.', url: 'https://developer.mozilla.org/es/docs/Glossary/Scope', tipo: 'documentacion' },
      { nombre: 'let vs const vs var', descripcion: 'Comparación detallada y casos de uso.', url: 'https://www.freecodecamp.org/news/var-let-and-const-whats-the-difference/', tipo: 'articulo' },
      { nombre: 'Hoisting en JavaScript', descripcion: 'Cómo el motor de JS mueve las declaraciones.', url: 'https://developer.mozilla.org/es/docs/Glossary/Hoisting', tipo: 'documentacion' },
    ],
    avanzado: [
      { nombre: 'Closures y variables', descripcion: 'Cómo las funciones capturan variables de su entorno.', url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Closures', tipo: 'documentacion' },
      { nombre: 'Variables inmutables vs mutables', descripcion: 'Impacto en el diseño de programas robustos.', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Mutable', tipo: 'documentacion' },
    ],
  },

  'tipos-datos': {
    principiante: [
      { nombre: 'Tipos de datos primitivos', descripcion: 'Números, cadenas, booleanos, null y undefined.', url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Data_structures', tipo: 'documentacion' },
      { nombre: 'Cadenas de texto (strings)', descripcion: 'Creación y manipulación básica de texto.', url: 'https://www.w3schools.com/js/js_strings.asp', tipo: 'guia' },
      { nombre: 'Números y operaciones', descripcion: 'Operadores aritméticos y tipo Number.', url: 'https://www.w3schools.com/js/js_numbers.asp', tipo: 'guia' },
    ],
    intermedio: [
      { nombre: 'Conversión de tipos (type coercion)', descripcion: 'Conversión implícita y explícita entre tipos.', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion', tipo: 'documentacion' },
      { nombre: 'Objetos en JavaScript', descripcion: 'Estructura clave-valor y propiedades.', url: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Objects', tipo: 'documentacion' },
      { nombre: 'typeof y comparación de tipos', descripcion: 'Cómo verificar el tipo de un valor.', url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/typeof', tipo: 'documentacion' },
    ],
    avanzado: [
      { nombre: 'Tipado estático vs dinámico', descripcion: 'Comparación conceptual entre lenguajes.', url: 'https://www.freecodecamp.org/news/static-vs-dynamic-typing-in-programming-languages/', tipo: 'articulo' },
      { nombre: 'Estructuras de datos tipadas', descripcion: 'Introducción a TypeScript y tipos avanzados.', url: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html', tipo: 'documentacion' },
    ],
  },

  condicionales: {
    principiante: [
      { nombre: 'Sentencia if / else', descripcion: 'Tomar decisiones básicas en el código.', url: 'https://www.w3schools.com/js/js_if_else.asp', tipo: 'guia' },
      { nombre: 'Operadores de comparación', descripcion: '==, ===, >, <, y sus diferencias.', url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Comparison_operators', tipo: 'documentacion' },
      { nombre: 'Operadores lógicos', descripcion: 'AND, OR y NOT en condiciones.', url: 'https://www.w3schools.com/js/js_comparisons.asp', tipo: 'guia' },
      { nombre: 'Blockly Games: Pájaro', descripcion: 'Usa condicionales para guiar al pájaro hasta el gusano.', url: 'https://blockly.games/bird', tipo: 'juego', instrucciones: 'Guía al pájaro hasta el gusano y luego hasta su nido, evitando los obstáculos. Para lograrlo tendrás que usar condiciones (if / else) que decidan hacia dónde volar según el ángulo o lo que el pájaro detecta.\n\nObjetivo: completar cada nivel tomando la decisión correcta con la menor cantidad de condiciones posible. Es una forma visual de practicar la lógica condicional que luego usarás en C++.' },
    ],
    intermedio: [
      { nombre: 'Switch statement', descripcion: 'Alternativa a múltiples if/else encadenados.', url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/switch', tipo: 'documentacion' },
      { nombre: 'Operador ternario', descripcion: 'Condicionales en una sola línea.', url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Conditional_operator', tipo: 'documentacion' },
      { nombre: 'Condiciones anidadas', descripcion: 'Buenas prácticas para evitar código anidado excesivo.', url: 'https://www.freecodecamp.org/news/how-to-write-clean-conditionals/', tipo: 'articulo' },
    ],
    avanzado: [
      { nombre: 'Patrones de guard clauses', descripcion: 'Simplificar lógica condicional compleja.', url: 'https://www.freecodecamp.org/news/how-to-write-cleaner-code-with-guard-clauses/', tipo: 'articulo' },
      { nombre: 'Short-circuit evaluation', descripcion: 'Uso avanzado de && y || para control de flujo.', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators#short-circuit_evaluation', tipo: 'documentacion' },
    ],
  },

  bucles: {
    principiante: [
      { nombre: 'Bucle for', descripcion: 'Repetir instrucciones un número determinado de veces.', url: 'https://www.w3schools.com/js/js_loop_for.asp', tipo: 'guia' },
      { nombre: 'Bucle while', descripcion: 'Repetir mientras se cumpla una condición.', url: 'https://www.w3schools.com/js/js_loop_while.asp', tipo: 'guia' },
      { nombre: 'break y continue', descripcion: 'Control del flujo dentro de un bucle.', url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/break', tipo: 'documentacion' },
      { nombre: 'Blockly Games: Laberinto', descripcion: 'Resuelve laberintos aplicando bucles y repeticiones.', url: 'https://blockly.games/maze', tipo: 'juego', instrucciones: 'En este desafío controlarás a un personaje para que llegue a la meta de un laberinto. Deberás encadenar instrucciones y, sobre todo, usar bucles (bloques de "repetir") para evitar escribir el mismo paso muchas veces.\n\nObjetivo: alcanzar la meta en cada nivel usando la menor cantidad de bloques posible. Cuando veas que repites una acción, reemplázala por un bucle. ¡Piensa como un programador y automatiza lo repetitivo!' },
    ],
    intermedio: [
      { nombre: 'Bucle do-while', descripcion: 'Ejecutar al menos una vez antes de evaluar la condición.', url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/do...while', tipo: 'documentacion' },
      { nombre: 'for...of y for...in', descripcion: 'Iterar sobre arreglos y objetos.', url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/for...of', tipo: 'documentacion' },
      { nombre: 'Bucles anidados', descripcion: 'Recorrer estructuras multidimensionales.', url: 'https://www.freecodecamp.org/news/nested-loops-in-javascript/', tipo: 'articulo' },
    ],
    avanzado: [
      { nombre: 'Recursividad vs iteración', descripcion: 'Cuándo usar recursión en lugar de bucles.', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Recursion', tipo: 'documentacion' },
      { nombre: 'Complejidad de bucles', descripcion: 'Análisis de rendimiento en bucles anidados.', url: 'https://www.freecodecamp.org/news/big-o-notation-explained/', tipo: 'articulo' },
    ],
  },

  arreglos: {
    principiante: [
      { nombre: '¿Qué es un arreglo?', descripcion: 'Colecciones ordenadas de elementos.', url: 'https://www.w3schools.com/js/js_arrays.asp', tipo: 'guia' },
      { nombre: 'Acceder y modificar elementos', descripcion: 'Índices, longitud y asignación.', url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Indexed_collections', tipo: 'documentacion' },
      { nombre: 'Métodos básicos: push, pop', descripcion: 'Agregar y quitar elementos de un arreglo.', url: 'https://www.w3schools.com/jsref/jsref_push.asp', tipo: 'guia' },
    ],
    intermedio: [
      { nombre: 'map, filter y reduce', descripcion: 'Métodos funcionales para transformar arreglos.', url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map', tipo: 'documentacion' },
      { nombre: 'Ordenar arreglos', descripcion: 'Uso del método sort y comparadores.', url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/sort', tipo: 'documentacion' },
      { nombre: 'Arreglos multidimensionales', descripcion: 'Matrices y arreglos de arreglos.', url: 'https://www.freecodecamp.org/news/javascript-multidimensional-arrays/', tipo: 'articulo' },
    ],
    avanzado: [
      { nombre: 'Desestructuración de arreglos', descripcion: 'Sintaxis moderna para extraer valores.', url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment', tipo: 'documentacion' },
      { nombre: 'Complejidad algorítmica en arreglos', descripcion: 'Big O de búsqueda, inserción y ordenamiento.', url: 'https://www.freecodecamp.org/news/big-o-notation-why-it-matters-and-why-it-doesnt-1674cfa8a23c/', tipo: 'articulo' },
    ],
  },

  'estructuras-datos': {
    principiante: [
      { nombre: 'Introducción a estructuras de datos', descripcion: 'Por qué existen y para qué se usan.', url: 'https://www.freecodecamp.org/news/data-structures-101/', tipo: 'articulo' },
      { nombre: 'Pilas (Stacks)', descripcion: 'Estructura LIFO y sus operaciones.', url: 'https://www.freecodecamp.org/news/stack-data-structure/', tipo: 'articulo' },
      { nombre: 'Colas (Queues)', descripcion: 'Estructura FIFO y sus operaciones.', url: 'https://www.freecodecamp.org/news/queue-data-structure/', tipo: 'articulo' },
    ],
    intermedio: [
      { nombre: 'Listas enlazadas', descripcion: 'Nodos, punteros y recorrido de listas.', url: 'https://www.freecodecamp.org/news/linked-lists-in-javascript/', tipo: 'articulo' },
      { nombre: 'Tablas hash (Hash Maps)', descripcion: 'Almacenamiento clave-valor eficiente.', url: 'https://www.freecodecamp.org/news/hash-tables/', tipo: 'articulo' },
      { nombre: 'Conjuntos (Sets)', descripcion: 'Colecciones de valores únicos.', url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Set', tipo: 'documentacion' },
    ],
    avanzado: [
      { nombre: 'Árboles binarios', descripcion: 'Estructura jerárquica y recorridos.', url: 'https://www.freecodecamp.org/news/binary-search-trees/', tipo: 'articulo' },
      { nombre: 'Grafos', descripcion: 'Modelado de relaciones y algoritmos de recorrido.', url: 'https://www.freecodecamp.org/news/graph-data-structure/', tipo: 'articulo' },
    ],
  },

  funciones: {
    principiante: [
      { nombre: '¿Qué es una función?', descripcion: 'Bloques de código reutilizables.', url: 'https://www.w3schools.com/js/js_functions.asp', tipo: 'guia' },
      { nombre: 'Parámetros y argumentos', descripcion: 'Cómo pasar datos a una función.', url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Functions', tipo: 'documentacion' },
      { nombre: 'La instrucción return', descripcion: 'Devolver valores desde una función.', url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/return', tipo: 'documentacion' },
      { nombre: 'CodinGame: primeros retos', descripcion: 'Escribe código real (compatible con C++) para superar desafíos.', url: 'https://www.codingame.com/start', tipo: 'juego', instrucciones: 'CodinGame te permite resolver desafíos escribiendo código real en C++ (entre otros lenguajes). Comenzarás con el tutorial de introducción, donde completarás funciones que controlan a un personaje para superar obstáculos.\n\nObjetivo: leer el enunciado, completar la lógica dentro de la función y ejecutar para validar tu solución. Es la mejor forma de aplicar lo aprendido sobre funciones en problemas prácticos.' },
    ],
    intermedio: [
      { nombre: 'Funciones flecha (arrow functions)', descripcion: 'Sintaxis moderna y diferencias con function.', url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Functions/Arrow_functions', tipo: 'documentacion' },
      { nombre: 'Funciones como valores', descripcion: 'Funciones de primera clase y callbacks.', url: 'https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function', tipo: 'documentacion' },
      { nombre: 'Parámetros por defecto y rest', descripcion: 'Valores por defecto y ...args.', url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Functions/Default_parameters', tipo: 'documentacion' },
    ],
    avanzado: [
      { nombre: 'Funciones de orden superior', descripcion: 'Funciones que reciben o devuelven funciones.', url: 'https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function#higher-order_functions', tipo: 'documentacion' },
      { nombre: 'Recursividad', descripcion: 'Funciones que se llaman a sí mismas.', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Recursion', tipo: 'documentacion' },
    ],
  },

  poo: {
    principiante: [
      { nombre: '¿Qué es la POO?', descripcion: 'Conceptos básicos de la programación orientada a objetos.', url: 'https://www.freecodecamp.org/news/object-oriented-programming-concepts-21bb035f7260/', tipo: 'articulo' },
      { nombre: 'Clases y objetos', descripcion: 'Definición de clases y creación de instancias.', url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Classes', tipo: 'documentacion' },
      { nombre: 'Constructores', descripcion: 'Inicializar objetos con el método constructor.', url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Classes/constructor', tipo: 'documentacion' },
    ],
    intermedio: [
      { nombre: 'Encapsulamiento', descripcion: 'Propiedades y métodos privados.', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_properties', tipo: 'documentacion' },
      { nombre: 'Herencia', descripcion: 'Extender clases con extends y super.', url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Classes/extends', tipo: 'documentacion' },
      { nombre: 'Getters y setters', descripcion: 'Controlar el acceso a propiedades.', url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Functions/get', tipo: 'documentacion' },
    ],
    avanzado: [
      { nombre: 'Polimorfismo', descripcion: 'Sobrescritura de métodos entre clases.', url: 'https://www.freecodecamp.org/news/object-oriented-programming-concepts-21bb035f7260/#polymorphism', tipo: 'articulo' },
      { nombre: 'Interfaces y abstracción', descripcion: 'Diseño de contratos entre clases.', url: 'https://www.freecodecamp.org/news/object-oriented-programming-concepts-21bb035f7260/#abstraction', tipo: 'articulo' },
    ],
  },
};
