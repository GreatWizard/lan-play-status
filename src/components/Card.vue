<template>
  <div class="card">
    <img :src="require(`@/assets/${image}`)" class="card__image" alt="Card Image">
    <div class="card__content">
      <h2>{{title}}</h2>
      <p>{{message}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: String,
    title: String,
    message: String
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
