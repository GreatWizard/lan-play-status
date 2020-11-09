<template>
  <tr :class="trClasses">
    <td>{{ community.name }}</td>
    <td>{{ gameNames }}</td>
    <td
      v-if="community.flags && community.flags.length > 0"
      :data-tooltip="languages"
    >
      <span v-for="(flag, index) in community.flags" :key="flag">
        <gb-flag :code="flag" class="icon" size="icon" />
        <span v-if="index !== community.flags.length - 1">&nbsp;</span>
      </span>
    </td>
    <td v-else :data-tooltip="languages">
      <img
        class="icon"
        :src="require(`@/assets/icons/world-flags-globe.png`)"
        alt="Worldwide"
      />
    </td>
    <td>
      <a v-if="community.discord" :href="discord" target="=_blank" rel="noreferrer noopener">
        <img
          class="icon"
          :src="require(`@/assets/icons/discord.svg`)"
          alt="Discord"
        />
      </a>
      <a v-if="community.whatsapp" :href="whatsapp" target="=_blank" rel="noreferrer noopener">
        <img
          class="icon"
          :src="require(`@/assets/icons/whatsapp.svg`)"
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
        .map(
          gameId =>
            this.games.find(({ id }) => id === gameId.toLowerCase()).name
        )
        .filter((x, i, a) => a.indexOf(x) == i)
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
