export default function HomePage() {
  return (
    <main style={{ fontFamily: "system-ui", padding: 32, maxWidth: 760 }}>
      <h1>TMS Colombia</h1>
      <p>
        Sistema de gestión de transporte construido por los estudiantes del
        Diplomado de IA (Uniempresarial) con inteligencia artificial dirigida.
      </p>
      <p>
        <strong>Entorno educativo:</strong> todos los datos son ficticios y los
        procesos regulatorios corren en simuladores identificados como DEMO.
      </p>
      <p>
        <a href="/login">Ingresar</a> · <a href="/dashboard">Tablero</a>
      </p>
    </main>
  );
}
