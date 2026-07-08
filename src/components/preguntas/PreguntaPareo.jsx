export function PreguntaPareo({ pregunta, valor, onChange }) {
  const asignaciones = valor || Array(pregunta.izquierda.length).fill(null);

  function asignar(indiceIzquierda, indiceDerechaTexto) {
    const nuevas = [...asignaciones];
    nuevas[indiceIzquierda] = indiceDerechaTexto === '' ? null : Number(indiceDerechaTexto);
    onChange(nuevas);
  }

  return (
    <div className="quiz-pareo">
      {pregunta.izquierda.map((elemento, indice) => (
        <div key={indice} className="quiz-pareo-fila">
          <span className="quiz-pareo-izquierda">{elemento}</span>
          <select
            value={asignaciones[indice] ?? ''}
            onChange={(evento) => asignar(indice, evento.target.value)}
          >
            <option value="">-- Selecciona --</option>
            {pregunta.derecha.map((opcion, indiceDerecha) => (
              <option key={indiceDerecha} value={indiceDerecha}>
                {opcion}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}

PreguntaPareo.estaRespondida = (valor, pregunta) =>
  Array.isArray(valor) &&
  valor.length === pregunta.izquierda.length &&
  valor.every((v) => v !== null && v !== undefined);
