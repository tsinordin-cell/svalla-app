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

## Database Migrations

This project uses Supabase CLI for managing database migrations.

### Local Development

1. Install Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Run migrations:
   ```bash
   npm run db:migrate
   ```

3. Lint migrations (validates SQL syntax):
   ```bash
   npm run db:lint
   ```

4. Generate diffs for schema changes:
   ```bash
   npm run db:diff
   ```

### CI/CD

- `.github/workflows/db-lint.yml` är **avstängd** (Actions → DB Lint → Disabled, 2026-09-11). Den fungerade aldrig: `supabase db lint --project-id` finns inte i CLI:t, och alla 7 körningar var röda. Migrationer appliceras via Supabase MCP och verifieras i `information_schema` (se docs/gps-kvalitet.md för exempel). Filen kan raderas när någon med rättigheter vill.
- `.github/workflows/weekly-digest 2.yml` (Weekly Digest Push) är **avstängd** (Actions → Weekly Digest Push → Disable workflow, 2026-09-13, Toms beslut). Den fungerade aldrig: alla 19 måndagskörningar sedan maj fick 401 från `/api/push/weekly-digest` — GitHub-secreten `CRON_SECRET` matchar inte Vercels. Tre push-prenumeranter fanns; ingen hade någonsin fått utskicket. Slås på igen först när secreten stämmer (sätts i respektive UI, aldrig i chatt eller commit) och innehållet är granskat.

### Migration Files

All migrations are stored in `supabase/migrations/` with timestamped filenames in the format:
```
YYYYMMDDHHHMMSS_<description>.sql
```

This ensures migrations run in the correct order and prevents conflicts.

For more information, see the [Supabase CLI documentation](https://supabase.com/docs/guides/local-development/cli).

## Release-definition ✓

- [x] Se restauranger (`/platser`)
- [x] Öppna en restaurang (`/platser/[id]`)
- [x] Logga en tur med bild (`/logga`)
- [x] Se turer i feed (`/`)
- [x] Se sin profil (`/profil`)
