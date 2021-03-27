<template>
  <img
    v-if="advertiseData.code"
    :src="require(`@/assets/icons/lock.png`)"
    class="icon"
    alt="🔒"
    :title="advertiseData.code"
  />
</template>

<script>
export default {
  props: {
    advertiseData: Object
  }
};
</script>
