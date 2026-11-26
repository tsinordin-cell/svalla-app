select * from (
select 'husaro.sql#2' k, count(*) n from restaurants where slug = 'husaro-gasthamn-cafe' and name = 'Husarö Handel gästhamn'
union all
select 'husaro.sql#3' k, count(*) n from restaurants where slug = 'husaro-gasthamn-cafe' and round(latitude::numeric,7) = round(59.5018917::numeric,7) and round(longitude::numeric,7) = round(18.8454895::numeric,7)
union all
select 'husaro.sql#4' k, count(*) n from restaurants where slug = 'husaro-gasthamn-cafe' and website = 'http://husarohandel.se/'
union all
select 'husaro.sql#6' k, count(*) n from restaurants where slug = 'soderlangholm' and name = 'Söder-Långholm'
) t where n <> (case when k='sandhamn.sql#18' then 2 else 1 end) order by k;