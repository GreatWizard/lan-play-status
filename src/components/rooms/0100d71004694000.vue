<template>
  🌍
  {{ advertiseData.world }}
  {{ " " }}
  ({{ advertiseData.version }})
</template>

<script>
export default {
  props: {
    advertiseData: Object
  }
};
</script>
