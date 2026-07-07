import { useProgreso } from '../context/ProgresoContext';
import { TEMAS } from '../data/temas';
import { TarjetaTema } from '../components/TarjetaTema';
import { AvisoContinuar } from '../components/AvisoContinuar';
import './Inicio.css';

export function Inicio() {
  const { progreso } = useProgreso();

  return (
    <div className="pagina-inicio">
      <header className="inicio-encabezado">
        <h1>Cartelera de Contenido Educativo</h1>
        <p>Elige un tema para comenzar a aprender programación.</p>
      </header>

      <AvisoContinuar ultimaUbicacion={progreso.ultimaUbicacion} />

      <div className="grilla-temas">
        {TEMAS.map((tema) => (
          <TarjetaTema key={tema.id} tema={tema} />
        ))}
      </div>
    </div>
  );
}
