<template>
  <main class="orders">
    <v-container>
      <v-row>
        <v-col cols="12" class="text-center">
          <LazyGroupsButtons :items="buttonItems" />
        </v-col>
      </v-row>
      <v-row v-if="items.length > 0" class="mt-10">
        <v-col cols="12" lg="6" v-for="(item, index) in items" :key="index">
          <LazyCardsReservation
            :item="item"
            :show_time="false"
            :to="
              localePath({
                path: `/profile/reservations/${item.id}`,
                query: { ...$route.query },
              })
            "
          />
        </v-col>
      </v-row>
      <LazyEmptyState
        v-else
        title="reservations"
        sub_title="reservations_sub_title"
      >
        <v-row>
          <v-col cols="12" class="text-center">
            <v-btn
              depressed
              :to="localePath('/events')"
              class="primary px-10"
              rounded
            >
              {{ $t("new_evnets") }}
            </v-btn>
          </v-col>
        </v-row>
      </LazyEmptyState>
    </v-container>
    <LazyPagination :meta="meta" />
  </main>
</template>

<script>
export default {
  name: "Reservations",
  watchQuery: true,
  async asyncData({ $http, query }) {
    const res = await $http.get({ path: `reservations`, query });
    const { data, meta } = res.data;

    return { items: data, meta };
  },

  computed: {
    buttonItems() {
      return [
        {
          text: this.$t("upcoming_reservations"),
          to: this.localePath("/profile/reservations?status=upcoming"),
        },
        {
          text: this.$t("previous_reservations"),
          to: this.localePath("/profile/reservations?status=previous"),
        },
        {
          text: this.$t("canceled_reservations"),
          to: this.localePath("/profile/reservations?status=canceled"),
        },
      ];
    },
  },
};
</script>
