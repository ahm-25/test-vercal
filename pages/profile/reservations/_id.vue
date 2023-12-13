<template>
  <main class="order-details">
    <v-container>
      <v-row>
        <v-col cols="12" lg="8">
          <v-row>
            <v-col cols="12">
              <v-card flat class="pa-5">
                <v-card-title class="size-16 dark-mint--text">
                  {{ $t("reservations_details") }}
                </v-card-title>
                <v-card-text>
                  <v-list>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="size-14 dark-mint--text">
                          {{ $t("reservation_number") }}
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action class="primary--text">
                        {{ item.id }}
                      </v-list-item-action>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="size-14 dark-mint--text">
                          {{ $t("reservation_date") }}
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action class="primary--text">
                        {{ item.created_at }}
                      </v-list-item-action>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="size-14 dark-mint--text">
                          {{ $t("reservation_coast") }}
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-icon class="primary--text">
                        <span class="px-1"> {{ item.total_price }}</span>
                        <span>{{ $t("sar") }}</span>
                      </v-list-item-icon>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="size-14 dark-mint--text">
                          {{ $t("payment_method") }}
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action class="primary--text">
                        {{ item.event && item.event.pay_method }}
                      </v-list-item-action>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="size-14 dark-mint--text">
                          {{ $t("booth_type") }}
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action class="primary--text">
                        {{
                          item.booths &&
                          item.booths.map((el) => el.name).join(",")
                        }}
                      </v-list-item-action>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="size-14 dark-mint--text">
                          {{ $t("booth_number") }}
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action
                        class="primary--text"
                        style="text-transform: capitalize"
                      >
                        {{
                          item.booths &&
                          item.booths
                            .map((el) => el.reserved_booth_name)
                            .join(",")
                        }}
                      </v-list-item-action>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title
                          class="size-14 dark-mint--text d-flex justify-center justify-lg-start flex-wrap"
                        >
                          <v-btn
                            class="mb-2"
                            :href="item.event.contract"
                            target="_blank"
                            outlined
                            large
                            color="primary"
                            rounded
                          >
                            {{ $t("download_contract") }}
                          </v-btn>
                          <v-btn
                            :href="item.event.plan"
                            target="_blank"
                            outlined
                            large
                            color="primary"
                            rounded
                            class="mx-2"
                          >
                            {{ $t("plan") }}
                          </v-btn>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-card flat class="pa-5">
                <v-card-title class="size-16 dark-mint--text">
                  {{ $t("events_details") }}
                </v-card-title>
                <v-card-text>
                  <LazyCardsReservation :item="item" />
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" lg="4">
          <v-card flat class="pa-5">
            <v-card-title class="size-16 dark-mint--text">
              {{ $t("organizer") }}
            </v-card-title>
            <v-card-text class="text-center">
              <v-img
                class="mx-auto"
                height="120px"
                width="120px"
                aspect-ratio="1.5"
                :src="
                  item.organizer.image
                    ? item.organizer.image['media']
                    : item.organizer.default_image
                "
                alt="photo"
              />
              <v-card-title class="primary--text justify-center">
                <v-rating
                  background-color="green lighten-3"
                  color="green"
                  readonly
                  length="5"
                  size="20"
                  :value="item && item.organizer && item.organizer.rate"
                ></v-rating>
              </v-card-title>
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title
                      class="d-flex align-center justify-center"
                    >
                      <v-btn
                        rounded
                        large
                        class="primary"
                        block
                        :to="
                          localePath(
                            `/events/organizer/${
                              item.organizer && item.organizer.id
                            }/events`
                          )
                        "
                        >المعارض
                      </v-btn>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" v-if="item.display_instalments">
          <p>الدفعات</p>
          <v-card flat class="px-5">
            <v-list>
              <v-list-item
                v-for="(installment, index) in item.instalments"
                :key="index"
              >
                <v-list-item-content>
                  <v-list-item-title class="dark-mint--text">
                    <span>الدفعة رقم ({{ installment.batch }}) </span>
                    <span>تاريخ الدفع {{ installment.payment_date }} </span>
                    <span>قيمة الدفع {{ installment.amount }} ر.س</span>
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn
                    v-if="!installment.is_paid"
                    :disabled="!installment.active_btn"
                    @click="onInstallmentPay(installment)"
                    class="font-bold"
                    color="secondary"
                  >
                    السداد
                  </v-btn>
                  <span v-else class="primary--text">تم السداد</span>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-btn
          v-if="item.display_rate"
          class="primary"
          large
          rounded
          @click="ratingDialog = !ratingDialog"
          >تقيم الفعالية
        </v-btn>
        <v-col cols="12" v-if="item.display_cancel">
          <v-card flat class="px-5">
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="dark-mint--text">
                    يمكن الغاء الحجز فقط قبل
                    {{ item.event && item.event.last_cancel_reserve_duration }}
                    من بدء الفعالية.
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn
                    @click="dialog = !dialog"
                    class="font-bold"
                    text
                    color="error"
                  >
                    {{ $t("cancel_reservation") }}
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
      <LazyDialogsCancel :dialog.sync="dialog" @on-cancel="onCancel">
        <template #title> الغاء الحجز </template>
        <template #subtitle> هل أنت متأكد من رغبتك في الغاء الحجز؟ </template>
        <template #actions> تأكيد الغاء الحجز </template>
      </LazyDialogsCancel>
      <ValidationObserver v-slot="{ handleSubmit }" ref="form">
        <LazyDialogsCancel :dialog.sync="installmentDialog">
          <template #title>صورة العملية الدفع </template>
          <template #subtitle v-if="installmentDialog">
            <LazyFormGroup
              name="reservation_image"
              :rules="{
                required: true,
              }"
            >
              <template #default="{ attrs }">
                <LazyFileUpload
                  ref="file_ref"
                  v-model="form.image"
                  :form="form"
                  fieldName="image"
                  v-bind="attrs"
                  attrs
                />
              </template>
            </LazyFormGroup>
          </template>
          <template #actions>
            <v-btn
              :loading="loading"
              block
              class="secondary"
              @click="handleSubmit(onSubmit)"
              >تأكيد</v-btn
            >
          </template>
        </LazyDialogsCancel>
      </ValidationObserver>
      <ValidationObserver v-slot="{ handleSubmit }" ref="form">
        <v-dialog
          v-model="ratingDialog"
          max-width="700"
          close-delay="300"
          transition="translate"
          origin="top center"
        >
          <v-card max-width="700" class="pa-5">
            <v-card-title class="justify-center">تقيم الفعالية </v-card-title>
            <v-card-text class="text-center">
              <v-rating length="5" size="20" v-model="ratingForm.rate" />
            </v-card-text>
            <v-card-actions>
              <v-btn
                :loading="loadingRating"
                block
                class="secondary"
                @click="handleSubmit(handleRating)"
                >تأكيد</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </ValidationObserver>
    </v-container>
  </main>
</template>

<script>
export default {
  name: "ReservationsDetails",
  async asyncData({ $http, params }) {
    const res = await $http.get({ path: `/reservations/${params.id}` });
    const { data } = res.data;
    return { item: data };
  },
  data() {
    return {
      dialog: false,
      ratingDialog: false,
      loadingRating: false,
      loading: false,
      installmentDialog: false,
      ratingForm: {
        rate: 0,
      },
      form: {
        image: "",
        batch: "",
      },
    };
  },
  methods: {
    async handleRating() {
      try {
        this.loadingRating = true;
        const data = {
          ...this.ratingForm,
          rate_type: "event",
          rate_id: this.item.event && this.item.event.id,
        };
        await this.$http.post({ path: `rates`, data });
        this.ratingDialog = false;
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingRating = false;
      }
    },
    onInstallmentPay(installment) {
      this.installmentDialog = !this.installmentDialog;
      this.form.batch = installment.batch;
    },
    resetData() {
      this.$nextTick(() => {
        this.$refs.file_ref && this.$refs.file_ref.resetFile();
        this.$refs.form && this.$refs.form.reset();
      });
      this.installmentDialog = false;
    },
    generateData() {
      const formData = new FormData();
      for (const key in this.form) {
        formData.append(key, this.form[key]);
      }
      formData.append("_method", "put");
      return formData;
    },
    onSubmit() {
      this.loading = true;
      this.$http
        .post({
          path: `reservation_instalmets/${this.$route.params.id}`,
          data: this.generateData(),
        })
        .then(() => {
          this.resetData();
          this.$nuxt.refresh();
        })
        .finally(() => {
          this.loading = false;
        });
    },
    onCancel() {
      this.$http
        .post({
          path: `/reservations/${this.$route.params.id}`,
          data: { _method: "put" },
        })
        .then(() => {
          this.$router.push(
            this.localePath("/profile/reservations?status=upcoming")
          );
        })
        .finally(() => {
          this.dialog = !this.dialog;
        });
    },
  },
  watch: {
    installmentDialog: {
      handler(value) {
        if (!value) {
          this.resetData();
        }
      },
      immediate: true,
    },
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
  .v-list-item__title,
  .v-list-item__subtitle {
    white-space: initial !important;
  }
}
</style>
