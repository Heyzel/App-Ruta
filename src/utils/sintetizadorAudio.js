const NOTAS_EXITO = [523.25, 659.25, 783.99]; // C5, E5, G5
const NOTAS_DESBLOQUEO = [440, 659.25]; // A4, E5 - quinta ascendente breve
const NOTAS_RECOMPENSA = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
const NOTAS_FANFARRIA = [523.25, 523.25, 523.25, 659.25, 783.99, 1046.5]; // corneta + acorde alto

// Nota suelta con envolvente percusiva; base de los sfx melódicos.
function nota(ctx, salida, { freq, inicio, duracion, volumen, forma = 'triangle' }) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = forma;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0, inicio);
  gain.gain.linearRampToValueAtTime(volumen, inicio + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, inicio + duracion);
  osc.connect(gain).connect(salida);
  osc.start(inicio);
  osc.stop(inicio + duracion + 0.05);
}

// Aplausos: ruido blanco filtrado en pasa-banda, con una envolvente que sube
// rápido y decae lento (la "masa" del público) más pequeños picos aleatorios
// que dan la sensación de palmas sueltas.
function aplausos(ctx, salida, inicio, duracion) {
  const muestras = Math.floor(ctx.sampleRate * duracion);
  const buffer = ctx.createBuffer(1, muestras, ctx.sampleRate);
  const datos = buffer.getChannelData(0);
  for (let i = 0; i < muestras; i += 1) {
    // Ruido con picos: la mayoría de las muestras son suaves y unas pocas
    // sobresalen, que es lo que hace que suene a palmas y no a estática.
    const ruido = Math.random() * 2 - 1;
    datos[i] = Math.random() < 0.06 ? ruido : ruido * 0.35;
  }

  const fuente = ctx.createBufferSource();
  fuente.buffer = buffer;

  const filtro = ctx.createBiquadFilter();
  filtro.type = 'bandpass';
  filtro.frequency.value = 1800;
  filtro.Q.value = 0.7;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, inicio);
  gain.gain.linearRampToValueAtTime(0.5, inicio + 0.25);
  gain.gain.setValueAtTime(0.5, inicio + duracion * 0.55);
  gain.gain.exponentialRampToValueAtTime(0.0001, inicio + duracion);

  fuente.connect(filtro).connect(gain).connect(salida);
  fuente.start(inicio);
  fuente.stop(inicio + duracion);
}

export function reproducirSfx(ctx, gainMaestro, tipo) {
  // 'recompensa': arpegio ascendente al ganar una estrella o una medalla.
  if (tipo === 'recompensa') {
    NOTAS_RECOMPENSA.forEach((freq, idx) => {
      const inicio = ctx.currentTime + idx * 0.08;
      nota(ctx, gainMaestro, { freq, inicio, duracion: 0.5, volumen: 0.75 });
      // Armónico una octava arriba, más flojo: le da el brillo de "moneda".
      nota(ctx, gainMaestro, {
        freq: freq * 2,
        inicio,
        duracion: 0.3,
        volumen: 0.18,
        forma: 'sine',
      });
    });
    return;
  }

  // 'trofeo': fanfarria de corneta + aplausos para la ruta completa.
  if (tipo === 'trofeo') {
    const base = ctx.currentTime;
    const tiempos = [0, 0.16, 0.32, 0.5, 0.68, 0.9];
    NOTAS_FANFARRIA.forEach((freq, idx) => {
      const esFinal = idx === NOTAS_FANFARRIA.length - 1;
      nota(ctx, gainMaestro, {
        freq,
        inicio: base + tiempos[idx],
        duracion: esFinal ? 1.4 : 0.35,
        volumen: 0.8,
        forma: 'sawtooth',
      });
    });
    // Acorde sostenido debajo del último toque (C5 + E5 + G5).
    NOTAS_EXITO.forEach((freq) => {
      nota(ctx, gainMaestro, { freq, inicio: base + 0.9, duracion: 1.6, volumen: 0.3 });
    });
    aplausos(ctx, gainMaestro, base + 1.0, 3.2);
    return;
  }

  if (tipo === 'exito') {
    NOTAS_EXITO.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      const inicio = ctx.currentTime + idx * 0.09;
      gain.gain.setValueAtTime(0, inicio);
      gain.gain.linearRampToValueAtTime(0.9, inicio + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, inicio + 0.4);
      osc.connect(gain).connect(gainMaestro);
      osc.start(inicio);
      osc.stop(inicio + 0.45);
    });
    return;
  }

  if (tipo === 'desbloqueo') {
    NOTAS_DESBLOQUEO.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      const inicio = ctx.currentTime + idx * 0.07;
      gain.gain.setValueAtTime(0, inicio);
      gain.gain.linearRampToValueAtTime(0.8, inicio + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, inicio + 0.28);
      osc.connect(gain).connect(gainMaestro);
      osc.start(inicio);
      osc.stop(inicio + 0.3);
    });
    return;
  }

  // 'click': blip corto de navegación (repasar nivel, entrar al nivel).
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'square';
  osc.frequency.value = 660;
  const inicio = ctx.currentTime;
  gain.gain.setValueAtTime(0, inicio);
  gain.gain.linearRampToValueAtTime(0.35, inicio + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, inicio + 0.09);
  osc.connect(gain).connect(gainMaestro);
  osc.start(inicio);
  osc.stop(inicio + 0.1);
}
