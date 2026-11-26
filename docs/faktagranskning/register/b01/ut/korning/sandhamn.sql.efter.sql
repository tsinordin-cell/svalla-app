select * from (
select 'sandhamn.sql#1' k, count(*) n from restaurants where slug = 'dykarbaren' and round(latitude::numeric,7) = round(59.2885549::numeric,7)
union all
select 'sandhamn.sql#2' k, count(*) n from restaurants where slug = 'dykarbaren' and round(longitude::numeric,7) = round(18.9143792::numeric,7)
union all
select 'sandhamn.sql#3' k, count(*) n from restaurants where slug = 'cafe-ankaret' and round(latitude::numeric,7) = round(59.2893019::numeric,7)
union all
select 'sandhamn.sql#4' k, count(*) n from restaurants where slug = 'cafe-ankaret' and round(longitude::numeric,7) = round(18.9141727::numeric,7)
union all
select 'sandhamn.sql#5' k, count(*) n from restaurants where slug = 'sandhamns-bageriet' and round(latitude::numeric,7) = round(59.2897678::numeric,7)
union all
select 'sandhamn.sql#6' k, count(*) n from restaurants where slug = 'sandhamns-bageriet' and round(longitude::numeric,7) = round(18.9141812::numeric,7)
union all
select 'sandhamn.sql#7' k, count(*) n from restaurants where slug = 'bistro-sands' and round(latitude::numeric,7) = round(59.2879473::numeric,7)
union all
select 'sandhamn.sql#8' k, count(*) n from restaurants where slug = 'bistro-sands' and round(longitude::numeric,7) = round(18.914614::numeric,7)
union all
select 'sandhamn.sql#9' k, count(*) n from restaurants where slug = 'vasterudde-strand' and name = 'Stranden vid Västerudden'
union all
select 'sandhamn.sql#10' k, count(*) n from restaurants where slug = 'vasterudde-strand' and description = 'Stranden vid Västerudden ligger på Sandöns västra udde, på Sandhamn i Värmdö kommun. Från Västerudden är det omkring 1,5 kilometer längs Stockholm Archipelago Trail till ångbåtsbryggan i byn.'
union all
select 'sandhamn.sql#11' k, count(*) n from restaurants where slug = 'vasterudde-strand' and website is null
union all
select 'sandhamn.sql#12' k, count(*) n from restaurants where slug = 'sandhamns-glassigaste-stalle' and description = ''
union all
select 'sandhamn.sql#13' k, count(*) n from restaurants where slug = 'pub-alma-sandhamn' and description = ''
union all
select 'sandhamn.sql#14' k, count(*) n from restaurants where slug = 'cafe-ankaret' and name = 'Ankaret'
union all
select 'sandhamn.sql#15' k, count(*) n from restaurants where slug = 'cafe-ankaret' and description = 'Ankaret är ett kafé med butik och konstgalleri i Sandhamn i Värmdö kommun.'
union all
select 'sandhamn.sql#16' k, count(*) n from restaurants where slug = 'dykarbaren' and description = 'Dykarbaren på Sandhamn 425 i Värmdö kommun är bar och restaurang, med baren och matplatserna på nedervåningen. Enligt Dykarbaren växte café- och barverksamheten fram när man höll dykutbildningar på Sandhamn 1982, och samma ägare med familj har drivit stället i mer än 20 år. Uteserveringen ligger mitt emot, vid strandkanten. Säsongen 2026 var maj till september, och bord bokas bara inomhus eftersom uteserveringen inte helt går att vädersäkra.'
union all
select 'sandhamn.sql#17' k, count(*) n from restaurants where slug = 'ksss-gasthamn-lokholmen-trollsundet' and description = 'Trollsundet är den första delen av KSSS gästhamn på Lökholmen, som ligger i yttre havsbandet intill Sandhamn, strax nordost om Sandhamns gästhamn. Här ryms upp till 90 båtar, och båten kan anslutas till landström mot avgift. Tilläggning sker med mooringlina, boj eller Y-bom och det är förbjudet att ankra; under högsommaren är platserna i första hand reserverade för KSSS medlemmar. På ön finns toaletter, duschar, bastu och sophus, men från oktober till maj stänger KSSS av all el och vatten på ön och därmed även servicehus och bastu. Under högsäsong går en passbåt mellan Lökholmen och Sandhamn minst en gång i timmen.'
union all
select 'sandhamn.sql#18' k, count(*) n from restaurants where slug in ('stora-trouvillestranden', 'lilla-trouville-stranden') and hidden_at is not null and hidden_reason = 'Dubblett av Trouville (Toms beslut 6, faktagranskning b01 2026-11-09)'
union all
select 'sandhamn.sql#19' k, count(*) n from restaurants where slug = 'pub-alma-sandhamn' and hidden_at is not null and hidden_reason = 'Ingen tillåten källa bekräftar att puben finns (Toms beslut 6, faktagranskning b01)'
union all
select 'sandhamn.sql#20' k, count(*) n from restaurants where slug = 'sandhamns-glassigaste-stalle' and hidden_at is not null and hidden_reason = 'Ingen tillåten källa bekräftar att glasscaféet finns (Toms beslut 6, faktagranskning b01)'
union all
select 'sandhamn.sql#21' k, count(*) n from restaurants where slug = 'vasterudde-strand' and type = 'nature'
union all
select 'sandhamn.sql#22' k, count(*) n from restaurants where slug = 'ksss-gasthamn-lokholmen-trollsundet' and island = 'Lökholmen'
union all
select 'sandhamn.sql#23' k, count(*) n from restaurants where slug = 'cafe-strindbergsgarden' and name = 'Strindberg''s Champagne Club'
union all
select 'sandhamn.sql#24' k, count(*) n from restaurants where slug = 'cafe-strindbergsgarden' and type = 'restaurant'
union all
select 'sandhamn.sql#25' k, count(*) n from restaurants where slug = 'cafe-strindbergsgarden' and round(latitude::numeric,7) = round(59.2890639::numeric,7) and round(longitude::numeric,7) = round(18.9138771::numeric,7)
union all
select 'sandhamn.sql#26' k, count(*) n from restaurants where slug = 'cafe-strindbergsgarden' and website = 'https://strindbergs.se/'
union all
select 'sandhamn.sql#27' k, count(*) n from restaurants where slug = 'cafe-strindbergsgarden' and description = 'Strindberg''s Champagne Club är en champagnebar, restaurang och medlemsklubb i Strindbergsgården, Sandhamn 111, i hamnen på Sandhamn i Värmdö kommun. Klubben skriver att alla är välkomna till restaurangen och att medlemskapet, som är kostnadsfritt, dessutom ger inbjudningar och andra erbjudanden. Restaurangen har stängt efter sommarsäsongen 2026, och klubben har ännu inte planerat in datum för öppning under 2027.'
union all
select 'sandhamn.sql#28' k, count(*) n from restaurants where slug = 'cafe-strindbergsgarden' and formatted_address = 'Strindbergsgården, Sandhamn 111, Sandhamn'
union all
select 'sandhamn.sql#29' k, count(*) n from restaurants where slug = 'cafe-strindbergsgarden' and menu is null
union all
select 'sandhamn.sql#30' k, count(*) n from restaurants where slug = 'cafe-strindbergsgarden' and opening_hours is null
union all
select 'sandhamn.sql#31' k, count(*) n from restaurants where slug = 'cafe-strindbergsgarden' and categories = '{}'
union all
select 'sandhamn.sql#32' k, count(*) n from restaurants where slug = 'cafe-strindbergsgarden' and facilities = '{}'
union all
select 'sandhamn.sql#33' k, count(*) n from restaurants where slug = 'cafe-strindbergsgarden' and best_for = '{}'
union all
select 'sandhamn.sql#34' k, count(*) n from restaurants where slug = 'cafe-strindbergsgarden' and tags = '{sandhamn,strindberg}'
union all
select 'sandhamn.sql#35' k, count(*) n from restaurants where slug = 'cafe-strindbergsgarden' and google_place_id is null and google_photo_refs is null and google_rating is null and google_ratings_total is null and google_rating_updated is null and image_url is null
) t where n <> (case when k='sandhamn.sql#18' then 2 else 1 end) order by k;