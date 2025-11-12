<template>
  <img :src="getFlag(`/assets/flags/${code}.svg`)" :alt="$t(`countries.${code}`)" class="flag" />
</template>

<style scoped lang="scss">
.flag {
  border-radius: 1.5px;
}
</style>

<script>
const flags = Object.entries(import.meta.glob('@/assets/flags/*.svg', { eager: true }))

export default {
  setup() {
    return {
      getFlag(path) {
        const imageEntry = flags.find(([key]) => key.endsWith(path))

        if (imageEntry) {
          return imageEntry[1].default
        }
      },
    }
  },
  props: {
    code: {
      type: String,
      required: true,
    },
  },
}
</script>
