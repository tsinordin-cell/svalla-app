# Upstash Redis — setup för rate limit (Pass C)

Koden i `src/lib/rateLimit.ts` är skriven så att den **fungerar utan Upstash** (faller tillbaka på in-memory). Med Upstash får du:
- Korrekt rate limit cross-instance i Vercel
- Försvar mot DDoS och credential stuffing som faktiskt fungerar
- Statistik och insyn i abuse-mönster

## Steg 1 — Skapa Upstash-konto (3 min)

1. Gå till https://upstash.com → "Sign Up"
2. Logga in med GitHub eller Google
3. Free tier räcker länge (10 000 requests/dag, ingen kreditkort)

## Steg 2 — Skapa Redis-databas (2 min)

1. Klicka **"Create Database"**
2. **Name:** `svalla-rate-limit`
3. **Type:** Regional (billigare än Global)
4. **Region:** välj **eu-west-1 (Ireland)** eller **eu-central-1 (Frankfurt)** — närmast Vercel EU
5. **TLS:** ON (default)
6. Klicka **Create**

## Steg 3 — Hämta credentials (1 min)

På databas-sidan, scrolla ner till **"REST API"**:

1. Hitta **`UPSTASH_REDIS_REST_URL`** — kopiera värdet
2. Hitta **`UPSTASH_REDIS_REST_TOKEN`** — klicka eye-ikonen för att avslöja, kopiera värdet

## Steg 4 — Lägg i Vercel (3 min)

1. Vercel → svalla → Settings → Environments → Production → Environment Variables
2. **Add new** → namn: `UPSTASH_REDIS_REST_URL` → klistra in → Sensitive ON → Save
3. **Add new** → namn: `UPSTASH_REDIS_REST_TOKEN` → klistra in → Sensitive ON → Save
4. Upprepa för Preview-environment (Development kan skippas — local dev kan använda in-memory)

## Steg 5 — Redeploy

Deployments → senaste → ⋯ → **Redeploy**

## Steg 6 — Verifiera

Öppna Upstash Dashboard → din databas → **Data Browser**.

Testa: gör en sökning på svalla.se/forum (eller ett `/api/forum/search?q=test`-anrop). Kör om det 31 gånger inom en minut — det 31:a anropet ska returnera 429.

I Upstash Data Browser ska du se nycklar som `rl:forum-search:<din-ip>` med ett räknarvärde.

## Verifiera lokalt utan Upstash

Lägg INTE till `UPSTASH_REDIS_REST_URL` i `.env.local` lokalt — då kör din dev-server in-memory-fallbacken (snabb, ingen nätverkstrafik). Den loggar inget men funkar identiskt API-mässigt.

## Felsökning

**"Rate limit verkar inte fungera alls"** — kontrollera att båda env-vars är satta i Vercel (inte bara URL eller bara token). Koden kräver båda.

**"429 även på första request"** — Upstash returnerade fel. Koden faller tillbaka på fail-open (släpper igenom). Kolla Upstash Dashboard → Logs.

**"Vill ändra limits"** — leta upp `checkRateLimit(key, max, windowMs)`-anropen i API-routes. Argumenten (max, windowMs) styr begränsningen.
