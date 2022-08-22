<template>
  <table>
    <thead>
      <tr>
        <th>{{ $t("servers.table.server") }}</th>
        <th>{{ $t("servers.table.status") }}</th>
        <th class="hide--on-mobile">{{ $t("servers.table.country") }}</th>
        <th>{{ $t("servers.table.ping") }}</th>
        <th>{{ $t("servers.table.uptime") }}</th>
      </tr>
    </thead>
    <tbody>
      <Server
        v-for="server in servers"
        :server="server"
        :monitors="monitors"
        :key="`${server.ip}:${server.port}`"
      />
    </tbody>
  </table>
  <div>
    <button v-if="!loadMore" @click="loadMoreServers">Load more...</button>
  </div>
  <em class="hide--on-mobile">
    {{ $t("servers.message") }}
  </em>
</template>

<script>
import Server from "@/components/servers/Server.vue";

export default {
  components: {
    Server
  },
  data() {
    return {
      servers: this.$store.state.servers,
      loadMore: false
    };
  },
  computed: {
    monitors() {
      return this.$store.state.monitors;
    }
  },
  mounted() {
    if (!this.monitors) {
      this.fetchMonitors();
    }
  },
  methods: {
    fetchMonitors() {
      return this.$store.dispatch("fetchMonitors");
    },
    loadMoreServers() {
      if (!this.loadMore) {
        this.loadMore = true;
        this.$store.commit("loadMoreServers");
      }
    }
  }
};
</script>
