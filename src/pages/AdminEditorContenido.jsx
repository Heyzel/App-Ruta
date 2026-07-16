import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { obtenerTema, NOMBRE_DIFICULTAD, DIFICULTADES } from '../data/temas';
import { obtenerContenidos, guardarContenidos } from '../services/contenidos';
import { TIPOS_CONTENIDO, TIPO_CONTENIDO_POR_DEFECTO } from '../data/tiposContenido';
import { estaAutenticado } from '../utils/adminAuth';
import { supabaseConfigurado } from '../lib/supabase';
import './AdminEditor.css';
import './AdminEditorContenido.css';

function itemVacio() {
  return { nombre: '', descripcion: '', url: '', tipo: TIPO_CONTENIDO_POR_DEFECTO };
}

export function AdminEditorContenido() {
  const { temaId, dificultad } = useParams();
  const tema = obtenerTema(temaId);

  const [items, setItems] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    setCargando(true);
    obtenerContenidos(temaId, dificultad).then((datos) => {
      setItems(datos.length > 0 ? datos : []);
      setCargando(false);
    });
  }, [temaId, dificultad]);

  if (!estaAutenticado()) {
    return <Navigate to="/admin" replace />;
  }

  if (!tema || !DIFICULTADES.includes(dificultad)) {
    return (
      <div className="pagina-admin-editor">
        <p>Tema o dificultad inválidos.</p>
        <Link to="/admin">Volver al panel</Link>
      </div>
    );
  }

  function actualizarCampo(indice, campo, valor) {
    setItems((prev) => {
      const nuevos = [...prev];
      nuevos[indice] = { ...nuevos[indice], [campo]: valor };
      return nuevos;
    });
  }

  function agregarItem() {
    setItems((prev) => [...prev, itemVacio()]);
  }

  function quitarItem(indice) {
    setItems((prev) => prev.filter((_, i) => i !== indice));
  }

  async function manejarGuardar() {
    setGuardando(true);
    setMensaje(null);
    const itemsValidos = items
      .map((item) => {
        const base = {
          nombre: item.nombre.trim(),
          descripcion: item.descripcion.trim(),
          url: item.url.trim(),
          tipo: item.tipo || TIPO_CONTENIDO_POR_DEFECTO,
        };
        // Las instrucciones solo aplican a los contenidos de tipo juego.
        if (base.tipo === 'juego' && item.instrucciones && item.instrucciones.trim()) {
          base.instrucciones = item.instrucciones.trim();
        }
        return base;
      })
      .filter((item) => item.nombre || item.descripcion || item.url);

    const { error } = await guardarContenidos({
      tema: temaId,
      dificultad,
      items: itemsValidos,
    });
    setGuardando(false);
    if (error) {
      setMensaje({ tipo: 'error', texto: `No se pudo guardar: ${error.message}` });
    } else {
      setItems(itemsValidos);
      setMensaje({ tipo: 'exito', texto: 'Contenidos guardados correctamente.' });
    }
  }

  return (
    <div className="pagina-admin-editor">
      <Link to="/admin" className="admin-editor-volver">
        ← Volver al panel
      </Link>
      <h1>
        {tema.nombre} · {NOMBRE_DIFICULTAD[dificultad]}
      </h1>

      {!supabaseConfigurado && (
        <p className="admin-aviso">
          Supabase no está configurado; puedes armar los contenidos pero no se podrán guardar hasta
          configurar las variables de entorno.
        </p>
      )}

      {cargando ? (
        <p>Cargando…</p>
      ) : (
        <>
          <h2>Contenidos ({items.length})</h2>
          <div className="admin-lista-contenidos">
            {items.map((item, indice) => (
              <div key={indice} className="admin-contenido-fila">
                <label className="editor-campo">
                  Título
                  <input
                    type="text"
                    value={item.nombre}
                    onChange={(e) => actualizarCampo(indice, 'nombre', e.target.value)}
                    placeholder="Título del contenido"
                  />
                </label>
                <label className="editor-campo">
                  Descripción
                  <input
                    type="text"
                    value={item.descripcion}
                    onChange={(e) => actualizarCampo(indice, 'descripcion', e.target.value)}
                    placeholder="Breve descripción"
                  />
                </label>
                <label className="editor-campo">
                  Enlace
                  <input
                    type="url"
                    value={item.url}
                    onChange={(e) => actualizarCampo(indice, 'url', e.target.value)}
                    placeholder="https://..."
                  />
                </label>
                <label className="editor-campo admin-contenido-campo-tipo">
                  Tipo
                  <select
                    value={item.tipo || TIPO_CONTENIDO_POR_DEFECTO}
                    onChange={(e) => actualizarCampo(indice, 'tipo', e.target.value)}
                  >
                    {Object.entries(TIPOS_CONTENIDO).map(([clave, info]) => (
                      <option key={clave} value={clave}>
                        {info.emoji} {info.etiqueta}
                      </option>
                    ))}
                  </select>
                </label>
                <button
                  type="button"
                  className="admin-contenido-eliminar"
                  onClick={() => quitarItem(indice)}
                >
                  Eliminar
                </button>
                {item.tipo === 'juego' && (
                  <label className="editor-campo admin-contenido-instrucciones">
                    Instrucciones del desafío (se muestran en la pantalla del juego)
                    <textarea
                      value={item.instrucciones || ''}
                      onChange={(e) => actualizarCampo(indice, 'instrucciones', e.target.value)}
                      placeholder="Explica de qué trata el juego y qué debe hacer el estudiante. Usa una línea en blanco para separar párrafos."
                      rows={4}
                    />
                  </label>
                )}
              </div>
            ))}
            {items.length === 0 && <p className="admin-lista-vacia">Aún no hay contenidos.</p>}
          </div>

          <button type="button" className="editor-boton-agregar" onClick={agregarItem}>
            + Agregar contenido
          </button>

          {mensaje && <p className={`admin-mensaje admin-mensaje-${mensaje.tipo}`}>{mensaje.texto}</p>}

          <button
            className="admin-boton-guardar"
            onClick={manejarGuardar}
            disabled={guardando}
          >
            {guardando ? 'Guardando…' : 'Guardar contenidos'}
          </button>
        </>
      )}
    </div>
  );
}
