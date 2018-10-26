<template>
  <tr>
    <td>{{item.ip}}</td>
    <ServerStatus :status="item.status" />
    <td>
      <flag :iso="item.flag" :title="item.flag" :squared="false" />
    </td>
    <td>
      <PlatformIcon :platform="item.platform" />
    </td>
  </tr>
</template>

<script>
import ServerStatus from "@/components/ServerStatus.vue";
import PlatformIcon from "@/components/PlatformIcon.vue";

export default {
  components: {
    ServerStatus,
    PlatformIcon
  },
  props: {
    item: Object
  }
};
</script>
