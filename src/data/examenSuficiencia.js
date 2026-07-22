// Examen de suficiencia: 1 pregunta por dificultad y por tema (excluye el Tema 0).
// Estructura: EXAMEN_SUFICIENCIA[temaId][dificultad] = pregunta.
// Los tipos y el formato de cada pregunta son idénticos a los de src/data/quizzes.js,
// de modo que se pueden calificar con esCorrecta() y renderizar con <Quiz />.
export const EXAMEN_SUFICIENCIA = {
  variables: {
    principiante: { tipo: 'verdadero-falso', enunciado: 'En C++, una variable declarada con const debe inicializarse en el momento de su declaración.', respuestaCorrecta: true },
    intermedio: { tipo: 'seleccion-simple', enunciado: '¿Qué palabra clave permite al compilador deducir el tipo a partir del inicializador (C++11+)?', opciones: ['auto', 'var', 'let', 'dynamic'], respuestaCorrecta: 0 },
    avanzado: { tipo: 'numerica', enunciado: '¿Cuál es el valor final de la variable x?', codigo: 'int x = 5;\nx += 3;\nx *= 2;', respuestaCorrecta: 16, tolerancia: 0 },
  },
  'tipos-datos': {
    principiante: { tipo: 'seleccion-simple', enunciado: '¿Qué tipo de dato se usa para almacenar un solo carácter en C++?', opciones: ['char', 'string', 'int', 'bool'], respuestaCorrecta: 0 },
    intermedio: { tipo: 'seleccion-simple', enunciado: '¿Qué resultado produce 7 / 2 cuando ambos operandos son int en C++?', opciones: ['3', '3.5', '4', '2'], respuestaCorrecta: 0 },
    avanzado: { tipo: 'verdadero-falso', enunciado: 'En C++, el desbordamiento (overflow) de un entero con signo produce comportamiento indefinido.', respuestaCorrecta: true },
  },
  condicionales: {
    principiante: { tipo: 'seleccion-simple', enunciado: '¿Qué operador representa "igualdad" en una comparación en C++?', opciones: ['=', '==', '=>', ':='], respuestaCorrecta: 1 },
    intermedio: { tipo: 'seleccion-simple', enunciado: '¿Qué imprime cout en: int x = 5; cout << (x > 3 ? "A" : "B");?', opciones: ['A', 'B', '5', 'Error de compilación'], respuestaCorrecta: 0 },
    avanzado: { tipo: 'numerica', enunciado: '¿Qué valor final tiene la variable y?', codigo: 'int x = 8;\nint y;\nif (x % 2 == 0) y = x * 2;\nelse y = x + 1;', respuestaCorrecta: 16, tolerancia: 0 },
  },
  bucles: {
    principiante: { tipo: 'seleccion-simple', enunciado: '¿Cuántas veces se ejecuta el cuerpo? for (int i = 0; i < 3; i++)', opciones: ['2', '3', '4', 'Infinitas'], respuestaCorrecta: 1 },
    intermedio: { tipo: 'verdadero-falso', enunciado: 'El bucle do-while en C++ ejecuta su cuerpo al menos una vez antes de evaluar la condición.', respuestaCorrecta: true },
    avanzado: { tipo: 'numerica', enunciado: '¿Cuál es el valor final de suma tras ejecutar el bucle?', codigo: 'int suma = 0;\nfor (int i = 1; i <= 5; i++) {\n    suma += i;\n}', respuestaCorrecta: 15, tolerancia: 0 },
  },
  arreglos: {
    principiante: { tipo: 'seleccion-simple', enunciado: '¿Qué índice se usa para acceder al primer elemento de arr?', opciones: ['arr[1]', 'arr[0]', 'arr(0)', 'arr.first'], respuestaCorrecta: 1 },
    intermedio: { tipo: 'seleccion-simple', enunciado: '¿Qué método agrega un elemento al final de un std::vector?', opciones: ['push_back()', 'add()', 'append()', 'insert_last()'], respuestaCorrecta: 0 },
    avanzado: { tipo: 'seleccion-simple', enunciado: '¿Qué complejidad tiene la búsqueda binaria en un arreglo ORDENADO de n elementos?', opciones: ['O(log n)', 'O(n)', 'O(1)', 'O(n²)'], respuestaCorrecta: 0 },
  },
  'estructuras-datos': {
    principiante: { tipo: 'seleccion-simple', enunciado: '¿Qué principio sigue una pila (stack)?', opciones: ['LIFO (último en entrar, primero en salir)', 'FIFO (primero en entrar, primero en salir)', 'Orden aleatorio', 'Orden alfabético'], respuestaCorrecta: 0 },
    intermedio: { tipo: 'seleccion-simple', enunciado: '¿Qué contenedor de C++ almacena pares clave-valor con claves únicas y ordenadas?', opciones: ['std::map', 'std::vector', 'std::stack', 'std::array'], respuestaCorrecta: 0 },
    avanzado: { tipo: 'numerica', enunciado: 'Una pila vacía recibe estas operaciones. ¿Qué valor queda en el tope (top) al final?', codigo: 'std::stack<int> s;\ns.push(3);\ns.push(7);\ns.push(9);\ns.pop();\n// s.top() = ?', respuestaCorrecta: 7, tolerancia: 0 },
  },
  funciones: {
    principiante: { tipo: 'seleccion-simple', enunciado: '¿Qué tipo de retorno indica que una función no devuelve valor?', opciones: ['void', 'null', 'empty', 'none'], respuestaCorrecta: 0 },
    intermedio: { tipo: 'seleccion-simple', enunciado: '¿Qué permite la sobrecarga de funciones (function overloading) en C++?', opciones: ['Definir varias funciones con el mismo nombre pero distintos parámetros', 'Cambiar el tipo de una variable', 'Ejecutar bucles infinitos', 'Eliminar funciones'], respuestaCorrecta: 0 },
    avanzado: { tipo: 'numerica', enunciado: 'Dada la función recursiva, ¿qué valor devuelve factorial(4)?', codigo: 'int factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}\n// factorial(4) = ?', respuestaCorrecta: 24, tolerancia: 0 },
  },
  poo: {
    principiante: { tipo: 'seleccion-simple', enunciado: '¿Con qué palabra clave se define una clase en C++?', opciones: ['class', 'object', 'define', 'type'], respuestaCorrecta: 0 },
    intermedio: { tipo: 'seleccion-simple', enunciado: '¿Cómo se hereda públicamente de una clase Base en C++?', opciones: ['class Derivada : public Base', 'class Derivada extends Base', 'class Derivada inherits Base', 'class Derivada -> Base'], respuestaCorrecta: 0 },
    avanzado: { tipo: 'seleccion-simple', enunciado: '¿Qué es una función virtual pura en C++?', opciones: ['Una función declarada con = 0 que las clases derivadas deben implementar', 'Una función que no recibe parámetros', 'Una función global', 'Un constructor especial'], respuestaCorrecta: 0 },
  },
};

// Aplana el examen a una lista ordenada por tema y dificultad, conservando
// metadatos (tema, dificultad) en cada pregunta para poder calificar por tema.
// El orden resultante agrupa las 3 preguntas de cada tema, de fácil a difícil.
export function preguntasExamenPlanas() {
  const orden = ['principiante', 'intermedio', 'avanzado'];
  const lista = [];
  Object.entries(EXAMEN_SUFICIENCIA).forEach(([tema, porDificultad]) => {
    orden.forEach((dificultad) => {
      lista.push({ tema, dificultad, ...porDificultad[dificultad] });
    });
  });
  return lista;
}
