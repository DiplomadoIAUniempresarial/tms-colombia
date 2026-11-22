import type { ReactNode } from "react";

const MODULES: Array<{ href: string; label: string }> = [
  { href: "/dashboard", label: "Tablero" },
  { href: "/crm", label: "01 · CRM y gestión comercial" },
  { href: "/ordenes", label: "02 · Órdenes de transporte" },
  { href: "/planeacion", label: "03 · Planeación y despachos" },
  { href: "/flota", label: "04 · Flota y proveedores" },
  { href: "/conductores", label: "05 · Conductores" },
  { href: "/cumplimiento", label: "06 · Cumplimiento y simulador RNDC" },
  { href: "/torre-control", label: "07 · Torre de control" },
  { href: "/entregas", label: "08 · Entregas y POD" },
  { href: "/finanzas", label: "09 · Finanzas y liquidación" },
  { href: "/seguridad-bi", label: "10 · Seguridad vial e indicadores" },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "system-ui" }}>
      <nav style={{ width: 280, borderRight: "1px solid #ddd", padding: 16 }}>
        <strong>TMS Colombia</strong>
        <ul style={{ listStyle: "none", padding: 0, lineHeight: 2 }}>
          {MODULES.map((m) => (
            <li key={m.href}>
              <a href={m.href}>{m.label}</a>
            </li>
          ))}
        </ul>
        <p style={{ fontSize: 12, color: "#666" }}>
          Datos ficticios · Procesos regulatorios en simulador DEMO.
        </p>
      </nav>
      <main style={{ flex: 1, padding: 24 }}>{children}</main>
    </div>
  );
}
