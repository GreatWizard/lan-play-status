<template>
  <img
    v-if="advertiseData.locked"
    :src="require(`@/assets/icons/lock.png`)"
    class="icon"
    alt="🔒"
  />
</template>

<script>
export default {
  props: {
    advertiseData: Object
  }
};
</script>
