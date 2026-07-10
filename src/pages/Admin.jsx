import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TEMAS, DIFICULTADES, NOMBRE_DIFICULTAD } from '../data/temas';
import { listarCuestionarios } from '../services/cuestionarios';
import { listarContenidos } from '../services/contenidos';
import { listarResultados } from '../services/resultados';
import { estaAutenticado, autenticar, cerrarSesionAdmin } from '../utils/adminAuth';
import { supabaseConfigurado } from '../lib/supabase';
import './Admin.css';

function LoginAdmin({ onIngresar }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  function manejarEnvio(evento) {
    evento.preventDefault();
    if (autenticar(password)) {
      onIngresar();
    } else {
      setError(true);
    }
  }

  return (
    <div className="pagina-admin">
      <form className="admin-login" onSubmit={manejarEnvio}>
        <h1>Acceso administrador</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(false);
          }}
          placeholder="Contraseña"
          autoFocus
        />
        {error && <p className="admin-error">Contraseña incorrecta.</p>}
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}

export function Admin() {
  const [autenticado, setAutenticado] = useState(estaAutenticado());
  const [pestana, setPestana] = useState('cuestionarios');
  const [cuestionarios, setCuestionarios] = useState([]);
  const [contenidos, setContenidos] = useState([]);
  const [resultados, setResultados] = useState([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (!autenticado) return;
    setCargando(true);
    Promise.all([listarCuestionarios(), listarContenidos(), listarResultados()]).then(
      ([resCuest, resContenidos, resResult]) => {
        setCuestionarios(resCuest.data || []);
        setContenidos(resContenidos.data || []);
        setResultados(resResult.data || []);
        setCargando(false);
      }
    );
  }, [autenticado]);

  if (!autenticado) {
    return <LoginAdmin onIngresar={() => setAutenticado(true)} />;
  }

  function existeCuestionario(temaId, dificultad) {
    return cuestionarios.find((c) => c.tema === temaId && c.dificultad === dificultad);
  }

  function existeContenido(temaId, dificultad) {
    return contenidos.find((c) => c.tema === temaId && c.dificultad === dificultad);
  }

  return (
    <div className="pagina-admin">
      <header className="admin-encabezado">
        <h1>Panel administrador</h1>
        <button
          className="admin-cerrar-sesion"
          onClick={() => {
            cerrarSesionAdmin();
            setAutenticado(false);
          }}
        >
          Cerrar sesión
        </button>
      </header>

      {!supabaseConfigurado && (
        <p className="admin-aviso">
          Supabase no está configurado (faltan VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY en .env).
          Los cuestionarios se sirven desde el JSON local y no se pueden guardar cambios.
        </p>
      )}

      <div className="admin-tabs">
        <button
          className={pestana === 'cuestionarios' ? 'activa' : ''}
          onClick={() => setPestana('cuestionarios')}
        >
          Cuestionarios
        </button>
        <button
          className={pestana === 'contenidos' ? 'activa' : ''}
          onClick={() => setPestana('contenidos')}
        >
          Contenidos
        </button>
        <button className={pestana === 'resultados' ? 'activa' : ''} onClick={() => setPestana('resultados')}>
          Resultados
        </button>
      </div>

      {cargando && <p>Cargando…</p>}

      {!cargando && pestana === 'cuestionarios' && (
        <table className="admin-tabla">
          <thead>
            <tr>
              <th>Tema</th>
              <th>Dificultad</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {TEMAS.flatMap((tema) =>
              DIFICULTADES.map((dificultad) => {
                const cuestionario = existeCuestionario(tema.id, dificultad);
                return (
                  <tr key={`${tema.id}-${dificultad}`}>
                    <td>{tema.nombre}</td>
                    <td>{NOMBRE_DIFICULTAD[dificultad]}</td>
                    <td>{cuestionario ? `${cuestionario.preguntas.length} preguntas` : 'Sin crear (usa JSON local)'}</td>
                    <td>
                      <Link to={`/admin/cuestionario/${tema.id}/${dificultad}`}>
                        {cuestionario ? 'Editar' : 'Crear'}
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      )}

      {!cargando && pestana === 'contenidos' && (
        <table className="admin-tabla">
          <thead>
            <tr>
              <th>Tema</th>
              <th>Dificultad</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {TEMAS.flatMap((tema) =>
              DIFICULTADES.map((dificultad) => {
                const contenido = existeContenido(tema.id, dificultad);
                return (
                  <tr key={`${tema.id}-${dificultad}`}>
                    <td>{tema.nombre}</td>
                    <td>{NOMBRE_DIFICULTAD[dificultad]}</td>
                    <td>{contenido ? `${contenido.items.length} contenidos` : 'Sin crear (usa JSON local)'}</td>
                    <td>
                      <Link to={`/admin/contenido/${tema.id}/${dificultad}`}>
                        {contenido ? 'Editar' : 'Crear'}
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      )}

      {!cargando && pestana === 'resultados' && (
        <table className="admin-tabla">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tema</th>
              <th>Dificultad</th>
              <th>Nota</th>
              <th>Aprobado</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {resultados.length === 0 && (
              <tr>
                <td colSpan={6}>Aún no hay resultados guardados.</td>
              </tr>
            )}
            {resultados.map((resultado) => (
              <tr key={resultado.id}>
                <td>{resultado.nombre}</td>
                <td>{resultado.tema}</td>
                <td>{NOMBRE_DIFICULTAD[resultado.dificultad] || resultado.dificultad}</td>
                <td>{resultado.nota}/20</td>
                <td>{resultado.aprobado ? 'Sí' : 'No'}</td>
                <td>{new Date(resultado.creado_en).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
