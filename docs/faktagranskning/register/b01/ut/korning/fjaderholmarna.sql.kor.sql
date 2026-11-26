update restaurants set latitude = 59.3294071, longitude = 18.1760774
 where slug = 'rokeriet-fjaderholmarna' and latitude = 59.3208 and longitude = 18.1628;
update restaurants set latitude = 59.3291303, longitude = 18.1751220
 where slug = 'fjaderholmarna-bryggeri' and latitude = 59.3283 and longitude = 18.175;
update restaurants set name = 'Fjäderholmarnas Bryggeri'
 where slug = 'fjaderholmarna-bryggeri' and name = 'Fjäderholmarnas Bryggeri Taproom';
update restaurants set description = 'Fjäderholmarnas gästhamn ligger på Stora Fjäderholmen i Lidingö kommun, utanför Blockhusudden vid inloppet till Stockholm. Hamnen har 35 gästplatser med förtöjning vid boj. Svenska Gästhamnar anger el, färskvatten, toalett och dusch, och duschen ingår. Hamnvärd är Sjöstation Fjäderholmarna.'
 where slug = 'fjaderholmarnas-gasthamn' and description = 'Gästhamnen ligger på Stora Fjäderholmen utanför Blockhusudden vid inloppet till Stockholm och har 35 gästplatser med förtöjning vid boj. Hamndjupet är mellan 1 och 8 meter, och dusch ingår. Hamnvärd är Sjöstation Fjäderholmarna.';