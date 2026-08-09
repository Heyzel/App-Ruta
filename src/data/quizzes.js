// Backup local de los cuestionarios (respaldo de la tabla `cuestionarios` de
// Supabase). src/services/cuestionarios.js usa este archivo como respaldo
// automático cuando Supabase no está configurado o la consulta falla.
//
// Generado automáticamente desde producción el 2026-08-09 con
// scripts/generarBackupLocal.mjs — no editar preguntas de temas que sí
// existen en producción directamente aquí, hazlo desde el panel de admin y
// vuelve a correr el script. Los temas que no tienen fila en Supabase (p.
// ej. el propedéutico de aritmética) sí se mantienen y editan solo aquí.
// Umbral de aprobación en escala 0-20 (aprueba si nota >= umbral).
export const QUIZZES = {
  "propedeutico-aritmetica": {
    "principiante": {
      "umbralAprobacion": 0,
      "preguntas": [
        {
          "tipo": "verdadero-falso",
          "enunciado": "La suma es una operación conmutativa: 3 + 5 da el mismo resultado que 5 + 3.",
          "respuestaCorrecta": true
        },
        {
          "tipo": "verdadero-falso",
          "enunciado": "En la resta, el orden de los números no altera el resultado (8 - 3 es igual a 3 - 8).",
          "respuestaCorrecta": false
        },
        {
          "tipo": "verdadero-falso",
          "enunciado": "Cualquier número multiplicado por 0 da como resultado 0.",
          "respuestaCorrecta": true
        },
        {
          "tipo": "seleccion-simple",
          "enunciado": "¿Cuánto es 7 × 8?",
          "opciones": [
            "54",
            "56",
            "64",
            "48"
          ],
          "respuestaCorrecta": 1
        },
        {
          "tipo": "seleccion-simple",
          "enunciado": "¿Cuál es el resultado de 144 ÷ 12?",
          "opciones": [
            "11",
            "12",
            "14",
            "13"
          ],
          "respuestaCorrecta": 1
        },
        {
          "tipo": "seleccion-simple",
          "enunciado": "En la división 20 ÷ 3, ¿cuál es el residuo?",
          "opciones": [
            "0",
            "1",
            "2",
            "3"
          ],
          "respuestaCorrecta": 2
        },
        {
          "tipo": "seleccion-multiple",
          "enunciado": "¿Cuáles de las siguientes operaciones dan como resultado 24?",
          "opciones": [
            "4 × 6",
            "3 × 8",
            "20 + 5",
            "48 ÷ 2"
          ],
          "respuestasCorrectas": [
            0,
            1,
            3
          ]
        },
        {
          "tipo": "seleccion-multiple",
          "enunciado": "¿Cuáles de los siguientes números son pares?",
          "opciones": [
            "12",
            "17",
            "30",
            "8"
          ],
          "respuestasCorrectas": [
            0,
            2,
            3
          ]
        },
        {
          "tipo": "numerica",
          "enunciado": "¿Cuánto es 156 + 289?",
          "respuestaCorrecta": 445,
          "tolerancia": 0
        },
        {
          "tipo": "numerica",
          "enunciado": "¿Cuánto es 63 - 27?",
          "respuestaCorrecta": 36,
          "tolerancia": 0
        }
      ]
    },
    "intermedio": {
      "umbralAprobacion": 0,
      "preguntas": [
        {
          "tipo": "verdadero-falso",
          "enunciado": "La fracción 1/2 es equivalente a 2/4.",
          "respuestaCorrecta": true
        },
        {
          "tipo": "verdadero-falso",
          "enunciado": "El 50% de un número es lo mismo que dividirlo entre 2.",
          "respuestaCorrecta": true
        },
        {
          "tipo": "verdadero-falso",
          "enunciado": "En la jerarquía de operaciones, la suma se resuelve antes que la multiplicación.",
          "respuestaCorrecta": false
        },
        {
          "tipo": "seleccion-simple",
          "enunciado": "¿Cuál es el resultado de 2 + 3 × 4 (respetando la jerarquía de operaciones)?",
          "opciones": [
            "20",
            "14",
            "24",
            "11"
          ],
          "respuestaCorrecta": 1
        },
        {
          "tipo": "seleccion-simple",
          "enunciado": "¿Cuánto es el 25% de 80?",
          "opciones": [
            "16",
            "20",
            "25",
            "40"
          ],
          "respuestaCorrecta": 1
        },
        {
          "tipo": "seleccion-simple",
          "enunciado": "¿Cuál es el resultado de 3/4 + 1/4?",
          "opciones": [
            "1",
            "4/8",
            "1/2",
            "4/4 = 2"
          ],
          "respuestaCorrecta": 0
        },
        {
          "tipo": "seleccion-simple",
          "enunciado": "Al convertir 0.75 a fracción irreducible se obtiene:",
          "opciones": [
            "3/4",
            "7/5",
            "75/10",
            "1/4"
          ],
          "respuestaCorrecta": 0
        },
        {
          "tipo": "seleccion-multiple",
          "enunciado": "¿Cuáles de las siguientes fracciones son equivalentes a 1/2?",
          "opciones": [
            "2/4",
            "3/6",
            "5/9",
            "50/100"
          ],
          "respuestasCorrectas": [
            0,
            1,
            3
          ]
        },
        {
          "tipo": "pareo",
          "enunciado": "Empareja cada fracción con su equivalente decimal.",
          "izquierda": [
            "1/2",
            "1/4",
            "3/4"
          ],
          "derecha": [
            "0.5",
            "0.25",
            "0.75"
          ],
          "correspondencias": [
            0,
            1,
            2
          ]
        },
        {
          "tipo": "numerica",
          "enunciado": "Calcula el resultado de 6 + 4 × 5 - 2 (respeta la jerarquía de operaciones).",
          "respuestaCorrecta": 24,
          "tolerancia": 0
        }
      ]
    },
    "avanzado": {
      "umbralAprobacion": 0,
      "preguntas": [
        {
          "tipo": "verdadero-falso",
          "enunciado": "La raíz cuadrada de 81 es 9.",
          "respuestaCorrecta": true
        },
        {
          "tipo": "verdadero-falso",
          "enunciado": "Elevar un número a la potencia 0 (con base distinta de 0) siempre da 1.",
          "respuestaCorrecta": true
        },
        {
          "tipo": "verdadero-falso",
          "enunciado": "El máximo común divisor (MCD) de 12 y 18 es 36.",
          "respuestaCorrecta": false
        },
        {
          "tipo": "seleccion-simple",
          "enunciado": "¿Cuál es el valor de 2⁵ (2 elevado a la 5)?",
          "opciones": [
            "10",
            "25",
            "32",
            "16"
          ],
          "respuestaCorrecta": 2
        },
        {
          "tipo": "seleccion-simple",
          "enunciado": "Si 3 lápices cuestan $12, ¿cuánto cuestan 5 lápices (regla de tres)?",
          "opciones": [
            "$18",
            "$20",
            "$15",
            "$24"
          ],
          "respuestaCorrecta": 1
        },
        {
          "tipo": "seleccion-simple",
          "enunciado": "¿Cuál es el mínimo común múltiplo (mcm) de 4 y 6?",
          "opciones": [
            "24",
            "12",
            "10",
            "6"
          ],
          "respuestaCorrecta": 1
        },
        {
          "tipo": "seleccion-multiple",
          "enunciado": "¿Cuáles de los siguientes son números primos?",
          "opciones": [
            "7",
            "9",
            "13",
            "21"
          ],
          "respuestasCorrectas": [
            0,
            2
          ]
        },
        {
          "tipo": "pareo",
          "enunciado": "Empareja cada expresión con su resultado.",
          "izquierda": [
            "3²",
            "√49",
            "10³"
          ],
          "derecha": [
            "9",
            "7",
            "1000"
          ],
          "correspondencias": [
            0,
            1,
            2
          ]
        },
        {
          "tipo": "numerica",
          "enunciado": "Calcula el valor de 4² + √25 (cuatro al cuadrado más la raíz cuadrada de 25).",
          "respuestaCorrecta": 21,
          "tolerancia": 0
        },
        {
          "tipo": "numerica",
          "enunciado": "¿Cuál es el máximo común divisor (MCD) de 24 y 36?",
          "respuestaCorrecta": 12,
          "tolerancia": 0
        }
      ]
    }
  },
  "variables": {
    "principiante": {
      "umbralAprobacion": 13,
      "preguntas": [
        {
          "tipo": "verdadero-falso",
          "enunciado": "En C++, una variable declarada con const debe inicializarse en el momento de su declaración.",
          "respuestaCorrecta": true
        },
        {
          "tipo": "verdadero-falso",
          "enunciado": "En C++ es posible cambiar el tipo de una variable después de haberla declarado.",
          "respuestaCorrecta": false
        },
        {
          "tipo": "verdadero-falso",
          "enunciado": "El operador = se utiliza para asignar un valor a una variable en C++.",
          "respuestaCorrecta": true
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "var edad = 25;",
            "integer edad = 25;",
            "int edad = 25;",
            "edad := 25;"
          ],
          "enunciado": "¿Cuál es la forma correcta de declarar una variable entera en C++?",
          "respuestaCorrecta": 2
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "let",
            "static",
            "const",
            "final"
          ],
          "enunciado": "¿Qué palabra clave se usa para declarar una constante en C++?",
          "respuestaCorrecta": 2
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "2valor",
            "valor_2",
            "mi valor",
            "valor-2"
          ],
          "enunciado": "¿Cuál es un identificador de variable válido en C++?",
          "respuestaCorrecta": 1
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "char letra = 'A';",
            "int x = 5;",
            "int x == 5;",
            "double pi = 3.14;"
          ],
          "enunciado": "¿Cuáles de las siguientes son declaraciones válidas de variables en C++?",
          "respuestasCorrectas": [
            0,
            1,
            3
          ]
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "Pueden contener espacios",
            "Pueden contener letras, dígitos y guion bajo",
            "No pueden empezar con un dígito",
            "Distinguen mayúsculas de minúsculas"
          ],
          "enunciado": "¿Cuáles son reglas válidas para nombrar variables en C++?",
          "respuestasCorrectas": [
            1,
            2,
            3
          ]
        }
      ]
    },
    "intermedio": {
      "umbralAprobacion": 16,
      "preguntas": [
        {
          "tipo": "verdadero-falso",
          "enunciado": "En C++, una variable static local conserva su valor entre llamadas sucesivas a la función.",
          "respuestaCorrecta": true
        },
        {
          "tipo": "verdadero-falso",
          "enunciado": "El ámbito de una variable local declarada dentro de un bloque {} se extiende a todo el programa.",
          "respuestaCorrecta": false
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "Solo almacena valores no negativos (≥ 0)",
            "Solo almacena valores negativos",
            "No ocupa memoria",
            "Almacena decimales"
          ],
          "enunciado": "¿Qué significa que una variable sea de tipo unsigned int?",
          "respuestaCorrecta": 0
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "let",
            "dynamic",
            "var",
            "auto"
          ],
          "enunciado": "¿Qué palabra clave permite al compilador deducir el tipo a partir del inicializador (C++11+)?",
          "respuestaCorrecta": 3
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "Se vuelve constante",
            "Se inicializa a cero por defecto",
            "Genera error de compilación",
            "Contiene un valor basura"
          ],
          "enunciado": "¿Qué ocurre con una variable global en C++ si no se inicializa explícitamente?",
          "respuestaCorrecta": 1
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "unsigned",
            "const",
            "static",
            "volatile"
          ],
          "enunciado": "¿Cuáles son calificadores/modificadores válidos aplicables a variables en C++?",
          "respuestasCorrectas": [
            0,
            1,
            2,
            3
          ]
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "Las variables locales se destruyen al salir de su ámbito",
            "Una variable local existe solo dentro de su bloque",
            "Una variable global es accesible desde cualquier función del archivo",
            "Todas las variables tienen ámbito global"
          ],
          "enunciado": "¿Cuáles afirmaciones sobre el ámbito de variables en C++ son correctas?",
          "respuestasCorrectas": [
            0,
            1,
            2
          ]
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "short",
            "int",
            "unsigned int",
            "long"
          ],
          "enunciado": "¿Cuáles de los siguientes son tipos enteros con signo en C++?",
          "respuestasCorrectas": [
            0,
            1,
            3
          ]
        },
        {
          "tipo": "pareo",
          "derecha": [
            "Deduce el tipo automáticamente",
            "Impide modificar el valor",
            "Conserva el valor entre llamadas"
          ],
          "enunciado": "Empareja cada palabra clave de C++ con su propósito.",
          "izquierda": [
            "const",
            "static",
            "auto"
          ],
          "correspondencias": [
            1,
            2,
            0
          ]
        },
        {
          "tipo": "pareo",
          "derecha": [
            "Verdadero o falso",
            "Decimal de doble precisión",
            "Número entero"
          ],
          "enunciado": "Empareja cada tipo con lo que representa.",
          "izquierda": [
            "int",
            "double",
            "bool"
          ],
          "correspondencias": [
            2,
            1,
            0
          ]
        }
      ]
    },
    "avanzado": {
      "umbralAprobacion": 20,
      "preguntas": [
        {
          "tipo": "verdadero-falso",
          "enunciado": "Una referencia en C++ (int& r = x;) debe inicializarse al declararse y no puede reasignarse a otra variable.",
          "respuestaCorrecta": true
        },
        {
          "tipo": "verdadero-falso",
          "enunciado": "En C++, constexpr permite evaluar el valor de una variable en tiempo de compilación.",
          "respuestaCorrecta": true
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "La referencia siempre ocupa más memoria",
            "La referencia no puede ser nula y debe inicializarse; el puntero sí puede ser nulo y reasignarse",
            "No hay ninguna diferencia",
            "El puntero no puede reasignarse nunca"
          ],
          "enunciado": "¿Qué diferencia principal hay entre una referencia y un puntero en C++?",
          "respuestaCorrecta": 1
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "4",
            "2",
            "8",
            "16"
          ],
          "enunciado": "En una plataforma típica, ¿qué valor devuelve sizeof(int)?",
          "respuestaCorrecta": 0
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "const int* const p no permite ni modificar el valor ni reasignar",
            "const int* p no permite modificar el valor apuntado",
            "int* const p no permite reasignar el puntero",
            "const no puede combinarse con punteros"
          ],
          "enunciado": "¿Cuáles afirmaciones sobre const y punteros en C++ son correctas?",
          "respuestasCorrectas": [
            0,
            1,
            2
          ]
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "Es exactamente sinónimo de const",
            "La expresión debe poder evaluarse en compilación",
            "Permite cálculos en tiempo de compilación",
            "Puede aplicarse también a funciones"
          ],
          "enunciado": "¿Cuáles son verdaderas sobre constexpr en C++?",
          "respuestasCorrectas": [
            1,
            2,
            3
          ]
        },
        {
          "tipo": "pareo",
          "derecha": [
            "Puntero a un entero",
            "Referencia a un entero",
            "Entero constante"
          ],
          "enunciado": "Empareja cada declaración con su significado.",
          "izquierda": [
            "int& r",
            "int* p",
            "const int c"
          ],
          "correspondencias": [
            1,
            0,
            2
          ]
        },
        {
          "tipo": "pareo",
          "derecha": [
            "Impide optimizaciones sobre la variable",
            "Permite modificar un miembro en un objeto const",
            "Evaluación en tiempo de compilación"
          ],
          "enunciado": "Empareja cada especificador con su efecto.",
          "izquierda": [
            "constexpr",
            "volatile",
            "mutable"
          ],
          "correspondencias": [
            2,
            0,
            1
          ]
        },
        {
          "tipo": "numerica",
          "codigo": "int a = 7;\nint b = 3;\nint resultado = a % b + a / b;",
          "enunciado": "¿Cuál es el valor final de la variable resultado?",
          "tolerancia": 0,
          "respuestaCorrecta": 3
        },
        {
          "tipo": "numerica",
          "codigo": "int x = 5;\nx += 3;\nx *= 2;",
          "enunciado": "¿Cuál es el valor final de la variable x?",
          "tolerancia": 0,
          "respuestaCorrecta": 16
        }
      ]
    }
  },
  "tipos-datos": {
    "principiante": {
      "umbralAprobacion": 13,
      "preguntas": [
        {
          "tipo": "verdadero-falso",
          "enunciado": "En C++, el tipo bool puede almacenar únicamente los valores true o false.",
          "respuestaCorrecta": true
        },
        {
          "tipo": "verdadero-falso",
          "enunciado": "El tipo char en C++ se utiliza para almacenar números decimales.",
          "respuestaCorrecta": false
        },
        {
          "tipo": "verdadero-falso",
          "enunciado": "El tipo double puede almacenar valores con parte decimal.",
          "respuestaCorrecta": true
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "char",
            "string",
            "int",
            "bool"
          ],
          "enunciado": "¿Qué tipo de dato se usa para almacenar un solo carácter en C++?",
          "respuestaCorrecta": 0
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "'a'",
            "3.14",
            "\"texto\"",
            "42"
          ],
          "enunciado": "¿Cuál de estos literales representa un número de punto flotante en C++?",
          "respuestaCorrecta": 1
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "<vector>",
            "<iostream>",
            "<cstdio>",
            "<string>"
          ],
          "enunciado": "¿Qué encabezado se necesita para usar std::string en C++?",
          "respuestaCorrecta": 3
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "int",
            "std::string",
            "double",
            "bool"
          ],
          "enunciado": "¿Cuáles son tipos de dato fundamentales (primitivos) en C++?",
          "respuestasCorrectas": [
            0,
            2,
            3
          ]
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "'A' (char)",
            "100 (int)",
            "\"Hola\" (cadena)",
            "3.14f (float)"
          ],
          "enunciado": "¿Cuáles literales son válidos en C++?",
          "respuestasCorrectas": [
            0,
            1,
            2,
            3
          ]
        }
      ]
    },
    "intermedio": {
      "umbralAprobacion": 16,
      "preguntas": [
        {
          "tipo": "verdadero-falso",
          "enunciado": "En C++, static_cast<int>(3.9) produce el valor 3 (trunca, no redondea).",
          "respuestaCorrecta": true
        },
        {
          "tipo": "verdadero-falso",
          "enunciado": "El operador sizeof devuelve el tamaño de un tipo en bits.",
          "respuestaCorrecta": false
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "3",
            "3.5",
            "4",
            "2"
          ],
          "enunciado": "¿Qué resultado produce 7 / 2 cuando ambos operandos son int en C++?",
          "respuestaCorrecta": 0
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "static_cast<tipo>(valor)",
            "cast valor to tipo",
            "convert(valor)",
            "tipo.parse(valor)"
          ],
          "enunciado": "¿Cómo se realiza una conversión explícita de tipos moderna en C++?",
          "respuestaCorrecta": 0
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "Un arreglo de enteros",
            "Una clase de la biblioteca estándar para cadenas",
            "Un tipo fundamental",
            "Un puntero a char siempre"
          ],
          "enunciado": "¿Qué representa std::string en C++?",
          "respuestaCorrecta": 1
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "7 / 2 con enteros da 3",
            "7.0 / 2 da 3.5",
            "7 % 2 da 1",
            "7 / 2.0 da 3 exacto"
          ],
          "enunciado": "¿Cuáles afirmaciones sobre la división en C++ son correctas?",
          "respuestasCorrectas": [
            0,
            1,
            2
          ]
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "dynamic_cast",
            "static_cast",
            "reinterpret_cast",
            "const_cast"
          ],
          "enunciado": "¿Cuáles son operadores de conversión (cast) de C++?",
          "respuestasCorrectas": [
            0,
            1,
            2,
            3
          ]
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "Asignar un double a un int (con pérdida)",
            "Concatenar dos cadenas",
            "Sumar un int y un double",
            "Asignar un char a un int"
          ],
          "enunciado": "¿Cuáles operaciones provocan una conversión implícita (promoción) en C++?",
          "respuestasCorrectas": [
            0,
            2,
            3
          ]
        },
        {
          "tipo": "pareo",
          "derecha": [
            "4",
            "8",
            "1"
          ],
          "enunciado": "Empareja cada tipo con su tamaño típico en bytes.",
          "izquierda": [
            "char",
            "int",
            "double"
          ],
          "correspondencias": [
            2,
            0,
            1
          ]
        },
        {
          "tipo": "pareo",
          "derecha": [
            "double",
            "bool",
            "char"
          ],
          "enunciado": "Empareja cada literal con su tipo.",
          "izquierda": [
            "'x'",
            "3.14",
            "true"
          ],
          "correspondencias": [
            2,
            0,
            1
          ]
        }
      ]
    },
    "avanzado": {
      "umbralAprobacion": 20,
      "preguntas": [
        {
          "tipo": "verdadero-falso",
          "enunciado": "En C++, el desbordamiento (overflow) de un entero con signo produce comportamiento indefinido.",
          "respuestaCorrecta": true
        },
        {
          "tipo": "verdadero-falso",
          "enunciado": "float y double tienen exactamente la misma precisión en C++.",
          "respuestaCorrecta": false
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "8",
            "16",
            "4",
            "2"
          ],
          "enunciado": "¿Cuántos bytes ocupa típicamente un double en C++?",
          "respuestaCorrecta": 0
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "Enteros escalados (p. ej. centavos) o tipos decimales",
            "double siempre",
            "char",
            "float"
          ],
          "enunciado": "¿Qué representación se recomienda para valores monetarios evitando errores de redondeo binario?",
          "respuestaCorrecta": 0
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "Comparar flotantes con == es siempre seguro",
            "double tiene más precisión que float",
            "0.1 + 0.2 puede no ser exactamente 0.3",
            "Los flotantes tienen precisión limitada"
          ],
          "enunciado": "¿Cuáles afirmaciones sobre el punto flotante en C++ son correctas?",
          "respuestasCorrectas": [
            1,
            2,
            3
          ]
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "int64_t",
            "int_t",
            "uint8_t",
            "int32_t"
          ],
          "enunciado": "¿Cuáles son tipos enteros de ancho fijo definidos en <cstdint>?",
          "respuestasCorrectas": [
            0,
            2,
            3
          ]
        },
        {
          "tipo": "pareo",
          "derecha": [
            "16",
            "8",
            "32"
          ],
          "enunciado": "Empareja cada tipo de <cstdint> con su ancho en bits.",
          "izquierda": [
            "int8_t",
            "int16_t",
            "int32_t"
          ],
          "correspondencias": [
            1,
            0,
            2
          ]
        },
        {
          "tipo": "pareo",
          "derecha": [
            "Conversión segura en jerarquías polimórficas",
            "Quitar o añadir const",
            "Conversión estándar entre tipos relacionados"
          ],
          "enunciado": "Empareja cada cast de C++ con su propósito.",
          "izquierda": [
            "static_cast",
            "dynamic_cast",
            "const_cast"
          ],
          "correspondencias": [
            2,
            0,
            1
          ]
        },
        {
          "tipo": "numerica",
          "codigo": "int total = 17;\nint grupos = 5;\nint resultado = total / grupos;",
          "enunciado": "¿Cuál es el valor final de resultado (división entera)?",
          "tolerancia": 0,
          "respuestaCorrecta": 3
        },
        {
          "tipo": "numerica",
          "codigo": "double a = 5.0;\nint b = 2;\ndouble r = a / b;",
          "enunciado": "¿Cuál es el valor final de la variable r?",
          "tolerancia": 0.01,
          "respuestaCorrecta": 2.5
        }
      ]
    }
  },
  "condicionales": {
    "principiante": {
      "umbralAprobacion": 13,
      "preguntas": [
        {
          "tipo": "verdadero-falso",
          "enunciado": "En C++, el bloque else se ejecuta cuando la condición del if es falsa.",
          "respuestaCorrecta": true
        },
        {
          "tipo": "verdadero-falso",
          "enunciado": "El operador == se utiliza para asignar un valor en C++.",
          "respuestaCorrecta": false
        },
        {
          "tipo": "verdadero-falso",
          "enunciado": "En C++, cualquier valor entero distinto de cero se evalúa como verdadero en una condición.",
          "respuestaCorrecta": true
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "==",
            ":=",
            "=",
            "=>"
          ],
          "enunciado": "¿Qué operador representa \"igualdad\" en una comparación en C++?",
          "respuestaCorrecta": 0
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "while",
            "for",
            "do-while",
            "switch"
          ],
          "enunciado": "¿Qué estructura es más adecuada para elegir entre muchos valores de una misma variable?",
          "respuestaCorrecta": 3
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "!",
            "%",
            "||",
            "&&"
          ],
          "enunciado": "¿Qué operador lógico exige que AMBAS condiciones sean verdaderas?",
          "respuestaCorrecta": 3
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "==",
            ">=",
            "=<",
            "!="
          ],
          "enunciado": "¿Cuáles son operadores de comparación válidos en C++?",
          "respuestasCorrectas": [
            0,
            1,
            3
          ]
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "|| (OR)",
            "# (XOR)",
            "&& (AND)",
            "! (NOT)"
          ],
          "enunciado": "¿Cuáles son operadores lógicos en C++?",
          "respuestasCorrectas": [
            0,
            2,
            3
          ]
        }
      ]
    },
    "intermedio": {
      "umbralAprobacion": 16,
      "preguntas": [
        {
          "tipo": "verdadero-falso",
          "enunciado": "En un switch de C++, omitir break en un case provoca que la ejecución continúe (fall-through) al siguiente case.",
          "respuestaCorrecta": true
        },
        {
          "tipo": "verdadero-falso",
          "enunciado": "El operador ternario ?: no puede devolver ningún valor.",
          "respuestaCorrecta": false
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "A",
            "B",
            "5",
            "Error de compilación"
          ],
          "enunciado": "¿Qué imprime cout en: int x = 5; cout << (x > 3 ? \"A\" : \"B\");?",
          "respuestaCorrecta": 0
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "end",
            "else",
            "default",
            "otherwise"
          ],
          "enunciado": "En un switch, ¿qué etiqueta se ejecuta si ningún case coincide?",
          "respuestaCorrecta": 2
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "Solo cadenas",
            "Enteros o enumeraciones (tipos integrales)",
            "Solo flotantes",
            "Solo booleanos"
          ],
          "enunciado": "¿Qué tipo de valores admite tradicionalmente la expresión de un switch en C++?",
          "respuestaCorrecta": 1
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "Puede tener una etiqueta default",
            "Requiere break para evitar el fall-through",
            "Admite condiciones con < y >",
            "La expresión debe ser de tipo integral o enum"
          ],
          "enunciado": "¿Cuáles afirmaciones sobre switch en C++ son correctas?",
          "respuestasCorrectas": [
            0,
            1,
            3
          ]
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "Es imposible anidarlo",
            "Es una forma abreviada de if/else que retorna un valor",
            "Devuelve b si cond es falsa",
            "Devuelve a si cond es verdadera"
          ],
          "enunciado": "¿Cuáles son verdaderas sobre el operador ternario cond ? a : b?",
          "respuestasCorrectas": [
            1,
            2,
            3
          ]
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "1",
            "42",
            "-5",
            "0"
          ],
          "enunciado": "¿Cuáles de estos valores se evalúan como verdaderos en una condición de C++?",
          "respuestasCorrectas": [
            0,
            1,
            2
          ]
        },
        {
          "tipo": "pareo",
          "derecha": [
            "Negación (NOT)",
            "Y (AND)",
            "O (OR)"
          ],
          "enunciado": "Empareja cada operador lógico con su significado.",
          "izquierda": [
            "&&",
            "||",
            "!"
          ],
          "correspondencias": [
            1,
            2,
            0
          ]
        },
        {
          "tipo": "pareo",
          "derecha": [
            "Mayor o igual que",
            "Igual a",
            "Distinto de"
          ],
          "enunciado": "Empareja cada operador relacional con su significado.",
          "izquierda": [
            "==",
            "!=",
            ">="
          ],
          "correspondencias": [
            1,
            2,
            0
          ]
        }
      ]
    },
    "avanzado": {
      "umbralAprobacion": 20,
      "preguntas": [
        {
          "tipo": "verdadero-falso",
          "enunciado": "En C++, la evaluación de cortocircuito hace que en a && b, si a es falso, b no se evalúe.",
          "respuestaCorrecta": true
        },
        {
          "tipo": "verdadero-falso",
          "enunciado": "En a || b, si a es verdadero, b siempre se evalúa de todas formas.",
          "respuestaCorrecta": false
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "Una variable protegida",
            "Una condición que retorna temprano para reducir el anidamiento",
            "Un case de switch",
            "Un tipo de bucle"
          ],
          "enunciado": "¿Qué es una \"guard clause\" (cláusula de guarda)?",
          "respuestaCorrecta": 1
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "Una constante inmutable global",
            "Una variable con ámbito limitado al if",
            "Un error de sintaxis",
            "Una variable global"
          ],
          "enunciado": "En if (int n = f(); n > 0) (C++17), ¿qué representa n?",
          "respuestaCorrecta": 1
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "En a || b, si a es verdadero no se evalúa b",
            "Siempre evalúa ambos operandos",
            "Permite evitar accesos inválidos (p. ej. puntero nulo)",
            "En a && b, si a es falso no se evalúa b"
          ],
          "enunciado": "¿Cuáles afirmaciones sobre la evaluación de cortocircuito son correctas?",
          "respuestasCorrectas": [
            0,
            2,
            3
          ]
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "Extraer condiciones a variables/funciones con nombre",
            "Usar guard clauses",
            "Reducir el anidamiento profundo",
            "Anidar tantos if como sea posible"
          ],
          "enunciado": "¿Cuáles son buenas prácticas para condicionales complejos?",
          "respuestasCorrectas": [
            0,
            1,
            2
          ]
        },
        {
          "tipo": "pareo",
          "derecha": [
            "Operador de igualdad",
            "Operador ternario",
            "Operador lógico"
          ],
          "enunciado": "Empareja cada operador con su categoría.",
          "izquierda": [
            "&&",
            "?:",
            "=="
          ],
          "correspondencias": [
            2,
            1,
            0
          ]
        },
        {
          "tipo": "pareo",
          "derecha": [
            "Continuación entre case sin break",
            "Retorno temprano para simplificar la lógica",
            "No evalúa el segundo operando si no hace falta"
          ],
          "enunciado": "Empareja cada concepto con su descripción.",
          "izquierda": [
            "Cortocircuito",
            "Guard clause",
            "Fall-through"
          ],
          "correspondencias": [
            2,
            1,
            0
          ]
        },
        {
          "tipo": "numerica",
          "codigo": "int x = 8;\nint y;\nif (x % 2 == 0) y = x * 2;\nelse y = x + 1;",
          "enunciado": "¿Qué valor final tiene la variable y?",
          "tolerancia": 0,
          "respuestaCorrecta": 16
        },
        {
          "tipo": "numerica",
          "codigo": "int a = 5;\nint r = (a > 3) ? (a * 10) : (a - 1);",
          "enunciado": "¿Qué valor final tiene la variable r?",
          "tolerancia": 0,
          "respuestaCorrecta": 50
        }
      ]
    }
  },
  "bucles": {
    "principiante": {
      "umbralAprobacion": 13,
      "preguntas": [
        {
          "tipo": "verdadero-falso",
          "enunciado": "En C++, un bucle for se usa comúnmente cuando se conoce de antemano el número de iteraciones.",
          "respuestaCorrecta": true
        },
        {
          "tipo": "verdadero-falso",
          "enunciado": "La instrucción break continúa con la siguiente iteración del bucle sin terminarlo.",
          "respuestaCorrecta": false
        },
        {
          "tipo": "verdadero-falso",
          "enunciado": "Un bucle while evalúa su condición antes de ejecutar el cuerpo.",
          "respuestaCorrecta": true
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "continue",
            "stop",
            "break",
            "return next"
          ],
          "enunciado": "¿Qué instrucción termina por completo un bucle en C++?",
          "respuestaCorrecta": 2
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "break",
            "continue",
            "skip",
            "next"
          ],
          "enunciado": "¿Qué instrucción salta a la siguiente iteración sin salir del bucle?",
          "respuestaCorrecta": 1
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "Infinitas",
            "2",
            "3",
            "4"
          ],
          "enunciado": "¿Cuántas veces se ejecuta el cuerpo? for (int i = 0; i < 3; i++)",
          "respuestaCorrecta": 2
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "do-while",
            "for",
            "while",
            "repeat-until"
          ],
          "enunciado": "¿Cuáles son tipos de bucle válidos en C++?",
          "respuestasCorrectas": [
            0,
            1,
            2
          ]
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "else",
            "return",
            "break",
            "continue"
          ],
          "enunciado": "¿Cuáles instrucciones controlan el flujo dentro de un bucle en C++?",
          "respuestasCorrectas": [
            1,
            2,
            3
          ]
        }
      ]
    },
    "intermedio": {
      "umbralAprobacion": 16,
      "preguntas": [
        {
          "tipo": "verdadero-falso",
          "enunciado": "El bucle do-while en C++ ejecuta su cuerpo al menos una vez antes de evaluar la condición.",
          "respuestaCorrecta": true
        },
        {
          "tipo": "verdadero-falso",
          "enunciado": "El bucle for basado en rango (for (int x : v)) solo funciona con arreglos de enteros.",
          "respuestaCorrecta": false
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "Los elementos de un contenedor iterable",
            "Solo los índices",
            "Nada",
            "Solo números"
          ],
          "enunciado": "¿Qué recorre un bucle for (int x : v) (range-based for) en C++?",
          "respuestaCorrecta": 0
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "Se ejecuta una sola vez",
            "Se produce un bucle infinito",
            "Se salta el bucle",
            "Error de compilación"
          ],
          "enunciado": "¿Qué ocurre si la condición de un while nunca se vuelve falsa?",
          "respuestaCorrecta": 1
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "El cuerpo del bucle",
            "La inicialización",
            "La condición del bucle",
            "La expresión de actualización que se ejecuta al final de cada iteración"
          ],
          "enunciado": "En for (int i = 0; i < n; i++), ¿qué representa i++?",
          "respuestaCorrecta": 3
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "Inicialización",
            "Actualización",
            "Condición",
            "Valor de retorno"
          ],
          "enunciado": "¿Cuáles son partes de un bucle for clásico en C++?",
          "respuestasCorrectas": [
            0,
            1,
            2
          ]
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "Requiere punto y coma tras el while",
            "Ejecuta el cuerpo al menos una vez",
            "Evalúa la condición al final",
            "Nunca ejecuta el cuerpo"
          ],
          "enunciado": "¿Cuáles afirmaciones sobre do-while son correctas?",
          "respuestasCorrectas": [
            0,
            1,
            2
          ]
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "for",
            "do-while",
            "range-based for",
            "while"
          ],
          "enunciado": "¿Cuáles bucles evalúan la condición ANTES de la primera iteración?",
          "respuestasCorrectas": [
            0,
            2,
            3
          ]
        },
        {
          "tipo": "pareo",
          "derecha": [
            "Repite mientras se cumpla una condición evaluada al inicio",
            "Ideal cuando se conoce el número de iteraciones",
            "Ejecuta el cuerpo al menos una vez"
          ],
          "enunciado": "Empareja cada bucle con su característica.",
          "izquierda": [
            "for",
            "while",
            "do-while"
          ],
          "correspondencias": [
            1,
            0,
            2
          ]
        },
        {
          "tipo": "pareo",
          "derecha": [
            "Salta a la siguiente iteración",
            "Termina el bucle",
            "Sale de la función"
          ],
          "enunciado": "Empareja cada instrucción con su efecto.",
          "izquierda": [
            "break",
            "continue",
            "return"
          ],
          "correspondencias": [
            1,
            0,
            2
          ]
        }
      ]
    },
    "avanzado": {
      "umbralAprobacion": 20,
      "preguntas": [
        {
          "tipo": "verdadero-falso",
          "enunciado": "Un bucle O(n) anidado dentro de otro O(n) sobre los mismos n elementos produce complejidad O(n²).",
          "respuestaCorrecta": true
        },
        {
          "tipo": "verdadero-falso",
          "enunciado": "La recursividad nunca puede reemplazar a un bucle iterativo.",
          "respuestaCorrecta": false
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "Un bucle for interno",
            "Una variable global",
            "Un break",
            "Un caso base"
          ],
          "enunciado": "¿Qué elemento es indispensable en una función recursiva para evitar recursión infinita?",
          "respuestaCorrecta": 3
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "O(log n)",
            "O(1)",
            "O(n²)",
            "O(n)"
          ],
          "enunciado": "¿Qué complejidad tiene un único bucle que recorre n elementos una vez?",
          "respuestaCorrecta": 3
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "Anidar bucles siempre mejora el rendimiento",
            "Los bucles anidados pueden afectar el rendimiento",
            "Dos bucles anidados sobre n elementos suelen ser O(n²)",
            "La complejidad describe cómo escala el tiempo con la entrada"
          ],
          "enunciado": "¿Cuáles afirmaciones sobre bucles anidados y complejidad son correctas?",
          "respuestasCorrectas": [
            1,
            2,
            3
          ]
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "Requiere un caso base",
            "Sin caso base puede causar desbordamiento de pila",
            "Siempre es más rápida que la iteración",
            "Puede reemplazar ciertos bucles"
          ],
          "enunciado": "¿Cuáles son verdaderas sobre la recursividad?",
          "respuestasCorrectas": [
            0,
            1,
            3
          ]
        },
        {
          "tipo": "pareo",
          "derecha": [
            "O(log n)",
            "O(n)",
            "O(n²)"
          ],
          "enunciado": "Empareja cada patrón de bucle con su complejidad Big O.",
          "izquierda": [
            "Recorrer n elementos una vez",
            "Dos bucles anidados sobre n",
            "Dividir el problema a la mitad cada paso"
          ],
          "correspondencias": [
            1,
            2,
            0
          ]
        },
        {
          "tipo": "pareo",
          "derecha": [
            "Repetición mediante un bucle",
            "Función que se llama a sí misma",
            "Condición que detiene la recursión"
          ],
          "enunciado": "Empareja cada concepto con su definición.",
          "izquierda": [
            "Caso base",
            "Iteración",
            "Recursión"
          ],
          "correspondencias": [
            2,
            0,
            1
          ]
        },
        {
          "tipo": "numerica",
          "codigo": "int suma = 0;\nfor (int i = 1; i <= 5; i++) {\n    suma += i;\n}",
          "enunciado": "¿Cuál es el valor final de suma tras ejecutar el bucle?",
          "tolerancia": 0,
          "respuestaCorrecta": 15
        },
        {
          "tipo": "numerica",
          "codigo": "int producto = 1;\nfor (int i = 1; i <= 4; i++) {\n    producto *= i;\n}",
          "enunciado": "¿Cuál es el valor final de producto tras ejecutar el bucle?",
          "tolerancia": 0,
          "respuestaCorrecta": 24
        }
      ]
    }
  },
  "arreglos": {
    "principiante": {
      "umbralAprobacion": 13,
      "preguntas": [
        {
          "tipo": "verdadero-falso",
          "enunciado": "En C++, el primer elemento de un arreglo tiene índice 0.",
          "respuestaCorrecta": true
        },
        {
          "tipo": "verdadero-falso",
          "enunciado": "En C++, int numeros[5]; declara un arreglo capaz de almacenar 5 enteros.",
          "respuestaCorrecta": true
        },
        {
          "tipo": "verdadero-falso",
          "enunciado": "En C++, acceder a arr[10] en un arreglo de tamaño 5 es siempre seguro y está garantizado.",
          "respuestaCorrecta": false
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "array<int> arr(5);",
            "int arr = [5];",
            "int[5] arr;",
            "int arr[5];"
          ],
          "enunciado": "¿Cómo se declara un arreglo de 5 enteros en C++?",
          "respuestaCorrecta": 3
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "arr.first",
            "arr[1]",
            "arr[0]",
            "arr(0)"
          ],
          "enunciado": "¿Qué índice se usa para acceder al primer elemento de arr?",
          "respuestaCorrecta": 2
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "std::map",
            "std::vector",
            "std::set",
            "std::pair"
          ],
          "enunciado": "¿Qué contenedor de la STL representa un arreglo dinámico redimensionable?",
          "respuestaCorrecta": 1
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "int a[] = {1, 2};",
            "int a[3] = (1, 2, 3);",
            "std::vector<int> v = {1, 2, 3};",
            "int a[3] = {1, 2, 3};"
          ],
          "enunciado": "¿Cuáles son formas válidas de declarar/inicializar arreglos en C++?",
          "respuestasCorrectas": [
            0,
            2,
            3
          ]
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "El tamaño de un arreglo tipo C es fijo",
            "std::vector puede crecer dinámicamente",
            "Los índices comienzan en 0",
            "Todos los arreglos verifican sus límites automáticamente"
          ],
          "enunciado": "¿Cuáles afirmaciones sobre arreglos en C++ son correctas?",
          "respuestasCorrectas": [
            0,
            1,
            2
          ]
        }
      ]
    },
    "intermedio": {
      "umbralAprobacion": 16,
      "preguntas": [
        {
          "tipo": "verdadero-falso",
          "enunciado": "En C++, std::vector puede cambiar su tamaño en tiempo de ejecución con push_back.",
          "respuestaCorrecta": true
        },
        {
          "tipo": "verdadero-falso",
          "enunciado": "El método size() de un std::vector devuelve la capacidad máxima que podrá alcanzar.",
          "respuestaCorrecta": false
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "insert_last()",
            "add()",
            "append()",
            "push_back()"
          ],
          "enunciado": "¿Qué método agrega un elemento al final de un std::vector?",
          "respuestaCorrecta": 3
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "El índice máximo posible",
            "La suma de los elementos",
            "El primer elemento",
            "El número de elementos actuales"
          ],
          "enunciado": "¿Qué devuelve v.size() en un std::vector?",
          "respuestaCorrecta": 3
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "for (int x : v)",
            "for x = v",
            "foreach (v as x)",
            "for (x in v)"
          ],
          "enunciado": "¿Cómo se recorre un vector v con un bucle basado en rango?",
          "respuestaCorrecta": 0
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "pop_back()",
            "push_back()",
            "size()",
            "at()"
          ],
          "enunciado": "¿Cuáles son métodos válidos de std::vector?",
          "respuestasCorrectas": [
            0,
            1,
            2,
            3
          ]
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "vector puede redimensionarse",
            "vector conoce su propio tamaño",
            "El arreglo C conoce su tamaño con .size()",
            "El arreglo C tiene tamaño fijo"
          ],
          "enunciado": "¿Cuáles afirmaciones sobre std::vector frente a un arreglo tipo C son correctas?",
          "respuestasCorrectas": [
            0,
            1,
            3
          ]
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "v.get(i)",
            "v.front()",
            "v.at(i)",
            "v[i]"
          ],
          "enunciado": "¿Cuáles formas de acceder a elementos de un vector existen?",
          "respuestasCorrectas": [
            1,
            2,
            3
          ]
        },
        {
          "tipo": "pareo",
          "derecha": [
            "Devuelve el número de elementos",
            "Elimina el último elemento",
            "Agrega un elemento al final"
          ],
          "enunciado": "Empareja cada método de std::vector con su función.",
          "izquierda": [
            "push_back()",
            "size()",
            "pop_back()"
          ],
          "correspondencias": [
            2,
            0,
            1
          ]
        },
        {
          "tipo": "pareo",
          "derecha": [
            "Primer elemento",
            "Elemento i con verificación de límites",
            "Último elemento"
          ],
          "enunciado": "Empareja cada acceso con su descripción.",
          "izquierda": [
            "v.front()",
            "v.back()",
            "v.at(i)"
          ],
          "correspondencias": [
            0,
            2,
            1
          ]
        }
      ]
    },
    "avanzado": {
      "umbralAprobacion": 20,
      "preguntas": [
        {
          "tipo": "verdadero-falso",
          "enunciado": "Acceder a un elemento de un arreglo por su índice (arr[i]) tiene complejidad O(1).",
          "respuestaCorrecta": true
        },
        {
          "tipo": "verdadero-falso",
          "enunciado": "Buscar un valor desconocido recorriendo un arreglo no ordenado tiene, en el peor caso, complejidad O(1).",
          "respuestaCorrecta": false
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "O(1)",
            "O(n²)",
            "O(log n)",
            "O(n)"
          ],
          "enunciado": "¿Qué complejidad tiene, en el peor caso, la búsqueda lineal en un arreglo no ordenado de n elementos?",
          "respuestaCorrecta": 3
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "O(n²)",
            "O(1)",
            "O(log n)",
            "O(n)"
          ],
          "enunciado": "¿Qué complejidad tiene la búsqueda binaria en un arreglo ORDENADO de n elementos?",
          "respuestaCorrecta": 2
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "Acceso por índice: O(n)",
            "Acceso por índice: O(1)",
            "Búsqueda lineal: O(n)",
            "Búsqueda binaria (ordenado): O(log n)"
          ],
          "enunciado": "¿Cuáles afirmaciones sobre complejidad en arreglos son correctas?",
          "respuestasCorrectas": [
            1,
            2,
            3
          ]
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "Descarta la mitad de los elementos en cada paso",
            "El arreglo debe estar ordenado",
            "Funciona igual en arreglos desordenados",
            "Tiene complejidad O(log n)"
          ],
          "enunciado": "¿Cuáles son requisitos o características de la búsqueda binaria?",
          "respuestasCorrectas": [
            0,
            1,
            3
          ]
        },
        {
          "tipo": "pareo",
          "derecha": [
            "O(log n)",
            "O(n)",
            "O(1)"
          ],
          "enunciado": "Empareja cada operación sobre arreglos con su complejidad.",
          "izquierda": [
            "Acceso por índice",
            "Búsqueda lineal",
            "Búsqueda binaria (ordenado)"
          ],
          "correspondencias": [
            2,
            1,
            0
          ]
        },
        {
          "tipo": "pareo",
          "derecha": [
            "O(n log n)",
            "O(n²)",
            "O(1)"
          ],
          "enunciado": "Empareja cada algoritmo con su complejidad promedio.",
          "izquierda": [
            "Bubble sort",
            "Merge sort",
            "Acceso directo por índice"
          ],
          "correspondencias": [
            1,
            0,
            2
          ]
        },
        {
          "tipo": "numerica",
          "codigo": "int arr[4] = {10, 20, 30, 40};\nint suma = 0;\nfor (int i = 0; i < 4; i++) {\n    suma += arr[i];\n}",
          "enunciado": "¿Cuál es el valor final de suma (suma de todos los elementos)?",
          "tolerancia": 0,
          "respuestaCorrecta": 100
        },
        {
          "tipo": "numerica",
          "codigo": "int arr[3] = {2, 4, 6};\narr[2] = arr[0] * arr[1];",
          "enunciado": "¿Qué valor tiene arr[2] después de ejecutar el código?",
          "tolerancia": 0,
          "respuestaCorrecta": 8
        }
      ]
    }
  },
  "estructuras-datos": {
    "principiante": {
      "umbralAprobacion": 13,
      "preguntas": [
        {
          "tipo": "verdadero-falso",
          "enunciado": "Una pila (stack) sigue el principio LIFO: el último elemento en entrar es el primero en salir.",
          "respuestaCorrecta": true
        },
        {
          "tipo": "verdadero-falso",
          "enunciado": "Una cola (queue) sigue el principio LIFO.",
          "respuestaCorrecta": false
        },
        {
          "tipo": "verdadero-falso",
          "enunciado": "En C++, std::stack y std::queue son contenedores adaptadores de la biblioteca estándar.",
          "respuestaCorrecta": true
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "Orden alfabético",
            "Orden aleatorio",
            "FIFO (primero en entrar, primero en salir)",
            "LIFO (último en entrar, primero en salir)"
          ],
          "enunciado": "¿Qué principio sigue una pila (stack)?",
          "respuestaCorrecta": 3
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "enqueue()",
            "push()",
            "add()",
            "insert()"
          ],
          "enunciado": "¿Qué operación agrega un elemento a una std::stack en C++?",
          "respuestaCorrecta": 1
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "Árbol",
            "Conjunto",
            "Cola (queue)",
            "Pila (stack)"
          ],
          "enunciado": "¿Qué estructura sigue el principio FIFO?",
          "respuestaCorrecta": 2
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "std::vector",
            "std::stack",
            "std::queue",
            "std::map"
          ],
          "enunciado": "¿Cuáles son contenedores o adaptadores de la STL de C++?",
          "respuestasCorrectas": [
            0,
            1,
            2,
            3
          ]
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "La cola es FIFO",
            "push agrega un elemento a la pila",
            "La pila es LIFO",
            "La cola es LIFO"
          ],
          "enunciado": "¿Cuáles afirmaciones sobre pilas y colas son correctas?",
          "respuestasCorrectas": [
            0,
            1,
            2
          ]
        }
      ]
    },
    "intermedio": {
      "umbralAprobacion": 16,
      "preguntas": [
        {
          "tipo": "verdadero-falso",
          "enunciado": "En una lista enlazada, cada nodo contiene un dato y una referencia (puntero) al siguiente nodo.",
          "respuestaCorrecta": true
        },
        {
          "tipo": "verdadero-falso",
          "enunciado": "Un std::map en C++ permite claves duplicadas.",
          "respuestaCorrecta": false
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "Los elementos se acceden solo por índice",
            "Cada nodo apunta al siguiente mediante un puntero",
            "Es igual a un arreglo estático",
            "Tiene tamaño fijo"
          ],
          "enunciado": "¿Qué caracteriza a una lista enlazada?",
          "respuestaCorrecta": 1
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "std::stack",
            "std::vector",
            "std::array",
            "std::map"
          ],
          "enunciado": "¿Qué contenedor de C++ almacena pares clave-valor con claves únicas y ordenadas?",
          "respuestaCorrecta": 3
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "std::array",
            "std::queue",
            "std::set",
            "std::vector"
          ],
          "enunciado": "¿Qué contenedor almacena únicamente valores únicos?",
          "respuestaCorrecta": 2
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "Las claves son únicas",
            "Almacena pares clave-valor",
            "Mantiene las claves ordenadas",
            "Permite claves duplicadas"
          ],
          "enunciado": "¿Cuáles afirmaciones sobre std::map son correctas?",
          "respuestasCorrectas": [
            0,
            1,
            2
          ]
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "Puede crecer dinámicamente",
            "Acceso por índice en O(1)",
            "No requiere memoria contigua",
            "Inserción/eliminación eficiente en los extremos"
          ],
          "enunciado": "¿Cuáles son ventajas de una lista enlazada frente a un arreglo?",
          "respuestasCorrectas": [
            0,
            2,
            3
          ]
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "std::unordered_map",
            "std::set",
            "std::stack",
            "std::map"
          ],
          "enunciado": "¿Cuáles son contenedores asociativos de la STL?",
          "respuestasCorrectas": [
            0,
            1,
            3
          ]
        },
        {
          "tipo": "pareo",
          "derecha": [
            "FIFO",
            "LIFO",
            "Nodos enlazados por punteros"
          ],
          "enunciado": "Empareja cada estructura con su principio o característica.",
          "izquierda": [
            "Pila (stack)",
            "Cola (queue)",
            "Lista enlazada"
          ],
          "correspondencias": [
            1,
            0,
            2
          ]
        },
        {
          "tipo": "pareo",
          "derecha": [
            "Pares clave-valor únicos",
            "Arreglo dinámico",
            "Valores únicos"
          ],
          "enunciado": "Empareja cada contenedor de C++ con su propósito.",
          "izquierda": [
            "std::map",
            "std::set",
            "std::vector"
          ],
          "correspondencias": [
            0,
            2,
            1
          ]
        }
      ]
    },
    "avanzado": {
      "umbralAprobacion": 20,
      "preguntas": [
        {
          "tipo": "verdadero-falso",
          "enunciado": "Un árbol binario de búsqueda (BST) mantiene los valores menores a la izquierda y los mayores a la derecha de cada nodo.",
          "respuestaCorrecta": true
        },
        {
          "tipo": "verdadero-falso",
          "enunciado": "Un std::unordered_map garantiza recorrer sus elementos en orden ascendente de claves.",
          "respuestaCorrecta": false
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "O(n)",
            "O(log n)",
            "O(1)",
            "O(n²)"
          ],
          "enunciado": "¿Qué complejidad promedio tiene la búsqueda en un std::unordered_map (tabla hash)?",
          "respuestaCorrecta": 2
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "O(log n)",
            "O(n²)",
            "O(n)",
            "O(1)"
          ],
          "enunciado": "¿Qué complejidad tiene la búsqueda en un árbol binario de búsqueda balanceado?",
          "respuestaCorrecta": 0
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "La búsqueda balanceada es O(log n)",
            "Cada nodo tiene como máximo dos hijos",
            "Los valores menores van a la izquierda",
            "No mantienen ningún orden"
          ],
          "enunciado": "¿Cuáles afirmaciones sobre árboles binarios de búsqueda son correctas?",
          "respuestasCorrectas": [
            0,
            1,
            2
          ]
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "Árbol binario de búsqueda",
            "Árbol",
            "Grafo",
            "Cola"
          ],
          "enunciado": "¿Cuáles de las siguientes son estructuras de datos no lineales?",
          "respuestasCorrectas": [
            0,
            1,
            2
          ]
        },
        {
          "tipo": "pareo",
          "derecha": [
            "O(n)",
            "O(log n)",
            "O(1)"
          ],
          "enunciado": "Empareja cada estructura con su complejidad de búsqueda promedio.",
          "izquierda": [
            "Tabla hash (unordered_map)",
            "BST balanceado",
            "Arreglo no ordenado"
          ],
          "correspondencias": [
            2,
            1,
            0
          ]
        },
        {
          "tipo": "pareo",
          "derecha": [
            "Raíz, izquierda, derecha",
            "Izquierda, raíz, derecha",
            "Izquierda, derecha, raíz"
          ],
          "enunciado": "Empareja cada recorrido de árbol con su orden de visita.",
          "izquierda": [
            "In-order",
            "Pre-order",
            "Post-order"
          ],
          "correspondencias": [
            1,
            0,
            2
          ]
        },
        {
          "tipo": "numerica",
          "codigo": "std::stack<int> s;\ns.push(3);\ns.push(7);\ns.push(9);\ns.pop();\n// s.top() = ?",
          "enunciado": "Una pila vacía recibe estas operaciones. ¿Qué valor queda en el tope (top) al final?",
          "tolerancia": 0,
          "respuestaCorrecta": 7
        },
        {
          "tipo": "numerica",
          "codigo": "std::queue<int> q;\nq.push(1);\nq.push(2);\nq.push(3);\nq.pop();\n// q.front() = ?",
          "enunciado": "Una cola vacía recibe estas operaciones. ¿Qué valor está al frente (front) al final?",
          "tolerancia": 0,
          "respuestaCorrecta": 2
        }
      ]
    }
  },
  "funciones": {
    "principiante": {
      "umbralAprobacion": 13,
      "preguntas": [
        {
          "tipo": "verdadero-falso",
          "enunciado": "En C++, una función puede devolver un valor usando la instrucción return.",
          "respuestaCorrecta": true
        },
        {
          "tipo": "verdadero-falso",
          "enunciado": "En C++, una función con tipo de retorno void no devuelve ningún valor.",
          "respuestaCorrecta": true
        },
        {
          "tipo": "verdadero-falso",
          "enunciado": "En C++, los parámetros de una función son valores fijos que nunca pueden cambiar dentro de ella.",
          "respuestaCorrecta": false
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "int suma(int a, int b)",
            "def suma(int a, int b)",
            "int suma[int a, int b]",
            "function suma(a, b)"
          ],
          "enunciado": "¿Cómo se declara una función que recibe dos enteros y devuelve un entero en C++?",
          "respuestaCorrecta": 0
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "break",
            "exit",
            "return",
            "yield"
          ],
          "enunciado": "¿Qué palabra clave devuelve un valor desde una función?",
          "respuestaCorrecta": 2
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "null",
            "void",
            "none",
            "empty"
          ],
          "enunciado": "¿Qué tipo de retorno indica que una función no devuelve valor?",
          "respuestaCorrecta": 1
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "Nombre",
            "Tipo de retorno",
            "Lista de parámetros",
            "Cuerpo"
          ],
          "enunciado": "¿Cuáles son partes de la definición de una función en C++?",
          "respuestasCorrectas": [
            0,
            1,
            2,
            3
          ]
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "Pueden recibir parámetros",
            "Pueden devolver un valor",
            "void indica que no devuelve valor",
            "Siempre deben devolver un int"
          ],
          "enunciado": "¿Cuáles afirmaciones sobre funciones en C++ son correctas?",
          "respuestasCorrectas": [
            0,
            1,
            2
          ]
        }
      ]
    },
    "intermedio": {
      "umbralAprobacion": 16,
      "preguntas": [
        {
          "tipo": "verdadero-falso",
          "enunciado": "En C++, pasar un parámetro por referencia (int& x) permite que la función modifique la variable original del llamador.",
          "respuestaCorrecta": true
        },
        {
          "tipo": "verdadero-falso",
          "enunciado": "En C++ no es posible que dos funciones compartan el mismo nombre.",
          "respuestaCorrecta": false
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "Cambiar el tipo de una variable",
            "Definir varias funciones con el mismo nombre pero distintos parámetros",
            "Ejecutar bucles infinitos",
            "Eliminar funciones"
          ],
          "enunciado": "¿Qué permite la sobrecarga de funciones (function overloading) en C++?",
          "respuestaCorrecta": 1
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "Por referencia siempre es más lento",
            "Por valor se copia el argumento; por referencia se opera sobre el original",
            "Por valor modifica el original",
            "No hay ninguna diferencia"
          ],
          "enunciado": "¿Qué diferencia hay entre pasar por valor y por referencia?",
          "respuestaCorrecta": 1
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "Valores que se usan si no se proporciona el argumento",
            "Parámetros siempre obligatorios",
            "Variables globales",
            "Parámetros que no se pueden cambiar"
          ],
          "enunciado": "¿Qué son los parámetros por defecto en C++?",
          "respuestaCorrecta": 0
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "Por referencia (&)",
            "Por puntero (*)",
            "Por herencia",
            "Por valor"
          ],
          "enunciado": "¿Cuáles son formas de pasar parámetros en C++?",
          "respuestasCorrectas": [
            0,
            1,
            3
          ]
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "No basta con cambiar solo el tipo de retorno",
            "El compilador elige según los argumentos",
            "Mismo nombre, distinta lista de parámetros",
            "Requiere nombres totalmente distintos"
          ],
          "enunciado": "¿Cuáles afirmaciones sobre la sobrecarga de funciones son correctas?",
          "respuestasCorrectas": [
            0,
            1,
            2
          ]
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "Permite modificar el original",
            "Siempre crea una copia del argumento",
            "Se declara con &",
            "Evita copiar el argumento"
          ],
          "enunciado": "¿Cuáles son verdaderas sobre el paso por referencia?",
          "respuestasCorrectas": [
            0,
            2,
            3
          ]
        },
        {
          "tipo": "pareo",
          "derecha": [
            "Modifica el original",
            "Acceso sin copia y sin poder modificar",
            "Copia el argumento"
          ],
          "enunciado": "Empareja cada forma de paso de parámetros con su efecto.",
          "izquierda": [
            "Por valor",
            "Por referencia",
            "const por referencia"
          ],
          "correspondencias": [
            2,
            0,
            1
          ]
        },
        {
          "tipo": "pareo",
          "derecha": [
            "Mismo nombre, distintos parámetros",
            "Lo que devuelve la función",
            "Valor usado si falta el argumento"
          ],
          "enunciado": "Empareja cada concepto con su descripción.",
          "izquierda": [
            "Sobrecarga",
            "Parámetro por defecto",
            "Valor de retorno"
          ],
          "correspondencias": [
            0,
            2,
            1
          ]
        }
      ]
    },
    "avanzado": {
      "umbralAprobacion": 20,
      "preguntas": [
        {
          "tipo": "verdadero-falso",
          "enunciado": "Una función recursiva debe tener un caso base para no producir recursión infinita.",
          "respuestaCorrecta": true
        },
        {
          "tipo": "verdadero-falso",
          "enunciado": "La palabra clave inline garantiza siempre que el compilador expanda la función en el punto de llamada.",
          "respuestaCorrecta": false
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "Un tipo de bucle",
            "Una variable constante",
            "Una función global obligatoria",
            "Una función anónima que puede definirse en el lugar donde se usa"
          ],
          "enunciado": "¿Qué es una función lambda en C++?",
          "respuestaCorrecta": 3
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "Se convierte en iterativa",
            "Ningún riesgo",
            "Se ejecuta más rápido",
            "Desbordamiento de pila (stack overflow)"
          ],
          "enunciado": "¿Qué riesgo tiene una función recursiva sin caso base?",
          "respuestaCorrecta": 3
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "Nunca pueden reemplazarse por bucles",
            "Sin caso base pueden desbordar la pila",
            "Requieren un caso base",
            "Se llaman a sí mismas"
          ],
          "enunciado": "¿Cuáles afirmaciones sobre funciones recursivas son correctas?",
          "respuestasCorrectas": [
            1,
            2,
            3
          ]
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "Se pueden asignar a variables",
            "No pueden recibir parámetros",
            "Son funciones anónimas",
            "Pueden capturar variables del entorno"
          ],
          "enunciado": "¿Cuáles son características de las funciones lambda en C++?",
          "respuestasCorrectas": [
            0,
            2,
            3
          ]
        },
        {
          "tipo": "pareo",
          "derecha": [
            "Función anónima en línea",
            "Función que se llama a sí misma",
            "Condición que detiene la recursión"
          ],
          "enunciado": "Empareja cada concepto de funciones con su descripción.",
          "izquierda": [
            "Recursión",
            "Lambda",
            "Caso base"
          ],
          "correspondencias": [
            1,
            0,
            2
          ]
        },
        {
          "tipo": "pareo",
          "derecha": [
            "Vincula la función al archivo o a la clase",
            "Sugiere expandir la función en el llamado",
            "Indica que un método no modifica el objeto"
          ],
          "enunciado": "Empareja cada especificador de función con su propósito.",
          "izquierda": [
            "inline",
            "const",
            "static"
          ],
          "correspondencias": [
            1,
            2,
            0
          ]
        },
        {
          "tipo": "numerica",
          "codigo": "int cuadrado(int n) {\n    return n * n;\n}\n// cuadrado(6) = ?",
          "enunciado": "Dada la función, ¿qué valor devuelve cuadrado(6)?",
          "tolerancia": 0,
          "respuestaCorrecta": 36
        },
        {
          "tipo": "numerica",
          "codigo": "int factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}\n// factorial(4) = ?",
          "enunciado": "Dada la función recursiva, ¿qué valor devuelve factorial(4)?",
          "tolerancia": 0,
          "respuestaCorrecta": 24
        }
      ]
    }
  },
  "poo": {
    "principiante": {
      "umbralAprobacion": 13,
      "preguntas": [
        {
          "tipo": "verdadero-falso",
          "enunciado": "En C++, una clase es una plantilla a partir de la cual se crean objetos.",
          "respuestaCorrecta": true
        },
        {
          "tipo": "verdadero-falso",
          "enunciado": "En C++, un objeto es una instancia de una clase.",
          "respuestaCorrecta": true
        },
        {
          "tipo": "verdadero-falso",
          "enunciado": "En C++, el constructor de una clase se ejecuta automáticamente al destruir un objeto.",
          "respuestaCorrecta": false
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "El destructor",
            "El constructor",
            "Un getter",
            "La función main"
          ],
          "enunciado": "¿Qué método especial se ejecuta automáticamente al crear un objeto en C++?",
          "respuestaCorrecta": 1
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "define",
            "class",
            "type",
            "object"
          ],
          "enunciado": "¿Con qué palabra clave se define una clase en C++?",
          "respuestaCorrecta": 1
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "Solo bucles",
            "Solo variables globales",
            "Solo condicionales",
            "Atributos (datos) y métodos (funciones)"
          ],
          "enunciado": "¿Qué contiene típicamente una clase en C++?",
          "respuestaCorrecta": 3
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "Polimorfismo",
            "Encapsulamiento",
            "Recursión",
            "Herencia"
          ],
          "enunciado": "¿Cuáles son pilares fundamentales de la POO?",
          "respuestasCorrectas": [
            0,
            1,
            3
          ]
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "El objeto es una instancia",
            "El constructor inicializa el objeto",
            "La clase es una plantilla",
            "La clase es una instancia del objeto"
          ],
          "enunciado": "¿Cuáles afirmaciones sobre clases y objetos en C++ son correctas?",
          "respuestasCorrectas": [
            0,
            1,
            2
          ]
        }
      ]
    },
    "intermedio": {
      "umbralAprobacion": 16,
      "preguntas": [
        {
          "tipo": "verdadero-falso",
          "enunciado": "En C++, los miembros declarados como private no son accesibles directamente desde fuera de la clase.",
          "respuestaCorrecta": true
        },
        {
          "tipo": "verdadero-falso",
          "enunciado": "En C++, la palabra clave public oculta los miembros de una clase.",
          "respuestaCorrecta": false
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "extern",
            "private",
            "global",
            "public"
          ],
          "enunciado": "¿Qué especificador de acceso oculta los detalles internos de una clase?",
          "respuestaCorrecta": 1
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "Definir variables globales",
            "Que una clase derive atributos y métodos de otra",
            "Crear bucles",
            "Eliminar clases"
          ],
          "enunciado": "¿Qué permite la herencia en C++?",
          "respuestaCorrecta": 1
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "class Derivada -> Base",
            "class Derivada : public Base",
            "class Derivada extends Base",
            "class Derivada inherits Base"
          ],
          "enunciado": "¿Cómo se hereda públicamente de una clase Base en C++?",
          "respuestaCorrecta": 1
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "private",
            "protected",
            "internal",
            "public"
          ],
          "enunciado": "¿Cuáles son especificadores de acceso en C++?",
          "respuestasCorrectas": [
            0,
            1,
            3
          ]
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "Oculta los detalles internos",
            "Se logra con especificadores de acceso",
            "Elimina la necesidad de métodos",
            "Expone una interfaz controlada"
          ],
          "enunciado": "¿Cuáles afirmaciones sobre el encapsulamiento son correctas?",
          "respuestasCorrectas": [
            0,
            1,
            3
          ]
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "Se usa el operador : para heredar",
            "La clase derivada hereda de la base",
            "Impide el polimorfismo",
            "Permite reutilizar código"
          ],
          "enunciado": "¿Cuáles afirmaciones sobre la herencia en C++ son correctas?",
          "respuestasCorrectas": [
            0,
            1,
            3
          ]
        },
        {
          "tipo": "pareo",
          "derecha": [
            "Accesible en la clase y sus derivadas",
            "Accesible desde cualquier parte",
            "Accesible solo dentro de la clase"
          ],
          "enunciado": "Empareja cada especificador de acceso con su significado.",
          "izquierda": [
            "public",
            "private",
            "protected"
          ],
          "correspondencias": [
            1,
            2,
            0
          ]
        },
        {
          "tipo": "pareo",
          "derecha": [
            "Un mismo método con comportamientos distintos",
            "Ocultar los datos internos",
            "Derivar de otra clase"
          ],
          "enunciado": "Empareja cada pilar de la POO con su descripción.",
          "izquierda": [
            "Encapsulamiento",
            "Herencia",
            "Polimorfismo"
          ],
          "correspondencias": [
            1,
            2,
            0
          ]
        }
      ]
    },
    "avanzado": {
      "umbralAprobacion": 20,
      "preguntas": [
        {
          "tipo": "verdadero-falso",
          "enunciado": "En C++, una función virtual permite el polimorfismo en tiempo de ejecución mediante clases derivadas.",
          "respuestaCorrecta": true
        },
        {
          "tipo": "verdadero-falso",
          "enunciado": "En C++, una clase con al menos una función virtual pura no puede instanciarse directamente.",
          "respuestaCorrecta": true
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "Una función global",
            "Un constructor especial",
            "Una función declarada con = 0 que las clases derivadas deben implementar",
            "Una función que no recibe parámetros"
          ],
          "enunciado": "¿Qué es una función virtual pura en C++?",
          "respuestaCorrecta": 2
        },
        {
          "tipo": "seleccion-simple",
          "opciones": [
            "Encapsulamiento",
            "Recursión",
            "Iteración",
            "Polimorfismo"
          ],
          "enunciado": "¿Qué pilar de la POO permite tratar objetos de distintas clases mediante una interfaz común?",
          "respuestaCorrecta": 3
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "Se logra con funciones virtuales",
            "Funciona en tiempo de ejecución con punteros/referencias a la base",
            "No requiere ninguna herencia",
            "Permite sobrescribir métodos en las clases derivadas"
          ],
          "enunciado": "¿Cuáles afirmaciones sobre el polimorfismo en C++ son correctas?",
          "respuestasCorrectas": [
            0,
            1,
            3
          ]
        },
        {
          "tipo": "seleccion-multiple",
          "opciones": [
            "No puede instanciarse directamente",
            "Se instancia con new directamente",
            "Sirve como interfaz o clase base",
            "Tiene al menos una función virtual pura"
          ],
          "enunciado": "¿Cuáles son características de una clase abstracta en C++?",
          "respuestasCorrectas": [
            0,
            2,
            3
          ]
        },
        {
          "tipo": "pareo",
          "derecha": [
            "Se declara con = 0 y debe implementarse",
            "Permite la sobrescritura polimórfica",
            "No puede instanciarse directamente"
          ],
          "enunciado": "Empareja cada concepto avanzado de POO con su descripción.",
          "izquierda": [
            "Función virtual",
            "Función virtual pura",
            "Clase abstracta"
          ],
          "correspondencias": [
            1,
            0,
            2
          ]
        },
        {
          "tipo": "pareo",
          "derecha": [
            "Inicializa el objeto",
            "Permite el polimorfismo",
            "Libera recursos al destruirlo"
          ],
          "enunciado": "Empareja cada método especial con su rol.",
          "izquierda": [
            "Constructor",
            "Destructor",
            "Método virtual"
          ],
          "correspondencias": [
            0,
            2,
            1
          ]
        },
        {
          "tipo": "numerica",
          "codigo": "class Rectangulo {\n    int ancho, alto;\npublic:\n    Rectangulo(int a, int h) : ancho(a), alto(h) {}\n    int getArea() { return ancho * alto; }\n};\nRectangulo p(4, 5);\n// p.getArea() = ?",
          "enunciado": "Dado el código, ¿qué valor devuelve p.getArea() para un rectángulo de 4×5?",
          "tolerancia": 0,
          "respuestaCorrecta": 20
        },
        {
          "tipo": "numerica",
          "codigo": "class Contador {\n    int valor = 0;\npublic:\n    void incrementar() { valor++; }\n    int getValor() { return valor; }\n};\nContador c;\nc.incrementar();\nc.incrementar();\nc.incrementar();\n// c.getValor() = ?",
          "enunciado": "Dado el código, ¿qué valor final devuelve c.getValor()?",
          "tolerancia": 0,
          "respuestaCorrecta": 3
        }
      ]
    }
  }
};
