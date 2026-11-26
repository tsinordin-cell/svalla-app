update restaurants set name = 'Husarö Handel gästhamn', updated_at = now()
 where slug = 'husaro-gasthamn-cafe' and name = 'Husarö Gästhamn & Café';
update restaurants set latitude = 59.5018917, longitude = 18.8454895, updated_at = now()
 where slug = 'husaro-gasthamn-cafe' and latitude = 59.5064 and longitude = 18.8475;
update restaurants set website = 'http://husarohandel.se/', updated_at = now()
 where slug = 'husaro-gasthamn-cafe' and website = 'https://www.svenskagasthamnar.se/stockholms-skargard/husaro/';
update restaurants set name = 'Söder-Långholm', updated_at = now()
 where slug = 'soderlangholm' and name = 'Söderlångholm';