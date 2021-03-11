<template>
  <div class="not-found">
    <h1>{{ $t("pages.notFound.title") }}</h1>
    <p>{{ $t("pages.notFound.text") }}</p>
    <p>
      {{ $t("pages.notFound.return") }}
      <router-link to="/">{{ $t("pages.notFound.homepage") }}</router-link>
    </p>
    <img
      alt="Link is dead"
      class="image--fullwidth"
      :src="require(`@/assets/404.jpg`)"
    />
  </div>
</template>

<style scoped lang="scss">
.image--fullwidth {
  max-width: 400px;
  width: 90%;
}
</style>
