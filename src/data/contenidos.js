// Backup local de los contenidos (respaldo de la tabla `contenidos` de
// Supabase). src/services/contenidos.js usa este archivo como respaldo
// automático cuando Supabase no está configurado o la consulta falla.
//
// Generado automáticamente desde producción el 2026-08-09 con
// scripts/generarBackupLocal.mjs — no editar contenidos de temas que sí
// existen en producción directamente aquí, hazlo desde el panel de admin y
// vuelve a correr el script. Los temas que no tienen fila en Supabase (p.
// ej. el propedéutico de aritmética) sí se mantienen y editan solo aquí.
// El campo `tipo` corresponde a una clave de TIPOS_CONTENIDO (ver
// src/data/tiposContenido.js).
export const CONTENIDOS = {
  "propedeutico-aritmetica": {
    "principiante": [
      {
        "nombre": "Suma y resta",
        "descripcion": "Repaso de la suma y la resta de números naturales.",
        "url": "https://es.khanacademy.org/math/arithmetic/arith-review-add-subtract",
        "tipo": "documentacion"
      },
      {
        "nombre": "Multiplicación",
        "descripcion": "Concepto y tablas de multiplicar.",
        "url": "https://es.khanacademy.org/math/arithmetic/arith-review-multiply-divide",
        "tipo": "documentacion"
      },
      {
        "nombre": "División con residuo",
        "descripcion": "Cómo dividir y qué significa el residuo.",
        "url": "https://www.disfrutalasmatematicas.com/numeros/division.html",
        "tipo": "guia"
      }
    ],
    "intermedio": [
      {
        "nombre": "Fracciones",
        "descripcion": "Qué es una fracción y fracciones equivalentes.",
        "url": "https://es.khanacademy.org/math/arithmetic/fraction-arithmetic",
        "tipo": "documentacion"
      },
      {
        "nombre": "Porcentajes",
        "descripcion": "Cálculo de porcentajes de un número.",
        "url": "https://www.disfrutalasmatematicas.com/numeros/porcentajes-menu.html",
        "tipo": "guia"
      },
      {
        "nombre": "Jerarquía de operaciones",
        "descripcion": "Orden en que se resuelven las operaciones combinadas.",
        "url": "https://es.khanacademy.org/math/arithmetic/arith-review-order-of-operations",
        "tipo": "documentacion"
      }
    ],
    "avanzado": [
      {
        "nombre": "Potencias y raíces",
        "descripcion": "Exponentes, potencias y raíz cuadrada.",
        "url": "https://www.disfrutalasmatematicas.com/algebra/exponentes.html",
        "tipo": "guia"
      },
      {
        "nombre": "MCD y mcm",
        "descripcion": "Máximo común divisor y mínimo común múltiplo.",
        "url": "https://www.disfrutalasmatematicas.com/numeros/minimo-comun-multiplo.html",
        "tipo": "guia"
      },
      {
        "nombre": "Proporciones y regla de tres",
        "descripcion": "Razones, proporciones y regla de tres simple.",
        "url": "https://es.khanacademy.org/math/arithmetic/arith-review-ratios-proportions",
        "tipo": "documentacion"
      }
    ]
  },
  "variables": {
    "principiante": [
      {
        "url": "https://www.programarya.com/Cursos/C++/Sistema-de-Tipos/Variables-y-Constantes",
        "tipo": "lectura",
        "nombre": "Variables en C++",
        "descripcion": "Introducción al concepto de variable en programación."
      },
      {
        "url": "https://www.youtube.com/watch?v=YVlg0fC9Qgc",
        "tipo": "video",
        "nombre": "Programación en C++ 📗 variables y tipos de datos con C++",
        "descripcion": "Sintaxis básica con var, let y const."
      },
      {
        "url": "https://www-geeksforgeeks-org.translate.goog/cpp/cpp-variables/?_x_tr_sl=en&_x_tr_tl=es&_x_tr_hl=es&_x_tr_pto=tc&_x_tr_hist=true",
        "tipo": "infografia",
        "nombre": "Variables en C++",
        "descripcion": "Buenas prácticas para nombrar variables."
      },
      {
        "url": "https://oregoom.com/cpp/operadores/",
        "tipo": "lectura",
        "nombre": "Operadores aritméticos en C++",
        "descripcion": "Operaciones Básicas, División Entera, Operadores de Asignación y Compuestos, Operadores de Comparación, Operadores Lógicos, Operadores Bit a Bit y El Operador Ternario Condicional"
      },
      {
        "url": "https://www.youtube.com/watch?v=kZfuJvkdcHU&t=1s",
        "tipo": "video",
        "nombre": "¿QUE es una VARIABLE en PROGRAMACIÓN?",
        "descripcion": ""
      }
    ],
    "intermedio": [
      {
        "url": "https://www-w3schools-com.translate.goog/cpp/cpp_variables.asp?_x_tr_sl=en&_x_tr_tl=es&_x_tr_hl=es&_x_tr_pto=tc",
        "tipo": "lectura",
        "nombre": "Variables C++",
        "descripcion": "Declaración de variables. Cambio de valores de variables"
      },
      {
        "url": "https://es.slideshare.net/slideshow/variables-y-constantes-en-c-56927192/56927192",
        "tipo": "infografia",
        "nombre": "Variables y Constantes",
        "descripcion": "Comparación detallada y casos de uso."
      },
      {
        "url": "https://www-programiz-com.translate.goog/cpp-programming/variables-literals?_x_tr_sl=en&_x_tr_tl=es&_x_tr_hl=es&_x_tr_pto=tc",
        "tipo": "lectura",
        "nombre": "Variables, literales y constantes en C++",
        "descripcion": "Comparación entre variables, literales y constantes en C++"
      },
      {
        "url": "https://intellipaat-com.translate.goog/blog/cpp-logical-operators/?_x_tr_sl=en&_x_tr_tl=es&_x_tr_hl=es&_x_tr_pto=tc",
        "tipo": "lectura",
        "nombre": "Operadores lógicos en C++",
        "descripcion": "¿Qué son los operadores lógicos? Tipos de operadores lógicos, precedencia y asociatividad"
      },
      {
        "url": "https://www-w3schools-com.translate.goog/cpp/cpp_operators_comparison.asp?_x_tr_sl=en&_x_tr_tl=es&_x_tr_hl=es&_x_tr_pto=tc",
        "tipo": "guia",
        "nombre": "Operadores de comparación en C++",
        "descripcion": "Operadores de comparación, ejemplos y pruebas"
      },
      {
        "url": "https://www.geeksforgeeks.org/cpp/cpp-variables/",
        "tipo": "articulo",
        "nombre": "Variables in C++",
        "descripcion": ""
      },
      {
        "url": "https://www.youtube.com/watch?v=2hr4lIuR3Ps",
        "tipo": "video",
        "nombre": "Curso Maestro de C++: Variables y Tipos de Datos en C++",
        "descripcion": ""
      }
    ],
    "avanzado": [
      {
        "url": "https://learn.microsoft.com/es-es/cpp/cpp/storage-classes-cpp?view=msvc-170",
        "tipo": "documentacion",
        "nombre": "Clases de almacenamiento",
        "descripcion": "Especificadores en C++"
      },
      {
        "url": "https://oregoom.com/cpp/constantes/",
        "tipo": "documentacion",
        "nombre": "Constantes en C++",
        "descripcion": "Concepto de inmutabilidad"
      },
      {
        "url": "https://es.scribd.com/document/672734888/tipos-variables",
        "tipo": "lectura",
        "nombre": "Tipos de Variables en C++",
        "descripcion": "El documento describe los tipos de datos y variables en C++. Explica conceptos como tipos, bloques de memoria, tipos nativos, constantes literales, expresiones, sentencias y variables."
      }
    ]
  },
  "tipos-datos": {
    "principiante": [
      {
        "url": "https://openwebinars.net/blog/principales-tipos-de-datos-en-c/",
        "tipo": "articulo",
        "nombre": "Principales tipos de datos en C++",
        "descripcion": "Números, cadenas, booleanos, null y undefined."
      },
      {
        "url": "https://www.youtube.com/watch?v=idr6Us9L2aY&list=PLU8oAlHdN5BmoxxnllWdZfRcffMPCNck5&index=7",
        "tipo": "video",
        "nombre": "Tipos y variables en C++",
        "descripcion": "Vídeo básico donde se explican los tipos de datos existentes en C++ y el concepto de variable."
      },
      {
        "url": "https://learn.microsoft.com/es-es/cpp/cpp/cpp-type-system-modern-cpp?view=msvc-170",
        "tipo": "lectura",
        "nombre": "Sistema de tipos de datos en C++",
        "descripcion": "Números, textos, booleanos, variables y constantes."
      }
    ],
    "intermedio": [
      {
        "url": "https://oregoom.com/cpp/tipos-de-datos/",
        "tipo": "lectura",
        "nombre": "Tipos de datos en C++",
        "descripcion": "Tipos compuestos, definidos por usuario, arrays y punteros."
      },
      {
        "url": "https://www.programarya.com/Cursos/C++/Sistema-de-Tipos",
        "tipo": "guia",
        "nombre": "Sistema de tipos de C++",
        "descripcion": "Conversión de tipos, tamaño y modificadores"
      }
    ],
    "avanzado": [
      {
        "url": "https://en.cppreference.com/cpp/types/integer",
        "tipo": "documentacion",
        "nombre": "Tipos de ancho fijo",
        "descripcion": "Tipos de datos alternativos"
      },
      {
        "url": "https://learn.microsoft.com/es-es/cpp/cpp/cpp-type-system-modern-cpp?view=msvc-170",
        "tipo": "lectura",
        "nombre": "Sistema de tipos de C++",
        "descripcion": "Tipos fundamentales, derivados y definidos por usuario"
      }
    ]
  },
  "condicionales": {
    "principiante": [
      {
        "url": "https://blockly.games/bird",
        "tipo": "juego",
        "nombre": "Blockly Games: Pájaro",
        "descripcion": "Usa condicionales para guiar al pájaro hasta el gusano.",
        "instrucciones": "Guía al pájaro hasta el gusano y luego hasta su nido, evitando los obstáculos. Para lograrlo tendrás que usar condiciones (if / else) que decidan hacia dónde volar según el ángulo o lo que el pájaro detecta.\n\nObjetivo: completar cada nivel tomando la decisión correcta con la menor cantidad de condiciones posible. Es una forma visual de practicar la lógica condicional que luego usarás en C++."
      },
      {
        "url": "https://www.youtube.com/watch?v=r5GbMsB0eOA",
        "tipo": "video",
        "nombre": "Sentencia If-else",
        "descripcion": "Condicionales simples y dobles en c++"
      },
      {
        "url": "https://www.youtube.com/watch?v=hjDB7ev9ePM",
        "tipo": "video",
        "nombre": "Sentencia switch",
        "descripcion": "Multiples condicionales, caso por defecto, sentencia break"
      },
      {
        "url": "https://www.programarya.com/Cursos/C++/Condicionales",
        "tipo": "lectura",
        "nombre": "Condicionales en C++",
        "descripcion": "if, else, else if y switch"
      },
      {
        "url": "https://www.tutlane.com/images/swift/swift-switch-statement-algorithm-diagram.png",
        "tipo": "imagen",
        "nombre": "Diagrama de flujo: Switch",
        "descripcion": "Diagrama de flujo de la sentencia switch"
      },
      {
        "url": "https://i.ytimg.com/vi/mbz8M70vHao/maxresdefault.jpg",
        "tipo": "imagen",
        "nombre": "Diagrama de flujo: If-else",
        "descripcion": "Diagrama de flujo de la sentencia If-else"
      },
      {
        "url": "https://studio.code.org/es/projects/gamelab/QQ9YdgHkEGdlYUl9jSjAQvxjiZUcwq2VLY4kJ0o3604",
        "tipo": "juego",
        "nombre": "La Lista de Compras de Odett",
        "descripcion": "",
        "instrucciones": "La Lista de Compras de Odett 🧺\n\nOdett necesita reabastecer su despensa, pero tiene un pequeño problema: no es muy buena organizando su lista de compras. Por eso, ha pedido ayuda a los estudiantes del curso Algoritmos y Programación para que la ayuden a clasificar correctamente los alimentos que va a adquirir.\n\nTu misión es construir un clasificador que agrupe los alimentos en cuatro categorías principales:\n\n🥗 Frutas\n\n\n🍔 Comida rápida\n\n\n🍬 Dulces\n\n\n🧃 Bebidas\n\n\nAdemás, dentro de la categoría bebidas, deberás distinguir entre dos subtipos:\n\n☕ Bebidas calientes\n\n\n🧊 Bebidas frías\n\n\n🧺 Lista de alimentos a clasificar (16 en total):\n\nFrutas: manzanas, uvas, peras, fresas\n\n\nBebidas frías: refresco, jugo, leche\n\n\nBebidas calientes: café\n\n\nComida rápida: hamburguesa, perro caliente, pizza, papas fritas\n\n\nDulces: chocolate, dona, galleta, helado\n\n\n🧪 ¿Qué debe hacer el estudiante?\n\nUsar condicionales if, if-else o if anidados para determinar la categoría de cada alimento.\n\n\nSi el alimento pertenece a la categoría bebidas, aplicar una segunda condición para identificar si es caliente o fría.\n\n\n🧩 Métodos disponibles para clasificar\n\nPara cada tipo de alimento, deberás llamar al método correspondiente:\n\nCategoría →  Método a Usar\n\nFrutas → clasificar_fruta(alimento)\n\nBebidas Calientes → clasificar_bebida_caliente(alimento)\n\nBebidas Frías → clasificar_bebida_fria(alimento)\n\nComida Rápida → clasificar_comida_rapida(alimento)\n\nDulces → clasificar_dulce(alimento)"
      }
    ],
    "intermedio": [
      {
        "url": "https://oregoom.com/cpp/if-else/",
        "tipo": "lectura",
        "nombre": "If y else en C++",
        "descripcion": "Estructuras de control If-else en C++"
      },
      {
        "url": "https://oregoom.com/cpp/switch/",
        "tipo": "lectura",
        "nombre": "Switch en C++",
        "descripcion": "Estructura de control switch en C++"
      }
    ],
    "avanzado": [
      {
        "url": "https://en.cppreference.com/cpp/language/if",
        "tipo": "documentacion",
        "nombre": "Instrucción If",
        "descripcion": "f con inicializador, structured bindings"
      },
      {
        "url": "https://www.hackerrank.com/challenges/c-tutorial-conditional-if-else/problem",
        "tipo": "ejercicio",
        "nombre": "Ejercicios con condicionales",
        "descripcion": "Retos de decisiones en C++"
      },
      {
        "url": "https://www.udb.edu.sv/udb_files/recursos_guias/informatica-tecnologico/programacion-de-algoritmos/2019/ii/guia-5.pdf",
        "tipo": "guia",
        "nombre": "Guía de estructura condicional ( if )",
        "descripcion": ""
      }
    ]
  },
  "bucles": {
    "principiante": [
      {
        "url": "https://www.youtube.com/watch?v=_6AdtcVn4xs&list=PLWtYZ2ejMVJlUu1rEHLC0i_oibctkl0Vh&index=22",
        "tipo": "video",
        "nombre": "Bucle for",
        "descripcion": "Sentencia for, explicación y ejemplos"
      },
      {
        "url": "https://www.youtube.com/watch?v=DTmMjJ-cd00",
        "tipo": "video",
        "nombre": "Bucle while",
        "descripcion": "Sentencia while, explicación y ejemplos"
      },
      {
        "url": "https://www.youtube.com/watch?v=vHKWMR2WaIQ&list=PLWtYZ2ejMVJlUu1rEHLC0i_oibctkl0Vh&index=21",
        "tipo": "video",
        "nombre": "Bucle do-while",
        "descripcion": "Sentencia do-while, explicación y ejemplos"
      },
      {
        "url": "https://blockly.games/maze",
        "tipo": "juego",
        "nombre": "Blockly Games: Laberinto",
        "descripcion": "Resuelve laberintos aplicando bucles y repeticiones.",
        "instrucciones": "En este desafío controlarás a un personaje para que llegue a la meta de un laberinto. Deberás encadenar instrucciones y, sobre todo, usar bucles (bloques de \"repetir\") para evitar escribir el mismo paso muchas veces.\n\nObjetivo: alcanzar la meta en cada nivel usando la menor cantidad de bloques posible. Cuando veas que repites una acción, reemplázala por un bucle. ¡Piensa como un programador y automatiza lo repetitivo!"
      },
      {
        "url": "https://www.programarya.com/Cursos/C++/Ciclos",
        "tipo": "lectura",
        "nombre": "Bucles o ciclos en C++",
        "descripcion": "Uso de for, while y do while"
      },
      {
        "url": "https://www2.eii.uva.es/fund_inf/cpp/_images/for.jpg",
        "tipo": "imagen",
        "nombre": "Diagrama del ciclo for",
        "descripcion": "Diagrama de flujo de la sentencia for"
      },
      {
        "url": "https://www2.eii.uva.es/fund_inf/cpp/_images/while.jpg",
        "tipo": "imagen",
        "nombre": "Diagrama de ciclo while",
        "descripcion": "Diagrama de flujo de la sentencia while"
      },
      {
        "url": "https://www2.eii.uva.es/fund_inf/cpp/_images/do_while.jpg",
        "tipo": "imagen",
        "nombre": "Diagrama de ciclo do while",
        "descripcion": "Diagrama de flujo de la sentencia do while"
      },
      {
        "url": "https://studio.code.org/es/projects/gamelab/O0mdkAQK5MHCZfWYZCrS1wny604iax9olibqh5vfykc",
        "tipo": "juego",
        "nombre": "El Reparto de Dulces de Cindy 🎃",
        "descripcion": "Ayuda a Cindy a repartir todos sus dulces con Bucles",
        "instrucciones": "Es noche de Halloween y Cindy está en la puerta de su casa lista para repartir dulces a quien toque pidiendo truco o trato. Tiene un problema: no sabe bien cuántos dulces de cada tipo debe entregar, así que ha pedido ayuda a los estudiantes del curso Algoritmos y Programación para que le echen una mano.\n\nTu misión es completar un ciclo repetitivo que le indique a Cindy exactamente cuántas veces debe entregar cada tipo de dulce — ni una entrega de más, ni una de menos.\n\nCindy tiene 5 tipos de dulces para repartir:\n\n🍬 Caramelo ácido\n\n🌿 Caramelo de menta\n\n🍭 Paleta\n\n🍓 Caramelo de fresa\n\n🍫 Chocolate\n\n📋 Cantidad de dulces a entregar\n\nLa cantidad exacta que debes repartir de cada dulce ya está definida en el código, dentro del arreglo candiesRequested. Revísalo antes de empezar: ahí está la clave de cuántas vueltas debe dar cada ciclo.\n\n🧪 ¿Qué debe hacer el estudiante?\n\nCompletar la función cicloFor() usando ciclos for (uno por cada tipo de dulce).\nCada ciclo debe repetirse exactamente la cantidad de veces indicada en candiesRequested para ese dulce.\nEn cada vuelta del ciclo, aumentar en 1 la variable acumuladora correspondiente a ese dulce.\nUsar console.log(...) dentro del ciclo para registrar cada entrega, como sugiere el comentario del código.\n🧩 Variables disponibles para acumular\n\nCategoría → Variable a incrementar\n\nCaramelo ácido → caramelo_acido\n\nCaramelo de menta → caramelo_menta\n\nPaleta → paleta\n\nCaramelo de fresa → caramelo_fresa\n\nChocolate → chocolate\n\n✅ ¿Cómo sé si lo hice bien?\n\nAl terminar, el juego revisa que cada variable coincida exactamente con lo pedido en candiesRequested. Si todo cuadra, verás a Cindy entregar los dulces uno por uno con una animación. Si algo no cuadra, aparecerá un mensaje avisando que Cindy no logró entregar los dulces correctamente."
      }
    ],
    "intermedio": [
      {
        "url": "https://www.programarya.com/Cursos/C++/Ciclos/Ciclo-for",
        "tipo": "lectura",
        "nombre": "Ciclo for en C++",
        "descripcion": "Estructura, sintaxis y uso de un ciclo for en C++"
      },
      {
        "url": "https://oregoom.com/cpp/while/",
        "tipo": "guia",
        "nombre": "Ciclo while en C++",
        "descripcion": "Estructura, sintaxis, evaluación de condiciones, bucles infinitos"
      },
      {
        "url": "https://www-w3schools-com.translate.goog/cpp/cpp_for_loop.asp?_x_tr_sl=en&_x_tr_tl=es&_x_tr_hl=es&_x_tr_pto=tc",
        "tipo": "guia",
        "nombre": "Bucle for en C++",
        "descripcion": "Ejemplos y pruebas"
      },
      {
        "url": "https://www2.eii.uva.es/fund_inf/cpp/temas/6_control_flujo_iterativo/while.html",
        "tipo": "guia",
        "nombre": "Bucle while en C++",
        "descripcion": "Estructura, diagrama de flujo, ejemplos"
      },
      {
        "url": "https://www2.eii.uva.es/fund_inf/cpp/temas/6_control_flujo_iterativo/do_while.html",
        "tipo": "guia",
        "nombre": "Bucle do while en C++",
        "descripcion": "Estructura, diagrama de flujo, ejemplos"
      },
      {
        "url": "https://www2.eii.uva.es/fund_inf/cpp/temas/6_control_flujo_iterativo/for.html",
        "tipo": "guia",
        "nombre": "Bucle for en C++",
        "descripcion": "Estructura, diagrama de flujo, ejemplos"
      },
      {
        "url": "https://www2.eii.uva.es/fund_inf/cpp/temas/6_control_flujo_iterativo/bucles_anidados.html",
        "tipo": "lectura",
        "nombre": "Bucles anidados",
        "descripcion": "Estructura, ejemplo"
      }
    ],
    "avanzado": [
      {
        "url": "https://learn.microsoft.com/es-es/cpp/cpp/cpp-language-reference?view=msvc-170",
        "tipo": "documentacion",
        "nombre": "Instrucciones de iteración",
        "descripcion": "Introducción a los conceptos de estructuras de iteración"
      },
      {
        "url": "https://learn.microsoft.com/es-es/cpp/cpp/while-statement-cpp?view=msvc-170",
        "tipo": "documentacion",
        "nombre": "Instrucción while",
        "descripcion": "Sintaxis, ejemplo y comentarios"
      },
      {
        "url": "https://learn.microsoft.com/es-es/cpp/cpp/do-while-statement-cpp?view=msvc-170",
        "tipo": "documentacion",
        "nombre": "Instrucción do while",
        "descripcion": "Sintaxis, ejemplo y comentarios"
      },
      {
        "url": "https://learn.microsoft.com/es-es/cpp/cpp/for-statement-cpp?view=msvc-170",
        "tipo": "documentacion",
        "nombre": "Instrucción for",
        "descripcion": "Sintaxis, ejemplo y comentarios"
      },
      {
        "url": "https://learn.microsoft.com/es-es/cpp/cpp/range-based-for-statement-cpp?view=msvc-170",
        "tipo": "documentacion",
        "nombre": "Instrucción basada en intervalos",
        "descripcion": "Sintaxis, ejemplo y comentarios"
      },
      {
        "url": "https://learn.microsoft.com/es-es/cpp/cpp/jump-statements-cpp?view=msvc-170",
        "tipo": "documentacion",
        "nombre": "Instrucciones de salto",
        "descripcion": "Introducción al concepto de salto de ejecución"
      },
      {
        "url": "https://learn.microsoft.com/es-es/cpp/cpp/break-statement-cpp?view=msvc-170",
        "tipo": "documentacion",
        "nombre": "Sentencia break",
        "descripcion": "Sintaxis, comentarios y ejemplos"
      },
      {
        "url": "https://learn.microsoft.com/es-es/cpp/cpp/continue-statement-cpp?view=msvc-170",
        "tipo": "documentacion",
        "nombre": "Sentencia continue",
        "descripcion": "Sintaxis, comentarios y ejemplos"
      },
      {
        "url": "https://learn.microsoft.com/es-es/cpp/cpp/goto-statement-cpp?view=msvc-170",
        "tipo": "documentacion",
        "nombre": "Sentencia goto",
        "descripcion": "Sintaxis, comentarios y ejemplos"
      },
      {
        "url": "https://content-media-cdn.codefinity.com/pdf/b023a431-749d-4742-8ec0-eb0a22d5e063/c_loops_es.pdf",
        "tipo": "lectura",
        "nombre": "Bucles en C++",
        "descripcion": ""
      }
    ]
  },
  "arreglos": {
    "principiante": [
      {
        "url": "https://www.youtube.com/watch?v=l-kOjxvgyDQ&list=PLWtYZ2ejMVJlUu1rEHLC0i_oibctkl0Vh&index=31",
        "tipo": "video",
        "nombre": "Arreglos en C++",
        "descripcion": "Concepto de arreglo, inicialización y ejemplos"
      },
      {
        "url": "https://www.youtube.com/watch?v=_JmyF2JPqwk&list=PLWtYZ2ejMVJlUu1rEHLC0i_oibctkl0Vh&index=33",
        "tipo": "video",
        "nombre": "Ejemplo de iteración en un Arreglo",
        "descripcion": "Iteración de un arreglo usando un ciclo for"
      },
      {
        "url": "https://www.youtube.com/watch?v=7LMAZimcgZ8&list=PLWtYZ2ejMVJlUu1rEHLC0i_oibctkl0Vh&index=36",
        "tipo": "video",
        "nombre": "Matrices en C++",
        "descripcion": "Concepto de matrices o arreglos bidimensionales"
      },
      {
        "url": "https://www.programarya.com/Cursos/C++/Estructuras-de-Datos/Arreglos-o-Vectores",
        "tipo": "lectura",
        "nombre": "Arrays, arreglos y vectores en C++",
        "descripcion": "Uso, declaración y sintaxis de los vectores en C++"
      },
      {
        "url": "https://ehack.info/wp-content/uploads/2025/06/022-mMatrizCppPrg678x381.jpg",
        "tipo": "imagen",
        "nombre": "Ejemplo de indices de una Matriz",
        "descripcion": "Ejemplo de accesos a una matriz"
      },
      {
        "url": "https://studio.code.org/es/projects/gamelab/9M5thrUDucIc6SSShq669zp9y5xXM2LBu1Z6wUNLOOU",
        "tipo": "juego",
        "nombre": "Sopa de letras de Elias: Matrices",
        "descripcion": "Juego interactivo para aprender sobre arreglos y matrices",
        "instrucciones": "La Sopa de Letras de Elías.\n\nA Elías le encantan las sopas de letras, especialmente aquellas que esconden palabras relacionadas con la programación. Sin embargo, esta vez se ha encontrado con una sopa más desafiante de lo habitual, y necesita la ayuda de los estudiantes del curso Algoritmos y Programación para resolverla.\n\nPor ahora, Elías solo ha logrado encontrar una palabra: \"datos\". Pero sabe que hay seis palabras en total ocultas en la matriz sopa_de_letras. Las palabras que faltan son:\n\nalgoritmo\n\narreglo\n\nciclos\n\ncódigo\n\nprograma\n\n📌  Instrucciones:\n\nTu misión es recorrer la matriz sopa_de_letras, construir cada palabra encontrada y, una vez que la tengas completa, llamar al método:\n\npaintWord(palabra);\n\nEste método se encargará de resaltar la palabra en la interfaz del juego.\n\n🧠 Consideraciones técnicas\n\nLas palabras pueden estar escritas en cuatro direcciones:\n\nHorizontal: de izquierda a derecha y de derecha a izquierda.\n\n\nVertical: de arriba hacia abajo y de abajo hacia arriba.\nPor lo tanto, al recorrer la matriz, es posible que:\n\nEl índice no comience en 0, sino en otra posición.\n\nEn lugar de incrementar (i++), debas decrementar (i--) para recorrer en sentido inverso.\n\nRecuerda que, el primer elemento de cualquier arreglo o matriz tiene índice 0, no 1."
      }
    ],
    "intermedio": [
      {
        "url": "https://oregoom.com/cpp/arrays/",
        "tipo": "lectura",
        "nombre": "Arreglos en C++",
        "descripcion": "Declaración, acceso y recorrido de un arreglo"
      },
      {
        "url": "https://oregoom.com/cpp/arrays/",
        "tipo": "guia",
        "nombre": "Estructuras de datos en C++",
        "descripcion": "Uso, manejo y ventajas. Arreglos, vectores, matrices y demás"
      },
      {
        "url": "https://www-geeksforgeeks-org.translate.goog/cpp/cpp-multidimensional-array/?_x_tr_sl=en&_x_tr_tl=es&_x_tr_hl=es&_x_tr_pto=tc&_x_tr_hist=true",
        "tipo": "guia",
        "nombre": "Arreglos multidimensionales",
        "descripcion": "Matrices y arreglos de arreglos."
      }
    ],
    "avanzado": [
      {
        "url": "https://www.programarya.com/Cursos/C++/Estructuras-de-Datos/Matrices",
        "tipo": "guia",
        "nombre": "Matrices en C++",
        "descripcion": "Uso, declaración, y sintaxis de las matrices en C++"
      },
      {
        "url": "https://tecpro-digital.com/ejercicios-de-arreglos-en-c/",
        "tipo": "ejercicio",
        "nombre": "Ejercicios de arreglos en C++",
        "descripcion": "Índice de ejercicios de arreglos en C++"
      },
      {
        "url": "https://www.udb.edu.sv/udb_files/recursos_guias/informatica-tecnologico/programacion-de-algoritmos/2019/ii/guia-9.pdf",
        "tipo": "guia",
        "nombre": "Guía de arreglos bidimensionales",
        "descripcion": ""
      }
    ]
  },
  "estructuras-datos": {
    "principiante": [
      {
        "url": "https://www.youtube.com/watch?v=ySZaUstgEH8&list=PLWtYZ2ejMVJlUu1rEHLC0i_oibctkl0Vh&index=56",
        "tipo": "video",
        "nombre": "Estructuras de datos en C++",
        "descripcion": "Concepto de estructura de datos, declaración de struct"
      },
      {
        "url": "https://www.youtube.com/watch?v=CXKNygkEpU8&list=PLWtYZ2ejMVJlUu1rEHLC0i_oibctkl0Vh&index=58",
        "tipo": "video",
        "nombre": "Estructuras anidadas",
        "descripcion": "Concepto de estructuras anidadas y declaración"
      },
      {
        "url": "https://www.programarya.com/Cursos/C++/Estructuras-de-Datos",
        "tipo": "lectura",
        "nombre": "Estructuras de datos en C++",
        "descripcion": "Uso, manejo y ventajas. Arreglos, vectores, matrices y demás"
      },
      {
        "url": "https://ed.team/comunidad/que-son-las-estructuras-de-datos",
        "tipo": "infografia",
        "nombre": "¿Qué son las estructuras de datos?",
        "descripcion": "Ejemplos de estructuras de datos"
      }
    ],
    "intermedio": [
      {
        "url": "https://www.luisllamas.es/cpp-structs/",
        "tipo": "guia",
        "nombre": "Structs en C++",
        "descripcion": "Sintaxis, ejemplo, inicialización"
      },
      {
        "url": "https://conclase.net/c/curso/cap11",
        "tipo": "guia",
        "nombre": "Estructuras en C++",
        "descripcion": "Declaración, asignación, arreglos"
      }
    ],
    "avanzado": [
      {
        "url": "https://learn-microsoft-com.translate.goog/en-us/cpp/cpp/struct-cpp?view=msvc-170&_x_tr_sl=en&_x_tr_tl=es-419&_x_tr_hl=es-419&_x_tr_pto=sc",
        "tipo": "documentacion",
        "nombre": "Documentación de Struct C++",
        "descripcion": "Sintaxis, parámetros, uso"
      },
      {
        "url": "https://github.com/andresWeitzel/Ejercicios_Resueltos_Cpp/tree/master/Bloque%208%20-%20Estructuras",
        "tipo": "ejercicio",
        "nombre": "Ejercicios de estructuras de datos",
        "descripcion": "Ejercicios resueltos de estructuras de datos"
      },
      {
        "url": "https://eduarmandov.wordpress.com/wp-content/uploads/2017/05/datastructures-ds-en-c.pdf",
        "tipo": "lectura",
        "nombre": "Estructuras de datos en C++",
        "descripcion": ""
      }
    ]
  },
  "funciones": {
    "principiante": [
      {
        "url": "https://www.youtube.com/watch?v=vLZymLKd6Mo&list=PLWtYZ2ejMVJlUu1rEHLC0i_oibctkl0Vh&index=64",
        "tipo": "video",
        "nombre": "¿Qué es una función?",
        "descripcion": "Concepto, declaración y ejemplos"
      },
      {
        "url": "https://www.programarya.com/Cursos/C++/Funciones",
        "tipo": "lectura",
        "nombre": "Funciones, métodos y procedimientos en C++",
        "descripcion": "Desde cero y paso a paso"
      },
      {
        "url": "https://www-tutorialspoint-com.translate.goog/cplusplus/cpp_return_statement.htm?_x_tr_sl=en&_x_tr_tl=es&_x_tr_hl=es&_x_tr_pto=tc",
        "tipo": "guia",
        "nombre": "La instrucción return",
        "descripcion": "Devolver valores desde una función."
      },
      {
        "url": "https://www.codingame.com/start",
        "tipo": "juego",
        "nombre": "CodinGame: primeros retos",
        "descripcion": "Escribe código real (compatible con C++) para superar desafíos.",
        "instrucciones": "CodinGame te permite resolver desafíos escribiendo código real en C++ (entre otros lenguajes). Comenzarás con el tutorial de introducción, donde completarás funciones que controlan a un personaje para superar obstáculos.\n\nObjetivo: leer el enunciado, completar la lógica dentro de la función y ejecutar para validar tu solución. Es la mejor forma de aplicar lo aprendido sobre funciones en problemas prácticos."
      }
    ],
    "intermedio": [
      {
        "url": "https://oregoom.com/cpp/funciones/",
        "tipo": "guia",
        "nombre": "Funciones en C++",
        "descripcion": "Definición, declaración, llamada a funciones, tipos de funciones, parámetros por valor y por referencia."
      },
      {
        "url": "https://www.youtube.com/watch?v=XNXdytXmYVM&list=PLWtYZ2ejMVJlUu1rEHLC0i_oibctkl0Vh&index=69",
        "tipo": "video",
        "nombre": "Paso de parámetros por referencia",
        "descripcion": "Ejemplos de pase de parámetros por referencia"
      },
      {
        "url": "https://www.superprof.mx/blog/funciones-cplusplus/",
        "tipo": "articulo",
        "nombre": "Uso de funciones en C++",
        "descripcion": "Concepto, ejemplos y características de funciones"
      }
    ],
    "avanzado": [
      {
        "url": "https://learn.microsoft.com/es-es/cpp/cpp/functions-cpp?view=msvc-170",
        "tipo": "documentacion",
        "nombre": "Documentación de funciones",
        "descripcion": "Declaración de funciones, definición y tipos de funciones"
      },
      {
        "url": "https://learn.microsoft.com/es-es/cpp/cpp/return-statement-cpp?view=msvc-170",
        "tipo": "documentacion",
        "nombre": "Sentencia return",
        "descripcion": "Instrucción return, sintaxis, ejemplos"
      }
    ]
  },
  "poo": {
    "principiante": [
      {
        "url": "https://www.youtube.com/watch?v=aEVH7oFoWnw&list=PLWtYZ2ejMVJlUu1rEHLC0i_oibctkl0Vh&index=127",
        "tipo": "video",
        "nombre": "¿Qué es la POO?",
        "descripcion": "Conceptos básicos de la programación orientada a objetos."
      },
      {
        "url": "https://www.youtube.com/watch?v=tbVHbfIVxs4&list=PLWtYZ2ejMVJlUu1rEHLC0i_oibctkl0Vh&index=128",
        "tipo": "video",
        "nombre": "Clases y objetos",
        "descripcion": "Definición de clases y creación de instancias."
      },
      {
        "url": "https://www.youtube.com/watch?v=dn3E4QlTevo&list=PLWtYZ2ejMVJlUu1rEHLC0i_oibctkl0Vh&index=130",
        "tipo": "video",
        "nombre": "Constructores",
        "descripcion": "Inicializar objetos con el método constructor."
      },
      {
        "url": "https://oregoom.com/cpp/poo/",
        "tipo": "lectura",
        "nombre": "POO en C++",
        "descripcion": "Conceptos básicos, declaración, creación, herencia, polimorfismo, encapsulamiento,"
      }
    ],
    "intermedio": [
      {
        "url": "https://profile.es/blog/que-es-la-programacion-orientada-a-objetos/",
        "tipo": "articulo",
        "nombre": "¿Qué es la Programación Orientada a Objetos",
        "descripcion": "Clases, objetos e instancias. Principios de la POO"
      },
      {
        "url": "https://learn.microsoft.com/es-es/cpp/cpp/inheritance-cpp?view=msvc-170",
        "tipo": "documentacion",
        "nombre": "Herencia",
        "descripcion": "Extender clases con extends y super."
      },
      {
        "url": "https://github.com/andresWeitzel/Ejercicios_Resueltos_Cpp/tree/master/Bloque%2015%20-%20POO",
        "tipo": "ejercicio",
        "nombre": "Ejercicios de POO",
        "descripcion": "Bloque de ejercicios resueltos de POO"
      }
    ],
    "avanzado": [
      {
        "url": "https://www-programiz-com.translate.goog/cpp-programming/oop?_x_tr_sl=en&_x_tr_tl=es&_x_tr_hl=es&_x_tr_pto=tc",
        "tipo": "articulo",
        "nombre": "POO en C++",
        "descripcion": "Encapsulamiento, abstracción, herencia y polimorfismo"
      },
      {
        "url": "https://www.luisllamas.es/cpp-clases/",
        "tipo": "guia",
        "nombre": "Clases en C++",
        "descripcion": "Atributos, métodos e instancias"
      }
    ]
  }
};
