import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { obtenerTema, NOMBRE_DIFICULTAD, DIFICULTADES } from '../data/temas';
import { obtenerContenidos } from '../services/contenidos';
import { obtenerTipoContenido } from '../data/tiposContenido';
import './JuegoDesafio.css';

export function JuegoDesafio() {
  const { temaId, dificultad, indice } = useParams();
  const tema = obtenerTema(temaId);
  const [juego, setJuego] = useState(null);
  const [cargando, setCargando] = useState(true);

  const rutaContenidos = `/tema/${temaId}/${dificultad}`;

  useEffect(() => {
    setCargando(true);
    obtenerContenidos(temaId, dificultad).then((items) => {
      setJuego(items[Number(indice)] ?? null);
      setCargando(false);
    });
  }, [temaId, dificultad, indice]);

  if (!tema || !DIFICULTADES.includes(dificultad)) {
    return (
      <div className="pagina-juego">
        <p>Desafío no encontrado.</p>
        <Link to="/">Volver al inicio</Link>
      </div>
    );
  }

  if (cargando) {
    return (
      <div className="pagina-juego">
        <p>Cargando desafío…</p>
      </div>
    );
  }

  if (!juego || juego.tipo !== 'juego') {
    return (
      <div className="pagina-juego">
        <p>Este contenido no es un desafío de juego.</p>
        <Link className="juego-volver" to={rutaContenidos}>
          ← Volver a los contenidos
        </Link>
      </div>
    );
  }

  const info = obtenerTipoContenido(juego.tipo);
  const instrucciones = juego.instrucciones || juego.descripcion;

  return (
    <div className="pagina-juego">
      <Link className="juego-volver" to={rutaContenidos}>
        ← Volver a los contenidos
      </Link>

      <span className="juego-etiqueta">
        {info.emoji} Desafío · {tema.nombre} · {NOMBRE_DIFICULTAD[dificultad]}
      </span>

      <h1 className="juego-titulo">{juego.nombre}</h1>

      <div className="juego-tarjeta">
        <h2>¿En qué consiste?</h2>
        {instrucciones.split('\n\n').map((parrafo, i) => (
          <p key={i} className="juego-descripcion">
            {parrafo}
          </p>
        ))}
      </div>

      <a
        className="juego-comenzar"
        href={juego.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Comenzar desafío →
      </a>
    </div>
  );
}
