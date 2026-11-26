select * from (
select 'fjaderholmarna.sql#1' k, count(*) n from restaurants where slug = 'rokeriet-fjaderholmarna' and latitude = 59.3208 and longitude = 18.1628
union all
select 'fjaderholmarna.sql#2' k, count(*) n from restaurants where slug = 'fjaderholmarna-bryggeri' and latitude = 59.3283 and longitude = 18.175
union all
select 'fjaderholmarna.sql#3' k, count(*) n from restaurants where slug = 'fjaderholmarna-bryggeri' and name = 'Fjäderholmarnas Bryggeri Taproom'
union all
select 'fjaderholmarna.sql#4' k, count(*) n from restaurants where slug = 'fjaderholmarnas-gasthamn' and description = 'Gästhamnen ligger på Stora Fjäderholmen utanför Blockhusudden vid inloppet till Stockholm och har 35 gästplatser med förtöjning vid boj. Hamndjupet är mellan 1 och 8 meter, och dusch ingår. Hamnvärd är Sjöstation Fjäderholmarna.'
union all
select 'grinda.sql#1' k, count(*) n from restaurants where slug = 'grinda-sjomack' and description = 'Grinda Sjömack ligger i direkt anslutning till gästhamnen och säljer bensin 98, diesel och gasol. Macken har kortautomat och är öppen året om, utom mellan kl. 22 och 05. Enklare båttillbehör och kioskvaror finns i Aktivitetshuset vid bryggan.'
union all
select 'grinda.sql#2' k, count(*) n from restaurants where slug = 'framfickan-grinda' and type = 'cafe'
union all
select 'grinda.sql#3' k, count(*) n from restaurants where slug = 'grinda-lanthandel-cafe' and latitude = 59.4128 and longitude = 18.5576
union all
select 'grinda.sql#4' k, count(*) n from restaurants where slug = 'grinda-wardshus' and description = 'Grinda Wärdshus vid Södra bryggan på Grinda ligger i ett hus som har sett ut över Saxarfjärden sedan 1906 och serverar skärgårdsmat. I viken finns gästhamnen med el, dusch och toalett, och sjömacken säljer bensin, diesel och gasol.'
union all
select 'grinda.sql#5' k, count(*) n from restaurants where slug = 'hemmesta-sjocafe' and type = 'restaurant'
union all
select 'grinda.sql#6' k, count(*) n from restaurants where slug = 'hemmesta-sjocafe' and latitude = 59.41017 and longitude = 18.49936
union all
select 'grinda.sql#7' k, count(*) n from restaurants where slug = 'grinda-sodra-bryggan' and description = 'Södra ångbåtsbryggan på Grinda, i Grinda naturreservat, trafikeras av Waxholmsbolaget, som skriver att Grinda har trafik året om. Under säsong angör även Strömmas Cinderellabåt Södra Grinda; 2026 gick den 30 april–27 september. Vid bryggan finns ett barnvänligt bad, grillplatser och torrdass. Gästhamn för fritidsbåtar finns i Hemviken och naturhamn i Hästholmssundet.'
union all
select 'husaro.sql#2' k, count(*) n from restaurants where slug = 'husaro-gasthamn-cafe' and name = 'Husarö Gästhamn & Café'
union all
select 'husaro.sql#3' k, count(*) n from restaurants where slug = 'husaro-gasthamn-cafe' and latitude = 59.5064 and longitude = 18.8475
union all
select 'husaro.sql#4' k, count(*) n from restaurants where slug = 'husaro-gasthamn-cafe' and website = 'https://www.svenskagasthamnar.se/stockholms-skargard/husaro/'
union all
select 'husaro.sql#6' k, count(*) n from restaurants where slug = 'soderlangholm' and name = 'Söderlångholm'
union all
select 'mallar.sql#1' k, count(*) n from restaurants where slug = 'dalaro-smadalaro-gard'
   and island = 'Dalarö'
union all
select 'moja.sql#1' k, count(*) n from restaurants where slug = 'loka-gasthamn' and description = 'Löka är en liten fiskehamn på östra Möja med sju gästplatser och ett hamndjup på 1,5–2 meter; hamnens västra del är mycket grund. Här finns begränsat med färskvatten, toalett och miljöstation för hushållssopor och glas. Y-bommar installeras på gästplatserna, vilket begränsar båtbredden till 2,75 meter inklusive fendrar.'
union all
select 'moja.sql#2' k, count(*) n from restaurants where slug = 'loka-gasthamn' and website = 'https://www.svenskagasthamnar.se/'
union all
select 'moja.sql#3' k, count(*) n from restaurants where slug = 'kyrkviken' and description = 'Kyrkviken är en liten fiskehamn på Möjas sydöstra sida med gästbrygga längst in i hamnen, och gästplatser finns även längst ut i viken på både östra och västra sidan. Hamndjupet är 1,8–2,5 meter och förtöjning sker med ankare. Hamnen ligger nära Berg, Möjas största by, med kyrka och hembygdsmuseum.'
union all
select 'moja.sql#4' k, count(*) n from restaurants where slug = 'bastuhuset' and description = 'Bastuhuset är en bastu i Värmdö kommun.'
union all
select 'moja.sql#5' k, count(*) n from restaurants where slug = 'bastuhuset' and name = 'Bastuhuset'
union all
select 'moja.sql#6' k, count(*) n from restaurants where slug = 'moja-bageri' and type = 'cafe'
union all
select 'moja.sql#7' k, count(*) n from restaurants where slug = 'moja-bageri' and description = 'Möja Värdshus & Bageri ligger nära Kyrkviken på Möja, där det har bakats sedan 1951. Nuvarande ägare tog över 2019, byggde en större matsal och köpte in ny bageriutrustning. Här finns också rum att boka.'
union all
select 'moja.sql#8' k, count(*) n from restaurants where slug = 'bastuhuset' and website = 'http://www.finnhamn.se/'
union all
select 'moja.sql#9' k, count(*) n from restaurants where slug = 'hamncafet-moja' and website = 'https://www.facebook.com/profile.php?id=100065104277412'
union all
select 'moja.sql#10' k, count(*) n from restaurants where slug = 'hamncafet-moja' and latitude = 59.4069 and longitude = 18.8858
union all
select 'moja.sql#11' k, count(*) n from restaurants where slug = 'moja-stf-moja-gard' and type = 'hotel'
union all
select 'moja.sql#12' k, count(*) n from restaurants where slug = 'moja-stf-moja-gard' and description = 'Möja vandrarhem är ett familjedrivet STF-vandrarhem vid landsvägen i Berg på södra Möja, med rum för två eller fyra personer och självhushåll. Det har öppet april–december och hyr ut cyklar, och via systerföretaget Möja Outdoor går det att hyra kajak, SUP, roddbåt och vattenskoter. Coop, som har öppet året runt, ligger 300 meter bort.'
union all
select 'moja.sql#13' k, count(*) n from restaurants where slug = 'bastuhuset' and formatted_address = '184 99 Finnhamn'
union all
select 'sandhamn.sql#1' k, count(*) n from restaurants where slug = 'dykarbaren' and latitude = 59.2888
union all
select 'sandhamn.sql#2' k, count(*) n from restaurants where slug = 'dykarbaren' and longitude = 18.9103
union all
select 'sandhamn.sql#3' k, count(*) n from restaurants where slug = 'cafe-ankaret' and latitude = 59.2875
union all
select 'sandhamn.sql#4' k, count(*) n from restaurants where slug = 'cafe-ankaret' and longitude = 18.9108
union all
select 'sandhamn.sql#5' k, count(*) n from restaurants where slug = 'sandhamns-bageriet' and latitude = 59.2884
union all
select 'sandhamn.sql#6' k, count(*) n from restaurants where slug = 'sandhamns-bageriet' and longitude = 18.9118
union all
select 'sandhamn.sql#7' k, count(*) n from restaurants where slug = 'bistro-sands' and latitude = 59.2882
union all
select 'sandhamn.sql#8' k, count(*) n from restaurants where slug = 'bistro-sands' and longitude = 18.9115
union all
select 'sandhamn.sql#9' k, count(*) n from restaurants where slug = 'vasterudde-strand' and name = 'Västerudde strand'
union all
select 'sandhamn.sql#10' k, count(*) n from restaurants where slug = 'vasterudde-strand' and description = 'Västerudde strand är en badplats på Sandhamn i Värmdö kommun.'
union all
select 'sandhamn.sql#11' k, count(*) n from restaurants where slug = 'vasterudde-strand' and website = 'http://www.varmdo.se/'
union all
select 'sandhamn.sql#12' k, count(*) n from restaurants where slug = 'sandhamns-glassigaste-stalle' and description = 'Sandhamns Glassigaste Ställe är ett glasscafé på Sandhamn i Stockholms mellersta skärgård.'
union all
select 'sandhamn.sql#13' k, count(*) n from restaurants where slug = 'pub-alma-sandhamn' and description = 'PUB Alma är en pub på Sandhamn i Stockholms mellersta skärgård.'
union all
select 'sandhamn.sql#14' k, count(*) n from restaurants where slug = 'cafe-ankaret' and name = 'Café Ankaret'
union all
select 'sandhamn.sql#15' k, count(*) n from restaurants where slug = 'cafe-ankaret' and description = 'Café Ankaret är ett kafé i Sandhamn, på adressen Sandhamn 310.'
union all
select 'sandhamn.sql#16' k, count(*) n from restaurants where slug = 'dykarbaren' and description = 'Dykarbaren på Sandhamn 425 är bar och restaurang i ett hus som uppfördes 1921. Baren växte fram 1982, när huset användes för dykutbildningar på Sandhamn. Uteserveringen ligger mitt emot, vid strandkanten. Säsongen är maj–september, och bord bokas bara inomhus eftersom uteserveringen inte går att vädersäkra.'
union all
select 'sandhamn.sql#17' k, count(*) n from restaurants where slug = 'ksss-gasthamn-lokholmen-trollsundet' and description = 'Trollsundet är den första delen av KSSS gästhamn på Lökholmen, strax nordost om Sandhamns gästhamn, och rymmer upp till 90 båtar med möjlighet till landström. Tilläggning sker med mooringlina, boj eller Y-bom och det är förbjudet att ankra; under högsommaren är platserna i första hand reserverade för KSSS medlemmar. På ön finns toaletter, duschar, bastu och sophus.'
union all
select 'sandhamn.sql#18' k, count(*) n from restaurants where slug in ('stora-trouvillestranden', 'lilla-trouville-stranden') and hidden_at is null
union all
select 'sandhamn.sql#19' k, count(*) n from restaurants where slug = 'pub-alma-sandhamn' and hidden_at is null
union all
select 'sandhamn.sql#20' k, count(*) n from restaurants where slug = 'sandhamns-glassigaste-stalle' and hidden_at is null
union all
select 'sandhamn.sql#21' k, count(*) n from restaurants where slug = 'vasterudde-strand' and type = 'beach'
union all
select 'sandhamn.sql#22' k, count(*) n from restaurants where slug = 'ksss-gasthamn-lokholmen-trollsundet' and island = 'Sandhamn'
union all
select 'sandhamn.sql#23' k, count(*) n from restaurants where slug = 'cafe-strindbergsgarden' and name = 'Café Strindbergsgården'
union all
select 'sandhamn.sql#24' k, count(*) n from restaurants where slug = 'cafe-strindbergsgarden' and type = 'cafe'
union all
select 'sandhamn.sql#25' k, count(*) n from restaurants where slug = 'cafe-strindbergsgarden' and latitude = 59.2891 and longitude = 18.9121
union all
select 'sandhamn.sql#26' k, count(*) n from restaurants where slug = 'cafe-strindbergsgarden' and website = 'http://www.facebook.com/cafestrindbergsgarden'
union all
select 'sandhamn.sql#27' k, count(*) n from restaurants where slug = 'cafe-strindbergsgarden' and description = 'Café Strindbergsgården är ett kafé i Sandhamn, på adressen Sandhamn 109.'
union all
select 'sandhamn.sql#28' k, count(*) n from restaurants where slug = 'cafe-strindbergsgarden' and formatted_address = 'Sandhamn 109, 130 39 Sandhamn'
union all
select 'sandhamn.sql#29' k, count(*) n from restaurants where slug = 'cafe-strindbergsgarden' and menu = 'Kaffe, te, hembakat, enkel lunch.'
union all
select 'sandhamn.sql#30' k, count(*) n from restaurants where slug = 'cafe-strindbergsgarden' and opening_hours = 'Juni–Augusti: dagligen 10–16.'
union all
select 'sandhamn.sql#31' k, count(*) n from restaurants where slug = 'cafe-strindbergsgarden' and categories = '{cafe,coffee,hidden_gem}'
union all
select 'sandhamn.sql#32' k, count(*) n from restaurants where slug = 'cafe-strindbergsgarden' and facilities = '{cafe}'
union all
select 'sandhamn.sql#33' k, count(*) n from restaurants where slug = 'cafe-strindbergsgarden' and best_for = '{couples,family,day_trip}'
union all
select 'sandhamn.sql#34' k, count(*) n from restaurants where slug = 'cafe-strindbergsgarden' and tags = '{sandhamn,strindberg,kultur,fika}'
union all
select 'sandhamn.sql#35' k, count(*) n from restaurants where slug = 'cafe-strindbergsgarden' and google_place_id = 'ChIJ0wJoUwR09UYR5LcGchumH5Y'
union all
select 'styrso.sql#1' k, count(*) n from restaurants where slug = 'karran' and description = 'Kärran är en restaurang på Brännö i Göteborgs södra skärgård.'
union all
select 'styrso.sql#2' k, count(*) n from restaurants where slug = 'vrango-gasthamn' and description = 'Vrångö gästhamn har plats för cirka 130 gästande båtar och en dagbrygga för kortare besök, och hamnen ligger väl skyddad för vind och vågor. Hamndjupet är 3,5–5 meter. I gästhamnen finns toaletter, duschar, tvättmaskin, sopkärl, miljöstation och sugtömning, och i hamnen finns mataffär och matställen.'
union all
select 'styrso.sql#3' k, count(*) n from restaurants where slug = 'donso-hamnkrog' and name = 'Donsö Hamnkrog'
union all
select 'styrso.sql#4' k, count(*) n from restaurants where slug = 'donso-hamnkrog' and description = 'Donsö Hamnkrog är en restaurang på Donsö i Göteborgs södra skärgård.'
union all
select 'styrso.sql#5' k, count(*) n from restaurants where slug = 'donso-hamnkrog' and website = 'http://www.donsohamn.se/'
union all
select 'styrso.sql#6' k, count(*) n from restaurants where slug = 'donso-hamnkrog' and round(latitude::numeric, 7) = 57.5985718 and round(longitude::numeric, 7) = 11.792968
union all
select 'styrso.sql#7' k, count(*) n from restaurants where slug = 'donso-fiskrokeri' and round(latitude::numeric, 7) = 57.5983 and round(longitude::numeric, 7) = 11.7919
union all
select 'styrso.sql#8' k, count(*) n from restaurants where slug = 'branno-vardshus' and description = 'Brännö Värdshus är en restaurang på Brännö vars meny präglas av närheten till havet, med fisk och skaldjur. Maten serveras i den gamla lotsbostaden eller i en glashuspaviljong, och till värdshuset hör ett café och ett eget bageri som har öppet under sommaren. Övernattning finns i gästrum och på pensionat Baggen.'
union all
select 'styrso.sql#9' k, count(*) n from restaurants where slug = 'donso-hamnkrog' and phone = '+46 31 97 17 32'
union all
select 'uto.sql#1' k, count(*) n from restaurants where slug = 'uto-bykrog' and description = 'Utö Bykrog är en sommaröppen restaurang i Edesnäs på Utö, vid vägen mellan Gruvbyn och Ålö. Adressen är Edesnäs Gård 3.'
union all
select 'uto.sql#2' k, count(*) n from restaurants where slug = 'uto-bykrog' and name = 'Utö Bykrog'
union all
select 'uto.sql#3' k, count(*) n from restaurants where slug = 'gruvbryggan' and description = 'Gruvbryggan är Waxholmsbolagets brygga på Utö, där båtarna på linje 21 från Årsta brygga lägger till. Bryggan ligger i norra delen av Utö gästhamn, där också sjömacken finns.'
union all
select 'uto.sql#4' k, count(*) n from restaurants where slug = 'lilla-haket-ninas-bod' and description = 'Lilla Haket & Ninas Bod är ett kafé i Gruvbyn på Utö, Haninge kommun.'
union all
select 'uto.sql#5' k, count(*) n from restaurants where slug = 'lilla-haket-ninas-bod' and hidden_at is null
union all
select 'uto.sql#6' k, count(*) n from restaurants where slug = 'bakgarden-uto' and description = 'Bakgården på Bygatan på Utö är ett bageri som säljer bröd och bakverk. Under sommaren finns också ett kafé.'
union all
select 'uto.sql#7' k, count(*) n from restaurants where slug = 'uto-gasthamn-sjomack' and description = 'Utö Sjömack har tankning dygnet runt och mopeduthyrning.'
union all
select 'uto.sql#8' k, count(*) n from restaurants where slug = 'uto-vardshus' and description = 'Utö Värdshus är hotell, restaurang och konferensanläggning på Utö, med 80 rum och hotellstugor (200 bäddar) och 12 mötesrum. Till värdshuset hör också Seglarbaren och Bakfickan.'
union all
select 'uto.sql#9' k, count(*) n from restaurants where slug = 'bryggans-lilla-kok-uto' and name = 'Bryggans lilla kök'
union all
select 'uto.sql#10' k, count(*) n from restaurants where slug = 'stf-vandrarhem-uto' and name = 'Utö Vandrarhem'
union all
select 'uto.sql#11' k, count(*) n from restaurants where slug = 'gruvbryggan' and round(latitude::numeric, 7) = 58.9703736 and round(longitude::numeric, 7) = 18.3234346
union all
select 'uto.sql#12' k, count(*) n from restaurants where slug = 'bryggans-lilla-kok-uto' and round(latitude::numeric, 7) = 58.96988 and round(longitude::numeric, 7) = 18.324775
union all
select 'uto.sql#13' k, count(*) n from restaurants where slug = 'uto-gasthamn-sjomack' and round(latitude::numeric, 7) = 58.9702425 and round(longitude::numeric, 7) = 18.3246747
union all
select 'uto.sql#14' k, count(*) n from restaurants where slug = 'bakgarden-uto' and round(latitude::numeric, 7) = 58.9699 and round(longitude::numeric, 7) = 18.3255
union all
select 'uto.sql#15' k, count(*) n from restaurants where slug = 'bakfickan-uto' and round(latitude::numeric, 7) = 58.97 and round(longitude::numeric, 7) = 18.3265
union all
select 'uto.sql#16' k, count(*) n from restaurants where slug = 'stf-vandrarhem-uto' and description = 'Utö Vandrarhem ligger i backen upp mot Utö Värdshus, i grosshandlare Levins badhotell från förra sekelskiftet. Det har öppet april–oktober och har 73 bäddar, gemensamma kök för självhushåll och dusch och wc i korridoren. Husdjur är inte tillåtna, och man checkar in i värdshusets reception.'
union all
select 'uto.sql#17' k, count(*) n from restaurants where slug = 'rano-brygga' and name = 'Rånö Brygga'
union all
select 'uto.sql#18' k, count(*) n from restaurants where slug = 'rano-brygga' and description is null
union all
select 'uto.sql#19' k, count(*) n from restaurants where slug = 'rano-brygga' and website is null
union all
select 'uto.sql#20' k, count(*) n from restaurants where slug = 'rano-brygga' and round(latitude::numeric, 7) = 58.919054 and round(longitude::numeric, 7) = 18.177884
union all
select 'uto.sql#21' k, count(*) n from restaurants where slug = 'uto-camping-och-stugor' and type = 'hotel'
union all
select 'vaxholm.sql#1' k, count(*) n from restaurants where slug = 'magasinet-gustavsberg' and description = 'Magasinet ligger vid vattnet på Fiskaregatan 1 i Vaxholm.'
union all
select 'vaxholm.sql#2' k, count(*) n from restaurants where slug = 'vaxholms-fastning-cafe' and island = 'Kastellet'
union all
select 'vaxholm.sql#3' k, count(*) n from restaurants where slug = 'norrhamnen' and website = 'https://www.vaxholm.se/'
union all
select 'vaxholm.sql#4' k, count(*) n from restaurants where slug = 'norrbergshamnen' and website = 'http://www.vaxholm.se/'
union all
select 'vaxholm.sql#5' k, count(*) n from restaurants where slug = 'norrbergshamnen' and description = 'I Norrbergshamnen i Vaxholm finns fem gästplatser på utsidan av pontonen. Tillfälliga besökare som kommer sjövägen kan använda kommunens tidsbestämda platser i högst tre timmar utan avgift. Vaxholms centralt belägna gästhamn, med bland annat dusch, toalett och latrintömning, drivs av Waxholms hamn AB.'
union all
select 'vaxholm.sql#6' k, count(*) n from restaurants where slug = 'blynasvikens-batklubb' and description = 'Blynäsvikens Båtklubbs klubbhamn har numrerade bryggor, en kranbrygga och bojplatser förankrade med kätting. Vid nytillträde gäller båtar upp till 12 m/4 m/8000 kg med ett djupgående på högst 2,20 m. Endast BBK-medlemmar kan i mån av utrymme få gästplats.'
union all
select 'vaxholm.sql#7' k, count(*) n from restaurants where slug = 'resaro-marina' and description = 'Resarö Marina ligger strax utanför Vaxholm, där farlederna in till Stockholm möts. Anläggningen har pontoner i helbetong med y-bom, el och vatten på samtliga platser, och båtarna får vara högst cirka 33 fot.'
union all
select 'vaxholm.sql#8' k, count(*) n from restaurants where slug = 'resaro-batklubb' and description = 'Ytterbygårds bryggor ligger på Ytterby på södra Resarö, strax efter Resarö Marina på Sjöviksvägen. Vid inseglingen har man Tallholmen rakt söderut, och det finns ett par stenar att se upp för mellan Marieskäret och Resarö Marina. Hamnen har 120 båtplatser och sjösättningsramp, färskvatten, el och grillplats.'
union all
select 'vaxholm.sql#9' k, count(*) n from restaurants where slug = 'gronviksbadet' and formatted_address = 'Ensjövägen 90, 603 66 Norrköping'
union all
select 'vaxholm.sql#10' k, count(*) n from restaurants where slug = 'bryggan-teno' and latitude = 59.39257 and longitude = 18.33038
union all
select 'vaxholm.sql#11' k, count(*) n from restaurants where slug = 'waxholms-gasthamn-och-rent-under-batbotten-tvatt' and name = 'Waxholms Gästhamn & Rent Under Båtbotten tvätt'
union all
select 'vaxholm.sql#12' k, count(*) n from restaurants where slug = 'vaxholms-fastning-cafe' and formatted_address = 'Trädgårdsgatan 19, 185 32 Vaxholm'
union all
select 'vaxholm.sql#13' k, count(*) n from restaurants where slug = 'tenobadet' and island is null
union all
select 'vaxholm.sql#14' k, count(*) n from restaurants where slug = 'vaxholm-waxholms-camping' and type = 'hotel'
union all
select 'vaxholm.sql#15' k, count(*) n from restaurants where slug = 'magasinet-gustavsberg' and core_experience = 'Gamla magasinslokaler, god mat och Gustavsbergs pittoreska hamn – ett genuint alternativ till turistkrogarna.'
union all
select 'vaxholm.sql#16' k, count(*) n from restaurants where slug = 'magasinet-gustavsberg' and 'gustavsberg' = any(tags)
) t where n <> (case when k='sandhamn.sql#18' then 2 else 1 end) order by k;