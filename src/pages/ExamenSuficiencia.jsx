import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { EXAMEN_SUFICIENCIA, preguntasExamenPlanas } from '../data/examenSuficiencia';
import { obtenerTema, NOMBRE_DIFICULTAD } from '../data/temas';
import { esCorrecta } from '../utils/calcularResultado';
import { nivelesDesbloqueadosTema } from '../utils/calcularDesbloqueoExamen';
import { useProgreso } from '../context/ProgresoContext';
import { Quiz } from '../components/Quiz';
import { ModalNombre } from '../components/ModalNombre';
import { ModalProcesando } from '../components/ModalProcesando';
import { guardarResultadoExamen } from '../services/examen';
import { obtenerRetroalimentacion } from '../services/retroalimentacion';
import './ExamenSuficiencia.css';

const TEMAS_EXAMEN = Object.keys(EXAMEN_SUFICIENCIA);

export function ExamenSuficiencia() {
  const { progreso, desbloquearPorExamen, setNombreUsuario } = useProgreso();
  const preguntas = useMemo(() => preguntasExamenPlanas(), []);
  const quiz = useMemo(() => ({ preguntas }), [preguntas]);

  const [fase, setFase] = useState('examen'); // 'examen' | 'procesando' | 'resultado'
  const [resumen, setResumen] = useState(null);
  const [retro, setRetro] = useState(null);
  const [pidiendoNombre, setPidiendoNombre] = useState(false);
  const [respuestasPendientes, setRespuestasPendientes] = useState(null);

  function calificar(respuestas) {
    // Correcto por tema/dificultad y desbloqueos.
    const correctoPorTema = {};
    let totalCorrectas = 0;
    preguntas.forEach((pregunta, i) => {
      const ok = esCorrecta(pregunta, respuestas[i]);
      if (ok) totalCorrectas += 1;
      correctoPorTema[pregunta.tema] ??= {};
      correctoPorTema[pregunta.tema][pregunta.dificultad] = ok;
    });

    const desbloqueos = {};
    const detalleTemas = [];
    TEMAS_EXAMEN.forEach((tema) => {
      const niveles = nivelesDesbloqueadosTema(correctoPorTema[tema]);
      desbloqueos[tema] = niveles;
      detalleTemas.push({
        tema,
        nombre: obtenerTema(tema)?.nombre ?? tema,
        correcto: correctoPorTema[tema],
        nivelMaximo: niveles[niveles.length - 1],
      });
    });

    const total = preguntas.length;
    const nota = Math.round(((totalCorrectas / total) * 20 + Number.EPSILON) * 100) / 100;

    // Clasificación por tema para que la IA pueda dar una retroalimentación específica:
    // - reforzar: falló la pregunta de nivel principiante (base débil en el tema).
    // - buenConocimiento: domina lo básico pero falló en intermedio o avanzado.
    // - dominio: acertó las tres preguntas del tema.
    const temasReforzar = [];
    const temasBuenConocimiento = [];
    const temasDominio = [];
    detalleTemas.forEach((d) => {
      const c = d.correcto;
      if (!c.principiante) {
        temasReforzar.push(d.nombre);
      } else if (!c.intermedio || !c.avanzado) {
        temasBuenConocimiento.push(d.nombre);
      } else {
        temasDominio.push(d.nombre);
      }
    });

    return {
      nota,
      totalCorrectas,
      total,
      desbloqueos,
      detalleTemas,
      temasReforzar,
      temasBuenConocimiento,
      temasDominio,
    };
  }

  async function procesar(respuestas, nombre) {
    setFase('procesando');
    const r = calificar(respuestas);
    // El desbloqueo solo aplica la primera vez; hay que registrarlo antes de
    // actualizar el progreso, que marca examenPresentado en true.
    const esPrimeraPresentacion = !progreso.examenPresentado;
    setResumen({ ...r, esPrimeraPresentacion });

    // 1) Actualizar progreso local (unión de niveles, solo en la primera presentación).
    desbloquearPorExamen(r.desbloqueos);

    // 2) Guardar en Supabase (best effort).
    await guardarResultadoExamen({
      nombre: nombre ?? progreso.nombreUsuario,
      nota: r.nota,
      correctas: r.totalCorrectas,
      total: r.total,
      detalle: r.detalleTemas,
    });

    // 3) Retroalimentación por IA (degradación elegante si no hay backend/clave).
    const texto = await obtenerRetroalimentacion({
      nota: r.nota,
      temasReforzar: r.temasReforzar,
      temasBuenConocimiento: r.temasBuenConocimiento,
      temasDominio: r.temasDominio,
    });
    setRetro(texto); // null si no disponible

    setFase('resultado');
  }

  function manejarEnvio(respuestas) {
    if (!progreso.nombreUsuario) {
      setRespuestasPendientes(respuestas);
      setPidiendoNombre(true);
      return;
    }
    procesar(respuestas);
  }

  if (fase === 'resultado' && resumen) {
    return (
      <div className="pagina-examen">
        <h1>Resultado del examen de suficiencia</h1>
        <p className="examen-nota">
          {progreso.nombreUsuario ? `${progreso.nombreUsuario}, obtuviste` : 'Obtuviste'}{' '}
          <strong>{resumen.nota}/20</strong> ({resumen.totalCorrectas} de {resumen.total} correctas).
        </p>

        <section className="examen-retro">
          <h2>Retroalimentación</h2>
          {retro ? (
            <p>{retro}</p>
          ) : (
            <p className="examen-retro-fallback">
              Revisa los temas que fallaste y practica sus contenidos. ¡Vas por buen camino!
            </p>
          )}
        </section>

        <section className="examen-desbloqueos">
          <h2>{resumen.esPrimeraPresentacion ? 'Niveles desbloqueados por tema' : 'Nivel demostrado por tema'}</h2>
          {!resumen.esPrimeraPresentacion && (
            <p className="examen-desbloqueos-nota">
              Ya habías presentado el examen antes, así que esta vez no se desbloquearon niveles
              nuevos. Esto es solo un resumen de tu nivel actual en cada tema.
            </p>
          )}
          <ul>
            {resumen.detalleTemas.map((d) => (
              <li key={d.tema}>
                <Link to={`/tema/${d.tema}`}>{d.nombre}</Link>: hasta{' '}
                <strong>{NOMBRE_DIFICULTAD[d.nivelMaximo]}</strong>
              </li>
            ))}
          </ul>
        </section>

        <Link className="examen-volver" to="/temas">← Volver a la cartelera</Link>
      </div>
    );
  }

  return (
    <div className="pagina-examen">
      <h1>Examen de suficiencia</h1>
      <p className="examen-ayuda">
        Este examen busca determinar tu nivel actual en cada tema, para sugerirte de forma más
        personalizada por dónde deberías empezar a estudiar.{' '}
        {progreso.examenPresentado
          ? 'Como ya lo presentaste antes, esta vez no se desbloquearán niveles nuevos: es solo para repasar tu nivel.'
          : 'Según tus respuestas, se desbloquearán automáticamente los niveles que demuestres dominar.'}
      </p>

      <Quiz quiz={quiz} onEnviar={manejarEnvio} />

      {fase === 'procesando' && <ModalProcesando />}

      {pidiendoNombre && (
        <ModalNombre
          onGuardar={(nombre) => {
            setNombreUsuario(nombre);
            setPidiendoNombre(false);
            procesar(respuestasPendientes, nombre);
          }}
          onCancelar={() => setPidiendoNombre(false)}
        />
      )}
    </div>
  );
}
