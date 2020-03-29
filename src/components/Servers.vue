<template>
  <table>
    <thead>
      <tr>
        <th>Server</th>
        <th>Status</th>
        <th class="hide--on-mobile">Country</th>
        <th class="hide--on-mobile">Platform</th>
        <th>Ping</th>
      </tr>
    </thead>
    <tbody>
      <Server
        v-for="server in servers"
        :server="server"
        :key="`${server.ip}:${server.port}`"
      />
    </tbody>
  </table>
</template>

<script>
import Server from "@/components/Server.vue";

export default {
  components: {
    Server
  },
  data() {
    return {
      servers: this.$store.state.servers
    };
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
  td,
  th {
    border-bottom: 1px solid #ddd;
    padding: 8px;
    text-align: center;

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
}
@media screen and (max-width: 768px) {
  .hide--on-mobile {
    display: none;
  }
}
</style>
