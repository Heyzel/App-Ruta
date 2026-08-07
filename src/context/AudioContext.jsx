import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { reproducirSfx, iniciarBucleMusica } from '../utils/sintetizadorAudio';

const CLAVE_AUDIO = 'audio-app-tesis';

function estadoInicial() {
  return { silenciado: false, volumen: 0.4 };
}

const AudioContexto = createContext(null);

export function AudioProvider({ children }) {
  const [audio] = useLocalStorage(CLAVE_AUDIO, estadoInicial());
  // Si la música estaba sonando no se puede reanudar sola tras recargar
  // (política de autoplay del navegador), así que este estado nunca persiste.
  const [musicaActiva, setMusicaActiva] = useState(false);

  const ctxRef = useRef(null);
  const gainMaestroRef = useRef(null);
  const bucleRef = useRef(null);

  const obtenerContexto = useCallback(() => {
    if (!ctxRef.current) {
      const Ctor = window.AudioContext || window.webkitAudioContext;
      const ctx = new Ctor();
      const gain = ctx.createGain();
      gain.gain.value = audio.silenciado ? 0 : audio.volumen;
      gain.connect(ctx.destination);
      ctxRef.current = ctx;
      gainMaestroRef.current = gain;
    } else if (ctxRef.current.state === 'suspended') {
      ctxRef.current.resume();
    }
    return { ctx: ctxRef.current, gainMaestro: gainMaestroRef.current };
  }, [audio.silenciado, audio.volumen]);

  useEffect(() => {
    if (gainMaestroRef.current) {
      gainMaestroRef.current.gain.value = audio.silenciado ? 0 : audio.volumen;
    }
  }, [audio.silenciado, audio.volumen]);

  useEffect(
    () => () => {
      bucleRef.current?.detener();
      ctxRef.current?.close();
    },
    []
  );

  const playSfx = useCallback(
    (tipo) => {
      if (audio.silenciado) return;
      const { ctx, gainMaestro } = obtenerContexto();
      reproducirSfx(ctx, gainMaestro, tipo);
    },
    [audio.silenciado, obtenerContexto]
  );

  const toggleMusica = useCallback(() => {
    // Los efectos secundarios (crear/detener el bucle) viven aquí, no dentro
    // de un updater de setState: StrictMode invoca los updaters dos veces en
    // desarrollo, lo que duplicaba el bucle de música y dejaba uno sin
    // detener. `bucleRef` es la fuente de verdad de si está sonando.
    if (bucleRef.current) {
      bucleRef.current.detener();
      bucleRef.current = null;
      setMusicaActiva(false);
      return;
    }
    const { ctx, gainMaestro } = obtenerContexto();
    bucleRef.current = iniciarBucleMusica(ctx, gainMaestro);
    setMusicaActiva(true);
  }, [obtenerContexto]);

  const value = useMemo(
    () => ({
      musicaActiva,
      silenciado: audio.silenciado,
      playSfx,
      toggleMusica,
    }),
    [musicaActiva, audio.silenciado, playSfx, toggleMusica]
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
