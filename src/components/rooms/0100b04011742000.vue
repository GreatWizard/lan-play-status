<template>
  <img
    v-if="advertiseData.code"
    :src="require(`@/assets/icons/lock.png`)"
    class="icon"
    alt="🔒"
  />
  HR{{ advertiseData.rank }} MR{{ advertiseData.masterRank }}
</template>

<script>
export default {
  props: {
    advertiseData: Object
  }
};
</script>
