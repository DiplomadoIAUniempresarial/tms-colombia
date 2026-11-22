-- TMS Colombia · Migración 001 — Núcleo: empresas, perfiles y membresías
-- Fuente: Documento Técnico Rector §5. Las migraciones son responsabilidad
-- del docente arquitecto; los estudiantes proponen cambios por Pull Request.

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.companies (
  id uuid primary key default gen_random_uuid(),
  legal_name text not null,
  trade_name text,
  tax_id text,
  company_type text not null default 'other'
    check (company_type in ('carrier', 'logistics_operator', 'mixed', 'other')),
  country_code text not null default 'CO',
  email text,
  phone text,
  address text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null,
  email text not null,
  phone text,
  created_at timestamptz not null default now()
);

create table public.company_memberships (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  role text not null default 'viewer'
    check (role in ('admin', 'manager', 'commercial', 'operations', 'compliance', 'finance', 'viewer')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (company_id, user_id)
);

create trigger companies_set_updated_at
  before update on public.companies
  for each row execute function public.set_updated_at();

-- Pertenencia del usuario autenticado a una empresa (base de las políticas RLS).
create or replace function public.is_company_member(cid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.company_memberships m
    where m.company_id = cid
      and m.user_id = auth.uid()
      and m.is_active = true
  );
$$;

alter table public.companies enable row level security;
alter table public.profiles enable row level security;
alter table public.company_memberships enable row level security;

create policy companies_select_member on public.companies
  for select to authenticated using (public.is_company_member(id));
create policy companies_insert_admin on public.companies
  for insert to authenticated with check (true); -- la creación de empresas la controla el docente vía membresía posterior
create policy companies_update_member on public.companies
  for update to authenticated using (public.is_company_member(id)) with check (public.is_company_member(id));

create policy profiles_select_self_or_comember on public.profiles
  for select to authenticated using (
    id = auth.uid()
    or exists (
      select 1 from public.company_memberships m1
      join public.company_memberships m2 on m1.company_id = m2.company_id
      where m1.user_id = auth.uid() and m2.user_id = profiles.id
    )
  );
create policy profiles_insert_self on public.profiles
  for insert to authenticated with check (id = auth.uid());
create policy profiles_update_self on public.profiles
  for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

create policy memberships_select_member on public.company_memberships
  for select to authenticated using (user_id = auth.uid() or public.is_company_member(company_id));
create policy memberships_write_admin on public.company_memberships
  for all to authenticated
  using (public.is_company_member(company_id))
  with check (public.is_company_member(company_id));
