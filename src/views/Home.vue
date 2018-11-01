<template>
  <div class="home">
    <img alt="Logo" class="logo" src="../assets/logo.png">
    <h1>LAN Play Status</h1>
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
