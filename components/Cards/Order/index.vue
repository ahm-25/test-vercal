<template>
  <v-card v-hover class="order-card pa-5" v-bind="$attrs">
    <v-row>
      <v-col cols="12" lg="6" class="align-self-center">
        <v-row>
          <v-col cols="12" sm="6" lg="10" class="mx-auto">
            <div style="border-radius: 12px">
              <v-img
                height="100%"
                width="100%"
                aspect-ratio="1.5"
                :src="require(`@/assets/images/${image_name}`)"
                alt="photo"
              />
            </div>
          </v-col>
          <v-col cols="12" lg="2" class="img-container">
            <v-row>
              <v-col cols="3" lg="12" class="pb-0">
                <v-img
                  @click.prevent="image_name = 'order.png'"
                  style="cursor: pointer"
                  :src="require('@/assets/images/order.png')"
                  alt="photo"
                />
              </v-col>
              <v-col cols="3" lg="12" class="pb-0">
                <v-img
                  @click.prevent="image_name = 'order.png'"
                  style="cursor: pointer"
                  :src="require('@/assets/images/order.png')"
                  alt="photo"
                />
              </v-col>
              <v-col cols="3" lg="12" class="pb-0">
                <v-img
                  @click.prevent="image_name = 'order.png'"
                  style="cursor: pointer"
                  :src="require('@/assets/images/order.png')"
                  alt="photo"
                />
              </v-col>
              <v-col cols="3" lg="12" class="pb-0">
                <v-img
                  @click.prevent="image_name = 'order.png'"
                  style="cursor: pointer"
                  :src="require('@/assets/images/order.png')"
                  alt="photo"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" lg="6" class="pa-0 d-flex align-self-center">
        <v-card-text>
          <v-card-title>
            <div class="primary--text size-md-16">المصنع السعودي للأثاث</div>
          </v-card-title>
          <v-card-subtitle>
            <div class="blue-light-1--text">
              <span>{{ $t("order_number") }}</span>
              <span>123123</span>
              <span>.</span>
              <span>24 أغسطس 2022</span>
            </div>
          </v-card-subtitle>
          <v-card-actions
            class="d-flex justify-space-between align-center size-md-16"
          >
            <div>قطع 2 × منتج</div>
            <div class="primary--text font-bold">5,920 ر.س</div>
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
  // .price {
  //   font-size: 20px;
  // }
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
