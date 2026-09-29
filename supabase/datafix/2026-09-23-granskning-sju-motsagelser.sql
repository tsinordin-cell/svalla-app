-- 2026-09-23: de sju sista platserna utan text – poster som motsade sig själva.

-- lange-jan-oland: fyr, inte restaurang. langejan.se: "Välkommen till Sveriges högsta fyr! Med en höjd på 42 meter är Långe Jan
--   landets högsta fyr. 197 trappsteg leder upp till toppen och utsikten över Östersjön och södra Öland"
update restaurants set type = 'attraction', website = 'https://langejan.se/',
 description = 'Långe Jan på Ölands södra udde är Sveriges högsta fyr, 42 meter hög. 197 trappsteg leder upp till toppen, med utsikt över Östersjön och södra Öland.',
 updated_at = now() where slug = 'lange-jan-oland';

-- lange-erik-oland: fyr, inte restaurang. oland.se/en/lighthouse-lange-erik: "Långe Erik ("Tall Erik"), official name Ölands norra udde,
--   is a Swedish lighthouse built in 1845 and located on a little island, Stora Grundet, in Grankullaviken bay at the north point of Öland.
--   The island is connected to Öland by a small bridge built in 1965.", "The lighthouse is 32 meters high"
update restaurants set type = 'attraction',
 description = 'Långe Erik, officiellt Ölands norra udde, är en fyr från 1845 på ön Stora Grundet i Grankullaviken på Ölands norra spets. Fyren är 32 meter hög, och ön nås via en bro från 1965.',
 updated_at = now() where slug = 'lange-erik-oland';

-- gotlands-bryggeri-gotland: bryggeri, inte restaurang. gotlandsbryggeri.se/besok-oss/: "Gotlands Bryggeri, beläget innanför Visbys
--   medeltida ringmur", "Rundtur genom Gotlands Bryggeri i Visby", "Smaka på unika ölsorter från Wisby och Bulldog-serierna",
--   "Bryggeriet, som startade 1995"
update restaurants set type = 'attraction',
 description = 'Gotlands Bryggeri ligger innanför Visbys medeltida ringmur och har bryggt öl sedan 1995. Bryggeriet tar emot grupper på rundtur med provsmakning av ölsorterna Wisby och Bulldog.',
 updated_at = now() where slug = 'gotlands-bryggeri-gotland';

-- byxelkroks-marina-sea-resort-oland: hotell med restaurang. byxelkroksmarina.se: "Adress Byxelkroks Marina Sea Resort Neptunivägen 5 387 75 Byxelkrok",
--   "Tel: Hotell 0485-285 50" (samma telefon som posten), "Vi erbjuder nyrenoverade rum/lägenheter för 2-6 personer. Samtliga med balkong
--   och en fantastisk utsikt över Kalmarsund.", "Boka bord 0485-66 94 00 restaurang@byxelkroksmarina.se"
update restaurants set type = 'hotel', website = 'https://www.byxelkroksmarina.se/',
 description = 'Byxelkroks Marina Sea Resort på Neptunivägen 5 i Byxelkrok på norra Öland har hotell och restaurang. Rummen och lägenheterna tar två till sex personer och har balkong mot Kalmarsund.',
 updated_at = now() where slug = 'byxelkroks-marina-sea-resort-oland';

-- m-s-sunnan-ii-aland: sunnan.ax (egen sida): "+358 457 3456 030" (samma telefon som posten), menyn "Bokning Våra kryssningar Menyer Rum & salonger"
update restaurants set
 description = 'M/S Sunnan II är ett fartyg i Mariehamn på Åland som erbjuder kryssningar med egna menyer, rum och salonger.',
 updated_at = now() where slug = 'm-s-sunnan-ii-aland';

-- bastu-brf-doppingen: OpenStreetMap på postens koordinat: "Bastu BRF Doppingen, Änggatan, Gröndal, Nynäshamn" (leisure=sauna).
--   En bostadsrättsförenings bastu i ett bostadsområde, inte ett besöksmål. Webbplatsen i posten (nattaro.se) hör till Nåttarö, 12 km bort.
update restaurants set hidden_at = now(), hidden_reason = 'Bostadsrättsföreningens egen bastu på Änggatan i Nynäshamn (OpenStreetMap), inget besöksmål; webbplatsen gällde Nåttarö'
 where slug = 'bastu-brf-doppingen' and hidden_at is null;

-- bad: namnet "Bad" är OSM:s allmänna etikett; koordinaten ligger på "Vallamor stigen, Torö Varv" (en stig). Ingen namngiven badplats.
update restaurants set hidden_at = now(), hidden_reason = 'Namnlös importrad ("Bad"); koordinaten är en stig vid Torö Varv (OpenStreetMap), ingen namngiven badplats'
 where slug = 'bad' and hidden_at is null;
