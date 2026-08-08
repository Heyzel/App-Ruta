import { useNavigate } from 'react-router-dom';
import './TarjetaTema.css';

export function TarjetaTema({ tema, numero, marcado, opcional, puedeMarcar, onMarcarCompletado }) {
  const navigate = useNavigate();
  const irATema = () => navigate(`/tema/${tema.id}`);

  return (
    <div
      className="tarjeta-tema"
      role="link"
      tabIndex={0}
      onClick={irATema}
      onKeyDown={(evento) => {
        if (evento.key === 'Enter') irATema();
      }}
    >
      <span className="tarjeta-tema-eyebrow">Tema {numero}</span>
      <div className="tarjeta-tema-titulo">
        <h3>{tema.nombre}</h3>
      </div>
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
          onClick={(evento) => {
            evento.stopPropagation();
            onMarcarCompletado(evento);
          }}
        >
          Marcar completado
        </button>
      )}
    </div>
  );
}
