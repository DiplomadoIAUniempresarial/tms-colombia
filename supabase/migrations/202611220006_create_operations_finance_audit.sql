-- TMS Colombia · Migración 006 — Eventos, entregas, finanzas, seguridad y auditoría
-- Fuente: Documento Técnico Rector §12, §13, §15, §16 y §17.

create table public.trip_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  trip_id uuid not null references public.trips (id) on delete cascade,
  event_type text not null
    check (event_type in ('trip_created', 'vehicle_assigned', 'driver_assigned', 'dispatch', 'departure', 'checkpoint', 'delay', 'incident', 'arrival', 'delivery', 'closure')),
  description text,
  location_id uuid references public.locations (id),
  event_at timestamptz not null default now(),
  source text not null default 'manual'
    check (source in ('manual', 'simulated', 'integration')),
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now()
);

create table public.delivery_records (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  trip_id uuid not null references public.trips (id),
  transport_order_id uuid not null references public.transport_orders (id),
  delivered_at timestamptz not null,
  received_by text not null,
  receiver_document text,
  delivery_status text not null default 'pending'
    check (delivery_status in ('pending', 'delivered', 'partial', 'rejected', 'with_observations')),
  observations text,
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now()
);

create table public.trip_costs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  trip_id uuid not null references public.trips (id) on delete cascade,
  cost_type text not null
    check (cost_type in ('fuel', 'toll', 'driver_payment', 'carrier_payment', 'loading', 'unloading', 'maintenance', 'other')),
  description text,
  amount numeric not null check (amount >= 0),
  currency_code text not null default 'COP',
  incurred_at timestamptz not null default now(),
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now()
);

create table public.trip_settlements (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  trip_id uuid not null references public.trips (id) on delete cascade,
  gross_revenue numeric not null default 0,
  total_cost numeric not null default 0,
  gross_profit numeric not null default 0,
  margin_percentage numeric,
  currency_code text not null default 'COP',
  status text not null default 'draft'
    check (status in ('draft', 'calculated', 'approved', 'paid')),
  calculated_at timestamptz not null default now(),
  unique (trip_id)
);

create table public.vehicle_inspections (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  vehicle_id uuid not null references public.vehicles (id),
  driver_id uuid references public.drivers (id),
  inspection_date timestamptz not null default now(),
  inspection_type text not null default 'preoperacional',
  result text not null
    check (result in ('approved', 'approved_with_observations', 'rejected')),
  observations text,
  created_by uuid references auth.users (id)
);

-- Auditoría: los estudiantes no pueden modificar ni borrar estos registros.
create table public.audit_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  user_id uuid references auth.users (id),
  entity_type text not null,
  entity_id uuid not null,
  action text not null,
  old_data jsonb,
  new_data jsonb,
  created_at timestamptz not null default now()
);

alter table public.trip_events enable row level security;
alter table public.delivery_records enable row level security;
alter table public.trip_costs enable row level security;
alter table public.trip_settlements enable row level security;
alter table public.vehicle_inspections enable row level security;
alter table public.audit_events enable row level security;

create policy trip_events_all_member on public.trip_events
  for all to authenticated
  using (public.is_company_member(company_id)) with check (public.is_company_member(company_id));
create policy delivery_records_all_member on public.delivery_records
  for all to authenticated
  using (public.is_company_member(company_id)) with check (public.is_company_member(company_id));
create policy trip_costs_all_member on public.trip_costs
  for all to authenticated
  using (public.is_company_member(company_id)) with check (public.is_company_member(company_id));
create policy trip_settlements_all_member on public.trip_settlements
  for all to authenticated
  using (public.is_company_member(company_id)) with check (public.is_company_member(company_id));
create policy vehicle_inspections_all_member on public.vehicle_inspections
  for all to authenticated
  using (public.is_company_member(company_id)) with check (public.is_company_member(company_id));
create policy audit_events_select_member on public.audit_events
  for select to authenticated using (public.is_company_member(company_id));
create policy audit_events_insert_member on public.audit_events
  for insert to authenticated with check (public.is_company_member(company_id));
-- Sin políticas de UPDATE/DELETE: la auditoría es de solo lectura para los usuarios.
