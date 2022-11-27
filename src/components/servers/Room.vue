<template>
  <div :data-tooltip="tooltip">
    <img
      v-if="icon"
      :src="require(`@/assets/icons/${icon}.png`)"
      class="icon"
      alt=""
    />
    {{ " " }}
    <strong vif="hostPlayerName">
      {{ hostPlayerName }}
      {{ " " }}
    </strong>
    <component
      v-if="advertiseData"
      v-bind:is="`room${room.contentId}`"
      :advertiseData="advertiseData"
    />
    ({{ room.nodeCount }}/{{ room.nodeCountMax }}) &mdash;
    <img v-if="game.icon" :src="game.icon" class="icon icon--game" alt="" />
    {{ gameName }}
  </div>
</template>

<script>
import room0100a3d008c5c000 from "@/components/rooms/0100a3d008c5c000.vue";
import room0100b04011742000 from "@/components/rooms/0100b04011742000.vue";
import room0100d71004694000 from "@/components/rooms/0100d71004694000.vue";
import room01005ee0036ec000 from "@/components/rooms/01005ee0036ec000.vue";
import room01006f8002326000 from "@/components/rooms/01006f8002326000.vue";
import room01008f6008c5e000 from "@/components/rooms/01008f6008c5e000.vue";
import { getGameId, getGame, getGameName } from "@/utils/games";
import { getHostPlayerName, getPlayers, getAdvertiseData } from "@/utils/rooms";
import { getPlayerIcon } from "@/utils/icons";

export default {
  components: {
    room0100a3d008c5c000,
    room0100b04011742000,
    room0100d71004694000,
    room01005ee0036ec000,
    room01006f8002326000,
    room01008f6008c5e000
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
