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

## Google Search Console — den samtyckesoberoende siffran

Läst i GSC 2026-09-21, egendom https://svalla.se/, 22 aug–18 sep (28 dagar):
**1 440 klick, 139 000 visningar, CTR 1 %, snittposition 12,6.**

Jämförelse per sida, GSC-klick mot våra entréer (första sidvisningen i en session,
människor, samma 28 dagar):

| sida | GSC-klick | våra entréer |
|---|---|---|
| /guider/hummerpremiar-bohuslan-2026 | 53 | 2 |
| /guider/barplockning-skargarden | 32 | 8 |
| /guider/host-stockholms-skargard-2026 | 31 | 7 |
| /guider/basta-badplatser-bohuslan | 27 | 1 |
| /upptack/getfoten-sjokrog | 19 | 3 |
| /host | 19 | 5 |
| /o/storholmen | 17 | 9 |
| /karta | 17 | 9 |
| /blogg/basta-restaurangerna-sandhamn | 14 | 3 |
| /upptack/waxholms-gasthamn-och-rent-under-batbotten-tvatt | 14 | 1 |
| **summa topp 10** | **243** | **48** |

RESONERAT ur detta: vi loggar ungefär **en av fem** Google-besökare (48/243 ≈ 20 %).
Verklig trafik är alltså ~5× tabellens siffror: i storleksordningen 600–700
sessioner/vecka bara från Google, inte 140. Kvoterna i baslinjetabellen står sig;
de absoluta talen ska multipliceras med ~5.

Två saker att gå vidare med, egna kort:
- **CTR 1 % på 139 000 visningar.** Hummerpremiären visades 13 786 gånger och fick
  53 klick. Titlar och beskrivningar på sidorna med flest visningar är den billigaste
  trafikökningen som finns.
- **Storholmen** har fler entréer än Google-klick förklarar (9 mot 17 med ~20 %
  samtycke borde ge 3–4). Trafiken kommer någon annanstans ifrån. Ursprungsfältet
  (från 2026-09-20) svarar på det om en vecka.

## Vad som är gjort sedan baslinjen

1. ✅ **Ursprung sparas** (PR #325): `document.referrer` som värdnamn på sessionens
   första `page_viewed`, i kolumnen `referer`. Rader före 2026-09-20 22:45 UTC ska ignoreras.
2. ✅ **Samtyckesoberoende siffra** — Google Search Console finns redan, se ovan.
3. ✅ **Agenttrafik bort** (PR #325): `/api/analytics/track` skriver aldrig agent-UA;
   `/admin/malet` och `/admin/insikter` filtrerar med `baraManniskor()` från
   `src/lib/analytics-filter.ts`.

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
