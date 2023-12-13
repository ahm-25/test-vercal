<template>
  <v-card v-hover class="mx-auto pa-3 event-card" :to="localePath(`/events/${item.id}`)">
    <v-img
      :src="item.image && item.image.media"
      height="300"
      style="border: 1px solid #ddf7e8"
    >
      <div class="d-flex align-end justify-center h-100">
        <span
          style="height: 30px"
          class="mb-3 dark--text light-primary rounded-xl px-3 text-center d-flex align-center justify-center"
        >
          {{ item.start_at }}
        </span>
      </div>
    </v-img>
    <v-card-title class="justify-center primary--text font-weight-bold">
      {{ item.name }}
    </v-card-title>
    <v-card-text class="text-center black--text text-body-1">
      <div class="mb-2">
        <p class="dark-secondary--text">
          {{ $t("start_with") }}
          <span class="font-weight-bold text-h4">
            {{ item.min_price }}
          </span>
          {{ $t("sar") }}
        </p>
      </div>
      <div class="size-12 dark-secondary--text">
        {{ item.city && item.city.name }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "CardEvent",
  inheritAttrs: false,
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
<style></style>
