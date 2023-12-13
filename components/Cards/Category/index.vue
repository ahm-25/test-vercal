<template>
  <v-hover v-slot="{ hover }">
    <v-card
      :elevation="hover ? 16 : 0"
      flat
      :class="{ 'on-hover': hover }"
      class="mx-auto pa-3 event-card"
      v-bind="$attrs"
      :to="localePath(`/categories/${category.id}/suppliers`)"
    >
      <v-img
        :src="category.image ? category.image['media'] : category.default_image"
        height="300"
        style="border: 1px solid #ddf7e8"
      >
      </v-img>
      <v-card-title class="justify-center primary--text font-weight-bold">
        {{ category.name }}
      </v-card-title>
      <v-card-text class="d-flex align-center justify-center">
        <div class="d-flex align-center">
          <img
            width="19px"
            height="19px"
            :src="require('@/assets/icons/product.svg')"
            alt="photo"
          />
          <span class="mx-2 size-14 dark-secondary--text">
            {{ category.products_count }} {{ $t("product") }}
          </span>
        </div>
        <span>/</span>
        <div class="d-flex align-center">
          <span class="mx-2 size-14 dark-secondary--text">
            {{ category.suppliers_count }} {{ $t("single_supplier") }}
          </span>
          <img
            width="19px"
            height="19px"
            :src="require('@/assets/icons/supplier.svg')"
            alt="photo"
          />
        </div>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: "FittingCard",
  inheritAttrs: false,
  props: {
    category: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
<style></style>
