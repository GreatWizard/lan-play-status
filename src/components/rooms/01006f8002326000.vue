<template>
  <img
    v-if="advertiseData.dodoCode"
    :src="require(`@/assets/icons/island-code.png`)"
    class="icon"
    alt="🏝️🔒"
  />
  <img
    v-else
    :src="require(`@/assets/icons/island.png`)"
    class="icon"
    alt="🏝️"
  />&nbsp;<strong>{{ advertiseData.island }}</strong>
</template>

<script>
export default {
  props: {
    advertiseData: Object
  }
};
</script>
