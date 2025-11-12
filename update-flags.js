#!/usr/bin/env node

import dns from 'dns'
import geoip from 'geoip-country'
import servers from './public/data/servers.json' with { type: 'json' }

const updateData = async function (server) {
  let { ip, port = '14451', flag, platform = 'switch', type = 'rust' } = server
  return await new Promise((resolve) => {
    dns.resolve4(ip, (err, addresses) => {
      if (err) {
        console.warn(err)
      }
      let result = {
        ip,
        port,
        flag,
        platform,
        type,
      }
      if (addresses && addresses.length > 0) {
        let lookup = geoip.lookup(addresses[0])
        let detected = (lookup && lookup.country.toLowerCase()) || undefined
        if (result.flag !== detected) {
          console.log(`  * "${ip}" must be updated to the flag "${detected}".`)
          result.flag = detected
        }
      }
      resolve(result)
    })
  })
}

const getData = async () => {
  return Promise.all(servers.map((server) => updateData(server)))
}

getData().then((data) => {
  console.log(data)
})
