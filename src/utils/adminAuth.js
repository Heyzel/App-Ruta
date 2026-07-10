const CLAVE_SESION = 'admin-autenticado';

export function estaAutenticado() {
  return sessionStorage.getItem(CLAVE_SESION) === 'true';
}

export function autenticar(password) {
  const correcta = password === import.meta.env.VITE_ADMIN_PASSWORD;
  if (correcta) sessionStorage.setItem(CLAVE_SESION, 'true');
  return correcta;
}

export function cerrarSesionAdmin() {
  sessionStorage.removeItem(CLAVE_SESION);
}
