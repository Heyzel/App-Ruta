// Catálogo de tipos de contenido con su etiqueta y emoji.
// Se usa para mostrar una etiqueta (chip) en cada contenido y para editarlo en el panel admin.
export const TIPOS_CONTENIDO = {
  video: { etiqueta: 'Video', emoji: '🎬' },
  imagen: { etiqueta: 'Imagen', emoji: '🖼️' },
  infografia: { etiqueta: 'Infografía', emoji: '📊' },
  juego: { etiqueta: 'Juego', emoji: '🎮' },
  lectura: { etiqueta: 'Lectura', emoji: '📖' },
  guia: { etiqueta: 'Guía', emoji: '🧭' },
  articulo: { etiqueta: 'Artículo', emoji: '📰' },
  documentacion: { etiqueta: 'Documentación', emoji: '📚' },
  ejercicio: { etiqueta: 'Ejercicio', emoji: '✏️' },
  podcast: { etiqueta: 'Podcast', emoji: '🎧' },
};

export const TIPO_CONTENIDO_POR_DEFECTO = 'articulo';

export function obtenerTipoContenido(tipo) {
  return TIPOS_CONTENIDO[tipo] || TIPOS_CONTENIDO[TIPO_CONTENIDO_POR_DEFECTO];
}
