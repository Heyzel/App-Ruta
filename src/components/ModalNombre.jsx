import { useState } from 'react';
import './ModalNombre.css';

export function ModalNombre({ valorInicial = '', onGuardar, onCancelar }) {
  const [nombre, setNombre] = useState(valorInicial);

  function manejarEnvio(evento) {
    evento.preventDefault();
    const limpio = nombre.trim();
    if (!limpio) return;
    onGuardar(limpio);
  }

  return (
    <div className="modal-nombre-overlay" role="dialog" aria-modal="true">
      <form className="modal-nombre" onSubmit={manejarEnvio}>
        <h2>¿Cómo te llamas?</h2>
        <p>Usaremos tu nombre para guardar tus resultados de los cuestionarios.</p>
        <input
          type="text"
          value={nombre}
          onChange={(evento) => setNombre(evento.target.value)}
          placeholder="Tu nombre"
          autoFocus
          maxLength={80}
        />
        <div className="modal-nombre-acciones">
          {onCancelar && (
            <button type="button" className="modal-nombre-cancelar" onClick={onCancelar}>
              Cancelar
            </button>
          )}
          <button type="submit" disabled={!nombre.trim()}>
            Comenzar
          </button>
        </div>
      </form>
    </div>
  );
}
