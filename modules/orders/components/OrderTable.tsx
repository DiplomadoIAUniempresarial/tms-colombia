import type { OrderStatus, TransportOrder } from "../../../core/types";
import { ORDER_TRANSITIONS } from "../services/order.rules";

/**
 * Módulo 02 · Tabla de órdenes (componente de presentación).
 * Recibe datos y callbacks por props: no conoce la base de datos.
 */
export type OrderTableProps = {
  orders: TransportOrder[];
  customerName: (partyId: string) => string;
  locationName: (locationId: string) => string;
  onTransition?: (order: TransportOrder, to: OrderStatus) => void;
};

const STATUS_LABEL: Record<OrderStatus, string> = {
  draft: "Borrador",
  pending: "Pendiente",
  approved: "Aprobada",
  planned: "Planeada",
  in_transit: "En tránsito",
  delivered: "Entregada",
  cancelled: "Cancelada",
};

export function OrderTable({ orders, customerName, locationName, onTransition }: OrderTableProps) {
  if (orders.length === 0) return <p>No hay órdenes registradas todavía.</p>;
  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          {["Número", "Cliente", "Ruta", "Mercancía", "Peso (kg)", "Flete", "Estado", "Acciones"].map((h) => (
            <th key={h} style={{ textAlign: "left", borderBottom: "2px solid #ccc", padding: 6 }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {orders.map((o) => (
          <tr key={o.id}>
            <td style={{ padding: 6 }}>{o.orderNumber}</td>
            <td style={{ padding: 6 }}>{customerName(o.customerPartyId)}</td>
            <td style={{ padding: 6 }}>{locationName(o.originLocationId)} → {locationName(o.destinationLocationId)}</td>
            <td style={{ padding: 6 }}>{o.cargoDescription}</td>
            <td style={{ padding: 6 }}>{o.cargoWeightKg.toLocaleString("es-CO")}</td>
            <td style={{ padding: 6 }}>
              {o.agreedFreight === null ? "—" : `$${o.agreedFreight.toLocaleString("es-CO")} ${o.currencyCode}`}
            </td>
            <td style={{ padding: 6 }}>{STATUS_LABEL[o.status]}</td>
            <td style={{ padding: 6 }}>
              {onTransition &&
                ORDER_TRANSITIONS[o.status].map((to) => (
                  <button key={to} onClick={() => onTransition(o, to)} style={{ marginRight: 4 }}>
                    {STATUS_LABEL[to]}
                  </button>
                ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
