<template>
  <img
    :src="require(`@/assets/flags/${code}.svg`)"
    :alt="$t(`countries.${code}`)"
    class="flag"
  />
</template>

<style scoped lang="scss">
.flag {
  border-radius: 1.5px;
}
</style>

<script>
export default {
  props: {
    code: {
      type: String,
      required: true
    }
  }
};
</script>
