<template>
  <div class="card">
    <img
      :src="require(`@/assets/icons/${icon}.png`)"
      class="card__image"
      alt=""
    />
    <div class="card__content">
      <strong
        >{{ hostPlayerName }} ({{ room.nodeCount }}/{{
          room.nodeCountMax
        }})</strong
      >
      <p>
        <component
          v-if="advertiseData !== undefined"
          v-bind:is="`room${room.contentId}`"
          :advertiseData="advertiseData"
        />
      </p>
      <p>
        <CopyButton :data="fullAddress" />
      </p>
      <p v-if="players.length > 0">Players: {{ players.join(", ") }}</p>
    </div>
  </div>
</template>

<script>
import CopyButton from "@/components/CopyButton.vue";
import room0100b04011742000 from "@/components/rooms/0100b04011742000.vue";
import room01006f8002326000 from "@/components/rooms/01006f8002326000.vue";
import { getFullAddress } from "@/utils/servers";
import { getHostPlayerName, getPlayers, getAdvertiseData } from "@/utils/rooms";
import { getPlayerIcon } from "@/utils/icons";

export default {
  components: {
    CopyButton,
    room0100b04011742000,
    room01006f8002326000
  },
  props: {
    server: Object,
    room: Object
  },
  computed: {
    fullAddress() {
      return getFullAddress(this.server);
    },
    hostPlayerName() {
      return getHostPlayerName(this.room);
    },
    players() {
      let players = getPlayers(this.room);
      players.shift(this.hostPlayerName);
      return players;
    },
    icon() {
      return (
        getPlayerIcon(this.room.contentId, this.room.hostPlayerName) || "switch"
      );
    },
    advertiseData() {
      return getAdvertiseData(this.room);
    }
  }
};
</script>
