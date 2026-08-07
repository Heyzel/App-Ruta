import './FondoAnimado.css';

export function FondoAnimado() {
  return (
    <div className="fondo-animado" aria-hidden="true">
      <div className="fondo-grid" />
      <div className="fondo-blob fondo-blob--1" />
      <div className="fondo-blob fondo-blob--2" />
      <div className="fondo-blob fondo-blob--3" />
    </div>
  );
}
