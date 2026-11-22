/**
 * MockRndcProvider — SIMULADOR RNDC del TMS Colombia.
 * ---------------------------------------------------------------------------
 * Herramienta EDUCATIVA. No se conecta a ningún sistema oficial, no radica
 * documentos y sus respuestas NUNCA son registros oficiales: toda respuesta
 * lleva simulated=true y referencias con formato DEMO-RNDC-######.
 *
 * Comportamiento (Documento Maestro, sección 9.3):
 * - Valida campos obligatorios por operación; si faltan, RECHAZA de forma
 *   simulada con el mensaje del campo faltante.
 * - Acepta operaciones válidas y genera referencia DEMO correlativa.
 * - Recuerda las operaciones de la sesión para getOperationStatus().
 */
import type {
  RegulatoryProvider,
  RegulatoryResult,
  RegisterThirdPartyDTO,
  RegisterVehicleDTO,
  RegisterDriverDTO,
  RegisterRemittanceDTO,
  RegisterManifestDTO,
  RegisterDeliveryDTO,
} from "../contracts/regulatory-provider";

type OperationRecord = {
  operation: string;
  status: string;
  payload: unknown;
};

function missingFields(data: Record<string, unknown>, required: string[]): string[] {
  return required.filter((f) => {
    const v = data[f];
    return v === undefined || v === null || v === "" || (Array.isArray(v) && v.length === 0);
  });
}

export class MockRndcProvider implements RegulatoryProvider {
  readonly providerName = "mock_rndc" as const;
  private counter = 0;
  private operations = new Map<string, OperationRecord>();

  private nextReference(): string {
    this.counter += 1;
    return `DEMO-RNDC-${String(this.counter).padStart(6, "0")}`;
  }

  private async run(
    operation: string,
    data: Record<string, unknown>,
    required: string[],
  ): Promise<RegulatoryResult> {
    const missing = missingFields(data, required);
    if (missing.length > 0) {
      return {
        success: false,
        simulated: true,
        externalReference: null,
        status: "rejected_simulated",
        message: `SIMULADO: registro rechazado. Campos obligatorios faltantes: ${missing.join(", ")}.`,
      };
    }
    const externalReference = this.nextReference();
    this.operations.set(externalReference, { operation, status: "accepted_simulated", payload: data });
    return {
      success: true,
      simulated: true,
      externalReference,
      status: "accepted_simulated",
      message: `SIMULADO: operación ${operation} aceptada por el simulador RNDC (sin validez oficial).`,
      responseData: { demo: true, operation },
    };
  }

  registerThirdParty(data: RegisterThirdPartyDTO) {
    return this.run("register_third_party", { ...data }, [
      "documentType",
      "documentNumber",
      "legalName",
      "responsibleCarrierId",
    ]);
  }

  registerVehicle(data: RegisterVehicleDTO) {
    return this.run("register_vehicle", { ...data }, [
      "plate",
      "vehicleType",
      "capacityKg",
      "ownerDocumentNumber",
      "responsibleCarrierId",
    ]);
  }

  registerDriver(data: RegisterDriverDTO) {
    return this.run("register_driver", { ...data }, [
      "documentNumber",
      "fullName",
      "licenseNumber",
      "licenseCategory",
      "licenseExpiration",
      "responsibleCarrierId",
    ]);
  }

  registerRemittance(data: RegisterRemittanceDTO) {
    return this.run("register_remittance", { ...data }, [
      "remittanceId",
      "customerDocumentNumber",
      "originCity",
      "destinationCity",
      "cargoDescription",
      "cargoWeightKg",
      "responsibleCarrierId",
    ]);
  }

  registerManifest(data: RegisterManifestDTO) {
    return this.run("register_manifest", { ...data }, [
      "manifestId",
      "tripId",
      "remittanceIds",
      "vehiclePlate",
      "driverDocumentNumber",
      "issueDate",
      "responsibleCarrierId",
    ]);
  }

  registerDelivery(data: RegisterDeliveryDTO) {
    return this.run("register_delivery", { ...data }, [
      "remittanceId",
      "deliveredAt",
      "receivedBy",
      "deliveryStatus",
      "responsibleCarrierId",
    ]);
  }

  async getOperationStatus(operationId: string): Promise<RegulatoryResult> {
    const record = this.operations.get(operationId);
    if (!record) {
      return {
        success: false,
        simulated: true,
        externalReference: null,
        status: "not_found_simulated",
        message: `SIMULADO: no existe una operación con referencia ${operationId} en el simulador.`,
      };
    }
    return {
      success: true,
      simulated: true,
      externalReference: operationId,
      status: record.status,
      message: `SIMULADO: estado de la operación ${record.operation} en el simulador RNDC.`,
      responseData: record.payload,
    };
  }
}

/** Fábrica: durante el diplomado SIEMPRE devuelve el simulador. */
export function createRegulatoryProvider(): RegulatoryProvider {
  const mode = process.env.REGULATORY_MODE ?? "mock";
  const rndcEnabled = process.env.RNDC_ENABLED === "true";
  if (mode !== "mock" || rndcEnabled) {
    throw new Error(
      "TMS Colombia: el proveedor regulatorio REAL está bloqueado durante el diplomado (REGULATORY_MODE=mock, RNDC_ENABLED=false).",
    );
  }
  return new MockRndcProvider();
}
