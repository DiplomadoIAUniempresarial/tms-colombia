-- Arnés SOLO para prueba local de las migraciones (nunca aplicar en Supabase):
-- Supabase ya provee el esquema auth, auth.uid() y los roles; aquí se simulan
-- para poder ejecutar las migraciones y la semilla contra un PostgreSQL real.
create schema if not exists auth;
create table if not exists auth.users (id uuid primary key);
create or replace function auth.uid() returns uuid language sql stable as $$ select null::uuid $$;
do $$ begin
  if not exists (select 1 from pg_roles where rolname = 'anon') then create role anon; end if;
  if not exists (select 1 from pg_roles where rolname = 'authenticated') then create role authenticated; end if;
  if not exists (select 1 from pg_roles where rolname = 'service_role') then create role service_role; end if;
end $$;
-- Supabase además otorga por defecto los privilegios de tabla a estos roles;
-- localmente hay que replicarlos para probar el comportamiento RLS:
grant select, insert, update, delete on all tables in schema public to authenticated;
grant select on all tables in schema public to anon;
