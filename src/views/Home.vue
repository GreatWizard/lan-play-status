<template>
  <div class="home">
    <img alt="Logo" class="logo" src="../assets/logo.png" />
    <div>
      <h1 class="title">
        LAN Play Status
        <a
          href="https://discord.gg/zEMCu5n"
          target="=_blank"
          rel="noreferrer noopener"
        >
          <img :src="require(`@/assets/discord.svg`)" alt="Discord" />
        </a>
      </h1>
    </div>
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
.title {
  img {
    vertical-align: middle;
    width: 44px;
    height: 44px;
  }
}
.logo {
  height: 8vh;
  max-height: 100px;
}
</style>
