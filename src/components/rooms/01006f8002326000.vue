<template>
  <span
    >🧙 <strong>{{ this.room.hostPlayerName }}</strong> 🏝️
    <strong>{{ this.advertiseData.island }}</strong></span
  >
</template>

<script>
export default {
  props: {
    room: Object,
    advertiseData: Object
  }
};
</script>
