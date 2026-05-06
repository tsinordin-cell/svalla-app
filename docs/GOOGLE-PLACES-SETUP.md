# Google Places API — setup för Svalla

5 minuter klick i Google Cloud + Vercel. Sen kör en kommando.

## 1. Aktivera APIs (Google Cloud Console)

Du är redan inloggad på `console.cloud.google.com`. Gör detta:

1. Sökrutan upptill → skriv **`Places API (New)`** → öppna → klicka **ENABLE**
2. Sökrutan → **`Geocoding API`** → öppna → **ENABLE**

## 2. Skapa API-nyckel + restrict

1. Sidomeny: **APIs & Services → Credentials**
2. **+ CREATE CREDENTIALS → API key**
3. Kopiera nyckeln direkt (visas en gång)
4. Klicka **Edit API key**:
   - **Application restrictions** → "HTTP referrers (websites)" → ADD:
     - `https://svalla.se/*`
     - `https://*.svalla.se/*`
     - `https://*.vercel.app/*`
   - **API restrictions** → "Restrict key" → kryssa:
     - Places API (New)
     - Geocoding API
   - **SAVE**

## 3. Sätt upp budget-alert

1. Cloud-startsidan → **"Set up budget alerts"**
2. Budget: **50 SEK/månad**
3. Alerts: 50%, 90%, 100%
4. Email: `tsinordin@gmail.com`

För Svalla blir max-kostnad ~5 SEK/månad. Alerten triggas aldrig — bara säkerhetsbälte.

## 4. Lägg nyckeln i Vercel

```
vercel.com → tsinordin-3802s-projects → svalla-app → Settings → Environment Variables → Add New
  Name:         GOOGLE_PLACES_API_KEY
  Value:        [klistra in nyckeln]
  Environments: Production + Preview + Development
```

Klicka **Save**. Trigger redeploy från Deployments-sidan så variabeln blir aktiv.

## 5. Kör DB-migrationen

I Supabase SQL Editor, klistra in innehållet från:

```
supabase/migrations/20260505000002_places_premium_fields.sql
```

Kör. Lägger till alla nya kolumner + place_photos-tabellen.

## 6. Backfill alla 288 platser

Lägg också nyckeln i lokal `.env.local`:

```
GOOGLE_PLACES_API_KEY="din-nyckel-här"
```

Kör i terminalen från svalla-app-roten:

```
# Dry-run först — ser vad som skulle ändras utan att skriva
node scripts/backfill-google-places.mjs --dry-run

# Skarp körning
node scripts/backfill-google-places.mjs
```

Tar ~5 min för 288 platser. Outputten visar vilka platser som hittades, vilka som flaggades för manuell review (Google-koord >50m från vår), och vilka som inte hittades alls.

## Vad du får efter detta

För varje plats: `google_place_id`, `phone`, `website`, `formatted_address`, `google_rating`, `google_ratings_total`, `google_photo_refs[]`, verifierad `latitude`/`longitude`.

Plats-sidan i UI uppdateras automatiskt att visa dessa fält när de finns.

## Refresh löpande

Ratings ändras över tid. Lägg en cron job (eller GitHub Action) som kör en gång/månad och refetchar alla `google_place_id`s. Endpoint för detta byggs senare — säg till.

## Kostnad

- Engångs-backfill: ~$5 / 50 SEK (helt inom Google's $200/månad free tier)
- Månads-refresh: ~$5 / 50 SEK / månad
- **I praktiken: 0 kr**
