<template>
  <img
    v-if="advertiseData.bPassword"
    :src="require(`@/assets/icons/lock.png`)"
    class="icon"
    alt="🔒"
  />
  {{ " " }}
  <img
    v-if="advertiseData.ServerMap"
    :src="require(`@/assets/icons/ground.png`)"
    class="icon"
    alt="🗺️"
  />
  {{ " " }}
  {{ advertiseData.ServerMap }}
</template>

<script>
export default {
  props: {
    advertiseData: Object
  }
};
</script>
