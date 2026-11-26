select * from (
select 'grinda.sql#1' k, count(*) n from restaurants where slug = 'grinda-sjomack' and description = 'Grinda Sjömack är en sjömack i direkt anslutning till gästhamnen på Grinda i Värmdö kommun och säljer bensin 98, diesel och gasol. Macken har kortautomat för de tider den är obemannad och är öppen året om, utom nattetid. Enklare båttillbehör och kioskvaror finns i Aktivitetshuset vid bryggan.'
union all
select 'grinda.sql#2' k, count(*) n from restaurants where slug = 'framfickan-grinda' and type = 'restaurant'
union all
select 'grinda.sql#3' k, count(*) n from restaurants where slug = 'grinda-lanthandel-cafe' and round(latitude::numeric,7) = round(59.4130702::numeric,7) and round(longitude::numeric,7) = round(18.5592303::numeric,7)
union all
select 'grinda.sql#4' k, count(*) n from restaurants where slug = 'grinda-wardshus' and description = 'Grinda Wärdshus är en restaurang med hotell mitt på Grinda i Värmdö kommun, en knapp kilometers promenad från både Södra och Norra bryggan. Wärdshuset ligger i en sommarvilla med utsikt över Saxarfjärden, som enligt Länsstyrelsen uppfördes 1907 efter ritning av arkitekten Ernst Stenhammar, och köket serverar klassisk skärgårdsmat. Från månadsskiftet mellan augusti och september 2026 renoveras husets tak och fasad, och Grinda Wärdshus räknar med nypremiär i maj 2027. I anslutning till wärdshuset ligger gästhamnen i Hemviken med el, dusch och toalett, och sjömacken säljer bensin 98, diesel och gasol.'
union all
select 'grinda.sql#5' k, count(*) n from restaurants where slug = 'hemmesta-sjocafe' and type = 'cafe'
union all
select 'grinda.sql#6' k, count(*) n from restaurants where slug = 'hemmesta-sjocafe' and round(latitude::numeric,7) = round(59.4127412::numeric,7) and round(longitude::numeric,7) = round(18.4963563::numeric,7)
union all
select 'grinda.sql#7' k, count(*) n from restaurants where slug = 'grinda-sodra-bryggan' and description = 'Södra ångbåtsbryggan på Grinda, i Grinda naturreservat, trafikeras av Waxholmsbolaget, som skriver att Grinda har trafik året om. Under säsong angör även Strömmas Cinderellabåt Södra Grinda; 2026 gick den 30 april till 27 september. Vid bryggan finns ett barnvänligt bad, grillplatser och torrdass. Gästhamn för fritidsbåtar finns i Hemviken och naturhamn i Hästholmssundet.'
) t where n <> (case when k='sandhamn.sql#18' then 2 else 1 end) order by k;