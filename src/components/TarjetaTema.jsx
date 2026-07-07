import { Link } from 'react-router-dom';
import './TarjetaTema.css';

export function TarjetaTema({ tema }) {
  return (
    <Link to={`/tema/${tema.id}`} className="tarjeta-tema">
      <h3>{tema.nombre}</h3>
      <p>{tema.descripcion}</p>
    </Link>
  );
}
