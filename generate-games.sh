#!/usr/bin/env bash

curl http://nswdb.com/xml.php -o src/data/games.nswdb.xml
curl http://tinfoil.media/Title/ApiJson/ -o src/data/games.tinfoil.json
./convert-games.js
rm src/data/games.nswdb.xml
rm src/data/games.tinfoil.json
