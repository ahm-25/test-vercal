<template>
  <main class="products-dialog">
    <v-dialog :value="dialog" persistent fullscreen>
      <div>
        <v-overlay
          z-index="-1"
          color="dark-primary"
          position="absolute"
          opacity="1"
          light
        >
        </v-overlay>

        <LazyFrameShapes />
        <v-container
          class="fill-height d-flex align-center"
          style="min-height: 100vh"
        >
          <v-row>
            <v-col lg="12" class="mx-auto">
              <v-card
                style="min-height: 50vh"
                class="mx-auto products__card mt-lg-15 pa-10"
                flat
                elevation="0"
              >
                <template v-if="!loading">
                  <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                        lg="5"
                        v-if="product.images && product.images.length > 0"
                      >
                        <v-window v-model="onboarding" reverse>
                          <v-window-item
                            v-for="(item, index) in product.images"
                            :key="index"
                          >
                            <v-img
                              :src="item['media']"
                              width="400"
                              height="400"
                              class="rounded-xl d-block mx-auto"
                              contain
                            ></v-img>
                          </v-window-item>
                        </v-window>

                        <div class="d-flex justify-center">
                          <v-btn text @click="prev">
                            <v-icon color="primary">mdi-arrow-right</v-icon>
                          </v-btn>
                          <v-item-group
                            v-model="onboarding"
                            class="text-center"
                            mandatory
                          >
                            <v-item
                              v-for="n in product.images"
                              :key="`btn-${n}`"
                              v-slot="{ active, toggle }"
                            >
                              <v-btn :input-value="active" icon @click="toggle">
                                <span
                                  class="bolt"
                                  :class="active && 'active'"
                                ></span>
                              </v-btn>
                            </v-item>
                          </v-item-group>
                          <v-btn text @click="next">
                            <v-icon color="primary">mdi-arrow-left</v-icon>
                          </v-btn>
                        </div>
                      </v-col>
                      <v-col cols="12" lg="7">
                        <v-row>
                          <v-col cols="6" class="text-center text-lg-start">
                            <h1 class="size-sm-16 mx-3 primary--text">
                              {{ product.name }}
                            </h1>
                          </v-col>
                          <v-col class="text-center text-lg-end" cols="6">
                            <div class="mx-3">
                              <span class="size-30 size-sm-16">
                                {{ product.price }}
                              </span>
                              <span class="size-16 size-sm-12">ر.س.</span>
                            </div>
                          </v-col>
                        </v-row>
                        <v-col cols="12">
                          <v-divider></v-divider>
                        </v-col>
                        <v-row>
                          <v-col lg="12">
                            <div
                              class="size-14 lin-height-25"
                              v-html="product.desc"
                            ></div>
                          </v-col>
                        </v-row>
                        <v-col cols="12">
                          <v-divider></v-divider>
                        </v-col>
                        <v-col cols="12">
                          <v-row>
                            <v-col cols="12">
                              <Reviewers :reviewers="reviewers" />
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="12">
                          <v-divider></v-divider>
                        </v-col>
                        <v-col cols="12">
                          <v-row>
                            <v-col cols="6" class="d-flex">
                              <div>
                                <v-img
                                  :src="
                                    product.category &&
                                    product.category.image &&
                                    product.category.image['media']
                                  "
                                  width="25px"
                                  height="25px"
                                  class="rounded-lg d-block mx-auto"
                                ></v-img>
                              </div>
                              <h2
                                class="size-14 size-sm-12 align-self-center secondary--text mx-2"
                              >
                                {{ product.category && product.category.name }}
                              </h2>
                            </v-col>
                            <v-col cols="6 text-end" v-if="product.code">
                              <v-chip color="blue-light-3">
                                <span class="blue-light-1--text">
                                  {{ product.code }}
                                </span>
                              </v-chip>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-card
                          color="light-primary-1"
                          elevation="0"
                          class="radius-20 pa-6"
                        >
                          <Quantity
                            :product="product"
                            fieldName="available_qty"
                          />
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-container>
                  <v-card-actions>
                    <v-btn
                      depressed
                      width="70"
                      height="70"
                      @click="$emit('update:dialog')"
                      color="mint"
                      class="products__close radius-12"
                    >
                      <v-icon color="white"> mdi-close-circle-outline </v-icon>
                    </v-btn>
                  </v-card-actions>
                </template>
                <LazyLoader v-else />
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-dialog>
    <v-dialog width="500px" v-model="ratingDialog">
      <v-overlay
        z-index="-1"
        color="primary"
        position="absolute"
        opacity="0.2"
        light
      >
      </v-overlay>
      <v-card flat color="white" class="pa-8">
        <v-toolbar flat color="blue-light-3" class="mb-2" rounded>
          <v-toolbar-title class="size-12">شركة الخالدي</v-toolbar-title>
          <v-rating dense size="12" color="primary"></v-rating>
          <v-spacer></v-spacer>
          <v-btn icon @click="ratingDialog = false">
            <v-icon>mdi-close-circle-outline</v-icon>
          </v-btn>
        </v-toolbar>
        <v-list color="blue-light-3" rounded>
          <v-subheader class="size-10">17 يوليو 2022</v-subheader>
          <v-list-item v-for="(item, key) in items" :key="key">
            <v-list-item-text class="size-14">{{
              item.title
            }}</v-list-item-text>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </main>
</template>

<script>
import Reviewers from "@/components/Dialogs/Products/Reviewers.vue";
import Quantity from "./Quantity.vue";
export default {
  name: "DialogsProducts",
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    product: {
      type: Object,
      default: () => {},
    },
    loading: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    Reviewers,
    Quantity,
  },
  data() {
    return {
      ratingDialog: false,
      model: null,
      value: 0,
      length: 3,
      onboarding: 0,
      reviewers: [
        {
          id: 1,
          name: "شركة الخالدي",
          rating: 4,
          opinion:
            "خدمة احترافية واداء المورد كان فوق الممتاز صراحة وساعد في نجاح الصالة الخاصة بنا في المؤتمر التفاعلي في فعاليات الترفيه",
          time: "22 أغسطس 2022",
        },
        {
          id: 2,
          name: "شركة الخالدي",
          rating: 4,
          opinion:
            "خدمة احترافية واداء المورد كان فوق الممتاز صراحة وساعد في نجاح الصالة الخاصة بنا في المؤتمر التفاعلي في فعاليات الترفيه",
          time: "22 أغسطس 2022",
        },
        {
          id: 3,
          name: "شركة الخالدي",
          rating: 4,
          opinion:
            "خدمة احترافية واداء المورد كان فوق الممتاز صراحة وساعد في نجاح الصالة الخاصة بنا في المؤتمر التفاعلي في فعاليات الترفيه",
          time: "22 أغسطس 2022",
        },
        {
          id: 4,
          name: "شركة الخالدي",
          rating: 4,
          opinion:
            "خدمة احترافية واداء المورد كان فوق الممتاز صراحة وساعد في نجاح الصالة الخاصة بنا في المؤتمر التفاعلي في فعاليات الترفيه",
          time: "22 أغسطس 2022",
        },
        {
          id: 5,
          name: "شركة الخالدي",
          rating: 4,
          opinion:
            "خدمة احترافية واداء المورد كان فوق الممتاز صراحة وساعد في نجاح الصالة الخاصة بنا في المؤتمر التفاعلي في فعاليات الترفيه",
          time: "22 أغسطس 2022",
        },
      ],

      items: [
        {
          title:
            "السلعة التي لا يستطيع المستهلك الانتفاع منها مباشرةً، كموقع مبنى مكتبي أو معدات رأسمالية، يمكن اعتبارها مصدرا غير مباشرا للمنفعة كقيمة إعادة البيع أو كمصدر للدخل. والسلعة في الاقتصاد ليس ضرورياً أن تكون مقبولة أخلاقياً ولا حتى قانونياً",
        },
      ],
    };
  },
  methods: {
    next() {
      this.onboarding =
        this.onboarding + 1 === this.length ? 0 : this.onboarding + 1;
    },
    prev() {
      this.onboarding =
        this.onboarding - 1 < 0 ? this.length - 1 : this.onboarding - 1;
    },
  },
};
</script>
<style scoped>
.theme--light.v-divider {
  border-color: #ddf7e8;
}
</style>
