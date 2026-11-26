select * from (
select 'vaxholm.sql#1' k, count(*) n from restaurants where slug = 'magasinet-gustavsberg' and description = 'Magasinet i Waxholm är en bistro vid vattnet på Fiskaregatan 1 i Vaxholm, Vaxholms kommun. I den gamla smedjan finns också inredningsbutik, festlokal och yogastudio. Bistron har stängt för vintern 2026 till 2027 och öppnar igen våren 2027.'
union all
select 'vaxholm.sql#2' k, count(*) n from restaurants where slug = 'vaxholms-fastning-cafe' and island = 'Vaxholmen'
union all
select 'vaxholm.sql#3' k, count(*) n from restaurants where slug = 'norrhamnen' and website = 'https://www.vaxholm.se/trafik--infrastruktur/hamnar-kajer-och-batplatser/kommunala-batplatser'
union all
select 'vaxholm.sql#4' k, count(*) n from restaurants where slug = 'norrbergshamnen' and website = 'https://www.vaxholm.se/trafik--infrastruktur/hamnar-kajer-och-batplatser'
union all
select 'vaxholm.sql#5' k, count(*) n from restaurants where slug = 'norrbergshamnen' and description = 'Norrbergshamnen vid Badhusgatan och Norrbergsplan är en av Vaxholms stads kommunala småbåtshamnar i Vaxholm. Här finns fem gästplatser på utsidan av pontonen, och tillfälliga besökare som kommer sjövägen kan använda kommunens tidsbestämda platser i högst tre timmar utan avgift. Dusch, toalett och latrintömning finns i Vaxholms gästhamn, en egen anläggning som drivs av Waxholms hamn AB på uppdrag av Vaxholms stad.'
union all
select 'vaxholm.sql#6' k, count(*) n from restaurants where slug = 'blynasvikens-batklubb' and description = 'Blynäsvikens Båtklubbs klubbhamn i Blynäsviken på Vaxön i Vaxholm har numrerade bryggor, en kranbrygga och bojplatser förankrade med kätting eller godkänd mooringslina. Klubben erbjuder inte båtplats till båtar som överstiger 12 m/4 m/8000 kg eller har ett djupgående över 2,20 m. Endast BBK-medlemmar kan i mån av utrymme få gästplats.'
union all
select 'vaxholm.sql#7' k, count(*) n from restaurants where slug = 'resaro-marina' and description = 'Resarö Marina ligger på Resarö strax utanför Vaxholm, där farlederna in till Stockholm möts. Anläggningen har pontoner i helbetong med y-bom på samtliga platser samt el och vatten, och båtarna får vara högst cirka 33 fot.'
union all
select 'vaxholm.sql#8' k, count(*) n from restaurants where slug = 'resaro-batklubb' and description = 'Ytterbygårds bryggor ligger på Ytterby på södra Resarö, strax efter Resarö Marina på Sjöviksvägen. Vid inseglingen har man Tallholmen rakt söderut. Hamnen har 120 båtplatser och sjösättningsramp, färskvatten, el och grillplats. Bryggorna hör till Resarö Båtklubb, en ideell förening bildad 1972 med hemort på Resarö, som har 236 båtplatser i sina fyra hamnar.'
union all
select 'vaxholm.sql#9' k, count(*) n from restaurants where slug = 'gronviksbadet' and formatted_address = 'Grönviksvägen, Rindö'
union all
select 'vaxholm.sql#10' k, count(*) n from restaurants where slug = 'bryggan-teno' and round(latitude::numeric,7) = round(59.392279::numeric,7) and round(longitude::numeric,7) = round(18.328248::numeric,7)
union all
select 'vaxholm.sql#11' k, count(*) n from restaurants where slug = 'waxholms-gasthamn-och-rent-under-batbotten-tvatt' and name = 'Vaxholms Gästhamn'
union all
select 'vaxholm.sql#12' k, count(*) n from restaurants where slug = 'vaxholms-fastning-cafe' and formatted_address = 'Kastellet, 185 99 Vaxholm'
union all
select 'vaxholm.sql#13' k, count(*) n from restaurants where slug = 'tenobadet' and island = 'Bogesundslandet'
union all
select 'vaxholm.sql#14' k, count(*) n from restaurants where slug = 'vaxholm-waxholms-camping' and type = 'camping'
union all
select 'vaxholm.sql#15' k, count(*) n from restaurants where slug = 'magasinet-gustavsberg' and core_experience = 'Bistro, inredningsbutik, festlokal och yogastudio under samma tak på Fiskaregatan 1 i Vaxholm.'
union all
select 'vaxholm.sql#16' k, count(*) n from restaurants where slug = 'magasinet-gustavsberg' and 
) t where n <> (case when k='sandhamn.sql#18' then 2 else 1 end) order by k;