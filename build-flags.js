#!/usr/bin/env node

import fs from 'fs'
import { optimize } from 'svgo'

const translationsPath = './src/locales/en.json'
const sourcePath = './node_modules/flagpack-core/svg/l/'
const distPath = './src/assets/flags/'

import servers from './public/data/servers.json' with { type: 'json' }
import communities from './src/data/communities.json' with { type: 'json' }
import translations from './src/locales/en.json' with { type: 'json' }

import countryCodeList from './node_modules/flagpack-core/countryCodeList.json' with { type: 'json' }

let flags = []

servers.forEach((s) => {
  let f = s.flag.toUpperCase()
  if (!flags.includes(f)) {
    flags.push(f)
  }
})

communities.forEach((c) => {
  c.flags?.forEach((flag) => {
    let f = flag.toUpperCase()
    if (!flags.includes(f)) {
      flags.push(f)
    }
  })
})

fs.rmSync(distPath, { recursive: true })
fs.mkdirSync(distPath, { recursive: true })

flags.forEach((f) => {
  const content = fs.readFileSync(`${sourcePath}${f.toUpperCase()}.svg`)
  const result = optimize(content, {
    multipass: true,
  })
  fs.writeFileSync(`${distPath}${f.toLowerCase()}.svg`, result.data)
})

let countries = {}

countryCodeList
  .filter((c) => flags.includes(c.alpha2))
  .forEach((c) => {
    countries[c.alpha2.toLowerCase()] = c.countryName
  })

translations.countries = countries

fs.writeFileSync(translationsPath, JSON.stringify(translations, 0, 2) + '\n')
