import { Link, useParams } from 'react-router-dom';
import { obtenerTema } from '../data/temas';
import { RutaNiveles } from '../components/RutaNiveles';
import './Tema.css';

export function Tema() {
  const { temaId } = useParams();
  const tema = obtenerTema(temaId);

  if (!tema) {
    return (
      <div className="pagina-tema">
        <p>Tema no encontrado.</p>
        <Link to="/">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div className="pagina-tema">
      <h1>{tema.nombre}</h1>
      <p className="tema-descripcion">{tema.descripcion}</p>
      <h2>Elige un nivel de dificultad</h2>
      <RutaNiveles temaId={tema.id} />
    </div>
  );
}
