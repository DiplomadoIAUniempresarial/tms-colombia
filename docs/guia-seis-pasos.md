# Guía del estudiante — Los seis pasos
## TMS Colombia · Diplomado de IA Aplicada a la Logística y Operaciones

**La idea central de este laboratorio:** el objetivo no es terminar un TMS a cualquier precio. Es que **aprendas a resolver problemas reales y construir software funcional dirigiendo una inteligencia artificial**. El TMS es el proyecto que hace posible ese aprendizaje, y tu módulo es tu responsabilidad individual dentro de un sistema que construimos entre todos.

Por eso cada módulo se trabaja con los mismos seis pasos, en orden, sin saltarse ninguno. La evaluación no premia la pantalla más bonita: premia el aprendizaje que puedas **demostrar y defender**.

---

## PASO 1 · Comprender el problema

Antes de abrir Antigravity, responde por escrito (en el documento de tu módulo):

- ¿Qué problema operativo real resuelve tu módulo? ¿Qué pasa hoy en una empresa cuando esto se hace mal o a mano?
- ¿Qué proceso logístico es y dónde encaja en el flujo completo (cliente → orden → viaje → documentos → seguimiento → entrega → liquidación)?
- ¿Quién lo usa (rol) y qué necesita ver y hacer?
- ¿Qué información **consume** tu módulo y qué información **produce** para los demás?
- ¿Qué errores o riesgos debe evitar?

**Entregable:** la descripción del problema, el usuario, el proceso y el resultado esperado.
**Trampa típica:** empezar a programar «para avanzar». Sin este paso, construirás la solución equivocada con mucha eficiencia.

## PASO 2 · Diseñar la solución

Con el problema claro, diseña **antes** de generar código:

- Funcionalidades y pantallas (lista, formulario, detalle: qué muestra cada una).
- Formularios: campos, cuáles son obligatorios, qué validaciones llevan.
- Entidades y datos que usas — **del modelo común** (`core/types/`): identifica qué tipos y tablas son los tuyos y cuáles consumes de otros.
- Reglas de negocio y estados del proceso (usa los valores controlados del contrato, no inventes los tuyos).
- Cómo se conecta tu módulo con los demás: qué les entregas y qué necesitas de ellos.

Usa Antigravity como asistente de diseño: pídele que te proponga y te cuestione, y **aprueba tú** la propuesta. Si no entiendes el diseño, no podrás defender el código.

**Entregable:** el diseño funcional y técnico simplificado de tu módulo.

## PASO 3 · Construir con inteligencia artificial

Ahora sí, a construir en tu entorno de Antigravity, en tu rama (`feature/NN-tu-modulo`) y tu carpeta (`modules/tu-modulo/`):

- Da instrucciones claras y con contexto: tu brief (`docs/modules/`), el diseño del Paso 2 y los contratos que usas. Instrucciones vagas producen código vago.
- Construye en pasos pequeños y verificables: primero que guarde y consulte (persistencia real), luego validaciones, luego la integración.
- **Revisa lo que el agente genera**: abre los archivos, identifica qué hace cada pieza. Si algo no lo entiendes, pídele que te lo explique o que lo simplifique — es tu código, no el suyo.
- Respeta el `AGENTS.md` del proyecto: nada de tocar el núcleo, los contratos, las migraciones ni los módulos de tus compañeros. Si necesitas un cambio compartido, lo propones en tu Pull Request.
- Después de cada avance: `npm run typecheck` en verde y commit descriptivo.

**Entregable:** la primera versión funcional de tu módulo, persistiendo en la base de datos.

## PASO 4 · Integrar con la arquitectura común

Tu módulo no vive solo. Conéctalo:

- Con la base de datos compartida y las entidades centrales (cliente, orden, viaje… son las mismas para todos).
- Con los módulos vecinos según tu brief: consume lo que producen y produce lo que consumen, por los servicios y tipos compartidos.
- Sin entidades duplicadas y sin modificar contratos por tu cuenta.

**Entregable:** tu módulo funcionando **dentro** del sistema, no al lado de él. La integración se formaliza con tu **Pull Request** a `main`, que revisa el docente.

## PASO 5 · Probar y corregir

«Se ve bien» no es una prueba. Demuestra que funciona:

- Crear y consultar registros; verificar que **persisten** (recarga y siguen ahí).
- Campos obligatorios vacíos y datos inválidos: el sistema debe rechazarlos con mensajes claros.
- Estados del proceso: intenta una transición prohibida y verifica el rechazo.
- Integración: ejecuta tu parte del **escenario común** y verifica que el módulo siguiente recibe lo que el tuyo produce.
- Registra cada error encontrado y cómo lo corregiste: ese registro es evidencia de aprendizaje, no una vergüenza.

**Entregable:** pruebas realizadas, errores encontrados y correcciones aplicadas (usa `docs/lista-de-pruebas.md`).

## PASO 6 · Entregar y defender

Cierras con la demostración y la defensa individual. Debes poder presentar, con tus palabras:

1. El problema que resolviste y por qué importa en la operación real.
2. Tu diseño y las decisiones que tomaste (y las que descartaste).
3. La demostración funcional en vivo, con el escenario común.
4. Qué hizo la IA y qué hiciste tú: instrucciones clave que diste, errores que detectaste en lo generado, correcciones tuyas.
5. Tus pruebas y tus limitaciones conocidas, sin maquillarlas.

**Principio de aprobación:** si Antigravity construyó algo que no puedes explicar ni modificar, ese algo **no cuenta como tu trabajo**, aunque funcione. La defensa no es un examen de memoria: es la prueba de que el aprendizaje ocurrió.

---

## Tus evidencias (se recogen durante el proceso, no al final)

1. Descripción del problema (Paso 1) · 2. Diseño de la solución (Paso 2) · 3. Instrucciones relevantes que diste a Antigravity · 4. Evidencia de funcionalidades · 5. Registro de errores y correcciones · 6. Pruebas realizadas · 7. Tu Pull Request · 8. Documentación de tu módulo · 9. Demostración · 10. Defensa técnica.

Guarda todo en la carpeta de tu módulo o en tu documento de evidencias desde la primera sesión: reconstruir evidencias al final es imposible y se nota.

## Reglas del laboratorio que no se negocian

- Un solo repositorio, tu rama, todo por Pull Request. Nada directo a `main`.
- Datos siempre ficticios. Lo regulatorio es un **simulador DEMO**: jamás una conexión real ni un radicado de verdad.
- La IA propone; **tú verificas y decides**. Esa frase es el curso entero.
