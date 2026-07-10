# Guía de despliegue

Esta guía explica cómo poner en marcha la **Cartelera de Contenido Educativo** desde cero,
tanto en local como en un hosting estático (Netlify o Vercel).

---

## 1. Requisitos previos

- **Node.js LTS** (18 o superior) y npm.
- Una cuenta de **Supabase** (base de datos + API).
- (Opcional) Una cuenta de **Zapier** si se quiere activar el chatbot de IA.

---

## 2. Variables de entorno

Copia `.env.example` a `.env` y completa los valores:

```
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-anonima-publica
VITE_ADMIN_PASSWORD=elige-una-clave-para-el-panel-admin
VITE_ZAPIER_CHATBOT_ID=id-del-chatbot-de-zapier
```

- `VITE_SUPABASE_ANON_KEY` es la clave **anónima/pública** (rol `anon`) del cliente. **No** uses
  la clave secreta de servidor: el cliente la rechazaría con errores 401.
- `VITE_ADMIN_PASSWORD` es la contraseña del panel `/admin`.
- `VITE_ZAPIER_CHATBOT_ID` es el `chatbot-id` real del embed de Zapier (no el slug de la URL
  pública). Si se deja vacío, el panel de chat muestra un aviso y la app sigue funcionando.

> En el hosting (Netlify/Vercel), estas mismas variables deben definirse en el panel de
> **Environment Variables** del proyecto. Las variables `VITE_*` se incrustan en el build.

---

## 3. Configurar la base de datos (Supabase)

1. Entra al **SQL Editor** de tu proyecto en Supabase (Dashboard → SQL Editor → New query).
2. Pega y ejecuta el contenido de [`scripts/esquema.sql`](scripts/esquema.sql). Esto crea las
   tablas `cuestionarios`, `resultados` y `contenidos` con sus políticas RLS.

> Nota de seguridad: las políticas RLS abren lectura/escritura para el alcance de esta tesis.
> En un entorno de producción real habría que restringir la escritura de `cuestionarios`/
> `contenidos` y el borrado de `resultados` a usuarios autenticados.

---

## 4. Instalar y sembrar datos

```bash
npm install
npm run seed
```

- `npm run seed` ejecuta ambos seeders:
  - `seed:cuestionarios` → carga los cuestionarios C++ de `src/data/quizzes.js`.
  - `seed:contenidos` → carga los contenidos de `src/data/contenidos.js`.

Para vaciar los resultados de prueba antes de una demo:

```bash
npm run db:limpiar          # vacía solo la tabla `resultados`
node scripts/limpiarBaseDatos.mjs --todo   # además vacía cuestionarios y contenidos
```

---

## 5. Chatbot de Zapier (opcional)

1. Crea un chatbot en **Zapier Chatbots** (Zapier Interfaces).
2. En su configuración (directive/instructions) describe el rol de tutor y los temas de la app;
   opcionalmente añade los contenidos como *knowledge*.
3. Publica el chatbot y copia su **Chatbot ID** desde el código de *Embed*.
4. Colócalo en `VITE_ZAPIER_CHATBOT_ID` (en `.env` y en las variables del hosting).

---

## 6. Build y prueba local

```bash
npm run build       # genera la carpeta dist/
npm run preview     # sirve dist/ en local para probar el build de producción
```

Verifica que las rutas profundas (`/admin`, `/tema/variables/principiante/quiz`) cargan
directamente (ver sección 7).

---

## 7. Despliegue en un hosting estático

La app es una SPA con React Router: el servidor debe reescribir **todas** las rutas a
`index.html`. El repo ya incluye la configuración para ambas plataformas:

- **Netlify**: usa [`public/_redirects`](public/_redirects) (Vite lo copia a `dist/`).
  - Build command: `npm run build`
  - Publish directory: `dist`
- **Vercel**: usa [`vercel.json`](vercel.json) con la regla de rewrites.
  - Framework preset: Vite. Build: `npm run build`. Output: `dist`.

Pasos generales:
1. Sube el repositorio a GitHub (o conecta el directorio).
2. Crea el proyecto en Netlify/Vercel apuntando a este repo.
3. Configura las **variables de entorno** (sección 2) en el panel del hosting.
4. Lanza el despliegue. El hosting ejecutará `npm run build` y publicará `dist/`.

---

## 8. Mantenimiento

- **Re-sembrar** tras cambios en los datos: `npm run seed`.
- **Limpiar resultados**: `npm run db:limpiar`.
- **Editar contenidos/cuestionarios sin tocar código**: entra a `/admin` con
  `VITE_ADMIN_PASSWORD`.

---

## 9. Solución de problemas

| Síntoma | Causa probable | Solución |
|---|---|---|
| 404 al recargar en `/admin` o rutas profundas | Falta reescritura SPA | Verifica `_redirects` / `vercel.json` |
| Errores 401 en consola al guardar | Clave secreta en vez de anónima | Usa la `anon key` en `VITE_SUPABASE_ANON_KEY` |
| "Could not find the table…" | No se ejecutó el esquema SQL | Ejecuta `scripts/esquema.sql` en Supabase |
| El chatbot no aparece | Falta `VITE_ZAPIER_CHATBOT_ID` | Define la variable con el id real del embed |
