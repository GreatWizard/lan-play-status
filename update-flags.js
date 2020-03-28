#!/usr/bin/env node
/* eslint-disable no-console */

const dns = require("dns");
const geoip = require("geoip-country");
const servers = require("./public/data/servers.json");

const updateData = async function(server) {
  let { ip, port = "14451", flag, platform = "switch", type = "node" } = server;
  return await new Promise((resolve, reject) => {
    dns.resolve4(ip, (err, addresses) => {
      if (err) reject(err);
      let result = {
        ip,
        port,
        flag,
        platform,
        type
      };
      if (addresses && addresses.length > 0) {
        let detected = geoip.lookup(addresses[0]).country.toLowerCase();
        if (result.flag !== detected) {
          console.log(`  * "${ip}" must be updated to the flag "${detected}".`);
          result.flag = detected;
        }
      }
      resolve(result);
    });
  });
};

const getData = async () => {
  return Promise.all(servers.map(server => updateData(server)));
};

getData().then(data => {
  console.log(data);
});
