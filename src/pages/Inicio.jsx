import { useState } from 'react';
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
