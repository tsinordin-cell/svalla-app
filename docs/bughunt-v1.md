# Svalla — Bug Hunt v1

Genomförd: 2026-04-22
Status: Fas 1–4 klara. Fas 5 pågår.

---

## Fas 1 — Findings

---

### B-001 — /api/push/send: auth-check blockerar alla sociala pushnotiser
```
Location:    src/app/api/push/send/route.ts:43
Category:    auth
Severity:    P1
Repro:       Gilla en tur, följ en användare, posta kommentar → ägaren får aldrig push.
             Loggen i Vercel visar 403 från /api/push/send.
Impact:      Samtliga sociala push-notiser (like, kommentar, follow) är brutna sedan
             auth-logiken skrevs om. .catch(() => {}) i klientkoden döljer felet.
Fix plan:    Ta bort user.id !== targetUserId-spärren; tillåt inloggad användare att
             skicka push till annan. Lägg till rate limit istället.
Status:      FIXAD (commit fix/B-001)
```

---

### B-002 — /api/discovery: ingen autentisering, exponerar GPS-heatmap publikt
```
Location:    src/app/api/discovery/route.ts
Category:    security/auth
Severity:    P1
Repro:       curl https://svalla.se/api/discovery?type=heat → returnerar GPS-aggregat
             utan att vara inloggad.
Impact:      Aggregerad GPS-data för alla seglare är publik. Endpoint använder dessutom
             SUPABASE_SERVICE_ROLE_KEY om den är satt, vilket kringgår RLS helt.
Fix plan:    Lägg till auth.getUser()-check + returnera 401 om ej inloggad.
Status:      FIXAD (commit fix/B-002)
```

---

### B-003 — /api/guide och /api/trip-summary: ingen rate limiting på AI-routes
```
Location:    src/app/api/guide/route.ts, src/app/api/trip-summary/route.ts
Category:    security/perf
Severity:    P1
Repro:       Logga in → skicka 100 POST till /api/guide i en loop → Anthropic-kvoten
             dräneras utan begränsning.
Impact:      Ekonomisk exponering. En inloggad användare kan dränera Anthropic API-kvoten
             och generera kostnader utan tak.
Fix plan:    Lägg till checkRateLimit() per user.id, t.ex. 10 req/min för guide,
             5 req/min för trip-summary.
Status:      FIXAD (commit fix/B-003)
```

---

### B-004 — check-in/page.tsx: open redirect via ?return_to=-param
```
Location:    src/app/check-in/page.tsx:96
Category:    security
Severity:    P2
Repro:       /check-in?return_to=https://evil.com → efter check-in: router.push(prefillReturnTo)
             navigerar till extern domän.
Impact:      Phishing-vektor. Kan lura användare att tro de är kvar på svalla.se.
Fix plan:    Whitelist: om return_to inte börjar med "/" → ignorera och redirect till /feed.
Status:      FIXAD (commit fix/B-004)
```

---

### B-005 — logga-in/page.tsx: ?returnTo=-param ignoreras — UX bruten
```
Location:    src/app/logga-in/page.tsx:87,112
Category:    ui
Severity:    P2
Repro:       Besök /notiser utan inlogg → middleware redirectar till /logga-in?returnTo=/notiser
             → logga in → hamnar på /feed istället för /notiser.
Impact:      Skickar alltid till /feed, förlorar avsedd destination. Middleware sätter
             returnTo men login-sidan använder det aldrig.
Fix plan:    Läs useSearchParams() och returnTo; efter lyckad login: router.push(returnTo || '/feed').
             Validera att returnTo börjar med "/" (whitelist intern destination).
Status:      FIXAD (commit fix/B-005)
```

---

### B-006 — FollowButton.tsx: ingen cancelled-flagga i useEffect — setState på unmountad komponent
```
Location:    src/components/FollowButton.tsx:16-30
Category:    race
Severity:    P2
Repro:       Navigera snabbt bort från en profilsida medan follow-data laddas →
             React-warning "Can't perform a React state update on an unmounted component".
Impact:      Race condition, potentiella React-varningar i dev, kan orsaka stale state.
Fix plan:    Lägg till let cancelled = false; i useEffect, kontrollera if (cancelled) return
             efter varje await. Return cleanup: () => { cancelled = true }.
Status:      FIXAD (commit fix/B-006)
```

---

### B-007 — Comments.tsx: deleteComment använder userId! utan guard
```
Location:    src/components/Comments.tsx:~line 290
Category:    null
Severity:    P2
Repro:       Edge-case: deleteComment anropas om userId är null (t.ex. session expired
             under pågående session) → skickar null som user_id till Supabase.
Impact:      Supabase .eq('user_id', null) returnerar inga rader (RLS stoppar), men
             gör en onödig DB-query. I ett framtida RLS-slip kunde det bli värre.
Fix plan:    Guard: if (!userId) return; innan Supabase-anropet.
Status:      FIXAD (commit fix/B-007)
```

---

### B-008 — RealtimeFeedBanner.tsx: skapar två separata Supabase-klienter
```
Location:    src/components/RealtimeFeedBanner.tsx:22,33
Category:    perf
Severity:    P3
Repro:       Komponent mountas → två createClient() anropas i separata useEffect →
             två WebSocket-anslutningar öppnas mot Supabase realtime.
Impact:      Dubbel minnesanvändning, dubbla WebSocket-anslutningar. Slösar resurser.
Fix plan:    Flytta till en useRef(createClient()).current som delas av båda effects.
Status:      FIXAD (commit fix/B-008)
```

---

### B-009 — next.config.ts: CSP innehåller unsafe-eval i produktion
```
Location:    next.config.ts
Category:    security
Severity:    P2
Repro:       CSP: "script-src 'self' 'unsafe-inline' 'unsafe-eval'" — tillåter eval()
             från JavaScript på alla sidor.
Impact:      Försvagar XSS-skyddet avsevärt. En XSS-bugg kan exekvera godtycklig kod
             via eval(). Next.js behöver unsafe-eval i dev men inte i produktion.
Fix plan:    Dela CSP i dev/prod. I produktion: ta bort 'unsafe-eval'. Lägg till
             Stripe-domäner i connect-src (js.stripe.com, *.stripe.com).
Status:      FIXAD (commit fix/B-009)
```

---

### B-010 — next.config.ts: saknar Strict-Transport-Security-header
```
Location:    next.config.ts
Category:    security
Severity:    P2
Repro:       curl -I https://svalla.se | grep -i strict → ingen HSTS-header.
Impact:      Utan HSTS kan en aktiv attacker MITM-nedgradera HTTPS till HTTP på
             osäkra nätverk. Vercel hanterar det på CDN-nivå men inte för API-routes.
Fix plan:    Lägg till Strict-Transport-Security: max-age=63072000; includeSubDomains
             i securityHeaders i next.config.ts.
Status:      FIXAD (commit fix/B-009, samma commit)
```

---

### B-011 — tracker.ts: globala watchId/nativeMode — race vid dubbel mount
```
Location:    src/lib/tracker.ts:12-13
Category:    race
Severity:    P2
Repro:       React StrictMode double-invocation av startTracking() → andra anropet
             skriver över watchId utan att cleara det första. Första GPS-watch läcker.
Impact:      GPS-minnesläcka. Kan ge dubbla GPS-callbacks i StrictMode-dev.
Fix plan:    Sluta använda module-globals. Returnera istället ett stop-objekt och låt
             komponenten hålla ref till det. Alternativt: kontrollera om watchId redan
             är satt och rensa det först.
Status:      FIXAD (commit fix/B-011)
```

---

### B-012 — Saknas error.tsx på dynamiska route-segment
```
Location:    src/app/tur/[id]/, src/app/u/[username]/, src/app/meddelanden/[id]/,
             src/app/logga/manuell/, src/app/spara/, src/app/notiser/,
             src/app/profil/, src/app/topplista/
Category:    ui
Severity:    P2
Repro:       Supabase-anrop i /tur/[id]/page.tsx kastar → hela appen visar global error.tsx.
Impact:      Utan segment-lokal error.tsx faller alla fel upp till global-error.tsx
             (som visas i <html> utan layout). Sidan ser trasig ut.
Fix plan:    Skapa minimal error.tsx i varje segment med server-komponent.
             (Fas 4 — Hardening)
Status:      Planerad (Fas 4)
```

---

### B-013 — In-memory rate limiter ineffektiv i serverless
```
Location:    src/lib/rateLimit.ts
Category:    security
Severity:    P3
Repro:       Vercel kör varje API-route i separata serverless-instanser. Map() i minnet
             delas inte mellan instanser → rate limiten fungerar bara per instans.
Impact:      Rate limiting ger falsk trygghet. En angripare som slår mot flera edge-
             locations kringgår limiten.
Fix plan:    Dokumentera begränsningen i kommentaren. Upgrade-path: Upstash Redis.
             För nu: acceptabelt, bättre än ingenting för normalt missbruk.
Status:      Dokumenterad (P3, skjuts till v2)
```

---

## Fas 2 — Säkerhetsgranskning

### API-routes auth-status

| Route | Auth | Rate limit | Service role |
|-------|------|-----------|-------------|
| /api/push/send | ✅ auth | ❌ → FIXAD B-001 | ❌ anon |
| /api/push/subscribe | ✅ auth | ✅ 10/min | ❌ anon |
| /api/push/dm | ✅ auth + membership check | ❌ | ✅ verified |
| /api/push/weekly-digest | ✅ CRON_SECRET | N/A | ✅ |
| /api/discovery | ❌ → FIXAD B-002 | ❌ | ⚠️ service-role fallback |
| /api/guide | ✅ auth | ❌ → FIXAD B-003 | ❌ anon |
| /api/trip-summary | ✅ auth | ❌ → FIXAD B-003 | ❌ anon |
| /api/report | ✅ auth | ❌ | ❌ anon |
| /api/block | ✅ auth | ❌ | ❌ anon |
| /api/gpx/[id] | ✅ auth + owner check | ❌ | ❌ anon |
| /api/backfill-routes | ✅ BACKFILL_SECRET | ✅ 1/s | ✅ |
| /api/admin/report | ✅ auth + is_admin | ❌ | ❌ anon |
| /api/stripe/webhook | ✅ STRIPE_WEBHOOK_SECRET | N/A | ✅ |
| /api/stripe/checkout | se nedan | | |
| /api/og/tur/[id] | ❌ (public OG image) | ❌ | ❌ |

### Secrets exponering
- SUPABASE_SERVICE_ROLE_KEY: Används ENDAST i api/-routes och server-side. ✅
- VAPID_PRIVATE_KEY: Används ENDAST i api/-routes. ✅
- CRON_SECRET: Används ENDAST i weekly-digest. ✅
- ANTHROPIC_API_KEY: Används ENDAST i api/-routes. ✅
- Inga secrets läckta till klienten (NEXT_PUBLIC_* är korrekt separerade). ✅

### RLS-bedömning (kodbasbaserad, ej direkt SQL-åtkomst)
- trips: RLS hanteras via feed_with_counts RPC + visibility-kolumn. Verifieras i Supabase-konsol.
- likes, comments: Anrop görs med anon-key → RLS på DB-nivå avgör. Inga service-role writes. ✅
- follows: Insert/delete med autentiserad anon-key. ✅
- push_subscriptions: Alla reads/writes via autentiserad anon-key med user_id-filter. ✅
- messages/conversations: /api/push/dm verifierar membership med svc-client innan push. ✅

### Input-validering
- Comments: maxLength={500} client-side. Ingen server-side längdcheck → P2 (acceptabelt via RLS/DB constraints).
- TripActions caption: maxLength={280} client, trim() server-side. ✅
- guide/trip-summary: messages-array skickas rakt till Anthropic utan längdcheck → P2.

### Open redirect
- check-in ?return_to: FIXAD B-004
- middleware ?returnTo + logga-in: FIXAD B-005
- Inga andra `router.push` med externt kontrollerat input hittade. ✅

### CSP
- unsafe-eval: FIXAD B-009
- Saknar Stripe-domäner: FIXAD B-009
- Saknar HSTS: FIXAD B-009

---

## Fas 3 — Fix-status

| B-nr | Severity | Status |
|------|----------|--------|
| B-001 | P1 | ✅ Fixad |
| B-002 | P1 | ✅ Fixad |
| B-003 | P1 | ✅ Fixad |
| B-004 | P2 | ✅ Fixad |
| B-005 | P2 | ✅ Fixad |
| B-006 | P2 | ✅ Fixad |
| B-007 | P2 | ✅ Fixad |
| B-008 | P3 | ✅ Fixad |
| B-009 | P2 | ✅ Fixad |
| B-010 | P2 | ✅ Fixad |
| B-011 | P2 | ✅ Fixad |
| B-012 | P2 | ✅ Fixad (Fas 4, commit 9139b6f) |
| B-013 | P3 | Dokumenterad, skjuts v2 |

---

## Fas 4 — Hardening (commit 9139b6f)

- **Error boundaries**: error.tsx skapad för 11 route-segment
  (tur/[id], u/[username], meddelanden/[id], notiser, topplista,
  profil, feed, spara, logga/manuell, tagg/[slug], platser/[id])
- **Loading states**: loading.tsx tillagd för meddelanden, meddelanden/[id],
  spara, logga/manuell
- **OfflineToast**: komponent som lyssnar på browser online/offline-events,
  injicerad i root layout
- **lib/logger.ts**: strukturerad JSON-logger, server → stdout/stderr (Vercel),
  klient → console med tid+scope

---

## Fas 3 — Commit-hashar

| B-nr | Commit |
|------|--------|
| B-001 | 6cc62a8 |
| B-002 | bf829b1 |
| B-003 | e1fba95 |
| B-004 | 1d67112 |
| B-005 | 441198d |
| B-006 | a48e68d |
| B-007 | 799a194 |
| B-008 | 13d9f78 |
| B-009/B-010 | 0d42238 |
| B-011 | 40e2af6 |
| B-012 | 9139b6f |

---

*Nästa: Fas 5 — Slutvalidering (next build, tsc --noEmit, eslint, smoke test)*
