const NAVY = "#0b2a5b";
const LIGHT = "#eef2f8";
const AMBER = "#b45309";

const btnBase: React.CSSProperties = {
  display: "inline-block",
  padding: "12px 22px",
  borderRadius: 10,
  fontWeight: 600,
  textDecoration: "none",
  fontSize: 16,
};

const kpiCard: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #d7dee9",
  borderRadius: 12,
  padding: "14px 16px",
  minWidth: 150,
  flex: "1 1 150px",
};

const chip: React.CSSProperties = {
  display: "inline-block",
  padding: "4px 10px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 600,
};

const MODULES: Array<{ name: string; state: string; color: string; bg: string }> = [
  { name: "01 · CRM y gestión comercial", state: "Por construir", color: "#475569", bg: "#e2e8f0" },
  { name: "02 · Órdenes de transporte", state: "Piloto en vivo", color: "#166534", bg: "#dcfce7" },
  { name: "03 · Planeación y despachos", state: "Por construir", color: "#475569", bg: "#e2e8f0" },
  { name: "04 · Flota y proveedores", state: "Por construir", color: "#475569", bg: "#e2e8f0" },
  { name: "05 · Conductores", state: "Por construir", color: "#475569", bg: "#e2e8f0" },
  { name: "06 · Cumplimiento y simulador RNDC", state: "Por construir", color: "#475569", bg: "#e2e8f0" },
  { name: "07 · Torre de control", state: "Por construir", color: "#475569", bg: "#e2e8f0" },
  { name: "08 · Entregas y pruebas de entrega", state: "Por construir", color: "#475569", bg: "#e2e8f0" },
  { name: "09 · Finanzas y liquidación", state: "Por construir", color: "#475569", bg: "#e2e8f0" },
  { name: "10 · Seguridad vial e indicadores", state: "Por construir", color: "#475569", bg: "#e2e8f0" },
];

export default function HomePage() {
  return (
    <main
      style={{
        fontFamily: "system-ui",
        padding: "40px 24px 64px",
        maxWidth: 980,
        margin: "0 auto",
        color: "#1e293b",
      }}
    >
      <h1 style={{ fontSize: 44, margin: "0 0 8px", color: NAVY }}>TMS Colombia</h1>
      <p style={{ fontSize: 18, margin: "0 0 12px", maxWidth: 720 }}>
        Sistema de gestión de transporte construido por los estudiantes del
        Diplomado de IA (Uniempresarial) con inteligencia artificial dirigida.
      </p>
      <p style={{ margin: "0 0 28px" }}>
        <span style={{ ...chip, color: AMBER, background: "#fef3c7" } as React.CSSProperties}>
          Entorno educativo · datos ficticios · regulatorio en simuladores DEMO
        </span>
      </p>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 14 }}>
        <a href="/login" style={{ ...btnBase, background: NAVY, color: "#fff" }}>
          Ingresar
        </a>
        <a
          href="/dashboard"
          style={{ ...btnBase, background: "#fff", color: NAVY, border: `2px solid ${NAVY}` }}
        >
          Ver el tablero
        </a>
        <a href="#vision" style={{ ...btnBase, background: AMBER, color: "#fff" }}>
          Así se verá el TMS terminado ↓
        </a>
      </div>
      <p style={{ margin: "0 0 44px", fontSize: 15 }}>
        ¿Quieres ver una pantalla real ya funcionando?{" "}
        <a href="/ordenes" style={{ color: NAVY, fontWeight: 600 }}>
          Abre el módulo piloto de Órdenes de transporte
        </a>{" "}
        — corre con los datos DEMO del escenario común.
      </p>

      <section id="vision" aria-label="Visión del producto terminado">
        <div
          style={{
            border: "2px dashed #94a3b8",
            borderRadius: 16,
            overflow: "hidden",
            background: LIGHT,
          }}
        >
          <div
            style={{
              background: "#f1f5f9",
              borderBottom: "1px solid #cbd5e1",
              padding: "10px 18px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            <strong style={{ fontSize: 14, letterSpacing: 0.4 }}>
              MAQUETA · VISIÓN DEL PRODUCTO TERMINADO
            </strong>
            <span style={{ fontSize: 13, color: "#64748b" }}>
              Esto es lo que vamos a construir entre todos — hoy es la imagen de
              llegada, no datos reales.
            </span>
          </div>

          <div style={{ padding: "20px 18px 8px" }}>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 18 }}>
              <div style={kpiCard}>
                <div style={{ fontSize: 13, color: "#64748b" }}>Viajes activos</div>
                <div style={{ fontSize: 30, fontWeight: 700, color: NAVY }}>12</div>
              </div>
              <div style={kpiCard}>
                <div style={{ fontSize: 13, color: "#64748b" }}>Entregas a tiempo</div>
                <div style={{ fontSize: 30, fontWeight: 700, color: NAVY }}>96%</div>
              </div>
              <div style={kpiCard}>
                <div style={{ fontSize: 13, color: "#64748b" }}>Margen del escenario común</div>
                <div style={{ fontSize: 30, fontWeight: 700, color: NAVY }}>28%</div>
              </div>
              <div style={kpiCard}>
                <div style={{ fontSize: 13, color: "#64748b" }}>Alertas de seguridad vial</div>
                <div style={{ fontSize: 30, fontWeight: 700, color: "#b91c1c" }}>2</div>
              </div>
            </div>

            <div
              style={{
                background: "#fff",
                border: "1px solid #d7dee9",
                borderRadius: 12,
                padding: "14px 16px",
                marginBottom: 18,
                overflowX: "auto",
              }}
            >
              <strong style={{ display: "block", marginBottom: 10 }}>
                Torre de control — viaje del escenario común
              </strong>
              <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 14 }}>
                <thead>
                  <tr style={{ textAlign: "left", color: "#64748b" }}>
                    <th style={{ padding: "6px 8px" }}>Orden</th>
                    <th style={{ padding: "6px 8px" }}>Cliente</th>
                    <th style={{ padding: "6px 8px" }}>Ruta</th>
                    <th style={{ padding: "6px 8px" }}>Transportadora</th>
                    <th style={{ padding: "6px 8px" }}>Vehículo · Conductor</th>
                    <th style={{ padding: "6px 8px" }}>Estado</th>
                    <th style={{ padding: "6px 8px" }}>Flete · Margen</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderTop: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "6px 8px" }}>OT-0001</td>
                    <td style={{ padding: "6px 8px" }}>Comercializadora del Centro S.A.S.</td>
                    <td style={{ padding: "6px 8px" }}>Bogotá → Medellín</td>
                    <td style={{ padding: "6px 8px" }}>Transportes Andinos S.A.S.</td>
                    <td style={{ padding: "6px 8px" }}>TMS001 · Juan Pérez</td>
                    <td style={{ padding: "6px 8px" }}>
                      <span style={{ ...chip, color: "#1d4ed8", background: "#dbeafe" }}>En tránsito</span>
                    </td>
                    <td style={{ padding: "6px 8px" }}>$5.000.000 · 28%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ marginBottom: 14 }}>
              <strong style={{ display: "block", marginBottom: 10 }}>
                Los diez módulos — cada uno será de uno de ustedes
              </strong>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {MODULES.map((m) => (
                  <span
                    key={m.name}
                    style={{
                      background: "#fff",
                      border: "1px solid #d7dee9",
                      borderRadius: 999,
                      padding: "6px 12px",
                      fontSize: 13,
                    }}
                  >
                    {m.name}{" "}
                    <span style={{ ...chip, color: m.color, background: m.bg, marginLeft: 4 }}>
                      {m.state}
                    </span>
                  </span>
                ))}
              </div>
            </div>

            <p style={{ fontSize: 14, color: "#475569", margin: "6px 0 14px" }}>
              El 4 de diciembre esta maqueta será el sistema real: cada tarjeta,
              cada cifra y cada módulo funcionando con persistencia, construido
              por su dueño y defendido en la sustentación.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
