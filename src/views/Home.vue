<template>
  <div class="home">
    <img alt="Logo" class="logo" src="../assets/logo.png">
    <h2>Lan Play Status</h2>
    <Servers />
  </div>
</template>


<script>
import Servers from "@/components/Servers.vue";

export default {
  components: {
    Servers
  }
};
</script>

<style lang="scss">
.logo {
  height: 8vh;
  max-height: 100px;
}
</style>
