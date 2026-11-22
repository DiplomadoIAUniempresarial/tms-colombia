# Escenario operativo común — TMS Colombia
**Todos los estudiantes trabajan y prueban con este mismo caso ficticio.** Si cada uno inventa sus datos, la integración es imposible. Estas cifras son exclusivamente pedagógicas: no son tarifas, costos ni referencias de mercado.

## Los actores
| Actor | Quién es | Su papel |
|---|---|---|
| **Operadora Logística Cordillera S.A.S.** | Operador logístico (empresa ficticia que administra el sistema) | Recibe la orden del cliente y coordina la operación |
| **Transportes Andinos S.A.S.** | Empresa transportadora | **Ejecuta** el viaje y responde por remesa y manifiesto |
| **Comercializadora del Centro S.A.S.** | Cliente | Solicita el servicio |
| **Inversiones y Equipos del Transporte S.A.S.** | Propietario del vehículo | Dueño del tractocamión |
| **Juan Pérez** | Conductor (identidad ficticia) | Conduce el vehículo |

La lección del escenario: **quien administra la orden no es quien ejecuta el viaje ni quien responde regulatoriamente.** El sistema debe representar eso sin duplicar la orden ni crear dos viajes.

## La operación
- **Ruta:** Bogotá → Medellín.
- **Mercancía:** productos de consumo empacados · **Peso:** 12.000 kg · **Volumen:** 48 m³.
- **Vehículo:** tractocamión ficticio, placa TMS001, capacidad 34.000 kg.
- **Valor comercial de la mercancía:** COP $5.000.000.
- **Flete acordado (ingreso):** COP $5.000.000.
- **Costos:** combustible $2.100.000 · peajes $650.000 · pago al conductor $850.000 · **total $3.600.000**.
- **Resultado esperado:** utilidad **$1.400.000** · margen **28%**.

Estos datos ya existen en la base como semilla (`supabase/seed.sql`): la orden es **OT-0001**, la remesa **REM-0001** y el manifiesto **MAN-0001**.

## El flujo integral (un paso por módulo)
1. **CRM (01)** registra al cliente Comercializadora del Centro.
2. **Órdenes (02)** crea y aprueba la orden OT-0001.
3. **Planeación (03)** la convierte en viaje, asigna vehículo TMS001 y conductor Juan Pérez, con Transportes Andinos como ejecutora, y despacha.
4. **Flota (04)** aporta el vehículo y su disponibilidad.
5. **Conductores (05)** aporta el conductor con licencia vigente.
6. **Cumplimiento (06)** genera remesa y manifiesto internos y ejecuta el simulador RNDC (respuesta DEMO).
7. **Torre de control (07)** registra el seguimiento y las novedades del viaje.
8. **Entregas (08)** registra la evidencia y confirma la entrega.
9. **Finanzas (09)** registra los costos y liquida: utilidad $1.400.000, margen 28%.
10. **Seguridad y BI (10)** registra la inspección del vehículo y muestra los indicadores del flujo completo.
