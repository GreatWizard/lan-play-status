<template>
  <div class="games">
    <h1>Games with LAN Mode</h1>
    <h2>(OFW and CFW compatible)</h2>
    <div class="cards">
      <GameCard
        v-for="game in gamesSwitchOfw"
        :game="game"
        :key="game.title"
        type="switch"
      />
    </div>
    <h1>Games with Wireless Mode</h1>
    <h2>(CFW only: it needs ldn_mitm kip)</h2>
    <div class="cards">
      <GameCard
        v-for="game in gamesSwitchCfw"
        :game="game"
        :key="game.title"
        type="switch"
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
      gamesSwitchOfw: this.$store.state.gamesSwitchOfw,
      gamesSwitchCfw: this.$store.state.gamesSwitchCfw
    };
  }
};
</script>
