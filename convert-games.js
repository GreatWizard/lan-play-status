#!/usr/bin/env node
/* eslint-disable no-console */

const fs = require("fs");
const xml2js = require("xml2js");

const parser = new xml2js.Parser();
const file = fs.readFileSync("./src/data/games.xml", { encoding: "utf8" });
parser.parseString(file, function(err, result) {
  let games = result.releases.release
    .filter(r => r.titleid[0] !== "" && r.name[0] !== "")
    .map(r => {
      return {
        id: r.titleid[0].slice(0, 16).toLowerCase(),
        name: r.name[0].split(/\[Rev.+\]/)[0].trim(),
        region: r.region[0]
      };
    });
  fs.writeFileSync("./src/data/games.json", JSON.stringify(games));
});
