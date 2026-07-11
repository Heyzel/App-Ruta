import { Link } from 'react-router-dom';
import { obtenerTipoContenido } from '../data/tiposContenido';
import { useProgreso } from '../context/ProgresoContext';
import { registrarConsultaContenido } from '../services/metricas';
import './BotonContenido.css';

export function BotonContenido({ contenido, temaId, dificultad, indice }) {
  const info = obtenerTipoContenido(contenido.tipo);
  const { progreso } = useProgreso();

  function registrarConsulta() {
    registrarConsultaContenido({
      nombre: progreso.nombreUsuario,
      tema: temaId,
      dificultad,
      contenido: contenido.nombre,
      tipo: contenido.tipo,
    });
  }

  const cuerpo = (
    <>
      <span className="boton-contenido-tipo">
        {info.emoji} {info.etiqueta}
      </span>
      <span className="boton-contenido-nombre">{contenido.nombre}</span>
      <span className="boton-contenido-descripcion">{contenido.descripcion}</span>
    </>
  );

  // Los contenidos de tipo juego llevan a una pantalla intermedia con el desafío;
  // el resto abre el recurso externo directamente.
  if (contenido.tipo === 'juego') {
    return (
      <Link
        className="boton-contenido"
        to={`/tema/${temaId}/${dificultad}/juego/${indice}`}
        onClick={registrarConsulta}
      >
        {cuerpo}
      </Link>
    );
  }

  return (
    <a
      className="boton-contenido"
      href={contenido.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={registrarConsulta}
    >
      {cuerpo}
    </a>
  );
}
