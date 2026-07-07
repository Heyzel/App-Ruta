import { Link } from 'react-router-dom';
import { DIFICULTADES, NOMBRE_DIFICULTAD } from '../data/temas';
import './SelectorDificultad.css';

export function SelectorDificultad({ temaId, estaDesbloqueado, obtenerResultado }) {
  return (
    <div className="selector-dificultad">
      {DIFICULTADES.map((dificultad) => {
        const desbloqueado = estaDesbloqueado(temaId, dificultad);
        const resultado = obtenerResultado(temaId, dificultad);

        const contenido = (
          <>
            <h3>{NOMBRE_DIFICULTAD[dificultad]}</h3>
            {!desbloqueado && <span className="candado">🔒 Bloqueado</span>}
            {resultado && (
              <span className="nota">
                Última nota: {resultado.nota}/20 {resultado.aprobado ? '✓' : ''}
              </span>
            )}
          </>
        );

        return desbloqueado ? (
          <Link key={dificultad} to={`/tema/${temaId}/${dificultad}`} className="nivel-card nivel-disponible">
            {contenido}
          </Link>
        ) : (
          <div key={dificultad} className="nivel-card nivel-bloqueado" aria-disabled="true">
            {contenido}
          </div>
        );
      })}
    </div>
  );
}
