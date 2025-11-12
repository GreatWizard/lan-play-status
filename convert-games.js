#!/usr/bin/env node

import fs from 'fs'
import xml2js from 'xml2js'
import he from 'he'

import tinfoil from './tmp/games.tinfoil.json' with { type: 'json' }

const parser = new xml2js.Parser()
const file = fs.readFileSync('./tmp/games.nswdb.xml', {
  encoding: 'utf8',
})

let games = {}

tinfoil.data.forEach((game) => {
  let id = game.id.toLowerCase()
  let name = he.decode(game.name.replace(/<\/?[^>]+(>|$)|®|™/g, ''))
  let icon = game.icon.match('\\(https://.*\\)')

  if (icon && icon !== null) {
    icon = icon[0].replace('(', '').replace(')', '')
  } else {
    console.log(` *** no icon for ${name} (${id})`)
  }

  games[id] = {
    id,
    name,
    icon,
  }
})

parser.parseString(file, function (err, result) {
  result.releases.release
    .filter((r) => r.titleid[0] !== '' && r.name[0] !== '')
    .forEach((r) => {
      let id = r.titleid[0].slice(0, 16).toLowerCase()
      if (games[id] === undefined) {
        games[id] = {
          id,
          name: r.name[0].split(/\[Rev.+\]/)[0].trim(),
          region: r.region[0],
        }
      } else {
        games[id].region = r.region[0]
      }
    })

  fs.writeFileSync('./src/data/games.json', JSON.stringify(Object.values(games)))
})
