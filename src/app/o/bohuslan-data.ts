/**
 * bohuslan-data.ts — 19 ösidor för Bohuslän-skärgården.
 * Samma struktur som island-data.ts.
 *
 * Källbelagd 2026-09-16. Fram till dess var innehållet skrivet "utifrån allmän
 * kunskap" — en granskning mot myndighets- och operatörskällor visade att 39 av
 * 101 namngivna verksamheter inte existerade eller var nedlagda, och att bara
 * ett av 66 beskrivningsstycken kunde behållas oförändrat.
 *
 * Regeln som gäller nu: varje påstående med årtal, siffra, areal, myndighets-
 * beslut eller namngiven verksamhet ska ha en KÄLLA-rad inom några rader ovanför.
 * En KÄLLA-rad är inte ett bevis förrän någon läst den. Saknas källa ska
 * uppgiften bort — tomt är alltid tillåtet. Se docs/ARBETSREGLER.md.
 */

import type { Island } from './island-data'

// Vi använder samma `region`-fält men med 'bohuslan' som värde.
// island-data.ts behöver utvidgas så att type Island.region inkluderar 'bohuslan'.
type BohuslanIsland = Omit<Island, 'region'> & {
  region: 'bohuslan'
}

export const BOHUSLAN_ISLANDS: BohuslanIsland[] = [
  {
    slug: 'marstrand',
    name: 'Marstrand',
    region: 'bohuslan',
    regionLabel: 'Bohuslän',
    emoji: '🏰',
    // KÄLLA: Statens fastighetsverk, Carlstens fästning Marstrand — bekräftar Carlsten som statligt byggnadsminne på Marstrand — https://www.sfv.se/vara-fastigheter/sverige/vastra-gotalands-lan/carlstens-fastning-marstrand (läst 2026-09-16)
    // KÄLLA: Turistrådet Västsverige (vastsverige.com), Marstrand — bekräftar sillhandelns centrum på 1500-talet — https://www.vastsverige.com/en/kungalv/products/marstrand/ ; att Match Cup Sweden avgörs första veckan i juli — https://www.vastsverige.com/kungalv/marstrand/ (läst 2026-09-16)
    tagline: 'Carlstens fästning, sillstadens gränder och match-racing första veckan i juli.',
    seoTitle: 'Marstrand 2026 – Carlstens fästning & segling',
    // KÄLLA: https://www.kungalv.se/trafik--gator/kollektivtrafik/marstrandsfarjan/ — "Marstrandsön är en bilfri ö men vissa kan ansöka om specialöverfart under ordinarie tider" (läst 2026-09-27)
    seoDescription: 'Guide till Marstrand: Carlstens fästning, bilfria Marstrandsön, Match Cup Sweden och restaurangerna vid hamnen. Hur du tar dig dit och var du bor.',
    description: [
      // KÄLLA: Statens fastighetsverk, Carlstens fästning Marstrand — bekräftar provisorisk skans efter freden i Roskilde 1658, mindre stenfästning från 1660, bygget 1682 under Erik Dahlberg, färdig 1860, "en av Europas starkaste fästningar", statligt byggnadsminne förvaltat av SFV sedan hösten 1993 — https://www.sfv.se/vara-fastigheter/sverige/vastra-gotalands-lan/carlstens-fastning-marstrand (läst 2026-09-16)
      'Marstrand domineras av Carlstens fästning. Efter freden i Roskilde 1658 restes först en provisorisk skans på öns högsta punkt, och två år senare — 1660 — började en mindre fästning i sten att byggas. Den stora anläggningen påbörjades 1682 under Erik Dahlbergs ledning men stod inte helt färdig förrän 1860, då den enligt Statens fastighetsverk betraktades som en av Europas starkaste fästningar. Carlsten är statligt byggnadsminne och förvaltas av Statens fastighetsverk sedan hösten 1993.',
      // KÄLLA: Statens fastighetsverk, Carlstens fästning Marstrand — bekräftar högst 232 fångar, Lasse-Maja dit 1813, sista fångarna bort 1858 under Krimkriget, världens första roterande fyr 1781, Skeppsgossekårens skola för 200 pojkar samt kustspaningsradar i tornet fram till 1993 — https://www.sfv.se/vara-fastigheter/sverige/vastra-gotalands-lan/carlstens-fastning-marstrand (läst 2026-09-16)
      'Fästningen har haft många roller. Den fungerade som fängelse med som mest 232 fångar; den ökände tjuven Lasse-Maja fördes hit 1813, och 1858 flyttades de sista fångarna bort eftersom krigshotet under Krimkriget var stort. På tornet installerades 1781 världens första roterande fyr. I början av 1900-talet drev Skeppsgossekåren en skola för 200 pojkar i fästningen, och ända fram till 1993 fanns en kustspaningsradarstation i tornet.',
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Marstrand — bekräftar att orten grundades på 1200-talet av Håkon Håkonsson, blev svensk 1658 och på 1500-talet var centrum för sillhandeln i Europa — https://www.vastsverige.com/en/kungalv/products/marstrand/ (läst 2026-09-16)
      'Orten är äldre än fästningen. Marstrand grundades på 1200-talet av den norske kungen Håkon Håkonsson och blev svenskt först 1658. På 1500-talet var staden ett centrum för sillhandeln i Europa, och sillen avgjorde under lång tid välstånd och fattigdom för invånarna.',
      // KÄLLA: https://www.vastsverige.com/kungalv/marstrand/ — "Sommarens seglingshöjdpunkt är när Match Cup Sweden avgörs första veckan i juli", "Längs bryggorna i Sveriges största gästhamn ligger båtarna tätt" (läst 2026-09-27)
      // KÄLLA: https://www.vastsverige.com/en/kungalv/products/marstrand/ — "Marstrand is definitely the sailing centre of the whole country" (läst 2026-09-27)
      // KÄLLA: https://gkss.se/sv/nyheter/gkss-match-cup-sweden-2026 — "GKSS Match Cup Sweden seglas 29 juni till 4 juli på Marstrand" (läst 2026-09-27)
      // KÄLLA: https://www.vastsverige.com/kungalv/produkter/marstrands-gasthamn/ — "Bryggorna G, H, D och E är för gästande båtar", "Kajen är förtöjningsplats för gästande båtar över 15 m skrovlängd", "Minsta djup är 3,5 m" (läst 2026-09-27)
      // KÄLLA: https://www.marstrandsgasthamn.se/sv/ — "Marstrands gästhamn och dess bryggor är beläget på den sydöstra delen av ön med 275 gästplatser varav 98 bokningsbara" (läst 2026-09-27)
      // KÄLLA: https://www.marstrandsgasthamn.se/sv/Gasthamn — "El och vatten ingår i serviceavgiften och finns på alla bryggor" (läst 2026-09-27)
      // KÄLLA: https://www.marstrandsgasthamn.se/sv/Kontakt — "Högsäsong (15 juni - 30 juni och 1 augusti - 15 augusti)", "Högsäsong (1 juli - 31 juli)", "1 maj - 14 juni och 16 augusti - 30 september", "Fredag - Söndag" (läst 2026-09-27). Tidigare stod att hamnkontoret är bemannat dagligen maj–september (vastsverige.com); gästhamnens egen sida anger dagligen bara 15 juni–15 augusti.
      'Seglingen sätter sin prägel på ön. GKSS Match Cup Sweden avgörs i början av juli – 2026 seglades den 29 juni–4 juli – och Turistrådet Västsverige kallar då Marstrand landets segelcentrum. Den kommunala gästhamnen på sydöstra Marstrandsön kallas av samma källa Sveriges största gästhamn och har 275 gästplatser, varav 98 går att förboka. Gästbåtar ligger vid bryggorna G, H, D och E, medan båtar över 15 meters skrovlängd ligger vid Gästkajen, där minsta djup är 3,5 meter. El och vatten ingår i avgiften. Gästhamnskontoret är bemannat dagligen 15 juni–15 augusti och fredag–söndag under resten av perioden maj–september.',
      // KÄLLA: Kungälvs kommun, Marstrandsfärjan — bekräftar att färjan mellan Koön och Marstrand drivs av kommunen och att biljetter och dispensansökningar hanteras där — https://www.kungalv.se/trafik--gator/kollektivtrafik/marstrandsfarjan/ ; Besöksparkering i Marstrand — https://www.kungalv.se/trafik--gator/parkering/parkeringsplatser-i-marstrand/ ; Samlastning Marstrand — https://www.kungalv.se/trafik--gator/kollektivtrafik/samlastning/ (läst 2026-09-16)
      // KÄLLA: https://www.kungalv.se/trafik--gator/kollektivtrafik/marstrandsfarjan/ — "Färjan mellan Koön och Marstrand kallas för Marstrandsfärjan", "Endast fordon i nyttotrafik får färjas över till Marstrandsön", "Inga enkelbiljetter som är köpta hos Västtrafik gäller på marstrandsfärjan", "Alla biljetter gäller tur och retur till och från Marstrandsön" (läst 2026-09-27)
      'Färjan mellan Koön och Marstrandsön kallas Marstrandsfärjan och drivs av Kungälvs kommun. Biljetterna gäller tur och retur och köps på marstrandsfarja.se eller i kuren vid Koöns färjeläge – Västtrafiks enkelbiljetter gäller inte på färjan, men vissa periodbiljetter för zon B gör det. Besöksparkering finns på Koön och fastlandssidan. Marstrandsön är bilfri: bara fordon i nyttotrafik får färjas över, och den som ska skicka gods dit hänvisas av kommunen till en samlastningstjänst.',
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Marstrand — bekräftar Societetshuset och Marstrands Varmbadhus samt att kung Oscar II fanns bland badortsgästerna — https://www.vastsverige.com/en/kungalv/products/marstrand/ (läst 2026-09-16)
      'Under 1800-talet fick Marstrand ett andra liv som badort. Societetshuset och Marstrands Varmbadhus drog societeten till ön, och bland gästerna fanns kung Oscar II.',
    ],
    facts: {
      // KÄLLA: Kungälvs kommun, Marstrandsfärjan — bekräftar färjeförbindelsen Koön–Marstrandsön — https://www.kungalv.se/trafik--gator/kollektivtrafik/marstrandsfarjan/ (läst 2026-09-16)
      // KÄLLA: https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6302__0__LINE__20251214__20261212__25ea94b6-c06e-4190-822d-a22d774d80ee__1%2C0__2635889.pdf — "302 Kungälv–Ytterby–Marstrand", "Gäller 14 dec 2025 - 12 dec 2026" (läst 2026-09-27). Restid räknad ur tabellen måndag–fredag: Ytterby station 09.08 → Marstrands färjeläge 09.37 (29 min), Kungälv resecentrum 08.55 → 09.37 (42 min).
      travel_time: 'Buss 302 från Kungälv (42 min) eller Ytterby station (29 min) till Koön, sedan Marstrandsfärjan över sundet',
      // KÄLLA: https://www.vastsverige.com/en/kungalv/products/marstrand/ — "is spread over the two islands of Koön and Marstrandsön", "small alleys, the spectacular fortress and sea views at every turn" (läst 2026-09-27); https://www.vastsverige.com/kungalv/marstrand/ — "Sveriges största gästhamn" (läst 2026-09-27)
      character: 'Kuststad på Koön och Marstrandsön med fästning, gränder och Sveriges största gästhamn',
      // KÄLLA: https://carlsten.se/oppettider-och-priser/ — "3 april – 31 maj 2026", "1 juni – 30 juni 2026", "September 2026" (läst 2026-09-27); https://www.kungalv.se/trafik--gator/kollektivtrafik/marstrandsfarjan/ — "Lågsäsong (september–april)" (läst 2026-09-27)
      season: 'Året runt; Carlstens fästning har öppet april–september (alla dagar juni–augusti)',
      // KÄLLA: https://www.vastsverige.com/en/kungalv/products/marstrand/ — "walk around the whole of Marstrandsön", "Skallens lighthouse" (läst 2026-09-27); https://carlsten.se/oppettider-och-priser/ — "Guidade turer på svenska varje dag kl 12, 14, 15" (läst 2026-09-27)
      best_for: 'Segling, guidad tur på Carlstens fästning, promenad runt Marstrandsön',
    },
    facts_provenance: {
      travel_time: 'matt',
      character: 'bedomning',
      season: 'bedomning',
      best_for: 'bedomning',
    },
    activities: [
      // KÄLLA: Statens fastighetsverk, Carlstens fästning Marstrand — bekräftar namnet, att anläggningen är statligt byggnadsminne och att SFV förvaltar den sedan 1993 — https://www.sfv.se/vara-fastigheter/sverige/vastra-gotalands-lan/carlstens-fastning-marstrand (läst 2026-09-16)
      // KÄLLA: https://carlsten.se/oppettider-och-priser/ — "3 april – 31 maj 2026", "Öppet helger:", "1 juni – 30 juni 2026", "Öppet alla dagar:", "Ordinarie guidade turer nedan ges på svenska och ingår i", "En guidad tur tar ca 45 minuter", "Alla hundar är välkomna och har fri entré på fästningen" (läst 2026-09-27)
      { icon: '🏰', name: 'Carlstens fästning', desc: 'Statligt byggnadsminne, förvaltat av Statens fastighetsverk sedan 1993. 2026 öppet helger i april–maj och september och alla dagar juni–augusti. Guidade turer på svenska (cirka 45 minuter) ingår i entrén; hundar får följa med kopplade.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Marstrand — bekräftar GKSS Match Cup Sweden första veckan i juli och Marstrand som landets segelcentrum då — https://www.vastsverige.com/kungalv/marstrand/ (läst 2026-09-16)
      // KÄLLA: https://gkss.se/sv/nyheter/gkss-match-cup-sweden-2026 — "GKSS Match Cup Sweden seglas 29 juni till 4 juli på Marstrand" (läst 2026-09-27)
      { icon: '⛵', name: 'GKSS Match Cup Sweden', desc: 'Avgörs i början av juli (2026: 29 juni–4 juli) — då är Marstrand landets segelcentrum enligt Turistrådet Västsverige.' },
      // KÄLLA: https://www.vastsverige.com/en/kungalv/products/marstrand/ — "walk around the whole of Marstrandsön, or take a shorter walk through Smugglarrännan", "Take a break out by Skallens lighthouse and admire the enchanting area where the Skagerrak and Kattegatt meet", "On Koön there are well-marked footpaths, with three levels of difficulty" (läst 2026-09-27)
      { icon: '🥾', name: 'Promenad runt Marstrandsön', desc: 'Gå runt hela Marstrandsön eller ta den kortare vägen genom Smugglarrännan, med paus vid Skallens fyr där Skagerrak och Kattegatt möts. På Koön finns märkta leder i tre svårighetsgrader.' },
    ],
    accommodation: [
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Grand Hotel Marstrand — bekräftar namnet, Rådhusgatan 2 på Marstrandsön och matsalarna Grand Tenan och Bakfickan — https://www.vastsverige.com/en/kungalv/products/grand-hotel-marstrand/ (läst 2026-09-16)
      // KÄLLA: https://grandmarstrand.se/restaurang-tenan/ — "Restaurang Grand Tenan är ett välkänt begrepp på Västkusten" (läst 2026-09-27)
      { name: 'Grand Hotel Marstrand', type: 'Hotell', desc: 'Hotell på Marstrandsön med restaurangerna Grand Tenan och Bakfickan.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Marstrands Havshotell — bekräftar läget på Koön intill färjeläget, spa, 144 rum och restaurangen Otto\'s Vardagsrum & Kök — https://www.vastsverige.com/en/kungalv/products/marstrands-havshotell/ (läst 2026-09-16)
      // KÄLLA: https://marstrands.se/en/about-us — "a warm spa, 144 rooms", "Otto's Vardagsrum & Kök" (läst 2026-09-27)
      { name: 'Marstrands Havshotell', type: 'Hotell', desc: 'Hotell på Koön vid färjeläget till Marstrandsön, med spa och restaurangen Otto\'s Vardagsrum & Kök.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Marstrands Kurhotell — bekräftar byggnaden som på 1800-talet inrymde kall- och varmbad, 39 rum, Kungsplanen på Marstrandsön — https://www.vastsverige.com/en/kungalv/products/marstrands-kurhotell/ (läst 2026-09-16)
      // KÄLLA: https://www.marstrandskurhotell.se/ — "Välkommen till Marstrands Kurhotell" (läst 2026-09-27)
      { name: 'Marstrands Kurhotell', type: 'Hotell', desc: 'Hotell i en byggnad som på 1800-talet inrymde kall- och varmbad. 39 rum på Marstrandsön.' },
    ],
    getting_there: [
      // KÄLLA: Kungälvs kommun, Marstrandsfärjan och Besöksparkering i Marstrand — bekräftar färjan Koön–Marstrandsön och parkering på Koön — https://www.kungalv.se/trafik--gator/kollektivtrafik/marstrandsfarjan/ och https://www.kungalv.se/trafik--gator/parkering/parkeringsplatser-i-marstrand/ (läst 2026-09-16)
      // KÄLLA: https://www.kungalv.se/trafik--gator/kollektivtrafik/marstrandsfarjan/ — "Inga enkelbiljetter som är köpta hos Västtrafik gäller på marstrandsfärjan", "Du köper din biljett i kundservicekuren vid Koöns färjeläge" (läst 2026-09-27); https://www.marstrandsfarja.se/ — "Biljetter gäller tur och retur från färjeläget på Koön till Marstrandsön" (läst 2026-09-27)
      { method: 'Bil + färja', from: 'Göteborg', desc: 'Kör till Koön och parkera, ta sedan Marstrandsfärjan över sundet. Biljetten gäller tur och retur och köps på marstrandsfarja.se eller i kuren vid Koöns färjeläge; Västtrafiks enkelbiljetter gäller inte på färjan.', icon: '🚗' },
      // KÄLLA: https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6302__0__LINE__20251214__20261212__25ea94b6-c06e-4190-822d-a22d774d80ee__1%2C0__2635889.pdf — "302 Kungälv–Ytterby–Marstrand", "Marstrands färjeläge", "Gäller 14 dec 2025 - 12 dec 2026", "C Går endast 19 juni - 16 aug." (läst 2026-09-27). Restider räknade ur tabellen (Ytterby station → Marstrands färjeläge 29 min, Kungälv resecentrum → 42 min); måndag–fredag dagtid avgång från Kungälv varje timme (08.55, 09.55, 10.55 …), lördag–söndag 19 juni–16 augusti extra turer så att bussen går varje halvtimme. Linjen går inte från Göteborg, vilket den tidigare texten påstod.
      { method: 'Buss', from: 'Kungälv / Ytterby', desc: 'Västtrafiks buss 302 går från Kungälv resecentrum (cirka 42 minuter) och Ytterby station (cirka 29 minuter) till Marstrands färjeläge på Koön, på vardagar dagtid en gång i timmen. Från Göteborg byter du till linje 302 i Kungälv eller Ytterby – sök hela resan i Västtrafiks reseplanerare. Tänk på att enkelbiljett för bussen inte gäller på färjan.', icon: '🚌' },
    ],
    harbors: [
      // KÄLLA: https://www.vastsverige.com/kungalv/produkter/marstrands-gasthamn/ — "På den sydöstra delen av Marstrandsön ligger den kommunala gästhamnen", "I gästhamnen råder det ankringsförbud" (läst 2026-09-27)
      // KÄLLA: https://www.marstrandsgasthamn.se/sv/Gasthamn — "El och vatten ingår i serviceavgiften och finns på alla bryggor", "Kod till duschar och toalett", "Tvättmaskiner och torktumlare finner du i vår tvättstuga på baksidan gästhamnsbyggnaden", "Bunkring av bränsle är förbjuden inom området kring gästhamnen", "Det är totalt förbjudet att grilla på båten, bryggor och i området kring dessa", "Det råder badförbud i hamnområdet" (läst 2026-09-27); https://www.marstrandsgasthamn.se/sv/ — "275 gästplatser varav 98 bokningsbara", "hamnkontoret@kungalv.se" (läst 2026-09-27). Tidigare källa (en gästhamnsguide som inte är tillåten) borttagen.
      { name: 'Marstrands Gästhamn', desc: 'Kommunal gästhamn på sydöstra Marstrandsön med 275 gästplatser, varav 98 går att förboka. El och vatten ingår i avgiften, och tvättstugan har tvättmaskiner, torktumlare och diskstation. Ankring, grillning på båtar och bryggor, bunkring av bränsle och bad är förbjudet i hamnområdet.', fuel: false, service: ['Vatten', 'El', 'Dusch', 'WC', 'Tvätt'] },
    ],
    restaurants: [
      // KÄLLA: Grand Hotel Marstrand, egen webbplats — bekräftar Restaurang Tenan med "vällagad à la carte, fisk och skaldjur samt klassiska rätter" — https://grandmarstrand.se/restaurang-tenan/ ; läget Rådhusgatan 2 — https://www.vastsverige.com/kungalv/produkter/restaurang-tenan/ (läst 2026-09-16)
      { name: 'Tenan', type: 'Restaurang', desc: 'À la carte med fisk, skaldjur och klassiska rätter. Del av Grand Hotel Marstrand.' },
      // KÄLLA: Hamnkrogen Marstrand, egen webbplats — bekräftar namn, adressen Lilla Varvsgatan 20 samt rubrikerna KÖK & BAR och Butik — https://www.hamnkrogenmarstrand.se/ (läst 2026-09-16)
      { name: 'Hamnkrogen Marstrand', type: 'Krog', desc: 'Krog med kök och bar på Lilla Varvsgatan.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Marstrands Wärdshus — bekräftar skaldjursplatåer och grillmat samt adressen "Mitt på kajen" på Marstrandsön — https://www.vastsverige.com/kungalv/produkter/marstands-wardshus/ (läst 2026-09-16)
      // KÄLLA: https://www.marstrandswardshus.se/ — "skaldjur-, och grillrestaurang mitt på kajen på Marstrand", "Vi har cirka 120 sittplatser på uteserveringen och 30 inomhus" (läst 2026-09-27)
      { name: 'Marstrands Wärdshus', type: 'Restaurang', desc: 'Skaldjurs- och grillrestaurang mitt på kajen på Marstrandsön, med uteterrass vid hamnen.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Johans krog Marstrand — bekräftar "fransk bistro" och adressen Kungsgatan 12 — https://www.vastsverige.com/kungalv/produkter/johans-krog-marstrand/ (läst 2026-09-16)
      // KÄLLA: https://www.johanskrogmarstrand.se/ — "Fransk bistro möter Västkusten" (läst 2026-09-27)
      { name: 'Johans krog Marstrand', type: 'Restaurang', desc: 'Fransk bistro på Kungsgatan med utservering.' },
      // KÄLLA: https://carlsten.se/carlstens-vaffelcafe/ — "Du hittar oss vid fästningens entré och du behöver inte köpa entré till fästningen för att komma till oss", "Våfflor, Sallader, Pajer, Smörgåsar", "Tack för säsongen 2026", "Vi öppnar igen till påsken 2027" (läst 2026-09-27)
      { name: 'Carlstens Vaffelcafé', type: 'Café', desc: 'Säsongscafé vid ingången till Carlstens fästning, öppet från påsk och under sommaren. Våfflor, pajer, smörgåsar och sallader; fästningsbiljett krävs inte för besök. Säsongen 2026 är avslutad – caféet öppnar igen till påsken 2027.' },
    ],
    // KÄLLA: https://gkss.se/sv/nyheter/gkss-match-cup-sweden-2026 — "GKSS Match Cup Sweden seglas 29 juni till 4 juli på Marstrand" (läst 2026-09-27); https://www.kungalv.se/trafik--gator/kollektivtrafik/marstrandsfarjan/ — "Inga enkelbiljetter som är köpta hos Västtrafik gäller på marstrandsfärjan" (läst 2026-09-27); https://carlsten.se/oppettider-och-priser/ — "Ordinarie guidade turer nedan ges på svenska och ingår i" (läst 2026-09-27)
    tips: ['Match Cup Sweden avgörs i början av juli (2026: 29 juni–4 juli) — boka boende i god tid om du vill vara på ön då.', 'Köp färjebiljett på marstrandsfarja.se eller vid Koöns färjeläge – Västtrafiks enkelbiljetter gäller inte på Marstrandsfärjan.', 'De guidade turerna på Carlstens fästning ingår i entréavgiften.'],
    related: ['smogen', 'kungshamn', 'lysekil'],
    tags: ['fästning', 'segling', 'restauranger', 'sommardestination', 'lyx'],
    // KÄLLA: Statens fastighetsverk, Carlstens fästning Marstrand — bekräftar världens första roterande fyr 1781, högst 232 fångar, Lasse-Maja dit 1813 och att de sista fångarna flyttades 1858 — https://www.sfv.se/vara-fastigheter/sverige/vastra-gotalands-lan/carlstens-fastning-marstrand (läst 2026-09-16)
    did_you_know: 'Världens första roterande fyr installerades i Carlstens torn 1781. Fästningen var också fängelse — som mest 232 fångar, bland dem Lasse-Maja som fördes hit 1813 — och de sista fångarna flyttades bort 1858.',
    // KÄLLA: https://carlsten.se/oppettider-och-priser/ — "3 april – 31 maj 2026", "September 2026", "1 juli – 9 augusti 2026" (läst 2026-09-27); https://www.marstrandsgasthamn.se/sv/Kontakt — "Högsäsong (15 juni - 30 juni och 1 augusti - 15 augusti)", "Högsäsong (1 juli - 31 juli)" (läst 2026-09-27); https://www.kungalv.se/trafik--gator/kollektivtrafik/marstrandsfarjan/ — "Lågsäsong (september–april)" (läst 2026-09-27)
    seasonal: {
      open: 'Året runt – Carlstens fästning april–september',
      peak: 'Mitten av juni–mitten av augusti',
      best: 'Juni eller september',
      // KÄLLA: https://gkss.se/sv/nyheter/gkss-match-cup-sweden-2026 — "GKSS Match Cup Sweden seglas 29 juni till 4 juli på Marstrand" (läst 2026-09-27); https://carlsten.se/oppettider-och-priser/ — "Guidade turer på svenska varje dag kl 12, 14, 15", "Öppet helger:" (läst 2026-09-27)
      bestReason: 'Juni och september ligger till största delen utanför Match Cup-veckan (29 juni–4 juli 2026). I juni har Carlstens fästning öppet alla dagar med guidade turer; i september har den öppet helger.',
      // KÄLLA: https://gkss.se/sv/nyheter/gkss-match-cup-sweden-2026 — "GKSS Match Cup Sweden seglas 29 juni till 4 juli på Marstrand" (läst 2026-09-27); https://carlsten.se/carlstens-vaffelcafe/ — "Vi öppnar igen till påsken 2027" (läst 2026-09-27)
      warning: 'GKSS Match Cup Sweden avgörs i början av juli – boka boende i god tid om du vill vara på ön då. Fästningen anger inga öppettider för oktober–mars, och våffelcaféet öppnar först till påsk.',
      months: ['limited','limited','limited','limited','open','open','peak','peak','open','limited','limited','limited'],
    },
  },
  {
    slug: 'smogen',
    name: 'Smögen',
    region: 'bohuslan',
    regionLabel: 'Bohuslän',
    emoji: '🦐',
    // KÄLLA: https://www.vastsverige.com/sotenas/produkter/smogenbryggan/ — "Sveriges mest besökta brygga" (läst 2026-09-27)
    // KÄLLA: https://www.vastsverige.com/sotenas/artiklar/smogen/ — "Landets näst största fiskauktion ligger på Smögen." (läst 2026-09-27)
    // KÄLLA: https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/halloarkipelagen.html — "Med en vit blixt var tolfte sekund gör sig Bohusläns äldsta fyr påmind." (läst 2026-09-27)
    tagline: 'Sveriges mest besökta brygga, landets näst största fiskauktion och Bohusläns äldsta fyr på Hållö utanför.',
    description: [
      // KÄLLA: https://www.vastsverige.com/sotenas/produkter/smogenbryggan/ — "Smögenbryggan är sommartid ett av Sveriges mest besökta turistmål.", "1 km långa", "Här finns ett antal caféer, krogar och mängder av butiker.", "Flera båtturer utgår från Smögenbryggan.", "Du kan ta dig till Hållö, Kungshamn", "I hamnområdet finns även hembygdsmuseum", "användes av fiskare redan under mitten av 1500-talet" (läst 2026-09-27)
      // KÄLLA: https://www.vastsverige.com/sotenas/artiklar/smogen/ — "Första gången Smögen nämndes i litteraturen var 1594" (läst 2026-09-27)
      // KÄLLA: https://www.vastsverige.com/sotenas/produkter/gasthamn-smogen/ — "Från Smögenbryggan går under säsong turbåtar till Kungshamn en gång i halvtimmen." (läst 2026-09-27)
      // KÄLLA: https://www.vastsverige.com/en/sotenas/produkter/smogen/ — "The pier is almost 800 metres long" (läst 2026-09-27)
      'Smögenbryggan är Smögens nav. Turistrådet Västsverige anger bryggans längd till 1 km på sin svenska sida och knappt 800 meter på den engelska, och kallar den sommartid ett av Sveriges mest besökta turistmål. Längs den ligger caféer, krogar och ett stort antal butiker, och i hamnområdet finns också ett hembygdsmuseum. Härifrån går båtturer till bland annat Hållö och Kungshamn; till Kungshamn går turbåten under säsong en gång i halvtimmen. Hamnen har använts av fiskare sedan mitten av 1500-talet, och första gången Smögen nämns i litteraturen är 1594.',
      // KÄLLA: https://www.vastsverige.com/sotenas/artiklar/smogen/ — "Landets näst största fiskauktion ligger på Smögen.", "Här landar fiskebåtarna sina fångster av färsk fisk och skaldjur", "Fiskarstugan, en inredd fiskarbostad från ca 1850", "Du hittar stugan bakom Smögenbryggan", "Sommartid visas stugan fasta tider, övriga året får man kontakta Smögens Hembygdsförening för visning." (läst 2026-09-27)
      'Här landar fiskebåtarna fortfarande sina fångster av färsk fisk och skaldjur: landets näst största fiskauktion ligger på Smögen. Bakom Smögenbryggan ligger Fiskarstugan, en inredd fiskarbostad från omkring 1850 som visar hur man bodde och levde här. Sommartid visas stugan på fasta tider, övriga året via Smögens Hembygdsförening.',
      // KÄLLA: https://www.sotenas.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/batar-och-hamnar/gasthamnar/smogens-gasthamn — "Gästhamnen ligger vid den berömda Smögenbryggan och drivs av Sotenäs kommun.", "Antal platser: ca 120 st", "Förtöjning: Fastförtöjning", "Vattendjup: 3-5 m", "WC, färskvatten, el, wifi, tvättmaskin/torktumlare, sopor och dusch", "Hamnkontoret är beläget i början på bryggan/Ringareskäret", "Öppet alla dagar under perioden v25-33.", "Bokning sker via Dockspot.se" (läst 2026-09-27)
      // KÄLLA: https://www.vastsverige.com/sotenas/produkter/gasthamn-smogen/ — "Under lågsäsong (före 1 april och efter 31 oktober) är anläggningen stängd." (läst 2026-09-27)
      'Gästhamnen drivs av Sotenäs kommun och ligger vid själva Smögenbryggan. Den har cirka 120 gästplatser med fastförtöjning och ett vattendjup på 3–5 meter. Servicen omfattar toalett, färskvatten, el, wifi, tvättmaskin och torktumlare, sopor och dusch; hygienanläggningen är stängd före 1 april och efter 31 oktober. Hamnkontoret vid början av bryggan är öppet alla dagar under vecka 25–33. Bokning sker via Dockspot.',
      // KÄLLA: https://www.sotenas.se/upplevagora/idrottmotionochfriluftsliv/friluftslivochmotion/badplatserhundbad/smogen.4.15eba9af15b0a9219ba31966.html — "Sandstrand med bryggor, badstegar och handikapptrappa. Omklädningsrum, toalett och handikapptoalett. Där finns också gillplats och parkering.", "Klippbad med badstegar och hopptorn. Stor gräsplan, grillplats och parkering.", "Klippor med bryggor och badstegar. Omklädningsrum och toalett i vandrarhemmet." (läst 2026-09-27)
      'Sotenäs kommun listar tre badplatser på Smögen. Sandö är en sandstrand med bryggor, badstegar och en trappa anpassad för rörelsehindrade, omklädningsrum, toalett och handikapptoalett samt grillplats och parkering. Vallevik är ett klippbad med badstegar och hopptorn, stor gräsplan, grillplats och parkering. Herr- och dambadet i Makrillviken är en klippstrand med bryggor och badstegar, där omklädningsrum och toalett finns i vandrarhemmet intill.',
      // KÄLLA: https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/halloarkipelagen.html — "Bildat: 1975", "Areal: cirka 292 hektar", "Naturvårdsförvaltare: Västkuststiftelsen", "Med en vit blixt var tolfte sekund gör sig Bohusläns äldsta fyr påmind.", "Här har den stått sedan 1842 på Hållös högsta punkt.", "Fyren förklarades som byggnadsminne 1935.", "Släta klippavsatser lockar ner dig i det klara, blåa vattnet vid Marmorbassängen på Hållös västsida.", "Det finns ett fyrtiotal jättegrytor på Hållö", "Sommartid utgår regelbundna badturer från Kungshamn." (läst 2026-09-27)
      // KÄLLA: https://www.vastsverige.com/sotenas/artiklar/smogen/ — "10 minuters båttur från Smögen ligger ön Hållö" (läst 2026-09-27)
      'Tio minuters båttur från Smögen ligger Hållö. Ön ingår i naturreservatet Hållöarkipelagen, som bildades 1975, omfattar cirka 292 hektar och förvaltas av Västkuststiftelsen. Hållö fyr är Bohusläns äldsta fyr — den har stått på öns högsta punkt sedan 1842, lyser med en vit blixt var tolfte sekund och blev byggnadsminne 1935. På ön finns ett fyrtiotal jättegrytor från istiden, och på västsidan ligger Marmorbassängen med släta klippavsatser att bada från. Sommartid går regelbundna badturer från Kungshamn.',
      // KÄLLA: https://www.vastsverige.com/sotenas/artiklar/smogen/ — "Smögens äldsta hotell är Hotell Smögens Hafvsbad, som stod klart 1900 och tog emot sommargäster som kom för att bada tångbad och roa sig." (läst 2026-09-27)
      'Badortstiden satte också spår. Smögens äldsta hotell, Hotell Smögens Hafvsbad, stod klart år 1900 och tog emot sommargäster som kom för att bada tångbad och roa sig.',
    ],
    facts: {
      // KÄLLA: https://www.vastsverige.com/en/sotenas/produkter/smogen/ — "It takes just under two hours to drive from Gothenburg to Smögen." (läst 2026-09-27)
      // KÄLLA: https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/4860__0__LINE__20251214__20261212__9f3324f3-f11e-41b4-82f9-35990c574266__1%2C0__2611184.pdf — "Smögen–Kungshamn–Uddevalla–Trollhättan", "Gäller 14 dec 2025 - 12 dec 2026", "Smögen busstation 08.47 10.47 12.47 14.47 16.47 18.47 20.47 23.07" — lör/sön Uddevalla central 09.19 → Smögen busstation 10.47 = 88 min (läst 2026-09-27)
      travel_time: 'Knappt två timmar med bil från Göteborg; buss 860 från Uddevalla ca 1,5 timme',
      // KÄLLA: https://www.vastsverige.com/sotenas/artiklar/smogen/ — "Folkliv, klippor och charmiga sjöbodar", "Landets näst största fiskauktion ligger på Smögen." (läst 2026-09-27)
      character: 'Fiskeläge med fiskauktion, Smögenbryggan, klippor och badplatser',
      // KÄLLA: https://www.sotenas.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/batar-och-hamnar/gasthamnar/smogens-gasthamn — "Lågsäsong Mellansäsong Högsäsong Mellansäsong Lågsäsong", "v 1-24 v 25-26 v 27-31 v 32-37 v 38-52", "Öppet alla dagar under perioden v25-33." (läst 2026-09-27)
      season: 'Året runt; högsäsong i gästhamnen vecka 27–31',
      // KÄLLA: https://skaretskrog.se/ — "Där räkmackan föddes 1931." (läst 2026-09-27)
      // KÄLLA: https://www.vastsverige.com/en/sotenas/produkter/smogen/ — "The path meanders along the west coast through Smögen, Kungshamn, Bohus-Malmön, Ramsvik, Hunnebostrand and Bovallstrand." (läst 2026-09-27)
      best_for: 'Räkmacka, fisk och skaldjur, klippbad, vandring på Soteleden',
    },
    facts_provenance: {
      travel_time: 'matt',
      character: 'matt',
      season: 'matt',
      best_for: 'matt',
    },
    activities: [
      // KÄLLA: https://www.vastsverige.com/sotenas/artiklar/smogen/ — "Landets näst största fiskauktion ligger på Smögen.", "som du lite senare kan köpa i fiskaffärerna om hörnet" (läst 2026-09-27)
      { icon: '🦐', name: 'Fiskauktionen', desc: 'Landets näst största fiskauktion ligger på Smögen. Fångsten säljs sedan i fiskaffärerna runt hamnen.' },
      // KÄLLA: https://www.vastsverige.com/en/sotenas/produkter/smogen/ — "Soteleden/Kungsstigen", "The path meanders along the west coast through Smögen, Kungshamn, Bohus-Malmön, Ramsvik, Hunnebostrand and Bovallstrand.", "You can walk it easily by dividing it into sections." (läst 2026-09-27)
      { icon: '🥾', name: 'Soteleden', desc: 'Kustleden Soteleden/Kungsstigen går genom Smögen och vidare via Kungshamn, Bohus-Malmön, Ramsvik, Hunnebostrand och Bovallstrand. Den går att dela upp i etapper.' },
      // KÄLLA: https://www.sotenas.se/upplevagora/idrottmotionochfriluftsliv/friluftslivochmotion/badplatserhundbad/smogen.4.15eba9af15b0a9219ba31966.html — "Klippbad med badstegar och hopptorn. Stor gräsplan, grillplats och parkering." (läst 2026-09-27)
      { icon: '🏊', name: 'Vallevik', desc: 'Kommunalt klippbad med badstegar, hopptorn, stor gräsplan, grillplats och parkering.' },
      // KÄLLA: https://www.vastsverige.com/sotenas/produkter/smogenbryggan/ — "Här finns ett antal caféer, krogar och mängder av butiker.", "Flera båtturer utgår från Smögenbryggan.", "Du kan ta dig till Hållö, Kungshamn" (läst 2026-09-27)
      { icon: '🛍', name: 'Smögenbryggan', desc: 'Caféer, krogar och ett stort antal butiker längs bryggan; härifrån går även båtturer till Hållö och Kungshamn.' },
    ],
    accommodation: [
      // KÄLLA: https://www.smogenshafvsbad.se/ — "Hotell, Spa & Konferens på Smögen", "Hotellet bestod då av den vackra matsalen, åtta rum" (läst 2026-09-27)
      // KÄLLA: https://www.smogenshafvsbad.se/restaurang/ — "Från restaurangen ser du ut över Smögen, havet, klipporna" (läst 2026-09-27)
      { name: 'Smögens Hafvsbad', type: 'Hotell', desc: 'Hotell, spa och konferens på Smögen. Från restaurangen ser man ut över Smögen, havet och klipporna. Hotellet började år 1900 med matsal och åtta rum.' },
      // KÄLLA: https://www.sealodge.se/ — "Sea Lodge är hotell, restaurang och brygga på Smögen", "16 rum, UMI:s asiatiska kök, en uteservering vid vattnet", "Nordmanshuvudet 1" (läst 2026-09-27)
      { name: 'Sea Lodge Smögen', type: 'Hotell', desc: 'Hotell, restaurang och brygga vid Nordmanshuvudet på Smögen, med 16 rum, restaurangen UMI och uteservering vid vattnet.' },
      // KÄLLA: https://www.makrillviken.se/ — "alldeles vid vattenbrynet på öns västsida", "Vi erbjuder 25 olika rum samt en sjöbod, med totalt 80 sängplatser.", "14 av rummen har egen toalett och dusch.", "koppla av i vår bastu", "alkoholfri miljö", "Sedan 1993 drivs Makrillvikens Vandrarhem av familjen Strand." (läst 2026-09-27)
      { name: 'Makrillvikens Vandrarhem', type: 'Vandrarhem', desc: 'Familjedrivet vandrarhem vid vattnet på Smögens västsida sedan 1993, med 25 rum och en sjöbod, totalt 80 sängplatser. 14 rum har egen toalett och dusch; bastu finns. Alkoholfri miljö.' },
    ],
    getting_there: [
      // KÄLLA: https://www.vastsverige.com/en/sotenas/produkter/smogen/ — "It takes just under two hours to drive from Gothenburg to Smögen.", "After crossing Smögen Bridge from the centre of Kungshamn" (läst 2026-09-27)
      { method: 'Bil', from: 'Göteborg', desc: 'E6 norrut och vidare mot Kungshamn; från Kungshamns centrum går Smögenbron över till Smögen. Knappt två timmar från Göteborg.', icon: '🚗' },
      // KÄLLA: https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/4860__0__LINE__20251214__20261212__9f3324f3-f11e-41b4-82f9-35990c574266__1%2C0__2611184.pdf — "Smögen–Kungshamn–Uddevalla–Trollhättan", "Linjen trafikeras av Vy Buss.", "Gäller 14 dec 2025 - 12 dec 2026", "Smögen busstation 08.47 10.47 12.47 14.47 16.47 18.47 20.47 23.07", "09.19 11.19 13.19 15.19 17.19 19.19 21.39" — t.ex. lör/sön Uddevalla central 09.19 → Smögen busstation 10.47 (88 min); Torp Terminalen 09.35 → Smögen 10.47 (72 min) (läst 2026-09-27)
      { method: 'Buss', from: 'Uddevalla', desc: 'Västtrafiks linje 860 går från Uddevalla central och Torp Terminalen via Kungshamn ända fram till Smögen busstation, ca 1,5 timme från Uddevalla central. Alla turer går inte hela vägen till Smögen – vissa slutar i Kungshamn (tidtabell 14 dec 2025–12 dec 2026). Från Göteborg tar man sig först till Uddevalla.', icon: '🚌' },
    ],
    harbors: [
      // KÄLLA: https://www.sotenas.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/batar-och-hamnar/gasthamnar/smogens-gasthamn — "Gästhamnen ligger vid den berömda Smögenbryggan och drivs av Sotenäs kommun.", "Antal platser: ca 120 st", "Vattendjup: 3-5 m", "WC, färskvatten, el, wifi, tvättmaskin/torktumlare, sopor och dusch" (läst 2026-09-27)
      // KÄLLA: https://www.vastsverige.com/sotenas/produkter/gasthamn-smogen/ — "Västkustens mest välbesökta hamn", "Under lågsäsong (före 1 april och efter 31 oktober) är anläggningen stängd." (läst 2026-09-27)
      { name: 'Smögens Gästhamn', desc: 'Kommunalt driven gästhamn vid Smögenbryggan med ca 120 platser, fastförtöjning och 3–5 meters djup. vastsverige.com kallar den "Västkustens mest välbesökta hamn". Hygienanläggningen är stängd före 1 april och efter 31 oktober.', spots: 120, fuel: false, service: ['Vatten', 'El', 'Dusch', 'WC', 'Tvätt', 'Wifi'] },
    ],
    restaurants: [
      // KÄLLA: https://www.sealodge.se/ — "Restaurang UMI", "Råvaror från havet utanför, kryddade med Tokyo, Bangkok och Seoul.", "Lunch, middag och drinkar på bryggan.", "50 platser direkt vid vattnet, med utsikt mot Hållö fyr." (läst 2026-09-27)
      { name: 'Restaurang UMI (Sea Lodge)', type: 'Restaurang', desc: 'Sea Lodges restaurang med råvaror från havet och asiatiska smaker. Lunch, middag och drinkar; uteserveringen har 50 platser vid vattnet med utsikt mot Hållö fyr.' },
      // KÄLLA: https://skaretskrog.se/ — "Restaurang på Smögen · Hamnen 1", "I början av Smögenbryggan, i samma lokaler där räkmackan såg dagens ljus 1931, lagas och bakas fortfarande allt från grunden.", "Klassiska västkustsmaker med modern twist.", "Sveriges pianistelit på scen", "Café & Bistro" (läst 2026-09-27)
      { name: 'Skärets Krog', type: 'Krog', desc: 'Krog och pianobar samt café och bistro i början av Smögenbryggan, i de lokaler där räkmackan kom till 1931. Västkustmat lagad från grunden.' },
      // KÄLLA: https://gostasfiskekrog.se/ — "fisk som ofta passerat Smögens fiskauktion bara några timmar tidigare", "blicka ut över Smögens hamn", "en restaurang på Smögen där havet alltid spelar huvudrollen, året om" (läst 2026-09-27)
      // KÄLLA: https://www.vastsverige.com/en/sotenas/produkter/gostas-fiskekrog/ — "Göstas Fiskekrog is located next to the fish shop, Göstas Fiskbutik" (läst 2026-09-27)
      { name: 'Göstas Fiskekrog', type: 'Restaurang', desc: 'Fisk- och skaldjursrestaurang vid hamnen, öppen året om, med fisk som ofta gått via Smögens fiskauktion samma dag. Fiskbutiken Göstas Fiskbutik ligger intill.' },
    ],
    // KÄLLA: https://www.vastsverige.com/en/sotenas/produkter/smogen/ — "If you are an early bird, you can see the fishing boats as they bring their catches ashore" (läst 2026-09-27)
    // KÄLLA: https://www.sotenas.se/upplevagora/idrottmotionochfriluftsliv/friluftslivochmotion/badplatserhundbad/smogen.4.15eba9af15b0a9219ba31966.html — "Herr- och dambadet, Makrillviken" (läst 2026-09-27)
    // KÄLLA: https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/halloarkipelagen.html — "medföra okopplad hund" (läst 2026-09-27)
    tips: ['Kom tidigt på morgonen: då kan du se fiskebåtarna lägga till och landa sin fångst.', 'Sotenäs kommun listar badplatserna på Smögen — Sandö, Vallevik och Herr- och dambadet i Makrillviken.', 'Tar du med hunden till Hållö ska den vara kopplad – det är förbjudet att medföra okopplad hund i naturreservatet.'],
    related: ['kungshamn', 'grundsund', 'hamburgsund'],
    tags: ['räkor', 'fiskeby', 'sommardestination', 'fotogen'],
    // KÄLLA: https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/halloarkipelagen.html — "Med en vit blixt var tolfte sekund gör sig Bohusläns äldsta fyr påmind.", "Här har den stått sedan 1842 på Hållös högsta punkt.", "Fyren förklarades som byggnadsminne 1935.", "Evert Taube besökte ön då och då under tiden när hans morbror var fyrmästare vid Hållö fyr." (läst 2026-09-27)
    did_you_know: 'Hållö fyr utanför Smögen är Bohusläns äldsta fyr. Den har stått på öns högsta punkt sedan 1842, lyser med en vit blixt var tolfte sekund och byggnadsminnesförklarades 1935. Evert Taube besökte ön då och då när hans morbror var fyrmästare där.',
    seasonal: {
      // KÄLLA: https://gostasfiskekrog.se/ — "en restaurang på Smögen där havet alltid spelar huvudrollen, året om" (läst 2026-09-27)
      // KÄLLA: https://www.vastsverige.com/sotenas/produkter/gasthamn-smogen/ — "Under lågsäsong (före 1 april och efter 31 oktober) är anläggningen stängd." (läst 2026-09-27)
      open: 'Året runt – gästhamnens servicehus 1 april–31 oktober',
      // KÄLLA: https://www.sotenas.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/batar-och-hamnar/gasthamnar/smogens-gasthamn — "v 1-24 v 25-26 v 27-31 v 32-37 v 38-52", "Lågsäsong Mellansäsong Högsäsong Mellansäsong Lågsäsong" (läst 2026-09-27)
      peak: 'Juli (gästhamnens högsäsong vecka 27–31)',
      best: 'Juni eller september',
      // KÄLLA: https://www.vastsverige.com/en/sotenas/produkter/smogen/ — "why not come here in the spring or early autumn" (läst 2026-09-27)
      // KÄLLA: https://www.sotenas.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/batar-och-hamnar/gasthamnar/smogens-gasthamn — "Öppet alla dagar under perioden v25-33." (läst 2026-09-27)
      bestReason: 'Turistrådet Västsverige tipsar om våren eller tidig höst för den som vill uppleva Smögen utan tusentals sommarturister. Gästhamnens hamnkontor är bemannat alla dagar från vecka 25.',
      // KÄLLA: https://www.vastsverige.com/sotenas/produkter/smogenbryggan/ — "Sveriges mest besökta brygga" (läst 2026-09-27)
      // KÄLLA: https://www.vastsverige.com/en/sotenas/produkter/smogen/ — "If you are an early bird, you can see the fishing boats as they bring their catches ashore" (läst 2026-09-27)
      warning: 'Juli är högsäsong på Smögenbryggan, som enligt Turistrådet Västsverige är Sveriges mest besökta brygga. Den som är tidigt uppe får se fiskebåtarna landa sin fångst innan folkströmmen kommer.',
      // Månader: gästhamnens taxeperioder (hög v27–31, mellan v25–26 och v32–37) och servicehus 1 apr–31 okt; krogar som Göstas har öppet året om.
      months: ['limited','limited','limited','open','open','open','peak','open','open','open','limited','limited'],
    },
  },
  {
    slug: 'lysekil',
    slag: 'ort',
    name: 'Lysekil',
    region: 'bohuslan',
    regionLabel: 'Bohuslän',
    emoji: '🌊',
    // KÄLLA: Bohusläns museum, Badorten Lysekil — bekräftar badortshistorien — https://www.bohuslansmuseum.se/samlingar-och-historia/gamla-historiska-artiklar/badorten-lysekil/ ; Havets Hus, Om akvariet — https://www.havetshus.se/en/akvariet/about-the-aquarium/ ; Länsstyrelsen Västra Götaland, naturreservatet Stångehuvud — https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/stangehuvud.html (läst 2026-09-16)
    tagline: 'Badortsklassiker vid Gullmarn, med Havets Hus och Stångehuvuds slipade klippor.',
    description: [
      // KÄLLA: Länsstyrelsen Västra Götaland, naturreservatet Gullmarn — bekräftar "en äkta tröskelfjord", största djup cirka 125 meter nära Alsbäck en mil från mynningen, tröskel på omkring 45 meters djup, djurarter i djupbassängen som saknas i fjorden i övrigt, bildat 1983, ca 16 499 hektar, förvaltas av Västkuststiftelsen — https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/gullmarn.html (läst 2026-09-16)
      'Lysekil ligger på Stångenäsets sydspets och blickar ut över Gullmarsfjorden, som Länsstyrelsen beskriver som en äkta tröskelfjord. Största djupet är cirka 125 meter och ligger nära Alsbäck, en mil från mynningen, medan tröskeln vid mynningen ligger på omkring 45 meters djup. Många av djurarterna i djupbassängen finns inte i fjorden i övrigt — vissa påträffas annars bara på stora djup i Skagerrak och i arktiska vatten. Naturreservatet Gullmarn bildades 1983, omfattar cirka 16 499 hektar och förvaltas av Västkuststiftelsen.',
      // KÄLLA: https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/stangehuvud.html — "Stångehuvud utgör den sydligaste utlöparen av det bohuslänska granitområdet"; "former och tydliga isräfflor är karaktäristiska för området"; "Här och var randas granitklipporna av pegmatitgångar"; "Flera stigpassager går genom smala klyftor och förbi grottliknande bildningar"; "fina möjligheter till bad och fritidsfiske utefter klippstranden i väster"; "promenader på stigar som gjorts lättgångna med prydligt anordnade trappor och spänger"; "Området utgör donationsmark som ägs av Kungliga Vetenskapsakademin"; "Donationen tillkom i en tid då stenindustrin stod på sin höjdpunkt och huvudsyftet var att undanta ett naturskönt område från stentäkt"; "detta parti ligger kvar nästan exakt som det lämnades när täktverksamheten upphörde"; "Bildat: 1983 Areal: cirka 48 hektar Naturvårdsförvaltare: Lysekils kommun och Kungliga Vetenskapsakademin" (läst 2026-09-27)
      // KÄLLA: https://www.vastsverige.com/lysekil/produkter/lysekil/ — "hans fru Calla Curman har blivit känd som Stångehuvuds räddare efter att ha köpt och donerat området, som numera är naturreservat" (läst 2026-09-27)
      // Rättat 2026-09-27: stod att Vetenskapsakademien skänkte marken. Akademien äger den; det var Calla Curman som köpte och donerade området. Stod också 'broar' (källan: spänger).
      'Stångehuvud vid stadens södra kant är naturreservat sedan 1983 och omfattar cirka 48 hektar. Det är den sydligaste utlöparen av det bohuslänska granitområdet. Marken köptes och donerades av Calla Curman och ägs i dag av Kungliga Vetenskapsakademien, som förvaltar reservatet tillsammans med Lysekils kommun. Donationen kom till när stenindustrin stod på sin höjdpunkt, för att rädda området från stenbrytning. Karaktäristiskt är rundhällarna med slipade, mjuka former och tydliga isräfflor, här och var genomdragna av pegmatitgångar. På Galleberget i norr syns spår av tidigare brytning — den delen har av kulturhistoriska skäl lämnats nästan precis som den var när stenbrytningen upphörde. Stigarna går genom smala klyftor och förbi grottliknande bildningar och är gjorda lättgångna med trappor och spänger, och längs klippstranden i väster finns bad och fritidsfiske.',
      // KÄLLA: https://www.havetshus.se/om-havets-hus/ — "Havets Hus grundades 1993"; "Varje år stiftar närmare 80 000 besökare bekantskap med hundratals fascinerande arter" (läst 2026-09-27)
      // KÄLLA: https://www.havetshus.se/akvariet/om-akvariet/ — "När du stiger in i Havets Hus omges du snart av 25 akvarier"; "Se hälleflundror, rockor och havsaborrar simma ovanför ditt huvud i tunnelakvariet"; "Våra akvarier förses hela tiden med kallt, färskt havsvatten från 32 meters djup" (läst 2026-09-27)
      // KÄLLA: https://www.havetshus.se/akvariet/djuren/ — "Över 250 fascinerande arter finns i Havets Hus"; "Alla djur, alger och växter i våra akvarier lever också i det salta Västerhavet utanför Havets Hus" (läst 2026-09-27)
      // KÄLLA: https://www.havetshus.se/en/akvariet/about-the-aquarium/ — "Some prefer the eelgrass meadows while others like soft sand bottoms or to stay around ship wrecks" (läst 2026-09-27)
      // KÄLLA: https://www.havetshus.se/projektknaggrocka/ — "I januari 2016 föddes den första knaggrockan på Havets Hus och sommaren 2021 släpptes de första egenuppfödda knaggrockorna ut"; "Hittills har 13 märkta knaggrockor släppts ut" (läst 2026-09-27)
      // Rättat 2026-09-27: stod 'omkring 100 arter' (Havets Hus: över 250) och 'stark marinbiologisk profil' utan källa.
      'Akvariet Havets Hus, grundat 1993, tar emot närmare 80 000 besökare om året. I 25 akvarier visas över 250 arter som alla lever i Västerhavet, bland dem hälleflundror, rockor och havsaborrar som simmar ovanför besökaren i tunnelakvariet. Akvarierna får hela tiden kallt havsvatten från 32 meters djup, och miljöerna spänner från det grunda strandområdet med alger och sand till djupare vatten, ålgräsängar, mjuka sandbottnar och vrak. Akvariet föder också upp och sätter ut hotade arter: den första knaggrockan föddes här 2016, och sedan 2021 har 13 märkta, egenuppfödda knaggrockor släppts ut.',
      // KÄLLA: Bohusläns museum, Badorten Lysekil — bekräftar badinrättning 1847, första varmbadhuset som däckshus från ett fartyg, första egentliga badhuset 1849, Carl Curman som badläkare, nytt varmbadhus och kallbadhus 1864, Havsbadrestaurangen 1869, Societetshuset 1872 utbyggt 1882, Curmans villor som byggnadsminnen, gångbryggan Trampen och kallbadhuset från 1911 — https://www.bohuslansmuseum.se/samlingar-och-historia/gamla-historiska-artiklar/badorten-lysekil/ (läst 2026-09-16)
      'Lysekil växte fram som badort under 1800-talet. En badinrättning bildades 1847 — det första varmbadhuset var däckshuset från ett fartyg — och det första egentliga badhuset byggdes 1849. När läkaren Carl Curman anställdes som badläkare fick orten kontakter i Stockholms societetsliv och blev stockholmarnas favoritbadort på västkusten. 1864 kom ett nytt varmbadhus och nya kallbadhus, 1869 Havsbadrestaurangen och 1872 Societetshuset, som byggdes ut 1882. Kvar i stadsbilden finns bland annat Curmans villor, som är byggnadsminnen, portalen, Havsbadrestaurangen, gångbryggan Trampen och kallbadhuset från 1911.',
      // KÄLLA: https://www.lysekil.se/uppleva-och-gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser — "Allt ifrån salta och friska bad från klippor till sandstränder med lättillgängliga parkeringar, toaletter samt kiosk"; "Badplatserna börjar driftsättas i mitten av maj och stängs i slutet av augusti"; "På flera av badplatserna finns vinterstegar för den som vill bada även under årets kallare månader"; "Lysekils tätort Pinnevik Norra Hamnen Rinkenäs Fridhem Stångholmesund Kallbadhuset och Trampen"; "Lysekil har tre kommunala badplatser där våra fyrfotade kompisar får bada" (läst 2026-09-27)
      // Rättat 2026-09-27: stod att Pinnevik och Bökevik 'lyfts fram särskilt' – det gör inte kommunens sida.
      'Kommunen sköter ett stort antal badplatser i och runt staden, från klippor till sandstränder, med parkering, toaletter och kiosk. De är i drift från mitten av maj till slutet av augusti. På flera av dem finns vinterstegar för den som vill bada även under den kalla delen av året, i Lysekils tätort bland annat vid Pinnevik, Norra Hamnen och Kallbadhuset och Trampen, och kommunen har tre badplatser där hundar får bada.',
    ],
    facts: {
      // KÄLLA: https://www.vastsverige.com/lysekil/produkter/lysekil/ — "Lysekil ligger mitt i den västsvenska skärgården, ungefär 90 minuter från Göteborg" (läst 2026-09-27)
      // KÄLLA: https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/4841__0__LINE__20260817__20261212__dab04179-6e0d-43b0-a0e6-a6dfd3d216d6__0%2C0__2824773.pdf — "841 Lysekil–Torp–Göteborg och omvänt"; "Gäller 20 aug - 12 dec 2026" (läst 2026-09-27). Restid räknad ur tabellen måndag–fredag: Nils Ericson Terminalen 05.23 → Lysekil södra hamnen 07.22 (1 h 59 min), 08.21 → 10.22 (2 h 1 min).
      travel_time: 'Ca 1,5 h med bil från Göteborg · ca 2 h med buss 841 från Nils Ericson Terminalen',
      // KÄLLA: https://www.vastsverige.com/lysekil/produkter/lysekil/ — "där Gullmarsfjorden öppnar upp sig mot havet, ligger den livliga staden Lysekil"; "samhället utvecklades till en välbesökt badort" (läst 2026-09-27)
      character: 'Kuststad och gammal badort vid Gullmarsfjordens mynning, med akvariet Havets Hus och naturreservatet Stångehuvud',
      // KÄLLA: https://www.havetshus.se/besok-oss/oppettider/ — "15/6 – 16/8 Dagligen kl 10-18" (läst 2026-09-27); https://www.lysekil.se/uppleva-och-gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser — "Badplatserna börjar driftsättas i mitten av maj och stängs i slutet av augusti" (läst 2026-09-27). Havets Hus håller öppet dagligen 2/1–30/12 utom några helgdagar.
      season: 'Året runt · badplatserna i drift mitten av maj–slutet av augusti, Havets Hus har sommartider 15 juni–16 augusti',
      // KÄLLA: https://www.havetshus.se/om-havets-hus/ — "Havets Hus erbjuder lärorika och roliga upplevelser utifrån Västerhavets liv för i första hand barnfamiljer" (läst 2026-09-27)
      best_for: 'Familjer, akvariebesök, klippbad och vandring längs kusten',
    },
    facts_provenance: {
      travel_time: 'matt',
      character: 'matt',
      season: 'matt',
      best_for: 'bedomning',
    },
    activities: [
      // KÄLLA: https://www.havetshus.se/akvariet/om-akvariet/ — "När du stiger in i Havets Hus omges du snart av 25 akvarier"; "Se hälleflundror, rockor och havsaborrar simma ovanför ditt huvud i tunnelakvariet" (läst 2026-09-27)
      // KÄLLA: https://www.havetshus.se/akvariet/djuren/ — "Över 250 fascinerande arter finns i Havets Hus" (läst 2026-09-27)
      // KÄLLA: https://www.havetshus.se/besok-oss/oppettider/ — "2/1 – 14/6 Dagligen kl 10-16" (läst 2026-09-27)
      { icon: '🐠', name: 'Havets Hus', desc: '25 akvarier med över 250 arter från Västerhavet — hälleflundror, rockor och havsaborrar i tunnelakvariet. Öppet dagligen nästan hela året.' },
      // KÄLLA: https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/stangehuvud.html — "Bildat: 1983 Areal: cirka 48 hektar"; "former och tydliga isräfflor är karaktäristiska för området"; "prydligt anordnade trappor och spänger"; "fina möjligheter till bad och fritidsfiske utefter klippstranden i väster" (läst 2026-09-27)
      { icon: '🥾', name: 'Stångehuvud naturreservat', desc: 'Naturreservat sedan 1983, ca 48 ha — rundhällar med isräfflor, stigar med trappor och spänger, bad och fiske längs klippstranden i väster.' },
      // KÄLLA: https://www.lysekil.se/uppleva-och-gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser — "Lysekils tätort Pinnevik"; "På flera av badplatserna finns vinterstegar för den som vill bada även under årets kallare månader" (läst 2026-09-27)
      { icon: '🏊', name: 'Pinnevik', desc: 'Kommunal badplats i Lysekils tätort, med vinterstege för den som vill bada även på vintern.' },
      // KÄLLA: https://www.havetshus.se/att-gora/salsafari/ — "Följ med ut i Lysekils vackra skärgård och se knubbsälar som solar på klipporna"; "Turen tar cirka 1,5 timme" (läst 2026-09-27)
      // KÄLLA: https://www.havetshus.se/om-havets-hus/ — "Under sommaren pågår strandskolor, sälsafari, bangolf, nattvandringar" (läst 2026-09-27)
      { icon: '🦭', name: 'Sälsafari', desc: 'Sommartid går sälsafari från Havets Hus ut i skärgården för att se knubbsälar på klipporna. Turen tar ungefär 1,5 timme.' },
    ],
    accommodation: [
      // KÄLLA: https://strandflickorna.com/ — "Vi erbjuder tre charmiga sekelskifteshotell och två unika hideaways - hotellrum som vilar på pålar i havet"; "Havshotellet är vårt genuina skärgårdshotell med egen havstomt"; "I vår lilla bistro-restaurang" (läst 2026-09-27)
      // KÄLLA: https://www.vastsverige.com/en/lysekil/produkter/strandflickornas-havshotell/ — "Badpaviljongen gives you a combination of outdoor spa bath with a relaxation room and sauna"; "you have access to a private pier" (läst 2026-09-27)
      { name: 'Strandflickorna', type: 'Hotell', desc: 'Tre sekelskifteshotell vid havet i Lysekil, bland dem Havshotellet med egen havstomt och brygga, samt två hotellrum på pålar i havet. Bistro-restaurang och spa med utomhusbad och bastu.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Hotel Lysekil — bekräftar namnet, Rosvikstorg 1 i Lysekils södra hamn, anor från 1952 och restaurangen My Italian Friend i huset — https://www.vastsverige.com/lysekil/produkter/hotell-lysekil/ (läst 2026-09-16)
      // Egen webbplats hotellysekil.se kontrollerad 2026-09-27 (Rosvikstorg 1, restaurangen My Italian Friend) – sidan kräver webbläsare, så citaten tas från vastsverige.com ovan.
      { name: 'Hotel Lysekil', type: 'Hotell', desc: 'Hotell vid Lysekils södra hamn med anor från 1952. Restaurangen My Italian Friend ligger i huset.' },
      // KÄLLA: https://www.sivikscampinglysekil.se/ — "Bara 4 km till Lysekil"; "Välj campingtomt för husvagn, husbil eller tält – eller bo bekvämt i villavagn med kök, dusch och WC"; "Säsong: 15 april–15 september"; "Varmt välkomna till säsong 2026!" (läst 2026-09-27)
      { name: 'Siviks Camping', type: 'Camping', desc: 'Camping vid havet 4 km från Lysekil, med tomter för husvagn, husbil och tält samt villavagnar med kök, dusch och WC. Säsong 15 april–15 september.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Grand Hotel Lysekil — bekräftar drift sedan 1878 och adressen Kungsgatan 36 i centrala Lysekil — https://www.vastsverige.com/en/lysekil/produkter/grand-hotel-lysekil/ (läst 2026-09-16)
      // KÄLLA: https://www.grandhotellysekil.se/ — "har varit hotell ända sedan huset uppfördes 1878" (läst 2026-09-27)
      { name: 'Grand Hotel Lysekil', type: 'Hotell', desc: 'Hotell på Kungsgatan i Lysekils centrum, i drift sedan 1878.' },
    ],
    getting_there: [
      // KÄLLA: https://www.havetshus.se/besok-oss/hitta-hit/ — "Från E6 söder, efter Uddevallabron, ta av vid trafikmotet Torp och välj väg 161. Ta sedan bilfärja (kostnadsfri) över Gullmarsfjorden mot Lysekil."; "Från E6 norr, du når Lysekil via väg 162." (läst 2026-09-27)
      // KÄLLA: https://www.lysekil.se/bygga-bo-och-miljo/flytta-hit/res-och-pendla — "Resan med vägfärjan tar cirka 10 minuter och är avgiftsfri" (läst 2026-09-27)
      // KÄLLA: https://www.vastsverige.com/lysekil/produkter/lysekil/ — "ungefär 90 minuter från Göteborg" (läst 2026-09-27)
      { method: 'Bil', from: 'Göteborg', time: 'ca 1,5 h', desc: 'E6 norrut till trafikmotet Torp efter Uddevallabron, sedan väg 161 och den avgiftsfria bilfärjan över Gullmarsfjorden (ca 10 minuter). Norrifrån når du Lysekil via väg 162.', icon: '🚗' },
      // KÄLLA: https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/4841__0__LINE__20260817__20261212__dab04179-6e0d-43b0-a0e6-a6dfd3d216d6__0%2C0__2824773.pdf — "841 Lysekil–Torp–Göteborg och omvänt"; "Gäller 20 aug - 12 dec 2026"; "Linjen trafikeras av Vy Buss." (läst 2026-09-27). Måndag–fredag går bussen från Nils Ericson Terminalen ungefär en gång i timmen (05.23, 06.23, 07.21, 08.21 …), lördag och söndag varannan timme; 05.23 → Lysekil södra hamnen 07.22.
      // KÄLLA: https://www.havetshus.se/besok-oss/hitta-hit/ — "Det finns en hållplats utanför Havets Hus som trafikeras av bla linje 841 från Göteborg/Uddevalla" (läst 2026-09-27)
      { method: 'Buss 841', from: 'Göteborg, Nils Ericson Terminalen', time: 'ca 2 h', desc: 'Västtrafiks linje 841 går via Kungälv, Ljungskile och Torp till Lysekils södra hamn och Havets Hus. Vardagar ungefär en gång i timmen, helger varannan timme.', icon: '🚌' },
      // KÄLLA: https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/4847__1__LINE__20260101__20261211__e8375385-c9fa-43eb-880d-cff01ed9acbf__1%2C0__2697062.pdf — "847 Lysekil–Skaftö"; "Ångbåtsbryggan"; "Fiskebäckskil brygga"; "Turen måste förbeställas"; "Gäller 1 jan - 12 dec 2026 utom 15 juni - 16 aug" (läst 2026-09-27). Restid ur tabellen: Ångbåtsbryggan 07.40 → Fiskebäckskil brygga 07.55, 05.30 → 05.48.
      // KÄLLA: https://www.lysekil.se/bygga-bo-och-miljo/flytta-hit/res-och-pendla — "den elektrifierade passagerarfärjan Elise som varje dag, året runt, trafikerar sträckan Fiskebäckskil och Lysekils stad" (läst 2026-09-27)
      { method: 'Passagerarfärja 847', from: 'Fiskebäckskil, Skaftö', time: 'ca 15–20 min', desc: 'Elfärjan Elise går varje dag året runt mellan Ångbåtsbryggan i Lysekil och Fiskebäckskil. Några kvällsturer måste förbeställas.', icon: '⛴' },
    ],
    harbors: [
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Kommunala gästhamnar i Lysekil — bekräftar att Lysekils kommun driver fem gästhamnar och att Fiskhamnens ligger mitt i Lysekil med gångavstånd till butiker och restauranger samt café och sjömack — https://www.vastsverige.com/lysekil/produkter/kommunala-gasthamnar/ (läst 2026-09-16)
      { name: 'Fiskhamnens Gästhamn', desc: 'Kommunal gästhamn mitt i Lysekil med gångavstånd till butiker och restauranger. Café och sjömack på plats.', fuel: true, service: [] },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Kommunala gästhamnar i Lysekil — bekräftar Havsbadets gästhamn i societetsområdet intill Havsbadsparken med servicehus, samt Norra Hamnens gästhamn vid Västerhavspromenaden nära Gamlestan — https://www.vastsverige.com/lysekil/produkter/kommunala-gasthamnar/ (läst 2026-09-16)
      { name: 'Havsbadets Gästhamn', desc: 'Kommunal gästhamn i societetsområdet i Lysekil, intill Havsbadsparken. Servicehus på plats.', fuel: false, service: [] },
      { name: 'Norra Hamnens Gästhamn', desc: 'Kommunal gästhamn vid Västerhavspromenaden i Lysekil, nära Gamlestan och stadens butiker.', fuel: false, service: [] },
    ],
    restaurants: [
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Brygghuset — bekräftar fisk- och skaldjursrestaurang med säsongsmeny i Fiskebäckskil på Skaftö, knuten till Slipens Hotell — https://www.vastsverige.com/en/lysekil/produkter/brygghuset/ (läst 2026-09-16)
      // KÄLLA: https://www.brygghusetkrog.se/ — "Fiskebäckskilsvägen 28"; "Julbord 2026" (läst 2026-09-27)
      { name: 'Brygghuset', type: 'Restaurang', desc: 'Fisk- och skaldjursrestaurang i Fiskebäckskil på Skaftö, med meny efter säsong. Ligger vid Slipens Hotell, en kort tur med passagerarfärjan från Lysekil.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Norra Hamnen 5 — bekräftar adressen Norra Hamngatan 5 i Lysekil och menyn med skaldjur, fiskrätter, inlagd sill och moules frites — https://www.vastsverige.com/en/lysekil/produkter/norra-hamnen-5/ (läst 2026-09-16)
      // KÄLLA: https://www.norrahamnen5.se/ — "Förstklassig mat och utsikt över västerhavet" (läst 2026-09-27); sidan uppdaterad 2026-05-05 enligt metadata.
      { name: 'Restaurang Norra Hamnen 5', type: 'Restaurang', desc: 'Fisk- och skaldjursrestaurang vid Norra hamnen, med flera matsalar, lounge och terrass mot havet.' },
    ],
    tips: [
      // KÄLLA: https://www.havetshus.se/akvariet/djuren/ — "Alla djur, alger och växter i våra akvarier lever också i det salta Västerhavet utanför Havets Hus"; "Några är så färgstarka att man skulle kunna tro att de lever i tropiska vatten långt söderut, som blågyltan och den röda sjögurkan" (läst 2026-09-27)
      'Havets Hus visar bara djur som också lever i Västerhavet — men blågyltan och den röda sjögurkan är så färgstarka att de kunde vara tropiska.',
      // KÄLLA: https://www.havetshus.se/att-gora/salsafari/ — "Det blir ofta fullt på parkeringarna i centrum och det blir köer till bilfärjorna över Gullmaren"; "Kollektivtrafiken åker före köerna så det är ett bra tips" (läst 2026-09-27)
      'Sommartid blir parkeringarna i centrum ofta fulla och det blir kö till bilfärjorna över Gullmarn. Bussen kör före kön.',
      // KÄLLA: https://www.havetshus.se/besok-oss/hitta-hit/ — "Alla sorts nötter är förbjudna i lokalerna"; "Husdjur får inte heller komma in dock tillåts ledarhundar" (läst 2026-09-27)
      'Nötter är förbjudna i Havets Hus lokaler, och husdjur får inte följa med in – ledarhundar undantagna.',
      // KÄLLA: https://www.lysekil.se/uppleva-och-gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser — "Lysekils tätort Pinnevik"; "På flera av badplatserna finns vinterstegar" (läst 2026-09-27)
      'Pinnevik är en av kommunens badplatser i centrala Lysekil och har vinterstege.',
    ],
    related: ['fiskebackskil', 'grundsund', 'kosterhavet'],
    tags: ['badort', 'akvarium', 'vandring', 'familjer'],
    // KÄLLA: https://www.vastsverige.com/lysekil/produkter/lysekil/ — "hans fru Calla Curman har blivit känd som Stångehuvuds räddare efter att ha köpt och donerat området, som numera är naturreservat" (läst 2026-09-27)
    // KÄLLA: https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/stangehuvud.html — "Området utgör donationsmark som ägs av Kungliga Vetenskapsakademin"; "huvudsyftet var att undanta ett naturskönt område från stentäkt"; "detta parti ligger kvar nästan exakt som det lämnades när täktverksamheten upphörde" (läst 2026-09-27)
    did_you_know: 'Stångehuvuds slipade klippor räddades av en donation: Calla Curman köpte området och donerade det för att det inte skulle brytas bort, och marken ägs i dag av Kungliga Vetenskapsakademien. På Galleberget i reservatets norra del har spåren efter brytningen medvetet lämnats nästan precis som de var när stenbrytningen upphörde.',
    // Rättat 2026-09-27: stod öppet maj–september och 'off' januari–april. Havets Hus, hotellen och passagerarfärjan är öppna året runt. bestReason (lugna stränder i juni, badvarmt i september) och parkeringsvarningen saknade källa.
    seasonal: {
      // KÄLLA: https://www.havetshus.se/besok-oss/oppettider/ — "2/1 – 14/6 Dagligen kl 10-16"; "15/6 – 16/8 Dagligen kl 10-18" (läst 2026-09-27)
      open: 'Året runt',
      peak: 'Mitten av juni–mitten av augusti',
      // KÄLLA: https://www.lysekil.se/uppleva-och-gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser — "Badplatserna börjar driftsättas i mitten av maj och stängs i slutet av augusti" (läst 2026-09-27)
      best: 'Juni–augusti',
      // KÄLLA: https://www.havetshus.se/om-havets-hus/ — "Under sommaren pågår strandskolor, sälsafari, bangolf, nattvandringar" (läst 2026-09-27)
      bestReason: 'Kommunens badplatser är i drift från mitten av maj till slutet av augusti, och sommartid finns sälsafari, strandskola och nattvandringar vid Havets Hus, som då har längre öppettider (15 juni–16 augusti).',
      // KÄLLA: https://www.havetshus.se/att-gora/salsafari/ — "Lysekil är en populär stad på sommaren"; "Det blir ofta fullt på parkeringarna i centrum och det blir köer till bilfärjorna över Gullmaren" (läst 2026-09-27)
      warning: 'Sommartid blir parkeringarna i centrum ofta fulla och det blir kö till bilfärjorna över Gullmarn – räkna med extra restid eller ta bussen.',
      months: ['limited','limited','limited','limited','open','open','peak','peak','open','limited','limited','limited'],
    },
  },
  {
    slug: 'kosterhavet',
    slag: 'nationalpark',
    name: 'Kosterhavet',
    region: 'bohuslan',
    regionLabel: 'Bohuslän',
    emoji: '🐟',
    // KÄLLA: https://www.sverigesnationalparker.se/upptack-nationalparkerna/kosterhavets-nationalpark — "Kosterhavets nationalpark är Sveriges första marina nationalpark och består främst av vatten och undervattensmiljöer" ; https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/kosterhavets-nationalpark/fakta-om-parken — "38 900 hektar, varav 860 hektar land" ; https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/kosterhavets-nationalpark/fakta-om-parken/djurliv — "Runt grynnor och holmar simmar Västerhavets största bestånd av knubbsälar", "ett av Sveriges två kända växtplatser för revbildande korall, ögonkorall" (läst 2026-09-27)
    tagline: 'Sveriges första marina nationalpark — 38 900 hektar, varav 860 hektar land, knubbsälar och ögonkorall.',
    description: [
      // KÄLLA: https://www.sverigesnationalparker.se/upptack-nationalparkerna/kosterhavets-nationalpark — "Kosterhavets nationalpark är Sveriges första marina nationalpark och består främst av vatten och undervattensmiljöer", "Nationalparken bevarar ett särpräglat och artrikt havs- och skärgårdsområde med djupa lerbottnar, rev, grunda vikar och tallskog i oförändrat skick" ; https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/kosterhavets-nationalpark/fakta-om-parken — "Bildades 9 september 2009" (läst 2026-09-27)
      'Kosterhavets nationalpark är Sveriges första marina nationalpark och består främst av vatten och undervattensmiljöer. Parken bildades den 9 september 2009 och ska bevara ett artrikt havs- och skärgårdsområde med djupa lerbottnar, rev, grunda vikar och tallskog.',
      // KÄLLA: https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/kosterhavets-nationalpark/fakta-om-parken — "38 900 hektar, varav 860 hektar land", "Strömstad, Tanum", "Länsstyrelsen Västra Götaland", "Markägare Naturvårdsverket" (läst 2026-09-27)
      'Parken är stor och till övervägande del våt: 38 900 hektar, varav bara 860 hektar är land. Den ligger i Strömstads och Tanums kommuner, ägs av Naturvårdsverket och förvaltas av Länsstyrelsen Västra Götaland.',
      // KÄLLA: https://www.sverigesnationalparker.se/upptack-nationalparkerna/kosterhavets-nationalpark — "I Kosterhavets nationalpark finns totalt cirka 12 000 arter", "Många av de arterna finns i Kosterfjordens djupränna, Kosterrännan" ; https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/kosterhavets-nationalpark/fakta-om-parken/djurliv — "I de långgrunda vikarna, på de klippiga stränderna, och i alla de miljöer vi förknippar med Bohuskusten lever omkring 6 000 olika arter. Närmare 300 av dem finns inte någon annanstans i Sverige", "De djupa och brant sluttande klippväggarna i Kosterfjordens djupränna liknar dessutom miljöerna långt ute i Atlanten", "Runt grynnor och holmar simmar Västerhavets största bestånd av knubbsälar", "Rev av ögonkorall är en värdefull livsmiljö för hundratals arter", "här häckar ejder, tobisgrissla, labb och den ovanliga silvertärnan" (läst 2026-09-27)
      'Artrikedomen är parkens kärna. Totalt finns cirka 12 000 arter i nationalparken, och i de långgrunda vikarna och längs de klippiga stränderna lever omkring 6 000 av dem; närmare 300 finns inte någon annanstans i Sverige. Många hör hemma i Kosterfjordens djupränna, Kosterrännan, vars branta klippväggar liknar miljöerna långt ute i Atlanten. Runt grynnor och holmar simmar Västerhavets största bestånd av knubbsälar, och här häckar bland annat ejder, tobisgrissla och silvertärna. Parken rymmer också en av Sveriges två kända växtplatser för den revbildande korallen ögonkorall, vars rev är en värdefull livsmiljö för hundratals arter.',
      // KÄLLA: https://www.vastsverige.com/en/stromstad/articles/faq-koster/ — "South Koster has an area of 8 square km and North Koster an area of 4 square km", "Tiny North Koster is hilly and has good beaches", "Larger South Koster is flatter and better for cycling, with bike-rental facilities, restaurants and two large beaches at Rörvik and Kilesand", "the kilometer long sandy beach at Kilesand", "On North Koster you can go swimming near Västra bryggan, Basteviken and Norrvikarna up north", "Between North and South Koster (Västra Bryggan-Långegärde) there is a small cable ferry that is manned summertime", "These two main islands have 300 year-round inhabitants (240 of them at South Koster) and since both are virtually car-free" (läst 2026-09-27)
      'Kosteröarna är två, med omkring 300 åretruntboende, varav 240 på Sydkoster. Sydkoster är störst med en yta på 8 kvadratkilometer, flackare och den ö där man cyklar — här finns cykeluthyrning, restauranger och två stora stränder vid Rörvik och Kilesand, varav Kilesand är en kilometerlång sandstrand. Nordkoster är 4 kvadratkilometer, kuperat och enligt Turistrådet Västsverige inte lämpat för cykel, men har bra badplatser vid Västra Bryggan, Basteviken och Norrvikarna. Mellan öarna, från Västra Bryggan till Långegärde, går en liten linfärja som är bemannad sommartid. Båda öarna är i praktiken bilfria.',
      // KÄLLA: https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/kosterhavets-nationalpark/att-gora-i-parken/sevardheter/naturum-kosterhavet — "På naturum Kosterhavet finns utställningar, filmer och bildspel om nationalparken och naturen i området. Här finns också ett klappakvarium där du kan titta och känna på Kosterhavet", "Naturum ordnar guidningar och föredrag, visningar och turer på stränderna i närområdet", "23 februari–26 april", "26 oktober-1 november (Höstlov)" ; https://www.vastsverige.com/en/stromstad/articles/faq-koster/ — "is a stone’s throw from the Ekenäs jetty on South Koster" (läst 2026-09-27)
      'Naturum Kosterhavet ligger ett stenkast från bryggan i Ekenäs på Sydkoster. Där finns utställningar, filmer och bildspel om nationalparken och naturen i området, samt ett klappakvarium där du kan titta och känna på Kosterhavet. Naturum ordnar guidningar, föredrag, visningar och turer på stränderna, och där får du kartor och svar på frågor om parken. År 2026 har naturum öppet från 23 februari till 1 november, med olika öppettider under perioden.',
    ],
    facts: {
      // KÄLLA: https://www.vasttrafik.se/info/kosterbatarna/ — "Kosterbåtarna - linje 899" ; https://www.vastsverige.com/en/stromstad/articles/faq-koster/ — "departing from the north harbour in Stromstad, adjacent to the square and tourist information centre", "approximately 30-60 minutes depending on where you get off and what time of year you travel" ; https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/4899__1__LINE__20260927__20261212__d2244526-47e2-4e6f-9db3-0febd05bdb81__2%2C0__2719851.pdf — "899 Strömstad–Kosteröarna–Strömstad", "Gäller 27 sept - 12 dec 2026" (läst 2026-09-27)
      // Avläst måndag–fredag: Strömstad norra hamnen 06.25 → Sydkoster Kilesand 06.53 (28 min) … Nordkoster Västra bryggan 07.15 (50 min); 14.25 → Västra bryggan 15.00 (35 min) … Kilesand 15.30 (65 min).
      travel_time: 'Kosterbåtarna (Västtrafik linje 899) från Strömstads norra hamn; ca 30–60 min beroende på brygga och årstid enligt Turistrådet Västsverige',
      // KÄLLA: https://www.sverigesnationalparker.se/upptack-nationalparkerna/kosterhavets-nationalpark — "Kosterhavets nationalpark är ett kust- och havsområde med klippor, grunda vikar och miljöer under vattnet som är fulla av liv" ; https://www.vastsverige.com/en/stromstad/articles/faq-koster/ — "since both are virtually car-free" (läst 2026-09-27)
      character: 'Marin nationalpark med klippor och grunda vikar; bilfria Nord- och Sydkoster',
      // KÄLLA: https://www.vastsverige.com/en/stromstad/articles/faq-koster/ — "the Koster ferry take you to the Koster Islands every day, all year round", "the holiday accommodation is often fully booked during high season (primarily in July and August)" ; https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/kosterhavets-nationalpark/att-gora-i-parken/sevardheter/naturum-kosterhavet — "23 februari–26 april", "26 oktober-1 november (Höstlov)" (läst 2026-09-27)
      season: 'Året runt med Kosterbåtarna; naturum öppet februari–oktober, högsäsong juli–augusti',
      // KÄLLA: https://www.vastsverige.com/en/stromstad/articles/faq-koster/ — "it is only biking on South Koster", "well-known for offering wonderful opportunities for sunbathing and swimming", "There are four colour-coded walking trails", "The archipelago around the Koster islands is an incredible area for kayaking" (läst 2026-09-27)
      best_for: 'Cykling på Sydkoster, bad, vandring, kajak',
    },
    facts_provenance: {
      travel_time: 'matt',
      character: 'matt',
      season: 'matt',
      best_for: 'matt',
    },
    activities: [
      // KÄLLA: https://www.vastsverige.com/en/stromstad/articles/faq-koster/ — "Larger South Koster is flatter and better for cycling, with bike-rental facilities", "North Koster is not bike friendly", "You can cycle between different attractions on smaller roads on South Koster" (läst 2026-09-27)
      { icon: '🚲', name: 'Cykla Sydkoster', desc: 'Sydkoster är flackare och den ö man cyklar på, på mindre vägar mellan sevärdheterna — cykeluthyrning finns. Nordkoster är enligt Turistrådet Västsverige inte cykelvänligt.' },
      // KÄLLA: https://www.sverigesnationalparker.se/upptack-nationalparkerna/kosterhavets-nationalpark — "Här kan du snorkla eller dyka bland tångskogar och ålgräsängar" ; https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/kosterhavets-nationalpark/fakta-om-parken/djurliv — "De djupa och brant sluttande klippväggarna i Kosterfjordens djupränna", "ett av Sveriges två kända växtplatser för revbildande korall, ögonkorall" (läst 2026-09-27)
      { icon: '🤿', name: 'Snorkling och dykning', desc: 'Snorkla eller dyk bland tångskogar och ålgräsängar. I Kosterfjordens djupränna, med branta klippväggar, finns en av Sveriges två kända växtplatser för revbildande ögonkorall.' },
      // KÄLLA: https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/kosterhavets-nationalpark/fakta-om-parken/djurliv — "Runt grynnor och holmar simmar Västerhavets största bestånd av knubbsälar" (läst 2026-09-27)
      { icon: '🦭', name: 'Knubbsäl', desc: 'Runt grynnor och holmar simmar Västerhavets största bestånd av knubbsälar.' },
      // KÄLLA: https://www.vastsverige.com/en/stromstad/articles/faq-koster/ — "Tiny North Koster is hilly and has good beaches", "On North Koster you can go swimming near Västra bryggan, Basteviken and Norrvikarna up north", "Visit Kosters highest vantage point at Högen where there are two former lighthouses at almost 60 metres above sea level" (läst 2026-09-27)
      { icon: '🚶', name: 'Vandring Nordkoster', desc: 'Kuperad ö med badplatser vid Västra Bryggan, Basteviken och Norrvikarna. Vid Högen, öarnas högsta utsiktspunkt, står två gamla fyrar nästan 60 meter över havet.' },
      // KÄLLA: https://www.vastsverige.com/en/stromstad/articles/faq-koster/ — "The archipelago around the Koster islands is an incredible area for kayaking", "You can bring your own kayak or hire", "There is an extra charge for kayaks and you can bring them in case of space in the storage on board" (läst 2026-09-27)
      { icon: '🛶', name: 'Kajak', desc: 'Skärgården runt Kosteröarna passar för kajak, och kajak kan hyras på öarna. Egen kajak kan tas med på Kosterbåtarna i mån av plats, mot extra avgift.' },
    ],
    accommodation: [
      // KÄLLA: https://www.ekenashavshotell.se/ — "Längst västerut i Sverige, mitt i Kosterhavets marina nationalpark, ligger Ekenäs Havshotell", "15 Juli 2026" ; https://www.vastsverige.com/stromstad/produkter/ekenas-havshotell/ — "Ekenäs Havshotell på Sydkoster erbjuder havsnära boende mitt i Kosterhavets marina nationalpark", "charmiga rum och lägenheter", "Många boenden erbjuder egen balkong eller altan" (läst 2026-09-27)
      { name: 'Ekenäs Havshotell', type: 'Hotell', desc: 'Hotell vid Ekenäs på Sydkoster, i Kosterhavets nationalpark. Rum och lägenheter, många med egen balkong eller altan. Livemusik på terrassen sommartid.', websiteUrl: 'https://www.ekenashavshotell.se/' },
      // KÄLLA: https://lyths.se/ — "VÄLKOMMEN TILL LYTHS TÄLTPLATS OCH EKOSTUGOR PÅ NORDKOSTER", "Sju ekostugor byggdes -97", "det är endast tillåtet att tälta på Nordkosters tältplats när den är öppen på sommaren", "Förbokning krävs" ; https://www.vastsverige.com/stromstad/produkter/reservatet-nordkoster/ — "Alldeles vid havet på Nordkosters nordöstra sida ligger Kosteröarnas enda campingplats för tält samt sju ekologiska stugor för uthyrning" (läst 2026-09-27)
      { name: 'Lyths tältplats och ekostugor', type: 'Camping', desc: 'Kosteröarnas enda tältplats, vid havet på Nordkosters nordöstra sida, med sju ekologiska stugor. Tältplatsen har öppet på sommaren och måste förbokas; på övriga Kosteröarna är tältning inte tillåten.', websiteUrl: 'https://lyths.se/' },
      // KÄLLA: https://www.klapphagen.se/ — "Utvalda söndagar våren & hösten 2026", "Boutique Hotel - Glamping - Restaurang & Bar - Gårdsbutik - Bryggeri" ; https://www.vastsverige.com/en/stromstad/produkter/klapphagen-koster/ — "At Kläpphagen Koster by Ekenäs on Sydkoster you can enjoy food cooked over an open fire", "6 premium suites, each with their own terrace", "a luxurious glamping tent", "Gårdshuset, a separate building" (läst 2026-09-27)
      { name: 'Kläpphagen Koster', type: 'Hotell', desc: 'Boende vid Ekenäs på Sydkoster med sex sviter med egen terrass, glampingtält och ett separat gårdshus. Restaurang med mat lagad över öppen eld och gårdsbutik.', websiteUrl: 'https://www.klapphagen.se/' },
      // KÄLLA: https://kostergarden.se/ — "SYDKOSTER · KILESAND", "Restaurang, takterrass, kiosk, minigolf och stugby", "© 2026 Kostergården" ; https://www.vastsverige.com/en/stromstad/produkter/kostergarden/ — "only a stone's throw from the long sandy beach at Kilesand", "At Kostergården you can stay in a cottage, an apartment or a suite with sea views" (läst 2026-09-27)
      { name: 'Kostergården', type: 'Stugor', desc: 'Stugor och lägenheter vid sandstranden Kilesand på Sydkoster. Restaurang med takterrass, kiosk och minigolf på plats.', websiteUrl: 'https://kostergarden.se/' },
    ],
    getting_there: [
      // KÄLLA: https://www.vasttrafik.se/info/kosterbatarna/ — "Kosterbåtarna - linje 899", "Köp biljett i appen Västtrafik To Go", "Köp biljett av däcksman ombord på båten", "Du kan ta med dig cykel ombord i mån av plats", "Från januari 2027 kommer Kosteröarna istället ingå i zon C" ; https://www.vastsverige.com/en/stromstad/articles/faq-koster/ — "departing from the north harbour in Stromstad, adjacent to the square and tourist information centre", "On North Koster you can get off at the harbour Västra Bryggan and Vettnet (only summer season). On South Koster there are three harbours, Kilesand, Ekenäs and Långegärde", "Yes, you can bring your dog on the boat" ; https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/4899__1__LINE__20260927__20261212__d2244526-47e2-4e6f-9db3-0febd05bdb81__2%2C0__2719851.pdf — "Gäller 27 sept - 12 dec 2026", "Strömstad norra hamnen" (läst 2026-09-27)
      // Avläst: 7 avgångar från Strömstad måndag–torsdag (06.25, 08.45, 12.00, 14.25, 16.25, 18.30, 20.30) och 8 på fredagar; restid 28–65 min beroende på brygga.
      { method: 'Bil + båt', from: 'Strömstad', time: 'ca 30–60 min beroende på brygga och årstid', desc: 'Kosterbåtarna, Västtrafik linje 899, går från Strömstads norra hamn intill torget och turistinformationen. De angör Västra Bryggan (och sommartid Vettnet) på Nordkoster samt Långegärde, Ekenäs och Kilesand på Sydkoster. Cykel får tas med i mån av plats, och hund får följa med. Biljett köps i Västtrafik To Go eller av däcksman ombord. Hösttabellen 27 september–12 december 2026 har sju avgångar från Strömstad måndag–torsdag och åtta på fredagar.', icon: '⛴', url: 'https://www.vasttrafik.se/reseplanering/tidtabeller/linje/9011014489900000/' },
    ],
    harbors: [
      // KÄLLA: https://www.vastsverige.com/stromstad/produkter/gasthamn-ekenas/ — "Gästhamnen ligger vid Ekenäs på natursköna Kosteröarna, vid bryggan finns restauranger, hotell, cykeluthyrning och här ligger även besökscenter för Kosterhavets nationalpark", "ca 1,5 km från gästhamnen ligger helårsöppna ICA-butiken" (läst 2026-09-27)
      { name: 'Korshamn–Ekenäs gästhamn', desc: 'Gästhamn vid Ekenäs på Sydkoster. Restauranger, hotell och cykeluthyrning vid bryggan, besökscenter för Kosterhavets nationalpark intill och en livsmedelsbutik som har öppet året runt ca 1,5 km bort.' },
      // KÄLLA: https://www.vastsverige.com/stromstad/produkter/gasthamn-nordkoster/ — "Gästhamnarna är hittar du vid Bopallen (Västra Bryggan) och vid Vettnet på ön", "I anslutning till gästhamnen vid Västra Bryggan finns restauranger och under sommaren finns en livsmedelaffär" (läst 2026-09-27)
      { name: 'Gästhamn Nordkoster', desc: 'Gästhamn på Nordkoster med lägena Bopallen (Västra Bryggan) och Vettnet. Restauranger vid Västra Bryggan och livsmedelsaffär sommartid.' },
    ],
    restaurants: [
      // KÄLLA: https://www.ekenashavshotell.se/ — "Välkommen till vår restaurang Himmel och Hav med enastående utsikt över havet", "15 Juli 2026" ; https://www.vastsverige.com/stromstad/produkter/ekenas-havshotell/ — "Menyn lyfter fram skaldjur, fisk och lokala råvaror" (läst 2026-09-27)
      { name: 'Ekenäs Havshotell (restaurang Himmel & Hav)', type: 'Restaurang', desc: 'Hotellrestaurangen Himmel och Hav vid Ekenäs på Sydkoster, med utsikt över havet. Skaldjur, fisk och lokala råvaror efter säsong.', websiteUrl: 'https://www.ekenashavshotell.se/' },
      // KÄLLA: https://strandkanten.se/ — "Restaurang Strandkanten på Nordkoster erbjuder mat och dryck i en fantastisk miljö med utomhusservering på bryggan eller inomhus i den mysiga sjöboden", "Säsongen startar vid påsk och sträcker sig till och med hummerfisket i oktober" ; https://www.vastsverige.com/stromstad/produkter/strandkanten/ — "Restaurangen ligger alldeles vid havet i en ombyggd gammal sjöbod vid Västra Bryggan på Nordkoster", "Menyn består till stor del av rätter från havet" (läst 2026-09-27)
      // Egen sida läst 2026-09-27 med renderande webbläsare (sidan är JavaScript); ingen årtalsuppgift på sidan.
      { name: 'Strandkanten', type: 'Restaurang', desc: 'Restaurang i en ombyggd sjöbod vid Västra Bryggan på Nordkoster, med servering på bryggan. Mest rätter från havet, och en butik med presenter i samma lokal. Öppet från påsk till hummerfisket i oktober.', websiteUrl: 'https://strandkanten.se/' },
      // KÄLLA: http://kostersundet.se/ — "Sundets Skaldjurscafé har ett fantastiskt läge vid Långagärde Brygga på Sydkoster", "På vår soliga bryggservering kan du njuta av färska skaldjur, välja mellan kött, fisk och diverse smårätter" ; http://kostersundet.se/makrill-race — "Den 1augusti avgörs Sundets Makrillrace 2026" (läst 2026-09-27)
      { name: 'Sundets Skaldjurscafé', type: 'Café', desc: 'Bryggservering vid Långegärde brygga på Sydkoster med färska skaldjur samt kött, fisk och smårätter.', websiteUrl: 'http://kostersundet.se/' },
    ],
    // KÄLLA: https://www.vastsverige.com/en/stromstad/articles/faq-koster/ — "it is only biking on South Koster. North Koster is not bike friendly", "Between North and South Koster (Västra Bryggan-Långegärde) there is a small cable ferry that is manned summertime. At other times of the year you can take the Koster boat", "it is advisable to pre-book, as the holiday accommodation is often fully booked during high season (primarily in July and August)", "If you are bringing a dog, it must be on a leash" (läst 2026-09-27)
    tips: ['Cykeln hör hemma på Sydkoster — Nordkoster är kuperat och beskrivs av Turistrådet Västsverige som inte cykelvänligt.', 'Mellan öarna går en liten linfärja, Västra Bryggan–Långegärde, bemannad sommartid; övriga året tar du Kosterbåten.', 'Ska du övernatta i juli eller augusti, boka i förväg — boendena är ofta fullbokade under högsäsong.', 'Hund ska hållas i koppel på Kosteröarna.'],
    related: ['stromstad', 'grebbestad', 'fjallbacka'],
    tags: ['nationalpark', 'dykning', 'cykel', 'marint liv', 'sälar'],
    // KÄLLA: https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/kosterhavets-nationalpark/fakta-om-parken/djurliv — "ett av Sveriges två kända växtplatser för revbildande korall, ögonkorall", "Rev av ögonkorall är en värdefull livsmiljö för hundratals arter och artrikedomen kan mäta sig med de tropiska revens" ; https://www.sverigesnationalparker.se/upptack-nationalparkerna/kosterhavets-nationalpark — "I Kosterhavets nationalpark finns totalt cirka 12 000 arter" (läst 2026-09-27)
    did_you_know: 'Kosterhavet rymmer en av Sveriges två kända växtplatser för revbildande korall — ögonkorall. Reven är en värdefull livsmiljö för hundratals arter, och enligt Naturvårdsverket kan artrikedomen mäta sig med de tropiska revens. Totalt finns cirka 12 000 arter i nationalparken.',
    seasonal: {
      // UPPSKATTNING: månadsindelningen bygger på naturums öppetperioder 2026 (23 feb–1 nov, längst öppet 26 juni–16 aug) och Västsveriges uppgift att högsäsongen främst är juli–augusti.
      open: 'Maj–September',
      peak: 'Juli–Augusti',
      best: 'Juni eller September',
      // KÄLLA: https://www.vastsverige.com/en/stromstad/articles/faq-koster/ — "high season (primarily in July and August)", "the Koster ferry take you to the Koster Islands every day, all year round" ; https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/kosterhavets-nationalpark/att-gora-i-parken/sevardheter/naturum-kosterhavet — "13 maj–25 juni", "31 augusti-27 september" (läst 2026-09-27)
      bestReason: 'Juli och augusti är högsäsong, då boendena ofta är fullbokade. I juni och september har naturum öppet alla dagar och Kosterbåtarna går dagligen från Strömstad.',
      // KÄLLA: https://www.vasttrafik.se/info/kosterbatarna/ — "Du kan ta med dig cykel ombord i mån av plats" ; https://www.vastsverige.com/en/stromstad/articles/faq-koster/ — "departing from the north harbour in Stromstad" (läst 2026-09-27)
      warning: 'Kosterbåtarna är Västtrafik linje 899 från Strömstads norra hamn; cykel tas med i mån av plats.',
      months: ['off','off','limited','limited','open','open','peak','peak','open','limited','off','off'],
    },
  },
  {
    slug: 'grebbestad',
    slag: 'ort',
    name: 'Grebbestad',
    region: 'bohuslan',
    regionLabel: 'Bohuslän',
    emoji: '🦪',
    // KÄLLA: https://www.tanum.se/upplevagora/ostronmeckat.4.2f5857cf188b9cbe7f0aa484.html — "90 procent av Sveriges ostron kommer från Tanums kommun" (läst 2026-09-27)
    // KÄLLA: https://www.vastsverige.com/tanum/produkter/grebbestad/?site=145 — "centret för Sveriges produktion av vilda ostron" (läst 2026-09-27)
    tagline: '90 % av Sveriges ostron kommer från Tanums kommun — och Grebbestad är centrum för de vilda ostronen.',
    description: [
      // KÄLLA: https://www.tanum.se/upplevagora/ostronmeckat.4.2f5857cf188b9cbe7f0aa484.html — "90 procent av Sveriges ostron kommer från Tanums kommun", "Ostronet ska antingen ha handplockats av dykare eller fiskats av fiskare med håv", "Ostrea Edulis plockas när de är som minst 3-4 år gamla", "Ostronen plockas från första veckan i September t.o.m midsommar, då ostronen har sin fortplantningsperiod under Juli-Augusti" (läst 2026-09-27)
      // KÄLLA: https://www.vastsverige.com/tanum/produkter/grebbestad/?site=145 — "hela 90 procent av Sveriges ostronproduktion kommer från Grebbestad och Tanum" (läst 2026-09-27)
      'Ostronen är Grebbestads signum. Tanums kommun anger att 90 procent av Sveriges ostron kommer från kommunen, och Turistrådet Västsverige skriver att 90 procent av landets ostronproduktion kommer från Grebbestad och Tanum. Det handlar om det vilda, platta ostronet Ostrea edulis, som plockas för hand av dykare eller fiskas med håv och ska vara minst tre till fyra år innan det skördas. Skördesäsongen löper från första veckan i september fram till midsommar, med uppehåll i juli och augusti då ostronen förökar sig.',
      // KÄLLA: https://www.tanum.se/upplevagora/ostronmeckat.4.2f5857cf188b9cbe7f0aa484.html — "Ostronakademien, en ideell förening som bildades 2004", "Akademin arrangerar varje år Nordiska Mästerskapen i Ostron öppning i maj och Ostronets dag i september.", "Kalvö Ostron är Ostrea edulis som lever fritt utanför Fjällbackas kust", "sedan 1600 talet", "Grebbestadostron är varumärket för det europeiska ostronet Ostrea edulis som lever fritt i Grebbestads norra och södra skärgårdar.", "Sedan maj 2023 är dessa ostron också ursprungsskyddade av EU", "begränsas fisket av Grebbestadostron till 50 000-60 000 per år", "Havstenssunds Ostron är för närvarande den enda kommersiella odlingen i Skandinavien.", "som sträcker sig från september till och med maj månad" (läst 2026-09-27)
      'Kring ostronen har det vuxit fram både hantverk och evenemang. Ostronakademien, en ideell förening, bildades 2004 och arrangerar Nordiska mästerskapen i ostronöppning i maj och Ostronets dag i september. Bland producenterna i kommunen finns Kalvö Ostron utanför Fjällbacka, där man skördat ostron sedan 1600-talet, och Grebbestadostron från Grebbestads norra och södra skärgård, som sedan maj 2023 är ursprungsskyddade av EU och vars fiske är begränsat till 50 000–60 000 ostron om året. Havstenssunds Ostron är enligt Tanums kommun för närvarande den enda kommersiella ostronodlingen i Skandinavien, med säsong september–maj.',
      // KÄLLA: https://www.vastsverige.com/tanum/produkter/grebbestad/?site=145 — "första gången orten nämns i modern skrift är i början av 1600-talet", "Samhället utvecklades sedan mycket under 1800-talet", "många stenhuggare flyttade till samhället i slutet av 1800-talet", "blev Grebbestad också en framstående badort, med både kall- och varmbadhus", "När du närmar dig Grebbestad möts du av ortens nygotiska kyrka", "Hamnområdet kantas av fiskebåtar, pittoreska sjöbodar, caféer, butiker och restauranger.", "den populära bryggpromenaden med flera restauranger som serverar färsk fisk, räkor, ostron, hummer, krabba och havskräftor", "krogar som under tidigt 1900-tal huserade konservfabrik och telegrafstation", "en fullserviceanläggning med gott om båtplatser", "Evert Taube skrev sommaren 1954", "när han vistades på just Otterön" (läst 2026-09-27)
      'Orten nämns första gången i modern skrift i början av 1600-talet och växte kraftigt under 1800-talet. Mot slutet av seklet flyttade många stenhuggare hit, och Grebbestad blev samtidigt badort med både kall- och varmbadhus. Över de vita och röda husen reser sig den nygotiska kyrkan. Hamnen kantas av fiskebåtar, sjöbodar, caféer och butiker, och längs bryggpromenaden serveras fisk och skaldjur – bland annat på krogar i en före detta konservfabrik och telegrafstation. Gästhamnen beskrivs av Turistrådet Västsverige som en fullserviceanläggning med gott om båtplatser. På Otterön utanför skrev Evert Taube sommaren 1954 "Så länge skutan kan gå".',
      // KÄLLA: https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/tjurpanneomradet.html — "Bildat: 1968", "Areal: cirka 499 hektar", "Naturvårdsförvaltare: Västkuststiftelsen", "Området ligger på den västra delen av Havstenssundshalvön.", "Branta klippstränder stupar ner i havet och här och där går det in vikar med stränder av sand, grus eller stenblock.", "Kala hällar och ljunghedar dominerar, och enstaka träd som tall och rönn kryper längs bergssidorna", "Flera olika längder på vandring erbjuds.", "Den som vill bada här gör klokt i att invänta stiltje." (läst 2026-09-27)
      // KÄLLA: https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/otteron.html — "Bildat: 1967", "Areal: cirka 629 hektar", "är kanske ett av de mest välbesökta reservaten bland Bohusläns öar", "Många stigar genomkorsar ön", "flera skyddade naturhamnar", "På ön finns åtskilliga orkidéarter", "Rika lövskogsområden", "ett stort bronsåldersröse", "en kopia av en märklig runsten med den längsta urnordiska runskrift som påträffats", "Otterön ligger sydväst om Grebbestad och är den största ön i det skärgårdsområdet.", "Till ön kommer man enklast med taxibåt från Grebbestad" (läst 2026-09-27)
      // KÄLLA: https://www.vastsverige.com/tanum/produkter/grebbestad/?site=145 — "Strax ovanför samhället startar den tre kilometer långa Falkerödsleden" (läst 2026-09-27)
      'Naturen runt Grebbestad är skyddad på flera håll. Tjurpanneområdet på västra delen av Havstenssundshalvön blev naturreservat 1968, omfattar cirka 499 hektar och förvaltas av Västkuststiftelsen. Landskapet är öppet och kargt, med branta klippstränder, vikar med sand-, grus- och stenstränder, kala hällar och ljunghed med enstaka tallar och rönnar; här erbjuds vandring i flera olika längder. Badar gör man klokast i stiltje. Sydväst om Grebbestad ligger Otterön, den största ön i skärgården där, naturreservat sedan 1967 och cirka 629 hektar stort, också det förvaltat av Västkuststiftelsen — kanske ett av de mest välbesökta reservaten bland Bohusläns öar, med många stigar, skyddade naturhamnar, orkidéer, lövskog, ett bronsåldersröse och en kopia av en runsten med den längsta urnordiska runskrift som påträffats. Ön nås enklast med taxibåt från Grebbestad. Strax ovanför samhället startar den tre kilometer långa Falkerödsleden.',
      // KÄLLA: https://www.vastsverige.com/tanum/produkter/grebbestad/?site=145 — "hällristningar från 1700 f.Kr. till 300 f.Kr.", "beläget i ett område med omkring 600 hällristningsplatser", "Med fler än 180 synliga gravar räknas det som Bohusläns största gravfält.", "Falkerödsleden som följer gamla stigar och vägar utmed flera fornminnen, däribland Greby Gravfält" (läst 2026-09-27)
      'Trakten är också hällristningarnas. Hällristningarna kring Grebbestad dateras till 1700–300 f.Kr., och Tanums världsarv ligger i ett område med omkring 600 hällristningsplatser. Längs Falkerödsleden ligger dessutom Greby gravfält, som med fler än 180 synliga gravar räknas som Bohusläns största gravfält.',
    ],
    facts: {
      // KÄLLA: https://www.vastsverige.com/tanum/produkter/grebbestad/?site=145 — "mittemellan Göteborg och Oslo" (läst 2026-09-27)
      // KÄLLA: https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/tjurpanneomradet.html — "Tag från E6 av mot Grebbestad." (läst 2026-09-27)
      // KÄLLA: https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/4877__0__LINE__20260817__20261212__9d26ba47-e7c4-4a38-b1c9-09f2b69a0feb__2%2C0__2767448.pdf — "Havstenssund–Tanumshede och omvänt", "Gäller 17 aug - 12 dec 2026", "Tanumshede centrum 06.55 13.30 15.50", "Grebbestad busstation 07.09 07.46 13.40 16.00" — 13.30 → 13.40 = 10 min, 06.55 → 07.09 = 14 min (läst 2026-09-27)
      // KÄLLA: https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/4878__0__LINE__20260817__20261212__77a1bfb5-4966-45e6-89b6-e487842a0851__1%2C0__2767487.pdf — "Tanumshede–Grebbestad–Sportshopen och omvänt" — Tanumshede centrum 09.05 → Grebbestad busstation 09.23 = 18 min (läst 2026-09-27)
      travel_time: 'Bil via E6, mitt emellan Göteborg och Oslo; buss 10–18 min från Tanumshede',
      // KÄLLA: https://www.vastsverige.com/tanum/produkter/grebbestad/?site=145 — "Grebbestad är en populär sommarort i norra Bohuslän och centret för Sveriges produktion av vilda ostron." (läst 2026-09-27)
      character: 'Sommarort och fiskeläge, centrum för Sveriges vilda ostron',
      // KÄLLA: https://www.vastsverige.com/tanum/produkter/grebbestad/?site=145 — "med året-runt-puls", "Bästa tiden för skaldjur är höst och vinter då vattnet är kallt och friskt." (läst 2026-09-27)
      // KÄLLA: https://www.tanum.se/upplevagora/ostronmeckat.4.2f5857cf188b9cbe7f0aa484.html — "Ostronen plockas från första veckan i September t.o.m midsommar" (läst 2026-09-27)
      season: 'Året runt; ostron september–midsommar, skaldjur bäst höst och vinter',
      // KÄLLA: https://www.vastsverige.com/tanum/produkter/grebbestad/?site=145 — "Många tycker att vattnen kring Grebbestad är bland de bästa i världen när det kommer till paddling.", "den populära bryggpromenaden med flera restauranger som serverar färsk fisk, räkor, ostron, hummer, krabba och havskräftor" (läst 2026-09-27)
      // KÄLLA: https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/tjurpanneomradet.html — "Flera olika längder på vandring erbjuds." (läst 2026-09-27)
      best_for: 'Ostron och skaldjur, kajakpaddling, vandring i Tjurpannan',
    },
    facts_provenance: {
      travel_time: 'matt',
      character: 'matt',
      season: 'matt',
      best_for: 'matt',
    },
    activities: [
      // KÄLLA: https://www.tanum.se/upplevagora/ostronmeckat.4.2f5857cf188b9cbe7f0aa484.html — "Skördning, Ostronskola och Ostronprovningar erbjuds som exempel.", "Det är markägaren som har rätt att skörda ostron på sin mark, dvs vem som helst får inte skörda dem själv.", "dess egna akademi finns i Grebbestad" (läst 2026-09-27)
      // KÄLLA: https://www.vastsverige.com/en/tanum/produkter/everts-sjobod/ — "You can also book an oyster tasting session or go on an oyster safari." (läst 2026-09-27)
      // KÄLLA: https://www.evertssjobod.se/ — "hummersafari, ostronprovningar och fisketurer" (läst 2026-09-27)
      { icon: '🦪', name: 'Ostronsafari och ostronprovning', desc: 'Ostron får bara skördas av markägaren eller med dennes tillstånd, så plocka inte på egen hand. I kommunen erbjuds ostronsafari, ostronskola och ostronprovningar, bland annat hos Everts Sjöbod i Grebbestad, där också Ostronakademien har sitt säte.' },
      // KÄLLA: https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/tjurpanneomradet.html — "Bildat: 1968", "Areal: cirka 499 hektar", "Öppet och kargt landskap", "Branta klippstränder stupar ner i havet", "Kala hällar och ljunghedar dominerar", "Flera olika längder på vandring erbjuds." (läst 2026-09-27)
      { icon: '🥾', name: 'Tjurpannans naturreservat', desc: 'Naturreservat sedan 1968, ca 499 ha — öppet och kargt landskap med branta klippstränder, kala hällar och ljunghed. Vandring i flera längder.' },
      // KÄLLA: https://www.vastsverige.com/tanum/produkter/grebbestad/?site=145 — "en fullserviceanläggning med gott om båtplatser" (läst 2026-09-27)
      // KÄLLA: https://www.vastsverige.com/en/tanum/accomodation/marinas/ — "Grebbestad Bryggan Guest Harbour", "160 guest berths.", "Grebbestad Seaport Guest Harbour", "30 berths.", "250 berths directly adjacent to TanumStrand SPA & Resort." (läst 2026-09-27)
      { icon: '⛵', name: 'Gästhamnarna', desc: 'Grebbestads gästhamn är enligt Turistrådet Västsverige en fullserviceanläggning med gott om båtplatser. I och kring orten finns tre gästhamnar: Grebbestad Bryggan (160 platser), Grebbestad Seaport (30) och TanumStrand (250).' },
      // KÄLLA: https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/otteron.html — "Bildat: 1967", "Areal: cirka 629 hektar", "Många stigar genomkorsar ön", "flera skyddade naturhamnar", "På ön finns åtskilliga orkidéarter", "Rika lövskogsområden", "Till ön kommer man enklast med taxibåt från Grebbestad" (läst 2026-09-27)
      { icon: '🏊', name: 'Otterön', desc: 'Naturreservat sedan 1967, ca 629 ha — stigar, skyddade naturhamnar, orkidéer och lövskog. Nås enklast med taxibåt från Grebbestad.' },
    ],
    accommodation: [
      // KÄLLA: https://www.tanumstrand.se/ — "TanumStrand SPA & Resort - Hotell, SPA och konferens i Norra Bohuslän", "Boka rum/stuga" (läst 2026-09-27)
      // KÄLLA: https://tanumstrand.se/gasthamn/ — "Strax söder om Grebbestad ligger vår gästhamn med 250 båtplatser vid bryggan i direkt anslutning till hotellområdet.", "Familjebadet, SPA Horisont eller någon av våra restauranger Latitud 58° och Sjöboden Udden" (läst 2026-09-27)
      { name: 'TanumStrand SPA & Resort', type: 'Hotell', desc: 'Hotell-, spa- och konferensanläggning strax söder om Grebbestad med hotellrum och stugor, SPA Horisont, familjebad, gästhamn och restaurangerna Latitud 58° och Sjöboden Udden.' },
      // KÄLLA: https://www.rosenhillbedandbreakfast.se/ — "I utkanten av västkustpärlan Grebbestad, i byns gamla skola från 1800-talet, hittar ni Villa Rosenhill B&B.", "Hos oss finns det fyra standard dubbelrum med dubbelsängar och tre mindre dubbelrum med enkelsängar.", "Vi har delade badrum", "Trädgården är stor och lummig", "Sövallsvägen 5" (läst 2026-09-27)
      { name: 'Villa Rosenhill B&B', type: 'B&B', desc: 'Bed & breakfast i Grebbestads gamla skola från 1800-talet, i utkanten av samhället på Sövallsvägen. Sju dubbelrum med delade badrum och en stor trädgård.' },
      // KÄLLA: https://grebys.se/hotell — "Hotellet med totalt 9 unika rum stod klart sommaren 2013.", "Vi har ett dubbelrum med eget badrum samt ett famliljerum med gemensam wc/dusch där hundar är tillåtna." (läst 2026-09-27)
      // KÄLLA: https://grebys.se/ — "Här serverar vi färsk fisk och skaldjur från lokala vatten", "utsikt över hamnen" (läst 2026-09-27)
      // KÄLLA: https://www.vastsverige.com/en/tanum/produkter/grebys-hotell-o-restaurang/ — "Strandvägen 1" (läst 2026-09-27)
      { name: 'Grebys Hotell & Restaurang', type: 'Hotell', desc: 'Familjeägt hotell med nio rum från 2013 och restaurang med fisk och skaldjur från lokala vatten och utsikt över hamnen, på Strandvägen i Grebbestad. Två rum tar emot hund.' },
    ],
    getting_there: [
      // KÄLLA: https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/tjurpanneomradet.html — "Tag från E6 av mot Grebbestad." (läst 2026-09-27)
      // KÄLLA: https://www.vastsverige.com/tanum/produkter/grebbestad/?site=145 — "mittemellan Göteborg och Oslo" (läst 2026-09-27)
      { method: 'Bil', from: 'Göteborg', desc: 'E6 norrut och av mot Grebbestad. Orten ligger mitt emellan Göteborg och Oslo.', icon: '🚗' },
      // KÄLLA: https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/4878__0__LINE__20260817__20261212__77a1bfb5-4966-45e6-89b6-e487842a0851__1%2C0__2767487.pdf — "Tanumshede–Grebbestad–Sportshopen och omvänt", "Linjen trafikeras av Bivab.", "Gäller 17 aug - 12 dec 2026" (läst 2026-09-27)
      // KÄLLA: https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/4877__0__LINE__20260817__20261212__9d26ba47-e7c4-4a38-b1c9-09f2b69a0feb__2%2C0__2767448.pdf — "Havstenssund–Tanumshede och omvänt", "Tanumshede centrum 06.55 13.30 15.50", "Grebbestad busstation 07.09 07.46 13.40 16.00" (läst 2026-09-27)
      { method: 'Buss', from: 'Tanumshede', desc: 'Västtrafiks linjer 877 (Havstenssund–Tanumshede) och 878 (Tanumshede–Grebbestad–Sportshopen) går mellan Tanumshede centrum och Grebbestad busstation på 10–18 minuter, några turer per dag (tidtabell 17 aug–12 dec 2026).', icon: '🚌' },
      // KÄLLA: https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/otteron.html — "Till ön kommer man enklast med taxibåt från Grebbestad och sommartid görs regelbundna turer till ön." (läst 2026-09-27)
      { method: 'Taxibåt', from: 'Grebbestad', desc: 'Till Otterön går taxibåt från Grebbestad, och sommartid görs regelbundna turer till ön.', icon: '⛴' },
    ],
    harbors: [
      // KÄLLA: https://www.vastsverige.com/en/tanum/accomodation/marinas/ — "Grebbestad Bryggan Guest Harbour", "160 guest berths. Washing machine, dryer, toilet, shower, and shore power.", "Operated by Gästhamnsbolaget. Harbour office open during summer." (läst 2026-09-27)
      { name: 'Grebbestad Bryggan', desc: 'Gästhamn med 160 gästplatser, driven av Gästhamnsbolaget. Tvättmaskin, torktumlare, toalett, dusch och landström. Hamnkontor öppet sommartid.', spots: 160, fuel: false, service: ['El', 'Dusch', 'WC', 'Tvätt'] },
      // KÄLLA: https://www.vastsverige.com/en/tanum/accomodation/marinas/ — "Grebbestad Seaport Guest Harbour", "30 berths. WC, shower, waste disposal, water and fuel refill." (läst 2026-09-27)
      { name: 'Grebbestad Seaport', desc: 'Gästhamn med 30 platser i Grebbestad: toalett, dusch, avfallshantering, vatten och bränsle.', spots: 30, fuel: true, service: ['Vatten', 'Dusch', 'WC'] },
      // KÄLLA: https://tanumstrand.se/gasthamn/ — "Strax söder om Grebbestad ligger vår gästhamn med 250 båtplatser vid bryggan i direkt anslutning till hotellområdet.", "Här finns fräscha toaletter, duschar, tvättmaskiner och torktumlare. Du har också tillgång till landström och WiFi.", "Hamnservicen är bemannad 19+20+21 juni samt 26 juni till 9 augusti kl 09.00 till kl 17.00 år 2026.", "Under perioden sommarperioden kan du boka din båtplats via Dockspot" (läst 2026-09-27)
      { name: 'TanumStrand Guest Harbour', desc: 'Gästhamn med 250 platser strax söder om Grebbestad, direkt vid TanumStrand SPA & Resort. Hamnservicen var 2026 bemannad 26 juni–9 augusti; sommartid kan plats bokas via Dockspot.', spots: 250, fuel: false, service: ['El', 'Dusch', 'WC', 'Tvätt', 'Wifi'] },
    ],
    restaurants: [
      // KÄLLA: https://www.evertssjobod.se/ — "Everts Sjöbod är ett litet familjeföretag med fast förankring i trakten", "Vårt B&B ligger i direkt anslutning till vår gamla sjöbod där alla aktiviteter utgår ifrån.", "hummersafari, ostronprovningar och fisketurer", "Njut av det bästa från havet i vår gamla charmiga sjöbod med utsikt över havet." (läst 2026-09-27)
      // KÄLLA: https://www.vastsverige.com/en/tanum/produkter/everts-sjobod/ — "Enjoy delicious seafood in a traditional boathouse from the 19th century.", "you can rent one of the six double rooms beside the boathouse", "go on an oyster safari" (läst 2026-09-27)
      { name: 'Everts Sjöbod', type: 'Skaldjursupplevelser', desc: 'Familjeföretag i en sjöbod från 1800-talet med utsikt över havet: hummersafari, ostronprovning och ostronsafari samt skaldjursmåltider i sjöboden. B&B med sex dubbelrum intill.' },
      // KÄLLA: https://www.telegrafen.info/ — "Den lilla restaurangen i Grebbestad med det stora hjärtat. Känd för sina goda fiskrätter." (läst 2026-09-27)
      // KÄLLA: https://www.vastsverige.com/en/tanum/produkter/restaurant-telegrafen/ — "Nedre Långgatan 28", "well-made traditional Swedish fare and á la carte, both meat and fish", "the Restaurang Telegrafen in what once used to be a telegraph station in Grebbestad" (läst 2026-09-27)
      { name: 'Restaurang Telegrafen', type: 'Krog', desc: 'Restaurang i en gammal telegrafstation på Nedre Långgatan, i drift sedan 2002. Husmanskost och à la carte, känd för sina fiskrätter.' },
      // KÄLLA: https://bistroskafferiet.se/ — "Nedre Långgatan 40", "sedan 2005 har vi haft vår verksamhet", "fantastisk utsikt över hamnen och den lilla parken" (läst 2026-09-27)
      // KÄLLA: https://www.vastsverige.com/en/tanum/produkter/cafe-skafferiet-grebbestad/ — "Café Skafferiet serves as both a café and restaurant", "Nedre Långgatan 40" (läst 2026-09-27)
      { name: 'Bistro Skafferiet', type: 'Café', desc: 'Café och bistro på Nedre Långgatan i Grebbestad sedan 2005, med uteplats och en övervåning med utsikt över hamnen.' },
    ],
    // KÄLLA: https://www.tanum.se/upplevagora/ostronmeckat.4.2f5857cf188b9cbe7f0aa484.html — "Det är markägaren som har rätt att skörda ostron på sin mark, dvs vem som helst får inte skörda dem själv." (läst 2026-09-27)
    // KÄLLA: https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/tjurpanneomradet.html — "Du kan åka buss från Grebbestad till Saltviks camping som gränsar till naturreservatet.", "finns en större parkeringsplats", "vid Långeby", "medföra okopplad hund" (läst 2026-09-27)
    // KÄLLA: https://www.vastsverige.com/tanum/produkter/grebbestad/?site=145 — "beläget i ett område med omkring 600 hällristningsplatser", "hällristningar från 1700 f.Kr. till 300 f.Kr." (läst 2026-09-27)
    // KÄLLA: https://www.vitlyckemuseum.se/ — "Vitlycke museum - porten till världsarvet", "Vi är en del av Västra Götalandsregionens kulturförvaltning" (läst 2026-09-27)
    tips: ['Plocka inte ostron på egen hand – det är markägaren som har rätt att skörda. Boka hellre en ostronsafari eller ostronprovning.', 'Till Tjurpannan kan du åka buss från Grebbestad till Saltviks camping, som gränsar till reservatet; med bil finns en större parkering vid Långeby. Hunden ska vara kopplad.', 'Vitlycke museum, porten till världsarvet Tanums hällristningar, drivs av Västra Götalandsregionens kulturförvaltning. Världsarvet ligger i ett område med omkring 600 hällristningsplatser, med ristningar från 1700–300 f.Kr.'],
    related: ['fjallbacka', 'kosterhavet', 'hamburgsund'],
    tags: ['ostron', 'fiskeläge', 'klippvandring', 'sommardestination'],
    // KÄLLA: https://www.tanum.se/upplevagora/ostronmeckat.4.2f5857cf188b9cbe7f0aa484.html — "90 procent av Sveriges ostron kommer från Tanums kommun", "Ostronet ska antingen ha handplockats av dykare eller fiskats av fiskare med håv", "Ostrea Edulis plockas när de är som minst 3-4 år gamla", "Sedan maj 2023 är dessa ostron också ursprungsskyddade av EU" (läst 2026-09-27)
    did_you_know: 'Tanums kommun anger att 90 procent av Sveriges ostron kommer härifrån. Det vilda platta ostronet Ostrea edulis plockas för hand av dykare eller fiskas med håv och ska vara minst tre till fyra år innan det skördas — och sedan maj 2023 är Grebbestadostronen ursprungsskyddade av EU.',
    seasonal: {
      // KÄLLA: https://www.vastsverige.com/tanum/produkter/grebbestad/?site=145 — "med året-runt-puls" (läst 2026-09-27)
      // KÄLLA: https://tanumstrand.se/gasthamn/ — "Hamnservicen är bemannad 19+20+21 juni samt 26 juni till 9 augusti kl 09.00 till kl 17.00 år 2026." (läst 2026-09-27)
      open: 'Året runt',
      peak: 'Juli–Augusti',
      best: 'September eller Oktober',
      // KÄLLA: https://www.tanum.se/upplevagora/ostronmeckat.4.2f5857cf188b9cbe7f0aa484.html — "Ostronen plockas från första veckan i September t.o.m midsommar, då ostronen har sin fortplantningsperiod under Juli-Augusti", "Akademin arrangerar varje år Nordiska Mästerskapen i Ostron öppning i maj och Ostronets dag i september." (läst 2026-09-27)
      // KÄLLA: https://www.vastsverige.com/tanum/produkter/grebbestad/?site=145 — "Bästa tiden för skaldjur är höst och vinter då vattnet är kallt och friskt." (läst 2026-09-27)
      bestReason: 'Ostronskörden börjar första veckan i september och pågår fram till midsommar, med uppehåll i juli och augusti då ostronen förökar sig. Hösten är också bästa tiden för skaldjur, när vattnet är kallt och friskt, och i september firas Ostronets dag.',
      // KÄLLA: https://www.tanum.se/upplevagora/ostronmeckat.4.2f5857cf188b9cbe7f0aa484.html — "fortplantningsperiod under Juli-Augusti" (läst 2026-09-27)
      warning: 'Ostronskörden har uppehåll i juli och augusti — kommer du för ostronens skull är september och framåt rätt tid.',
      // Månader: vastsverige anger året-runt-puls; högsäsong jul–aug då TanumStrands hamnservice är bemannad, ostron sep–midsommar.
      months: ['limited','limited','limited','limited','open','open','peak','peak','open','open','limited','limited'],
    },
  },
  {
    slug: 'fjallbacka',
    name: 'Fjällbacka',
    region: 'bohuslan',
    regionLabel: 'Bohuslän',
    emoji: '⛰',
    // KÄLLA: https://www.vastsverige.com/tanum/fjallbacka/ — "Fjällbacka är ett litet fiskeläge i Tanums kommun, i norra Bohuslän" (läst 2026-09-27)
    // KÄLLA: https://www.tanum.se/kommunpolitik/kommunfakta/kommunenshistoria/ortsinformation/fjallbacka.4.7664b4813898b7df98459f8.html — "Vid foten av Vetteberget ligger Fjällbacka centrum med Ingrid Bergmans torg"; "Fjällbacka utgör den rumsliga ramen i Camilla Läckbergs deckarsvit" (läst 2026-09-27)
    // KÄLLA: https://www.vastsverige.com/tanum/produkter/vettebergetkungsklyftan/ — "Berget delar i Stora och Lilla Vetteberget genom den säregna Kungsklyftan" (läst 2026-09-27)
    tagline: 'Fiskeläget vid foten av Vetteberget – Kungsklyftan, Ingrid Bergmans torg och miljöerna från Camilla Läckbergs deckare.',
    description: [
      // KÄLLA: Tanums kommun, ortsinformation Fjällbacka — cirka 950 personer bor här året runt, orten omnämnd 1610, 22 hus 1694, Vetteberget skiljde orten från havet, Läckbergs deckare utspelar sig i Fjällbacka — https://www.tanum.se/kommunpolitik/kommunfakta/kommunenshistoria/ortsinformation/fjallbacka.4.7664b4813898b7df98459f8.html (läst 2026-09-16)
      'Fjällbacka är ett litet samhälle vid Tanums kust med ungefär 950 åretruntboende — en siffra som mångdubblas på somrarna. Orten finns omnämnd i skrivna källor från 1610 och hade 22 hus år 1694. Byn låg ursprungligen på randen mellan berg och hav; under 1900-talet har bebyggelsen krupit runt hela Vetteberget, och numera byggs det även uppe på berget. Fjällbacka används i dag som miljö i Camilla Läckbergs kriminalromaner.',
      // KÄLLA: https://www.tanum.se/kommunpolitik/kommunfakta/kommunenshistoria/ortsinformation/fjallbacka.4.7664b4813898b7df98459f8.html — "Samhällets historia är intimt förknippad med de stora sillfiskeperioderna under 1700- och 1800-talen"; "speciellt under 1800-talets senare del då sill fraktades och inte minst havre som skeppades ut från Fjällbacka till England"; "Han gav produkten namnet"; "På utställningar runt om i världen., bl a vid fiskeriutställningen i Bergen 1865, erhöll Fjällbacka-ansjovis utmärkelser"; "Det fanns fiskkonservindustri i Fjällbacka ända fram till 1978" (läst 2026-09-27)
      'Fjällbackas historia är sillens. Samhället växte under de stora sillperioderna på 1700- och 1800-talen och på fraktseglationen, inte minst havre som skeppades till England. Det var också här den svenska ansjovisen uppfanns: konserveringen utvecklades i Fjällbacka under 1860–1880-talen och produkten prisbelönades på internationella utställningar, bland annat i Bergen 1865. Fiskkonservindustri fanns i Fjällbacka ända fram till 1978.',
      // KÄLLA: Tanums kommun, ortsinformation Fjällbacka — en 200 meter lång spricka i granitberget med inkilade stenblock mellan två toppar, tidigare namn Ramneklovan — https://www.tanum.se/kommunpolitik/kommunfakta/kommunenshistoria/ortsinformation/fjallbacka.4.7664b4813898b7df98459f8.html (läst 2026-09-16)
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Vetteberget/Kungsklyftan — trappor från Ingrid Bergmans Torg, Stora och Lilla Vetteberget, fastkilat klippblock som tak, namnet efter Oscar II:s besök 1887 och hans signatur på bergväggen, filmscener från Ronja Rövardotter, utsikt över både övärld och fastland — https://www.vastsverige.com/tanum/produkter/vettebergetkungsklyftan/ (läst 2026-09-16)
      'Vetteberget är granitberget som reser sig direkt bakom bykärnan. Genom det löper Kungsklyftan — en 200 meter lång spricka i berget, med ett fastkilat klippblock som tak, som delar massivet i Stora och Lilla Vetteberget. Klyftan hette tidigare Ramneklovan och fick sitt nuvarande namn efter Oscar II:s besök 1887, då kungen signerade bergväggen vid den norra ingången. Här spelades också scener till filmen Ronja Rövardotter in. Upp går man via trapporna från Ingrid Bergmans torg, och från högsta punkten är utsikten vidsträckt över både övärlden och fastlandet.',
      // KÄLLA: Tanums kommun, ortsinformation Fjällbacka — i mitten av 1900-talet tillbringade Ingrid Bergman sina somrar på Dannholmen nordväst om Fjällbacka, skulptur i hamnen — https://www.tanum.se/kommunpolitik/kommunfakta/kommunenshistoria/ortsinformation/fjallbacka.4.7664b4813898b7df98459f8.html (läst 2026-09-16)
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Discover Fjällbacka with a Guide — guidade turer om Bergmans arv och Läckbergs mordvandring, arrangörer Fjällbackaguiderna och Kustguiden, start vid Ingrid Bergmans torg — https://www.vastsverige.com/en/tanum/fjallbacka/guided-tours-in-fjallbacka/ (läst 2026-09-16)
      'Ingrid Bergman tillbringade i mitten av 1900-talet sina somrar på Dannholmen nordväst om Fjällbacka. Torget vid hamnen bär hennes namn, och där står också en skulptur till hennes minne. Guidade vandringar i byn går på temat Ingrid Bergman, vid sidan av turerna i Camilla Läckbergs fotspår.',
      // KÄLLA: Länsstyrelsen Västra Götaland, naturreservatet Väderöarna — bildat 2011, cirka 18 300 hektar, 365 öar och skär, turbåtar från bland annat Fjällbacka och Hamburgsund, ett av Sveriges mest värdefulla marina områden tillsammans med Kosterhavets nationalpark — https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/vaderoarna.html (läst 2026-09-16)
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Paddle on your own starting in Fjällbacka — rutten namnger Kråkholmen, Köttöarna, Porsholmen, Valö, Dannholmen och Hjärterön i skyddat vatten — https://www.vastsverige.com/en/tanum/aktiviteter/paddling/paddla-fjallbacka/ (läst 2026-09-16)
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Marinas in Tanum — Fjällbacka Guest Harbour ligger intill Ingrid Bergmans torg och har toalett, dusch och landström — https://www.vastsverige.com/en/tanum/accomodation/marinas/ (läst 2026-09-16)
      'Fjällbacka är utgångspunkt för skärgårdsturer. Härifrån går turbåtar till Väderöarna, som sedan 2011 är naturreservat — cirka 18 300 hektar med 365 öar och skär, av Länsstyrelsen räknat till Sveriges mest värdefulla marina områden vid sidan av Kosterhavet. Den som paddlar själv kan följa en dagstur i det skyddade innerskärgårdsvattnet förbi Kråkholmen, Köttöarna, Porsholmen, Valö, Dannholmen och Hjärterön. Gästhamnen ligger vid Ingrid Bergmans torg och har toalett, dusch och landström.',
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Vettebergsleden — tätortsnära rundslinga med blå markering, del av Kuststigen, start lämpligen vid Ingrid Bergmans torg, varierad terräng, svårighetsgrad och längd — https://www.vastsverige.com/en/tanum/produkter/vettebergsleden/?site=145 (läst 2026-09-16)
      'Vill man gå längre än upp på berget är Vettebergsleden en tätortsnära rundslinga med blå markering, en del av Kuststigen. Den passerar Ingrid Bergmans torg, Kungsklyftan och Vetteberget, och det finns flera sträckningar att välja mellan med olika terräng, längd och svårighetsgrad.',
    ],
    facts: {
      // KÄLLA: https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/4875__0__LINE__20260817__20261212__83be1ed8-a883-462d-b8ea-6f64e9b6df0c__4%2C0__2768580.pdf — "875 Tanumshede–Fjällbacka–Dingle–Håby"; "Gäller 19 aug - 12 dec 2026" (läst 2026-09-27). Restid ur tabellen: Tanumshede centrum 06.25 → Fjällbacka 06.54 (29 min), 08.44 → 09.10 (26 min), lördag 10.20 → 10.48 (28 min).
      // KÄLLA: https://www.vastsverige.com/tanum/produkter/vettebergetkungsklyftan/ — "Från E6, Vid Grindmotet tag av väg 163 mot Fjällbacka." (läst 2026-09-27)
      travel_time: 'Ca 25–30 min med buss 875 från Tanumshede · med bil från E6 via Grindmotet och väg 163',
      // KÄLLA: https://www.tanum.se/kommunpolitik/kommunfakta/kommunenshistoria/ortsinformation/fjallbacka.4.7664b4813898b7df98459f8.html — "Ungefär 950 personer bor i Fjällbacka året runt"; "Vid foten av Vetteberget ligger Fjällbacka centrum med Ingrid Bergmans torg" (läst 2026-09-27)
      // KÄLLA: https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/vaderoarna.html — "Det går turbåtar till Väderöarna från bland annat Fjällbacka och Hamburgsund" (läst 2026-09-27)
      character: 'Litet fiskeläge med ca 950 åretruntboende vid foten av Vetteberget, med gästhamn och turbåtar till Väderöarna',
      // KÄLLA: https://gasthamnsbolaget.se/boende-i-bohuslan/badholmens-vandrarhem/ — "Öppet året runt" (läst 2026-09-27); https://www.vastsverige.com/en/tanum/accomodation/marinas/ — "Harbour office open during summer" (läst 2026-09-27); https://www.vastsverige.com/en/tanum/service/travel-tanum/ — "a fee is charged from June 15 to August 15 between 9:00 AM and 6:00 PM" (läst 2026-09-27)
      season: 'Året runt · högsäsong mitten av juni–mitten av augusti, då hamnkontoret är öppet och parkeringen i centrum avgiftsbelagd',
      // KÄLLA: https://www.vastsverige.com/tanum/produkter/vettebergetkungsklyftan/ — "Vettebergsleden är en stadsnära rundslinga som tar dig upp på Vetteberget och runt samhället" (läst 2026-09-27); https://www.vastsverige.com/en/tanum/fjallbacka/guided-tours-in-fjallbacka/ — "The tour starts at Ingrid Bergman Square" (läst 2026-09-27); https://www.vastsverige.com/en/tanum/aktiviteter/paddling/paddla-fjallbacka/ — "Explore idyllic Fjällbacka in the best way - by kayak!" (läst 2026-09-27)
      best_for: 'Vandring på Vetteberget, guidade Läckberg-vandringar, skärgårdsturer och paddling',
    },
    facts_provenance: {
      travel_time: 'matt',
      character: 'matt',
      season: 'matt',
      best_for: 'bedomning',
    },
    activities: [
      // KÄLLA: https://www.vastsverige.com/tanum/produkter/vettebergetkungsklyftan/ — "nås genom trappor från Ingrid Bergmans Torg"; "Berget delar i Stora och Lilla Vetteberget genom den säregna Kungsklyftan" (läst 2026-09-27)
      // KÄLLA: https://www.tanum.se/kommunpolitik/kommunfakta/kommunenshistoria/ortsinformation/fjallbacka.4.7664b4813898b7df98459f8.html — "är en 200 meter lång spricka i granitberget" (läst 2026-09-27)
      { icon: '⛰', name: 'Vetteberget och Kungsklyftan', desc: 'Trapporna från Ingrid Bergmans torg leder upp på Vetteberget och genom Kungsklyftan, en 200 meter lång spricka i berget med ett fastkilat klippblock som tak.' },
      // KÄLLA: https://www.vastsverige.com/en/tanum/fjallbacka/guided-tours-in-fjallbacka/ — "The tour starts at Ingrid Bergman Square" (läst 2026-09-27)
      // KÄLLA: https://www.vastsverige.com/tanum/fjallbacka/ — "Hitta platserna från Camilla Läckbergs böcker i verkligheten. Ladda ned vår karta och gå din Läckberg-vandring när det passar dig." (läst 2026-09-27)
      { icon: '📚', name: 'Läckbergs Fjällbacka', desc: 'Guidade vandringar i Camilla Läckbergs fotspår startar vid Ingrid Bergmans torg. Turistrådet Västsverige har också en karta att ladda ned för den som vill gå på egen hand.' },
      // KÄLLA: https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/vaderoarna.html — "Det går turbåtar till Väderöarna från bland annat Fjällbacka och Hamburgsund"; "Storö är välbesökt och har värdshus, kafé och gammal lotsutkik"; "Det finns en skyltad och spångad vandringsled" (läst 2026-09-27)
      { icon: '⛵', name: 'Båtutflykter', desc: 'Turbåtar går från Fjällbacka till Väderöarna. På Storö finns värdshus, kafé, en gammal lotsutkik och en skyltad, spångad vandringsled.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Paddle on your own starting in Fjällbacka — dagstur i skyddat vatten förbi Porsholmen, Valö, Dannholmen och Hjärterön — https://www.vastsverige.com/en/tanum/aktiviteter/paddling/paddla-fjallbacka/ (läst 2026-09-16)
      { icon: '🛶', name: 'Kajakpaddling', desc: 'Dagstur i skyddat vatten förbi Porsholmen, Valö, Dannholmen och Hjärterön.' },
    ],
    accommodation: [
      // KÄLLA: https://www.vastsverige.com/en/tanum/produkter/stora-hotellet-fjallbacka/ — "Stora Hotellet in Fjällbacka has attracted guests from near and far since 1834"; "Restaurant Mamsell serves well-crafted à la carte dining" (läst 2026-09-27)
      // KÄLLA: https://shfjallbacka.se/en/restaurants/ — "© 2026 Stora Hotellet" (läst 2026-09-27)
      { name: 'Stora Hotellet Fjällbacka', type: 'Hotell', desc: 'Hotell vid vattnet på Galärbacken, som tagit emot gäster sedan 1834. Restaurang Mamsell finns i huset.' },
      // KÄLLA: https://gasthamnsbolaget.se/boende-i-bohuslan/badholmens-vandrarhem/ — "Öppet året runt"; "3 fyrbäddsrum och 1 tvåbäddsrum"; "Gemensamt kök, dusch, WC och bastu"; "Köket är nyrenoverat 2025"; "Vandrarhemmets café är öppet hela sommaren" (läst 2026-09-27)
      { name: 'Badholmens Vandrarhem', type: 'Vandrarhem', desc: 'Vandrarhem på Badholmen i Fjällbacka hamn, öppet året runt. Tre fyrbäddsrum och ett tvåbäddsrum, gemensamt kök och bastu, och ett café sommartid.' },
    ],
    getting_there: [
      // KÄLLA: https://www.vastsverige.com/tanum/produkter/vettebergetkungsklyftan/ — "Från E6, Vid Grindmotet tag av väg 163 mot Fjällbacka." (läst 2026-09-27)
      // KÄLLA: https://www.vastsverige.com/en/tanum/service/travel-tanum/ — "In central parking areas in Fjällbacka, Grebbestad, and Hamburgsund, a fee is charged from June 15 to August 15 between 9:00 AM and 6:00 PM"; "Free long-term parking in the city's of Grebbestad, Fjällbacka, and Hamburgsund is about a 10-minute walk from the center" (läst 2026-09-27)
      // Restiden '2 h' stod utan källa och är struken.
      { method: 'Bil', from: 'Göteborg', time: '', desc: 'E6 norrut, ta av vid Grindmotet och följ väg 163 mot Fjällbacka. Parkeringen i centrum är avgiftsbelagd 15 juni–15 augusti; gratis långtidsparkering finns ungefär 10 minuters promenad från centrum.', icon: '🚗' },
      // KÄLLA: https://www.vastsverige.com/en/tanum/service/travel-tanum/ — "Between Gothenburg and Strömstad, local trains run along the Bohus Line, with our local train station located just outside Tanumshede. Local buses stop at the train station" (läst 2026-09-27)
      // KÄLLA: https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/4875__0__LINE__20260817__20261212__83be1ed8-a883-462d-b8ea-6f64e9b6df0c__4%2C0__2768580.pdf — "875 Tanumshede–Fjällbacka–Dingle–Håby"; "Gäller 19 aug - 12 dec 2026" (läst 2026-09-27). Måndag–fredag nio avgångar från Tanumshede centrum (06.25–18.31), lördag och söndag 10.20 och 14.10; 06.25 → Fjällbacka 06.54.
      { method: 'Tåg + buss 875', from: 'Göteborg', time: 'ca 25–30 min buss', desc: 'Tåg på Bohusbanan mot Strömstad till Tanum, strax utanför Tanumshede, och lokalbuss vidare. Västtrafiks linje 875 går från Tanumshede till Fjällbacka flera gånger om dagen på vardagar och två gånger om dagen på helger.', icon: '🚌' },
    ],
    harbors: [
      // KÄLLA: https://www.vastsverige.com/en/tanum/accomodation/marinas/ — "160 guest berths, next to Ingrid Bergman Square. Toilet, shower, and shore power. Washing machine and dryer available at Badholmen Hostel. Operated by Gästhamnsbolaget. Harbour office open during summer." (läst 2026-09-27)
      // KÄLLA: https://gasthamnsbolaget.se/gasthamnar-i-bohuslan/fjallbacka-gasthamn/ — "Cirka 29 förbokningsbara platser"; "Servicebyggnaden med 6 toaletter och 6 duschar renoverades inför säsongen 2023"; "I gästhamnen kan du sortera glas, matavfall, pant och restavfall" (läst 2026-09-27). Drivmedel nämns inte (fuel: false).
      { name: 'Fjällbacka Gästhamn', desc: 'Gästhamn vid Ingrid Bergmans torg med ca 160 gästplatser, varav cirka 29 går att förboka. Servicehus med 6 toaletter och 6 duschar; tvätt och hamnkontor på Badholmens vandrarhem. Hamnkontoret är öppet sommartid.', fuel: false, service: ['El', 'Dusch', 'Toalett', 'Tvätt'] },
    ],
    restaurants: [
      // KÄLLA: Bryggan Fjällbacka, egen webbplats — listar Bryggan Café & Bistro, Restaurant Matilda, Everts Tapasbar och The Harbour House på Ingrid Bergmans Torg — https://www.brygganfjallbacka.se/ (läst 2026-09-16)
      // KÄLLA: https://www.brygganfjallbacka.se/ — "Måndagen den 21/9 så drar årets hummerfiske igång"; "Restaurang Matilda: Öppnar åter under hummerfisket"; "inför säsongen 2027" (läst 2026-09-27)
      { name: 'Bryggan Café & Bistro', type: 'Restaurang/Café', desc: 'Café och bistro vid Ingrid Bergmans Torg, del av Bryggan Fjällbacka.' },
      { name: 'Restaurant Matilda', type: 'Restaurang', desc: 'Fisk- och skaldjursrestaurang vid Ingrid Bergmans Torg, del av Bryggan Fjällbacka.' },
      // KÄLLA: Stora Hotellet Fjällbacka, egen webbplats — Restaurant Mamsell är hotellets restaurang, Galärbacken 2, Fjällbacka — https://shfjallbacka.se/en/restaurants/ (läst 2026-09-16)
      { name: 'Restaurant Mamsell', type: 'Restaurang', desc: 'Restaurang på Stora Hotellet i Fjällbacka.' },
      // KÄLLA: Fjällbacka Golfklubb, egen webbplats — Sandbunkern Bistro & Deli i klubbhuset, Långö Rörvikarna 1 — https://fjallbackagk.se/sandbunkern-bistro-deli/ (läst 2026-09-16)
      { name: 'Sandbunkern Bistro & Deli', type: 'Bistro', desc: 'Bistro i klubbhuset på Fjällbacka Golfklubb, Långö Rörvikarna 1.' },
    ],
    tips: [
      // KÄLLA: https://www.vastsverige.com/tanum/produkter/vettebergetkungsklyftan/ — "nås genom trappor från Ingrid Bergmans Torg" (läst 2026-09-27)
      'Trapporna upp till Vetteberget startar vid Ingrid Bergmans torg.',
      // KÄLLA: https://www.vastsverige.com/en/tanum/service/travel-tanum/ — "a fee is charged from June 15 to August 15 between 9:00 AM and 6:00 PM. The first hour is free"; "You can park for a maximum of 3 consecutive hours"; "Free long-term parking in the city's of Grebbestad, Fjällbacka, and Hamburgsund is about a 10-minute walk from the center" (läst 2026-09-27)
      'Mitt i sommaren (15 juni–15 augusti) kostar parkeringen i centrum från andra timmen och du får stå högst tre timmar. Gratis långtidsparkering finns ungefär 10 minuters promenad bort.',
      // KÄLLA: https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/vaderoarna.html — "närmare öar och skär än 100 meter inom fågel- och sälskyddsområden"; "Under tiden 1 mars – 31 augusti"; "Ha hund okopplad under perioden 1 mars–20 augusti"; "Förbudet gäller även engångsgrillar" (läst 2026-09-27)
      'På Väderöarna är det landstigningsförbud i fågel- och sälskyddsområdena 1 mars–31 augusti, hundar ska vara kopplade 1 mars–20 augusti och det är eldningsförbud, även för engångsgrillar.',
      // KÄLLA: https://www.brygganfjallbacka.se/ — "Höstens stora händelse längs med kusten är hummersäsongen, vars premiär äger rum varje år den första måndagen efter 20 september" (läst 2026-09-27)
      'Hummerfisket börjar varje år den första måndagen efter 20 september.',
    ],
    related: ['grebbestad', 'kosterhavet', 'hamburgsund'],
    tags: ['kriminalromaner', 'klippvandring', 'pittoreskt', 'ingrid bergman'],
    // KÄLLA: Turistrådet Västsverige (vastsverige.com), Vetteberget/Kungsklyftan — tidigare namnet Ramneklovan, namnet Kungsklyftan efter Oscar II:s besök 1887 och kungens signatur på bergväggen vid norra ingången — https://www.vastsverige.com/tanum/produkter/vettebergetkungsklyftan/ (läst 2026-09-16)
    did_you_know: 'Kungsklyftan hette förr Ramneklovan. Namnet Kungsklyftan kommer av att Oscar II besökte platsen 1887 och signerade bergväggen vid klyftans norra ingång.',
    // Rättat 2026-09-27: stod öppet juni–september och 'off' januari–maj, men ca 950 personer bor här året runt och vandrarhemmet har öppet året runt. bestReason ('hela byn i blomning', 'autentisk fiskebystämning') och varningen om inställda båtturer saknade källa.
    seasonal: {
      // KÄLLA: https://gasthamnsbolaget.se/boende-i-bohuslan/badholmens-vandrarhem/ — "Öppet året runt"; "Vandrarhemmets café är öppet hela sommaren" (läst 2026-09-27)
      open: 'Året runt',
      // KÄLLA: https://www.vastsverige.com/en/tanum/service/travel-tanum/ — "a fee is charged from June 15 to August 15 between 9:00 AM and 6:00 PM" (läst 2026-09-27)
      peak: 'Mitten av juni–mitten av augusti',
      // KÄLLA: https://www.vastsverige.com/en/tanum/accomodation/marinas/ — "Harbour office open during summer" (läst 2026-09-27)
      // KÄLLA: https://www.brygganfjallbacka.se/ — "Höstens stora händelse längs med kusten är hummersäsongen, vars premiär äger rum varje år den första måndagen efter 20 september"; "Restaurang Matilda: Öppnar åter under hummerfisket" (läst 2026-09-27)
      best: 'Sommar eller slutet av september',
      bestReason: 'Sommartid är hamnkontoret och vandrarhemmets café öppna. Den första måndagen efter 20 september börjar hummerfisket, och Bryggans Restaurang Matilda öppnar då igen.',
      // KÄLLA: https://www.vastsverige.com/en/tanum/service/travel-tanum/ — "You can park for a maximum of 3 consecutive hours" (läst 2026-09-27)
      warning: 'Parkeringen i centrum är avgiftsbelagd 15 juni–15 augusti kl. 9–18 och begränsad till tre timmar.',
      months: ['limited','limited','limited','limited','limited','open','peak','peak','open','limited','limited','limited'],
    },
  },
  {
    slug: 'grundsund',
    name: 'Grundsund',
    region: 'bohuslan',
    regionLabel: 'Bohuslän',
    emoji: '🐟',
    // KÄLLA: https://www.vastsverige.com/en/lysekil/produkter/skafto/ — "has always been an active fishing port and has a long harbour canal around which the village is built" ; https://www.vastsverige.com/en/lysekil/produkter/skafto-grundsund/ — "The long, narrow village is divided by a canal which separates Skaftö from the small island of Ösö" (läst 2026-09-27)
    tagline: 'Fiskeläge på Skaftö byggt kring en hamnkanal.',
    description: [
      // KÄLLA: https://www.vastsverige.com/en/lysekil/produkter/skafto-grundsund/ — "is on the westernmost point of Skaftö", "The long, narrow village is divided by a canal which separates Skaftö from the small island of Ösö", "You can buy fresh fish, shrimps and crabs directly from the commercial fishing boats when they dock", "The canal that divides the village into two parts, east and west, was dug out during the first world war to allow fishing boats and small cargo boats to pass more easily and make a larger, more protected harbour", "A new sea-front promenade has been constructed by the eastern quay", "long pier to Skäddhålan which then continues to connect with a footpath to Vigerna" ; https://www.vastsverige.com/en/lysekil/produkter/skafto/ — "has always been an active fishing port" (läst 2026-09-27)
      'Grundsund ligger ytterst på Skaftös västra udde och är fortfarande en aktiv fiskehamn. Den långsmala byn är byggd kring en hamnkanal som skiljer Skaftö från den lilla ön Ösö och delar byn i en östra och en västra del. Kanalen grävdes under första världskriget, för att fiskebåtar och mindre fraktbåtar lättare skulle ta sig fram och för att ge byn en större skyddad hamn. När fiskebåtarna lägger till kan man köpa färsk fisk, räkor och krabba direkt från dem. Längs östra kajen finns en nyanlagd strandpromenad – en lång brygga ut till Skäddhålan som fortsätter som gångstig till Vigerna.',
      // KÄLLA: https://www.vastsverige.com/en/lysekil/produkter/skafto-grundsund/ — "The village was a significant fishing base and shipping community for a long period of time", "The peak of the herring era in the 18th century contributed to the development of the village", "when other similar fishing communities changed into seaside resorts for the wealthy classes during the end of the nineteenth century, Grundsund essentially remained a fishing port", "Fishing is still an important industry here", "Most of the very popular TV series Saltön has been filmed on Skaftö, mainly in Grundsund", "The series is based on the books written by Viveca Lärn, and with more than a million viewers" (läst 2026-09-27)
      'Grundsund var länge en betydande fiskehamn och sjöfartsby, och sillperioden på 1700-talet bidrog till att byn växte. När jämförbara fiskelägen mot slutet av 1800-talet gjordes om till badorter för de välbärgade, förblev Grundsund i allt väsentligt en fiskehamn – och fisket är fortfarande en viktig näring i byn. Här spelades också stora delar av tv-serien Saltön in. Serien bygger på Viveca Lärns böcker och hade över en miljon tittare.',
      // KÄLLA: https://www.vastsverige.com/lysekil/produkter/skafto-grundsunds-kyrka/ — "Ursprungliga kyrkobyggnaden var ett kapell som uppfördes 1799", "Ett kyrktorn byggdes till 1818", "En större ombyggnad genomfördes 1893 efter ritningar av arkitekt Fredrik Falkenberg", "Kyrkan förlängdes åt öster och fick ett nytt tresidigt avslutat kor", "De breda korsarmarna uppfördes och kyrkan fick sin nuvarande planform som korskyrka", "gospelkonserterna i juli och julkonserter i december är mycket välbesökta", "Kyrkan rymmer 400 besökare" ; https://www.vastsverige.com/en/lysekil/produkter/skafto-grundsund/ — "There is a beautiful view of the harbour canal from the bridge to Ösö and from the nearby church" (läst 2026-09-27)
      'Från Grundsunds kyrka, liksom från bron till Ösö, har man utsikt över hamnkanalen. Kyrkan började som ett kapell 1799 och fick kyrktorn 1818. Vid ombyggnaden 1893, efter ritningar av Fredrik Falkenberg, förlängdes den österut, fick ett nytt tresidigt avslutat kor och breda korsarmar och blev därmed en korskyrka. I dag rymmer den 400 besökare och används bland annat för gospelkonserter i juli och julkonserter i december.',
      // KÄLLA: https://www.trafikverket.se/resa-och-trafik/farjetrafik/gullmarsleden/ — "Gullmarsleden går mellan Finnsbo, Lysekil och Skår, Uddevalla i Gullmarsfjorden", "Färjeledens längd är 1850 meter och överfartstiden är tio minuter", "Resan med vägfärjan är avgiftsfri" ; https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/vagerod.html — "Cirka 1,5 kilometer efter Skaftöbron" (läst 2026-09-27)
      // KÄLLA: https://www.vastsverige.com/en/things-to-do/explore-the-west-coast-by-boat/ferry-lines/route-map-lysekiluddevallaljungskile/ — "Lysekil – Fiskebäckskil, Skaftö - Östersidan, Skaftö", "all year round" ; https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/4847__1__LINE__20260101__20261211__e8375385-c9fa-43eb-880d-cff01ed9acbf__1%2C0__2697062.pdf — "847 Lysekil–Skaftö", "Gäller 1 jan - 12 dec 2026 utom 15 juni - 16 aug" ; https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/4845__0__LINE__20260817__20261212__1fb56a4f-7e7e-4e3c-8b26-b834a4887c8a__1%2C0__2789942.pdf — "Grundsund–Fiskebäckskil–Bokenäs–Uddevalla", "Gäller 17 aug - 12 dec 2026" (läst 2026-09-27)
      'Skaftö har fast landförbindelse över Skaftöbron. Från Lysekil tar man Gullmarsledens vägfärja mellan Finnsbo i Lysekils kommun och Skår i Uddevalla kommun; leden är 1 850 meter lång, överfarten tar tio minuter och resan är avgiftsfri. Med kollektivtrafik går Västtrafiks båtlinje 847 året runt från Lysekil till Fiskebäckskil och Östersidan på Skaftö, och båten tar en kvart från Lysekil till Östersidans färjeläge. Därifrån går buss 845 till Grundsund på cirka 20 minuter. Samma busslinje går också mellan Grundsund och Uddevalla via Bokenäs.',
      // KÄLLA: https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/vagerod.html — "Bildat: 2003", "Areal: cirka 121 hektar", "Allra mest känt är området för sina blåsippor", "De blommar här i stora mängder under våren innan lövträdens krontak sluter sig i ek- och bokskog", "Området är kuperat med gott om block och lodräta stup", "På flera platser finns så kallad krattekskog", "hävdade kulturmarker", "Du hittar det sällsynta och hotade gräset råglosta i reservatet", "Här vittnar fällda träd och stubbar om att det finns bäver i området", "En av lederna följer den gamla landsvägen, som var i bruk ännu under 1930-talet", "Naturvårdsförvaltare: Västkuststiftelsen", "Området ingår i EU:s ekologiska nätverk av skyddade områden, Natura 2000" ; https://www.vastsverige.com/en/lysekil/leder/skafto---vagerod/ — "2.4 km", "Partly the blue-marked coastal trail Kuststigen", "There is also the bus stop Vägeröd (Västtrafik 845)" (läst 2026-09-27)
      'Inne på Skaftö ligger Vägeröds naturreservat, bildat 2003 och cirka 121 hektar stort. Området är kuperat med gott om block och lodräta stup, ek- och bokskog, så kallad krattekskog och hävdade kulturmarker. Reservatet är mest känt för sina blåsippor, som blommar i stora mängder på våren innan lövträdens krontak sluter sig. Här växer också det sällsynta och hotade gräset råglosta, och vid dammen Edsvattnet vittnar fällda träd och stubbar om att det finns bäver. Reservatet förvaltas av Västkuststiftelsen och ingår i Natura 2000. Leden Vägeröd–Sälvik är 2,4 kilometer, följer delvis den blåmarkerade Kuststigen och går längs den gamla landsvägen, som var i bruk ännu på 1930-talet. Buss 845 stannar vid hållplatsen Vägeröd.',
    ],
    facts: {
      // KÄLLA: https://www.vastsverige.com/en/lysekil/produkter/skafto-grundsund/ — "It takes around 45 minutes to get to Grundsund from Uddevalla" ; https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/4845__0__LINE__20260817__20261212__1fb56a4f-7e7e-4e3c-8b26-b834a4887c8a__1%2C0__2789942.pdf — "Grundsund–Fiskebäckskil–Bokenäs–Uddevalla", "Gäller 17 aug - 12 dec 2026" (läst 2026-09-27)
      travel_time: 'Ca 45 min med bil från Uddevalla; ca 1 h med buss 845',
      // KÄLLA: https://www.vastsverige.com/en/lysekil/produkter/skafto/ — "has always been an active fishing port and has a long harbour canal around which the village is built" (läst 2026-09-27)
      character: 'Aktiv fiskehamn, hamnkanal',
      // UPPSKATTNING: maj–september är Svallas bedömning av besökssäsongen; flera serveringar i hamnen har bara säsongsöppet.
      season: 'Maj–september',
      // KÄLLA: https://www.vastsverige.com/en/lysekil/leder/skafto---vagerod/ — "one of the most visited hiking destinations" ; https://www.vastsverige.com/en/lysekil/produkter/skafto-grundsund/ — "visitors also come to swim, eat good food and discover the archipelago on foot or by bicycle, kayak or boat" (läst 2026-09-27)
      best_for: 'Vandring, Vägeröds naturreservat, hamnmiljö',
    },
    facts_provenance: {
      travel_time: 'matt',
      character: 'matt',
      season: 'bedomning',
      best_for: 'matt',
    },
    activities: [
      // KÄLLA: https://www.vastsverige.com/lysekil/produkter/skafto-grundsunds-kyrka/ — "Ursprungliga kyrkobyggnaden var ett kapell som uppfördes 1799", "kyrkan fick sin nuvarande planform som korskyrka" ; https://www.vastsverige.com/en/lysekil/produkter/skafto-grundsund/ — "There is a beautiful view of the harbour canal from the bridge to Ösö and from the nearby church" (läst 2026-09-27)
      { icon: '⛪', name: 'Grundsunds kyrka', desc: 'Kyrka från 1799 med utsikt över hamnkanalen, ombyggd till korskyrka 1893.' },
      // KÄLLA: https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/vagerod.html — "Bildat: 2003", "Areal: cirka 121 hektar", "Allra mest känt är området för sina blåsippor", "ek- och bokskog" (läst 2026-09-27)
      { icon: '🌸', name: 'Vägeröds naturreservat', desc: 'Blåsippsmarker, bok- och ekskog inne på Skaftö. Bildat 2003, cirka 121 hektar.' },
      // KÄLLA: https://www.vastsverige.com/en/lysekil/leder/skafto---vagerod/ — "2.4 km", "Partly the blue-marked coastal trail Kuststigen" (läst 2026-09-27)
      { icon: '🥾', name: 'Vandring Skaftö', desc: 'Leden Vägeröd–Sälvik är 2,4 km och följer delvis den blåmarkerade Kuststigen.' },
    ],
    accommodation: [
      // KÄLLA: https://www.vastsverige.com/lysekil/produkter/skafto-vandrarhem/ — "Skaftö Vandrarhem och B & B är öppet året runt, och förmedlar även veckovisprivatboende", "30 bäddar i 10 individuellt inredda rum – inga sovsalar", "Gemensamma duschar och WC", "Hemtrevligt boende i hjärtat av Grundsund" (läst 2026-09-27)
      { name: 'Skaftö Vandrarhem', type: 'Vandrarhem/stugförmedling', desc: 'Vandrarhem och B&B i Grundsund med 30 bäddar i tio rum, delade duschar och WC. Öppet året runt och förmedlar även rum, stugor och kaptenshus på Skaftö.' },
      // KÄLLA: https://www.grundenshotell.se/ — "Grundéns hotell, Furtofta 204 451 79 Grundsund", "vid infarten till det charmiga lilla fiskesamhället Grundsund", "Gäster erbjuds fri parkering direkt vid hotellet samt gratis utlåning av cyklar", "Vår egen Restaurang Pelles" (läst 2026-09-27)
      { name: 'Grundéns hotell', type: 'Hotell', desc: 'Hotell vid infarten till Grundsund, Furtofta 204, med fri parkering och cyklar att låna. Drivs ihop med restaurang Pelles Rökeri.' },
    ],
    getting_there: [
      // KÄLLA: https://www.trafikverket.se/resa-och-trafik/farjetrafik/gullmarsleden/ — "Gullmarsleden går mellan Finnsbo, Lysekil och Skår, Uddevalla i Gullmarsfjorden", "Färjeledens längd är 1850 meter och överfartstiden är tio minuter", "Resan med vägfärjan är avgiftsfri" ; https://www.vastsverige.com/en/lysekil/produkter/skafto-grundsund/ — "It takes around 45 minutes to get to Grundsund from Uddevalla" ; https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/vagerod.html — "Cirka 1,5 kilometer efter Skaftöbron" (läst 2026-09-27)
      { method: 'Bil', from: 'Uddevalla', time: '45 min', desc: 'Skaftö nås med bil över Skaftöbron. Från Lysekil går Gullmarsledens vägfärja Finnsbo–Skår; överfarten tar tio minuter och är avgiftsfri.', icon: '🚗' },
      // KÄLLA: https://www.vastsverige.com/en/things-to-do/explore-the-west-coast-by-boat/ferry-lines/route-map-lysekiluddevallaljungskile/ — "Lysekil – Fiskebäckskil, Skaftö - Östersidan, Skaftö", "all year round" ; https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/4847__1__LINE__20260101__20261211__e8375385-c9fa-43eb-880d-cff01ed9acbf__1%2C0__2697062.pdf — "847 Lysekil–Skaftö", "Ångbåtsbryggan", "Östersidans färjeläge" ; https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/4845__0__LINE__20260817__20261212__1fb56a4f-7e7e-4e3c-8b26-b834a4887c8a__1%2C0__2789942.pdf — "Grundsund–Fiskebäckskil–Bokenäs–Uddevalla", "Östersidans färjeläge" (läst 2026-09-27)
      { method: 'Passagerarbåt + buss', from: 'Lysekil', time: '35 min', desc: 'Västtrafiks båtlinje 847 går året runt från Lysekil (Ångbåtsbryggan) till Östersidans färjeläge på Skaftö, cirka 15 minuter. Därifrån tar buss 845 cirka 20 minuter till Grundsund.', icon: '⛴' },
      // KÄLLA: https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/4845__0__LINE__20260817__20261212__1fb56a4f-7e7e-4e3c-8b26-b834a4887c8a__1%2C0__2789942.pdf — "Grundsund–Fiskebäckskil–Bokenäs–Uddevalla", "Torp Terminalen", "Gäller 17 aug - 12 dec 2026" (läst 2026-09-27)
      { method: 'Buss', from: 'Uddevalla', time: '1 h', desc: 'Västtrafiks buss 845 går Uddevalla (Torp Terminalen)–Bokenäs–Fiskebäckskil–Grundsund på ungefär en timme.', icon: '🚌' },
    ],
    harbors: [
      // KÄLLA: https://www.vastsverige.com/en/lysekil/produkter/skafto-gasthamn-grundsund/ — "lies on the Southwestern part of Skaftö", "mooring along the Eastern berth and mooring with aft lines by the Western berth", "Fresh water", "Electricity", "Laundry (on the Western pier)", "Recycling station and septic tank emptying", "Toilet (Code is on the receipt)", "Shower (Code is on the receipt)", "Payment on website: www.hamn.lysekil.se" ; https://hamn.lysekil.se/sv/GastServicePriser — "Priser och service 2026", "Tvättmaskin: Havsbadet Grundsund Norra hamnen", "Sugtömningsstation: Fiskehamnen Grundsund, Västra Kajen" (läst 2026-09-27)
      { name: 'Grundsunds Gästhamn', desc: 'Gästhamn på sydvästra Skaftö med förtöjning längs Östra kaj och med akterlinor vid Västra kaj. Kommunal gästhamn; hamnavgiften betalas via Lysekils kommuns hamnsida.', fuel: false, service: ['Vatten', 'El', 'Dusch', 'Toalett', 'Tvättstuga', 'Sugtömning'] },
    ],
    restaurants: [
      // KÄLLA: https://www.pellesrokeri.com/ — "Pelles rökeri i Grundsund", "Tack för sommaren 2026 - Vi ses den 30 april 2027", "Hugos bu, Bar & café", "Terrassen pizza & lounge", "Här serveras mat inspirerad av havet – lagad från grunden, både till lunch och middag" ; https://www.vastsverige.com/en/skafto---eng/food--beverage/eat-on-skafto/ — "Östra kajen 20, 45179 Grundsund" (läst 2026-09-27)
      { name: 'Pelles Rökeri', type: 'Restaurang', desc: 'Säsongsöppen restaurang vid Östra kajen i Grundsund med mat inspirerad av havet, till lunch och middag. I samma hus finns Terrassen Pizza & Lounge.' },
      // KÄLLA: https://www.pellesrokeri.com/ — "I den anrika sjöboden från 1905 – en av Grundsunds äldsta", "glasscafé och enklare rätter på dagen" (läst 2026-09-27)
      { name: 'Hugos Bu, Bar & Café', type: 'Café', desc: 'Glasscafé och bar i sjöboden från 1905, en av Grundsunds äldsta, intill Pelles Rökeri.' },
      // KÄLLA: https://www.smultrontang.se/ — "En pub & restaurang", "Västkust - Klassiskt - Medelhav", "Nu har vi stängt för i år och vi tackar er alla för säsongen 2026", "Västra Kajen 11" (läst 2026-09-27)
      { name: 'Smultron & Tång', type: 'Restaurang', desc: 'Säsongsöppen pub och restaurang vid Västra kajen i Grundsund, med rätter från västkusten, klassiskt och Medelhavet.' },
    ],
    // KÄLLA: https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/4845__0__LINE__20260817__20261212__1fb56a4f-7e7e-4e3c-8b26-b834a4887c8a__1%2C0__2789942.pdf — "Grundsund–Fiskebäckskil–Bokenäs–Uddevalla" ; https://www.vastsverige.com/en/lysekil/produkter/skafto-grundsund/ — "You can buy fresh fish, shrimps and crabs directly from the commercial fishing boats when they dock" (läst 2026-09-27)
    tips: ['Kombinera med Fiskebäckskil – buss 845 tar 7–10 minuter mellan Grundsund och Fiskebäckskil.', 'Färsk fisk, räkor och krabba kan köpas direkt från fiskebåtarna när de lägger till.'],
    related: ['fiskebackskil', 'lysekil', 'smogen'],
    // KÄLLA: https://www.vastsverige.com/en/lysekil/produkter/skafto-gasthamn-grundsund/ — "Grundsund is an old fishing village with a calm and authentic 17th century atmosphere" (läst 2026-09-27)
    tags: ['fiskeläge', 'hamnkanal', 'lugnt', 'autentisk'],
    // KÄLLA: https://www.vastsverige.com/en/lysekil/produkter/skafto/ — "Most of the popular TV series Saltön was filmed on Skaftö, mainly in Grundsund and Fiskebäckskil" ; https://www.vastsverige.com/en/lysekil/produkter/skafto-grundsund/ — "The series is based on the books written by Viveca Lärn, and with more than a million viewers" (läst 2026-09-27)
    did_you_know: 'Stora delar av tv-serien Saltön spelades in på Skaftö, främst i Grundsund och Fiskebäckskil. Serien bygger på Viveca Lärns böcker och hade över en miljon tittare.',
  },
  {
    slug: 'hamburgsund',
    name: 'Hamburgsund',
    region: 'bohuslan',
    regionLabel: 'Bohuslän',
    emoji: '⛵',
    // KÄLLA: https://www.trafikverket.se/resa-och-trafik/farjetrafik/hamburgsundsleden/ — "Hamburgsundsleden går mellan Hamburgsund och Hamburgö i Norra Bohuslän" ; https://www.tanum.se/kommunpolitik/kommunfakta/kommunenshistoria/ortsinformation/hamburgsund.4.7664b4813898b7df9844de1.html — "Strax söder om Hamburgsund ligger berget där Hornborgs slott låg", "det arrangeras årligen, under augusti, Hornbore Ting" (läst 2026-09-27)
    tagline: 'Linfärja över sundet till Hamburgö, borgruinen Hornborg och Hornbore Ting.',
    description: [
      // KÄLLA: https://www.vastsverige.com/en/tanum/produkter/hamburgsund/ — "Hamburgsund is a village in Tanum and is located both on the mainland and the island Hamburgö", "130 meter wide Hamburgsund channel" ; https://www.tanum.se/kommunpolitik/kommunfakta/kommunenshistoria/ortsinformation/hamburgsund.4.7664b4813898b7df9844de1.html — "Förledet kommer från önamnet Hornbora", "som syftar på Hamburgös utskjutande uddar i söder och väster", "Namnet Hamburgsund har ingen koppling till den tyska staden Hamburg", "Traditionen säger att under medeltiden fanns tingsplatsen för Viken vid södra delen Hamburgsundet", "Viken var det administrativa område som bestod av norra Bohuslän och det nu norska området runt Oslofjorden", "Hamburgsund omtalas redan 1585 som tullstation", "Under 1700-taletets sillperiod inbjöd det skyddade läget längs sundet till att bygga ett flertal trankokerier", "tog fart när befolkningen började bedriva fraktfart", "Under senare delen av 1800-talet fanns två stenhuggerier i Hamburgsund", "Hamburgsund var i början av 1900-talet ett av Bohusläns största skutsamhällen", "Hamburgsund är hemmahamn för en stor del av kommunens fiskeflotta", "Husen ligger i enkla rader på båda sidor om sundet" (läst 2026-09-27)
      'Hamburgsund i norra Bohuslän ligger på båda sidor om ett 130 meter brett sund, dels på fastlandet, dels på ön Hamburgö. Namnet har ingen koppling till den tyska staden Hamburg – förledet kommer från önamnet Hornbora, "den med horn försedda", som syftar på Hamburgös utskjutande uddar i söder och väster. Enligt traditionen fanns under medeltiden tingsplatsen för Viken vid sundets södra del; Viken var det administrativa område som bestod av norra Bohuslän och trakten runt Oslofjorden. Hamburgsund omtalas som tullstation redan 1585, och under 1700-talets sillperiod byggdes flera trankokerier längs sundet. På 1800-talet växte orten när befolkningen började med fraktfart, och i slutet av seklet fanns två stenhuggerier. I början av 1900-talet var Hamburgsund ett av Bohusläns största skutsamhällen, och i dag är orten hemmahamn för en stor del av kommunens fiskeflotta. Den äldre bebyggelsen ligger i enkla rader på båda sidor om sundet.',
      // KÄLLA: https://www.trafikverket.se/resa-och-trafik/farjetrafik/hamburgsundsleden/ — "Färjeledens längd är 130 meter och överfartstiden är tre minuter", "Linfärjan drivs genom en kabel som förser färjan med el", "Resan är avgiftsfri" ; https://www.vastsverige.com/en/tanum/produkter/hamburgsund/ — "Bovikens swimming area on Hamburgö has sandy beach, dock, diving tower and toilet", "The municipal swimming area at Norra Ejde Pluret is child friendly with a sandy beach, toilet and pier", "In Hamburgsund you can rent sea kayaks" (läst 2026-09-27)
      'Mellan fastlandet och Hamburgö går Trafikverkets linfärja, som får sin el genom en kabel; överfarten tar tre minuter och är avgiftsfri. På Hamburgö ligger badplatsen Boviken med sandstrand, brygga, hopptorn och toalett, och den kommunala badplatsen Norra Ejde Pluret är barnvänlig med sandstrand, toalett och brygga. I Hamburgsund går det också att hyra havskajak.',
      // KÄLLA: https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/kulturmiljoer/greby-gravfalt.html — "Strax norr om Grebbestad ligger Greby gravfält", "Greby gravfält ligger väster om Tanumshede i norra Bohuslän", "Det är Bohusläns största gravfält med nästan 200 gravar som ligger tätt, nästan på varandra", "Tvåhundra gravar ligger tätt, tätt i en ljungbevuxen västerslänt", "Gravarna består av 68 runda högar, 54 långhögar samt 47 runda och 12 ovala stensättningar", "Det finns 28 resta stenar på krönet av gravar", "Stenhällarna kan vara upp till fyra och en halv meter höga", "Ett tiotal av gravarna undersöktes 1873 av den blivande riksantikvarien Oscar Montelius", "Förutom gravurnor med brända ben fann man sländtrissor, glaspärlor och benkammar", "Fynden tyder på att Greby använts som begravningsplats på järnåldern, under tiden 200 till 600 år efter vår tideräknings början" (läst 2026-09-27)
      'Greby gravfält strax norr om Grebbestad, väster om Tanumshede, är Bohusläns största gravfält. Nästan 200 gravar ligger tätt i en ljungbevuxen västsluttning: 68 runda högar, 54 långhögar samt 47 runda och 12 ovala stensättningar. Särskilt för gravfältet är de 28 resta stenar som kröner gravhögar, några upp till fyra och en halv meter höga. Ett tiotal gravar undersöktes 1873 av Oscar Montelius, sedermera riksantikvarie, som fann gravurnor med brända ben, sländtrissor, glaspärlor och benkammar. Fynden tyder på att platsen användes som begravningsplats under järnåldern, 200–600 e.Kr.',
      // KÄLLA: https://www.tanum.se/kommunpolitik/kommunfakta/kommunenshistoria/ortsinformation/hamburgsund.4.7664b4813898b7df9844de1.html — "Strax söder om Hamburgsund ligger berget där Hornborgs slott låg", "Här finns en replik av en vikingaby, Hornbore by, och det arrangeras årligen, under augusti, Hornbore Ting", "Denna årliga manifestation av vikingatiden rymmer både vikingaspel och vikingamarknad", "uppbyggd i ett nedlagt stenbrott vid den norra infarten, bjuder sommartid besökaren på teater, musik och film", "På Slottefjordens yttre skär vid Sotefjorden, sydväst om Hamburgsund finns ett för Sverige unikt sjömärke, Saltskärs Käring", "som uppfördes år 1882, är en 12 meter hög båk i järn och trä, ritad av överfyringenjören Gustav von Heidenstam" ; https://www.vastsverige.com/en/tanum/produkter/hamburgsund/ — "was excavated at the beginning of the last century and among the findings the back of cannon, cannonballs, bullets and other weapons", "The findins show that the period of greatness of the castle was around 1450-1530", "Today, low grassy embankments are the only remains of what was once the Hornborg Castle", "Gerlesborgsskolan right next to the sea engaged in artistic education, short courses, open cultural activities, concerts, lectures and open art workshops for children" (läst 2026-09-27)
      'Strax söder om Hamburgsund ligger berget där borgen Hornborg låg. Den grävdes ut i början av 1900-talet, och bland fynden fanns bakstycket till en kanon, kanonkulor och andra vapen; fynden visar att borgens storhetstid var omkring 1450–1530. I dag återstår bara låga gräsbevuxna vallar. Här finns också Hornbore by, en kopia av en vikingaby, och varje år i augusti hålls Hornbore Ting med vikingaspel och vikingamarknad. I ett nedlagt stenbrott vid den norra infarten ligger friluftsscenen Scen på Bônn med teater, musik och film sommartid. Konstskolan Gerlesborgsskolan vid havet har konstutbildning, kortkurser, konserter, föreläsningar och öppna verkstäder för barn. På ett yttre skär sydväst om Hamburgsund står sjömärket Saltskärs Käring, en 12 meter hög båk i järn och trä från 1882, ritad av överfyringenjören Gustav von Heidenstam.',
    ],
    facts: {
      // KÄLLA: https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/4875__0__LINE__20260817__20261212__83be1ed8-a883-462d-b8ea-6f64e9b6df0c__4%2C0__2768580.pdf — "Tanumshede–Fjällbacka–Dingle–Håby", "Hamburgsund centrum", "Gäller 19 aug - 12 dec 2026" (läst 2026-09-27)
      travel_time: 'Ca 40 min med buss 875 från Tanumshede',
      // KÄLLA: https://www.tanum.se/kommunpolitik/kommunfakta/kommunenshistoria/ortsinformation/hamburgsund.4.7664b4813898b7df9844de1.html — "Hamburgsund var i början av 1900-talet ett av Bohusläns största skutsamhällen", "Hamburgsund är hemmahamn för en stor del av kommunens fiskeflotta" ; https://www.trafikverket.se/resa-och-trafik/farjetrafik/hamburgsundsleden/ — "Hamburgsundsleden går mellan Hamburgsund och Hamburgö i Norra Bohuslän" (läst 2026-09-27)
      character: 'Fiskehamn och sjöfartshistoria, linfärja till Hamburgö',
      // UPPSKATTNING: maj–september är Svallas bedömning; gästhamnens hamnkontor är öppet dagligen mitten av juni–slutet av augusti.
      season: 'Maj–september',
      // KÄLLA: https://www.vastsverige.com/en/tanum/accomodation/marinas/ — "50 berths in Hamburgsund and on Hamburgö in the strait" ; https://www.vastsverige.com/en/tanum/produkter/hamburgsund/ — "In Hamburgsund you can rent sea kayaks", "Bovikens swimming area on Hamburgö has sandy beach" ; https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/vaderoarna.html — "Det går turbåtar till Väderöarna från bland annat Fjällbacka och Hamburgsund" (läst 2026-09-27)
      best_for: 'Segling, bad, kajak, båtturer till Väderöarna',
    },
    facts_provenance: {
      travel_time: 'matt',
      character: 'matt',
      season: 'bedomning',
      best_for: 'matt',
    },
    activities: [
      // KÄLLA: https://www.vastsverige.com/en/tanum/accomodation/marinas/ — "50 berths in Hamburgsund and on Hamburgö in the strait" ; https://www.vastsverige.com/en/tanum/produkter/hamburgsund/ — "One part of the marina is located on the mainland and the other on the island Hamburgö" (läst 2026-09-27)
      { icon: '⛵', name: 'Segling', desc: 'Gästhamn med ett femtiotal platser, både på fastlandssidan och på Hamburgö.' },
      // KÄLLA: https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/kulturmiljoer/greby-gravfalt.html — "Det är Bohusläns största gravfält med nästan 200 gravar", "Fynden tyder på att Greby använts som begravningsplats på järnåldern, under tiden 200 till 600 år efter vår tideräknings början", "Strax norr om Grebbestad ligger Greby gravfält" (läst 2026-09-27)
      { icon: '🥾', name: 'Greby gravfält', desc: 'Bohusläns största gravfält – nästan 200 gravar från järnåldern, 200–600 e.Kr., strax norr om Grebbestad.' },
      // KÄLLA: https://www.vastsverige.com/en/tanum/produkter/hamburgsund/ — "Bovikens swimming area on Hamburgö has sandy beach, dock, diving tower and toilet" (läst 2026-09-27)
      { icon: '🏊', name: 'Bovikens badplats', desc: 'Badplats på Hamburgö med sandstrand, brygga, hopptorn och toalett.' },
    ],
    accommodation: [
      // KÄLLA: https://hamburgsundbedandbreakfast.se/ — "I Hamburgsunds centrum, granne med färjeläget, ligger vårt boende", "4 st lite större dubbelrum", "och 6 st dubbelrum", "har alla egen liten balkong, dusch och toalett, wi-fi och tv" ; https://www.vastsverige.com/en/tanum/produkter/hamburgsund-bed-and-breakfast/ — "Udden 1" (läst 2026-09-27)
      { name: 'Hamburgsund Bed and Breakfast', type: 'B&B', desc: 'Bed & breakfast i centrala Hamburgsund granne med färjeläget, Udden 1. Tio dubbelrum, alla med egen balkong, dusch och toalett.' },
      // KÄLLA: https://www.rorvikscamping.se/ — "Campingen ligger 1.5 km söder om kustsamhället Hamburgsund", "Vi erbjuder campingtomter för husvagn/husbil/tält, stugor, rum/vandrarhem med 24 bäddar samt säsongs- och båtplatser", "barnvänlig sandstrand" (läst 2026-09-27)
      { name: 'Rörvik Family Camping', type: 'Camping/Stugor', desc: 'Familjecamping 1,5 km söder om Hamburgsund med tomter för husvagn, husbil och tält, stugor, rum/vandrarhem med 24 bäddar och en barnvänlig sandstrand.' },
    ],
    getting_there: [
      // KÄLLA: https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/4875__0__LINE__20260817__20261212__83be1ed8-a883-462d-b8ea-6f64e9b6df0c__4%2C0__2768580.pdf — "Tanumshede–Fjällbacka–Dingle–Håby", "Tanumshede centrum", "Hamburgsund centrum", "Dingle station", "Gäller 19 aug - 12 dec 2026" (läst 2026-09-27)
      { method: 'Buss', from: 'Tanumshede', time: '40 min', desc: 'Västtrafiks buss 875 Tanumshede–Grebbestad–Fjällbacka–Hamburgsund–Dingle, cirka 40 minuter från Tanumshede centrum till Hamburgsund centrum. Vissa turer fortsätter till Dingle station.', icon: '🚌' },
      // KÄLLA: https://www.trafikverket.se/resa-och-trafik/farjetrafik/hamburgsundsleden/ — "Hamburgsundsleden går mellan Hamburgsund och Hamburgö i Norra Bohuslän", "Färjeledens längd är 130 meter och överfartstiden är tre minuter", "Resan är avgiftsfri" (läst 2026-09-27)
      { method: 'Linfärja', from: 'Hamburgsund', time: '3 min', desc: 'Trafikverkets linfärja över sundet till Hamburgö. Avgiftsfri.', icon: '⛴' },
    ],
    harbors: [
      // KÄLLA: https://gasthamnsbolaget.se/en/guest-harbours-in-bohuslan/hamburgsund-guest-harbour/ — "one on the mainland south of the ferry between the fishing harbor and the marina, and one on Hamburgö right by the ferry landing", "There are also guest berths at Hjalmars Kaj", "on the mainland side there is a laundry room" ; https://www.vastsverige.com/en/tanum/accomodation/marinas/ — "50 berths in Hamburgsund and on Hamburgö in the strait. Toilet, shower, washing machine, dryer, and shore power", "Operated by Gästhamnsbolaget" (läst 2026-09-27)
      { name: 'Hamburgsunds Gästhamn', desc: 'Gästhamn med ett femtiotal platser vid sundet: en gästbrygga på fastlandet söder om färjan och en på Hamburgö vid färjeläget, samt platser vid Hjalmars kaj. Drivs av Gästhamnsbolaget.', fuel: false, service: ['El', 'Dusch', 'Toalett', 'Tvättmaskin', 'Torktumlare'] },
    ],
    restaurants: [
      // KÄLLA: https://www.hjalmars.se/ — "Välkommen till Hjalmars i Hamburgsund", "Med en fantastisk utsikt över sundet", "Smaker från havet i en oslagbar miljö", "Strandvägen 8, 457 45 Hamburgsund", "sista öppetdagen sön 27 sept" ; https://gasthamnsbolaget.se/en/guest-harbours-in-bohuslan/hamburgsund-guest-harbour/ — "There are also guest berths at Hjalmars Kaj" (läst 2026-09-27)
      { name: 'Hjalmars Bar & Brygga', type: 'Restaurang', desc: 'Säsongsöppen restaurang och bar vid Hjalmars kaj i Hamburgsund, Strandvägen 8, med utsikt över sundet och mat från havet.' },
    ],
    // KÄLLA: https://www.trafikverket.se/resa-och-trafik/farjetrafik/hamburgsundsleden/ — "överfartstiden är tre minuter", "Resan är avgiftsfri" ; https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/vaderoarna.html — "Det går turbåtar till Väderöarna från bland annat Fjällbacka och Hamburgsund" ; https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/kulturmiljoer/greby-gravfalt.html — "Hänvisningsskylt finns från vägen mellan Tanumshede och Grebbestad", "En parkeringsplats ligger i anslutning till gravfältet" ; https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/4875__0__LINE__20260817__20261212__83be1ed8-a883-462d-b8ea-6f64e9b6df0c__4%2C0__2768580.pdf — "Greby gård" (läst 2026-09-27)
    tips: ['Linfärjan till Hamburgö är avgiftsfri och överfarten tar tre minuter.', 'Turbåtar går till naturreservatet Väderöarna från bland annat Hamburgsund.', 'Greby gravfält är skyltat från vägen mellan Tanumshede och Grebbestad och har parkering intill; buss 875 stannar vid hållplatsen Greby gård.'],
    related: ['fjallbacka', 'grebbestad', 'kosterhavet'],
    // KÄLLA: https://gasthamnsbolaget.se/en/guest-harbours-in-bohuslan/hamburgsund-guest-harbour/ — "A calm and family-friendly guest harbour" ; https://www.tanum.se/kommunpolitik/kommunfakta/kommunenshistoria/ortsinformation/hamburgsund.4.7664b4813898b7df9844de1.html — "Hamburgsund var i början av 1900-talet ett av Bohusläns största skutsamhällen" (läst 2026-09-27)
    tags: ['gästhamn', 'segling', 'lugnt', 'historia'],
    // KÄLLA: https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/kulturmiljoer/greby-gravfalt.html — "Det är Bohusläns största gravfält med nästan 200 gravar", "Det finns 28 resta stenar på krönet av gravar", "Stenhällarna kan vara upp till fyra och en halv meter höga", "Fynden tyder på att Greby använts som begravningsplats på järnåldern, under tiden 200 till 600 år efter vår tideräknings början" (läst 2026-09-27)
    did_you_know: 'Greby gravfält norr om Grebbestad är Bohusläns största gravfält – nästan 200 gravar från järnåldern, 200–600 e.Kr. Det ovanligaste är de 28 resta stenar som kröner gravhögar; några är upp till fyra och en halv meter höga.',
    seasonal: {
      open: 'Maj–September',
      // UPPSKATTNING: peak/best och months är Svallas bedömning.
      peak: 'Juli',
      best: 'Juni eller September',
      // KÄLLA: https://www.trafikverket.se/resa-och-trafik/farjetrafik/hamburgsundsleden/ — "överfartstiden är tre minuter", "Resan är avgiftsfri" ; https://www.vastsverige.com/en/tanum/produkter/hamburgsund/ — "The marina office is open daily from mid-June to late August" ; https://www.tanum.se/kommunpolitik/kommunfakta/kommunenshistoria/ortsinformation/hamburgsund.4.7664b4813898b7df9844de1.html — "det arrangeras årligen, under augusti, Hornbore Ting" (läst 2026-09-27)
      bestReason: 'Juni och september ligger utanför högsäsongen i juli. Linfärjan till Hamburgö är avgiftsfri och tar tre minuter, och gästhamnens hamnkontor öppnar i mitten av juni. Vill man se vikingamarknaden Hornbore Ting får man komma i augusti.',
      // KÄLLA: https://www.vastsverige.com/en/tanum/produkter/hamburgsund/ — "The marina office is open daily from mid-June to late August" (läst 2026-09-27)
      warning: 'Gästhamnens hamnkontor har öppet dagligen från mitten av juni till slutet av augusti.',
      months: ['off','off','off','off','limited','open','peak','open','open','limited','off','off'],
    },
  },
  {
    slug: 'karingon',
    name: 'Käringön',
    region: 'bohuslan',
    regionLabel: 'Bohuslän',
    emoji: '🏘',
    // KÄLLA: https://www.vastsverige.com/en/orust/products/karingon/ — "Narrow streets with white wooden houses", "Traffic-free island" ; https://www.destinationkaringon.online/upplev — "Käringöns gästhamn ligger mitt i samhället" (läst 2026-09-27)
    tagline: 'Bilfri ö med vita trähus, smala gator och gästhamn mitt i byn.',
    description: [
      // KÄLLA: https://www.destinationkaringon.online/ — "Det finns därför inga bilar, mopeder eller cyklar", "Nästan alla öns 280 hus är byggda före år 1920", "det finns knappt 70 personer som är bosatta här" ; https://www.vastsverige.com/en/orust/products/karingon/ — "the island was permanently populated as early as 1596", "reaching a population of more than 300 inhabitants. This was to double in the 19th century", "a small stone tower or cairn used as a navigation beacon", "In the middle of the barren island is a church, surrounded by lawns and colourful flowerbeds" ; https://www.karingon.se/om-k%C3%A4ring%C3%B6n — "Ön fick fast bosättning redan 1596, då några unga fiskarfamiljer från Orust", "år 1912 nåddes toppnoteringen med hela 662 personer kyrkobokförda här", "Öborna kunde nu bygga en egen kyrka som invigdes 1796" (läst 2026-09-27)
      'Käringön är bilfri – här finns inga bilar, mopeder eller cyklar. Öns gator är smala och kantade av vita trähus, och nästan alla de 280 husen är byggda före 1920. Mitt på ön ligger kyrkan från 1796, omgiven av gräsmattor och planteringar. Ön befolkades permanent 1596 av fiskarfamiljer från Orust. Under 1700-talets sillperiod passerade folkmängden 300, under 1800-talet fördubblades den, och 1912 var 662 personer skrivna här. I dag bor knappt 70 personer på ön året runt. Namnet kommer troligen av käring i betydelsen litet stentorn eller kummel som användes som sjömärke.',
      // KÄLLA: https://www.vastsverige.com/en/orust/products/karingon/ — "people buying goods in the well-stocked grocery store", "at the fishmonger", "in the small summer shops", "There are cafés and eateries on the quayside" ; https://www.karingon.se/om-k%C3%A4ring%C3%B6n — "Matbutiken som idag är en ICA ToGo, har öppet hela året och är mycket välsorterad" ; https://www.orust.se/uppleva-och-gora/gasthamnar/karingons-gasthamn — "125 platser.", "Djup cirka 4 meter.", "Servicebyggnad med toalett, dusch, tvättmaskin och torktumlare.", "Sugtömningsstation där fritidsbåtar kan tömma sina latrintankar, mellan 1 april och 31 oktober.", "Käringöns hamn är öppen 1 april - 30 september.", "Förhandsbokning av gästplatser sker via Dockspot.", "Hamnen är kontantfri." (läst 2026-09-27)
      'Hamnen är öns nav. Längs kajen finns en välsorterad matbutik som har öppet hela året, fiskhandel, små sommaröppna butiker, kaféer och restauranger. Gästhamnen är öppen 1 april–30 september och har 125 platser, cirka fyra meters djup, servicebyggnad med toalett, dusch, tvättmaskin och torktumlare samt sugtömningsstation 1 april–31 oktober. Hamnen är kontantfri, och gästplatser kan förbokas via Dockspot.',
      // KÄLLA: https://www.vastsverige.com/en/orust/products/karingon/ — "Öviken, which is closest to the harbour, has pontoon piers and a trampoline for older children", "The south side of the island has a traditional bathing house with small piers, steps into the sea", "Barnbadet is also on the south coast and offers child-friendly swimming with its shallow cove and soft sandy beach", "Friluftsbadet, lies on the south-west tip of the island and has separate bathing times for men and women" (läst 2026-09-27)
      'Bad finns på flera håll. Öviken närmast hamnen har pontonbryggor och trampolin för större barn. På sydsidan ligger ett traditionellt badhus med små bryggor och badstegar, och där finns också Barnbadet, en grund vik med mjuk sandstrand. Friluftsbadet på öns sydvästra spets är ett nakenbad med separata tider för män och kvinnor.',
      // KÄLLA: https://www.vastsverige.com/en/orust/things-to-do/boating/car-less-islands/ — "line 381, operate every day all year round" ; https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6381__0__LINE__20260915__20261031__de9ca77a-74b2-4c80-a07f-0e9d5aafbcd8__0%2C0__2790296.pdf — "Tuvesvik–Gullholmen–Käringön", "Gäller 15 sept - 31 okt 2026" ; https://www.vastsverige.com/orust/produkter/farja-tuvesvik-gullholmen-karingon/ — "Endast personfärja.", "Du betalar parkeringen med kort eller sms. Det finns ingen kontantbetalning." ; https://www.destinationkaringon.online/planera-ditt-bes%C3%B6k — "Eftersom det inte går att förboka plats rekommenderar vi att vara ute i god tid, särskilt under sommarmånaderna", "Under sommaren erbjuds även fasta avgångar mellan Hälleviksstrand och Käringön. Överfarten tar cirka 10–15 minuter" (läst 2026-09-27)
      // Avläst måndag–fredag: Tuvesvik 07.00 → Käringön 07.35 (direkt), 08.30 → 09.10 och 20.30 → 21.15 (via Gullholmen).
      'Käringön nås med Västtrafiks personfärja linje 381 från Tuvesvik på västra Orust, alla dagar året runt. De flesta turer angör Gullholmen på vägen, och resan till Käringön tar 35–45 minuter. Plats kan inte förbokas, så var ute i god tid sommartid. Under sommaren går också fasta turer från Hälleviksstrand som tar 10–15 minuter. Bilfärja finns inte; bilen lämnas i Tuvesvik, där parkeringen betalas med kort eller sms.',
      // KÄLLA: https://www.orust.se/bygga-bo-och-miljo/bygga-nytt-andra-eller-riva/kulturhistoriska-byggnader-kulturmiljoer — "Käringön, Mollösund, Gullholmen och Härmanö är exempel på platser som ligger inom riksintresse för kulturmiljövården", "De flesta byggnader i dessa områden är q-märkta och detaljplanen innehåller strikta regler för hur byggnationer får utföras", "Generella varsamhetskrav och förvanskningsförbud enligt Plan- och bygglagen gäller även utanför de orter där byggnaderna är skyddsmärkta", "I de skyddade miljöerna kan bygglov krävas för åtgärder som i normala fall inte är bygglovspliktiga", "Till exempel staket, altaner, trädäck, Attefallsåtgärder eller solceller." (läst 2026-09-27)
      'Käringön är ett av de områden som ligger inom riksintresse för kulturmiljövården. Orust kommun anger att de flesta byggnaderna i dessa miljöer är q-märkta och att detaljplanen har strikta regler för hur man får bygga; varsamhetskrav och förvanskningsförbud enligt plan- och bygglagen gäller även utanför de orter där byggnaderna är skyddsmärkta. I de skyddade miljöerna kan bygglov krävas för åtgärder som annars är bygglovsbefriade, som staket, altaner, trädäck, attefallsåtgärder och solceller.',
    ],
    facts: {
      // KÄLLA: https://www.destinationkaringon.online/ — "det finns knappt 70 personer som är bosatta här" ; https://www.karingon.se/om-k%C3%A4ring%C3%B6n — "Idag är det ett 60-tal bofasta" (läst 2026-09-27)
      population: 'knappt 70 bofasta',
      // KÄLLA: https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6381__0__LINE__20260915__20261031__de9ca77a-74b2-4c80-a07f-0e9d5aafbcd8__0%2C0__2790296.pdf — "Tuvesvik–Gullholmen–Käringön", "Gäller 15 sept - 31 okt 2026" ; https://www.vastsverige.com/orust/produkter/farja-tuvesvik-gullholmen-karingon/ — "Båtresan tar cirka 35 minuter från Tuvesvik till Käringön" ; https://www.destinationkaringon.online/planera-ditt-bes%C3%B6k — "resan tar drygt 40 minuter" (läst 2026-09-27)
      travel_time: '35–45 min båt från Tuvesvik',
      // KÄLLA: https://www.orust.se/bygga-bo-och-miljo/bygga-nytt-andra-eller-riva/kulturhistoriska-byggnader-kulturmiljoer — "De flesta byggnader i dessa områden är q-märkta" ; https://www.vastsverige.com/orust/produkter/karingon/ — "Käringön har en lång historia av fiske i alla dess former" (läst 2026-09-27)
      character: 'Bilfri fiskeby med q-märkta trähus',
      // KÄLLA: https://www.karingon.se/om-k%C3%A4ring%C3%B6n — "Säsongen är lång och sträcker sig från Påsk och fram till mitten av december" ; https://www.orust.se/uppleva-och-gora/gasthamnar/karingons-gasthamn — "Käringöns hamn är öppen 1 april - 30 september." (läst 2026-09-27)
      season: 'Påsk–mitten av december (gästhamnen april–september)',
      best_for: 'Promenad, bad, gästhamn',
    },
    facts_provenance: {
      population: 'matt',
      travel_time: 'matt',
      character: 'bedomning',
      season: 'matt',
      best_for: 'bedomning',
    },
    activities: [
      // KÄLLA: https://www.vastsverige.com/en/orust/products/karingon/ — "Narrow streets with white wooden houses" ; https://www.vastsverige.com/orust/produkter/karingon/ — "Vid öns sydvästra spets kan du hitta Lotsutkiken som är en gammal lotsbostad på 10 kvadratmeter" ; https://www.karingon.se/om-k%C3%A4ring%C3%B6n — "Det första som möter dig är statyn", "Stadigt står hon på Skeppersholme" (läst 2026-09-27)
      { icon: '🚶', name: 'Promenad runt ön', desc: 'Smala gator mellan vita trähus, bilfritt hela vägen. På Skeppersholme står statyn Käringen, och vid öns sydvästra spets Lotsutkiken, en gammal lotsbostad på 10 kvadratmeter.' },
      // KÄLLA: https://www.vastsverige.com/orust/produkter/farja-tuvesvik-gullholmen-karingon/ — "5 minuter till Härmanö/Gullholmen" ; https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6381__0__LINE__20260915__20261031__de9ca77a-74b2-4c80-a07f-0e9d5aafbcd8__0%2C0__2790296.pdf — "Gullholmen hamnen", "Gullholmen piren" (läst 2026-09-27)
      { icon: '⛵', name: 'Båtutflykter', desc: 'Samma personfärja, linje 381, trafikerar också Gullholmen och Härmanö — 5 minuter från Tuvesvik.' },
      // KÄLLA: https://www.vastsverige.com/en/orust/products/karingon/ — "Öviken, which is closest to the harbour, has pontoon piers and a trampoline", "Barnbadet is also on the south coast", "Friluftsbadet, lies on the south-west tip of the island" (läst 2026-09-27)
      { icon: '🏊', name: 'Bad', desc: 'Öviken med pontonbryggor och trampolin, Barnbadet med sandstrand på sydsidan och Friluftsbadet på sydvästra spetsen.' },
    ],
    accommodation: [
      // KÄLLA: https://www.karingon.se/ — "Våra 21 rum", "två enkelrum, fyra dubbelrum, sju dubbelrum med balkong, två dubbelrum deluxe med balkong, två trebäddsrum samt fyra familjerum/juniorsviter med stora terrasser", "Alla rum har dusch och toalett och frukost ingår alltid i priset", "Adress: Skeppersholme 127" ; https://www.karingon.se/hundv%C3%A4nlig-destination — "Vi erbjuder möjligheten att ta med hunden i alla våra rumskategorier" (läst 2026-09-27)
      { name: 'Hotell Käringön', type: 'Hotell', desc: 'Hotell på Skeppersholme med 21 rum, från enkelrum till familjerum och juniorsviter med terrass. Alla rum har dusch och toalett, frukost ingår, och hund får följa med i alla rumskategorier. Restaurang och bar i huset.' },
      // KÄLLA: https://www.lotshotellet.com/ — "Lotshotellet har fått sitt namn från den lotsstation som funnits på Käringön i över 300 år", "Alla våra fina rum har eget badrum med golvvärme", "fri tillgång till vår egen badbrygga och bastu med utsikt över havet", "Under vintern håller vi stängt" (läst 2026-09-27)
      { name: 'Lotshotellet', type: 'Hotell', desc: 'Litet badhotell uppkallat efter öns lotsstation. Alla rum har eget badrum, frukost ingår, och gästerna har egen badbrygga och bastu med havsutsikt. Öppet vår, sommar och höst; stängt på vintern.' },
      // KÄLLA: https://www.petersonskrog.se/boende — "Under vår, höst och vinter finns det möjlighet att bo i vårt vandrarhem som ligger i direkt anslutning till krogen", "Boendet har totalt 10 bäddar, uppdelat på 5 rum", "Ni delar dusch, toalett och kök", "Under juni, juli och augusti kan ni inte bo hos oss" (läst 2026-09-27)
      { name: 'Petersons Krog – vandrarhem', type: 'Vandrarhem', desc: 'Vandrarhem i anslutning till Petersons Krog med 10 bäddar i fem rum och delad dusch, toalett och kök. Kan bokas vår, höst och vinter, men inte juni–augusti.' },
    ],
    getting_there: [
      // KÄLLA: https://www.vastsverige.com/en/orust/things-to-do/boating/car-less-islands/ — "line 381, operate every day all year round", "there is a bicycle ban on Käringön" ; https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6381__0__LINE__20260915__20261031__de9ca77a-74b2-4c80-a07f-0e9d5aafbcd8__0%2C0__2790296.pdf — "Tuvesvik–Gullholmen–Käringön", "Gäller 15 sept - 31 okt 2026" ; https://www.vastsverige.com/orust/produkter/farja-tuvesvik-gullholmen-karingon/ — "Du betalar parkeringen med kort eller sms. Det finns ingen kontantbetalning.", "Kom i god tid då parkering för besökare ligger längre bort från färjan." (läst 2026-09-27)
      { method: 'Bil + passagerarbåt', from: 'Göteborg', time: '', desc: 'Kör till Tuvesvik på västra Orust och parkera där (kort eller sms, inga kontanter). Västtrafiks personfärja linje 381 går alla dagar året runt, oftast via Gullholmen, till Käringön; båtresan tar 35–45 minuter. Cykel får inte användas på Käringön.', icon: '⛴', url: 'https://www.vasttrafik.se/reseplanering/tidtabeller/linje/9011014638100000/' },
      // KÄLLA: https://www.destinationkaringon.online/planera-ditt-bes%C3%B6k — "Under sommaren erbjuds även fasta avgångar mellan Hälleviksstrand och Käringön. Överfarten tar cirka 10–15 minuter", "För dig som vill komma fram snabbare eller boka din resa i förväg finns möjlighet att resa med båttaxi från fastlandet" (läst 2026-09-27)
      { method: 'Båt från Hälleviksstrand (sommar)', from: 'Hälleviksstrand (Orust)', time: '10–15 min', desc: 'Under sommaren går fasta avgångar mellan Hälleviksstrand och Käringön. Den som vill boka resan i förväg kan också ta båttaxi från fastlandet.', icon: '⛴' },
    ],
    harbors: [
      // KÄLLA: https://www.orust.se/uppleva-och-gora/gasthamnar/karingons-gasthamn — "125 platser.", "Djup cirka 4 meter.", "Käringöns hamn är öppen 1 april - 30 september.", "Servicebyggnad med toalett, dusch, tvättmaskin och torktumlare.", "Sugtömningsstation där fritidsbåtar kan tömma sina latrintankar, mellan 1 april och 31 oktober.", "Hamnen är kontantfri.", "Förhandsbokning av gästplatser sker via Dockspot.", "El - undvik att använda alla elapparater i båten samtidigt" ; https://www.destinationkaringon.online/upplev — "Käringöns gästhamn ligger mitt i samhället" (läst 2026-09-27)
      { name: 'Käringöns gästhamn', desc: 'Gästhamn mitt i samhället med 125 platser och cirka 4 meters djup, öppen 1 april–30 september. Servicebyggnad med toalett, dusch, tvättmaskin och torktumlare; sugtömning 1 april–31 oktober. Kontantfri hamn, gästplatser kan förbokas via Dockspot.', fuel: false, service: ['El', 'Dusch', 'Toalett', 'Tvättmaskin', 'Sugtömning'] },
    ],
    restaurants: [
      // KÄLLA: https://www.karingon.se/restaurang — "på vår stora, härliga uteservering", "Restaurangen är öppen varje dag under sommaren", "Övriga året har vi öppet på förfrågan för gruppbokningar samt de flesta fredagarna", "Restaurangen kan ta cirka 70 sittande gäster" ; https://www.karingon.se/ — "Restaurant Käringöns Brygga" ; https://www.destinationkaringon.online/%C3%A4ta-dricka — "Här serveras bland annat blåmusslor från vattnen kring Orust och havskräftor från lokala fiskare" (läst 2026-09-27)
      { name: 'Käringöns Brygga', type: 'Restaurang', desc: 'Hotell Käringöns restaurang och bar på Skeppersholme med stor uteservering och plats för cirka 70 gäster. Öppet varje dag på sommaren, resten av året de flesta fredagar och för grupper på förfrågan. På menyn bland annat blåmusslor från vattnen kring Orust och havskräftor från lokala fiskare.' },
      // KÄLLA: https://www.destinationkaringon.online/%C3%A4ta-dricka — "Menyn hämtar inspiration från havet och säsongens råvaror, med fisk och skaldjur i huvudrollen", "Självklart finns även alternativ för den som föredrar kött eller vegetariska rätter", "Petersons Krog har öppet helger från påsk till jul samt dagligen under sommarsäsongen" ; https://www.petersonskrog.se/ — "Är ni ett större sällskap, d.v.s. 12 personer eller fler", "man kan äta både hummersupé i oktober och julbord från sent november hos oss" ; https://www.petersonskrog.se/hummerfest — "3 lördagskvällar i oktober serverar vi en 4-rättersmeny med fokus på svensk hummer", "Datum för hummersupén 2026 är" (läst 2026-09-27)
      { name: 'Petersons Krog', type: 'Krog', desc: 'Krog med fisk och skaldjur i huvudrollen och alternativ för den som vill ha kött eller vegetariskt. Öppet dagligen under sommaren och helger från påsk till jul, med hummersupé tre lördagar i oktober och julbord från slutet av november. Sällskap om 12 personer eller fler väljer sällskapsmeny.' },
      // KÄLLA: https://www.lotshotellet.com/creperiet — "På Crêperiet på Lotshotellet erbjuder vi läckra crêpes och galetter", "Vi har också ett stort urval av fransk kvalitetscider, goda viner", "i eftermiddagssolen i bästa hamnläge", "STÄNGT FÖR SÄSONGEN 2026" (läst 2026-09-27)
      { name: 'Crêperiet', type: 'Crêperie', desc: 'Crêperie på Lotshotellet i hamnen med galetter, söta crêpes, fransk cider och vin. Säsongsöppet.' },
      // KÄLLA: https://www.destinationkaringon.online/%C3%A4ta-dricka — "Längst ut i havsbandet, med utsikt mot Måseskärs fyr, ligger Karingo – en unik ostronbar", "Karingo erbjuder även uppvärmda havsvattenbad", "Anläggningen har egen brygga och kan nås med båt, eller via transport från Käringön med båt eller helikopter", "Säsongsöppet från mitten av mars till juni samt från mitten av augusti till december" ; http://www.karingo.com/ — "pinfärska ostron, kall champagne", "varm badtunna och underbar utsikt till Måseskärs fyr" ; https://www.vastsverige.com/orust/produkter/karingon/ — "Karingo öppet för grupper stora delar av året men stängt under högsommaren" (läst 2026-09-27)
      { name: 'Karingo', type: 'Ostronbar', desc: 'Ostronbar med utsikt mot Måseskärs fyr: ostron, champagne och uppvärmda havsvattenbad. Anläggningen har egen brygga och nås med båt från Käringön. Öppet för grupper från mitten av mars till juni och från mitten av augusti till december, stängt under högsommaren.' },
    ],
    tips: [
      // KÄLLA: https://www.orust.se/uppleva-och-gora/gasthamnar/karingons-gasthamn — "125 platser.", "Sugtömningsstation där fritidsbåtar kan tömma sina latrintankar, mellan 1 april och 31 oktober." (läst 2026-09-27)
      'Gästhamnen har 125 platser och sugtömning 1 april–31 oktober.',
      // KÄLLA: https://www.destinationkaringon.online/planera-ditt-bes%C3%B6k — "Eftersom det inte går att förboka plats rekommenderar vi att vara ute i god tid" ; https://www.vastsverige.com/orust/produkter/farja-tuvesvik-gullholmen-karingon/ — "Kom i god tid då parkering för besökare ligger längre bort från färjan." (läst 2026-09-27)
      'Plats på färjan kan inte förbokas, och besöksparkeringen i Tuvesvik ligger en bit från färjeläget – kom i god tid, särskilt på sommaren.',
      // KÄLLA: https://www.vastsverige.com/en/orust/things-to-do/boating/car-less-islands/ — "there is a bicycle ban on Käringön" ; https://www.destinationkaringon.online/ — "Det finns därför inga bilar, mopeder eller cyklar" (läst 2026-09-27)
      'Cykeln får stå kvar på fastlandet – på Käringön råder cykelförbud.',
      // KÄLLA: https://www.destinationkaringon.online/planera-ditt-bes%C3%B6k — "Många av öns restauranger, hotell och butiker ligger på Skeppersholme, dit en brant backe leder", "Stora delar av samhället är möjliga att nå med rullstol" (läst 2026-09-27)
      'Många av öns restauranger, hotell och butiker ligger på Skeppersholme, dit en brant backe leder. Stora delar av samhället går att nå med rullstol.',
    ],
    related: ['mollosund', 'orust', 'tjorn'],
    tags: ['bilfri', 'fiskeläge', 'gästhamn', 'riksintresse'],
    // KÄLLA: https://www.vastsverige.com/orust/produkter/karingon/ — "På Käringön föddes fiskarsonen Olof Knape år 1664", "Olof gick till sjöss åtta år gammal", "År 1700 blev han handplockad som amiralitetskapten av kung Karl XII", "främst var han involverad i kaparverksamheten som pågick", "Olof blev så småningom adlad till Olof Strömstierna, och namnet återfinns idag på flera platser på Käringön" (läst 2026-09-27)
    did_you_know: 'På Käringön föddes fiskarsonen Olof Knape 1664. Han gick till sjöss som åttaåring, blev år 1700 amiralitetskapten under Karl XII och ägnade sig främst åt kaparverksamhet. Så småningom adlades han till Olof Strömstierna – ett namn som finns kvar på flera platser på ön.',
    // KÄLLA: https://www.vasttrafik.se/resa-med-oss/under-resan/husdjur/ — "Ha djuret i koppel, bur eller väska", "Vid resa med båt ska husdjur vara på styrbord" ; https://www.karingon.se/hundv%C3%A4nlig-destination — "Vi erbjuder möjligheten att ta med hunden i alla våra rumskategorier", "För din hunds vistelse tillkommer en avgift", "flera av öns restauranger och uteserveringar välkomnar hundar" (läst 2026-09-27)
    dog_notes: 'Hunden får följa med på Västtrafiks färja i koppel, bur eller väska och ska vara på styrbordssidan. Hotell Käringön tar emot hund i alla rumskategorier mot en avgift och skriver att flera av öns restauranger och uteserveringar välkomnar hundar.',
    // KÄLLA: https://www.karingon.se/om-k%C3%A4ring%C3%B6n — "Säsongen är lång och sträcker sig från Påsk och fram till mitten av december. Den lugnaste perioden är januari till mars." ; https://www.destinationkaringon.online/ — "kanske allra bäst under för- och eftersäsong" ; https://www.destinationkaringon.online/%C3%A4ta-dricka — "Petersons Krog har öppet helger från påsk till jul samt dagligen under sommarsäsongen" ; https://www.karingon.se/restaurang — "Restaurangen är öppen varje dag under sommaren" ; https://www.orust.se/uppleva-och-gora/gasthamnar/karingons-gasthamn — "Käringöns hamn är öppen 1 april - 30 september.", "Det finns en HWC som är öppen året om. Denna hittar du i det stora servicehuset på Skepparsholme." (läst 2026-09-27)
    seasonal: {
      open: 'Påsk–mitten av december (gästhamnen april–september)',
      peak: 'Juli–augusti',
      best: 'Försäsong och eftersäsong',
      bestReason: 'Öns företagarförening skriver att Käringön kanske är allra bäst under för- och eftersäsong. Säsongen sträcker sig från påsk till mitten av december, och på sommaren har restaurangerna öppet varje dag.',
      warning: 'Januari–mars är den lugnaste perioden. Gästhamnen är stängd oktober–mars, men en handikapptoalett i servicehuset på Skeppersholme är öppen året runt.',
      months: ['off','off','off','limited','limited','open','peak','peak','open','limited','limited','limited'],
    },
  },
  {
    slug: 'orust',
    name: 'Orust',
    region: 'bohuslan',
    regionLabel: 'Bohuslän',
    emoji: '🏝',
    // KÄLLA: Orust kommun, Kommunfakta — västkustens största ö — https://www.orust.se/kommun-och-politik/kommunfakta (läst 2026-09-16)
    tagline: 'Västkustens största ö, med varvstradition och lång kustlinje.',
    description: [
      // KÄLLA: Orust kommun, Kommunfakta — drygt 15 000 invånare och cirka 40 000 sommartid, cirka 2,8 mil i väst-östlig och cirka 2,5 mil i nord-sydlig riktning, västkustens största ö — https://www.orust.se/kommun-och-politik/kommunfakta (läst 2026-09-16)
      // KÄLLA: Hallberg-Rassy, Varvets historia — Harry Hallberg öppnade eget varv i Kungsviken på Orust 1943, nya lokaler byggdes i Ellös i mitten av 1960-talet, samgående med Christoph Rassys varv 1972 till Hallberg-Rassy Varvs AB, omkring 9 800 levererade båtar — https://www.hallberg-rassy.com/sv/varvet/varvets-historia (läst 2026-09-16)
      // KÄLLA: Najad Yachts, egen webbplats — produktionen flyttad tillbaka till Henån på Orust efter förvärvet av Orust Yacht Service, meddelat 2 november 2022 — https://najad.se/najad-yachts-moves-production-back-to-orust-following-the-acquisition-of-orust-yacht-service/ (läst 2026-09-16)
      // KÄLLA: https://www.orust.se/kommun-och-politik/kommunfakta — "Orust kommun har drygt 15 000 invånare.", "Själva Orust är västkustens största ö.", "kanske antalet människor i kommunen närmar sig 40 000 personer" (läst 2026-09-27)
      // KÄLLA: https://www.orust.se/jobb-och-foretagande/foretag-stod-och-radgivning/fakta-om-naringslivet — "är Sveriges tredje största ö" (läst 2026-09-27)
      // KÄLLA: https://www.scb.se/contentassets/7edbcfbb3a87470387d8c95868ecaf04/mi0812_2020a01_sm_mi50sm2301.pdf — "Tio-i-topp. Statistiska öar i Sverige, efter areal i hektar.", "Gotland Gotlands län 296 800", "Öland Kalmar län 134 300", "Södertörn Stockholms län 120 700", "Orust Västra Götalands län 34 400" (läst 2026-09-27)
      'Orust är västkustens största ö, cirka 28 kilometer i väst-östlig och 25 kilometer i nord-sydlig riktning. Orust kommun kallar den Sveriges tredje största ö; i SCB:s statistik, där även Södertörn räknas som ö, kommer Orust på fjärde plats med 34 400 hektar, efter Gotland, Öland och Södertörn. Kommunen har drygt 15 000 invånare, och sommartid kan antalet människor i kommunen närma sig 40 000. Ön har en stark varvstradition. Hallberg-Rassy har sina rötter i det varv Harry Hallberg grundade i Kungsviken 1943; verksamheten flyttade till Ellös i mitten av 1960-talet. Efter samgåendet med Christoph Rassys varv 1972 drivs det som Hallberg-Rassy Varvs AB och har levererat omkring 9 800 båtar. Najad flyttade tillbaka sin produktion till Henån 2022.',
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Mollösund — sydvästra spetsen av Orust, sillfisket från 1500-talet och Bohusläns främsta fiskecentrum inom hundra år, fyren på Gallebergs udde, träskulpturen av fiskarkvinna med barn vid Klockeberget, kyrkan färdig 1866, väderkvarnen från 1700-talet i bruk till 1929, hamnen byggd under andra världskriget — https://www.vastsverige.com/en/orust/products/mollosund/ (läst 2026-09-16)
      // KÄLLA: Orust kommun, Kommunfakta — Henån är centralort med cirka 3 000 invånare — https://www.orust.se/kommun-och-politik/kommunfakta (läst 2026-09-16)
      'Mollösund ligger på Orusts sydvästra spets. Sillfisket började här på 1500-talet, och inom hundra år var Mollösund Bohusläns främsta fiskecentrum. Fyra landmärken präglar byn: fyren på Gallebergs udde, träskulpturen av en fiskarkvinna med barn vid utsiktsplatsen Klockeberget, kyrkan som stod färdig 1866 och väderkvarnen från 1700-talet, som var i bruk ända till 1929. Nuvarande hamn byggdes under andra världskriget. Henån är kommunens centralort med omkring 3 000 invånare.',
      // KÄLLA: Orust kommun, Kulturhistoriska byggnader och kulturmiljöer — Käringön, Mollösund, Gullholmen och Härmanö är exempel på platser som ligger inom riksintresse för kulturmiljövården, de flesta byggnaderna q-märkta med strikta detaljplaneregler, varsamhetskrav och förvanskningsförbud enligt plan- och bygglagen även utanför de orter där byggnaderna är skyddsmärkta — https://www.orust.se/bygga-bo-och-miljo/bygga-nytt-andra-eller-riva/kulturhistoriska-byggnader-kulturmiljoer (läst 2026-09-16)
      'Käringön, Mollösund, Gullholmen och Härmanö är enligt Orust kommun exempel på platser som ligger inom riksintresse för kulturmiljövården. De flesta byggnaderna i dessa områden är q-märkta och detaljplanen innehåller strikta regler för hur byggnationer får utföras. Generella varsamhetskrav och förvanskningsförbud enligt plan- och bygglagen gäller även utanför de orter där byggnaderna är skyddsmärkta.',
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Färja Tuvesvik–Gullholmen–Käringön — Västtrafiks personfärja linje 381 till Gullholmen, Härmanö och Käringön — https://www.vastsverige.com/orust/produkter/farja-tuvesvik-gullholmen-karingon/ (läst 2026-09-16)
      'Från Tuvesvik går Västtrafiks personfärja linje 381 ut till Gullholmen, Härmanö och Käringön.',
      // KÄLLA: Orust kommun, Badplatser — nio badplatser: Småholmarna i Henån, Sörkilen i Ellös, Hälleviksstrand, Kungsviken, Kattevik i Mollösund, Nösund, Svanesund, Slussen och Hagen i Stocken; simskola sommartid vid Småholmarna och flera badplatser som sköts av föreningar med kommunalt stöd — https://www.orust.se/uppleva-och-gora/idrott-motion-och-friluftsliv/badplatser (läst 2026-09-16)
      'Orust kommun har nio badplatser: Småholmarna i Henån, Sörkilen i Ellös, Hälleviksstrand, Kungsviken, Kattevik i Mollösund, Nösund, Svanesund, Slussen och Hagen i Stocken. Småholmarna sköts av kommunen och har simskola sommartid; de övriga drivs av föreningar med kommunalt stöd.',
    ],
    facts: {
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Mollösund — cirka 80 minuter med bil från Göteborg — https://www.vastsverige.com/en/orust/products/mollosund/ (läst 2026-09-16)
      travel_time: 'Mollösund cirka 80 min med bil från Göteborg',
      // KÄLLA: https://www.orust.se/kommun-och-politik/kommunfakta — "Själva Orust är västkustens största ö.", "Båtar har satt sin prägel på ön långt innan vikingatiden", "traditionella fiskesamhällen" (läst 2026-09-27)
      character: 'Västkustens största ö, båtbyggartradition, fiskelägen',
      season: 'Helår',
      // KÄLLA: https://www.orust.se/kommun-och-politik/kommunfakta — "Baden, båtlivet, naturen med sina vandringsmöjligheter, vandringsleder, traditionella fiskesamhällen" (läst 2026-09-27)
      best_for: 'Bad, båtliv, vandring, fiskelägen',
    },
    facts_provenance: {
      travel_time: 'matt',
      character: 'bedomning',
      season: 'bedomning',
      best_for: 'bedomning',
    },
    activities: [
      // KÄLLA: Hallberg-Rassy, Varvets historia — "1943 öppnade Hallberg eget varv i Kungsviken på Orust", nya lokaler i Ellös i mitten av 1960-talet, omkring 9 800 levererade båtar — https://www.hallberg-rassy.com/sv/varvet/varvets-historia (läst 2026-09-16)
      { icon: '⛵', name: 'Varven i Ellös', desc: 'Hallberg-Rassy har byggt båtar på Orust sedan 1943 — sedan mitten av 1960-talet i Ellös — och levererat omkring 9 800 båtar.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Mollösund — utsiktsplatsen Klockeberget med träskulpturen av fiskarkvinnan med barn — https://www.vastsverige.com/en/orust/products/mollosund/ (läst 2026-09-16)
      { icon: '🥾', name: 'Mollösunds klippvandring', desc: 'Klockeberget i Mollösund — utsiktsplats med träskulpturen av fiskarkvinnan med barn.' },
      // KÄLLA: Orust kommun, Badplatser — nio badplatser, simskola sommartid vid Småholmarna i Henån, Kattevik i Mollösund — https://www.orust.se/uppleva-och-gora/idrott-motion-och-friluftsliv/badplatser (läst 2026-09-16)
      { icon: '🏊', name: 'Badplatser', desc: 'Nio badplatser i kommunen, bland dem Småholmarna i Henån med simskola sommartid och Kattevik i Mollösund.' },
    ],
    accommodation: [
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Prästgårdens Pensionat — Kyrkvägen 1, 47470 Mollösund, i en byggnad från 1893 — https://www.vastsverige.com/en/orust/products/prastgardens-pensionat/ (läst 2026-09-16)
      // KÄLLA: http://www.prastgardens.se/ — "I det gamla fiskeläget Mollösund på Orust ligger den anrika Prästgården som restes 1893. Idag fungerar gården som hotell." (läst 2026-09-27); sidan senast ändrad 11 augusti 2026 enligt servern.
      { name: 'Prästgårdens Pensionat', type: 'Pensionat', desc: 'Pensionat i Mollösund, Kyrkvägen 1, i en byggnad från 1893.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Kobbar & Skär — stugförmedlare för Orust och Tjörn, Tyfta 560, 473 98 Henån — https://www.vastsverige.com/orust/produkter/kobbar-skar/ (läst 2026-09-16)
      // KÄLLA: https://kobbaroskar.com/ — "Vi hyr ut charmiga stugor på Orust & Tjörn" (läst 2026-09-27)
      { name: 'Kobbar & Skär', type: 'Stugförmedling', desc: 'Stugförmedling för Orust och Tjörn, med kontor i Henån.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Slussens Pensionat — Slussen 415, 47392 Henån, pensionat med restaurang och konferens — https://www.vastsverige.com/en/orust/products/slussens-pensionat/ (läst 2026-09-16)
      // KÄLLA: https://www.slussenspensionat.se/ — "På norra Orust, i innerskärgården, ligger en plats", "Sedan 1987 har det här lilla stället funnits här" (läst 2026-09-27)
      { name: 'Slussens Pensionat', type: 'Pensionat', desc: 'Pensionat med restaurang och musikscen i innerskärgården på norra Orust, i Slussen utanför Henån, sedan 1987.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Hotell Varvet — Ravinvägen 2, 474 31 Ellös, lägenhetshotell med restaurang och spa — https://www.vastsverige.com/en/orust/products/hotel-varvet/ (läst 2026-09-16)
      // KÄLLA: http://www.hotellvarvet.se — "nyrenoverat lägenhetshotell med en populär lunchrestaurang och perfekt läge vid havet i Ellös på Orust", "är enkelt och i gammaldags stil med sina 14 rum" (läst 2026-09-27)
      { name: 'Hotell Varvet', type: 'Hotell', desc: 'Lägenhetshotell vid havet i Ellös, Ravinvägen 2, med lunchrestaurang och ett vandrarhem med 14 rum.' },
    ],
    getting_there: [
      // KÄLLA: Orust kommun, Kommunfakta — fasta broförbindelser åt båda hållen och dessutom två färjelinjer — https://www.orust.se/kommun-och-politik/kommunfakta (läst 2026-09-16)
      // KÄLLA: https://www.orust.se/kommun-och-politik/kommunfakta — "Orust ligger sex mil norr om Göteborg och tre mil sydväst om Uddevalla. Fasta broförbindelser finns åt båda hållen. Dessutom finns det två färjelinjer som förbinder Orust med fastlandet." (läst 2026-09-27)
      { method: 'Bil', from: 'Göteborg', time: '', desc: 'Orust ligger sex mil norr om Göteborg och tre mil sydväst om Uddevalla. Fasta broförbindelser finns åt båda hållen, och dessutom två färjelinjer till fastlandet.', icon: '🚗' },
      // KÄLLA: https://www.trafikverket.se/resa-och-trafik/farjetrafik/svanesundsleden/ — "Svanesundsleden går mellan Svanesund på Orust och Kolhättan i Halsefjorden Bohuslän. Färjeledens längd är 830 meter och överfartstiden är fem minuter. Resan med vägfärjan är avgiftsfri." (läst 2026-09-27)
      { method: 'Bil + bilfärja', from: 'Kolhättan', time: '5 min överfart', desc: 'Trafikverkets vägfärja Svanesundsleden Kolhättan–Svanesund, 830 m, avgiftsfri.', icon: '⛴' },
    ],
    harbors: [
      // KÄLLA: Orust kommun, Henåns gästhamn — 10 gästplatser, djup cirka 1–2,5 meter, el, dusch, toalett, ramp och sugtömningsstation 1 april–31 oktober; bensin och diesel anges som tillgångar i orten Henån — https://www.orust.se/amnesomrade/upplevaochgora/gasthamnar/henansgasthamn.4.2f8c9bd513dca025875ec3.html (läst 2026-09-16)
      { name: 'Henåns Gästhamn', desc: 'Gästhamn i Henån med 10 gästplatser och cirka 1–2,5 meters djup. Drivs av Orust kommun.', service: ['El', 'Dusch', 'Toalett', 'Sugtömning', 'Ramp'] },
      // KÄLLA: Orust kommun, Mollösunds gästhamn — sydvästspetsen av Orust, 100 platser, djup cirka 4 meter, el, dusch, toalett, tvättmaskin och torktumlare i servicehuset, sugtömningsstation 1 april–31 oktober; bensin och diesel anges som tillgångar i samhället Mollösund — https://www.orust.se/uppleva-och-gora/gasthamnar/mollosunds-gasthamn (läst 2026-09-16)
      { name: 'Mollösunds Gästhamn', desc: 'Gästhamn på sydvästspetsen av Orust med 100 platser och cirka 4 meters djup. Drivs av Orust kommun.', service: ['El', 'Dusch', 'Toalett', 'Tvättmaskin', 'Torktumlare', 'Sugtömning'] },
    ],
    restaurants: [
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Wärds Mollösund — hotell och restaurang med cocktailbar, Kyrkvägen 9, 474 70 Mollösund — https://www.vastsverige.com/orust/produkter/wards-i-mollosund/ (läst 2026-09-16)
      // KÄLLA: https://wards.se/ — "Sedan 1860 har Mollösunds Wärdshus stått stolt i en av Sveriges äldsta fiskebyar.", "Vi öppnar ibland ad hoc — hör gärna av dig, så berättar vi mer.", "För bordsbokning ring" (läst 2026-09-27)
      { name: 'Mollösunds Wärdshus (Wärds)', type: 'Värdshus', desc: 'Värdshus sedan 1860 i Mollösund, Kyrkvägen 9, några meter från hamnen. Öppnar ibland ad hoc — kontakta värdshuset och boka bord i förväg.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Bryggvingen Restaurang & Fiskaffär — restaurang och fiskaffär på Lyr, Orust — https://www.vastsverige.com/en/orust/products/restaurang-cafe-bryggvingen/ (läst 2026-09-16)
      // KÄLLA: http://www.bryggvingen.se — "Varmt välkommen till ön Lyr på sydvästra Orust, där vi har vår fisk- & skaldjursrestaurang och fiskaffär.", "Kom med båt eller ta färjan som går dagligen." (läst 2026-09-27)
      { name: 'Bryggvingen Restaurang & Fiskaffär', type: 'Restaurang', desc: 'Fisk- och skaldjursrestaurang och fiskaffär på ön Lyr vid sydvästra Orust. Dit kommer man med egen båt eller med färjan, som går dagligen.' },
    ],
    // KÄLLA: Orust kommun, Kulturhistoriska byggnader och kulturmiljöer — Käringön, Mollösund, Gullholmen och Härmanö är riksintressen — https://www.orust.se/bygga-bo-och-miljo/bygga-nytt-andra-eller-riva/kulturhistoriska-byggnader-kulturmiljoer (läst 2026-09-16)
    // KÄLLA: Turistrådet Västsverige (vastsverige.com), Färja Tuvesvik–Gullholmen–Käringön — personfärjan går till Gullholmen, Härmanö och Käringön — https://www.vastsverige.com/orust/produkter/farja-tuvesvik-gullholmen-karingon/ (läst 2026-09-16)
    // KÄLLA: Turistrådet Västsverige (vastsverige.com), Mollösund — väderkvarnen från 1700-talet var i bruk till 1929 — https://www.vastsverige.com/en/orust/products/mollosund/ (läst 2026-09-16)
    tips: ['Käringön, Mollösund, Gullholmen och Härmanö är exempel på platser inom riksintresse för kulturmiljövården.', 'Personfärjan från Tuvesvik går till Gullholmen, Härmanö och Käringön.', 'Mollösunds väderkvarn från 1700-talet var i bruk till 1929.'],
    related: ['tjorn', 'karingon', 'gullholmen'],
    tags: ['stor ö', 'båtbyggning', 'mångsidig', 'bas'],
    // KÄLLA: Hallberg-Rassy, Varvets historia — grundat 1943, omkring 9 800 levererade båtar, varvet helägt inom familjen Rassy — https://www.hallberg-rassy.com/sv/varvet/varvets-historia (läst 2026-09-16)
    // KÄLLA: Najad Yachts, egen webbplats — produktionen flyttad tillbaka till Henån på Orust 2022 — https://najad.se/najad-yachts-moves-production-back-to-orust-following-the-acquisition-of-orust-yacht-service/ (läst 2026-09-16)
    did_you_know: 'Hallberg-Rassy har byggt båtar på Orust sedan 1943, i Ellös sedan mitten av 1960-talet, och levererat omkring 9 800 båtar — varvet ägs fortfarande helt inom familjen Rassy. Najad flyttade tillbaka sin produktion till Henån 2022.',
    seasonal: {
      open: 'Hela året',
      peak: 'Juli–Augusti',
      best: 'Juni eller September',
      // KÄLLA: https://www.orust.se/kommun-och-politik/kommunfakta — "Sommartid när de flesta fritidshusen är bebodda och campingplatser, gästhamnar, hotell och vandrarhemmet mera är fyllda av besökare, kanske antalet människor i kommunen närmar sig 40 000 personer." (läst 2026-09-27)
      // KÄLLA: https://www.orust.se/uppleva-och-gora/gasthamnar/mollosunds-gasthamn — "Sugtömningsstation där fritidsbåtar kan tömma sin latrintank, mellan 1 april och 31 oktober." (läst 2026-09-27)
      // KÄLLA: https://www.hallberg-rassy.com/sv/nyheter/oeppet-varv — "Öppet Varv i Ellös på Orust kommer 2026 att gå den 21-23 augusti." (läst 2026-09-27); https://www.orust.se/jobb-och-foretagande/foretag-stod-och-radgivning/fakta-om-naringslivet — "Hallberg Rassy anordnar varje år Öppet Varv, Skandinaviens största Segelbåtmässa." (läst 2026-09-27)
      bestReason: 'Sommartid, när fritidshus, campingplatser och gästhamnar är fulla, kan antalet människor i kommunen närma sig 40 000. Juni och september ligger utanför den toppen, och gästhamnarnas sugtömning är öppen 1 april–31 oktober. Hallberg-Rassys årliga båtmässa Öppet Varv i Ellös hölls 2026 den 21–23 augusti.',
      warning: '',
      months: ['limited','limited','limited','limited','open','open','peak','peak','open','open','limited','limited'],
    },
  },
  {
    slug: 'tjorn',
    name: 'Tjörn',
    region: 'bohuslan',
    regionLabel: 'Bohuslän',
    emoji: '🌉',
    // KÄLLA: https://www.akvarellmuseet.org/om/historia — "16 juni invigdes Nordiska Akvarellmuseet" ; https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/oar-runt-tjorn — "idag kommer 40 procent av alla svenska sillkonserver från Klädesholmen" ; https://www.bohuslansmuseum.se/kunskapsbanken_bohuslans_historia/pilane-gravfalt/ — "Det har ungefär 80 synliga gravar från järnåldern" ; https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/natur-och-gronomraden/utsiktsplatser — "Den 15 juni 1960 invigdes Tjörnbroleden – en fast förbindelse mellan Stenungsund på fastlandet och Almön på Tjörn" (läst 2026-09-27)
    tagline: 'Akvarellmuseum, sillhistoria och järnåldersgravar — broförbunden ö i Bohuslän.',
    description: [
      // KÄLLA: https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/oar-runt-tjorn — "Tjörns kommun omfattar, förutom huvudön, mer än 1 500 omkringliggande öar, holmar och skär" ; https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/natur-och-gronomraden/utsiktsplatser — "Den 15 juni 1960 invigdes Tjörnbroleden – en fast förbindelse mellan Stenungsund på fastlandet och Almön på Tjörn", "Tjörnbron är en del av länsväg 160 som går förbi Stenungsund och norrut över Tjörn och Orust", "När man åker mot Tjörn och kommer ur tunneln öppnar sig landskapet med en storslagen utsikt över fjordarna och skärgården", "Vetteberget, Tjörns högsta berg, bjuder på en magnifik utsikt över havet mot horisonten i väst", "Vid bra väder syns Danmark och Skagen", "På toppen av Vetteberget ligger ett bronsåldersröse daterat till cirka 1 000 år f.Kr", "Med 19 meter i diameter är det ett av de största i Bohuslän" (läst 2026-09-27)
      'Tjörn är en broförbunden ö i Bohuslän. Förutom huvudön omfattar Tjörns kommun mer än 1 500 öar, holmar och skär. Sedan 1960 förbinder Tjörnbroleden Stenungsund på fastlandet med Almön på Tjörn, och den är en del av länsväg 160 som fortsätter över Tjörn till Orust. Kommunen räknar bron som en utsiktsplats i sig: när man kommer ur tunneln öppnar sig landskapet med utsikt över fjordarna och skärgården. Öns högsta berg, Vetteberget, har utsikt mot havet i väster – vid bra väder syns Danmark och Skagen. På toppen ligger ett bronsåldersröse från omkring 1000 f.Kr., 19 meter i diameter och ett av de största i Bohuslän.',
      // KÄLLA: https://www.akvarellmuseet.org/om/historia — "År 2000 stod ett centrum för akvarell klart och 16 juni invigdes Nordiska Akvarellmuseet", "utlystes vad som kom att bli Nordens dittills största arkitekttävling", "386 arkitektförslag lämnades in och vann gjorde slutligen Niels Bruun och Henrik Corfitsen från Danmark med sitt förslag Mötet", "Byggnaden har placerats längs strandlinjen, delvis ute i vattnet", "fem gästateljéer uppförda på betongpelare i vattnet", "gästateljéerna på Bockholmen", "År 2012 byggdes museet ut med en ny konsthall", "Sedan dess har museet haft mer än tre miljoner besök" ; https://www.vastsverige.com/en/tjorn/products/skarhamn-guest-marina/ — "located in the middle of Skärhamn on western Tjörn" ; https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/bada/badplatser — "Badplatsen intill Nordiska Akvarellmuseet" (läst 2026-09-27)
      'I Skärhamn på västra Tjörn ligger Nordiska Akvarellmuseet, som invigdes den 16 juni 2000. Byggnaden ritades av de danska arkitekterna Niels Bruun och Henrik Corfitsen, vars förslag "Mötet" vann bland 386 bidrag i Nordens dittills största arkitekttävling. Museet ligger längs strandlinjen, delvis ute i vattnet, och fem gästateljéer står på betongpelare i vattnet vid Bockholmen. År 2012 byggdes museet ut med en ny konsthall, och sedan starten har det haft mer än tre miljoner besök. Intill museet ligger Gråskärs badplats.',
      // KÄLLA: https://www.bohuslansmuseum.se/kunskapsbanken_bohuslans_historia/pilane-gravfalt/ — "Det har ungefär 80 synliga gravar från järnåldern", "Gravmarkeringarna består av 57 runda stensättningar, tio runda högar, sju domarringar och enstaka sex resta stenar", "Det finns inga uppgifter om att det har gjorts någon utgrävning på gravfältet", "Skulpturen Anna är 14 meter hög och skapad av den spanske konstnären Jaume Plensa" ; https://www.vastsverige.com/tjorn/produkter/skulptur-i-pilane/ — "arrangeras varje sommar en skulpturutställning med världsledande konstnärer", "Sedan 2007 har Skulptur i Pilane visat konst av bland annat", "är ingen traditionell park utan ett levande beteslandskap", "funnit sin permanenta placering i Pilane" (läst 2026-09-27)
      'I Pilane på Tjörn ligger ett järnåldersgravfält med ungefär 80 synliga gravar: 57 runda stensättningar, tio runda högar, sju domarringar och sex resta stenar. Det finns inga uppgifter om att gravfältet någonsin grävts ut. Sedan 2007 visar Skulptur i Pilane samtidskonst i det betade kulturlandskapet, med en ny utställning varje sommar. Här har också den fjorton meter höga skulpturen "Anna" av den spanske konstnären Jaume Plensa fått en permanent plats.',
      // KÄLLA: https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/oar-runt-tjorn — "Klädesholmen är egentligen två holmar – den södra är Klädesholmen med den äldsta bebyggelsen, den norra är Koholmen", "Ta höger i Bleket, mot bron som leder över till Klädesholmen", "till Klädesholmen och Lilla Askerön kan du åka bil eller buss", "Under den stora sillperioden 1747–1808 bodde uppemot 1 000 personer på Klädesholmen", "idag kommer 40 procent av alla svenska sillkonserver från Klädesholmen", "Från Rönnängs brygga går personfärja till Dyrön", "Färjan går från Rönnäng cirka en gång i timman", "Färjan går även till Tjörnekalv och Åstol", "Till exempelvis Dyrön, Åstol, Härön och Tjörnekalv går regelbunden färjetrafik" ; https://www.vastsverige.com/tjorn/produkter/kladesholmen/ — "1950 fanns det 25 konservfabriker på ön och cirka 150 yrkesfiskare", "Här finns sillfabrik, sillmuseum och restaurangen Salt & Sill", "stoltserar med Sveriges första flytande hotell", "På Sveriges nationaldag, den 6 juni, firas också Sillens dag", "Då utses också Årets Sill av en namnkunnig jury" (läst 2026-09-27)
      'Klädesholmen nås med bil eller buss över bron från Bleket och består egentligen av två holmar – den södra är Klädesholmen med den äldsta bebyggelsen, den norra är Koholmen. Under den stora sillperioden 1747–1808 bodde uppemot 1 000 personer här, och år 1950 fanns 25 konservfabriker och omkring 150 yrkesfiskare på ön. Sillen är kvar: i dag kommer 40 procent av alla svenska sillkonserver från Klädesholmen, och här finns sillfabrik, sillmuseum och restaurangen Salt & Sill med det som beskrivs som Sveriges första flytande hotell. På nationaldagen den 6 juni firas Sillens dag, då Årets Sill utses. Från Rönnängs brygga går personfärja ungefär en gång i timmen till Dyrön, Tjörnekalv och Åstol, och även Härön har regelbunden färjetrafik.',
      // KÄLLA: https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/stigfjorden.html — "Stigfjorden utgör ett innanhav i miniatyr mellan Orust och Tjörn", "Bildat: 1979", "Areal: cirka 6714 hektar", "Naturvårdsförvaltare: Västkuststiftelsen", "Under vår och höst gör den rika produktionen i vattnet och på strandängarna området till näringsplats för tusentals änder, gäss, svanar och vadarfåglar", "Stigfjorden har upptagits på listan över våtmarker som anses ha stor internationell betydelse enligt den så kallade Ramsarkonventionen", "Området ingår i EU:s ekologiska nätverk av skyddade områden, Natura 2000", "Det skyddade läget gör att Stigfjordenområdet är rikt på natthamnar, exempelvis vid Smögholmarna längst i väster, Kalven, Bockholmarna, Kälkerön och Hälsön" (läst 2026-09-27)
      'Mellan Tjörn och Orust ligger naturreservatet Stigfjorden – ett innanhav i miniatyr på cirka 6 714 hektar, bildat 1979 och förvaltat av Västkuststiftelsen. Under vår och höst gör den rika produktionen i vattnet och på strandängarna området till näringsplats för tusentals änder, gäss, svanar och vadarfåglar. Stigfjorden finns på Ramsarkonventionens lista över våtmarker av stor internationell betydelse och ingår i EU:s nätverk Natura 2000. Det skyddade läget ger många natthamnar, till exempel vid Kälkerön och Hälsön.',
      // KÄLLA: https://www.tjorn.se/webbplatser/sundsby-sateri — "Sundsby Säteri ligger på ön Mjörn i Tjörn kommun i Bohuslän", "flera naturstigar och ett vackert parklandskap", "Parken, vandringsleder och området har öppet året runt" ; https://www.vastsverige.com/tjorn/ — "Teater, guidningar, konserter, familjedagar och fika i grönskande miljö" ; https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/natur-och-gronomraden/utsiktsplatser — "Sundsbyleden leder upp till Solklinten som är bergets högsta topp (108 meter över havet)", "Solklinten bjuder på en storslagen utsikt över bland annat Stigfjorden mellan Tjörn och Orust", "Nedanför Solklinten finns en smal och djup ravin", "stora fastkilade klippblock som bildar grottor" (läst 2026-09-27)
      'Sundsby säteri ligger på ön Mjörn i Tjörns kommun, med parklandskap och flera naturstigar. Parken och vandringslederna är öppna året runt, och på sommaren hålls teater, guidningar, konserter och familjedagar på säteriet. Sundsbyleden leder upp till Solklinten, bergets högsta topp 108 meter över havet, med utsikt över bland annat Stigfjorden mellan Tjörn och Orust. Nedanför toppen finns en smal och djup ravin där fastkilade klippblock bildar grottor.',
    ],
    facts: {
      // KÄLLA: https://www.vastsverige.com/tjorn/produkter/kladesholmen/ — "Klädesholmen ligger endast en timmes bilfärd från Göteborg" ; https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6208__0__LINE__20251214__20261212__943570e0-dc73-40ba-8902-068c3d54c30d__0%2C0__2597259.pdf — "Tjörn–Stenungsund/Göteborg", "Skärhamn torg", "Nils Ericson Terminalen", "Gäller 14 dec 2025 - 12 dec 2026" (läst 2026-09-27)
      travel_time: '1 h med bil från Göteborg; ca 1 h 15 min med expressbuss från Skärhamn',
      // KÄLLA: https://www.vastsverige.com/tjorn/ — "Tjörn är en hel övärld – från huvudön till de bilfria öarna Åstol, Dyrön, Tjörnekalv, Härön och Lilla Brattön", "tre internationellt kända besöksmål: Skulptur i Pilane, Nordiska Akvarellmuseet och Pater Noster" ; https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/oar-runt-tjorn — "idag kommer 40 procent av alla svenska sillkonserver från Klädesholmen" (läst 2026-09-27)
      character: 'Broförbunden övärld med konstmuseum, skulpturpark, fiskelägen och bilfria öar',
      // KÄLLA: https://www.tjorn.se/webbplatser/sundsby-sateri — "Parken, vandringsleder och området har öppet året runt" ; https://www.vastsverige.com/en/tjorn/products/vatten-restaurang-kafe/ — "Eat and drink well at Vatten all year round" ; https://www.vastsverige.com/tjorn/produkter/kladesholmen/ — "serveras året runt på välrenommerade restaurang Salt & Sill" (läst 2026-09-27)
      season: 'Helår',
      // KÄLLA: https://www.akvarellmuseet.org/om/historia — "16 juni invigdes Nordiska Akvarellmuseet" ; https://www.vastsverige.com/tjorn/produkter/skulptur-i-pilane/ — "arrangeras varje sommar en skulpturutställning med världsledande konstnärer" ; https://www.vastsverige.com/tjorn/produkter/kladesholmen/ — "Här finns sillfabrik, sillmuseum och restaurangen Salt & Sill" ; https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/oar-runt-tjorn — "Från Rönnängs brygga går personfärja till Dyrön" (läst 2026-09-27)
      best_for: 'Akvarellmuseum, skulpturpark, sill på Klädesholmen, öhopp',
    },
    facts_provenance: {
      travel_time: 'matt',
      character: 'matt',
      season: 'matt',
      best_for: 'matt',
    },
    activities: [
      // KÄLLA: https://www.akvarellmuseet.org/om/historia — "16 juni invigdes Nordiska Akvarellmuseet", "vann gjorde slutligen Niels Bruun och Henrik Corfitsen från Danmark", "fem gästateljéer uppförda på betongpelare i vattnet" (läst 2026-09-27)
      { icon: '🎨', name: 'Nordiska Akvarellmuseet', desc: 'Invigt 2000, ritat av de danska arkitekterna Niels Bruun och Henrik Corfitsen. Fem gästateljéer står på pelare i vattnet.' },
      // KÄLLA: https://www.vastsverige.com/tjorn/produkter/skulptur-i-pilane/ — "Sedan 2007 har Skulptur i Pilane visat konst av bland annat", "arrangeras varje sommar en skulpturutställning med världsledande konstnärer", "Anna av Jaume Plensa" ; https://www.bohuslansmuseum.se/kunskapsbanken_bohuslans_historia/pilane-gravfalt/ — "Det har ungefär 80 synliga gravar från järnåldern" (läst 2026-09-27)
      { icon: '🗿', name: 'Skulptur i Pilane', desc: 'Skulpturutställning i betesmarkerna vid Pilane gravfält, med nya verk varje sommar sedan 2007 och Jaume Plensas "Anna".' },
      // KÄLLA: https://www.vastsverige.com/tjorn/produkter/kladesholmen/ — "Här finns sillfabrik, sillmuseum och restaurangen Salt & Sill", "På Sveriges nationaldag, den 6 juni, firas också Sillens dag" ; https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/oar-runt-tjorn — "idag kommer 40 procent av alla svenska sillkonserver från Klädesholmen" (läst 2026-09-27)
      { icon: '🐟', name: 'Sill på Klädesholmen', desc: 'Sillfabrik, sillmuseum och restaurang på ön där 40 % av Sveriges sillkonserver görs. Sillens dag firas den 6 juni.' },
      // KÄLLA: https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/bada/badplatser — "Badplatsen intill Nordiska Akvarellmuseet har stora gräsytor, sandstrand, klippor, badbrygga, hopptorn, volleybollplan och toaletter", "Badplatsen är delvis tillgänglighetsanpassad med handikapptoalett" (läst 2026-09-27)
      { icon: '🏊', name: 'Gråskär, Skärhamn', desc: 'Kommunal badplats intill Nordiska Akvarellmuseet med sandstrand, klippor, badbrygga och hopptorn. Delvis tillgänglighetsanpassad.' },
    ],
    accommodation: [
      // KÄLLA: https://www.vastsverige.com/tjorn/produkter/kladesholmen/ — "stoltserar med Sveriges första flytande hotell, där vissa av rummen har badstege direkt utanför dörren", "bastubåten S/S Stilla som ligger förtöjd intill hotellet" (läst 2026-09-27)
      { name: 'Salt & Sill Hotell', type: 'Hotell', desc: 'Flytande hotell vid Klädesholmen som beskrivs som Sveriges första; vissa rum har badstege direkt utanför dörren. Intill ligger bastubåten S/S Stilla.' },
      // KÄLLA: https://www.vastsverige.com/en/tjorn/products/hotel-nordevik/ — "boutique hotel in the heart of Skärhamn", "individually decorated rooms in a range of sizes, from cosy double rooms to spacious family rooms", "Bohuslän-style egg cheese", "Hamngatan 60" (läst 2026-09-27)
      { name: 'Hotell Nordevik', type: 'Hotell', desc: 'Boutiquehotell mitt i Skärhamn, Hamngatan 60, med individuellt inredda rum från dubbelrum till familjerum. Frukost med lokala inslag som bohuslänsk äggost.' },
      // KÄLLA: https://www.vastsverige.com/sodrabohuslan/produkter/rovor-rum/ — "mitt i Toftenäs vackra naturreservat", "Gårdens gamla ekonomibyggnad med anor från 1700-talet är idag omgjord till två stora lägenheter", "Under sommaren, från midsommar och till skolstart, hyrs lägenheterna ut veckovis men resten av året fungerar de även som vandrarhem" (läst 2026-09-27)
      { name: 'Rovor & Rum', type: 'Vandrarhem', desc: 'Två lägenheter i en ombyggd ekonomibyggnad från 1700-talet mitt i Toftenäs naturreservat. Från midsommar till skolstart hyrs de ut veckovis, resten av året även som vandrarhem.' },
    ],
    getting_there: [
      // KÄLLA: https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/natur-och-gronomraden/utsiktsplatser — "Tjörnbron är en del av länsväg 160 som går förbi Stenungsund och norrut över Tjörn och Orust" ; https://www.vastsverige.com/tjorn/produkter/kladesholmen/ — "Klädesholmen ligger endast en timmes bilfärd från Göteborg" (läst 2026-09-27)
      { method: 'Bil', from: 'Göteborg', time: '1 h', desc: 'Via Stenungsund och Tjörnbron, länsväg 160.', icon: '🚗' },
      // KÄLLA: https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6208__0__LINE__20251214__20261212__943570e0-dc73-40ba-8902-068c3d54c30d__0%2C0__2597259.pdf — "Tjörn–Stenungsund/Göteborg", "Skärhamn torg", "Stenungsunds station", "Nils Ericson Terminalen", "Gäller 14 dec 2025 - 12 dec 2026" ; https://www.tjorn.se/bygga-bo-miljo-och-trafik/trafik-och-resor/buss-bat-och-tag — "Inom Tjörn kan du åka linjebuss eller åka med expressbussarna som fortsätter till Stenungsund och Göteborg", "Närmaste tågstation ligger i Stenungsund" (läst 2026-09-27)
      { method: 'Buss', from: 'Göteborg', time: '1 h 15 min', desc: 'Västtrafiks expressbuss Tjörn–Stenungsund/Göteborg. Morgonturerna från Skärhamn torg är framme vid Nils Ericson Terminalen efter cirka 1 h 15 min; övriga turer går till Stenungsunds station (cirka 40 min), där närmaste tågstation finns.', icon: '🚌' },
    ],
    harbors: [
      // KÄLLA: https://www.skarhamnsgasthamn.se/service/ — "I hamnavgiften ingår bland annat wifi, toalett, dusch, familjedusch, tvättmaskin, torktumlare", "Septitanksugen är gratis", "Skärhamns gästhamn drivs av Skärhamns Båtförening" ; https://www.vastsverige.com/en/tjorn/products/skarhamn-guest-marina/ — "located in the middle of Skärhamn on western Tjörn", "proximity to shops, restaurants, food stores", "During the first weekend of June each year, Skärhamn harbour is home to the wooden boat festival Träbåtsfestivalen" (läst 2026-09-27)
      { name: 'Skärhamns Gästhamn', desc: 'Gästhamn mitt i Skärhamn nära butiker och restauranger, driven av Skärhamns Båtförening. Första helgen i juni fylls hamnen av träbåtar under Träbåtsfestivalen.', fuel: false, service: ['Wifi', 'Toalett', 'Dusch', 'Tvättmaskin', 'Torktumlare', 'Septitanksugning'] },
      // KÄLLA: https://www.vastsverige.com/tjorn/produkter/kladesholmens-gasthamn/ — "belägen på västsidan av den omtalade sillön", "Gästhamnen har formen av en gryta vilket gör att vinden inte stör", "fasta linor" ; https://kladesholmenvh.se/gasthamn/ — "Djupet i gästhamnen är 3-4 meter", "El 6 Ampere ingår i alla priser", "Förhandsbokning endast Dockspot – 5 platser" (läst 2026-09-27)
      { name: 'Klädesholmens Gästhamn', desc: 'Gästhamn på Klädesholmens västsida. Hamnen är grytformad så att vinden inte stör, har fasta linor och 3–4 meters djup; el ingår i hamnavgiften. Fem platser kan förbokas via Dockspot.' },
    ],
    restaurants: [
      // KÄLLA: https://www.vastsverige.com/tjorn/produkter/kladesholmen/ — "serveras året runt på välrenommerade restaurang Salt & Sill", "Testa skärgårdskrogens specialitet Sillplankan" (läst 2026-09-27)
      { name: 'Restaurang Salt & Sill', type: 'Restaurang', desc: 'Skärgårdskrogen på Salt & Sill vid Klädesholmen serverar kryddsillar året runt; husets specialitet är Sillplankan.' },
      // KÄLLA: https://restaurangvatten.se/ — "belägen strax intill Nordiska Akvarellmuseet", "Med havet som närmsta granne präglas menyn förstås av fisk och skaldjur, men där finns även alternativ för den som föredrar kött eller vegetariskt", "Copyright 2026" ; https://www.vastsverige.com/en/tjorn/products/vatten-restaurang-kafe/ — "Södra Hamnen 6", "The restaurant is certified by A Taste of West Sweden", "Eat and drink well at Vatten all year round" (läst 2026-09-27)
      { name: 'Vatten Restaurang & Kafé', type: 'Restaurang', desc: 'Restaurang och kafé intill Nordiska Akvarellmuseet, Södra Hamnen 6 i Skärhamn, öppet året runt. Certifierad av A Taste of West Sweden; fisk och skaldjur dominerar, med kött- och vegetariska alternativ.' },
      // KÄLLA: https://www.bistroportsud.se/ — "Södra Hamnen 8, 471 32 Skärhamn", "Mat, Dryck & Logi vid bryggkanten i Skärhamn" ; https://www.vastsverige.com/tjorn/produkter/bistro-port-sud/ — "Menyn är inspirerad av Västkusten med fräscha råvaror från såväl land som hav och av södra Frankrike med sina Provencalska smaker" (läst 2026-09-27)
      { name: 'Bistro Port Sud', type: 'Bistro', desc: 'Restaurang med rum vid bryggkanten i Södra Hamnen i Skärhamn. Menyn blandar västkustråvaror från land och hav med provensalskt.' },
    ],
    // KÄLLA: https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/natur-och-gronomraden/utsiktsplatser — "När man åker mot Tjörn och kommer ur tunneln öppnar sig landskapet med en storslagen utsikt över fjordarna och skärgården", "På Tjörnsidan har det gamla brofästet blivit en rastplats med utsikt över Hakefjord och Askeröfjord", "Från rastplatsen går en gång- och cykelbana över hela Tjörnbroleden till Stenungsund", "På berget söder om sumpen står Sankt Olovs valar, ett av Bohusläns mest kända sjömärken", "Man når valarna via en liten stig, ungefär halvvägs mellan landsvägen och Linnevikens badplats" (läst 2026-09-27)
    tips: ['Tjörnbron är utpekad av kommunen som utsiktsplats. Vid det gamla brofästet på Tjörnsidan finns en rastplats med utsikt över Hakefjord och Askeröfjord, och en gång- och cykelbana går över hela Tjörnbroleden till Stenungsund.', 'Sankt Olovs valar, ett av Bohusläns mest kända sjömärken, nås via en liten stig halvvägs mellan landsvägen och Linnevikens badplats.'],
    related: ['orust', 'marstrand', 'stenungsund'],
    tags: ['akvarellmuseum', 'sill', 'tjörnbron', 'mångsidig'],
    // KÄLLA: https://digitaltmuseum.se/021015874271/almobron-i-bohuslan-paseglad-av-bulkfartyget-star-clipper-i-januari-198 — "Almöbron rasade klockan 01.30 den 18 januari 1980 då brospannet blev påkört av bulkfartyget Star Clipper", "Det ena fästet till den största av Tjörnbroarna, Almöbron", "Sju bilar körde ut i intet och störtade i havet varvid åtta människor omkom", "Dock startade omedelbart planering för provisorisk färjeförbindelse, samt även projekteringen av en ny bro" ; https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/natur-och-gronomraden/utsiktsplatser — "Efter bara 17 månaders byggtid invigdes den i november 1981" (läst 2026-09-27)
    did_you_know: 'Natten till den 18 januari 1980, klockan halv två, seglade bulkfartyget Star Clipper på Almöbron, den största av Tjörnbroarna, som rasade. Sju bilar körde ut i raset och åtta människor omkom. Planeringen av en provisorisk färjeförbindelse och en ny bro startade omedelbart, och den nuvarande Tjörnbron invigdes i november 1981 efter bara 17 månaders byggtid.',
    seasonal: {
      open: 'Hela året',
      // UPPSKATTNING: peak/best och months är Svallas bedömning.
      peak: 'Juli–Augusti',
      best: 'Juni eller September',
      // KÄLLA: https://www.tjorn.se/webbplatser/sundsby-sateri — "Parken, vandringsleder och området har öppet året runt" ; https://www.vastsverige.com/tjorn/produkter/kladesholmen/ — "På Sveriges nationaldag, den 6 juni, firas också Sillens dag", "serveras året runt på välrenommerade restaurang Salt & Sill" ; https://www.vastsverige.com/en/tjorn/products/skarhamn-guest-marina/ — "During the first weekend of June each year, Skärhamn harbour is home to the wooden boat festival Träbåtsfestivalen" ; https://www.vastsverige.com/en/tjorn/products/vatten-restaurang-kafe/ — "Eat and drink well at Vatten all year round" (läst 2026-09-27)
      bestReason: 'Tjörn är broförbundet och nås året runt med bil och expressbuss, och Sundsby säteris park och vandringsleder är öppna året runt. I juni firas Sillens dag på Klädesholmen den 6 juni och Träbåtsfestivalen i Skärhamn första helgen i juni. Restaurang Salt & Sill och Vatten i Skärhamn har öppet året runt, även i september.',
      months: ['limited','limited','limited','limited','open','open','peak','peak','open','open','limited','limited'],
    },
  },
  {
    slug: 'kungshamn',
    name: 'Kungshamn',
    region: 'bohuslan',
    regionLabel: 'Bohuslän',
    emoji: '🦐',
    // KÄLLA: https://www.sotenas.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/batar-och-hamnar/gasthamnar/kungshamns-gasthamn — "Kustsamhället Kungshamn är beläget ytterst på halvön Sotenäset och är huvudorten i Sotenäs kommun", "Kungshamn har sedan 1970-talet en broförbindelse med Smögen" ; https://www.vastsverige.com/sotenas/artiklar/made-in-sotenas/ — "I Kungshamn tillverkar man", "och det har man gjort sedan 1954" (läst 2026-09-27)
    slag: 'ort',
    tagline: 'Sotenäs huvudort — gästhamn, fiskberedning och bro till Smögen.',
    description: [
      // KÄLLA: https://www.vastsverige.com/sotenas/artiklar/kungshamn/ — "Många föredrar att fortfarande använda de gamla namnen trots att det är drygt 40 år sedan samlingsnamnet Kungshamn antogs", "medan Fisketången mer har kvar sin traditionella bebyggelse med sjöbodar och ljugarbänkar" ; https://www.sotenas.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/batar-och-hamnar/gasthamnar/kungshamns-gasthamn — "Kustsamhället Kungshamn är beläget ytterst på halvön Sotenäset och är huvudorten i Sotenäs kommun" (läst 2026-09-27)
      'Kungshamn ligger ytterst på halvön Sotenäset och är huvudort i Sotenäs kommun. Orten består av de tidigare samhällena Gravarne, Bäckevik och Fisketången, som fick samlingsnamnet Kungshamn för drygt fyrtio år sedan; många använder fortfarande de gamla namnen. Bebyggelsen i centrala Kungshamn har förändrats mycket genom åren, medan Fisketången har kvar sin traditionella bebyggelse med sjöbodar och ljugarbänkar.',
      // KÄLLA: https://www.vastsverige.com/sotenas/artiklar/kungshamn/ — "Kungshamn har sedan 70-talet broförbindelse med Smögen" ; https://www.vastsverige.com/sotenas/artiklar/smogen/ — "Landets näst största fiskauktion ligger på Smögen", "Här landar fiskebåtarna sina fångster av färsk fisk och skaldjur, som du lite senare kan köpa i fiskaffärerna om hörnet" ; https://www.vastsverige.com/sotenas/artiklar/made-in-sotenas/ — "Här finns flera stora företag inom fiskberedning och mat från havet", "I Kungshamn tillverkar man", "och det har man gjort sedan 1954", "Sill, ansjovis och mycket annat som ställs på borden tillverkas också av Orkla i Kungshamn" ; https://www.sotenas.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/batar-och-hamnar/gasthamnar/kungshamns-gasthamn — "Antal platser: ca 100st", "Vattendjup: 2,5-5m", "Dusch, WC, tvättstuga, färskvatten, eluttag, wifi, sopor och mycket centralt placerad" (läst 2026-09-27)
      'Kungshamn har sedan 1970-talet broförbindelse med Smögen. På Smögen ligger landets näst största fiskauktion, dit fiskebåtarna kommer in med färsk fisk och skaldjur som sedan säljs i fiskaffärerna i området. I Kungshamn finns flera stora företag inom fiskberedning: Orkla (tidigare Abba) har tillverkat Kalles Kaviar här sedan 1954 och gör även sill och ansjovis på orten. Kungshamns egen gästhamn ligger mycket centralt och har ett hundratal platser, med vattendjup på 2,5–5 meter, dusch, WC, tvättstuga, färskvatten, eluttag och wifi.',
      // KÄLLA: https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/halloarkipelagen.html — "Bildat: 1975", "Areal: cirka 292 hektar", "Öarna är flacka och mycket utsatta för väder och vind", "buskar som slån, nypon och vide är förvisade till små sänkor och sprickdalar", "Från öarna kan du studera sträck av änder, lommar och alkor", "Till häckfåglarna hör tofsvipa, enkelbeckasin, kustlabb och rödbena", "Med en vit blixt var tolfte sekund gör sig Bohusläns äldsta fyr påmind", "Här har den stått sedan 1842 på Hållös högsta punkt", "Fyren förklarades som byggnadsminne 1935", "radiopejlingsstationen fungerar idag som vandrarhem", "Sommartid utgår regelbundna badturer från Kungshamn", "Det finns ett fyrtiotal jättegrytor på Hållö" (läst 2026-09-27)
      'Utanför Kungshamn ligger naturreservatet Hållöarkipelagen, bildat 1975 och cirka 292 hektar stort. Öarna är flacka och mycket utsatta för väder och vind; buskar som slån, nypon och vide växer i små sänkor och sprickdalar. Från öarna kan man se sträckande änder, lommar och alkor, och bland häckfåglarna finns tofsvipa, kustlabb och rödbena. På Hållö finns ett fyrtiotal jättegrytor. På Hållös högsta punkt står Bohusläns äldsta fyr, rest 1842 och byggnadsminne sedan 1935; den lyser med en vit blixt var tolfte sekund. Sommartid går regelbundna badturer från Kungshamn, och den gamla radiopejlingsstationen är i dag vandrarhem.',
      // KÄLLA: https://www.sotenas.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser-hundbad/kungshamn — "Klippbad med sandstrand. Bryggor med badstegar. Handikappramp, omklädningsrum, toalett och handikapptoalett", "Klippbad med badstegar, hopptorn och trampolin", "Ramnerer" ; https://www.sotenas.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/vandringsleder/soteleden-och-kuststigen — "Planera din vandring med de digitala kartorna över Soteleden och Kuststigen i Kartportalen. Här finns etappförslag" (läst 2026-09-27)
      'Sotenäs kommun listar tre badplatser i Kungshamn: Fisketången, klippbad med sandstrand, bryggor med badstegar, handikappramp, omklädningsrum och toaletter; Stenbogen, klippbad med badstegar, hopptorn och trampolin; och Ramnerer, klippbad. För vandring på Soteleden och Kuststigen har kommunen digitala kartor med etappförslag.',
      // KÄLLA: https://nordensark.se/om-oss/ — "Nordens Ark är en ideell stiftelse som arbetar för att ge hotade djur en framtid", "Nordens Ark har funnits sedan 1989 och den zoologiska parken är öppen för besökare", "Åby säteri omfattar totalt 383 hektar mark", "Nordens Ark har ett nationellt ansvar för uppfödning och utplantering av flera svenska arter", "Åby säteri, 456 93 Hunnebostrand" ; https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/4860__0__LINE__20251214__20261212__9f3324f3-f11e-41b4-82f9-35990c574266__1%2C0__2611184.pdf — "Smögen–Kungshamn–Uddevalla–Trollhättan", "Nordens ark", "Gäller 14 dec 2025 - 12 dec 2026" (läst 2026-09-27)
      // Busstiden Kungshamns busstation–Nordens ark avläst i Västtrafiks tabell för linje 860 (måndag–fredag, t.ex. 06.23–06.42 och 08.23–08.42).
      'På Åby säteri utanför Hunnebostrand i samma kommun ligger Nordens Ark — en ideell stiftelse som sedan 1989 arbetar för att ge hotade djur en framtid, med en zoologisk park som är öppen för besökare. Åby säteri omfattar totalt 383 hektar mark, och Nordens Ark har nationellt ansvar för uppfödning och utplantering av flera svenska arter. Västtrafiks buss 860 från Kungshamns busstation har en hållplats vid Nordens Ark, cirka 20 minuter bort.',
    ],
    facts: {
      // KÄLLA: https://www.sotenas.se/taxorochavgifter/bussbatochtag.4.5d92f42815befa72d8ea31ef.html — "Avstånd Göteborg: 130 km", "Kör E6 norrut mot Oslo. Vid Gläborgmotet, norr om Munkedal, tag höger på väg 162 mot Kungshamn/Smögen" (läst 2026-09-27) ; https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/4860__0__LINE__20251214__20261212__9f3324f3-f11e-41b4-82f9-35990c574266__1%2C0__2611184.pdf — "Smögen–Kungshamn–Uddevalla–Trollhättan", "Gäller 14 dec 2025 - 12 dec 2026" (läst 2026-09-27)
      // Busstid avläst i tabellen, måndag–fredag: Kungshamns busstation 06.23 → Uddevalla central 07.44 och 07.23 → 08.44 (81 min).
      travel_time: 'Ca 13 mil med bil från Göteborg; buss 860 Kungshamn–Uddevalla ca 1 tim 20 min',
      // KÄLLA: https://www.sotenas.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/batar-och-hamnar/gasthamnar/kungshamns-gasthamn — "huvudorten i Sotenäs kommun" ; https://www.vastsverige.com/sotenas/artiklar/made-in-sotenas/ — "Här finns flera stora företag inom fiskberedning och mat från havet" ; https://www.vastsverige.com/sotenas/artiklar/smogen/ — "Landets näst största fiskauktion ligger på Smögen" (läst 2026-09-27)
      character: 'Sotenäs huvudort med fiskberedning, gästhamn och bro till Smögen',
      // UPPSKATTNING: sommarsäsongen avgränsad efter gästhamnens bemannade period – https://www.sotenas.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/batar-och-hamnar/gasthamnar/kungshamns-gasthamn — "Personal finns på plats alla dagar under högsäsong v25-33" (läst 2026-09-27)
      season: 'Juni–september (gästhamnen bemannad vecka 25–33)',
      // KÄLLA: https://fyrenkungshamn.se/ — "Ett stort lass med räkor, serveras på tekaka, ägg, majonnäs" (läst 2026-09-27) ; https://www.sotenas.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/vandringsleder/soteleden-och-kuststigen — "Planera din vandring med de digitala kartorna över Soteleden och Kuststigen" (läst 2026-09-27)
      best_for: 'Räkmacka, gästhamn, vandring på Soteleden',
    },
    facts_provenance: {
      travel_time: 'matt',
      character: 'matt',
      season: 'bedomning',
      best_for: 'bedomning',
    },
    activities: [
      // KÄLLA: https://www.vastsverige.com/sotenas/artiklar/smogen/ — "följa med en lokal fiskare ut på fisketur eller kanske en kräftfisketur" (läst 2026-09-27)
      { icon: '🎣', name: 'Fisketur med lokal fiskare', desc: 'Från Smögen, över bron, går det att följa med en lokal fiskare ut på fisketur eller kräftfisketur.' },
      // KÄLLA: https://nordensark.se/om-oss/ — "Nordens Ark har funnits sedan 1989 och den zoologiska parken är öppen för besökare", "Åby säteri, 456 93 Hunnebostrand" ; https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/4860__0__LINE__20251214__20261212__9f3324f3-f11e-41b4-82f9-35990c574266__1%2C0__2611184.pdf — "Nordens ark" (läst 2026-09-27)
      { icon: '🦭', name: 'Nordens Ark', desc: 'Zoologisk park för hotade djur sedan 1989, på Åby säteri utanför Hunnebostrand. Buss 860 från Kungshamn stannar vid parken.' },
      // KÄLLA: https://www.vastsverige.com/sotenas/artiklar/kungshamn/ — "Kungshamn har sedan 70-talet broförbindelse med Smögen" ; https://www.sotenas.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser-hundbad/kungshamn — "Klippbad med badstegar, hopptorn och trampolin" (läst 2026-09-27)
      { icon: '🥾', name: 'Promenad till Smögen', desc: 'Broförbindelse till Smögen sedan 1970-talet.' },
      { icon: '🏊', name: 'Klippbad på Stenbogen', desc: 'Kommunal badplats i Kungshamn med badstegar, hopptorn och trampolin.' },
    ],
    accommodation: [
      // KÄLLA: https://www.hotellkungshamn.se/ — "Högst upp på en klippa i hjärtat av Kungshamn solar sig vårt unika boende", "Hotellgatan 6, 456 31 Kungshamn", "under 2026" ; https://www.vastsverige.com/en/sotenas/produkter/hotell-kungshamn/ — "most of them having a balcony or terrace with fantastic views over the coast of Bohuslän", "The hotel's renowned restaurant is well situated, with a great view of the Kungshamn inlet" (läst 2026-09-27)
      { name: 'Hotell Kungshamn Suites', type: 'Hotell', desc: 'Lägenhetssviter högst upp på en klippa i centrala Kungshamn, de flesta med balkong eller terrass mot kusten. Restaurang med utsikt över Kungshamnsinloppet.', websiteUrl: 'https://www.hotellkungshamn.se/' },
    ],
    getting_there: [
      // KÄLLA: https://www.sotenas.se/taxorochavgifter/bussbatochtag.4.5d92f42815befa72d8ea31ef.html — "Avstånd Göteborg: 130 km", "Vid Gläborgmotet, norr om Munkedal, tag höger på väg 162 mot Kungshamn/Smögen. Efter ca 6 km , vid Hallinden, tag höger på väg 171 mot Kungshamn/Smögen", "Direktbussar till Sotenäs går från bland annat Kampenhof, Uddevalla och Nils Ericson-terminalen, Göteborg" (läst 2026-09-27)
      { method: 'Bil', from: 'Göteborg', time: 'ca 130 km', desc: 'E6 norrut. Vid Gläborgmotet norr om Munkedal tar du väg 162 och efter cirka 6 km, vid Hallinden, väg 171 mot Kungshamn/Smögen.', icon: '🚗' },
      // KÄLLA: https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/4860__0__LINE__20251214__20261212__9f3324f3-f11e-41b4-82f9-35990c574266__1%2C0__2611184.pdf — "Smögen–Kungshamn–Uddevalla–Trollhättan", "Kungshamns busstation", "Uddevalla central", "Gäller 14 dec 2025 - 12 dec 2026", "Linjen trafikeras av Vy Buss" (läst 2026-09-27)
      // Restid avläst måndag–fredag: Kungshamns busstation 06.23 → Uddevalla central 07.44 (81 min).
      { method: 'Buss', from: 'Uddevalla', time: 'ca 1 tim 20 min', desc: 'Västtrafiks linje 860 Smögen–Kungshamn–Uddevalla–Trollhättan går via Torp och Uddevalla central. Enligt Sotenäs kommun går direktbussar till Sotenäs också från Nils Ericson-terminalen i Göteborg.', icon: '🚌', url: 'https://www.vasttrafik.se/reseplanering/tidtabeller/linje/9011014486000000/' },
    ],
    harbors: [
      // KÄLLA: https://www.sotenas.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/batar-och-hamnar/gasthamnar/kungshamns-gasthamn — "Antal platser: ca 100st", "Vattendjup: 2,5-5m", "Dusch, WC, tvättstuga, färskvatten, eluttag, wifi, sopor och mycket centralt placerad", "Det finns ett bra shoppingsutbud, livsmedel, systembolag, restauranger, nattklubbar och banker", "Personal finns på plats alla dagar under högsäsong v25-33" (läst 2026-09-27)
      // Drivmedel nämns inte på kommunens sida (fuel: false = inte angivet).
      { name: 'Kungshamns Gästhamn', desc: 'Kommunal gästhamn mitt i Kungshamn med cirka 100 båtplatser och djup 2,5–5 meter. Dusch, WC, tvättstuga, färskvatten, el och wifi. Personal finns på plats alla dagar vecka 25–33. Livsmedel, systembolag, restauranger och banker finns i orten.', spots: 100, fuel: false, service: ['Dusch', 'WC', 'Tvättstuga', 'Färskvatten', 'El', 'Wifi'] },
    ],
    restaurants: [
      // KÄLLA: https://fyrenkungshamn.se/ — "Med det mest centrala läget du kan hitta i Kungshamn, precis vid havet och strandpromenaden", "Längst in i hamnen i Kungshamn finner du oss", "Hemlagad husmanskost till ett bra pris", "Ett stort lass med räkor, serveras på tekaka", "Tagliatelle, kycklingfilé, pesto, grädde", "Vi har även pizza för avhämtning" (läst 2026-09-27)
      // Sidan uppdaterad september 2026 (dateModified 2026-09-07).
      { name: 'Restaurang Fyren', type: 'Restaurang', desc: 'Restaurang längst in i hamnen i Kungshamn, vid havet och strandpromenaden, med uteservering mot småbåtshamnen. Husmanskost till lunch vardagar, fisk- och kötträtter, pasta, räkmacka och pizza för avhämtning.', websiteUrl: 'https://fyrenkungshamn.se/' },
      // KÄLLA: https://shop.hamnbageriet.se/ — "ett härligt bageri och café i hjärtat av Kungshamn", "2026" ; https://hamnbageriet.se/ — "Bagerihuset är själva hjärtat i Hamnbageriet", "Huset är öppet året om", "Glass och mathuset öppnar vi upp under sommarmånaderna" (läst 2026-09-27)
      { name: 'Hamnbageriet', type: 'Café', desc: 'Bageri och café vid hamnen i Kungshamn. Bagerihuset har öppet året om; sommartid öppnar också ett glass- och mathus med mackor, panini och våfflor.', websiteUrl: 'https://hamnbageriet.se/' },
    ],
    // KÄLLA: https://www.vastsverige.com/sotenas/artiklar/smogen/ — "10 minuters båttur från Smögen ligger ön Hållö" ; https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/halloarkipelagen.html — "Sommartid utgår regelbundna badturer från Kungshamn" ; https://www.vastsverige.com/sotenas/artiklar/kungshamn/ — "Strax innan den södra infarten till Kungshamn ligger det lilla samhället Hovenäset", "Hovenäsbron som förbinder Hovenäset med Kungshamn byggdes i början av 1900-talet, den sägs vara unik pga att den är Sveriges största valvbro av granit" ; https://www.sotenas.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser-hundbad/kungshamn — "vid Tångens badplats finns också en liten parkering" (läst 2026-09-27)
    tips: ['Till Hållö går det sommartid regelbundna badturer från Kungshamn; från Smögen tar båtturen cirka tio minuter.', 'Strax före den södra infarten till Kungshamn ligger Hovenäset. Hovenäsbron från tidigt 1900-tal sägs vara Sveriges största valvbro av granit (Västsverige).', 'Vid Fisketångens badplats finns en liten parkering.'],
    related: ['smogen', 'lysekil', 'grebbestad'],
    tags: ['räkor', 'fiskberedning', 'gästhamn', 'klippbad', 'vandring'],
    // KÄLLA: https://www.vastsverige.com/sotenas/artiklar/kungshamn/ — "Gravarne", "Bäckevik", "Många föredrar att fortfarande använda de gamla namnen trots att det är drygt 40 år sedan samlingsnamnet Kungshamn antogs" (läst 2026-09-27)
    did_you_know: 'Kungshamn är egentligen tre orter i en: Gravarne, Bäckevik och Fisketången fick samlingsnamnet Kungshamn för drygt fyrtio år sedan, och många använder fortfarande de gamla namnen.',
    seasonal: {
      // UPPSKATTNING: säsong och högsäsong bedömda utifrån gästhamnens bemannade period (v25–33) och badturerna till Hållö sommartid.
      open: 'Juni–September',
      peak: 'Juli–Augusti',
      best: 'Juni eller September',
      // KÄLLA: https://www.sotenas.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/batar-och-hamnar/gasthamnar/kungshamns-gasthamn — "Personal finns på plats alla dagar under högsäsong v25-33" ; https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/halloarkipelagen.html — "Sommartid utgår regelbundna badturer från Kungshamn" (läst 2026-09-27)
      bestReason: 'Gästhamnen har personal alla dagar vecka 25–33, och sommartid går regelbundna badturer från Kungshamn till Hållöarkipelagen.',
      months: ['off','off','off','off','off','open','peak','peak','open','limited','off','off'],
    },
  },
  {
    slug: 'pater-noster',
    name: 'Pater Noster',
    region: 'bohuslan',
    regionLabel: 'Bohuslän',
    emoji: '💡',
    // KÄLLA: https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/pater-noster---ett-hem-vid-horisonten — "Fyren Pater Noster är 32 meter hög och konstruerades av Nils Gustav von Heidenstam", "År 2015 blev fyren ett" ; https://www.vastsverige.com/tjorn/produkter/pater-noster/ — "Hamneskär, Tjörn", "Fyren är gjord helt i stål och gjutjärn", "Hotellet på Pater Noster har nio väldesignade rum" (läst 2026-09-27)
    tagline: 'Heidenstams järnfyr på Hamneskär — statligt byggnadsminne och hotell.',
    description: [
      // KÄLLA: https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/pater-noster---ett-hem-vid-horisonten — "Fyren Pater Noster är 32 meter hög och konstruerades av Nils Gustav von Heidenstam", "Pater Noster är latin för Fader vår", "Det sägs att sjömännen bad bönen när de siktade skären", "Starka havsströmmar och förrädiska grund har fått många fartyg att förlisa där." ; https://www.vastsverige.com/tjorn/produkter/pater-noster/ — "Längst ut i havsbandet på en karg och vindpinad plats", "Fyren är gjord helt i stål och gjutjärn" ; https://www.sfv.se/vara-fastigheter/sverige/vastra-gotalands-lan/hamneskar-och-pater-noster — "Arbetet med att binda ihop landets kuster med fyrar leddes av fyringenjör Gustav von Heidenstam vid Lotsverket", "Pater Noster började lysa den 1 november 1868", "Pater Nosterskären består av 97 öar som breder ut sig från Tjörns sydvästra udde och ner i höjd med Marstrand" (läst 2026-09-27)
      'Pater Noster är en fyr på den karga klippön Hamneskär, längst ut bland Pater Noster-skären – 97 öar som breder ut sig från Tjörns sydvästra udde ner mot Marstrand. Det 32 meter höga tornet är gjort helt i stål och gjutjärn och konstruerades av Nils Gustav von Heidenstam, fyringenjören som ledde arbetet med att binda ihop Sveriges kuster med fyrar. Fyren tändes den 1 november 1868. Starka havsströmmar och förrädiska grund har fått många fartyg att förlisa vid skären, och namnet är latin för Fader vår: det sägs att sjömännen bad bönen när de siktade skären.',
      // KÄLLA: https://www.sfv.se/vara-fastigheter/sverige/vastra-gotalands-lan/hamneskar-och-pater-noster — "Fyren släcktes 1977 och ersattes av kassunfyren Hätteberget", "Efter 30 år i mörker kastar Pater Noster åter sitt sken över havet", "Fyren återinvigdes 26 september 2007 efter en grundlig renovering på fastlandet av frivilliga krafter" ; https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/pater-noster---ett-hem-vid-horisonten — "i början av 2000-talet togs hela fyren iland för en omfattande renovering", "Sommaren 2007 fördes den tillbaka till", "högt kulturhistoriskt värde" ; https://paternoster.se/om-pater-noster — "Under drygt 30 år kämpade den ideella föreningen Pater Nosters Vänner för sin fyr" (läst 2026-09-27)
      'Pater Noster släcktes 1977 och ersattes av kassunfyren Hätteberget. I början av 2000-talet togs hela fyren iland för en omfattande renovering, som den ideella föreningen Pater Nosters Vänner kämpat för i drygt 30 år. Sommaren 2007 fördes den tillbaka till Hamneskär och återinvigdes den 26 september 2007 – efter 30 år i mörker lyser Pater Noster åter. 2015 förklarades fyren som statligt byggnadsminne med högt kulturhistoriskt värde.',
      // KÄLLA: https://paternoster.se/om-pater-noster — "År 2020 omvandlade designer på Stylt den gamla bostaden för generationer av fyrvaktare till ett unikt och personligt boutiquehotell" ; https://www.vastsverige.com/tjorn/produkter/pater-noster/ — "tack vare designbyrån", "Stylt Trampoli", "Sommartid går det även bra att boka sovplats där den sköna sängen placerats på klipporna" ; https://paternoster.se/fragor-svar — "På Pater Noster finns nio hotellrum med totalt 22 sovplatser", "Hotellet är öppet för privatgäster från april till november", "Pater Noster är tillgängligt året runt för gruppbokning, konferens och andra evenemang", "Vi kan ta emot upp till 150 dagsgäster och 22 övernattande gäster" ; https://paternoster.se/ — "Vi använder lokala råvaror utifrån säsong och i fyrträdgården odlas grönsaker och örter", "Fisk och skaldjur från Kattegatt och Skagerrak står i fokus", "fått utmärkelser som Världens bästa hotellkoncept, Stora Turismpriset samt The Special One" (läst 2026-09-27)
      'Fyrbostaden från 1868, där generationer av fyrfamiljer bodde, omvandlades 2020 av designbyrån Stylt Trampoli till hotell. Det har nio rum med totalt 22 sovplatser, och sommartid går det också att boka en säng ute på klipporna. Privatgäster tas emot april–november; grupper, konferenser och fester året runt, med plats för upp till 150 dagsgäster. Köket arbetar med lokala råvaror efter säsong, med fisk och skaldjur från Kattegatt och Skagerrak i fokus, och i fyrträdgården odlas grönsaker och örter. Hotellet uppger själv att det belönats med bland annat Världens bästa hotellkoncept, Stora Turismpriset och The Special One.',
      // KÄLLA: https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/pater-noster---ett-hem-vid-horisonten — "Det går också att gå upp i fyren och beundra utsikten över västerhavet", "Om du inte kommer i egen båt, finns det taxibåtar i Marstrand" ; https://paternoster.se/fragor-svar — "Om du inte är hotellgäst är du välkommen att besöka fyren och den tillhörande utställningen, där entré betalas på plats", "Övriga byggnader på ön är reserverade för vår verksamhet och våra hotellgäster", "Nej, det går ingen reguljär färja till Pater Noster", "Alla våra boendepaket på Pater Noster inkluderar RIB-transport tur och retur från Marstrand eller Rönnäng" ; https://www.sfv.se/vara-fastigheter/sverige/vastra-gotalands-lan/hamneskar-och-pater-noster — "Ön Hamneskär ligger ungefär fem distansminuter från Marstrand", "Hamneskär har två mycket små naturhamnar" ; https://paternoster.se/ta-dig-hit — "Under den perioden kan du boka dagstur med båt, genom våra samarbetspartners med garanterad hamnplats" (läst 2026-09-27)
      'Besökare kan gå upp i fyren och se ut över västerhavet; den som inte bor på hotellet betalar entré till fyren och utställningen på plats, medan övriga byggnader är reserverade för hotellet och dess gäster. Hamneskär ligger ungefär fem distansminuter från Marstrand och har två mycket små naturhamnar. Reguljär färja finns inte: hotellgäster åker hotellets RIB-båt från Marstrand eller Rönnäng, och andra kommer med egen båt, taxibåt från Marstrand eller sommartid med de dagsturer som hotellets samarbetspartner kör.',
      // KÄLLA: https://www.vastsverige.com/tjorn/ — "Här väntar tre internationellt kända besöksmål: Skulptur i Pilane, Nordiska Akvarellmuseet och Pater Noster" ; https://paternoster.se/aktiviteter — "Vi är stolta att vara en del av konstinitiativet Tjörn - Island of Art", "Förutom Pater Noster ingår Nordiska Akvarellmuseet i Skärhamn" ; https://paternoster.se/sommarcafet — "besök i fyren och konstutställningen på klipporna" (läst 2026-09-27)
      'Pater Noster ingår i konstinitiativet Tjörn – Island of Art och lyfts av Västsverige fram som ett av Tjörns tre internationellt kända besöksmål, tillsammans med Skulptur i Pilane och Nordiska Akvarellmuseet i Skärhamn. På fyrplatsen visas också en konstutställning på klipporna.',
    ],
    facts: {
      // KÄLLA: https://paternoster.se/ta-dig-hit — "Restid ca 20 min från både Marstrand söder ifrån och Rönnäng norr ifrån." (läst 2026-09-27)
      travel_time: 'Ca 20 min med båt från Marstrand eller Rönnäng',
      // KÄLLA: https://www.sfv.se/vara-fastigheter/sverige/vastra-gotalands-lan/hamneskar-och-pater-noster — "en av landets cirka 1 700 kronoholmar" ; https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/pater-noster---ett-hem-vid-horisonten — "År 2015 blev fyren ett" ; https://paternoster.se/besok-oss — "Pater Noster är ett prisbelönt fyrhotell på en avskild ö längst ut i Bohusläns skärgård" (läst 2026-09-27)
      character: 'Fyrplats på en kronoholme, statligt byggnadsminne, fyrhotell',
      // KÄLLA: https://paternoster.se/fragor-svar — "Hotellet är öppet för privatgäster från april till november", "under sommaren (juli-augusti) har vi öppet vårt sommarcafé i Sjöboden" (läst 2026-09-27)
      season: 'Hotell april–november, sommarcafé juli–augusti',
      // KÄLLA: https://paternoster.se/ — "Pater Noster erbjuder en unik miljö för allt från exklusiva konferenser och företagsevent" ; https://paternoster.se/besok-oss — "Fira på en fyrö", "Bo i historiska fyrbostaden" (läst 2026-09-27)
      best_for: 'Hotellvistelse, fyrbesök, konferens och fest',
    },
    facts_provenance: {
      travel_time: 'matt',
      character: 'bedomning',
      season: 'matt',
      best_for: 'bedomning',
    },
    activities: [
      // KÄLLA: https://paternoster.se/aktiviteter — "Gå upp för trapporna till 32 meters höjd och upplev utsikten högst upp i fyren" ; https://www.vastsverige.com/tjorn/produkter/pater-noster/ — "Den byggdes 1868", "Fyren är gjord helt i stål och gjutjärn" ; https://paternoster.se/fragor-svar — "där entré betalas på plats" (läst 2026-09-27)
      { icon: '💡', name: 'Fyrbestigning', desc: 'Gå upp för trapporna i den 32 meter höga järnfyren från 1868. Den som inte bor på hotellet betalar entré på plats.' },
      // KÄLLA: https://paternoster.se/fragor-svar — "Om du vill sola och bada på ön, rekommenderar vi att du lägger till vid klipporna och ser ön som en naturhamn", "Allemansrätten gäller på ön, men även rätten till hemfrid", "hålla avstånd till hus och gårdsplaner" (läst 2026-09-27)
      { icon: '🏊', name: 'Bad från klipporna', desc: 'Den som vill sola och bada rekommenderas att lägga till vid klipporna och använda ön som naturhamn. Allemansrätten gäller, men håll avstånd till hus och gårdsplaner.' },
      // KÄLLA: https://paternoster.se/aktiviteter — "Paddla ca 2h med guide i havskajak bland kobbar och skär runt Pater Noster", "Vår sälsafari-tur ger dig en unik möjlighet att lära dig mer om dessa fascinerande djur" (läst 2026-09-27)
      { icon: '🛶', name: 'Havskajak och sälsafari', desc: 'Hotellet ordnar guidad paddling i havskajak, ca 2 timmar bland kobbarna runt Pater Noster, och sälsafari med båt. Förfrågan görs till hotellet.' },
      // KÄLLA: https://paternoster.se/sommarcafet — "Under sommaren 2026 driver vi ett sommarcafé på Pater Noster med fika, kaffe, hembakat samt ett urval av kalla rätter inspirerade av havet och säsongen", "Öppna dagar och tider styrs av vädret och kan variera" ; https://paternoster.se/fragor-svar — "under sommaren (juli-augusti) har vi öppet vårt sommarcafé i Sjöboden" (läst 2026-09-27)
      { icon: '🍽', name: 'Sommarcaféet i Sjöboden', desc: 'Juli–augusti håller hotellet sommarcafé i Sjöboden med fika, kaffe, hembakat och kalla rätter. Öppettiderna styrs av vädret.' },
    ],
    accommodation: [
      // KÄLLA: https://paternoster.se/fragor-svar — "På Pater Noster finns nio hotellrum med totalt 22 sovplatser", "Nej, fyra av rummen har privat badrum med dusch och toalett", "Paketet omfattar RIB-transport tur och retur, helpension med frukost, lunch och en fyrarätters skaldjursmiddag, guidad rundvandring på ön samt entré till Pater Noster fyr", "Hotellet är öppet för privatgäster från april till november" ; https://paternoster.se/besok-oss — "I den historiska fyrbostaden från 1868 levde generationer av fyrfamiljer i över 100 år" (läst 2026-09-27)
      { name: 'Pater Noster', type: 'Hotell', desc: 'Hotell i den historiska fyrbostaden från 1868 med nio rum och 22 sovplatser; fyra rum har eget badrum, övriga delar badrum. I vistelsen ingår RIB-båt tur och retur, helpension, guidad tur och entré till fyren. Öppet för privatgäster april–november.' },
    ],
    getting_there: [
      // KÄLLA: https://paternoster.se/ta-dig-hit — "Restid ca 20 min från både Marstrand söder ifrån och Rönnäng norr ifrån.", "Hemresa är kl 10.30 till samma hamn som vid utresa.", "Bakom Marstrands färjeläge, nedanför Coop på Koön", "Stansvikstappen, sjötapp i Rönnäng" ; https://paternoster.se/fragor-svar — "Vid privat bokning kan du välja att åka från Marstrand kl. 12:00 eller från Rönnäng kl. 12:30", "en överfart med RIB till Pater Noster från Rönnäng på Tjörn brukar upplevas som något mjukare" (läst 2026-09-27)
      { method: 'RIB-båt för hotellgäster', from: 'Marstrand eller Rönnäng', time: 'ca 20 min', desc: 'Hotellets RIB-båt ingår i vistelsen. Den går kl. 12.00 från Marstrand (bakom färjeläget, nedanför Coop på Koön) eller kl. 12.30 från Rönnäng (Stansvikstappen), och hemresan går kl. 10.30. Från Rönnäng brukar överfarten upplevas som något mjukare.', icon: '⛴', url: 'https://paternoster.se/ta-dig-hit' },
      // KÄLLA: https://paternoster.se/ta-dig-hit — "Från juli-mitten av augusti är sommarcaféet öppet.", "Erbjuder fasta turer från Marstrand och Skärhamn.", "Erbjuder båttur från Marstrandsön med omnejd." ; https://www.head4waves.se/ — "Under högsäsongen erbjuder vi fasta dagsturer till den fantastiska fyrplatsen Pater Noster" ; https://www.marstrandtransport.se/ — "från Marstrandsön med omnejd ända ut till Pater Noster, Hamneskär med RIB" ; https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/pater-noster---ett-hem-vid-horisonten — "Om du inte kommer i egen båt, finns det taxibåtar i Marstrand" (läst 2026-09-27)
      { method: 'Dagstur med båt (sommar)', from: 'Marstrand eller Skärhamn', desc: 'När sommarcaféet är öppet, juli–mitten av augusti, kan dagsturer med garanterad hamnplats bokas direkt hos hotellets samarbetspartner: Head4Waves kör fasta turer från Marstrand och Skärhamn, Marstrandtransport från Marstrand med omnejd. Taxibåtar finns i Marstrand.', icon: '⛴' },
    ],
    harbors: [
      // KÄLLA: https://paternoster.se/fragor-svar — "Gästhamnen är liten och besök får vara max två timmar, och hamnplats kan inte bokas", "används för hotellets verksamhet" ; https://paternoster.se/ta-dig-hit — "Vi ber er meddela oss senast tre timmar innan er planerade ankomsttid" ; https://paternoster.se/sommarcafet — "Hamnen är liten och kräver god sjövana vid blåsigt väder." ; https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/pater-noster---ett-hem-vid-horisonten — "Den lilla hamnen har plats för några gästbåtar" (läst 2026-09-27)
      { name: 'Gästhamnen på Hamneskär', desc: 'Liten gästhamn vid fyrplatsen med plats för några gästbåtar. Dagsbesökare får ligga max två timmar i mån av plats; platser kan inte förbokas, och den reserverade platsen används av hotellet. Hotellgäster med egen båt meddelar hotellet senast tre timmar före ankomst. Hamnen kräver god sjövana i blåsigt väder.', fuel: false },
    ],
    restaurants: [
      // KÄLLA: https://paternoster.se/fragor-svar — "serveras middagen vanligtvis samtidigt för alla i Sjöboden", "under sommaren (juli-augusti) har vi öppet vårt sommarcafé i Sjöboden" ; https://paternoster.se/sommarcafet — "Matupplevelser utöver caféets ordinarie utbud, tillgängliga endast genom förbokning och som gruppbokning", "är vi ingen restaurang för spontana besök" (läst 2026-09-27)
      { name: 'Sjöboden', type: 'Restaurang och sommarcafé', desc: 'Hotellets matsal och sommarcafé i den gamla sjöboden. Här serveras middag för hotellgästerna, och juli–augusti har sommarcaféet fika, hembakat och kalla rätter. Lunch och middag utöver caféet serveras bara efter förbokning som gruppbokning – hotellet är ingen restaurang för spontana besök.' },
    ],
    tips: [
      // KÄLLA: https://paternoster.se/fragor-svar — "Eftersom det inte finns någon mataffär på ön" (läst 2026-09-27)
      'Det finns ingen mataffär på ön – ta med det du behöver om du kommer i egen båt.',
      // KÄLLA: https://paternoster.se/fragor-svar — "Pater Noster-skären skuggar havet, vilket gör att vågor och sjögång ofta blir lugnare än vid avfärd från Marstrand/Koön" (läst 2026-09-27)
      'Överfarten från Rönnäng brukar vara lugnare än från Marstrand, eftersom Pater Noster-skären skuggar sjön.',
      // KÄLLA: https://paternoster.se/fragor-svar — "Gästhamnen är liten och besök får vara max två timmar", "rekommenderar vi att du lägger till vid klipporna och ser ön som en naturhamn" (läst 2026-09-27)
      'I gästhamnen får dagsbesökare ligga max två timmar. Vill du stanna längre rekommenderar hotellet att du lägger till vid klipporna.',
    ],
    related: ['marstrand', 'astol', 'dyron'],
    tags: ['fyr', 'fyrhotell', 'byggnadsminne', 'kronoholme'],
    // KÄLLA: https://www.sfv.se/vara-fastigheter/sverige/vastra-gotalands-lan/hamneskar-och-pater-noster — "en av landets cirka 1 700 kronoholmar", "Fanns det fler än tre barn på en fyrplats krävdes skola. Den inreddes på vinden och var också lärarinnebostad.", "Sista året med skola var 1938." ; https://paternoster.se/om-pater-noster — "Fyrfolket bestod av 3 familjer: Fyrmästaren, fyrvaktaren och fyrbiträdet med respektive fru och barn." (läst 2026-09-27)
    did_you_know: 'Hamneskär är en av Sveriges cirka 1 700 kronoholmar. Här bodde tre fyrfamiljer – fyrmästarens, fyrvaktarens och fyrbiträdets – och eftersom en fyrplats med fler än tre barn skulle ha skola inreddes en skolsal på vinden. Sista skolåret var 1938.',
    // KÄLLA: https://paternoster.se/fragor-svar — "Hundar är välkomna i våra", "Fyrbiträdesrum Innergård", "behöver hunden hållas kopplad under hela vistelsen", "Hundar får inte vistas i allmänna ytor som Fyrmästarens vardagsrum eller matsal, men Sjöboden är en plats där hunden är välkommen", "För transport med RIB-båt är det ägarens ansvar att hunden har flytväst" (läst 2026-09-27)
    dog_notes: 'Hotellet tar emot hund i rummen Fyrbiträdesrum Innergård. Hunden ska vara kopplad under hela vistelsen och får vara i Sjöboden men inte i Fyrmästarens vardagsrum eller matsal. På RIB-båten ansvarar ägaren för att hunden har flytväst.',
    // KÄLLA: https://paternoster.se/fragor-svar — "Hotellet är öppet för privatgäster från april till november", "Pater Noster är öppet året runt vid Buy Out (exklusiv bokning av hela hotellet), konferenser och andra gruppbokningar" ; https://paternoster.se/ta-dig-hit — "Från juli-mitten av augusti är sommarcaféet öppet." ; https://www.head4waves.se/ — "Avgång från Skärhamn" (läst 2026-09-27)
    seasonal: {
      open: 'April–November',
      peak: 'Juli–mitten av augusti',
      best: 'Juli–mitten av augusti för dagsbesök',
      bestReason: 'Hotellet tar emot privatgäster april–november. Sommarcaféet i Sjöboden har öppet juli–mitten av augusti, och då går även dagsturer med båt från Marstrand och Skärhamn.',
      warning: 'December–mars öppnar ön bara för konferenser, gruppbokningar och exklusiv bokning av hela hotellet.',
      months: ['off','off','off','open','open','open','peak','peak','open','open','open','off'],
    },
  },
  {
    slug: 'vinga',
    name: 'Vinga',
    region: 'bohuslan',
    regionLabel: 'Bohuslän',
    emoji: '🎵',
    // KÄLLA: Winga Vänner — fadern Carl Gunnar Taube fyrvaktare på Vinga 1889–1905 — https://vinga.nu/ ; Sjöfartsverket, Vinga – Göteborgarnas fyr — båken och fyrarna — https://www.sjofartsverket.se/sv/om-oss/fyrar-och-kulturfastigheter/visningsfyrar/vinga--goteborgarnas-fyr/ ; Länsstyrelsen Västra Götaland, Vinga — naturreservat — https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/vinga.html (läst 2026-09-16)
    tagline: 'Evert Taubes barndomsö — fyr, båk och naturreservat i yttre skärgården.',
    description: [
      // KÄLLA: Winga Vänner — "Evert Taube tillbringade sin barndom här på Vinga eftersom pappan, Carl Gunnar Taube var fyrvaktare mellan 1889 och 1905" — https://vinga.nu/ ; Sjöfartsverket, Vinga – Göteborgarnas fyr — skalden "delvis växte upp" på fyrplatsen — https://www.sjofartsverket.se/sv/om-oss/fyrar-och-kulturfastigheter/visningsfyrar/vinga--goteborgarnas-fyr/ ; Göteborg & Co, Ta dig till skärgården — Vinga i Göteborgs yttre skärgård — https://www.goteborg.com/guider/ta-dig-till-skargarden (läst 2026-09-16)
      'Vinga ligger i Göteborgs yttre skärgård, längst ut mot havet. Evert Taube tillbringade sin barndom här: hans far Carl Gunnar Taube var fyrvaktare på Vinga mellan 1889 och 1905. Sjöfartsverket beskriver det som att skalden delvis växte upp på fyrplatsen.',
      // KÄLLA: Länsstyrelsen Västra Götaland, naturreservatet Vinga — bildat 1987, cirka 559 hektar, "Klipphällar möter buskiga snår av slån, björnbär, nypon och vinbär", sparris, västkustarv, strandkål och marviol, gök och näktergal, Koholmen som häckningsplats — https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/vinga.html (läst 2026-09-16)
      'Hela ön är naturreservat sedan 1987 och omfattar cirka 559 hektar. Klipphällar möter buskiga snår av slån, björnbär, nypon och vinbär, och i mitten av ön breder ett stort lövbuskage ut sig. På de norra delarna växer sparris, västkustarv, strandkål och marviol. Utöver vind och vågor kan man höra gök och näktergal här, och intilliggande Koholmen är häckningsplats för en mängd fåglar.',
      // KÄLLA: Sjöfartsverket, Vinga – Göteborgarnas fyr — tornet 29 meter högt och ritat av fyringenjör Emil Karlsson, mittdelen göts i betong av Skånska Cementgjuteriet och "Tornet kläddes med porfyrit bruten på Vinga", automatisering 1975 och avbemannad fyrplats, kvarvarande lotsning, utställningen "Fyrplats Vinga" — https://www.sjofartsverket.se/sv/om-oss/fyrar-och-kulturfastigheter/visningsfyrar/vinga--goteborgarnas-fyr/ ; Länsstyrelsen Västra Götaland, Vinga — "Fyrtornet är 29 meter högt och 46 meter över havet", dagliga väderobservationer, "I fyrmästarbostaden finns ett Taube-rum och ett arbetslivsmuseum" — https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/vinga.html (läst 2026-09-16)
      'Vinga fyr stod klar 1890 och ritades av fyringenjören Emil Karlsson. Tornet är 29 meter högt, 46 meter över havet, och den mellersta delen göts i betong av Skånska Cementgjuteriet och kläddes sedan med porfyrit bruten på Vinga. Fyren automatiserades 1975 och fyrplatsen avbemannades, men lotsverksamheten finns kvar och dagliga väderobservationer görs fortfarande här. I fyrmästarbostaden finns ett Taube-rum och ett arbetslivsmuseum, och Sjöfartsverket hänvisar till utställningen "Fyrplats Vinga" på ön.',
      // KÄLLA: Sjöfartsverket, Vinga – Göteborgarnas fyr — "En pyramidformad båk har funnits på platsen sedan tidigt 1600-tal och dagens båk byggdes 1857", första fyren 1840–1841, andra fyren 1856, nuvarande torn 1890 — https://www.sjofartsverket.se/sv/om-oss/fyrar-och-kulturfastigheter/visningsfyrar/vinga--goteborgarnas-fyr/ (läst 2026-09-16)
      // OKLART: Västsverige anger 1851 för båken, Sjöfartsverket 1857. Sjöfartsverket som fyrmyndighet följs här.
      'Vinga har haft sjömärken längre än fyren funnits. En pyramidformad båk har stått på platsen sedan tidigt 1600-tal, och dagens båk byggdes 1857. Den första fyren anlades 1840–1841, en andra fyr uppfördes 1856, och först 1890 kom det torn som står i dag.',
      // KÄLLA: Winga Vänner, Turbåtar — Strömma från Lilla Bommen, Kungsö från Stenpiren, Silvana och Hönö Båtturer från Hönö Klåva, Emma från Fotö — https://vinga.nu/turbatar/ ; Strömma, Guidad båtutflykt till Vinga — avgång Lilla Bommens hamn, cirka 1 timme 15 minuter enkel väg, två timmar på Vinga — https://www.stromma.com/sv-se/goteborg/utflykter/guidad-batutflykt-till-vinga/ ; Winga Vänner, Uthyrning — Biskopsgården och Fyrmästarbostaden hyrs ut av föreningen medan "Båken hyres ut endast för ceremonier som bröllop och dop", Fyrfolkets By drivs av Vinga Event — https://vinga.nu/uthyrning-av-stugor/ ; Länsstyrelsen Västra Götaland, Vinga — "Sommartid går turbåtar från Hönö och Göteborg till Vinga" — https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/vinga.html (läst 2026-09-16)
      'Turbåtar till Vinga går sommartid från både Göteborg och Öckeröarna. Strömma avgår från Lilla Bommen och anger själv cirka 1 timme och 15 minuter enkel väg samt två timmar i land på ön. M/S Kungsö går från Stenpiren, Silvana och Hönö Båtturer från Hönö Klåva, och Emma från Fotö. Öns besöksverksamhet drivs av föreningen Winga Vänner. Det finns dessutom övernattningsmöjligheter: Winga Vänner hyr ut Biskopsgården och Fyrmästarbostaden, medan Båken hyrs ut endast för ceremonier som bröllop och dop. Vinga Event driver Fyrfolkets By.',
      // KÄLLA: Västsverige/Visit Öckerö, Ön Vinga — kiosk med glass, dryck och souvenirer samt grillplatsen "Brända Fläsket" — https://www.vastsverige.com/visitockero/produkter/on-vinga/ ; Länsstyrelsen Västra Götaland, Vinga — informationstavla, rastplats, vandringsled och toalett som besöksanordningar — https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/vinga.html (läst 2026-09-16)
      'På ön finns kiosk med glass, godis och fika samt grillplatsen "Brända Fläsket". Länsstyrelsen anger informationstavla, rastplats, vandringsled och toalett som besöksanordningar i reservatet.',
    ],
    facts: {
      // KÄLLA: Strömma, Guidad båtutflykt till Vinga — cirka 1 timme 15 minuter enkel väg från Lilla Bommen — https://www.stromma.com/sv-se/goteborg/utflykter/guidad-batutflykt-till-vinga/ (läst 2026-09-16)
      travel_time: '1 h 15 min med båt från Göteborg',
      // KÄLLA: Länsstyrelsen Västra Götaland, naturreservatet Vinga — hela ön är naturreservat sedan 1987 — https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/vinga.html (läst 2026-09-16)
      character: 'Fyrplats, naturreservat, dagsutflykt',
      season: 'Sommarsäsong',
      best_for: 'Dagsutflykt, vis-fans, klippvandring',
    },
    facts_provenance: {
      travel_time: 'matt',
      character: 'bedomning',
      season: 'matt',
      best_for: 'bedomning',
    },
    activities: [
      // KÄLLA: Länsstyrelsen Västra Götaland, Vinga — ordagrant "I fyrmästarbostaden finns ett Taube-rum och ett arbetslivsmuseum" och "Fyrtornet är 29 meter högt och 46 meter över havet"; reservatet listar stig, rastplats och informationstavla — https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/vinga.html ; Sjöfartsverket, Vinga – Göteborgarnas fyr — utställningen "Fyrplats Vinga" — https://www.sjofartsverket.se/sv/om-oss/fyrar-och-kulturfastigheter/visningsfyrar/vinga--goteborgarnas-fyr/ (läst 2026-09-16)
      { icon: '🎵', name: 'Taubemuseet', desc: 'Arbetslivsmuseum med Taube-rum i fyrmästarbostaden; utställningen Fyrplats Vinga.' },
      { icon: '💡', name: 'Vinga fyr', desc: 'Tornet är 29 meter högt och 46 meter över havet.' },
      { icon: '🥾', name: 'Klippvandring', desc: 'Stig genom naturreservatet, med rastplats och informationstavla.' },
    ],
    accommodation: [
      // KÄLLA: Winga Vänner, Uthyrning — Biskopsgården med 7 rum och 10 bäddar plus 2 extrabäddar, Fyrmästarbostaden med 3 rum och 7 bäddar, uthyrning till föreningens medlemmar; Fyrfolkets By sköts av Vinga Event — https://vinga.nu/uthyrning/ (läst 2026-09-16)
      { name: 'Biskopsgården', type: 'Uthyrningshus', desc: 'Hus på Vinga som hyrs ut av föreningen Winga Vänner. Sju rum, tio bäddar plus två extrabäddar. Uthyrning till föreningens medlemmar.' },
      { name: 'Fyrmästarbostaden', type: 'Uthyrningshus', desc: 'Hus på Vinga som hyrs ut av föreningen Winga Vänner. Tre rum, sju bäddar. Uthyrning till föreningens medlemmar.' },
      { name: 'Fyrfolkets By', type: 'Uthyrningshus', desc: 'Boende på Vinga som drivs av Vinga Event.' },
    ],
    getting_there: [
      // KÄLLA: Winga Vänner, Turbåtar — Strömma från Lilla Bommen, Kungsö från Stenpiren, Silvana, Hönö Båtturer och Kastor från Hönö Klåva, Emma från Fotö — https://vinga.nu/turbatar/ ; Strömma, Guidad båtutflykt till Vinga — cirka 1 h 15 min enkel väg från Lilla Bommens hamn — https://www.stromma.com/sv-se/goteborg/utflykter/guidad-batutflykt-till-vinga/ (läst 2026-09-16)
      { method: 'Båt', from: 'Göteborg', time: '1 h 15 min', desc: 'Turbåtar sommartid från Lilla Bommen och Stenpiren i Göteborg samt från Hönö Klåva och Fotö.', icon: '⛴' },
      // KÄLLA: Västsverige/Visit Öckerö, Ön Vinga — resan från Hönö Klåva tar cirka 30 minuter — https://www.vastsverige.com/visitockero/produkter/on-vinga/ (läst 2026-09-16)
      { method: 'Båt', from: 'Hönö Klåva', time: '30 min', desc: 'Turbåt från Öckeröarna sommartid.', icon: '⛴' },
    ],
    harbors: [
      // KÄLLA: Winga Vänner, Gästhamn — plats för cirka 30 båtar av normalstorlek, max 40 fot och max djup 2,5 meter, "du är alltid välkommen med egen båt till Vinga, året runt", toaletter, el, soprum, grillplatsen "Brända Fläsket" och kiosk — https://vinga.nu/gasthamn/ ; Länsstyrelsen Västra Götaland, Vinga — "relativt vindskyddad hamn" — https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/vinga.html (läst 2026-09-16)
      { name: 'Vinga gästhamn', desc: 'Gästhamn som drivs av föreningen Winga Vänner, med plats för cirka 30 båtar (max 40 fot, max djup 2,5 m). Egen båt är välkommen året runt. Länsstyrelsen beskriver hamnen som relativt vindskyddad.' },
    ],
    restaurants: [
      // KÄLLA: Winga Vänner — "I kiosken säljer vi fina souvenirer... Man kan även köpa glass, godis och fika" — https://vinga.nu/ och https://vinga.nu/gasthamn/ ; Länsstyrelsen Västra Götaland, Vinga — "Winga vänner driver en sommaröppen kiosk med souvenirer från Vinga" — https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/vinga.html (läst 2026-09-16)
      { name: 'Kiosken på Vinga (Winga Vänner)', type: 'Kiosk', desc: 'Kiosk driven av föreningen Winga Vänner. Säljer souvenirer, glass, godis och fika. Sommaröppet.' },
    ],
    // KÄLLA: Strömma, Guidad båtutflykt till Vinga — två timmar i land — https://www.stromma.com/sv-se/goteborg/utflykter/guidad-batutflykt-till-vinga/ ; Västsverige/Visit Öckerö, Ön Vinga — cirka fyra timmar på ön med turbåten från Hönö Klåva, kiosk och grillplatsen "Brända Fläsket" — https://www.vastsverige.com/visitockero/produkter/on-vinga/ ; Länsstyrelsen Västra Götaland, Vinga — naturreservat sedan 1987, cirka 559 hektar — https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/vinga.html (läst 2026-09-16)
    tips: ['Strömma anger två timmar i land, turbåten från Hönö Klåva cirka fyra timmar.', 'På ön finns kiosk med glass och godsaker samt grillplatsen "Brända Fläsket".', 'Ön är naturreservat sedan 1987, cirka 559 hektar.'],
    related: ['hono', 'styrso', 'donso'],
    tags: ['evert taube', 'fyr', 'dagsutflykt', 'vis-historia'],
    // KÄLLA: Winga Vänner — fadern Carl Gunnar Taube var fyrvaktare på Vinga mellan 1889 och 1905 — https://vinga.nu/ ; Länsstyrelsen Västra Götaland, Vinga — Taube-rum i fyrmästarbostaden — https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/vinga.html (läst 2026-09-16)
    did_you_know: 'Evert Taube tillbringade sin barndom på Vinga — fadern Carl Gunnar Taube var fyrvaktare på ön mellan 1889 och 1905. I fyrmästarbostaden finns i dag ett Taube-rum.',
    // seasonal utelämnas medvetet: rapporterna ger inget källbelagt innehåll till blocket.
  },
  {
    slug: 'hono',
    name: 'Hönö',
    region: 'bohuslan',
    regionLabel: 'Bohuslän',
    emoji: '🐟',
    // KÄLLA: Göteborg & Co, Ta dig till skärgården — Hönö bland norra skärgårdens tio bebodda öar — https://www.goteborg.com/guider/ta-dig-till-skargarden ; Länsstyrelsen Västra Götaland, naturreservatet Ersdalen — reservatet på nordvästra Hönö — https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/ersdalen.html (läst 2026-09-16)
    tagline: 'Norra skärgårdens fiskeö — hamn, gästhamn och naturreservatet Ersdalen.',
    description: [
      // KÄLLA: Göteborg & Co, Ta dig till skärgården — "Norra skärgården består av tio bebodda öar ... Hönö ...", väg 155 till färjeläget vid Lilla Varholmen, den avgiftsfria vägfärjan, buss X6 från Centralstationen och buss 290 från Järntorget — https://www.goteborg.com/guider/ta-dig-till-skargarden ; Visit Öckerö — "Hela året går färjorna från Lilla Varholmens färjeläge" — https://www.vastsverige.com/visitockero/ ; Göteborg & Co, Hönö — "i den norra delen av skärgården" — https://www.goteborg.com/platser/hono (läst 2026-09-16)
      'Hönö ligger i norra delen av Göteborgs skärgård och är en av de tio bebodda öarna i Öckerö kommun. Hit kommer man landvägen: väg 155 från Göteborg mot Hisingen och Öckerö leder till färjeläget vid Lilla Varholmen, där den avgiftsfria vägfärjan går över till öarna året runt. Buss X6 från Centralstationen går till Lilla Varholmen, och buss 290 från Järntorget tar dig hela vägen inklusive färjeöverfarten.',
      // KÄLLA: Öckerö kommun, Kommunfakta — "Öckerö kommun ligger i Göteborgs skärgård och består av cirka 1000 öar och skär. På våra tio bebodda öar bor det nästan 13 000 personer", högsta punkten på Röseberget på norra Björkö cirka 50 meter över havet — https://www.ockero.se/kommun-och-politik/kommunfakta (läst 2026-09-16)
      'Öckerö kommun ligger i Göteborgs skärgård och består av cirka 1 000 öar och skär. På de tio bebodda öarna bor nästan 13 000 personer. Kommunens högsta punkt ligger på Röseberget på norra Björkö, cirka 50 meter över havet.',
      // KÄLLA: Visit Öckerö, Ett centrum för fiske — cirka 300 yrkesfiskare i kommunen, "var tionde svensk yrkesfiskare", "tillsammans med kollegerna i Fiskebäck levererar de 75 procent av all fisk som fångas i Sverige", fiskebåtar längs kajerna i Hönö Klåva, Öckerö och Rörö — https://www.vastsverige.com/visitockero/centrum-for-fiske/ ; Göteborg & Co, Hönö — Fiskemuseet i hamnen i Hönö Klåva — https://www.goteborg.com/platser/hono (läst 2026-09-16)
      'Fisket är fortfarande Öckeröarnas näringsgren. I kommunen bor omkring trehundra yrkesfiskare — var tionde svensk yrkesfiskare — och tillsammans med kollegerna i Fiskebäck levererar de 75 procent av all fisk som fångas i Sverige. Längs kajerna i Hönö Klåva, Öckerö och Rörö ligger fortfarande både större och mindre fiskebåtar, med vadbinderi, båtvarv och fiskekrogar runtomkring. I hamnen i Hönö Klåva ligger Fiskemuseet.',
      // KÄLLA: Göteborg & Co, Hönö — "en populär gästhamn", ett tjugotal butiker samt restauranger, kaféer och pizzerior, "Klipporna breder ut sig längs kusterna", badplatserna Hästen, Lappesand, Jungfruviken och Halse Långe — https://www.goteborg.com/platser/hono (läst 2026-09-16)
      'Hönö Klåva är öns nav, med en populär gästhamn, ett tjugotal butiker samt restauranger, kaféer och pizzerior. Klipporna breder ut sig längs kusterna och flera badplatser är utpekade: Hästen och Lappesand nära hamnen, med anläggningar på plats, och Jungfruviken och Halse Långe på östra sidan.',
      // KÄLLA: Länsstyrelsen Västra Götaland, naturreservatet Ersdalen — bildat 1999, cirka 529 hektar på nordvästra Hönö i Öckerö kommun, "Strandlinjen är sönderskuren i vikar och uddar och här finns ett rikt fågelliv", hedar och lavklädda hällar, skalrik jord, grusade stigar, klippformationen Kröckle Kyrka, Kråkudden med fågelskådarskydd, grillplats, torrdass, bad, informationstavla och cykelled — https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/ersdalen.html (läst 2026-09-16)
      'Nordvästra Hönö utgörs av naturreservatet Ersdalen, avsatt 1999 och cirka 529 hektar stort. Landskapet är kargt och väderslipat, strandlinjen är sönderskuren i vikar och uddar och här finns ett rikt fågelliv. Vegetationen domineras av hedar och lavklädda hällar, med mindre skogspartier i svackorna; den skalrika jorden ger en förhållandevis rik flora. Grusade stigar leder till en stor strandäng i norr och till klippstränderna i söder, förbi klippformationen Kröckle Kyrka och Kråkudden med fågelskådarskydd. I reservatet finns grillplats, torrdass, bad, informationstavla och cykelled.',
      // KÄLLA: Öckerö kommun, Badplatser — tretton kommunala badplatser, bland dem Gula skäret, Jungfruviken, Lapposand och Knöten — https://www.ockero.se/fritid-och-kultur/idrott-motion-och-friluftsliv/badplatser ; Öckerö kommun, Naturområden och naturreservat — Rörö naturreservat, Grötö Knötens naturreservat, Björkö naturområde samt naturområden och motionsspår på Hälsö, Källö-Knippla och Öckerö — https://www.ockero.se/fritid-och-kultur/idrott-motion-och-friluftsliv/naturomraden-och-naturreservat (läst 2026-09-16)
      'Öckerö kommun ansvarar för tretton badplatser i skärgården, från Gula skäret och Jungfruviken till Lapposand och Knöten. Utanför Hönö finns dessutom flera naturområden och naturreservat på grannöarna — Rörö naturreservat, Grötö Knötens naturreservat, Björkö naturområde och motionsspår på Hälsö, Källö-Knippla och Öckerö.',
    ],
    facts: {
      // KÄLLA: Göteborg & Co, Ta dig till skärgården — väg 155 till färjeläget vid Lilla Varholmen och den avgiftsfria vägfärjan — https://www.goteborg.com/guider/ta-dig-till-skargarden (läst 2026-09-16)
      travel_time: 'Väg 155 + avgiftsfri färja från Lilla Varholmen',
      // KÄLLA: https://honoklavahamn.se/ — "Hönö Klåva Hamn är en stor båt- och fiskehamn på Hönö i Göteborgs norra skärgård" (läst 2026-09-27); https://www.goteborg.com/guider/ta-dig-till-skargarden — "Från färjeläget Lilla Varholmen går avgiftsfria vägfärjor till Hönö och Björkö" (läst 2026-09-27)
      character: 'Fiskeö med stor båt- och fiskehamn, nås med avgiftsfri vägfärja',
      // KÄLLA: Visit Öckerö — "Hela året går färjorna från Lilla Varholmens färjeläge ... avgiftsfria turer ut till Öckeröarna" — https://www.vastsverige.com/visitockero/ (läst 2026-09-16)
      season: 'Helår',
      // KÄLLA: https://www.goteborg.com/platser/hono — "fina badvikar och ett stort utbud av aktiviteter som klättring och kajakpaddling" (läst 2026-09-27); https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/ersdalen.html — "Längst ut på Kråkudden finns ett vindskydd för fågelskådning" (läst 2026-09-27); https://www.tullhuset.se/ — "renodlad fisk- och skaldjursrestaurang" (läst 2026-09-27)
      best_for: 'Bad, klättring och kajak, vandring och fågelskådning i Ersdalen, fisk och skaldjur i Hönö Klåva',
    },
    facts_provenance: {
      travel_time: 'matt',
      character: 'bedomning',
      season: 'matt',
      best_for: 'bedomning',
    },
    activities: [
      // KÄLLA: Göteborg & Co, Hönö — Fiskemuseet i hamnen i Hönö Klåva, badplatserna Hästen och Lappesand nära hamnen med anläggningar på plats — https://www.goteborg.com/platser/hono (läst 2026-09-16)
      // KÄLLA: http://www.fiskemuseet.se/ — "Fiskemuseet drivs av Föreningen Kusttraditioner" (läst 2026-09-27)
      { icon: '🐟', name: 'Fiskemuseet', desc: 'Fiskets historia, i hamnen i Hönö Klåva. Museet drivs av den ideella Föreningen Kusttraditioner.' },
      { icon: '🏊', name: 'Lappesand och Hästen', desc: 'Badplatser nära hamnen, med anläggningar på plats.' },
      // KÄLLA: Länsstyrelsen Västra Götaland, naturreservatet Ersdalen — grusade stigar, klippstränder, cykelled och fågelskådarskydd vid Kråkudden — https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/ersdalen.html (läst 2026-09-16)
      { icon: '🥾', name: 'Ersdalens naturreservat', desc: 'Grusade stigar, klippstränder, cykelled och fågelskådarskydd vid Kråkudden.' },
    ],
    accommodation: [
      // KÄLLA: Skärgårdshotellet Hönö, egen webbplats — Västra vägen 17, Hönö Klåva, 16 rum varav hälften med havsutsikt, restaurang, konferens och festvåning — https://skargardshotellethono.se/en/home/ ; Visit Öckerö, boendelista Hönö Klåva — https://www.vastsverige.com/visitockero/bo/bourvalhonoklava/ (läst 2026-09-16)
      // KÄLLA: https://skargardshotellethono.se/ — "Vi har 16 härliga rum på andra våningen där hälften av dem har en uteplats mot havet och hamninloppet", "fest för upp till 80 personer i sittning" (läst 2026-09-27); https://skargardshotellethono.se/en/home/ — "Skärgårdshotellet Hönö is open all year round for hotel guests, diners, conferences and meetings" (läst 2026-09-27)
      { name: 'Skärgårdshotellet Hönö', type: 'Hotell', desc: 'Hotell vid kajen i Hönö Klåva med 16 rum på andra våningen, varav hälften har uteplats mot havet och hamninloppet. Egen restaurang, konferens och fester för upp till 80 sittande gäster. Öppet året runt.' },
      // KÄLLA: Västsverige/Visit Öckerö, Havskatten — namnet "Havskatten Hotell & Vandrarhem", läge i Hönö Röds hamn, 12 hotelldubbelrum och 9 sovrum med eget badrum, bastu och konferens — https://www.vastsverige.com/en/visitockero/produkter/havskatten/ (läst 2026-09-16)
      // KÄLLA: https://www.havskatten.com/ — "Vi har 12 rum, alla med bara få meter från bryggkanten", "Rum med 2 + 2 enkelsängar gemensam wc/dusch", "Här har ni bubbelpool, bastu & relaxutrymme för er själva", "Rödvägen 73, 475 41 Hönö", "Bjud vännerna på kalas i vår festlokal eller ha företagets konferens här" (läst 2026-09-27)
      { name: 'Havskatten Hotell & Vandrarhem', type: 'Vandrarhem', desc: 'Hotell och vandrarhem vid Rödvägen på Hönö, med 12 rum några meter från bryggkanten – en del med egen wc och dusch, andra med gemensam. Spaavdelning med bubbelpool och bastu, festlokal och konferens. Nära naturreservatet Ersdalen.' },
      // KÄLLA: Visit Öckerö, boendelista Hönö Klåva — Hönö Sjöbodar som ett av boendena på ön — https://www.vastsverige.com/visitockero/bo/bourvalhonoklava/ (läst 2026-09-16)
      // KÄLLA: https://www.honosjobodar.se/ — "Här bor du i en av våra 6 sjöbodar, som har allt du behöver i form av fullutrustat kök, badrum", "i denna sjöbod är det tillåtet att ha med hund", "Öppet året om" (läst 2026-09-27)
      { name: 'Hönö Sjöbodar', type: 'Sjöbodar', desc: 'Sex sjöbodar vid vattnet med fullutrustat kök och badrum. I en av dem får man ha med hund. Öppet året om.' },
    ],
    getting_there: [
      // KÄLLA: Göteborg & Co, Ta dig till skärgården — väg 155 till färjeläget vid Lilla Varholmen, den avgiftsfria vägfärjan, buss 290 från Järntorget hela vägen inklusive färjeöverfarten och buss X6 från Centralstationen till Lilla Varholmen — https://www.goteborg.com/guider/ta-dig-till-skargarden (läst 2026-09-16)
      { method: 'Bil + färja', from: 'Göteborg', desc: 'Väg 155 till färjeläget vid Lilla Varholmen, sedan avgiftsfri vägfärja.', icon: '⛴' },
      { method: 'Buss', from: 'Göteborg', desc: 'Buss 290 från Järntorget går hela vägen inklusive färjeöverfarten; buss X6 från Centralstationen går till Lilla Varholmen.', icon: '🚌' },
    ],
    harbors: [
      // KÄLLA: https://honoklavahamn.se/om-oss/ — "Hönö Klåva Fiskehamn ägs av Hönö Klåva Fiskehamn ekonomisk förening" (läst 2026-09-27); https://www.vastsverige.com/en/visitockero/produkter/honoklavahamn/ (läst 2026-09-16)
      // KÄLLA: https://honoklavahamn.se/gasthamn/ — "I Hönö Klåva hamn finns miljöstation, septisug, vatten, diesel (sjömack) och mastkran", "Här finns duschar, toaletter, tvättmaskin och torktumlare", "Mellan 1 april och 31 oktober är vårt servicehus vid hamnkontoret öppet", "I vår gästhamn tillämpas ingen förbokning av platser", "I lågsäsong 1 december – 1 april finns inte vatten att tillgå vid kajerna", "Kod till vårt wi-fi för gäster finns på din biljett", "Varje båt ansvarar för att ha rätt kablar och uttag med sig" (läst 2026-09-27). Drivmedel var tidigare bara belagt via en gästhamnsguide som inte är tillåten; nu belagt av hamnens egen sida.
      { name: 'Hönö Klåva Hamn', desc: 'Privatägd båt- och fiskehamn i Hönö Klåva med gästplatser och ställplatser för husbil. Platserna går inte att förboka. Servicehuset vid hamnkontoret har dusch, toalett, tvättmaskin och torktumlare och är öppet 1 april–31 oktober; 1 december–1 april finns inget vatten vid kajerna. Diesel (sjömack), septitömning och mastkran finns i hamnen, liksom butiker och restauranger.', fuel: true, service: ['Vatten', 'El', 'Dusch', 'WC', 'Tvätt', 'Wifi', 'Diesel', 'Septitömning'] },
    ],
    restaurants: [
      // Klova Hamnkrog borttagen 2026-09-27: restaurangen har ingen egen webbplats (klovahamnkrog.se är en parkerad domän), så den gick inte att verifiera för 2026.
      // KÄLLA: Tullhuset, egen webbplats — Västra Vägen 3, Hönö, fisk- och skaldjursrestaurang med à la carte, smakmeny och skaldjursbuffé — https://www.tullhuset.se/ ; Visit Öckerö, Klåva-guide — https://www.vastsverige.com/en/visitockero/eat-drink/eat-klava/ (läst 2026-09-16)
      // KÄLLA: https://www.tullhuset.se/ — "Á la carte", "Skärgårdslunch", "Smakmeny", "Skaldjursbuffé", "Tullhuset håller öppet dagligen!", "Vi ses på Hönö Klåva!" (läst 2026-09-27)
      { name: 'Tullhuset', type: 'Restaurang', desc: 'Fisk- och skaldjursrestaurang i Hönö Klåva. À la carte, skärgårdslunch på vardagar, smakmeny och skaldjursbuffé.' },
      // KÄLLA: https://skargardshotellethono.se/en/home/ — "Skafferiet Restaurant", "Skärgårdshotellet Hönö is open all year round for hotel guests, diners, conferences and meetings" (läst 2026-09-27); https://skargardshotellethono.se/ — "Varmt välkomna på frukost, lunch, middag", "lokala och i säsong" (läst 2026-09-27)
      { name: 'Skafferiet', type: 'Restaurang', desc: 'Skärgårdshotellets restaurang i Hönö Klåva. Serverar frukost, lunch och middag med lokala och säsongsbetonade råvaror, öppen även för icke-boende.' },
      // KÄLLA: https://www.goteborg.com/guider/guide-ata-och-fika-i-goteborgs-skargard (Göteborg & Co, stadens officiella besöksguide), läst 2026-09-29 : "Är du sugen på hembakt bröd, goda sallader, hamburgare, varma smörgåsar och hemlagade pajer med en fantastisk havsutsikt nere vid kajen ska du bege dig till Zivers Veranda."
      { name: 'Zivers Veranda', type: 'Café', desc: 'Kafé och matställe nere vid kajen i Hönö Klåva. Hembakt bröd, sallader, hamburgare, varma smörgåsar och hemlagade pajer.' },
      // KÄLLA: https://www.goteborg.com/guider/guide-ata-och-fika-i-goteborgs-skargard (Göteborg & Co, stadens officiella besöksguide), läst 2026-09-29 : "Franses skärgårdspub. Den historiska miljön … har lokalen i många år hyst ett vadbinderi … Nu njuter du av vällagad mat, livemusik och aktiviteter. Har du hund finns det dessutom en egen hundmeny."
      { name: 'Franses', type: 'Bar', desc: 'Skärgårdspub i ett gammalt vadbinderi vid Hönö Klåva. Mat, livemusik och en egen hundmeny.' },
      // KÄLLA: https://www.goteborg.com/guider/guide-ata-och-fika-i-goteborgs-skargard (Göteborg & Co, stadens officiella besöksguide), läst 2026-09-29 : "Lilling Cottage. Här hittar du vackra och noggrant utvalda blommor, mat och inredningsartiklar … Maten hämtar inspiration från medelhavet, kaffe från kaféet da Matteo"
      { name: 'Lilling Cottage', type: 'Café', desc: 'Kafé och butik i ett. Mat med inspiration från Medelhavet, kaffe från da Matteo och bakverk, med havsutsikt.' },
    ],
    // KÄLLA: Göteborg & Co, Hönö — ett tjugotal butiker samt restauranger och kaféer, Hönö Klåva "utsedd till bästa ställplats 2019 av Husbil & Husvagn" — https://www.goteborg.com/platser/hono ; Göteborg & Co, Ta dig till skärgården — cykelvägar från Göteborgs centrum till Lilla Varholmen och vägfärjan som tar cyklar — https://www.goteborg.com/guider/ta-dig-till-skargarden (läst 2026-09-16)
    // KÄLLA: https://honoklavahamn.se/ — "År 2019 blev Hönö Klåva Hamns ställplats utsedd till Årets Ställplats 2019 av Husbil & Husvagn" (läst 2026-09-27); https://honoklavahamn.se/gasthamn/ — "I vår gästhamn tillämpas ingen förbokning av platser" (läst 2026-09-27)
    tips: ['Hönö Klåva har ett tjugotal butiker samt restauranger och kaféer.', 'Cykelvägar går från Göteborgs centrum ut till Lilla Varholmen, där vägfärjan tar cyklar.', 'Hönö Klåva Hamns ställplats utsågs till Årets Ställplats 2019 av tidningen Husbil & Husvagn.', 'Gästhamnen i Hönö Klåva går inte att förboka – kom i god tid på sommaren.'],
    related: ['styrso', 'donso', 'vrango'],
    tags: ['nära göteborg', 'bilfärja', 'fiskeläge', 'familjer'],
    // KÄLLA: Visit Öckerö, Ett centrum för fiske — "var tionde svensk yrkesfiskare" bor i kommunen och levererar tillsammans med kollegerna i Fiskebäck 75 procent av all fisk som fångas i Sverige — https://www.vastsverige.com/visitockero/centrum-for-fiske/ (läst 2026-09-16)
    did_you_know: 'Var tionde svensk yrkesfiskare bor i Öckerö kommun. Tillsammans med kollegerna i Fiskebäck levererar de 75 procent av all fisk som fångas i Sverige.',
    // KÄLLA: https://www.vastsverige.com/visitockero/ — "Hela året går färjorna från Lilla Varholmens färjeläge" (läst 2026-09-27); https://honoklavahamn.se/gasthamn/ — "Högsäsong", "1 april- 30 september", "Mellan 1 april och 31 oktober är vårt servicehus vid hamnkontoret öppet" (läst 2026-09-27); https://skargardshotellethono.se/en/home/ — "open all year round" (läst 2026-09-27)
    seasonal: {
      open: 'Hela året',
      // UPPSKATTNING: sommaren är badsäsong och gästhamnens högsäsong (1 april–30 september); juli är semestermånad.
      peak: 'Juli',
      best: 'Juni eller september',
      bestReason: 'Vägfärjan från Lilla Varholmen är avgiftsfri och går hela året, och hotellet i Hönö Klåva har öppet året runt. Juni och september ligger inom gästhamnens högsäsong (1 april–30 september) men utanför semestermånaden juli.',
      // KÄLLA: https://honoklavahamn.se/gasthamn/ — "I vår gästhamn tillämpas ingen förbokning av platser", "I lågsäsong 1 december – 1 april finns inte vatten att tillgå vid kajerna" (läst 2026-09-27)
      warning: 'Gästhamnen går inte att förboka, och 1 december–1 april finns inget vatten vid kajerna.',
      months: ['limited','limited','limited','limited','open','open','peak','open','open','open','limited','limited'],
    },
  },
  {
    slug: 'gullholmen',
    name: 'Gullholmen',
    region: 'bohuslan',
    regionLabel: 'Bohuslän',
    emoji: '🏘',
    // KÄLLA: Västsverige/Orust, "Bilfria öar i södra Bohuslän" — bekräftar att Gullholmen är bilfri ö och ett av Bohusläns äldsta fiskelägen — https://www.vastsverige.com/en/orust/things-to-do/boating/car-less-islands/ (läst 2026-09-16)
    // KÄLLA: Västsverige, "Gullholmen och Härmanö" — bekräftar att samhällshalvan brukar kallas Sveriges mest tätbebyggda ö och att andra halvan ligger på Härmanö — https://www.vastsverige.com/sodrabohuslan/produkter/gullholmen-och-harmano/?site=5 (läst 2026-09-16)
    tagline: 'Ett av Bohusläns äldsta fiskelägen — bilfritt, tätbebyggt, med Härmanö inpå knuten.',
    description: [
      // KÄLLA: Bohusläns museum, Kunskapsbanken "Gullholmen" — bekräftar äldsta säkra belägg 1588, ca 100 hus och ca 400 invånare år 1800 samt drygt 800 invånare 1910 — https://www.bohuslansmuseum.se/kunskapsbanken_bohuslans_historia/gullholmen/ (läst 2026-09-16)
      // KÄLLA: Västsverige, "Gullholmen och Härmanö" — bekräftar "Sveriges mest tätbebyggda ö" med myller av sommarbostäder och året runt-villor — https://www.vastsverige.com/sodrabohuslan/produkter/gullholmen-och-harmano/?site=5 (läst 2026-09-16)
      'Gullholmen är ett av Bohusläns äldsta fiskelägen. Ön omnämns första gången vid 1500-talets slut — det äldsta säkra belägget är från 1588, då två män uppges ha byggt sig bodar på holmen. Vid år 1800 fanns ungefär etthundra bostadshus och cirka 400 invånare på ön, och befolkningen var som störst omkring 1910 med drygt 800 personer. Den ena halvan av samhället ligger på en holme som brukar kallas Sveriges mest tätbebyggda ö: ett tätt myller av sommarbostäder och året runt-villor, med gränder som slingrar sig mellan husen.',
      // KÄLLA: Västsverige/Orust, "Bilfria öar i södra Bohuslän" — bekräftar att Gullholmen är bilfri och har butik, kyrka, bibliotek och biograf — https://www.vastsverige.com/en/orust/things-to-do/boating/car-less-islands/ (läst 2026-09-16)
      // KÄLLA: Västsverige, "Gullholmen och Härmanö" — bekräftar ett fåtal restauranger och caféer i hamnområdet samt gästhamn — https://www.vastsverige.com/sodrabohuslan/produkter/gullholmen-och-harmano/?site=5 (läst 2026-09-16)
      'Gullholmen är bilfritt. Trots storleken är ön bebodd året runt och har butik, kyrka, bibliotek och biograf. I hamnområdet finns ett fåtal restauranger och caféer samt en gästhamn.',
      // KÄLLA: Västsverige, "Gullholmen och Härmanö" — bekräftar att andra halvan av samhället ligger på Härmanö, ett av Bohusläns största naturreservat — https://www.vastsverige.com/sodrabohuslan/produkter/gullholmen-och-harmano/?site=5 (läst 2026-09-16)
      // KÄLLA: Västsverige, "Vandra på Gullholmen och Härmanö" — bekräftar leder från färjeläget hela vägen till Härmanö huvud, ca 8 km uppdelat i etapper — https://www.vastsverige.com/en/orust/trails/harmano-hiking-trails/ (läst 2026-09-16)
      'Andra halvan av samhället ligger på Härmanö, som är ett av Bohusläns största naturreservat. Från färjeläget kan du gå söderut genom samhället och vidare ut i reservatet — hela vägen ut till Härmanö huvud är det omkring åtta kilometer, uppdelat på etapper av olika svårighetsgrad.',
      // KÄLLA: Länsstyrelsen Västra Götaland, Härmanö naturreservat — bildat 1967, ca 1 481 ha, nakna hällmarker och ljunghedar, safsa med enda kända förekomsten i Bohuslän, Natura 2000, förvaltas av Västkuststiftelsen — https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/harmano.html (läst 2026-09-16)
      'Härmanö naturreservat bildades 1967 och omfattar cirka 1 481 hektar. Landskapet domineras av nakna hällmarker med inslag av vidsträckta ljunghedar, och här växer bland annat gullviva, krissla och ängsnycklar. Ormbunken safsa har sin enda kända förekomst i Bohuslän i reservatet. Området ingår i EU:s nätverk av skyddade områden, Natura 2000, och förvaltas av Västkuststiftelsen.',
      // KÄLLA: Bohusläns museum, Kunskapsbanken "Gullholmen" — bekräftar att Gullholmens kyrka byggdes 1799 på Lilla Härmanö — https://www.bohuslansmuseum.se/kunskapsbanken_bohuslans_historia/gullholmen/ (läst 2026-09-16)
      // KÄLLA: Västsverige, "Gullholmen och Härmanö" — bekräftar Skepparhuset från 1893 — https://www.vastsverige.com/sodrabohuslan/produkter/gullholmen-och-harmano/?site=5 (läst 2026-09-16)
      // KÄLLA: https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/harmano.html — "Husen står tätt tillsammans, vilket beror på att Gullholmen fram till 1999 var en så kallad kronoholme.", "På öns norra del ligger Stenstugan, som är ett av de äldsta husen på ön. Det är idag museum." (läst 2026-09-27)
      // KÄLLA: https://www.vastsverige.com/sodrabohuslan/produkter/gullholmen-och-harmano/?site=5 — "Det innebar att marken ägdes av staten och var fri att bygga på, vilket banade väg för den täta bebyggelse som idag kännetecknar ön." (läst 2026-09-27)
      'Gullholmens kyrka byggdes 1799 på Lilla Härmanö, och på ön står Skepparhuset från 1893. På öns norra del ligger Stenstugan, ett av de äldsta husen, som i dag är sjöfarts- och fiskemuseum. Att husen står så tätt beror på att Gullholmen fram till 1999 var en så kallad kronoholme: marken ägdes av staten och var fri att bygga på.',
    ],
    // KÄLLA: Länsstyrelsen Västra Götaland, Härmanö naturreservat — ca 1 481 ha — https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/harmano.html (läst 2026-09-16)
    // KÄLLA: Bohusläns museum, Kunskapsbanken "Gullholmen" — drygt 800 invånare omkring 1910; år 2010 tio fastboende på Gullholmen och närmare 100 på Härmanö — https://www.bohuslansmuseum.se/kunskapsbanken_bohuslans_historia/gullholmen/ (läst 2026-09-16)
    facts: {
      area: 'Gullholmen + Härmanö; Härmanö naturreservat ca 1 481 ha',
      population: 'som mest drygt 800 invånare omkring 1910; år 2010 tio fastboende på Gullholmen och närmare 100 på Härmanö',
      // KÄLLA: https://www.vastsverige.com/sodrabohuslan/produkter/gullholmen-och-harmano/?site=5 — "Gullholmen är ett av Bohusläns äldsta fiskelägen", "Mycket av öns gamla karaktär finns bevarad än idag med sjöbodar, bryggor och en välbesökt gästhamn." (läst 2026-09-27); https://www.bohuslansmuseum.se/kunskapsbanken_bohuslans_historia/gullholmen/ — "Väl intrampade prång och gränder mellan husen leder ner mot vattnet." (läst 2026-09-27)
      known_for: 'Ett av Bohusläns äldsta fiskelägen, bevarade sjöbodar, täta gränder, bilfritt',
      season: 'Maj–September',
    },
    facts_provenance: {
      area: 'matt',
      population: 'matt',
      known_for: 'matt',
      season: 'bedomning',
    },
    activities: [
      // KÄLLA: Västsverige, "Gullholmen och Härmanö" — bekräftar "Sveriges mest tätbebyggda ö" och gränderna mellan husen — https://www.vastsverige.com/sodrabohuslan/produkter/gullholmen-och-harmano/?site=5 (läst 2026-09-16)
      { icon: '🚶', name: 'Vandra gränderna', desc: 'Samhället ligger på vad som brukar kallas Sveriges mest tätbebyggda ö — gränderna löper tätt mellan husen och öppnar sig mot hamnen och havet.' },
      // KÄLLA: Länsstyrelsen Västra Götaland, Härmanö naturreservat — "Det finns fina uppmärkta stigar på Härmanö, och ett par av dem är anpassade för rullstol", stigen leder till Härmanö huvud med badplats och utkiksplats — https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/harmano.html (läst 2026-09-16)
      { icon: '🥾', name: 'Vandra på Härmanö', desc: 'Uppmärkta stigar leder ut till Härmanö huvud, med badplats och utkiksplats. Ett par av stigarna är anpassade för rullstol.' },
      // KÄLLA: Västsverige/Orust, "Bilfria öar i södra Bohuslän" — bekräftar butik, kyrka, bibliotek och biograf på Gullholmen — https://www.vastsverige.com/en/orust/things-to-do/boating/car-less-islands/ (läst 2026-09-16)
      { icon: '🎬', name: 'Bio, bibliotek och butik', desc: 'Ön har butik, kyrka, bibliotek och biograf.' },
      // KÄLLA: Västsverige, "Gullholmen och Härmanö" — tät bebyggelse på holmen; Länsstyrelsen Västra Götaland, Härmanö naturreservat — nakna hällmarker — https://www.vastsverige.com/sodrabohuslan/produkter/gullholmen-och-harmano/?site=5 (läst 2026-09-16)
      { icon: '📸', name: 'Fotografera', desc: 'Den täta bebyggelsen på holmen och de öppna hällmarkerna på Härmanö ger två helt olika motiv inom gångavstånd.' },
    ],
    accommodation: [
      // KÄLLA: https://www.gullholmsbaden.se/?page_id=6253 — "Gullholmsbaden är en unik destination belägen vid strandkanten på vackra Gullholmen", "Anläggningen erbjuder 69 fullt utrustade stugor" (läst 2026-09-27)
      // KÄLLA: https://www.gullholmsbaden.se/?page_id=360 — "I receptionen kan man hyra klubbor för att spela minigolf på vår bana.", "Bastun bokas i vår reception" (läst 2026-09-27); https://www.gullholmsbaden.se/ — "Här finns utmärkta konferensmöjligheter året runt" (läst 2026-09-27)
      { name: 'Gullholmsbaden', type: 'Stugby', desc: 'Stugby vid strandkanten i Gullholmen med 69 fullt utrustade stugor. Egen restaurang, konferenslokaler, minigolf och en bastu som bokas i receptionen.' },
    ],
    getting_there: [
      // KÄLLA: https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6381__0__LINE__20260915__20261031__de9ca77a-74b2-4c80-a07f-0e9d5aafbcd8__0%2C0__2790296.pdf — "Tuvesvik–Gullholmen–Käringön", "Gäller 15 sept - 31 okt 2026" (läst 2026-09-27). Tuvesvik–Gullholmen tar 5 min i varje tur (t.ex. 08.30–08.35 hamnen, 12.30–12.35 piren); båten lägger till vid Gullholmen hamnen eller Gullholmen piren beroende på tur.
      // KÄLLA: https://www.vastsverige.com/en/orust/things-to-do/boating/car-less-islands/ — "line 381, operate every day all year round", "You can bring a bicycle" (läst 2026-09-27). OBS: samma sida anger tio minuter, men Västtrafiks tidtabell och https://www.vastsverige.com/orust/produkter/farja-tuvesvik-gullholmen-karingon/ ("5 minuter till Härmanö/Gullholmen") säger fem.
      // KÄLLA: https://www.bohuslansmuseum.se/kunskapsbanken_bohuslans_historia/gullholmen/ — "Färjeläget ligger i Gullholmens hamn på nordöstra Hermanö och därifrån går en bro över till Gullholmen." (läst 2026-09-27)
      { method: 'Passagerarfärja från Tuvesvik', from: 'Tuvesvik (Orust)', time: 'ca 5 min', desc: 'Västtrafiks linje 381 från Tuvesvik på västra Orust går alla dagar året runt. Överfarten tar 5 minuter, och båten lägger till vid Gullholmen hamnen eller Gullholmen piren beroende på tur. Cykel kan tas med.', icon: '⛴' },
    ],
    // KÄLLA: https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6381__0__LINE__20260915__20261031__de9ca77a-74b2-4c80-a07f-0e9d5aafbcd8__0%2C0__2790296.pdf — "Tuvesvik–Gullholmen–Käringön", "Gäller 15 sept - 31 okt 2026" (läst 2026-09-27). Från Tuvesvik mån–fre 9 avgångar varav 8 angör Gullholmen (07.00 går direkt till Käringön), lördag 7 och söndag 7 avgångar som alla angör Gullholmen; restid 5 min.
    // KÄLLA: https://www.vastsverige.com/en/orust/things-to-do/boating/car-less-islands/ — "line 381, operate every day all year round" (läst 2026-09-27)
    transport_meta: {
      // UPPSKATTNING: 120 min från Göteborg till Gullholmen är inte kontrollerat mot tidtabell (Västtrafiks reseplanerare kräver JavaScript och anslutande bussar till Tuvesvik hittades inte i de öppna linjetabellerna).
      from_city_min: 120,
      nearest_hub: 'Tuvesvik (Orust)',
      from_nearest_hub_min: 5,
      operator: 'Västtrafik, linje 381 (personfärja året runt)',
      frequency: 'Mån–fre 8 turer, lör–sön 7 turer Tuvesvik–Gullholmen (15 sept–31 okt 2026)',
    },
    harbors: [
      // KÄLLA: https://www.orust.se/uppleva-och-gora/gasthamnar/gullholmens-gasthamn — "Gullholmens hamn är öppen 1 april till 30 september.", "50 platser. Djup cirka 1,5-3,5 meter.", "Servicebyggnad med toalett, dusch, tvättmaskin, torktumlare.", "Sugtömningsstation där fritidsbåtar kan tömma sin latrintank, mellan 1 april och 31 oktober.", "Förhandsbokning av gästplats sker via Dockspot. Hamnen är kontantfri." (läst 2026-09-27)
      // KÄLLA: https://www.bohuslansmuseum.se/kunskapsbanken_bohuslans_historia/gullholmen/ — "Gästhamn finns i södra delen av hamnbassängen, öppen under säsongen." (läst 2026-09-27)
      { name: 'Gullholmens Gästhamn', desc: 'Gästhamn i södra delen av hamnbassängen med 50 platser på cirka 1,5–3,5 meters djup, öppen 1 april–30 september. Servicebyggnad med toalett, dusch, tvättmaskin och torktumlare, sugtömningsstation för latrintank (1 april–31 oktober). Kontantfri hamn, förbokning via Dockspot.', fuel: false, service: ['El', 'Dusch', 'Toalett', 'Tvättmaskin'] },
    ],
    restaurants: [
      // KÄLLA: https://gullholmenshamnkrog.se/ — "Torget 105, Gullholmen", "Kom och njut av en unik matupplevelse vid vattnet!", "Vare sig om du kommer för en lunch i solen eller en middag med vänner", "Hör av er till oss för att boka bord eller take away.", "Öppettider Sep - Dec 2026" (läst 2026-09-27)
      { name: 'Gullholmens Hamnkrog', type: 'Krog', desc: 'Krog vid vattnet på Torget i Gullholmen — lunch och middag, bordsbokning och take away. Har öppet även under hösten.' },
      // KÄLLA: https://www.gullholmsbaden.se/?page_id=19 — "Sommarterrass med havsutsikt", "Njut av mat lagad från grunden", "missa inte vår legendariska Räksmörgås", "Hantverkarlunch kl. 12.00 – 14.00" (läst 2026-09-27)
      { name: 'Gullholmsbaden Restaurang', type: 'Restaurang', desc: 'Restaurang på stugbyn Gullholmsbaden med sommarterrass mot havet. Mat lagad från grunden, räksmörgåsen är husets egen favorit, och vardagar serveras hantverkarlunch som förbokas.' },
    ],
    tips: [
      // KÄLLA: Västsverige, "Vandra på Gullholmen och Härmanö" — markerade leder från färjeläget ut i Härmanö naturreservat — https://www.vastsverige.com/en/orust/trails/harmano-hiking-trails/ (läst 2026-09-16)
      'Ta med vandringsskor — härifrån går markerade leder rakt ut i Härmanö naturreservat.',
      // KÄLLA: Västsverige, "Färja Tuvesvik – Gullholmen – Käringön" — parkering vid Tuvesvik betalas med kort eller SMS, kontanter tas inte emot — https://www.vastsverige.com/orust/produkter/farja-tuvesvik-gullholmen-karingon/ (läst 2026-09-16)
      'Parkera vid Tuvesvik och ta färjan över — parkeringen betalas med kort eller SMS, kontanter tas inte emot.',
      // KÄLLA: https://www.bohuslansmuseum.se/kunskapsbanken_bohuslans_historia/gullholmen/ — "Färjeläget ligger i Gullholmens hamn på nordöstra Hermanö och därifrån går en bro över till Gullholmen." (läst 2026-09-27)
      'Färjan lägger till på Härmanö-sidan av hamnen — till själva Gullholmen går du över bron.',
    ],
    related: ['marstrand', 'karingon', 'orust'],
    tags: ['bohuslän', 'historisk', 'bilfritt', 'fiskeläge', 'fotografi', 'familjer'],
    insiderTips: [
      // KÄLLA: https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/harmano.html — "I norr ligger Ulkhåleberget. Berget har delats i klyftor och är fyllt av gångar och grottor.", "En gammal ek är så välbesökt att den har en egen gästbok. Den står på östra sidan av ön söder om Myren" (läst 2026-09-27)
      'I norra Härmanö ligger Ulkhåleberget, fyllt av klyftor, gångar och grottor. På öns östra sida söder om Myren står en gammal ek som är så välbesökt att den har en egen gästbok.',
    ],
    dog_friendly: true,
    // KÄLLA: https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/harmano.html — "medföra lös hund" (förbjudet i naturreservatet) (läst 2026-09-27)
    dog_notes: 'I Härmanö naturreservat måste hunden vara kopplad.',
    // KÄLLA: Bohusläns museum, Kunskapsbanken "Gullholmen" — äldsta säkra belägg 1588, 24 bofasta 1610, drygt 800 invånare omkring 1910, tio fast bosatta 2010 — https://www.bohuslansmuseum.se/kunskapsbanken_bohuslans_historia/gullholmen/ (läst 2026-09-16)
    did_you_know: 'Det äldsta säkra belägget för bosättning på Gullholmen är från 1588, då två män uppges ha byggt sig bodar på holmen. År 1610 fanns 24 bofasta. Befolkningen var som störst omkring 1910 med drygt 800 invånare — år 2010 var tio personer fast bosatta på själva Gullholmen.',
    amenities: {
      restaurant: true,
      shop: true,
      accommodation: true,
      // KÄLLA: https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/harmano.html — "Välj mellan sandstrand och klippor." (läst 2026-09-27)
      beach: true,
      camping: false,
    },
    activity_meta: {
      // KÄLLA: https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/harmano.html — "Prova vid Skottarn, Gullholmsbaden, Grindebacken eller Härmanö huvud. Du kan också bada från Ångbåtsbryggan på Gullholmen och det finns flera badstegar på klipporna väster om kyrkan." (läst 2026-09-27)
      bad: { beaches: ['Skottarn', 'Gullholmsbaden', 'Grindebacken', 'Härmanö huvud', 'Ångbåtsbryggan på Gullholmen', 'Badstegar på klipporna väster om kyrkan'] },
    },
  },

  // ─── KLÄDESHOLMEN ────────────────────────────────────────────────────────
  {
    slug: 'kladesholmen',
    name: 'Klädesholmen',
    region: 'bohuslan',
    regionLabel: 'Bohuslän',
    emoji: '🐟',
    // KÄLLA: https://kladesholmen.com/ — "solens & sillens ö" (läst 2026-09-27)
    // KÄLLA: https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/tjorn-pa-hosten-och-vintern/tjorn-och-sillen — "Ända sedan 1500-talet har Klädesholmen varit en viktig plats för sillhandeln." (läst 2026-09-27)
    // KÄLLA: https://www.vastsverige.com/en/tjorn/products/kladesholmens-sauna/ — "In the beautiful Jungfruviken on Klädesholmen" (läst 2026-09-27)
    tagline: 'Sillens och solens ö — 1500-talets sillhandel, Sillebua och bastu i Jungfruviken.',
    description: [
      // KÄLLA: https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/tjorn-pa-hosten-och-vintern/tjorn-och-sillen — "Ända sedan 1500-talet har Klädesholmen varit en viktig plats för sillhandeln.", "Riktig fart tog det under den stora sillperioden på 1700-talet, när det kokade av sill i vikarna.", "Nästa sillperiod kom runt 1870.", "Sillfabriker växte fram", "1967 fanns det 26 fabriker på Klädesholmen.", "Vid millennieskiftet var det tre fabriker kvar som bestämde sig för att gå samman." (läst 2026-09-27)
      // KÄLLA: https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/oar-runt-tjorn — "Under den stora sillperioden 1747–1808 bodde uppemot 1 000 personer på Klädesholmen" (läst 2026-09-27)
      // KÄLLA: https://www.vastsverige.com/en/tjorn/products/kladesholmen/ — "the three remaining factories merged to form Klädesholmen Seafood AB", "In 2015, herring production was transferred to larger factory premises in Rönnäng, on Tjörn, while the factory outlet remained on Klädesholmen." (läst 2026-09-27)
      'Klädesholmen har varit en viktig plats för sillhandeln ända sedan 1500-talet. Under den stora sillperioden 1747–1808 bodde uppemot 1 000 personer på ön, och det kokade av sill i vikarna. Nästa sillperiod kom runt 1870, och då växte sillfabrikerna fram. År 1967 fanns 26 fabriker på ön. Vid millennieskiftet återstod tre, som gick samman till Klädesholmen Seafood; 2015 flyttades sillproduktionen till större lokaler i Rönnäng på Tjörn, medan fabriksbutiken blev kvar på ön.',
      // KÄLLA: https://kladesholmen.com/att-gora/museum/ — "fisk- och sillberedning från ca 1860 fram till dagens moderna industri" — öppnade 1995 i en tidigare konservfabrik, flyttade 2020 till Sillens hus på Strandgatan 12B, drivs ideellt, dokumentationsavdelning med bild, film och intervjuer (läst 2026-09-27)
      'Sillhistorien finns samlad på Sillebua, Klädesholmens museum, som visar öns historia och utveckling med tonvikt på fisk- och sillberedning från omkring 1860 fram till dagens moderna industri. Museet öppnade 1995 i en gammal konservfabrik och flyttade 2020 till Sillens hus på Strandgatan 12B. Det drivs ideellt och har en dokumentationsavdelning med fotografier, film och inspelade intervjuer.',
      // KÄLLA: https://www.saltosill.se/om-salt-sill/var-historia/ — "Restaurangens specialitet blev sill", "Sveriges första flytande hotell", "Hotellet byggdes på flytande pontoner, som specialtillverkades av", "i juli 2008", "bogserades de sex hotellmodulerna från Wallhamn", "Våren 2013 stod de 300 kvadratmeter nya lokalerna klara", "Destination Salt & Sill har idag fyra olika restauranger. Salt & Sill, Sjöboden, Saltbaren och Holmens kiosk." (läst 2026-09-27)
      'Restaurangen Salt & Sill har sill som specialitet. År 2008 fick den sällskap av Sveriges första flytande hotell: de sex hotellmodulerna byggdes på specialtillverkade pontoner vid Wallhamn och bogserades till Klädesholmen i juli 2008. Våren 2013 tillkom 300 kvadratmeter konferens- och festlokaler, och i dag driver Salt & Sill fyra serveringar på ön: Salt & Sill, Sjöboden, Saltbaren och Holmens kiosk.',
      // KÄLLA: https://www.vastsverige.com/en/tjorn/products/kladesholmen/ — "linked by a bridge that was built in 1983", "traditional white wooden houses that are typical of fishing communities along the coast", "Skomakaregatan (Shoemaker Street), Kustroddarvägen (Coastguard Road)", "Fiskargränd", "granite sculpture: Faith, Hope and Love" (läst 2026-09-27)
      // KÄLLA: https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/oar-runt-tjorn — "till Klädesholmen och Lilla Askerön kan du åka bil eller buss" (läst 2026-09-27)
      'Klädesholmen är broförbundet med Tjörn sedan 1983, och hit kan man åka både bil och buss. Bebyggelsen består av de traditionella vita trähus som är typiska för fiskesamhällena längs kusten, och gatorna bär yrkesnamn som Skomakaregatan, Kustroddarvägen och Fiskargränd. Längst i väster, där husen övergår i klippor vid vattenbrynet, står Claes Hakes granitskulptur Tro, hopp och kärlek.',
      // KÄLLA: https://kladesholmen.com/ — "trånga gränder, med tät bebyggelse" (läst 2026-09-27)
      // KÄLLA: https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/oar-runt-tjorn — "Klädesholmen är egentligen två holmar – den södra är Klädesholmen med den äldsta bebyggelsen, den norra är Koholmen.", "så skrev biskop Jens Nilsson från Oslo i sin resa genom Bohuslän 1594", "En gissning som mycket väl kan stämma är att de första bosättarna kom hit på 1200-talet." (läst 2026-09-27)
      // KÄLLA: https://www.vastsverige.com/en/tjorn/products/kladesholmen/ — "by 1830 the population had dropped to just over 400", "almost a thousand people lived on the island" (läst 2026-09-27)
      'Gränderna är trånga och bebyggelsen tät. Klädesholmen är egentligen två holmar: den södra, Klädesholmen, med den äldsta bebyggelsen, och den norra, Koholmen. De första bosättarna kom troligen på 1200-talet, och när biskop Jens Nilsson från Oslo reste genom Bohuslän 1594 beskrev han ön som ett gammalt fiskeläge. År 1830 hade befolkningen sjunkit till drygt 400, för att i början av 1900-talet nå nästan tusen invånare.',
    ],
    facts: {
      // KÄLLA: https://www.saltosill.se/om-salt-sill/var-historia/ — "endast en timmes bilfärd bort" (läst 2026-09-27)
      // KÄLLA: https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6208__0__LINE__20251214__20261212__943570e0-dc73-40ba-8902-068c3d54c30d__0%2C0__2597259.pdf — "Tjörn–Stenungsund/Göteborg", "Gäller 14 dec 2025 - 12 dec 2026", "Klädesholmen östra 08.33 09.33 10.33 11.33 12.33 13.33 14.33 15.33 16.33 17.33 18.33 19.33 20.33 21.33 22.33", "Stenungsunds station 09.28 10.28 11.28 12.28 13.28 14.28 15.28 16.28 17.28 18.28 19.28 20.28 21.28 22.28 23.28" — t.ex. Klädesholmen östra 08.33 → Stenungsunds station 09.28 = 55 min (läst 2026-09-27)
      travel_time: 'Ca 1 timme med bil från Göteborg; buss ca 55 min från Stenungsund',
      // KÄLLA: https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/tjorn-pa-hosten-och-vintern/tjorn-och-sillen — "Ända sedan 1500-talet har Klädesholmen varit en viktig plats för sillhandeln." (läst 2026-09-27)
      // KÄLLA: https://www.saltosill.se/om-salt-sill/var-historia/ — "Sveriges första flytande hotell" (läst 2026-09-27)
      // KÄLLA: https://www.vastsverige.com/en/tjorn/products/kladesholmens-sauna/ — "The sauna is operated by the Klädesholmen Sauna Association." (läst 2026-09-27)
      known_for: 'Sillhistoria och sillindustri, Sillebua museum, Salt & Sill, bastu',
    },
    facts_provenance: {
      travel_time: 'matt',
      known_for: 'matt',
    },
    activities: [
      // KÄLLA: https://www.saltosill.se/om-salt-sill/var-historia/ — "Restaurangens specialitet blev sill", "Sveriges första flytande hotell", "bogserades de sex hotellmodulerna från Wallhamn", "i juli 2008" (läst 2026-09-27)
      { icon: '🍽', name: 'Salt & Sill', desc: 'Restaurang med sill som specialitet och Sveriges första flytande hotell intill — sex hotellmoduler på pontoner, bogserade till ön i juli 2008.' },
      // KÄLLA: https://www.vastsverige.com/en/tjorn/products/kladesholmens-sauna/ — "In the beautiful Jungfruviken on Klädesholmen", "there's a clever solution where you can pump seawater into the hot tub", "In addition to piers and ladders, there is a spacious relaxation area, a kitchen, changing rooms, showers, and toilets.", "It can accommodate groups of up to 12 people.", "The facility is accessible for all.", "The sauna is operated by the Klädesholmen Sauna Association." (läst 2026-09-27)
      // KÄLLA: https://kladesholmensbastu.se/ — "magnifika utsikten mot väst, med Flatholmen och havet i blickfånget" — bokning via boka.kladesholmensbastu.se (läst 2026-09-27)
      { icon: '🧖', name: 'Havsbastu', desc: 'Klädesholmens bastu ligger bland klipporna i Jungfruviken med utsikt västerut mot Flatholmen och drivs av Klädesholmens Bastuförening. Bryggor och badstegar ner i havet, badtunna som fylls med havsvatten, kök, omklädningsrum, duschar och toaletter. Anläggningen är tillgänglighetsanpassad och tar upp till 12 personer. Bokas via bastuföreningen.' },
      // KÄLLA: https://kladesholmen.com/att-gora/museum/ — "fisk- och sillberedning från ca 1860 fram till dagens moderna industri" — Sillens hus, Strandgatan 12B, flyttade dit 2020 (läst 2026-09-27)
      { icon: '🏛', name: 'Sillebua', desc: 'Klädesholmens museum visar öns fisk- och sillberedning från omkring 1860 fram till i dag. Ligger i Sillens hus på Strandgatan 12B, dit museet flyttade 2020.' },
      // KÄLLA: https://www.vastsverige.com/tjorn/produkter/house-of-herrings/ — "House of Herrings – världens första och enda sillbutik – hittar du mitt på Klädesholmen i Bohuslän, precis intill Sillmuseet.", "samt köpa tillbehör för egna inläggningar", "Du hittar också lokala delikatesser från Bohuslän och fina souvenirer att ta med hem" (läst 2026-09-27)
      // KÄLLA: https://www.saltosill.se/houseofherrings/ — "en butik fylld av sill, tradition och smakupplevelser" — drivs av Salt & Sill, Strandgatan 12, sill från Klädesholmen Seafood (läst 2026-09-27)
      { icon: '🐟', name: 'House of Herrings', desc: 'Sillbutik mitt på Klädesholmen, precis intill sillmuseet, som drivs av Salt & Sill. Här finns sill i traditionella och nya smaker, tillbehör för egna inläggningar, lokala delikatesser och souvenirer.' },
    ],
    accommodation: [
      // KÄLLA: https://www.saltosill.se/hotell/ — "Sveriges första flytande hotell", "Enkelrum och dubbelrum med havsutsikt", "vår enda svit", "Villa stora Salt är en separat villa", "Villa lilla Salt är en separat villa" (läst 2026-09-27)
      // KÄLLA: https://www.saltosill.se/aktiviteter/bad-och-bastubaten/ — "Förtöjd vid Salt & Sills brygga ligger S/S Silla – vår bad- och bastubåt" (läst 2026-09-27)
      // KÄLLA: https://www.saltosill.se/om-salt-sill/var-historia/ — "Destination Salt & Sill har idag fyra olika restauranger." (läst 2026-09-27)
      // KÄLLA: https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/ata-och-bo — "Flytande hotell vid Klädesholmen, en ö med broförbindelse." (läst 2026-09-27)
      { name: 'Salt & Sill', type: 'Hotell', desc: 'Flytande hotell vid Klädesholmen, enligt verksamheten "Sveriges första flytande hotell". Enkel- och dubbelrum med havsutsikt, en svit och två separata villor på land. Fyra serveringar och konferens på anläggningen, och vid bryggan ligger bad- och bastubåten S/S Silla.' },
    ],
    getting_there: [
      // KÄLLA: https://www.vastsverige.com/en/tjorn/products/kladesholmen/ — "linked by a bridge that was built in 1983" (läst 2026-09-27)
      // KÄLLA: https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/oar-runt-tjorn — "Kör väg 169 mot Rönnäng. Ta höger i Bleket, mot bron som leder över till Klädesholmen. Parkering finns före och efter bron." (läst 2026-09-27)
      // KÄLLA: https://www.saltosill.se/om-salt-sill/var-historia/ — "endast en timmes bilfärd bort" (läst 2026-09-27)
      { method: 'Bil via Tjörn', from: 'Stenungsund / Göteborg', desc: 'Klädesholmen är broförbundet med Tjörn sedan 1983. Kör över Tjörnbroarna och väg 169 mot Rönnäng, ta höger i Bleket mot bron till Klädesholmen. Parkering finns före och efter bron. Ungefär en timme från Göteborg.', icon: '🚗' },
      // KÄLLA: https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6208__0__LINE__20251214__20261212__943570e0-dc73-40ba-8902-068c3d54c30d__0%2C0__2597259.pdf — "Tjörn–Stenungsund/Göteborg", "Gäller 14 dec 2025 - 12 dec 2026", "Klädesholmen östra 08.33 09.33 10.33 11.33 12.33 13.33 14.33 15.33 16.33 17.33 18.33 19.33 20.33 21.33 22.33", "Stenungsunds station 09.28 10.28 11.28 12.28 13.28 14.28 15.28 16.28 17.28 18.28 19.28 20.28 21.28 22.28 23.28", "Klädesholmen östra 05.03 06.03 06.33 07.03 07.33 08.33", "Nils Ericson Terminalen 06.02 06.35 07.05 07.20 07.32 07.35 08.05" — lör/sön Klädesholmen östra 08.33 → Stenungsunds station 09.28 (55 min); vardagar Klädesholmen östra 06.03 → Nils Ericson Terminalen 07.35 (92 min) (läst 2026-09-27)
      // KÄLLA: https://www.tjorn.se/bygga-bo-miljo-och-trafik/trafik-och-resor/buss-bat-och-tag — "Närmaste tågstation ligger i Stenungsund.", "Inom Tjörn kan du åka linjebuss eller åka med expressbussarna som fortsätter till Stenungsund och Göteborg." (läst 2026-09-27)
      { method: 'Västtrafik buss', from: 'Stenungsund / Göteborg', desc: 'Tjörnexpressen (TEXP) stannar vid Klädesholmen östra och går ungefär en gång i timmen till och från Stenungsunds station, där närmaste tågstation finns – ca 55 minuter. Vardagsmorgnar går vissa turer direkt till Nils Ericson Terminalen i Göteborg, ca 1,5 timme (tidtabell 14 dec 2025–12 dec 2026).', icon: '🚌' },
    ],
    transport_meta: {
      // KÄLLA: https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6208__0__LINE__20251214__20261212__943570e0-dc73-40ba-8902-068c3d54c30d__0%2C0__2597259.pdf — "Tjörn–Stenungsund/Göteborg", "Gäller 14 dec 2025 - 12 dec 2026", "Klädesholmen östra 05.03 06.03 06.33 07.03 07.33 08.33", "Nils Ericson Terminalen 06.02 06.35 07.05 07.20 07.32 07.35 08.05" — vardagar Klädesholmen östra 06.03 → Nils Ericson Terminalen 07.35 = 92 min (ingen bil-/buss-sida anger 75 min) (läst 2026-09-27)
      from_city_min: 92,
      nearest_hub: 'Stenungsunds station',
      // KÄLLA: https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6208__0__LINE__20251214__20261212__943570e0-dc73-40ba-8902-068c3d54c30d__0%2C0__2597259.pdf — "Klädesholmen östra 08.33 09.33 10.33 11.33 12.33 13.33 14.33 15.33 16.33 17.33 18.33 19.33 20.33 21.33 22.33", "Stenungsunds station 09.28 10.28 11.28 12.28 13.28 14.28 15.28 16.28 17.28 18.28 19.28 20.28 21.28 22.28 23.28" — 08.33 → 09.28 = 55 min, en tur i timmen lör 08.33–22.33 (läst 2026-09-27)
      from_nearest_hub_min: 55,
      operator: 'Västtrafik (buss) – ön är broförbunden',
      line: 'Tjörnexpressen (TEXP)',
      // KÄLLA: https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6208__0__LINE__20251214__20261212__943570e0-dc73-40ba-8902-068c3d54c30d__0%2C0__2597259.pdf — "Klädesholmen östra 08.33 09.33 10.33 11.33 12.33 13.33 14.33 15.33 16.33 17.33 18.33 19.33 20.33 21.33 22.33" — en tur i timmen 08.33–22.33 lördagar; vardagar och söndagar likaså ungefär varje timme (läst 2026-09-27)
      frequency: 'Ungefär en tur i timmen till och från Stenungsunds station alla dagar',
      // KÄLLA: https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/oar-runt-tjorn — "Parkering finns före och efter bron." (läst 2026-09-27)
      car_parking: 'Parkering finns före och efter bron till Klädesholmen',
    },
    harbors: [
      // KÄLLA: https://kladesholmenvh.se/gasthamn/ — "Djupet i gästhamnen är 3-4 meter", "El 6 Ampere ingår i alla priser", "Ja, el och färskvatten finns tillgängligt vid bryggorna.", "Ja, dusch och toalett finns för gästande båtar.", "Förhandsbokning endast Dockspot – 5 platser.", "Högsäsong Vecka 25-33", "8.Grillplats" (läst 2026-09-27)
      // KÄLLA: https://www.vastsverige.com/tjorn/produkter/kladesholmens-gasthamn/ — "Platser: 35", "Gästhamnen har formen av en gryta vilket gör att vinden inte stör.", "Båtkran, dusch, el, livsmedel, mastkran, restaurang, toalett och båtramp. Sugtömning av latrin. Miljöstation. Nära till mataffär." (läst 2026-09-27)
      { name: 'Klädesholmens Gästhamn', desc: 'Gästhamn på öns västsida, 35 platser och 3–4 meters djup. Hamnen är formad som en gryta, vilket ger lä. El (6 A ingår), färskvatten, dusch och toalett, grillplats, sugtömning och miljöstation. Fem platser kan förbokas via Dockspot; högsäsong vecka 25–33. Nära till restauranger och livsmedelsbutik.', spots: 35, fuel: false, service: ['Vatten', 'El', 'Dusch', 'Toalett'] },
    ],
    restaurants: [
      // KÄLLA: https://www.saltosill.se/om-salt-sill/var-historia/ — "Restaurangens specialitet blev sill", "mat av hög kvalitet baserad på lokala råvaror med starka influenser från kust och hav" (läst 2026-09-27)
      // KÄLLA: https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/ata-och-bo — "Restaurang på Klädesholmen" (läst 2026-09-27)
      { name: 'Salt & Sill', type: 'Restaurang', desc: 'Skärgårdskrog på Klädesholmen med sill som specialitet och mat baserad på lokala råvaror från kust och hav. Enligt Salt & Sill har restaurang och hotell öppet året runt.' },
      // KÄLLA: https://www.saltosill.se/restauranger/sjoboden/ — "napolitanska pizzor med krispiga bottnar, färska skaldjur fiskade i Västerhavet, fräscha sallader" — sommaröppet, lokalen kan hyras resten av året (läst 2026-09-27)
      // KÄLLA: https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/ata-och-bo — "som specialiserar sig på pizza" (läst 2026-09-27)
      { name: 'Sjöboden på Salt & Sill', type: 'Restaurang', desc: 'Sommarrestaurang på Salt & Sill med napolitansk pizza, skaldjur fiskade i Västerhavet och sallader, med utsikt över skärgården. Resten av året kan lokalen hyras för sällskap.' },
      // KÄLLA: https://www.saltosill.se/holmens-kiosk/ — "glass, havsbris och sommar på riktigt" — kulglass, fish n chips, grillkorv, wraps, sallader och toast, allt som takeaway; stängd för säsongen (läst 2026-09-27)
      // KÄLLA: https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/ata-och-bo — "Här kan du avnjuta både salt, sött, varmt och kallt." (läst 2026-09-27)
      { name: 'Holmens Kiosk', type: 'Kiosk/Café', desc: 'Sommaröppen kiosk vid vattnet med glass, fish and chips, grillkorv, wraps och toast som takeaway — salt, sött, varmt och kallt.' },
      // KÄLLA: https://www.saltosill.se/om-salt-sill/var-historia/ — "Destination Salt & Sill har idag fyra olika restauranger. Salt & Sill, Sjöboden, Saltbaren och Holmens kiosk." (läst 2026-09-27)
      // KÄLLA: https://www.saltosill.se/restauranger/ — "Saltbaren är en plats där du kan koppla av och njuta av utsikten över havet" (läst 2026-09-27)
      { name: 'Saltbaren', type: 'Bar', desc: 'Bar på Salt & Sill med utsikt över havet.' },
    ],
    tips: [
      // KÄLLA: https://www.vastsverige.com/en/tjorn/products/kladesholmens-sauna/ — "The sauna is operated by the Klädesholmen Sauna Association." (läst 2026-09-27)
      // KÄLLA: https://www.saltosill.se/aktiviteter/bad-och-bastubaten/ — "Förtöjd vid Salt & Sills brygga ligger S/S Silla – vår bad- och bastubåt" (läst 2026-09-27)
      'Bastun i Jungfruviken drivs av Klädesholmens Bastuförening och bokas via dem — Salt & Sill har en egen bad- och bastubåt, S/S Silla, vid sin brygga.',
      // KÄLLA: https://www.vastsverige.com/en/tjorn/products/kladesholmen/ — "linked by a bridge that was built in 1983" (läst 2026-09-27)
      // KÄLLA: https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/oar-runt-tjorn — "Parkering finns före och efter bron." (läst 2026-09-27)
      'Ön är broförbunden sedan 1983 — ingen färja behövs. Parkering finns före och efter bron.',
      // KÄLLA: https://kladesholmen.com/att-gora/museum/ — "fisk- och sillberedning från ca 1860 fram till dagens moderna industri" (läst 2026-09-27)
      // KÄLLA: https://www.vastsverige.com/tjorn/produkter/house-of-herrings/ — "precis intill Sillmuseet" (läst 2026-09-27)
      'Historieintresserade: Sillebua i Sillens hus på Strandgatan 12B samlar öns sillhistoria från omkring 1860 och framåt, och sillbutiken House of Herrings ligger precis intill.',
      // KÄLLA: https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/oar-runt-tjorn — "Sedan 1972 firas Samhällets dag den första lördagen i juli månad med mängder av aktiviteter och gemensam sillunch." (läst 2026-09-27)
      // KÄLLA: https://www.vastsverige.com/en/tjorn/products/kladesholmen/ — "presented on Swedish National Day, on 6 June, which also happens to be Herring Day" (läst 2026-09-27)
      'Sedan 1972 firas Samhällets dag den första lördagen i juli med aktiviteter och gemensam sillunch. Årets sill presenteras varje år på nationaldagen den 6 juni, som också är sillens dag.',
      // KÄLLA: https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/oar-runt-tjorn — "När västvinden friskar i under höst och vinter kommer havsfåglar in mot land.", "Bästa platsen för havsfågelskådning är längst ut vid Västra hamnen." (läst 2026-09-27)
      'När västvinden friskar i under höst och vinter kommer havsfåglar in mot land — bästa platsen för havsfågelskådning är längst ut vid Västra hamnen.',
    ],
    related: ['tjorn', 'orust', 'marstrand'],
    tags: ['mat', 'skaldjur', 'historia', 'bastu', 'romantisk', 'bohuslän'],
    insiderTips: [],
    dog_friendly: true,
    // KÄLLA: https://www.saltosill.se/fragor-svar/ — "Kopplade, Nära sin ägare, Under uppsikt" — hundrum kan förbokas, hundar tillåtna i restaurangens övre del men inte inomhus under julbord, påsk- och midsommarbuffé; hundar kan läggas längs uteserveringen (läst 2026-09-27)
    dog_notes: 'Salt & Sill har hundrum som förbokas. I restaurangens övre del är hundar välkomna om de är kopplade och hålls nära ägaren, dock inte inomhus under julbord, påsk- och midsommarbuffé. Hundar kan också följa med på uteserveringen.',
    // KÄLLA: https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/tjorn-pa-hosten-och-vintern/tjorn-och-sillen — "Ända sedan 1500-talet har Klädesholmen varit en viktig plats för sillhandeln.", "Riktig fart tog det under den stora sillperioden på 1700-talet", "Nästa sillperiod kom runt 1870.", "1967 fanns det 26 fabriker på Klädesholmen.", "Vid millennieskiftet var det tre fabriker kvar som bestämde sig för att gå samman.", "Sill som räckte både till föda och till gatlyktorna i Paris, som lär ha spridit sitt sken med hjälp av sillolja från Bohuslän." (läst 2026-09-27)
    did_you_know: 'Sillen har gått till i Bohuslän i återkommande perioder. Klädesholmen var med redan under 1500-talets sillhandel, och under den stora sillperioden på 1700-talet räckte sillen enligt Tjörns kommun både till föda och till gatlyktorna i Paris, som lär ha lysts upp med sillolja från Bohuslän. En ny sillperiod följde runt 1870. År 1967 fanns 26 fabriker på ön — vid millennieskiftet återstod tre, som gick samman.',
    amenities: {
      restaurant: true,
      shop: true,
      accommodation: true,
      // KÄLLA: https://www.vastsverige.com/en/tjorn/products/kladesholmen/ — "You can relax at one of several swimming areas" (läst 2026-09-27)
      // KÄLLA: https://kladesholmenvh.se/gasthamn/ — "7.Badplats" (läst 2026-09-27)
      beach: true,
      camping: false,
    },
    activity_meta: {
      bad: { beaches: [] },
    },
    seasonal: {
      // KÄLLA: https://kladesholmenvh.se/gasthamn/ — "– Restaurang och hotell öppet året runt" (läst 2026-09-27)
      // KÄLLA: https://www.saltosill.se/restauranger/sjoboden/ — "napolitanska pizzor med krispiga bottnar" — Sjöboden och Holmens kiosk är sommaröppna (läst 2026-09-27)
      open: 'Året runt – ön är broförbunden och Salt & Sills restaurang och hotell har öppet året runt; Sjöboden och kiosken bara sommartid',
      // KÄLLA: https://kladesholmenvh.se/gasthamn/ — "Högsäsong Vecka 25-33" (läst 2026-09-27)
      // KÄLLA: https://kladesholmen.com/att-gora/museum/ — "fisk- och sillberedning från ca 1860" — museet dagligen öppet juli–augusti, lördagar april–juni och september–november (läst 2026-09-27)
      peak: 'Juli–Augusti',
      best: 'September eller Oktober',
      // KÄLLA: https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/oar-runt-tjorn — "När västvinden friskar i under höst och vinter kommer havsfåglar in mot land." (läst 2026-09-27)
      // KÄLLA: https://kladesholmenvh.se/gasthamn/ — "Lågsäsong Vecka 39-16" (läst 2026-09-27)
      // KÄLLA: https://kladesholmensbastu.se/ — "magnifika utsikten mot väst" — bastun öppen alla dagar året runt (läst 2026-09-27)
      bestReason: 'På hösten har Salt & Sills restaurang och hotell fortfarande öppet, bastun i Jungfruviken går att boka alla dagar och gästhamnen har gått över till lågsäsong från vecka 39. När västvinden friskar i kommer havsfåglarna in mot land.',
      // KÄLLA: https://www.saltosill.se/holmens-kiosk/ — "glass, havsbris och sommar på riktigt" — kiosken stängd för säsongen (läst 2026-09-27)
      warning: 'Sjöboden och Holmens Kiosk har bara sommaröppet.',
      // Månader: restaurang och hotell året runt, museet lördagar apr–jun och sep–nov samt dagligen jul–aug, gästhamnens högsäsong v25–33.
      months: ['limited','limited','limited','open','open','open','peak','peak','open','open','limited','limited'],
    },
  },

  // ─── ÅSTOL ───────────────────────────────────────────────────────────────
  {
    slug: 'astol',
    name: 'Åstol',
    region: 'bohuslan',
    regionLabel: 'Bohuslän',
    emoji: '🏚',
    // KÄLLA: https://www.vastsverige.com/en/tjorn/products/astol/ — "Åstol is the small island with the white wooden houses surrounded by rugged rocks rising from the sea", "The island is easy to reach by ferry from Rönnäng" ; https://www.vastsverige.com/tjorn/se-och-gora/bilfria-oar/ — "en bilfri klippö", "Här slingrar sig smala gränder mellan vitmålade trähus" (läst 2026-09-27)
    tagline: 'Bilfri klippö utanför Rönnäng — vita trähus, smala gränder och havet runt om.',
    description: [
      // KÄLLA: https://www.vastsverige.com/en/tjorn/products/astol/ — "surrounded by rugged rocks rising from the sea", "The narrow, car-free streets meander between the houses", "Åstol was first inhabited in the mid-18th century in connection with one of the great herring periods", "More than 20 large steel trawlers had their home port on Åstol in the 1960s", "The fishing industry declined during the 1970s" ; https://www.raa.se/app/uploads/2022/11/V%C3%A4stra-G%C3%B6taland-O_riksintressen.pdf — "Fiskeläge från 1700-talets sillperiod, på en kal minimal ö, som genom en intensiv bebyggelsefas under 1920-1950-talet utvecklats till ett av västkustens mest tättbebyggda kustsamhällen" (läst 2026-09-27)
      'Åstol är en liten klippö utanför Rönnäng på Tjörn, känd för sina vita trähus omgivna av kala klippor som reser sig ur havet. De smala, bilfria gatorna slingrar sig mellan husen. Ön befolkades vid mitten av 1700-talet under en av de stora sillperioderna, och enligt Riksantikvarieämbetet utvecklades fiskeläget genom en intensiv byggperiod på 1920–1950-talen till ett av västkustens mest tättbebyggda kustsamhällen. På 1960-talet hade mer än tjugo stora ståltrålare Åstol som hemmahamn; fisket gick tillbaka under 1970-talet.',
      // KÄLLA: https://astol.se/besok-astol/ — "Till Åstol tar du Västtrafiks linje 361 och personfärjan Ellenor från hållplatsen Rönnängs brygga", "Färjan går cirka en gång i timmen, och överfarten tar mellan 10 och 20 minuter" ; https://www.vastsverige.com/tjorn/produkter/personfarja-ronnang-tjornekalv-dyron-astol/ — "linje 361 alla dagar året runt", "Cykel kan tas med" ; https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6361__1__LINE__20251214__20261212__7486a72d-1af2-4dec-a855-76147a8b68fb__0%2C0__2631548.pdf — "Rönnäng–Tjörnekalv–Dyrön–Åstol–Rönnäng", "Gäller 14 dec 2025 - 12 dec 2026 utom 15 juni - 16 aug" (läst 2026-09-27)
      // Avläst i tabellen (måndag–fredag): Rönnängs brygga 07.50 → Åstol 08.00 (direkt), 07.10 → Dyrön norra 07.20 → Åstol 07.30, 08.50 → Åstol 09.13 via Tjörnekalv och Dyrön.
      'Ön nås med Västtrafiks personfärja linje 361, färjan Ellenor, från Rönnängs brygga på Tjörn. Den går alla dagar året runt, ungefär en gång i timmen, och överfarten tar 10–20 minuter beroende på om båten går direkt eller via Dyrön. Cykel kan tas med ombord.',
      // KÄLLA: https://www.vastsverige.com/en/tjorn/products/astol/ — "The fishing industry declined during the 1970s and many people moved off the island, but new residents arrived to enjoy the magic of the place during the summer", "There are now cafés, outdoor terraces, a gallery, a grocery store and a library" ; https://astol.se/besok-astol/ — "Åstols hamn är väl skyddad från de flesta vindar" (läst 2026-09-27)
      'När fisket gick tillbaka på 1970-talet flyttade många från ön, men nya sommarboende har tillkommit sedan dess. I dag finns caféer, uteserveringar, galleri, mataffär och bibliotek på ön, och hamnen är väl skyddad från de flesta vindar.',
      // KÄLLA: https://www.raa.se/app/uploads/2022/11/V%C3%A4stra-G%C3%B6taland-O_riksintressen.pdf — "Åstol [O 62] (Rönnäng sn)", "Äldre tät bebyggelseklunga vid gamla hamnen omgiven av senare uppförda hus (från 1800- och 1900-talen) varav många är eternitklädda samt sjöbodar" ; https://www.vastsverige.com/en/tjorn/products/astol/ — "Klockareudden has a natural rock pool filled with salt-water, a water slide and a sandy bottom", "in the middle of the island there is a lush little park with a memorial to lost fishermen" (läst 2026-09-27)
      'Åstol ingår i riksintresset för kulturmiljövården (O 62) i Rönnängs socken, Tjörns kommun. Riksantikvarieämbetet pekar ut den äldre täta bebyggelseklungan vid gamla hamnen, omgiven av senare hus från 1800- och 1900-talen, många eternitklädda, och sjöbodarna. Mitt på ön finns en liten park med ett minnesmärke över förolyckade fiskare. Badplatsen vid Klockareudden har en naturlig havsvattenpool med sandbotten och vattenrutschkana.',
    ],
    facts: {
      // KÄLLA: https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6361__1__LINE__20251214__20261212__7486a72d-1af2-4dec-a855-76147a8b68fb__0%2C0__2631548.pdf — "Rönnäng–Tjörnekalv–Dyrön–Åstol–Rönnäng", "Gäller 14 dec 2025 - 12 dec 2026 utom 15 juni - 16 aug" ; https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6208__0__LINE__20251214__20261212__943570e0-dc73-40ba-8902-068c3d54c30d__0%2C0__2597259.pdf — "Tjörn–Stenungsund/Göteborg", "Nils Ericson Terminalen", "Rönnängs brygga" (läst 2026-09-27)
      // Avläst måndag–fredag: Tjörnexpressen Nils Ericson Terminalen 06.05 → Aröd 07.16, fortsätter (not J) → Rönnängs brygga 07.27; båt 361 07.50 → Åstol 08.00. Totalt 1 tim 55 min.
      travel_time: 'Båt 10–20 min från Rönnängs brygga; från Göteborg ca 2 tim med Tjörnexpressen och båt',
      // KÄLLA: https://www.vastsverige.com/en/tjorn/products/astol/ — "during the heydays there were around 500 inhabitants" ; https://www.raa.se/app/uploads/2022/11/V%C3%A4stra-G%C3%B6taland-O_riksintressen.pdf — "Åstol [O 62] (Rönnäng sn)" ; https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/ata-och-bo — "Åstols Rökeri", "Restaurang på Åstol" (läst 2026-09-27)
      population: 'omkring 500 invånare under fiskets glansdagar',
      known_for: 'Bilfritt fiskesamhälle med vita trähus, riksintresse för kulturmiljövården (O 62), Åstols Rökeri',
    },
    facts_provenance: {
      travel_time: 'matt',
      population: 'matt',
      known_for: 'matt',
    },
    activities: [
      // KÄLLA: https://www.raa.se/app/uploads/2022/11/V%C3%A4stra-G%C3%B6taland-O_riksintressen.pdf — "Äldre tät bebyggelseklunga vid gamla hamnen omgiven av senare uppförda hus", "samt sjöbodar" ; https://www.vastsverige.com/en/tjorn/products/astol/ — "Pater Nosterskären to the west can be seen from the water tower on Store Varn" (läst 2026-09-27)
      { icon: '📸', name: 'Fotografera bybild', desc: 'Den täta husklungan vid gamla hamnen med sjöbodarna är det Riksantikvarieämbetet lyfter fram i riksintresset. Från vattentornet på Store Varn syns Pater Nosterskären i väster.' },
      // KÄLLA: https://www.vastsverige.com/en/tjorn/products/astol/ — "Klockareudden has a natural rock pool filled with salt-water, a water slide and a sandy bottom" ; https://www.vastsverige.com/tjorn/se-och-gora/bilfria-oar/ — "För den badsugna väntar Klockareudden, en fin plats för ett bad året om" (läst 2026-09-27)
      { icon: '🏊', name: 'Klippbad', desc: 'Badplatsen vid Klockareudden har en naturlig havsvattenpool med sandbotten och vattenrutschkana.' },
      // KÄLLA: https://www.vastsverige.com/en/tjorn/products/astol/ — "A day trip is quite sufficient to walk around the traffic-free island", "The narrow, car-free streets meander between the houses" (läst 2026-09-27)
      { icon: '🚶', name: 'Promenad runt ön', desc: 'De smala, bilfria gatorna slingrar sig mellan husen, och en dagstur räcker för att gå runt hela ön.' },
      // KÄLLA: https://astol.se/besok-astol/ — "Åstols hamn är väl skyddad från de flesta vindar", "Gästplatserna  ligger utmed både norra och södra sidan av hamnen" ; https://www.vastsverige.com/tjorn/produkter/astols-gasthamn/ — "Här finns plats för ca. 80 gästande båtar, med stävförtöjning samt långsidesförtöjning" (läst 2026-09-27)
      { icon: '⛵', name: 'Gästhamn', desc: 'Åstols hamn är väl skyddad från de flesta vindar. Gästplatserna, omkring 80, ligger längs både norra och södra sidan av hamnen.' },
      // KÄLLA: https://www.vastsverige.com/en/tjorn/products/astols-rokeri/ — "Åstols Rökeri (Åstols Smokery) is a fish restaurant with its own smokery and a small shop" ; https://astolsrokeri.se/ — "Hamnen 4" (läst 2026-09-27)
      { icon: '🐟', name: 'Åstols Rökeri', desc: 'Fiskrestaurang med eget rökeri och en liten butik, i hamnen.' },
    ],
    accommodation: [],
    getting_there: [
      // KÄLLA: https://astol.se/besok-astol/ — "Till Åstol tar du Västtrafiks linje 361 och personfärjan Ellenor från hållplatsen Rönnängs brygga", "överfarten tar mellan 10 och 20 minuter", "Långtidsparkering (upp till sju dygn) finns vid Tjörns ishall i Stansvik. Härifrån tar det cirka 20 minuter att promenera till färjeläget", "Har du svårt att promenera har bussen en hållplats vid ishallen" ; https://www.vastsverige.com/tjorn/produkter/personfarja-ronnang-tjornekalv-dyron-astol/ — "Västtrafiks kontoladdning eller köp enkelbiljett ombord", "Biljettautomat finns vid färjeläget i Rönnäng", "Cykel kan tas med" ; https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6361__1__LINE__20251214__20261212__7486a72d-1af2-4dec-a855-76147a8b68fb__0%2C0__2631548.pdf — "C Turen måste förbeställas på tel: 0304-601242" (läst 2026-09-27)
      { method: 'Passagerarfärja från Rönnäng', from: 'Rönnäng (Tjörn)', time: '10–20 min', desc: 'Västtrafiks personfärja linje 361 (färjan Ellenor) från hållplatsen Rönnängs brygga, ungefär en gång i timmen alla dagar. Biljettautomat finns vid färjeläget, och enkelbiljett kan också köpas ombord. Cykel kan tas med. Några tidiga och sena turer måste förbeställas. Långtidsparkering (upp till sju dygn) finns vid Tjörns ishall i Stansvik, cirka 20 minuters promenad från färjeläget; bussen har hållplats vid ishallen.', icon: '⛴', url: 'https://www.vasttrafik.se/reseplanering/tidtabeller/linje/9011014636100000/' },
      // KÄLLA: https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6208__0__LINE__20251214__20261212__943570e0-dc73-40ba-8902-068c3d54c30d__0%2C0__2597259.pdf — "Tjörn–Stenungsund/Göteborg", "Nils Ericson Terminalen", "J Efter Aröd fortsätter bussen som ny tur mot Bäckevik, Rönnäng och", "Gäller 14 dec 2025 - 12 dec 2026" (läst 2026-09-27)
      // Avläst måndag–fredag: Nils Ericson Terminalen 06.05 → Aröd 07.16 → Rönnängs brygga 07.27 (82 min). Direktturerna från Göteborg går främst morgon och eftermiddag; övriga tider byte i Stenungsund.
      { method: 'Buss från Göteborg', from: 'Göteborg (Nils Ericson Terminalen)', time: 'ca 1 tim 20 min till Rönnäng', desc: 'Västtrafiks Tjörnexpressen (TEXP) går från Nils Ericson Terminalen via Kungälv till Tjörn; vissa turer fortsätter efter Aröd till Rönnängs brygga. Andra tider byter man i Stenungsund.', icon: '🚌', url: 'https://www.vasttrafik.se/reseplanering/tidtabeller/linje/9011014620800000/' },
    ],
    // KÄLLA: https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6361__1__LINE__20251214__20261212__7486a72d-1af2-4dec-a855-76147a8b68fb__0%2C0__2631548.pdf — "Rönnäng–Tjörnekalv–Dyrön–Åstol–Rönnäng", "Gäller 14 dec 2025 - 12 dec 2026 utom 15 juni - 16 aug" ; https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6208__0__LINE__20251214__20261212__943570e0-dc73-40ba-8902-068c3d54c30d__0%2C0__2597259.pdf — "Nils Ericson Terminalen" ; https://astol.se/besok-astol/ — "Färjan går cirka en gång i timmen", "Långtidsparkering (upp till sju dygn) finns vid Tjörns ishall i Stansvik" (läst 2026-09-27)
    // from_city_min: Nils Ericson Terminalen 06.05 → Rönnängs brygga 07.27 → båt 07.50 → Åstol 08.00 = 115 min (måndag–fredag).
    // from_nearest_hub_min: direktturen Rönnängs brygga 07.50 → Åstol 08.00 = 10 min; turer via Dyrön tar ca 20 min.
    // frequency: 21 avgångar från Rönnängs brygga måndag–fredag i tabellen, varav några förbeställs.
    transport_meta: {
      from_city_min: 115,
      nearest_hub: 'Rönnängs brygga (Tjörn)',
      from_nearest_hub_min: 10,
      operator: 'Västtrafik',
      line: '361',
      // KÄLLA: https://astol.se/besok-astol/ — "Färjan går cirka en gång i timmen" ; https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6361__1__LINE__20251214__20261212__7486a72d-1af2-4dec-a855-76147a8b68fb__0%2C0__2631548.pdf — "Rönnängs brygga" (läst 2026-09-27)
      frequency: 'Ungefär en tur i timmen alla dagar; ca 20 avgångar per vardag',
      // KÄLLA: https://astol.se/besok-astol/ — "Långtidsparkering (upp till sju dygn) finns vid Tjörns ishall i Stansvik. Härifrån tar det cirka 20 minuter att promenera till färjeläget", "Närmare Rönnängs brygga finns ett fåtal avgiftsbelagda parkeringsplatser" (läst 2026-09-27)
      car_parking: 'Långtidsparkering upp till sju dygn vid Tjörns ishall i Stansvik, ca 20 min promenad till färjeläget; få avgiftsbelagda platser nära bryggan',
    },
    harbors: [
      // KÄLLA: https://www.astolshamn.se/gasthamn/ — "I avgiften ingår: toalett, dusch, wifi, tvättmaskin, torktumlare", "Vatten är också avstängt fr.o.m. början november till början april", "Under högsäsong från mitten juni till mitten augusti är hamnkontoret (som ligger på norra piren) bemannat dagligen" ; https://www.vastsverige.com/tjorn/produkter/astols-gasthamn/ — "Här finns plats för ca. 80 gästande båtar, med stävförtöjning samt långsidesförtöjning", "Det finns 75 st elanslutningar mot avgift", "Elektricitet, Wifi, Färskvatten, Båtkran, Miljöstation, Sopmaja, Septisug" ; https://astol.se/besok-astol/ — "Gästplatserna  ligger utmed både norra och södra sidan av hamnen" ; https://www.tjorn.se/kultur-fritid-och-turism/batliv-och-hamnar — "Åstol" (läst 2026-09-27)
      // Drivmedel nämns inte av hamnen eller Västsverige (fuel: false = inte angivet).
      { name: 'Åstols Gästhamn', desc: 'Gästhamn för omkring 80 båtar längs norra och södra sidan av hamnen, med stäv- eller långsidesförtöjning. Dusch, WC, tvättmaskin och torktumlare, wifi, el, miljöstation och sugtömning. Vattnet är avstängt från början av november till början av april. Hamnkontoret på norra piren är bemannat dagligen från mitten av juni till mitten av augusti.', spots: 80, fuel: false, service: ['Vatten', 'El', 'Dusch', 'Toalett', 'Tvättmaskin', 'Wifi', 'Sugtömning'] },
    ],
    restaurants: [
      // KÄLLA: https://astolsrokeri.se/ — "Hamnen 4", "fantastiskt tillagade rätter från havet", "en enorm bredd på musikaliska framträdanden" ; https://www.vastsverige.com/en/tjorn/products/astols-rokeri/ — "The restaurant is booming with activity from April to September", "In summertime, the hotel’s musicians gather in the afternoons at the very end of the northern pier" ; https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/ata-och-bo — "Restaurang på Åstol" (läst 2026-09-27)
      // Egen sida läst 2026-09-27 via WebFetch (curl blockeras): öppettider fredag–söndag, adress Hamnen 4. Åstols Café är struket – det har ingen egen webbplats som gick att läsa (församlingens sida blockeras av Cloudflare); caféet nämns i tips via Samhällsföreningen.
      { name: 'Åstols Rökeri', type: 'Restaurang', desc: 'Restaurang med eget rökeri i hamnen på Åstol, med rätter från havet och många musikframträdanden. Mest aktivitet april–september; sommartid spelas livemusik ute på norra piren.', websiteUrl: 'https://astolsrokeri.se/' },
    ],
    tips: [
      // KÄLLA: https://www.vastsverige.com/en/tjorn/products/astols-rokeri/ — "is a fish restaurant with its own smokery and a small shop" ; https://astol.se/bo-ata/ — "Åstols café ligger väl skyddat inne i hamnen och drivs av Elimförsamlingen" (läst 2026-09-27)
      'Åstols Rökeri i hamnen är en fiskrestaurang med eget rökeri och liten butik. Inne i hamnen ligger också Åstols café, som drivs av Elimförsamlingen.',
      // KÄLLA: https://astol.se/besok-astol/ — "Flera husägare hyr ut privata boenden" (läst 2026-09-27)
      'Det går att övernatta — flera husägare på Åstol hyr ut privata boenden.',
      // KÄLLA: https://astol.se/besok-astol/ — "köp med dig en pizza från handelsboden och ät den på klipporna", "Åstols handelsbod är också en välsorterad året-runt-butik" (läst 2026-09-27)
      'Handelsboden på Åstol är en välsorterad året-runt-butik, och där kan du köpa pizza att äta på klipporna.',
      // KÄLLA: https://astol.se/besok-astol/ — "Toaletter för besökare finns ombord på färjan Ellenor, i vänthuset vid färjeläget, vid brandstationen samt vid gästhamnskontoret på Norra piren" (läst 2026-09-27)
      'Toaletter för besökare finns ombord på färjan, i vänthuset vid färjeläget, vid brandstationen och vid gästhamnskontoret på norra piren.',
    ],
    related: ['tjorn', 'kladesholmen', 'orust'],
    tags: ['bohuslän', 'bilfritt', 'fiskeläge', 'fotografi', 'bad', 'gästhamn', 'riksintresse'],
    insiderTips: [],
    dog_friendly: true,
    // KÄLLA: https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/hund-i-naturen — "under vistelse utomhus på offentlig plats där folksamlingar förekommer, eller kan antas förekomma, ska hundar alltid hållas kopplade", "1 mars och 20 augusti" ; https://www.vasttrafik.se/resa-med-oss/under-resan/husdjur/ — "Ha djuret i koppel, bur eller väska", "Vid resa med båt ska husdjur vara på styrbord" (läst 2026-09-27)
    dog_notes: 'Hunden får följa med på Västtrafiks färja i koppel, bur eller väska och ska vara på styrbordssidan. Enligt Tjörns ordningsstadga ska hundar hållas kopplade på offentliga platser där människor samlas, och 1 mars–20 augusti får hunden inte springa lös i skog och mark.',
    // KÄLLA: https://www.vastsverige.com/en/tjorn/products/astol/ — "Åstol was first inhabited in the mid-18th century in connection with one of the great herring periods", "during the heydays there were around 500 inhabitants", "More than 20 large steel trawlers had their home port on Åstol in the 1960s" ; https://www.raa.se/app/uploads/2022/11/V%C3%A4stra-G%C3%B6taland-O_riksintressen.pdf — "Fiskeläge från 1700-talets sillperiod, på en kal minimal ö", "ett av västkustens mest tättbebyggda kustsamhällen" (läst 2026-09-27)
    did_you_know: 'Åstol befolkades först vid mitten av 1700-talet i samband med en av de stora sillperioderna. Under fiskets glansdagar bodde här omkring 500 personer, och på 1960-talet hade mer än tjugo stora ståltrålare Åstol som hemmahamn. Riksantikvarieämbetet beskriver ön som en kal minimal ö som blivit ett av västkustens mest tättbebyggda kustsamhällen.',
    amenities: {
      restaurant: true,
      shop: true,
      accommodation: true,
      beach: true,
      camping: false,
    },
    activity_meta: {
      // KÄLLA: https://www.vastsverige.com/en/tjorn/products/astol/ — "Klockareudden has a natural rock pool filled with salt-water, a water slide and a sandy bottom" (läst 2026-09-27)
      bad: { beaches: ['Klockareudden — naturlig havsvattenpool med sandbotten och vattenrutschkana'] },
    },
  },

  // ─── DYRÖN ───────────────────────────────────────────────────────────────
  {
    slug: 'dyron',
    name: 'Dyrön',
    region: 'bohuslan',
    regionLabel: 'Bohuslän',
    emoji: '⛺',
    // KÄLLA: https://www.vastsverige.com/tjorn/se-och-gora/bilfria-oar/ — "Ta färjan till en av Tjörns bilfria öar", "Håll utkik – med lite tur får du syn på de vilda mufflonfåren" ; https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/vandra/dyrons-vandringsleder — "På Dyrön finns två vandringsleder, den gula leden och den blå leden" ; https://www.dyron.se/om-dyron/ — "De båda badplatserna ligger alldeles nära de två gästhamnarna" (läst 2026-09-27)
    tagline: 'Bilfri ö utanför Tjörn — mufflonfår, vandringsleder och två gästhamnar.',
    description: [
      // KÄLLA: https://www.dyron.se/om-dyron/ — "Dyrön strax norr om Marstrand är en av Tjörns kommuns sex skärgårdsöar med boende året runt", "Bebyggelsen ligger samlad i en dalgång som sträcker sig mellan Nord- och Sydhamnen", "På ömse sidor dalgången är det berg- och klippterräng med hällmarker och sänkor. Raviner genomkorsar landskapet på flera ställen.", "Berggrunden domineras av mörka mineral", "Bergarten kallas för metabasit", "På nordöstra sidan av ön finns kuddlavastruktur, ett för landet unikt inslag i berggrunden", "området ingår i riksintresse för naturvården (NO 17b)", "Ett speciellt inslag är de inplanterade vilda bergsfåren s k mufflonfår" ; https://www.dyron.se/se-gora/mufflonfar/ — "Det bor cirka 50 – 60 stycken på Dyrön som lever fritt bland skog och berg" ; https://www.vastsverige.com/tjorn/se-och-gora/bilfria-oar/ — "Ta färjan till en av Tjörns bilfria öar" (läst 2026-09-27)
      'Dyrön ligger strax norr om Marstrand och är en av Tjörns bilfria öar och en av kommunens sex skärgårdsöar med boende året runt. Bebyggelsen ligger samlad i en dalgång mellan Nord- och Sydhamnen, och på båda sidor tar berg- och klippterrängen vid, med hällmarker, sänkor och raviner. Berggrunden domineras av mörka mineral – bergarten kallas metabasit – och på öns nordöstra sida finns kuddlava, ett för landet unikt inslag som är en förklaring till att området ingår i riksintresse för naturvården. Här lever också cirka 50–60 inplanterade vilda bergsfår, så kallade mufflonfår.',
      // KÄLLA: https://www.dyron.se/om-dyron/ — "Här bor runt 160 bofasta" ; https://www.dyron.se/ata-bo/pizzeria/ — "Öns egen ICA-butik Dyröboden erbjuder inte bara ett mycket bra sortiment och öppet året runt. De bakar även pizza i egen pizzaugn.", "i caféet finns microugn" ; https://www.ica.se/butiker/nara/tjorn/ica-nara-dyroboden-1634/start/ — "Postombud", "Apoteksombud", "Systembolagsombud", "Månadens pizza" ; https://www.dyron.se/ata-bo/dyrons-vardshus-restaurang/ — "Välkommen till vår restaurang i Nordhamnen mittemot färjeläget, där vi serverar lunch och middag" ; https://dyronsvardshus.se/ — "Vi erbjuder upp till 12 sjöbodar med plats för upp till 6 personer i varje" ; https://linasbrygga.se/ — "Förutom caféverksamheten, erbjuder vi också boende och sjömack.", "Tack för sommaren 2026" ; https://www.dyron.se/ata-bo/cafe-kiosk/ — "I Sydhamnen finns under sommaren kiosk och café med uteservering", "I anslutning till caféet ligger också minigolfen" ; https://www.dyron.se/ata-bo/vaffelcafe/ — "När Kiosk och Café stänger för sommaren öppnar Våffelcafé i samma lokal. Våffelcaféet är obemannat" (läst 2026-09-27)
      'Ön har runt 160 bofasta och mer service än storleken låter ana. ICA-butiken Dyröboden har öppet året runt, är ombud för post, apotek och Systembolaget, bakar pizza vissa dagar och har ett enkelt café. I Nordhamnen, mittemot färjeläget, ligger Dyröns Värdshus med restaurang och sjöbodar, och i Sydhamnen Linas Brygga med sommarcafé, rum och sjömack. Vid minigolfen i Sydhamnen finns sommartid kiosk och café; resten av året blir lokalen ett obemannat våffelcafé.',
      // KÄLLA: https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/vandra/dyrons-vandringsleder — "Den gula leden går runt hela ön och är cirka 5 kilometer", "Den blå leden går över bergen från norr till söder och är 1,6 kilometer", "Medelsvår", "Från Sydhamnen går det att med rullstol och barnvagn ta sig västerut en bit längs leden fram till bastun", "Längs med leden finns en rad olika rastplatser med bord och bänkar", "en fantastisk utsikt över havet med öarna Marstrand och Åstol och fyren Pater Noster", "På öns östra sida finns det längs vandringen en fin sandstrand där man kan rasta och bada" ; https://www.dyron.se/se-gora/vandra/ — "Lederna är delvis bergiga och kan vara hala om det regnat", "Trappor, broar och räcken förenklar dock vandringen på de svåra ställena", "Gula leden är 5 km lång runt hela ön, men det finns 6 ingångar/utgångar så du kan välja kortare väg", "Den byggdes av ett gäng pensionärer, helt ideellt, under åren 2000–2008" (läst 2026-09-27)
      'På ön går två markerade vandringsleder, byggda ideellt av ett gäng pensionärer åren 2000–2008. Den gula leden går runt hela ön, är cirka 5 kilometer och klassas som medelsvår; den har sex in- och utgångar, så den går att korta. Den blå leden är 1,6 kilometer och går över bergen från norr till söder. Lederna är delvis bergiga och kan vara hala efter regn, men trappor, broar och räcken hjälper på de svåra ställena, och längs vägen finns rastplatser med bord och bänkar. Från Sydhamnen går det att ta sig en bit västerut längs leden, fram till bastun, med rullstol och barnvagn. Utsikten når bland annat Marstrand, Åstol och fyren Pater Noster, och på öns östra sida finns en sandstrand där man kan rasta och bada.',
      // KÄLLA: https://www.dyron.se/se-gora/badplatser/ — "I Nordhamnen ligger en badplats med pontonbrygga och sandstrand", "Badplatsen är mycket populär bland barnfamiljer", "Sydhamnens badplats heter Hala", "Här finns också en liten sandstrand och brygga", "hoppa och dyka från trampolin, klippor och 3-meterstornet", "Här finns också en lättillgänglig badbrygga med stege" ; https://www.dyron.se/om-dyron/ — "ett oändligt antal klipphällar och vikar" ; https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/vandra/dyrons-vandringsleder — "På västra delen av ön finns lämningar av en stenåldersby, ett bronsåldersröse samt den smala passagen genom Dynes Ravin" (läst 2026-09-27)
      'Dyrön har två badplatser. Vid Nordhamnen finns en badplats med pontonbrygga och sandstrand som är populär bland barnfamiljer, och vid Sydhamnen ligger Hala med liten sandstrand, trampolin, 3-meterstorn och en lättillgänglig badbrygga med stege. Runt ön finns dessutom klipphällar och vikar. På öns västra del finns lämningar av en stenåldersby och ett bronsåldersröse, och gula leden går genom den smala passagen i Dynes ravin.',
      // KÄLLA: https://www.dyron.se/hamnar/nordhamnen/ — "I Nordhamnen finns plats för ca 40 båtar, 10 förtöjningar vid boj i yttre bassängen och 30 långsides mot kajen i inre bassängen", "I hamnen finns toalett, dusch, sophantering, el och vatten samt tvättstuga med tvättmaskin", "Nordhamnen fungerar både som gästhamn för besökare samt småbåtshamn för bofasta på ön" ; https://www.dyron.se/hamnar/sydhamnen/ — "I sydhamnen finns plats 50 gästbåtar, 20 vid bommar väster om inloppet och 30 långsides vid norra kajen", "Vid Linas Brygga kan du också tanka diesel och byta dina gasolflaskor" ; https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/vandra/dyrons-vandringsleder — "Sydhamnen är den mest etablerade gästhamnen med hamnkontor och annan service", "I Nordhamnen lägger färjan från Rönnäng till" (läst 2026-09-27)
      'Ön har två gästhamnar, som båda också är småbåtshamnar för de bofasta. Nordhamnen, där färjan från Rönnäng lägger till, har plats för cirka 40 båtar – tio vid boj i yttre bassängen och 30 långsides mot kajen i inre bassängen. Sydhamnen är den mest etablerade gästhamnen, med hamnkontor och plats för 50 gästbåtar; där tankar man diesel vid Linas Brygga. Båda hamnarna har toalett, dusch, el, vatten och tvättstuga.',
    ],
    // KÄLLA: https://www.dyron.se/om-dyron/ — "Här bor runt 160 bofasta" ; https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/vandra/dyrons-vandringsleder — "Utsikten över havet kan möjligtvis toppas av att få se något av de mufflonfår som lever fritt på ön" ; https://www.vastsverige.com/tjorn/se-och-gora/bilfria-oar/ — "Hoppa på en reguljär färja året om" ; https://www.dyron.se/ata-bo/pizzeria/ — "öppet året runt" (läst 2026-09-27)
    // Restid avläst måndag–fredag: Tjörnexpressen Nils Ericson Terminalen 06.05 → Rönnängs brygga 07.27, båt 361 07.50 → Dyrön norra 08.10, totalt 2 tim 5 min. Båten Rönnäng–Dyrön tar 10 min direkt (07.10 → 07.20) och upp till 25 min via Åstol (09.45 → 10.10).
    // KÄLLA: https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6361__1__LINE__20251214__20261212__7486a72d-1af2-4dec-a855-76147a8b68fb__0%2C0__2631548.pdf — "Rönnäng–Tjörnekalv–Dyrön–Åstol–Rönnäng", "Gäller 14 dec 2025 - 12 dec 2026 utom 15 juni - 16 aug" ; https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6208__0__LINE__20251214__20261212__943570e0-dc73-40ba-8902-068c3d54c30d__0%2C0__2597259.pdf — "Nils Ericson Terminalen", "J Efter Aröd fortsätter bussen som ny tur mot Bäckevik, Rönnäng och" (läst 2026-09-27)
    facts: {
      population: 'ca 160 bofasta',
      travel_time: 'Båt 10–25 min från Rönnängs brygga; från Göteborg ca 2 tim med buss och båt',
      known_for: 'Bilfritt, mufflonfår, vandringsleder, två gästhamnar, badplatser',
      season: 'Året runt',
      character: 'Bilfritt, vandringsleder, klipplandskap, service året runt',
      best_for: 'Vandring, bad, båtliv',
    },
    facts_provenance: {
      population: 'matt',
      travel_time: 'matt',
      known_for: 'matt',
      season: 'bedomning',
      character: 'bedomning',
      best_for: 'bedomning',
    },
    activities: [
      // KÄLLA: https://www.dyron.se/se-gora/mufflonfar/ — "Det bor cirka 50 – 60 stycken på Dyrön som lever fritt bland skog och berg" ; https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/vandra/dyrons-vandringsleder — "En gång inplanterade för jakt, är de nu en etablerad art på ön." (läst 2026-09-27)
      { icon: '🐏', name: 'Mufflonfår', desc: 'Cirka 50–60 mufflonfår lever fritt bland skog och berg på ön. De planterades en gång in för jakt och är nu en etablerad art här.' },
      // KÄLLA: https://www.dyron.se/se-gora/bastu/ — "Dyröns bastu, som drivs av Dyröns Samhällsförening, utnämndes år 2008 till Sveriges finaste eluppvärmda bastu av finska Sisuradion på Sveriges Radio", "Bastu, som är handikappanpassad, ligger på öns sydsida", "Bastun rymmer 12 personer", "Efter bastubadet kan du bada från bryggan" ; https://www.vastsverige.com/en/tjorn/products/dyron/ — "you can book it all year round" (läst 2026-09-27)
      { icon: '🧖', name: 'Bastu', desc: 'Dyröbastun på öns sydsida drivs av Dyröns Samhällsförening och kan bokas året runt. Den rymmer 12 personer och är handikappanpassad, och efter bastun badar man från bryggan. 2008 utsågs den till Sveriges finaste eluppvärmda bastu av Sisuradion på Sveriges Radio.' },
      // KÄLLA: https://www.dyron.se/se-gora/badplatser/ — "I Nordhamnen ligger en badplats med pontonbrygga och sandstrand", "Sydhamnens badplats heter Hala", "hoppa och dyka från trampolin, klippor och 3-meterstornet" ; https://www.dyron.se/om-dyron/ — "ett oändligt antal klipphällar och vikar" (läst 2026-09-27)
      { icon: '🏊', name: 'Bad', desc: 'Två badplatser: vid Nordhamnen med pontonbrygga och sandstrand, och Hala vid Sydhamnen med trampolin och 3-meterstorn. Runt ön finns dessutom klipphällar och vikar.' },
      // KÄLLA: https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/vandra/dyrons-vandringsleder — "Den gula leden går runt hela ön och är cirka 5 kilometer", "Medelsvår", "Den blå leden går över bergen från norr till söder och är 1,6 kilometer", "en fantastisk utsikt över havet med öarna Marstrand och Åstol och fyren Pater Noster" ; https://www.dyron.se/se-gora/vandra/ — "det finns 6 ingångar/utgångar så du kan välja kortare väg" (läst 2026-09-27)
      { icon: '🥾', name: 'Vandring', desc: 'Gula leden runt ön är 5 km och medelsvår, med sex in- och utgångar; blå leden går 1,6 km över bergen från norr till söder. Utsikt mot Marstrand, Åstol och Pater Noster-fyren.' },
      // KÄLLA: https://www.dyron.se/ata-bo/dyrons-vardshus-restaurang/ — "Välkommen till vår restaurang i Nordhamnen mittemot färjeläget, där vi serverar lunch och middag" ; https://www.vastsverige.com/en/tjorn/products/dyrons-vardshus/ — "shellfish and fish to meat, vegetables, and mushrooms" ; https://dyronsvardshus.se/ — "Vi erbjuder upp till 12 sjöbodar" (läst 2026-09-27)
      { icon: '🍽', name: 'Dyröns Värdshus', desc: 'Restaurang i Nordhamnen mittemot färjeläget med lunch och middag – skaldjur, fisk, kött, grönsaker och svamp – och övernattning i sjöbodar vid vattnet.' },
    ],
    accommodation: [
      // KÄLLA: https://dyronsvardshus.se/ — "Vi erbjuder upp till 12 sjöbodar med plats för upp till 6 personer i varje. Alla bodar har pentry, badrum, tvättmaskin, vardagsrum och uteplats.", "Hamnvägen, 471 43 Dyrön" (läst 2026-09-27)
      { name: 'Dyröns Värdshus', type: 'Sjöbodar', desc: 'Boende i upp till 12 sjöbodar på Dyrön, plats för upp till 6 personer per bod. Varje bod har pentry, badrum, tvättmaskin, vardagsrum och uteplats.' },
    ],
    getting_there: [
      // KÄLLA: https://www.vastsverige.com/tjorn/produkter/personfarja-ronnang-tjornekalv-dyron-astol/ — "linje 361 alla dagar året runt", "Västtrafiks kontoladdning eller köp enkelbiljett ombord", "Biljettautomat finns vid färjeläget i Rönnäng", "Cykel kan tas med" ; https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6361__1__LINE__20251214__20261212__7486a72d-1af2-4dec-a855-76147a8b68fb__0%2C0__2631548.pdf — "Rönnäng–Tjörnekalv–Dyrön–Åstol–Rönnäng", "Gäller 14 dec 2025 - 12 dec 2026 utom 15 juni - 16 aug", "C Turen måste förbeställas på tel: 0304-601242" ; https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/vandra/dyrons-vandringsleder — "Färjan går från Rönnäng cirka en gång i timmen" (läst 2026-09-27)
      // Avläst måndag–fredag: Rönnängs brygga 07.10 → Dyrön norra 07.20 (direkt), 08.50 → 09.03 (via Tjörnekalv), 09.45 → 10.10 (via Åstol).
      { method: 'Passagerarfärja från Rönnäng', from: 'Rönnängs brygga (Tjörn)', time: '10–25 min', desc: 'Västtrafiks personfärja linje 361 går alla dagar året runt från Rönnängs brygga till Dyrön norra i Nordhamnen, ungefär en gång i timmen. Direktturerna tar 10 minuter; turer som först angör Åstol eller Tjörnekalv tar upp till 25 minuter. Några tidiga och sena turer måste förbeställas. Biljett köps i Västtrafiks app, i automaten vid färjeläget eller ombord, och cykel kan tas med.', icon: '⛴', url: 'https://www.vasttrafik.se/reseplanering/tidtabeller/linje/9011014636100000/' },
      // KÄLLA: https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6208__0__LINE__20251214__20261212__943570e0-dc73-40ba-8902-068c3d54c30d__0%2C0__2597259.pdf — "Nils Ericson Terminalen", "J Efter Aröd fortsätter bussen som ny tur mot Bäckevik, Rönnäng och", "Gäller 14 dec 2025 - 12 dec 2026" ; https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/vandra/dyrons-vandringsleder — "Ta buss till Rönnängs Brygga." (läst 2026-09-27)
      // Avläst måndag–fredag: Nils Ericson Terminalen 06.05 → Aröd 07.16 → Rönnängs brygga 07.27. Övriga tider byte i Stenungsund eller på Tjörn.
      { method: 'Buss från Göteborg', from: 'Göteborg (Nils Ericson Terminalen)', time: 'ca 1 tim 20 min till Rönnäng', desc: 'Västtrafiks Tjörnexpressen (TEXP) går från Nils Ericson Terminalen via Kungälv till Tjörn, och vissa turer fortsätter efter Aröd till Rönnängs brygga. Andra tider byter man.', icon: '🚌', url: 'https://www.vasttrafik.se/reseplanering/tidtabeller/linje/9011014620800000/' },
      // KÄLLA: https://www.dyron.se/ta-dig-hit/ — "Västtrafiks linje 326", "Turerna passar bussar vid Rökan från/till Kungälv och Göteborg" ; https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6326__0__LINE__20260817__20260930__3f059e68-c41c-44bf-bb36-b0b087de0549__1%2C0__2778882.pdf — "Dyrön – Rökan – Rörtången", "Gäller 17 aug - 30 sept 2026" ; https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6326__0__LINE__20261001__20261031__5c843cab-c0f3-4630-88cc-c2a33e730dbc__1%2C0__2778908.pdf — "Gäller 1 okt - 31 okt 2026", "Resan måste förbeställas senast tre timmar före avgång" ; https://www.vastsverige.com/tjorn/se-och-gora/bilfria-oar/ — "Rökan, Kungälv ↔ Dyrön södra" (läst 2026-09-27)
      // Avläst: Rökan Bryggan 10.45 → Dyrön södra 11.10 och 18.20 → 18.45 (mån–fre), 11.45 → 12.10 och 17.45 → 18.10 (lör–sön).
      { method: 'Båt från Rökan (Kungälv)', from: 'Rökan (Kungälv)', time: 'ca 25 min', desc: 'Västtrafiks linje 326 går mellan Rökan och Dyrön södra i Sydhamnen och passar bussarna vid Rökan till och från Kungälv och Göteborg. Hösten 2026 går två turer i varje riktning om dagen, och resan måste förbeställas senast tre timmar före avgång.', icon: '⛴', url: 'https://www.vasttrafik.se/reseplanering/tidtabeller/linje/9011014632600000/' },
    ],
    // KÄLLA: https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6361__1__LINE__20251214__20261212__7486a72d-1af2-4dec-a855-76147a8b68fb__0%2C0__2631548.pdf — "Rönnängs brygga", "Dyrön norra" ; https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6208__0__LINE__20251214__20261212__943570e0-dc73-40ba-8902-068c3d54c30d__0%2C0__2597259.pdf — "Nils Ericson Terminalen" ; https://www.vastsverige.com/tjorn/produkter/personfarja-ronnang-tjornekalv-dyron-astol/ — "20 minuter till Dyröns norra hamn" ; https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/vandra/dyrons-vandringsleder — "Färjan går från Rönnäng cirka en gång i timmen" ; https://www.dyron.se/ta-dig-hit/ — "Sommartid parkerar du vid Rönnängs Ishall, varifrån du har en promenad på cirka 15 minuter" (läst 2026-09-27)
    // from_city_min: Nils Ericson Terminalen 06.05 → Rönnängs brygga 07.27 → båt 07.50 → Dyrön norra 08.10 = 125 min (måndag–fredag).
    // frequency: 21 avgångar från Rönnängs brygga måndag–fredag i tabellen, varav några förbeställs.
    transport_meta: {
      from_city_min: 125,
      nearest_hub: 'Rönnängs brygga (Tjörn)',
      from_nearest_hub_min: 20,
      operator: 'Västtrafik',
      line: '361',
      frequency: 'Ungefär en tur i timmen alla dagar; ca 20 avgångar per vardag',
      car_parking: 'Sommartid vid Tjörns ishall, ca 15 min promenad till Rönnängs brygga',
    },
    harbors: [
      // KÄLLA: https://www.dyron.se/hamnar/nordhamnen/ — "I Nordhamnen finns plats för ca 40 båtar, 10 förtöjningar vid boj i yttre bassängen och 30 långsides mot kajen i inre bassängen", "Dessutom tillfälligt lediga grönmarkerade privata platser", "I hamnen finns toalett, dusch, sophantering, el och vatten samt tvättstuga med tvättmaskin", "Möjlighet för tömning av septiktank finns i yttre bassängen på piren bredvid färjans tilläggningsplats", "Nordhamnen ligger 50 m från handikappanpassad badplats med bryggor och sandstrand" (läst 2026-09-27)
      { name: 'Dyrön Nordhamnen', desc: 'Gäst- och småbåtshamn där färjan från Rönnäng lägger till. Plats för cirka 40 båtar: tio vid boj i yttre bassängen och 30 långsides mot kajen i inre bassängen, plus tillfälligt lediga grönmarkerade privata platser. Toalett, dusch, el, vatten och tvättstuga; tömning av septiktank på piren bredvid färjeläget. Handikappanpassad badplats med bryggor och sandstrand 50 meter bort.', fuel: false, service: ['El', 'Vatten', 'Dusch', 'Toalett', 'Tvättstuga', 'Septiktömning'] },
      // KÄLLA: https://www.dyron.se/hamnar/sydhamnen/ — "I sydhamnen finns plats 50 gästbåtar, 20 vid bommar väster om inloppet och 30 långsides vid norra kajen", "tvättstuga med tvättmaskin och torktumlare. Ingen extra avgift tas ut för tvättstugan", "I hamnen finns kran för lyft på max 5 ton", "Vid Linas Brygga kan du också tanka diesel och byta dina gasolflaskor" ; https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/vandra/dyrons-vandringsleder — "Sydhamnen är den mest etablerade gästhamnen med hamnkontor och annan service" ; https://www.vastsverige.com/tjorn/produkter/dyrons-gasthamn-nord-sydhamnen/ — "Sugtömning av latrin" ; https://linasbrygga.se/ — "Sjömacken öppen året runt varje dag." (läst 2026-09-27)
      { name: 'Dyrön Sydhamnen', desc: 'Öns mest etablerade gästhamn, med hamnkontor och plats för 50 gästbåtar: 20 vid bommar väster om inloppet och 30 långsides vid norra kajen. Toalett, dusch, el, vatten och tvättstuga med tvättmaskin och torktumlare utan extra avgift, sugtömning och kran för lyft upp till 5 ton. Vid Linas Brygga finns sjömack med diesel och gasolbyte, öppen året runt.', fuel: true, service: ['Diesel', 'El', 'Vatten', 'Dusch', 'Toalett', 'Tvättstuga', 'Sugtömning'] },
    ],
    restaurants: [
      // KÄLLA: https://www.dyron.se/ata-bo/dyrons-vardshus-restaurang/ — "Välkommen till vår restaurang i Nordhamnen mittemot färjeläget, där vi serverar lunch och middag" ; https://dyronsvardshus.se/ — "På Dyröns Värdshus lagar vi mat inspirerad av havet och säsongen runt oss", "Här möts lokala råvaror, skärgårdsmiljö och en meny som förändras efter vad Bohuslän har att erbjuda", "Vilka fantastiska artistkvällar vi har fått uppleva tillsammans på Dyröns Värdshus", "Höstens höjdpunkt" ; https://www.vastsverige.com/en/tjorn/products/dyrons-vardshus/ — "is open all year" (läst 2026-09-27)
      { name: 'Dyröns Värdshus', type: 'Restaurang', desc: 'Restaurang i Nordhamnen mittemot färjeläget med lunch och middag. Menyn följer havet och säsongen med lokala råvaror från Bohuslän, och sommartid hålls artistkvällar. Värdshuset har öppet året runt.' },
      // KÄLLA: https://linasbrygga.se/ — "Räksmörgåsar, glasskreationer, hembakat, äggost och annat gott.", "Förutom caféverksamheten, erbjuder vi också boende och sjömack.", "Hamnvägen 80, Södra hamnen", "Tack för sommaren 2026. Välkomna åter våren 2027" ; https://www.dyron.se/ata-bo/linas-brygga/ — "I Sydhamnen hittar du Linas Brygga med café och butik med glassmenyer, hembakt och smårätter" (läst 2026-09-27)
      { name: 'Linas Brygga', type: 'Café', desc: 'Sommarcafé och butik i Sydhamnen med räksmörgåsar, glass, hembakat och äggost. Här finns också rum att hyra och öns sjömack, som har öppet året runt.' },
    ],
    tips: [
      // KÄLLA: https://www.dyron.se/ata-bo/pizzeria/ — "Öns egen ICA-butik Dyröboden erbjuder inte bara ett mycket bra sortiment och öppet året runt. De bakar även pizza i egen pizzaugn." ; https://www.ica.se/butiker/nara/tjorn/ica-nara-dyroboden-1634/start/ — "Postombud", "Apoteksombud", "Systembolagsombud" (läst 2026-09-27)
      'ICA-butiken Dyröboden har öppet året runt och är ombud för post, apotek och Systembolaget. Vissa dagar bakar den pizza i egen ugn.',
      // KÄLLA: https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/vandra/dyrons-vandringsleder — "Den gula leden går runt hela ön och är cirka 5 kilometer", "Medelsvår", "Den blå leden går över bergen från norr till söder och är 1,6 kilometer" (läst 2026-09-27)
      'Gula leden runt ön är 5 km och klassas som medelsvår; blå leden över bergen är 1,6 km.',
      // KÄLLA: https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/vandra/dyrons-vandringsleder — "Från Sydhamnen går det att med rullstol och barnvagn ta sig västerut en bit längs leden fram till bastun" (läst 2026-09-27)
      'Delen av gula leden från Sydhamnen fram till bastun går att ta sig fram på med rullstol och barnvagn.',
      // KÄLLA: https://www.dyron.se/se-gora/vandra/ — "Missa inte heller Dynes ravin mitt på ledens västra del. Längst nere i ravinen finns ett trädäck med bord och bänkar, perfekt för fika med utsikt över Åstol." (läst 2026-09-27)
      'Mitt på gula ledens västra del går den genom Dynes ravin. Längst ner i ravinen finns ett trädäck med bord och bänkar och utsikt mot Åstol.',
      // KÄLLA: https://www.dyron.se/se-gora/vandra/ — "I öster, där de gulmarkerade och blåmarkerade lederna möts, finns Grinnebergets utsiktsplats", "Väl uppe hittar du en grillplats", "Strax intill finns ett stort bord med bänkar som rymmer 24 personer" (läst 2026-09-27)
      'Där gula och blå leden möts i öster ligger Grinnebergets utsiktsplats, med grillplats och ett långbord för 24 personer.',
      // KÄLLA: https://www.dyron.se/se-gora/vandra/ — "Farleden till Wallhamn och Stenungsund går alldeles söder om Dyrön, så chansen att få se stora fartyg passera bara något hundratal meter från dig är stor." (läst 2026-09-27)
      'Farleden till Wallhamn och Stenungsund går alldeles söder om ön, så från lederna ser man ofta stora fartyg passera på nära håll.',
    ],
    related: ['astol', 'kladesholmen', 'tjorn'],
    tags: ['bilfritt', 'klippor', 'natur', 'bohuslän', 'vandring'],
    // KÄLLA: https://www.dyron.se/om-dyron/historia/ — "Oscar II invigde den efterlängtade Nordhamnen, som är den första hamnen i Sverige som byggts med statsunderstöd, den 2 september 1902", "Dyrön hade emellertid ingen hamn utan jordbruk och boskapsskötsel var fortfarande huvudnäring på ön" ; https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/vandra/dyrons-vandringsleder — "Det friköptes år 1743 av bönderna Anders Nilsson och Jon Jonsson Green för 43 daler silvermynt, och då fick de även den obebodda holmen Åstol." (läst 2026-09-27)
    did_you_know: 'Nordhamnen invigdes av Oscar II den 2 september 1902 och var den första hamnen i Sverige som byggts med statsunderstöd. Före det saknade Dyrön hamn, och öborna levde främst av jordbruk och boskapsskötsel. När två bönder 1743 köpte loss Dyrön från kronan för 43 daler silvermynt fick de dessutom den då obebodda holmen Åstol på köpet.',
    // KÄLLA: https://www.vasttrafik.se/resa-med-oss/under-resan/husdjur/ — "Ha djuret i koppel, bur eller väska", "Vid resa med båt ska husdjur vara på styrbord" ; https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/hund-i-naturen — "Hundar ska alltid hållas kopplade utomhus på offentliga platser där människor samlas", "Här får hundar inte vistas", "1 mars och 20 augusti" (läst 2026-09-27)
    dog_notes: 'Hunden får följa med på Västtrafiks färja i koppel, bur eller väska och ska vara på styrbordssidan. Enligt Tjörns ordningsstadga ska hundar hållas kopplade på offentliga platser där människor samlas och får inte vistas på badplatser eller lekplatser, och 1 mars–20 augusti får hunden inte springa lös i skog och mark.',
    amenities: { restaurant: true, shop: true, accommodation: true, beach: true, camping: false },
    activity_meta: {
      // KÄLLA: https://www.dyron.se/se-gora/badplatser/ — "I Nordhamnen ligger en badplats med pontonbrygga och sandstrand", "Sydhamnens badplats heter Hala", "hoppa och dyka från trampolin, klippor och 3-meterstornet" ; https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/vandra/dyrons-vandringsleder — "På öns östra sida finns det längs vandringen en fin sandstrand där man kan rasta och bada" (läst 2026-09-27)
      bad: { beaches: ['Nordhamnens badplats med pontonbrygga och sandstrand', 'Hala vid Sydhamnen med trampolin och 3-meterstorn', 'Sandstrand på öns östra sida längs gula leden'] },
    },
  },
]

// Export region-rad till regionsidan
export const BOHUSLAN_REGION = {
  id: 'bohuslan',
  label: 'Bohuslän',
  description: 'Västkustens skärgård — räkor, klippor och Sveriges mest fotograferade fiskelägen.',
  color: '#a8381e',
  bg: 'rgba(168,56,30,0.07)',
}
