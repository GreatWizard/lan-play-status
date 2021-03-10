<template>
  <div class="not-found">
    <h1>{{ $t("pages.notFound.title") }}</h1>
    <p>Sorry. This link is dead.</p>
    <p>To keep browsing, return to <a href="/">our homepage</a>.</p>
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
