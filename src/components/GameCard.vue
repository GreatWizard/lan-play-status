<template>
  <div class="card">
    <img
      :src="game.asset ? require(`@/assets/games/${game.asset}`) : image"
      class="card__image"
      alt=""
    />
    <div class="card__content">
      <h2>{{ game.title }}</h2>
      <p v-if="message">{{ message }}</p>
    </div>
  </div>
</template>

<script>
const capitalize = ([first, ...rest]) =>
  first ? first.toUpperCase() + rest.join("").toLowerCase() : "";

export default {
  props: {
    game: Object,
    type: String
  },
  computed: {
    message() {
      let key = `games.${this.type}.${this.game.title}`;
      let value = this.$t(key);
      if (value !== key) {
        return value;
      }
      return undefined;
    },
    image() {
      if (this.type === "ps4") {
        return `${this.game.source}?w=620`;
      } else if (this.type === "switch") {
        if (this.game.source) {
          return this.game.source;
        }
        let title = this.game.title
          // Remove diactrics
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          // Fix strange names
          .replace(/\+/g, "and")
          .replace(/&/g, "and")
          .replace(/'n'/g, "n ")
          .replace(/ 'EM/g, "em")
          // Remove useless chars
          .replace(/:|'|®|™|!/g, "")
          // Replace delimiter by space
          .replace(/-|\.|\//g, " ")
          // Capitalize
          .split(" ")
          .map(s => capitalize(s))
          .join("")
          // Fix roman numbers
          .replace("Iii", "III")
          .replace("Iv", "IV")
          .replace("CivilizationVi", "CivilizationVI")
          // Fix specifics namings
          .replace("3d", "3D")
          .replace("Ark", "ARK")
          .replace("ark", "ARK")
          .replace("MARKed", "Marked")
          .replace("Rmx", "RMX")
          .replace("Dx", "DX")
          .replace("Korg", "KORG")
          .replace("Nba2k", "NBA2K")
          .replace("Gp18", "gp18")
          .replace("SuperDragonBall", "Superdragonball")
          .replace("Gp1", "GP1")
          .replace("Gp2", "GP2")
          .replace("Snk", "SNK")
          .replace("Fighterz", "FighterZ")
          .replace("EaSportsFifa1", "EASportsFifa1")
          .replace("ChikiChikiBoxyRacers", "_ChikiChikiBoxyRacers")
          .replace("Mudrunner", "MudRunner")
          .replace("ReMarsTered", "ReMarstered")
          .replace("DukeNukem3D", "DukeNukem3d");

        if (this.game.lang) {
          title = `${title}_${this.game.lang}`;
        }

        return `https://cdn01.nintendo-europe.com/media/images/11_square_images/games_18/nintendo_switch_${
          this.game.ds ? "download_software" : "5"
        }/SQ_NSwitch${this.game.ds ? "DS" : ""}_${title}_image500w.jpg`;
      }

      return undefined;
    }
  }
};
</script>
