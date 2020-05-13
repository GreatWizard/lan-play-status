<template>
  <div class="card">
    <img
      :src="asset ? require(`@/assets/${asset}`) : image"
      class="card__image"
      :alt="title"
    />
    <div class="card__content">
      <h2>{{ title }}</h2>
      <p v-if="message">{{ message }}</p>
    </div>
  </div>
</template>

<script>
const capitalize = ([first, ...rest]) =>
  first ? first.toUpperCase() + rest.join("").toLowerCase() : "";

const removeDiacritics = str =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export default {
  props: {
    title: String,
    asset: String,
    message: String,
    lang: String,
    ds: Boolean
  },
  computed: {
    image() {
      let title = this.title
        .replaceAll(":", "")
        .replaceAll("'", "")
        .replaceAll("®", "")
        .replaceAll("™", "")
        .replaceAll(".", " ")
        .replaceAll("-", " ")
        .split(" ")
        .map(s => capitalize(removeDiacritics(s)))
        .join("")
        .replaceAll("Iii", "III")
        .replaceAll("Rmx", "RMX")
        .replaceAll("Dx", "DX")
        .replaceAll("Fighterz", "FighterZ")
        .replaceAll("EaSportsFifa19", "EASportsFifa19");

      if (this.lang) {
        title = `${title}_${this.lang}`;
      }

      return `https://cdn01.nintendo-europe.com/media/images/11_square_images/games_18/nintendo_switch_${
        this.ds ? "download_software" : "5"
      }/SQ_NSwitch${this.ds ? "DS" : ""}_${title}_image500w.jpg`;
    }
  }
};
</script>

<style lang="scss">
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px;
  width: 300px;
  margin-bottom: 20px;

  @media only screen and (max-width: 768px) {
    width: 150px;
  }

  &__image {
    border-radius: 5px 5px 0 0;
    max-width: 100%;
  }

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }

  &__content {
    padding: 2px 16px;
  }
}
</style>
