# Brief · Módulo 10 — Seguridad vial e indicadores
**Rama:** `feature/10-safety-bi` · **Carpetas:** `modules/safety-bi/`, página en `app/(dashboard)/seguridad-bi/` · **Rol típico:** `manager` / todos

## El problema (Paso 1)
Dos preguntas cierran el sistema: ¿operamos seguros? y ¿cómo va el negocio? Este módulo pone los controles básicos de seguridad vial (inspecciones y alertas) y el tablero de indicadores que se alimenta **solo de datos reales del TMS**: nada de cifras digitadas a mano para la foto.

## Objetivo y funciones mínimas
- Registrar **inspecciones** de vehículos (`vehicle_inspections`): preoperacionales y periódicas, con resultado y observaciones.
- Registrar novedades de seguridad y generar **alertas básicas** (inspección rechazada, licencia de conductor por vencer — del módulo 05, documentos por vencer).
- Consultar los **indicadores**: viajes por estado, operaciones pendientes, viajes entregados, rentabilidad agregada (de Finanzas), costo promedio por viaje.

## Datos y contratos
Usas `VehicleInspection` y consultas de solo lectura sobre `Trip`, `TripSettlement`, `Driver`, `Vehicle` de `core/types/`. **Este módulo no modifica datos de otros módulos**: lee y presenta; las inspecciones son su única escritura propia.

## Integración
- **Necesitas de:** todos — eres el consumidor final del sistema.
- **Entregas a:** la dirección del proyecto: tu tablero es el que se muestra en la sustentación final.

## Reglas y validaciones
- Todo indicador debe poder rastrearse hasta los registros que lo producen (si el tablero dice 3 entregas, deben existir 3 `delivery_records`).
- Inspección con resultado `rejected` deja al vehículo marcado para revisión y genera alerta visible.
- Nada de analítica avanzada ni predicciones: indicadores honestos sobre datos del sistema.

## Pantallas mínimas
Registro y lista de inspecciones · panel de alertas · tablero de indicadores con las cifras del escenario y de la operación del curso.

## Nota de organización (nuestro diplomado)
Este módulo se construye **colectivamente en el tramo final del curso**: cada estudiante aporta las inspecciones y alertas de su propio módulo, y el tablero integra el trabajo de todos. La rama y la carpeta son las mismas.

## Pruebas mínimas (Paso 5)
Registrar una inspección aprobada y una rechazada del vehículo del escenario y ver la alerta · ejecutar el flujo completo del escenario y comprobar que cada indicador del tablero coincide con los registros reales.

## Entregable
Módulo de seguridad e indicadores alimentado por los datos vivos del TMS.

## Primera instrucción para tu Antigravity
«Lee AGENTS.md y docs/modules/10-safety-bi.md. Implementa en modules/safety-bi las inspecciones sobre VehicleInspection y el tablero con consultas de solo lectura a los demás módulos, sin modificar sus tablas. Cada indicador debe documentar de qué registros se calcula. Verifica con npm run typecheck.»
