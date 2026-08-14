import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProgreso } from '../context/ProgresoContext';
import { useRecompensas, DURACION_VUELO } from '../context/RecompensasContext';
import { TEMAS, DIFICULTADES } from '../data/temas';
import { TarjetaTema } from '../components/TarjetaTema';
import { Ruta } from '../components/Ruta';
import { AvisoContinuar } from '../components/AvisoContinuar';
import { ModalNombre } from '../components/ModalNombre';
import { CajaOpinionPlataforma } from '../components/CajaOpinionPlataforma';
import { BotonAudio } from '../components/ControlAudio';
import './Inicio.css';

const TITULO_INICIO_TEXTO = 'Rutas de Aprendizaje - Algoritmos y Programación';
const TITULO_INICIO_PALABRAS = TITULO_INICIO_TEXTO.split(' ');

function PalabraOla({ palabra, indiceInicial }) {
  return (
    <span className="inicio-titulo-ola-palabra">
      {palabra.split('').map((letra, indice) => (
        <span
          key={indice}
          className="inicio-titulo-ola-letra"
          style={{ animationDelay: `${(indiceInicial + indice) * 0.05}s` }}
        >
          {letra}
        </span>
      ))}
    </span>
  );
}

function TituloOla({ palabras }) {
  let contadorLetras = 0;
  return (
    <h1 className="inicio-titulo-ola">
      {palabras.map((palabra, indice) => {
        const indiceInicial = contadorLetras;
        contadorLetras += palabra.length;
        return <PalabraOla key={indice} palabra={palabra} indiceInicial={indiceInicial} />;
      })}
    </h1>
  );
}

export function Inicio() {
  const {
    progreso,
    esNivelMarcado,
    esTemaMarcado,
    marcarTemaCompletado,
    marcarTrofeoCelebrado,
    setNombreUsuario,
    reiniciarProgreso,
  } = useProgreso();
  const { celebrarInsignia, celebrarTrofeo } = useRecompensas();
  const [editandoNombre, setEditandoNombre] = useState(false);
  const navigate = useNavigate();
  // Un hueco por tema: es el sitio al que vuela la medalla.
  const slotsInsignia = useRef({});

  // Se habilita la opinión general de la plataforma cuando el estudiante
  // completó (o exoneró con el examen de suficiencia) al menos un nivel de
  // cada tema, incluyendo el propedéutico opcional. Se calcula aquí arriba
  // (y no junto al resto de nodosTemas) porque CajaOpinionPlataforma se
  // renderiza en el encabezado, junto al botón de examen de suficiencia.
  const puedeOpinarPlataforma = TEMAS.every((tema) =>
    DIFICULTADES.some((dificultad) => esNivelMarcado(tema.id, dificultad))
  );

  function manejarMarcarTema(temaId) {
    marcarTemaCompletado(temaId);
    // La medalla solo existe una vez marcado el tema: se mide su posición en
    // el frame siguiente, cuando React ya la pintó.
    requestAnimationFrame(() => {
      celebrarInsignia('medalla', slotsInsignia.current[temaId]);
    });
  }

  function manejarReiniciarProgreso() {
    const confirmado = window.confirm(
      'Esto borrará tu progreso local (niveles, resultados y nombre guardados en este navegador) y comenzarás la ruta desde cero. ¿Deseas continuar?'
    );
    if (!confirmado) return;
    reiniciarProgreso();
    navigate('/');
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
          refInsignia={(elemento) => {
            slotsInsignia.current[tema.id] = elemento;
          }}
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

  // Trofeo: se celebra cuando los 9 temas están marcados. Vive en un efecto
  // (y no en manejarMarcarTema) para que también lo reciba quien completó la
  // ruta antes de que existieran las recompensas, al volver a la cartelera.
  // La espera deja que la medalla del último tema termine de aterrizar.
  const rutaCompleta = TEMAS.every((tema) => esTemaMarcado(tema.id));
  const trofeoLanzado = useRef(false);

  useEffect(() => {
    if (!rutaCompleta || progreso.trofeoCelebrado || trofeoLanzado.current) return;
    // El temporizador no se cancela al re-renderizar a propósito: la marca
    // en el progreso vuelve a entrar en este efecto y lo cancelaría antes de
    // que llegue a disparar. `trofeoLanzado` es lo que evita duplicados.
    trofeoLanzado.current = true;
    window.setTimeout(() => {
      marcarTrofeoCelebrado();
      celebrarTrofeo();
    }, DURACION_VUELO);
  }, [rutaCompleta, progreso.trofeoCelebrado, marcarTrofeoCelebrado, celebrarTrofeo]);

  return (
    <div className="pagina-inicio">
      <header className="inicio-encabezado">
        <TituloOla palabras={TITULO_INICIO_PALABRAS} />
        <p>Elige un tema para comenzar a aprender programación.</p>
        {progreso.nombreUsuario && (
          <p className="inicio-usuario">
            Hola, <strong>{progreso.nombreUsuario}</strong> ·{' '}
            <button className="enlace-cambiar-nombre" onClick={() => setEditandoNombre(true)}>
              cambiar nombre
            </button>
          </p>
        )}

        {/* En vista de teléfono, el control de música y la opinión de la
            plataforma se muestran a los lados del examen de suficiencia en
            vez de flotar en su esquina habitual (ver ControlAudio.css /
            CajaOpinion.css). En pantallas más grandes no cambia nada: ambos
            siguen flotando donde siempre. */}
        <div className="examen-suficiencia-fila">
          <BotonAudio className="control-audio-envoltura--fila" />

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

          {/* Playground de C++: reutiliza el estilo del botón de examen para
              que la fila quede homogénea (en teléfono ambos ocultan su texto y
              quedan como iconos, ver Inicio.css). */}
          <Link
            to="/practica"
            className="examen-suficiencia-boton"
            title="Escribe y ejecuta código C++ libremente"
          >
            <span className="examen-suficiencia-icono" aria-hidden="true">💻</span>
            <span className="examen-suficiencia-texto">Practica C++</span>
          </Link>

          <CajaOpinionPlataforma puedeOpinar={puedeOpinarPlataforma} />
        </div>
      </header>

      <AvisoContinuar ultimaUbicacion={progreso.ultimaUbicacion} />

      <Ruta nodos={nodosTemas} indiceActivo={indiceActivo} className="ruta-temas" alternado />

      <div className="reiniciar-progreso-contenedor">
        <button type="button" className="reiniciar-progreso-boton" onClick={manejarReiniciarProgreso}>
          Comenzar de nuevo
        </button>
      </div>

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
