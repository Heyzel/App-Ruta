import { createContext, useCallback, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { TEMAS, siguienteDificultad } from '../data/temas';

const CLAVE_PROGRESO = 'progreso-app-tesis';

function estadoInicial() {
  const nivelesDesbloqueados = {};
  TEMAS.forEach((tema) => {
    nivelesDesbloqueados[tema.id] = ['principiante'];
  });
  return {
    nivelesDesbloqueados,
    resultadosQuiz: {},
    ultimaUbicacion: null,
    nombreUsuario: '',
  };
}

const ProgresoContext = createContext(null);

export function ProgresoProvider({ children }) {
  const [progreso, setProgreso] = useLocalStorage(CLAVE_PROGRESO, estadoInicial());

  const estaDesbloqueado = useCallback(
    (temaId, dificultad) => {
      const niveles = progreso.nivelesDesbloqueados[temaId] || ['principiante'];
      return niveles.includes(dificultad);
    },
    [progreso.nivelesDesbloqueados]
  );

  const obtenerResultado = useCallback(
    (temaId, dificultad) => progreso.resultadosQuiz[`${temaId}:${dificultad}`] || null,
    [progreso.resultadosQuiz]
  );

  const registrarResultado = useCallback(
    (temaId, dificultad, resultado) => {
      setProgreso((prev) => {
        const clave = `${temaId}:${dificultad}`;
        const nuevosResultados = {
          ...prev.resultadosQuiz,
          [clave]: { ...resultado, fecha: new Date().toISOString() },
        };

        let nuevosNiveles = prev.nivelesDesbloqueados;
        if (resultado.aprobado) {
          const siguiente = siguienteDificultad(dificultad);
          const nivelesActuales = prev.nivelesDesbloqueados[temaId] || ['principiante'];
          if (siguiente && !nivelesActuales.includes(siguiente)) {
            nuevosNiveles = {
              ...prev.nivelesDesbloqueados,
              [temaId]: [...nivelesActuales, siguiente],
            };
          }
        }

        return {
          ...prev,
          resultadosQuiz: nuevosResultados,
          nivelesDesbloqueados: nuevosNiveles,
        };
      });
    },
    [setProgreso]
  );

  const actualizarUbicacion = useCallback(
    (ruta, temaId, dificultad) => {
      setProgreso((prev) => ({
        ...prev,
        ultimaUbicacion: { ruta, temaId, dificultad },
      }));
    },
    [setProgreso]
  );

  const setNombreUsuario = useCallback(
    (nombre) => {
      setProgreso((prev) => ({ ...prev, nombreUsuario: nombre.trim() }));
    },
    [setProgreso]
  );

  const value = useMemo(
    () => ({
      progreso,
      estaDesbloqueado,
      obtenerResultado,
      registrarResultado,
      actualizarUbicacion,
      setNombreUsuario,
    }),
    [
      progreso,
      estaDesbloqueado,
      obtenerResultado,
      registrarResultado,
      actualizarUbicacion,
      setNombreUsuario,
    ]
  );

  return <ProgresoContext.Provider value={value}>{children}</ProgresoContext.Provider>;
}

export function useProgreso() {
  const contexto = useContext(ProgresoContext);
  if (!contexto) {
    throw new Error('useProgreso debe usarse dentro de un ProgresoProvider');
  }
  return contexto;
}
