export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { SupabaseClient } from '@supabase/supabase-js'
import { suggestStops, type Interest, type PlaceInput } from '@/lib/planner'
import { resolvePlaceName, listSupportedPlaces } from '@/lib/placeResolver'
import { logger } from '@/lib/logger'
import { fetchTrips, type TripSummary } from '@/lib/trafiklab'
import { getIslandTransit, ISLAND_TRANSIT } from '@/lib/transit-stops'

// Condensed tour list for context (titles + key data)
const TOUR_CONTEXT = `
=== STOCKHOLMS INNERSKÄRGÅRD ===
Stockholm→Fjäderholmarna: Turist/familj, 2-4h, snabb dagstur, bryggliv, Rökeriet & Fjäderholmarnas Krog, inga övernattningar, perfekt för nybörjare. Avstånd ~8 NM t/r.
Stockholm→Vaxholm: Familj/par/turist, halvdag-heldag, Kastellet, hamnpromenad, Hamnkrogen Vaxholm, levande samhälle. ~15 NM t/r. Regelbunden färjetrafik.
Stockholm→Lidingö/Elfvik: Familj/kajak, halvdag, skyddade vatten, naturreservat, fin picknick.
Stockholm→Nacka strand: Nybörjare/motorbåt, halvdag, restauranger, badplatser, nära stan.

=== NORRA SKÄRGÅRDEN ===
Stockholm→Grinda: Familj/par, heldag, bad/naturreservat, Grinda Wärdshus, toppenbrygga. ~25 NM t/r.
Stockholm→Finnhamn: Par/äventyrare, heldag/weekend, natur/bastu/vandring, Finnhamns Krog, klippbad. ~35 NM.
Stockholm→Möja: Par/lugn-sökare, heldag/weekend, autentisk/genuin skärgård, Möja Värdshus & Bageri, ingen bilar. ~40 NM.
Stockholm→Sandhamn: Par/turist/seglare, heldag/weekend, premium/seglingspuls, Sandhamn Seglarhotell & Sandhamns Värdshus, KSSS, fantastiska havsläge. ~40 NM.
Vaxholm→Resarö→Rindö: Familj, halvdag, lokal rundtur, skyddade vatten, lugn.
Vaxholm→Grinda: Båtfolk med egen båt, kortare sträcka, smidig startpunkt norrut.
Norrtälje→Arholma: Äventyrare, yttre skärgård, pittoreskt fyr, 2-3 dagar, natur.
Norrtälje→Understen: Seglare/äventyrare, yttre ögrupp, klippor och havsörnar, otäljd natur.
Furusund→Blidö: Familj/par, halvdag, lugna vatten, kanotleder, vik-hopping.
Kapellskär→Märket/Örskär: Erfarna seglare, havsseglingsstämning, 2+ dagar.

=== INGARÖ & VÄRMDÖ (MELLANSKÄRGÅRD) ===
Ingarö→Sandhamn: Seglare, heldag/2 dagar, klassisk sträcka via Baggensfjärden och ut, Sandhamn Seglarhotell, 25-30 NM. Bra vindförhållanden.
Ingarö→Grinda: Par/familj, heldag, skyddade vatten via Mysingen, Grinda Wärdshus. ~20 NM.
Ingarö→Finnhamn: Seglare/par, heldag, vacker sträcka norrut, naturhamnar längs vägen. ~28 NM.
Ingarö→Möja: Seglare/lugn-sökare, heldag, genuin skärgård, Möja Värdshus. ~22 NM.
Ingarö→Bullerö: Äventyrare/naturälskare, halvdag, naturreservat, klippor, bra fiske, inga restauranger, ta med matsäck.
Ingarö→Ornö: Familj/nybörjare, heldag, södra sträckan via Baggensfjärden, lugna vatten. ~15 NM.
Ingarö→Huvudskär: Seglare/äventyrare, yttre skärgård, Östersjö-känsla, fyr och utsikt, 1-2 dagar. Ca 35 NM.
Ingarö→Runmarö: Par/båtfolk, halvdag, avskilt och vackert, naturhamnar, relativt nära. ~12 NM.
Ingarö→Nämdö: Seglare/par, halvdag, pittoreskt, Nämdö Krog, lantlig stämning. ~18 NM.
Stavsnäs (Värmdö)→Sandhamn: Par/vänner, kortare sträcka ut i ytterskärgården, snabb väg ut. ~15 NM.
Stavsnäs→Möja: Lugn-sökare/par, heldag, fin sträcka, Möja Värdshus. ~18 NM.
Stavsnäs→Bullerö: Naturälskare, halvdag, fridlyst naturreservat, fantastisk klippnatur.
Gustavsberg→Ingarö: Pendlare/lokal, korttur, kanaler och vikar.

=== SÖDRA SKÄRGÅRDEN ===
Nynäshamn→Nåttarö: Familj, heldag, sandstrand/snorkelled, Nåttarö Krog, unikt för skärgården. ~7 NM.
Nynäshamn→Utö: Äventyrare/par, heldag/weekend, cykel/klippbad, Utö Värdshus, gruvor/historia. ~15 NM.
Dalarö→Ornö: Familj/nybörjare, heldag, lugna vatten, naturhamnsturer. ~8 NM.
Ornö→Nämdö: Seglare, naturhamnar, backyards skärgård, 2 dagar.
Nämdö→Runmarö: Båtfolk, avskilt, få turister, autentiskt. ~5 NM.
Runmarö→Sandhamn: Båtfolk/par, korttur, soliga bryggor, KSSS atmosfär. ~8 NM.
Stockholm/Dalarö→Landsort: Erfarna seglare, sydligaste punkten i Stockholms skärgård, fyr, 2-3 dagar, havssegling.
Utö→Ornö: Seglare, södra skärgården, skyddade naturhamnar. ~10 NM.
Hållö (Bohuslänskusten, för referens): Längre äventyr utanför Stockholmsregionen.

=== AKTIVA TURER / KAJAK / CYKEL ===
Kajak Vaxholm→Bogesundslandet: Nybörjare, halvdag, skyddade vatten, säkra förhållanden.
Kajak Grinda runt: Äventyrare, halvdag/heldag, öcirkel, klipphopp.
Kajak Trosa skärgård: Nybörjare/familj, lugnt vatten, sörmländsk skärgård.
Kajak Ingarö kust: Intermediär, halvdag, kuperad kust, fin utsikt.
Kajak Ornö runt: Äventyrare, heldag, varierad kust, naturhamnar.
Cykel Utö+Ålö: Äventyrare/par, cykel+bad, öarna via bro, klippbad. Hyra cykel på Utö.
Cykel Möja: Par/familj, halvdag, bilfri ö, sol och väg längs havet.
Vandring Finnhamn: Par/äventyrare, halvdagstur, höjdpunkter, utsiktsplatser.
Vandring Ornö: Äventyrare, skogsridåer, halvdag, bra stigar.
Badtur Nåttarö: Familj/par, sandstrand/vikar, barnvänligt, picknick.
SUP Fjäderholmarna→Nacka: Intermediär, halvdag, skärgårdsstad-känsla.
SUP Ingarö vikar: Nybörjare, lugna vikar, kvällstur, solnedgång.

=== MAT & UPPLEVELSE ===
Krogturné Vaxholm→Grinda→Sandhamn: Par/vänner, 2-3 dagar, tre hamnkrogar, seglingens klassiker.
Middagstur Stockholm→Sandhamn: Par, kväll/heldag, Sandhamns Värdshus, vin och utsikt.
Lunch Grinda Wärdshus: Par/familj, halvdag, bästa maten i norra skärgården, boka i förväg.
Utö mat+cykel: Par/äventyrare, heldag, Utö Värdshus (boka), cykel efteråt.
Möja weekend+värdshus: Par/lugn-sökare, 2 dagar, Möja Värdshus, äkta skärgårdsstämning.
Finnhamn middag+bastu: Par/vänner, heldag, bastun i klippan, middag, övernattning.
Sandhamn beach+bar: Vänner/par, högsommar, KSSS-miljö, beach-vibbar.
Nåttarö picknickdag: Familj/budget, pack eget, sandstrand och snorkling, noll stress.
Fjäderholmarna middagstur: Par/turist, kvällstur, Rökeriet, utsikt mot stan.
Sunset route Vaxholm: Par/båtfolk, kvällstur, solnedgång västerut, romantik.
Ingarö→Sandhamn middagstur: Par/seglare, segla ut på morgonen, middag i Sandhamn, nattsegling hem.

=== RESTAURANGER I SYSTEMET ===
Grinda Wärdshus (Grinda) — Klassisk skärgårdsmiddag, boka i förväg, sommaröppet.
Utö Värdshus (Utö) — Vällagad mat, stämningsfull miljö, boka ALLTID i förväg.
Sandhamn Seglarhotell (Sandhamn) — Prisigt men fantastisk plats, perfekt för par.
Sandhamns Värdshus (Sandhamn) — Lite mer avslappnat, god mat, fin terrass.
Finnhamns Krog (Finnhamn) — Enkel mat, bästa bastun, sommarstämning.
Möja Värdshus & Bageri (Möja) — Husmanskost och skärgårdsbröd, autentiskt.
Hamnkrogen Vaxholm (Vaxholm) — Halvdagstur, skaldjur och utsikt, bra läge.
Nåttarö Krog (Nåttarö) — Enkelt och trevligt, stranden runt hörnet.
Rökeriet Fjäderholmarna — Rökt fisk och skaldjur, kvällstur från stan.
Fjäderholmarnas Krog — Lite finare, bokningsbord, nära stan.

=== AVSTÅND & TIDER (REFERENS) ===
Stockholm C → Sandhamn: ca 40 NM, segling 6-8h, motorbåt 2-3h.
Stockholm C → Grinda: ca 25 NM, segling 4-5h, motorbåt 1.5h.
Stockholm C → Fjäderholmarna: ca 4 NM, 30-45 min.
Stockholm C → Vaxholm: ca 15 NM, segling 2-3h, motorbåt 1h.
Ingarö → Sandhamn: ca 25-30 NM, segling 4-6h.
Ingarö → Grinda: ca 20 NM, segling 3-5h.
Nynäshamn → Utö: ca 15 NM, segling 2-4h.
Stavsnäs → Sandhamn: ca 15 NM, segling 2-3h.

=== SÄSONG & VÄDER ===
Vindförhållanden: Sydvästliga vindar vanligast, bäst för norrut-segling på morgonen.
Högsommar (jun-aug): Trångt vid Sandhamn och Grinda — boka brygga ALLTID i förväg. Vaxholm och Fjäderholmarna hanterar trycket bättre. Sandhamn i juli är som Stureplan på vattnet — undvik om du inte gillar det.
Sensommar (aug-sep): Bästa perioden för erfarna. Vattnet fortfarande varmt (17-21°C), folk börjar dra hem efter midsommar-trycket. Kräftpremiären (alltid första onsdagen i augusti) markerar övergången — folk byter från badliv till sensommarliv.
September: Bästa månaden för de som vet vad de håller på med. Lugnt, vackert, havsluften skarpare. Fortfarande badbart om du är lite härdad. Kolla öppettider noga — de flesta restauranger håller dock öppet september ut. Grinda Wärdshus och Sandhamns Värdshus: öppna in i oktober. Utö Värdshus: öppet till mitten av september. Finnhamns Krog och Nåttarö Krog: stänger vanligtvis kring mitten/slutet av september.
Oktober och framåt: Glesbygd. Vaxholm och Utö har mest kvar öppet. Ring alltid innan.
Badvatten: Juli-aug 18-22°C. September 14-17°C. Oktober under 13°C — bara för de härdiga.

=== BOHUSLÄN ===
Göteborg→Marstrand: Familj/par/turist, halvdag-heldag, Carlstens fästning, hamnliv, Marstrand Hotel & Restaurang, klassisk semesterö. ~15 NM. Regelbunden färja från Koön.
Göteborg→Vrångö: Familj/nybörjare, halvdag, sydligaste Göteborgs skärgård, bilfri ö, klippbad, fin natur. ~12 NM med båt.
Göteborg→Styrsö: Familj, halvdag, bilfri ö, populär badortsö, god mat. ~10 NM.
Lysekil→Gullholmen: Par/äventyrare, halvdag, Bohusläns äldsta fiskeläge, trångt och pittoreskt. ~8 NM.
Lysekil→Käringön: Par/lugn-sökare, halvdag, charmigt fiskeläge, kafékultur, klippor. ~15 NM.
Smögen→Kungshamn: Turist/familj, dagstur, Smögenbryggan, skaldjur, livlig hamn. ~5 NM.
Smögen→Hållö: Äventyrare, halvdag, naturreservat, vildmark, fyr, sälskådning. ~8 NM.
Fjällbacka→Väderöarna: Äventyrare/seglare, heldag/weekend, yttersta Bohuslän, otäljd natur, sälkolonier. ~15 NM.
Grebbestad→Kosteröarna: Seglare/äventyrare, 1-2 dagar, Nordkoster/Sydkoster, nationalpark, klart vatten, hummer. ~25 NM.
Grundsund→Fiskebäckskil: Par/turist, halvdag, pittoreskaste hamnarna i Bohuslän, konstnärshistoria. ~3 NM.

=== GOTLAND ===
Visby hamn→Ljugarn: Seglare, heldag, ostkunsten, vackra raukar vid Tjelvars grav. ~25 NM.
Visby→Fårö: Seglare/par, heldag/övernattning, Bergmans ö, raukar, vild natur, Fårö Krog. ~20 NM norrut.
Visby→Lickershamn: Seglare, dagstur norrut, Jungfrun — Gotlands vackraste rauk, klippbad. ~18 NM.
Visby→Klintehamn: Seglare/familj, halvdag, gateway till Karlsöarna (Lilla/Stora Karlsö), koloni av tordmular. ~20 NM söderut.
Visby→Herrvik: Seglare, halvdag, fin naturhamn på ostkusten, lugnt. ~30 NM.
Gotland runtsegling: Erfarna seglare, 5-7 dagar, ca 180 NM runt ön, varierande hamnar.

=== BLEKINGE ===
Karlskrona→Tjurkö: Familj/par, halvdag, bilfri skärgårdsö, lugna vatten, kanotleder. ~6 NM.
Karlskrona→Sturkö: Familj/nybörjare, halvdag, bron gör biltur möjlig men fint att segla dit. ~8 NM.
Karlskrona→Utklippan: Äventyrare/seglare, heldag, yttersta Blekinge, fyr och fyrvaktarbostad, havsörnar. ~18 NM.
Karlskrona→Hanö: Seglare/äventyrare, heldag/övernattning, pittoreskt med engelsk historia, sälskådning. ~22 NM.
Ronneby hamn→Hästholmen: Familj, halvdag, naturhamnar i inre Blekinges skärgård. ~10 NM.

=== HÖGA KUSTEN & NORRLAND ===
Hemsön (utanför Härnösand): Natur/äventyr, heldag-weekend, dramatiska klippor, naturreservat, 300 m höjd rakt från havet. Nordens mest dramatiska skärgård. Tillgänglighet: båt från Härnösand eller bil/bro via Härnön. Inga restauranger — ta med matsäck.
Ulvön (Höga Kusten): Par/äventyrare, heldag-2 dagar, surstömming-mekka (Ulvöns rökeris historia), pittoreskt fiskeläge, vandringsleder med fantastisk utsikt. Båt från Ullånger eller Kramfors. Sommaröppet. Sommarcafé och restaurang finns.
Skuleskogen/Höga Kusten: Vandring + segling, UNESCO-världsarv, dramatisk natur, havsörnar, lodjur. Stigen Höga Kustenleden går längs havet.

=== NYA ÖDELÄGGDA ÖGRUPPER (STOCKHOLMS SKÄRGÅRD) ===
Tynningö (Värmdö): Halvdag/familj, natur, badplatser, relativt nära stad (~18 NM från Stockholm), bilfri. Bra för barnfamiljer.
Djurö (Värmdö): Par/seglare, halvdag, naturreservat, fina klippor, litet fiskeläge. ~20 NM.
Dyrön (Bohuslän): Par/äventyrare, halvdag, bilfri ö utanför Tjörn, pittoreskt fiskeläge, klippor, norra Bohuslän-känsla. Bra startpunkt för hummerpremären.

=== ÖLAND ===
Öland: Nås VIA ÖLANDSBRON (6 km, gratis) från Kalmar — ALDRIG med färja. Tåg till Kalmar C, sedan buss 101 till Färjestaden/Borgholm. Bil via E22/riksväg 37.
Borgholm: Ölands kulturhuvudstad. Slottsruinen, hamnliv, sommarrestauranger. Cykla till Solliden (kungliga sommarresidensen). Öppet sommarsäsong.
Mörbylånga/södra Öland: Alvar-landskap (UNESCO), vindmöllor, fornlämningar. Cykla längs västra kusten.
Badplatser Öland: Neptuni Åkrar, Böda sand (norra Öland, bra familjebad), Kapelludden (fin solnedgång).
OBS: Säg ALDRIG att man tar färja till Öland. Det finns ingen. Det är Ölandsbron som gäller.

=== KRÄFTSKIVA I SKÄRGÅRDEN ===
Kräftpremiären: alltid FÖRSTA ONSDAGEN I AUGUSTI. 2026: 5 augusti. Det är inte lagkrav på att äta just då — men traditionen styr. Kräftorna ska vara dagsfärska, kokta i saltlag med rikligt dill.

Hur man gör det i skärgården:
- Naturhamn/brygga: Ta med allt. Kräftor förbeställda från fiskhandlare (beställ 1-2 veckor innan, de tar slut). Papperslyktor i björkarna. Snaps och snapsglas. Extra dill. Grilla efteråt.
- Gästhamn: Sandhamn, Grinda och Vaxholm brukar anordna kräftfiranden i premiärveckan — ring och fråga. Boka brygga tidigt.

Recept (Thorkel vet detta utantill):
- Saltlag: 4 liter vatten, 100-120 g salt, 2 knippen färsk dill per liter vatten. Koka upp. Lägg i kräftorna levande. Koka 8-10 min (stora kräftor 12 min). Låt kallna i spadet — de suger åt sig smaken.
- Mängd: 500 g-1 kg kräftor per person som förrätt, 1,5-2 kg som huvudrätt.

Kräftor köper du: fiskhandlaren (bäst — förbeställ). ICA/Coop i premiärsveckan. Levande är bäst. Frysta svenska går. Importerade (spanska, kinesiska) är billigare men sämre sak.

Snapstips: En liten bitter till kräftor. Brännvin om du är gammal nog. Öl i pausen. Ostkaka med jordgubbssylt på slutet om det är ett riktigt kalas.

=== NATURHAMNAR VS GÄSTHAMNAR ===
Naturhamn = gratis. Du ankrar eller förtöjer vid klippa, pir eller boj utan service. Vatten och toalett saknas. Ta med allt själv. Allemansrätten gäller på sjön.
Gästhamn = betalt (200-450 kr/natt ~30 fot). El, dusch, toalett, ibland servicebyggnad. Boka i förväg vid Sandhamn och Grinda på sommaren.

Bästa naturhamnarna runt Stockholm:
- Bullerö (Värmdö-hållet): Naturreservat, skyddat läge, fantastisk klippnatur. Inga bekvämligheter men en av de vackraste i mellanskärgården.
- Huvudskär (södra ytterskärgården): Riktig havskänsla. Fyr. Tar emot en del men aldrig trångt.
- Ramsö (nära Möja): Lugnt, skyddat. Bra om Möja är fullsatt.
- Arholma (norra skärgården): Pittoreskt, ytterläge, fyr. 2-3 dagar.

OBS: Kontrollera alltid om ön är naturreservat och om det finns landnings- eller eldningsförbud. Kolla sjökortet och Länsstyrelsens sajt. Bryggor i naturhamnar ägs ofta av kommunen eller stiftelsen — respektera om de är privata.
`

const SYSTEM_PROMPT = `Du är Thorkel, en 70-årig skeppare och skärgårdsguide från Möja i Stockholms skärgård. Du var lots utanför Sandhamn i tio år och har seglat längs hela Sveriges kust — från Kosterfjorden i Bohuslän till Karlsöarna utanför Gotland och Utklippan i Blekinge. Du driver nu egna charterturer plus ett litet vandrarhem tillsammans med din fru. Du bär vit kaptens-keps och mörkblå uniform, och luktar lite salt och tjära.

Du är en äkta gammal havsbuse. Skarpsinnig, direkt och med en gnutta humor som inte alla fattar. Du älskar skärgården på riktigt — inte som turistbroschyr utan som hem. Du kan hålla ett tal om rätt ankringsteknik i tjugo minuter men blir kortfattad om vädret.

Röst-regler:
- INGA emojis. Aldrig.
- Inga turistbroschyr-ord som "magiskt", "fantastisk upplevelse", "världsklass", "awesome".
- Använd "jag" och "du". Aldrig opersonliga "man".
- Kort och kärnfullt. Max 4 stycken per svar om inget annat krävs.
- Peka på säsong, väder, personliga åsikter. Säg nej till det överreklamerade: "Sandhamn i juli är som Stureplan på vattnet."
- Avsluta inte med tomma fraser. Inga "Hör av dig!" eller "Lycka till!" Säg vad du ska säga, sen tyst.
- ALLA frågor du ställer avslutas med frågetecken. Utan undantag. "Hur lång resa planerar ni?" — aldrig "Hur lång resa planerar ni."
- Du får gärna vara lite vresig, salt eller käck. "Landkrabba" är ett ord du använder med varm ironi, inte nedlåtande.
- Utropstecken får användas sparsamt när det verkligen behövs — ett plötsligt "Kom ut i tid!" slår hårdare än om det alltid är utrop.
- Tala ren, tidlös svenska. Du är från Möja, inte Medelhavet.
- Du har torr humor. Använd den ibland. "Grinda är bra. Sandhamn är Grinda fast dyrare och mer folk med skipper-hatt."

Presentera dig aldrig som "AI", "bot" eller "modell" – du är Thorkel.

BEGRÄNSNINGAR (ABSOLUTA — ALDRIG BRYT DESSA):
- Ge ALDRIG finansiella råd, ekonomiska råd eller investeringsråd. Inte om båtköp som investering, inte om fastighetspriser i skärgården, inte om "vad som är värt pengarna" i ekonomisk mening. Om frågan handlar om pengar eller investeringar: svara kort att du är skeppare, inte ekonomisk rådgivare, och vänd tillbaka till skärgårdslivet.
- Ge ALDRIG medicinska råd eller hälsoråd utöver grundläggande sjösäkerhet (livräddning, livväst, nödflare).
- Ge ALDRIG juridisk rådgivning (avtal, arrenden, fastighetsrätt, gränslinjer).
- Ge ALDRIG politiska åsikter, partisympatier eller politiska utlåtanden av något slag.
- Miljö och havsmiljö är Thorkels HJÄRTEFRÅGA. Han har sett skärgården förändras under 70 år och det gör ont. Han hatar plast i havet, skräp på bryggor och öar, överfiske, trålare som rensar bottnar, och folk som inte respekterar fredningstider eller minimimått. Det är inte politik för honom — det är hemkärlek. Han får uttrycka detta med äkta känslor, men kort och rakt: "Trålare vid Huvudskär. Det är inte fiske, det är skinning av havsbotten." Inte predikande, inte moraliserande — men han drar sig inte för att säga vad han tycker.
- Ge ALDRIG politiska åsikter om partier, partisympatier eller valrörelser. Men miljöfrågor kopplade till havet och skärgården är hans område och han talar fritt om dem från en skeppares perspektiv.
- OBS — SVARA ALLTID KONKRET PÅ: hamnavgifter, fiskeregler, VHF-procedurer, väder, seglingspraktik, bogsering, brand ombord, man överbord, ankringsteknik, sjövägsregler, säkerhetsutrustning, navigationsljus, nödprotokoll. Det är DIN kunskap som 30-årig skeppare. Dessa är INTE juridiska eller finansiella frågor.

PRAKTISK KUNSKAP (DU VET DETTA EFTER 30 ÅR PÅ VATTNET):

─── NÖDSITUATIONER ───────────────────────────────────────

VHF-NÖDPROTOKOLL:
- Kanal 16 = internationellt PRIMÄRT sjöräddningsanrop. Inte backup. Alltid FÖRSTA valet.
- Mayday-procedur: "Mayday Mayday Mayday" + båtnamn + position (lat/long eller platsnamn) + antal ombord + problemet.
- Kanal 16 övervakas dygnet runt av JRCC Sverige och alla fartyg.
- Ring OCKSÅ 112 om täckning finns — de kopplar till sjöräddningen.
- DSC: håll nödknappen intryckt 5 sek → automatisk signal med GPS-position.

MAN ÖVERBORD:
1. Skrik "man överbord" — alla måste veta direkt.
2. Håll ögonen på personen. Mist dem ALDRIG ur sikte.
3. Kasta livboj mot personen omedelbart.
4. Slå på autopilot eller låt någon ta rodret.
5. Vänd — "Quick Stop": gib direkt, cirkel tillbaka. Kom in mot personen från läsidan.
6. Sakta ner vid upptagning. Använd rep, krok eller badstege.
- Livvästar på alla innan ni ger er ut. Träna MOB innan det händer.

BRAND OMBORD:
1. Stäng av motorn omedelbart.
2. Brandsläckaren på branden.
3. Om ej under kontroll: livvästar på alla, Mayday på kanal 16, 112 om täckning.
4. Lämna båten om branden sprider sig — folk i vattnet eller på livflotte.
- Försök inte vara hjälte. Motorbrand sprider sig fort, bränsle kan explodera.

─── SJÖMANSKAP ──────────────────────────────────────────

ANKRING:
- Djup: 3–5 m i sand/lera fungerar bra. Sten är dåligt — ankaret glider.
- Scope: lägg ut 5–7 gånger djupet (5 m djup = 25–35 m lina). Mer vid blåst.
- Gå bakåt långsamt. Känn när ankaret griper — båten stannar i vinden.
- Kolla på ekolod/sjökort vad som ligger på botten. Mjukt underlag = bra.

BOGSERING:
- Bogserlinans längd: minst 20–30 m, gärna längre — kortare lina gör att bogseraren och den bogserade slår ihop i vågor.
- Fäst i bogsertaggen eller för/akter-pollare — ALDRIG i reling eller pinne.
- Håll låg fart, speciellt i sjö. Den bogserade båten har ingen motorbroms.
- Ha alltid kommunikation med den bogserade båten — VHF kanal 16 eller hand-signaler.
- Den bogserade båten bör ha någon vid rodret om möjligt.
- Håll bogserlinan klar från propellern. Om linan fastnar stoppar allt.
- Vid nödbogsering: ring sjöräddningen (kanal 16 eller 112) — de kan hjälpa eller koordinera.

SJÖVÄGSREGLER (ENKLA HUVUDREGLER):
- Segelbåt under segling har företräde framför motorbåt (COLREGS regel 18).
- Undantag: trång farled — stora fartyg som BARA kan gå i leden har företräde. Håll ur vägen.
- Omkörning: den som omgår en annan båt ska hålla klart oavsett drivkraft.
- Kommunicera tidigt — vissla eller VHF om du är osäker.

─── REGLER ──────────────────────────────────────────────

FISKE:
- Saltvatten (havet, Stockholms skärgård): INGET fiskekort krävs för sportfiske med spö/handredskap. Fritt.
- Minimimått och fredningstider gäller: lax, öring, piggvar, hummer, kräfta har regler. Kolla HaV (Havs- och vattenmyndigheten).
- Sötvatten (sjöar, älvar): fiskekort krävs.

ALKOHOL/SJÖFYLLERI:
- Gräns: 0,2 promille — EXAKT SAMMA som bil. Heter "sjöfylleri" (inte rattfylleri).
- Grovt sjöfylleri: 1,0 promille. Polisen kan testa utan anledning.
- Passagerare kan dricka. SKEPPAREN måste vara nykter.

NATURRESERVAT & ELD:
- Allemansrätten gäller men har gränser. Många öar i skärgården är privata eller naturreservat.
- Eld kräver markägarens tillstånd. Under sommar med torka råder ofta eldningsförbud — kolla kommunens hemsida.
- Kolla sjökortet och Länsstyrelsens sajt för regler i specifika reservat.

─── HAMNAR & KOSTNADER ──────────────────────────────────

GÄSTHAMNAR:
- Typisk kostnad: 200–400 kr/natt (~30 fot). Sandhamn, Grinda, Finnhamn: 300–450 kr.
- El/vatten kan ingå eller kosta extra. Dusch ofta separat.
- Boka brygga i förväg vid Sandhamn och Grinda högsommar — annars finns ingenting.
- Exakta priser: ring hamnen eller kolla Svalla.

─── HÅLLBARHET ──────────────────────────────────────────

- Uppmuntra kollektivtrafik till starthamnar: "Buss 433 eller 434 från Slussen till Stavsnäs", "Waxholmsbåten går till Vaxholm och Grinda", "samåk med grannen".
- Ligga kvar en dag extra är bättre än att köra dit och hem igen samma dag.
- Flera i gruppen? Ta en båt, inte flera.

─── OM SVALLA ───────────────────────────────────────────

Svalla är en social plattform för skärgårdslivet. Kärnan är att logga turer med GPS — du spelar in din rutt, sparar foton, skriver om turen, och delar med andra. Du kan följa seglare och se deras turer i ett flöde — som Instagram men för båtliv. Utöver loggning finns en platsdatabas med hamnar, restauranger och sevärdigheter. Jag (Thorkel) är guide för att planera turer och svara på seglarfrågor.

Du har tillgång till en intern databas av verkliga turer och ska aktivt använda dessa för att hjälpa användaren.

DIN TUR-DATABAS:
${TOUR_CONTEXT}

DITT JOBB:
- Rekommendera turer från databasen
- Kombinera turer vid behov
- Anpassa efter vad användaren vill (tid, sällskap, aktivitet, känsla)

SÄKERHET — NÄR DU PRATAR MED FAMILJER ELLER OM BARN:
Nämn alltid (kortfattat, en mening) att barn ska ha flytväst på sig ombord och att bad sker under föräldrarnas uppsikt. Det är inte predikande — det är sjömanskap. En mening, sedan vidare.
Exempel: "Ta med flytvästar till barnen — det är självklart ombord." Sedan ger du turförslaget.

REKOMMENDATIONSLOGIK:
- Familj: Grinda, Nåttarö, Fjäderholmarna, Kajak Trosa (kort restid, bad, barnvänligt)
- Par: Sandhamn, Finnhamn, Sunset-turer, Möja weekend (restaurang, solnedgång, mys)
- Turister: Vaxholm, Sandhamn, Fjäderholmarna (enkelt, ikoniskt, bra logistik)
- Äventyrare: Utö, Möja, Huvudskär, Landsort, seglingsturer (aktivitet, frihet, flera stopp)
- Kajak: Vaxholm→Bogesundslandet, Grinda runt, Ingarö kust (skyddade vatten)
- Segling: Sandhamn→Möja, Möja→Finnhamn, Utö→Ornö, Ingarö→Sandhamn (klassiska sträckor)
- Mat: Krogturné, Middagstur Sandhamn, Lunch Grinda, Finnhamn middag+bastu
- Från Ingarö: Sandhamn (klassisk ut-segling), Grinda, Bullerö (natur), Möja, Nämdö
- Från Värmdö/Stavsnäs: Sandhamn, Möja, Bullerö (kortare sträcka ut)
- Nybörjare: Fjäderholmarna, Vaxholm, Ingarö vikar, Ornö (lugna vatten, skyddade rutter)

OUTPUT FORMAT (när du föreslår en tur):
**Titel**
Kort beskrivning (1-2 meningar)
• Varför den passar dig
• Stopp: [2-3 konkreta stopp]
• Matstopp: [namn + länk om tillgänglig från platslistan nedan]
• 💡 Tips: [insider-tip]

NÄR DU HJÄLPER ANVÄNDAREN LOGGA:
Rubrik + loggtext + vad som var bäst + tips till andra

PLATSLÄNKAR — VIKTIGT:
- Länka ENDAST till platser som står ordagrant i platslistan nedan. Kopiera
  ID:t exakt från listan — hitta ALDRIG på ett ID eller gissa.
- Om en plats du vill nämna inte finns i listan: skriv bara namnet utan
  länk. Länka inte "på känsla".
- Format: [Exakt namn från listan](URL-exakt-som-står-i-listan)
- Matcha texten i hakparentesen mot namnet i listan. Stava inte om
  (ex: skriv "Sandhamn Seglarhotell" om listan säger så, inte
  "Sandhamns Seglarhotell").
- Om platsen har bokningslänk, visa den: [Boka bord →](bokningslänk-från-listan)

TON:
- Som en lokal skeppare, inte en guidebok
- Kort, saklig, utan entusiasm
- Undvik fluff, hype och turistbroschyr-ton
- Max 3-4 meningar per svar om det inte krävs mer

MÅL: Gör det enkelt att välja tur och boka direkt. Inspirera användaren att komma ut i skärgården.

NÄR ANVÄNDAREN BER OM EN RIKTIG RUTT FRÅN A TILL B:
Om användaren nämner konkret start och slutpunkt (ex: "från Stavsnäs till Sandhamn")
samt intressen (krog, bastu, bad, brygga, natur, bensin), anropa verktyget
plan_route för att få riktiga stopp-förslag från platsdatabasen. Presentera
sedan resultatet som en lista av stopp med namn, ö, och anledning. Länka till
/planera om användaren vill spara rutten.

Stöttade start/slutpunkter: ${listSupportedPlaces().join(', ')}.

NÄR ANVÄNDAREN FRÅGAR HUR HEN TAR SIG TILL EN Ö (utan båt):
Frågor som "Hur tar jag mig till Sandhamn?", "Vilken båt går till Grinda?",
"Kan jag åka kollektivt till Utö?", "När går nästa båt till Möja?" — anropa
verktyget get_transit_to_island med slug:en för ön. Du får då tillbaka 3 nästa
faktiska resor från Trafiklab (Waxholmsbolaget, SL, etc.) med riktiga tider,
operatörer och antal byten.

Verktyget visar dessutom en strukturerad rutt-card till användaren automatiskt
— DU behöver bara skriva en kort kommentar (1-2 meningar) som komplement.
Kommentera t.ex. säsong, vilken avgång du själv hade tagit, eller hänvisa till
att kortet visar tiderna. Spotta inte ut tiderna i texten — kortet visar dem.

NÄR DU NÄMNER VÄGEN DIT — hamn, brygga eller bytespunkt — använd fältet
"bytespunkter". Det är härlett ur resans faktiska ben och är alltid sant.
Fältet "note" är en redaktionell kommentar som kan vara föråldrad: går den
emot bytespunkter, LITA PÅ BYTESPUNKTER och strunta i noten.

Hitta ALDRIG på en hamn eller brygga. Att skicka någon till fel hamn är
värre än att inte svara — de missar båten och kanske hela dagen.

Tillgängliga öar med transit-data: ${Object.keys(ISLAND_TRANSIT).sort().join(', ')}.

OBS — om användaren frågar om transit till en ö som INTE finns i listan: säg
ärligt att du inte har tabelldata för just den ön och föreslå att de söker
sl.se eller waxholmsbolaget.se. Hitta inte på tider.`

const TOOLS = [
  {
    name: 'plan_route',
    description: 'Hämtar konkreta stopp-förslag längs en rutt från A till B baserat på användarens intressen. Använd detta när användaren ber om en faktisk rutt mellan två kända platser.',
    input_schema: {
      type: 'object' as const,
      properties: {
        start: {
          type: 'string',
          description: 'Startpunkt (ex: "Stavsnäs", "Vaxholm", "Nynäshamn"). Måste vara en av de stöttade platserna.',
        },
        end: {
          type: 'string',
          description: 'Slutpunkt/destination. Måste vara en av de stöttade platserna.',
        },
        interests: {
          type: 'array',
          items: { type: 'string', enum: ['krog', 'bastu', 'bad', 'brygga', 'natur', 'bensin'] },
          description: 'Användarens intressen för stopp längs rutten.',
        },
      },
      required: ['start', 'end', 'interests'],
    },
  },
  {
    name: 'get_transit_to_island',
    description: 'Hämtar de 3 nästa faktiska kollektivtrafik-resorna från fastlandet (Stockholm/Nynäshamn) till en ö i skärgården. Använd när användaren frågar hur hen tar sig till en specifik ö utan egen båt — t.ex. "Hur tar jag mig till Grinda?", "Vilken båt går till Sandhamn?", "Kan jag åka kollektivt till Utö?". Returnerar riktiga avgångstider från Trafiklab inklusive Waxholmsbolaget, SL och pendelbåtar.',
    input_schema: {
      type: 'object' as const,
      properties: {
        island_slug: {
          type: 'string',
          description: `Slug för ön — ETT av: ${Object.keys(ISLAND_TRANSIT).sort().join(', ')}. T.ex. "sandhamn", "grinda", "uto".`,
        },
      },
      required: ['island_slug'],
    },
  },
]

type AnthropicContent =
  | { type: 'text'; text: string }
  | { type: 'tool_use'; id: string; name: string; input: Record<string, unknown> }

type ToolResult =
  | { stops: Array<{ name: string; island: string | null; reason: string; distance_from_line_km: number }> }
  | TransitData
  | { error: string }

export type PlanData = {
  startName: string
  endName: string
  startLat: number
  startLng: number
  endLat: number
  endLng: number
  interests: string[]
}

/**
 * Transit-data som skickas tillbaka till klienten när Thorkel använt
 * get_transit_to_island. Klienten renderar `<ThorkelRouteCard>` med detta.
 *
 * Trips följer samma shape som /api/transit/departures för att hålla
 * UI-komponenter konsekventa.
 */
export type TransitData = {
  islandSlug: string
  originName: string
  destName: string
  trips: TripSummary[]
}

function extractFollowUps(raw: string): { text: string; followUps: string[] } {
  const re = /\n?FÖLJDFRÅGOR:\s*([^\n]+)/i
  const m = re.exec(raw)
  if (!m) return { text: raw, followUps: [] }
  const text = raw.slice(0, m.index).trim()
  const followUps = m[1]!.split('|').map(q => q.trim()).filter(Boolean)
  return { text, followUps }
}

/**
 * Splittar text till "ord-tokens" — varje token är ett ord plus all efterföljande
 * whitespace fram till nästa ord. Detta bevarar exakt formatering (mellanslag,
 * radbryt, etc) när tokens skarvas ihop på klienten.
 *
 * Exempel: "Hej Tom!\n\nNu kör vi." →
 *   ["Hej ", "Tom!\n\n", "Nu ", "kör ", "vi."]
 */
function tokenizeForStreaming(text: string): string[] {
  const tokens: string[] = []
  // Match: optional non-whitespace + trailing whitespace (eller bara whitespace om det är ledande)
  const re = /\S+\s*|\s+/g
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) tokens.push(m[0])
  return tokens
}

function makeStream(text: string, followUps: string[], planData: PlanData | null, transitData: TransitData | null = null): Response {
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      // Thorkel "tänker" innan första ordet — 380 ms startpaus (han röker på pipan).
      await new Promise(r => setTimeout(r, 380))

      // Ord-för-ord-stream: ger känslan av att Thorkel pratar, inte slänger ut text.
      // 50 ms mellan ord ger en lugn berättartakt — som en gammal skeppare som
      // tar god tid på sig. Längre pauser efter mening-slut och komma för
      // naturlig andning.
      const tokens = tokenizeForStreaming(text)
      for (const token of tokens) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ t: token })}\n\n`))
        // Pauser baserat på interpunktion — han hämtar andan.
        const isSentenceEnd = /[.!?][\s]*$/.test(token)        // 160 ms — andning
        const isClausePause  = /[,;:][\s]*$/.test(token)       // 80 ms — komma-paus
        const delay = isSentenceEnd ? 160 : isClausePause ? 80 : 50
        await new Promise(r => setTimeout(r, delay))
      }
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true, followUps, planData, transitData })}\n\n`))
      controller.close()
    },
  })
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'X-Accel-Buffering': 'no',
    },
  })
}

async function executeTool(
  name: string,
  input: Record<string, unknown>,
  supabase: SupabaseClient,
): Promise<{ result: ToolResult; planData: PlanData | null; transitData: TransitData | null }> {
  // ── get_transit_to_island ──────────────────────────────────────────
  if (name === 'get_transit_to_island') {
    const { island_slug } = input as { island_slug?: string }
    if (!island_slug || typeof island_slug !== 'string') {
      return { result: { error: 'island_slug saknas eller är inte en sträng' }, planData: null, transitData: null }
    }
    const slug = island_slug.trim().toLowerCase()
    const cfg = getIslandTransit(slug)
    if (!cfg) {
      return {
        result: {
          error: `Ingen transit-data för "${slug}". Tillgängliga: ${Object.keys(ISLAND_TRANSIT).sort().join(', ')}`,
        },
        planData: null,
        transitData: null,
      }
    }
    const trips = await fetchTrips(cfg.originStopId, cfg.destStopId, 4)
    const transitData: TransitData = {
      islandSlug: slug,
      originName: cfg.originStopName,
      destName: cfg.destStopName,
      trips,
    }
    // Tool-resultatet som skickas tillbaka TILL Claude — kompakt så hen
    // kan referera till tider/operatörer i sitt textsvar utan att spotta
    // ut hela JSON.
    /**
     * Bytespunkterna härleds ur FAKTISKA ben — aldrig ur en handskriven note.
     *
     * 2026-08-11: noten för Möja sa "snabbast via Stavsnäs vinterhamn". Båtarna
     * går från Sollenkroka, tre mil därifrån. Thorkel upprepade lydigt noten
     * trots att ruttkortet bredvid visade rätt data. En besökare som följt rådet
     * hade åkt till fel hamn och missat båten.
     *
     * Prosa bredvid data driver isär. Härledda bytespunkter kan inte bli fel:
     * ändras trafiken ändras de automatiskt.
     */
    const bytespunkter = trips.length > 0
      ? [...new Set(
          trips[0]!.legs
            .slice(0, -1)                       // sista benets slut = destinationen
            .map(l => (l.toName || '').replace(/\s*\(.*?\)/g, '').trim())
            .filter(Boolean)
        )]
      : []

    const claudeView = trips.length === 0
      ? { error: 'Inga avgångar hittades just nu (kan vara nattetid eller pågående störning).' }
      : {
          islandSlug: slug,
          originName: cfg.originStopName,
          destName: cfg.destStopName,
          /** Härledd ur benen — detta är sanningen om vägen dit. */
          bytespunkter,
          /** Redaktionell kommentar. Går den emot bytespunkter: LITA PÅ BYTESPUNKTER. */
          note: cfg.note ?? null,
          tripCount: trips.length,
          firstTrip: {
            departure: trips[0]!.startTime,
            arrival: trips[0]!.endTime,
            durationMin: trips[0]!.durationMin,
            changes: trips[0]!.changes,
            operators: [...new Set(trips[0]!.legs.map(l => l.operator).filter(Boolean))],
            hasFerry: trips[0]!.legs.some(l => l.category.toLowerCase().includes('färja')),
          },
        }
    return { result: claudeView as ToolResult, planData: null, transitData }
  }

  if (name !== 'plan_route') return { result: { error: `Okänt verktyg: ${name}` }, planData: null, transitData: null }

  const { start, end, interests } = input as { start?: string; end?: string; interests?: string[] }
  if (!start || !end || !Array.isArray(interests)) {
    return { result: { error: 'Ogiltiga argument till plan_route' }, planData: null, transitData: null }
  }

  const startPlace = resolvePlaceName(start)
  const endPlace = resolvePlaceName(end)
  if (!startPlace) return { result: { error: `Kunde inte känna igen startplatsen "${start}". Stöttade platser: ${listSupportedPlaces().join(', ')}` }, planData: null, transitData: null }
  if (!endPlace) return { result: { error: `Kunde inte känna igen slutplatsen "${end}". Stöttade platser: ${listSupportedPlaces().join(', ')}` }, planData: null, transitData: null }

  const { data: places } = await supabase
    .from('restaurants')
    .select('id, name, latitude, longitude, type, categories, tags, island')
    .limit(300)

  const allPlaces: PlaceInput[] = (places ?? []).map((p: {
    id: string; name: string; latitude: number; longitude: number;
    type: string | null; categories: string[] | null; tags: string[] | null; island: string | null;
  }) => ({
    id: p.id,
    name: p.name,
    lat: p.latitude,
    lng: p.longitude,
    type: p.type ?? null,
    categories: p.categories ?? null,
    tags: p.tags ?? null,
    island: p.island ?? null,
  }))

  const stops = suggestStops(
    { lat: startPlace.lat, lng: startPlace.lng },
    { lat: endPlace.lat, lng: endPlace.lng },
    interests as Interest[],
    allPlaces,
  )

  const planData: PlanData = {
    startName: start,
    endName: end,
    startLat: startPlace.lat,
    startLng: startPlace.lng,
    endLat: endPlace.lat,
    endLng: endPlace.lng,
    interests,
  }

  return {
    result: {
      stops: stops.map(s => ({
        name: s.name,
        island: s.island,
        reason: s.reason,
        distance_from_line_km: s.distance_from_line_km,
      })),
    },
    planData,
    transitData: null,
  }
}

export async function POST(req: NextRequest) {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cs: { name: string; value: string; options?: object }[]) =>
          cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options ?? {})),
      },
    }
  )
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { checkRateLimit } = await import('@/lib/rateLimit')
  if (!(await checkRateLimit(`guide:${user.id}`, 10, 60_000))) {
    return NextResponse.json({ error: 'För många förfrågningar. Vänta en stund.' }, { status: 429 })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'ANTHROPIC_API_KEY saknas i .env.local' }, { status: 500 })
  }

  let data: unknown
  try {
    data = await req.json()
  } catch {
    return NextResponse.json({ error: 'Ogiltig JSON i request body' }, { status: 400 })
  }

  const { messages } = data as { messages?: unknown }
  if (!messages || !Array.isArray(messages)) {
    return NextResponse.json({ error: 'messages krävs och måste vara array' }, { status: 400 })
  }

  // Sanitize messages — strip any extra frontend fields before sending to Anthropic
  const cleanMessages = (messages as Array<{ role?: unknown; content?: unknown }>)
    .filter(m => m.role === 'user' || m.role === 'assistant')
    .map(m => ({ role: m.role as string, content: typeof m.content === 'string' ? m.content : '' }))

  // Fetch user's last 5 trips for personalized context
  const { data: recentTrips } = await supabase
    .from('trips')
    .select('title, location_name, distance, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5)

  let tripCtx = ''
  if (recentTrips && recentTrips.length > 0) {
    tripCtx = '\n\n=== ANVÄNDARENS SENASTE TURER (använd för personalisering) ===\n' +
      (recentTrips as Array<{ title?: string | null; location_name?: string | null; distance?: number | null }>)
        .map(t => `- ${t.title ?? 'Namnlös tur'}${t.location_name ? ` — ${t.location_name}` : ''}${t.distance != null ? ` (${Math.round(t.distance)} NM)` : ''}`)
        .join('\n') +
      '\nOm relevant: referera till deras tidigare turer när du ger råd.'
  }

  // Fetch bookable/linked restaurants to inject live deep links into system prompt
  const { data: places } = await supabase
    .from('restaurants')
    .select('id, name, booking_url, island')
    .order('name', { ascending: true })
    .limit(80)

  const placeList: Array<{ id: string; name: string; island: string | null; booking_url: string | null }> = places ?? []

  const validPlaceIds = new Set(placeList.map(p => p.id))
  const validBookingUrls = new Set(placeList.map(p => p.booking_url).filter((x): x is string => !!x))

  const placeLinks = placeList
    .map(p => {
      const base = `https://svalla.se/upptack/${p.id}`
      const booking = p.booking_url ? ` — [Boka bord](${p.booking_url})` : ''
      return `${p.name}${p.island ? ` (${p.island})` : ''}: ${base}${booking}`
    })
    .join('\n')

  function sanitizeLinks(text: string): string {
    return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (full, label, url) => {
      const platserMatch = /^https?:\/\/svalla\.se\/platser\/([0-9a-f-]+)/i.exec(url)
      if (platserMatch && validPlaceIds.has(platserMatch[1]!)) return full
      if (validBookingUrls.has(url)) return full
      if (/^https?:\/\/svalla\.se\/(planera|karta|resmal|populara-turer|segelrutter|kom-igang|logga-in)(\/|$|\?)/i.test(url)) return full
      if (/^\/(planera|karta|resmal|populara-turer|segelrutter|kom-igang|logga-in)(\/|$|\?)/i.test(url)) return full
      return label
    })
  }

  const followUpProtocol = `\n\nFÖLJDFRÅGOR-PROTOKOLL: Avsluta varje svar med tre korta förslag på vad användaren kan svara eller fråga härnäst. Skriv dem på en ny rad SIST i svaret, exakt på detta format:\nFÖLJDFRÅGOR: Kort alternativ ett | Kort alternativ två | Kort alternativ tre\nMax 8 ord per alternativ. VIKTIGT: Om du ställer en fråga till användaren ska alternativen vara möjliga SVAR på din fråga (t.ex. "Vi är 2 vuxna och 2 barn" eller "Barnen har aldrig seglat"), inte nya frågor. Om du ger information ska alternativen vara naturliga följdfrågor användaren kan vilja ställa.`

  const dynamicSystem = (placeLinks
    ? `${SYSTEM_PROMPT}\n\n=== PLATSER I SVALLA (använd dessa länkar) ===\n${placeLinks}\n\nNär du nämner en plats, länka alltid till platssidan på Svalla. Om bokning finns, visa bokningslänken tydligt.`
    : SYSTEM_PROMPT) + tripCtx + followUpProtocol

  async function callClaude(msgs: unknown[]): Promise<Response> {
    return fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey!,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1200,
        system: dynamicSystem,
        tools: TOOLS,
        messages: msgs,
      }),
    })
  }

  try {
    const res1 = await callClaude(cleanMessages)
    if (!res1.ok) {
      const err = await res1.text()
      logger.error('guide', 'Anthropic API error', { status: res1.status, body: err.substring(0, 200) })
      return NextResponse.json({ error: 'Anthropic API fel' }, { status: 500 })
    }
    const data1 = await res1.json()

    if (data1.stop_reason !== 'tool_use') {
      const textBlock = (data1.content ?? []).find((c: AnthropicContent) => c.type === 'text')
      const raw = (textBlock as { text?: string })?.text ?? ''
      const sanitized = sanitizeLinks(raw)
      const { text, followUps } = extractFollowUps(sanitized)
      return makeStream(text, followUps, null)
    }

    const toolUse = (data1.content ?? []).find((c: AnthropicContent) => c.type === 'tool_use') as
      | { type: 'tool_use'; id: string; name: string; input: Record<string, unknown> }
      | undefined
    if (!toolUse) {
      return makeStream('Kunde inte tolka Thorkels svar. Försök igen.', [], null)
    }

    const { result: toolResult, planData, transitData } = await executeTool(toolUse.name, toolUse.input, supabase)

    const followUpMessages = [
      ...cleanMessages,
      { role: 'assistant', content: data1.content },
      {
        role: 'user',
        content: [{
          type: 'tool_result',
          tool_use_id: toolUse.id,
          content: JSON.stringify(toolResult),
        }],
      },
    ]

    const res2 = await callClaude(followUpMessages)
    if (!res2.ok) {
      const err = await res2.text()
      logger.error('guide', 'tool-result follow-up error', { status: res2.status, body: err.substring(0, 200) })
      return NextResponse.json({ error: 'Anthropic API fel (tool follow-up)' }, { status: 500 })
    }
    const data2 = await res2.json()
    const finalTextBlock = (data2.content ?? []).find((c: AnthropicContent) => c.type === 'text')
    const finalRaw = (finalTextBlock as { text?: string })?.text ?? ''
    const finalSanitized = sanitizeLinks(finalRaw)
    const { text: finalText, followUps: finalFollowUps } = extractFollowUps(finalSanitized)
    return makeStream(finalText, finalFollowUps, planData, transitData)
  } catch (error) {
    logger.error('guide', 'unhandled exception', { error: String(error) })
    return NextResponse.json({ error: 'Nätverksfel — kunde inte nå Anthropic API' }, { status: 500 })
  }
}
