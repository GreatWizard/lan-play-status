<template>
  <div class="lobbies">
    <h1>Popular Lobbies</h1>
    <div v-for="lobby in lobbies" :key="`${lobby.games.join(':')}`">
      <router-link :to="`/lobbies/${lobby.games.join(',')}`">
        {{ lobby.title }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { getGameId, getGame, getGameName } from "@/utils/games";
import { sortByString } from "@/utils/sorts";

const popularLobbies = [
  {
    // Animal Crossing: New Horizons
    games: ["01006f8002326000"]
  },
  {
    // Mario Kart 8 Deluxe
    games: ["0100152000022000"]
  },
  {
    // MONSTER HUNTER GENERATIONS ULTIMATE
    games: ["0100770008dd8000"]
  },
  {
    // Monster Hunter XX Nintendo Switch Ver.
    games: ["0100c3800049c000"]
  },
  {
    // Pokémon Shield, Pokémon Sword
    games: ["01008db008c2C000", "0100abf008968000"]
  }
];

export default {
  data: function() {
    return {
      popularLobbies,
      games: this.$store.state.games
    };
  },
  computed: {
    lobbies() {
      return this.popularLobbies
        .map(lobby => {
          lobby.title = lobby.games
            .map(_gameId => {
              let gameId = getGameId(_gameId);
              let game = getGame(this.games, gameId);
              return getGameName(game);
            })
            .sort()
            .join(", ");
          return lobby;
        })
        .sort(sortByString("title"));
    }
  }
};
</script>
