<template>
  <td v-if="status < 0">
    <img alt="Offline" class="icon" src="../assets/offline.png">
  </td>
  <td v-else-if="status >= 0">
    {{status}}
    <img alt="Users" class="icon" src="../assets/users.png">
  </td>
  <td v-else>
    {{status}}
    <img alt="Users" class="icon icon--spin" src="../assets/spinner.png">
  </td>
</template>

<script>
export default {
  props: {
    status: Number
  }
};
</script>
