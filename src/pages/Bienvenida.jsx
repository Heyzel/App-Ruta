import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgreso } from '../context/ProgresoContext';
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
  const navigate = useNavigate();

  function comenzar(evento) {
    evento.preventDefault();
    const limpio = nombre.trim();
    if (!limpio) return;
    setNombreUsuario(limpio);
    navigate('/temas');
  }

  return (
    <div className="bienvenida">
      <aside className="bienvenida-arte" aria-hidden="true">
        <div className="bienvenida-arte-contenido">
          <svg className="bienvenida-diagrama" viewBox="0 0 200 260" role="presentation">
            <defs>
              <linearGradient id="grad-nodo" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#4f46e5" />
              </linearGradient>
            </defs>
            {/* Conexiones del flujo */}
            <path d="M100 40 L100 78" className="bienvenida-linea" />
            <path d="M100 118 L100 156" className="bienvenida-linea" />
            <path d="M100 196 L100 220" className="bienvenida-linea" />
            {/* Inicio */}
            <ellipse cx="100" cy="24" rx="46" ry="18" fill="url(#grad-nodo)" />
            <text x="100" y="29" className="bienvenida-nodo-texto">inicio</text>
            {/* Decisión */}
            <polygon points="100,60 140,98 100,136 60,98" fill="url(#grad-nodo)" opacity="0.9" />
            <text x="100" y="102" className="bienvenida-nodo-texto">¿sabes?</text>
            {/* Proceso */}
            <rect x="54" y="158" width="92" height="38" rx="8" fill="url(#grad-nodo)" opacity="0.85" />
            <text x="100" y="181" className="bienvenida-nodo-texto">aprender</text>
            {/* Fin */}
            <ellipse cx="100" cy="238" rx="46" ry="18" fill="url(#grad-nodo)" />
            <text x="100" y="243" className="bienvenida-nodo-texto">dominar</text>
          </svg>
          <pre className="bienvenida-codigo">
{`for (tema : ruta) {
  if (!dominas(tema))
    aprende(tema);
}`}
          </pre>
          <p className="bienvenida-arte-lema">Algoritmos y Programación</p>
        </div>
      </aside>

      <main className="bienvenida-panel">
        <div className="bienvenida-panel-interno">
          <h1 className="bienvenida-titulo">Tu ruta de aprendizaje personalizada</h1>
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
    </div>
  );
}
