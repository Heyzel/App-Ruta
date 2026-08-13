import { Link, useParams } from 'react-router-dom';
import { obtenerTema } from '../data/temas';
import { RutaNiveles } from '../components/RutaNiveles';
import { CajaOpinionTema } from '../components/CajaOpinionTema';
import { BotonAudio } from '../components/ControlAudio';
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

  const esPropedeuticoAritmetica = tema.id === 'propedeutico-aritmetica';

  return (
    <div className="pagina-tema">
      <h1 className={esPropedeuticoAritmetica ? 'tema-titulo-propedeutico' : ''}>{tema.nombre}</h1>
      <p className="tema-descripcion">{tema.descripcion}</p>
      {/* En vista de teléfono, música y opinión se muestran en fila justo
          antes del subtítulo en vez de flotar en la esquina inferior
          izquierda (ver ControlAudio.css / CajaOpinion.css). En pantallas
          más grandes no cambia nada: ambos siguen flotando donde siempre. */}
      <div className="tema-fila-acciones">
        <BotonAudio className="control-audio-envoltura--fila" />
        <CajaOpinionTema temaId={tema.id} />
      </div>
      <h2>Elige un nivel de dificultad</h2>
      <RutaNiveles temaId={tema.id} />
    </div>
  );
}
