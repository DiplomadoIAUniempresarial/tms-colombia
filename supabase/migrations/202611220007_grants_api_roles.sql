-- TMS Colombia · Migración 007 — Permisos de tabla para los roles de la API
-- Hallazgo de la verificación contra Supabase real (proyecto PRUEBAS, 2026-11-22):
-- las migraciones 001–006 crean tablas y políticas RLS, pero sin GRANT los roles
-- anon/authenticated reciben "permission denied" antes de que RLS siquiera
-- evalúe. RLS decide qué filas se ven; el GRANT decide si la tabla existe
-- para el rol. Ambos candados son necesarios.
-- Regla permanente: toda migración futura que cree tablas incluye sus GRANT.

grant select, insert, update, delete on all tables in schema public to authenticated;
grant all on all tables in schema public to service_role;

-- La auditoría es de solo lectura para los usuarios de la aplicación:
-- se puede consultar y registrar, jamás modificar ni borrar.
revoke update, delete on public.audit_events from authenticated;

-- anon no recibe ningún permiso sobre las tablas del negocio:
-- sin sesión iniciada no se lee ni se escribe nada.
