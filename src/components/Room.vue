<template>
  <div :data-tooltip="tooltip">
    <span v-if="game.icon !== undefined">
      <img :src="game.icon" class="icon" alt="" />
    </span>
    {{ gameName }}
    &mdash;
    <component
      v-if="advertiseData !== undefined"
      v-bind:is="`room${room.contentId}`"
      :room="room"
      :advertiseData="advertiseData"
    ></component>
    <strong v-else>{{ room.hostPlayerName }}</strong>
    ({{ room.nodeCount }}/{{ room.nodeCountMax }})
  </div>
</template>

<script>
import room01006f8002326000 from "@/components/rooms/01006f8002326000.vue";
import room0100770008dd8000 from "@/components/rooms/0100770008dd8000.vue";

const AdvertiseMap = {
  "01006f8002326000": data => {
    const islandBin = data.slice(0x1c);
    return {
      island: decodeUtf16(islandBin)
    };
  },
  "0100770008dd8000": () => {
    return {};
  }
};

const decodeUtf16 = function(data) {
  const decoder = new TextDecoder("utf-16");
  const u16 = new Uint16Array(data);
  const cut = u16.findIndex(i => i === 0);
  return decoder.decode(data.slice(0, cut * 2));
};

const fromHex = function(hex) {
  const buf = hex.match(/[0-9a-fA-F]{2}/gi);
  if (!buf) {
    throw new Error("Wrong hex");
  }
  return new Uint8Array(buf.map(h => parseInt(h, 16))).buffer;
};

const parseAdvertiseData = function(cid, data) {
  const parseFunction = AdvertiseMap[cid.toLowerCase()];
  if (parseFunction) {
    return parseFunction(data);
  }

  return undefined;
};

export default {
  components: {
    room01006f8002326000,
    room0100770008dd8000
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
    advertiseData() {
      let { contentId, advertiseData } = this.room;
      return parseAdvertiseData(contentId, fromHex(advertiseData));
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
