import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProgreso } from '../context/ProgresoContext';
import { TEMAS } from '../data/temas';
import { TarjetaTema } from '../components/TarjetaTema';
import { AvisoContinuar } from '../components/AvisoContinuar';
import { ModalNombre } from '../components/ModalNombre';
import './Inicio.css';

export function Inicio() {
  const { progreso, setNombreUsuario } = useProgreso();
  const [editandoNombre, setEditandoNombre] = useState(false);

  return (
    <div className="pagina-inicio">
      <header className="inicio-encabezado">
        <h1>Cartelera de Contenido Educativo</h1>
        <p>Elige un tema para comenzar a aprender programación.</p>
        {progreso.nombreUsuario && (
          <p className="inicio-usuario">
            Hola, <strong>{progreso.nombreUsuario}</strong> ·{' '}
            <button className="enlace-cambiar-nombre" onClick={() => setEditandoNombre(true)}>
              cambiar nombre
            </button>
          </p>
        )}

        <Link
          to="/examen-suficiencia"
          className="examen-suficiencia-boton"
          title={
            progreso.examenPresentado
              ? 'Ya presentaste el examen. Puedes repetirlo para repasar tu nivel (no desbloquea niveles nuevos).'
              : 'Presenta el examen de suficiencia'
          }
        >
          <span className="examen-suficiencia-icono" aria-hidden="true">📝</span>
          <span className="examen-suficiencia-texto">Examen de suficiencia</span>
          {progreso.examenPresentado && (
            <span className="examen-suficiencia-check" aria-hidden="true">✓</span>
          )}
        </Link>
      </header>

      <AvisoContinuar ultimaUbicacion={progreso.ultimaUbicacion} />

      <div className="grilla-temas">
        {TEMAS.map((tema) => (
          <TarjetaTema key={tema.id} tema={tema} />
        ))}
      </div>

      {(!progreso.nombreUsuario || editandoNombre) && (
        <ModalNombre
          valorInicial={progreso.nombreUsuario}
          onGuardar={(nombre) => {
            setNombreUsuario(nombre);
            setEditandoNombre(false);
          }}
          onCancelar={progreso.nombreUsuario ? () => setEditandoNombre(false) : undefined}
        />
      )}
    </div>
  );
}
