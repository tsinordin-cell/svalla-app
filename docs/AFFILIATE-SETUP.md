# Affiliate-setup för Svalla

Praktisk guide för att gå från "kod är pushad" till "intäkter trillar in".

## Status idag

Koden för affiliate är på plats — komponenter, click-tracking, DB-tabell, och
en första integration på `/tur/[id]`. Men inga program har trackingTemplate
satt, så länkarna går just nu **direkt till annonsören** utan provision.
Det funkar — UX:n är på plats — men vi tjänar inga pengar förrän vi signat
upp.

## Steg 1 — Adtraction-konto (svenska program)

1. Gå till https://www.adtraction.com/sv/publishers
2. Skapa publisher-konto för Svalla. Använd `info@svalla.se`.
3. Lägg in domän `svalla.se`. Verifiera via TXT-record.
4. Ansök om följande program (kategori "Båt & Motor", "Resa", "Sport"):
   - Båtagent
   - Navigationsbutiken
   - Watski
   - Hjertmans
   - Webhallen (för elektronik som GPS, plotters)
5. När ett program godkänns — klicka "Skapa länk" → "Deep link"-mode →
   kopiera tracking-URL-mallen. Den ser ut såhär:
   ```
   https://track.adtraction.com/t/t?a=1234567&as=8901234&t=2&url={DEEP_LINK}
   ```
   Där `a=` är ditt aff-ID och `as=` är program-ID.

## Steg 2 — Awin-konto (internationella program)

1. Gå till https://ui.awin.com/awin-application
2. Samma procedur som Adtraction.
3. Ansök om:
   - Helly Hansen
   - Booking.com
   - TheFork
   - Decathlon (om du vill bredda till friluftsliv)
4. Awin-mallen ser ut såhär:
   ```
   https://www.awin1.com/cread.php?awinmid=12345&awinaffid=67890&clickref={CLICKREF}&p={DEEP_LINK}
   ```

## Steg 3 — Lägg in trackingTemplate i koden

Editera `src/lib/affiliate.ts` → leta upp programmet i `PROGRAMS`-objektet
→ klistra in `trackingTemplate`. Exempel:

```typescript
watski: {
  id: 'watski',
  name: 'Watski',
  network: 'adtraction',
  trackingTemplate: 'https://track.adtraction.com/t/t?a=1234567&as=8901234&t=2&url={DEEP_LINK}',
  brand: 'watski.se',
  category: 'Båttillbehör',
},
```

`{DEEP_LINK}` är platshållaren — vår `buildAffiliateUrl()` ersätter den med
den UTM-taggade deep-linken till slutproduktsidan.

Pusha. Klart. Länkarna börjar konvertera.

## Steg 4 — Lägg till nytt program

1. Öppna `src/lib/affiliate.ts`
2. Lägg till en ny post i `PROGRAMS`-objektet med id, name, network, brand,
   trackingTemplate och category.
3. Använd `<AffiliateLink program="ditt-id" linkId="..." placement="..." deepLink="..." utmCampaign="..." />`
   där det passar.

## Lägga in en ny placement på en sida

Just nu finns en `placement`: `'tur_gear'`. För att lägga till fler:

1. Editera typdefinitionen i `src/components/AffiliateLink.tsx` (`placement`-typen).
2. Skapa en ny komponent (t.ex. `<KrogBookingAffiliate>`) eller använd
   `<AffiliateLink>` direkt på lämplig sida.
3. Använd unik `linkId` per länk-position så vi kan se per-kort-CTR i `affiliate_clicks`.

Förslag på nästa placements:
- `plats_book` — "Boka bord" på `/platser/[id]` → TheFork
- `krog_book` — "Boka bord" på `/krogar/[id]` → TheFork
- `guide_recommend` — Recensioner på `/guide/*` → vilket som helst
- `route_gear` — På `/rutter/[id]` — utrustning för specifika rutter

## Mätning

Två datakällor:

1. **Affiliate-nätverkets dashboard** — visar provision (kr in), konvertering,
   och refunds.
2. **Vår egen `affiliate_clicks`-tabell** — visar klick per placement och
   linkId. Inga IP-adresser sparas (HMAC-hashade dagliga salts).

KPI:n som spelar roll är **RPM (revenue per 1000 visits)** per placement.
Om en placement har RPM < 50 SEK efter 4 veckor — ta bort den. Det är inte
värt UX-kostnaden.

Query för RPM (kör i Supabase SQL-editor):

```sql
select
  placement,
  count(*) as clicks,
  count(distinct ip_hash) as unique_clickers
from affiliate_clicks
where clicked_at >= now() - interval '30 days'
group by placement
order by clicks desc;
```

## Compliance

- Alla affiliate-länkar har `rel="sponsored noopener noreferrer"` (Google's krav)
- Alla länkar har "Annons"-badge eller sektion-disclosure (svensk marknadsförings-
  lag — KO-regler om reklam)
- Vi sparar ingen rå IP — bara HMAC-hashade dagliga rotationer

## Nästa steg när trafiken byggs upp

- A/B-testa placement-positioner (under karta vs. under tidslinje)
- Lägg in 2-3 sponsored Loppis-platser (sponsored båtannonser från Båtagent)
  med tydlig "Sponsrad"-flagga
- Bygg `/guide/basta-flytvasten-2026` — review-content + affiliate. Det är
  där affiliate verkligen tjänar pengar (people googla, vi rankar, de köper)
