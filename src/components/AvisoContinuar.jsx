import { useNavigate } from 'react-router-dom';
import { obtenerTema, NOMBRE_DIFICULTAD } from '../data/temas';
import './AvisoContinuar.css';

export function AvisoContinuar({ ultimaUbicacion }) {
  const navigate = useNavigate();
  if (!ultimaUbicacion) return null;

  const tema = obtenerTema(ultimaUbicacion.temaId);
  if (!tema) return null;

  const nombreDificultad = NOMBRE_DIFICULTAD[ultimaUbicacion.dificultad] || '';

  return (
    <div className="aviso-continuar">
      <div>
        <strong>Continuar donde lo dejaste</strong>
        <p>
          {tema.nombre}
          {nombreDificultad ? ` · ${nombreDificultad}` : ''}
        </p>
      </div>
      <button onClick={() => navigate(ultimaUbicacion.ruta)}>▶ Continuar</button>
    </div>
  );
}
