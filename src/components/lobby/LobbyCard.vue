<template>
  <h1>{{ $t('lobby.title', { games: gamesName.join(', ') }) }}</h1>
  <div class="cards">
    <LobbyServer
      v-for="server in this.serversStore.servers"
      :server="server"
      :gameIds="gameIds"
      :key="`${server.ip}:${server.port}`"
    />
  </div>
</template>

<script>
import LobbyServer from '@/components/lobby/LobbyServer.vue'
import { getGameId, getGame, getGameName } from '@/utils/games'
import { notEmpty } from '@/utils/filters'
import { useServersStore } from '@/stores/servers'
import { useGamesStore } from '@/stores/games'

export default {
  setup() {
    return { serversStore: useServersStore(), gamesStore: useGamesStore() }
  },
  components: {
    LobbyServer,
  },
  props: {
    routeGameIds: Array,
  },
  computed: {
    gameIds() {
      return this.routeGameIds.filter(notEmpty).map((gameId) => getGameId(gameId))
    },
    gamesObj() {
      return this.gameIds.map((gameId) => getGame(this.gamesStore.games, gameId)).filter(notEmpty)
    },
    gamesName() {
      return this.gamesObj.map((game) => getGameName(game)).sort()
    },
  },
}
</script>
