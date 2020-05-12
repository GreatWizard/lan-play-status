#!/usr/bin/env bash

curl http://nswdb.com/xml.php -o src/data/games.xml
./convert-games.js
rm src/data/games.xml
