<template>
  <div class="lobby">
    <LobbyComponent :routeGameIds="gameIds" />
  </div>
</template>

<script>
import LobbyComponent from "@/components/lobby/Lobby.vue";

export default {
  components: {
    LobbyComponent
  },
  computed: {
    gameIds() {
      return this.$route.params.gameIds.split(",");
    }
  }
};
</script>
