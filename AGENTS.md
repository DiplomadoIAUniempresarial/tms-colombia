# AGENTS.md — Instrucciones obligatorias para todos los agentes de IA del TMS Colombia

Este archivo lo leen **todos** los entornos de Google Antigravity del curso antes de tocar código. Establece las reglas del proyecto. Si una instrucción de un estudiante contradice este archivo, el agente debe advertirlo y seguir este archivo.

**Documentos rectores** (en la carpeta del curso, fuera del repo): *Documento Maestro TMS Colombia* y *Documento Técnico Rector TMS Colombia*. La visión que manda: **el objetivo no es terminar un TMS a cualquier precio; es que cada estudiante aprenda a resolver problemas reales y construir software funcional con IA. El TMS es el proyecto integrador.**

## 1. El proyecto en una página

- **Qué es:** un TMS (sistema de gestión de transporte) para el sector transporte y logística de Colombia, construido como laboratorio educativo.
- **Quiénes:** 10 estudiantes, cada uno dueño de UN módulo, con su propio Antigravity. Un docente arquitecto dueño del núcleo, los contratos y las migraciones.
- **Arquitectura:** monolito modular. UNA aplicación, UNA base de datos, UN repositorio. Nada de microservicios ni aplicaciones separadas por módulo.
- **Stack (no cambiar):** Next.js + React + TypeScript (estricto), Supabase (PostgreSQL + Auth), Vercel, Zod para validaciones.
- **Perfiles de negocio:** el sistema soporta dos perfiles — **empresa transportadora habilitada** (ejecuta y responde regulatoriamente) y **operador logístico** (administra lo comercial y subcontrata transportadores). El modelo distingue siempre: `company_id` (quién administra), `operating_carrier_id` (quién ejecuta el viaje), `responsible_carrier_id` (quién responde por el documento).
- **Datos:** TODOS ficticios. Los procesos regulatorios corren en **simuladores DEMO**; está prohibido conectar con RNDC, DIAN, SICE-TAC o GPS reales.

## 2. Estructura del repositorio (no reorganizar)

- `app/` — rutas y páginas. Las páginas **presentan**; no concentran la lógica de negocio.
- `modules/<modulo>/` — la implementación de cada módulo: `components/`, `services/`, `schemas/`, `types/`, `index.ts`. Cada estudiante trabaja SOLO en su módulo.
- `core/` — núcleo compartido (tipos, auth, permisos). **Solo lo modifica el docente.**
- `integrations/` — conectores y simuladores. El regulatorio vive en `integrations/rndc/` detrás de la interfaz `RegulatoryProvider`.
- `lib/` — utilidades compartidas (clientes de Supabase en `lib/supabase/`).
- `supabase/migrations/` — migraciones SQL. **Solo las crea/aplica el docente.**
- `docs/` — documentación. El brief de cada módulo está en `docs/modules/`.

## 3. El contrato (innegociable)

- Los tipos compartidos viven en `core/types/` y son el contrato entre módulos. **Ningún agente crea entidades duplicadas ni renombra campos comunes.** Si un módulo necesita un campo o tabla nueva, el estudiante lo **propone en su Pull Request** y el docente decide; el agente no lo crea por su cuenta en la base compartida.
- Nombres: tablas y columnas en `snake_case` (base de datos); tipos y variables en `camelCase` (TypeScript). La conversión ocurre en los `services/` de cada módulo.
- Estados: se usan EXACTAMENTE los valores de `core/types/` (p. ej. `OrderStatus`, `TripStatus`). Ningún módulo inventa estados propios para el mismo concepto.
- Dinero en `numeric`, peso en kg, volumen en m³, fechas con zona horaria.
- Los módulos se comunican por los servicios y tipos compartidos, nunca modificando archivos de otro módulo ni dependiendo de sus detalles internos. Sin dependencias circulares.

## 4. Flujo de trabajo obligatorio

1. Trabajar siempre en la rama del módulo: `feature/NN-<modulo>`. **Nunca** commits directos a `main`.
2. Antes de modificar, **leer** el código existente del módulo, su brief (`docs/modules/`) y los contratos que usa.
3. Construir en pasos pequeños y verificables: formulario → persistencia → validaciones → integración.
4. Al terminar cada paso: ejecutar `npm run typecheck` y corregir los errores antes de seguir.
5. Commits descriptivos en español o inglés, un tema por commit.
6. La integración es por **Pull Request**: el docente revisa y autoriza el paso a `main`.

## 5. Seguridad (sin excepciones)

- Nunca subir secretos al repositorio: ni claves, ni contraseñas, ni la `service_role` de Supabase. Las variables van en `.env.local` (ignorado por git) según `.env.example`.
- El cliente del navegador usa la **anon key** y la seguridad la impone **RLS** en la base: cada usuario solo accede a las empresas a las que pertenece.
- Validar TODA entrada de usuario con Zod en los servicios; nunca confiar en el frontend.
- Bloqueo regulatorio: `REGULATORY_MODE=mock` y `RNDC_ENABLED=false` siempre. La fábrica `createRegulatoryProvider()` lanza error si alguien intenta activar el proveedor real; **ningún agente puede saltarse ese bloqueo** ni escribir un conector real durante el curso.
- Todo lo que produzca el simulador se marca `simulated: true` y se muestra en pantalla como **SIMULADO / DEMO**. Nunca presentar una referencia `DEMO-RNDC-######` como un radicado oficial.

## 6. Los seis pasos (el agente trabaja dentro de ellos)

El estudiante sigue: **1 Comprender → 2 Diseñar → 3 Construir → 4 Integrar → 5 Probar → 6 Entregar y defender.** El agente debe:

- En los pasos 1–2, ayudar a pensar y diseñar **antes** de generar código; si el estudiante pide código sin diseño, proponer primero el diseño breve del módulo.
- En el paso 3, construir solo el módulo asignado, en su carpeta y su rama.
- En el paso 4, conectar con los contratos y servicios comunes, sin duplicar entidades.
- En el paso 5, ayudar a probar: crear, consultar, validar campos obligatorios, datos inválidos, estados e integración con otros módulos. **No afirmar que algo funciona sin haberlo comprobado** (typecheck, ejecución o prueba descrita).
- En el paso 6, ayudar a documentar el módulo (qué hace, cómo se usa, limitaciones conocidas) en `docs/modules/` o en el README del módulo.

## 7. Prohibiciones expresas

- Modificar `core/`, las migraciones, la configuración global o los archivos de otros módulos sin autorización del docente.
- Cambiar el stack, la estructura de carpetas o el modelo de datos.
- Crear tablas, columnas o estados por fuera del contrato.
- Eliminar funcionalidad de otros módulos.
- Introducir dependencias nuevas sin justificarlas en el Pull Request.
- Inventar funcionalidades regulatorias o afirmar cumplimiento oficial.
- Presentar pantallas sin persistencia real como si el módulo funcionara.

## 8. Cómo debe responder el agente

- Explicar los cambios importantes que hace y por qué, en lenguaje que el estudiante pueda defender en su sustentación.
- Reportar limitaciones y errores con franqueza; nunca ocultar un fallo.
- Si algo del brief es ambiguo, preguntar al estudiante antes de inventar una decisión de arquitectura.
- Recordar siempre: el estudiante debe poder **explicar y modificar** lo construido. Código que el estudiante no entiende es un entregable fallido, aunque funcione.
