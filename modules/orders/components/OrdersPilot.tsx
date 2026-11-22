"use client";

import { useMemo, useState } from "react";
import type { OrderStatus, TransportOrder } from "../../../core/types";
import type { CreateOrderInput } from "../schemas/order.schema";
import { assertTransition, nextOrderNumber } from "../services/order.rules";
import { OrderForm } from "./OrderForm";
import { OrderTable } from "./OrderTable";

/**
 * MÓDULO PILOTO (docente) — así se ve un módulo terminado del TMS Colombia.
 * Corre con los datos DEMO del escenario común en memoria para demostrar la
 * estructura completa (formulario + validación Zod + servicio de reglas +
 * máquina de estados) sin depender todavía de la base del curso.
 * El camino de producción ya está escrito en services/order.service.ts:
 * las mismas reglas, contra Supabase, cuando el proyecto del curso exista.
 */

const CUSTOMERS = [
  { id: "33333333-3333-3333-3333-333333333333", label: "Comercializadora del Centro S.A.S." },
];
const LOCATIONS = [
  { id: "66666666-6666-6666-6666-666666666661", label: "Bogotá — Planta Comercializadora" },
  { id: "66666666-6666-6666-6666-666666666662", label: "Medellín — Centro de distribución" },
];

const SEED_ORDER: TransportOrder = {
  id: "99999999-9999-9999-9999-999999999991",
  companyId: "11111111-1111-1111-1111-111111111111",
  customerPartyId: CUSTOMERS[0].id,
  orderNumber: "OT-0001",
  originLocationId: LOCATIONS[0].id,
  destinationLocationId: LOCATIONS[1].id,
  cargoDescription: "Productos de consumo empacados",
  cargoWeightKg: 12000,
  cargoVolumeM3: 48,
  cargoValue: 5000000,
  agreedFreight: 5000000,
  currencyCode: "COP",
  requestedPickupAt: null,
  requestedDeliveryAt: null,
  status: "approved",
  notes: "Orden del escenario común (dato DEMO).",
  createdBy: null,
  createdAt: "2026-11-22T00:00:00.000Z",
  updatedAt: "2026-11-22T00:00:00.000Z",
};

export function OrdersPilot() {
  const [orders, setOrders] = useState<TransportOrder[]>([SEED_ORDER]);
  const [message, setMessage] = useState<string>("");

  const customerName = useMemo(
    () => (id: string) => CUSTOMERS.find((c) => c.id === id)?.label ?? id,
    [],
  );
  const locationName = useMemo(
    () => (id: string) => LOCATIONS.find((l) => l.id === id)?.label ?? id,
    [],
  );

  function handleCreate(input: CreateOrderInput) {
    const order: TransportOrder = {
      id: `demo-${Date.now()}`,
      companyId: SEED_ORDER.companyId,
      customerPartyId: input.customerPartyId,
      orderNumber: nextOrderNumber(orders.map((o) => o.orderNumber)),
      originLocationId: input.originLocationId,
      destinationLocationId: input.destinationLocationId,
      cargoDescription: input.cargoDescription,
      cargoWeightKg: input.cargoWeightKg,
      cargoVolumeM3: input.cargoVolumeM3 ?? null,
      cargoValue: input.cargoValue ?? null,
      agreedFreight: input.agreedFreight ?? null,
      currencyCode: input.currencyCode,
      requestedPickupAt: null,
      requestedDeliveryAt: null,
      status: "draft",
      notes: input.notes ?? null,
      createdBy: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setOrders((prev) => [order, ...prev]);
    setMessage(`Orden ${order.orderNumber} creada en estado Borrador.`);
  }

  function handleTransition(order: TransportOrder, to: OrderStatus) {
    try {
      assertTransition(order.status, to); // la misma regla que aplica el servicio real
      setOrders((prev) =>
        prev.map((o) => (o.id === order.id ? { ...o, status: to, updatedAt: new Date().toISOString() } : o)),
      );
      setMessage(`Orden ${order.orderNumber}: ${order.status} → ${to}.`);
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Transición no permitida");
    }
  }

  return (
    <section>
      <p style={{ background: "#fff7e0", border: "1px solid #e0c060", padding: 10 }}>
        <strong>Módulo piloto del docente.</strong> Datos DEMO del escenario común, en memoria.
        La lógica es la real del módulo: validación Zod, numeración correlativa y máquina de
        estados de <code>modules/orders</code>. El servicio contra Supabase está en
        <code> services/order.service.ts</code>.
      </p>
      {message && <p aria-live="polite">{message}</p>}
      <h2>Órdenes</h2>
      <OrderTable
        orders={orders}
        customerName={customerName}
        locationName={locationName}
        onTransition={handleTransition}
      />
      <h2>Nueva orden</h2>
      <OrderForm customers={CUSTOMERS} locations={LOCATIONS} onSubmit={handleCreate} />
    </section>
  );
}
