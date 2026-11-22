# TMS Colombia

**Laboratorio de desarrollo de software asistido por inteligencia artificial** — Diplomado de IA Aplicada a la Logística y Operaciones (Uniempresarial).

Diez estudiantes, diez entornos de Google Antigravity, diez módulos, **un solo repositorio, una sola arquitectura, un solo TMS**.

> El objetivo principal no es terminar un TMS a cualquier precio: es que cada estudiante aprenda a resolver problemas reales y construir software funcional utilizando inteligencia artificial. El TMS es el proyecto integrador que hace posible ese aprendizaje.

## Los seis pasos (metodología obligatoria de cada módulo)

1. **Comprender** el problema · 2. **Diseñar** la solución · 3. **Construir** con IA · 4. **Integrar** con la arquitectura común · 5. **Probar** y corregir · 6. **Entregar** y defender.

## Stack

Next.js + React + TypeScript · Supabase (PostgreSQL + Auth) · Vercel · Monolito modular.

## Los dos perfiles que el sistema soporta

- **Empresa transportadora habilitada:** ejecuta el transporte y asume las responsabilidades regulatorias.
- **Operador logístico:** administra la relación comercial y subcontrata transportadores.

El modelo de datos distingue siempre quién administra la orden (`company_id`) de quién ejecuta el viaje (`operating_carrier_id`) y quién responde por cada documento (`responsible_carrier_id`).

## Transparencia

Todos los datos son **ficticios**. Los procesos regulatorios corren en **simuladores identificados como DEMO** (`REGULATORY_MODE=mock`, `RNDC_ENABLED=false`): no existe conexión real con RNDC, DIAN ni SICE-TAC durante el diplomado, y ninguna respuesta del simulador es un radicado oficial.

## Arranque local

```bash
npm install
cp .env.example .env.local   # completar con las URL/keys del proyecto de PRUEBAS del curso
npm run dev
```

## Estructura

- `app/` rutas y páginas · `modules/` los 10 módulos (un responsable por módulo) · `core/` núcleo compartido del docente (tipos = contratos) · `integrations/` simuladores y conectores · `lib/` utilidades · `supabase/` migraciones y semilla · `docs/` documentación.

## Reglas de oro

- Nada directo a `main`: todo entra por **Pull Request** revisado por el docente.
- Los **contratos** (`core/types`) y las **migraciones** no se cambian unilateralmente.
- Si no está en el repo, no existe.
