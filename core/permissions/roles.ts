/**
 * TMS Colombia — Roles y matriz de permisos sencilla (Documento Técnico §5.2 y §22).
 * La autorización real la impone RLS en la base de datos; esta matriz guía la
 * interfaz y los servicios. Cambios: solo por PR aprobado por el docente.
 */
import type { UserRole } from "../types";

export const MODULE_KEYS = [
  "crm",
  "orders",
  "planning",
  "fleet",
  "drivers",
  "compliance",
  "control-tower",
  "deliveries",
  "finance",
  "safety-bi",
] as const;

export type ModuleKey = (typeof MODULE_KEYS)[number];

export type AccessLevel = "none" | "read" | "write";

const READ_ALL: Record<ModuleKey, AccessLevel> = {
  crm: "read", orders: "read", planning: "read", fleet: "read", drivers: "read",
  compliance: "read", "control-tower": "read", deliveries: "read", finance: "read", "safety-bi": "read",
};
const WRITE_ALL: Record<ModuleKey, AccessLevel> = {
  crm: "write", orders: "write", planning: "write", fleet: "write", drivers: "write",
  compliance: "write", "control-tower": "write", deliveries: "write", finance: "write", "safety-bi": "write",
};

export const ROLE_PERMISSIONS: Record<UserRole, Record<ModuleKey, AccessLevel>> = {
  admin: WRITE_ALL,
  manager: WRITE_ALL,
  commercial: { ...READ_ALL, crm: "write", orders: "write" },
  operations: { ...READ_ALL, orders: "write", planning: "write", fleet: "write", drivers: "write", "control-tower": "write", deliveries: "write" },
  compliance: { ...READ_ALL, compliance: "write" },
  finance: { ...READ_ALL, finance: "write" },
  viewer: READ_ALL,
};
