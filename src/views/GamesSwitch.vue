<template>
  <div class="games">
    <h1>{{ $t("pages.gamesSwitch.title") }}</h1>
    <h2>{{ $t("pages.gamesSwitch.lan.title") }}</h2>
    <div class="cards">
      <GameCard
        v-for="game in gamesSwitchOfw"
        :game="game"
        :key="game.title"
        type="switch"
      />
    </div>
    <h2>{{ $t("pages.gamesSwitch.wan.title") }}</h2>
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
