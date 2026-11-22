/**
 * TMS Colombia — Contrato de integración regulatoria (integrations/rndc)
 * ---------------------------------------------------------------------------
 * Fuente: Documento Técnico Rector, sección 18.
 * PRINCIPIO DE DESACOPLAMIENTO: los módulos operativos NUNCA dependen del RNDC
 * directamente; usan esta interfaz. Durante el diplomado el único proveedor
 * activo es MockRndcProvider (REGULATORY_MODE=mock, RNDC_ENABLED=false).
 * RealRndcProvider queda reservado para una fase posterior al curso.
 */

export type RegulatoryResult = {
  success: boolean;
  /** true = la respuesta proviene del simulador. SIEMPRE true en el diplomado. */
  simulated: boolean;
  /** Referencia externa; en el simulador tiene formato DEMO-RNDC-000000. */
  externalReference: string | null;
  status: string;
  message: string;
  responseData?: unknown;
};

// --- DTOs de entrada (tipados; nada de `unknown` en la implementación) -------

export interface RegisterThirdPartyDTO {
  companyId: string;
  responsibleCarrierId: string;
  documentType: string;
  documentNumber: string;
  legalName: string;
  email?: string;
  phone?: string;
}

export interface RegisterVehicleDTO {
  companyId: string;
  responsibleCarrierId: string;
  plate: string;
  vehicleType: string;
  capacityKg: number;
  ownerDocumentNumber: string;
}

export interface RegisterDriverDTO {
  companyId: string;
  responsibleCarrierId: string;
  documentNumber: string;
  fullName: string;
  licenseNumber: string;
  licenseCategory: string;
  licenseExpiration: string; // date
}

export interface RegisterRemittanceDTO {
  companyId: string;
  responsibleCarrierId: string;
  remittanceId: string;
  customerDocumentNumber: string;
  originCity: string;
  destinationCity: string;
  cargoDescription: string;
  cargoWeightKg: number;
}

export interface RegisterManifestDTO {
  companyId: string;
  responsibleCarrierId: string;
  manifestId: string;
  tripId: string;
  remittanceIds: string[];
  vehiclePlate: string;
  driverDocumentNumber: string;
  issueDate: string; // date
}

export interface RegisterDeliveryDTO {
  companyId: string;
  responsibleCarrierId: string;
  remittanceId: string;
  deliveredAt: string;
  receivedBy: string;
  deliveryStatus: string;
}

export interface RegulatoryProvider {
  registerThirdParty(data: RegisterThirdPartyDTO): Promise<RegulatoryResult>;
  registerVehicle(data: RegisterVehicleDTO): Promise<RegulatoryResult>;
  registerDriver(data: RegisterDriverDTO): Promise<RegulatoryResult>;
  registerRemittance(data: RegisterRemittanceDTO): Promise<RegulatoryResult>;
  registerManifest(data: RegisterManifestDTO): Promise<RegulatoryResult>;
  registerDelivery(data: RegisterDeliveryDTO): Promise<RegulatoryResult>;
  getOperationStatus(operationId: string): Promise<RegulatoryResult>;
}
