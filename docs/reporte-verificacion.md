# Reporte de verificación del núcleo — TMS Colombia
**Fecha:** 22 de noviembre de 2026 · **Responsable:** docente arquitecto · **Estado: TODO EN VERDE**

Lo que sigue no son promesas: es lo que se ejecutó y lo que devolvió cada prueba.

## 1. Aplicación
- `npm run typecheck` — limpio, sin errores.
- `npm run build` — exitoso; 15 rutas generadas, incluida `/ordenes` con el módulo piloto funcional (15,8 kB).
- Pruebas del módulo piloto: `node tests/orders.rules.test.ts` — máquina de estados, numeración correlativa y esquema Zod: **todas pasan**.
- Simulador RNDC (mock): acepta la remesa válida y devuelve `DEMO-RNDC-000001` con `simulated: true`; rechaza el manifiesto incompleto nombrando los campos faltantes; el proveedor real está bloqueado por código (la fábrica lanza error si se intenta activar).

## 2. Base de datos contra PostgreSQL real (16.15)
Las migraciones y la semilla se aplicaron sobre un PostgreSQL 16 real usando el arnés `tests/db/local-harness.sql` (que simula solo lo que Supabase ya provee: esquema `auth`, `auth.uid()` y roles):
- Migraciones `202611220001` a `202611220006`: **aplicadas sin un solo error**.
- Semilla del escenario común: aplicada; conteos correctos (2 empresas, 3 terceros, 1 vehículo, 1 conductor, 1 orden, 1 viaje, 1 remesa, 1 manifiesto, 3 costos, 1 liquidación).
- **Matemática del escenario verificada en la base:** liquidación con utilidad **$1.400.000** y margen **28,00%** — exactamente las cifras oficiales.
- Integridad: un `INSERT` con un estado de orden inválido fue **rechazado por el CHECK** de estados controlados.

## 3. Seguridad (RLS) — comportamiento probado, no solo declarado
- Las 21 tablas públicas tienen RLS activo (**0 tablas sin RLS**) y existen **29 políticas**.
- Usuario **sin** membresía de empresa, con rol `authenticated`: ve **0** órdenes.
- Usuario **con** membresía en la operadora: ve exactamente **1** orden (la de su empresa) y **1** empresa (solo la suya, no la transportadora).
- Conclusión: un estudiante no puede ver ni tocar datos de una empresa a la que no pertenece.

## 4. Lo que esta verificación NO cubre todavía (honestidad obligada)
- Las migraciones aún no corren sobre el proyecto Supabase real del curso: se aplican el día en que existan los proyectos (pruebas y principal), y esta misma batería se repite allí antes de invitar estudiantes.
- La conexión de extremo a extremo (login real de un estudiante → ver su módulo desplegado) se prueba en la Sesión 2 con la lista de chequeo de conexión, estudiante por estudiante.
- Ningún sistema garantiza cero fallos: lo que este núcleo garantiza es que lo construido hasta hoy está probado, y que cada pieza nueva entra por Pull Request con esta misma batería antes de llegar a producción.
