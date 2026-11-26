select * from (
select 'uto.sql#1' k, count(*) n from restaurants where slug = 'uto-bykrog' and description = 'Utö by Krog är en skärgårdsrestaurang i Edesnäs på Utö i Haninge kommun. Adressen är Edesnäs Gård 3, och restaurangen tar emot bordsbokningar och förfrågningar om catering. Enligt restaurangen vill den vara en mötesplats för både öbor och besökare.'
union all
select 'uto.sql#2' k, count(*) n from restaurants where slug = 'uto-bykrog' and name = 'Utö by Krog'
union all
select 'uto.sql#3' k, count(*) n from restaurants where slug = 'gruvbryggan' and description = 'Gruvbryggan är den mest trafikerade av Waxholmsbolagets bryggor på Utö i Haninge kommun, och här lägger båtarna på linje 21 från Årsta brygga till. Längre söderut angör båtarna också Näsudden och Spränga. Bryggan ligger i norra delen av Utö gästhamn, där också sjömacken finns.'
union all
select 'uto.sql#4' k, count(*) n from restaurants where slug = 'lilla-haket-ninas-bod' and description = 'Platsen ligger vid Bygatan i Gruvbyn på Utö, Haninge kommun. I Gruvbyn finns enligt Skärgårdsstiftelsen bland annat gästhamn, turistbyrå, livsmedelsbutik och bageri.'
union all
select 'uto.sql#5' k, count(*) n from restaurants where slug = 'lilla-haket-ninas-bod' and hidden_at is not null and hidden_reason = 'Inget namn är belagt av verksamheten eller en myndighet (faktagranskning batch 01, uto-0401, ub01-k016)'
union all
select 'uto.sql#6' k, count(*) n from restaurants where slug = 'bakgarden-uto' and description = 'Bakgården Utö ligger i Gruvbyn på Utö, Haninge kommun. I Gruvbyn finns ett bageri där det går att köpa nybakat bröd.'
union all
select 'uto.sql#7' k, count(*) n from restaurants where slug = 'uto-gasthamn-sjomack' and description = 'Utö Sjömack är sjömacken i norra delen av Utö gästhamn i Gruvbyn på Utö, Haninge kommun. Här går det att tanka båten och hyra moped.'
union all
select 'uto.sql#8' k, count(*) n from restaurants where slug = 'uto-vardshus' and description = 'Utö Värdshus är hotell, restaurang och konferensanläggning i Gruvbyn på Utö, Haninge kommun. Hotellrummen finns i Kvarnvillan, Stenhotellet och hotellstugorna, och för konferenser finns 14 mötesrum för grupper på 2 till 100 personer. Till värdshuset hör också Seglarbaren och Bakfickan.'
union all
select 'uto.sql#9' k, count(*) n from restaurants where slug = 'bryggans-lilla-kok-uto' and name = 'Bryggans café och bar'
union all
select 'uto.sql#10' k, count(*) n from restaurants where slug = 'stf-vandrarhem-uto' and name = 'Utö Vandrarhem Skärgården'
union all
select 'uto.sql#11' k, count(*) n from restaurants where slug = 'gruvbryggan' and round(latitude::numeric,7) = round(58.9704915::numeric,7) and round(longitude::numeric,7) = round(18.3251962::numeric,7)
union all
select 'uto.sql#12' k, count(*) n from restaurants where slug = 'bryggans-lilla-kok-uto' and round(latitude::numeric,7) = round(58.9703328::numeric,7) and round(longitude::numeric,7) = round(18.3274586::numeric,7)
union all
select 'uto.sql#13' k, count(*) n from restaurants where slug = 'uto-gasthamn-sjomack' and round(latitude::numeric,7) = round(58.9706315::numeric,7) and round(longitude::numeric,7) = round(18.3272322::numeric,7)
union all
select 'uto.sql#14' k, count(*) n from restaurants where slug = 'bakgarden-uto' and round(latitude::numeric,7) = round(58.9694382::numeric,7) and round(longitude::numeric,7) = round(18.3225705::numeric,7)
union all
select 'uto.sql#15' k, count(*) n from restaurants where slug = 'bakfickan-uto' and round(latitude::numeric,7) = round(58.967438::numeric,7) and round(longitude::numeric,7) = round(18.3304686::numeric,7)
union all
select 'uto.sql#16' k, count(*) n from restaurants where slug = 'stf-vandrarhem-uto' and description = 'Utö Vandrarhem Skärgården är ett vandrarhem i Gruvbyn på Utö i Haninge kommun, i backen upp mot Utö Värdshus. Huset är en hotellbyggnad i trä i tre våningar, som enligt Haninge kommuns kulturmiljöinventering byggdes efter 1878, när Utö planerades som badort, och är ett av de första hotellen från den tiden. Vandrarhemmet har öppet april till oktober och har 73 bäddar, gemensamma kök för självhushåll och dusch och wc i korridoren. Husdjur är inte tillåtna, och man checkar in i värdshusets reception.'
union all
select 'uto.sql#17' k, count(*) n from restaurants where slug = 'rano-brygga' and name = 'Rånökällan'
union all
select 'uto.sql#18' k, count(*) n from restaurants where slug = 'rano-brygga' and description = 'Rånökällan är en restaurang på Rånö i Haninge kommun, med uteservering och veranda med utsikt över Ernviken. Den ligger intill livsmedelsbutiken Rånö Livs vid Ernviken, nära Waxholmsbåtens brygga, och drivs av Rånö Brygga, som också har stugbyn på ön. Restaurangen serverar mat, kylda drycker, glass och färskt bröd. Enligt restaurangen var sista dagen för säsongen lördagen den 8 augusti, och den öppnar igen i juni 2027.'
union all
select 'uto.sql#19' k, count(*) n from restaurants where slug = 'rano-brygga' and website = 'https://rano.se/krog/'
union all
select 'uto.sql#20' k, count(*) n from restaurants where slug = 'rano-brygga' and round(latitude::numeric,7) = round(58.9197616::numeric,7) and round(longitude::numeric,7) = round(18.1763804::numeric,7)
union all
select 'uto.sql#21' k, count(*) n from restaurants where slug = 'uto-camping-och-stugor' and type = 'camping'
) t where n <> (case when k='sandhamn.sql#18' then 2 else 1 end) order by k;