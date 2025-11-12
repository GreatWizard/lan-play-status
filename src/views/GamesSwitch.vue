<template>
  <div class="games">
    <h1>{{ $t('pages.gamesSwitch.title') }}</h1>
    <h2>{{ $t('pages.gamesSwitch.lan.title') }}</h2>
    <div class="cards">
      <GameCard
        v-for="game in this.gamesStore.gamesSwitchOfw"
        :game="game"
        :key="game.title"
        type="switch"
      />
    </div>
    <h2>{{ $t('pages.gamesSwitch.wan.title') }}</h2>
    <div class="cards">
      <GameCard
        v-for="game in this.gamesStore.gamesSwitchCfw"
        :game="game"
        :key="game.title"
        type="switch"
      />
    </div>
  </div>
</template>

<script>
import GameCard from '@/components/GameCard.vue'
import { useGamesStore } from '@/stores/games'

export default {
  components: {
    GameCard,
  },
  setup() {
    const gamesStore = useGamesStore()
    return { gamesStore }
  },
}
</script>
