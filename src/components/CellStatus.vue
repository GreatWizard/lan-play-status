<template>
  <td v-if="checkOnline.status < 0">
    <img alt="Offline" class="icon" src="../assets/offline.png">
  </td>
  <td v-else-if="checkOnline.status >= 0" :data-tooltip="tooltip">
    {{checkOnline.data.online}}
    <img alt="Users" class="icon" src="../assets/users.png">
  </td>
  <td v-else>
    <img alt="Users" class="icon icon--spin" src="../assets/spinner.png">
  </td>
</template>

<script>
export default {
  props: {
    server: Object
  },
  computed: {
    checkOnline() {
      this.$store.dispatch("checkServer", this.server.ip, this.server.port);
      return this.server;
    },
    tooltip() {
      return `Version: ${this.server.data.version}`;
    }
  }
};
</script>
