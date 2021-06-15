<template>
  <tr :class="trClasses">
    <td>{{ community.name }}</td>
    <td>{{ gameNames }}</td>
    <td
      v-if="community.flags && community.flags.length > 0"
      :data-tooltip="languages"
    >
      <span v-for="(flag, index) in community.flags" :key="flag">
        <country-flag :code="flag" class="icon" />
        <span v-if="index !== community.flags.length - 1">&nbsp;</span>
      </span>
    </td>
    <td v-else :data-tooltip="languages">
      <img
        class="icon"
        :src="require(`@/assets/icons/world-flags-globe.png`)"
        :alt="$t('general.worldwide')"
      />
    </td>
    <td>
      <a
        v-if="community.discord"
        :href="discord"
        target="=_blank"
        rel="noreferrer noopener"
      >
        <img
          class="icon"
          :src="require(`@/assets/icons/discord.svg`)"
          :alt="$t('general.discord')"
        />
      </a>
      <a
        v-if="community.whatsapp"
        :href="whatsapp"
        target="=_blank"
        rel="noreferrer noopener"
      >
        <img
          class="icon"
          :src="require(`@/assets/icons/whatsapp.svg`)"
          :alt="$t('general.whatsapp')"
        />
      </a>
      <a
        v-if="community.vk"
        :href="vk"
        target="=_blank"
        rel="noreferrer noopener"
      >
        <img
          class="icon"
          :src="require(`@/assets/icons/vkontakte.svg`)"
          :alt="$t('general.vk')"
        />
      </a>
    </td>
  </tr>
</template>

<script>
import CountryFlag from "@/components/CountryFlag.vue";

export default {
  components: {
    CountryFlag
  },
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
        return this.$t("general.all");
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
        ? this.community.flags
            .map(flag => this.$t(`countries.${flag.toLowerCase()}`))
            .join(", ")
        : this.$t("general.worldwide");
    },
    discord() {
      return `https://discordapp.com/invite/${this.community.discord}`;
    },
    whatsapp() {
      return `https://chat.whatsapp.com/${this.community.whatsapp}`;
    },
    vk() {
      return `https://vk.com/${this.community.vk}`;
    },
    trClasses() {
      return this.community.highlight ? "highlight" : "";
    }
  }
};
</script>
