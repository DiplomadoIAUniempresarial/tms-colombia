# Brief · Módulo 05 — Conductores
**Rama:** `feature/05-drivers` · **Carpetas:** `modules/drivers/`, página en `app/(dashboard)/conductores/` · **Rol típico:** `operations`

## El problema (Paso 1)
Un conductor con la licencia vencida asignado a un viaje es un riesgo legal y operativo real. Tu módulo es el registro confiable de quién puede conducir qué, hasta cuándo, y debe avisar antes de que el vencimiento se convierta en problema.

## Objetivo y funciones mínimas
- Registrar y consultar conductores (la persona es un tercero `parties`; el conductor es su registro operativo en `drivers`).
- Registrar número y categoría de licencia y su **fecha de vencimiento**.
- Relacionar al conductor con vehículos y viajes a través de las asignaciones de Planeación (consulta, no asignación propia).
- Generar **alertas básicas**: licencia vencida y licencia que vence en los próximos 30 días.

## Datos y contratos
Usas `Driver`, `Party` de `core/types/` (tablas `drivers`, `parties`). Estados: `active`, `inactive`, `suspended`.

## Integración
- **Necesitas de:** el núcleo (terceros).
- **Entregas a:** Planeación (03), que valida la licencia al asignar; Seguridad y BI (10) consume tus alertas.

## Reglas y validaciones
- Licencia y categoría obligatorias; fecha de vencimiento obligatoria.
- Un conductor con licencia vencida se muestra como **no asignable** (su estado efectivo para Planeación), aunque su registro siga `active`.
- La alerta de 30 días es informativa; la de vencida es bloqueante.

## Pantallas mínimas
Lista de conductores con semáforo de licencia (vigente / por vencer / vencida) · formulario de conductor · ficha con sus datos y viajes asociados.

## No construyas
Nómina, pagos ni control de horas: la liquidación vive en Finanzas (09) y usa otros datos.

## Pruebas mínimas (Paso 5)
Registrar a Juan Pérez (identidad ficticia del escenario, licencia vigente) · registrar un conductor de prueba con licencia vencida y comprobar el semáforo rojo y el bloqueo en Planeación · comprobar la alerta de un vencimiento a 15 días.

## Entregable
Módulo de conductores funcional con alertas de licencia operando.

## Primera instrucción para tu Antigravity
«Lee AGENTS.md y docs/modules/05-drivers.md. Implementa en modules/drivers el registro de conductores sobre el tipo Driver de core/types, con el cálculo del semáforo de licencia como función pura y probada. Verifica con npm run typecheck.»
