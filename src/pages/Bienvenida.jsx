import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgreso } from '../context/ProgresoContext';
import { ModalNombre } from '../components/ModalNombre';
import './Bienvenida.css';

// Flujo recomendado para principiantes sin experiencia previa.
const FLUJO_RECOMENDADO = [
  'Variables',
  'Tipos de datos',
  'Condicionales',
  'Bucles',
  'Arreglos',
  'Estructuras de datos',
  'Funciones',
  'Programación orientada a objetos',
];

export function Bienvenida() {
  const { progreso, setNombreUsuario } = useProgreso();
  const [nombre, setNombre] = useState(progreso.nombreUsuario || '');
  const [pidiendoNombreExamen, setPidiendoNombreExamen] = useState(false);
  const navigate = useNavigate();

  function comenzar(evento) {
    evento.preventDefault();
    const limpio = nombre.trim();
    if (!limpio) return;
    setNombreUsuario(limpio);
    navigate('/temas');
  }

  function irAlExamen() {
    if (progreso.nombreUsuario) {
      navigate('/examen-suficiencia');
    } else {
      setPidiendoNombreExamen(true);
    }
  }

  return (
    <div className="bienvenida">
      <aside className="bienvenida-arte">
        <h1 className="bienvenida-titulo">
          <span className="bienvenida-titulo-de">DE</span>
          <span className="bienvenida-titulo-rutas">RUTAS</span>
          <span className="bienvenida-titulo-aprendizaje">APRENDIZAJE</span>
          <span className="bienvenida-titulo-personalizadas">PERSONALIZADAS</span>
        </h1>
      </aside>

      <main className="bienvenida-panel">
        <div className="bienvenida-panel-interno">
          <p className="bienvenida-intro">
            Esta plataforma te acompaña en <strong>Algoritmos y Programación</strong>. Si
            empiezas desde cero, aprenderás paso a paso; y si ya tienes conocimientos previos,
            podrás reforzar lo que sabes y avanzar justo en las áreas que sientas que te hacen
            falta.
          </p>

          <div className="bienvenida-bloque">
            <h2>¿Cómo navegar?</h2>
            <p>
              Tienes total libertad para elegir los temas en el orden que prefieras. Cada tema
              tiene tres niveles —principiante, intermedio y avanzado— con contenidos para
              estudiar y un cuestionario para poner a prueba lo aprendido.
            </p>
            <p>
              ¿Prefieres no decidir? Sigue el <strong>flujo recomendado para principiantes</strong>{' '}
              sin experiencia previa:
            </p>
            <ol className="bienvenida-flujo">
              {FLUJO_RECOMENDADO.map((paso, indice) => (
                <li key={paso}>
                  <span className="bienvenida-flujo-num">{indice + 1}</span>
                  {paso}
                </li>
              ))}
            </ol>
            <p className="bienvenida-nota">
              ¿Necesitas repasar las matemáticas básicas primero? Empieza por el tema 0,{' '}
              <strong>Propedéutico de aritmética</strong>.
            </p>
          </div>

          <div className="bienvenida-bloque">
            <h2>¿Ya sabes algo de esto?</h2>
            <p>
              Si ya tienes conocimientos previos, puedes hacer un{' '}
              <button type="button" className="bienvenida-enlace" onClick={irAlExamen}>
                examen de suficiencia
              </button>{' '}
              para completar los
              niveles que ya tengas dominados y avanzar directo a lo que te falta aprender.
            </p>
          </div>

          <div className="bienvenida-bloque bienvenida-algorimi">
            <span className="bienvenida-algorimi-icono">💬</span>
            <p>
              En cualquier momento puedes apoyarte en <strong>Algorimi</strong>, nuestro chatbot
              de IA, disponible en el panel lateral derecho para resolver tus dudas.
            </p>
          </div>

          <form className="bienvenida-form" onSubmit={comenzar}>
            <label htmlFor="bienvenida-nombre">¿Cómo te llamas?</label>
            <div className="bienvenida-form-fila">
              <input
                id="bienvenida-nombre"
                type="text"
                value={nombre}
                onChange={(evento) => setNombre(evento.target.value)}
                placeholder="Escribe tu nombre"
                maxLength={80}
                autoFocus
              />
              <button type="submit" disabled={!nombre.trim()}>
                Comenzar →
              </button>
            </div>
            <p className="bienvenida-form-ayuda">
              Usaremos tu nombre para guardar tu progreso y tus resultados.
            </p>
          </form>
        </div>
      </main>

      {pidiendoNombreExamen && (
        <ModalNombre
          onGuardar={(nombreGuardado) => {
            setNombreUsuario(nombreGuardado);
            setPidiendoNombreExamen(false);
            navigate('/examen-suficiencia');
          }}
          onCancelar={() => setPidiendoNombreExamen(false)}
        />
      )}
    </div>
  );
}
