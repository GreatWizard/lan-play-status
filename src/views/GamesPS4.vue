<template>
  <div class="games">
    <h1>{{ $t("pages.gamesPS4.title") }}</h1>
    <h2>{{ $t("pages.gamesPS4.lan.title") }}</h2>
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
