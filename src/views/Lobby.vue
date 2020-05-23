<template>
  <div class="lobby">
    <Lobby :routeGameIds="gameIds" />
  </div>
</template>

<script>
import Lobby from "@/components/lobby/Lobby.vue";

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
