<template>
  <img
    v-if="advertiseData.quest"
    :src="require(`@/assets/icons/mh-ticket.png`)"
    class="icon"
    alt="🎫"
  />
</template>

<script>
export default {
  props: {
    advertiseData: Object
  }
};
</script>
