<template>
  <table>
    <thead>
      <tr>
        <th>Server</th>
        <th>Status</th>
        <th class="hide--on-mobile">Country</th>
        <th class="hide--on-mobile">Platform</th>
        <th>Ping</th>
        <th>Uptime</th>
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
    These servers are not linked to this site. We list them to help you find
    other players who speak the same language.
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
