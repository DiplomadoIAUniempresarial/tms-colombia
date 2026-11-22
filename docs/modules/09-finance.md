# Brief · Módulo 09 — Finanzas y liquidación
**Rama:** `feature/09-finance` · **Carpetas:** `modules/finance/`, página en `app/(dashboard)/finanzas/` · **Rol típico:** `finance`

## El problema (Paso 1)
Transportar sin saber si el viaje ganó o perdió plata es la tarifa ciega en su forma pura. Tu módulo responde, viaje por viaje, la pregunta que decide si una operación sirve: ¿cuánto entró, cuánto costó y cuánto quedó?

## Objetivo y funciones mínimas
- Registrar los **costos** del viaje (`trip_costs`): combustible, peajes, pago al conductor, pago a la transportadora, cargue, descargue, mantenimiento, otros.
- Tomar el **ingreso** del flete acordado de las órdenes del viaje.
- Calcular la liquidación (`trip_settlements`): costo total, **utilidad** y **margen**.
- Consultar la rentabilidad por viaje y el listado de viajes liquidados y pendientes.

## Datos y contratos
Usas `TripCost`, `TripSettlement`, `Trip`, `TransportOrder` de `core/types/` (tablas `trip_costs`, `trip_settlements`). Fórmulas oficiales (Documento Técnico §15): `Utilidad = Ingresos − Costos`; `Margen % = (Utilidad / Ingresos) × 100`; **si el ingreso es cero, el margen es `null`** (nunca división por cero ni un 0 disfrazado).

## Integración
- **Necesitas de:** Órdenes (02) — el flete acordado; Entregas (08) — solo se liquida lo entregado.
- **Entregas a:** Seguridad y BI (10) — la rentabilidad agregada.

## Reglas y validaciones
- Montos ≥ 0, siempre en la moneda del viaje (`currency_code`).
- La liquidación se **recalcula** desde los costos registrados; no se digitan la utilidad ni el margen a mano.
- Un viaje no entregado puede registrar costos, pero su liquidación queda en `draft` hasta la entrega.

## Pantallas mínimas
Detalle financiero del viaje (ingreso, costos por tipo, utilidad y margen) · formulario de costos · tabla de rentabilidad por viaje.

## No construyas
Contabilidad general, impuestos ni facturación electrónica DIAN: esto es liquidación operativa por viaje.

## Pruebas mínimas (Paso 5)
Registrar en el viaje del escenario los costos pedagógicos (combustible $2.100.000 + peajes $650.000 + conductor $850.000 = $3.600.000) y comprobar la liquidación: ingreso $5.000.000, utilidad $1.400.000, margen 28% · crear un viaje con ingreso 0 y comprobar que el margen queda en blanco, no en error.

## Entregable
Módulo de liquidación y rentabilidad por viaje, calculado desde los datos del sistema.

## Primera instrucción para tu Antigravity
«Lee AGENTS.md y docs/modules/09-finance.md. Implementa en modules/finance el registro de costos y el cálculo de liquidación como función pura probada (incluye el caso ingreso = 0), usando TripCost y TripSettlement de core/types. Verifica con npm run typecheck.»
