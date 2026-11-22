# Lista de pruebas — TMS Colombia
Marca cada prueba con fecha y resultado en tu documento de evidencias (Paso 5). Un error encontrado y corregido **suma**; una prueba no hecha **resta**.

## Pruebas de cada módulo (mínimas)
- [ ] Crear un registro y consultarlo; recargar y verificar que persiste.
- [ ] Editar un registro y verificar el cambio.
- [ ] Enviar un campo obligatorio vacío → rechazo con mensaje claro.
- [ ] Enviar un dato inválido (negativo, formato errado, duplicado) → rechazo.
- [ ] Intentar una transición de estado prohibida → rechazo.
- [ ] Verificar que no puedes ver ni tocar datos de una empresa a la que no perteneces (RLS).

## Prueba integral obligatoria (escenario común, entre todos)
1. [ ] Crear el cliente (CRM). 2. [ ] Crear la orden (Órdenes). 3. [ ] Aprobarla. 4. [ ] Crear el viaje (Planeación). 5. [ ] Asignar vehículo (Flota). 6. [ ] Asignar conductor (Conductores). 7. [ ] Crear la remesa interna (Cumplimiento). 8. [ ] Crear el manifiesto interno. 9. [ ] Ejecutar la simulación RNDC y obtener referencia DEMO. 10. [ ] Registrar el despacho (Torre). 11. [ ] Registrar novedades del viaje. 12. [ ] Confirmar la entrega con evidencia (Entregas). 13. [ ] Registrar los gastos (Finanzas). 14. [ ] Calcular la utilidad y verificar: $1.400.000, margen 28%. 15. [ ] Consultar los indicadores y la inspección (Seguridad y BI) y comprobar que coinciden con los registros reales.
