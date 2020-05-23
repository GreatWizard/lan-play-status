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
    <component
      v-if="advertiseData !== undefined"
      v-bind:is="`room${room.contentId}`"
      :advertiseData="advertiseData"
    ></component>
    ({{ room.nodeCount }}/{{ room.nodeCountMax }}) &mdash;
    <span v-if="game.icon !== undefined">
      <img :src="game.icon" class="icon icon--game" alt="" />
    </span>
    {{ gameName }}
  </div>
</template>

<script>
import room01006f8002326000 from "@/components/rooms/01006f8002326000.vue";

const AdvertiseMap = {
  "01006f8002326000": data => {
    const islandBin = fromHex(data).slice(28);
    const dodoCode = data.charAt(557) === "1";
    return {
      island: decodeUtf16(islandBin),
      dodoCode
    };
  }
};

const IconsMap = contentId => {
  switch (contentId) {
    case "01006f8002326000":
      return [
        "blathers",
        "isabelle",
        "kk-slider",
        "timmy",
        "tom-nook",
        "tommy"
      ];
    case "0100c3800049c000":
    case "0100770008dd8000":
      return ["felyne", "melynx"];
    case "010003f003a34000":
    case "0100187003a36000":
    case "0100abf008968000":
    case "01008db008c2C000":
      return ["red-cap"];
    case "0100152000022000":
      return [
        "bowser-kart",
        "donkey-kart",
        "luigi-kart",
        "mario-kart",
        "peach-kart",
        "rosalina-kart",
        "toad-kart",
        "wario-kart",
        "yoshi-kart"
      ];
    default:
      return undefined;
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
      if (
        // Fix for DRAGON BALL FighterZ
        gameId === "ffffffffffffffff" &&
        this.room.hostPlayerName === "DBFighter"
      ) {
        gameId = "0100a250097f0000";
      }
      return this.games.find(({ id }) => id === gameId);
    },
    hostPlayerName() {
      let gameId = this.room.contentId.toLowerCase();
      let hostPlayerName = this.room.hostPlayerName;
      if (
        // Fix for DRAGON BALL FighterZ
        gameId === "ffffffffffffffff" &&
        hostPlayerName === "DBFighter"
      ) {
        hostPlayerName = undefined;
      }
      return hostPlayerName;
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
      return parseAdvertiseData(contentId, advertiseData);
    },
    icon() {
      let icons = IconsMap(this.room.contentId);
      return icons && icons[this.room.hostPlayerName.length % icons.length];
    },
    tooltip() {
      let players;
      if (
        // Fix for DRAGON BALL FighterZ
        this.room.contentId.toLowerCase() === "ffffffffffffffff"
      ) {
        players ==
          `${this.rooms.nodes.length} user${
            this.room.nodes.length > 1 ? "s" : ""
          }`;
      } else {
        players = this.room.nodes
          .map(({ playerName }) => playerName)
          .join(", ");
      }
      return `${players} ${
        this.room.nodes.length > 1 ? "are playing" : "is playing"
      } ${this.gameName}`;
    }
  }
};
</script>
