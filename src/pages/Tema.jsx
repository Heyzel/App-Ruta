import { Link, useParams } from 'react-router-dom';
import { obtenerTema } from '../data/temas';
import { useProgreso } from '../context/ProgresoContext';
import { SelectorDificultad } from '../components/SelectorDificultad';
import './Tema.css';

export function Tema() {
  const { temaId } = useParams();
  const tema = obtenerTema(temaId);
  const { estaDesbloqueado, obtenerResultado } = useProgreso();

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
      <SelectorDificultad
        temaId={tema.id}
        estaDesbloqueado={estaDesbloqueado}
        obtenerResultado={obtenerResultado}
      />
    </div>
  );
}
