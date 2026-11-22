# Módulo 02 · Órdenes de transporte — MÓDULO PILOTO

Implementación de referencia construida por el docente **antes** de que entren los estudiantes, siguiendo la ruta del proyecto: es el ejemplo vivo de cómo se ve un módulo terminado (estructura, reglas, validación, pruebas).

## Cómo está construido (y cómo debes construir el tuyo)
- `schemas/order.schema.ts` — validación Zod: una sola fuente de verdad para formulario y servicio.
- `services/order.rules.ts` — reglas **puras** (máquina de estados, numeración correlativa, editabilidad): sin base de datos, probadas en `tests/orders.rules.test.ts`.
- `services/order.service.ts` — el servicio contra Supabase (listar, crear, transicionar) que aplica las mismas reglas en el servidor y traduce snake_case ↔ camelCase.
- `components/` — presentación por props (`OrderTable`, `OrderForm`) y el piloto interactivo (`OrdersPilot`) que corre con los datos DEMO del escenario común.
- La página `app/(dashboard)/ordenes/` solo presenta: la lógica vive en el módulo.

## Para el estudiante responsable del módulo 02
Este piloto es tu piso, no tu techo: reprodúcelo en tu rama `feature/02-orders`, conéctalo a la base de pruebas del curso usando `order.service.ts`, y extiéndelo con lo que pide tu brief (filtros por estado y cliente, fechas solicitadas). Tu defensa debe poder explicar cada pieza: si no puedes explicarla, todavía no es tu módulo.

## Pruebas
```bash
node tests/orders.rules.test.ts
npm run typecheck
```
