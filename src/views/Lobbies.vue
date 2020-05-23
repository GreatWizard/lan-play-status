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
    // DRAGON BALL FighterZ
    games: ["0100a250097f0000"]
  },
  {
    // Luigis Mansion 3
    games: ["0100dca0064a6000"]
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
  },
  {
    // Splatoon 2 (EUR)
    games: ["0100f8f0000a2000"]
  },
  {
    // Spatoon 2 (JAP)
    games: ["01003c700009c000"]
  },
  {
    // Splatoon 2 (USA)
    games: ["01003bc0000a0000"]
  },
  {
    // Super Smash Bros. Ultimate
    games: ["01006a800016e000"]
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
