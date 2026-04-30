-- migration-forum-images-bucket.sql
-- Skapar Supabase storage bucket för forum-bilduppladdningar.
-- Kör en gång i Supabase SQL editor.

-- 1) Skapa bucket (publik) om den inte redan finns.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'forum-images',
  'forum-images',
  true,
  8388608,  -- 8 MB
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/heic']
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- 2) RLS-policies på storage.objects för bucketen.

-- Alla kan läsa (publik bucket)
drop policy if exists "forum-images public read" on storage.objects;
create policy "forum-images public read"
  on storage.objects for select
  using (bucket_id = 'forum-images');

-- Endast inloggade kan ladda upp till sin egen mapp (user_id som prefix)
drop policy if exists "forum-images upload own" on storage.objects;
create policy "forum-images upload own"
  on storage.objects for insert
  with check (
    bucket_id = 'forum-images'
    and auth.role() = 'authenticated'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Endast ägaren kan radera sina egna bilder
drop policy if exists "forum-images delete own" on storage.objects;
create policy "forum-images delete own"
  on storage.objects for delete
  using (
    bucket_id = 'forum-images'
    and auth.role() = 'authenticated'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Verifiering
select id, name, public, file_size_limit from storage.buckets where id = 'forum-images';
