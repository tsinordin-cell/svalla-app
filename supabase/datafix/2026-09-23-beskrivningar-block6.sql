-- 2026-09-23: beskrivningar block 6 — platser utan egen användbar webbplats.
--
-- Källor: regional turistorganisation (vastsverige.com, gotland.com, oland.se, visitaland.com), Skärgårdsstiftelsen
-- eller verksamhetens egen webbplats. Citat kontrollerade mot ny hämtning (Playwright textContent, 2026-09-23).
-- Två namn rättade där källan visar nytt namn.

-- KÄLLA: https://barbuco.se/
--   "En underbar och smått kaotisk oas mitt i Hästbacken."
--   "En stökig bakgata i Visby där man nästan förväntar sig att personalen ska sjunga opera."
--   Avvikelse: Namnbyte: verksamheten heter Bar Buco, inte Big Buco som i listan; lokalen på Hästbacken/Hästgatan 2 i Visby drevs tidigare som Vinäger.
update restaurants set description = 'Bar Buco är en restaurang och bar på Hästbacken i Visby. Verksamheten är uppdelad i matsal, vinbar och gård, och erbjuder även klubbverksamhet med musik för alla åldrar.', name = 'Bar Buco', updated_at = now() where slug = 'big-buco-gotland' and description is null and hidden_at is null;

-- KÄLLA: https://book.visitaland.com/en/degersand-beach-eckero
--   "The generous beach at Degersand with its soft sand and glimmering waves makes for a true summer experience."
--   "This shallow edge of the Åland Sea invites adults and children alike for a swim."
update restaurants set description = 'Degersand är en sandstrand belägen i Eckerö på Åland. Stranden har mjuk sand och en grund vattenkant mot Ålands hav, vilket gör det möjligt för både vuxna och barn att bada nära land.', updated_at = now() where slug = 'degersand' and description is null and hidden_at is null;

-- KÄLLA: https://skargardsstiftelsen.se/omraden/gallno-karklo/
--   "I Gällnö by finns flera alternativ för både mat och övernattning."
--   "Kommer du med egen båt finns flera naturhamnar runt ön."
--   Avvikelse: Oklart om koordinaterna avser den specifika bryggan vid Gällnö by eller angöringen vid Gällnö Söderby (dit Waxholmsbolaget trafikerar); källorna beskriver ön/byn i allmänhet, inte en namngiven 'Gällnö brygga'.
update restaurants set description = 'Gällnö ligger i Stockholms mellanskärgård mellan Värmdö och Möja. I Gällnö by finns Gällnö krog med restaurang, handelsbod och vandrarhem med stugor, och den som kommer med egen båt hittar flera naturhamnar runt ön.', updated_at = now() where slug = 'gallno-brygga' and description is null and hidden_at is null;

-- KÄLLA: https://gotland.com/companies/roma-kungsgard/
--   "År 1733 uppfördes den huvudbyggnad med två flyglar i putsad kalksten som fortfarande står kvar i dag."
--   "Efter cirka 50 år i Försvarsmaktens tjänst har platsen under de senaste 40 åren utvecklats till en viktig kulturmötesplats."
update restaurants set description = 'Roma Kungsgård i Roma socken på Gotland har anor från 900-talet då platsen brukades som allting och marknadsplats, och blev på 1100-talet ett cistercienskloster. Huvudbyggnaden uppfördes 1733 i putsad kalksten med två flyglar. Idag är platsen en kulturmötesplats med galleri, utställningar, butiker och café.', updated_at = now() where slug = 'roma-kungsgard-gotland' and description is null and hidden_at is null;

-- KÄLLA: https://www.vastsverige.com/en/tjorn/products/astols-rokeri/
--   "Åstols Rökeri (Åstols Smokery) is a fish restaurant with its own smokery and a small shop."
--   "On this unique skerry island you will find the restaurant Åstols Rökeri which is recommended by the leading restaurant guide in the Nordic countries"
update restaurants set description = 'Åstols Rökeri ligger på ön Åstol i Tjörns skärgård och är en fiskrestaurang med eget rökeri och en liten butik. Restaurangen serverar bland annat sjömatsbuffé och räkrätter, och tar emot dagkonferenser. Under sommaren arrangeras musikeftermiddagar vid norra kajen samt guidade vandringar på ön.', updated_at = now() where slug = 'astols-rokeri-bohuslan' and description is null and hidden_at is null;

-- KÄLLA: https://www.vastsverige.com/sotenas/produkter/brs-lilla-horna/
--   "Mitt i kustsamhället finner du Bröderna Samuelssons Fiskbutik & Lilla Hörna, en uppskattad mötesplats för dig som älskar havets läckerheter."
--   "BrS Lilla Hörna kan besökare slå sig ner och njuta av nygjorda fisk- och skaldjursrätter, smörgåsar och andra delikatesser inspirerade av havet."
update restaurants set description = 'BrS Lilla Hörna ligger i Smögen, vägg i vägg med Bröderna Samuelssons fiskbutik. Restaurangen serverar nygjorda fisk- och skaldjursrätter samt smörgåsar och andra delikatesser med inspiration från havet, och passar för lunch eller fika.', updated_at = now() where slug = 'brs-lilla-horna' and description is null and hidden_at is null;

-- KÄLLA: https://www.grannas.ax/sv/bistro
--   "I Grannas Bistro kan du äta lunch eller middag, fika eller bara njuta av utsikten över en av våra äppelträdgårdar."
--   "Hos Grannas fanns det tidigare en konservanläggning som producerade och sålde kryddgurka i hela Finland."
update restaurants set description = 'Grannas Bistro finns i Västanträsk på Tjudö, Åland, i en ombyggd konservfabrik som tidigare producerade och sålde kryddgurka i hela Finland. I bistron kan gäster äta lunch eller middag, fika eller ta del av utsikten över äppelträdgårdarna på gården.', updated_at = now() where slug = 'grannas-bistro-aland' and description is null and hidden_at is null;

-- KÄLLA: https://gotland.com/companies/creperie-tati-pa-kutens-bensin/
--   "Kravmärkt crêperie på Fårö med crêpes och galettes tillagade av franska crêpiers från Bretagne."
--   "Crêperie Tati på Kutens Bensin"
update restaurants set description = 'Crêperie Tati är en kravmärkt crêperie på Fårö, belägen vid Kutens Bensin. Verksamheten serverar crêpes och galettes tillagade av franska crêpiers från Bretagne.', updated_at = now() where slug = 'creperie-tati-gotland' and description is null and hidden_at is null;

-- KÄLLA: https://www.vastsverige.com/en/tanum/produkter/snar-bar/
--   "Snar Bar is part of Fjällbacka Fish Shop and, as you might guess, serves delicacies from the sea"
--   "Enjoy classic fish and chips—or oysters, if they're on the menu."
update restaurants set description = 'Snar Bar ligger på Norra Hamngatan 10 i Fjällbacka och är en del av Fjällbacka Fish Shop. Verksamheten serverar sjömat, bland annat fish and chips och ibland ostron. Utbudet varierar beroende på vad som finns tillgängligt i fiskaffären för dagen.', updated_at = now() where slug = 'snar-bar' and description is null and hidden_at is null;

-- KÄLLA: https://www.oland.se/ebbas-sea
--   "Utöver en underbar service, får du som gäst även en fantastiskt vacker utsikt över Borgholms hamn."
--   "Förutom fantastiska hamburgare gjorda på närproducerade råvaror har du tillgång till goda, svalkande och fräscha drinkar gjorda av duktiga och serviceinriktade bartenders."
--   Avvikelse: Namnbyte: verksamheten heter numera 'Ebbas by the sea', inte 'Nya Ebbas Restaurang' (källa: oland.se).
update restaurants set description = 'Ebbas by the sea, tidigare Nya Ebbas Restaurang, är en restaurang belägen vid Borgholms hamn på Öland. Den serverar hamburgare gjorda på närproducerade råvaror samt drinkar, och gästerna har utsikt över hamnen.', name = 'Ebbas by the sea', updated_at = now() where slug = 'nya-ebbas-restaurang-oland' and description is null and hidden_at is null;

-- KÄLLA: https://www.vastsverige.com/visitockero/produkter/ockero-hamncafe/
--   "Vid vattnet i Öckerö hamn ligger denna pärla."
--   "Räksmörgås, frukost, dagens lunch och café."
update restaurants set description = 'Öckerö Hamncafé ligger vid vattnet i Öckerö hamn i Göteborgs skärgård. Caféet erbjuder plats både inomhus och utomhus med utsikt över vattnet och serverar räksmörgås, frukost, dagens lunch och café.', updated_at = now() where slug = 'ockero-hamncaf' and description is null and hidden_at is null;

-- KÄLLA: https://www.vastsverige.com/sotenas/produkter/calmars-veranda/
--   "Maten är vällagad och på menyn finns något för alla."
--   "gångavstånd till affärer, badplatser och turbåtar"
update restaurants set description = 'Calmars Veranda är en restaurang belägen på Hotellgatan 8 i centrala Kungshamn. Verksamheten erbjuder mat och dryck med både inomhus- och utomhusservering, samt gångavstånd till affärer, badplatser och turbåtar.', updated_at = now() where slug = 'calmars-veranda' and description is null and hidden_at is null;

-- KÄLLA: https://www.oland.se/en/lottorps-conditori
--   "A traditional bakery and confectionery on Northern Öland"
--   "which offers all sorts of pastries, cakes and bread"
--   Avvikelse: Källan (oland.se) beskriver endast en konditori/bageri under namnet 'Löttorps Konditori'; ingen uppgift om restaurang- eller bardelen i det fullständiga namnet hittades.
update restaurants set description = 'Löttorps Konditori är ett traditionellt bageri och konditori på norra Öland, med adress Stationsvägen 2 i Löttorp. Verksamheten erbjuder bakverk, tårtor och bröd av olika slag.', updated_at = now() where slug = 'lottorps-restaurang-och-bar-samt-konditori-oland' and description is null and hidden_at is null;

-- KÄLLA: https://www.vastsverige.com/kungalv/produkter/marstands-wardshus/
--   "Mitt på kajen hittar du Marstrands Wärdshus, västkustens skaldjurspärla i rustika lokaler"
--   "En stor uteservering med utsikt över hamninloppet gör Wärdshuset till Marstrands absolut vackraste plats för både lunch och middagsservering"
update restaurants set description = 'Marstrands Wärdshus ligger mitt på kajen i Marstrand, på Marstrandsön. Restaurangen har en uteservering med utsikt över hamninloppet och serverar lunch och middag med inriktning på skaldjur.', updated_at = now() where slug = 'marstrands-vardshus' and description is null and hidden_at is null;

-- KÄLLA: https://www.vastsverige.com/kungalv/produkter/restaurang-tenan/
--   "I vår restaurang Grand Tenan, serveras uppskattade klassiker som Oxfilé Africana och Tenans vitlöksdoftande gratinerade havskräftor."
--   "Verandan, med härlig utsikt ner mot hamnen, har plats för 100 gäster."
--   Avvikelse: Tidigare granskning hittade bara cookie-information på grandmarstrand.se; en dedikerad produktsida med beskrivande text finns dock på vastsverige.com.
update restaurants set description = 'Restaurang Tenan är en del av Grand Hotel Marstrand och har en veranda med utsikt över hamnen, med plats för 100 gäster. Menyn omfattar bland annat oxfilé och vitlöksdoftande gratinerade havskräftor, och restaurangen har uppmärksammats av White Guide. Till anläggningen hör även puben Bakfickan, i en seglarmiljö.', updated_at = now() where slug = 'tenan-marstrand' and description is null and hidden_at is null;

-- KÄLLA: https://www.vastsverige.com/stromstad/produkter/kosters-rokeri/
--   "Fisk- och skaldjursrestaurang med sommaröppen fiskbutik belägen alldeles vid havet och bredvid Naturum Kosterhavet på Sydkoster, Ekenäs brygga."
--   "Restaurangen ligger alldeles intill havet."
update restaurants set description = 'Kosters Rökeri är en fisk- och skaldjursrestaurang på Sydkoster, belägen vid Ekenäs brygga alldeles vid havet, nära Naturum Kosterhavet. Verksamheten har även en fiskbutik med sommaröppettider som säljer fisk och skaldjur. Restaurangen tar emot sällskap för bland annat födelsedagar och konferenser.', updated_at = now() where slug = 'kosters-rokeri' and description is null and hidden_at is null;

-- KÄLLA: https://www.vastsverige.com/orust/produkter/mollosunds-gasthamn/
--   "Mollösund är ett gammalt genuint fiskesamhälle beläget på sydvästspetsen av Orust."
--   "Sugtömningsstation där fritidsbåtar kan tömma sin latrintank"
update restaurants set description = 'Sjömacken i Mollösund ligger vid gästhamnen på sydvästspetsen av Orust, ett gammalt fiskesamhälle. Vid hamnen finns tillgång till bensin och diesel för fritidsbåtar, samt en sugtömningsstation för latrintankar. I området finns även matvaruaffär och restaurang/café.', updated_at = now() where slug = 'sjomacken-mollosund' and description is null and hidden_at is null;

-- KÄLLA: https://www.musselbaren.se/
--   "På Smögen är Musselbaren & Klevens tre kök, fyra olika kök bestående av Musselbaren, Pizzabistron, Svärds kök samt Sött & Salt."
--   "Kleven, eller Holmen som området kallas i folkmun, var också platsen där det anrika Magasinet fanns fram till 80-talet."
update restaurants set description = 'Musselbaren på Kleven ligger på bryggan i Smögen, på den plats där tidigare Magasinet låg fram till 1980-talet. Restaurangen ingår i restaurangkomplexet Klevens tre kök, som även omfattar Pizzabistron, Svärds kök samt Sött & Salt.', updated_at = now() where slug = 'musselbaren-pa-kleven-bohuslan' and description is null and hidden_at is null;

-- KÄLLA: https://www.vastsverige.com/stromstad/produkter/gostases/
--   "En fisk- och skaldjursrestaurang där du kan avnjuta allt från en enkel räksmörgås eller en mustig fiskgryta."
--   "Sommartid bjuds det på musikunderhållning av band och trubadurer."
update restaurants set description = 'Göstases är en fisk- och skaldjursrestaurang belägen vid Strömstads gästhamn. Utbudet sträcker sig från enklare rätter som räksmörgås till fiskgryta. Sommartid arrangeras musikunderhållning med band och trubadurer på restaurangen.', updated_at = now() where slug = 'gostases' and description is null and hidden_at is null;
