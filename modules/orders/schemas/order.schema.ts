import { z } from "zod";

/**
 * Módulo 02 · Órdenes — esquema de validación (Zod).
 * Reglas del brief 02: peso > 0, origen ≠ destino, cliente obligatorio.
 */
export const createOrderSchema = z
  .object({
    customerPartyId: z.string().uuid("Debes seleccionar un cliente válido"),
    originLocationId: z.string().uuid("Debes seleccionar un origen válido"),
    destinationLocationId: z.string().uuid("Debes seleccionar un destino válido"),
    cargoDescription: z.string().min(3, "Describe la mercancía"),
    cargoWeightKg: z.number().positive("El peso debe ser mayor que cero"),
    cargoVolumeM3: z.number().positive("El volumen debe ser mayor que cero").optional(),
    cargoValue: z.number().nonnegative("El valor comercial no puede ser negativo").optional(),
    agreedFreight: z.number().nonnegative("El flete no puede ser negativo").optional(),
    currencyCode: z.string().length(3).default("COP"),
    notes: z.string().optional(),
  })
  .refine((d) => d.originLocationId !== d.destinationLocationId, {
    message: "El origen y el destino no pueden ser el mismo punto",
    path: ["destinationLocationId"],
  });

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
