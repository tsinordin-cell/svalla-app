# Svalla — Setup-guide

## 1. Supabase

1. Gå till [supabase.com](https://supabase.com) → skapa nytt projekt
2. Gå till **SQL Editor** → kör `supabase/schema.sql` (tabeller + seed-data)
3. Gå till **Storage** → skapa bucket `trips` (Public: ON) och `avatars` (Public: ON)
4. Gå till **Authentication** → Email: ON, Confirm email: **OFF** (för snabb testning)
5. Kopiera Project URL och anon key

## 2. Lokalt

```bash
cp .env.local.example .env.local
# Fyll i dina Supabase-nycklar i .env.local
npm install
npm run dev
```

## 3. Deploy på Netlify

1. Pusha till GitHub
2. Netlify → New site → connect repo
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Plugin: `@netlify/plugin-nextjs` (läggs till automatiskt via netlify.toml)
6. Lägg till env-variabler:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Release-definition ✓

- [x] Se restauranger (`/platser`)
- [x] Öppna en restaurang (`/platser/[id]`)
- [x] Logga en tur med bild (`/logga`)
- [x] Se turer i feed (`/`)
- [x] Se sin profil (`/profil`)
