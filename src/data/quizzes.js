// Quices por tema y dificultad. Umbral de aprobación en escala 0-20.
export const QUIZZES = {
  variables: {
    principiante: {
      umbralAprobacion: 15,
      preguntas: [
        { enunciado: '¿Cuál es la forma correcta de declarar una variable en JavaScript?', opciones: ['let x = 1;', 'variable x = 1;', 'x := 1;', 'declare x = 1;'], respuestaCorrecta: 0 },
        { enunciado: '¿Qué palabra clave permite reasignar el valor de una variable?', opciones: ['const', 'let', 'final', 'fixed'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué ocurre si intentas reasignar una variable declarada con const?', opciones: ['Se reasigna sin problema', 'Se produce un error', 'Se convierte en let', 'Se ignora silenciosamente'], respuestaCorrecta: 1 },
        { enunciado: '¿Cuál de estos es un nombre de variable válido?', opciones: ['2valor', 'valor-2', 'valor2', 'valor 2'], respuestaCorrecta: 2 },
        { enunciado: '¿Qué es una variable en programación?', opciones: ['Un tipo de bucle', 'Un espacio para almacenar un valor', 'Una función', 'Un operador'], respuestaCorrecta: 1 },
      ],
    },
    intermedio: {
      umbralAprobacion: 15,
      preguntas: [
        { enunciado: '¿Qué característica distingue a let de var?', opciones: ['let tiene ámbito de bloque, var de función', 'let no puede usarse en bucles', 'var es más moderno', 'No hay diferencia'], respuestaCorrecta: 0 },
        { enunciado: '¿Qué es el "hoisting"?', opciones: ['Un error de sintaxis', 'El movimiento de declaraciones al inicio del ámbito', 'Una forma de eliminar variables', 'Un tipo de bucle'], respuestaCorrecta: 1 },
        { enunciado: '¿Las variables declaradas con var respetan el ámbito de bloque?', opciones: ['Sí, siempre', 'No, solo el de función', 'Solo dentro de un if', 'Solo en modo estricto'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué sucede al acceder a una variable let antes de su declaración?', opciones: ['Devuelve undefined', 'Error de referencia (temporal dead zone)', 'Devuelve null', 'Funciona normalmente'], respuestaCorrecta: 1 },
        { enunciado: '¿Cuál es un buen motivo para preferir const por defecto?', opciones: ['Es más rápido de ejecutar', 'Evita reasignaciones accidentales', 'Ocupa menos memoria', 'Permite hoisting'], respuestaCorrecta: 1 },
      ],
    },
    avanzado: {
      umbralAprobacion: 15,
      preguntas: [
        { enunciado: '¿Qué es un closure en relación a variables?', opciones: ['Una variable global', 'Una función que recuerda variables de su entorno léxico', 'Un error de sintaxis', 'Una variable constante'], respuestaCorrecta: 1 },
        { enunciado: '¿Una variable capturada por un closure puede cambiar después de crearse la función?', opciones: ['No, nunca', 'Sí, si es mutable', 'Solo si es global', 'Solo en modo estricto'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué significa que un objeto sea "inmutable"?', opciones: ['No puede declararse con const', 'No puede modificarse después de creado', 'No puede pasarse a una función', 'No existe en JavaScript'], respuestaCorrecta: 1 },
        { enunciado: '¿const impide modificar las propiedades internas de un objeto?', opciones: ['Sí, siempre', 'No, solo impide reasignar la referencia', 'Sí, pero solo en arreglos', 'No existe esa restricción'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué ventaja ofrece el uso de variables inmutables en programas grandes?', opciones: ['Mayor velocidad de red', 'Mayor previsibilidad y menos efectos secundarios', 'Menor consumo de CPU', 'Ninguna ventaja real'], respuestaCorrecta: 1 },
      ],
    },
  },

  'tipos-datos': {
    principiante: {
      umbralAprobacion: 15,
      preguntas: [
        { enunciado: '¿Cuál de los siguientes es un tipo de dato primitivo?', opciones: ['Array', 'Object', 'Number', 'Function'], respuestaCorrecta: 2 },
        { enunciado: '¿Qué tipo de dato representa verdadero o falso?', opciones: ['String', 'Boolean', 'Number', 'Null'], respuestaCorrecta: 1 },
        { enunciado: '¿Cómo se define una cadena de texto?', opciones: ['Entre corchetes []', 'Entre comillas "" o \'\'', 'Entre llaves {}', 'Con la palabra string()'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué representa el valor undefined?', opciones: ['Un error', 'Una variable declarada sin valor asignado', 'El número cero', 'Una cadena vacía'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué operador se usa para concatenar cadenas en JavaScript?', opciones: ['&', '+', '-', '%'], respuestaCorrecta: 1 },
      ],
    },
    intermedio: {
      umbralAprobacion: 15,
      preguntas: [
        { enunciado: '¿Qué es la "coerción de tipos"?', opciones: ['Un error del compilador', 'La conversión automática o manual entre tipos', 'Una función matemática', 'Un tipo de bucle'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué devuelve typeof [] en JavaScript?', opciones: ['"array"', '"object"', '"list"', '"undefined"'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué diferencia hay entre == y ===?', opciones: ['No hay diferencia', '=== compara también el tipo de dato', '== es más estricto', '=== solo funciona con números'], respuestaCorrecta: 1 },
        { enunciado: '¿Un objeto en JavaScript se compone de...?', opciones: ['Solo números', 'Pares clave-valor', 'Solo funciones', 'Índices numéricos únicamente'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué resultado da "5" + 5 en JavaScript?', opciones: ['10', '"55"', 'Error', 'undefined'], respuestaCorrecta: 1 },
      ],
    },
    avanzado: {
      umbralAprobacion: 15,
      preguntas: [
        { enunciado: '¿Qué caracteriza a un lenguaje de tipado estático?', opciones: ['Los tipos se verifican en tiempo de compilación', 'Los tipos cambian libremente en ejecución', 'No usa tipos', 'Solo existe en JavaScript'], respuestaCorrecta: 0 },
        { enunciado: '¿JavaScript es un lenguaje de tipado estático o dinámico?', opciones: ['Estático', 'Dinámico', 'No tiene tipos', 'Híbrido obligatorio'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué aporta TypeScript sobre JavaScript?', opciones: ['Elimina las variables', 'Añade un sistema de tipado estático opcional', 'Reemplaza el navegador', 'Elimina las funciones'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué es una interfaz en un lenguaje tipado?', opciones: ['Una función anónima', 'Un contrato que define la forma de un dato', 'Un bucle especial', 'Una variable global'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué ventaja principal ofrece el tipado estático?', opciones: ['Detectar errores de tipo antes de ejecutar', 'Hacer el código más corto', 'Eliminar la necesidad de pruebas', 'Aumentar la velocidad de internet'], respuestaCorrecta: 0 },
      ],
    },
  },

  condicionales: {
    principiante: {
      umbralAprobacion: 15,
      preguntas: [
        { enunciado: '¿Qué instrucción se usa para evaluar una condición?', opciones: ['for', 'if', 'function', 'return'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué bloque se ejecuta si la condición del if es falsa?', opciones: ['then', 'else', 'catch', 'loop'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué operador representa "igual a" en comparaciones estrictas?', opciones: ['=', '==', '===', '=>'], respuestaCorrecta: 2 },
        { enunciado: '¿Qué operador lógico requiere que ambas condiciones sean verdaderas?', opciones: ['||', '&&', '!', '=='], respuestaCorrecta: 1 },
        { enunciado: '¿Qué devuelve el operador ! aplicado a true?', opciones: ['true', 'false', '1', 'undefined'], respuestaCorrecta: 1 },
      ],
    },
    intermedio: {
      umbralAprobacion: 15,
      preguntas: [
        { enunciado: '¿Cuándo conviene usar switch en lugar de if/else?', opciones: ['Nunca', 'Cuando se comparan muchos valores posibles de una misma variable', 'Solo con booleanos', 'Solo con arreglos'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué hace la palabra clave break dentro de un case?', opciones: ['Termina el bucle actual', 'Sale del switch evitando continuar a otros case', 'Reinicia el switch', 'Genera un error'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué es el operador ternario?', opciones: ['Un bucle de 3 pasos', 'Una forma abreviada de if/else que retorna un valor', 'Un tipo de dato', 'Una función matemática'], respuestaCorrecta: 1 },
        { enunciado: 'condicion ? "A" : "B" — ¿qué retorna si condicion es false?', opciones: ['"A"', '"B"', 'undefined', 'Error'], respuestaCorrecta: 1 },
        { enunciado: '¿Por qué se recomienda evitar condicionales anidados en exceso?', opciones: ['Porque no funcionan', 'Porque dificultan la lectura y mantenimiento del código', 'Porque consumen más memoria RAM', 'Porque JavaScript los prohíbe'], respuestaCorrecta: 1 },
      ],
    },
    avanzado: {
      umbralAprobacion: 15,
      preguntas: [
        { enunciado: '¿Qué es una "guard clause"?', opciones: ['Una condición que retorna temprano para simplificar la lógica', 'Un tipo de bucle infinito', 'Una variable protegida', 'Un operador matemático'], respuestaCorrecta: 0 },
        { enunciado: '¿Qué evalúa primero a && b?', opciones: ['b siempre', 'a; si es falso, no evalúa b', 'Ambos simultáneamente', 'Ninguno'], respuestaCorrecta: 1 },
        { enunciado: 'En a || b, si a es verdadero, ¿se evalúa b?', opciones: ['Sí, siempre', 'No, por short-circuit evaluation', 'Solo si b es una función', 'Depende del tipo de dato'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué ventaja tienen las guard clauses frente al anidamiento profundo?', opciones: ['Reducen el rendimiento', 'Aumentan la legibilidad al reducir niveles de indentación', 'Eliminan la necesidad de condicionales', 'No tienen ventajas'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué patrón usa a && funcion() para ejecutar funcion() solo si a es verdadero?', opciones: ['Encadenamiento opcional', 'Short-circuit evaluation', 'Recursividad', 'Desestructuración'], respuestaCorrecta: 1 },
      ],
    },
  },

  bucles: {
    principiante: {
      umbralAprobacion: 15,
      preguntas: [
        { enunciado: '¿Qué bucle se usa típicamente cuando se conoce el número de repeticiones?', opciones: ['while', 'for', 'if', 'switch'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué instrucción detiene por completo un bucle?', opciones: ['continue', 'break', 'return null', 'stop'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué instrucción salta a la siguiente iteración sin terminar el bucle?', opciones: ['break', 'continue', 'exit', 'skip'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué bucle evalúa la condición antes de ejecutar el bloque?', opciones: ['do-while', 'while', 'for-each', 'Ninguno'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué ocurre si la condición de un while nunca es falsa?', opciones: ['El bucle se ejecuta una vez', 'Se produce un bucle infinito', 'El programa se detiene automáticamente', 'Se ejecuta el else'], respuestaCorrecta: 1 },
      ],
    },
    intermedio: {
      umbralAprobacion: 15,
      preguntas: [
        { enunciado: '¿Qué diferencia al bucle do-while del while normal?', opciones: ['Nunca se ejecuta', 'Se ejecuta al menos una vez antes de evaluar la condición', 'Es más rápido', 'No admite break'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué recorre for...of?', opciones: ['Las claves de un objeto', 'Los valores de un iterable', 'Solo números', 'Solo funciones'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué recorre for...in?', opciones: ['Los valores de un arreglo', 'Las claves/índices enumerables de un objeto', 'Solo booleanos', 'Nada, no existe'], respuestaCorrecta: 1 },
        { enunciado: '¿Para qué se usan los bucles anidados?', opciones: ['Para declarar variables', 'Para recorrer estructuras multidimensionales', 'Para definir funciones', 'Para importar módulos'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué cuidado se debe tener con bucles anidados grandes?', opciones: ['Ninguno', 'Pueden afectar el rendimiento significativamente', 'Siempre son más rápidos', 'No se pueden usar con arreglos'], respuestaCorrecta: 1 },
      ],
    },
    avanzado: {
      umbralAprobacion: 15,
      preguntas: [
        { enunciado: '¿Qué es la recursividad?', opciones: ['Un bucle for especial', 'Una función que se llama a sí misma', 'Un tipo de dato', 'Un operador lógico'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué elemento es indispensable en una función recursiva para evitar un bucle infinito?', opciones: ['Un caso base', 'Una variable global', 'Un bucle for interno', 'Un operador ternario'], respuestaCorrecta: 0 },
        { enunciado: '¿Qué notación se usa comúnmente para medir la complejidad de un algoritmo con bucles?', opciones: ['Notación Big O', 'Notación científica', 'Notación binaria', 'Notación hexadecimal'], respuestaCorrecta: 0 },
        { enunciado: '¿Qué complejidad tiene un bucle simple que recorre n elementos una vez?', opciones: ['O(1)', 'O(n)', 'O(n^2)', 'O(log n)'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué complejidad suelen tener dos bucles anidados sobre el mismo conjunto de n elementos?', opciones: ['O(n)', 'O(n^2)', 'O(1)', 'O(log n)'], respuestaCorrecta: 1 },
      ],
    },
  },

  arreglos: {
    principiante: {
      umbralAprobacion: 15,
      preguntas: [
        { enunciado: '¿Qué es un arreglo (array)?', opciones: ['Una función', 'Una colección ordenada de elementos', 'Un tipo booleano', 'Un bucle'], respuestaCorrecta: 1 },
        { enunciado: '¿Con qué índice comienza un arreglo en JavaScript?', opciones: ['1', '0', '-1', 'Depende del arreglo'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué método agrega un elemento al final de un arreglo?', opciones: ['pop()', 'push()', 'shift()', 'add()'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué método elimina el último elemento de un arreglo?', opciones: ['push()', 'pop()', 'unshift()', 'remove()'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué propiedad indica el número de elementos de un arreglo?', opciones: ['size', 'length', 'count', 'total'], respuestaCorrecta: 1 },
      ],
    },
    intermedio: {
      umbralAprobacion: 15,
      preguntas: [
        { enunciado: '¿Qué hace el método map()?', opciones: ['Elimina elementos', 'Crea un nuevo arreglo transformando cada elemento', 'Ordena el arreglo', 'Verifica si existe un elemento'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué hace el método filter()?', opciones: ['Transforma cada elemento', 'Crea un nuevo arreglo con los elementos que cumplen una condición', 'Suma todos los elementos', 'Invierte el arreglo'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué hace el método reduce()?', opciones: ['Reduce el tamaño del arreglo eliminando duplicados', 'Acumula los elementos en un único valor', 'Ordena de forma descendente', 'Convierte el arreglo en texto'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué método ordena los elementos de un arreglo?', opciones: ['order()', 'sort()', 'arrange()', 'sequence()'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué es un arreglo multidimensional?', opciones: ['Un arreglo sin elementos', 'Un arreglo que contiene otros arreglos', 'Un arreglo de solo números', 'Un tipo de bucle'], respuestaCorrecta: 1 },
      ],
    },
    avanzado: {
      umbralAprobacion: 15,
      preguntas: [
        { enunciado: '¿Qué permite hacer la desestructuración de arreglos?', opciones: ['Eliminar elementos automáticamente', 'Extraer valores del arreglo en variables individuales', 'Convertir el arreglo en objeto', 'Ordenar el arreglo'], respuestaCorrecta: 1 },
        { enunciado: 'const [a, b] = [1, 2]; ¿qué valor tiene b?', opciones: ['1', '2', 'undefined', 'Error'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué complejidad Big O tiene la búsqueda de un elemento por índice en un arreglo?', opciones: ['O(1)', 'O(n)', 'O(n^2)', 'O(log n)'], respuestaCorrecta: 0 },
        { enunciado: '¿Qué complejidad tiene, en el peor caso, buscar un valor desconocido recorriendo todo el arreglo?', opciones: ['O(1)', 'O(n)', 'O(n!)', 'O(0)'], respuestaCorrecta: 1 },
        { enunciado: '¿Por qué es relevante conocer la complejidad algorítmica al trabajar con arreglos grandes?', opciones: ['No es relevante', 'Ayuda a prever el rendimiento de las operaciones', 'Solo afecta el diseño visual', 'Afecta el nombre de las variables'], respuestaCorrecta: 1 },
      ],
    },
  },

  'estructuras-datos': {
    principiante: {
      umbralAprobacion: 15,
      preguntas: [
        { enunciado: '¿Para qué sirven las estructuras de datos?', opciones: ['Para organizar y almacenar datos de forma eficiente', 'Solo para decorar el código', 'Para reemplazar las variables', 'Para eliminar funciones'], respuestaCorrecta: 0 },
        { enunciado: '¿Cómo se llama la estructura de datos tipo LIFO (último en entrar, primero en salir)?', opciones: ['Cola', 'Pila (Stack)', 'Árbol', 'Lista enlazada'], respuestaCorrecta: 1 },
        { enunciado: '¿Cómo se llama la estructura de datos tipo FIFO (primero en entrar, primero en salir)?', opciones: ['Pila', 'Cola (Queue)', 'Grafo', 'Conjunto'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué operación agrega un elemento a una pila?', opciones: ['dequeue', 'push', 'shift', 'pop'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué operación quita un elemento de una cola?', opciones: ['enqueue', 'dequeue', 'push', 'peek'], respuestaCorrecta: 1 },
      ],
    },
    intermedio: {
      umbralAprobacion: 15,
      preguntas: [
        { enunciado: '¿Qué caracteriza a una lista enlazada?', opciones: ['Los elementos se acceden solo por índice numérico', 'Cada nodo apunta al siguiente mediante una referencia', 'No puede recorrerse', 'Es igual a un arreglo'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué ventaja ofrece una tabla hash (Hash Map)?', opciones: ['Acceso lento por clave', 'Acceso muy rápido a valores mediante una clave', 'Solo almacena números', 'Ordena automáticamente los datos'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué caracteriza a un conjunto (Set)?', opciones: ['Permite elementos duplicados', 'Solo almacena valores únicos', 'Es una estructura de tipo LIFO', 'Requiere claves numéricas'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué estructura es más adecuada para insertar/eliminar elementos frecuentemente al inicio?', opciones: ['Arreglo estático', 'Lista enlazada', 'Cadena de texto', 'Booleano'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué representa un "nodo" en una lista enlazada?', opciones: ['Un índice numérico', 'Una unidad que contiene un valor y una referencia al siguiente nodo', 'Un tipo de bucle', 'Una función anónima'], respuestaCorrecta: 1 },
      ],
    },
    avanzado: {
      umbralAprobacion: 15,
      preguntas: [
        { enunciado: '¿Qué es un árbol binario?', opciones: ['Una lista sin orden', 'Una estructura jerárquica donde cada nodo tiene como máximo dos hijos', 'Un arreglo de dos dimensiones', 'Una tabla hash especial'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué es un grafo?', opciones: ['Un conjunto de nodos conectados por aristas', 'Un tipo de arreglo ordenado', 'Una función recursiva', 'Un tipo de dato primitivo'], respuestaCorrecta: 0 },
        { enunciado: '¿Qué recorrido de árbol visita raíz, izquierda y luego derecha?', opciones: ['In-order', 'Pre-order', 'Post-order', 'Aleatorio'], respuestaCorrecta: 1 },
        { enunciado: '¿En qué aplicación práctica se usan los grafos?', opciones: ['Redes sociales y sistemas de rutas', 'Solo en hojas de cálculo', 'Solo en bucles for', 'No tienen aplicaciones reales'], respuestaCorrecta: 0 },
        { enunciado: '¿Qué característica distingue a un árbol binario de búsqueda (BST)?', opciones: ['No mantiene ningún orden', 'Los valores menores van a la izquierda y los mayores a la derecha', 'Solo permite un hijo por nodo', 'Es igual a una lista enlazada'], respuestaCorrecta: 1 },
      ],
    },
  },

  funciones: {
    principiante: {
      umbralAprobacion: 15,
      preguntas: [
        { enunciado: '¿Qué es una función?', opciones: ['Un tipo de variable', 'Un bloque de código reutilizable que realiza una tarea', 'Un bucle especial', 'Un operador lógico'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué palabra clave se usa para devolver un valor desde una función?', opciones: ['break', 'return', 'exit', 'continue'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué son los parámetros de una función?', opciones: ['Valores fijos que nunca cambian', 'Variables que reciben los valores pasados al llamar la función', 'El nombre de la función', 'El resultado final'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué ocurre si una función no tiene una instrucción return?', opciones: ['Genera un error', 'Devuelve undefined por defecto', 'Devuelve 0', 'No se puede llamar'], respuestaCorrecta: 1 },
        { enunciado: '¿Cómo se llama a una función en JavaScript?', opciones: ['nombreFuncion[]', 'nombreFuncion()', '#nombreFuncion', '@nombreFuncion'], respuestaCorrecta: 1 },
      ],
    },
    intermedio: {
      umbralAprobacion: 15,
      preguntas: [
        { enunciado: '¿Qué es una función flecha (arrow function)?', opciones: ['Una sintaxis alternativa y más corta para escribir funciones', 'Un tipo de bucle', 'Una función que no puede recibir parámetros', 'Un operador matemático'], respuestaCorrecta: 0 },
        { enunciado: '¿Qué significa que las funciones sean "de primera clase"?', opciones: ['Que no pueden usarse como argumentos', 'Que pueden asignarse a variables y pasarse como argumentos', 'Que solo existen en POO', 'Que siempre son anónimas'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué es un callback?', opciones: ['Una función pasada como argumento para ejecutarse después', 'Un tipo de variable global', 'Un error de sintaxis', 'Un bucle infinito'], respuestaCorrecta: 0 },
        { enunciado: '¿Qué permite el operador rest (...) en los parámetros?', opciones: ['Agrupar un número variable de argumentos en un arreglo', 'Eliminar parámetros', 'Convertir parámetros en booleanos', 'Duplicar la función'], respuestaCorrecta: 0 },
        { enunciado: '¿Para qué sirven los parámetros por defecto?', opciones: ['Para asignar un valor si no se proporciona uno al llamar la función', 'Para eliminar parámetros no usados', 'Para forzar un error si falta un argumento', 'No existen en JavaScript'], respuestaCorrecta: 0 },
      ],
    },
    avanzado: {
      umbralAprobacion: 15,
      preguntas: [
        { enunciado: '¿Qué es una función de orden superior?', opciones: ['Una función que solo usa números', 'Una función que recibe y/o devuelve otras funciones', 'Una función sin parámetros', 'Una función privada'], respuestaCorrecta: 1 },
        { enunciado: '¿map(), filter() y reduce() son ejemplos de qué concepto?', opciones: ['Funciones de orden superior', 'Bucles infinitos', 'Tipos de datos primitivos', 'Estructuras de control'], respuestaCorrecta: 0 },
        { enunciado: '¿Qué es la recursividad en el contexto de funciones?', opciones: ['Una función que llama a otra función distinta únicamente', 'Una función que se llama a sí misma para resolver un problema', 'Un bucle for disfrazado', 'Un tipo de callback'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué se necesita para que una función recursiva termine correctamente?', opciones: ['Un bucle while interno', 'Un caso base que detenga las llamadas', 'Una variable global', 'Nada especial'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué riesgo tiene una función recursiva sin caso base?', opciones: ['Ninguno', 'Un desbordamiento de pila (stack overflow)', 'Se vuelve más rápida', 'Se convierte en arrow function'], respuestaCorrecta: 1 },
      ],
    },
  },

  poo: {
    principiante: {
      umbralAprobacion: 15,
      preguntas: [
        { enunciado: '¿Qué es una clase en POO?', opciones: ['Una instancia de un objeto', 'Una plantilla para crear objetos', 'Un tipo de bucle', 'Un valor booleano'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué es un objeto en POO?', opciones: ['Una instancia creada a partir de una clase', 'Un tipo de función', 'Un operador lógico', 'Una variable global'], respuestaCorrecta: 0 },
        { enunciado: '¿Qué método especial inicializa las propiedades de un objeto al crearlo?', opciones: ['constructor', 'init()', 'start()', 'main()'], respuestaCorrecta: 0 },
        { enunciado: '¿Con qué palabra clave se crea una instancia de una clase?', opciones: ['create', 'new', 'make', 'instance'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué contiene típicamente una clase?', opciones: ['Solo bucles', 'Propiedades y métodos', 'Solo condicionales', 'Solo variables globales'], respuestaCorrecta: 1 },
      ],
    },
    intermedio: {
      umbralAprobacion: 15,
      preguntas: [
        { enunciado: '¿Qué es el encapsulamiento?', opciones: ['Ocultar los detalles internos de un objeto y exponer solo lo necesario', 'Crear múltiples clases iguales', 'Eliminar propiedades de una clase', 'Un tipo de bucle'], respuestaCorrecta: 0 },
        { enunciado: '¿Qué palabra clave permite que una clase herede de otra en JavaScript?', opciones: ['inherits', 'extends', 'implements', 'from'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué hace la palabra clave super dentro de una clase hija?', opciones: ['Elimina la clase padre', 'Llama al constructor o métodos de la clase padre', 'Crea una nueva clase', 'Define una variable global'], respuestaCorrecta: 1 },
        { enunciado: '¿Para qué sirve un getter en una clase?', opciones: ['Para modificar directamente una propiedad privada', 'Para controlar cómo se lee el valor de una propiedad', 'Para eliminar una propiedad', 'Para crear un bucle'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué ventaja ofrece la herencia en POO?', opciones: ['Duplicar código en cada clase', 'Reutilizar comportamiento común entre clases relacionadas', 'Hacer las clases más lentas', 'Eliminar la necesidad de constructores'], respuestaCorrecta: 1 },
      ],
    },
    avanzado: {
      umbralAprobacion: 15,
      preguntas: [
        { enunciado: '¿Qué es el polimorfismo?', opciones: ['La capacidad de una subclase de sobrescribir el comportamiento de un método heredado', 'Un tipo de variable', 'Un método para eliminar clases', 'Un bucle especial de POO'], respuestaCorrecta: 0 },
        { enunciado: '¿Qué permite la abstracción en POO?', opciones: ['Exponer todos los detalles internos', 'Definir un contrato o comportamiento esperado sin implementar detalles', 'Eliminar la herencia', 'Duplicar clases automáticamente'], respuestaCorrecta: 1 },
        { enunciado: '¿Qué es una interfaz en el contexto de diseño orientado a objetos?', opciones: ['Un contrato que especifica qué métodos debe implementar una clase', 'Una clase concreta con lógica completa', 'Un tipo de bucle', 'Una variable protegida'], respuestaCorrecta: 0 },
        { enunciado: '¿Qué pilar de la POO permite tratar objetos de distintas clases de forma uniforme si comparten una interfaz?', opciones: ['Encapsulamiento', 'Polimorfismo', 'Herencia simple', 'Abstracción de datos primitivos'], respuestaCorrecta: 1 },
        { enunciado: '¿Por qué se considera valiosa la abstracción en sistemas grandes?', opciones: ['Porque oculta la complejidad y facilita el mantenimiento', 'Porque hace el código más lento', 'Porque elimina la necesidad de pruebas', 'Porque impide la reutilización de código'], respuestaCorrecta: 0 },
      ],
    },
  },
};
