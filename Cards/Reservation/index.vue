<template>
  <v-card v-hover class="order-card pa-5" v-bind="$attrs">
    <v-row>
      <v-col cols="12" lg="4" class="align-self-center mx-auto">
        <v-img
          height="100%"
          width="100%"
          aspect-ratio="1.5"
          :src="item.event.image && item.event.image.media"
          alt="photo"
        />
      </v-col>
      <v-col cols="12" lg="8" class="pa-0 d-flex align-self-center">
        <v-card-text>
          <v-card-title>
            <div class="primary--text">
              {{ item.event.name }}
            </div>
          </v-card-title>
          <v-card-subtitle>
            <div class="dark-secondary--text size-12">
              <span>{{ item.event.city.name }}</span>
              <span>-</span>
              <span>{{ item.event.location }}</span>
            </div>
            <div class="dark-secondary--text size-12">
              {{ item.number_of_booth }}
            </div>
            <div class="dark-secondary--text size-12" v-if="show_time">
              <span>{{ $t("start_with") }}</span>
              <span>{{ item.event.start_daily_at }}</span>
              <span>{{ $t("to") }}</span>
              <span>{{ item.event.end_daily_at }}</span>
            </div>
          </v-card-subtitle>
          <v-card-actions class="d-flex justify-space-between align-center">
            <div
              class="dark-secondary--text size-12 light-primary px-3 py-1 radius-8"
            >
              <span>{{ $t("from") }}</span>
              <span>{{ item.event.start_at }}</span>
              <span>.</span>
              <span>{{ $t("to") }}</span>
              <span>{{ item.event.end_at }}</span>
            </div>
          </v-card-actions>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "OrderCard",
  inheritAttrs: false,
  props: {
    item: {
      type: Object,
      default: () => {
        ({ event: { image: { media: "", name: "" } } });
      },
    },
    show_time: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      image_name: "home_photo.svg",
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/_variables.scss";
.order-card {
  border-radius: 16px !important;
  background-color: $white !important;
  .price {
    font-size: 20px;
  }
  .v-image__image--cover {
    border-radius: 8px !important;
  }
  // .img-container {
  //   max-height: 180px;
  //   overflow: hidden;
  //   overflow-y: auto;
  //   height: 180px;
  // }
}
</style>
