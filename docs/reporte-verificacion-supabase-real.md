# Reporte de verificación — Supabase real (proyecto PRUEBAS)

**Fecha:** 2026-11-22 · **Proyecto:** PRUEBAS (ref `tluxfpkrurbweppqddax`, cuenta del curso) · **Ejecuta:** amigo, como docente arquitecto, vía la API de administración.

Se repitió sobre el proyecto real la misma batería que ya había pasado contra PostgreSQL 16 local (ver `reporte-verificacion.md`). El proyecto principal `tms-colombia` **no se tocó**: poblarlo requiere la autorización del docente titular con clase de por medio, según el protocolo de operación.

## Aplicación

- Migraciones `202611220001` a `202611220006` aplicadas sin errores, en orden.
- Semilla del escenario común aplicada sin errores.

## Resultados

| Comprobación | Esperado | Obtenido |
|---|---|---|
| Empresas / terceros | 2 / 3 | 2 / 3 ✓ |
| Vehículo / conductor | 1 / 1 | 1 / 1 ✓ |
| Orden / viaje / remesa / manifiesto | 1 / 1 / 1 / 1 | 1 / 1 / 1 / 1 ✓ |
| Costos / liquidación | 3 / 1 | 3 / 1 ✓ |
| Liquidación: ingreso − costo = utilidad | 5.000.000 − 3.600.000 = 1.400.000 | exacto ✓ |
| Margen | 28,00 % | 28,00 ✓ |
| Tablas públicas sin RLS | 0 | 0 ✓ |
| Políticas RLS | 29 | 29 ✓ |
| Estado inválido en una orden (`volando`) | rechazado por el CHECK | rechazado (error 23514) ✓ |
| RLS por comportamiento, miembro de la operadora | ve 1 orden y 1 empresa (solo la suya) | 1 y 1 ✓ |
| RLS por comportamiento, usuario sin membresía | ve 0 y 0 | 0 y 0 ✓ |

## Hallazgo real y su corrección (migración 007)

La primera corrida de la prueba de comportamiento falló con `permission denied for table` para el rol `authenticated`: las migraciones 001–006 creaban las tablas y las políticas, pero **ningún GRANT** daba a los roles de la API acceso a las tablas. RLS decide qué filas se ven; el GRANT decide si la tabla existe para el rol. Sin el segundo candado, la aplicación no habría podido leer ni escribir nada a través de la API.

Corrección: migración `202611220007_grants_api_roles.sql` — CRUD para `authenticated` sobre las tablas públicas, todo para `service_role`, y `audit_events` sin update/delete para `authenticated`. `anon` queda sin permisos sobre las tablas del negocio. Tras aplicarla, la batería completa pasó. **Regla permanente: toda migración futura que cree tablas incluye sus GRANT.**

Los usuarios de prueba usados para la verificación de comportamiento se eliminaron al terminar (proyecto limpio, solo con la semilla).

## Lo que esta verificación NO cubre

- El proyecto principal sigue vacío por protocolo; su población repite esta misma batería con autorización.
- La conexión extremo a extremo de un estudiante real (login, su `.env.local`, la app corriendo contra PRUEBAS) se prueba en la Sesión 2 con la lista de chequeo de conexión.
