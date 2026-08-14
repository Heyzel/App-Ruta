import { useState } from 'react';
import { ejecutarCodigo, explicarCodigoSalida } from '../services/ejecucionCodigo';
import './EditorCodigo.css';

// Editor de C++ con ejecución real. Es un componente aislado: no toca el
// progreso, ni localStorage, ni Supabase. Nada de lo que ocurra aquí afecta a
// las notas del estudiante.
//
// `codigoInicial` solo se usa al montar. La página contenedora cambia de
// plantilla remontando el componente con una `key` distinta, así no hace falta
// sincronizar prop y estado.
export function EditorCodigo({ codigoInicial = '' }) {
  const [codigo, setCodigo] = useState(codigoInicial);
  const [entrada, setEntrada] = useState('');
  const [resultado, setResultado] = useState(null);
  const [cargando, setCargando] = useState(false);

  async function manejarEjecutar() {
    setCargando(true);
    setResultado(null);
    const respuesta = await ejecutarCodigo({ codigo, entrada });
    setResultado(respuesta);
    setCargando(false);
  }

  function manejarLimpiar() {
    setCodigo(codigoInicial);
    setEntrada('');
    setResultado(null);
  }

  // Tabular dentro del editor en vez de saltar al siguiente control: sin esto
  // es muy incómodo indentar código.
  function manejarTecla(evento) {
    if (evento.key !== 'Tab') return;
    evento.preventDefault();
    const area = evento.target;
    const { selectionStart, selectionEnd, value } = area;
    setCodigo(value.slice(0, selectionStart) + '  ' + value.slice(selectionEnd));
    // El textarea es controlado: hay que reponer el cursor tras el re-render.
    requestAnimationFrame(() => {
      area.selectionStart = selectionStart + 2;
      area.selectionEnd = selectionStart + 2;
    });
  }

  const avisoSalida = resultado?.ok ? explicarCodigoSalida(resultado.codigoSalida) : null;

  return (
    <div className="editor-codigo">
      <label className="editor-codigo-etiqueta" htmlFor="editor-codigo-fuente">
        Tu código
      </label>
      <textarea
        id="editor-codigo-fuente"
        className="editor-codigo-area"
        value={codigo}
        onChange={(evento) => setCodigo(evento.target.value)}
        onKeyDown={manejarTecla}
        rows={16}
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        autoComplete="off"
      />

      <details className="editor-codigo-entrada">
        <summary>Entrada del programa (para std::cin)</summary>
        <textarea
          className="editor-codigo-area editor-codigo-area--pequena"
          value={entrada}
          onChange={(evento) => setEntrada(evento.target.value)}
          rows={3}
          spellCheck={false}
          placeholder="Escribe aquí los datos que tu programa va a leer, uno por línea."
        />
      </details>

      <div className="editor-codigo-acciones">
        <button
          type="button"
          className="editor-codigo-boton"
          onClick={manejarEjecutar}
          disabled={cargando}
        >
          {cargando ? 'Compilando…' : '▶ Ejecutar'}
        </button>
        <button
          type="button"
          className="editor-codigo-boton editor-codigo-boton--secundario"
          onClick={manejarLimpiar}
          disabled={cargando}
        >
          Limpiar
        </button>
      </div>

      <div className="editor-codigo-salida" aria-live="polite">
        {cargando && <p className="editor-codigo-aviso">Compilando y ejecutando tu programa…</p>}

        {!cargando && resultado && !resultado.ok && (
          <p className="editor-codigo-aviso">{resultado.mensaje}</p>
        )}

        {!cargando && resultado?.ok && !resultado.compilo && (
          <div className="editor-codigo-bloque editor-codigo-bloque--error">
            <h3>Errores de compilación</h3>
            <pre>{resultado.mensajesCompilador}</pre>
          </div>
        )}

        {!cargando && resultado?.ok && resultado.compilo && (
          <>
            <div className="editor-codigo-bloque">
              <h3>Salida del programa</h3>
              <pre>{resultado.salida || '(el programa no imprimió nada)'}</pre>
            </div>

            {resultado.errorEjecucion && (
              <div className="editor-codigo-bloque editor-codigo-bloque--error">
                <h3>Errores durante la ejecución</h3>
                <pre>{resultado.errorEjecucion}</pre>
              </div>
            )}

            {avisoSalida && <p className="editor-codigo-aviso">{avisoSalida}</p>}

            {resultado.mensajesCompilador && (
              <div className="editor-codigo-bloque editor-codigo-bloque--aviso">
                <h3>Advertencias del compilador</h3>
                <pre>{resultado.mensajesCompilador}</pre>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
