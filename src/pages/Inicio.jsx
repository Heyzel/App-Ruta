import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProgreso } from '../context/ProgresoContext';
import { useAudio } from '../context/AudioContext';
import { TEMAS, DIFICULTADES } from '../data/temas';
import { TarjetaTema } from '../components/TarjetaTema';
import { Ruta } from '../components/Ruta';
import { AvisoContinuar } from '../components/AvisoContinuar';
import { ModalNombre } from '../components/ModalNombre';
import './Inicio.css';

const TITULO_INICIO_LINEAS = ['Rutas de Aprendizaje', 'Algoritmos y Programación'];

function LineaOla({ texto }) {
  return (
    <span className="inicio-titulo-ola-linea">
      {texto.split('').map((letra, indice) => (
        <span
          key={indice}
          className="inicio-titulo-ola-letra"
          style={{ animationDelay: `${indice * 0.05}s` }}
        >
          {letra === ' ' ? ' ' : letra}
        </span>
      ))}
    </span>
  );
}

function TituloOla({ lineas }) {
  return (
    <h1 className="inicio-titulo-ola">
      {lineas.map((linea) => (
        <LineaOla key={linea} texto={linea} />
      ))}
    </h1>
  );
}

export function Inicio() {
  const { progreso, esNivelMarcado, esTemaMarcado, marcarTemaCompletado, setNombreUsuario } = useProgreso();
  const { playSfx } = useAudio();
  const [editandoNombre, setEditandoNombre] = useState(false);

  function manejarMarcarTema(temaId) {
    playSfx('desbloqueo');
    marcarTemaCompletado(temaId);
  }

  const nodosTemas = TEMAS.map((tema, indice) => {
    const marcado = esTemaMarcado(tema.id);
    const puedeMarcar = DIFICULTADES.every((d) => esNivelMarcado(tema.id, d));
    return {
      id: tema.id,
      estado: marcado ? 'completado' : 'pendiente',
      contenido: (
        <TarjetaTema
          tema={tema}
          numero={indice}
          marcado={marcado}
          opcional={Boolean(tema.desbloqueadoCompleto)}
          puedeMarcar={puedeMarcar}
          onMarcarCompletado={() => manejarMarcarTema(tema.id)}
        />
      ),
    };
  });

  // El tema 0 es opcional y no cuenta para esta marca: por defecto se apoya
  // en su posición (índice 0, "el inicio") sin importar si está completado.
  // A partir de ahí avanza mientras los temas 1, 2, 3... estén completados
  // en una racha sin huecos; se detiene en el primero que falte.
  const indiceActivo = (() => {
    let idx = 0;
    for (let i = 1; i < nodosTemas.length; i += 1) {
      if (nodosTemas[i].estado !== 'completado') break;
      idx = i;
    }
    return idx;
  })();

  return (
    <div className="pagina-inicio">
      <header className="inicio-encabezado">
        <TituloOla lineas={TITULO_INICIO_LINEAS} />
        <p>Elige un tema para comenzar a aprender programación.</p>
        {progreso.nombreUsuario && (
          <p className="inicio-usuario">
            Hola, <strong>{progreso.nombreUsuario}</strong> ·{' '}
            <button className="enlace-cambiar-nombre" onClick={() => setEditandoNombre(true)}>
              cambiar nombre
            </button>
          </p>
        )}

        <Link
          to="/examen-suficiencia"
          className="examen-suficiencia-boton"
          title={
            progreso.examenPresentado
              ? 'Ya presentaste el examen. Puedes repetirlo para repasar tu nivel (no desbloquea niveles nuevos).'
              : 'Presenta el examen de suficiencia'
          }
        >
          <span className="examen-suficiencia-icono" aria-hidden="true">📝</span>
          <span className="examen-suficiencia-texto">Examen de suficiencia</span>
          {progreso.examenPresentado && (
            <span className="examen-suficiencia-check" aria-hidden="true">✓</span>
          )}
        </Link>
      </header>

      <AvisoContinuar ultimaUbicacion={progreso.ultimaUbicacion} />

      <Ruta nodos={nodosTemas} indiceActivo={indiceActivo} className="ruta-temas" alternado />

      {(!progreso.nombreUsuario || editandoNombre) && (
        <ModalNombre
          valorInicial={progreso.nombreUsuario}
          onGuardar={(nombre) => {
            setNombreUsuario(nombre);
            setEditandoNombre(false);
          }}
          onCancelar={progreso.nombreUsuario ? () => setEditandoNombre(false) : undefined}
        />
      )}
    </div>
  );
}
