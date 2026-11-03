# Sidmallarna, batch 01 – omarbete efter Kontrollanten (2026-11-02)

Arbetskopia: /home/claude/svalla-mallar (inte committad). Register: docs/faktagranskning/register/b01/mallar.tsv.
En rad per kid: vad som ändrades och var. MÄTT = räknat med tsx mot datan; RESONERAT = läst i koden.

## Del 1 – komma-dit, titlar, FAQ, kontotexten
- k007 (mall-0174): `usesWaxholmsbolaget` räknar bara allmänna färdsätt; Yttre Gårdens "Ingen reguljär båt" ger inte längre Waxholmsbolagets regler. src/app/o/[slug]/komma-dit/page.tsx, src/app/o/[slug]/med-barn/page.tsx. MÄTT: 34 → 33 öar.
- k152 (mall-0166): regexen för egen båt tar med "egen eller hyrd båt", "fritidsbåt" och "ingen reguljär". komma-dit/page.tsx (undertitel och FAQ). MÄTT: "Ingen egen båt krävs." 95 → 94 öar; Storholmens FAQ-svar utan "Fritidsbåt".
- k082 (mall-0170): FAQ-frågan säger "resan" när allmän båt saknas. komma-dit/page.tsx. MÄTT: båten 76, resan 25.
- k137, k138 (mall-0161, mall-0160): gemensam titel byggs av öns färdsätt (`harBat`, `kommaDitTitel(slug, namn, färdsätt)`). src/lib/kommaDitTitlar.ts, komma-dit/page.tsx (två anrop), src/lib/kommaDitTitlar.test.ts (förväntad titel). MÄTT: 72 "Båt och resväg", 16 "Bil och buss", 13 egen titel.
- k089 (mall-0171): gotska-sandon `transport_meta.nearest_hub` 'Fårösund / Nynäshamn' → 'Fårösund', KÄLLA-raden läst i dag. src/app/o/island-data.ts. MÄTT: 1 ö.
- k099 (mall-0172): länktexten "Tidtabell (pdf) →" när målet är en pdf. komma-dit/page.tsx. MÄTT: 4 länkar på Ingarö, Smådalarö, Rörö.
- k010 (mall-0189, även mall-0188): "Kräver ett gratis konto." → "Ruttplaneraren fungerar utan konto. Logga in när du vill spara och dela." Knappen leder till /planera (oförändrad). komma-dit/page.tsx, bad/page.tsx, med-barn/page.tsx. Alla 101 öar.
- k017 (mall-0185), k018 (mall-0095), k049 (mall-0162), k128 (mall-0163): INAKTUELL, texten finns inte längre i koden. Ingen kodändring.

## Del 2 – källistan, guider, aktivitetslänkar, badsidan, titlar
- k027, k145 (mall-0087, mall-0086): 'blekingetrafiken.se' borttagen ur MYNDIGHET_DOMAN; källistan omgenererad. scripts/generera-kallor.mjs, src/app/o/kallor.generated.ts. MÄTT: märket försvinner från 5 källor på Aspö, Sturkö, Hanö, Tjärö (433 → 428 myndighetskällor).
- k071 (mall-0103): 84 kopplingar där guiden inte nämner ön borttagna, 67 kopplingar till guider som nämner ön minst två gånger tillagda (37 nya nycklar, 22 tomma nycklar borttagna). src/app/guider/guide-island-map.ts. MÄTT: 207 kopplingar, 0 utan omnämnande; Styrsö 17 → 9, Brännö 13 → 5, Ulvön 11 → 10 guider.
- k098 (mall-0093): "Mat & krogar" kräver ställen i öns restauranglista, "Segling" en hamn eller ett seglingsord. src/app/aktivitet/activity-data.ts (islandActivitiesForType). MÄTT: 286 → 273 länkar, 13 borttagna.
- k023 (mall-0198): "strand" ersatt av "sandstrand", "sandstränd", "stenstrand" i filtret och i hasBad. src/app/o/[slug]/bad/page.tsx. MÄTT: korten 101 → 85 (18 bort, 2 till).
- k002 (mall-0192): undertiteln säger "med beskrivning" bara när en badplats har beskrivning. bad/page.tsx. MÄTT: 14 öar med beskrivning i datan, 18 bara namn (platsdatabasen RESONERAT).
- k105 (mall-0191): metabeskrivningen säger "med beskrivning" bara när någon badplats i datan har det. bad/page.tsx. MÄTT: 14 med, 87 utan.
- k016 (mall-0124): aktivitetsnamnen i beskrivningen står som i datan (inga gemener). src/app/o/[slug]/aktiviteter/page.tsx. MÄTT: 101 öar.
- k076 (mall-0002): ösidans standardtitel och beskrivning byggs av det ön har (mat, boende, badplatser). src/app/o/[slug]/page.tsx (generateMetadata). MÄTT: 30 titlar ändrade, 39 beskrivningar.
- k129 (mall-0132): "Mat och dryck på X" i titel och H1 när ön bara har kafé, kiosk eller handel. src/app/o/[slug]/restauranger/page.tsx. MÄTT: 12 öar.
- Twitter (ny rad mall-N001): twitter:description samma som og:description; "Guide till Tynningö i ." och regionnamn med gemener borta. src/app/o/[slug]/page.tsx. MÄTT: 101 öar (3 utan region, 98 med).

## Del 3 – hantverkare, företagskortet, besöksräknaren, JSON-LD-bilden
- k096, k120, k130, k158 (mall-0236, mall-0234, mall-0237, mall-0235): metabeskrivningens fråga byggs av de behovsgrupper (BEHOV) som öns poster täcker; bara sjötransport ger "Behöver du få hit folk och material till X?"; ett företag i singular. src/app/o/[slug]/hantverkare/page.tsx (generateMetadata). MÄTT: 15 öar, se registret.
- k008, k113 (mall-0074, mall-0075): "— kör hit med båt" bara när ön inte nås med bil eller buss utan båt. src/components/HantverkarKort.tsx (ny `nasUtanBat`, prop `utanBat`), src/components/IslandHantverkare.tsx (prop), src/app/o/[slug]/hantverkare/page.tsx och src/app/o/[slug]/page.tsx (skickar `utanBat`). MÄTT: Vaxholm 1 kort utan tillägget, 26 kort på 14 öar med.
- k034, k155 (mall-0019, mall-0018): "har markerat X som besökt i Svalla" → "har X bland sina besökta öar i Svalla". src/app/o/[slug]/page.tsx. RESONERAT (kod; databasen inte läst).
- k035 (mall-0011): JSON-LD image = öns foto (OBILDER) som ImageObject med fotograf, licens och Commons-sida; ingen bild där foto saknas. src/app/o/[slug]/page.tsx (import av ../obilder.generated). MÄTT: 96 med foto, 5 utan.

## Del 4 – kompensation
- k007 följd (ny rad mall-N002): rutan "Praktiska tips" på komma-dit visas också för öar utan allmän trafik, med två punkter om allemansrätten på vatten och skyddade områden (Naturvårdsverket, läst 2026-11-03). src/app/o/[slug]/komma-dit/page.tsx. MÄTT: 7 öar (Svenska Högarna, Ormskär, Norrpada, Långviksskär, Långskär, Storskär, Yttre Gården).

## Inte åtgärdat i den här rundan
- k020 (mall-0253): Styrsös radie i src/lib/islandCoords.ts är Toms beslut; filen är oförändrad.
- P0-raderna (k014, k025, k039, k056, k059, k084, k086, k101, k107, k110, k111, k161, k167): avgångsrutan, Sista båten, transit-stops.ts m.fl. rättas i P0-grenen.

## Risk: sidor som blir tunnare (MÄTT, tsx 2026-11-03)
- Badsidan (k023): kort som inte handlar om bad togs bort ur "Bad och vattenliv". Öspecifika ord på badsidan före → efter: Muskö 78 → 25, Ven 73 → 18, Birka 51 → 13, Öland 66 → 29, Fårö 63 → 26, Öckerö 95 → 48, Tynningö 131 → 83, Gålö 60 → 33, Dyrön 119 → 86, Klädesholmen 72 → 46, Kungshamn 33 → 12, Smögen 33 → 11, Mörkö 42 → 25; Huvudskär, Blå Jungfrun, Marstrand och Grebbestad 30–35 → 0 men får i stället den allmänna texten om allemansrätten och kartan (cirka 40 ord). Askö 0 → 25 och Ulvön 24 → 57. Platsdatabasens badplatser på samma sidor är inte räknade (databasen inte läst). Kompensation kräver öspecifika badplatser ur kommunernas egna källor, alltså öarnas egna granskningar.
- Ösidans guidelista (k071): Styrsö 17 → 9 och Brännö 13 → 5 guider (Ulvön 11 → 10); fyra kort syns fortfarande på alla tre.

## Fynd utanför uppdraget
- scripts/generera-kallor.mjs, slaIhop: det längsta citatet för en URL paras med det senaste läsdatumet. MÄTT: 104 URL:er visar ett citat från en annan läsning än datumet; Gotska Sandöns källa visar nu 2026-11-02 bredvid ett äldre citat om säsongen 2026, medan sidan nu anger 28 maj–29 augusti 2027.
- /aktivitet/<typ>/<ö>: korten kommer fortfarande ur ordmatchningen (t.ex. "Cykling" och "Grytholmens friluftsmuseum" under Segling på Muskö). islandsForActivity (listsidorna, sitemap) är oförändrad.
- visited_islands: de gamla passagerna från före 2026-10-26 ligger kvar som besök; att flytta dem är en databasändring (Tom).

## Ändrade filer i den här rundan (utöver förra rundans 72 ändringar)
scripts/generera-kallor.mjs · src/app/o/kallor.generated.ts (omgenererad) · src/app/aktivitet/activity-data.ts · src/app/guider/guide-island-map.ts · src/app/o/island-data.ts (Gotska Sandön) · src/app/o/[slug]/page.tsx · src/app/o/[slug]/komma-dit/page.tsx · src/app/o/[slug]/bad/page.tsx · src/app/o/[slug]/med-barn/page.tsx · src/app/o/[slug]/aktiviteter/page.tsx · src/app/o/[slug]/restauranger/page.tsx · src/app/o/[slug]/hantverkare/page.tsx · src/components/HantverkarKort.tsx · src/components/IslandHantverkare.tsx · src/lib/kommaDitTitlar.ts · src/lib/kommaDitTitlar.test.ts
Inte rörda: src/lib/islandCoords.ts, DepartureWidget/Sista båten, transit-stops.ts, trafiklab.ts, ferries.ts, /api/transit.

## Kontroller (2026-11-03)
npx tsc --noEmit: 0 fel · node scripts/verify-claims.mjs: exit 0 (2 kända i baslinjen) · node scripts/generera-kallor.mjs --kontroll: aktuell (101 öar, 1 599 källor) · npx vitest run src/lib/kommaDitTitlar.test.ts: 53/53.
Register: 37 rader omarbetade eller nya (mall-N001 twitter, mall-N002 kompensation), kolumnen kontrollant tom.

## Andra rundan (omkontrollen 2026-11-03: 18 OK, 12 FEL) – mätt mot datan med badkompensationen (81 badplatser på 41 öar)
- k002 (mall-0192): badtunnor räknas inte som bad (`omBad`); Lidö får undertiteln "Vad som gäller när du badar vid Lidö …". src/app/o/[slug]/bad/page.tsx. MÄTT: 1 ö.
- k076 (mall-0002): samma undantag i `harBadData`; Lidös beskrivning utan "badplatser". src/app/o/[slug]/page.tsx. MÄTT: 1 ö.
- k105 (mall-0191): metabeskrivning och og:description blir "Vad som gäller när du badar vid X och i resten av skärgården." på öar utan badplats och utan bad i aktiviteterna. bad/page.tsx. MÄTT: 27 med beskrivning, 48 med namn, 26 utan bad.
- k016 (mall-0124): "Det här kan du göra på och från X". src/app/o/[slug]/aktiviteter/page.tsx. MÄTT: 101 öar.
- k082 (mall-0170): "båten" bara när ön inte nås med bil eller buss utan båt (`nasUtanBat`, nu med bro och fast förbindelse som stöd). src/app/o/[slug]/komma-dit/page.tsx, src/components/HantverkarKort.tsx. MÄTT: båten 66, resan 35 (nytt resan på 10, bl.a. Hamburgsund, Grebbestad, Lysekil, Grundsund, Orust, Resarö); företagskorten oförändrade (bara Vaxholm utan "kör hit med båt").
- k138, k139 (mall-0161, mall-0160): för orter (slag ort) räknas inte båtarna i titeln. komma-dit/page.tsx (`titelFardsatt`). MÄTT: Lysekil och Grebbestad "Bil och buss", Hamburgsund "Resväg".
- k154 (mall-0166): "Ingen egen båt krävs." bara på öar som nås på väg (27); övriga med allmän trafik "Utan egen båt kommer du dit med trafiken nedan, när den går." (67); FAQ "Nej, inte när trafiken går: …". komma-dit/page.tsx.
- k098 (mall-0093): "Segling på" kräver en hamn för besökande båtar eller ett seglingsord (`harGasthamn`). src/app/aktivitet/activity-data.ts. MÄTT: 273 → 271 (Eknö, Gräskö).
- k010 (mall-0189, även mall-0188): "Ruttplaneraren fungerar utan konto. Logga in om du vill spara rutten i dina rutter." komma-dit, bad och med-barn. Alla 101 öar.
- k099 (mall-0172): länktexten "Tidtabell →" för trafikverket.se (Rörös Nordöleden). komma-dit/page.tsx. MÄTT: 1 länk.
- k137 (mall-0253): Styrsös radie, hos Tom; inte ändrat.
- Badkompensationens rader i island-data.ts och bohuslan-data.ts är inte rörda. Kontroller: tsc 0 fel, verify-claims exit 0 (2 kända), generera-kallor omgenererad (1 624 källor, oförändrad mot --kontroll), vitest kommaDitTitlar 53/53.
