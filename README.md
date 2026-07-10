# Cartelera de Contenido Educativo

Aplicación web para aprender programación en **C++** por temas y niveles de dificultad. El
estudiante navega por temas, revisa contenidos (recursos externos organizados por tipo) y
responde cuestionarios para avanzar de nivel. Incluye un **panel de administrador** para editar
contenidos y cuestionarios, y un **chatbot de IA** (Zapier) como asistente.

## Características

- **8 temas** × 3 niveles (principiante, intermedio, avanzado).
- **Contenidos** enlazados a recursos externos, etiquetados por tipo (video 🎬, lectura 📖,
  artículo 📰, guía 🧭, etc.).
- **Cuestionarios en C++** con 5 tipos de pregunta: selección simple, selección múltiple,
  verdadero/falso, respuesta numérica (con fragmentos de código) y pareo.
- **Progreso persistente** en el navegador (localStorage) para retomar donde se dejó.
- **Panel de administrador** (`/admin`) para crear/editar contenidos y cuestionarios.
- **Chatbot de IA** en panel lateral colapsable (integración con Zapier Chatbots).
- Backend con **Supabase**, con fallback automático a datos locales si no está configurado.

## Stack

- React + Vite + React Router
- Supabase (PostgreSQL + API REST)
- CSS plano

## Desarrollo local

```bash
npm install
cp .env.example .env   # completa las variables (ver DESPLIEGUE.md)
npm run dev
```

Scripts útiles:

| Script | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Sirve el build de producción |
| `npm run seed` | Siembra cuestionarios y contenidos en Supabase |
| `npm run db:limpiar` | Vacía la tabla de resultados |

## Despliegue

Consulta la guía completa en [DESPLIEGUE.md](DESPLIEGUE.md).
