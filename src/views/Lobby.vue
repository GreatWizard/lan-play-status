<template>
  <div class="lobby">
    <Lobby :routeGameIds="gameIds" />
  </div>
</template>

<script>
import Lobby from "@/components/Lobby.vue";

export default {
  components: {
    Lobby
  },
  computed: {
    gameIds() {
      return this.$route.params.gameIds.split(",");
    }
  }
};
</script>
