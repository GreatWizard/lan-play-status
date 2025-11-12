<template>
  <span ref="dataToCopy">{{ data }}</span
  >&nbsp;<button class="copy-button hide--on-mobile" :data-tooltip="$t('general.copy')">
    <img :alt="$t('general.copy')" class="icon" src="@/assets/icons/copy.png" v-on:click="copy" />
  </button>
</template>

<script>
export default {
  props: {
    data: String,
  },
  methods: {
    copy() {
      let el = this.$refs.dataToCopy
      let range = document.createRange()
      range.selectNode(el)
      window.getSelection().addRange(range)
      document.execCommand('copy')
      window.getSelection().removeAllRanges()
    },
  },
}
</script>

<style scoped lang="scss">
.copy-button {
  padding: 4px;
  cursor: pointer;
  outline: none;
  border: none;
  background-color: #ffffff00;
  border-radius: 4px;

  &:hover {
    background-color: #52525220;
  }

  &:active {
    background-color: #52525240;
    transform: translateY(1px);
  }
}
</style>
