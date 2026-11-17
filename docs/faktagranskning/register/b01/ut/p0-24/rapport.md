# P0 24: Sista båten och avgångsrutan (läst 2026-11-17)

**Koden (MÄTT):** trafiklab.ts läser inga anmärkningar från ResRobot, så rutorna vet inte vilka turer som kräver beställning. Därför finns nu fältet `bestallningTabell`. LastBoatPanel visar direkt under tiden att den kan gälla en beställningstur, att sista båten utan beställning då går tidigare och vilken tabell som visar det. DepartureWidget säger samma sak direkt under turerna.
**Sandhamn (MÄTT, 16B):** på torsdagar är 1630 sista turen utan beställning och 1612 (B) den sista turen totalt. **Möja (MÄTT, 14):** tur 1441 (onsdag och torsdag) har Xb vid Möjaström.
**Reseplanerare:** `getReseplanerare()`. Brännö, Styrsö, Donsö, Vrångö och Asperö (ursprung Saltholmen) får Västtrafik, Aspö får Trafikverkets sida om Aspöleden och övriga öar SL. Aspö är RESONERAT och går till Vaktens lista. https://sl.se/sv/reseplaneraren visar "Sidan kunde inte hittas" (MÄTT), så alla SL-länkar går nu till https://sl.se/. Det gäller även ThorkelRouteCard.tsx (rad 73 och 87); den förifyllda sökningen är borttagen.

## Befintliga noter (MÄTT med skript/tabell.py)
Stämmer: Sandhamn 16, Möja 14 (även 10 och 12), Husarö 10/12/13, Kymmendö 19, Fjärdlång 19 och Tynningö 4. tidsObs stämmer för Fjäderholmarna (2), Möjaström (14) och Norehill (4).

## Nya noter (Redaktörens beslut): 21 öar med bestallning och bestallningTabell, Blidö med stangd
Noten säger hur stor del av turerna det gäller ("några", "en del", "en stor del", "många", "alla … i tabell 10/31"). Den säger "går" för tur-märkning B/C, "stannar" för bryggmärkning b/c, och anger bara de frister som finns vid bryggan. Underlaget för varje ö står i kommentaren ovanför KÄLLA-raderna.
Sista turen från ön kan vara en B-tur:
- Runmarö (16 eller 23, tur 1612) och Nämdö (17, tur 1708)
- Landsort (29, tur 2908) och Arholma (30, turer 3014 och 3078)
- Furusund (25 eller 28, turer 2868, 2820 och 2882)
- Norröra och Gräskö (28, turerna 2868 och 2820)
- Fejan (31, turer 3108 och 3110) och Lidö (31, tur 3110; många turer, men inte 3152 och 3182)
- Dalarö (19 eller 20) och Finnhamn (10, 12 eller 13, tur 1318)

Därefter:
- Utö (21: b på 18 av 28 turer i 21A; tur 1936 i tabell 19 går bara 17 augusti till 13 september, därför ingen B i noten)
- Norra Ingmarsö (10 eller 12) och Norra Svartsö (10 eller 12; en stor del, 1073 och 1075 utan anmärkning)
- Gällnö (11 eller 14) och Grinda (11 eller 13; bara Södra Grinda, turerna 1477 och 1475)
- Åsättra/Ljusterö (10), Resarö (5), Ornö kyrka (19), Eknö (16) och Rödlöga (28: alla turer därifrån har b sedan 2 november)

**Rättat efter Kontrollanten:** tabell 28 är avsnittet 1 oktober till 12 december i h28.pdf (sidorna 3 och 4). v28.pdf är en äldre fil, och mitt påstående att h28 bara gällde till 30 september var fel. **Blidö:** enligt h28 är Bromskär avstängd till juni 2027, och ingen annan brygga på Blidö står i tabellen. Därför har noten om beställning strukits (s005–s007). Nytt fält `stangd`: texten "Bryggan Bromskär på Blidö är avstängd till juni 2027 på grund av renoveringsarbeten, enligt Waxholmsbolagets tabell 28." (k087) visas i stället för tider i båda rutorna, i /api/transit/departures och /api/transit/last-departure, i utflyktens Battider och i Thorkels get_transit_to_island (k089; inget ruttkort). Meningen "Därför visar vi inga båttider hit" är struken (s010). Thorkels gren INGA AVGÅNGAR ÅTERSTÅR skickar nu med reseplanerare (k090). Inga andra ställen hämtar tider till Blidö (MÄTT med grep; ferries.ts har ingen Bromskär-rutt). destStopId är oförändrat, eftersom inget annat id är uppmätt. **Thorkel** (route.ts 419, 443, 703) hänvisar nu till getReseplanerare eller neutralt till trafikbolagets reseplanerare (k088). Alla tabeller är lästa igen och är oförändrade. Tabell 25, 30 och 31: h och v har samma text.
Ingen beställningstur: Vaxholm och Fjäderholmarna (2), Nåttarö (22), Höganäs (Tynningö).
Inte prövat: Yxlan Vagnsunda (står inte i tabellerna) och öar med bara buss eller bro. Tabell 24, 26 och 27 gällde till 1 november.
**Västtrafik (tillägg, MÄTT):** Vrångö har anmärkning t, "t Anlöps för påstigning efter föranmälan till båtens mobiltelefon" och "senast 15 min före avgång.", på sista kvällsturen måndag till fredag och söndag och på nattturerna (tabell 281/282). Ön har fått bestallning och bestallningTabell ("Västtrafiks tidtabell för linje 281"). Västtrafiks sida för linje 281 länkar till pdf:en. Inga anmärkningar om föranmälan finns vid Donsö eller Styrsö Bratten (281/282), och inga vid Brännö Rödsten eller Asperö Norra (283, pdf:en är hämtad via Västtrafiks sida för linje 283). Anmärkning b, "Anslutning till båt mot Brännö Rödsten. Ibland krävs föranmälan", står bara vid Asperö Östra, som inte finns i transit-stops.ts.
Aspö-noten säger "Skärgårdsbåt", men enligt Trafikverket är Aspöleden en vägfärja (Vakten).

## Kontroller
- 62 poster i edits.json. Torrkörningen gav 62 av 62 ok.
- I p0-24/torr: tsc 0 fel, generera-kallor och --kontroll ok, vitest src/lib 70 filer och 732 tester gröna.
- skript/kontrollera_citat.py: 612 citat i underlag.tsv (87 rader; k032–k034 strukna, k087–k090 nya; ändrade rader märkta i kolumn 9) och i nya KÄLLA-rader. Alla står ordagrant i kallor/, och inget kid är dubblerat.
