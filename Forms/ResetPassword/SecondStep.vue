<template>
  <main>
    <ValidationObserver v-slot="{ handleSubmit }">
      <v-form @submit.prevent="handleSubmit(onSubmit)" ref="form">
        <v-row>
          <v-col cols="12" class="pb-0">
            <LazyFormGroup
              name="otp_code"
              :rules="{
                required: true,
              }"
            >
              <template #default="{ attrs }">
                <v-text-field
                  type="text"
                  errorName="reset_code"
                  v-model="form.reset_code"
                  v-bind="attrs"
                  outlined
                  rounded
                  color="primary"
                  :placeholder="$t(`fields.otp_code`) + '...'"
                >
                  <template v-slot:prepend-inner>
                    <v-icon color="light-secondary">
                      mdi-message-processing-outline
                    </v-icon>
                  </template>
                </v-text-field>
              </template>
            </LazyFormGroup>
          </v-col>

          <v-col cols="12" lg="6" class="mx-auto d-flex justify-center">
            <v-btn
              :loading="loading"
              type="submit"
              class="py-5 px-5"
              rounded
              color="primary"
              outlined
            >
              <span>{{ $t("next") }}</span>
            </v-btn>
          </v-col>
          <v-col cols="12" class="text-center">
            <LazyCountDown
              v-if="!showCode"
              @on-timer-end="showCode = !showCode"
              :timer="timer"
            />
            <v-btn
              v-else
              :loading="false"
              :ripple="false"
              type="button"
              text
              rounded
              @click="handleResend"
            >
              <span class="primary--text">{{ $t("resend_code") }}</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </ValidationObserver>
  </main>
</template>

<script>
export default {
  name: "SecondStep",
  props: {
    sharedData: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      dialog: false,
      loading: false,
      showCode: false,
      timer: 5,
      form: {
        reset_code: "",
        user_token: "",
      },
    };
  },
  methods: {
    handleResend() {
      this.loading = true;
      this.$http.post({ path: "send_code", data: this.sharedData }).then(() => {
        this.timer = 5;
        this.showCode = false;
      });
    },
    onSubmit() {
      this.loading = true;

      this.$http
        .post({
          path: "check_if_code_true",
          data: { ...this.form, user_token: this.sharedData.user_token },
        })
        .then((res) => {
          const { data } = res.data;
          this.$emit("on-next", { ...this.form, ...data });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    resetForm() {
      this.form.reset_code = "";
      if (this.$refs.form) {
        this.$refs.form.reset();
      }
    },
  },
  watch: {
    dialog: {
      handler(value) {
        if (!value) {
          this.resetForm();
        }
      },
      immediate: true,
    },
  },
};
</script>
