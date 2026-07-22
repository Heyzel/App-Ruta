// Llama a la función serverless de Gemini. Devuelve el texto de retroalimentación
// o null si no está disponible (sin clave, sin backend, error de red). Nunca lanza.
export async function obtenerRetroalimentacion({
  nota,
  temasReforzar,
  temasBuenConocimiento,
  temasDominio,
}) {
  try {
    const resp = await fetch('/api/retroalimentacion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nota, temasReforzar, temasBuenConocimiento, temasDominio }),
    });
    if (!resp.ok) return null;
    const data = await resp.json();
    return data.retroalimentacion || null;
  } catch {
    return null;
  }
}
