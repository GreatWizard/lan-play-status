<template>
  <span>
    <img :src="require(`@/assets/${icon}.png`)" class="icon" alt="" />

    <strong> {{ this.room.hostPlayerName }}</strong>
  </span>
</template>

<script>
const icons = ["felyne", "melynx"];

export default {
  props: {
    room: Object
  },
  computed: {
    icon() {
      return icons[this.room.hostPlayerName.length % icons.length];
    }
  }
};
</script>
