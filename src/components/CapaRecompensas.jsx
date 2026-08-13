import { useEffect, useMemo } from 'react';
import { useProgreso } from '../context/ProgresoContext';
import { TOTAL_ESTRELLAS, TOTAL_MEDALLAS } from '../data/insignias';
import { useRecompensas, TAMANO_VUELO, TAMANO_DESTINO } from '../context/RecompensasContext';
import { Insignia } from './Insignia';
import './CapaRecompensas.css';

const COLORES_CONFETI = ['#facc15', '#4f46e5', '#22c55e', '#ef4444', '#38bdf8', '#f97316'];
const PIEZAS_CONFETI = 70;

function generarConfeti() {
  return Array.from({ length: PIEZAS_CONFETI }, (_, i) => ({
    id: i,
    izquierda: Math.random() * 100,
    retraso: Math.random() * 2.2,
    duracion: 2.6 + Math.random() * 2.2,
    color: COLORES_CONFETI[i % COLORES_CONFETI.length],
    giro: Math.random() * 360,
    ancho: 6 + Math.random() * 6,
  }));
}

function Confeti() {
  const piezas = useMemo(generarConfeti, []);
  return (
    <div className="confeti" aria-hidden="true">
      {piezas.map((pieza) => (
        <span
          key={pieza.id}
          className="confeti-pieza"
          style={{
            left: `${pieza.izquierda}%`,
            width: `${pieza.ancho}px`,
            height: `${pieza.ancho * 1.8}px`,
            background: pieza.color,
            animationDelay: `${pieza.retraso}s`,
            animationDuration: `${pieza.duracion}s`,
            transform: `rotate(${pieza.giro}deg)`,
          }}
        />
      ))}
    </div>
  );
}

function ModalTrofeo({ nombre, onCerrar }) {
  useEffect(() => {
    function alPulsar(evento) {
      if (evento.key === 'Escape') onCerrar();
    }
    window.addEventListener('keydown', alPulsar);
    return () => window.removeEventListener('keydown', alPulsar);
  }, [onCerrar]);

  return (
    <div className="trofeo-fondo" role="dialog" aria-modal="true" aria-labelledby="trofeo-titulo">
      <Confeti />
      <div className="trofeo-tarjeta">
        <div className="trofeo-halo" aria-hidden="true" />
        <Insignia tipo="trofeo" tamano={168} className="trofeo-sprite" />
        <h2 id="trofeo-titulo" className="trofeo-titulo">
          ¡Felicitaciones{nombre ? `, ${nombre}` : ''}!
        </h2>
        <p className="trofeo-mensaje">
          Has completado <strong>toda la ruta de aprendizaje</strong>: los {TOTAL_MEDALLAS} temas y
          sus {TOTAL_ESTRELLAS} niveles.
        </p>
        <p className="trofeo-mensaje">
          Estás listo para todos los retos que se presentan en{' '}
          <strong>Algoritmos y Programación</strong>.
        </p>
        <button type="button" className="trofeo-boton" onClick={onCerrar} autoFocus>
          ¡Genial!
        </button>
      </div>
    </div>
  );
}

// Capa global de celebraciones: los sprites que vuelan desde el centro de la
// pantalla hasta su sitio y el modal del trofeo final. Va por encima de todo
// (ver z-index en el CSS) y no intercepta clics salvo en el modal.
export function CapaRecompensas() {
  const { vuelos, trofeoVisible, cerrarTrofeo } = useRecompensas();
  const { progreso } = useProgreso();

  return (
    <div className="capa-recompensas">
      {vuelos.map((vuelo) => (
        <Insignia
          key={vuelo.id}
          tipo={vuelo.tipo}
          tamano={TAMANO_VUELO}
          className="insignia-vuelo"
          style={{
            '--destino-x': `${vuelo.x}px`,
            '--destino-y': `${vuelo.y}px`,
            '--escala-final': TAMANO_DESTINO / TAMANO_VUELO,
          }}
        />
      ))}

      {trofeoVisible && <ModalTrofeo nombre={progreso.nombreUsuario} onCerrar={cerrarTrofeo} />}
    </div>
  );
}
