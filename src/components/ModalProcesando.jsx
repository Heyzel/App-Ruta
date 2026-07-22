import './ModalProcesando.css';

export function ModalProcesando() {
  return (
    <div className="modal-procesando-overlay" role="alertdialog" aria-modal="true" aria-live="polite">
      <div className="modal-procesando">
        <span className="modal-procesando-spinner" aria-hidden="true" />
        <h2>¡Respuestas enviadas!</h2>
        <p>
          Estamos generando tu retroalimentación personalizada. Esto puede tardar unos segundos,
          no cierres ni recargues la página.
        </p>
      </div>
    </div>
  );
}
