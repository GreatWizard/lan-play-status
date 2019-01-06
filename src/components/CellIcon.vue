<template>
  <td :data-tooltip="tooltip">
    <img
      :alt="platform"
      class="icon"
      :src="require(`@/assets/${platform}.png`)"
    />
  </td>
</template>

<script>
export default {
  props: {
    platform: String
  },
  computed: {
    tooltip() {
      switch (this.platform) {
        case "switch":
          return "Switch";
        case "ps4":
          return "PS4";
        default:
          return undefined;
      }
    }
  }
};
</script>
