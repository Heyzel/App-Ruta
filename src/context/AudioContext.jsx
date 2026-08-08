import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { obtenerTema } from '../data/temas';
import { reproducirSfx } from '../utils/sintetizadorAudio';
import { cargarPista, reproducirPista } from '../utils/reproductorMusica';

const CLAVE_AUDIO = 'audio-app-tesis';
const VOLUMEN_POR_DEFECTO = 0.5;
const PISTA_CARTELERA = '/musica/cartelera.mp3';

function estadoInicial() {
  return { volumen: VOLUMEN_POR_DEFECTO };
}

// Cada tema tiene su propia pista (mismo nombre que su id, ver
// public/musica/); cualquier otra ruta (inicio, cartelera de temas, examen
// de suficiencia, admin...) usa la pista de la cartelera como música por
// defecto.
function resolverPista(pathname) {
  const coincidencia = pathname.match(/^\/tema\/([^/]+)/);
  const temaId = coincidencia?.[1];
  if (temaId && obtenerTema(temaId)) {
    return `/musica/${temaId}.mp3`;
  }
  return PISTA_CARTELERA;
}

const AudioContexto = createContext(null);

export function AudioProvider({ children }) {
  const [audio, setAudio] = useLocalStorage(CLAVE_AUDIO, estadoInicial());
  // Si la música estaba sonando no se puede reanudar sola tras recargar
  // (política de autoplay del navegador), así que este estado nunca persiste.
  const [musicaActiva, setMusicaActiva] = useState(false);
  const location = useLocation();

  const ctxRef = useRef(null);
  const gainMaestroRef = useRef(null);
  const fuenteRef = useRef(null);
  const pistaActualRef = useRef(null);
  const buffersCacheRef = useRef(new Map());

  const obtenerContexto = useCallback(() => {
    if (!ctxRef.current) {
      const Ctor = window.AudioContext || window.webkitAudioContext;
      const ctx = new Ctor();
      const gain = ctx.createGain();
      gain.gain.value = audio.volumen;
      gain.connect(ctx.destination);
      ctxRef.current = ctx;
      gainMaestroRef.current = gain;
    } else if (ctxRef.current.state === 'suspended') {
      ctxRef.current.resume();
    }
    return { ctx: ctxRef.current, gainMaestro: gainMaestroRef.current };
  }, [audio.volumen]);

  const obtenerBufferCacheado = useCallback((ctx, url) => {
    if (!buffersCacheRef.current.has(url)) {
      buffersCacheRef.current.set(url, cargarPista(ctx, url));
    }
    return buffersCacheRef.current.get(url);
  }, []);

  useEffect(() => {
    if (gainMaestroRef.current) {
      gainMaestroRef.current.gain.value = audio.volumen;
    }
  }, [audio.volumen]);

  // Cambia de pista cuando cambia la ruta (si la música está encendida) o
  // cuando el estudiante la enciende. Si la ruta nueva usa la misma pista
  // que ya está sonando (p. ej. moverse entre contenidos/quiz/resultado de
  // un mismo tema), no reinicia nada.
  useEffect(() => {
    if (!musicaActiva) return;
    const url = resolverPista(location.pathname);
    if (url === pistaActualRef.current) return;

    let cancelado = false;
    (async () => {
      try {
        const { ctx, gainMaestro } = obtenerContexto();
        const buffer = await obtenerBufferCacheado(ctx, url);
        if (cancelado) return;
        fuenteRef.current?.stop();
        fuenteRef.current = reproducirPista(ctx, gainMaestro, buffer);
        pistaActualRef.current = url;
      } catch (error) {
        console.warn('No se pudo reproducir la música de fondo:', error);
      }
    })();

    return () => {
      cancelado = true;
    };
  }, [location.pathname, musicaActiva, obtenerContexto, obtenerBufferCacheado]);

  useEffect(
    () => () => {
      fuenteRef.current?.stop();
      ctxRef.current?.close();
    },
    []
  );

  const playSfx = useCallback(
    (tipo) => {
      if (audio.volumen === 0) return;
      const { ctx, gainMaestro } = obtenerContexto();
      reproducirSfx(ctx, gainMaestro, tipo);
    },
    [audio.volumen, obtenerContexto]
  );

  const toggleMusica = useCallback(() => {
    // Los efectos secundarios (detener el nodo activo) viven aquí, no dentro
    // de un updater de setState: StrictMode invoca los updaters dos veces en
    // desarrollo, lo que duplicaría la reproducción.
    if (musicaActiva) {
      fuenteRef.current?.stop();
      fuenteRef.current = null;
      pistaActualRef.current = null;
      setMusicaActiva(false);
      return;
    }
    obtenerContexto();
    if (audio.volumen === 0) {
      setAudio((prev) => ({ ...prev, volumen: VOLUMEN_POR_DEFECTO }));
    }
    setMusicaActiva(true);
  }, [musicaActiva, audio.volumen, obtenerContexto, setAudio]);

  const setVolumen = useCallback(
    (valor) => {
      setAudio((prev) => ({ ...prev, volumen: Math.min(1, Math.max(0, valor)) }));
    },
    [setAudio]
  );

  const value = useMemo(
    () => ({
      musicaActiva,
      volumen: audio.volumen,
      playSfx,
      toggleMusica,
      setVolumen,
    }),
    [musicaActiva, audio.volumen, playSfx, toggleMusica, setVolumen]
  );

  return <AudioContexto.Provider value={value}>{children}</AudioContexto.Provider>;
}

export function useAudio() {
  const contexto = useContext(AudioContexto);
  if (!contexto) {
    throw new Error('useAudio debe usarse dentro de un AudioProvider');
  }
  return contexto;
}
