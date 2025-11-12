<template>
  <div class="games">
    <h1>{{ $t('pages.gamesPS4.title') }}</h1>
    <h2>{{ $t('pages.gamesPS4.lan.title') }}</h2>
    <div class="cards">
      <GameCard
        v-for="game in this.gamesStore.gamesPS4"
        :game="game"
        :key="game.title"
        type="ps4"
      />
    </div>
  </div>
</template>

<script>
import GameCard from '@/components/GameCard.vue'
import { useGamesStore } from '@/stores/games'

export default {
  setup() {
    const gamesStore = useGamesStore()
    return { gamesStore }
  },
  components: {
    GameCard,
  },
}
</script>
