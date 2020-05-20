<template>
  <div>
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
  </div>
</template>

<script>
import Server from "@/components/Server.vue";
import Konami from "../konami";

export default {
  components: {
    Server
  },
  data() {
    return {
      servers: this.$store.state.servers,
      loadHidden: false,
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
      Konami(undefined, {
        callback: this.loadHiddenServers
      });
    }
  },
  methods: {
    fetchMonitors() {
      return this.$store.dispatch("fetchMonitors");
    },
    loadHiddenServers() {
      if (!this.loadHidden) {
        this.loadHidden = true;
        this.$store.commit("loadHiddenServers");
      }
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
