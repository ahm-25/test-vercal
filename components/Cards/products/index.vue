<template>
  <v-card
    v-hover
    width="320px"
    class="products-card pa-2 mx-auto"
    v-on="$listeners"
    style="border: 1px solid #ddf7e8"
  >
    <div class="d-flex">
      <v-img
        class="d-block mx-auto mt-3 radius-20"
        :src="product.main_image && product.main_image['media']"
        height="300px"
        width="300px"
        contain
      >
      </v-img>
    </div>
    <v-card-title class="primary--text justify-center products-card__title">
      {{ product.name }}
    </v-card-title>
    <!-- <v-card-text class="text-center">
      <span class="products-card__price">
        {{ product.price }}
      </span>
      <span class="products-card__currency">ر.س</span>
    </v-card-text> -->
  </v-card>
</template>

<script>
export default {
  name: "CardsProducts",
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style></style>
