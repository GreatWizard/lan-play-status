<template>
  <tr :class="trClasses">
    <td>{{ community.name }}</td>
    <td>{{ gameNames }}</td>
    <td
      v-if="community.flags && community.flags.length > 0"
      :data-tooltip="languages"
    >
      <span v-for="(flag, index) in community.flags" :key="flag">
        <flag :iso="flag" :squared="false" />
        <span v-if="index !== community.flags.length - 1">&nbsp;</span>
      </span>
    </td>
    <td v-else :data-tooltip="languages">
      <img
        class="icon"
        :src="require(`@/assets/world-flags-globe.png`)"
        alt="Worldwide"
      />
    </td>
    <td v-if="community.discord">
      <a :href="discord" target="=_blank" rel="noreferrer noopener">
        <img
          class="icon"
          :src="require(`@/assets/discord.svg`)"
          alt="Discord"
        />
      </a>
    </td>
    <td v-if="community.whatsapp">
      <a :href="whatsapp" target="=_blank" rel="noreferrer noopener">
        <img
          class="icon"
          :src="require(`@/assets/whatsapp.svg`)"
          alt="WhatsApp"
        />
      </a>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    community: Object
  },
  data() {
    return {
      games: this.$store.state.games
    };
  },
  computed: {
    gameNames() {
      let gameIds = this.community.games;
      if (gameIds === undefined || gameIds.length === 0) {
        return "All";
      }
      return gameIds
        .map(gameId => this.games.find(({ id }) => id === gameId).name)
        .join(", ");
    },
    languages() {
      return this.community.flags
        ? this.community.flags.map(flag => flag.toUpperCase()).join(", ")
        : "Worldwide";
    },
    discord() {
      return `https://discordapp.com/invite/${this.community.discord}`;
    },
    whatsapp() {
      return `https://chat.whatsapp.com/${this.community.whatsapp}`;
    },
    trClasses() {
      return this.community.highlight ? "highlight" : "";
    }
  }
};
</script>
