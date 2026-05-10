# Plan: utöka hamn-databasen på /upptack

## Problem

Tom har upptäckt att många öar och ställen saknar tillagda hamnar på `/upptack`.
Hamnar lagras i `restaurants`-tabellen med `type: 'harbor'` och `categories: ['gasthamn']`.

## Strikt regel (efter natten 2026-05-08/09)

**Inga sub-agent-genererade hamnar.** All hamn-data ska komma från en av:

1. **Google Places API** via befintlig pipeline (`seed-expansion-from-google.mjs` / `seed-goteborg-bohuslan-from-google.mjs`).
2. **Hand-verifierad lista** med exakta koordinater (som `seed-goteborg-bohuslan-batch1.mjs`).
3. **OSM Nominatim** med spec-search per ö.

Inte tillåtet:
- Sub-agent som "skriver lista över hamnar runt Möja"
- Gissade koordinater
- "Det finns flera gästhamnar i området"-text

## Strategi

### Steg 1: Diagnostik — vilka öar saknar hamnar?

Kör i Supabase SQL Editor:

```sql
-- Räkna hamnar per ö-ord-i-namn
SELECT
  CASE
    WHEN name ILIKE '%vaxholm%' THEN 'Vaxholm'
    WHEN name ILIKE '%sandhamn%' THEN 'Sandhamn'
    WHEN name ILIKE '%möja%' OR name ILIKE '%moja%' THEN 'Möja'
    WHEN name ILIKE '%utö%' OR name ILIKE '%uto%' THEN 'Utö'
    WHEN name ILIKE '%grinda%' THEN 'Grinda'
    WHEN name ILIKE '%finnhamn%' THEN 'Finnhamn'
    -- ... (alla öar i island-data.ts)
    ELSE 'Annat'
  END as island,
  COUNT(*) as harbor_count
FROM restaurants
WHERE type = 'harbor'
GROUP BY island
ORDER BY harbor_count;
```

Eller enklare — lista alla `type='harbor'` och se vilka ö-områden som saknas helt.

### Steg 2: Google Places-batch för saknade öar

För varje saknad ö, kör Google Text Search med queries:

```
"gästhamn {ö-namn}"
"marina {ö-namn}"
"båtklubb {ö-namn}"  (filtrera bort hand-trafik)
```

Filtrera resultat:
- `types` innehåller `marina` eller `harbor`
- Inom rimlig radius av ö-koordinat (5 km)
- Rating ≥ 3.5 (om finns)
- Min 3 reviews (om finns)

### Steg 3: Manuell verifiering

För **varje** kandidat: kontrollera mot
- Skärgårdshamnar.se
- Hamnguiden.se
- Lokalt sjökort

Spara endast om alla tre källor matchar.

### Steg 4: Seed-script

Bygg `scripts/seed-stockholm-hamnar.mjs` med samma struktur som
`seed-goteborg-bohuslan-batch1.mjs`. Format per rad:

```js
{
  name: 'Sandhamns gästhamn',
  lat: 59.2880,
  lng: 18.9111,
  island: 'Sandön',
  type: 'harbor',
  categories: ['gasthamn'],
  // Källor:
  // - Skärgårdshamnar.se: https://skargardshamnar.se/sandhamn
  // - Hamnguiden: ...
}
```

### Steg 5: Kör + verifiera

```bash
node scripts/seed-stockholm-hamnar.mjs
```

Sen spotcheck på `/upptack?kategori=hamn` att de nya hamnarna visas.

## Lista över öar som troligen behöver kontrolleras

Från island-data.ts — öar utan eller med tunn `harbors`-array:

**Innerskärgården:**
- Vaxholm (har gästhamn — kolla om i db)
- Resarö
- Rindö

**Mellanskärgården:**
- Möja (har gästhamnar i Berg, Långvik — kolla)
- Svartsö
- Husarö
- Ingmarsö
- Nämdö
- Runmarö
- Gällnö
- Finnhamn
- Sandhamn (har gästhamn — verifiera)
- Grinda

**Södra:**
- Utö (gästhamn vid Gruvbryggan)
- Dalarö (gästhamn)
- Ornö
- Nynäshamn
- Smådalarö
- Landsort
- Nåttarö
- Fjärdlång

**Norra (Roslagen):**
- Furusund (gästhamn)
- Blidö
- Yxlan
- Gräddö
- Fejan (har sjökrog/pensionat — verifiera om gästhamn)
- Arholma (gästhamn)
- Lidö
- Tjockö
- Rödlöga (begränsad)

## Estimat

- Steg 1 (diagnostik): 10 min med SQL i Supabase
- Steg 2 (Google API-fetch): 30 min (manuell körning per ö)
- Steg 3 (verifiering): 1-2 h för 30 öar
- Steg 4 (seed-script): 15 min skrivande
- Steg 5 (run + spotcheck): 10 min

**Totalt: ~3 timmar fokuserat arbete.**

## Vad jag (Claude) INTE ska göra

- Inte generera namn på hamnar utan källa
- Inte gissa koordinater
- Inte skriva "det finns flera gästhamnar runt Möja, t.ex. ..."
- Inte använda sub-agent för insamling

## Vad du (Tom) kan göra omedelbart

Om du vill gå snabbare: dela en lista direkt — t.ex. de 10–20 hamnar du själv vet finns och vill ha med. Jag bygger seed-script direkt från den listan (ingen webb-search behövs då, du vet bäst).
