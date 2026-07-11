import { useLocation, useNavigate } from 'react-router-dom';
import './BotonInicio.css';

export function BotonInicio() {
  const location = useLocation();
  const navigate = useNavigate();

  // Se oculta en la bienvenida y en la cartelera de temas (que ya es el inicio).
  if (location.pathname === '/' || location.pathname === '/temas') return null;

  return (
    <button className="boton-inicio" onClick={() => navigate('/temas')} aria-label="Volver al inicio">
      ⌂ Inicio
    </button>
  );
}
