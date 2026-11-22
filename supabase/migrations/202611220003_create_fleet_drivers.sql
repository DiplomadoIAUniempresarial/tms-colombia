-- TMS Colombia · Migración 003 — Flota y conductores
-- Fuente: Documento Técnico Rector §8.

create table public.vehicles (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  owner_party_id uuid references public.parties (id),
  carrier_company_id uuid references public.companies (id),
  plate text not null,
  vehicle_type text not null,
  brand text,
  model text,
  capacity_kg numeric not null check (capacity_kg > 0),
  capacity_m3 numeric,
  status text not null default 'available'
    check (status in ('available', 'in_route', 'in_maintenance', 'out_of_service')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (company_id, plate)
);

create table public.drivers (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  party_id uuid not null references public.parties (id) on delete cascade,
  license_number text not null,
  license_category text not null,
  license_expiration date not null,
  phone text,
  status text not null default 'active'
    check (status in ('active', 'inactive', 'suspended')),
  created_at timestamptz not null default now()
);

create trigger vehicles_set_updated_at
  before update on public.vehicles
  for each row execute function public.set_updated_at();

alter table public.vehicles enable row level security;
alter table public.drivers enable row level security;

create policy vehicles_all_member on public.vehicles
  for all to authenticated
  using (public.is_company_member(company_id))
  with check (public.is_company_member(company_id));

create policy drivers_all_member on public.drivers
  for all to authenticated
  using (public.is_company_member(company_id))
  with check (public.is_company_member(company_id));
