import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "TMS Colombia",
  description: "Laboratorio de desarrollo de software asistido por IA — Diplomado de IA (Uniempresarial). Datos ficticios y simuladores identificados como DEMO.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
