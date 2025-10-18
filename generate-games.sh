#!/usr/bin/env bash

mkdir -p tmp
curl --location http://nswdb.com/xml.php -o tmp/games.nswdb.xml
curl --location http://tinfoil.media/Title/ApiJson/ -o tmp/games.tinfoil.json
./convert-games.js
