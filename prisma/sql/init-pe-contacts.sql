create table if not exists pe_contacts (
  id text primary key,
  name text not null,
  email text not null,
  phone text not null default '',
  message text not null,
  status text not null default 'new',
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists pe_contacts_email_idx on pe_contacts (email);
create index if not exists pe_contacts_created_idx on pe_contacts (created_at desc);
