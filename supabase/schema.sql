-- users テーブル
create table if not exists public.users (
  id uuid references auth.users(id) on delete cascade primary key,
  member_no integer not null unique,
  name text not null,
  email text not null,
  level integer not null default 1,
  total_points integer not null default 0,
  streak_days integer not null default 0,
  created_at timestamptz not null default now()
);

-- daily_records テーブル
create table if not exists public.daily_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade not null,
  date date not null,
  walked boolean not null default false,
  water boolean not null default false,
  stretch boolean not null default false,
  weight boolean not null default false,
  points integer not null default 0,
  unique(user_id, date)
);

-- badges テーブル
create table if not exists public.badges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade not null,
  badge_name text not null,
  acquired_at timestamptz not null default now(),
  unique(user_id, badge_name)
);

-- RLS (Row Level Security) を有効化
alter table public.users enable row level security;
alter table public.daily_records enable row level security;
alter table public.badges enable row level security;

-- users ポリシー
create policy "ユーザーは自分のデータを閲覧できる" on public.users
  for select using (auth.uid() = id);

create policy "ユーザーは自分のデータを更新できる" on public.users
  for update using (auth.uid() = id);

create policy "サービスロールは挿入できる" on public.users
  for insert with check (auth.uid() = id);

-- 全部員数を全員が見れる（部員数表示用）
create policy "全員が部員数を確認できる" on public.users
  for select using (true);

-- daily_records ポリシー
create policy "ユーザーは自分の記録を閲覧できる" on public.daily_records
  for select using (auth.uid() = user_id);

create policy "ユーザーは自分の記録を追加できる" on public.daily_records
  for insert with check (auth.uid() = user_id);

create policy "ユーザーは自分の記録を更新できる" on public.daily_records
  for update using (auth.uid() = user_id);

-- badges ポリシー
create policy "ユーザーは自分のバッジを閲覧できる" on public.badges
  for select using (auth.uid() = user_id);

create policy "ユーザーは自分のバッジを追加できる" on public.badges
  for insert with check (auth.uid() = user_id);
