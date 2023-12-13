<template>
  <main>
    <ValidationObserver v-slot="{ handleSubmit }" ref="form">
      <v-form @submit.prevent="handleSubmit(onSubmit)">
        <v-row>
          <v-col cols="12" class="pb-0">
            <LazyFormGroup
              :name="fieldType"
              :rules="{
                required: true,
                email: fieldType == 'email',
              }"
            >
              <template #default="{ attrs }">
                <v-text-field
                  :type="textType"
                  errorName="username"
                  v-model="form.username"
                  v-bind="attrs"
                  outlined
                  rounded
                  color="primary"
                  :placeholder="$t(`fields.${fieldType}`) + '...'"
                >
                  <template v-slot:prepend-inner>
                    <v-icon color="light-secondary">{{
                      `mdi-${fieldType}-outline`
                    }}</v-icon>
                  </template>
                </v-text-field>
              </template>
            </LazyFormGroup>
          </v-col>

          <v-col cols="12" lg="6" class="mx-auto">
            <v-btn
              :loading="loading"
              type="submit"
              class="primary py-5"
              block
              rounded
            >
              <span class="white--text">{{ $t("next") }}</span>
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
    fieldType: {
      type: String,
      default: "phone",
    },
    dialog: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      loading: false,
      form: {
        username: "",
      },
    };
  },
  methods: {
    onSubmit() {
      this.loading = true;
      this.$http
        .post({ path: "send_code", data: this.form })
        .then((res) => {
          const { data } = res.data;
          this.$emit("on-next", { ...this.form, user_token: data.user_token });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    resetForm() {
      this.form.username = "";
      if (this.$refs.form) {
        this.$refs.form.reset();
      }
    },
  },

  computed: {
    textType() {
      if (this.fieldType === "phone") {
        return "number";
      } else {
        return "email";
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
