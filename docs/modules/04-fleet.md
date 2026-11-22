# Brief · Módulo 04 — Flota y proveedores
**Rama:** `feature/04-fleet` · **Carpetas:** `modules/fleet/`, página en `app/(dashboard)/flota/` · **Rol típico:** `operations`

## El problema (Paso 1)
Planeación no puede asignar lo que no conoce: qué vehículos existen, de quién son, qué capacidad tienen y si están disponibles. En este sector, además, el vehículo suele ser de un tercero: el propietario, la transportadora que lo opera y quien administra el registro son actores distintos.

## Objetivo y funciones mínimas
- Registrar vehículos: placa, tipo, marca, modelo y capacidad (kg y m³).
- Identificar el **propietario** (tercero con rol `owner`) y la **empresa transportadora asociada** (`carrier_company_id`).
- Consultar la documentación registrada del vehículo (metadatos en `documents`).
- Validar la disponibilidad básica por estado (`available`, `in_route`, `in_maintenance`, `out_of_service`).

## Datos y contratos
Usas `Vehicle`, `Party`, `DocumentRecord` de `core/types/` (tablas `vehicles`, `parties`, `documents` con `entity_type = 'vehicle'` y `document_type` como `soat`, `tecnomecanica`, `licencia_operacion`). Si consideras indispensables campos de vencimiento documental en el vehículo, **propón la migración en tu PR**; no la apliques tú.

## Integración
- **Necesitas de:** el núcleo (empresas y terceros).
- **Entregas a:** Planeación (03), que consume tu disponibilidad y tu capacidad; Seguridad y BI (10) lee tus vehículos para inspecciones.

## Reglas y validaciones
- Placa obligatoria y única por empresa administradora; capacidad > 0.
- Un vehículo con capacidad registrada es la fuente de verdad para la validación de Planeación: no la dupliques en otra tabla.
- Cambios de estado quedan reflejados de inmediato para Planeación.

## Pantallas mínimas
Lista de vehículos con estado y capacidad · formulario de vehículo · ficha con propietario, transportadora asociada y documentos registrados.

## No construyas
Mantenimiento completo ni telemetría: el TMS registra la **señal** (estado e inspecciones), no es un sistema de taller.

## Pruebas mínimas (Paso 5)
Registrar el tractocamión del escenario (placa TMS001, 34.000 kg) · intentar duplicar la placa y ver el rechazo · pasarlo a `in_maintenance` y comprobar que Planeación ya no lo ofrece como disponible.

## Entregable
Módulo de flota funcional con persistencia y disponibilidad confiable para Planeación.

## Primera instrucción para tu Antigravity
«Lee AGENTS.md y docs/modules/04-fleet.md. Implementa en modules/fleet el CRUD de vehículos usando el tipo Vehicle de core/types, con el propietario como tercero de rol owner y la transportadora como empresa. Verifica con npm run typecheck.»
