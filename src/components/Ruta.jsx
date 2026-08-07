import './Ruta.css';

const ICONOS = {
  completado: '✓',
  bloqueado: '🔒',
};

export function Ruta({ nodos, indiceActivo, className = '', alternado = false }) {
  const indiceRelleno = Math.min(Math.max(indiceActivo, 0), nodos.length - 1);
  const porcentajeRelleno = ((indiceRelleno + 0.5) / nodos.length) * 100;

  return (
    <div className={`ruta ${alternado ? 'ruta--alternado' : ''} ${className}`}>
      <div className="ruta-spine" aria-hidden="true">
        <div className="ruta-spine-relleno" style={{ height: `${porcentajeRelleno}%` }} />
      </div>
      <ol className="ruta-lista">
        {nodos.map((nodo, i) => {
          const lado = alternado ? (i % 2 === 0 ? ' ruta-item--izq' : ' ruta-item--der') : '';
          return (
            <li
              key={nodo.id}
              className={`ruta-item ruta-item--${nodo.estado}${i === indiceActivo ? ' ruta-item--activo' : ''}${lado}`}
            >
              <span className="ruta-punto" aria-hidden="true">{ICONOS[nodo.estado] ?? ''}</span>
              <div className="ruta-tarjeta">{nodo.contenido}</div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
