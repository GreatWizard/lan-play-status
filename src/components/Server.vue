<template>
  <tr :class="trClasses" v-if="checkOnline.status >= 0">
    <td>{{server.ip}}:{{server.port}}</td>
    <td :data-tooltip="tooltip">
      {{checkOnline.data.online}}
      <img alt="Users" class="icon" src="../assets/users.png">
    </td>
    <td>
      <flag :iso="server.flag" :title="server.flag" :squared="false" />
    </td>
    <CellIcon :platform="server.platform" />
  </tr>
</template>

<script>
import CellIcon from "@/components/CellIcon.vue";

export default {
  components: {
    CellIcon
  },
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
    },
    trClasses() {
      return this.server.highlight ? 'highlight': '';
    }
  }
};
</script>

<style lang="scss">
tr.highlight {
  td {
    font-weight: bold;
  }
}
</style>
