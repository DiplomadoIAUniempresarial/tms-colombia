# Brief · Módulo 03 — Planeación y despachos
**Rama:** `feature/03-planning` · **Carpetas:** `modules/planning/`, página en `app/(dashboard)/planeacion/` · **Rol típico:** `operations`

## El problema (Paso 1)
Una orden aprobada todavía no mueve nada: alguien debe convertirla en un viaje real con vehículo, conductor, fechas y un transportador ejecutor. Ese acto — planear y despachar — es el corazón operativo del TMS y donde se cruzan los dos perfiles del sistema: quien administra la orden y quien ejecuta el viaje pueden ser empresas distintas.

## Objetivo y funciones mínimas
- Consultar las órdenes aprobadas pendientes de planeación.
- Crear viajes (`trips`) relacionando órdenes (`trip_orders`); uso inicial del curso: una orden por viaje, modelo preparado para varias.
- Asignar vehículo y conductor, registrando la empresa transportadora ejecutora (`operating_carrier_id`).
- Definir fechas planeadas de salida y llegada y llevar el viaje hasta `ready_for_dispatch` y `dispatched`, registrando los eventos en `trip_events`.

## Datos y contratos
Usas `TransportOrder`, `Trip`, `TripOrder`, `Vehicle`, `Driver`, `TripEvent` de `core/types/`. `company_id` = empresa que administra (la de la sesión); `operating_carrier_id` = transportadora que ejecuta (puede ser la misma o un tercero del escenario).

## Integración
- **Necesitas de:** Órdenes (02), Flota (04), Conductores (05).
- **Entregas a:** Cumplimiento (06) y Torre de control (07), que trabajan sobre tus viajes y eventos.

## Reglas y validaciones
- Solo órdenes en `approved` pueden convertirse en viaje; al crear el viaje, la orden pasa a `planned`.
- **Capacidad:** la suma de pesos asignados (`trip_orders`) no puede superar `capacity_kg` del vehículo.
- **Conductor habilitado:** no se asigna un conductor con la licencia vencida ni en estado distinto de `active`.
- Vehículo en estado `available`; al asignarse pasa a `in_route` cuando el viaje se despacha.
- Cada asignación y el despacho generan su evento en `trip_events` (`vehicle_assigned`, `driver_assigned`, `dispatch`, `departure`).

## Pantallas mínimas
Bandeja de órdenes aprobadas · creador de viaje con selectores de vehículo/conductor/transportador · detalle del viaje con asignaciones, fechas y botón de despacho.

## No construyas
Optimización matemática de rutas ni mapas en tiempo real: planeas y asignas con criterio, no con algoritmos.

## Pruebas mínimas (Paso 5)
Convertir la orden OT-0001 del escenario en viaje · intentar asignar un vehículo con capacidad menor a 12.000 kg y ver el rechazo · intentar asignar un conductor con licencia vencida y ver el rechazo · despachar y comprobar los eventos en la Torre (07).

## Entregable
Viaje creado, asignado y despachado dentro del sistema, con sus eventos registrados.

## Primera instrucción para tu Antigravity
«Lee AGENTS.md y docs/modules/03-planning.md. Diseña las validaciones de capacidad y de licencia antes de codificar. Implementa en modules/planning el servicio de viajes usando los contratos de core/types, sin modificar los módulos 02, 04 ni 05: consúmelos por sus tablas y tipos. Verifica con npm run typecheck.»
