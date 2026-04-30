# Svalla — Deploy-guide (5 min)

## Förutsättningar
- Node 18+ installerat
- Git installerat
- GitHub-konto
- Supabase-projekt (gratis på supabase.com)
- Netlify-konto (gratis på netlify.com)

---

## Steg 1 — Supabase (2 min)

1. Gå till **supabase.com** → New project
2. **SQL Editor** → klistra in hela `supabase/schema.sql` → Run
3. **Storage** → New bucket → Namn: `trips` → Public: **ON**
4. **Authentication** → Email → Confirm email: **OFF**
5. Kopiera från **Settings → API**:
   - Project URL
   - anon public key

---

## Steg 2 — Lokalt (1 min)

```bash
cd svalla-app
cp .env.local.example .env.local
```

Öppna `.env.local` och fyll i:
```
NEXT_PUBLIC_SUPABASE_URL=https://DITT_PROJEKT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=din_anon_nyckel
```

Testa lokalt:
```bash
npm install
npm run dev
# Öppna http://localhost:3000
```

---

## Steg 3 — GitHub (1 min)

```bash
git init
git add .
git commit -m "Svalla v1"
git remote add origin https://github.com/DITT_KONTO/svalla.git
git push -u origin main
```

---

## Steg 4 — Netlify (1 min)

1. **netlify.com** → Add new site → Import from Git → GitHub → välj `svalla`
2. Build settings (fylls i automatiskt från `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `.next`
3. **Site configuration → Environment variables** → lägg till:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Tryck **Deploy site**

Netlify bygger automatiskt (tar ~2 min). Live-URL dyker upp direkt.

---

## Vad du får

| URL | Funktion |
|-----|----------|
| `/` | Feed — alla turer |
| `/rutter` | Rutter med karta |
| `/rutter/[id]` | Rutt-detaljvy |
| `/platser` | Restauranger |
| `/platser/[id]` | Restaurang-detaljvy |
| `/logga` | Val: GPS-spårning eller snabb-logg |
| `/spara` | Live GPS-tracker med paus/stopp |
| `/tur/[id]` | Tur-detaljvy med Strava-karta |
| `/profil` | Profil + statistik + grid |
| `/logga-in` | Auth |
