<template>
  <table>
    <thead>
      <tr>
        <th>{{ $t('servers.table.server') }}</th>
        <th>{{ $t('servers.table.status') }}</th>
        <th class="hide--on-mobile">{{ $t('servers.table.country') }}</th>
        <th>{{ $t('servers.table.ping') }}</th>
        <th>{{ $t('servers.table.uptime') }}</th>
      </tr>
    </thead>
    <tbody>
      <ServerItem
        v-for="server in this.serversStore.servers"
        :server="server"
        :monitors="monitors"
        :key="`${server.ip}:${server.port}`"
      />
    </tbody>
  </table>
  <div>
    <button v-if="!this.serversStore.loadMore" @click="loadMoreServers">Load more...</button>
  </div>
  <em class="hide--on-mobile">
    {{ $t('servers.message') }}
  </em>
</template>

<script>
import ServerItem from '@/components/servers/ServerItem.vue'
import { useServersStore } from '@/stores/servers'

export default {
  components: {
    ServerItem,
  },
  setup() {
    return { serversStore: useServersStore() }
  },
  computed: {
    monitors() {
      return this.serversStore.monitors
    },
  },
  mounted() {
    if (!this.monitors) {
      this.fetchMonitors()
    }
  },
  methods: {
    fetchMonitors() {
      return this.serversStore.fetchMonitors()
    },
    loadMoreServers() {
      this.serversStore.loadMoreServers()
    },
  },
}
</script>
