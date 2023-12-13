<template>
  <main>
    <ValidationObserver v-slot="{ handleSubmit }">
      <v-form @submit.prevent="handleSubmit(onSubmit)">
        <v-row>
          <v-col class="py-0" cols="12">
            <LazyFormGroup name="password" :rules="{ required: true }">
              <template #default="{ attrs }">
                <v-text-field
                  type="password"
                  errorName="password"
                  v-model="form.password"
                  v-bind="attrs"
                  outlined
                  rounded
                  color="primary"
                  :placeholder="$t(`fields.new_password`) + '...'"
                >
                  <template v-slot:prepend-inner>
                    <v-icon color="light-secondary">mdi-lock-outline</v-icon>
                  </template>
                </v-text-field>
              </template>
            </LazyFormGroup>
          </v-col>
          <v-col class="py-0" cols="12">
            <LazyFormGroup
              name="confirm_password"
              :rules="{ required: true, confirmed: 'password' }"
            >
              <template #default="{ attrs }">
                <v-text-field
                  type="password"
                  errorName="confirm_password"
                  v-model="form.confirm_password"
                  v-bind="attrs"
                  outlined
                  rounded
                  color="primary"
                  :placeholder="$t(`fields.confirm_password`) + '...'"
                >
                  <template v-slot:prepend-inner>
                    <v-icon color="light-secondary">mdi-lock-outline</v-icon>
                  </template>
                </v-text-field>
              </template>
            </LazyFormGroup>
          </v-col>
          <v-col cols="12" lg="6" class="d-flex justify-center mx-auto">
            <v-btn
              :loading="loading"
              type="submit"
              class="primary py-5 px-8"
              rounded
            >
              <span class="white--text">{{ $t("confirm") }}</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </ValidationObserver>
  </main>
</template>

<script>
export default {
  name: "LastStep",
  props: {
    sharedData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      loading: false,
      form: {
        confirm_password: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit() {
      this.loading = true;
      this.$http
        .post({
          path: "reset_account",
          data: { ...this.form, ...this.sharedData },
        })
        .then(() => {
          this.$emit("on-success");
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
