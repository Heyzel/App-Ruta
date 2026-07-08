export function PreguntaSeleccionSimple({ pregunta, valor, onChange }) {
  return (
    <>
      {pregunta.opciones.map((opcion, indiceOpcion) => (
        <label key={indiceOpcion} className="quiz-opcion">
          <input
            type="radio"
            checked={valor === indiceOpcion}
            onChange={() => onChange(indiceOpcion)}
          />
          {opcion}
        </label>
      ))}
    </>
  );
}

PreguntaSeleccionSimple.estaRespondida = (valor) => valor !== null && valor !== undefined;
