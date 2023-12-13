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
        <span class="secondary--text">{{ $t("edit_personal_info") }}</span>
      </v-card-title>
      <v-card-text>
        <ValidationObserver v-slot="{ handleSubmit }">
          <v-form @submit.prevent="handleSubmit(onSubmit)">
            <v-row>
              <v-col cols="12" class="pb-0">
                <LazyFormGroup
                  name="company_name"
                  errorName="name"
                  :rules="{
                    required: true,
                  }"
                >
                  <template #default="{ attrs }">
                    <v-text-field
                      type="text"
                      v-model="form.name"
                      v-bind="attrs"
                      outlined
                      rounded
                      color="primary"
                      :placeholder="$t(`fields.company_name`) + '...'"
                    >
                    </v-text-field>
                  </template>
                </LazyFormGroup>
              </v-col>
              <v-col cols="12" class="pb-0">
                <LazyFormGroup
                  name="email"
                  errorName="email"
                  :rules="{
                    required: true,
                  }"
                >
                  <template #default="{ attrs }">
                    <v-text-field
                      type="email"
                      v-model="form.email"
                      v-bind="attrs"
                      outlined
                      rounded
                      color="primary"
                      :placeholder="$t(`fields.email`) + '...'"
                    >
                      <template v-slot:prepend-inner>
                        <v-icon color="light-secondary">{{
                          `mdi-email-outline`
                        }}</v-icon>
                      </template>
                    </v-text-field>
                  </template>
                </LazyFormGroup>
              </v-col>
              <v-col cols="12" class="pb-0">
                <LazyFormGroup
                  name="city"
                  :rules="{
                    required: true,
                  }"
                >
                  <template #default="{ attrs }">
                    <v-autocomplete
                      :items="cities"
                      item-text="name"
                      item-value="id"
                      outlined
                      rounded
                      v-model="form.city_id"
                      v-bind="attrs"
                      attrs
                      :placeholder="$t(`fields.city`) + '...'"
                      :no-data-text="$t('no_data')"
                    >
                      <template v-slot:prepend-inner>
                        <v-icon color="light-secondary"> mdi-map-marker</v-icon>
                      </template>
                    </v-autocomplete>
                  </template>
                </LazyFormGroup>
              </v-col>
              <v-col cols="12" class="pb-0">
                <LazyFormGroup
                  name="phone"
                  errorName="phone"
                  :rules="{
                    required: true,
                  }"
                >
                  <template #default="{ attrs }">
                    <v-text-field
                      type="number"
                      v-model="form.phone"
                      v-bind="attrs"
                      outlined
                      rounded
                      color="primary"
                      :placeholder="$t(`fields.phone`) + '...'"
                    >
                      <template v-slot:prepend-inner>
                        <v-icon color="light-secondary">{{
                          `mdi-phone-outline`
                        }}</v-icon>
                      </template>
                    </v-text-field>
                  </template>
                </LazyFormGroup>
              </v-col>
              <v-col cols="12" class="pb-0">
                <LazyFormGroup
                  name="commercial_image"
                  :rules="{
                    required: true,
                  }"
                >
                  <template #default="{ attrs }">
                    <LazyFileUpload
                      v-model="form.commercial_image"
                      :form="form"
                      fieldName="commercial_image"
                      v-bind="attrs"
                      attrs
                      :placeholder="$t(`fields.commercial_register`) + '...'"
                    />
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
                  <span class="white--text">{{ $t("save_edit") }}</span>
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
  name: "PersonalInfo",
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      loading: false,
      user_token: "",
      cities: [],
      form: {
        commercial_image: "",
        name: "",
        email: "",
        phone: "",
        city_id: "",
      },
    };
  },
  created() {
    this.getCities();
  },
  methods: {
    async getCities() {
      const res = await this.$http.get({ path: "all_cities" });
      const { data } = res.data;
      this.cities = data;
    },
    generateData() {
      const formData = new FormData();
      for (const key in this.form) {
        if (key !== "image") formData.append(key, this.form[key]);
      }
      return formData;
    },
    onSubmit() {
      this.loading = true;
      this.$http
        .post({ path: "profiles", data: this.generateData() })
        .then(() => {
          this.$auth.fetchUser();
          this.$emit("update:dialog");
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  watch: {
    "$auth.user": {
      handler(user) {
        if (user) {
          this.form = { ...user, city_id: user.city.id };
        }
      },
      immediate: true,
    },
  },
};
</script>
