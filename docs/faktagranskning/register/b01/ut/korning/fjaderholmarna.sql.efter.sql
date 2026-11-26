select * from (
select 'fjaderholmarna.sql#1' k, count(*) n from restaurants where slug = 'rokeriet-fjaderholmarna' and round(latitude::numeric,7) = round(59.3294071::numeric,7) and round(longitude::numeric,7) = round(18.1760774::numeric,7)
union all
select 'fjaderholmarna.sql#2' k, count(*) n from restaurants where slug = 'fjaderholmarna-bryggeri' and round(latitude::numeric,7) = round(59.3291303::numeric,7) and round(longitude::numeric,7) = round(18.1751220::numeric,7)
union all
select 'fjaderholmarna.sql#3' k, count(*) n from restaurants where slug = 'fjaderholmarna-bryggeri' and name = 'Fjäderholmarnas Bryggeri'
union all
select 'fjaderholmarna.sql#4' k, count(*) n from restaurants where slug = 'fjaderholmarnas-gasthamn' and description = 'Fjäderholmarnas gästhamn ligger på Stora Fjäderholmen i Lidingö kommun, utanför Blockhusudden vid inloppet till Stockholm. Hamnen har 35 gästplatser med förtöjning vid boj. Svenska Gästhamnar anger el, färskvatten, toalett och dusch, och duschen ingår. Hamnvärd är Sjöstation Fjäderholmarna.'
) t where n <> (case when k='sandhamn.sql#18' then 2 else 1 end) order by k;