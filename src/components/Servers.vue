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
      <button v-if="loadMore" @click="loadMoreServers">Load more...</button>
    </div>
    <em class="hide--on-mobile">
      These servers are not linked to this site. We list them to help you find
      other players who speak the same language.
    </em>
  </div>
</template>

<script>
import Server from "@/components/Server.vue";

export default {
  components: {
    Server
  },
  data() {
    return {
      servers: this.$store.state.servers,
      loadMore: true
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
      if (this.loadMore) {
        this.loadMore = false;
        this.$store.commit("loadMoreServers");
      }
    }
  }
};
</script>

<style lang="scss">
table {
  border-collapse: collapse;
  width: 100%;
  max-width: 800px;
  margin: 0px auto;
  td,
  th {
    border-bottom: 1px solid #ddd;
    padding: 8px;
    text-align: center;
    font-size: 0.9rem;
    @media only screen and (max-width: 768px) {
      padding: 2px;
    }
  }
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  tr:hover {
    background-color: #ddd;
  }
  th {
    padding: 12px;
    background-color: #5f4339;
    color: white;

    @media only screen and (max-width: 768px) {
      padding: 4px;
    }
  }
  td {
    .icon {
      vertical-align: middle;
    }
  }
}
@media screen and (max-width: 768px) {
  .hide--on-mobile {
    display: none;
  }
}
</style>
