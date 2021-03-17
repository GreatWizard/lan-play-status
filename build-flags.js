#!/usr/bin/env node
/* eslint-disable no-console */

const fs = require("fs");
const { optimize } = require("svgo");

const translationsPath = "./src/locales/en.json";
const sourcePath = "./node_modules/flagpack-core/svg/l/";
const distPath = "./src/assets/flags/";

const servers = require("./public/data/servers.json");
const communities = require("./src/data/communities.json");
const translations = require(translationsPath);

const countryCodeList = require("./node_modules/flagpack-core/countryCodeList.json");

let flags = [];

servers.forEach(s => {
  let f = s.flag.toUpperCase();
  if (!flags.includes(f)) {
    flags.push(f);
  }
});

communities.forEach(c => {
  c.flags?.forEach(flag => {
    let f = flag.toUpperCase();
    if (!flags.includes(f)) {
      flags.push(f);
    }
  });
});

fs.rmdirSync(distPath, { recursive: true });
fs.mkdirSync(distPath, { recursive: true });
flags.forEach(f => {
  const content = fs.readFileSync(`${sourcePath}${f.toUpperCase()}.svg`);
  const result = optimize(content, {
    multipass: true
  });
  fs.writeFileSync(`${distPath}${f.toLowerCase()}.svg`, result.data);
});

let countries = {};
countryCodeList
  .filter(c => flags.includes(c.alpha2))
  .forEach(c => {
    countries[c.alpha2.toLowerCase()] = c.countryName;
  });
translations.countries = countries;
fs.writeFileSync(translationsPath, JSON.stringify(translations, 0, 2));
