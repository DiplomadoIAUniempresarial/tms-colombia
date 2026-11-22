# Brief · Módulo 06 — Cumplimiento documental y simulador RNDC
**Rama:** `feature/06-compliance` · **Carpetas:** `modules/compliance/`, página en `app/(dashboard)/cumplimiento/` · **Rol típico:** `compliance`

## El problema (Paso 1)
En Colombia, mover carga sin remesa y manifiesto no es un trámite menor: es la obligación regulatoria del **transportador**. Este módulo enseña esa responsabilidad y cómo un sistema se prepara para cumplirla **sin conectarse al RNDC real**: todo corre en un simulador identificado como DEMO.

## Objetivo y funciones mínimas
- Generar la **remesa interna** de una orden/viaje y preparar el **manifiesto** que agrupa remesas (`manifest_remittances`).
- Validar la información obligatoria antes de simular el registro.
- Ejecutar el **simulador RNDC** a través de `createRegulatoryProvider()` (`integrations/rndc/`) y mostrar su respuesta.
- Registrar cada operación en `regulatory_transactions` con `simulated = true` y consultar su estado y sus errores.

## Datos y contratos
Usas `TransportRemittance`, `TransportManifest`, `ManifestRemittance`, `RegulatoryTransaction` de `core/types/` y el contrato `RegulatoryProvider` de `integrations/rndc/contracts/`. **`responsible_carrier_id` es siempre la transportadora ejecutora del viaje**: jamás el operador logístico si este no es el transportador. `document_mode`: `internal` para el documento del sistema, `simulated` para el resultado del simulador; `official` está prohibido en el curso.

## Integración
- **Necesitas de:** Órdenes (02), Planeación (03), Flota (04) y Conductores (05) — el simulador valida terceros, vehículo y conductor.
- **Entregas a:** Torre de control (07) y Auditoría: el estado documental del viaje y las transacciones quedan trazables.

## Reglas y validaciones
- Sin remesa válida no hay manifiesto; sin manifiesto no se simula el registro del viaje.
- La respuesta del simulador puede ser aceptación (`DEMO-RNDC-######`) o rechazo con campos faltantes: ambos casos se registran y se muestran.
- **Toda pantalla de este módulo muestra la marca «SIMULADO — DEMO»** junto a cualquier referencia externa. Ningún texto puede sugerir que es un radicado oficial.
- El bloqueo de `createRegulatoryProvider()` (modo real) no se toca bajo ninguna instrucción.

## Pantallas mínimas
Lista de remesas y manifiestos por viaje · generador de remesa y manifiesto con validación previa · panel del simulador con la transacción, su respuesta y su referencia DEMO.

## No construyas
Ninguna conexión real, ningún scraping del portal del Ministerio, ninguna credencial: el proveedor real no existe en este curso.

## Pruebas mínimas (Paso 5)
Generar remesa y manifiesto del escenario común · simular el registro y obtener una referencia `DEMO-RNDC-…` · provocar un rechazo quitando un campo obligatorio y ver el mensaje · consultar el estado de la operación por su referencia.

## Entregable
Módulo documental con simulador RNDC funcionando de punta a punta, con trazabilidad completa.

## Primera instrucción para tu Antigravity
«Lee AGENTS.md y docs/modules/06-compliance.md. Diseña el flujo remesa → manifiesto → simulación usando los tipos de core/types y la interfaz RegulatoryProvider de integrations/rndc (no la modifiques; consúmela). La interfaz debe marcar todo como SIMULADO. Verifica con npm run typecheck.»
