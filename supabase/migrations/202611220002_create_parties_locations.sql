-- TMS Colombia · Migración 002 — Terceros, roles de tercero y ubicaciones
-- Fuente: Documento Técnico Rector §6 y §7.

create table public.parties (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  party_type text not null default 'organization'
    check (party_type in ('person', 'organization')),
  document_type text,
  document_number text,
  legal_name text not null,
  trade_name text,
  email text,
  phone text,
  address text,
  country_code text not null default 'CO',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.party_roles (
  id uuid primary key default gen_random_uuid(),
  party_id uuid not null references public.parties (id) on delete cascade,
  role_type text not null
    check (role_type in ('customer', 'supplier', 'carrier', 'owner', 'other')),
  unique (party_id, role_type)
);

create table public.locations (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  name text not null,
  address text,
  city text not null,
  department text,
  country_code text not null default 'CO',
  latitude numeric,
  longitude numeric,
  reference text,
  created_at timestamptz not null default now()
);

create trigger parties_set_updated_at
  before update on public.parties
  for each row execute function public.set_updated_at();

alter table public.parties enable row level security;
alter table public.party_roles enable row level security;
alter table public.locations enable row level security;

create policy parties_all_member on public.parties
  for all to authenticated
  using (public.is_company_member(company_id))
  with check (public.is_company_member(company_id));

create policy party_roles_all_member on public.party_roles
  for all to authenticated
  using (exists (select 1 from public.parties p where p.id = party_id and public.is_company_member(p.company_id)))
  with check (exists (select 1 from public.parties p where p.id = party_id and public.is_company_member(p.company_id)));

create policy locations_all_member on public.locations
  for all to authenticated
  using (public.is_company_member(company_id))
  with check (public.is_company_member(company_id));
