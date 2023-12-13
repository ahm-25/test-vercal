<template>
  <v-dialog
    :value="dialog"
    @input="$emit('update:dialog')"
    max-width="500"
    close-delay="300"
    transition="translate"
    origin="top center"
  >
    <v-card max-width="500" class="pa-6">
      <v-card-title class="d-flex justify-center">
        <span class="secondary--text">{{ $t("edit_password") }}</span>
      </v-card-title>
      <v-card-text class="pt-6">
        <ValidationObserver v-slot="{ handleSubmit }" ref="form">
          <v-form @submit.prevent="handleSubmit(onSubmit)">
            <v-row>
              <v-col class="py-0" cols="12">
                <LazyFormGroup
                  name="old_password"
                  :rules="{ required: true }"
                  errorName="old_password"
                >
                  <template #default="{ attrs }">
                    <v-text-field
                      type="password"
                      v-model="form.old_password"
                      v-bind="attrs"
                      outlined
                      rounded
                      color="primary"
                      :placeholder="$t(`fields.new_current_password`) + '...'"
                    >
                      <template v-slot:prepend-inner>
                        <v-icon color="light-secondary"
                          >mdi-lock-outline</v-icon
                        >
                      </template>
                    </v-text-field>
                  </template>
                </LazyFormGroup>
              </v-col>
              <v-col class="py-0" cols="12">
                <LazyFormGroup
                  name="password"
                  :rules="{ required: true }"
                  errorName="password"
                >
                  <template #default="{ attrs }">
                    <v-text-field
                      type="password"
                      v-model="form.password"
                      v-bind="attrs"
                      outlined
                      rounded
                      color="primary"
                      :placeholder="$t(`fields.new_password`) + '...'"
                    >
                      <template v-slot:prepend-inner>
                        <v-icon color="light-secondary"
                          >mdi-lock-outline</v-icon
                        >
                      </template>
                    </v-text-field>
                  </template>
                </LazyFormGroup>
              </v-col>
              <v-col class="py-0" cols="12">
                <LazyFormGroup
                  name="confirm_password"
                  errorName="confirm_password"
                  :rules="{ required: true, confirmed: 'password' }"
                >
                  <template #default="{ attrs }">
                    <v-text-field
                      type="password"
                      v-model="form.confirm_password"
                      v-bind="attrs"
                      outlined
                      rounded
                      color="primary"
                      :placeholder="$t(`fields.confirm_password`) + '...'"
                    >
                      <template v-slot:prepend-inner>
                        <v-icon color="light-secondary"
                          >mdi-lock-outline</v-icon
                        >
                      </template>
                    </v-text-field>
                  </template>
                </LazyFormGroup>
              </v-col>

              <v-col cols="12">
                <v-btn
                  :loading="loading"
                  type="submit"
                  class="primary py-5"
                  block
                  rounded
                >
                  <span class="white--text">{{ $t("update") }}</span>
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </ValidationObserver>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ChangePassword",
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      loading: false,

      form: {
        old_password: "",
        password: "",
        confirm_password: "",
      },
    };
  },

  methods: {
    generateData() {
      const formData = new FormData();
      for (const key in this.form) {
        formData.append(key, this.form[key]);
      }
      formData.append("_method", "put");
      return formData;
    },
    resetData() {
      for (const key in this.form) {
        this.form[key] = "";
      }
      this.$refs.form.reset();
    },
    onSubmit() {
      this.loading = true;
      this.$http
        .post({ path: "update_passwords", data: this.generateData() })
        .then(() => {
          this.$emit("update:dialog");
          this.resetData();
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  watch: {
    user_type: {
      handler(value) {
        this.form.user_type = value;
      },
      immediate: true,
    },
  },
};
</script>
