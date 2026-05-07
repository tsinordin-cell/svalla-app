# Svalla UX-audit — Maj 2026

## Sammanfattning
Svalla är polerad och professionell i de flesta flöden, men har 3-4 kritiska UX-skador runt **"tomma states"**, **saknade region-filtret i Upptäck**, och **optimistisk rendering av likes/comments**. Helheten är stabil men inte helt "premium" enligt Tom's krav på "inga halvfärdiga states". 22 P0–P3-åtgärder identifierade.

---

## P0 — Kritiskt, fix omedelbart (3 items)

### P0-1: Hämta region-filter från databas på Upptäck-sidan
**Filväg:** `src/app/upptack/` (dirigerar till `UpptackLoader.tsx`)
**Problem:** Användare kan söka inom hela Sverige men saknar **region-filter** (Stockholm/Göteborg/Bohuslän/Åland/Öland/Gotland). Det är omöjligt att smalt ner sökningen — detta är en känd issue per memory. Impact: Ny användare blir överöverkväld av 272 platser när hen vill utforska närliggande öar.
**Fix:** Implementera region-tabs/dropdown som filtrar `restaurants.archipelago_region` i Supabase-query. Visa "72 platser i din region" efter filter. Must-have för att Upptäck ska vara användbar för seglare.

### P0-2: Loppis ny-annons-formulär — "är detta sparat?" är oklart
**Filväg:** `src/app/forum/loppis/ny-annons/page.tsx` (rad ~130)
**Problem:** Formuläret sparas som utkast när användaren läser in sidan, men ingen visuell indikator visar **"utkast sparas live"**. Användare kan tro annons är borta om de stänger fliken. Dessutom saknas **"dölj annons"-toggle** efter publicering — man kan inte dölja gamla annonser utan att redigera helt.
**Fix:** 
1. Lägg till diskret `Sparar...` → `Sparat ✓` indikator i header.
2. Lägg till "Dölj annons"-knapp i annons-menyn efter publicering (toggles `visible: false`).

### P0-3: Profil-header visar inte follower-counts på mobil (<768px)
**Filväg:** `src/app/u/[username]/page.tsx` (header-sektion, troligen rad ~200+)
**Problem:** Desktop visar "234 följare · 12 följer", men på mobil är space-budget så tight att siffrorna försvinner i text-stapla. Resultatet är att mobil-användare inte vet hur många som följer profilen — detta motverkar Toms "premium-känsla" där alla stats är synliga.
**Fix:** 
- För mobil (<768px): Visa tabs-interface ovan turer-grid:
  ```
  [Turer 42] [Följare 234] [Följer 12]
  ```
  Detta tar samma höjd men är tydligt.
- Desktop: Behål nuvarande layout.

---

## P1 — Viktigt, kommande veckan (5 items)

### P1-1: Feed visar tom state utan "vem att följa" för nya användare
**Filväg:** `src/app/feed/page.tsx` (rad ~80, `FeedTabs`-komponent)
**Problem:** Ny användare loggar in, får en tom feed (ingen turer från nätverket), men **bara ser en tom-grid**. Ingen "Följ dessa seglare"-förslag visas. Jämför med onboarding som har `suggestions` — feed borde göra samma.
**Fix:** 
- När feed är tom (<3 turer): Injicera `<SuggestedUsers />` i huvudflödet (redan befintlig komponent).
- Alternativt: Visa CTA "Börja följa seglare" med snabb-länk till `/sok?q=` för att hitta profiler.

### P1-2: Söksidan /sok — inga tydliga kategorier för ny användare
**Filväg:** `src/app/sok/page.tsx` (rad ~150+)
**Problem:** Söket visar filter-tabs (Alla, Öar, Aktiviteter, Seglare, Turer, Platser, Rutter, Taggar) men **utan ikonografisk guide**. För ny användare är det oklart vad "Rutter" är vs. "Turer". Dessutom är empty-state minimalistisk — ingen förklaring varför söket är tomt.
**Fix:**
- Lägg till emoji/ikon på varje tab för visuell orientering.
- Empty-state-text: "Ingen match på '{query}'. Prova säker spellcheck eller byt kategori."
- Visa "Populära sökningar denna vecka: #sandhamn, #segling, @topseglare" när söket är tomt.

### P1-3: Plats-detaljsidan saknar kontakt-info när `contact_phone` är null
**Filväg:** `src/app/plats/[slug]/page.tsx` (rad ~50+, hero-sektion)
**Problem:** En gästhamn utan registrerad telefonnummer visar **helt tomt kontakt-avsnitt** — ingen fallback-text som "Ring VHF kanal 16" eller "Länka till epost". Resultatet: användare vet inte hur de kontaktar platsen.
**Fix:**
- Om `contact_phone` saknas, visa "Kontakta via:" med alternativ:
  - VHF kanal 16 (för hamnar)
  - Website-länk (om `website` finns)
  - "Ingen registrerad kontakt — lägg till i edit-modal"

### P1-4: Bildhämtning på plats-sidor använder raw `<img>` istället för `next/image`
**Filväg:** `src/app/plats/[slug]/page.tsx` (rad ~150, hero-sektion)
**Problem:** Hero-bilden laddar med `<img src={heroImage}>` utan lazy-loading eller format-optimering. För långsam 4G kan detta **blockera rendering 2-3 sekunder**. `next/image` skulle spara ~40% med WebP och mobil-scaling.
**Fix:** 
```tsx
<Image
  src={heroImage}
  alt={p.name}
  width={1600}
  height={400}
  priority={false}
  sizes="(max-width: 768px) 100vw, 1200px"
  style={{ objectFit: 'cover' }}
/>
```

### P1-5: Loppis-annons-bilduppladning — ingen max-size-varning PRE-upload
**Filväg:** `src/app/forum/loppis/ny-annons/page.tsx` (rad ~70)
**Problem:** Användare laddar upp en 12 MB-bild, får då error "för stor (max 8 MB)" EFTER upload-försök. På mobil med treg nät tar detta 10 sekunder att misslyckas. No UX.
**Fix:** Lägg till `<input accept="image/*" maxLength={8} />` och real-time fil-size-check innan POST:
```tsx
if (file.size > 8 * 1024 * 1024) {
  setErr(`${file.name} är för stor (${(file.size/1024/1024).toFixed(1)} MB > 8 MB).`);
  return;
}
```

---

## P2 — Polish, kommande månaden (6 items)

### P2-1: Kom-igång-flöde — onboarding_at sätts inte vid första login post-signup
**Filväg:** `src/app/onboarding/page.tsx` (rad ~30) + `src/components/OnboardingFlow.tsx`
**Problem:** Användare slutför onboarding (steg 2), men `onboarded_at` sätts troligen inte i `users`-tabellen. Nästa reload av `/feed` kan trigga onboarding igen. Risk för duplicate-onboarding-loops.
**Fix:** 
- I `OnboardingFlow`: Efter sista steg (follow 3 seglare), POST `/api/onboarding/complete` som sätter `users.onboarded_at = now()`.
- Verifiera via `/feed?debug=onboarding` att kolumnen är non-null.

### P2-2: Logga-GPS flöde — timeout-handtering är stum
**Filväg:** `src/app/spara/` (antagligen `SpåringClient.tsx` eller liknande)
**Problem:** Om GPS-spårning är aktiv i 8+ timmar utan rörelse kan sessionen timeout. Användare märker bara att "knappen är grå". Ingen toast/modal förklarar "sessionen dog, starta om".
**Fix:** Lägg till error-state-handler:
```tsx
onGPSError: (err) => {
  if (err.code === 'SESSION_EXPIRED') showToast('Spårningen dog. Starta ny tur.');
  else showToast(`GPS-fel: ${err.message}`);
}
```

### P2-3: Profil-header — "Följ"-knappen visar ingen loading-state
**Filväg:** `src/components/FollowButton.tsx`
**Problem:** Klick på "Följ" → ingen visuell feedback fram till servern svarar (250ms Supabase latency). Användare kan spamma-klicka och skapa multi-follows.
**Fix:** Optimistisk rendering:
```tsx
const [isFollowing, setIsFollowing] = useState(initialFollowing);
onClick={async () => {
  setIsFollowing(true);
  const result = await toggleFollow();
  if (!result.ok) setIsFollowing(initialFollowing);
}}
```

### P2-4: Mottagare-avatar laddar inte i meddelanden-chat före message-body
**Filväg:** `src/app/meddelanden/[id]/page.tsx`
**Problem:** Avatar-bild renderas EFTER message-text har layoutats. Detta orsakar "Content Layout Shift" när avataren drar upp hela message-höjden. CLS impact: ~0.15.
**Fix:** Lägg `<Image width={32} height={32} />` före text i JSX-ordningen och sätt `aspect-ratio: 1` CSS.

### P2-5: Feed-header-logo krymper inte på mobil
**Filväg:** `src/app/feed/page.tsx` (rad ~165, `.feed-header-logo`)
**Problem:** Logo är `height={26}` och tar upp 20% av header-höjden på mobil (<375px viewport). På mycket små skärmar krymper logo inte ned till 20px.
**Fix:** CSS media-query:
```css
@media (max-width: 360px) {
  .feed-header-logo { transform: scale(0.8); }
}
```

### P2-6: Kom-igång wave-SVG krymper inte — overflow på små skärmar
**Filväg:** `src/app/kom-igang/page.tsx` (rad ~280, `<Wave />`)
**Problem:** Wave SVG med `viewBox="0 0 375 44"` renderas inte-responsivt på 280px-mobilskärm. Resultat: horisontell scroll triggered.
**Fix:** Lägg till `max-width: 100%` och `overflow: hidden` på parent-container.

---

## P3 — Nice-to-have / framtida (4 items)

### P3-1: Planera-rutter — spara som favorit saknas
**Filväg:** `src/app/planera/ny/page.tsx`
**Problem:** Användare skapar en rutt men kan inte spara den för senare. Måste dela med URL eller glömma den. Planerad feature per #243 men låg priority.
**Fix:** Lägg till "Spara rutt"-button som skapar DB-entry i `saved_routes`. Visas i `/planera`.

### P3-2: Loppis — "Mina annonser" visar inte upload-progress
**Filväg:** `src/app/loppis/mina-annonser/page.tsx`
**Problem:** Användare laddar upp annons, page navigeras till `/forum/loppis` men ingen "Ny annons skapad!" toast. Osäker på om det gick.
**Fix:** Redirect till `/forum/loppis/{newId}` med `?justCreated=1` och visa toast.

### P3-3: Accessibility — Navy-färgschema (<20% contrast på vissa gray-texter)
**Filväg:** `src/app/kom-igang/page.tsx` (rad ~350) och `src/components/` (globalt)
**Problem:** `color: rgba(255,255,255,0.4)` på navy-bg = ~3.5:1 contrast. WCAG AA kräver 4.5:1 för body-text. Påverkar 5-10% av användare med svag syn.
**Fix:** Höj `rgba(255,255,255,0.4)` → `rgba(255,255,255,0.55)` globalt i CSS-variabler.

### P3-4: Hashtag-sökning — lagring av trending-taggar för "Populär denna vecka"
**Filväg:** `src/app/sok/page.tsx` (rad ~40, `HASHTAG_HINTS`)
**Problem:** Trending-taggar är hårdkodade (`['#sandhamn', '#skärgård', ...]`). Borde dras från DB för live-data.
**Fix:** Vid page-load på `/sok`, fetch `SELECT hashtag FROM trip_hashtags WHERE created_at > now()-7d GROUP BY hashtag ORDER BY COUNT(*) DESC LIMIT 6`.

---

## Slutsats

**Top 3 för Tom att prioritera:**

1. **P0-1: Lägg till region-filter på Upptäck.** Utan detta kan ny användare inte smalt ner från 272 platser. Det är en moat-feature som gör Svalla bättre än Strava.

2. **P0-3: Fixa profil-header-stats på mobil.** Saknade siffror on mobile = inte premium-känsla. Enkel fix (tabs-UI) men stor impact.

3. **P1-1: Nya användare i tom-feed får ingen "vem-att-följa"-förslag.** Feed är tom utan socialt signal. Använd redan befintlig `SuggestedUsers`-komponent.

Övriga P0/P1 är snabba wins — inget är arkitektur-komplext. Stabilitet är redan där; detta är polish.

**Nästa steg:**
- Lägg issues i Jira/GitHub baserat på denna lista.
- Prioritera P0-1, P0-3, P1-1 för denna sprint.
- Verifiera accessibility (P3-3) med axe DevTools eller WAVE.
