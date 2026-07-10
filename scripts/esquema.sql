-- Ejecutar este script en el editor SQL de Supabase (Dashboard > SQL Editor > New query)

create table if not exists cuestionarios (
  id uuid primary key default gen_random_uuid(),
  tema text not null,
  dificultad text not null,
  umbral_aprobacion numeric not null default 15,
  preguntas jsonb not null,
  creado_en timestamptz default now(),
  unique (tema, dificultad)
);

create table if not exists resultados (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  tema text not null,
  dificultad text not null,
  nota numeric not null,
  correctas int,
  total int,
  aprobado boolean,
  creado_en timestamptz default now()
);

alter table cuestionarios enable row level security;
alter table resultados enable row level security;

-- Alcance de tesis (clave anónima). Lectura pública; escritura abierta.
-- NOTA DE SEGURIDAD: en producción real habría que restringir la escritura
-- (por ejemplo, exigir autenticación para escribir en `cuestionarios`).
drop policy if exists "leer_cuestionarios" on cuestionarios;
create policy "leer_cuestionarios" on cuestionarios for select using (true);

drop policy if exists "escribir_cuestionarios" on cuestionarios;
create policy "escribir_cuestionarios" on cuestionarios for all using (true) with check (true);

drop policy if exists "leer_resultados" on resultados;
create policy "leer_resultados" on resultados for select using (true);

drop policy if exists "insertar_resultados" on resultados;
create policy "insertar_resultados" on resultados for insert with check (true);

-- Permite el borrado de resultados (usado por scripts/limpiarBaseDatos.mjs con la clave anónima).
-- En producción real convendría restringir el borrado a usuarios autenticados.
drop policy if exists "borrar_resultados" on resultados;
create policy "borrar_resultados" on resultados for delete using (true);

create table if not exists contenidos (
  id uuid primary key default gen_random_uuid(),
  tema text not null,
  dificultad text not null,
  items jsonb not null default '[]'::jsonb,
  creado_en timestamptz default now(),
  unique (tema, dificultad)
);

alter table contenidos enable row level security;

drop policy if exists "leer_contenidos" on contenidos;
create policy "leer_contenidos" on contenidos for select using (true);

drop policy if exists "escribir_contenidos" on contenidos;
create policy "escribir_contenidos" on contenidos for all using (true) with check (true);
