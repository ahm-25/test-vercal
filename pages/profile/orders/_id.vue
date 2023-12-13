<template>
  <main class="order-details">
    <v-container>
      <v-row>
        <v-col cols="12" lg="8">
          <v-row>
            <v-col cols="12">
              <v-card flat class="pa-5">
                <v-card-title class="size-16 dark-mint--text">
                  {{ $t("order_details") }}
                </v-card-title>
                <v-card-text>
                  <v-list>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="size-14 dark-mint--text">
                          {{ $t("order_number") }}
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action class="primary--text">
                        123123
                      </v-list-item-action>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="size-14 dark-mint--text">
                          {{ $t("order_date") }}
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action class="primary--text">
                        12-12-2022
                      </v-list-item-action>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-card flat class="pa-5">
                <v-card-title class="size-16 dark-mint--text">
                  {{ $t("products") }}
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" lg="8" class="algin-self-center">
                      <v-row>
                        <v-col cols="12" lg="4">
                          <v-img
                            height="100%"
                            width="100%"
                            aspect-ratio="1.5"
                            :src="require(`@/assets/images/home_photo.svg`)"
                            alt="photo"
                          />
                        </v-col>
                        <v-col cols="12" lg="4">
                          <h2 class="primary--text">Uppspel</h2>
                          <div class="mt-4">
                            <v-chip class="blue-light-3">
                              <span class="blue-light-2--text">
                                711-253 كود</span
                              >
                            </v-chip>
                          </div>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col
                      cols="12"
                      lg="4"
                      class="d-flex algin-center justify-space-between align-self-center"
                    >
                      <div>قطع 2 × منتج</div>
                      <div class="primary--text font-bold price">5,920 ر.س</div>
                    </v-col>
                    <v-col cols="12" class="d-flex justify-end">
                      <v-btn
                        @click="dialog = !dialog"
                        rounded
                        large
                        depressed
                        class="primary"
                      >
                        {{ $t("product_rating") }}
                      </v-btn>
                    </v-col>
                    <v-col cols="12">
                      <v-card class="pa-2 blue-light-3" flat>
                        <v-card-title>
                          <v-rating
                            readonly
                            color="primary"
                            length="5"
                            size="20"
                            value="3"
                          ></v-rating>
                        </v-card-title>
                        <v-card-text
                          class="blue-dark-1--text"
                          style="font-size: 12px"
                        >
                          المراجعة هي عملية تقييم لأي إنتاج فكري سواء أكان
                          منشوراً علمياً أو أدبياً، أو خدمة شركة أو منتجاتها مثل
                          الأفلام وألعاب الفيديو أو كتاب أو تأليف موسيقي؛ وكذلك
                          الأمر بالنسبة لأداء منتجات قطع الأجهزة والآليات مثل
                          الحواسيب وقطع السيارات والأجهزة المنزلية.
                        </v-card-text>
                        <v-card-actions class="mint-light-1--text"
                          >22 أغسطس 2022
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-divider />
                <v-card-actions
                  cols="12"
                  class="d-flex py-8 algin-center justify-space-between align-self-center"
                >
                  <div>{{ $t("total") }}</div>
                  <div class="primary--text font-bold price">5,920 ر.س</div>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-card flat class="px-5">
                <v-list>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="dark-mint--text">
                        {{ $t("you_can_cancel_order") }}
                      </v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn class="font-bold" text color="error">
                        {{ $t("cancel_order") }}
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" lg="4">
          <v-card flat class="pa-5">
            <v-card-title class="size-16 dark-mint--text">
              {{ $t("supplier") }}
            </v-card-title>
            <v-card-text class="text-center">
              <v-img
                class="mx-auto"
                height="120px"
                width="120px"
                aspect-ratio="1.5"
                :src="require(`@/assets/images/home_photo.svg`)"
                alt="photo"
              />
              <v-card-title class="primary--text justify-center">
                المصنع السعودي للأثاث
              </v-card-title>
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title
                      class="d-flex align-center justify-center"
                    >
                      <v-icon small color="dark-mint">mdi-phone</v-icon>
                      <a
                        class="dark-mint--text size-14 mx-2"
                        href="tel:966 55 1234 5678"
                        >+966 55 1234 5678</a
                      >
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title
                      class="d-flex align-center justify-center"
                    >
                      <v-icon small color="dark-mint">mdi-email</v-icon>
                      <a
                        class="dark-mint--text size-14 mx-2"
                        href="mailto:name@company.com"
                        >name@company.com</a
                      >
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <v-card-actions>
                <v-btn depressed block large rounded class="mint">
                  <span class="dark-green--text"> {{ $t("view_page") }}</span>
                </v-btn>
              </v-card-actions>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <LazyDialogsRating :dialog.sync="dialog" />
    </v-container>
  </main>
</template>

<script>
export default {
  name: "OrderDetails",
  data() {
    return {
      dialog: false,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/_variables.scss";
.order-details {
  .v-card {
    border-radius: 16px !important;
  }
  .v-image__image--cover {
    border-radius: 8px !important;
  }
}
</style>
