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
export default {
  data: function() {
    return {
      lobbies: this.$store.state.lobbies
    };
  }
};
</script>
