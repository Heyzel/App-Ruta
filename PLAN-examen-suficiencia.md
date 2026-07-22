# Plan de implementación — Examen de suficiencia con exoneración de niveles y retroalimentación por IA (Gemini)

> **Audiencia:** este documento está escrito para que otro agente de IA lo lea y lo **ejecute** paso a paso.
> No requiere decisiones adicionales del autor salvo las marcadas explícitamente como *(decisión abierta)*.
> Sigue el estilo, idioma (español) y convenciones de código del repositorio (React 19 + Vite + React Router 7 + Supabase, componentes y variables en español).

---

## 1. Objetivo

Añadir a la plataforma un **Examen de suficiencia** que:

1. Se ofrece como una **opción en el lateral izquierdo de la cartelera de temas** (página `Inicio`, ruta `/temas`).
2. Presenta **una pregunta fácil, una intermedia y una difícil por cada tema** de progresión (24 preguntas en total; ver §3.1).
3. Al enviarse, **calcula por tema qué niveles se exoneran/desbloquean** según una regla determinista (ver §4, tabla de verdad).
4. **Desbloquea** en el progreso local del estudiante los niveles correspondientes (unión, nunca revierte progreso ya ganado).
5. Envía la nota y un resumen de errores a **Google Gemini** (a través de una función *serverless*) para generar un **mensaje de retroalimentación automática**, y lo muestra al estudiante.
6. Registra el resultado del examen en Supabase (mismo patrón "best effort" que el resto de la app: si Supabase no está configurado, la app sigue funcionando).

El tema **`propedeutico-aritmetica` (Tema 0) se EXCLUYE del examen**: sus tres niveles ya están desbloqueados desde el inicio (`desbloqueadoCompleto: true`) y es material de refuerzo sin umbral; no hay nada que exonerar. Ver [`src/data/temas.js`](src/data/temas.js) líneas 3-11.

---

## 2. Contexto del código actual (leer antes de editar)

| Archivo | Rol relevante para este plan |
|---|---|
| [`src/data/temas.js`](src/data/temas.js) | `TEMAS`, `DIFICULTADES = ['principiante','intermedio','avanzado']`, `NOMBRE_DIFICULTAD`, `siguienteDificultad()`, `obtenerTema()`. |
| [`src/context/ProgresoContext.jsx`](src/context/ProgresoContext.jsx) | Estado global. `nivelesDesbloqueados` es `{ temaId: ['principiante', ...] }`. Método `registrarResultado` desbloquea el **siguiente** nivel al aprobar. Persistido en `localStorage` vía `useLocalStorage`. |
| [`src/utils/calcularResultado.js`](src/utils/calcularResultado.js) | Exporta `esCorrecta(pregunta, respuesta)` (reutilizable) y `calcularResultado(quiz, respuestas)`. Escala 0–20. |
| [`src/components/Quiz.jsx`](src/components/Quiz.jsx) | Renderiza un `quiz = { preguntas: [...] }` con todos los tipos de pregunta y llama `onEnviar(respuestas)` (array alineado a `preguntas`). **Reutilizable tal cual** para el examen. |
| [`src/components/preguntas/*`](src/components/preguntas/) | Componentes por tipo: `seleccion-simple`, `seleccion-multiple`, `verdadero-falso`, `numerica`, `pareo`. |
| [`src/pages/Inicio.jsx`](src/pages/Inicio.jsx) + [`Inicio.css`](src/pages/Inicio.css) | La "cartelera". Hoy: `header` + `AvisoContinuar` + `.grilla-temas`. **Aquí va el lateral izquierdo.** |
| [`src/App.jsx`](src/App.jsx) | Definición de rutas (`react-router-dom` v7). Aquí se añade la ruta del examen. |
| [`src/services/resultados.js`](src/services/resultados.js) | Patrón de guardado en Supabase con *fallback* si `supabaseConfigurado` es falso. |
| [`src/lib/supabase.js`](src/lib/supabase.js) | `supabaseConfigurado` y cliente. |
| [`scripts/esquema.sql`](scripts/esquema.sql) | DDL de las tablas Supabase + políticas RLS abiertas (alcance tesis). |
| [`src/components/ChatbotPanel.jsx`](src/components/ChatbotPanel.jsx) | Ejemplo de integración de IA externa desacoplada (Zapier). El examen usará Gemini vía *serverless*, no este panel. |

**Arquitectura actual:** SPA estática (Vite) desplegada en Vercel/Netlify. No existe backend Node propio. La integración con Gemini se hará con una **función serverless de Vercel** en `/api/` (ver §9), coherente con el snippet `req/res/process.env` aportado por el autor.

---

## 3. Datos del examen

### 3.1 Temas incluidos (8) y estructura

Se incluyen los 8 temas de progresión (todos menos el Tema 0):
`variables`, `tipos-datos`, `condicionales`, `bucles`, `arreglos`, `estructuras-datos`, `funciones`, `poo`.

Por cada tema: 1 pregunta `principiante` (fácil), 1 `intermedio`, 1 `avanzado` (difícil) → **24 preguntas**.

### 3.2 Crear archivo `src/data/examenSuficiencia.js`

Preguntas ya redactadas y verificadas (en C++, coherentes con [`src/data/quizzes.js`](src/data/quizzes.js)). Usan los tipos ya soportados por `esCorrecta` y por los componentes de pregunta. **Copiar tal cual:**

```js
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
```

> **Nota para el ejecutor:** si en el futuro se quiere que el examen también se pueda editar desde `/admin` o cargar desde Supabase, se seguiría el patrón de `src/services/cuestionarios.js`. Queda **fuera de alcance** de este plan; el examen se sirve desde este archivo local.

---

## 4. Regla de exoneración/desbloqueo (núcleo de la funcionalidad)

Para **cada tema**, a partir de la corrección de sus 3 preguntas (fácil = `principiante`, intermedia = `intermedio`, difícil = `avanzado`), se decide **hasta qué nivel se desbloquea**. `principiante` es el nivel base (siempre disponible).

### 4.1 Definición formal (determinista)

Sea, para un tema, el conjunto de dificultades respondidas **correctamente** y **incorrectamente**:

- `mejorCorrecta` = la dificultad **más alta** respondida correctamente (o `null` si ninguna).
- `primerFallo` = la dificultad **más baja** respondida incorrectamente (o `null` si ninguna).
- `techo` = `mejorCorrecta ? (siguienteDificultad(mejorCorrecta) ?? 'avanzado') : 'principiante'`
  *(un nivel por encima de la mejor correcta; si la mejor correcta ya es `avanzado`, se mantiene en `avanzado`).*
- `cap` = `primerFallo ? (siguienteDificultad(primerFallo) ?? 'avanzado') : 'avanzado'`
  *(tope impuesto por el fallo más bajo: no se desbloquea más de un nivel por encima del primer fallo).*
- `nivelFinal` = el **menor** entre `techo` y `cap` (según el orden `principiante < intermedio < avanzado`).
- **Se desbloquean todos los niveles desde `principiante` hasta `nivelFinal` (inclusive).**

Esta regla satisface **exactamente** los cuatro casos descritos por el autor:

- Fácil correcta; intermedia y difícil incorrectas → **hasta intermedio**.
- Todas incorrectas → **ninguno** (solo queda el base `principiante`).
- Todas correctas → **todos**.
- Intermedia correcta pero fácil incorrecta → **hasta intermedio** (el fallo en la fácil impone el tope).

### 4.2 Tabla de verdad completa (las 8 combinaciones) — *esto es la especificación autoritativa*

`✓` = respondió bien esa dificultad, `✗` = mal. Resultado = niveles desbloqueados.

| Fácil (P) | Intermedia (I) | Difícil (A) | Niveles desbloqueados | Equivale a |
|:---:|:---:|:---:|---|---|
| ✗ | ✗ | ✗ | `principiante` (base) | ninguno extra |
| ✓ | ✗ | ✗ | `principiante`, `intermedio` | hasta intermedio |
| ✗ | ✓ | ✗ | `principiante`, `intermedio` | hasta intermedio |
| ✗ | ✗ | ✓ | `principiante`, `intermedio` | hasta intermedio |
| ✓ | ✓ | ✗ | `principiante`, `intermedio`, `avanzado` | todos |
| ✓ | ✗ | ✓ | `principiante`, `intermedio`, `avanzado` | todos |
| ✗ | ✓ | ✓ | `principiante`, `intermedio` | hasta intermedio (fallo en la fácil topa) |
| ✓ | ✓ | ✓ | `principiante`, `intermedio`, `avanzado` | todos |

> **Principio de diseño (documentar en el código):** "aprobar un nivel exonera ese nivel y habilita el siguiente; pero **fallar la pregunta fácil impide saltar más de un nivel**, aunque se acierten las difíciles". Las filas 7 (`✗ ✓ ✓`) y las que combinan fallo en la fácil con aciertos altos están resueltas por el `cap`. Si el autor prefiriera otra semántica para esas filas no especificadas explícitamente, **basta con ajustar la función `nivelesDesbloqueadosTema` de §4.3**, sin tocar el resto.

### 4.3 Crear archivo `src/utils/calcularDesbloqueoExamen.js`

```js
import { DIFICULTADES, siguienteDificultad } from '../data/temas';

const ORDEN = { principiante: 0, intermedio: 1, avanzado: 2 };

function menor(a, b) {
  return ORDEN[a] <= ORDEN[b] ? a : b;
}

// correcto: { principiante: boolean, intermedio: boolean, avanzado: boolean }
// Devuelve el arreglo de niveles desbloqueados para un tema, según la regla del examen.
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
```

> **Requisito de prueba:** el ejecutor DEBE verificar la función contra las 8 filas de §4.2 (ver §11, pruebas). No continuar si alguna fila no coincide.

---

## 5. Estado global: nuevo método en `ProgresoContext`

Editar [`src/context/ProgresoContext.jsx`](src/context/ProgresoContext.jsx):

1. En `estadoInicial()` añadir el campo `examenPresentado: false` (junto a `nombreUsuario: ''`). Esto no rompe progresos guardados previos: los campos ausentes se leen como `undefined`/`false`.

2. Añadir un método que **une** los niveles desbloqueados por el examen con los ya existentes (nunca elimina niveles ganados):

```js
const desbloquearPorExamen = useCallback(
  (mapaNiveles) => {
    // mapaNiveles: { temaId: ['principiante', 'intermedio', ...], ... }
    setProgreso((prev) => {
      const nuevos = { ...prev.nivelesDesbloqueados };
      Object.entries(mapaNiveles).forEach(([temaId, niveles]) => {
        const actuales = prev.nivelesDesbloqueados[temaId] || ['principiante'];
        nuevos[temaId] = Array.from(new Set([...actuales, ...niveles]));
      });
      return { ...prev, nivelesDesbloqueados: nuevos, examenPresentado: true };
    });
  },
  [setProgreso]
);
```

3. Exponerlo en el `value` del `useMemo` (añadir `desbloquearPorExamen` tanto al objeto como al array de dependencias, igual que los demás métodos).

---

## 6. Nueva ruta

Editar [`src/App.jsx`](src/App.jsx):

- Importar la página: `import { ExamenSuficiencia } from './pages/ExamenSuficiencia';`
- Añadir la ruta (antes de las rutas `/admin`):

```jsx
<Route path="/examen-suficiencia" element={<ExamenSuficiencia />} />
```

`BotonInicio` ya aparece automáticamente en rutas distintas de `/` y `/temas`, así que el examen tendrá botón "⌂ Inicio" sin cambios. El `ChatbotPanel` también se mostrará (no empieza por `/admin`); es aceptable.

---

## 7. Lateral izquierdo en la cartelera (`Inicio`)

### 7.1 Editar `src/pages/Inicio.jsx`

Reestructurar a un layout de dos columnas: un `<aside>` a la izquierda con la opción del examen y el `<main>` con el contenido actual. Importar `Link` de `react-router-dom`.

```jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProgreso } from '../context/ProgresoContext';
import { TEMAS } from '../data/temas';
import { TarjetaTema } from '../components/TarjetaTema';
import { AvisoContinuar } from '../components/AvisoContinuar';
import { ModalNombre } from '../components/ModalNombre';
import './Inicio.css';

export function Inicio() {
  const { progreso, setNombreUsuario } = useProgreso();
  const [editandoNombre, setEditandoNombre] = useState(false);

  return (
    <div className="pagina-inicio">
      <div className="inicio-layout">
        <aside className="inicio-lateral" aria-label="Opciones de la cartelera">
          <h2 className="inicio-lateral-titulo">Opciones</h2>
          <Link to="/examen-suficiencia" className="inicio-lateral-opcion">
            <span className="inicio-lateral-icono" aria-hidden="true">📝</span>
            <span className="inicio-lateral-texto">
              <strong>Examen de suficiencia</strong>
              <small>Demuestra lo que ya sabes y exonera niveles.</small>
            </span>
          </Link>
          {progreso.examenPresentado && (
            <p className="inicio-lateral-nota">Ya presentaste el examen. Puedes repetirlo para intentar desbloquear más niveles.</p>
          )}
        </aside>

        <main className="inicio-principal">
          <header className="inicio-encabezado">
            <h1>Cartelera de Contenido Educativo</h1>
            <p>Elige un tema para comenzar a aprender programación.</p>
            {progreso.nombreUsuario && (
              <p className="inicio-usuario">
                Hola, <strong>{progreso.nombreUsuario}</strong> ·{' '}
                <button className="enlace-cambiar-nombre" onClick={() => setEditandoNombre(true)}>
                  cambiar nombre
                </button>
              </p>
            )}
          </header>

          <AvisoContinuar ultimaUbicacion={progreso.ultimaUbicacion} />

          <div className="grilla-temas">
            {TEMAS.map((tema) => (
              <TarjetaTema key={tema.id} tema={tema} />
            ))}
          </div>
        </main>
      </div>

      {(!progreso.nombreUsuario || editandoNombre) && (
        <ModalNombre
          valorInicial={progreso.nombreUsuario}
          onGuardar={(nombre) => {
            setNombreUsuario(nombre);
            setEditandoNombre(false);
          }}
          onCancelar={progreso.nombreUsuario ? () => setEditandoNombre(false) : undefined}
        />
      )}
    </div>
  );
}
```

### 7.2 Editar `src/pages/Inicio.css`

Ampliar `max-width` y añadir el layout de dos columnas (responsive: en móvil el lateral se apila arriba). Añadir al final del archivo y ajustar `.pagina-inicio`:

```css
/* Ampliar el ancho para acomodar el lateral. */
.pagina-inicio {
  max-width: 1140px;
}

.inicio-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 1.5rem;
  align-items: start;
}

.inicio-lateral {
  position: sticky;
  top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  border: 1px solid rgba(127, 127, 127, 0.25);
  border-radius: 12px;
}

.inicio-lateral-titulo {
  font-size: 1rem;
  margin: 0 0 0.25rem;
  opacity: 0.75;
}

.inicio-lateral-opcion {
  display: flex;
  gap: 0.6rem;
  align-items: flex-start;
  padding: 0.75rem;
  border-radius: 10px;
  text-decoration: none;
  color: inherit;
  border: 1px solid rgba(127, 127, 127, 0.25);
  transition: border-color 0.15s, transform 0.15s;
}

.inicio-lateral-opcion:hover {
  border-color: var(--color-primario, #4f46e5);
  transform: translateY(-1px);
}

.inicio-lateral-icono {
  font-size: 1.4rem;
  line-height: 1;
}

.inicio-lateral-texto {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.inicio-lateral-texto small {
  opacity: 0.75;
}

.inicio-lateral-nota {
  font-size: 0.8rem;
  opacity: 0.7;
  margin: 0;
}

/* El encabezado ya no se centra respecto a toda la página, sino a su columna. */
.inicio-principal .inicio-encabezado {
  text-align: left;
}

@media (max-width: 760px) {
  .inicio-layout {
    grid-template-columns: 1fr;
  }
  .inicio-lateral {
    position: static;
  }
}
```

> **Nota:** el archivo hoy centra `.inicio-encabezado`. La regla `.inicio-principal .inicio-encabezado { text-align: left; }` lo alinea a la izquierda dentro de su columna. Si se prefiere conservarlo centrado, omitir esa regla (decisión estética menor).

---

## 8. Página del examen `src/pages/ExamenSuficiencia.jsx`

Responsabilidades: cargar las 24 preguntas, renderizarlas con `<Quiz>`, y al enviar: (a) calificar por tema, (b) calcular niveles desbloqueados, (c) actualizar el progreso, (d) guardar en Supabase, (e) pedir retroalimentación a Gemini, (f) mostrar la pantalla de resultados.

```jsx
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { EXAMEN_SUFICIENCIA, preguntasExamenPlanas } from '../data/examenSuficiencia';
import { obtenerTema, NOMBRE_DIFICULTAD } from '../data/temas';
import { esCorrecta } from '../utils/calcularResultado';
import { nivelesDesbloqueadosTema } from '../utils/calcularDesbloqueoExamen';
import { useProgreso } from '../context/ProgresoContext';
import { Quiz } from '../components/Quiz';
import { ModalNombre } from '../components/ModalNombre';
import { guardarResultadoExamen } from '../services/examen';
import { obtenerRetroalimentacion } from '../services/retroalimentacion';
import './ExamenSuficiencia.css';

const TEMAS_EXAMEN = Object.keys(EXAMEN_SUFICIENCIA);

export function ExamenSuficiencia() {
  const { progreso, desbloquearPorExamen, setNombreUsuario } = useProgreso();
  const preguntas = useMemo(() => preguntasExamenPlanas(), []);
  const quiz = useMemo(() => ({ preguntas }), [preguntas]);

  const [fase, setFase] = useState('examen'); // 'examen' | 'procesando' | 'resultado'
  const [resumen, setResumen] = useState(null);
  const [retro, setRetro] = useState(null);
  const [pidiendoNombre, setPidiendoNombre] = useState(false);
  const [respuestasPendientes, setRespuestasPendientes] = useState(null);

  function calificar(respuestas) {
    // Correcto por tema/dificultad y desbloqueos.
    const correctoPorTema = {};
    let totalCorrectas = 0;
    preguntas.forEach((pregunta, i) => {
      const ok = esCorrecta(pregunta, respuestas[i]);
      if (ok) totalCorrectas += 1;
      correctoPorTema[pregunta.tema] ??= {};
      correctoPorTema[pregunta.tema][pregunta.dificultad] = ok;
    });

    const desbloqueos = {};
    const detalleTemas = [];
    TEMAS_EXAMEN.forEach((tema) => {
      const niveles = nivelesDesbloqueadosTema(correctoPorTema[tema]);
      desbloqueos[tema] = niveles;
      detalleTemas.push({
        tema,
        nombre: obtenerTema(tema)?.nombre ?? tema,
        correcto: correctoPorTema[tema],
        nivelMaximo: niveles[niveles.length - 1],
      });
    });

    const total = preguntas.length;
    const nota = Math.round(((totalCorrectas / total) * 20 + Number.EPSILON) * 100) / 100;

    // Resumen de errores en lenguaje natural para la IA.
    const temasConFallo = detalleTemas
      .filter((d) => Object.values(d.correcto).some((v) => !v))
      .map((d) => {
        const fallados = Object.entries(d.correcto)
          .filter(([, v]) => !v)
          .map(([dif]) => NOMBRE_DIFICULTAD[dif])
          .join(', ');
        return `${d.nombre} (niveles fallados: ${fallados})`;
      });
    const errorCometido = temasConFallo.length
      ? `El estudiante falló preguntas en: ${temasConFallo.join('; ')}.`
      : 'El estudiante respondió correctamente todas las preguntas.';

    return { nota, totalCorrectas, total, desbloqueos, detalleTemas, errorCometido };
  }

  async function procesar(respuestas, nombre) {
    setFase('procesando');
    const r = calificar(respuestas);
    setResumen(r);

    // 1) Actualizar progreso local (unión de niveles).
    desbloquearPorExamen(r.desbloqueos);

    // 2) Guardar en Supabase (best effort).
    await guardarResultadoExamen({
      nombre: nombre ?? progreso.nombreUsuario,
      nota: r.nota,
      correctas: r.totalCorrectas,
      total: r.total,
      detalle: r.detalleTemas,
    });

    // 3) Retroalimentación por IA (degradación elegante si no hay backend/clave).
    const texto = await obtenerRetroalimentacion({ nota: r.nota, errorCometido: r.errorCometido });
    setRetro(texto); // null si no disponible

    setFase('resultado');
  }

  function manejarEnvio(respuestas) {
    if (!progreso.nombreUsuario) {
      setRespuestasPendientes(respuestas);
      setPidiendoNombre(true);
      return;
    }
    procesar(respuestas);
  }

  if (fase === 'resultado' && resumen) {
    return (
      <div className="pagina-examen">
        <h1>Resultado del examen de suficiencia</h1>
        <p className="examen-nota">
          {progreso.nombreUsuario ? `${progreso.nombreUsuario}, obtuviste` : 'Obtuviste'}{' '}
          <strong>{resumen.nota}/20</strong> ({resumen.totalCorrectas} de {resumen.total} correctas).
        </p>

        <section className="examen-retro">
          <h2>Retroalimentación</h2>
          {retro ? (
            <p>{retro}</p>
          ) : (
            <p className="examen-retro-fallback">
              Revisa los temas que fallaste y practica sus contenidos. ¡Vas por buen camino!
            </p>
          )}
        </section>

        <section className="examen-desbloqueos">
          <h2>Niveles desbloqueados por tema</h2>
          <ul>
            {resumen.detalleTemas.map((d) => (
              <li key={d.tema}>
                <Link to={`/tema/${d.tema}`}>{d.nombre}</Link>: hasta{' '}
                <strong>{NOMBRE_DIFICULTAD[d.nivelMaximo]}</strong>
              </li>
            ))}
          </ul>
        </section>

        <Link className="examen-volver" to="/temas">← Volver a la cartelera</Link>
      </div>
    );
  }

  return (
    <div className="pagina-examen">
      <h1>Examen de suficiencia</h1>
      <p className="examen-ayuda">
        Responde una pregunta fácil, una intermedia y una difícil por cada tema. Según tus aciertos,
        se desbloquearán automáticamente los niveles que demuestres dominar.
      </p>

      {fase === 'procesando' && <p className="examen-procesando">Calculando tu resultado…</p>}

      <Quiz quiz={quiz} onEnviar={manejarEnvio} />

      {pidiendoNombre && (
        <ModalNombre
          onGuardar={(nombre) => {
            setNombreUsuario(nombre);
            setPidiendoNombre(false);
            procesar(respuestasPendientes, nombre);
          }}
          onCancelar={() => setPidiendoNombre(false)}
        />
      )}
    </div>
  );
}
```

> **Detalle de UX:** las 24 preguntas se muestran agrupadas por tema (por el orden de `preguntasExamenPlanas`). Opcionalmente, el ejecutor puede insertar encabezados de sección por tema; **no es requisito**. Como mejora opcional, mostrar el nombre del tema en el `<legend>` de cada pregunta modificando `Quiz.jsx` para leer `pregunta.tema` — **no hacerlo si añade complejidad**; el examen funciona sin ello.

### 8.1 Crear `src/pages/ExamenSuficiencia.css`

```css
.pagina-examen {
  max-width: 820px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
}

.examen-ayuda {
  opacity: 0.85;
  margin-bottom: 1.5rem;
}

.examen-procesando {
  font-weight: 600;
}

.examen-nota {
  font-size: 1.1rem;
  margin: 0.5rem 0 1.5rem;
}

.examen-retro,
.examen-desbloqueos {
  margin: 1.5rem 0;
  padding: 1rem 1.25rem;
  border: 1px solid rgba(127, 127, 127, 0.25);
  border-radius: 12px;
}

.examen-retro h2,
.examen-desbloqueos h2 {
  margin-top: 0;
  font-size: 1.05rem;
}

.examen-desbloqueos ul {
  margin: 0;
  padding-left: 1.2rem;
}

.examen-desbloqueos li {
  margin: 0.35rem 0;
}

.examen-volver {
  display: inline-block;
  margin-top: 1rem;
}
```

---

## 9. Integración con Google Gemini (función serverless de Vercel)

Se sigue el snippet aportado por el autor (`req/res`, `process.env`, `@google/genai`, modelo `gemini-2.5-flash`). La **clave nunca se expone al cliente**: se lee de `process.env.GEMINI_API_KEY` en el servidor (NO usar prefijo `VITE_`, que se incrustaría en el bundle).

### 9.1 Dependencia

Añadir a `package.json` (sección `dependencies`) y `npm install`:

```
"@google/genai": "^1.0.0"
```

> El ejecutor debe instalar la última versión estable disponible (`npm install @google/genai`). Ajustar el rango que quede en `package-lock.json`.

### 9.2 Crear `api/retroalimentacion.js` (raíz del repo, carpeta `api/`)

Vercel expone automáticamente los archivos de `api/` como funciones serverless en la ruta `/api/*`.

```js
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método no permitido.' });
    return;
  }

  const { nota, errorCometido } = req.body || {};

  if (!process.env.GEMINI_API_KEY) {
    res.status(503).json({ error: 'Retroalimentación por IA no configurada.' });
    return;
  }

  const prompt =
    `Actúa como un tutor de programación paciente y motivador. ` +
    `Un estudiante presentó un examen de suficiencia de programación en C++ y obtuvo ${nota}/20. ` +
    `Resumen de sus errores: ${errorCometido} ` +
    `Escribe una retroalimentación breve (máximo 4 frases), en español, motivadora, ` +
    `que le ayude a entender en qué enfocarse SIN darle las respuestas exactas de las preguntas.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    res.status(200).json({ retroalimentacion: response.text });
  } catch (error) {
    res.status(500).json({ error: 'No se pudo generar la retroalimentación en este momento.' });
  }
}
```

> **Verificar la API de `@google/genai`** al instalar: la forma `ai.models.generateContent({ model, contents })` y `response.text` corresponde al SDK aportado por el autor. Si la versión instalada difiere, ajustar según su README (mantener el contrato de entrada `{ nota, errorCometido }` y de salida `{ retroalimentacion }`).

### 9.3 Crear `src/services/retroalimentacion.js` (cliente, con degradación elegante)

```js
// Llama a la función serverless de Gemini. Devuelve el texto de retroalimentación
// o null si no está disponible (sin clave, sin backend, error de red). Nunca lanza.
export async function obtenerRetroalimentacion({ nota, errorCometido }) {
  try {
    const resp = await fetch('/api/retroalimentacion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nota, errorCometido }),
    });
    if (!resp.ok) return null;
    const data = await resp.json();
    return data.retroalimentacion || null;
  } catch {
    return null;
  }
}
```

> **Degradación:** bajo `npm run dev` (Vite puro) la ruta `/api/*` no existe → `fetch` devuelve 404 → `obtenerRetroalimentacion` retorna `null` → la página muestra el mensaje de *fallback*. El examen y el desbloqueo **siguen funcionando**. Para probar la función en local se usa `vercel dev` (ver §10).

---

## 10. Variables de entorno y despliegue

1. **`.env.example`** — añadir (documental; esta variable es de servidor, sin `VITE_`):

   ```
   # Clave de Google Gemini (API AI Studio) para la retroalimentación del examen de suficiencia.
   # Es una variable de SERVIDOR (no lleva prefijo VITE_): se usa solo en api/retroalimentacion.js.
   GEMINI_API_KEY=tu-clave-de-gemini
   ```

2. **Vercel → Project → Settings → Environment Variables:** definir `GEMINI_API_KEY` (además de las `VITE_*` ya existentes).

3. **Local:** poner `GEMINI_API_KEY` en `.env`. Para ejecutar la función serverless localmente usar `npx vercel dev` (no `npm run dev`, que sólo levanta Vite).

4. **Actualizar [`DESPLIEGUE.md`](DESPLIEGUE.md):** añadir una subsección "Retroalimentación por IA (Gemini)" explicando la variable `GEMINI_API_KEY`, que la app funciona sin ella (degradación), y el uso de `vercel dev` para probar `/api` en local. El `vercel.json` de *rewrites* actual **no interfiere** con `/api` (Vercel resuelve `/api/*` antes de aplicar el rewrite a `index.html`); no requiere cambios, pero **verificar** tras el primer despliegue que `/api/retroalimentacion` responde.

---

## 11. Persistencia en Supabase (opcional pero recomendado)

### 11.1 Tabla nueva — añadir a [`scripts/esquema.sql`](scripts/esquema.sql)

```sql
-- Resultados del examen de suficiencia (uno por presentación).
create table if not exists resultados_examen (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  nota numeric not null,
  correctas int,
  total int,
  detalle jsonb,
  creado_en timestamptz default now()
);

alter table resultados_examen enable row level security;

drop policy if exists "leer_resultados_examen" on resultados_examen;
create policy "leer_resultados_examen" on resultados_examen for select using (true);

drop policy if exists "insertar_resultados_examen" on resultados_examen;
create policy "insertar_resultados_examen" on resultados_examen for insert with check (true);

drop policy if exists "borrar_resultados_examen" on resultados_examen;
create policy "borrar_resultados_examen" on resultados_examen for delete using (true);
```

> Ejecutar el bloque en el SQL Editor de Supabase. Si Supabase no está configurado, el guardado se omite sin romper nada (ver servicio).

### 11.2 Crear `src/services/examen.js`

```js
import { supabase, supabaseConfigurado } from '../lib/supabase';

// Best effort: si no hay Supabase o no hay nombre, no interrumpe el flujo del examen.
export async function guardarResultadoExamen({ nombre, nota, correctas, total, detalle }) {
  if (!supabaseConfigurado || !nombre) return { error: null };
  return supabase
    .from('resultados_examen')
    .insert({ nombre, nota, correctas, total, detalle });
}

export async function listarResultadosExamen() {
  if (!supabaseConfigurado) {
    return { data: [], error: new Error('Supabase no está configurado.') };
  }
  return supabase.from('resultados_examen').select('*').order('creado_en', { ascending: false });
}
```

> **Opcional (fuera de alcance estricto):** mostrar estos resultados en el panel `/admin` ([`src/pages/Admin.jsx`](src/pages/Admin.jsx)) reutilizando `listarResultadosExamen`. Dejarlo documentado como mejora futura si no da tiempo.

---

## 12. Plan de pruebas (obligatorio antes de dar por terminado)

**A. Prueba unitaria de la regla de desbloqueo (crítica).** Verificar `nivelesDesbloqueadosTema` contra las 8 filas de §4.2. Ejecutar un script temporal con Node o comprobar manualmente en consola del navegador. Las 8 salidas deben coincidir exactamente. Ejemplo de verificación rápida (script desechable):

```js
// node --input-type=module (pegar y ejecutar). ORDEN de dificultades: principiante<intermedio<avanzado.
// Debe imprimir: [P] [P,I] [P,I] [P,I] [P,I,A] [P,I,A] [P,I] [P,I,A]
```

Casos: `{P:0,I:0,A:0}`→`[principiante]`; `{1,0,0}`→`[principiante,intermedio]`; `{0,1,0}`→`[principiante,intermedio]`; `{0,0,1}`→`[principiante,intermedio]`; `{1,1,0}`→todos; `{1,0,1}`→todos; `{0,1,1}`→`[principiante,intermedio]`; `{1,1,1}`→todos.

**B. Flujo funcional (con `npm run dev`):**
1. Ir a `/temas` → verificar que aparece el lateral izquierdo con "Examen de suficiencia" y que la cartelera sigue viéndose bien (incluido responsive < 760px).
2. Entrar al examen → responder de modo que, p. ej., en `variables` sólo la fácil sea correcta y en `funciones` todas correctas.
3. Enviar (si no hay nombre, aparece `ModalNombre`; ingresarlo).
4. Verificar la pantalla de resultado: nota /20, lista de niveles desbloqueados por tema coherente con la tabla, y mensaje de *fallback* de retroalimentación (porque `/api` no corre bajo Vite).
5. Volver a la cartelera → entrar a `variables` y a `funciones` → confirmar en `Tema` que los niveles quedaron desbloqueados según el examen (el `estaDesbloqueado` del contexto refleja la unión). Comprobar en `localStorage` la clave `progreso-app-tesis`.
6. **No regresión:** un tema donde el estudiante ya tenía `avanzado` desbloqueado por juego normal NO debe perderlo tras un examen donde falle ese tema (la unión no elimina).

**C. Retroalimentación IA (con `npx vercel dev` y `GEMINI_API_KEY` válida):**
1. Presentar el examen → confirmar que llega texto real de Gemini en la sección "Retroalimentación".
2. Quitar/renombrar la clave → confirmar que degrada al *fallback* sin romper el flujo (respuesta 503/500 → `null`).

**D. Persistencia (con Supabase configurado y esquema aplicado):** tras presentar, verificar una fila nueva en `resultados_examen` con `detalle` (jsonb) poblado.

**E. Build:** `npm run lint` y `npm run build` sin errores.

---

## 13. Checklist de aceptación

- [ ] `src/data/examenSuficiencia.js` creado con 24 preguntas (8 temas × 3) y `preguntasExamenPlanas()`.
- [ ] `src/utils/calcularDesbloqueoExamen.js` creado y **validado contra las 8 filas** de §4.2.
- [ ] `ProgresoContext` expone `desbloquearPorExamen` (unión, sin revertir) y `examenPresentado`.
- [ ] Ruta `/examen-suficiencia` añadida en `App.jsx`.
- [ ] Lateral izquierdo con la opción del examen en `Inicio.jsx` + estilos en `Inicio.css` (responsive).
- [ ] `pages/ExamenSuficiencia.jsx` + `.css`: examen, cálculo, desbloqueo, guardado, retro IA y pantalla de resultados.
- [ ] `api/retroalimentacion.js` (serverless Gemini) + dependencia `@google/genai` instalada.
- [ ] `src/services/retroalimentacion.js` con degradación elegante (nunca lanza).
- [ ] `src/services/examen.js` + tabla `resultados_examen` en `scripts/esquema.sql` (best effort).
- [ ] `.env.example` y `DESPLIEGUE.md` actualizados con `GEMINI_API_KEY` y nota de `vercel dev`.
- [ ] `npm run lint` y `npm run build` pasan.
- [ ] Pruebas §12 A–E ejecutadas.

---

## 14. Notas, riesgos y decisiones abiertas

- **Seguridad de la clave (por qué serverless):** se eligió la función serverless en lugar de llamar a Gemini desde el cliente para **no exponer `GEMINI_API_KEY`** (facturable) en el bundle. Coherente con el snippet del autor. *(Decisión abierta)*: si se prefiere simplicidad máxima sobre seguridad, existe la alternativa de llamar a Gemini desde el cliente con una `VITE_GEMINI_API_KEY`; **no recomendada** por el riesgo de fuga/abuso de la clave.
- **Semántica de desbloqueo:** la regla de §4 satisface los 4 casos que dio el autor y resuelve de forma determinista los no especificados mediante el `cap`. Si se desea otra política para las filas no dictadas explícitamente, se cambia **sólo** `nivelesDesbloqueadosTema`.
- **Tema 0 excluido** deliberadamente (ya viene desbloqueado por completo).
- **Reutilización:** se reutilizan `<Quiz>`, `esCorrecta`, `ModalNombre`, `siguienteDificultad` y los componentes de pregunta existentes; no se duplica lógica de calificación ni de renderizado.
- **Repetir examen:** se permite volver a presentarlo; como el desbloqueo es por unión, sólo puede sumar niveles, nunca quitarlos.
- **`vercel.json`:** los *rewrites* actuales conviven con `/api`. Verificar en el primer deploy que `/api/retroalimentacion` responde 200/503 (no `index.html`).
```