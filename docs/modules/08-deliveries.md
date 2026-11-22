# Brief · Módulo 08 — Entregas y pruebas de entrega
**Rama:** `feature/08-deliveries` · **Carpetas:** `modules/deliveries/`, página en `app/(dashboard)/entregas/` · **Rol típico:** `operations`

## El problema (Paso 1)
El servicio no termina cuando el camión llega: termina cuando alguien recibe, queda constancia y el cliente puede cobrar. Sin prueba de entrega no hay cumplido, no hay liquidación y no hay defensa ante un reclamo. Tu módulo cierra el ciclo operativo.

## Objetivo y funciones mínimas
- Consultar los viajes pendientes de entrega.
- Registrar la entrega: fecha y hora, **quién recibió** (nombre y documento opcional) y observaciones.
- Adjuntar la evidencia como documento (metadatos en `documents`, `entity_type = 'delivery'`; el archivo puede ser ficticio en el curso).
- Confirmar la entrega y generar el **cumplido interno** (registro documental `document_mode = 'internal'`).
- Manejar los estados de entrega: `delivered`, `partial`, `rejected`, `with_observations`.

## Datos y contratos
Usas `DeliveryRecord`, `Trip`, `TransportOrder`, `DocumentRecord` de `core/types/` (tablas `delivery_records`, `documents`).

## Integración
- **Necesitas de:** Torre de control (07) y Planeación (03) — viajes en destino.
- **Entregas a:** Finanzas (09): sin entrega confirmada no hay liquidación; Seguridad y BI (10) cuenta tus entregas.

## Reglas y validaciones
- Al confirmar la entrega: el viaje pasa a `delivered` y la orden a `delivered`, con su evento `delivery` en `trip_events`.
- Receptor obligatorio; una entrega `rejected` exige observación.
- Una entrega confirmada no se edita: se registra una novedad, no se reescribe la historia.

## Pantallas mínimas
Lista de viajes pendientes de entrega · formulario de registro de entrega con evidencia · detalle con el cumplido interno generado.

## No construyas
Firma digital certificada ni validación biométrica: evidencia y registro trazable es el alcance del curso.

## Pruebas mínimas (Paso 5)
Registrar la entrega del viaje del escenario con receptor y observación · intentar confirmar sin receptor y ver el rechazo · comprobar que Finanzas ya puede liquidar ese viaje.

## Entregable
Módulo de entregas funcional que cierra el flujo operativo con evidencia.

## Primera instrucción para tu Antigravity
«Lee AGENTS.md y docs/modules/08-deliveries.md. Implementa en modules/deliveries el registro de entrega sobre DeliveryRecord de core/types, actualizando los estados del viaje y la orden y dejando el evento delivery. Verifica con npm run typecheck.»
