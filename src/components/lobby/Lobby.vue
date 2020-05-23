<template>
  <span>
    <h1>Lobby for "{{ gamesName.join(", ") }}"</h1>
    <LobbyServer
      v-for="server in servers"
      :server="server"
      :gameIds="gameIds"
      :key="`${server.ip}:${server.port}`"
    />
  </span>
</template>

<script>
import LobbyServer from "@/components/lobby/Server.vue";
import { getGameId, getGame, getGameName } from "@/utils/games";
import { notEmpty } from "@/utils/filters";

export default {
  components: {
    LobbyServer
  },
  props: {
    routeGameIds: Array
  },
  data() {
    return {
      servers: this.$store.state.servers,
      games: this.$store.state.games
    };
  },
  computed: {
    gameIds() {
      return this.routeGameIds
        .filter(notEmpty)
        .map(gameId => getGameId(gameId));
    },
    gamesObj() {
      return this.gameIds
        .map(gameId => getGame(this.games, gameId))
        .filter(notEmpty);
    },
    gamesName() {
      return this.gamesObj.map(game => getGameName(game)).sort();
    }
  }
};
</script>
