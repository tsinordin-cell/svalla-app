select * from (
select 'mallar.sql#1' k, count(*) n from restaurants where slug = 'dalaro-smadalaro-gard' and island = 'Smådalarö'
) t where n <> (case when k='sandhamn.sql#18' then 2 else 1 end) order by k;