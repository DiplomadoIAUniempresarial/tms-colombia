# Brief · Módulo 01 — CRM y gestión comercial
**Rama:** `feature/01-crm` · **Carpetas:** `modules/crm/`, página en `app/(dashboard)/crm/` · **Rol típico:** `commercial`

## El problema (Paso 1 — responde antes de programar)
El operador logístico (o la transportadora) pierde clientes y acuerdos en hojas sueltas: nadie sabe qué se pactó con quién. Tu módulo es la memoria comercial del sistema: sin cliente registrado, no existe orden posible.

## Objetivo y funciones mínimas
- Crear y consultar clientes (terceros con rol `customer` en `parties` / `party_roles`).
- Registrar los datos comerciales y de contacto del cliente.
- Registrar las **tarifas acordadas** con cada cliente como parte de su información comercial.
- Consultar la información comercial de un cliente antes de crear una orden.

## Datos y contratos
Usas `Party`, `PartyRole` de `core/types/` (tablas `parties`, `party_roles`). Un cliente es un `Party` con `party_roles.role_type = 'customer'`. La empresa que administra el registro es `company_id` (la sesión activa). **No crees una tabla de clientes nueva.** Si consideras que las tarifas acordadas necesitan una tabla propia, propón la migración en tu PR y espera la decisión del docente; mientras tanto regístralas en los campos comerciales del tercero.

## Integración
- **Entregas a:** Órdenes (02) — el selector de cliente de la orden sale de tus registros.
- **Necesitas de:** el núcleo (empresas y sesión).

## Reglas y validaciones
- Documento (tipo + número) obligatorio y único por empresa administradora.
- Correo con formato válido; nombre/razón social obligatorio.
- Un tercero puede tener varios roles (cliente y proveedor): respeta `party_roles`, no dupliques el tercero.

## Pantallas mínimas
Lista de clientes con búsqueda · formulario de cliente (crear/editar) · ficha del cliente con sus datos comerciales y tarifas acordadas.

## No construyas
Pipeline de ventas, campañas, cotizador comercial, facturación. Eso no es este módulo.

## Pruebas mínimas (Paso 5)
Crear un cliente y verlo en la lista · intentar duplicar su documento y ver el rechazo · buscarlo por nombre · usar ese cliente al crear una orden (integración con el 02).

## Entregable
Módulo CRM funcional con persistencia real. En la defensa debes poder explicar qué es un tercero con roles y por qué el cliente no es una tabla aparte.

## Primera instrucción para tu Antigravity
«Lee AGENTS.md y docs/modules/01-crm.md. Antes de escribir código, preséntame el diseño del módulo: pantallas, campos del formulario y validaciones, usando los tipos Party y PartyRole de core/types. Cuando apruebe el diseño, implementa primero la lista y el formulario de clientes en modules/crm con su servicio, y verifica con npm run typecheck.»
