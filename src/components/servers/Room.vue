<template>
  <div :data-tooltip="tooltip">
    <img
      v-if="icon !== undefined"
      :src="require(`@/assets/icons/${icon}.png`)"
      class="icon"
      alt=""
    />&nbsp;<strong vif="hostPlayerName !== undefined">{{
      hostPlayerName
    }}</strong>
    <span v-if="advertiseData !== undefined">&nbsp;</span>
    <component
      v-if="advertiseData !== undefined"
      v-bind:is="`room${room.contentId}`"
      :advertiseData="advertiseData"
    />
    ({{ room.nodeCount }}/{{ room.nodeCountMax }}) &mdash;
    <span v-if="game.icon !== undefined">
      <img :src="game.icon" class="icon icon--game" alt="" />
    </span>
    {{ gameName }}
  </div>
</template>

<script>
import room01006f8002326000 from "@/components/rooms/01006f8002326000.vue";
import { getGameId, getGame, getGameName } from "@/utils/games";
import { getHostPlayerName, getPlayers, getAdvertiseData } from "@/utils/rooms";
import { getPlayerIcon } from "@/utils/icons";

export default {
  components: {
    room01006f8002326000
  },
  props: {
    room: Object
  },
  data() {
    return {
      games: this.$store.state.games
    };
  },
  computed: {
    gameId() {
      return getGameId(this.room.contentId);
    },
    game() {
      return getGame(this.games, this.gameId);
    },
    gameName() {
      return getGameName(this.game);
    },
    hostPlayerName() {
      return getHostPlayerName(this.room);
    },
    tooltip() {
      let players = getPlayers(this.room).join(", ");
      let nodesLength = this.room.nodes.length;
      if (players === "") {
        players = `${nodesLength} user${nodesLength > 1 ? "s" : ""}`;
      }
      return `${players} ${nodesLength > 1 ? "are playing" : "is playing"} ${
        this.gameName
      }`;
    },
    icon() {
      return getPlayerIcon(this.gameId, this.hostPlayerName);
    },
    advertiseData() {
      return getAdvertiseData(this.room);
    }
  }
};
</script>
