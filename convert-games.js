#!/usr/bin/env node
/* eslint-disable no-console */

const fs = require("fs");
const xml2js = require("xml2js");
const tinfoil = require("./src/data/games.tinfoil.json");

const parser = new xml2js.Parser();
const file = fs.readFileSync("./src/data/games.nswdb.xml", {
  encoding: "utf8"
});

let games = {};

tinfoil.data.forEach(game => {
  let id = game.id.toLowerCase();
  games[id] = {
    id,
    name: game.name.replace(/<\/?[^>]+(>|$)/g, "")
  };
});

parser.parseString(file, function(err, result) {
  result.releases.release
    .filter(r => r.titleid[0] !== "" && r.name[0] !== "")
    .forEach(r => {
      let id = r.titleid[0].slice(0, 16).toLowerCase();
      games[id] = {
        id,
        name: r.name[0].split(/\[Rev.+\]/)[0].trim(),
        region: r.region[0]
      };
    });

  fs.writeFileSync(
    "./src/data/games.json",
    JSON.stringify(Object.values(games))
  );
});
