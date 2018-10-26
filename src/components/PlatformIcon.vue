<template>
  <img :alt="platform" class="icon" :src="require(`@/assets/${platform}.png`)">
</template>


<script>
export default {
  props: {
    platform: String
  }
};
</script>
