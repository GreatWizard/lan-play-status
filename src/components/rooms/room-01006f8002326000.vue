<template>
  <img v-if="advertiseData.code" src="@/assets/icons/island-code.png" class="icon" alt="🏝️🔒" />
  <img v-else src="@/assets/icons/island.png" class="icon" alt="🏝️" />
  {{ ' ' }}
  <strong>{{ advertiseData.island }}</strong>
</template>

<script>
export default {
  props: {
    advertiseData: Object,
  },
}
</script>
