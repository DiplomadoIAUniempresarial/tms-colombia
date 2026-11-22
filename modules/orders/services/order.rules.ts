import type { OrderStatus } from "../../../core/types";

/**
 * Módulo 02 · Órdenes — REGLAS PURAS (sin base de datos ni red).
 * Son el corazón probado del módulo: la máquina de estados y la numeración.
 * Si una regla vive aquí, se puede probar en segundos y defender en la sustentación.
 */

/** Transiciones válidas según el brief 02. `cancelled` solo antes de `in_transit`. */
export const ORDER_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  draft: ["pending", "cancelled"],
  pending: ["approved", "cancelled"],
  approved: ["planned", "cancelled"],
  planned: ["in_transit", "cancelled"],
  in_transit: ["delivered"],
  delivered: [],
  cancelled: [],
};

export function canTransition(from: OrderStatus, to: OrderStatus): boolean {
  return ORDER_TRANSITIONS[from]?.includes(to) ?? false;
}

export function assertTransition(from: OrderStatus, to: OrderStatus): void {
  if (!canTransition(from, to)) {
    throw new Error(`Transición de orden no permitida: ${from} → ${to}`);
  }
}

/** Una orden cancelada o entregada no se edita. */
export function isEditable(status: OrderStatus): boolean {
  return status !== "cancelled" && status !== "delivered";
}

/** Número correlativo por empresa: OT-0001, OT-0002, … a partir de los existentes. */
export function nextOrderNumber(existingNumbers: string[]): string {
  const max = existingNumbers.reduce((acc, n) => {
    const match = /^OT-(\d+)$/.exec(n);
    return match ? Math.max(acc, Number(match[1])) : acc;
  }, 0);
  return `OT-${String(max + 1).padStart(4, "0")}`;
}
