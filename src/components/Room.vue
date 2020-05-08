<template>
  <div>
    <strong>{{ room.hostPlayerName }}</strong>
    &mdash;
    {{ game }}
    &mdash; ({{ room.nodeCount }}/{{ room.nodeCountMax }})
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
      return obj ? obj.name : gameId;
    }
  }
};
</script>
