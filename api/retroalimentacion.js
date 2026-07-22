import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método no permitido.' });
    return;
  }

  const { nota, temasReforzar = [], temasBuenConocimiento = [], temasDominio = [] } = req.body || {};

  if (!process.env.GEMINI_API_KEY) {
    res.status(503).json({ error: 'Retroalimentación por IA no configurada.' });
    return;
  }

  const listar = (temas) => (temas.length ? temas.join(', ') : 'ninguno');

  const prompt =
    `Actúa como un tutor de programación paciente y motivador. ` +
    `Un estudiante presentó un examen de suficiencia de programación en C++ y obtuvo ${nota}/20. ` +
    `Este examen mide el nivel actual del estudiante en cada tema para orientar por dónde debería ` +
    `empezar a estudiar, no es un examen de aprobar/reprobar. Resultado por tema:\n` +
    `- Temas a reforzar (falló incluso el nivel principiante): ${listar(temasReforzar)}.\n` +
    `- Temas con buen conocimiento (domina lo básico, pero le falta afianzar niveles intermedio/avanzado): ${listar(temasBuenConocimiento)}.\n` +
    `- Temas dominados (acertó los tres niveles): ${listar(temasDominio)}.\n` +
    `Escribe una retroalimentación en español, motivadora, SIN darle las respuestas exactas de las ` +
    `preguntas, que incluya: 1) qué temas particulares debería reforzar y por qué conviene empezar por ` +
    `ahí; 2) qué temas ya muestra buen conocimiento, animándolo a afianzarlos; 3) qué temas domina, ` +
    `felicitándolo pero invitándolo igualmente a repasar esos contenidos para no perder el nivel. ` +
    `No limites la extensión a pocas frases: sé tan detallado como sea necesario para cubrir cada grupo ` +
    `de temas mencionado arriba. Si algún grupo está vacío, no lo menciones.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-flash-latest',
      contents: prompt,
    });
    res.status(200).json({ retroalimentacion: response.text });
  } catch (err) {
    console.error('Error al generar retroalimentación con Gemini:', err?.message || err);
    res.status(500).json({ error: 'No se pudo generar la retroalimentación en este momento.' });
  }
}
