import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { DIFICULTADES, NOMBRE_DIFICULTAD } from '../data/temas';
import { useProgreso } from '../context/ProgresoContext';
import { useRecompensas } from '../context/RecompensasContext';
import { Ruta } from './Ruta';
import { Insignia } from './Insignia';
import { useAudio } from '../context/AudioContext';
import './RutaNiveles.css';

export function RutaNiveles({ temaId }) {
  const { estaDesbloqueado, obtenerResultado, esNivelMarcado, marcarNivelCompletado } = useProgreso();
  const { playSfx } = useAudio();
  const { celebrarInsignia } = useRecompensas();
  // Un hueco por dificultad: es el sitio al que vuela la estrella.
  const slotsInsignia = useRef({});

  // 'bloqueado': el nivel anterior no se ha aprobado/exonerado todavía.
  // 'disponible': desbloqueado, pero el estudiante aún no aprobó su quiz.
  // 'por-confirmar': ya aprobó el quiz de verdad, falta que lo marque.
  // 'completado': el estudiante ya lo marcó (tras haberlo aprobado).
  const estados = DIFICULTADES.map((dificultad) => {
    const resultado = obtenerResultado(temaId, dificultad);
    const desbloqueado = estaDesbloqueado(temaId, dificultad);
    const marcado = esNivelMarcado(temaId, dificultad);
    let estado;
    if (marcado) estado = 'completado';
    else if (resultado?.aprobado) estado = 'por-confirmar';
    else if (desbloqueado) estado = 'disponible';
    else estado = 'bloqueado';
    return { dificultad, resultado, estado };
  });

  const indiceActivo = (() => {
    const idx = estados.findIndex((e) => e.estado !== 'completado');
    return idx === -1 ? estados.length - 1 : idx;
  })();

  function manejarMarcarCompletado(dificultad) {
    marcarNivelCompletado(temaId, dificultad);
    // La insignia del nivel solo existe una vez marcado: se mide su posición
    // en el frame siguiente, cuando React ya la pintó, para que la estrella
    // aterrice justo encima de ella.
    requestAnimationFrame(() => {
      celebrarInsignia('estrella', slotsInsignia.current[dificultad]);
    });
  }

  const nodos = estados.map(({ dificultad, resultado, estado }) => ({
    id: dificultad,
    estado: estado === 'por-confirmar' ? 'disponible' : estado,
    contenido: (
      <div className="nivel-contenido">
        <h3>{NOMBRE_DIFICULTAD[dificultad]}</h3>
        {resultado && (
          <p className="nivel-nota">
            Última nota: {resultado.nota}/20 {resultado.aprobado ? '✓' : ''}
          </p>
        )}
        {estado === 'bloqueado' && <span className="nivel-candado">🔒 Bloqueado</span>}
        {estado === 'disponible' && (
          <Link
            to={`/tema/${temaId}/${dificultad}`}
            className="nivel-boton"
            onClick={() => playSfx('click')}
          >
            Entrar al nivel →
          </Link>
        )}
        {estado === 'por-confirmar' && (
          <div className="nivel-acciones">
            <button
              type="button"
              className="nivel-boton"
              onClick={() => manejarMarcarCompletado(dificultad)}
            >
              Marcar completado
            </button>
            <Link
              to={`/tema/${temaId}/${dificultad}`}
              className="nivel-boton nivel-boton--secundario"
              onClick={() => playSfx('click')}
            >
              Repasar nivel
            </Link>
          </div>
        )}
        {estado === 'completado' && (
          <div className="nivel-acciones">
            <Link
              to={`/tema/${temaId}/${dificultad}`}
              className="nivel-boton nivel-boton--secundario"
              onClick={() => playSfx('click')}
            >
              Repasar nivel
            </Link>
            <span
              className="nivel-insignia"
              ref={(elemento) => {
                slotsInsignia.current[dificultad] = elemento;
              }}
            >
              <Insignia tipo="estrella" tamano={26} titulo="Nivel completado" />
            </span>
          </div>
        )}
      </div>
    ),
  }));

  return <Ruta nodos={nodos} indiceActivo={indiceActivo} className="ruta-niveles" />;
}
