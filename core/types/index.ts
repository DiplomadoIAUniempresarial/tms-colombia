/**
 * TMS Colombia — CONTRATOS COMPARTIDOS (core/types)
 * ---------------------------------------------------------------------------
 * Fuente: Documento Técnico Rector, secciones 5 a 18.
 * REGLA: estos tipos son el contrato entre los diez módulos. Ningún estudiante
 * ni agente de IA puede modificarlos unilateralmente: todo cambio se propone
 * por Pull Request y lo aprueba el docente arquitecto.
 *
 * Convención: TypeScript en camelCase; la base de datos en snake_case.
 * La conversión se hace en los servicios de cada módulo.
 */

// ---------------------------------------------------------------------------
// Valores controlados (estados). Ningún módulo inventa nombres propios
// para el mismo estado: se usan exactamente estos.
// ---------------------------------------------------------------------------

export type CompanyType = "carrier" | "logistics_operator" | "mixed" | "other";

export type UserRole =
  | "admin"
  | "manager"
  | "commercial"
  | "operations"
  | "compliance"
  | "finance"
  | "viewer";

export type PartyType = "person" | "organization";

export type PartyRoleType = "customer" | "supplier" | "carrier" | "owner" | "other";

export type VehicleStatus =
  | "available"
  | "in_route"
  | "in_maintenance"
  | "out_of_service";

export type DriverStatus = "active" | "inactive" | "suspended";

export type OrderStatus =
  | "draft"
  | "pending"
  | "approved"
  | "planned"
  | "in_transit"
  | "delivered"
  | "cancelled";

export type TripStatus =
  | "planned"
  | "assigned"
  | "ready_for_dispatch"
  | "dispatched"
  | "in_transit"
  | "at_destination"
  | "delivered"
  | "closed"
  | "cancelled";

export type DocumentMode = "internal" | "simulated" | "official";

export type RemittanceStatus = "draft" | "issued" | "simulated" | "annulled";

export type ManifestStatus = "draft" | "issued" | "simulated" | "annulled";

export type TripEventType =
  | "trip_created"
  | "vehicle_assigned"
  | "driver_assigned"
  | "dispatch"
  | "departure"
  | "checkpoint"
  | "delay"
  | "incident"
  | "arrival"
  | "delivery"
  | "closure";

export type TripEventSource = "manual" | "simulated" | "integration";

export type DeliveryStatus =
  | "pending"
  | "delivered"
  | "partial"
  | "rejected"
  | "with_observations";

export type CostType =
  | "fuel"
  | "toll"
  | "driver_payment"
  | "carrier_payment"
  | "loading"
  | "unloading"
  | "maintenance"
  | "other";

export type SettlementStatus = "draft" | "calculated" | "approved" | "paid";

export type InspectionResult = "approved" | "approved_with_observations" | "rejected";

// ---------------------------------------------------------------------------
// Núcleo: empresas, usuarios y membresías (Documento Técnico, sección 5)
// ---------------------------------------------------------------------------

export interface Company {
  id: string;
  legalName: string;
  tradeName: string | null;
  taxId: string | null;
  companyType: CompanyType;
  countryCode: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Profile {
  id: string; // = auth.users.id
  fullName: string;
  email: string;
  phone: string | null;
  createdAt: string;
}

export interface CompanyMembership {
  id: string;
  companyId: string;
  userId: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Terceros y ubicaciones (secciones 6 y 7)
// ---------------------------------------------------------------------------

export interface Party {
  id: string;
  companyId: string; // empresa que administra el registro
  partyType: PartyType;
  documentType: string | null;
  documentNumber: string | null;
  legalName: string;
  tradeName: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  countryCode: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PartyRole {
  id: string;
  partyId: string;
  roleType: PartyRoleType;
}

export interface Location {
  id: string;
  companyId: string;
  name: string;
  address: string | null;
  city: string;
  department: string | null;
  countryCode: string;
  latitude: number | null;
  longitude: number | null;
  reference: string | null;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Flota y conductores (sección 8)
// ---------------------------------------------------------------------------

export interface Vehicle {
  id: string;
  companyId: string; // empresa que administra el registro
  ownerPartyId: string | null;
  carrierCompanyId: string | null; // transportadora asociada a la ejecución (≠ propietario)
  plate: string;
  vehicleType: string;
  brand: string | null;
  model: string | null;
  capacityKg: number;
  capacityM3: number | null;
  status: VehicleStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Driver {
  id: string;
  companyId: string;
  partyId: string;
  licenseNumber: string;
  licenseCategory: string;
  licenseExpiration: string; // date (YYYY-MM-DD)
  phone: string | null;
  status: DriverStatus;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Órdenes y viajes (secciones 9 y 10)
// ---------------------------------------------------------------------------

export interface TransportOrder {
  id: string;
  companyId: string; // empresa que administra la relación comercial
  customerPartyId: string;
  orderNumber: string;
  originLocationId: string;
  destinationLocationId: string;
  cargoDescription: string;
  cargoWeightKg: number;
  cargoVolumeM3: number | null;
  cargoValue: number | null;
  agreedFreight: number | null;
  currencyCode: string;
  requestedPickupAt: string | null;
  requestedDeliveryAt: string | null;
  status: OrderStatus;
  notes: string | null;
  createdBy: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Trip {
  id: string;
  companyId: string; // empresa que administra la operación
  transportOrderId: string | null; // orden principal (MVP); ver TripOrder para consolidación
  operatingCarrierId: string; // transportador que EJECUTA (≠ companyId cuando hay operador logístico)
  vehicleId: string | null;
  driverId: string | null;
  originLocationId: string;
  destinationLocationId: string;
  plannedDepartureAt: string | null;
  actualDepartureAt: string | null;
  plannedArrivalAt: string | null;
  actualArrivalAt: string | null;
  status: TripStatus;
  createdAt: string;
  updatedAt: string;
}

export interface TripOrder {
  id: string;
  tripId: string;
  transportOrderId: string;
  assignedWeightKg: number;
  assignedVolumeM3: number | null;
}

// ---------------------------------------------------------------------------
// Documentación de transporte (sección 11)
// ---------------------------------------------------------------------------

export interface TransportRemittance {
  id: string;
  companyId: string;
  responsibleCarrierId: string; // empresa con la responsabilidad regulatoria de la remesa
  transportOrderId: string;
  tripId: string | null;
  remittanceNumber: string;
  cargoDescription: string;
  cargoWeightKg: number;
  originLocationId: string;
  destinationLocationId: string;
  status: RemittanceStatus;
  documentMode: DocumentMode;
  createdAt: string;
}

export interface TransportManifest {
  id: string;
  companyId: string;
  responsibleCarrierId: string;
  tripId: string;
  manifestNumber: string;
  issueDate: string; // date
  status: ManifestStatus;
  documentMode: DocumentMode;
  createdAt: string;
}

export interface ManifestRemittance {
  id: string;
  manifestId: string;
  remittanceId: string;
}

// ---------------------------------------------------------------------------
// Seguimiento, entregas y documentos (secciones 12, 13 y 14)
// ---------------------------------------------------------------------------

export interface TripEvent {
  id: string;
  companyId: string;
  tripId: string;
  eventType: TripEventType;
  description: string | null;
  locationId: string | null;
  eventAt: string;
  source: TripEventSource;
  createdBy: string | null;
  createdAt: string;
}

export interface DeliveryRecord {
  id: string;
  companyId: string;
  tripId: string;
  transportOrderId: string;
  deliveredAt: string;
  receivedBy: string;
  receiverDocument: string | null;
  deliveryStatus: DeliveryStatus;
  observations: string | null;
  createdBy: string | null;
  createdAt: string;
}

export interface DocumentRecord {
  id: string;
  companyId: string;
  entityType: string;
  entityId: string;
  documentType: string;
  fileName: string;
  storagePath: string;
  documentMode: DocumentMode;
  status: string;
  uploadedBy: string | null;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Finanzas (sección 15)
// ---------------------------------------------------------------------------

export interface TripCost {
  id: string;
  companyId: string;
  tripId: string;
  costType: CostType;
  description: string | null;
  amount: number;
  currencyCode: string;
  incurredAt: string;
  createdBy: string | null;
  createdAt: string;
}

export interface TripSettlement {
  id: string;
  companyId: string;
  tripId: string;
  grossRevenue: number;
  totalCost: number;
  grossProfit: number;
  marginPercentage: number | null; // null si grossRevenue = 0 (no se calcula margen)
  currencyCode: string;
  status: SettlementStatus;
  calculatedAt: string;
}

// ---------------------------------------------------------------------------
// Seguridad vial y auditoría (secciones 16 y 17)
// ---------------------------------------------------------------------------

export interface VehicleInspection {
  id: string;
  companyId: string;
  vehicleId: string;
  driverId: string | null;
  inspectionDate: string;
  inspectionType: string;
  result: InspectionResult;
  observations: string | null;
  createdBy: string | null;
}

export interface AuditEvent {
  id: string;
  companyId: string;
  userId: string | null;
  entityType: string;
  entityId: string;
  action: string;
  oldData: Record<string, unknown> | null;
  newData: Record<string, unknown> | null;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Integración regulatoria (sección 18)
// ---------------------------------------------------------------------------

export interface RegulatoryTransaction {
  id: string;
  companyId: string;
  responsibleCarrierId: string | null;
  entityType: string;
  entityId: string;
  provider: "mock_rndc" | "real_rndc";
  operation: string;
  requestPayload: Record<string, unknown>;
  responsePayload: Record<string, unknown> | null;
  externalReference: string | null;
  status: string;
  simulated: boolean;
  idempotencyKey: string | null;
  createdAt: string;
}
