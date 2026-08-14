import { useState } from 'react';
import { EditorCodigo } from '../components/EditorCodigo';
import './Practica.css';

// Ejemplos para no empezar con la página en blanco. Están alineados con los
// temas de `src/data/temas.js` (variables, bucles, arreglos, funciones).
const PLANTILLAS = [
  {
    nombre: 'Hola mundo',
    codigo: `#include <iostream>

int main() {
  std::cout << "Hola mundo" << std::endl;
  return 0;
}
`,
  },
  {
    nombre: 'Variables y operaciones',
    codigo: `#include <iostream>

int main() {
  int a = 7;
  int b = 3;

  std::cout << "Suma: " << a + b << std::endl;
  std::cout << "Resta: " << a - b << std::endl;
  std::cout << "Division entera: " << a / b << std::endl;
  std::cout << "Residuo: " << a % b << std::endl;

  return 0;
}
`,
  },
  {
    nombre: 'Bucle for',
    codigo: `#include <iostream>

int main() {
  int suma = 0;

  for (int i = 1; i <= 10; i++) {
    suma += i;
  }

  std::cout << "La suma del 1 al 10 es " << suma << std::endl;
  return 0;
}
`,
  },
  {
    nombre: 'Arreglos',
    codigo: `#include <iostream>

int main() {
  int numeros[5] = {4, 8, 15, 16, 23};
  int mayor = numeros[0];

  for (int i = 1; i < 5; i++) {
    if (numeros[i] > mayor) {
      mayor = numeros[i];
    }
  }

  std::cout << "El mayor es " << mayor << std::endl;
  return 0;
}
`,
  },
  {
    nombre: 'Funciones',
    codigo: `#include <iostream>

int alCuadrado(int numero) {
  return numero * numero;
}

int main() {
  std::cout << "5 al cuadrado es " << alCuadrado(5) << std::endl;
  std::cout << "9 al cuadrado es " << alCuadrado(9) << std::endl;
  return 0;
}
`,
  },
  {
    // Este ejemplo necesita que el estudiante escriba un número en el campo
    // "Entrada del programa" del editor; sirve para descubrir esa opción.
    nombre: 'Leer datos con cin',
    codigo: `#include <iostream>

int main() {
  int edad;

  std::cout << "Escribe tu edad en el campo de entrada." << std::endl;
  std::cin >> edad;
  std::cout << "El anio que viene tendras " << edad + 1 << std::endl;

  return 0;
}
`,
  },
];

export function Practica() {
  const [indicePlantilla, setIndicePlantilla] = useState(0);

  return (
    <div className="pagina-practica">
      <h1>Practica C++</h1>
      <p className="practica-descripcion">
        Escribe un programa y ejecútalo para ver su resultado. Se compila con g++ de verdad, así que
        verás los mismos mensajes de error que en un compilador real. Nada de lo que hagas aquí afecta
        a tu progreso ni a tus notas: es un espacio para experimentar sin miedo a equivocarte.
      </p>

      <label className="practica-plantillas">
        <span>Cargar un ejemplo</span>
        <select
          value={indicePlantilla}
          onChange={(evento) => setIndicePlantilla(Number(evento.target.value))}
        >
          {PLANTILLAS.map((plantilla, indice) => (
            <option key={plantilla.nombre} value={indice}>
              {plantilla.nombre}
            </option>
          ))}
        </select>
      </label>
      <p className="practica-aviso-plantilla">
        Al cambiar de ejemplo se reemplaza el código que tengas escrito.
      </p>

      {/* La `key` remonta el editor al cambiar de plantilla, que es la forma
          más simple de que cargue el nuevo código inicial. */}
      <EditorCodigo
        key={indicePlantilla}
        codigoInicial={PLANTILLAS[indicePlantilla].codigo}
      />
    </div>
  );
}
