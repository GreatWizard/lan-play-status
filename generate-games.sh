#!/usr/bin/env bash

curl http://nswdb.com/xml.php -o public/data/games.xml
./convert-games.js
rm public/data/games.xml
