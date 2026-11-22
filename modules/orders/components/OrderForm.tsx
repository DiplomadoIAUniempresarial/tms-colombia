"use client";

import { useState } from "react";
import { createOrderSchema, type CreateOrderInput } from "../schemas/order.schema";

/**
 * Módulo 02 · Formulario de orden.
 * Valida con el MISMO esquema Zod del servicio: lo que el formulario acepta
 * es exactamente lo que el servicio aceptaría (una sola fuente de verdad).
 */
export type OrderFormProps = {
  customers: Array<{ id: string; label: string }>;
  locations: Array<{ id: string; label: string }>;
  onSubmit: (input: CreateOrderInput) => void;
};

export function OrderForm({ customers, locations, onSubmit }: OrderFormProps) {
  const [errors, setErrors] = useState<string[]>([]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const candidate = {
      customerPartyId: String(fd.get("customerPartyId") ?? ""),
      originLocationId: String(fd.get("originLocationId") ?? ""),
      destinationLocationId: String(fd.get("destinationLocationId") ?? ""),
      cargoDescription: String(fd.get("cargoDescription") ?? ""),
      cargoWeightKg: Number(fd.get("cargoWeightKg")),
      cargoVolumeM3: fd.get("cargoVolumeM3") ? Number(fd.get("cargoVolumeM3")) : undefined,
      cargoValue: fd.get("cargoValue") ? Number(fd.get("cargoValue")) : undefined,
      agreedFreight: fd.get("agreedFreight") ? Number(fd.get("agreedFreight")) : undefined,
      currencyCode: "COP",
      notes: String(fd.get("notes") ?? "") || undefined,
    };
    const result = createOrderSchema.safeParse(candidate);
    if (!result.success) {
      setErrors(result.error.issues.map((i) => i.message));
      return;
    }
    setErrors([]);
    onSubmit(result.data);
    e.currentTarget.reset();
  }

  const field = { display: "block", marginBottom: 10 } as const;
  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 520 }}>
      <label style={field}>
        Cliente
        <select name="customerPartyId" required style={{ display: "block", width: "100%" }}>
          <option value="">Selecciona un cliente…</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>{c.label}</option>
          ))}
        </select>
      </label>
      <label style={field}>
        Origen
        <select name="originLocationId" required style={{ display: "block", width: "100%" }}>
          <option value="">Selecciona el origen…</option>
          {locations.map((l) => (
            <option key={l.id} value={l.id}>{l.label}</option>
          ))}
        </select>
      </label>
      <label style={field}>
        Destino
        <select name="destinationLocationId" required style={{ display: "block", width: "100%" }}>
          <option value="">Selecciona el destino…</option>
          {locations.map((l) => (
            <option key={l.id} value={l.id}>{l.label}</option>
          ))}
        </select>
      </label>
      <label style={field}>
        Mercancía
        <input name="cargoDescription" required style={{ display: "block", width: "100%" }} placeholder="Productos de consumo empacados" />
      </label>
      <label style={field}>
        Peso (kg)
        <input name="cargoWeightKg" type="number" min="0" step="any" required style={{ display: "block", width: "100%" }} />
      </label>
      <label style={field}>
        Volumen (m³, opcional)
        <input name="cargoVolumeM3" type="number" min="0" step="any" style={{ display: "block", width: "100%" }} />
      </label>
      <label style={field}>
        Valor comercial (COP, opcional)
        <input name="cargoValue" type="number" min="0" step="any" style={{ display: "block", width: "100%" }} />
      </label>
      <label style={field}>
        Flete acordado (COP, opcional)
        <input name="agreedFreight" type="number" min="0" step="any" style={{ display: "block", width: "100%" }} />
      </label>
      <label style={field}>
        Notas
        <input name="notes" style={{ display: "block", width: "100%" }} />
      </label>
      {errors.length > 0 && (
        <ul style={{ color: "#b00020" }}>
          {errors.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      )}
      <button type="submit">Crear orden</button>
    </form>
  );
}
