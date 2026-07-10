import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { obtenerTema, NOMBRE_DIFICULTAD, DIFICULTADES } from '../data/temas';
import { obtenerCuestionario, guardarCuestionario } from '../services/cuestionarios';
import { EditorPregunta } from '../components/admin/EditorPregunta';
import { estaAutenticado } from '../utils/adminAuth';
import { supabaseConfigurado } from '../lib/supabase';
import './AdminEditor.css';

const ETIQUETAS_TIPO = {
  'seleccion-simple': 'Selección simple',
  'seleccion-multiple': 'Selección múltiple',
  'verdadero-falso': 'Verdadero/Falso',
  numerica: 'Numérica',
  pareo: 'Pareo',
};

export function AdminEditor() {
  const { temaId, dificultad } = useParams();
  const tema = obtenerTema(temaId);
  const navigate = useNavigate();

  const [preguntas, setPreguntas] = useState([]);
  const [umbralAprobacion, setUmbralAprobacion] = useState(15);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    setCargando(true);
    obtenerCuestionario(temaId, dificultad).then((quiz) => {
      if (quiz) {
        setPreguntas(quiz.preguntas);
        setUmbralAprobacion(quiz.umbralAprobacion);
      }
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

  function quitarPregunta(indice) {
    setPreguntas((prev) => prev.filter((_, i) => i !== indice));
  }

  async function manejarGuardar() {
    setGuardando(true);
    setMensaje(null);
    const { error } = await guardarCuestionario({
      tema: temaId,
      dificultad,
      umbralAprobacion: Number(umbralAprobacion),
      preguntas,
    });
    setGuardando(false);
    if (error) {
      setMensaje({ tipo: 'error', texto: `No se pudo guardar: ${error.message}` });
    } else {
      setMensaje({ tipo: 'exito', texto: 'Cuestionario guardado correctamente.' });
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
          Supabase no está configurado; puedes armar el cuestionario pero no se podrá guardar hasta
          configurar las variables de entorno.
        </p>
      )}

      {cargando ? (
        <p>Cargando…</p>
      ) : (
        <>
          <label className="admin-editor-umbral">
            Umbral de aprobación (nota mínima sobre 20)
            <input
              type="number"
              min="0"
              max="20"
              value={umbralAprobacion}
              onChange={(e) => setUmbralAprobacion(e.target.value)}
            />
          </label>

          <h2>Preguntas ({preguntas.length})</h2>
          <ul className="admin-lista-preguntas">
            {preguntas.map((pregunta, indice) => (
              <li key={indice}>
                <span className="admin-pregunta-tipo">
                  {ETIQUETAS_TIPO[pregunta.tipo] || pregunta.tipo}
                </span>
                <span className="admin-pregunta-enunciado">{pregunta.enunciado}</span>
                <button type="button" onClick={() => quitarPregunta(indice)}>
                  Eliminar
                </button>
              </li>
            ))}
            {preguntas.length === 0 && <li className="admin-lista-vacia">Aún no hay preguntas.</li>}
          </ul>

          <h2>Agregar nueva pregunta</h2>
          <EditorPregunta onAgregar={(pregunta) => setPreguntas((prev) => [...prev, pregunta])} />

          {mensaje && <p className={`admin-mensaje admin-mensaje-${mensaje.tipo}`}>{mensaje.texto}</p>}

          <button
            className="admin-boton-guardar"
            onClick={manejarGuardar}
            disabled={guardando || preguntas.length === 0}
          >
            {guardando ? 'Guardando…' : 'Guardar cuestionario'}
          </button>
        </>
      )}
    </div>
  );
}
