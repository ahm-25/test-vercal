<template>
  <v-card
    :to="
      localePath(
        `/categories/${$route.params.id}/suppliers/${supplier.id}/products`
      )
    "
    v-bind="$attrs"
    class="suppliers__card-supplier radius-16"
    color="white"
    outlined
    v-hover
  >
    <v-list-item two-line>
      <v-list-item-avatar tile size="100">
        <v-img :src="supplier.image && supplier.image['media']" />
      </v-list-item-avatar>
      <v-list-item-content>
        <h1 class="primary--text suppliers__card-supplier__title lin-height-20">
          {{ supplier.name }}
        </h1>
        <v-list-item-subtitle class="suppliers__card-supplier__products"
          >{{ supplier.products_count }} منتج</v-list-item-subtitle
        >
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  name: "SuppliersCard",
  props: {
    supplier: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
