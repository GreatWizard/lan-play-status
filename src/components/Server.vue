<template>
  <tr>
    <td>{{server.ip}}</td>
    <CellStatus :server="server" />
    <td>
      <flag :iso="server.flag" :title="server.flag" :squared="false" />
    </td>
    <CellIcon :platform="server.platform" />
  </tr>
</template>

<script>
import CellStatus from "@/components/CellStatus.vue";
import CellIcon from "@/components/CellIcon.vue";

export default {
  components: {
    CellStatus,
    CellIcon
  },
  props: {
    server: Object
  }
};
</script>
