export function PreguntaNumerica({ valor, onChange }) {
  return (
    <input
      type="number"
      className="quiz-input-numerico"
      value={valor ?? ''}
      onChange={(evento) => {
        const texto = evento.target.value;
        onChange(texto === '' ? null : Number(texto));
      }}
      placeholder="Escribe un número"
    />
  );
}

PreguntaNumerica.estaRespondida = (valor) => valor !== null && valor !== undefined && valor !== '';
