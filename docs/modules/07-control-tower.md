# Brief · Módulo 07 — Torre de control
**Rama:** `feature/07-control-tower` · **Carpetas:** `modules/control-tower/`, página en `app/(dashboard)/torre-control/` · **Rol típico:** `operations`

## El problema (Paso 1)
Despachar un viaje y perderle el rastro es la operación real de muchas empresas. La torre de control es el ojo del sistema: qué viajes existen, en qué estado van, qué novedad ocurrió y qué está retrasado — todo reconstruible desde los eventos, no desde la memoria de nadie.

## Objetivo y funciones mínimas
- Consultar los viajes con su estado actual en una vista de tablero.
- Registrar **novedades y eventos** del viaje (`trip_events`): salida, punto de control, retraso, incidente, llegada.
- Identificar retrasos (planeado vs real) y viajes que requieren atención.
- Consultar el historial operativo completo de un viaje.

## Datos y contratos
Usas `Trip`, `TripEvent` de `core/types/` (tablas `trips`, `trip_events`). Los eventos tienen `source`: `manual` (registro humano), `simulated` (generador de eventos del laboratorio, p. ej. posiciones ficticias) o `integration`. Los eventos **no se editan ni se borran**: se corrigen con un evento nuevo.

## Integración
- **Necesitas de:** Planeación (03) — sus viajes y eventos de asignación/despacho.
- **Entregas a:** Entregas (08), que parte de tus viajes en destino; Seguridad y BI (10) lee tus eventos.

## Reglas y validaciones
- Todo cambio operativo relevante del viaje deja un evento con fecha y tipo válido (`TripEventType`).
- El estado del viaje y su historial deben contar la misma historia: si el estado dice `in_transit`, existe un evento `departure`.
- Los eventos simulados se marcan como tales en pantalla.

## Pantallas mínimas
Tablero de viajes por estado · detalle de viaje con su línea de tiempo de eventos · formulario rápido de novedad.

## No construyas
Mapa con GPS real ni notificaciones externas: el seguimiento aquí es por eventos registrados y simulados, claramente marcados.

## Pruebas mínimas (Paso 5)
Despachar el viaje del escenario desde Planeación y verlo en el tablero · registrar un retraso y verlo marcado · consultar el historial completo del viaje en orden cronológico.

## Entregable
Torre de control básica, alimentada por eventos reales del sistema.

## Primera instrucción para tu Antigravity
«Lee AGENTS.md y docs/modules/07-control-tower.md. Implementa en modules/control-tower el tablero de viajes y la línea de tiempo de eventos usando Trip y TripEvent de core/types. No modifiques trips desde este módulo salvo mediante los eventos y el servicio de planeación. Verifica con npm run typecheck.»
