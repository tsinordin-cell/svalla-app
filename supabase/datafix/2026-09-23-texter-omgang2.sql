-- 2026-09-23, omgång 2 av platser utan text (101 poster, ingen av dem hade Google-klick senaste 3 mån).
-- Citat kontrollerade i renderad källsida 2026-09-23. Bara det källan säger; inga värdeord, priser eller öppettider.
-- Resultat: 16 får text, 5 får rätt typ (fyra av dem får också text), 1 döljs. Övriga lämnas utan text (ingen tillåten källa eller källan blockerad).

-- havochvatten.se …/badplatser-i-lysekils-kommun/gullmarsbaden.html: "Badplatsen erbjuder badbrygga och sandstrand.", "Vattentyp: Hav"
update restaurants set description = 'Gullmarsbaden är en havsbadplats i Lysekils kommun med badbrygga och sandstrand.',
  updated_at = now() where slug = 'gullmarsbaden' and description is null;
-- havochvatten.se …/klyftan.html: "Badplatsen erbjuder badbryggor och sandstrand. Bajamajor finns på badplatsen.", "Vattentyp: Hav"
update restaurants set name = 'Klyftan',
  description = 'Klyftan är en havsbadplats i Lysekils kommun med badbryggor och sandstrand. Bajamajor finns på badplatsen.',
  updated_at = now() where slug = 'badplats-klyftan' and description is null;
-- havochvatten.se …/badplatser-i-varmdo-kommun/grills.html: "Havsbad med sandstrand vid Grisslingefjärden på östra Farstalandet."
update restaurants set description = 'Grills havsbad har sandstrand och ligger vid Grisslingefjärden på östra Farstalandet i Värmdö kommun.',
  updated_at = now() where slug = 'grills-havsbad' and description is null;
-- visitvarmdo.com (Björkviks havsbad): "a mixture of both rocky waters edge and sandy beaches", "Ingaröfjärden on the south of the island of Ingarö",
-- "have a composting toilet and litter bins". Namnet stavades fel i posten ("Björviks").
update restaurants set name = 'Björkviks havsbad', island = 'Ingarö',
  description = 'Björkviks havsbad ligger vid Ingaröfjärden på södra Ingarö, med både klippor och sandstrand. Här finns komposttoalett och papperskorgar.',
  updated_at = now() where slug = 'bjorviks-havsbad' and description is null;
-- havochvatten.se: "Sörkilen, Ellös badplats är en badplats i Orust kommun."; orust.se: "Ellös badplats, Sörkilen"
update restaurants set name = 'Ellös badplats, Sörkilen',
  description = 'Ellös badplats ligger vid Sörkilen och är en av Orust kommuns badplatser.',
  updated_at = now() where slug = 'ellos-badplats' and description is null;
-- gustafsberg.se/om-gustafsberg/sveriges-aldsta-badort/: "Sveriges äldsta badort", "…började man på 1780-talet komplettera brunnsdrickandet med salta bad"
update restaurants set description = 'Gustafsberg utanför Uddevalla kallar sig Sveriges äldsta badort. På 1780-talet började man här komplettera brunnsdrickandet med salta bad.',
  updated_at = now() where slug = 'gustavsberg' and description is null;
-- havochvatten.se …/badplatser-pa-gotland/visby-havsbad.html: "Visby Havsbad är ett EU-bad. Visby havsbad, även kallat Kallbadhuset,
-- ligger i anslutning till Visby hamn och nära stadsparken Almedalen." Läge 57.6409 N 18.2868 E (posten ca 90 m därifrån). Var registrerad som restaurang.
update restaurants set name = 'Visby havsbad', type = 'beach',
  description = 'Visby havsbad, även kallat Kallbadhuset, är ett EU-bad i anslutning till Visby hamn, nära stadsparken Almedalen.',
  updated_at = now() where slug = 'visby-strandbad-gotland' and description is null;
-- naturvardsverket.se (Hitta till naturum): "Naturum Ottenby ligger i naturreservatet Ottenby på Ölands södra udde.
-- Ottenby är välkänt för de många fåglar som flyttar förbi vår och höst". Var registrerad som restaurang.
update restaurants set type = 'nature',
  description = 'Naturum Ottenby ligger i naturreservatet Ottenby på Ölands södra udde, där många flyttfåglar passerar vår och höst.',
  updated_at = now() where slug = 'naturum-ottenby-oland' and description is null;
-- borgholm.se/byxelkroks-hamn/: kommunens hamnsida (Hamnar: "… Byxelkroks hamn …"). Var registrerad som restaurang. Ingen text.
update restaurants set type = 'harbor', updated_at = now() where slug = 'byxelkroks-hamn-oland' and type = 'restaurant';
-- strawberry.se (egen kedja): "212 rum samt en inomhuspool", "Friheten Bistro & Bar, Kaptenshuset och Vinterträdgården". Hotell, inte restaurang.
update restaurants set type = 'hotel',
  description = 'Clarion Hotel Wisby är ett hotell i Visby med 212 rum och inomhuspool. I hotellet finns bland annat Friheten Bistro & Bar och Kaptenshuset.',
  updated_at = now() where slug = 'clarion-hotel-wisby-gotland' and description is null;
-- clemenshotell.se: "boende centralt i Visby Innerstad med gångavstånd till restauranger, kultur, sevärdheter". Hotell, inte restaurang.
update restaurants set type = 'hotel',
  description = 'Hotell S:t Clemens ligger i Visby innerstad, på gångavstånd till restauranger och sevärdheter.',
  updated_at = now() where slug = 'hotell-s-t-clemens-gotland' and description is null;
-- vastsverige.com/en/kungalv/products/arnell-marstrand/: "Bohuslän cuisine by the dock", "Maggan's fish soup to Oskar II shrimp sandwiches",
-- "there are also some live performances happening at the dock", "Hamngatan 7 442 67 Marstrand"
update restaurants set name = 'Arnell på kajen',
  description = 'Arnell på kajen är en restaurang vid kajen på Hamngatan 7 i Marstrand med bohuslänsk mat, från fisksoppa till räksmörgås. Vissa sommarkvällar är det liveframträdanden på kajen.',
  updated_at = now() where slug = 'arnell-pa-kajen' and description is null;
-- explorearchipelago.com …/uto/bakgarden-uto: "The Bakgården bakery sells bread and pastries. During the summer we have a café.", "Bygatan, 130 56 Utö"
update restaurants set description = 'Bakgården på Bygatan på Utö är ett bageri som säljer bröd och bakverk. Under sommaren finns också ett kafé.',
  updated_at = now() where slug = 'bakgarden-uto' and description is null;
-- vastsverige.com/en/lysekil/produkter/villa-solviken/: "a distinguished hotel and restaurant located in the heart of Lysekil, close to both the sea and the town's amenities"
update restaurants set name = 'Villa Solviken',
  description = 'Villa Solviken är ett hotell med restaurang i centrala Lysekil, nära havet.',
  updated_at = now() where slug = 'restaurang-villa-solviken' and description is null;
-- vastsverige.com/tanum/produkter/sandbunkern-bistro--deli/: "placerat i vårat klubbhus uppe på berget. Med utsikt över hål 18:s green",
-- "serverar vällagad husmanskost", "Under hela året kan ni beställa cateringar från oss", "Sandbunkern Bistro & Deli Långö Rörvikarna 1 45741 Fjällbacka Telefon: 00735114459" (samma telefon som posten)
update restaurants set name = 'Sandbunkern Bistro & Deli',
  description = 'Sandbunkern Bistro & Deli ligger i golfklubbens klubbhus vid Långö Rörvikarna utanför Fjällbacka, med utsikt över green på hål 18. Restaurangen serverar husmanskost och tar emot cateringbeställningar året runt.',
  updated_at = now() where slug = 'sandbunker-bistro-catering' and description is null;
-- vastsverige.com (restaurangguide Göteborgs skärgård): "Thai Corner Öckerö hamnplan"
update restaurants set description = 'Thai Corner är en restaurang vid hamnplan på Öckerö.',
  updated_at = now() where slug = 'thai-corner-ockero' and description is null;
-- gsf.gardsnas.se: "Gärdsnäs är ett fritidsområde i Länna Socken i Södra Roslagen i närheten av Bergshamra", "Vedbastun är tillgänglig för Bastuföreningens medlemmar"
update restaurants set endast_medlemmar = true,
  description = 'Gärdsnäs är ett fritidsområde i Länna socken i södra Roslagen, nära Bergshamra. Vedbastun är till för bastuföreningens medlemmar.',
  updated_at = now() where slug = 'gardsnas-bastuklubb' and description is null;
-- musselbaren.se: "En foodtruck och mobil musselbar som rör sig i Västsverige." Ingen fast plats, så en kartnål är fel.
update restaurants set hidden_at = now(), hidden_reason = 'Mobil foodtruck utan fast plats ("En foodtruck och mobil musselbar som rör sig i Västsverige.", musselbaren.se)'
  where slug = 'musselbaren-on-the-road-bohuslan' and hidden_at is null;
