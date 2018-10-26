<template>
  <table>
    <thead>
      <tr>
        <th>Server</th>
        <th>Status</th>
        <th>Country</th>
        <th>Platform</th>
      </tr>
    </thead>
    <tbody>
      <Server
        v-for="item in servers"
        :item="item"
        :key="item.ip"
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
  }
}
</style>
