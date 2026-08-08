const NOTAS_EXITO = [523.25, 659.25, 783.99]; // C5, E5, G5
const NOTAS_DESBLOQUEO = [440, 659.25]; // A4, E5 - quinta ascendente breve

export function reproducirSfx(ctx, gainMaestro, tipo) {
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
