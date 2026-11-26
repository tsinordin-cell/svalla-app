select * from (
select 'styrso.sql#1' k, count(*) n from restaurants where slug = 'karran' and description = 'Kärran är en rosa foodtruck på Varpevägen 3 på Brännö i Göteborgs södra skärgård. Den serverar asiatiska rätter med en svensk touch, hemmagjorda bakverk, juicer och iskaffe och har öppet april till september.'
union all
select 'styrso.sql#2' k, count(*) n from restaurants where slug = 'vrango-gasthamn' and description = 'Vrångö gästhamn är gästhamnen på Vrångö i Göteborgs kommun, med plats för cirka 130 gästande båtar och en dagbrygga för kortare besök. Hamnen ligger väl skyddad för vind och vågor, och båtarna förtöjs med fören mot bryggan och fast akterfäste eller boj. I gästhamnen finns toaletter, duschar, tvättmaskin, sopkärl, miljöstation och sugtömning, och i hamnen finns fiskekaj, mataffär och matställen. Skärgårdsbåten lägger till i Mittvik, en knapp kilometer bort på andra sidan ön.'
union all
select 'styrso.sql#3' k, count(*) n from restaurants where slug = 'donso-hamnkrog' and name = 'Isbolaget Hotell & Restaurang'
union all
select 'styrso.sql#4' k, count(*) n from restaurants where slug = 'donso-hamnkrog' and description = 'Isbolaget Hotell & Restaurang är ett hotell och en restaurang längst ut på piren i Donsö hamn, på Donsö i Göteborgs södra skärgård. Här serveras bland annat fisk och skaldjur, dagens lunch, pizza och à la carte. Hundar är välkomna.'
union all
select 'styrso.sql#5' k, count(*) n from restaurants where slug = 'donso-hamnkrog' and website = 'https://www.isbolaget.com/'
union all
select 'styrso.sql#6' k, count(*) n from restaurants where slug = 'donso-hamnkrog' and round(latitude::numeric,7) = round(57.5980216::numeric,7) and round(longitude::numeric,7) = round(11.7910826::numeric,7)
union all
select 'styrso.sql#7' k, count(*) n from restaurants where slug = 'donso-fiskrokeri' and round(latitude::numeric,7) = round(57.5991484::numeric,7) and round(longitude::numeric,7) = round(11.7950433::numeric,7)
union all
select 'styrso.sql#8' k, count(*) n from restaurants where slug = 'branno-vardshus' and description = 'Brännö Värdshus är en restaurang på Brännö vars meny präglas av närheten till havet, med fisk och skaldjur. Maten serveras i värdshusets små rum eller i en glashuspaviljong, och restaurangen har bland annat dagens lunch, skärgårdslunch på lördagar och söndagsmiddag. Till värdshuset hör ett café och ett eget bageri, men i november 2026 var bageriet enligt värdshuset tillfälligt stängt och väntades öppna igen inom kort. Övernattning finns i gästrum och på pensionat Baggen.'
union all
select 'styrso.sql#9' k, count(*) n from restaurants where slug = 'donso-hamnkrog' and phone = '+46 31 97 27 00'
) t where n <> (case when k='sandhamn.sql#18' then 2 else 1 end) order by k;