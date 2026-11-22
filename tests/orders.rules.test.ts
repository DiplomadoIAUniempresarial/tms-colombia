/**
 * Pruebas del módulo piloto (Paso 5): reglas puras de Órdenes + esquema Zod.
 * Ejecutar:  node tests/orders.rules.test.ts   (Node 24 corre TS directamente)
 */
import assert from "node:assert/strict";
import {
  canTransition,
  assertTransition,
  isEditable,
  nextOrderNumber,
} from "../modules/orders/services/order.rules.ts";
import { createOrderSchema } from "../modules/orders/schemas/order.schema.ts";

// Máquina de estados: caminos válidos
assert.equal(canTransition("draft", "pending"), true);
assert.equal(canTransition("pending", "approved"), true);
assert.equal(canTransition("approved", "planned"), true);
assert.equal(canTransition("planned", "in_transit"), true);
assert.equal(canTransition("in_transit", "delivered"), true);
assert.equal(canTransition("approved", "cancelled"), true);

// Máquina de estados: caminos prohibidos
assert.equal(canTransition("draft", "delivered"), false, "no se salta de borrador a entregada");
assert.equal(canTransition("in_transit", "cancelled"), false, "en tránsito no se cancela");
assert.equal(canTransition("delivered", "pending"), false, "una entregada no revive");
assert.throws(() => assertTransition("draft", "delivered"), /no permitida/);

// Editabilidad
assert.equal(isEditable("draft"), true);
assert.equal(isEditable("cancelled"), false);
assert.equal(isEditable("delivered"), false);

// Numeración correlativa
assert.equal(nextOrderNumber([]), "OT-0001");
assert.equal(nextOrderNumber(["OT-0001"]), "OT-0002");
assert.equal(nextOrderNumber(["OT-0009", "OT-0003"]), "OT-0010");

// Esquema: la orden del escenario común es válida
const scenario = createOrderSchema.safeParse({
  customerPartyId: "33333333-3333-3333-3333-333333333333",
  originLocationId: "66666666-6666-6666-6666-666666666661",
  destinationLocationId: "66666666-6666-6666-6666-666666666662",
  cargoDescription: "Productos de consumo empacados",
  cargoWeightKg: 12000,
  cargoVolumeM3: 48,
  cargoValue: 5000000,
  agreedFreight: 5000000,
});
assert.equal(scenario.success, true, "la orden del escenario debe validar");

// Esquema: rechazos del brief (peso inválido, origen = destino)
assert.equal(
  createOrderSchema.safeParse({ ...scenario.success ? {
    customerPartyId: "33333333-3333-3333-3333-333333333333",
    originLocationId: "66666666-6666-6666-6666-666666666661",
    destinationLocationId: "66666666-6666-6666-6666-666666666662",
    cargoDescription: "X válida", cargoWeightKg: -5,
  } : {} }).success,
  false,
  "peso negativo rechazado",
);
const samePoint = createOrderSchema.safeParse({
  customerPartyId: "33333333-3333-3333-3333-333333333333",
  originLocationId: "66666666-6666-6666-6666-666666666661",
  destinationLocationId: "66666666-6666-6666-6666-666666666661",
  cargoDescription: "Productos",
  cargoWeightKg: 100,
});
assert.equal(samePoint.success, false, "origen igual a destino rechazado");

console.log("OK · pruebas del módulo piloto (órdenes): máquina de estados, numeración y esquema — todas pasan");
