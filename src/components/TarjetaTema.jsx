import { Link } from 'react-router-dom';
import './TarjetaTema.css';

export function TarjetaTema({ tema, numero, marcado, opcional, puedeMarcar, onMarcarCompletado }) {
  return (
    <div className="tarjeta-tema">
      <span className="tarjeta-tema-eyebrow">Tema {numero}</span>
      <Link to={`/tema/${tema.id}`} className="tarjeta-tema-titulo">
        <h3>{tema.nombre}</h3>
      </Link>
      <p>{tema.descripcion}</p>

      {(opcional || marcado) && (
        <div className="tarjeta-tema-etiquetas">
          {opcional && <span className="tarjeta-tema-badge tarjeta-tema-badge--opcional">Opcional</span>}
          {marcado && <span className="tarjeta-tema-badge tarjeta-tema-badge--completado">✓ Completado</span>}
        </div>
      )}

      {!marcado && (
        <button
          type="button"
          className="tarjeta-tema-boton"
          disabled={!puedeMarcar}
          title={puedeMarcar ? undefined : 'Marca los tres niveles de este tema para habilitarlo'}
          onClick={onMarcarCompletado}
        >
          Marcar completado
        </button>
      )}
    </div>
  );
}
