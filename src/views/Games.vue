<template>
  <div class="games">
    <h1>Games with LAN Mode</h1>
    <h2>(OFW and CFW compatible)</h2>
    <div class="cards">
      <GameCard v-for="game in gamesOfw" :game="game" :key="game.title" />
    </div>
    <h1>Games with Wireless Mode</h1>
    <h2>(CFW only: it needs ldn_mitm kip)</h2>
    <div class="cards">
      <GameCard v-for="game in gamesCfw" :game="game" :key="game.title" />
    </div>
  </div>
</template>

<script>
import GameCard from "@/components/GameCard.vue";

export default {
  components: {
    GameCard
  },
  data: function() {
    return {
      gamesOfw: this.$store.state.gamesOfw,
      gamesCfw: this.$store.state.gamesCfw
    };
  }
};
</script>
