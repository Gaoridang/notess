alter table "activities" enable row level security;
alter table "activity_embeddings" enable row level security;

create policy "User can view their own activities"
on activities for select
using ( (select auth.uid()) = user_id );

alter table activity_embeddings add column user_id uuid references auth.users not null;

create policy "User can view their own activity embeddings"
on activity_embeddings for select
using ( (select auth.uid()) = user_id );