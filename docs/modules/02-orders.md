# Brief · Módulo 02 — Órdenes de transporte
**Rama:** `feature/02-orders` · **Carpetas:** `modules/orders/`, página en `app/(dashboard)/ordenes/` · **Rol típico:** `commercial` / `operations`

## El problema (Paso 1)
Toda operación nace como una solicitud de un cliente. Si la orden queda mal registrada (peso, origen, destino, flete), el error se propaga a planeación, documentos y finanzas. Tu módulo es la puerta de entrada del TMS.

## Objetivo y funciones mínimas
- Crear órdenes seleccionando el cliente (del CRM), origen y destino (de `locations`).
- Registrar mercancía, peso (kg), volumen (m³), valor comercial y **flete acordado**.
- Manejar el estado de la orden (`OrderStatus`) con transiciones válidas.
- Consultar y filtrar órdenes por estado y por cliente.

## Datos y contratos
Usas `TransportOrder`, `Party`, `Location` de `core/types/` (tabla `transport_orders`). La orden la administra `company_id` (la empresa de la sesión). El número de orden (`order_number`) es correlativo por empresa: `OT-0001`, `OT-0002`, …

## Integración
- **Necesitas de:** CRM (01) para el cliente; ubicaciones del núcleo.
- **Entregas a:** Planeación (03), que solo puede convertir en viaje las órdenes en estado `approved`.

## Reglas y validaciones
- Peso > 0; origen ≠ destino; cliente obligatorio y con rol `customer`.
- Transiciones de estado válidas: `draft → pending → approved → planned → in_transit → delivered`; `cancelled` solo antes de `in_transit`. Una orden cancelada no se puede editar.
- El flete acordado se registra una vez y no cambia después de aprobada (si cambia, es una decisión comercial que queda en notas).

## Pantallas mínimas
Lista de órdenes con filtro por estado · formulario de orden · detalle de la orden con su estado y botones de transición válidos.

## No construyas
Cotización automática de fletes ni optimización: el flete aquí se **acuerda y se registra**, no se calcula.

## Pruebas mínimas (Paso 5)
Crear la orden del escenario común (Comercializadora del Centro, Bogotá → Medellín, 12.000 kg, flete $5.000.000) · intentar un peso negativo y ver el rechazo · intentar saltar de `draft` a `delivered` y ver el rechazo · aprobarla y comprobar que aparece disponible para Planeación.

## Entregable
Orden de transporte funcional, persistida y con su máquina de estados operando.

## Primera instrucción para tu Antigravity
«Lee AGENTS.md y docs/modules/02-orders.md. Diseña primero la máquina de estados de la orden y las validaciones. Luego implementa en modules/orders el servicio con Zod y las pantallas de lista y formulario, reutilizando los clientes del módulo CRM sin modificarlo. Verifica con npm run typecheck.»
