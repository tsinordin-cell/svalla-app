-- 2026-09-22: beskrivningar för de sista hamnarna utan text (block 3) + rättelser.
--
-- Samma regler som block 1–2: bara tillåtna källor, varje citat kontrollerat mot en ny hämtning
-- av källsidan (Playwright textContent, 2026-09-22; Norrtäljes bryggplan via pdftotext).
-- Inga priser, tider eller telefonnummer. Bara rader utan beskrivning får text.
--
-- Hoppade (ingen tillåten källa gick att läsa eller verifiera): asattra-marina, forsvarsplats-lysekil-hamn,
-- gallno-brygga, gasthamn, graddo-askens-bryggforening, hamn, hamnen-kapellskar-ankommande (källan 404),
-- kalvhagens-bryggforening, langviks-yttre-gasthamn, loknasudds-gard-och-marina-ab, radmanby-hamn,
-- sand-namdo-brygga, singo-battaxi, sodersunda-brygga, tjusviks-hamn, guldbadans-batklubb,
-- nasselvikens-batklubb, lacka-nynashamns-segelsallskap (källan svarar 502).

-- KÄLLA: https://www.haninge.se/bygga-trafik-och-miljo/trafik-och-gator/buss-bat-och-tag/hamnverksamhet/
--   "Dalarö hamn sköts av kommunen."
--   "Det är en levande hamn eftersom en stor del av Haninges skärgårdsbefolkning har kontakt med fastlandet via denna hamn."
--   "Där finns cirka 20 gästhamnsplatser."
--   "Avgift betalar du till hamnkontoret, som ligger väster om macken."
update restaurants set description = 'Dalarö hamn sköts av Haninge kommun och är en levande hamn, eftersom en stor del av Haninges skärgårdsbefolkning har kontakt med fastlandet via den. Här finns cirka 20 gästhamnsplatser, och avgiften betalas till hamnkontoret som ligger väster om macken.', updated_at = now() where slug = 'dalaro-hamn' and description is null;
--   "Vid Fiskarhamnen finns 78 bryggplatser för yrkes- och fritidsbåtar och 15 landplatser för fritidsbåtar i Dalarö."
--   "Det finns tre olika perioder för uthyrning; sommar, vinter eller året runt."
--   "kön till båtplatser indelad i olika prioriteringskategorier"
update restaurants set description = 'Vid Fiskarhamnen i Dalarö finns 78 bryggplatser för yrkes- och fritidsbåtar och 15 landplatser för fritidsbåtar. Båtplatserna hyrs ut av Haninge kommun för sommar, vinter eller året runt och fördelas via en kö med prioriteringskategorier.', updated_at = now() where slug = 'dalaro-gasthamn-fiskarhamnen' and description is null;

-- Ö-fält: båda Dalarö-hamnarna stod på "Ornö". Koordinaterna (59.1296, 18.4053 resp. 59.1351, 18.4021)
-- ligger i Dalarö, och Askfatshamnens egen beskrivning säger "på Dalarös sydvästra sida".
update restaurants set island = 'Dalarö', updated_at = now() where slug in ('dalaro-hamn', 'dalaro-turistbyra-och-gasthamn-askfatshamnen') and island = 'Ornö';

-- KÄLLA: https://www.vaxholm.se/trafik--infrastruktur/hamnar-kajer-och-batplatser/kommunala-batplatser
--   "Kommunmedlemmar erbjuds att stå i den kommunala båtplatskön och ledig plats förmedlas av tekniska enheten."
--   "Kommunala småbåtshamnar för privatpersoner"
--   "Lilla Skutviken, Roddaregatan"
--   "Norrhamnen, Fiskaregatan - Norrhamnsplan"
update restaurants set description = 'Lilla Skutviken vid Roddaregatan är en av Vaxholms stads kommunala småbåtshamnar för privatpersoner. Båtplatserna förmedlas av tekniska enheten till kommunmedlemmar som står i den kommunala båtplatskön.', updated_at = now() where slug = 'lilla-skutviken' and description is null;
update restaurants set description = 'Norrhamnen vid Fiskaregatan och Norrhamnsplan är en av Vaxholms stads kommunala småbåtshamnar för privatpersoner. Båtplatserna förmedlas av tekniska enheten till kommunmedlemmar som står i den kommunala båtplatskön.', updated_at = now() where slug = 'norrhamnen' and description is null;

-- KÄLLA: https://resaromarina.se/
--   "Resarö Marina ligger strax utanför Vaxholm"
--   "Här möts farlederna in till Stockholm och här är havsbandet inom räckhåll."
--   "Anläggningen är med pontoner i helbetong med y-bom på samtliga platser och med el och vatten."
--   "Max storlek på båt är ca 33 fot."
-- Ö-fält: punkten ligger 190 m från Resarö båtklubbs Ytterbygård, som klubbens egen sida placerar
-- "på södra Resarö, strax efter Resarö Marina".
update restaurants set description = 'Resarö Marina ligger strax utanför Vaxholm, där farlederna in till Stockholm möts. Anläggningen har pontoner i helbetong med y-bom, el och vatten på samtliga platser, och båtarna får vara högst cirka 33 fot.', island = 'Resarö', updated_at = now() where slug = 'resaro-marina' and description is null;

-- KÄLLA: https://www.vastsverige.com/tjorn/produkter/ronnang/
--   "Vid Rönnängs brygga, hemmahamnen för Västtrafiks reguljära personfärja går det täta turer året runt till ösamhällena Dyrön, Åstol och Tjörnekalv"
--   "vid färjeläget ansluter bussarna från resten av Tjörn, Stenungsund och Göteborg"
--   "I Rönnäng finns det lilla samhällets charm, med bryggrestaurang, kiosk"
update restaurants set description = 'Vid Rönnängs brygga ligger hemmahamnen för Västtrafiks reguljära personfärja, som året runt går täta turer till Dyrön, Åstol och Tjörnekalv. Vid färjeläget ansluter bussar från resten av Tjörn, Stenungsund och Göteborg. I Rönnäng finns bryggrestaurang och kiosk.', updated_at = now() where slug = 'ronnangs-hamn' and description is null;

-- KÄLLA: https://goteborg.se/wps/portal/start/kultur-och-fritid/fritid-och-natur/friluftsliv-natur-och/fritidsbat-batplats-gasthamnar/hitta-fritidsbatshamnar?uri=gbglnk:201752016151271&id=6129
--   "Saltholmen med 1 055 båtplatser i flera hamnar och 200 vinteruppläggningsplatser."
--   "Hamnarna ligger strategiskt placerade mellan Göteborgs centrum och södra skärgården."
--   "Saltholmen har goda allmänna kommunikationer, bra parkeringsmöjligheter på Aspholmen"
--   "servering, park, badplats med mera."
update restaurants set description = 'Saltholmen längst västerut i Göteborg har 1 055 båtplatser i flera hamnar och 200 vinteruppläggningsplatser. Hamnarna ligger mellan Göteborgs centrum och södra skärgården, med goda allmänna kommunikationer och parkering på Aspholmen. I området finns servering, park och badplats.', updated_at = now() where slug = 'saltholmen-marina' and description is null;

-- KÄLLA: https://www.vholmmarina.com/
--   "På Estlandsvägen i Vaxholm erbjuder vi reparation och service för båtar och båtmotorer"
--   "vår strategiska placering precis vid sjösättningsrampen i Vaxholm"
--   "Säker vinterförvaring i kallhall eller utomhus kombinerat med professionell konservering"
update restaurants set description = 'V-Holm Marina är en båtverkstad på Estlandsvägen i Vaxholm, precis vid sjösättningsrampen. Här erbjuds reparation och service för båtar och båtmotorer samt vinterförvaring i kallhall eller utomhus.', updated_at = now() where slug = 'v-holm-marina-ab' and description is null;

-- KÄLLA: Norrtälje kommun, Bryggplan för Norrtälje kommun (uppdaterad 2024), PDF:
--   https://www.norrtalje.se/globalassets/dokument/dokument-bygga-bo--miljo/dokument-norrtalje-vaxer/dokument-samhallsplanering/dokument-oversiktsplanering/dokument-ov.-planer-och-program/bryggplan-for-norrtalje-kommun.-uppdaterad-2024.pdf
--   "Norrsund på norra Blidö har en betongbrygga"
--   "Den är vinklad och utrustad med gummiplattor, räcke, belysning och bänk."
--   "Den är viktig för transporter av tyngre gods till andra öar."
--   "Antalet resenärer som reser med linjetrafiken uppgår till 4 900 personer i snitt under ett år. Bussar stannar också vid bryggan."
update restaurants set description = 'Norrsund på norra Blidö har en betongbrygga som angörs av linjetrafiken, och bussar stannar också vid bryggan. Bryggan är utrustad med räcke, belysning och bänk och är viktig för transporter av tyngre gods till andra öar.', updated_at = now() where slug = 'norrsund-blido-brygga' and description is null;

-- ── Klubb- och föreningshamnar ─────────────────────────────────────────────

-- KÄLLA: https://bbk-vaxholm.se/wp/information-om-hamnen/
--   "Endast BBK-medlemmar kan i mån av utrymme erhålla gästplats för längre eller kortare tid."
--   "båtens djupgående får ej överstiga 2,20 m. Detta beslut gäller i första hand nytillträde."
update restaurants set description = 'Blynäsvikens Båtklubbs klubbhamn har numrerade bryggor, en kranbrygga och bojplatser förankrade med kätting. Vid nytillträde gäller båtar upp till 12 m/4 m/8000 kg med ett djupgående på högst 2,20 m. Endast BBK-medlemmar kan i mån av utrymme få gästplats.', updated_at = now() where slug = 'blynasvikens-batklubb' and description is null;

-- KÄLLA: https://www.bromskar.se/
--   "Bromskärs hamn har 140 båtplatser med bilparkeringsplatser för dig som är fastighetsägare på öarna utanför Blidö."
--   "Alla platser i hamnen är sålda"
--   "våren 2016 kunde hamnen äntligen invigas"
update restaurants set description = 'Bromskärs hamn vid Blidö drivs av Bromskärs Hamn Samfällighetsförening och har 140 båtplatser med bilparkering för fastighetsägare på öarna utanför Blidö. Alla platser i hamnen är sålda, och hamnen i sin nuvarande form invigdes våren 2016.', updated_at = now() where slug = 'bromskar' and description is null;

-- KÄLLA: https://www.dalarobatklubb.se/om-dalaro-batklubb/vara-bryggor-och-batplatser
--   "I Askfatshamnen ligger vårt Klubbhus, vår populära Seglingsverksamhet samt även Gästhamn."
--   "sammanlagt drygt 500 platser (exkl gästhamns- och seglarskolebryggorna)"
--   "4-2 meter djup och grundar upp ju längre in man kommer"
--   "I Kanalen, som är ca 1,5 meter djup, kan mindre och något större motorbåtar ligga."
update restaurants set description = 'Dalarö Båtklubb har drygt 500 båtplatser. I Askfatshamnen ligger klubbhuset, seglingsverksamheten och en gästhamn; djupet är 2–4 meter och grundar upp längre in. I Kanalen, ca 1,5 meter djup, ligger mindre och något större motorbåtar.', updated_at = now() where slug = 'dalaro-batklubb' and description is null;

-- KÄLLA: https://www.gbk70.se/
--   "Vi har vår hamn på Gålö, ganska nära skärgårdsmetropolen Dalarö."
--   "Vi arrenderar mark av skärgårdsstiftelsen och äger alla våra anläggningar i hamn och varv."
--   "GBK tillåter parkering innanför grindarna under sommaren."
update restaurants set description = 'Gålö Båtklubb har sin hamn på Gålö, ganska nära Dalarö. Klubben arrenderar mark av Skärgårdsstiftelsen och äger alla sina anläggningar i hamn och varv. Under sommaren tillåts parkering innanför grindarna.', updated_at = now() where slug = 'galo-batklubb' and description is null;

-- KÄLLA: https://sxk.se/bojar-hamnar-och-farleder/hamnar/uthamnar
--   "Uthamn med fem blå svajbojar och sex akterbojar (röda) för bryggförtöjning."
--   "I uthamnen finns under sommaren en vedeldad bastu"
--   "Uthamnarna är tillgängliga för alla båtturister, även för icke SXK-medlemmar."
update restaurants set description = 'Svenska Kryssarklubbens uthamn i Norrviken på Runmarö har fem blå svajbojar och sex röda akterbojar för bryggförtöjning. Här finns brygga, toalett och sopmaja samt under sommaren en vedeldad bastu. Uthamnarna är tillgängliga för alla båtturister, även för den som inte är SXK-medlem.', updated_at = now() where slug = 'kryssarklubbens-uthamn' and description is null;

-- KÄLLA: https://oaxensbk.se/hamnen/
--   "Skanssundet är beläget vid den nordöstra delen av vackra Mörkö."
--   "Hamnen ligger på den västra sidan av Skansholmen."
--   "Vi har plats för ca 55 båtar, både vid brygga och på land, under vintern."
--   "På klubben finns ingen fast kran utan vi sjösätter med mobilkran på fasta datum både vår och höst."
update restaurants set description = 'Oaxens Båtklubbs hamn i Skanssundet ligger på västra sidan av Skansholmen vid nordöstra Mörkö, granne med Skansholmens marina, camping och sjökrog. Klubben har plats för ca 55 båtar vid brygga och på land. Det finns ingen fast kran, utan sjösättning sker med mobilkran, och klubben har ett klubbhus med samlingslokal och kök.', updated_at = now() where slug = 'oaxens-batklubb' and description is null;

-- KÄLLA: https://sites.google.com/resarobatklubb.se/hemsida/våra-hamnar/dasda (www.resarobatklubb.se svarade 503)
--   "Ytterbygårds bryggor ligger på Ytterby, på södra Resarö, strax efter Resarö Marina på Sjöviksvägen."
--   "Du har Tallholmen rakt söderut när du närmar dig hamnen."
--   "Antal båtplatser:120 st"
--   "Sjösättningsramp, färskvatten, el, förrådscontainer, grillplats"
update restaurants set description = 'Ytterbygårds bryggor ligger på Ytterby på södra Resarö, strax efter Resarö Marina på Sjöviksvägen. Vid inseglingen har man Tallholmen rakt söderut, och det finns ett par stenar att se upp för mellan Marieskäret och Resarö Marina. Hamnen har 120 båtplatser och sjösättningsramp, färskvatten, el och grillplats.', updated_at = now() where slug = 'resaro-batklubb' and description is null;

-- KÄLLA: https://www.skalakersbatklubb.se/sv/hamnen/
--   "Vatten och el finns tillgängliga på alla delar av bryggorna."
--   "Gäster är välkomna! De får tillfälligt förtöja vid vågbrytarens markerade gästplatser i upp till 24 timmar"
--   "I och invid hamnområdet gäller max 5 knop och svallfri fart."
--   "Toatömningsstationen är endast till för medlemmarna i klubben."
update restaurants set description = 'Skälåkers Båtklubbs hamn har vatten och el på alla delar av bryggorna. Gäster får tillfälligt förtöja vid vågbrytarens markerade gästplatser i upp till 24 timmar och ska meddela hamnkaptenen i förväg. Toatömningsstationen är endast för klubbens medlemmar, och i hamnområdet gäller max 5 knop och svallfri fart.', updated_at = now() where slug = 'skalakers-batklubb' and description is null;

-- ── Rättelse av "Endast medlemmar" (satt tidigare i dag) ───────────────────
-- Källorna ovan visar att gäster tas emot i dessa tre hamnar, så märkningen är fel:
--   kryssarklubbens-uthamn: "Uthamnarna är tillgängliga för alla båtturister, även för icke SXK-medlemmar."
--   skalakers-batklubb:     "Gäster är välkomna! De får tillfälligt förtöja vid vågbrytarens markerade gästplatser i upp till 24 timmar"
--   dalaro-batklubb:        "I Askfatshamnen ligger vårt Klubbhus, vår populära Seglingsverksamhet samt även Gästhamn."
update restaurants set endast_medlemmar = false, updated_at = now() where slug in ('kryssarklubbens-uthamn', 'skalakers-batklubb', 'dalaro-batklubb');
