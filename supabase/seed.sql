-- TMS Colombia · Semilla — ESCENARIO OPERATIVO COMÚN (Documento Maestro §10)
-- TODOS los datos son FICTICIOS y pedagógicos. No son tarifas ni referencias de mercado.
-- Empresas: un OPERADOR LOGÍSTICO que administra el sistema y una TRANSPORTADORA
-- que ejecuta el viaje — la separación de los dos perfiles se ve desde la semilla.
-- (El nombre del operador es una propuesta del curso; el documento maestro nombra
-- expresamente a Transportes Andinos S.A.S. y a Comercializadora del Centro S.A.S.)

insert into public.companies (id, legal_name, trade_name, tax_id, company_type, country_code) values
  ('11111111-1111-1111-1111-111111111111', 'Operadora Logística Cordillera S.A.S.', 'Cordillera Logística', '900000001-1', 'logistics_operator', 'CO'),
  ('22222222-2222-2222-2222-222222222222', 'Transportes Andinos S.A.S.', 'Transportes Andinos', '900000002-2', 'carrier', 'CO')
on conflict (id) do nothing;

insert into public.parties (id, company_id, party_type, document_type, document_number, legal_name) values
  ('33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'organization', 'NIT', '900000003-3', 'Comercializadora del Centro S.A.S.'),
  ('44444444-4444-4444-4444-444444444444', '22222222-2222-2222-2222-222222222222', 'organization', 'NIT', '900000004-4', 'Inversiones y Equipos del Transporte S.A.S.'),
  ('55555555-5555-5555-5555-555555555555', '22222222-2222-2222-2222-222222222222', 'person', 'CC', '1000000001', 'Juan Pérez')
on conflict (id) do nothing;

insert into public.party_roles (party_id, role_type) values
  ('33333333-3333-3333-3333-333333333333', 'customer'),
  ('44444444-4444-4444-4444-444444444444', 'owner')
on conflict (party_id, role_type) do nothing;

insert into public.locations (id, company_id, name, city, department, country_code) values
  ('66666666-6666-6666-6666-666666666661', '11111111-1111-1111-1111-111111111111', 'Planta Bogotá — Comercializadora del Centro', 'Bogotá', 'Cundinamarca', 'CO'),
  ('66666666-6666-6666-6666-666666666662', '11111111-1111-1111-1111-111111111111', 'Centro de distribución Medellín', 'Medellín', 'Antioquia', 'CO')
on conflict (id) do nothing;

insert into public.vehicles (id, company_id, owner_party_id, carrier_company_id, plate, vehicle_type, brand, model, capacity_kg, capacity_m3, status) values
  ('77777777-7777-7777-7777-777777777777', '22222222-2222-2222-2222-222222222222', '44444444-4444-4444-4444-444444444444', '22222222-2222-2222-2222-222222222222', 'TMS001', 'tractocamión', 'Marca ficticia', 'Modelo ficticio', 34000, 80, 'available')
on conflict (id) do nothing;

insert into public.drivers (id, company_id, party_id, license_number, license_category, license_expiration, status) values
  ('88888888-8888-8888-8888-888888888888', '22222222-2222-2222-2222-222222222222', '55555555-5555-5555-5555-555555555555', 'LIC-FICTICIA-001', 'C3', '2028-12-31', 'active')
on conflict (id) do nothing;

insert into public.transport_orders (id, company_id, customer_party_id, order_number, origin_location_id, destination_location_id, cargo_description, cargo_weight_kg, cargo_volume_m3, cargo_value, agreed_freight, currency_code, status) values
  ('99999999-9999-9999-9999-999999999991', '11111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333', 'OT-0001', '66666666-6666-6666-6666-666666666661', '66666666-6666-6666-6666-666666666662', 'Productos de consumo empacados', 12000, 48, 5000000, 5000000, 'COP', 'approved')
on conflict (id) do nothing;

insert into public.trips (id, company_id, transport_order_id, operating_carrier_id, vehicle_id, driver_id, origin_location_id, destination_location_id, status) values
  ('99999999-9999-9999-9999-999999999992', '11111111-1111-1111-1111-111111111111', '99999999-9999-9999-9999-999999999991', '22222222-2222-2222-2222-222222222222', '77777777-7777-7777-7777-777777777777', '88888888-8888-8888-8888-888888888888', '66666666-6666-6666-6666-666666666661', '66666666-6666-6666-6666-666666666662', 'assigned')
on conflict (id) do nothing;

insert into public.trip_orders (trip_id, transport_order_id, assigned_weight_kg, assigned_volume_m3) values
  ('99999999-9999-9999-9999-999999999992', '99999999-9999-9999-9999-999999999991', 12000, 48)
on conflict (trip_id, transport_order_id) do nothing;

insert into public.transport_remittances (id, company_id, responsible_carrier_id, transport_order_id, trip_id, remittance_number, cargo_description, cargo_weight_kg, origin_location_id, destination_location_id, status, document_mode) values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '99999999-9999-9999-9999-999999999991', '99999999-9999-9999-9999-999999999992', 'REM-0001', 'Productos de consumo empacados', 12000, '66666666-6666-6666-6666-666666666661', '66666666-6666-6666-6666-666666666662', 'issued', 'internal')
on conflict (id) do nothing;

insert into public.transport_manifests (id, company_id, responsible_carrier_id, trip_id, manifest_number, status, document_mode) values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '99999999-9999-9999-9999-999999999992', 'MAN-0001', 'issued', 'internal')
on conflict (id) do nothing;

insert into public.manifest_remittances (manifest_id, remittance_id) values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1')
on conflict (manifest_id, remittance_id) do nothing;

insert into public.trip_events (company_id, trip_id, event_type, description, source) values
  ('11111111-1111-1111-1111-111111111111', '99999999-9999-9999-9999-999999999992', 'trip_created', 'Viaje creado desde la orden OT-0001 (escenario común).', 'manual'),
  ('11111111-1111-1111-1111-111111111111', '99999999-9999-9999-9999-999999999992', 'vehicle_assigned', 'Vehículo TMS001 asignado.', 'manual'),
  ('11111111-1111-1111-1111-111111111111', '99999999-9999-9999-9999-999999999992', 'driver_assigned', 'Conductor Juan Pérez (identidad ficticia) asignado.', 'manual');

insert into public.trip_costs (company_id, trip_id, cost_type, description, amount, currency_code) values
  ('11111111-1111-1111-1111-111111111111', '99999999-9999-9999-9999-999999999992', 'fuel', 'Combustible estimado Bogotá → Medellín (dato pedagógico)', 2100000, 'COP'),
  ('11111111-1111-1111-1111-111111111111', '99999999-9999-9999-9999-999999999992', 'toll', 'Peajes estimados de la ruta (dato pedagógico)', 650000, 'COP'),
  ('11111111-1111-1111-1111-111111111111', '99999999-9999-9999-9999-999999999992', 'driver_payment', 'Pago al conductor (dato pedagógico)', 850000, 'COP');

insert into public.trip_settlements (company_id, trip_id, gross_revenue, total_cost, gross_profit, margin_percentage, currency_code, status) values
  ('11111111-1111-1111-1111-111111111111', '99999999-9999-9999-9999-999999999992', 5000000, 3600000, 1400000, 28.00, 'COP', 'calculated')
on conflict (trip_id) do nothing;
