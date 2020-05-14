<template>
  <div :data-tooltip="tooltip">
    <span v-if="game.icon !== undefined">
      <img :src="game.icon" class="icon" alt="" />
    </span>
    {{ gameName }}
    &mdash;
    <strong>{{ room.hostPlayerName }}</strong>
    ({{ room.nodeCount }}/{{ room.nodeCountMax }})
  </div>
</template>

<script>
export default {
  props: {
    room: Object
  },
  data() {
    return {
      games: this.$store.state.games
    };
  },
  computed: {
    game() {
      let gameId = this.room.contentId;
      return this.games.find(({ id }) => id === gameId);
    },
    gameName() {
      let obj = this.game;
      return obj
        ? obj.region === undefined || obj.region === "" || obj.region === "WLD"
          ? obj.name
          : `${obj.name} (${obj.region})`
        : this.room.contentId;
    },
    tooltip() {
      let players = this.room.nodes
        .map(({ playerName }) => playerName)
        .join(", ");
      return `${players} ${
        this.room.nodes.length > 1 ? "are playing" : "is playing"
      } ${this.gameName}`;
    }
  }
};
</script>
