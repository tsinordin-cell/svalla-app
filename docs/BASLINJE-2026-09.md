# Baslinje september 2026 — hur Svalla används i dag

Syfte: nästa gång frågan "blev Svalla bättre?" ställs ska svaret vara mätt, inte
resonerat. Det här är nollpunkten. Kör samma SQL om fyra veckor och jämför.

Mätperiod: **2026-08-24 → 2026-09-20** (fyra hela veckor). Källa: tabellen
`analytics_events` (vår egen logg, skrivs av `track()` i `src/lib/analytics-events.ts`).

## Tre saker att veta innan du läser siffrorna

1. **Bara samtyckande besökare räknas.** `track()` är no-op utan analytics-samtycke,
   och cookierutan lyfter fram "Endast nödvändiga". Vi vet inte hur stor andel som
   säger ja. Siffrorna är därför ett golv, inte verklig trafik. Kvoter (andel av
   sessioner som gör X) är mer pålitliga än absoluta tal.
2. **34 % av sidvisningarna är inte människor.** 71 sessioner från USA eller med
   "Claude"/"headless" i user-agent stod för 877 av 2 098 sidvisningar (12 per
   session, max 273). Det är Claudes webbläsare och våra egna kontroller. Allt
   nedan exkluderar dem: `country_code <> 'US'` och user-agent utan claude/headless/bot.
3. **Vi vet inte varifrån folk kommer.** Kolumnen `referer` innehåller alltid
   svalla.se (den sätts av fetch-anropet, inte av besökarens ursprung). Ingen
   Google/social/direkt-fördelning finns. Vercel Web Analytics är inte påslaget
   (`<Analytics />` ligger i layouten men API:et svarar "Web Analytics not found").

## Baslinjen (människor, per vecka)

| vecka | sessioner | sidor/session | ≥2 sidor | såg ö-sida | såg /upptack | såg /guider | planera/dag | sökte | dela/spara/vägbeskrivning | inloggade |
|---|---|---|---|---|---|---|---|---|---|---|
| 24 aug | 207 | 2,2 | 29 % | 31 % | 22 % | 14 % | 0 % | 0 % | 8 % | 16 |
| 31 aug | 143 | 2,1 | 36 % | 30 % | 17 % | 21 % | 0 % | 0 % | 5 % | 3 |
| 7 sep | 126 | 2,1 | 36 % | 25 % | 28 % | 15 % | 1 % | 1 % | 6 % | 5 |
| 14 sep | 92 | 2,2 | 37 % | 40 % | 14 % | 17 % | 1 % | 0 % | 1 % | 13 |
| **4 veckor** | **568** | **2,1** | **35 %** | **32 %** | **20 %** | **17 %** | **<1 %** | **<1 %** | **5 %** | — |

"Inloggade" innehåller Toms egna sessioner (entré via /logga-in: 20 st, /admin, /team).

## Vad siffrorna säger

- **Svalla är i dag en uppslagssida, inte ett verktyg.** 65 % lämnar efter en sida.
  Planera/Min dag och sök används av under 1 % av sessionerna. Dela/spara/
  vägbeskrivning sjunker vecka för vecka (8 → 1 %).
- **Ö-sidorna och guiderna är produkten.** Var tredje session ser en ö-sida; var
  sjätte en guide. Nästan alla entréer är djupa sidor (bara 44 av 568 sessioner
  började på startsidan) — det är söktrafik till enskilda öar och guider.
- **Storholmen är största ön** (47 sidvisningar, 20 entréer — mer än Sandhamn, Utö och
  Grinda tillsammans). Oklart varför; värt att titta på vilken sökning som leder dit.
- **Trafiken faller med säsongen**: 207 → 92 sessioner/vecka. Jämför alltid mot
  samma vecka föregående år, inte mot förra veckan — men vi har inget föregående år
  (page_viewed började loggas 2026-08-17).

## Vad som behöver göras för att baslinjen ska bli användbar

1. **Spara besökarens verkliga ursprung.** Skicka `document.referrer` som prop på
   sessionens första `page_viewed`. Kodändring, ingen ny tjänst.
2. **Samtyckesoberoende trafiksiffra.** Vercel Web Analytics (cookielöst) eller
   Google Search Console. Vercel-varianten är en projektinställning och kan kosta —
   Toms beslut, inte mitt.
3. **Filtrera bort agenttrafik i /admin/malet.** Sidan räknar i dag alla sessioner,
   inklusive de 71 från USA/Claude. Den överskattar med ~11 % sessioner och ~70 %
   sidvisningar.

## Så reproducerar du tabellen

```sql
with h as (
  select * from analytics_events
  where created_at >= '2026-08-24' and created_at < '2026-09-21'
    and coalesce(country_code,'') <> 'US'
    and user_agent not ilike '%claude%' and user_agent not ilike '%headless%' and user_agent not ilike '%bot%'
    and session_id is not null
), s as (
  select session_id, date_trunc('week', min(created_at))::date vecka,
    count(*) filter (where event_name='page_viewed') pv,
    bool_or(path like '/o/%') o_sida,
    bool_or(path like '/upptack%') upptack,
    bool_or(path like '/guider%') guider,
    bool_or(path in ('/planera-tur','/dag') or path like '/planera%') planera,
    bool_or(event_name = 'search_performed') sokte,
    bool_or(event_name in ('share_clicked','bookmark_toggled','directions_clicked','action_pill_clicked')) handling,
    bool_or(user_id is not null) inloggad
  from h group by 1
)
select vecka, count(*) sessioner, round(avg(pv),1) pv_per_session,
  round(100.0*count(*) filter (where pv>=2)/count(*)) pct_2plus,
  round(100.0*count(*) filter (where o_sida)/count(*)) pct_o_sida,
  round(100.0*count(*) filter (where upptack)/count(*)) pct_upptack,
  round(100.0*count(*) filter (where guider)/count(*)) pct_guider,
  round(100.0*count(*) filter (where planera)/count(*)) pct_planera,
  round(100.0*count(*) filter (where sokte)/count(*)) pct_sok,
  round(100.0*count(*) filter (where handling)/count(*)) pct_handling,
  count(*) filter (where inloggad) inloggade
from s group by 1 order by 1;
```

Byt datumen, kör i Supabase SQL-editorn, klistra in raden här under.

## Logg

| datum | ändring sedan förra mätningen | sessioner/v | ≥2 sidor | ö-sida | planera/dag |
|---|---|---|---|---|---|
| 2026-09-20 | baslinje | 142 | 35 % | 32 % | <1 % |
