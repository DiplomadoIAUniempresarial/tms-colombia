-- TMS Colombia · Migración 004 — Órdenes de transporte, viajes y consolidación
-- Fuente: Documento Técnico Rector §9 y §10.
-- REGLA: company_id = empresa que administra; operating_carrier_id = transportador
-- que ejecuta. No son intercambiables (operador logístico vs transportadora).

create table public.transport_orders (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  customer_party_id uuid not null references public.parties (id),
  order_number text not null,
  origin_location_id uuid not null references public.locations (id),
  destination_location_id uuid not null references public.locations (id),
  cargo_description text not null,
  cargo_weight_kg numeric not null check (cargo_weight_kg > 0),
  cargo_volume_m3 numeric,
  cargo_value numeric,
  agreed_freight numeric,
  currency_code text not null default 'COP',
  requested_pickup_at timestamptz,
  requested_delivery_at timestamptz,
  status text not null default 'draft'
    check (status in ('draft', 'pending', 'approved', 'planned', 'in_transit', 'delivered', 'cancelled')),
  notes text,
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (company_id, order_number)
);

create table public.trips (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  transport_order_id uuid references public.transport_orders (id),
  operating_carrier_id uuid not null references public.companies (id),
  vehicle_id uuid references public.vehicles (id),
  driver_id uuid references public.drivers (id),
  origin_location_id uuid not null references public.locations (id),
  destination_location_id uuid not null references public.locations (id),
  planned_departure_at timestamptz,
  actual_departure_at timestamptz,
  planned_arrival_at timestamptz,
  actual_arrival_at timestamptz,
  status text not null default 'planned'
    check (status in ('planned', 'assigned', 'ready_for_dispatch', 'dispatched', 'in_transit', 'at_destination', 'delivered', 'closed', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Consolidación: un viaje puede agrupar varias órdenes (uso inicial del MVP: una).
create table public.trip_orders (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips (id) on delete cascade,
  transport_order_id uuid not null references public.transport_orders (id) on delete cascade,
  assigned_weight_kg numeric not null check (assigned_weight_kg > 0),
  assigned_volume_m3 numeric,
  unique (trip_id, transport_order_id)
);

create trigger transport_orders_set_updated_at
  before update on public.transport_orders
  for each row execute function public.set_updated_at();
create trigger trips_set_updated_at
  before update on public.trips
  for each row execute function public.set_updated_at();

alter table public.transport_orders enable row level security;
alter table public.trips enable row level security;
alter table public.trip_orders enable row level security;

create policy transport_orders_all_member on public.transport_orders
  for all to authenticated
  using (public.is_company_member(company_id))
  with check (public.is_company_member(company_id));

create policy trips_all_member on public.trips
  for all to authenticated
  using (public.is_company_member(company_id))
  with check (public.is_company_member(company_id));

create policy trip_orders_all_member on public.trip_orders
  for all to authenticated
  using (exists (select 1 from public.trips t where t.id = trip_id and public.is_company_member(t.company_id)))
  with check (exists (select 1 from public.trips t where t.id = trip_id and public.is_company_member(t.company_id)));
