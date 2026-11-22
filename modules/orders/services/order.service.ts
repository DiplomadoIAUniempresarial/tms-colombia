import type { SupabaseClient } from "@supabase/supabase-js";
import type { OrderStatus, TransportOrder } from "../../../core/types";
import { createOrderSchema, type CreateOrderInput } from "../schemas/order.schema";
import { assertTransition, nextOrderNumber } from "./order.rules";

/**
 * Módulo 02 · Órdenes — servicio de negocio.
 * Las páginas nunca hablan directo con la base: pasan por aquí.
 * Convención del proyecto: la base usa snake_case; el dominio, camelCase.
 */

type OrderRow = {
  id: string;
  company_id: string;
  customer_party_id: string;
  order_number: string;
  origin_location_id: string;
  destination_location_id: string;
  cargo_description: string;
  cargo_weight_kg: number;
  cargo_volume_m3: number | null;
  cargo_value: number | null;
  agreed_freight: number | null;
  currency_code: string;
  requested_pickup_at: string | null;
  requested_delivery_at: string | null;
  status: OrderStatus;
  notes: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

export function rowToOrder(r: OrderRow): TransportOrder {
  return {
    id: r.id,
    companyId: r.company_id,
    customerPartyId: r.customer_party_id,
    orderNumber: r.order_number,
    originLocationId: r.origin_location_id,
    destinationLocationId: r.destination_location_id,
    cargoDescription: r.cargo_description,
    cargoWeightKg: Number(r.cargo_weight_kg),
    cargoVolumeM3: r.cargo_volume_m3 === null ? null : Number(r.cargo_volume_m3),
    cargoValue: r.cargo_value === null ? null : Number(r.cargo_value),
    agreedFreight: r.agreed_freight === null ? null : Number(r.agreed_freight),
    currencyCode: r.currency_code,
    requestedPickupAt: r.requested_pickup_at,
    requestedDeliveryAt: r.requested_delivery_at,
    status: r.status,
    notes: r.notes,
    createdBy: r.created_by,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

export async function listOrders(
  supabase: SupabaseClient,
  companyId: string,
  status?: OrderStatus,
): Promise<TransportOrder[]> {
  let query = supabase
    .from("transport_orders")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false });
  if (status) query = query.eq("status", status);
  const { data, error } = await query;
  if (error) throw new Error(`No se pudieron consultar las órdenes: ${error.message}`);
  return (data as OrderRow[]).map(rowToOrder);
}

export async function createOrder(
  supabase: SupabaseClient,
  companyId: string,
  userId: string | null,
  input: CreateOrderInput,
): Promise<TransportOrder> {
  const parsed = createOrderSchema.parse(input); // valida ANTES de tocar la base
  const { data: existing, error: listError } = await supabase
    .from("transport_orders")
    .select("order_number")
    .eq("company_id", companyId);
  if (listError) throw new Error(`No se pudo numerar la orden: ${listError.message}`);
  const orderNumber = nextOrderNumber((existing ?? []).map((r) => r.order_number as string));

  const { data, error } = await supabase
    .from("transport_orders")
    .insert({
      company_id: companyId,
      customer_party_id: parsed.customerPartyId,
      order_number: orderNumber,
      origin_location_id: parsed.originLocationId,
      destination_location_id: parsed.destinationLocationId,
      cargo_description: parsed.cargoDescription,
      cargo_weight_kg: parsed.cargoWeightKg,
      cargo_volume_m3: parsed.cargoVolumeM3 ?? null,
      cargo_value: parsed.cargoValue ?? null,
      agreed_freight: parsed.agreedFreight ?? null,
      currency_code: parsed.currencyCode,
      notes: parsed.notes ?? null,
      status: "draft",
      created_by: userId,
    })
    .select("*")
    .single();
  if (error) throw new Error(`No se pudo crear la orden: ${error.message}`);
  return rowToOrder(data as OrderRow);
}

export async function transitionOrderStatus(
  supabase: SupabaseClient,
  order: TransportOrder,
  to: OrderStatus,
): Promise<TransportOrder> {
  assertTransition(order.status, to); // la máquina de estados manda, también en el servidor
  const { data, error } = await supabase
    .from("transport_orders")
    .update({ status: to })
    .eq("id", order.id)
    .select("*")
    .single();
  if (error) throw new Error(`No se pudo cambiar el estado: ${error.message}`);
  return rowToOrder(data as OrderRow);
}
