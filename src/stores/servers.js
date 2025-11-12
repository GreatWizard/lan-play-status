import { defineStore } from 'pinia'

import serversSource from '../../public/data/servers.json'
import { filterBy, rejectBy, truthyBy, falsyBy } from '@/utils/filters'

const serverMapping = ({
  ip,
  flag,
  port = 11451,
  platform = 'switch',
  type = 'rust',
  games,
  comment,
}) => {
  return {
    ip,
    port,
    flag,
    platform,
    type,
    games,
    comment,
    highlight: false,
  }
}

export const useServersStore = defineStore('servers', {
  state: () => ({
    servers: serversSource
      .filter(falsyBy('hidden'))
      .filter(filterBy('type', 'rust'))
      .map(serverMapping),
    loadMore: false,
    loadHidden: false,
    monitors: undefined,
  }),

  actions: {
    fetchMonitors() {
      return fetch('https://api.uptimerobot.com/v2/getMonitors', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'api_key=ur905839-35c881f5b6efeb47afd5bff9&format=json&all_time_uptime_ratio=1',
      })
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          this.monitors = data.monitors
        })
    },

    loadHiddenServers() {
      serversSource
        .filter(truthyBy('hidden'))
        .map(serverMapping)
        .forEach((server) => this.servers.push(server))

      this.loadHidden = true
    },

    loadMoreServers() {
      serversSource
        .filter(rejectBy('type', 'rust'))
        .map(serverMapping)
        .forEach((server) => this.servers.push(server))

      this.loadMore = true
    },
  },
})
