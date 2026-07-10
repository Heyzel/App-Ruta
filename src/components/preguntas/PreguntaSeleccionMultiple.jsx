export function PreguntaSeleccionMultiple({ pregunta, valor, onChange }) {
  const seleccionadas = valor || [];

  function alternar(indiceOpcion) {
    if (seleccionadas.includes(indiceOpcion)) {
      onChange(seleccionadas.filter((i) => i !== indiceOpcion));
    } else {
      onChange([...seleccionadas, indiceOpcion]);
    }
  }

  return (
    <>
      {pregunta.opciones.map((opcion, indiceOpcion) => (
        <label key={indiceOpcion} className="quiz-opcion">
          <input
            type="checkbox"
            checked={seleccionadas.includes(indiceOpcion)}
            onChange={() => alternar(indiceOpcion)}
          />
          {opcion}
        </label>
      ))}
    </>
  );
}

PreguntaSeleccionMultiple.estaRespondida = (valor) => Array.isArray(valor) && valor.length > 0;
