import { useEffect, useState } from 'react';

export function useLocalStorage(clave, valorInicial) {
  const [valor, setValor] = useState(() => {
    try {
      const guardado = window.localStorage.getItem(clave);
      return guardado ? JSON.parse(guardado) : valorInicial;
    } catch {
      return valorInicial;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(clave, JSON.stringify(valor));
    } catch {
      // localStorage no disponible (modo privado, cuota excedida, etc.)
    }
  }, [clave, valor]);

  return [valor, setValor];
}
