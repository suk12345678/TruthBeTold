-- Create rent_inputs table
create table rent_inputs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp default now(),
  rent numeric,
  income numeric,
  market_rent numeric,
  unit_quality int,
  zip_code text
);

-- Create scores table
create table scores (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp default now(),
  rent_input_id uuid references rent_inputs(id),
  score int,
  verdict text
);

-- Enable Row Level Security
alter table rent_inputs enable row level security;
alter table scores enable row level security;

-- Create policies for public insert
create policy "public insert" on rent_inputs
for insert to public with check (true);

create policy "public insert" on scores
for insert to public with check (true);

