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
    seoDescription: 'Guide till Marstrand: Carlstens fästning, ö med begränsad biltrafik, Match Cup Sweden och restaurangerna vid hamnen. Hur du tar dig dit och var du bor.',
    description: [
      // KÄLLA: Statens fastighetsverk, Carlstens fästning Marstrand — bekräftar provisorisk skans efter freden i Roskilde 1658, mindre stenfästning från 1660, bygget 1682 under Erik Dahlberg, färdig 1860, "en av Europas starkaste fästningar", statligt byggnadsminne förvaltat av SFV sedan hösten 1993 — https://www.sfv.se/vara-fastigheter/sverige/vastra-gotalands-lan/carlstens-fastning-marstrand (läst 2026-09-16)
      'Marstrand domineras av Carlstens fästning. Efter freden i Roskilde 1658 restes först en provisorisk skans på öns högsta punkt, och två år senare — 1660 — började en mindre fästning i sten att byggas. Den stora anläggningen påbörjades 1682 under Erik Dahlbergs ledning men stod inte helt färdig förrän 1860, då den enligt Statens fastighetsverk betraktades som en av Europas starkaste fästningar. Carlsten är statligt byggnadsminne och förvaltas av Statens fastighetsverk sedan hösten 1993.',
      // KÄLLA: Statens fastighetsverk, Carlstens fästning Marstrand — bekräftar högst 232 fångar, Lasse-Maja dit 1813, sista fångarna bort 1858 under Krimkriget, världens första roterande fyr 1781, Skeppsgossekårens skola för 200 pojkar samt kustspaningsradar i tornet fram till 1993 — https://www.sfv.se/vara-fastigheter/sverige/vastra-gotalands-lan/carlstens-fastning-marstrand (läst 2026-09-16)
      'Fästningen har haft många roller. Den fungerade som fängelse med som mest 232 fångar; den ökände tjuven Lasse-Maja fördes hit 1813, och 1858 flyttades de sista fångarna bort eftersom krigshotet under Krimkriget var stort. På tornet installerades 1781 världens första roterande fyr. I början av 1900-talet drev Skeppsgossekåren en skola för 200 pojkar i fästningen, och ända fram till 1993 fanns en kustspaningsradarstation i tornet.',
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Marstrand — bekräftar att orten grundades på 1200-talet av Håkon Håkonsson, blev svensk 1658 och på 1500-talet var centrum för sillhandeln i Europa — https://www.vastsverige.com/en/kungalv/products/marstrand/ (läst 2026-09-16)
      'Orten är äldre än fästningen. Marstrand grundades på 1200-talet av den norske kungen Håkon Håkonsson och blev svenskt först 1658. På 1500-talet var staden ett centrum för sillhandeln i Europa, och sillen avgjorde under lång tid välstånd och fattigdom för invånarna.',
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Marstrand — bekräftar "Sommarens seglingshöjdpunkt är när Match Cup Sweden avgörs första veckan i juli" och "Sveriges största gästhamn" — https://www.vastsverige.com/kungalv/marstrand/ ; gästhamnsdata (bryggorna G/H/D/E, Gästkajen för båtar över 15 m med minsta djup 3,5 m, el och vatten ingår, hamnkontor bemannat maj–september) — https://www.vastsverige.com/kungalv/produkter/marstrands-gasthamn/ (läst 2026-09-16)
      'Seglingen sätter sin prägel på ön. Match Cup Sweden avgörs första veckan i juli, och enligt destinationsbolaget Turistrådet Västsverige är Marstrand då landets segelcentrum. Den kommunala gästhamnen kallas av samma källa Sveriges största gästhamn. Gästbåtar ligger vid bryggorna G, H, D och E, medan båtar över 15 meters skrovlängd ligger vid Gästkajen, där minsta djup är 3,5 meter. El och vatten ingår i gästhamnsavgiften och hamnkontoret är bemannat dagligen maj–september.',
      // KÄLLA: Kungälvs kommun, Marstrandsfärjan — bekräftar att färjan mellan Koön och Marstrand drivs av kommunen och att biljetter och dispensansökningar hanteras där — https://www.kungalv.se/trafik--gator/kollektivtrafik/marstrandsfarjan/ ; Besöksparkering i Marstrand — https://www.kungalv.se/trafik--gator/parkering/parkeringsplatser-i-marstrand/ ; Samlastning Marstrand — https://www.kungalv.se/trafik--gator/kollektivtrafik/samlastning/ (läst 2026-09-16)
      'Färjan mellan Koön och Marstrandsön kallas Marstrandsfärjan och drivs av Kungälvs kommun, som också hanterar biljetter och dispensansökningar för den. Besöksparkering finns på Koön och fastlandssidan. Fordonstrafiken på själva ön är starkt begränsad: den som ska skicka gods dit hänvisas av kommunen till en samlastningstjänst.',
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Marstrand — bekräftar Societetshuset och Marstrands Varmbadhus samt att kung Oscar II fanns bland badortsgästerna — https://www.vastsverige.com/en/kungalv/products/marstrand/ (läst 2026-09-16)
      'Under 1800-talet fick Marstrand ett andra liv som badort. Societetshuset och Marstrands Varmbadhus drog societeten till ön, och bland gästerna fanns kung Oscar II.',
    ],
    facts: {
      // KÄLLA: Kungälvs kommun, Marstrandsfärjan — bekräftar färjeförbindelsen Koön–Marstrandsön — https://www.kungalv.se/trafik--gator/kollektivtrafik/marstrandsfarjan/ (läst 2026-09-16)
      travel_time: 'Bil eller buss till Koön, sedan Marstrandsfärjan över sundet',
      character: 'Fästningsö med gästhamn och trästad',
      season: 'Juni–september högsäsong, helår med begränsat utbud',
      best_for: 'Segling, fästningsbesök, historisk trästadsmiljö',
    },
    facts_provenance: {
      travel_time: 'matt',
      character: 'bedomning',
      season: 'bedomning',
      best_for: 'bedomning',
    },
    activities: [
      // KÄLLA: Statens fastighetsverk, Carlstens fästning Marstrand — bekräftar namnet, att anläggningen är statligt byggnadsminne och att SFV förvaltar den sedan 1993 — https://www.sfv.se/vara-fastigheter/sverige/vastra-gotalands-lan/carlstens-fastning-marstrand (läst 2026-09-16)
      { icon: '🏰', name: 'Carlstens fästning', desc: 'Statligt byggnadsminne, förvaltat av Statens fastighetsverk sedan 1993.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Marstrand — bekräftar GKSS Match Cup Sweden första veckan i juli och Marstrand som landets segelcentrum då — https://www.vastsverige.com/kungalv/marstrand/ (läst 2026-09-16)
      { icon: '⛵', name: 'GKSS Match Cup Sweden', desc: 'Avgörs första veckan i juli — då är Marstrand landets segelcentrum enligt Turistrådet Västsverige.' },
    ],
    accommodation: [
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Grand Hotel Marstrand — bekräftar namnet, Rådhusgatan 2 på Marstrandsön och matsalarna Grand Tenan och Bakfickan — https://www.vastsverige.com/en/kungalv/products/grand-hotel-marstrand/ (läst 2026-09-16)
      { name: 'Grand Hotel Marstrand', type: 'Hotell', desc: 'Hotell på Marstrandsön med restaurangerna Grand Tenan och Bakfickan.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Marstrands Havshotell — bekräftar läget på Koön intill färjeläget, spa, 144 rum och restaurangen Otto\'s Vardagsrum & Kök — https://www.vastsverige.com/en/kungalv/products/marstrands-havshotell/ (läst 2026-09-16)
      { name: 'Marstrands Havshotell', type: 'Hotell', desc: 'Hotell på Koön vid färjeläget till Marstrandsön, med spa och restaurangen Otto\'s Vardagsrum & Kök.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Marstrands Kurhotell — bekräftar byggnaden som på 1800-talet inrymde kall- och varmbad, 39 rum, Kungsplanen på Marstrandsön — https://www.vastsverige.com/en/kungalv/products/marstrands-kurhotell/ (läst 2026-09-16)
      { name: 'Marstrands Kurhotell', type: 'Hotell', desc: 'Hotell i en byggnad som på 1800-talet inrymde kall- och varmbad. 39 rum på Marstrandsön.' },
    ],
    getting_there: [
      // KÄLLA: Kungälvs kommun, Marstrandsfärjan och Besöksparkering i Marstrand — bekräftar färjan Koön–Marstrandsön och parkering på Koön — https://www.kungalv.se/trafik--gator/kollektivtrafik/marstrandsfarjan/ och https://www.kungalv.se/trafik--gator/parkering/parkeringsplatser-i-marstrand/ (läst 2026-09-16)
      { method: 'Bil + färja', from: 'Göteborg', desc: 'Kör till Koön och parkera, ta sedan Marstrandsfärjan över sundet.', icon: '🚗' },
      { method: 'Buss', from: 'Göteborg', desc: 'Buss från Göteborg till Marstrand — se Västtrafiks reseplanerare.', icon: '🚌' },
    ],
    harbors: [
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Marstrands gästhamn — bekräftar kommunal gästhamn på sydöstra Marstrandsön, el och vatten som ingår i gästhamnsavgiften samt dusch och WC — https://www.vastsverige.com/kungalv/produkter/marstrands-gasthamn/ ; drift av Kungälvs kommun — https://www.marstrandsgasthamn.se/sv/ ; tvättmaskin och torktumlare — https://www.gasthamnsguide.se/omradesindelat/vastkusten/item/marstrands-gasthamn (läst 2026-09-16)
      { name: 'Marstrands Gästhamn', desc: 'Kommunal gästhamn på sydöstra Marstrandsön. El och vatten ingår i gästhamnsavgiften. Ankring är inte tillåten.', fuel: false, service: ['Vatten', 'El', 'Dusch', 'WC', 'Tvätt'] },
    ],
    restaurants: [
      // KÄLLA: Grand Hotel Marstrand, egen webbplats — bekräftar Restaurang Tenan med "vällagad à la carte, fisk och skaldjur samt klassiska rätter" — https://grandmarstrand.se/restaurang-tenan/ ; läget Rådhusgatan 2 — https://www.vastsverige.com/kungalv/produkter/restaurang-tenan/ (läst 2026-09-16)
      { name: 'Tenan', type: 'Restaurang', desc: 'À la carte med fisk, skaldjur och klassiska rätter. Del av Grand Hotel Marstrand.' },
      // KÄLLA: Hamnkrogen Marstrand, egen webbplats — bekräftar namn, adressen Lilla Varvsgatan 20 samt rubrikerna KÖK & BAR och Butik — https://www.hamnkrogenmarstrand.se/ (läst 2026-09-16)
      { name: 'Hamnkrogen Marstrand', type: 'Krog', desc: 'Krog med kök och bar på Lilla Varvsgatan.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Marstrands Wärdshus — bekräftar skaldjursplatåer och grillmat samt adressen "Mitt på kajen" på Marstrandsön — https://www.vastsverige.com/kungalv/produkter/marstands-wardshus/ (läst 2026-09-16)
      { name: 'Marstrands Wärdshus', type: 'Restaurang', desc: 'Skaldjurs- och grillrestaurang mitt på kajen på Marstrandsön, med uteterrass vid hamnen.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Johans krog Marstrand — bekräftar "fransk bistro" och adressen Kungsgatan 12 — https://www.vastsverige.com/kungalv/produkter/johans-krog-marstrand/ (läst 2026-09-16)
      { name: 'Johans krog Marstrand', type: 'Restaurang', desc: 'Fransk bistro på Kungsgatan med utservering.' },
      // KÄLLA: Carlstens fästning, egen webbplats — bekräftar caféet vid fästningens entré, utbudet av våfflor, pajer, baguetter och sallader samt att fästningsbiljett inte krävs — https://carlsten.se/en/carlsten-waffle-cafe/ (läst 2026-09-16)
      { name: 'Carlstens Vaffelcafé', type: 'Café', desc: 'Café vid ingången till Carlstens fästning. Våfflor, pajer, baguetter och sallader; fästningsbiljett krävs inte för besök.' },
    ],
    // KÄLLA: Turistrådet Västsverige (vastsverige.com), Marstrand — bekräftar att GKSS Match Cup Sweden avgörs första veckan i juli — https://www.vastsverige.com/kungalv/marstrand/ (läst 2026-09-16)
    tips: ['Match Cup Sweden avgörs första veckan i juli — boka boende i god tid om du vill vara på ön då.'],
    related: ['smogen', 'kungshamn', 'lysekil'],
    tags: ['fästning', 'segling', 'restauranger', 'sommardestination', 'lyx'],
    // KÄLLA: Statens fastighetsverk, Carlstens fästning Marstrand — bekräftar världens första roterande fyr 1781, högst 232 fångar, Lasse-Maja dit 1813 och att de sista fångarna flyttades 1858 — https://www.sfv.se/vara-fastigheter/sverige/vastra-gotalands-lan/carlstens-fastning-marstrand (läst 2026-09-16)
    did_you_know: 'Världens första roterande fyr installerades i Carlstens torn 1781. Fästningen var också fängelse — som mest 232 fångar, bland dem Lasse-Maja som fördes hit 1813 — och de sista fångarna flyttades bort 1858.',
    seasonal: {
      open: 'Maj–September',
      peak: 'Juli–Augusti',
      best: 'Juni eller September',
      // KÄLLA: vastsverige.com/kungalv/marstrand/ (Match Cup första veckan i juli, se tips). Månaderna: faktarutan säger "helår med begränsat utbud", så vintermånaderna är 'limited', inte stängda. "Höstljus" och "betydligt lugnare" stod utan källa.
      bestReason: 'Juni och september ligger utanför Match Cup-veckan i början av juli.',
      warning: 'GKSS Match Cup Sweden avgörs första veckan i juli – boka boende i god tid om du vill vara på ön då.',
      months: ['limited','limited','limited','limited','open','open','peak','peak','open','limited','limited','limited'],
    },
  },
  {
    slug: 'smogen',
    name: 'Smögen',
    region: 'bohuslan',
    regionLabel: 'Bohuslän',
    emoji: '🦐',
    // KÄLLA: Turistrådet Västsverige (vastsverige.com), Smögenbryggan — bekräftar formuleringen "Sveriges mest besökta brygga" — https://www.vastsverige.com/sotenas/produkter/smogenbryggan/ ; landets näst största fiskauktion — https://www.vastsverige.com/sotenas/artiklar/smogen/ (läst 2026-09-16)
    tagline: 'Sveriges mest besökta brygga, landets näst största fiskauktion och Hållö fyr utanför.',
    description: [
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Smögenbryggan — bekräftar "1 km långt", "Sveriges mest besökta brygga", caféer, krogar och butiker, båtturer till Hållö och Kungshamn samt hamnen använd av fiskare redan under mitten av 1500-talet — https://www.vastsverige.com/sotenas/produkter/smogenbryggan/ ; första omnämnandet 1594 — https://www.vastsverige.com/sotenas/artiklar/smogen/ (läst 2026-09-16)
      'Smögenbryggan är Smögens nav. Turistrådet Västsverige anger bryggan som 1 kilometer lång och kallar den Sveriges mest besökta brygga sommartid. Längs den ligger caféer, krogar och ett stort antal butiker, och härifrån går båtturer till bland annat Hållö och Kungshamn. Hamnen har använts av fiskare sedan mitten av 1500-talet, och första gången Smögen nämns i litteraturen är 1594.',
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Smögen — bekräftar "Landets näst största fiskauktion ligger på Smögen" och Fiskarstugan daterad till omkring 1850 — https://www.vastsverige.com/sotenas/artiklar/smogen/ (läst 2026-09-16)
      'Fisket är fortfarande på riktigt här: landets näst största fiskauktion ligger på Smögen. I hamnmiljön finns också Fiskarstugan, en fiskarbostad från omkring 1850 som visar hur man bodde och levde här.',
      // KÄLLA: Sotenäs kommun, Smögens gästhamn — bekräftar kommunal drift, ca 120 gästplatser, fastförtöjning, vattendjup 3–5 meter, servicen WC, färskvatten, el, wifi, tvättmaskin/torktumlare, sopor och dusch, hamnkontor öppet vecka 25–33 samt bokning via Dockspot — https://www.sotenas.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/batar-och-hamnar/gasthamnar/smogens-gasthamn (läst 2026-09-16)
      'Gästhamnen drivs av Sotenäs kommun och ligger vid själva Smögenbryggan. Den har cirka 120 gästplatser med fastförtöjning och ett vattendjup på 3–5 meter. Servicen omfattar toalett, färskvatten, el, wifi, tvättmaskin och torktumlare, sopor och dusch, och hamnkontoret vid början av bryggan är öppet dagligen under vecka 25–33. Bokning sker via Dockspot.',
      // KÄLLA: Sotenäs kommun, Badplatser Smögen — bekräftar de tre badplatserna Sandö, Vallevik samt Herr- och dambadet i Makrillviken med angiven service — https://www.sotenas.se/upplevagora/idrottmotionochfriluftsliv/friluftslivochmotion/badplatserhundbad/smogen.4.15eba9af15b0a9219ba31966.html (läst 2026-09-16)
      'Sotenäs kommun listar tre badplatser på Smögen. Sandö är en sandstrand med bryggor, badstegar och tillgänglighetsramp, omklädningsrum, toalett och tillgänglighetsanpassad toalett samt grillplats och parkering. Vallevik är ett klippbad med badstegar och hopptorn, stor gräsyta, grillmöjlighet och parkering. Herr- och dambadet i Makrillviken är en klippstrand med bryggor och badstegar, där omklädning och toalett nås via det intilliggande vandrarhemmet.',
      // KÄLLA: Länsstyrelsen Västra Götaland, naturreservatet Hållöarkipelagen — bekräftar bildat 1975, ca 292 hektar, förvaltas av Västkuststiftelsen, Bohusläns äldsta fyr på plats sedan 1842 med vit blixt var tolfte sekund, byggnadsminne 1935, Marmorbassängen och regelbundna badturer från Kungshamn sommartid — https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/halloarkipelagen.html (läst 2026-09-16)
      'Strax utanför ligger Hållö. Ön ingår i naturreservatet Hållöarkipelagen, som bildades 1975, omfattar cirka 292 hektar och förvaltas av Västkuststiftelsen. Hållö fyr är Bohusläns äldsta fyr — den har stått här sedan 1842, lyser med en vit blixt var tolfte sekund och blev byggnadsminne 1935. På öns västsida ligger Marmorbassängen med släta klippavsatser att bada från, och sommartid går regelbundna badturer från Kungshamn.',
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Smögen — bekräftar att Hotell Smögens Hafvsbad stod klart 1900 och tog emot sommargäster som kom för att bada tångbad och roa sig — https://www.vastsverige.com/sotenas/artiklar/smogen/ (läst 2026-09-16)
      'Badortstiden satte också spår. Hotell Smögens Hafvsbad stod klart år 1900 och tog emot sommargäster som kom för att bada tångbad och roa sig.',
    ],
    facts: {
      travel_time: 'Bil eller buss via Kungshamn',
      character: 'Fiskeläge med Smögenbryggan, klippor och badplatser',
      season: 'Juni–augusti högsäsong',
      best_for: 'Räkmacka, sommarmiljö, klippvandring',
    },
    facts_provenance: {
      travel_time: 'bedomning',
      character: 'bedomning',
      season: 'bedomning',
      best_for: 'bedomning',
    },
    activities: [
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Smögen — bekräftar att landets näst största fiskauktion ligger på Smögen — https://www.vastsverige.com/sotenas/artiklar/smogen/ (läst 2026-09-16)
      { icon: '🦐', name: 'Fiskauktionen', desc: 'Landets näst största fiskauktion ligger på Smögen.' },
      // KÄLLA: Länsstyrelsen Västra Götaland, naturreservatet Hållöarkipelagen — bekräftar berggrunden av ljusröd, slipad granit i området — https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/halloarkipelagen.html (läst 2026-09-16)
      { icon: '🥾', name: 'Klippvandring', desc: 'Klippterräng i ljusröd, slipad granit — samma berggrund som präglar Hållöarkipelagen.' },
      // KÄLLA: Sotenäs kommun, Badplatser Smögen — bekräftar Vallevik som kommunalt klippbad med badstegar, hopptorn, gräsyta och grillmöjlighet — https://www.sotenas.se/upplevagora/idrottmotionochfriluftsliv/friluftslivochmotion/badplatserhundbad/smogen.4.15eba9af15b0a9219ba31966.html (läst 2026-09-16)
      { icon: '🏊', name: 'Vallevik', desc: 'Kommunalt klippbad med badstegar, hopptorn, gräsyta och grillplats.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Smögenbryggan — bekräftar caféer, krogar och butiker längs bryggan samt båtturer till Hållö — https://www.vastsverige.com/sotenas/produkter/smogenbryggan/ (läst 2026-09-16)
      { icon: '🛍', name: 'Smögenbryggan', desc: 'Caféer, krogar och ett stort antal butiker längs bryggan; härifrån går även båtturer till Hållö.' },
    ],
    accommodation: [
      // KÄLLA: Smögens Hafvsbad, egen webbplats — bekräftar hotell med spa och restaurang på Smögen med utsikt över havet — https://www.smogenshafvsbad.se/restaurang/ (läst 2026-09-16)
      { name: 'Smögens Hafvsbad', type: 'Hotell', desc: 'Hotell på Smögen med spa och restaurang med utsikt över havet.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Sea Lodge Smögen — bekräftar namnet, adressen Nordmanshuvudet 1, 15 rum och restaurang med servering på bryggan — https://www.vastsverige.com/en/sotenas/produkter/sea-lodge-smogen/ (läst 2026-09-16)
      { name: 'Sea Lodge Smögen', type: 'Hotell', desc: 'Hotell med 15 rum och restaurang med servering på bryggan.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Pensionat Bryggan — bekräftar läget på Smögenbryggan, rum mot hamnen och bistro i sjöboden nedanför huset — https://www.vastsverige.com/sotenas/produkter/pensionat-bryggan/ (läst 2026-09-16)
      { name: 'Pensionat Bryggan', type: 'Pensionat', desc: 'Pensionat på Smögenbryggan med rum mot hamnen och bistro i sjöbod nedanför huset.' },
    ],
    getting_there: [
      { method: 'Bil', from: 'Göteborg', desc: 'E6 norrut, därefter västerut mot Kungshamn och vidare över bron till Smögen.', icon: '🚗' },
      { method: 'Buss', from: 'Göteborg', desc: 'Buss till Kungshamn, därefter lokalbuss till Smögen — se Västtrafiks reseplanerare.', icon: '🚌' },
    ],
    harbors: [
      // KÄLLA: Sotenäs kommun, Smögens gästhamn — bekräftar kommunal drift och servicen "WC, färskvatten, el, wifi, tvättmaskin/torktumlare, sopor och dusch" — https://www.sotenas.se/upplevagora/idrottmotionochfriluftsliv/friluftslivochmotion/batarochhamnar/gasthamnar/smogensgasthamn.4.15eba9af15b0a9219ba328a8.html ; ca 120 platser, vattendjup 3–5 m och formuleringen "Västkustens mest välbesökta hamn" — https://www.vastsverige.com/sotenas/produkter/gasthamn-smogen/ (läst 2026-09-16)
      { name: 'Smögens Gästhamn', desc: 'Kommunalt driven gästhamn vid Smögenbryggan. vastsverige.com kallar den "Västkustens mest välbesökta hamn".', fuel: false, service: ['Vatten', 'El', 'Dusch', 'WC', 'Tvätt', 'Wifi'] },
    ],
    restaurants: [
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Glasscafét — bekräftar namnet, adressen Smögenbryggan och servering av glass och lunch inne och ute med utsikt över hamnen, säsongsöppet — https://www.vastsverige.com/sotenas/produkter/glasscafet/ (läst 2026-09-16)
      { name: 'Glasscafét', type: 'Glass/Café', desc: 'Glasscafé på Smögenbryggan med servering inomhus och utomhus mot hamnen. Säsongsöppet.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Skärets Krog — bekräftar krog och pianobar vid Smögenbryggan med café och bistro, "Allt här är bakat och tillagat från grunden, med lokala råvaror som utgångspunkt", Hamnen 1 — https://www.vastsverige.com/en/sotenas/produkter/skarets-krog/ (läst 2026-09-16)
      { name: 'Skärets Krog', type: 'Krog', desc: 'Krog och pianobar vid Smögenbryggan, med café och bistro. Västkustmat lagad från grunden.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Göstas Fiskekrog — bekräftar fisk och skaldjur direkt från kajen samt adressen Fiskhamnsgatan 32 — https://www.vastsverige.com/en/sotenas/produkter/gostas-fiskekrog/ (läst 2026-09-16)
      { name: 'Göstas Fiskekrog', type: 'Restaurang', desc: 'Fisk- och skaldjursrestaurang vid hamnen, med fiskbutik intill.' },
    ],
    // KÄLLA: Sotenäs kommun, Badplatser Smögen — bekräftar badplatserna Sandö, Vallevik och Herr- och dambadet i Makrillviken — https://www.sotenas.se/upplevagora/idrottmotionochfriluftsliv/friluftslivochmotion/badplatserhundbad/smogen.4.15eba9af15b0a9219ba31966.html (läst 2026-09-16)
    tips: ['Kom tidigt på morgonen för bästa bryggvyn utan folkvimmel.', 'Sotenäs kommun listar badplatserna på Smögen — Sandö, Vallevik och Herr- och dambadet i Makrillviken.'],
    related: ['kungshamn', 'grundsund', 'hamburgsund'],
    tags: ['räkor', 'fiskeby', 'sommardestination', 'fotogen'],
    // KÄLLA: Länsstyrelsen Västra Götaland, naturreservatet Hållöarkipelagen — bekräftar Bohusläns äldsta fyr på plats sedan 1842, vit blixt var tolfte sekund och byggnadsminnesförklaring 1935 — https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/halloarkipelagen.html (läst 2026-09-16)
    did_you_know: 'Hållö fyr utanför Smögen är Bohusläns äldsta fyr. Den har stått på ön sedan 1842, lyser med en vit blixt var tolfte sekund och byggnadsminnesförklarades 1935.',
    seasonal: {
      open: 'Juni–Augusti',
      peak: 'Juli',
      best: 'Juni',
      // KÄLLA: Sotenäs kommun, Smögens gästhamn — bekräftar att hamnkontoret är öppet från vecka 25 — https://www.sotenas.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/batar-och-hamnar/gasthamnar/smogens-gasthamn (läst 2026-09-16)
      bestReason: 'Bryggan är hanterbar och du hinner se sjöbodarnas fasader. Gästhamnens hamnkontor är bemannat från vecka 25.',
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Smögenbryggan — bekräftar formuleringen "Sveriges mest besökta brygga" — https://www.vastsverige.com/sotenas/produkter/smogenbryggan/ (läst 2026-09-16)
      warning: 'Juli är högsäsong på Smögenbryggan, som enligt Turistrådet Västsverige är Sveriges mest besökta brygga. Kom tidigt på dagen om du vill ha bryggan för dig själv.',
      months: ['off','off','off','off','limited','open','peak','open','limited','off','off','off'],
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
      // KÄLLA: Länsstyrelsen Västra Götaland, naturreservatet Stångehuvud — bekräftar ca 48 hektar, bildat 1983, förvaltas av Lysekils kommun tillsammans med Kungliga Vetenskapsakademien som skänkte marken under stenindustrins glansdagar, rundhällar med isräfflor och pegmatitgångar, Galleberget lämnat orört av kulturhistoriska skäl, stigar med trappor och broar samt bad och fiske längs västsidan — https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/stangehuvud.html (läst 2026-09-16)
      'Stångehuvud vid stadens södra kant är naturreservat sedan 1983 och omfattar cirka 48 hektar. Området förvaltas av Lysekils kommun tillsammans med Kungliga Vetenskapsakademien, som skänkte marken mitt under stenindustrins glansdagar just för att rädda landskapet undan brytning. Karaktäristiskt är rundhällarna med vackert slipade, mjuka former och tydliga isräfflor, ibland genomdragna av pegmatitgångar. På Galleberget i norr syns spår av tidigare brytning — den delen har av kulturhistoriska skäl lämnats nästan precis som den var när stenbrytningen upphörde. Stigarna är gjorda framkomliga med trappor och broar i kuperad terräng, och längs västsidans klippstrand finns bad och fiskemöjligheter.',
      // KÄLLA: Havets Hus, Om akvariet (svenska sidan) — bekräftar 25 akvarier, hälleflundror, rockor och havsaborrar i tunnelakvariet samt det grunda strandområdet med alger och sand; omkring 100 arter från Gullmarsfjorden och Västerhavet enligt sidans meta-beskrivning — https://www.havetshus.se/akvariet/om-akvariet/ ; Projekt Knaggrocka (Project Thornback Ray) — https://www.havetshus.se/en/akvariet/about-the-aquarium/ (läst 2026-09-16)
      'Lysekil har en stark marinbiologisk profil. Akvariet Havets Hus visar djur från Gullmarsfjorden och Västerhavet i 25 akvarier och omkring 100 arter, bland dem hälleflundror, rockor och havsaborrar, och har ett tunnelakvarium där fiskarna simmar ovanför besökaren. Miljöerna spänner från det grunda strandområdet med alger och sand till djupare vatten, ålgräsängar, mjuka sandbottnar och vrak. Akvariet driver också bevarandearbete, bland annat Projekt Knaggrocka.',
      // KÄLLA: Bohusläns museum, Badorten Lysekil — bekräftar badinrättning 1847, första varmbadhuset som däckshus från ett fartyg, första egentliga badhuset 1849, Carl Curman som badläkare, nytt varmbadhus och kallbadhus 1864, Havsbadrestaurangen 1869, Societetshuset 1872 utbyggt 1882, Curmans villor som byggnadsminnen, gångbryggan Trampen och kallbadhuset från 1911 — https://www.bohuslansmuseum.se/samlingar-och-historia/gamla-historiska-artiklar/badorten-lysekil/ (läst 2026-09-16)
      'Lysekil växte fram som badort under 1800-talet. En badinrättning bildades 1847 — det första varmbadhuset var däckshuset från ett fartyg — och det första egentliga badhuset byggdes 1849. När läkaren Carl Curman anställdes som badläkare fick orten kontakter i Stockholms societetsliv och blev stockholmarnas favoritbadort på västkusten. 1864 kom ett nytt varmbadhus och nya kallbadhus, 1869 Havsbadrestaurangen och 1872 Societetshuset, som byggdes ut 1882. Kvar i stadsbilden finns bland annat Curmans villor, som är byggnadsminnen, portalen, Havsbadrestaurangen, gångbryggan Trampen och kallbadhuset från 1911.',
      // KÄLLA: Lysekils kommun, Badplatser — bekräftar "salta och friska bad från klippor till sandstränder med lättillgängliga parkeringar, toaletter samt kiosk" och att Pinnevik i Lysekil och Bökevik i Fiskebäckskil namnges — https://www.lysekil.se/uppleva-och-gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser (läst 2026-09-16)
      'Kommunen sköter ett stort antal badplatser i och runt staden, från klippor till sandstränder, med parkering, toaletter och kiosk. Pinnevik i Lysekil och Bökevik i Fiskebäckskil lyfts fram särskilt.',
    ],
    facts: {
      travel_time: 'Bil eller buss från Göteborg via E6',
      character: 'Badort, marinbiologi, kustnära vandring',
      season: 'Juni–september högsäsong, helår',
      best_for: 'Familjer, akvariebesök, vandring längs kust',
    },
    facts_provenance: {
      travel_time: 'bedomning',
      character: 'bedomning',
      season: 'bedomning',
      best_for: 'bedomning',
    },
    activities: [
      // KÄLLA: Havets Hus, Om akvariet (svenska sidan) — bekräftar 25 akvarier, omkring 100 arter från Gullmarsfjorden och Västerhavet samt hälleflundror, rockor och havsaborrar i tunnelakvariet — https://www.havetshus.se/akvariet/om-akvariet/ (läst 2026-09-16)
      { icon: '🐠', name: 'Havets Hus', desc: '25 akvarier med omkring 100 arter från Gullmarsfjorden och Västerhavet — hälleflundror, rockor och havsaborrar, plus tunnelakvarium.' },
      // KÄLLA: Länsstyrelsen Västra Götaland, naturreservatet Stångehuvud — bekräftar bildat 1983, ca 48 hektar, rundhällar med isräfflor, stigar med trappor och broar samt bad längs västsidans klippstrand — https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/stangehuvud.html (läst 2026-09-16)
      { icon: '🥾', name: 'Stångehuvud naturreservat', desc: 'Naturreservat sedan 1983, ca 48 ha — rundhällar med isräfflor, stigar med trappor och broar, bad längs västsidans klippstrand.' },
      // KÄLLA: Lysekils kommun, Badplatser — bekräftar Pinnevik som kommunal badplats i Lysekil — https://www.lysekil.se/uppleva-och-gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser (läst 2026-09-16)
      { icon: '🏊', name: 'Pinnevik', desc: 'Kommunal badplats i Lysekil.' },
    ],
    accommodation: [
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Strandflickorna Hotell & Konferens — bekräftar namnet, Turistgatan 13 i Lysekil, sekelskifteshotell vid vattnet med spa, restaurang och privat brygga — https://www.vastsverige.com/en/lysekil/produkter/strandflickornas-havshotell/ (läst 2026-09-16)
      { name: 'Strandflickorna Hotell & Konferens', type: 'Hotell', desc: 'Sekelskifteshotell vid vattnet i Lysekil med spa, restaurang och egen brygga.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Hotel Lysekil — bekräftar namnet, Rosvikstorg 1 i Lysekils södra hamn, anor från 1952 och restaurangen My Italian Friend i huset — https://www.vastsverige.com/lysekil/produkter/hotell-lysekil/ (läst 2026-09-16)
      { name: 'Hotel Lysekil', type: 'Hotell', desc: 'Hotell vid Lysekils södra hamn med anor från 1952. Restaurangen My Italian Friend ligger i huset.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Siviks Camping — bekräftar läget 4 km norr om Lysekils centrum, havsnära, med campingplatser och stugor — https://www.vastsverige.com/en/lysekil/produkter/siviks-camping-eng/ (läst 2026-09-16)
      { name: 'Siviks Camping', type: 'Camping', desc: 'Camping 4 km norr om Lysekils centrum, vid havet, med campingplatser och stugor.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Grand Hotel Lysekil — bekräftar drift sedan 1878 och adressen Kungsgatan 36 i centrala Lysekil — https://www.vastsverige.com/en/lysekil/produkter/grand-hotel-lysekil/ (läst 2026-09-16)
      { name: 'Grand Hotel Lysekil', type: 'Hotell', desc: 'Hotell på Kungsgatan i Lysekils centrum, i drift sedan 1878.' },
    ],
    getting_there: [
      { method: 'Bil', from: 'Göteborg', desc: 'E6 norrut, avfart mot Lysekil.', icon: '🚗' },
      { method: 'Buss', from: 'Göteborg', desc: 'Buss från Göteborg — se Västtrafiks reseplanerare.', icon: '🚌' },
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
      { name: 'Brygghuset', type: 'Restaurang', desc: 'Fisk- och skaldjursrestaurang i Fiskebäckskil på Skaftö, med meny efter säsong. Ligger vid Slipens Hotell.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Norra Hamnen 5 — bekräftar adressen Norra Hamngatan 5 i Lysekil och menyn med skaldjur, fiskrätter, inlagd sill och moules frites — https://www.vastsverige.com/en/lysekil/produkter/norra-hamnen-5/ (läst 2026-09-16)
      { name: 'Restaurang Norra Hamnen 5', type: 'Restaurang', desc: 'Fisk- och skaldjursrestaurang vid Norra hamnen, med flera matsalar, lounge och terrass mot havet.' },
    ],
    // KÄLLA: Havets Hus, Om akvariet — bekräftar att akvariet visar arter från Gullmarsfjorden och Västerhavet — https://www.havetshus.se/en/akvariet/about-the-aquarium/ ; Lysekils kommun, Badplatser — Pinnevik som kommunal badplats — https://www.lysekil.se/uppleva-och-gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser (läst 2026-09-16)
    tips: ['Havets Hus visar bara arter från Gullmarsfjorden och Västerhavet — bra att veta om du väntar dig tropiska akvarier.', 'Stångehuvud är magiskt vid soluppgång, undvik mitten av dagen.', 'Pinnevik är kommunens badplats i centrala Lysekil.'],
    related: ['fiskebackskil', 'grundsund', 'kosterhavet'],
    tags: ['badort', 'akvarium', 'vandring', 'familjer'],
    // KÄLLA: Länsstyrelsen Västra Götaland, naturreservatet Stångehuvud — bekräftar att Kungliga Vetenskapsakademien skänkte marken under stenindustrins glansdagar och att Galleberget lämnats orört av kulturhistoriska skäl — https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/stangehuvud.html ; bohusgranitens roll i Lysekil, Lysekils kommun, Industrihistoria — https://www.lysekil.se/uppleva-och-gora/kultur/kulturhistoria-och-kulturarv/industrihistoria.html (läst 2026-09-16)
    did_you_know: 'Stångehuvuds slipade klippor är räddade av en donation: Kungliga Vetenskapsakademien skänkte marken mitt under stenindustrins glansdagar för att området inte skulle brytas bort. På Galleberget i reservatets norra del har spåren efter brytningen medvetet lämnats orörda av kulturhistoriska skäl.',
    seasonal: {
      open: 'Maj–September',
      peak: 'Juli–Augusti',
      best: 'Juni eller September',
      bestReason: 'Juni: stränderna och Stångehuvuds klippor är lugna. September: Västerhavet är fortfarande badvarmt och det är glesare i staden.',
      warning: 'Parkering längs hamnen kan vara krånglig i högsäsong.',
      months: ['off','off','off','off','limited','open','peak','peak','open','limited','off','off'],
    },
  },
  {
    slug: 'kosterhavet',
    slag: 'nationalpark',
    name: 'Kosterhavet',
    region: 'bohuslan',
    regionLabel: 'Bohuslän',
    emoji: '🐟',
    // KÄLLA: sverigesnationalparker.se, Kosterhavets nationalpark — bekräftar Sveriges första marina nationalpark — https://www.sverigesnationalparker.se/upptack-nationalparkerna/kosterhavets-nationalpark ; Fakta om parken — bildad 9 september 2009, 38 900 hektar varav 860 hektar land — https://sverigesnationalparker.se/park/kosterhavets-nationalpark/nationalparksfakta ; Djurliv — knubbsälar och ögonkorall — https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/kosterhavets-nationalpark/fakta-om-parken/djurliv (läst 2026-09-16)
    tagline: 'Sveriges första marina nationalpark — 38 900 hektar, varav 860 hektar land, knubbsälar och ögonkorall.',
    description: [
      // KÄLLA: sverigesnationalparker.se, Kosterhavets nationalpark — bekräftar "Kosterhavets nationalpark är Sveriges första marina nationalpark och består främst av vatten och undervattensmiljöer" — https://www.sverigesnationalparker.se/upptack-nationalparkerna/kosterhavets-nationalpark ; Fakta om parken — "Bildades: 9 september 2009" — https://sverigesnationalparker.se/park/kosterhavets-nationalpark/nationalparksfakta (läst 2026-09-16)
      'Kosterhavets nationalpark är Sveriges första marina nationalpark och består främst av vatten och undervattensmiljöer. Parken bildades den 9 september 2009.',
      // KÄLLA: sverigesnationalparker.se, Fakta om parken — bekräftar bildad 9 september 2009, "38 900 hektar, varav 860 hektar land", kommunerna Strömstad och Tanum samt Länsstyrelsen Västra Götaland som förvaltare — https://sverigesnationalparker.se/park/kosterhavets-nationalpark/nationalparksfakta (läst 2026-09-16)
      'Parken är stor och till övervägande del våt: 38 900 hektar, varav bara 860 hektar är land. Den ligger i Strömstads och Tanums kommuner och förvaltas av Länsstyrelsen Västra Götaland.',
      // KÄLLA: Naturvårdsverket / sverigesnationalparker.se, Kosterhavets nationalpark – Djurliv — bekräftar "omkring 6 000 olika arter", "Närmare 300 av dem finns inte någon annanstans i Sverige", Kosterfjordens djupränna, "Västerhavets största bestånd av knubbsälar" och "ett av Sveriges två kända växtplatser för revbildande korall, ögonkorall" — https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/kosterhavets-nationalpark/fakta-om-parken/djurliv (läst 2026-09-16)
      'Artrikedomen är parkens kärna. Enligt Naturvårdsverkets sida om parkens djurliv lever omkring 6 000 olika arter här, och närmare 300 av dem finns inte någon annanstans i Sverige. Många hör hemma i Kosterfjordens djupränna, Kosterrännan, där de branta klippväggarna sluttar ner mot djupet. Runt grynnor och holmar simmar Västerhavets största bestånd av knubbsälar. Parken rymmer också en av Sveriges två kända växtplatser för den revbildande korallen ögonkorall, vars rev är en värdefull livsmiljö för hundratals arter.',
      // OKLART: Naturvårdsverkets djurliv-sida anger "omkring 6 000 arter" medan parkens startsida anger "cirka 12 000 arter". Siffran 6 000 används här med avsändare utskriven, enligt granskningsrapporten.
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Frågor & svar Kosteröarna — bekräftar "both are virtually car-free", Sydkoster 8 kvadratkilometer och Nordkoster 4 kvadratkilometer, "it is only biking on South Koster. North Koster is not bike friendly", stränderna Rörvik, Kilesand, Västra Bryggan, Basteviken och Norrvikarna samt linfärjan Västra Bryggan–Långegärde bemannad sommartid — https://www.vastsverige.com/en/stromstad/articles/faq-koster/ (läst 2026-09-16)
      'Kosteröarna är två. Sydkoster är störst med en yta på 8 kvadratkilometer, flackare och den ö där man cyklar — här finns cykeluthyrning, restauranger och två stora stränder vid Rörvik och Kilesand, varav Kilesand är en kilometerlång sandstrand. Nordkoster är 4 kvadratkilometer, kuperat och enligt Turistrådet Västsverige inte lämpat för cykel, men har bra badplatser vid Västra Bryggan, Basteviken och Norrvikarna. Mellan öarna, från Västra Bryggan till Långegärde, går en liten linfärja som är bemannad sommartid. Båda öarna är i praktiken bilfria.',
      // KÄLLA: sverigesnationalparker.se, Naturum Kosterhavet — bekräftar utställningar, filmer och bildspel, klappakvarium, guidningar, föredrag, visningar och turer samt kartor — https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/kosterhavets-nationalpark/att-gora-i-parken/sevardheter/naturum-kosterhavet (läst 2026-09-16)
      'På naturum Kosterhavet finns utställningar, filmer och bildspel om nationalparken och naturen i området, samt ett klappakvarium där du kan titta och känna på Kosterhavet. Personalen ordnar guidningar, föredrag, visningar och turer på stränderna, och där får du kartor och svar på frågor om parken.',
    ],
    facts: {
      // KÄLLA: Västtrafik, Kosterbåtarna — bekräftar linje 899 mellan Strömstad och Kosteröarna — https://www.vasttrafik.se/info/kosterbatarna/ ; avgång från Strömstads norra hamn intill torget och turistinformationen samt restid ca 30–60 min beroende på brygga och årstid enligt Turistrådet Västsverige — https://www.vastsverige.com/en/stromstad/articles/faq-koster/ (läst 2026-09-16)
      travel_time: 'Kosterbåtarna (Västtrafik linje 899) från Strömstads norra hamn; ca 30–60 min beroende på brygga och årstid enligt Turistrådet Västsverige',
      character: 'Vild natur, marinbiologi, bilfria Nord- och Sydkoster', // Kosteröarna är två (se beskrivningen), inte en trio
      season: 'Juni–september, vintertid begränsat',
      best_for: 'Cykling på Sydkoster, bad, naturupplevelse',
    },
    facts_provenance: {
      travel_time: 'matt',
      character: 'bedomning',
      season: 'bedomning',
      best_for: 'bedomning',
    },
    activities: [
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Frågor & svar Kosteröarna — bekräftar att cykling endast sker på Sydkoster, att cykeluthyrning finns och att Nordkoster inte är cykelvänligt — https://www.vastsverige.com/en/stromstad/articles/faq-koster/ (läst 2026-09-16)
      { icon: '🚲', name: 'Cykla Sydkoster', desc: 'Sydkoster är flackare och den ö man cyklar på — cykeluthyrning finns. Nordkoster är enligt Turistrådet Västsverige inte cykelvänligt.' },
      // KÄLLA: Naturvårdsverket / sverigesnationalparker.se, Kosterhavets nationalpark – Djurliv — bekräftar Kosterfjordens djupränna med branta klippväggar och en av Sveriges två kända växtplatser för revbildande ögonkorall samt Västerhavets största bestånd av knubbsälar — https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/kosterhavets-nationalpark/fakta-om-parken/djurliv (läst 2026-09-16)
      { icon: '🤿', name: 'Dykning', desc: 'Kosterfjordens djupränna har branta klippväggar och en av Sveriges två kända växtplatser för revbildande ögonkorall.' },
      { icon: '🦭', name: 'Knubbsäl', desc: 'Runt grynnor och holmar simmar Västerhavets största bestånd av knubbsälar.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Frågor & svar Kosteröarna — bekräftar Nordkoster som kuperad ö med badplatser vid Västra Bryggan, Basteviken och Norrvikarna — https://www.vastsverige.com/en/stromstad/articles/faq-koster/ (läst 2026-09-16)
      { icon: '🚶', name: 'Vandring Nordkoster', desc: 'Kuperad ö med badplatser vid Västra Bryggan, Basteviken och Norrvikarna.' },
    ],
    accommodation: [
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Ekenäs Havshotell — bekräftar namnet, läget på Sydkoster i Kosterhavets marina nationalpark samt rum och lägenheter med havsutsikt — https://www.vastsverige.com/stromstad/produkter/ekenas-havshotell/ ; egen webbplats — https://www.ekenashavshotell.se/en (läst 2026-09-16)
      { name: 'Ekenäs Havshotell', type: 'Hotell', desc: 'Hotell vid Ekenäs på Sydkoster, i Kosterhavets nationalpark. Rum och lägenheter, flera med havsutsikt.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Reservatet Nordkoster — bekräftar "Kosteröarnas enda campingplats för tält samt sju ekologiska stugor", läget på Nordkosters nordöstra kust och att tältplatserna måste förbokas — https://www.vastsverige.com/stromstad/produkter/reservatet-nordkoster/ (läst 2026-09-16)
      { name: 'Reservatet Nordkoster', type: 'Camping', desc: 'Tältcamping och sju ekologiska stugor på Nordkosters nordöstra kust. Tältplatserna måste förbokas.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Kläpphagen Koster — bekräftar läget vid Ekenäs på Sydkoster, sex sviter med terrass, glampingtält, Gårdshuset och restaurang med mat över öppen eld — https://www.vastsverige.com/en/stromstad/produkter/klapphagen-koster/ (läst 2026-09-16)
      { name: 'Kläpphagen Koster', type: 'Hotell', desc: 'Boende vid Ekenäs på Sydkoster med sviter, glampingtält och gårdshus. Restaurang med mat lagad över öppen eld.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Kostergården — bekräftar läget vid sandstranden Kilesand på Sydkoster, stugor, lägenheter och sviter samt restaurang med två uteserveringar — https://www.vastsverige.com/en/stromstad/produkter/kostergarden/ (läst 2026-09-16)
      { name: 'Kostergården', type: 'Stugor', desc: 'Stugor, lägenheter och sviter vid sandstranden Kilesand på Sydkoster. Restaurang och två uteserveringar på plats.' },
    ],
    getting_there: [
      // KÄLLA: Västtrafik, Kosterbåtarna — bekräftar linje 899, cykel ombord i mån av plats och biljett via Västtrafik To Go eller av däcksman ombord — https://www.vasttrafik.se/info/kosterbatarna/ ; avgång från Strömstads norra hamn intill torget och turistinformationen samt restid ca 30–60 min beroende på brygga och årstid — https://www.vastsverige.com/en/stromstad/articles/faq-koster/ (läst 2026-09-16)
      { method: 'Bil + båt', from: 'Strömstad', time: 'ca 30–60 min beroende på brygga och årstid', desc: 'Kosterbåtarna går från Strömstads norra hamn, intill torget och turistinformationen. Linjen är Västtrafik 899; cykel får tas med i mån av plats. Biljett köps i Västtrafik To Go eller av däcksman ombord.', icon: '⛴' },
    ],
    harbors: [
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Korshamn – Ekenäs gästhamn — bekräftar namnet och läget på Sydkoster, restauranger, hotell och cykeluthyrning vid bryggan, besökscenter för Kosterhavets nationalpark intill samt ICA ca 1,5 km bort öppet året runt — https://www.vastsverige.com/stromstad/produkter/gasthamn-ekenas/ (läst 2026-09-16)
      { name: 'Korshamn–Ekenäs gästhamn', desc: 'Gästhamn vid Ekenäs på Sydkoster. Restauranger, hotell och cykeluthyrning vid bryggan, besökscenter för Kosterhavets nationalpark intill och livsmedelsbutik ca 1,5 km bort.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Gästhamn Nordkoster — bekräftar lägena Bopallen (Västra Bryggan) och Vettnet, restauranger vid Västra Bryggan och livsmedelsaffären "Affärn på Nord" sommartid — https://www.vastsverige.com/stromstad/produkter/gasthamn-nordkoster/ ; turlistkarta Strömstad–Koster som visar att Långegärde ligger på Sydkoster — https://www.vastsverige.com/en/things-to-do/explore-the-west-coast-by-boat/ferry-lines/route-map-stromstadkoster/ (läst 2026-09-16)
      { name: 'Gästhamn Nordkoster', desc: 'Gästhamn på Nordkoster med lägena Bopallen (Västra Bryggan) och Vettnet. Restauranger vid Västra Bryggan och livsmedelsaffär sommartid.' },
    ],
    restaurants: [
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Ekenäs Havshotell — bekräftar restaurangen Himmel & Hav på Sydkoster med skaldjur, fisk och lokala råvaror efter säsong — https://www.vastsverige.com/stromstad/produkter/ekenas-havshotell/ ; egen webbplats — https://www.ekenashavshotell.se/en (läst 2026-09-16)
      { name: 'Ekenäs Havshotell (restaurang Himmel & Hav)', type: 'Restaurang', desc: 'Hotellrestaurangen Himmel & Hav vid Ekenäs på Sydkoster. Skaldjur, fisk och lokala råvaror efter säsong.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Strandkanten — bekräftar familjerestaurang i renoverad sjöbod vid stranden på Nordkoster, Kalkemyrsvägen 4, rätter från havet, utsikt över Kostersundet och presentbutik intill — https://www.vastsverige.com/stromstad/produkter/strandkanten/ (läst 2026-09-16)
      { name: 'Strandkanten', type: 'Restaurang', desc: 'Familjerestaurang i en renoverad sjöbod vid stranden på Nordkoster. Rätter från havet och utsikt över Kostersundet. Presentbutik intill.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Kosters Rökeri — bekräftar läget vid Ekenäs brygga på Sydkoster bredvid naturum samt färsk och rökt fisk med tillhörande fiskaffär — https://www.vastsverige.com/stromstad/produkter/kosters-rokeri/ (läst 2026-09-16)
      { name: 'Kosters Rökeri', type: 'Restaurang', desc: 'Fisk- och skaldjursrestaurang vid Ekenäs brygga på Sydkoster, intill naturum Kosterhavet. Rökeri och fiskbutik i anslutning.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Sundets Skaldjurscafé — bekräftar läget vid Långegärde brygga på Sydkoster, färska skaldjur och säsongsöppet — https://www.vastsverige.com/stromstad/produkter/sundets-skaldjurscafe/ (läst 2026-09-16)
      { name: 'Sundets Skaldjurscafé', type: 'Café', desc: 'Bryggservering vid Långegärde brygga på Sydkoster med färska skaldjur. Säsongsöppet.' },
    ],
    // KÄLLA: Turistrådet Västsverige (vastsverige.com), Frågor & svar Kosteröarna — bekräftar att cykling hör hemma på Sydkoster, att Nordkoster inte är cykelvänligt och att linfärjan Västra Bryggan–Långegärde är bemannad sommartid — https://www.vastsverige.com/en/stromstad/articles/faq-koster/ (läst 2026-09-16)
    tips: ['Cykeln hör hemma på Sydkoster — Nordkoster är kuperat och beskrivs av Turistrådet Västsverige som inte cykelvänligt.', 'Mellan öarna går en liten linfärja, Västra Bryggan–Långegärde, bemannad sommartid.', 'Ta med vindjacka — det blåser nästan alltid.'],
    related: ['stromstad', 'grebbestad', 'fjallbacka'],
    tags: ['nationalpark', 'dykning', 'cykel', 'marint liv', 'sälar'],
    // KÄLLA: Naturvårdsverket / sverigesnationalparker.se, Kosterhavets nationalpark – Djurliv — bekräftar en av Sveriges två kända växtplatser för revbildande ögonkorall, reven som livsmiljö för hundratals arter, omkring 6 000 arter och närmare 300 som inte finns någon annanstans i Sverige — https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/kosterhavets-nationalpark/fakta-om-parken/djurliv (läst 2026-09-16)
    did_you_know: 'Kosterhavet rymmer en av Sveriges två kända växtplatser för revbildande korall — ögonkorall. Reven är en värdefull livsmiljö för hundratals arter. Enligt Naturvårdsverkets sida om parkens djurliv lever omkring 6 000 arter i parken, och närmare 300 av dem finns inte någon annanstans i Sverige.',
    seasonal: {
      open: 'Maj–September',
      peak: 'Juli–Augusti',
      best: 'Juni eller September',
      bestReason: 'Juni: klippstigarna på Nordkoster är lugna och naturum har öppet. September: glesare på öarna och fortfarande båtturer från Strömstad.',
      // KÄLLA: Västtrafik, Kosterbåtarna — bekräftar linje 899 mellan Strömstad och Kosteröarna och att cykel tas med i mån av plats — https://www.vasttrafik.se/info/kosterbatarna/ ; avgång från Strömstads norra hamn — https://www.vastsverige.com/en/stromstad/articles/faq-koster/ (läst 2026-09-16)
      warning: 'Kosterbåtarna är Västtrafik linje 899 från Strömstads norra hamn; cykel tas med i mån av plats, så räkna inte med att få plats för cykeln i högsäsong. Ta med vindjacka.',
      months: ['off','off','off','off','limited','open','peak','peak','open','limited','off','off'],
    },
  },
  {
    slug: 'grebbestad',
    slag: 'ort',
    name: 'Grebbestad',
    region: 'bohuslan',
    regionLabel: 'Bohuslän',
    emoji: '🦪',
    // KÄLLA: Tanums kommun, Ostronmeckat — bekräftar att 90 procent av Sveriges ostron kommer från Tanums kommun — https://www.tanum.se/upplevagora/ostronmeckat.4.2f5857cf188b9cbe7f0aa484.html (läst 2026-09-16)
    tagline: '90 % av Sveriges ostron kommer från Tanums kommun — och Grebbestad är dess hamn.',
    description: [
      // KÄLLA: Tanums kommun, Ostronmeckat — bekräftar "90 procent av Sveriges ostron kommer från Tanums kommun", Ostrea edulis handplockad av dykare, 3–4 år före skörd och säsong september–midsommar med uppehåll juli–augusti — https://www.tanum.se/upplevagora/ostronmeckat.4.2f5857cf188b9cbe7f0aa484.html ; "90 procent av Sveriges ostronproduktion kommer från Grebbestad och Tanum" — https://www.vastsverige.com/tanum/produkter/grebbestad/?site=145 (läst 2026-09-16)
      'Ostronen är Grebbestads signum. Tanums kommun anger att 90 procent av Sveriges ostron kommer från kommunen, och Turistrådet Västsverige skriver att 90 procent av landets ostronproduktion kommer från Grebbestad och Tanum. Det handlar om det vilda, platta ostronet Ostrea edulis, som plockas för hand av dykare och behöver bli tre till fyra år innan det skördas. Skördesäsongen löper från september fram till midsommar med uppehåll i juli och augusti, då ostronen leker.',
      // KÄLLA: Tanums kommun, Ostronmeckat — bekräftar Ostronakademien bildad 2004, NM i ostronöppning i maj, Ostronets dag i september, Kalvö Ostron handplockat sedan 1600-talet, Grebbestads Ostron med EU-skyddad ursprungsbeteckning sedan maj 2023 och 50 000–60 000 ostron per år samt Havstenssunds Ostron som enda kommersiella odlingen i Skandinavien med säsong september–maj — https://www.tanum.se/upplevagora/ostronmeckat.4.2f5857cf188b9cbe7f0aa484.html (läst 2026-09-16)
      'Kring ostronen har det vuxit fram både hantverk och evenemang. Ostronakademien bildades 2004, Nordiska mästerskapen i ostronöppning hålls i maj och Ostronets dag i september. Bland producenterna i kommunen finns Kalvö Ostron, som plockat ostron för hand sedan 1600-talet, Grebbestads Ostron, som sedan maj 2023 har EU-skyddad ursprungsbeteckning och vars fiske är begränsat till 50 000–60 000 ostron om året, samt Havstenssunds Ostron, enligt Tanums kommun för närvarande den enda kommersiella ostronodlingen i Skandinavien, med säsong september–maj.',
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Grebbestad — bekräftar första moderna omnämnandet i början av 1600-talet, utvecklingen under 1800-talet, stenhuggarna i slutet av 1800-talet, gästhamnen som fullserviceanläggning med gott om båtplatser samt att Evert Taube skrev "Så länge skutan kan gå" på Otterön sommaren 1954 — https://www.vastsverige.com/tanum/produkter/grebbestad/?site=145 (läst 2026-09-16)
      'Orten nämns första gången i modern tid i början av 1600-talet och växte kraftigt under 1800-talet, och mot slutet av seklet kom stenhuggarna hit. Gästhamnen beskrivs av Turistrådet Västsverige som en fullserviceanläggning med gott om båtplatser. På Otterön utanför skrev Evert Taube sommaren 1954 "Så länge skutan kan gå".',
      // KÄLLA: Länsstyrelsen Västra Götaland, Tjurpanneområdet — bekräftar bildat 1968, ca 499 hektar, förvaltas av Västkuststiftelsen, öppet och kargt landskap, vandring i flera längder och rådet att invänta stiltje för bad — https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/tjurpanneomradet.html ; Länsstyrelsen Västra Götaland, Otterön — bildat 1967, ca 629 hektar, Västkuststiftelsen, ett av de mest välbesökta reservaten bland Bohusläns öar, stigar, naturhamnar, orkidéer, lövskog, bronsåldersrös, en kopia av en runsten med den längsta urnordiska runskrift som påträffats och taxibåt från Grebbestad — https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/otteron.html ; Falkerödsleden tre kilometer lång — https://www.vastsverige.com/tanum/produkter/grebbestad/?site=145 (läst 2026-09-16)
      'Naturen runt Grebbestad är skyddad på flera håll. Tjurpanneområdet strax norr om samhället blev naturreservat 1968, omfattar cirka 499 hektar och förvaltas av Västkuststiftelsen. Landskapet är öppet och kargt, med branta klippstränder, sand-, grus- och blockstränder, kala hällar och ljunghed med enstaka tallar och rönnar; här erbjuds vandring i flera olika längder. Badar gör man klokast i stiltje. Ute i skärgården ligger Otterön, naturreservat sedan 1967 och cirka 629 hektar stort, också det förvaltat av Västkuststiftelsen — ett av de mest välbesökta reservaten bland Bohusläns öar, med flera vandringsstigar, skyddade naturhamnar, orkidéer, lövskog, en bronsåldersrös och en kopia av en runsten med den längsta kända urnordiska runinskriften. Ön nås enklast med taxibåt från Grebbestad. Inne på fastlandet går den tre kilometer långa Falkerödsleden.',
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Grebbestad — bekräftar hällristningar daterade till 1700–300 f.Kr., omkring 600 hällristningsplatser kring Vitlycke och Greby gravfält med fler än 180 synliga gravar — https://www.vastsverige.com/tanum/produkter/grebbestad/?site=145 (läst 2026-09-16)
      'Trakten är också hällristningarnas. Ristningarna i Tanum dateras till 1700–300 f.Kr., och kring Vitlycke finns omkring 600 hällristningsplatser. Strax utanför Grebbestad ligger dessutom Greby gravfält med fler än 180 synliga gravar.',
    ],
    facts: {
      travel_time: 'Bil via E6 norrut',
      character: 'Mysigt fiskeläge, ostron, klippvandring',
      season: 'Juni–september högsäsong',
      best_for: 'Ostron, segling, klippvandring',
    },
    facts_provenance: {
      travel_time: 'bedomning',
      character: 'bedomning',
      season: 'bedomning',
      best_for: 'bedomning',
    },
    activities: [
      // OKLART: res-ent-g1.md behåller Everts Sjöbod som verksamhet med egen källa, medan res-desc-g1.md anger att namnet inte gick att belägga och stryker det ur denna aktivitet. Rapporterna motsäger varandra; namnet står kvar under restaurants och är struket här enligt respektive rapport.
      // KÄLLA: Tanums kommun, Ostronmeckat — bekräftar att det vilda platta ostronet Ostrea edulis plockas för hand av dykare och att Ostronakademien bildades 2004 — https://www.tanum.se/upplevagora/ostronmeckat.4.2f5857cf188b9cbe7f0aa484.html (läst 2026-09-16)
      { icon: '🦪', name: 'Ostron-safari', desc: 'Vilda ostron, Ostrea edulis, plockas för hand av dykare. Ostronakademien i Grebbestad bildades 2004.' },
      // KÄLLA: Länsstyrelsen Västra Götaland, Tjurpanneområdet (Tjurpannans naturreservat) — bekräftar bildat 1968, ca 499 hektar, förvaltas av Västkuststiftelsen, öppet och kargt landskap med branta klippstränder och ljunghed samt vandring i flera längder — https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/tjurpanneomradet.html (läst 2026-09-16)
      { icon: '🥾', name: 'Tjurpannans naturreservat', desc: 'Naturreservat sedan 1968, ca 499 ha — öppet och kargt landskap med branta klippstränder och ljunghed. Vandring i flera längder.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Grebbestad — bekräftar gästhamnen som fullserviceanläggning med gott om båtplatser — https://www.vastsverige.com/tanum/produkter/grebbestad/?site=145 (läst 2026-09-16)
      { icon: '⛵', name: 'Gästhamnen', desc: 'Fullserviceanläggning med gott om båtplatser enligt Turistrådet Västsverige.' },
      // KÄLLA: Länsstyrelsen Västra Götaland, Otterön — bekräftar bildat 1967, ca 629 hektar, stigar, naturhamnar, orkidéer och lövskog samt att ön enklast nås med taxibåt från Grebbestad — https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/otteron.html (läst 2026-09-16)
      { icon: '🏊', name: 'Otterön', desc: 'Naturreservat sedan 1967, ca 629 ha — stigar, naturhamnar, orkidéer och lövskog. Nås enklast med taxibåt från Grebbestad.' },
    ],
    accommodation: [
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), TanumStrand — bekräftar namnet TanumStrand, postadress 457 95 Grebbestad, hotellrum och stugor med havsutsikt, nordiskt spa samt restaurangen Latitud 58° — https://www.vastsverige.com/en/tanum/produkter/tanumstrand/ (läst 2026-09-16)
      { name: 'TanumStrand SPA & Resort', type: 'Hotell', desc: 'Hotell- och konferensanläggning vid havet med hotellrum och stugor, nordiskt spa och restaurangen Latitud 58°.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Rosenhill Bed & Breakfast — bekräftar namnet, Sövallsvägen 5 i Grebbestad, Grebbestads gamla skolbyggnad renoverad och öppnad 2009 samt ca 500 m från centrum — https://www.vastsverige.com/en/tanum/produkter/rosenhill-bb/ (läst 2026-09-16)
      { name: 'Rosenhill Bed & Breakfast', type: 'B&B', desc: 'Bed & breakfast i Grebbestads gamla skolbyggnad, öppnat 2009, ca 500 m från centrum.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Grebys Hotell & Restaurang — bekräftar Strandvägen 1 i Grebbestad, nio individuellt inredda rum och restaurang med fisk och skaldjur från lokala vatten — https://www.vastsverige.com/en/tanum/produkter/grebys-hotell-o-restaurang/ (läst 2026-09-16)
      { name: 'Grebys Hotell & Restaurang', type: 'Hotell', desc: 'Hotell med nio rum och restaurang vid vattnet på Strandvägen i Grebbestad.' },
    ],
    getting_there: [
      { method: 'Bil', from: 'Göteborg', desc: 'E6 norrut, avtag mot Grebbestad efter Munkedal.', icon: '🚗' },
      // KÄLLA: Länsstyrelsen Västra Götaland, Otterön — bekräftar att ön enklast nås med taxibåt från Grebbestad och att regelbundna turer görs sommartid — https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/otteron.html (läst 2026-09-16)
      { method: 'Taxibåt', from: 'Grebbestad', desc: 'Till Otterön går taxibåt från Grebbestad, och sommartid görs regelbundna turer till ön.', icon: '⛴' },
    ],
    harbors: [
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), gästhamnar i Tanum — bekräftar ordagrant "Grebbestad Bryggan Guest Harbour. 160 guest berths. Washing machine, dryer, toilet, shower, and shore power. Operated by Gästhamnsbolaget. Harbour office open during summer." — https://www.vastsverige.com/en/tanum/accomodation/marinas/ (läst 2026-09-16)
      { name: 'Grebbestad Bryggan', desc: 'Gästhamn med 160 gästplatser, driven av Gästhamnsbolaget. Hamnkontor öppet sommartid.', fuel: false, service: ['El', 'Dusch', 'WC', 'Tvätt'] },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), gästhamnar i Tanum — bekräftar ordagrant "Grebbestad Seaport Guest Harbour. 30 berths. WC, shower, waste disposal, water and fuel refill." samt "TanumStrand Guest Harbour. Just south of Grebbestad. 250 berths directly adjacent to TanumStrand SPA & Resort. Toilet, shower, washing machine, dryer, shore power, and WiFi." — https://www.vastsverige.com/en/tanum/accomodation/marinas/ (läst 2026-09-16)
      { name: 'Grebbestad Seaport', desc: 'Gästhamn med 30 platser i Grebbestad.', fuel: true, service: ['Vatten', 'Dusch', 'WC'] },
      { name: 'TanumStrand Guest Harbour', desc: 'Gästhamn med 250 platser strax söder om Grebbestad, direkt vid TanumStrand SPA & Resort. Bemannat hamnkontor sommartid.', fuel: false, service: ['El', 'Dusch', 'WC', 'Tvätt', 'Wifi'] },
    ],
    restaurants: [
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Everts Sjöbod — bekräftar namn och läge Grönemadsvägen 61 i Grebbestad, ostronsafari och skaldjursupplevelser med servering i en fiskebod från 1800-talet samt sex dubbelrum — https://www.vastsverige.com/en/tanum/produkter/everts-sjobod/ (läst 2026-09-16)
      { name: 'Everts Sjöbod', type: 'Restaurang', desc: 'Ostronsafari och skaldjursupplevelser med servering i en fiskebod från 1800-talet. Även boende i sex dubbelrum.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Restaurant Telegrafen — bekräftar namnet, Nedre Långgatan 28 i Grebbestad, husmanskost och à la carte med kött och fisk samt drift sedan 2002 i en gammal telegrafstation — https://www.vastsverige.com/en/tanum/produkter/restaurant-telegrafen/ (läst 2026-09-16)
      { name: 'Restaurang Telegrafen', type: 'Krog', desc: 'Restaurang i en gammal telegrafstation på Nedre Långgatan, i drift sedan 2002. Husmanskost och à la carte, kött och fisk.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Café Skafferiet Grebbestad — bekräftar Nedre Långgatan 40 i Grebbestad och att stället fungerar både som café och restaurang — https://www.vastsverige.com/en/tanum/produkter/cafe-skafferiet-grebbestad/ (läst 2026-09-16)
      { name: 'Café Skafferiet', type: 'Café', desc: 'Café och bistro på Nedre Långgatan i Grebbestad.' },
    ],
    // KÄLLA: Turistrådet Västsverige (vastsverige.com), Grebbestad — bekräftar omkring 600 hällristningsplatser kring Vitlycke och ristningar daterade till 1700–300 f.Kr. — https://www.vastsverige.com/tanum/produkter/grebbestad/?site=145 ; Vitlycke museum drivs av Västra Götalandsregionens kulturförvaltning — https://www.vitlyckemuseum.se/ (läst 2026-09-16)
    tips: ['Boka ostron-safari en vecka i förväg.', 'Tjurpannan är magiskt vid solnedgång.', 'Kring Vitlycke finns omkring 600 hällristningsplatser, med ristningar daterade till 1700–300 f.Kr. Vitlycke museum drivs av Västra Götalandsregionens kulturförvaltning.'],
    related: ['fjallbacka', 'kosterhavet', 'hamburgsund'],
    tags: ['ostron', 'fiskeläge', 'klippvandring', 'sommardestination'],
    // KÄLLA: Tanums kommun, Ostronmeckat — bekräftar att 90 procent av Sveriges ostron kommer från kommunen, att Ostrea edulis plockas för hand av dykare och behöver bli tre till fyra år samt att Grebbestads Ostron har EU-skyddad ursprungsbeteckning sedan maj 2023 — https://www.tanum.se/upplevagora/ostronmeckat.4.2f5857cf188b9cbe7f0aa484.html (läst 2026-09-16)
    did_you_know: 'Tanums kommun anger att 90 procent av Sveriges ostron kommer härifrån. Det vilda platta ostronet Ostrea edulis plockas för hand av dykare och måste bli tre till fyra år innan det skördas — och sedan maj 2023 har Grebbestads Ostron EU-skyddad ursprungsbeteckning.',
    seasonal: {
      open: 'Maj–Oktober',
      peak: 'Juli–Augusti',
      best: 'September eller Oktober',
      // KÄLLA: Tanums kommun, Ostronmeckat — bekräftar skördesäsong september fram till midsommar med uppehåll i juli och augusti då ostronen leker — https://www.tanum.se/upplevagora/ostronmeckat.4.2f5857cf188b9cbe7f0aa484.html (läst 2026-09-16)
      bestReason: 'Skördesäsongen för ostron löper från september fram till midsommar, med uppehåll i juli och augusti då ostronen leker. En septemberdag med tomt hav och klara klippor är Grebbestad på sitt bästa.',
      warning: 'Ostronskörden har uppehåll i juli och augusti — kommer du för ostronens skull är september och framåt rätt tid.',
      months: ['off','off','off','off','limited','open','peak','peak','open','open','limited','off'],
    },
  },
  {
    slug: 'fjallbacka',
    name: 'Fjällbacka',
    region: 'bohuslan',
    regionLabel: 'Bohuslän',
    emoji: '⛰',
    tagline: 'Camilla Läckbergs by, Vetteberget och pittoreska sjöbodar.',
    description: [
      // KÄLLA: Tanums kommun, ortsinformation Fjällbacka — cirka 950 personer bor här året runt, orten omnämnd 1610, 22 hus 1694, Vetteberget skiljde orten från havet, Läckbergs deckare utspelar sig i Fjällbacka — https://www.tanum.se/kommunpolitik/kommunfakta/kommunenshistoria/ortsinformation/fjallbacka.4.7664b4813898b7df98459f8.html (läst 2026-09-16)
      'Fjällbacka är ett litet samhälle vid Tanums kust med ungefär 950 åretruntboende — en siffra som mångdubblas på somrarna. Orten finns omnämnd i skrivna källor från 1610 och hade 22 hus år 1694. Byn låg ursprungligen på randen mellan berg och hav; under 1900-talet har bebyggelsen krupit runt hela Vetteberget, och numera byggs det även uppe på berget. Fjällbacka används i dag som miljö i Camilla Läckbergs kriminalromaner.',
      // KÄLLA: Tanums kommun, ortsinformation Fjällbacka — sillfiskeperioderna, spannmålsfrakt till England, ansjovisen uppfanns i Fjällbacka på 1860–1880-talen och fick utmärkelser på internationella utställningar — https://www.tanum.se/kommunpolitik/kommunfakta/kommunenshistoria/ortsinformation/fjallbacka.4.7664b4813898b7df98459f8.html (läst 2026-09-16)
      'Fjällbackas historia är sillens. Samhället växte under de stora sillperioderna på 1700- och 1800-talen och på fraktseglationen, inte minst spannmålsfrakt till England. Det var också här den svenska ansjovisen uppfanns: konserveringen utvecklades i Fjällbacka under 1860–1880-talen och produkten prisbelönades på internationella utställningar.',
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
      travel_time: '',
      character: 'Pittoresk fiskeby, kriminalromanromantik, klippvandring',
      season: 'Juni–september',
      best_for: 'Romantik, vandring, Läckberg-läsare',
    },
    facts_provenance: {
      travel_time: 'bedomning',
      character: 'bedomning',
      season: 'bedomning',
      best_for: 'bedomning',
    },
    activities: [
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Vetteberget/Kungsklyftan — trappor från Ingrid Bergmans Torg genom Kungsklyftan — https://www.vastsverige.com/tanum/produkter/vettebergetkungsklyftan/ (läst 2026-09-16)
      { icon: '⛰', name: 'Vettebergets klättring', desc: 'Upp via trapporna från Ingrid Bergmans torg, genom Kungsklyftan till toppen.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Discover Fjällbacka with a Guide — guidade vandringar i Camilla Läckbergs fotspår med start vid Ingrid Bergmans torg — https://www.vastsverige.com/en/tanum/fjallbacka/guided-tours-in-fjallbacka/ (läst 2026-09-16)
      { icon: '📚', name: 'Läckbergs Fjällbacka', desc: 'Guidade vandringar i Camilla Läckbergs fotspår, med start vid Ingrid Bergmans torg.' },
      // KÄLLA: Länsstyrelsen Västra Götaland, naturreservatet Väderöarna — turbåtar till Väderöarna från bland annat Fjällbacka — https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/vaderoarna.html (läst 2026-09-16)
      { icon: '⛵', name: 'Båtutflykter', desc: 'Turbåtar till Väderöarna går från Fjällbacka.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Paddle on your own starting in Fjällbacka — dagstur i skyddat vatten förbi Porsholmen, Valö, Dannholmen och Hjärterön — https://www.vastsverige.com/en/tanum/aktiviteter/paddling/paddla-fjallbacka/ (läst 2026-09-16)
      { icon: '🛶', name: 'Kajakpaddling', desc: 'Dagstur i skyddat vatten förbi Porsholmen, Valö, Dannholmen och Hjärterön.' },
    ],
    accommodation: [
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Stora Hotellet Fjällbacka — Galärbacken 2, 457 40 Fjällbacka; hotellets egen webbplats shfjallbacka.se anger Restaurant Mamsell i huset — https://www.vastsverige.com/en/tanum/produkter/stora-hotellet-fjallbacka/ (läst 2026-09-16)
      { name: 'Stora Hotellet Fjällbacka', type: 'Hotell', desc: 'Hotell på Galärbacken i Fjällbacka. Restaurang Mamsell finns i huset.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Badholmens Vandrarhem — adress Badholmen, 45741 Fjällbacka, rum med våningssängar — https://www.vastsverige.com/en/tanum/produkter/badholmens-vandrarhem/ (läst 2026-09-16)
      { name: 'Badholmens Vandrarhem', type: 'Vandrarhem', desc: 'Vandrarhem på Badholmen i Fjällbacka hamn.' },
    ],
    getting_there: [
      { method: 'Bil', from: 'Göteborg', time: '2 h', desc: 'E6 norrut, avtag mot Fjällbacka efter Tanumshede.', icon: '🚗' },
    ],
    harbors: [
      // KÄLLA: Gästhamnsbolaget (driver Tanums gästhamnar på uppdrag av kommunen), Fjällbacka gästhamn — adress Ingrid Bergmanstorg 457 40 Fjällbacka, toaletter, duschar och el; drivmedel anges inte — https://gasthamnsbolaget.se/en/guest-harbours-in-bohuslan/fjallbacka-guest-harbour/ (läst 2026-09-16)
      { name: 'Fjällbacka Gästhamn', desc: 'Gästhamn vid Ingrid Bergmans torg, drivs av Gästhamnsbolaget.', fuel: false, service: ['El', 'Dusch', 'Toalett'] },
    ],
    restaurants: [
      // KÄLLA: Bryggan Fjällbacka, egen webbplats — listar Bryggan Café & Bistro, Restaurant Matilda, Everts Tapasbar och The Harbour House på Ingrid Bergmans Torg — https://www.brygganfjallbacka.se/ (läst 2026-09-16)
      { name: 'Bryggan Café & Bistro', type: 'Restaurang/Café', desc: 'Café och bistro vid Ingrid Bergmans Torg, del av Bryggan Fjällbacka.' },
      { name: 'Restaurant Matilda', type: 'Restaurang', desc: 'Fisk- och skaldjursrestaurang vid Ingrid Bergmans Torg, del av Bryggan Fjällbacka.' },
      // KÄLLA: Stora Hotellet Fjällbacka, egen webbplats — Restaurant Mamsell är hotellets restaurang, Galärbacken 2, Fjällbacka — https://shfjallbacka.se/en/restaurants/ (läst 2026-09-16)
      { name: 'Restaurant Mamsell', type: 'Restaurang', desc: 'Restaurang på Stora Hotellet i Fjällbacka.' },
      // KÄLLA: Fjällbacka Golfklubb, egen webbplats — Sandbunkern Bistro & Deli i klubbhuset, Långö Rörvikarna 1 — https://fjallbackagk.se/sandbunkern-bistro-deli/ (läst 2026-09-16)
      { name: 'Sandbunkern Bistro & Deli', type: 'Bistro', desc: 'Bistro i klubbhuset på Fjällbacka Golfklubb, Långö Rörvikarna 1.' },
    ],
    // KÄLLA: Turistrådet Västsverige (vastsverige.com), Vetteberget/Kungsklyftan — trapporna startar vid Ingrid Bergmans Torg — https://www.vastsverige.com/tanum/produkter/vettebergetkungsklyftan/ (läst 2026-09-16)
    // KÄLLA: Turistrådet Västsverige (vastsverige.com), Discover Fjällbacka with a Guide — arrangörer Fjällbackaguiderna och Kustguiden — https://www.vastsverige.com/en/tanum/fjallbacka/guided-tours-in-fjallbacka/ (läst 2026-09-16)
    tips: ['Trapporna upp till Vetteberget startar vid Ingrid Bergmans torg.', 'Guidade turer arrangeras av Fjällbackaguiderna och Kustguiden.', 'Båtturer till Väderöarna kräver bra väder — håll koll dagen innan.'],
    related: ['grebbestad', 'kosterhavet', 'hamburgsund'],
    tags: ['kriminalromaner', 'klippvandring', 'pittoreskt', 'ingrid bergman'],
    // KÄLLA: Turistrådet Västsverige (vastsverige.com), Vetteberget/Kungsklyftan — tidigare namnet Ramneklovan, namnet Kungsklyftan efter Oscar II:s besök 1887 och kungens signatur på bergväggen vid norra ingången — https://www.vastsverige.com/tanum/produkter/vettebergetkungsklyftan/ (läst 2026-09-16)
    did_you_know: 'Kungsklyftan hette förr Ramneklovan. Namnet Kungsklyftan kommer av att Oscar II besökte platsen 1887 och signerade bergväggen vid klyftans norra ingång.',
    seasonal: {
      open: 'Juni–September',
      peak: 'Juli–Augusti',
      best: 'Juni eller September',
      bestReason: 'Juni: vandringen upp till Vettebergets topp, restaurangerna öppna och hela byn i blomning. September: autentisk fiskebystämning och höstljus.',
      warning: 'Båtturer till Väderöarna ställs in vid kraftig vind.',
      months: ['off','off','off','off','off','open','peak','peak','open','limited','off','off'],
    },
  },
  {
    slug: 'grundsund',
    name: 'Grundsund',
    region: 'bohuslan',
    regionLabel: 'Bohuslän',
    emoji: '🐟',
    // KÄLLA: Turistrådet Västsverige (vastsverige.com), Skaftö — Grundsund beskrivs som en aktiv fiskehamn med en lång hamnkanal som byn är byggd kring — https://www.vastsverige.com/en/lysekil/produkter/skafto/ (läst 2026-09-16)
    tagline: 'Fiskeläge på Skaftö byggt kring en hamnkanal.',
    description: [
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Grundsund Skaftö — kanalen som delar byn i en östra och en västra del grävdes under första världskriget för fiskebåtar och fraktfartyg och för en större skyddad hamn, ny strandpromenad längs östra kajen ut till Skäddhålan — https://www.vastsverige.com/en/lysekil/produkter/skafto-grundsund/ (läst 2026-09-16)
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Skaftö — Grundsund som aktiv fiskehamn på sydvästra Skaftö med en lång hamnkanal — https://www.vastsverige.com/en/lysekil/produkter/skafto/ (läst 2026-09-16)
      'Grundsund ligger på sydvästra Skaftö och är fortfarande en aktiv fiskehamn. Byn är byggd kring en lång hamnkanal som delar den i en östra och en västra sida. Kanalen grävdes under första världskriget, för att fiskebåtar och fraktfartyg lättare skulle ta sig fram och för att ge byn en större skyddad hamn. Längs östra kajen finns en nyanlagd strandpromenad som går ut till Skäddhålan.',
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Grundsund Skaftö — sillperioden på 1700-talet, byn förblev i allt väsentligt en fiskehamn medan andra fiskelägen blev badorter i slutet av 1800-talet, fisket fortfarande ekonomiskt viktigt, stora delar av tv-serien Saltön inspelade i Grundsund — https://www.vastsverige.com/en/lysekil/produkter/skafto-grundsund/ (läst 2026-09-16)
      'Grundsund var en betydande fiskehamn och sjöfartsby under 1700-talets sillperiod. Till skillnad från jämförbara fiskelägen, som mot slutet av 1800-talet gjordes om till välbärgade badorter, förblev Grundsund i allt väsentligt en fiskehamn — och fisket har fortfarande ekonomisk betydelse i byn. Här spelades också stora delar av tv-serien Saltön in.',
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Grundsunds kyrka — kapell 1799, torn 1818, ombyggnad 1893 av Fredrik Falkenberg med förlängning åt öster och nytt tresidigt avslutat kor, breda korsarmar, 400 platser, gospelkonserter i juli och julkonserter i december — https://www.vastsverige.com/lysekil/produkter/skafto-grundsunds-kyrka/ ; Turistrådet Västsverige (vastsverige.com), Grundsund Skaftö — vacker utsikt över hamnkanalen från bron till Ösö och från kyrkan intill — https://www.vastsverige.com/en/lysekil/produkter/skafto-grundsund/ (läst 2026-09-16)
      'Från Grundsunds kyrka har man utsikt över hamnkanalen. Den började som ett kapell 1799 och fick klocktorn 1818. Vid ombyggnaden 1893, ritad av Fredrik Falkenberg, förlängdes träkyrkan österut, fick ett nytt tresidigt avslutat kor och breda korsarmar. I dag rymmer den 400 personer och används bland annat för gospelkonserter i juli och julkonserter i december.',
      // KÄLLA: Trafikverket, Gullmarsleden — mellan Finnsbo i Lysekils kommun och Skår i Uddevalla kommun, 1 850 meter, överfarten tar tio minuter, resan med vägfärjan är avgiftsfri — https://www.trafikverket.se/resa-och-trafik/farjetrafik/gullmarsleden/ (läst 2026-09-16)
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), båtlinjer Lysekil/Uddevalla — Västtrafiks linje 847 Lysekil–Fiskebäckskil–Östersidan på Skaftö, året runt — https://www.vastsverige.com/en/things-to-do/explore-the-west-coast-by-boat/ferry-lines/route-map-lysekiluddevallaljungskile/ (läst 2026-09-16)
      'Skaftö nås landvägen via Gullmarsledens vägfärja mellan Finnsbo i Lysekils kommun och Skår i Uddevalla kommun. Leden är 1 850 meter lång, överfarten tar tio minuter och resan är avgiftsfri. Med kollektivtrafik går Västtrafiks båtlinje 847 året runt från Lysekil till Fiskebäckskil och Östersidan på Skaftö; därifrån fortsätter man landvägen till Grundsund.',
      // KÄLLA: Länsstyrelsen Västra Götaland, naturreservatet Vägeröd — bildat 2003, cirka 121 hektar i Lysekils kommun, kuperat med blockrika sluttningar och lodräta klippor, ek och bok, krattekskog, gräsarten råglosta, känt för sina blåsippor, förvaltas av Västkuststiftelsen — https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/vagerod.html (läst 2026-09-16)
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), leden Vägeröd–Sälvik — 2,4 km, följer delvis den blåmarkerade Kuststigen, gamla landsvägen, bok- och ekskog, bäver i Edsvattnet — https://www.vastsverige.com/en/lysekil/leder/skafto---vagerod/ (läst 2026-09-16)
      'Inne på Skaftö ligger Vägeröds naturreservat, bildat 2003 och cirka 121 hektar stort. Terrängen är kuperad med blockrika sluttningar och lodräta klippor, ek- och bokskog, krattekskog och hävdad kulturmark. Reservatet är mest känt för sina blåsippor, som blommar rikligt på våren innan lövverket sluter sig. Här finns också den ovanliga gräsarten råglosta. Reservatet förvaltas av Västkuststiftelsen. Genom området går den 2,4 kilometer långa leden Vägeröd–Sälvik, som delvis följer den blåmarkerade Kuststigen och passerar gamla landsvägen, bokskog och sjön Edsvattnet där det finns bäver.',
    ],
    facts: {
      travel_time: '',
      character: 'Aktiv fiskehamn, hamnkanal',
      season: 'Maj–september',
      best_for: 'Vandring, Vägeröds naturreservat, hamnmiljö',
    },
    facts_provenance: {
      travel_time: 'bedomning',
      character: 'bedomning',
      season: 'bedomning',
      best_for: 'bedomning',
    },
    activities: [
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Grundsunds kyrka — träkyrka från 1799, ombyggd 1893 — https://www.vastsverige.com/lysekil/produkter/skafto-grundsunds-kyrka/ ; Turistrådet Västsverige (vastsverige.com), Grundsund Skaftö — vacker utsikt över hamnkanalen från kyrkan intill — https://www.vastsverige.com/en/lysekil/produkter/skafto-grundsund/ (läst 2026-09-16)
      { icon: '⛪', name: 'Grundsunds kyrka', desc: 'Träkyrka från 1799 med utsikt över hamnkanalen, ombyggd 1893.' },
      // KÄLLA: Länsstyrelsen Västra Götaland, naturreservatet Vägeröd — bildat 2003, cirka 121 hektar, blåsippor, bok- och ekskog — https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/vagerod.html (läst 2026-09-16)
      { icon: '🌸', name: 'Vägeröds naturreservat', desc: 'Blåsippsmarker, bok- och ekskog inne på Skaftö. Bildat 2003, cirka 121 hektar.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), leden Vägeröd–Sälvik — 2,4 km, följer delvis Kuststigen — https://www.vastsverige.com/en/lysekil/leder/skafto---vagerod/ (läst 2026-09-16)
      { icon: '🥾', name: 'Vandring Skaftö', desc: 'Leden Vägeröd–Sälvik är 2,4 km och följer delvis den blåmarkerade Kuststigen.' },
    ],
    accommodation: [
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), rum- och stugförmedling Skaftö — Skaftö Vandrarhem förmedlar rum, stugor och kaptenshus på Skaftö, läge Grundsund — https://www.vastsverige.com/skafto/bo/rum--och-stugformedling/ (läst 2026-09-16)
      { name: 'Skaftö Vandrarhem', type: 'Vandrarhem/stugförmedling', desc: 'Vandrarhem i Grundsund som även förmedlar rum, stugor och kaptenshus på Skaftö.' },
      // KÄLLA: Grundéns hotell, egen webbplats — adress Furtofta 204, 451 79 Grundsund, hotell vid infarten till Grundsund — https://www.grundenshotell.se/ (läst 2026-09-16)
      { name: 'Grundéns hotell', type: 'Hotell', desc: 'Hotell vid infarten till Grundsund, Furtofta 204.' },
    ],
    getting_there: [
      // KÄLLA: Trafikverket, Gullmarsleden — vägfärja Finnsbo–Skår, överfarten tar tio minuter och är avgiftsfri — https://www.trafikverket.se/resa-och-trafik/farjetrafik/gullmarsleden/ (läst 2026-09-16)
      { method: 'Bil + färja', from: 'Göteborg', time: '2 h', desc: 'E6 till Uddevalla, väg 161 mot Lysekil, sedan Gullmarsledens vägfärja Finnsbo–Skår. Överfarten tar tio minuter och är avgiftsfri.', icon: '🚗' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), båtlinjer Lysekil/Uddevalla — Västtrafiks linje 847 Lysekil–Fiskebäckskil–Östersidan på Skaftö, året runt — https://www.vastsverige.com/en/things-to-do/explore-the-west-coast-by-boat/ferry-lines/route-map-lysekiluddevallaljungskile/ (läst 2026-09-16)
      { method: 'Passagerarbåt', from: 'Lysekil', time: '', desc: 'Västtrafiks båtlinje 847 går året runt Lysekil–Fiskebäckskil–Östersidan på Skaftö; vidare landvägen till Grundsund.', icon: '⛴' },
    ],
    harbors: [
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Grundsunds gästhamn — läge på sydvästra Skaftö i en gammal fiskeby, förtöjning längs Östra kaj och med akterlinor vid Västra kaj, service; drivmedel anges inte — https://www.vastsverige.com/en/lysekil/produkter/skafto-gasthamn-grundsund/ (läst 2026-09-16)
      { name: 'Grundsunds Gästhamn', desc: 'Gästhamn på sydvästra Skaftö med förtöjning längs Östra kaj och vid Västra kaj. Drivs av Lysekils kommun.', fuel: false, service: ['Vatten', 'El', 'Dusch', 'Toalett', 'Tvättstuga', 'Sugtömning'] },
    ],
    restaurants: [
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Krögens Fisk & Krog — ligger vid torget i Grundsund, fisk och skaldjur kombinerat med fiskbutik — https://www.vastsverige.com/skafto/artiklar/premiar-for-krogens-fisk--krog/ (läst 2026-09-16)
      { name: 'Krögens Fisk & Krog', type: 'Krog', desc: 'Fisk- och skaldjursrestaurang med fiskbutik vid torget i Grundsund.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Pelles Rökeri — adress Östra kajen 20, 451 79 Grundsund, restaurang med havsutsikt samt Terrassen Pizza & Loungebar; på samma sida Hugos Bu, Bar & Café i en genuin sjöbod från 1905 — https://www.vastsverige.com/lysekil/produkter/pelles-rokeri/ (läst 2026-09-16)
      { name: 'Pelles Rökeri', type: 'Restaurang', desc: 'Restaurang, pizzabar och café vid Östra kajen i Grundsund med mat från havet.' },
      { name: 'Hugos Bu, Bar & Café', type: 'Café', desc: 'Bar och café i en genuin sjöbod från 1905 i Grundsund.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Eat on Skaftö — listar Smultron & Tång bland Skaftös serveringar med orten Grundsund — https://www.vastsverige.com/en/skafto---eng/food--beverage/eat-on-skafto/ (läst 2026-09-16)
      { name: 'Smultron & Tång', type: 'Café', desc: 'Café i Grundsund på Skaftö.' },
    ],
    tips: ['Kombinera med Fiskebäckskil — kort kustväg mellan dem.'],
    related: ['fiskebackskil', 'lysekil', 'smogen'],
    tags: ['fiskeläge', 'konst', 'lugnt', 'autentisk'],
    // KÄLLA: Turistrådet Västsverige (vastsverige.com), Grundsund Skaftö — stora delar av tv-serien Saltön inspelade i Grundsund, byn förblev fiskehamn medan grannbyarna blev badorter i slutet av 1800-talet — https://www.vastsverige.com/en/lysekil/produkter/skafto-grundsund/ och https://www.vastsverige.com/en/lysekil/produkter/skafto/ (läst 2026-09-16)
    did_you_know: 'Stora delar av tv-serien Saltön spelades in i Grundsund och Fiskebäckskil. Till skillnad från grannbyarna, som blev badorter för societeten i slutet av 1800-talet, förblev Grundsund en fiskehamn — och är det än i dag.',
  },
  {
    slug: 'hamburgsund',
    name: 'Hamburgsund',
    region: 'bohuslan',
    regionLabel: 'Bohuslän',
    emoji: '⛵',
    // KÄLLA: Trafikverket, Hamburgsundsleden — linfärja Hamburgsund–Hamburgö — https://www.trafikverket.se/resa-och-trafik/farjetrafik/hamburgsundsleden/ och Länsstyrelsen Västra Götaland, Greby gravfält — https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/kulturmiljoer/greby-gravfalt.html (läst 2026-09-16)
    tagline: 'Linfärja över sundet, Hamburgö och Greby gravfält.',
    description: [
      // KÄLLA: Tanums kommun, ortsinformation Hamburgsund — traditionen säger att tingsplatsen för Viken under medeltiden låg vid sundets södra del, Viken det administrativa område som bestod av norra Bohuslän och det nu norska området runt Oslofjorden, namnet av öns medeltida namn Hornbora, den hornförsedda, utan koppling till tyska Hamburg, sillfiske och trankokerier 1500–1700-tal, stenhuggeri och fraktsegling 1800–1900-tal, ett av Bohusläns största skutsamhällen i början av 1900-talet, hemmahamn för stor del av fiskeflottan — https://www.tanum.se/kommunpolitik/kommunfakta/kommunenshistoria/ortsinformation/hamburgsund.4.7664b4813898b7df9844de1.html (läst 2026-09-16)
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Hamburgsund — linfärja i det 130 meter breda Hamburgsund — https://www.vastsverige.com/en/tanum/produkter/hamburgsund/ (läst 2026-09-16)
      'Hamburgsund ligger i norra Bohuslän och delas av ett 130 meter brett sund mellan fastlandet och ön Hamburgö. Namnet har ingenting med den tyska staden att göra — det kommer av öns medeltida namn Hornbora, den hornförsedda, efter Hamburgös utskjutande uddar i söder och väster. Enligt traditionen låg under medeltiden tingsplatsen för Viken — det administrativa område som bestod av norra Bohuslän och trakten runt Oslofjorden — vid sundets södra del. Under 1500- till 1700-talen levde orten på sillfiske och trankokeri, under 1800- och 1900-talen på stenhuggeri och fraktsegling, och i början av 1900-talet var Hamburgsund ett av Bohusläns största sjöfartssamhällen. I dag är det hemmahamn för en stor del av kommunens fiskeflotta.',
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Hamburgsund — linfärja i det 130 meter breda Hamburgsund samt badplatserna Norra Ejde Pluret med sandstrand och brygga och Boviken på Hamburgö med sandstrand, hopptorn och brygga — https://www.vastsverige.com/en/tanum/produkter/hamburgsund/ (läst 2026-09-16)
      'Hamburgö nås med linfärja över sundet. På Hamburgö ligger badplatsen Boviken med sandstrand, brygga och hopptorn, och på fastlandssidan badplatsen Norra Ejde Pluret med sandstrand och brygga.',
      // KÄLLA: Länsstyrelsen Västra Götaland, Greby gravfält — Bohusläns största gravfält strax norr om Grebbestad, cirka 200 gravar, 68 runda högar, 54 långhögar samt 47 runda och 12 ovala stensättningar, 200 till 600 år efter vår tideräknings början, 28 resta stenar upp till 4,5 meter, fynd från undersökningarna 1873 av brända ben, glaspärlor, benkammar och sländtrissor — https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/kulturmiljoer/greby-gravfalt.html (läst 2026-09-16)
      'Greby gravfält norr om Grebbestad är Bohusläns största gravfält. Där finns omkring 200 gravar från järnåldern, daterade till 200–600 e.Kr.: 68 runda högar, 54 långhögar samt 47 runda och 12 ovala stensättningar. Det som särskilt utmärker fältet är de 28 resta stenarna som kröner gravhögar, varav några är upp till 4,5 meter höga. Vid undersökningar 1873 hittades brända ben, glaspärlor, benkammar och sländtrissor.',
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Hamburgsund — Hornborgs borgruin med storhetstid enligt fynden omkring 1450–1530, utgrävd i början av 1900-talet med fynd av bakstycket till en kanon, kanonkulor och andra vapen, vikingamarknaden Hornbore Ting varje sommar, konstskolan Gerlesborgsskolan — https://www.vastsverige.com/en/tanum/produkter/hamburgsund/ (läst 2026-09-16)
      // KÄLLA: Tanums kommun, ortsinformation Hamburgsund — vikingamiljön Hornbore by och friluftsteater i ett gammalt stenbrott — https://www.tanum.se/kommunpolitik/kommunfakta/kommunenshistoria/ortsinformation/hamburgsund.4.7664b4813898b7df9844de1.html (läst 2026-09-16)
      'I Hamburgsund finns också ruinerna efter borgen Hornborg, vars storhetstid enligt fynden var omkring 1450–1530 och som grävdes ut i början av 1900-talet — fynden omfattade bland annat bakstycket till en kanon, kanonkulor och andra vapen. Varje sommar hålls vikingamarknaden Hornbore Ting på platsen, och i ett gammalt stenbrott spelas friluftsteater. I Gerlesborg strax utanför ligger konstskolan Gerlesborgsskolan.',
    ],
    facts: {
      travel_time: '',
      character: 'Fiskehamn och sjöfartshistoria, linfärja till Hamburgö',
      season: 'Maj–september',
      best_for: 'Segling, vandring, lugn',
    },
    facts_provenance: {
      travel_time: 'bedomning',
      character: 'bedomning',
      season: 'bedomning',
      best_for: 'bedomning',
    },
    activities: [
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Marinas in Tanum — 50 platser i Hamburgsund och på Hamburgö i sundet, toalett, dusch, tvättmaskin, torktumlare och landström — https://www.vastsverige.com/en/tanum/accomodation/marinas/ (läst 2026-09-16)
      { icon: '⛵', name: 'Segling', desc: 'Gästhamn med platser både på fastlandssidan och på Hamburgö.' },
      // KÄLLA: Länsstyrelsen Västra Götaland, Greby gravfält — Bohusläns största gravfält, cirka 200 gravar från järnåldern, 200–600 e.Kr., strax norr om Grebbestad — https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/kulturmiljoer/greby-gravfalt.html (läst 2026-09-16)
      { icon: '🥾', name: 'Greby gravfält', desc: 'Bohusläns största gravfält — cirka 200 gravar från järnåldern, 200–600 e.Kr., norr om Grebbestad.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Hamburgsund — ordagrant "Bovikens swimming area on Hamburgö has sandy beach, dock, diving tower and toilet" — https://www.vastsverige.com/en/tanum/produkter/hamburgsund/ (läst 2026-09-16)
      { icon: '🏊', name: 'Bovikens badplats', desc: 'Badplats på Hamburgö med sandstrand, brygga, hopptorn och toalett.' },
    ],
    accommodation: [
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Hamburgsund Bed and Breakfast — adress Udden 1, 45745 Hamburgsund, intill färjestationen, tio dubbelrum — https://www.vastsverige.com/en/tanum/produkter/hamburgsund-bed-and-breakfast/ (läst 2026-09-16)
      { name: 'Hamburgsund Bed and Breakfast', type: 'B&B', desc: 'Bed & breakfast i centrala Hamburgsund vid färjeläget, Udden 1, med tio dubbelrum.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Kustnära B&B och Konferens — adress Heestrand Rådalen 10, 45747 Hamburgsund, drivs av Gästhamnsbolaget Väst AB, cirka 5 km från Hamburgsund — https://www.vastsverige.com/en/tanum/produkter/kustnara-bb-och-konferens/ (läst 2026-09-16)
      { name: 'Kustnära B&B och Konferens', type: 'B&B', desc: 'Boende och konferens cirka 5 km från Hamburgsund, Heestrand Rådalen 10.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Rörvik Family Camping — adress Rörviksängen 15, 45747 Hamburgsund, 1,5 km söder om Hamburgsund, stugor, rum, husvagns- och tältplatser — https://www.vastsverige.com/en/tanum/produkter/rorvik-family-camping/ (läst 2026-09-16)
      { name: 'Rörvik Family Camping', type: 'Camping/Stugor', desc: 'Camping med stugor och rum cirka 1,5 km söder om Hamburgsund, Rörviksängen 15.' },
    ],
    getting_there: [

    ],
    harbors: [
      // KÄLLA: Gästhamnsbolaget (driver Tanums gästhamnar på uppdrag av kommunen), Hamburgsund gästhamn — Skolvägen 5, 457 45 Hamburgsund, platser vid två huvudkajer samt Hjalmars Kaj, tvättstuga på fastlandet, sugtömning av porta potti på Hamburgö; drivmedel anges inte — https://gasthamnsbolaget.se/en/guest-harbours-in-bohuslan/hamburgsund-guest-harbour/ (läst 2026-09-16)
      { name: 'Hamburgsunds Gästhamn', desc: 'Gästhamn vid sundet i Hamburgsund, med platser både på fastlandssidan och på Hamburgö. Drivs av Gästhamnsbolaget på uppdrag av Tanums kommun.', fuel: false, service: ['El', 'Dusch', 'Toalett', 'Tvättmaskin', 'Torktumlare'] },
    ],
    restaurants: [
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Hjalmars — adress Strandvägen 8, 45745 Hamburgsund, läge vid kajen, mat med lokala råvaror — https://www.vastsverige.com/en/tanum/produkter/hjalmars/ (läst 2026-09-16)
      { name: 'Hjalmars Bar & Brygga', type: 'Restaurang', desc: 'Restaurang och bar vid kajen i Hamburgsund, Strandvägen 8, med bohuslänsk mat och lokala råvaror.' },
    ],
    // KÄLLA: Trafikverket, Hamburgsundsleden — linfärjan Hamburgsund–Hamburgö är avgiftsfri och överfarten tar tre minuter — https://www.trafikverket.se/resa-och-trafik/farjetrafik/hamburgsundsleden/ (läst 2026-09-16)
    // KÄLLA: Länsstyrelsen Västra Götaland, naturreservatet Väderöarna — turbåtar till Väderöarna från bland annat Fjällbacka och Hamburgsund — https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/vaderoarna.html (läst 2026-09-16)
    tips: ['Linfärjan till Hamburgö är avgiftsfri och överfarten tar tre minuter.', 'Bra utgångsläge för båtutflykter norrut till Väderöarna.', 'Greby gravfält norr om Grebbestad nås lättast med bil.'],
    related: ['fjallbacka', 'grebbestad', 'kosterhavet'],
    tags: ['gästhamn', 'segling', 'lugnt', 'historia'],
    // KÄLLA: Länsstyrelsen Västra Götaland, Greby gravfält — Bohusläns största gravfält, omkring 200 gravar från järnåldern 200–600 e.Kr., 28 resta stenar som kröner gravhögar, några upp till 4,5 meter höga — https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/kulturmiljoer/greby-gravfalt.html (läst 2026-09-16)
    did_you_know: 'Greby gravfält norr om Grebbestad är Bohusläns största gravfält — omkring 200 gravar från järnåldern, 200–600 e.Kr. Det ovanligaste är de 28 resta stenarna som kröner gravhögar; några är upp till 4,5 meter höga.',
    seasonal: {
      open: 'Maj–September',
      peak: 'Juli',
      best: 'Juni eller September',
      bestReason: 'Juni och september: linfärjan till Hamburgö går året om och tar tre minuter, och sundet och ön nås lika enkelt som mitt i sommaren.',
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Hamburgsund — gästhamnen är i drift från mitten av juni till slutet av augusti — https://www.vastsverige.com/en/tanum/produkter/hamburgsund/ (läst 2026-09-16)
      warning: 'Gästhamnen är i drift från mitten av juni till slutet av augusti.',
      months: ['off','off','off','off','limited','open','peak','open','open','limited','off','off'],
    },
  },
  {
    slug: 'karingon',
    name: 'Käringön',
    region: 'bohuslan',
    regionLabel: 'Bohuslän',
    emoji: '🏘',
    // KÄLLA: Turistrådet Västsverige (vastsverige.com), Käringön — bilfri ö med smala gator kantade av vita trähus och gästhamn mitt i byn — https://www.vastsverige.com/en/orust/products/karingon/ (läst 2026-09-16)
    tagline: 'Bilfri ö med vita trähus, smala gator och gästhamn mitt i byn.',
    description: [
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Käringön — bilfri, smala gator med vita trähus, kyrkan omgiven av gräsmattor och planteringar, permanent bebodd 1596 av fiskarfamiljer, över 300 invånare under 1700-talets sillperiod, fördubblad folkmängd på 1800-talet, namnet av käring som benämning på ett litet stentorn eller kummel använt som sjömärke — https://www.vastsverige.com/en/orust/products/karingon/ (läst 2026-09-16)
      'Käringön är bilfri. Öns gator är smala och kantade av vita trähus, och mitt i byn ligger kyrkan omgiven av gräsmattor och planteringar. Ön befolkades permanent 1596 av fiskarfamiljer. Under 1700-talets sillperiod passerade folkmängden 300, och under 1800-talet fördubblades den. Namnet kommer troligen av ordet käring i betydelsen litet stentorn eller kummel som användes som sjömärke.',
      // KÄLLA: Orust kommun, Käringöns gästhamn — 125 platser, djup cirka 4 meter, servicehus med toalett, dusch, tvättmaskin och torktumlare, sugtömningsstation 1 april–31 oktober — https://www.orust.se/uppleva-och-gora/gasthamnar/karingons-gasthamn (läst 2026-09-16)
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Käringön — livsmedelsbutik, fiskhandlare och småbutiker längs kajen samt kaféer och restauranger vid kajen — https://www.vastsverige.com/en/orust/products/karingon/ (läst 2026-09-16)
      'Hamnen är öns nav. Längs kajen finns livsmedelsbutik, fiskhandlare, småbutiker, kaféer och restauranger. Gästhamnen har 125 platser och cirka fyra meters djup, servicehus med dusch, toalett och tvättstuga samt sugtömningsstation 1 april–31 oktober. Hamnen drivs av Orust kommun.',
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Käringön — Öviken med pontonbryggor och trampolin, badhusen på sydkusten, Barnbadet och friluftsbadet med skilda tider för damer och herrar — https://www.vastsverige.com/en/orust/products/karingon/ (läst 2026-09-16)
      'Bad finns på flera håll. Öviken har bryggor och hopptorn, på södra sidan ligger de gamla badhusen och där finns både barnbad och ett friluftsbad med separata tider för damer och herrar.',
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Färja Tuvesvik–Gullholmen–Käringön — Västtrafik linje 381, endast personfärja, till Käringön cirka 35 minuter — https://www.vastsverige.com/orust/produkter/farja-tuvesvik-gullholmen-karingon/ (läst 2026-09-16)
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Käringön — båtresan mellan klippor och kobbar tar inte mer än 40 minuter, ön är bilfri — https://www.vastsverige.com/orust/produkter/karingon/ (läst 2026-09-16)
      'Käringön nås med personfärja från Tuvesvik på Orust — Västtrafiks linje 381, som också trafikerar Gullholmen och Härmanö. Dit tar båtresan omkring fem minuter; till Käringön tar den omkring 35 minuter. Bilfärja finns inte, och behövs inte: ön är bilfri.',
      // KÄLLA: Orust kommun, Kulturhistoriska byggnader och kulturmiljöer — Käringön ligger inom riksintresse för kulturmiljövården, de flesta byggnaderna är q-märkta i detaljplan, varsamhetskrav och förvanskningsförbud enligt plan- och bygglagen gäller även utanför de orter där byggnaderna är skyddsmärkta, och bygglov kan krävas för annars lovbefriade åtgärder som staket, altaner, trädäck, attefallsåtgärder och solceller — https://www.orust.se/bygga-bo-och-miljo/bygga-nytt-andra-eller-riva/kulturhistoriska-byggnader-kulturmiljoer (läst 2026-09-16)
      'Käringön är ett av de områden som ligger inom riksintresse för kulturmiljövården. Orust kommun anger att de flesta byggnaderna i dessa miljöer är q-märkta i detaljplan och att varsamhetskrav och förvanskningsförbud enligt plan- och bygglagen gäller även utanför de orter där byggnaderna är skyddsmärkta. I de skyddade miljöerna kan bygglov krävas för åtgärder som annars är bygglovsbefriade, som staket, altaner, trädäck, attefallsåtgärder och solceller.',
    ],
    facts: {
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Färja Tuvesvik–Gullholmen–Käringön — personfärja, till Käringön cirka 35 minuter, och Käringön-sidan anger högst 40 minuter — https://www.vastsverige.com/orust/produkter/farja-tuvesvik-gullholmen-karingon/ (läst 2026-09-16)
      travel_time: '35–40 min båt från Tuvesvik',
      character: 'Bilfri fiskeby med q-märkta trähus',
      // KÄLLA: orust.se Käringöns gästhamn — säsong 1 april–30 september (läst 2026-09-16)
      season: 'April–september (gästhamnens säsong)',
      best_for: 'Promenad, bad, gästhamn',
    },
    facts_provenance: {
      travel_time: 'matt',
      character: 'bedomning',
      season: 'bedomning',
      best_for: 'bedomning',
    },
    activities: [
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Käringön — bilfri ö med smala gator mellan vita trähus — https://www.vastsverige.com/en/orust/products/karingon/ (läst 2026-09-16)
      { icon: '🚶', name: 'Promenad runt ön', desc: 'Smala gator mellan vita trähus, bilfritt hela vägen.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Färja Tuvesvik–Gullholmen–Käringön — Västtrafiks personfärja linje 381 går till Gullholmen, Härmanö och Käringön, 5 minuter till Härmanö/Gullholmen och cirka 35 minuter till Käringön — https://www.vastsverige.com/orust/produkter/farja-tuvesvik-gullholmen-karingon/ (läst 2026-09-16)
      { icon: '⛵', name: 'Båtutflykter', desc: 'Samma personfärja, linje 381, trafikerar också Gullholmen och Härmanö — 5 minuter från Tuvesvik.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Käringön — Öviken med bryggor och hopptorn, barnbad och friluftsbad vid de gamla badhusen på södra sidan — https://www.vastsverige.com/en/orust/products/karingon/ (läst 2026-09-16)
      { icon: '🏊', name: 'Bad', desc: 'Öviken med bryggor och hopptorn, barnbad och friluftsbad på södra sidan.' },
    ],
    accommodation: [
      // KÄLLA: Hotell Käringön, egen webbplats — 21 rum (enkelrum, dubbelrum, trebäddsrum, familjerum och juniorsviter) samt restaurang och bar, Käringöns Brygga — https://www.karingon.se/ (läst 2026-09-16)
      { name: 'Hotell Käringön', type: 'Hotell', desc: 'Hotell på Käringön med 21 rum, restaurang och bar.' },
    ],
    getting_there: [
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Färja Tuvesvik–Gullholmen–Käringön — Västtrafik linje 381, endast personfärja, via Gullholmen till Käringön — https://www.vastsverige.com/orust/produkter/farja-tuvesvik-gullholmen-karingon/ (läst 2026-09-16)
      { method: 'Bil + passagerarbåt', from: 'Göteborg', time: '', desc: 'Kör till Tuvesvik på Orust. Därifrån går Västtrafiks personfärja linje 381 via Gullholmen till Käringön. Båtresan tar 35–40 minuter.', icon: '⛴' },
    ],
    harbors: [
      // KÄLLA: Orust kommun, Käringöns gästhamn — 125 platser, djup cirka 4 meter, servicehus med dusch och toalett, tvättstuga, el, sugtömningsstation 1 april–31 oktober; drivmedel nämns inte — https://www.orust.se/uppleva-och-gora/gasthamnar/karingons-gasthamn (läst 2026-09-16)
      { name: 'Käringöns gästhamn', desc: 'Gästhamn på Käringön med 125 platser och cirka 4 meters djup. Drivs av Orust kommun.', fuel: false, service: ['El', 'Dusch', 'Toalett', 'Tvättstuga', 'Sugtömning'] },
    ],
    restaurants: [
      // KÄLLA: Hotell Käringön, egen webbplats — hotellet driver Käringöns Brygga som restaurang och bar — https://www.karingon.se/ (läst 2026-09-16)
      { name: 'Käringöns Brygga', type: 'Restaurang', desc: 'Restaurang och bar vid bryggan, del av Hotell Käringön.' },
      // KÄLLA: Petersons Krog, egen webbplats — krog på Käringön med lunch, à la carte och sällskapsmenyer — https://www.petersonskrog.se/ (läst 2026-09-16)
      { name: 'Petersons Krog', type: 'Krog', desc: 'Krog på Käringön med lunch, à la carte och sällskapsmenyer.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Eat and drink Käringön/Gullholmen — listar Skafferiet, Creperiet och Karingo bland Käringöns serveringar — https://www.vastsverige.com/en/orust/karingon-gullholmen/eat-and-drink/ (läst 2026-09-16)
      { name: 'Skafferiet', type: 'Café', desc: 'Servering på Käringön.' },
      { name: 'Creperiet', type: 'Café', desc: 'Servering på Käringön.' },
      { name: 'Karingo', type: 'Ostronbar', desc: 'Ostronverksamhet på Käringön.' },
    ],
    // KÄLLA: Orust kommun, Käringöns gästhamn — 125 platser och sugtömningsstation 1 april–31 oktober — https://www.orust.se/uppleva-och-gora/gasthamnar/karingons-gasthamn (läst 2026-09-16)
    // KÄLLA: Turistrådet Västsverige (vastsverige.com), Färja Tuvesvik–Gullholmen–Käringön — personfärja, 35–40 minuter — https://www.vastsverige.com/orust/produkter/farja-tuvesvik-gullholmen-karingon/ (läst 2026-09-16)
    tips: ['Gästhamnen har 125 platser och sugtömning 1 april–31 oktober.', 'Personfärjan Tuvesvik–Käringön är huvudförbindelsen och tar 35–40 minuter.'],
    related: ['mollosund', 'orust', 'tjorn'],
    tags: ['bilfri', 'pittoresk', 'fotografi', 'romantik'],
    // KÄLLA: Orust kommun, Kulturhistoriska byggnader och kulturmiljöer — Käringön ligger inom riksintresse för kulturmiljövården, de flesta husen är q-märkta i detaljplan och staket, altaner och solceller kan kräva bygglov — https://www.orust.se/bygga-bo-och-miljo/bygga-nytt-andra-eller-riva/kulturhistoriska-byggnader-kulturmiljoer (läst 2026-09-16)
    did_you_know: 'Käringön är ett av de områden som ligger inom riksintresse för kulturmiljövården. Orust kommun anger att de flesta husen är q-märkta i detaljplan och att även staket, altaner och solceller kan kräva bygglov här.',
    seasonal: {
      // KÄLLA: orust.se Käringöns gästhamn — säsong 1 april–30 september
      open: 'April–September (gästhamnen)',
      peak: 'Juli–mitten av Augusti',
      best: 'April–september',
      bestReason: 'Gästhamnen har säsong 1 april–30 september. Personfärjan från Tuvesvik tar 35–40 minuter.',
      // KÄLLA: Orust kommun, Käringöns gästhamn — gästhamnssäsong 1 april–30 september, servicehus på Skepparsholme med toalett året runt — https://www.orust.se/uppleva-och-gora/gasthamnar/karingons-gasthamn (läst 2026-09-16)
      warning: 'Gästhamnen har säsong 1 april–30 september; ett servicehus på Skepparsholme har toalett året runt.',
      months: ['off','off','off','limited','limited','open','peak','peak','open','off','off','off'],
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
      'Orust är västkustens största ö, cirka 28 kilometer i väst-östlig och 25 kilometer i nord-sydlig riktning, med drygt 15 000 åretruntboende — en siffra som stiger mot 40 000 på sommaren. Ön har en stark varvstradition. Hallberg-Rassy har sina rötter i det varv Harry Hallberg grundade i Kungsviken 1943; verksamheten flyttade till Ellös i mitten av 1960-talet. Efter samgåendet med Christoph Rassys varv 1972 drivs det som Hallberg-Rassy Varvs AB och har levererat omkring 9 800 båtar. Najad flyttade tillbaka sin produktion till Henån 2022.',
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
      character: 'Stort, varierat, båtbyggartradition',
      season: 'Helår',
      best_for: 'Bas för utflykter, vandring, segling',
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
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Villa Frideborg, Hotell Henån — familjehotell och B&B, Åvägen 1, 473 32 Henån — https://www.vastsverige.com/orust/produkter/villa-frideborg/ (läst 2026-09-16)
      { name: 'Villa Frideborg, Hotell Henån', type: 'Hotell', desc: 'Familjehotell och B&B i centrala Henån, Åvägen 1.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Prästgårdens Pensionat — Kyrkvägen 1, 47470 Mollösund, i en byggnad från 1893 — https://www.vastsverige.com/en/orust/products/prastgardens-pensionat/ (läst 2026-09-16)
      { name: 'Prästgårdens Pensionat', type: 'Pensionat', desc: 'Pensionat i Mollösund, Kyrkvägen 1, i en byggnad från 1893.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Kobbar & Skär — stugförmedlare för Orust och Tjörn, Tyfta 560, 473 98 Henån — https://www.vastsverige.com/orust/produkter/kobbar-skar/ (läst 2026-09-16)
      { name: 'Kobbar & Skär', type: 'Stugförmedling', desc: 'Stugförmedling för Orust och Tjörn, med kontor i Henån.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Slussens Pensionat — Slussen 415, 47392 Henån, pensionat med restaurang och konferens — https://www.vastsverige.com/en/orust/products/slussens-pensionat/ (läst 2026-09-16)
      { name: 'Slussens Pensionat', type: 'Pensionat', desc: 'Pensionat med restaurang vid vattnet i Slussen, Henån.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Hotell Varvet — Ravinvägen 2, 474 31 Ellös, lägenhetshotell med restaurang och spa — https://www.vastsverige.com/en/orust/products/hotel-varvet/ (läst 2026-09-16)
      { name: 'Hotell Varvet', type: 'Hotell', desc: 'Lägenhetshotell med vandrarhem och restaurang i Ellös, Ravinvägen 2.' },
    ],
    getting_there: [
      // KÄLLA: Orust kommun, Kommunfakta — fasta broförbindelser åt båda hållen och dessutom två färjelinjer — https://www.orust.se/kommun-och-politik/kommunfakta (läst 2026-09-16)
      { method: 'Bil', from: 'Göteborg', time: '', desc: 'Orust har fasta broförbindelser åt båda hållen och dessutom två färjelinjer.', icon: '🚗' },
    ],
    harbors: [
      // KÄLLA: Orust kommun, Henåns gästhamn — 10 gästplatser, djup cirka 1–2,5 meter, el, dusch, toalett, ramp och sugtömningsstation 1 april–31 oktober; bensin och diesel anges som tillgångar i orten Henån — https://www.orust.se/amnesomrade/upplevaochgora/gasthamnar/henansgasthamn.4.2f8c9bd513dca025875ec3.html (läst 2026-09-16)
      { name: 'Henåns Gästhamn', desc: 'Gästhamn i Henån med 10 gästplatser och cirka 1–2,5 meters djup. Drivs av Orust kommun.', service: ['El', 'Dusch', 'Toalett', 'Sugtömning', 'Ramp'] },
      // KÄLLA: Orust kommun, Mollösunds gästhamn — sydvästspetsen av Orust, 100 platser, djup cirka 4 meter, el, dusch, toalett, tvättmaskin och torktumlare i servicehuset, sugtömningsstation 1 april–31 oktober; bensin och diesel anges som tillgångar i samhället Mollösund — https://www.orust.se/uppleva-och-gora/gasthamnar/mollosunds-gasthamn (läst 2026-09-16)
      { name: 'Mollösunds Gästhamn', desc: 'Gästhamn på sydvästspetsen av Orust med 100 platser och cirka 4 meters djup. Drivs av Orust kommun.', service: ['El', 'Dusch', 'Toalett', 'Tvättmaskin', 'Torktumlare', 'Sugtömning'] },
    ],
    restaurants: [
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Wärds Mollösund — hotell och restaurang med cocktailbar, Kyrkvägen 9, 474 70 Mollösund — https://www.vastsverige.com/orust/produkter/wards-i-mollosund/ (läst 2026-09-16)
      { name: 'Wärds Mollösund', type: 'Restaurang/Hotell', desc: 'Restaurang och hotell i Mollösund, Kyrkvägen 9, några meter från hamnen.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Brygghuset Mollösund — Hamnvägen 4, 47440 Mollösund, restaurang med havsinspirerad mat samt rum med utsikt över hamnen — https://www.vastsverige.com/en/orust/products/brygghuset-mollosund/ (läst 2026-09-16)
      { name: 'Brygghuset Mollösund', type: 'Restaurang', desc: 'Restaurang och boende vid hamnen i Mollösund, Hamnvägen 4, med mat från havet.' },
      // KÄLLA: Turistrådet Västsverige (vastsverige.com), Bryggvingen Restaurang & Fiskaffär — restaurang och fiskaffär på Lyr, Orust — https://www.vastsverige.com/en/orust/products/restaurang-cafe-bryggvingen/ (läst 2026-09-16)
      { name: 'Bryggvingen Restaurang & Fiskaffär', type: 'Restaurang', desc: 'Restaurang och fiskaffär på Lyr, Orust.' },
    ],
    // KÄLLA: Orust kommun, Kulturhistoriska byggnader och kulturmiljöer — Käringön, Mollösund, Gullholmen och Härmanö är riksintressen — https://www.orust.se/bygga-bo-och-miljo/bygga-nytt-andra-eller-riva/kulturhistoriska-byggnader-kulturmiljoer (läst 2026-09-16)
    // KÄLLA: Turistrådet Västsverige (vastsverige.com), Färja Tuvesvik–Gullholmen–Käringön — personfärjan går till Gullholmen, Härmanö och Käringön — https://www.vastsverige.com/orust/produkter/farja-tuvesvik-gullholmen-karingon/ (läst 2026-09-16)
    // KÄLLA: Turistrådet Västsverige (vastsverige.com), Mollösund — väderkvarnen från 1700-talet var i bruk till 1929 — https://www.vastsverige.com/en/orust/products/mollosund/ (läst 2026-09-16)
    tips: ['Öns fyra riksintresseorter är Käringön, Mollösund, Gullholmen och Härmanö.', 'Personfärjan från Tuvesvik går till Gullholmen, Härmanö och Käringön.', 'Mollösunds väderkvarn från 1700-talet var i bruk till 1929.'],
    related: ['tjorn', 'karingon', 'gullholmen'],
    tags: ['stor ö', 'båtbyggning', 'mångsidig', 'bas'],
    // KÄLLA: Hallberg-Rassy, Varvets historia — grundat 1943, omkring 9 800 levererade båtar, varvet helägt inom familjen Rassy — https://www.hallberg-rassy.com/sv/varvet/varvets-historia (läst 2026-09-16)
    // KÄLLA: Najad Yachts, egen webbplats — produktionen flyttad tillbaka till Henån på Orust 2022 — https://najad.se/najad-yachts-moves-production-back-to-orust-following-the-acquisition-of-orust-yacht-service/ (läst 2026-09-16)
    did_you_know: 'Hallberg-Rassy har byggt båtar på Orust sedan 1943, i Ellös sedan mitten av 1960-talet, och levererat omkring 9 800 båtar — varvet ägs fortfarande helt inom familjen Rassy. Najad flyttade tillbaka sin produktion till Henån 2022.',
    seasonal: {
      open: 'Hela året',
      peak: 'Juli–Augusti',
      best: 'Juni eller September',
      bestReason: 'Orust är stort nog att ha bra upplevelser hela sommarsäsongen. Juni ger Mollösunds klippor, september segling i klarblått hav.',
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
    // KÄLLA: Nordiska Akvarellmuseet, Om museet — museet i Skärhamn — https://www.akvarellmuseet.org/om/historia ; Tjörns kommun, Öar runt Tjörn — sillhistorien på Klädesholmen — https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/oar-runt-tjorn ; Bohusläns museum, Pilane gravfält — järnåldersgravfältet — https://www.bohuslansmuseum.se/kunskapsbanken_bohuslans_historia/pilane-gravfalt/ (läst 2026-09-16)
    tagline: 'Akvarellmuseum, sillhistoria och järnåldersgravar — broförbunden ö i Bohuslän.',
    description: [
      // KÄLLA: Västsverige/Tjörn — "1546 öar och skär att uppleva året om" — https://www.vastsverige.com/tjorn/ ; Tjörns kommun, Utsiktsplatser — utsikten över fjordarna och skärgården när man kommer ur tunneln, Vetteberget som Tjörns högsta berg — https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/natur-och-gronomraden/utsiktsplatser (läst 2026-09-16)
      'Tjörn är en broförbunden ö i norra Bohuslän. Tjörns kommun omfattar 1 546 öar och skär. Tjörnbron är öns port mot fastlandet och räknas av kommunen som en utsiktsplats i sig: när man kommer ur tunneln öppnar sig landskapet med utsikt över fjordarna och skärgården. Öns högsta berg heter Vetteberget och bjuder på utsikt mot havet i väster.',
      // KÄLLA: Nordiska Akvarellmuseet, Historia — öppnade 16 juni 2000, arkitekttävlingsförslaget "Mötet" av de danska arkitekterna Niels Bruun och Henrik Corfitsen, huvudbyggnaden längs strandlinjen delvis ute i vattnet, fem gästateljéer på betongpelare i vattnet — https://www.akvarellmuseet.org/om/historia (läst 2026-09-16)
      // "Årets Museum 2010" struket: uppgiften finns inte på museets historiksida och kunde inte beläggas.
      'Skärhamn på västra Tjörn är öns kulturella centrum. Här ligger Nordiska Akvarellmuseet, som öppnade den 16 juni 2000 efter ett arkitekttävlingsförslag kallat "Mötet" av de danska arkitekterna Niels Bruun och Henrik Corfitsen. Huvudbyggnaden ligger längs strandlinjen, delvis ute i vattnet, och fem gästateljéer står på betongpelare i vattnet.',
      // KÄLLA: Bohusläns museum, Pilane gravfält — ungefär 80 synliga gravar från järnåldern, 57 runda stensättningar, tio runda högar, sju domarringar och sex resta stenar, inga uppgifter om utgrävning, skulpturen "Anna" 14 meter hög av Jaume Plensa — https://www.bohuslansmuseum.se/kunskapsbanken_bohuslans_historia/pilane-gravfalt/ (läst 2026-09-16)
      'I Pilane på västra Tjörn ligger ett järnåldersgravfält med ungefär 80 synliga gravar: 57 runda stensättningar, tio runda högar, sju domarringar och sex resta stenar. Gravfältet har såvitt känt aldrig grävts ut. Sedan flera år delar det plats med en samtidskonstutställning — bland verken den fjorton meter höga skulpturen "Anna" av den spanske konstnären Jaume Plensa.',
      // KÄLLA: Tjörns kommun, Öar runt Tjörn — två holmar, den södra Klädesholmen med den äldsta bebyggelsen och den norra Koholmen, sillperioden 1747–1808 med uppemot 1 000 personer, 40 procent av alla svenska sillkonserver, personfärja från Rönnängs brygga till Åstol, Tjörnekalv och Dyrön medan Härön nås via Kyrkesund — https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/oar-runt-tjorn ; Västsverige/Tjörn, Klädesholmen — 25 konservfabriker och cirka 150 yrkesfiskare år 1950 — https://www.vastsverige.com/tjorn/produkter/kladesholmen/ ; Salt & Sill — "Sverige första flytande hotell" — https://www.saltosill.se/ (läst 2026-09-16)
      'Klädesholmen söder om Tjörn består av två holmar — den södra är Klädesholmen med den äldsta bebyggelsen, den norra är Koholmen. Under den stora sillperioden 1747–1808 bodde uppemot 1 000 personer här, och år 1950 fanns 25 konservfabriker och omkring 150 yrkesfiskare på ön. Sillen är kvar: fyrtio procent av alla svenska sillkonserver kommer i dag från Klädesholmen. På holmen ligger också Salt & Sill, som beskriver sig som Sveriges första flytande hotell. Från Rönnäng på södra Tjörn går färjor till Åstol, Dyrön och Tjörnekalv; till Härön går färja från Kyrkesund.',
      // KÄLLA: Länsstyrelsen Västra Götaland, naturreservatet Stigfjorden — bildat 1979, cirka 6 714 hektar i Orusts och Tjörns kommuner, näringsplats för tusentals änder, gäss, svanar och vadarfåglar under vår och höst, Ramsarkonventionen, Natura 2000 — https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/stigfjorden.html (läst 2026-09-16)
      'Norr om Tjörn breder naturreservatet Stigfjorden ut sig — ett innanhav på cirka 6 714 hektar i Orusts och Tjörns kommuner, avsatt 1979. Den rika produktionen i vattnet och på strandängarna gör området till näringsplats för tusentals änder, gäss, svanar och vadarfåglar under vår och höst. Stigfjorden finns med på Ramsarkonventionens lista över internationellt värdefulla våtmarker och ingår i EU:s nätverk Natura 2000.',
      // KÄLLA: Tjörns kommun, Sundsby säteri — säteriet på ön Mjörn med trädgård, park, vandringsleder, köksträdgård, utställningar, kafé och gårdsbutik — https://www.tjorn.se/webbplatser/sundsby-sateri ; Tjörns kommun, Utsiktsplatser — Solklinten, bergets högsta topp 108 meter över havet, med utsikt över bland annat Stigfjorden — https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/natur-och-gronomraden/utsiktsplatser (läst 2026-09-16)
      'Sundsby säteri på ön Mjörn i Tjörns kommun är öns stora historiska besöksmål, med parklandskap, trädgård och köksträdgård, naturstigar, utställningar, kafé och gårdsbutik. Intill ligger Solklinten, bergets högsta topp 108 meter över havet, med utsikt över bland annat Stigfjorden.',
    ],
    facts: {
      // KÄLLA: Västsverige/Tjörn, Klädesholmen — en timmes bilresa från Göteborg — https://www.vastsverige.com/tjorn/produkter/kladesholmen/ (läst 2026-09-16)
      travel_time: '1 h med bil från Göteborg',
      character: 'Stor, varierad, kulturell',
      season: 'Helår',
      best_for: 'Akvarellmuseum, fiskelägen, dagstur',
    },
    facts_provenance: {
      travel_time: 'matt',
      character: 'bedomning',
      season: 'bedomning',
      best_for: 'bedomning',
    },
    activities: [
      // KÄLLA: Nordiska Akvarellmuseet, Historia — öppnade 16 juni 2000, ritat av Niels Bruun och Henrik Corfitsen — https://www.akvarellmuseet.org/om/historia (läst 2026-09-16)
      { icon: '🎨', name: 'Nordiska Akvarellmuseet', desc: 'Öppnade 2000, ritat av de danska arkitekterna Niels Bruun och Henrik Corfitsen.' },
      // KÄLLA: Tjörns kommun, Öar runt Tjörn — 40 procent av alla svenska sillkonserver kommer från Klädesholmen — https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/oar-runt-tjorn ; Västsverige/Tjörn, Klädesholmen — https://www.vastsverige.com/tjorn/produkter/kladesholmen/ (läst 2026-09-16)
      { icon: '🐟', name: 'Klädesholmens Sill', desc: 'Sillfabrik och museum på ön där 40 % av Sveriges sillkonserver görs.' },
      // KÄLLA: Tjörns kommun, Badplatser — Gråskär, Skärhamn listad med sandstrand och tillgänglighetsanpassning — https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/bada/badplatser (läst 2026-09-16)
      { icon: '🏊', name: 'Gråskär, Skärhamn', desc: 'Kommunal badplats med sandstrand och tillgänglighetsanpassning.' },
    ],
    accommodation: [
      // KÄLLA: Salt & Sill, Om Salt & Sill — "Sveriges första flytande hotell", adress Rytterholmen 1, Klädesholmen — https://www.saltosill.se/om-salt-sill/ (läst 2026-09-16)
      { name: 'Salt & Sill Hotell', type: 'Hotell', desc: 'Flytande hotell vid Klädesholmen. Beskrivs på egen webbplats som "Sveriges första flytande hotell".' },
      // KÄLLA: Västsverige/Tjörn, Hotel Nordevik — "a charming boutique hotel in the heart of Skärhamn", Hamngatan 60, Skärhamn — https://www.vastsverige.com/en/tjorn/products/hotel-nordevik/ (läst 2026-09-16)
      { name: 'Hotell Nordevik', type: 'Hotell', desc: 'Boutiquehotell mitt i Skärhamn med individuellt inredda rum från dubbelrum till familjerum. Frukost med lokala inslag som bohuslänsk äggost.' },
      // KÄLLA: Västsverige/Södra Bohuslän, Rovor & Rum — Toftenäs 4, Skärhamn, fungerar även som vandrarhem utanför sommaren — https://www.vastsverige.com/sodrabohuslan/produkter/rovor-rum/ (läst 2026-09-16)
      { name: 'Rovor & Rum', type: 'Vandrarhem', desc: 'Två lägenheter i en ombyggd ekonomibyggnad från 1700-talet mitt i Toftenäs naturreservat på Tjörn. Veckoboende sommartid, vandrarhem övrig tid.' },
    ],
    getting_there: [
      // KÄLLA: Tjörns kommun, Utsiktsplatser — infarten till Tjörn via tunneln och Tjörnbron — https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/natur-och-gronomraden/utsiktsplatser (läst 2026-09-16)
      { method: 'Bil', from: 'Göteborg', time: '1 h', desc: 'Via Stenungsund och Tjörnbron.', icon: '🚗' },
      // KÄLLA: Västtrafik, tidtabell linje TEXP — "Buss Tjörn express: Tjörn – Göteborg" — https://www.vasttrafik.se/reseplanering/tidtabeller/linje/9011014620800000/ ; Tjörns kommun, Buss, båt och tåg — expressbussar mot Stenungsund och Göteborg — https://www.tjorn.se/bygga-bo-miljo-och-trafik/trafik-och-resor/buss-bat-och-tag (läst 2026-09-16)
      { method: 'Buss', from: 'Göteborg', desc: 'Västtrafiks expressbuss TEXP, Tjörn–Göteborg.', icon: '🚌' },
    ],
    harbors: [
      // KÄLLA: Skärhamns Gästhamn, Service — wifi, toalett, dusch, tvättmaskin, torktumlare, septitanksugning, grillplats; inget drivmedel anges — https://www.skarhamnsgasthamn.se/service/ ; Västsverige/Tjörn, Skärhamn Guest Marina — centralt läge, toaletter, duschar, wifi och tvättmaskin, inget bränsle — https://www.vastsverige.com/en/tjorn/products/skarhamn-guest-marina/ (läst 2026-09-16)
      { name: 'Skärhamns Gästhamn', desc: 'Ligger mitt i Skärhamn med butiker och restauranger nära. Ligger längs cykelleden mellan Nordiska Akvarellmuseet och Pilane skulpturpark.', fuel: false },
      // KÄLLA: Klädesholmen Västra Hamn — "Klädesholmens gästhamn" — https://kladesholmenvh.se/gasthamn/ ; Västsverige/Tjörn, Klädesholmens gästhamn — den "omtalade sillön", grytformad hamn där vinden inte stör, fasta förtöjningslinor — https://www.vastsverige.com/tjorn/produkter/kladesholmens-gasthamn/ (läst 2026-09-16)
      { name: 'Klädesholmens Gästhamn', desc: 'Gästhamn på Klädesholmens västsida. Västsverige beskriver ön som den omtalade sillön och hamnen som grytformad så att vinden inte stör, med fasta förtöjningslinor.' },
    ],
    restaurants: [
      // KÄLLA: Salt & Sill, Restauranger — huvudrestaurangen heter Salt & Sill, färska skaldjur från lokala fiskare — https://www.saltosill.se/restauranger/ (läst 2026-09-16)
      { name: 'Restaurang Salt & Sill', type: 'Restaurang', desc: 'Huvudrestaurangen på Salt & Sill vid Klädesholmen. Sidan lyfter fram färska skaldjur från lokala fiskare och skaldjursplatå.' },
      // KÄLLA: Västsverige/Tjörn, Vatten Restaurang & Kafé — Södra Hamnen 6, Skärhamn, certifierad av A Taste of West Sweden, fisk och skaldjur som favoritråvaror — https://www.vastsverige.com/en/tjorn/products/vatten-restaurang-kafe/ (läst 2026-09-16)
      { name: 'Vatten Restaurang & Kafé', type: 'Restaurang', desc: 'Restaurang och kafé vid Södra Hamnen i Skärhamn. Certifierad av A Taste of West Sweden, med fisk och skaldjur som favoritråvaror och även kött- och vegetariska alternativ.' },
      // KÄLLA: Västsverige/Tjörn, Bistro Port Sud — Södra Hamnen 8, Skärhamn, meny som blandar västkust och provensalskt — https://www.vastsverige.com/tjorn/produkter/bistro-port-sud/ (läst 2026-09-16)
      { name: 'Bistro Port Sud', type: 'Bistro', desc: 'Bistro vid Södra Hamnen i Skärhamn med servering vid bryggkanten. Menyn blandar västkustråvaror från land och hav med provensalskt.' },
    ],
    // KÄLLA: Tjörns kommun, Utsiktsplatser — Tjörnbron som utsiktsplats med utsikt över fjordarna och skärgården, Sankt Olovs valar som "ett av Bohusläns mest kända sjömärken" — https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/natur-och-gronomraden/utsiktsplatser (läst 2026-09-16)
    tips: ['Tjörnbron är utpekad av kommunen som utsiktsplats — utsikt över fjordarna och skärgården.', 'Sankt Olovs valar räknas av kommunen som ett av Bohusläns mest kända sjömärken.'],
    related: ['orust', 'marstrand', 'stenungsund'],
    tags: ['akvarellmuseum', 'sill', 'tjörnbron', 'mångsidig'],
    // KÄLLA: Bohusläns museum via DigitaltMuseum, "Almöbron i Bohuslän påseglad av bulkfartyget Star Clipper i januari 1980" — 18 januari 1980 klockan 01.30, åtta omkomna, omedelbar planering av provisorisk färjeförbindelse och projektering av ny bro — https://digitaltmuseum.se/021015874271/almobron-i-bohuslan-paseglad-av-bulkfartyget-star-clipper-i-januari-198 (läst 2026-09-16)
    did_you_know: 'Natten till den 18 januari 1980, klockan halv två, seglade bulkfartyget Star Clipper på Almöbron — Tjörnbron — som rasade. Åtta personer omkom när bilar körde ut i raset. Planeringen av en provisorisk färjeförbindelse och projekteringen av en ny bro startade omedelbart.',
    seasonal: {
      open: 'Hela året',
      peak: 'Juli–Augusti',
      best: 'Juni eller September',
      bestReason: 'Tjörn är broförbundet och tillgängligt hela året. Nordiska Akvarellmuseet är värt besöket oavsett säsong. Juni och september ger bäst upplevelse av Klädesholmen och fiskelägena.',
      months: ['limited','limited','limited','limited','open','open','peak','peak','open','open','limited','limited'],
    },
  },
  {
    slug: 'kungshamn',
    name: 'Kungshamn',
    region: 'bohuslan',
    regionLabel: 'Bohuslän',
    emoji: '🦐',
    // KÄLLA: Västsverige/Sotenäs, Kungshamn — orten och broförbindelsen med Smögen sedan 70-talet — https://www.vastsverige.com/sotenas/artiklar/kungshamn/ ; Sotenäs kommun, Kungshamns gästhamn — "beläget ytterst på halvön Sotenäset" — https://www.sotenas.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/batar-och-hamnar/gasthamnar/kungshamns-gasthamn (läst 2026-09-16)
    tagline: 'Sotenäsets centralort — gästhamn, fiskeindustri och bro till Smögen.',
    description: [
      // KÄLLA: Västsverige/Sotenäs, Kungshamn — Gravarne, Bäckevik och Fisketången, sammanslagningen för cirka fyrtio år sedan, Fisketångens äldre bebyggelse — https://www.vastsverige.com/sotenas/artiklar/kungshamn/ ; Sotenäs kommun, Kungshamns gästhamn — "beläget ytterst på halvön Sotenäset" — https://www.sotenas.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/batar-och-hamnar/gasthamnar/kungshamns-gasthamn (läst 2026-09-16)
      'Kungshamn ligger ytterst på halvön Sotenäset och är Sotenäs kommuns centralort. Orten består av tre historiskt skilda delar — Gravarne, Bäckevik och Fisketången — som slogs samman under ett namn för drygt fyrtio år sedan; lokalt används de gamla ortnamnen fortfarande. Fisketången har kvar den äldre bebyggelsen med sjöbodar och trånga gränder, medan centrala Kungshamn är mer modernt.',
      // KÄLLA: Västsverige/Sotenäs, Kungshamn — "Kungshamn har sedan 70-talet broförbindelse med Smögen" — https://www.vastsverige.com/sotenas/artiklar/kungshamn/ ; Västsverige/Sotenäs, Smögen — "Landets näst största fiskauktion ligger på Smögen" — https://www.vastsverige.com/sotenas/artiklar/smogen/ ; Sotenäs kommun, Kungshamns gästhamn — cirka 100 platser, vattendjup 2,5–5 m, dusch, WC, tvättstuga, färskvatten, eluttag, wifi, mycket centralt placerad — https://www.sotenas.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/batar-och-hamnar/gasthamnar/kungshamns-gasthamn (läst 2026-09-16)
      'Kungshamn har sedan 1970-talet broförbindelse med Smögen. På Smögen ligger landets näst största fiskauktion, dit fiskebåtarna kommer in med färsk fisk och skaldjur som sedan säljs vidare i fiskaffärerna i området. Kungshamns egen gästhamn ligger mycket centralt och har ett hundratal platser, med vattendjup på 2,5–5 meter, dusch, WC, tvättstuga, färskvatten, eluttag och wifi.',
      // KÄLLA: Länsstyrelsen Västra Götaland, naturreservatet Hållöarkipelagen — bildat 1975, cirka 292 hektar, Bohusläns äldsta fyr rest 1842 på Hållös högsta punkt med vit blixt var tolfte sekund, byggnadsminne 1935, turbåtar från Kungshamn, badplatser, eldplatser, toalett och vandrarhem i gamla radiopejlstationen — https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/halloarkipelagen.html (läst 2026-09-16)
      'Utanför Kungshamn ligger naturreservatet Hållöarkipelagen, avsatt 1975 och cirka 292 hektar stort. Öarna är flacka och havsexponerade med naken berggrund; i svackor och sprickor växer slån, nypon och vide, och fågellivet omfattar bland annat lommar, alkor, tofsvipa och rödbena. På Hållös högsta punkt står Bohusläns äldsta fyr, rest 1842 och byggnadsminnesförklarad 1935; den lyser med en vit blixt var tolfte sekund. Sommartid går turbåtar till öarna från Kungshamn, och på reservatet finns badplatser, eldplatser, toalett och ett vandrarhem i den gamla radiopejlstationen.',
      // KÄLLA: Sotenäs kommun, Badplatser Kungshamn — Fisketången (klippbad med sandstrand, bryggor med badstegar, handikappramp, omklädningsrum och toaletter), Stenbogen (klippbad med badstegar, hopptorn och trampolin), Ramnerer (klippbad) — https://www.sotenas.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser-hundbad/kungshamn ; Sotenäs kommun, Soteleden och Kuststigen — digitala kartor och etappförslag — https://www.sotenas.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/vandringsleder/soteleden-och-kuststigen (läst 2026-09-16)
      'I Kungshamn finns tre kommunala badplatser: Fisketången, klippbad med sandstrand, bryggor med badstegar, handikappramp, omklädningsrum och toaletter; Stenbogen, klippbad med badstegar, hopptorn och trampolin; och Ramnerer, rent klippbad. Härifrån går också Soteleden och Kuststigen, som Sotenäs kommun tillhandahåller digitala kartor och etappförslag för.',
      // KÄLLA: Nordens Ark, Om oss — ideell stiftelse för hotade djur sedan 1989, totalt 383 hektar mark, nationellt uppfödningsansvar, adress Åby säteri, Hunnebostrand — https://nordensark.se/om-oss/ (läst 2026-09-16)
      'En dryg mil norrut, på Åby säteri utanför Hunnebostrand i samma kommun, ligger Nordens Ark — en ideell stiftelse som sedan 1989 arbetar för att ge hotade djur en framtid genom bevarande, uppfödning, forskning och utbildning. Anläggningen omfattar totalt 383 hektar mark och har nationellt ansvar för uppfödning av flera svenska arter.',
    ],
    facts: {
      // Restiden från Göteborg utelämnad: ingen tillåten källa anger den.
      travel_time: '',
      character: 'Fiskeindustriell by, räkor, arbetshamn',
      season: 'Juni–september',
      // KÄLLA: Sotenäs kommun, Kungshamns gästhamn och Soteleden/Kuststigen — gästhamnen och vandringsleden — https://www.sotenas.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/vandringsleder/soteleden-och-kuststigen (läst 2026-09-16)
      best_for: 'Räkmacka, gästhamn, vandring på Soteleden',
    },
    facts_provenance: {
      travel_time: 'bedomning',
      character: 'bedomning',
      season: 'bedomning',
      best_for: 'bedomning',
    },
    activities: [
      // KÄLLA: Västsverige/Sotenäs, Smögen — möjlighet att följa med lokala fiskare och delta i räkfisketurer — https://www.vastsverige.com/sotenas/artiklar/smogen/ (läst 2026-09-16)
      { icon: '🦐', name: 'Räkfiskartur', desc: 'Räkfisketurer med lokala fiskare erbjuds i området.' },
      // KÄLLA: Nordens Ark, Om oss — stiftelse för hotade djur sedan 1989, Åby säteri utanför Hunnebostrand — https://nordensark.se/om-oss/ (läst 2026-09-16)
      { icon: '🦭', name: 'Nordens Ark', desc: 'Stiftelse för hotade djur sedan 1989, på Åby säteri i samma kommun.' },
      // KÄLLA: Västsverige/Sotenäs, Kungshamn — "Kungshamn har sedan 70-talet broförbindelse med Smögen" — https://www.vastsverige.com/sotenas/artiklar/kungshamn/ (läst 2026-09-16)
      { icon: '🥾', name: 'Promenad till Smögen', desc: 'Broförbindelse till Smögen sedan 1970-talet.' },
    ],
    accommodation: [
      // KÄLLA: Västsverige/Sotenäs, Hotell Kungshamn Suites — namnet, adress Hotellgatan 6, Kungshamn, lägenhetssviter och egen restaurang med utsikt över Kungshamnsinloppet — https://www.vastsverige.com/en/sotenas/produkter/hotell-kungshamn/ (läst 2026-09-16)
      { name: 'Hotell Kungshamn Suites', type: 'Hotell', desc: 'Lägenhetssviter på en klippa vid Kungshamnsinloppet, de flesta med balkong eller terrass mot kusten. Egen restaurang.' },
    ],
    getting_there: [
      { method: 'Bil', from: 'Göteborg', desc: 'E6 norrut och västerut ut på Sotenäset.', icon: '🚗' },
    ],
    harbors: [
      // KÄLLA: Sotenäs kommun, Kungshamns gästhamn — cirka 100 platser, vattendjup 2,5–5 m, dusch, WC, tvättstuga, färskvatten, eluttag, wifi, sopor; inget drivmedel anges; centralt läge med butiker, restauranger och banker nära — https://www.sotenas.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/batar-och-hamnar/gasthamnar/kungshamns-gasthamn (läst 2026-09-16)
      { name: 'Kungshamns Gästhamn', desc: 'Gästhamn i Kungshamn med cirka 100 båtplatser och djup 2,5–5 meter enligt Sotenäs kommun. Kommunen anger centralt läge med butiker, restauranger och banker nära.', fuel: false },
    ],
    restaurants: [
      // KÄLLA: Restaurang Fyren, egen webbplats — Bäckeviksgatan 3D, Kungshamn, "precis vid havet och strandpromenaden" — https://fyrenkungshamn.se/ (läst 2026-09-16)
      { name: 'Restaurang Fyren', type: 'Restaurang', desc: 'Restaurang längst in i hamnen i Kungshamn, vid havet och strandpromenaden. Husmanskost, fisk- och kötträtter, pasta, hamburgare och räkmacka.' },
      // KÄLLA: Västsverige/Sotenäs, Krogar och caféer året om — Calmars Veranda, Hamnbageriet och Coza Café & Mat listade under Kungshamn — https://www.vastsverige.com/sotenas/artiklar/artiklar-se--gora/krogar-och-cafeer-aret-om/ (läst 2026-09-16)
      { name: 'Calmars Veranda', type: 'Restaurang', desc: 'Krog i Kungshamn.' },
      { name: 'Hamnbageriet', type: 'Café', desc: 'Café och bageri i Kungshamn.' },
      { name: 'Coza Café & Mat', type: 'Café', desc: 'Café med matservering i Kungshamn.' },
    ],
    // KÄLLA: Västsverige/Sotenäs, Smögen — Hållö "a 10-minute boat ride away" — https://www.vastsverige.com/sotenas/artiklar/smogen/ ; Västsverige/Sotenäs, Kungshamn — granitvalvbron i Hovenäset uppges vara Sveriges största valvbro av granit — https://www.vastsverige.com/sotenas/artiklar/kungshamn/ (läst 2026-09-16)
    tips: ['Hållö nås med båt från Smögen på cirka tio minuter.', 'Söder om Kungshamn ligger Hovenäset, vars granitvalvbro från tidigt 1900-tal uppges vara Sveriges största valvbro av granit (Västsverige).'],
    related: ['smogen', 'lysekil', 'grebbestad'],
    tags: ['räkor', 'fiskeindustri', 'prisvärt', 'arbetshamn'],
    // KÄLLA: Västsverige/Sotenäs, Kungshamn — Gravarne, Bäckevik och Fisketången slogs ihop för drygt fyrtio år sedan och de gamla ortnamnen används fortfarande lokalt — https://www.vastsverige.com/sotenas/artiklar/kungshamn/ (läst 2026-09-16)
    did_you_know: 'Kungshamn är egentligen tre orter i en: Gravarne, Bäckevik och Fisketången slogs ihop under ett gemensamt namn för drygt fyrtio år sedan, och de gamla ortnamnen används fortfarande lokalt.',
    seasonal: {
      open: 'Juni–September',
      peak: 'Juli–Augusti',
      best: 'Juni eller September',
      bestReason: 'Juni och september ger gästhamnsplats och vandring på Soteleden utan högsäsongens tryck.',
      months: ['off','off','off','off','off','open','peak','peak','open','limited','off','off'],
    },
  },
  {
    slug: 'pater-noster',
    name: 'Pater Noster',
    region: 'bohuslan',
    regionLabel: 'Bohuslän',
    emoji: '💡',
    // KÄLLA: Tjörns kommun, Öar runt Tjörn — fyren 32 meter hög, konstruerad av Nils Gustav von Heidenstam, statligt byggnadsminne — https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/oar-runt-tjorn ; Västsverige/Tjörn, Pater Noster — byggd 1868, helt i stål och gjutjärn — https://www.vastsverige.com/tjorn/produkter/pater-noster/ (läst 2026-09-16)
    tagline: 'Heidenstams järnfyr på Hamneskär — statligt byggnadsminne och hotell.',
    description: [
      // KÄLLA: Tjörns kommun, Öar runt Tjörn — "Fyren Pater Noster är 32 meter hög och konstruerades av Nils Gustav von Heidenstam" — https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/oar-runt-tjorn ; Västsverige/Tjörn, Pater Noster — byggd 1868, "gjord helt i stål och gjutjärn", Heidenstam utvecklade fyrsystemen runt Sveriges kust — https://www.vastsverige.com/tjorn/produkter/pater-noster/ ; Pater Noster, egen webbplats — "Sveriges farligaste farvatten" — https://paternoster.se/ (läst 2026-09-16)
      // OKLART: källorna stavar förnamnet olika (Nils Gustav hos Tjörns kommun, Gustav hos hotellet). Texten följer Tjörns kommun.
      'Pater Noster är en fyr på den karga klippön Hamneskär i Tjörns kommun. Det 32 meter höga tornet restes 1868, är gjort helt i stål och gjutjärn och konstruerades av Nils Gustav von Heidenstam, den ingenjör som utvecklade fyrsystemen runt Sveriges kust. Fyren skulle lotsa fartyg genom vad som räknades som ett av landets farligaste farvatten.',
      // KÄLLA: Tjörns kommun, Öar runt Tjörn — "Pater Noster släcktes 1977", fyren togs iland för omfattande renovering och fördes tillbaka sommaren 2007, statligt byggnadsminne med högt kulturhistoriskt värde 2015 — https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/oar-runt-tjorn (läst 2026-09-16)
      'Pater Noster släcktes 1977. Därefter togs hela fyren iland för en omfattande renovering, och sommaren 2007 fördes den tillbaka till Hamneskär. 2015 förklarades fyren som statligt byggnadsminne med högt kulturhistoriskt värde.',
      // KÄLLA: Västsverige/Tjörn, Pater Noster — "nio väldesignade rum" för 18 gäster, sovplatser på klipporna sommartid, renovering av designbyrån Stylt Trampoli — https://www.vastsverige.com/tjorn/produkter/pater-noster/ ; Pater Noster, egen webbplats — "150 dagsgäster", "Vi använder lokala råvaror utifrån säsong", "Fisk och skaldjur från Kattegatt och Skagerrak står i fokus", utmärkelserna Världens bästa hotellkoncept, Stora Turismpriset och The Special One — https://paternoster.se/ (läst 2026-09-16)
      'Den forna fyrvaktarbostaden är varsamt renoverad av designbyrån Stylt Trampoli och drivs i dag som hotell med nio rum, plus sovplatser på klipporna sommartid. Anläggningen tar också emot upp till 150 dagsgäster. Köket arbetar med lokala råvaror efter säsong, med fisk och skaldjur från Kattegatt och Skagerrak i fokus. Hotellet uppger själv att det belönats med bland annat Världens bästa hotellkoncept, Stora Turismpriset och The Special One.',
      // KÄLLA: Tjörns kommun, Öar runt Tjörn — "gå upp i fyren och beundra utsikten över västerhavet", taxibåtar i Marstrand och skjuts som hotellet ordnar för sina gäster — https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/oar-runt-tjorn ; Västsverige/Tjörn, Pater Noster — dagsbesökare kommer med egen båt och lägger till vid gästbryggan — https://www.vastsverige.com/tjorn/produkter/pater-noster/ (läst 2026-09-16)
      'Besökare kan gå upp i fyren och se ut över västerhavet. Hamneskär saknar bilväg och bebyggelse utöver fyrplatsen; ön nås med egen båt till gästbryggan, med taxibåt från Marstrand eller med den skjuts hotellet ordnar för sina gäster.',
      // KÄLLA: Västsverige/Tjörn — "Tjörn Island of Art" med Skulptur i Pilane, Nordiska Akvarellmuseet och Pater Noster — https://www.vastsverige.com/tjorn/ ; Tjörns kommun listar Hamneskär (Pater Noster) under Öar runt Tjörn — https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/oar-runt-tjorn (läst 2026-09-16)
      'Hamneskär räknas till öarna runt Tjörn, och Pater Noster lyfts av destinationsbolaget fram som ett av Tjörns tre stora besöksmål vid sidan av Skulptur i Pilane och Nordiska Akvarellmuseet.',
    ],
    facts: {
      // KÄLLA: Tjörns kommun, Öar runt Tjörn — taxibåtar i Marstrand, hotellet ordnar skjuts för sina gäster — https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/oar-runt-tjorn (läst 2026-09-16)
      travel_time: 'Båt från Marstrand',
      // KÄLLA: Tjörns kommun, Öar runt Tjörn — fyrplatsen på Hamneskär, statligt byggnadsminne 2015 — https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/oar-runt-tjorn (läst 2026-09-16)
      character: 'Fyrplats, statligt byggnadsminne, exklusivt',
      // Säsongen utelämnad: hotellet anger ingen säsong och skriver att det välkomnar grupper året runt.
      season: '',
      best_for: 'Speciella tillfällen, romantik, lyx',
    },
    facts_provenance: {
      travel_time: 'matt',
      character: 'bedomning',
      season: 'bedomning',
      best_for: 'bedomning',
    },
    activities: [
      // KÄLLA: Tjörns kommun, Öar runt Tjörn — "Fyren Pater Noster är 32 meter hög och konstruerades av Nils Gustav von Heidenstam", utsikten över västerhavet — https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/oar-runt-tjorn ; Västsverige/Tjörn, Pater Noster — byggd 1868, helt i stål och gjutjärn — https://www.vastsverige.com/tjorn/produkter/pater-noster/ (läst 2026-09-16)
      { icon: '💡', name: 'Fyrbestigning', desc: 'Klättra upp i den 32 meter höga järnfyren från 1868.' },
      { icon: '🥾', name: 'Klippvandring', desc: 'Klippvandring på ön, med utsikt över västerhavet.' },
      // KÄLLA: Pater Noster, egen webbplats — "Vi använder lokala råvaror utifrån säsong", "Fisk och skaldjur från Kattegatt och Skagerrak står i fokus" — https://paternoster.se/ ; Pater Noster, FAQ — huvudrestaurangen heter Boathouse/Båthuset — https://en.paternoster.se/faq (läst 2026-09-16)
      { icon: '🍽', name: 'Boathouse (Båthuset)', desc: 'Lokala råvaror efter säsong; fisk och skaldjur från Kattegatt och Skagerrak.' },
    ],
    accommodation: [
      // KÄLLA: Västsverige/Tjörn, Pater Noster — nio rum i de restaurerade fyrvaktarbostäderna — https://www.vastsverige.com/en/tjorn/products/pater-noster/ ; Pater Noster, FAQ — "9 hotel rooms" — https://en.paternoster.se/faq (läst 2026-09-16)
      // Öppningsåret 2020 är struket: granskningen kunde inte belägga det hos hotellet,
      // Tjörns kommun eller Västsverige. Saknas källa ska uppgiften bort, inte stå kvar med reservation.
      { name: 'Pater Noster', type: 'Hotell', desc: 'Boutiquehotell i den restaurerade fyrvaktarbostaden — nio rum och restaurang.' },
    ],
    getting_there: [
      // KÄLLA: Tjörns kommun, Öar runt Tjörn — "Det finns taxibåtar i Marstrand. Hotellverksamheten ordnar också med skjuts för sina gäster" — https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/oar-runt-tjorn (läst 2026-09-16)
      { method: 'Båt', from: 'Marstrand', desc: 'Skjuts ordnas av hotellet; taxibåtar finns i Marstrand.', icon: '⛴' },
    ],
    harbors: [
      // KÄLLA: Pater Noster, FAQ och Visit Pater Noster — hotellgäster med egen båt anmäler minst tre timmar i förväg, dagsbesökare med egen båt i mån av plats max två timmar, platser kan inte förbokas — https://en.paternoster.se/faq och https://en.paternoster.se/visit-pater-noster (läst 2026-09-16)
      { name: 'Pater Noster Brygga', desc: 'Liten hamn vid hotellet. Hotellgäster kan komma med egen båt efter anmälan minst tre timmar i förväg. Dagsbesökare med egen båt får lägga till i mån av plats, max två timmar, och platser kan inte förbokas.', fuel: false },
    ],
    restaurants: [
      // KÄLLA: Pater Noster, FAQ — huvudrestaurangen heter Boathouse/Båthuset, externa middagsgäster tas emot endast i sällskap om minst sex vuxna efter förbokning — https://en.paternoster.se/faq ; Västsverige/Tjörn, Pater Noster — restaurangnamnet Boathouse — https://www.vastsverige.com/en/tjorn/products/pater-noster/ (läst 2026-09-16)
      { name: 'Boathouse (Båthuset)', type: 'Restaurang', desc: 'Hotellets restaurang på Hamneskär, med lokal och säsongsbetonad mat och fokus på fisk och skaldjur. Öppen för icke-boende endast i sällskap om minst sex personer efter förbokning.' },
    ],
    // KÄLLA: Pater Noster, egen webbplats — "150 dagsgäster" — https://paternoster.se/ ; Västsverige/Tjörn, Pater Noster — dagsbesökare med egen båt lägger till vid gästbryggan — https://www.vastsverige.com/tjorn/produkter/pater-noster/ (läst 2026-09-16)
    tips: ['Anläggningen tar emot dagsgäster, upp till 150 personer.', 'Dagsbesökare med egen båt lägger till vid gästbryggan.'],
    related: ['marstrand', 'kungshamn', 'smogen'],
    tags: ['fyr', 'lyx', 'unik', 'boutique-hotell'],
    // KÄLLA: Tjörns kommun, Öar runt Tjörn — "Pater Noster släcktes 1977", fyren togs iland och fördes tillbaka sommaren 2007, statligt byggnadsminne 2015 — https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/oar-runt-tjorn (läst 2026-09-16)
    did_you_know: 'Pater Noster släcktes 1977. Fyren togs därefter iland i sin helhet för en omfattande renovering och fördes tillbaka till Hamneskär sommaren 2007. 2015 blev den statligt byggnadsminne.',
    seasonal: {
      open: 'April–Oktober',
      peak: 'Juni–September',
      best: 'Maj eller September',
      bestReason: 'Pater Noster är ett boutique-hotell och öppnar tidigt. Maj och September ger dramatisk höghavsstämning.',
      months: ['off','off','off','limited','open','peak','peak','peak','open','limited','off','off'],
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
      character: 'Tillgänglig, livlig, fiskartradition',
      // KÄLLA: Visit Öckerö — "Hela året går färjorna från Lilla Varholmens färjeläge ... avgiftsfria turer ut till Öckeröarna" — https://www.vastsverige.com/visitockero/ (läst 2026-09-16)
      season: 'Helår',
      best_for: 'Dagsutflykt, lättillgänglig, familjevänligt',
    },
    facts_provenance: {
      travel_time: 'matt',
      character: 'bedomning',
      season: 'matt',
      best_for: 'bedomning',
    },
    activities: [
      // KÄLLA: Göteborg & Co, Hönö — Fiskemuseet i hamnen i Hönö Klåva, badplatserna Hästen och Lappesand nära hamnen med anläggningar på plats — https://www.goteborg.com/platser/hono (läst 2026-09-16)
      { icon: '🐟', name: 'Fiskemuseet', desc: 'Fiskets historia, i hamnen i Hönö Klåva.' },
      { icon: '🏊', name: 'Lappesand och Hästen', desc: 'Badplatser nära hamnen, med anläggningar på plats.' },
      // KÄLLA: Länsstyrelsen Västra Götaland, naturreservatet Ersdalen — grusade stigar, klippstränder, cykelled och fågelskådarskydd vid Kråkudden — https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/ersdalen.html (läst 2026-09-16)
      { icon: '🥾', name: 'Ersdalens naturreservat', desc: 'Grusade stigar, klippstränder, cykelled och fågelskådarskydd vid Kråkudden.' },
    ],
    accommodation: [
      // KÄLLA: Skärgårdshotellet Hönö, egen webbplats — Västra vägen 17, Hönö Klåva, 16 rum varav hälften med havsutsikt, restaurang, konferens och festvåning — https://skargardshotellethono.se/en/home/ ; Visit Öckerö, boendelista Hönö Klåva — https://www.vastsverige.com/visitockero/bo/bourvalhonoklava/ (läst 2026-09-16)
      { name: 'Skärgårdshotellet Hönö', type: 'Hotell', desc: 'Hotell i Hönö Klåva med 16 rum, varav hälften med havsutsikt. Egen restaurang, konferens och festvåning. Öppet året runt.' },
      // KÄLLA: Västsverige/Visit Öckerö, Havskatten — namnet "Havskatten Hotell & Vandrarhem", läge i Hönö Röds hamn, 12 hotelldubbelrum och 9 sovrum med eget badrum, bastu och konferens — https://www.vastsverige.com/en/visitockero/produkter/havskatten/ (läst 2026-09-16)
      { name: 'Havskatten Hotell & Vandrarhem', type: 'Vandrarhem', desc: 'Hotell och vandrarhem i Hönö Röds hamn. Hotelldubbelrum och sovrum med eget badrum, bastu och konferensmöjligheter. Nära naturreservatet Ersdalen.' },
      // KÄLLA: Visit Öckerö, boendelista Hönö Klåva — Hönö Sjöbodar som ett av boendena på ön — https://www.vastsverige.com/visitockero/bo/bourvalhonoklava/ (läst 2026-09-16)
      { name: 'Hönö Sjöbodar', type: 'Sjöbodar', desc: 'Boende i sjöbodar på Hönö.' },
    ],
    getting_there: [
      // KÄLLA: Göteborg & Co, Ta dig till skärgården — väg 155 till färjeläget vid Lilla Varholmen, den avgiftsfria vägfärjan, buss 290 från Järntorget hela vägen inklusive färjeöverfarten och buss X6 från Centralstationen till Lilla Varholmen — https://www.goteborg.com/guider/ta-dig-till-skargarden (läst 2026-09-16)
      { method: 'Bil + färja', from: 'Göteborg', desc: 'Väg 155 till färjeläget vid Lilla Varholmen, sedan avgiftsfri vägfärja.', icon: '⛴' },
      { method: 'Buss', from: 'Göteborg', desc: 'Buss 290 från Järntorget går hela vägen inklusive färjeöverfarten; buss X6 från Centralstationen går till Lilla Varholmen.', icon: '🚌' },
    ],
    harbors: [
      // KÄLLA: Hönö Klåva Hamn, egen webbplats — privatägd båt- och fiskehamn, nyrenoverat servicehus vid gästhamnen med duschar, toaletter, tvättmaskin och torktumlare — https://honoklavahamn.se/ ; Västsverige/Visit Öckerö, Hönö Klåva hamn — gästplatser och ställplatser för husbil, restauranger i hamnen — https://www.vastsverige.com/en/visitockero/produkter/honoklavahamn/ ; drivmedel endast belagt via reservkällan gasthamnsguide.se — https://www.gasthamnsguide.se/omradesindelat/vastkusten/item/hono-klava-gasthamn (läst 2026-09-16)
      { name: 'Hönö Klåva Hamn', desc: 'Privatägd båt- och fiskehamn i Hönö Klåva med gästplatser och ställplatser för husbil. Nyrenoverat servicehus med dusch, toalett, tvättmaskin och torktumlare. Butiker och restauranger i hamnen.', fuel: true },
    ],
    restaurants: [
      // KÄLLA: Västsverige/Visit Öckerö, Restaurang Kroken — namnet "Klova Hamnkrog" (även kallad Nya Kroken), Hönö Klåva hamn väg 15, uteservering i lä, mat lagad från grunden, hummermiddagar och à la carte — https://www.vastsverige.com/visitockero/produkter/restaurang-kroken/ (läst 2026-09-16)
      { name: 'Klova Hamnkrog', type: 'Restaurang', desc: 'Restaurang i Hönö Klåva hamn med uteservering i lä från havsvindarna. Sidan beskriver god och vällagad mat som lagas från grunden samt hummermiddagar och à la carte.' },
      // KÄLLA: Tullhuset, egen webbplats — Västra Vägen 3, Hönö, fisk- och skaldjursrestaurang med à la carte, smakmeny och skaldjursbuffé — https://www.tullhuset.se/ ; Visit Öckerö, Klåva-guide — https://www.vastsverige.com/en/visitockero/eat-drink/eat-klava/ (läst 2026-09-16)
      { name: 'Tullhuset', type: 'Restaurang', desc: 'Fisk- och skaldjursrestaurang på Hönö. À la carte, smakmeny och skaldjursbuffé.' },
      // KÄLLA: Skärgårdshotellet Hönö, egen webbplats — restaurangen Skafferiet, hotellet tar emot både hotellgäster och restaurangbesökare — https://skargardshotellethono.se/en/home/ (läst 2026-09-16)
      { name: 'Skafferiet', type: 'Restaurang', desc: 'Skärgårdshotellets restaurang i Hönö Klåva. Serverar frukost, lunch och middag med lokala och säsongsbetonade råvaror, öppen även för icke-boende.' },
    ],
    // KÄLLA: Göteborg & Co, Hönö — ett tjugotal butiker samt restauranger och kaféer, Hönö Klåva "utsedd till bästa ställplats 2019 av Husbil & Husvagn" — https://www.goteborg.com/platser/hono ; Göteborg & Co, Ta dig till skärgården — cykelvägar från Göteborgs centrum till Lilla Varholmen och vägfärjan som tar cyklar — https://www.goteborg.com/guider/ta-dig-till-skargarden (läst 2026-09-16)
    tips: ['Hönö Klåva har ett tjugotal butiker samt restauranger och kaféer.', 'Cykelvägar går från Göteborgs centrum ut till Lilla Varholmen, där vägfärjan tar cyklar.', 'Hönö Klåva utsågs 2019 till bästa ställplats av tidningen Husbil & Husvagn (enligt Göteborg & Co).'],
    related: ['styrso', 'donso', 'vrango'],
    tags: ['nära göteborg', 'bilfärja', 'fiskeläge', 'familjer'],
    // KÄLLA: Visit Öckerö, Ett centrum för fiske — "var tionde svensk yrkesfiskare" bor i kommunen och levererar tillsammans med kollegerna i Fiskebäck 75 procent av all fisk som fångas i Sverige — https://www.vastsverige.com/visitockero/centrum-for-fiske/ (läst 2026-09-16)
    did_you_know: 'Var tionde svensk yrkesfiskare bor i Öckerö kommun. Tillsammans med kollegerna i Fiskebäck levererar de 75 procent av all fisk som fångas i Sverige.',
    seasonal: {
      open: 'Hela året',
      peak: 'Juli',
      best: 'Juni eller September',
      bestReason: 'Hönö är det lättaste sättet att komma ut i Göteborgs skärgård. Reguljär färja hela året gör att det aldrig är fel säsong, men juni och september ger bästa upplevelsen.',
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
      'Gullholmens kyrka byggdes 1799 på Lilla Härmanö, och på ön står Skepparhuset från 1893.',
    ],
    // KÄLLA: Länsstyrelsen Västra Götaland, Härmanö naturreservat — ca 1 481 ha — https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/harmano.html (läst 2026-09-16)
    // KÄLLA: Bohusläns museum, Kunskapsbanken "Gullholmen" — drygt 800 invånare omkring 1910; år 2010 tio fastboende på Gullholmen och närmare 100 på Härmanö — https://www.bohuslansmuseum.se/kunskapsbanken_bohuslans_historia/gullholmen/ (läst 2026-09-16)
    facts: {
      area: 'Gullholmen + Härmanö; Härmanö naturreservat ca 1 481 ha',
      population: 'som mest drygt 800 invånare omkring 1910; år 2010 tio fastboende på Gullholmen och närmare 100 på Härmanö',
      known_for: 'Välbevarat historiskt fiskesamhälle, täta gränder, bilfritt',
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
      // KÄLLA: Gullholmsbaden, egen webbplats — 69 fullt utrustade stugor, egen restaurang, konferenslokaler och minigolf — https://www.gullholmsbaden.se/ (läst 2026-09-16)
      { name: 'Gullholmsbaden', type: 'Stugby', desc: 'Stugby på Gullholmen med 69 fullt utrustade stugor. Egen restaurang, konferenslokaler och minigolf på anläggningen.' },
    ],
    getting_there: [
      // KÄLLA: Västsverige, "Färja Tuvesvik – Gullholmen – Käringön" — Västtrafiks linje 381 avgår från Tuvesvik, tio minuter till Gullholmen, cykel kan tas med — https://www.vastsverige.com/orust/produkter/farja-tuvesvik-gullholmen-karingon/ (läst 2026-09-16)
      // KÄLLA: Västsverige/Orust, "Bilfria öar i södra Bohuslän" — överfarten tar tio minuter till Gullholmen — https://www.vastsverige.com/en/orust/things-to-do/boating/car-less-islands/ (läst 2026-09-16)
      { method: 'Passagerarfärja från Tuvesvik', from: 'Tuvesvik (Orust)', time: 'ca 10 min', desc: 'Västtrafiks linje 381 från Tuvesvik på Orust. Överfarten till Gullholmen tar ca 10 minuter. Cykel kan tas med.', icon: '⛴' },
    ],
    transport_meta: {
      from_city_min: 120,
      nearest_hub: 'Henån (Orust) / Tuvesvik',
      from_nearest_hub_min: 10,
      operator: 'Lokal passagerarfärja (sommarsäsong)',
      frequency: 'Se Västtrafiks tidtabell',
    },
    harbors: [
      // KÄLLA: Orust kommun, Gullholmens gästhamn — 50 platser, el, servicebyggnad med toalett, dusch och tvättmaskin, sugtömningsstation, inget drivmedel — https://www.orust.se/uppleva-och-gora/gasthamnar/gullholmens-gasthamn (läst 2026-09-16)
      // KÄLLA: Gästhamnsguiden, Gullholmen gästhamn — "Harbour Depth 2 - 7 m Spots 50", bekräftar färskvatten, el, dusch, toalett och tvättstuga, inget drivmedel — https://www.gasthamnsguiden.se/en/harbor/gullholmen-gasthamn-2/ (läst 2026-09-16)
      { name: 'Gullholmens Gästhamn', desc: 'Gästhamn i fiskeläget med 50 platser på 2–7 meters djup. Servicebyggnad med toalett, dusch och tvättmaskin. Sugtömningsstation för latrintank.', fuel: false, service: ['Vatten', 'El', 'Dusch', 'Toalett', 'Tvättmaskin'] },
    ],
    restaurants: [
      // KÄLLA: Gullholmens Hamnkrog, egen webbplats (Torget 105, 47471 Gullholmen) — https://gullholmenshamnkrog.se/ (läst 2026-09-16)
      // KÄLLA: Västsverige/Orust, "Gullholmens Hamnkrog" — mötesplats ett stenkast från hamnen — https://www.vastsverige.com/orust/produkter/gullholmens-hamnkrog/ (läst 2026-09-16)
      { name: 'Gullholmens Hamnkrog', type: 'Krog', desc: 'Krog vid hamnen på Gullholmen med uteservering. Serverar mat, dryck och fika, bland annat räksmörgås.' },
      // KÄLLA: Gullholmsbaden, egen webbplats — "Restaurangen — Sommarterrass med havsutsikt", a la carte samt hantverkarlunch — https://www.gullholmsbaden.se/?page_id=19 (läst 2026-09-16)
      { name: 'Gullholmsbaden Restaurang', type: 'Restaurang', desc: 'Restaurang på stugbyn Gullholmsbaden med sommarterrass mot havet. Mat lagad från grunden, känd för sin räksmörgås.' },
    ],
    tips: [
      // KÄLLA: Västsverige, "Vandra på Gullholmen och Härmanö" — markerade leder från färjeläget ut i Härmanö naturreservat — https://www.vastsverige.com/en/orust/trails/harmano-hiking-trails/ (läst 2026-09-16)
      'Ta med vandringsskor — härifrån går markerade leder rakt ut i Härmanö naturreservat.',
      // KÄLLA: Västsverige, "Färja Tuvesvik – Gullholmen – Käringön" — parkering vid Tuvesvik betalas med kort eller SMS, kontanter tas inte emot — https://www.vastsverige.com/orust/produkter/farja-tuvesvik-gullholmen-karingon/ (läst 2026-09-16)
      'Parkera vid Tuvesvik och ta färjan över — parkeringen betalas med kort eller SMS, kontanter tas inte emot.',
    ],
    related: ['marstrand', 'karingon', 'orust'],
    tags: ['bohuslän', 'historisk', 'bilfritt', 'fiskeläge', 'fotografi', 'familjer'],
    insiderTips: [
      'De tätaste gränderna hittar du norr om hamnen — gå uppåt längs bergets östsida. Det är inte skyltade, det är bara gränderna.',
    ],
    dog_friendly: true,
    dog_notes: 'Hund tillåten på de flesta platser på ön. Håll koppel i fiskesamhällets gränder.',
    // KÄLLA: Bohusläns museum, Kunskapsbanken "Gullholmen" — äldsta säkra belägg 1588, 24 bofasta 1610, drygt 800 invånare omkring 1910, tio fast bosatta 2010 — https://www.bohuslansmuseum.se/kunskapsbanken_bohuslans_historia/gullholmen/ (läst 2026-09-16)
    did_you_know: 'Det äldsta säkra belägget för bosättning på Gullholmen är från 1588, då två män uppges ha byggt sig bodar på holmen. År 1610 fanns 24 bofasta. Befolkningen var som störst omkring 1910 med drygt 800 invånare — år 2010 var tio personer fast bosatta på själva Gullholmen.',
    amenities: {
      restaurant: true,
      shop: true,
      accommodation: true,
      beach: false,
      camping: false,
    },
    activity_meta: {
      bad: { beaches: ['Klippbad vid Gullholmens norra udde'] },
    },
  },

  // ─── KLÄDESHOLMEN ────────────────────────────────────────────────────────
  {
    slug: 'kladesholmen',
    name: 'Klädesholmen',
    region: 'bohuslan',
    regionLabel: 'Bohuslän',
    emoji: '🐟',
    // KÄLLA: Klädesholmens Samhällsförening, egen webbplats — beskriver ön som "Klädesholmen, solens & sillens ö" — https://kladesholmen.com/ (läst 2026-09-16)
    // KÄLLA: Tjörns kommun, "Tjörn och sillen" — bekräftar att Klädesholmen varit viktig för sillhandeln sedan 1500-talet — https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/tjorn-pa-hosten-och-vintern/tjorn-och-sillen (läst 2026-09-16)
    tagline: 'Sillens och solens ö — 1500-talets sillhandel, Sillebua och bastu i Jungfruviken.',
    description: [
      // KÄLLA: Tjörns kommun, "Tjörn och sillen" — sillhandel sedan 1500-talet, den stora sillperioden på 1700-talet, nästa sillperiod runt 1870, 26 fabriker 1967, tre kvar vid millennieskiftet som gick samman — https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/tjorn-pa-hosten-och-vintern/tjorn-och-sillen ; Tjörns kommun, "Öar runt Tjörn" — ordagrant "Under den stora sillperioden 1747-1808 bodde uppemot 1 000 personer på Klädesholmen" — https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/oar-runt-tjorn (läst 2026-09-16)
      'Klädesholmen har varit en viktig plats för sillhandeln ända sedan 1500-talet. Under den stora sillperioden 1747–1808 bodde uppemot 1 000 personer på ön, och en ny sillperiod kom runt 1870: när sillen gick till kokade det av den i vikarna, och salterier och konservfabriker växte fram längs hamnen. År 1967 fanns 26 fabriker på ön. Vid millennieskiftet återstod tre, som gick samman.',
      // KÄLLA: Klädesholmens Samhällsförening, "Klädesholmens museum – Sillebua" — öppnade 1995 i en gammal konservfabrik, flyttade 2020 till Sillens hus på Strandgatan 12B, visar fisk- och sillberedning från ca 1860, dokumentationsavdelning — https://kladesholmen.com/att-gora/museum/ (läst 2026-09-16)
      'Sillhistorien finns samlad på Sillebua, Klädesholmens museum, som visar öns historia och utveckling med tonvikt på fisk- och sillberedning från omkring 1860 fram till dagens moderna industri. Museet öppnade 1995 i en gammal konservfabrik och flyttade 2020 till Sillens hus på Strandgatan 12B. Där finns också en dokumentationsavdelning med fotografier, film och inspelade intervjuer.',
      // KÄLLA: Salt & Sill, "Vår historia" (verksamhetens egen webbplats) — Sveriges första flytande hotell, sex moduler bogserade till Klädesholmen i juli 2008 på specialtillverkade pontoner, 300 m² konferens- och eventlokaler våren 2013 — https://www.saltosill.se/om-salt-sill/var-historia/ (läst 2026-09-16)
      'I dag är Salt & Sill öns mest kända verksamhet. Restaurangen fick sällskap av Sveriges första flytande hotell — de sex hotellmodulerna bogserades till Klädesholmen i juli 2008, byggda på specialtillverkade pontoner. Våren 2013 tillkom 300 kvadratmeter konferens- och eventlokaler.',
      // KÄLLA: Västsverige/Tjörn, "Klädesholmen" — broförbunden sedan 1983, traditionella vita trähus, gatunamnet Skomakaregatan — https://www.vastsverige.com/en/tjorn/products/kladesholmen/ (läst 2026-09-16)
      'Klädesholmen är broförbundet med Tjörn sedan 1983 och är inte bilfritt. Bebyggelsen består av de traditionella vita trähus som är typiska för bohuslänska fiskesamhällen, och gatorna bär yrkesnamn som Skomakaregatan.',
      // KÄLLA: Västsverige/Tjörn, "Klädesholmen" — bebodd redan på 1200-talet, norsk biskop passerade 1594 och beskrev ön som ett gammalt fiskeläge, drygt 400 invånare 1830, nästan tusen i början av 1900-talet — https://www.vastsverige.com/en/tjorn/products/kladesholmen/ (läst 2026-09-16)
      'Bebyggelsen är tät och gränderna smala. Ön antas ha varit bebodd redan på 1200-talet, och när en norsk biskop passerade 1594 beskrev han den som ett gammalt fiskeläge. År 1830 hade befolkningen sjunkit till drygt 400, för att i början av 1900-talet nå nästan tusen invånare.',
    ],
    // KÄLLA: Klädesholmens Samhällsförening, "Klädesholmens museum – Sillebua" — https://kladesholmen.com/att-gora/museum/ (läst 2026-09-16)
    facts: {
      known_for: 'Sillhistoria och sillindustri, Sillebua museum, Salt & Sill, bastu',
    },
    facts_provenance: {
      known_for: 'matt',
    },
    activities: [
      // KÄLLA: Salt & Sill, "Vår historia" — Sveriges första flytande hotell, sex moduler på pontoner bogserade till ön i juli 2008 — https://www.saltosill.se/om-salt-sill/var-historia/ (läst 2026-09-16)
      { icon: '🍽', name: 'Salt & Sill', desc: 'Restaurang på Klädesholmen med Sveriges första flytande hotell intill — sex hotellmoduler på pontoner, bogserade till ön i juli 2008.' },
      // KÄLLA: Västsverige/Tjörn, "Klädesholmens Bastu" — ligger i Jungfruviken, drivs av Klädesholmens Bastuförening, havsvatten kan pumpas in i badtunnan, bokning via bastuföreningen — https://www.vastsverige.com/en/tjorn/products/kladesholmens-sauna/ (läst 2026-09-16)
      { icon: '🧖', name: 'Havsbastu', desc: 'Klädesholmens bastu ligger i Jungfruviken och drivs av Klädesholmens Bastuförening. Bad i havet direkt från bastun, och havsvatten kan pumpas in i badtunnan. Bokas via bastuföreningen.' },
      // KÄLLA: Klädesholmens Samhällsförening, "Klädesholmens museum – Sillebua" — fisk- och sillberedning från ca 1860, Sillens hus på Strandgatan 12B, flyttade dit 2020 — https://kladesholmen.com/att-gora/museum/ (läst 2026-09-16)
      { icon: '🏛', name: 'Sillebua', desc: 'Klädesholmens museum visar öns fisk- och sillberedning från omkring 1860 fram till i dag. Ligger i Sillens hus på Strandgatan 12B, dit museet flyttade 2020.' },
      // KÄLLA: Västsverige/Tjörn, "House of Herrings" — sillbutik på Klädesholmen — https://www.vastsverige.com/tjorn/produkter/house-of-herrings/ (läst 2026-09-16)
      { icon: '🐟', name: 'House of Herrings', desc: 'Sillbutik på Klädesholmen.' },
    ],
    accommodation: [
      // KÄLLA: Salt & Sill, egen webbplats — "Sveriges första flytande hotell", fyra serveringar och konferens på anläggningen, bastubåt — https://www.saltosill.se/hotell/ och https://www.saltosill.se/aktiviteter/bad-och-bastubaten/ (läst 2026-09-16)
      // KÄLLA: Tjörns kommun, "Äta och bo" — "Salt & Sill — Flytande hotell vid Klädesholmen, en ö med broförbindelse" — https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/ata-och-bo (läst 2026-09-16)
      { name: 'Salt & Sill', type: 'Hotell', desc: 'Flytande hotell vid Klädesholmen, enligt verksamheten "Sveriges första flytande hotell". Fyra serveringar på anläggningen och konferens. Bastubåt finns.' },
    ],
    getting_there: [
      // KÄLLA: Västsverige/Tjörn, "Klädesholmen" — broförbunden med Tjörn genom en bro byggd 1983 — https://www.vastsverige.com/en/tjorn/products/kladesholmen/ (läst 2026-09-16)
      { method: 'Bil via Tjörn', from: 'Stenungsund / Göteborg', desc: 'Klädesholmen är broförbundet med Tjörn sedan 1983. Kör E6 norrut mot Stenungsund, över Tjörnbron och vidare mot Rönnäng, och ta av mot Klädesholmen.', icon: '🚗' },
      { method: 'Västtrafik buss', from: 'Stenungsund', desc: 'Västtrafik trafikerar Tjörn med buss. Sök aktuell resa i Västtrafiks reseplanerare.', icon: '🚌' },
    ],
    transport_meta: {
      from_city_min: 75,
      nearest_hub: 'Stenungsund',
      from_nearest_hub_min: 50,
      operator: 'Väg (broförbunden) + Västtrafik',
      frequency: 'Tillgänglig hela året med bil',
    },
    harbors: [
      // KÄLLA: Klädesholmen Västra Hamn, hamnens egen sida — el (6 A ingår), färskvatten, dusch och toalett samt grillplats, inget drivmedel — https://kladesholmenvh.se/gasthamn/ (läst 2026-09-16)
      // KÄLLA: Västsverige/Tjörn, "Klädesholmens Gästhamn" — 35 platser, dusch, el, livsmedel, restaurang, toalett, sugtömning och miljöstation — https://www.vastsverige.com/tjorn/produkter/kladesholmens-gasthamn/ (läst 2026-09-16)
      // KÄLLA: Tjörns kommun, "Båtliv och hamnar" — listar Klädesholmen bland kommunens gästhamnar — https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/batliv-och-hamnar (läst 2026-09-16)
      { name: 'Klädesholmens Gästhamn', desc: 'Gästhamn i fiskeläget Klädesholmen, 35 platser. El, färskvatten, dusch och toalett. Sugtömning och miljöstation. Gångavstånd till restauranger och livsmedelsbutik.', fuel: false, service: ['Vatten', 'El', 'Dusch', 'Toalett'] },
    ],
    restaurants: [
      // KÄLLA: Salt & Sill, egen webbplats — restaurangen Salt & Sill på Klädesholmen, Tjörn — https://www.saltosill.se/restauranger/ (läst 2026-09-16)
      // KÄLLA: Tjörns kommun, "Äta och bo" — "Salt och Sill — Restaurang på Klädesholmen" — https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/ata-och-bo (läst 2026-09-16)
      { name: 'Salt & Sill', type: 'Restaurang', desc: 'Restaurang på Klädesholmen, del av anläggningen Salt & Sill. Meny med utgångspunkt i havet och öns sillhistoria.' },
      // KÄLLA: Salt & Sill, "Sjöboden" — neapolitansk pizza och skaldjur från lokala fiskare — https://www.saltosill.se/restauranger/sjoboden/ (läst 2026-09-16)
      // KÄLLA: Tjörns kommun, "Äta och bo" — "Sjöboden på Salt och Sill — Restaurang på Salt & Sill som specialiserar sig på pizza" — https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/ata-och-bo (läst 2026-09-16)
      { name: 'Sjöboden på Salt & Sill', type: 'Restaurang', desc: 'Restaurang på Salt & Sill som specialiserar sig på neapolitansk pizza och skaldjur från lokala fiskare. Sommarsäsong.' },
      // KÄLLA: Salt & Sill, "Holmens Kiosk" — https://www.saltosill.se/holmens-kiosk/ (läst 2026-09-16)
      // KÄLLA: Tjörns kommun, "Äta och bo" — "Holmens Kiosk på Klädesholmen för en lättare måltid vid havet" — https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/ata-och-bo (läst 2026-09-16)
      { name: 'Holmens Kiosk', type: 'Kiosk/Café', desc: 'Kiosk vid vattnet på Klädesholmen för en lättare måltid — salt, sött, varmt och kallt.' },
      // KÄLLA: Salt & Sill, egen webbplats — listar Saltbaren som en av fyra serveringar på anläggningen — https://www.saltosill.se/restauranger/ (läst 2026-09-16)
      { name: 'Saltbaren', type: 'Bar', desc: 'Bar på Salt & Sill med utsikt över havet.' },
    ],
    tips: [
      // KÄLLA: Västsverige/Tjörn, "Klädesholmens Bastu" — ligger i Jungfruviken och drivs av Klädesholmens Bastuförening — https://www.vastsverige.com/en/tjorn/products/kladesholmens-sauna/ (läst 2026-09-16)
      'Bastun i Jungfruviken drivs av Klädesholmens Bastuförening och bokas via dem — den hör inte till Salt & Sill.',
      // KÄLLA: Västsverige/Tjörn, "Klädesholmen" — bro byggd 1983 — https://www.vastsverige.com/en/tjorn/products/kladesholmen/ (läst 2026-09-16)
      'Ön är broförbunden sedan 1983 — ingen färja behövs.',
      // KÄLLA: Klädesholmens Samhällsförening, "Klädesholmens museum – Sillebua" — Sillens hus, Strandgatan 12B, sillhistoria från ca 1860 — https://kladesholmen.com/att-gora/museum/ (läst 2026-09-16)
      'Historieintresserade: Sillebua i Sillens hus på Strandgatan 12B samlar öns sillhistoria från omkring 1860 och framåt.',
    ],
    related: ['tjorn', 'orust', 'marstrand'],
    tags: ['mat', 'skaldjur', 'historia', 'bastu', 'romantisk', 'bohuslän'],
    insiderTips: [],
    dog_friendly: true,
    dog_notes: 'Hund välkommen på de flesta platser. Restaurangens uteservering tillåter hundar — fråga personalen.',
    // KÄLLA: Tjörns kommun, "Tjörn och sillen" — sillhandel sedan 1500-talet, den stora sillperioden på 1700-talet, nästa sillperiod runt 1870, 26 fabriker 1967, tre kvar vid millennieskiftet som gick samman — https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/tjorn-pa-hosten-och-vintern/tjorn-och-sillen (läst 2026-09-16)
    did_you_know: 'Sillen har gått till i Bohuslän i återkommande perioder. Klädesholmen var med redan under 1500-talets sillhandel, och den stora sillperioden på 1700-talet följdes av en ny sillperiod runt 1870. År 1967 fanns 26 fabriker på ön — vid millennieskiftet återstod tre, som gick samman.',
    amenities: {
      restaurant: true,
      shop: true,
      accommodation: true,
      beach: false,
      camping: false,
    },
    activity_meta: {
      bad: { beaches: [] },
    },
    seasonal: {
      // REDAKTIONELL BEDÖMNING: fälten nedan är vår egen bedömning, inte öppettider. Ön är broförbunden och tillgänglig året runt.
      open: 'Maj–Oktober (ön är broförbunden och nåbar året runt)',
      peak: 'Juli–Augusti',
      best: 'September eller Oktober',
      bestReason: 'September ger lugnare tempo på ön: bastu i Jungfruviken, stillare hav och plats i gränderna.',
      months: ['off','off','off','off','open','open','peak','peak','open','open','limited','off'],
    },
  },

  // ─── ÅSTOL ───────────────────────────────────────────────────────────────
  {
    slug: 'astol',
    name: 'Åstol',
    region: 'bohuslan',
    regionLabel: 'Bohuslän',
    emoji: '🏚',
    // KÄLLA: Västsverige/Tjörn, "Åstol" — små vita trähus omgivna av kala klippor, smala bilfria gator — https://www.vastsverige.com/en/tjorn/products/astol/ (läst 2026-09-16)
    // KÄLLA: Västsverige/Tjörn, "Bilfria öar" — "en bilfri klippö", "smala gränder mellan vitmålade trähus" — https://www.vastsverige.com/tjorn/se-och-gora/bilfria-oar/ (läst 2026-09-16)
    tagline: 'Bilfri klippö utanför Rönnäng — vita trähus, smala gränder och havet runt om.',
    description: [
      // KÄLLA: Västsverige/Tjörn, "Åstol" — vita trähus mot kala klippor, smala bilfria gator, befolkades vid mitten av 1700-talet under en av de stora sillperioderna, mer än tjugo stora ståltrålare med hemmahamn på Åstol på 1960-talet, fiskeindustri fram till 1970-talet — https://www.vastsverige.com/en/tjorn/products/astol/ (läst 2026-09-16)
      'Åstol är en liten klippö utanför Rönnäng på Tjörn, känd för sina vita trähus omgivna av kala klippor som reser sig ur havet. De smala, bilfria gatorna slingrar sig mellan husen. Ön befolkades först vid mitten av 1700-talet i samband med en av de stora sillperioderna, och fiskeindustrin var huvudnäring fram till 1970-talet — på 1960-talet hade mer än tjugo stora ståltrålare Åstol som hemmahamn.',
      // KÄLLA: Västsverige/Tjörn, "Personfärja Rönnäng – Tjörnekalv – Dyrön – Åstol" — Västtrafiks linje 361 utgår från Rönnängs brygga, cirka en kvart till Åstol, cykel kan tas med — https://www.vastsverige.com/tjorn/produkter/personfarja-ronnang-tjornekalv-dyron-astol/ (läst 2026-09-16)
      'Ön nås med Västtrafiks personfärja linje 361 från Rönnängs brygga på Tjörn. Överfarten tar cirka en kvart. Cykel kan tas med ombord.',
      // KÄLLA: Västsverige/Tjörn, "Åstol" — många flyttade när fisket gick tillbaka på 1970-talet; i dag caféer, uteserveringar, galleri, mataffär och bibliotek — https://www.vastsverige.com/en/tjorn/products/astol/ (läst 2026-09-16)
      // KÄLLA: Åstols Samhällsförening — "Åstols hamn är väl skyddad från de flesta vindar" — https://astol.se/besok-astol/ (läst 2026-09-16)
      'När fisket gick tillbaka på 1970-talet flyttade många från ön, men nya sommarboende har tillkommit sedan dess. I dag finns caféer, uteserveringar, galleri, mataffär och bibliotek på ön, och hamnen är väl skyddad från de flesta vindar.',
      // KÄLLA: Riksantikvarieämbetet, riksintressen Västra Götalands län — "Åstol [O 62] (Rönnäng sn)" — https://www.raa.se/app/uploads/2022/11/V%C3%A4stra-G%C3%B6taland-O_riksintressen.pdf (läst 2026-09-16)
      // KÄLLA: Västsverige/Tjörn, "Åstol" — Klockareudden har en naturlig havsvattenpool med sandbotten och vattenrutschkana — https://www.vastsverige.com/en/tjorn/products/astol/ (läst 2026-09-16)
      'Åstol ingår i riksintresset för kulturmiljövården (O 62) i Rönnängs socken, Tjörns kommun. Badplatsen vid Klockareudden har en naturlig havsvattenpool med sandbotten och vattenrutschkana.',
    ],
    // KÄLLA: Västsverige/Tjörn, "Åstol" — omkring 500 invånare under öns högdagar, vita trähus, bilfritt — https://www.vastsverige.com/en/tjorn/products/astol/ (läst 2026-09-16)
    // KÄLLA: Riksantikvarieämbetet, riksintressen Västra Götalands län — Åstol (O 62) — https://www.raa.se/app/uploads/2022/11/V%C3%A4stra-G%C3%B6taland-O_riksintressen.pdf (läst 2026-09-16)
    facts: {
      population: 'omkring 500 invånare under öns högdagar',
      known_for: 'Bilfritt fiskesamhälle med vita trähus, riksintresse för kulturmiljövården (O 62), Åstols Rökeri',
    },
    facts_provenance: {
      population: 'matt',
      known_for: 'matt',
    },
    activities: [
      // KÄLLA: Västsverige/Tjörn, "Åstol" — vita trähus mot kala klippor — https://www.vastsverige.com/en/tjorn/products/astol/ (läst 2026-09-16)
      // KÄLLA: Riksantikvarieämbetet, riksintressen Västra Götalands län — Åstol (O 62) — https://www.raa.se/app/uploads/2022/11/V%C3%A4stra-G%C3%B6taland-O_riksintressen.pdf (läst 2026-09-16)
      { icon: '📸', name: 'Fotografera bybild', desc: 'Vita trähus tätt mot grå klippor och blått hav — den bebyggelsebild som gett Åstol dess riksintresse för kulturmiljövården.' },
      // KÄLLA: Västsverige/Tjörn, "Åstol" — Klockareudden har en naturlig havsvattenpool med sandbotten och vattenrutschkana — https://www.vastsverige.com/en/tjorn/products/astol/ (läst 2026-09-16)
      { icon: '🏊', name: 'Klippbad', desc: 'Badplatsen vid Klockareudden har en naturlig havsvattenpool med sandbotten och vattenrutschkana.' },
      // KÄLLA: Västsverige/Tjörn, "Åstol" — de smala, bilfria gatorna slingrar sig mellan husen — https://www.vastsverige.com/en/tjorn/products/astol/ (läst 2026-09-16)
      { icon: '🚶', name: 'Promenad runt ön', desc: 'De smala, bilfria gatorna slingrar sig mellan husen — allt på ön nås till fots.' },
      // KÄLLA: Åstols Samhällsförening — hamnen väl skyddad från de flesta vindar, gästhamnsplatser på norra och södra sidan — https://astol.se/besok-astol/ (läst 2026-09-16)
      { icon: '⛵', name: 'Ankra utanför', desc: 'Åstols hamn är väl skyddad från de flesta vindar, och det finns gästhamnsplatser på både norra och södra sidan.' },
      // KÄLLA: Västsverige/Tjörn, "Åstols Rökeri" — fiskrestaurang med eget rökeri och en liten butik, adress Hamnen 4, 471 44 Åstol — https://www.vastsverige.com/en/tjorn/products/astols-rokeri/ (läst 2026-09-16)
      { icon: '🐟', name: 'Åstols Rökeri', desc: 'Fiskrestaurang med eget rökeri och en liten butik, i hamnen.' },
    ],
    accommodation: [],
    getting_there: [
      // KÄLLA: Västsverige/Tjörn, "Personfärja Rönnäng – Tjörnekalv – Dyrön – Åstol" — Västtrafiks linje 361 från Rönnängs brygga, cirka en kvart till Åstol, biljettautomat vid färjeläget, cykel kan tas med — https://www.vastsverige.com/tjorn/produkter/personfarja-ronnang-tjornekalv-dyron-astol/ (läst 2026-09-16)
      // KÄLLA: Åstols Samhällsförening — https://astol.se/besok-astol/ (läst 2026-09-16)
      { method: 'Passagerarfärja från Rönnäng', from: 'Rönnäng (Tjörn)', time: 'ca 15 min', desc: 'Västtrafiks personfärja linje 361 från hållplatsen Rönnängs brygga. Överfarten tar cirka en kvart. Biljettautomat finns vid färjeläget i Rönnäng, och biljett kan också köpas ombord. Cykel kan tas med.', icon: '⛴' },
    ],
    // KÄLLA: Västsverige/Tjörn, "Personfärja Rönnäng – Tjörnekalv – Dyrön – Åstol" — Västtrafiks linje 361, ca en kvart till Åstol — https://www.vastsverige.com/tjorn/produkter/personfarja-ronnang-tjornekalv-dyron-astol/ (läst 2026-09-16)
    transport_meta: {
      from_city_min: 90,
      nearest_hub: 'Rönnäng (Tjörn)',
      from_nearest_hub_min: 15,
      operator: 'Västtrafik / lokal passagerarfärja',
      frequency: 'Se Västtrafiks tidtabell',
    },
    harbors: [
      // KÄLLA: Åstols hamn, hamnens egen sida — vatten april–oktober, el 220 V, dusch och toalett, tvättmaskin och torktumlare, wifi, inget drivmedel — https://www.astolshamn.se/gasthamn/ (läst 2026-09-16)
      // KÄLLA: Västsverige/Tjörn, "Åstols Gästhamn" — 80 platser, el, wifi, färskvatten, båtkran, miljöstation, septisug, dusch, tvättmaskin, torktumlare, WC — https://www.vastsverige.com/tjorn/produkter/astols-gasthamn/ (läst 2026-09-16)
      // KÄLLA: Tjörns kommun, "Båtliv och hamnar" — listar Åstol bland kommunens gästhamnar — https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/batliv-och-hamnar (läst 2026-09-16)
      { name: 'Åstols Gästhamn', desc: 'Gästhamn på Åstol med platser längs norra och södra sidan. Färskvatten, el, dusch och WC, tvättmaskin och torktumlare, miljöstation och sugtömning. Café, restaurang och livsmedelsbutik på ön.', fuel: false, service: ['Vatten', 'El', 'Dusch', 'Toalett', 'Tvättmaskin'] },
    ],
    restaurants: [
      // KÄLLA: Åstols Rökeri, egen webbplats — "mat och musik mitt i havet", adress Hamnen 4, 471 44 Åstol, havsrätter och pizza, regelbundna musikframträdanden — http://www.astolsrokeri.se (läst 2026-09-16)
      // KÄLLA: Tjörns kommun, "Äta och bo" — "Åstols Rökeri — Restaurang på Åstol" — https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/ata-och-bo (läst 2026-09-16)
      { name: 'Åstols Rökeri', type: 'Restaurang', desc: 'Restaurang i hamnen på Åstol med rätter från havet och pizza. Livemusik återkommande under säsong.' },
      // KÄLLA: Tjörns kommun, "Äta och bo" — "Åstols Café — Kafé på Åstol, dit du kommer med personfärja från Rönnäng" — https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/ata-och-bo (läst 2026-09-16)
      { name: 'Åstols Café', type: 'Café', desc: 'Kafé på Åstol, dit man kommer med personfärja från Rönnäng.' },
    ],
    tips: [
      // KÄLLA: Västsverige/Tjörn, "Åstols Rökeri" — fiskrestaurang med eget rökeri och liten butik — https://www.vastsverige.com/en/tjorn/products/astols-rokeri/ (läst 2026-09-16)
      // KÄLLA: Åstols Samhällsförening — café och handelsbod på ön — https://astol.se/besok-astol/ (läst 2026-09-16)
      'Åstols Rökeri i hamnen är en fiskrestaurang med eget rökeri och liten butik. Det finns också café och handelsbod på ön.',
      // KÄLLA: Åstols Samhällsförening — "Flera husägare hyr ut privata boenden" — https://astol.se/besok-astol/ (läst 2026-09-16)
      'Det går att övernatta — flera husägare på Åstol hyr ut privata boenden.',
      // KÄLLA: Åstols Samhällsförening — "Åstols handelsbod är också en välsorterad året-runt-butik" — https://astol.se/besok-astol/ (läst 2026-09-16)
      'Handelsboden på Åstol är en välsorterad året-runt-butik — du behöver inte bära med dig allt.',
    ],
    related: ['tjorn', 'kladesholmen', 'orust'],
    tags: ['bohuslän', 'bilfritt', 'fiskeläge', 'fotografi', 'bad', 'romantisk'],
    insiderTips: [],
    dog_friendly: true,
    dog_notes: 'Hund välkommen på ön. Håll koppel nära de tätbebyggda delarna och byborna.',
    // KÄLLA: Västsverige/Tjörn, "Åstol" — befolkades vid mitten av 1700-talet under en stor sillperiod, omkring 500 invånare under högdagarna, mer än tjugo ståltrålare på 1960-talet, utflyttning på 1970-talet — https://www.vastsverige.com/en/tjorn/products/astol/ (läst 2026-09-16)
    // KÄLLA: Riksantikvarieämbetet, riksintressen Västra Götalands län — Åstol (O 62) — https://www.raa.se/app/uploads/2022/11/V%C3%A4stra-G%C3%B6taland-O_riksintressen.pdf (läst 2026-09-16)
    did_you_know: 'Åstol befolkades först vid mitten av 1700-talet i samband med en av de stora sillperioderna. Under öns högdagar bodde här omkring 500 personer, och på 1960-talet hade mer än tjugo stora ståltrålare Åstol som hemmahamn. När fisket gick tillbaka på 1970-talet flyttade många — men ön är i dag skyddad som riksintresse för kulturmiljövården.',
    amenities: {
      restaurant: true,
      shop: true,
      accommodation: true,
      beach: true,
      camping: false,
    },
    activity_meta: {
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
    // KÄLLA: Västsverige/Tjörn, "Ta färjan till en av Tjörns bilfria öar" — Dyrön som bilfri ö känd för sin storslagna natur, dramatisk skärgårdsmiljö och vilda mufflonfår — https://www.vastsverige.com/tjorn/se-och-gora/bilfria-oar/ (läst 2026-09-16)
    // KÄLLA: Västsverige/Tjörn, "Dyröns Gästhamn, Nord & Sydhamnen" — två gästhamnar — https://www.vastsverige.com/tjorn/produkter/dyrons-gasthamn-nord-sydhamnen/ (läst 2026-09-16)
    tagline: 'Bilfri ö utanför Tjörn — mufflonfår, vandringsleder och två gästhamnar.',
    description: [
      // KÄLLA: Västsverige/Tjörn, "Bilfria öar" — Dyrön som grönskande ö känd för sin storslagna natur, dramatisk skärgårdsmiljö, vilda mufflonfår — https://www.vastsverige.com/tjorn/se-och-gora/bilfria-oar/ (läst 2026-09-16)
      // KÄLLA: Dyrön, "Om Dyrön" — "Ett speciellt inslag är de inplanterade vilda bergsfåren s k mufflonfår", varierat och dramatiskt landskap — https://www.dyron.se/om-dyron/ (läst 2026-09-16)
      'Dyrön är en bilfri ö utanför Tjörn, känd för sin storslagna natur och dramatiska skärgårdsmiljö. Landskapet är varierat: berg och klippterräng med en egenartad berggrundsgeologi. Ett särskilt inslag är de inplanterade vilda bergsfåren, så kallade mufflonfår, som betar på ön.',
      // KÄLLA: Dyrön, "Om Dyrön" — ICA-butik med systembolagsutlämning och postservice, café och pizzeria, våffelcafé med självbetjäning — https://www.dyron.se/om-dyron/ (läst 2026-09-16)
      // KÄLLA: Västsverige/Tjörn, "Bilfria öar" — Dyröns Värdshus (restaurang), Linas Brygga (café), mataffär, Dyröbastun, guldsmed, stugor — https://www.vastsverige.com/tjorn/se-och-gora/bilfria-oar/ (läst 2026-09-16)
      // KÄLLA: Västsverige/Tjörn, "Dyröns Värdshus" — restaurang samt övernattning i sjöbodar vid vattnet — https://www.vastsverige.com/en/tjorn/products/dyrons-vardshus/ (läst 2026-09-16)
      'Ön är bebodd året runt och har mer service än storleken låter ana: ICA-butik med systembolagsutlämning och postservice, café och pizzeria, ett självbetjäningsvåffelcafé, Dyröns Värdshus med restaurang och övernattning i sjöbodar vid vattnet, caféet Linas Brygga, guldsmed och bastu. Däremot inga bilar.',
      // KÄLLA: Tjörns kommun, "Dyröns vandringsleder" — gula leden 5 km och medelsvår, gula brickor på trästolpar, delen Sydhamnen–bastun framkomlig med rullstol och barnvagn, blå leden 1,6 km över bergen från norr till söder, rastplatser, utsikt mot Marstrand, Åstol och Pater Noster, sandstrand på östra sidan — https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/vandra/dyrons-vandringsleder (läst 2026-09-16)
      'På ön går två markerade vandringsleder. Den gula leden är 5 kilometer lång och medelsvår, väl markerad med gula brickor på trästolpar, och sträckan från Sydhamnen fram till bastun är delvis framkomlig med rullstol och barnvagn. Den blå leden är 1,6 kilometer och går över bergen från norr till söder. Längs vägen finns rastplatser med bänkar och bord, utsikt mot bland annat Marstrand, Åstol och Pater Noster-fyren, och på östra sidan en fin sandstrand där man kan rasta och bada.',
      // KÄLLA: Dyrön, "Om Dyrön" — "två badplatser med trampoliner, badstegar och sandstrand samt ett oändligt antal klipphällar" — https://www.dyron.se/om-dyron/ (läst 2026-09-16)
      // KÄLLA: Tjörns kommun, "Dyröns vandringsleder" — stenåldersboplats, bronsåldersröse och Dynes Ravin — https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/vandra/dyrons-vandringsleder (läst 2026-09-16)
      'Dyrön har två badplatser med trampoliner, badstegar och sandstrand, utöver ett oändligt antal klipphällar. Längs vandringslederna finns också fornlämningar: en stenåldersboplats, ett bronsåldersröse och passagen Dynes Ravin.',
      // KÄLLA: Västsverige/Tjörn, "Dyröns Gästhamn, Nord & Sydhamnen" — Nordhamnen 20 platser, Sydhamnen 55 platser, förtöjningssätt, sjömack med diesel, sugtömning, nära till mataffär, Sydhamnen även småbåtshamn för bofasta, färjetrafik från Nordhamnen — https://www.vastsverige.com/tjorn/produkter/dyrons-gasthamn-nord-sydhamnen/ (läst 2026-09-16)
      'Ön har två gästhamnar. Nordhamnen har 20 platser med långsidesförtöjning på hamnens norra sida och akterförtöjning i inloppet; Sydhamnen har 55 platser med fast akterförtöjning och långsides. Båda har sjömack med diesel och sugtömning av latrin, och nära till mataffär. Sydhamnen fungerar både som gästhamn och som småbåtshamn för de bofasta, och från Nordhamnen avgår färjetrafiken.',
    ],
    // KÄLLA: Dyrön, "Om Dyrön" — "runt 160 bofasta", mufflonfår, två badplatser — https://www.dyron.se/om-dyron/ (läst 2026-09-16)
    // KÄLLA: Västsverige/Tjörn, "Dyröns Gästhamn, Nord & Sydhamnen" — två gästhamnar — https://www.vastsverige.com/tjorn/produkter/dyrons-gasthamn-nord-sydhamnen/ (läst 2026-09-16)
    // KÄLLA: Västsverige/Tjörn, "Personfärja Rönnäng – Tjörnekalv – Dyrön – Åstol" — linje 361 trafikerar ön året runt — https://www.vastsverige.com/tjorn/produkter/personfarja-ronnang-tjornekalv-dyron-astol/ (läst 2026-09-16)
    facts: {
      population: 'ca 160 bofasta',
      known_for: 'Bilfritt, mufflonfår, vandringsleder, två gästhamnar, badplatser',
      season: 'Året runt',
      character: 'Bilfritt, vandringsleder, klipplandskap, service året runt',
      best_for: 'Vandring, bad, båtliv',
    },
    facts_provenance: {
      population: 'matt',
      known_for: 'matt',
      season: 'bedomning',
      character: 'bedomning',
      best_for: 'bedomning',
    },
    activities: [
      // KÄLLA: Dyrön, "Om Dyrön" — inplanterade vilda bergsfår, så kallade mufflonfår — https://www.dyron.se/om-dyron/ (läst 2026-09-16)
      // KÄLLA: Västsverige/Tjörn, "Bilfria öar" — vilda mufflonfår på Dyrön — https://www.vastsverige.com/tjorn/se-och-gora/bilfria-oar/ (läst 2026-09-16)
      { icon: '🐏', name: 'Mufflonfår', desc: 'På ön betar inplanterade vilda bergsfår, så kallade mufflonfår.' },
      // KÄLLA: Västsverige/Tjörn, "Bilfria öar" — Dyröbastun — https://www.vastsverige.com/tjorn/se-och-gora/bilfria-oar/ (läst 2026-09-16)
      // KÄLLA: Tjörns kommun, "Dyröns vandringsleder" — leden från Sydhamnen fram till bastun, bastu som kan hyras — https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/vandra/dyrons-vandringsleder (läst 2026-09-16)
      { icon: '🧖', name: 'Bastu', desc: 'Dyröbastun ligger vid Sydhamnen och kan hyras.' },
      // KÄLLA: Dyrön, "Om Dyrön" — två badplatser med trampoliner, badstegar och sandstrand samt ett oändligt antal klipphällar — https://www.dyron.se/om-dyron/ (läst 2026-09-16)
      { icon: '🏊', name: 'Klippbad', desc: 'Två badplatser med trampoliner, badstegar och sandstrand, plus klipphällar runt om ön.' },
      // KÄLLA: Tjörns kommun, "Dyröns vandringsleder" — gula leden 5 km medelsvår, blå leden 1,6 km över bergen, utsikt mot Marstrand, Åstol och Pater Noster — https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/vandra/dyrons-vandringsleder (läst 2026-09-16)
      { icon: '🥾', name: 'Vandring', desc: 'Gula leden, 5 km och medelsvår, och blå leden, 1,6 km över bergen från norr till söder. Utsikt mot Marstrand, Åstol och Pater Noster-fyren.' },
      // KÄLLA: Västsverige/Tjörn, "Dyröns Värdshus" — restaurang med skaldjur, fisk, kött, grönsaker och svamp samt övernattning i sjöbodar vid vattnet, adress Hamnvägen, 471 43 Dyrön — https://www.vastsverige.com/en/tjorn/products/dyrons-vardshus/ (läst 2026-09-16)
      // KÄLLA: Västsverige/Tjörn, "Dyrön" — Dyröns Värdshus ligger i Nordhamnen — https://www.vastsverige.com/en/tjorn/products/dyron/ (läst 2026-09-16)
      { icon: '🍽', name: 'Dyröns Värdshus', desc: 'Restaurang i Nordhamnen med rätter på skaldjur, fisk, kött, grönsaker och svamp, och övernattning i sjöbodar vid vattnet.' },
    ],
    accommodation: [
      // KÄLLA: Dyröns Värdshus, egen webbplats — upp till 12 sjöbodar, plats för upp till 6 personer per bod, pentry, badrum, tvättmaskin, vardagsrum och uteplats — https://dyronsvardshus.se/ (läst 2026-09-16)
      // KÄLLA: Tjörns kommun, "Äta och bo" — "Dyröns Värdshus — Boende i mysiga sjöbodar på Dyrön" — https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/ata-och-bo (läst 2026-09-16)
      { name: 'Dyröns Värdshus', type: 'Sjöbodar', desc: 'Boende i upp till 12 sjöbodar på Dyrön, plats för upp till 6 personer per bod. Varje bod har pentry, badrum, tvättmaskin, vardagsrum och uteplats.' },
    ],
    getting_there: [
      // KÄLLA: Västsverige/Tjörn, "Personfärja Rönnäng – Tjörnekalv – Dyrön – Åstol" — Västtrafiks linje 361 utgår från Rönnängs brygga, 20 minuter till Dyröns norra hamn, biljettautomat vid färjeläget i Rönnäng — https://www.vastsverige.com/tjorn/produkter/personfarja-ronnang-tjornekalv-dyron-astol/ (läst 2026-09-16)
      { method: 'Passagerarfärja från Rönnäng', from: 'Rönnängs brygga (Tjörn)', time: 'ca 20 min', desc: 'Västtrafiks personfärja linje 361 från hållplatsen Rönnängs brygga till Dyröns norra hamn. Biljettautomat finns vid färjeläget i Rönnäng, och biljett kan köpas ombord. Cykel kan tas med.', icon: '⛴' },
      // KÄLLA: Västsverige/Tjörn, "Bilfria öar" — "Färjan från Rönnängs brygga eller Rökan i Kungälv" — https://www.vastsverige.com/tjorn/se-och-gora/bilfria-oar/ (läst 2026-09-16)
      // KÄLLA: Västsverige/Tjörn, "Dyrön" — södra hamnen har förbindelse till Rökan, därifrån buss — https://www.vastsverige.com/en/tjorn/products/dyron/ (läst 2026-09-16)
      { method: 'Båt från Rökan (Kungälv)', from: 'Rökan (Kungälv)', desc: 'Dyrön nås också med båt från Rökan i Kungälv; från Sydhamnen finns förbindelse till Rökan, därifrån buss.', icon: '⛴' },
    ],
    // KÄLLA: Västsverige/Tjörn, "Personfärja Rönnäng – Tjörnekalv – Dyrön – Åstol" — Västtrafiks linje 361 från Rönnängs brygga, 20 minuter till Dyröns norra hamn — https://www.vastsverige.com/tjorn/produkter/personfarja-ronnang-tjornekalv-dyron-astol/ (läst 2026-09-16)
    transport_meta: {
      from_city_min: 90,
      nearest_hub: 'Rönnängs brygga (Tjörn)',
      from_nearest_hub_min: 20,
      operator: 'Västtrafik',
      frequency: 'Se Västtrafiks tidtabell',
    },
    harbors: [
      // KÄLLA: Västsverige/Tjörn, "Dyröns Gästhamn, Nord & Sydhamnen" — Nordhamnen 20 platser långsides på norra sidan och akterförtöjning i inloppet, Sydhamnen 55 platser med fast akterförtöjning och långsides, båda med sjömack/diesel och sugtömning, nära till mataffär, färjetrafik från Nordhamnen — https://www.vastsverige.com/tjorn/produkter/dyrons-gasthamn-nord-sydhamnen/ (läst 2026-09-16)
      // KÄLLA: Tjörns kommun, "Båtliv och hamnar" — listar både Nordhamnen och Sydhamnen som gästhamnar — https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/batliv-och-hamnar (läst 2026-09-16)
      { name: 'Dyrön Nordhamnen', desc: 'Gästhamn med 20 platser, långsides på hamnens norra sida och akterförtöjning i inloppet. Sjömack med diesel, sugtömning av latrin och mataffär i närheten. Härifrån avgår färja till Åstol, Tjörnekalv och Rönnäng.', fuel: true, service: ['Diesel', 'Sugtömning'] },
      { name: 'Dyrön Sydhamnen', desc: 'Gästhamn med 55 platser, fast akterförtöjning och långsides. Fungerar både som gästhamn och småbåtshamn för bofasta. Sjömack med diesel, sugtömning av latrin och mataffär i närheten.', fuel: true, service: ['Diesel', 'Sugtömning'] },
    ],
    restaurants: [
      // KÄLLA: Dyröns Värdshus, egen webbplats — restaurang vid vattnet, adress Hamnvägen, 471 43 Dyrön — https://dyronsvardshus.se/ (läst 2026-09-16)
      // KÄLLA: Tjörns kommun, "Äta och bo" — "Dyröns Värdshus — Restaurang på Dyrön" — https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/ata-och-bo (läst 2026-09-16)
      { name: 'Dyröns Värdshus', type: 'Restaurang', desc: 'Restaurang vid vattnet på Dyrön med mat inspirerad av havet och lokala råvaror från Bohuslän. Uteservering och livemusik under sommaren.' },
      // KÄLLA: Linas Brygga, egen webbplats — kafé i Södra Hamnen, 47114 Dyrön — https://linasbrygga.se/ (läst 2026-09-16)
      // KÄLLA: Tjörns kommun, "Äta och bo" — listar Linas Brygga under både Kaféer och Restauranger — https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/ata-och-bo (läst 2026-09-16)
      { name: 'Linas Brygga', type: 'Café', desc: 'Kafé i Sydhamnen på Dyrön. Glass, räksmörgås, fish and chips, sallader och hembakat. Hit tar du dig med personfärja från Rönnäng.' },
      // KÄLLA: Tjörns kommun, "Äta och bo" — "Dyrön Cafe & Kiosk" med uteservering i Sydhamnen under sommaren — https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/ata-och-bo (läst 2026-09-16)
      { name: 'Dyrön Cafe & Kiosk', type: 'Kiosk/Café', desc: 'Kiosk och café med uteservering i Sydhamnen på Dyrön under sommaren. Hit tar du dig med personfärja från Rönnäng.' },
    ],
    tips: [
      // KÄLLA: Dyrön, "Om Dyrön" — ICA-butik med systembolagsutlämning och postservice, café och pizzeria — https://www.dyron.se/om-dyron/ (läst 2026-09-16)
      'Du behöver inte bära med dig maten — ön har en ICA-butik med systembolagsutlämning och postservice, café och pizzeria.',
      // KÄLLA: Tjörns kommun, "Dyröns vandringsleder" — gula leden 5 km och medelsvår, blå leden 1,6 km över bergen — https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/vandra/dyrons-vandringsleder (läst 2026-09-16)
      'Gula leden runt ön är 5 km och klassas som medelsvår; blå leden över bergen är 1,6 km.',
      // KÄLLA: Tjörns kommun, "Dyröns vandringsleder" — delen från Sydhamnen fram till bastun är framkomlig med rullstol och barnvagn — https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/vandra/dyrons-vandringsleder (läst 2026-09-16)
      'Delen av gula leden från Sydhamnen fram till bastun går att ta sig fram på med rullstol och barnvagn.',
      // KÄLLA: Dyrön, "Om Dyrön" — inplanterade vilda bergsfår, så kallade mufflonfår — https://www.dyron.se/om-dyron/ (läst 2026-09-16)
      'Håll utkik efter mufflonfåren — de inplanterade vilda bergsfåren betar fritt på ön.',
    ],
    related: ['astol', 'kladesholmen', 'tjorn'],
    tags: ['bilfritt', 'klippor', 'natur', 'bohuslän', 'vandring'],
    // KÄLLA: Tjörns kommun, "Dyröns vandringsleder" — stenåldersboplats, bronsåldersröse, Dynes Ravin och mufflonfår längs lederna — https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/vandra/dyrons-vandringsleder (läst 2026-09-16)
    // KÄLLA: Dyrön, "Om Dyrön" — inplanterade vilda bergsfår, så kallade mufflonfår — https://www.dyron.se/om-dyron/ (läst 2026-09-16)
    did_you_know: 'Dyrön har spår av mycket lång bosättning — längs öns vandringsleder finns en stenåldersboplats, ett bronsåldersröse och passagen Dynes Ravin. I dag betar inplanterade vilda bergsfår, mufflonfår, på ön.',
    amenities: { restaurant: true, shop: true, accommodation: true, beach: true, camping: false },
    activity_meta: {
      // KÄLLA: Dyrön, "Om Dyrön" — två badplatser med trampoliner, badstegar och sandstrand — https://www.dyron.se/om-dyron/ (läst 2026-09-16)
      // KÄLLA: Tjörns kommun, "Dyröns vandringsleder" — fin sandstrand på östra sidan — https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/vandra/dyrons-vandringsleder (läst 2026-09-16)
      bad: { beaches: ['Två badplatser med trampoliner, badstegar och sandstrand', 'Sandstrand på öns östra sida'] },
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
