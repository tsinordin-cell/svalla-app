# Batch 01, runda 12 (2026-11-25): rättelserna efter den tredje kontrollen

Granskaren och Skribenten. Läsdatum 2026-11-25. Kopia: 0672f0b + mallar-arbetskopia.patch + de tolv edits.json; borttagen efteråt. Säkerhetskopior: scratchpad/b01/runda12/fore/. Källtexter: scratchpad/b01/runda12/kallor/ (egna hämtningar med curl; kontrollant/ = Kontrollantens kopior från i dag, runda11/ = runda 11:s kopior från i dag). Skript: runda12/skript/. I registren står «Runda 12 (kid): …» först i kolumnen rätt uppgift.

## Registerpunkter (ingen kodändring)
- ur01-k005 (lag3a-N004): ny text = slutkodens Singö-text (utan Fogdö-meningen). h637, h676676x.
- ur01-k006 (lag3a-0004): ny text = slutkoden (parkeringen tillskriven Hotell Furusund); KÄLLA + hotellfurusund.se/hotellet/.
- ur01-k015 (lag3a-N020): ny text = slutkodens två meningar (434 bara vissa turer via Stavsnäs vinterhamn); citat + h434 «2) Endast vissa turer.».
- ur01-k023 (moja-0155): KÄLLA = stockholmslansmuseum.se/besoksmal/moja-bockon-och-lokaon/ (ryssugnarna och 1719).
- ur01-k024 (moja-0463): KÄLLA = konsummoja.se ; Möjafoldern 2018 ; markanvisningen 2023.
- ur01-k037 (lag3a-N005): KÄLLA + h631 och norrtalje.se …/bjorkooren/.
- ur01-k042 (styrso-N032): KÄLLA = api.openstreetmap.org relation 6429433 (Styrsö, place=island).
- ur01-k043 (lag3b-N031): ny text = slutkoden med folderns år 2018 i dåtid.
- ur01-k044 (lag3a-N007): KÄLLA + h845 och lansstyrelsen.se …/galo.html.
- ur02-k039 (sandhamn-0566): förbehållet i registret: toaletterna bara maj till september (KSSS).
- ub01-k027 (storholmen-N009, N011–N013, 0132, 0172, 0173): ny text = slutkoden. Kontrollen visade att isundantaget och de 15 cyklarna INTE var tillskrivna, så storholmen.edits.json post 14 skriver nu «Enligt Lidingö stad …» för båda (lidingo.se …/batpendla/, omläst).
- ub01-k029 (styrso-0177–0179): ny text = slutkodens Båtebacken-text.
- ub02-k011 (lag3b-N001): ny text = slutkoden utan klockslag.

## Kodpunkter (index i edits.json räknas från 0, som i nyckeln)
- ub01-k014 (sandhamn post 24, sandhamn-N023): «Säsongen 2026 hade Dykarbaren öppet maj till september, enligt sin webbplats.» dykarbaren.se «Öppet 2026», «säsong maj – september».
- ub01-k024 (sandhamn post 29, sandhamn-0076): bestReason: «… och KSSS servicehus (maj till september) är öppna. Dykarbaren hade säsongen 2026 öppet maj till september.»
- ub01-k023 (styrso post 0 och oSok-posten 24, styrso-0010): tagline «… med drygt 1 300 folkbokförda 2020 …». SCB OarEjBro01 (1341, 2020 senaste år). SCB:s tätortstabell (LandarealTatortN, 2023) har bara «Styrsö och Donsö» tillsammans, så inget aktuellt tal för ön.
- ub02-k010 (lag3-a post 22, lag3a-N019): «ett sandparti på den sydvästra delen av ön, med en klipphäll ytterst». Objektbladet omläst.
- ub02-k016 (lag3-a post 20, lag3a-N017): from: 'Stavsnäs' borttaget (fältet är valfritt). Ingen tillåten källa anger Stavsnäs (Länsstyrelsens sida omläst; Skärgårdsstiftelsen förvaltar inte reservatet). Inga tider.
- ub02-k023 (utanfor-b01 post 15, utanfor-R002): «får inte röra, ändra eller skada vraken» struken: den står inte i 01FS 2023:14 eller 2023:15 (omlästa), och dykparken skriver den som allmän regel, inte som sitt villkor.
- ub02-k006 (utanfor-b01 post 12, utanfor-N016): «Ön är bilfri. Enligt Västtrafik når du de bilfria öarna i södra skärgården, med Brännö längst i norr, med båtlinjerna från Saltholmen på en biljett för zon A, och Brännöföreningen skriver att en spårvagnsbiljett räcker.» vasttrafik.se/om-vasttrafik/blogg/upptack-zon-a/ (odaterad bloggsida, live i dag); brannoforeningen.se. Västtrafiks prishandbok 2026 har bara en bildtext «Zon A. Södra skärgården, Göteborg.» och används inte.
- ur01-s04 (ny post sist i utanfor-b01, post 18; utanfor-N026): Trysundas beskrivning: «Det lilla kapellet från 1654 har väggmålningar.» Folderns «litet kapell, från 1654» och Länsstyrelsens sida «fiskarkapellet från 1600-talet med sina vackra väggmålningar». Församlingens KÄLLA borttagen. lag3b-N002 har fått en hänvisning.
- ub01-k016 (uto.sql, uto-0401): namnbytet ersatt med en sats som döljer posten (FÖRE-kommentar): update restaurants set hidden_at = now(), hidden_reason = '…' where slug = 'lilla-haket-ninas-bod' and hidden_at is null. uto.tom.md har Redaktörens rekommendation och skälet (en adress som namn är missvisande). Inget kört.

## Sidor (ord, renderat med matt10.tsx och db-riktig.json; main = 0672f0b)
| sida | main | före | efter | av main |
|---|---|---|---|---|
| trysunda ösida | 4 390 | 4 375 | 4 370 | 99,5 % |
| dalaro ösida / bad / aktiviteter | 4 956 / 2 851 / 2 793 | 5 508 / 2 943 / 2 898 | 5 488 / 2 932 / 2 887 | 110,7 / 102,8 / 103,4 % |
| langskar ösida / komma-dit / boende | 3 313 / 2 758 / 2 661 | 3 519 / 2 994 / 2 747 | 3 515 / 2 992 / 2 745 | 106,1 / 108,5 / 103,2 % |
| sandhamn ösida / restauranger | 5 846 / 2 674 | 7 133 / 2 685 | 7 143 / 2 692 | 122,2 / 100,7 % |
| styrso ösida | 4 584 | 5 766 | 5 767 | 125,8 % |
| branno ösida / aktiviteter | 4 402 / 2 803 | 4 611 / 2 916 | 4 662 / 2 933 | 105,9 / 104,6 % |
| storholmen ösida / komma-dit / boende / med barn | 3 842 / 2 843 / 2 731 / 2 839 | 4 242 / 3 137 / 2 803 / 2 925 | 4 266 / 3 149 / 2 815 / 2 937 | 111,0 / 110,8 / 103,1 / 103,5 % |
| yttre-garden ösida / komma-dit / boende / med barn | 4 454 / 2 903 / 2 846 / 3 045 | 4 748 / 3 076 / 2 946 / 3 131 | 4 764 / 3 084 / 2 954 / 3 139 | 107,0 / 106,2 / 103,8 / 103,1 % |
Ingen sida under 95 %. Inga ändrade klockslag (matt10:s klockslagsregel, före = efter på alla sidor). Inga tankstreck i de nya texterna.

## Kontroller (kopian)
- applicera.mjs, tolv filer i ordning: 351 ok, 0 fel (utanfor-b01 19).
- npm run -s prebuild: exit 0 efter generera-kallor (första körningen: «kallor.generated.ts är inaktuell», som väntat). verify-claims «inga NYA påståenden utan källa», källor 144 öar/1943, vitest 112 filer, 997 tester gröna.
- npx tsc --noEmit -p .: exit 0. node scripts/verify-claims.mjs: exit 0 (utan --uppdatera-baslinje). node scripts/generera-kallor.mjs --kontroll: exit 0. npx vitest run src/lib: 997 gröna.
- Citat: 182 av 182 citat på ändrade rader och nya KÄLLA-rader med läsdatum 2026-11-25 står ordagrant (blanktecken normaliserade) i runda12/kallor (citat.py).

## Till Redaktören
- Facebook och Instagram användes inte. Ingen sida ej nåbar.
- Ej i databasen, ingen commit.
