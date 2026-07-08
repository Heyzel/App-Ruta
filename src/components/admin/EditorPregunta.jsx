import { useState } from 'react';
import './EditorPregunta.css';

const TIPOS = [
  { valor: 'seleccion-simple', etiqueta: 'Selección simple (una correcta)' },
  { valor: 'seleccion-multiple', etiqueta: 'Selección múltiple (varias correctas)' },
  { valor: 'verdadero-falso', etiqueta: 'Verdadero o falso' },
  { valor: 'numerica', etiqueta: 'Respuesta numérica' },
  { valor: 'pareo', etiqueta: 'Pareo (emparejar columnas)' },
];

function estadoVacioPorTipo(tipo) {
  switch (tipo) {
    case 'seleccion-simple':
      return { enunciado: '', opciones: ['', ''], respuestaCorrecta: 0 };
    case 'seleccion-multiple':
      return { enunciado: '', opciones: ['', ''], respuestasCorrectas: [] };
    case 'verdadero-falso':
      return { enunciado: '', respuestaCorrecta: true };
    case 'numerica':
      return { enunciado: '', respuestaCorrecta: 0, tolerancia: 0 };
    case 'pareo':
      return { enunciado: '', izquierda: ['', ''], derecha: ['', ''], correspondencias: [0, 1] };
    default:
      return { enunciado: '' };
  }
}

export function EditorPregunta({ onAgregar }) {
  const [tipo, setTipo] = useState('seleccion-simple');
  const [datos, setDatos] = useState(() => estadoVacioPorTipo('seleccion-simple'));

  function cambiarTipo(nuevoTipo) {
    setTipo(nuevoTipo);
    setDatos(estadoVacioPorTipo(nuevoTipo));
  }

  function actualizarLista(campo, indice, valor) {
    setDatos((prev) => {
      const lista = [...prev[campo]];
      lista[indice] = valor;
      return { ...prev, [campo]: lista };
    });
  }

  function agregarItemLista(campo) {
    setDatos((prev) => ({ ...prev, [campo]: [...prev[campo], ''] }));
  }

  function quitarItemLista(campo, indice) {
    setDatos((prev) => ({ ...prev, [campo]: prev[campo].filter((_, i) => i !== indice) }));
  }

  function esValida() {
    if (!datos.enunciado.trim()) return false;
    if (tipo === 'seleccion-simple') {
      return datos.opciones.every((o) => o.trim()) && datos.opciones.length >= 2;
    }
    if (tipo === 'seleccion-multiple') {
      return (
        datos.opciones.every((o) => o.trim()) &&
        datos.opciones.length >= 2 &&
        datos.respuestasCorrectas.length > 0
      );
    }
    if (tipo === 'numerica') {
      return datos.respuestaCorrecta !== '' && datos.respuestaCorrecta !== null;
    }
    if (tipo === 'pareo') {
      return (
        datos.izquierda.every((i) => i.trim()) &&
        datos.derecha.every((d) => d.trim()) &&
        datos.izquierda.length === datos.correspondencias.length
      );
    }
    return true;
  }

  function manejarAgregar() {
    if (!esValida()) return;
    onAgregar({ tipo, ...datos });
    setDatos(estadoVacioPorTipo(tipo));
  }

  function alternarCorrectaMultiple(indice) {
    setDatos((prev) => {
      const actuales = prev.respuestasCorrectas;
      const nuevas = actuales.includes(indice)
        ? actuales.filter((i) => i !== indice)
        : [...actuales, indice];
      return { ...prev, respuestasCorrectas: nuevas };
    });
  }

  return (
    <div className="editor-pregunta">
      <label className="editor-campo">
        Tipo de pregunta
        <select value={tipo} onChange={(e) => cambiarTipo(e.target.value)}>
          {TIPOS.map((t) => (
            <option key={t.valor} value={t.valor}>
              {t.etiqueta}
            </option>
          ))}
        </select>
      </label>

      <label className="editor-campo">
        Enunciado
        <input
          type="text"
          value={datos.enunciado}
          onChange={(e) => setDatos((prev) => ({ ...prev, enunciado: e.target.value }))}
          placeholder="Escribe la pregunta"
        />
      </label>

      {(tipo === 'seleccion-simple' || tipo === 'seleccion-multiple') && (
        <div className="editor-lista">
          <span>Opciones</span>
          {datos.opciones.map((opcion, indice) => (
            <div key={indice} className="editor-lista-fila">
              {tipo === 'seleccion-simple' ? (
                <input
                  type="radio"
                  checked={datos.respuestaCorrecta === indice}
                  onChange={() => setDatos((prev) => ({ ...prev, respuestaCorrecta: indice }))}
                  title="Marcar como correcta"
                />
              ) : (
                <input
                  type="checkbox"
                  checked={datos.respuestasCorrectas.includes(indice)}
                  onChange={() => alternarCorrectaMultiple(indice)}
                  title="Marcar como correcta"
                />
              )}
              <input
                type="text"
                value={opcion}
                onChange={(e) => actualizarLista('opciones', indice, e.target.value)}
                placeholder={`Opción ${indice + 1}`}
              />
              {datos.opciones.length > 2 && (
                <button type="button" onClick={() => quitarItemLista('opciones', indice)}>
                  ✕
                </button>
              )}
            </div>
          ))}
          <button type="button" className="editor-boton-agregar" onClick={() => agregarItemLista('opciones')}>
            + Agregar opción
          </button>
        </div>
      )}

      {tipo === 'verdadero-falso' && (
        <div className="editor-lista">
          <span>Respuesta correcta</span>
          <label className="quiz-opcion">
            <input
              type="radio"
              checked={datos.respuestaCorrecta === true}
              onChange={() => setDatos((prev) => ({ ...prev, respuestaCorrecta: true }))}
            />
            Verdadero
          </label>
          <label className="quiz-opcion">
            <input
              type="radio"
              checked={datos.respuestaCorrecta === false}
              onChange={() => setDatos((prev) => ({ ...prev, respuestaCorrecta: false }))}
            />
            Falso
          </label>
        </div>
      )}

      {tipo === 'numerica' && (
        <div className="editor-lista">
          <label className="editor-campo">
            Respuesta correcta
            <input
              type="number"
              value={datos.respuestaCorrecta}
              onChange={(e) => setDatos((prev) => ({ ...prev, respuestaCorrecta: Number(e.target.value) }))}
            />
          </label>
          <label className="editor-campo">
            Tolerancia (margen de error aceptado)
            <input
              type="number"
              value={datos.tolerancia}
              onChange={(e) => setDatos((prev) => ({ ...prev, tolerancia: Number(e.target.value) }))}
            />
          </label>
        </div>
      )}

      {tipo === 'pareo' && (
        <div className="editor-lista">
          <span>Columna izquierda</span>
          {datos.izquierda.map((elemento, indice) => (
            <div key={indice} className="editor-lista-fila">
              <input
                type="text"
                value={elemento}
                onChange={(e) => actualizarLista('izquierda', indice, e.target.value)}
                placeholder={`Elemento izquierdo ${indice + 1}`}
              />
              {datos.izquierda.length > 2 && (
                <button
                  type="button"
                  onClick={() => {
                    quitarItemLista('izquierda', indice);
                    setDatos((prev) => ({
                      ...prev,
                      correspondencias: prev.correspondencias.filter((_, i) => i !== indice),
                    }));
                  }}
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="editor-boton-agregar"
            onClick={() => {
              agregarItemLista('izquierda');
              setDatos((prev) => ({ ...prev, correspondencias: [...prev.correspondencias, 0] }));
            }}
          >
            + Agregar elemento izquierdo
          </button>

          <span>Columna derecha</span>
          {datos.derecha.map((elemento, indice) => (
            <div key={indice} className="editor-lista-fila">
              <input
                type="text"
                value={elemento}
                onChange={(e) => actualizarLista('derecha', indice, e.target.value)}
                placeholder={`Elemento derecho ${indice + 1}`}
              />
              {datos.derecha.length > 2 && (
                <button type="button" onClick={() => quitarItemLista('derecha', indice)}>
                  ✕
                </button>
              )}
            </div>
          ))}
          <button type="button" className="editor-boton-agregar" onClick={() => agregarItemLista('derecha')}>
            + Agregar elemento derecho
          </button>

          <span>Correspondencia correcta (izquierda → derecha)</span>
          {datos.izquierda.map((elemento, indice) => (
            <div key={indice} className="editor-lista-fila">
              <span className="editor-pareo-etiqueta">{elemento || `Elemento ${indice + 1}`} →</span>
              <select
                value={datos.correspondencias[indice] ?? 0}
                onChange={(e) => {
                  const nuevas = [...datos.correspondencias];
                  nuevas[indice] = Number(e.target.value);
                  setDatos((prev) => ({ ...prev, correspondencias: nuevas }));
                }}
              >
                {datos.derecha.map((opcionDerecha, indiceDerecha) => (
                  <option key={indiceDerecha} value={indiceDerecha}>
                    {opcionDerecha || `Elemento ${indiceDerecha + 1}`}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}

      <button type="button" className="editor-boton-principal" disabled={!esValida()} onClick={manejarAgregar}>
        Agregar pregunta
      </button>
    </div>
  );
}
