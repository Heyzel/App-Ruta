import './BotonContenido.css';

export function BotonContenido({ contenido }) {
  return (
    <a
      className="boton-contenido"
      href={contenido.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="boton-contenido-nombre">{contenido.nombre}</span>
      <span className="boton-contenido-descripcion">{contenido.descripcion}</span>
    </a>
  );
}
