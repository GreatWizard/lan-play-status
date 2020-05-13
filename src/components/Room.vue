<template>
  <div>
    <strong>{{ room.hostPlayerName }}</strong>
    &mdash;
    {{ game }}
    &mdash;
    <span :data-tooltip="players">
      ({{ room.nodeCount }}/{{ room.nodeCountMax }})
    </span>
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
      let obj = this.games.find(({ id }) => id === gameId);
      return obj
        ? obj.region === undefined || obj.region === "" || obj.region === "WLD"
          ? obj.name
          : `${obj.name} (${obj.region})`
        : gameId;
    },
    players() {
      return this.room.nodes.map(({ playerName }) => playerName).join(", ");
    }
  }
};
</script>
