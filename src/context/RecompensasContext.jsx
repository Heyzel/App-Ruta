import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { useAudio } from './AudioContext';

// Duración total del vuelo del sprite (grande en el centro → pequeño en su
// sitio). Debe coincidir con la animación `insignia-vuelo` de
// CapaRecompensas.css: aquí solo se usa para saber cuándo quitar el sprite
// del DOM.
export const DURACION_VUELO = 1700;

// Tamaño del sprite mientras vuela y tamaño al que aterriza (el mismo que
// tiene la insignia fija que queda junto al botón).
export const TAMANO_VUELO = 160;
export const TAMANO_DESTINO = 26;

const RecompensasContext = createContext(null);

export function RecompensasProvider({ children }) {
  const { playSfx } = useAudio();
  const [vuelos, setVuelos] = useState([]);
  const [trofeoVisible, setTrofeoVisible] = useState(false);
  const siguienteId = useRef(0);

  // Lanza el sprite: suena el arpegio, aparece grande en el centro y viaja
  // hasta `elementoDestino` (el hueco que queda al lado del botón de
  // completado). Si no hay elemento —p. ej. la tarjeta se desmontó— no se
  // anima nada, pero el sonido igual se reproduce.
  const celebrarInsignia = useCallback(
    (tipo, elementoDestino) => {
      playSfx('recompensa');
      if (!elementoDestino) return;

      const rect = elementoDestino.getBoundingClientRect();
      const id = siguienteId.current;
      siguienteId.current += 1;

      setVuelos((prev) => [
        ...prev,
        { id, tipo, x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 },
      ]);
      window.setTimeout(() => {
        setVuelos((prev) => prev.filter((vuelo) => vuelo.id !== id));
      }, DURACION_VUELO);
    },
    [playSfx]
  );

  const celebrarTrofeo = useCallback(() => {
    playSfx('trofeo');
    setTrofeoVisible(true);
  }, [playSfx]);

  const cerrarTrofeo = useCallback(() => setTrofeoVisible(false), []);

  const value = useMemo(
    () => ({ vuelos, trofeoVisible, celebrarInsignia, celebrarTrofeo, cerrarTrofeo }),
    [vuelos, trofeoVisible, celebrarInsignia, celebrarTrofeo, cerrarTrofeo]
  );

  return <RecompensasContext.Provider value={value}>{children}</RecompensasContext.Provider>;
}

export function useRecompensas() {
  const contexto = useContext(RecompensasContext);
  if (!contexto) {
    throw new Error('useRecompensas debe usarse dentro de un RecompensasProvider');
  }
  return contexto;
}
