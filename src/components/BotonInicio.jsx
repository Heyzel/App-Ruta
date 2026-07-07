import { useLocation, useNavigate } from 'react-router-dom';
import './BotonInicio.css';

export function BotonInicio() {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === '/') return null;

  return (
    <button className="boton-inicio" onClick={() => navigate('/')} aria-label="Volver al inicio">
      ⌂ Inicio
    </button>
  );
}
