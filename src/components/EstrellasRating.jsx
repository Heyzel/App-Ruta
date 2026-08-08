import './EstrellasRating.css';

export function EstrellasRating({ nombre, etiqueta = 'Calificación', valor, onCambiar }) {
  return (
    <fieldset className="estrellas-rating">
      <legend>{etiqueta}</legend>
      <div className="estrellas-rating-grupo">
        {[1, 2, 3, 4, 5].map((numero) => (
          <label key={numero} className="estrellas-rating-estrella" title={`${numero} de 5`}>
            <input
              type="radio"
              name={nombre}
              value={numero}
              checked={valor === numero}
              onChange={() => onCambiar(numero)}
            />
            <span aria-hidden="true">{numero <= valor ? '★' : '☆'}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
