select * from (
select 'moja.sql#1' k, count(*) n from restaurants where slug = 'loka-gasthamn' and description = 'Löka gästhamn är en gästhamn i en liten fiskehamn på östra Möja i Värmdö kommun. Gästplatserna ligger direkt till höger innanför piren, och förtöjning sker med ankare. Enligt hamnens uppgift på Svenska Gästhamnar håller man på att installera Y-bommar på gästplatserna, och båtbredden blir då högst 2,75 meter inklusive fendrar. Här finns toalett, begränsat med färskvatten från handpump och miljöstation för hushållssopor och glas. Waxholmsbolagets linje 14 angör Löka; i tabellerna för 2026 står bryggan på de flesta turer med X, som betyder att den trafikeras utan fast avgångstid. I byn finns också klippbad.'
union all
select 'moja.sql#2' k, count(*) n from restaurants where slug = 'loka-gasthamn' and website = 'https://www.svenskagasthamnar.se/stockholms-skargard/moja-loka/'
union all
select 'moja.sql#3' k, count(*) n from restaurants where slug = 'kyrkviken' and description = 'Kyrkviken är en liten fiskehamn med gästhamn på Möjas sydöstra sida i Värmdö kommun, med gästbrygga längst in i hamnen; gästplatser finns även längst ut i viken på både den östra sidan och den västra, vid kyrkan. Förtöjning sker med ankare, och här finns toalett och vatten i dunk. Hamnen ligger nära Berg, Möjas största by, med hembygdsmuseum.'
union all
select 'moja.sql#4' k, count(*) n from restaurants where slug = 'bastuhuset' and description = 'Bastun ligger på Stora Kalholmen, ön mellan Finnhamn och Möja i Stockholms mellersta skärgård. På ön ligger STF Stora Kalholmen Vandrarhem, där bastu finns.'
union all
select 'moja.sql#5' k, count(*) n from restaurants where slug = 'bastuhuset' and name = 'Bastu på Stora Kalholmen'
union all
select 'moja.sql#6' k, count(*) n from restaurants where slug = 'moja-bageri' and type = 'restaurant'
union all
select 'moja.sql#7' k, count(*) n from restaurants where slug = 'moja-bageri' and description = 'Möja Värdshus & Bageri ligger nära Kyrkviken på Möja. Enligt värdshuset startade bageriet 1951, och 2019 tog nuvarande fastighetsägare över verksamheten, gjorde en omfattande renovering för en större matsal och investerade i ny bageriutrustning för att återta bageripositionen. Här finns också rum, som bara går att boka 18 juni till 15 augusti.'
union all
select 'moja.sql#8' k, count(*) n from restaurants where slug = 'bastuhuset' and website is null
union all
select 'moja.sql#9' k, count(*) n from restaurants where slug = 'hamncafet-moja' and website = 'https://www.facebook.com/profile.php?id=100067003784963'
union all
select 'moja.sql#10' k, count(*) n from restaurants where slug = 'hamncafet-moja' and round(latitude::numeric,7) = round(59.4064678::numeric,7) and round(longitude::numeric,7) = round(18.8840547::numeric,7)
union all
select 'moja.sql#11' k, count(*) n from restaurants where slug = 'moja-stf-moja-gard' and type = 'hostel'
union all
select 'moja.sql#12' k, count(*) n from restaurants where slug = 'moja-stf-moja-gard' and description = 'Möja vandrarhem är ett familjedrivet STF-vandrarhem vid landsvägen i Berg på södra Möja, med rum för två eller fyra personer och självhushåll. Det har öppet april till december och hyr ut cyklar, kajak, SUP, roddbåt och vattenskoter, och via systerföretaget Möja Outdoor går det att ordna transport med båt eller fyrhjuling med släp. Coop Berg, som har öppet året runt, ligger 300 meter bort.'
union all
select 'moja.sql#13' k, count(*) n from restaurants where slug = 'bastuhuset' and formatted_address is null
) t where n <> (case when k='sandhamn.sql#18' then 2 else 1 end) order by k;