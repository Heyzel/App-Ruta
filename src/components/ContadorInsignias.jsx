import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useProgreso } from '../context/ProgresoContext';
import { INSIGNIAS, ORDEN_INSIGNIAS, TOTALES, contarInsignias } from '../data/insignias';
import { Insignia } from './Insignia';
import './ContadorInsignias.css';

// Contador fijo de la esquina superior derecha: trofeo 0/1 · medalla 0/9 ·
// estrella 0/27. Los conteos salen del progreso guardado (ver
// data/insignias.js), así que se mantienen al día solos.
export function ContadorInsignias() {
  const { progreso } = useProgreso();
  const location = useLocation();
  const conteos = contarInsignias(progreso);

  // Destello breve en el chip cuyo número acaba de subir. El efecto depende
  // de los tres números sueltos (no del objeto, que se recrea en cada
  // render y volvería a lanzar el efecto sin que nada haya cambiado).
  const { estrella, medalla, trofeo } = conteos;
  const [destello, setDestello] = useState(null);
  const conteosPrevios = useRef(conteos);

  useEffect(() => {
    const actuales = { estrella, medalla, trofeo };
    const subio = ORDEN_INSIGNIAS.find((tipo) => actuales[tipo] > conteosPrevios.current[tipo]);
    conteosPrevios.current = actuales;
    if (!subio) return undefined;
    setDestello(subio);
    const temporizador = window.setTimeout(() => setDestello(null), 900);
    return () => window.clearTimeout(temporizador);
  }, [estrella, medalla, trofeo]);

  // El panel de administración no es parte de la ruta del estudiante.
  if (location.pathname.startsWith('/admin')) return null;

  // El botón "Inicio" también vive arriba a la derecha; cuando está visible
  // (todas las rutas menos la bienvenida y la cartelera) el contador baja
  // para no solaparse con él.
  const hayBotonInicio = location.pathname !== '/' && location.pathname !== '/temas';

  return (
    <div
      className={`contador-insignias${hayBotonInicio ? ' contador-insignias--bajo' : ''}`}
      aria-label="Recompensas conseguidas"
    >
      {ORDEN_INSIGNIAS.map((tipo) => (
        <div
          key={tipo}
          className={`contador-chip${destello === tipo ? ' contador-chip--gana' : ''}`}
          title={`${INSIGNIAS[tipo].nombre}: ${conteos[tipo]} de ${TOTALES[tipo]}`}
        >
          <Insignia tipo={tipo} tamano={32} />
          <span className="contador-cifra">
            {conteos[tipo]}/{TOTALES[tipo]}
          </span>
        </div>
      ))}
    </div>
  );
}
