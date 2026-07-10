import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './ChatbotPanel.css';

const CHATBOT_ID = import.meta.env.VITE_ZAPIER_CHATBOT_ID;

export function ChatbotPanel() {
  const location = useLocation();
  const [abierto, setAbierto] = useState(false);

  useEffect(() => {
    function alTecla(evento) {
      if (evento.key === 'Escape') setAbierto(false);
    }
    document.addEventListener('keydown', alTecla);
    return () => document.removeEventListener('keydown', alTecla);
  }, []);

  if (location.pathname.startsWith('/admin')) return null;

  return (
    <>
      <button
        className="chatbot-burbuja"
        onClick={() => setAbierto((prev) => !prev)}
        aria-label={abierto ? 'Cerrar asistente' : 'Abrir asistente'}
      >
        {abierto ? '✕' : '💬'}
      </button>

      {abierto && (
        <div className="chatbot-panel" role="dialog" aria-label="Asistente de IA">
          <header className="chatbot-panel-encabezado">
            <span>Asistente</span>
            <button
              className="chatbot-panel-cerrar"
              onClick={() => setAbierto(false)}
              aria-label="Cerrar asistente"
            >
              ✕
            </button>
          </header>
          <div className="chatbot-panel-cuerpo">
            {CHATBOT_ID ? (
              <zapier-interfaces-chatbot-embed
                is-popup="false"
                chatbot-id={CHATBOT_ID}
                height="100%"
                width="100%"
              />
            ) : (
              <p className="chatbot-panel-aviso">
                Chatbot no configurado. Define VITE_ZAPIER_CHATBOT_ID en .env.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
