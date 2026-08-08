// Descarga y decodifica una pista de música de fondo (mp3 servido desde
// /public/musica). Quien llame debe cachear el resultado: decodeAudioData
// es costoso y no tiene sentido repetirlo cada vez que se reproduce.
export async function cargarPista(ctx, url) {
  const respuesta = await fetch(url);
  if (!respuesta.ok) {
    throw new Error(`No se pudo cargar la pista "${url}" (${respuesta.status}).`);
  }
  const datos = await respuesta.arrayBuffer();
  return ctx.decodeAudioData(datos);
}

// Crea y arranca un nodo de reproducción en bucle a partir de un buffer ya
// decodificado. Devuelve el nodo para poder detenerlo más adelante.
export function reproducirPista(ctx, gainMaestro, buffer) {
  const fuente = ctx.createBufferSource();
  fuente.buffer = buffer;
  fuente.loop = true;
  fuente.connect(gainMaestro);
  fuente.start();
  return fuente;
}
