-- ============================================================
-- ISLAMIC LIBRARY PLATFORM — DATABASE SCHEMA (Supabase / Postgres)
-- Run this in Supabase SQL Editor (Project > SQL Editor > New query)
-- ============================================================

-- Extension needed for UUIDs
create extension if not exists "uuid-ossp";

-- ---------- PROFILES (extends Supabase's built-in auth.users) ----------
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default now()
);

-- ---------- SCHOLARS (Mashayekh) ----------
create table scholars (
  id uuid primary key default uuid_generate_v4(),
  name text not null,                 -- e.g. "Ibn Baz"
  name_ar text,                       -- Arabic name
  bio text,
  photo_url text,
  created_at timestamp with time zone default now()
);

-- ---------- CATEGORIES (science/genre) ----------
create table categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,                 -- e.g. "Hadith", "Fiqh", "Aqidah"
  name_ar text
);

-- ---------- BOOKS ----------
create table books (
  id uuid primary key default uuid_generate_v4(),
  scholar_id uuid references scholars(id) on delete cascade,
  category_id uuid references categories(id),
  title text not null,
  title_ar text,
  summary text,
  pdf_url text,                       -- Supabase Storage URL
  youtube_playlist_url text,
  total_pages int default 0,
  created_at timestamp with time zone default now()
);

-- Full-text search index on book titles (used by the search bar)
create index books_title_search_idx on books using gin (to_tsvector('simple', title || ' ' || coalesce(title_ar,'')));

-- ---------- READING PROGRESS (per user, per book) ----------
create table reading_progress (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  book_id uuid references books(id) on delete cascade,
  last_page int default 1,
  percent_complete numeric default 0,
  updated_at timestamp with time zone default now(),
  unique(user_id, book_id)
);

-- ---------- NOTES / ANNOTATIONS ----------
create table notes (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  book_id uuid references books(id) on delete cascade,
  page int not null,
  content text not null,
  created_at timestamp with time zone default now()
);

-- ---------- RATINGS ----------
create table ratings (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  book_id uuid references books(id) on delete cascade,
  stars int check (stars between 1 and 5),
  created_at timestamp with time zone default now(),
  unique(user_id, book_id)
);

-- ---------- COMMENTS ----------
create table comments (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  book_id uuid references books(id) on delete cascade,
  content text not null,
  created_at timestamp with time zone default now()
);

-- ---------- QUIZZES ----------
create table quiz_questions (
  id uuid primary key default uuid_generate_v4(),
  book_id uuid references books(id) on delete cascade,
  question text not null,
  option_a text not null,
  option_b text not null,
  option_c text not null,
  option_d text not null,
  correct_option char(1) not null check (correct_option in ('a','b','c','d'))
);

create table quiz_results (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  book_id uuid references books(id) on delete cascade,
  score int,
  taken_at timestamp with time zone default now()
);

-- ---------- KNOWLEDGE BASE FOR AI BOT ----------
-- Store searchable excerpts/hadiths from real books so the bot only
-- answers from YOUR verified sources, and always cites book + reference.
create table knowledge_chunks (
  id uuid primary key default uuid_generate_v4(),
  book_id uuid references books(id) on delete cascade,
  source_reference text,              -- e.g. "Riyad as-Salihin, Hadith 1"
  content text not null,              -- the actual text/hadith
  created_at timestamp with time zone default now()
);
create index knowledge_chunks_search_idx on knowledge_chunks using gin (to_tsvector('simple', content));

-- ============================================================
-- ROW LEVEL SECURITY (RLS) — makes sure users only see/edit their own data
-- ============================================================
alter table profiles enable row level security;
alter table reading_progress enable row level security;
alter table notes enable row level security;
alter table ratings enable row level security;
alter table comments enable row level security;
alter table quiz_results enable row level security;

-- Profiles: users can read all profiles, edit only their own
create policy "Public profiles are viewable" on profiles for select using (true);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on profiles for insert with check (auth.uid() = id);

-- Reading progress: private to each user
create policy "Users manage own progress" on reading_progress for all using (auth.uid() = user_id);

-- Notes: private to each user
create policy "Users manage own notes" on notes for all using (auth.uid() = user_id);

-- Ratings: anyone can read, only owner can write/edit
create policy "Ratings are public" on ratings for select using (true);
create policy "Users manage own ratings" on ratings for insert with check (auth.uid() = user_id);
create policy "Users update own ratings" on ratings for update using (auth.uid() = user_id);

-- Comments: anyone can read, only owner can write
create policy "Comments are public" on comments for select using (true);
create policy "Users create own comments" on comments for insert with check (auth.uid() = user_id);

-- Quiz results: private to each user
create policy "Users manage own quiz results" on quiz_results for all using (auth.uid() = user_id);

-- Books, scholars, categories, quiz_questions, knowledge_chunks: public read (no RLS needed, or enable + public select policy)
alter table books enable row level security;
create policy "Books are public" on books for select using (true);
alter table scholars enable row level security;
create policy "Scholars are public" on scholars for select using (true);
alter table quiz_questions enable row level security;
create policy "Quiz questions are public" on quiz_questions for select using (true);

-- ============================================================
-- SEED DATA (example scholars + categories — replace/expand freely)
-- ============================================================
insert into categories (name, name_ar) values
  ('Aqidah (Creed)', 'العقيدة'),
  ('Fiqh', 'الفقه'),
  ('Hadith', 'الحديث'),
  ('Arabic Language', 'اللغة العربية'),
  ('Tafsir', 'التفسير');

insert into scholars (name, name_ar, bio) values
  ('Ibn Baz', 'ابن باز', 'Former Grand Mufti of Saudi Arabia, renowned scholar of Hadith and Fiqh.'),
  ('Ibn Uthaymeen', 'ابن عثيمين', 'Prominent scholar known for his detailed explanations of Islamic jurisprudence.'),
  ('Al-Albani', 'الألباني', 'Renowned Hadith scholar and muhaddith.');
