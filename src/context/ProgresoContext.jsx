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
    nivelesMarcados: {},
    temasMarcados: [],
    ultimaUbicacion: null,
    nombreUsuario: '',
    examenPresentado: false,
    opinionesTemaEnviadas: [],
    opinionPlataformaEnviada: false,
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

  // "Marcado" es la confirmación manual del estudiante (botón "Marcar
  // completado"), distinta del resultado real del quiz: solo se puede marcar
  // un nivel una vez que ya fue aprobado de verdad (ver RutaNiveles.jsx).
  // El `|| {}` / `|| []` cubre progresos guardados en localStorage antes de
  // que existieran estos campos (no vienen en el objeto persistido).
  const esNivelMarcado = useCallback(
    (temaId, dificultad) => ((progreso.nivelesMarcados || {})[temaId] || []).includes(dificultad),
    [progreso.nivelesMarcados]
  );

  const marcarNivelCompletado = useCallback(
    (temaId, dificultad) => {
      setProgreso((prev) => {
        const nivelesMarcados = prev.nivelesMarcados || {};
        const actuales = nivelesMarcados[temaId] || [];
        if (actuales.includes(dificultad)) return prev;
        return {
          ...prev,
          nivelesMarcados: { ...nivelesMarcados, [temaId]: [...actuales, dificultad] },
        };
      });
    },
    [setProgreso]
  );

  const esTemaMarcado = useCallback(
    (temaId) => (progreso.temasMarcados || []).includes(temaId),
    [progreso.temasMarcados]
  );

  const marcarTemaCompletado = useCallback(
    (temaId) => {
      setProgreso((prev) => {
        const temasMarcados = prev.temasMarcados || [];
        if (temasMarcados.includes(temaId)) return prev;
        return { ...prev, temasMarcados: [...temasMarcados, temaId] };
      });
    },
    [setProgreso]
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
    (mapaNiveles, temasPerfectos = []) => {
      // mapaNiveles: { temaId: ['principiante', 'intermedio', ...], ... }
      // temasPerfectos: temaId de los temas donde se acertaron las 3 preguntas.
      // El desbloqueo de niveles solo ocurre la primera vez que se presenta el
      // examen; en presentaciones posteriores solo se registra la calificación.
      setProgreso((prev) => {
        if (prev.examenPresentado) return prev;
        const nuevosDesbloqueados = { ...prev.nivelesDesbloqueados };
        const nuevosMarcados = { ...(prev.nivelesMarcados || {}) };

        Object.entries(mapaNiveles).forEach(([temaId, niveles]) => {
          const actuales = prev.nivelesDesbloqueados[temaId] || ['principiante'];
          nuevosDesbloqueados[temaId] = Array.from(new Set([...actuales, ...niveles]));

          // Los niveles por debajo del más alto exonerado quedan marcados
          // como completados (la línea avanza hasta ahí); el más alto queda
          // como "actual" sin marcar, salvo que la calificación en el tema
          // haya sido perfecta, en cuyo caso también se marca (y con los
          // 3 niveles marcados, el tema queda disponible para marcarse).
          const esPerfecto = temasPerfectos.includes(temaId);
          const aMarcar = esPerfecto ? niveles : niveles.slice(0, -1);
          if (aMarcar.length > 0) {
            const marcadosActuales = nuevosMarcados[temaId] || [];
            nuevosMarcados[temaId] = Array.from(new Set([...marcadosActuales, ...aMarcar]));
          }
        });

        return {
          ...prev,
          nivelesDesbloqueados: nuevosDesbloqueados,
          nivelesMarcados: nuevosMarcados,
          examenPresentado: true,
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

  const haEnviadoOpinionTema = useCallback(
    (temaId) => (progreso.opinionesTemaEnviadas || []).includes(temaId),
    [progreso.opinionesTemaEnviadas]
  );

  const marcarOpinionTemaEnviada = useCallback(
    (temaId) => {
      setProgreso((prev) => {
        const actuales = prev.opinionesTemaEnviadas || [];
        if (actuales.includes(temaId)) return prev;
        return { ...prev, opinionesTemaEnviadas: [...actuales, temaId] };
      });
    },
    [setProgreso]
  );

  const marcarOpinionPlataformaEnviada = useCallback(() => {
    setProgreso((prev) => ({ ...prev, opinionPlataformaEnviada: true }));
  }, [setProgreso]);

  // Reinicia el progreso local (localStorage) para empezar la ruta desde
  // cero. No toca nada en Supabase: los resultados, opiniones, etc. ya
  // guardados en la base de datos permanecen intactos.
  const reiniciarProgreso = useCallback(() => {
    setProgreso(estadoInicial());
  }, [setProgreso]);

  const value = useMemo(
    () => ({
      progreso,
      estaDesbloqueado,
      obtenerResultado,
      esNivelMarcado,
      marcarNivelCompletado,
      esTemaMarcado,
      marcarTemaCompletado,
      registrarResultado,
      desbloquearPorExamen,
      actualizarUbicacion,
      setNombreUsuario,
      haEnviadoOpinionTema,
      marcarOpinionTemaEnviada,
      marcarOpinionPlataformaEnviada,
      reiniciarProgreso,
    }),
    [
      progreso,
      estaDesbloqueado,
      obtenerResultado,
      esNivelMarcado,
      marcarNivelCompletado,
      esTemaMarcado,
      marcarTemaCompletado,
      registrarResultado,
      desbloquearPorExamen,
      actualizarUbicacion,
      setNombreUsuario,
      haEnviadoOpinionTema,
      marcarOpinionTemaEnviada,
      marcarOpinionPlataformaEnviada,
      reiniciarProgreso,
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
