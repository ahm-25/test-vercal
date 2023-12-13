<template>
  <main class="orders">
    <v-container>
      <v-row>
        <v-col cols="12" class="text-center">
          <LazyGroupsButtons :items="buttonItems" />
        </v-col>
      </v-row>
      <v-row v-if="items.length > 0" class="mt-10">
        <v-col cols="12" lg="6">
          <LazyCardsOrder
            :to="
              localePath({
                path: `/profile/orders/1`,
                query: { ...$route.query },
              })
            "
          />
        </v-col>
        <v-col cols="12" lg="6">
          <LazyCardsOrder />
        </v-col>
      </v-row>
      <LazyEmptyState v-else title="orders" sub_title="no_new_order">
        <v-row>
          <v-col cols="12" lg="6" class="d-flex justify-end">
            <v-btn
              depressed
              :to="localePath('/profile/fittings')"
              class="primary px-10"
              rounded
            >
              {{ $t("products") }}
            </v-btn>
          </v-col>
          <v-col cols="12" lg="6" class="d-flex">
            <v-btn
              :to="localePath('/profile/suppliers')"
              text
              color="primary"
              rounded
            >
              {{ $t("suppliers") }}
            </v-btn>
          </v-col>
        </v-row>
      </LazyEmptyState>
    </v-container>
  </main>
</template>

<script>
export default {
  name: "Orders",
  data() {
    return {
      items: [1, 2],
    };
  },
  computed: {
    buttonItems() {
      return [
        {
          text: this.$t("paid_order"),
          to: this.localePath("/profile/orders"),
        },
        {
          text: this.$t("Requests received"),
          to: this.localePath("/profile/orders?type=received"),
        },
      ];
    },
  },
};
</script>
