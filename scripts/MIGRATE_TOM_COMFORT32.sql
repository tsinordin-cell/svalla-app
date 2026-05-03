-- Migrera Toms Comfort 32-annons (thread 19cb8f74-225f-457b-87cc-57b4d73a7a73)
-- från fri-text-body till strukturerad listing_data så LoppisListingCard
-- kan rendra den som en riktig marknadsplats-annons.
--
-- Bilder fattas — läggs till av Tom via redigera-flödet senare.
--
-- Sätt också rensad body som ren beskrivning (utan markdown-specs som nu
-- finns i listing_data.specs).

update public.forum_threads
set listing_data = jsonb_build_object(
  'price',         150000,
  'currency',      'SEK',
  'condition',     'Mycket bra',
  'category',      'Båt',
  'images',        '[]'::jsonb,
  'specs',         jsonb_build_array(
                     jsonb_build_object('label', 'Modell',   'value', 'Comfort 32'),
                     jsonb_build_object('label', 'Årsmodell','value', '1979'),
                     jsonb_build_object('label', 'Designer', 'value', 'Bengt-Erik Bengtsson'),
                     jsonb_build_object('label', 'Varv',     'value', 'Comfortvarvet, Halmstad'),
                     jsonb_build_object('label', 'Skrov',    'value', 'GRP'),
                     jsonb_build_object('label', 'Status',   'value', 'På land — behöver vårrustning')
                   ),
  'location',      'Halmstad',
  'external_link', 'https://www.blocket.se/mobility/item/22475159',
  'status',        'aktiv'
),
body = E'En kompis säljer sin **Comfort 32** från 1979 — en välhållen klassisk svensk havssegelbåt som har älskats och skötts om i många säsonger.\n\nBåten har stått på land i två år och behöver vårrustning + lite finputs innan säsongen, men är i grunden i mycket bra skick.\n\n**Varför Comfort 32?**\n- Robust GRP-skrov som tål nordiska vatten\n- Måttligt djupgående — passar Stockholms skärgård utmärkt\n- Pålitlig och förlåtande — populär bland familjeseglare i 50 år och fortfarande efterfrågad\n\nHör gärna av er om ni har frågor eller vill se båten på land.'
where id = '19cb8f74-225f-457b-87cc-57b4d73a7a73'
  and category_id = 'loppis';

-- Verifiera
select id, title, listing_data->>'price' as price, listing_data->>'status' as status,
       jsonb_array_length(listing_data->'specs') as spec_count
from public.forum_threads
where id = '19cb8f74-225f-457b-87cc-57b4d73a7a73';
