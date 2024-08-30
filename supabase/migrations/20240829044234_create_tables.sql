create extension vector with schema extensions;

create table activities (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users not null,
  description text not null,
  metadata jsonb not null,
  created_at timestamp with time zone default now() not null
);

create table activity_embeddings (
  id uuid primary key default uuid_generate_v4(),
  activity_id uuid references activities not null,
  embedding vector(1536),
  created_at timestamp with time zone default now() not null
);