<template>
  <div class="lobbies">
    <h1>{{ $t('pages.lobbies.title') }}</h1>
    <div v-for="lobby in this.gamesStore.lobbies" :key="`${lobby.games.join(':')}`">
      <router-link :to="`/lobbies/${lobby.games.join(',')}`">
        {{ lobby.title }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { useGamesStore } from '@/stores/games'

export default {
  setup() {
    const gamesStore = useGamesStore()
    return { gamesStore }
  },
}
</script>
