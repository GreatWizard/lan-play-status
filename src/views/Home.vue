<template>
  <div class="home">
    <img alt="Logo" class="logo" :src="require(`@/assets/logo.png`)" />
    <div>
      <h1 class="title">
        {{ $t("pages.home.title") }}
        <a
          href="https://discordapp.com/invite/zEMCu5n"
          target="=_blank"
          rel="noreferrer noopener"
        >
          <img :src="require(`@/assets/icons/discord.svg`)" alt="Discord" />
        </a>
      </h1>
    </div>
    <Servers />
    <Communities />
  </div>
</template>

<script>
import Servers from "@/components/servers/Servers.vue";
import Communities from "@/components/communities/Communities.vue";

export default {
  components: {
    Servers,
    Communities
  }
};
</script>

<style scoped lang="scss">
.title {
  img {
    vertical-align: middle;
    width: 42px;
    height: 42px;
  }
}
.logo {
  height: 8vh;
  max-height: 100px;
}
</style>
