-- TMS Colombia · Migración 005 — Documentación de transporte, documentos
-- generales y transacciones regulatorias (simuladas durante el diplomado).
-- Fuente: Documento Técnico Rector §11, §14 y §18.
-- document_mode distingue: internal | simulated | official. En el curso NUNCA official.

create table public.transport_remittances (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  responsible_carrier_id uuid not null references public.companies (id),
  transport_order_id uuid not null references public.transport_orders (id),
  trip_id uuid references public.trips (id),
  remittance_number text not null,
  cargo_description text not null,
  cargo_weight_kg numeric not null check (cargo_weight_kg > 0),
  origin_location_id uuid not null references public.locations (id),
  destination_location_id uuid not null references public.locations (id),
  status text not null default 'draft'
    check (status in ('draft', 'issued', 'simulated', 'annulled')),
  document_mode text not null default 'internal'
    check (document_mode in ('internal', 'simulated', 'official')),
  created_at timestamptz not null default now(),
  unique (company_id, remittance_number)
);

create table public.transport_manifests (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  responsible_carrier_id uuid not null references public.companies (id),
  trip_id uuid not null references public.trips (id),
  manifest_number text not null,
  issue_date date not null default current_date,
  status text not null default 'draft'
    check (status in ('draft', 'issued', 'simulated', 'annulled')),
  document_mode text not null default 'internal'
    check (document_mode in ('internal', 'simulated', 'official')),
  created_at timestamptz not null default now(),
  unique (company_id, manifest_number)
);

create table public.manifest_remittances (
  id uuid primary key default gen_random_uuid(),
  manifest_id uuid not null references public.transport_manifests (id) on delete cascade,
  remittance_id uuid not null references public.transport_remittances (id) on delete cascade,
  unique (manifest_id, remittance_id)
);

create table public.documents (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  entity_type text not null,
  entity_id uuid not null,
  document_type text not null,
  file_name text not null,
  storage_path text not null,
  document_mode text not null default 'internal'
    check (document_mode in ('internal', 'simulated', 'official')),
  status text not null default 'active',
  uploaded_by uuid references auth.users (id),
  created_at timestamptz not null default now()
);

create table public.regulatory_transactions (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  responsible_carrier_id uuid references public.companies (id),
  entity_type text not null,
  entity_id uuid not null,
  provider text not null default 'mock_rndc'
    check (provider in ('mock_rndc', 'real_rndc')),
  operation text not null,
  request_payload jsonb not null default '{}'::jsonb,
  response_payload jsonb,
  external_reference text,
  status text not null default 'pending',
  simulated boolean not null default true,
  idempotency_key text,
  created_at timestamptz not null default now()
);

-- Reservada para integraciones asíncronas futuras (reintentos e idempotencia).
create table public.integration_outbox (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies (id) on delete cascade,
  topic text not null,
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'pending'
    check (status in ('pending', 'processing', 'done', 'failed')),
  attempts integer not null default 0,
  created_at timestamptz not null default now(),
  processed_at timestamptz
);

alter table public.transport_remittances enable row level security;
alter table public.transport_manifests enable row level security;
alter table public.manifest_remittances enable row level security;
alter table public.documents enable row level security;
alter table public.regulatory_transactions enable row level security;
alter table public.integration_outbox enable row level security;

create policy remittances_all_member on public.transport_remittances
  for all to authenticated
  using (public.is_company_member(company_id)) with check (public.is_company_member(company_id));
create policy manifests_all_member on public.transport_manifests
  for all to authenticated
  using (public.is_company_member(company_id)) with check (public.is_company_member(company_id));
create policy manifest_remittances_all_member on public.manifest_remittances
  for all to authenticated
  using (exists (select 1 from public.transport_manifests m where m.id = manifest_id and public.is_company_member(m.company_id)))
  with check (exists (select 1 from public.transport_manifests m where m.id = manifest_id and public.is_company_member(m.company_id)));
create policy documents_all_member on public.documents
  for all to authenticated
  using (public.is_company_member(company_id)) with check (public.is_company_member(company_id));
create policy regulatory_tx_all_member on public.regulatory_transactions
  for all to authenticated
  using (public.is_company_member(company_id)) with check (public.is_company_member(company_id));
create policy outbox_all_member on public.integration_outbox
  for all to authenticated
  using (company_id is null or public.is_company_member(company_id))
  with check (company_id is null or public.is_company_member(company_id));
