import { OrdersPilot } from "../../../modules/orders/components/OrdersPilot";

export default function OrdenesPage() {
  return (
    <section>
      <h1>02 · Órdenes de transporte</h1>
      <p>
        Toda operación nace aquí: la solicitud del cliente con su carga, su ruta y su flete
        acordado. Este es el <strong>módulo piloto</strong>: el estándar de estructura y de
        reglas que los demás módulos deben igualar.
      </p>
      <OrdersPilot />
    </section>
  );
}
