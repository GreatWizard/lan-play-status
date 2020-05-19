<template>
  <div :data-tooltip="tooltip">
    <span v-if="game.icon !== undefined">
      <img :src="game.icon" class="icon" alt="" />
    </span>
    {{ gameName }}
    &mdash;
    <img
      v-if="icon !== undefined"
      :src="require(`@/assets/${icon}.png`)"
      class="icon"
      alt=""
    />
    <strong> {{ room.hostPlayerName }}</strong>
    <component
      v-if="advertiseData !== undefined"
      v-bind:is="`room${room.contentId}`"
      :advertiseData="advertiseData"
    ></component>
    ({{ room.nodeCount }}/{{ room.nodeCountMax }})
  </div>
</template>

<script>
import room01006f8002326000 from "@/components/rooms/01006f8002326000.vue";

const AdvertiseMap = {
  "01006f8002326000": data => {
    const islandBin = data.slice(0x1c);
    return {
      island: decodeUtf16(islandBin)
    };
  }
};

const IconsMap = {
  "01006f8002326000": [
    "blathers",
    "isabelle",
    "kk-slider",
    "timmy",
    "tom-nook",
    "tommy"
  ],
  "0100c3800049c000": ["felyne", "melynx"],
  "0100770008dd8000": ["felyne", "melynx"],
  "010003f003a34000": ["red-cap"],
  "0100187003a36000": ["red-cap"],
  "0100abf008968000": ["red-cap"],
  "01008db008c2C000": ["red-cap"]
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
    game() {
      let gameId = this.room.contentId.toLowerCase();
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
    icon() {
      let icons = IconsMap[this.room.contentId];
      return icons && icons[this.room.hostPlayerName.length % icons.length];
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
