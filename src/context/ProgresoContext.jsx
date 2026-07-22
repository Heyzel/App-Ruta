import { createContext, useCallback, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { TEMAS, DIFICULTADES, siguienteDificultad, esTemaDesbloqueadoCompleto } from '../data/temas';

const CLAVE_PROGRESO = 'progreso-app-tesis';

function estadoInicial() {
  const nivelesDesbloqueados = {};
  TEMAS.forEach((tema) => {
    nivelesDesbloqueados[tema.id] = tema.desbloqueadoCompleto
      ? [...DIFICULTADES]
      : ['principiante'];
  });
  return {
    nivelesDesbloqueados,
    resultadosQuiz: {},
    ultimaUbicacion: null,
    nombreUsuario: '',
    examenPresentado: false,
  };
}

const ProgresoContext = createContext(null);

export function ProgresoProvider({ children }) {
  const [progreso, setProgreso] = useLocalStorage(CLAVE_PROGRESO, estadoInicial());

  const estaDesbloqueado = useCallback(
    (temaId, dificultad) => {
      // Los temas marcados como desbloqueados por completo (p. ej. el tema 0)
      // siempre están disponibles, incluso para progresos guardados antes de
      // que el tema existiera en localStorage.
      if (esTemaDesbloqueadoCompleto(temaId)) return true;
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

  const desbloquearPorExamen = useCallback(
    (mapaNiveles) => {
      // mapaNiveles: { temaId: ['principiante', 'intermedio', ...], ... }
      // El desbloqueo de niveles solo ocurre la primera vez que se presenta el
      // examen; en presentaciones posteriores solo se registra la calificación.
      setProgreso((prev) => {
        if (prev.examenPresentado) return prev;
        const nuevos = { ...prev.nivelesDesbloqueados };
        Object.entries(mapaNiveles).forEach(([temaId, niveles]) => {
          const actuales = prev.nivelesDesbloqueados[temaId] || ['principiante'];
          nuevos[temaId] = Array.from(new Set([...actuales, ...niveles]));
        });
        return { ...prev, nivelesDesbloqueados: nuevos, examenPresentado: true };
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
      desbloquearPorExamen,
      actualizarUbicacion,
      setNombreUsuario,
    }),
    [
      progreso,
      estaDesbloqueado,
      obtenerResultado,
      registrarResultado,
      desbloquearPorExamen,
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
