<template>
  <main>
    <ValidationObserver v-slot="{ handleSubmit }">
      <v-form @submit.prevent="handleSubmit(onSubmit)" ref="form">
        <v-row>
          <v-col cols="12" class="pb-0">
            <LazyFormGroup
              name="otp_code"
              errorName="verified_code"
              :rules="{
                required: true,
              }"
            >
              <template #default="{ attrs }">
                <v-text-field
                  type="text"
                  v-model="form.verified_code"
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
            <v-btn
              :loading="loading"
              :ripple="false"
              type="button"
              text
              rounded
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
  name: "FirstStep",
  props: {
    token: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      dialog: false,
      loading: false,
      form: {
        verified_code: "",
        user_token: "",
      },
    };
  },
  methods: {
    onSubmit() {
      this.loading = true;
      this.$http
        .post({ path: "verify_account", data: this.form })
        .then(() => {
          this.$emit("on-next");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    resetForm() {
      this.form.verified_code = "";
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
    token: {
      handler(value) {
        this.form.user_token = value;
      },
      immediate: true,
    },
  },
};
</script>
