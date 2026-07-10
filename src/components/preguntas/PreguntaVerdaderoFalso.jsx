export function PreguntaVerdaderoFalso({ valor, onChange }) {
  return (
    <>
      <label className="quiz-opcion">
        <input type="radio" checked={valor === true} onChange={() => onChange(true)} />
        Verdadero
      </label>
      <label className="quiz-opcion">
        <input type="radio" checked={valor === false} onChange={() => onChange(false)} />
        Falso
      </label>
    </>
  );
}

PreguntaVerdaderoFalso.estaRespondida = (valor) => valor === true || valor === false;
