<template>
  <div class="games">
    <h1>PS4 Games compatible with LAN Play</h1>
    <div class="cards">
      <GameCard
        v-for="game in gamesPS4"
        :game="game"
        :key="game.title"
        type="ps4"
      />
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
      gamesPS4: this.$store.state.gamesPS4
    };
  }
};
</script>
