<template>
  <div class="lobby">
    <LobbyCard :routeGameIds="gameIds" />
  </div>
</template>

<script>
import LobbyCard from '@/components/lobby/LobbyCard.vue'

export default {
  components: {
    LobbyCard,
  },
  computed: {
    gameIds() {
      return this.$route.params.gameIds.split(',')
    },
  },
}
</script>
