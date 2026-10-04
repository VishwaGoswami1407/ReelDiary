-- Run once in the Supabase SQL editor. The site uses only a public key.
create table public.scene_thoughts (
  id uuid primary key default gen_random_uuid(),
  movie_id text not null check (movie_id ~ '^[a-z0-9][a-z0-9-]{0,159}$'),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  scene text not null check (scene in ('beginning','interval','climax','ending','custom')),
  timestamp_seconds integer,
  body text not null check (char_length(btrim(body)) between 3 and 1000),
  mood text not null check (mood in ('🥰','😂','😢','😮','🤯','😡')),
  spoiler boolean not null default true,
  created_at timestamptz not null default now(),
  constraint valid_scene_timestamp check (
    (scene = 'custom' and timestamp_seconds is not null and timestamp_seconds between 0 and 359999)
    or (scene <> 'custom' and timestamp_seconds is null)
  )
);

create table public.scene_reactions (
  thought_id uuid not null references public.scene_thoughts(id) on delete cascade,
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  emoji text not null check (emoji in ('❤️','😂','😮','😢')),
  created_at timestamptz not null default now(),
  primary key (thought_id,user_id,emoji)
);

create index scene_thoughts_movie_date on public.scene_thoughts(movie_id,created_at desc);
create index scene_thoughts_user_date on public.scene_thoughts(user_id,created_at desc);
create index scene_reactions_user on public.scene_reactions(user_id);

alter table public.scene_thoughts enable row level security;
alter table public.scene_reactions enable row level security;

create policy "Public thoughts are readable" on public.scene_thoughts
  for select to anon,authenticated using (true);
create policy "Visitors create their own thoughts" on public.scene_thoughts
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Visitors can remove their own thoughts" on public.scene_thoughts
  for delete to authenticated using ((select auth.uid()) = user_id);

create policy "Public reactions are readable" on public.scene_reactions
  for select to anon,authenticated using (true);
create policy "Visitors create their own reactions" on public.scene_reactions
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Visitors remove their own reactions" on public.scene_reactions
  for delete to authenticated using ((select auth.uid()) = user_id);

-- Clients cannot set identity, dates, or aggregate reaction counts.
revoke all on public.scene_thoughts,public.scene_reactions from anon,authenticated;
grant select on public.scene_thoughts,public.scene_reactions to anon,authenticated;
grant insert (movie_id,scene,timestamp_seconds,body,mood,spoiler) on public.scene_thoughts to authenticated;
grant insert (thought_id,emoji) on public.scene_reactions to authenticated;
grant delete on public.scene_thoughts,public.scene_reactions to authenticated;

-- Limit posting bursts for each anonymous account, including concurrent requests.
create function public.limit_scene_thought_posts() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  perform pg_advisory_xact_lock(hashtextextended(new.user_id::text,0));
  if (select count(*) from public.scene_thoughts
      where user_id = new.user_id and created_at > now() - interval '1 minute') >= 5 then
    raise exception 'Please wait a minute before posting another thought.';
  end if;
  return new;
end;
$$;
revoke all on function public.limit_scene_thought_posts() from public,anon,authenticated;
create trigger scene_thought_post_limit before insert on public.scene_thoughts
  for each row execute function public.limit_scene_thought_posts();

-- Rank the entire title's collection before pagination. RLS still applies.
create function public.get_scene_thoughts(
  p_movie_id text,
  p_scene text default 'all',
  p_limit integer default 20,
  p_offset integer default 0
) returns table (
  id uuid, scene text, timestamp_seconds integer, body text, mood text,
  spoiler boolean, created_at timestamptz, reaction_counts jsonb,
  my_reactions text[], reaction_total bigint, is_own boolean
)
language sql stable security invoker set search_path = '' as $$
  select t.id,t.scene,t.timestamp_seconds,t.body,t.mood,t.spoiler,t.created_at,
    r.counts,r.mine,r.total,coalesce(t.user_id = auth.uid(),false)
  from public.scene_thoughts t
  cross join lateral (
    select
      coalesce(jsonb_object_agg(grouped.emoji,grouped.n),'{}'::jsonb) as counts,
      coalesce(array_agg(grouped.emoji) filter (where grouped.is_mine),'{}'::text[]) as mine,
      coalesce(sum(grouped.n),0)::bigint as total
    from (
      select reaction.emoji,count(*) as n,bool_or(reaction.user_id = auth.uid()) as is_mine
      from public.scene_reactions reaction
      where reaction.thought_id = t.id
      group by reaction.emoji
    ) grouped
  ) r
  where t.movie_id = p_movie_id
  order by (p_scene <> 'all' and t.scene = p_scene) desc,
    r.total desc,t.created_at desc,t.id desc
  limit least(greatest(p_limit,1),100)
  offset greatest(p_offset,0);
$$;
revoke all on function public.get_scene_thoughts(text,text,integer,integer) from public;
grant execute on function public.get_scene_thoughts(text,text,integer,integer) to anon,authenticated;
