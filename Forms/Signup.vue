<template>
  <main>
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
              name="commercial_image"
              errorName="commercial_image"
              rules="required|mimes:pdf"
            >
              <template #default="{ attrs }">
                <LazyFileUpload
                  accept="application/pdf"
                  v-model="form.commercial_image"
                  :form="form"
                  fieldName="commercial_image"
                  v-bind="attrs"
                  :placeholder="$t(`fields.commercial_register`) + '...'"
                  hint="سجل التجاري يجب ان يكون pdf"
                  persistent-hint
                />
              </template>
            </LazyFormGroup>
          </v-col>
          <v-col cols="12" lg="6" class="pb-0">
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
          <v-col cols="12" lg="6" class="pb-0">
            <LazyFormGroup
              name="email"
              errorName="email"
              :rules="{
                required: true,
                email: true,
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
          <v-col cols="12" class="pb-0" v-if="user_type !== 'company'">
            <LazyFormGroup
              name="years_of_experience"
              errorName="years_of_experience"
              :rules="{
                required: true,
              }"
            >
              <template #default="{ attrs }">
                <v-text-field
                  type="number"
                  v-model="form.years_of_experience"
                  v-bind="attrs"
                  outlined
                  rounded
                  color="primary"
                  :placeholder="$t(`fields.years_of_experience`) + '...'"
                >
                  <template v-slot:prepend-inner>
                    <v-icon color="light-secondary">{{
                      `mdi-briefcase-outline`
                    }}</v-icon>
                  </template>
                </v-text-field>
              </template>
            </LazyFormGroup>
          </v-col>
          <v-col cols="12" class="pb-0" v-if="user_type !== 'company'">
            <LazyFormGroup
              name="bank_name"
              errorName="bank_name"
              :rules="{
                required: true,
              }"
            >
              <template #default="{ attrs }">
                <v-text-field
                  v-model="form.bank_name"
                  v-bind="attrs"
                  outlined
                  rounded
                  color="primary"
                  :placeholder="$t(`fields.bank_name`) + '...'"
                >
                  <template v-slot:prepend-inner>
                    <v-icon color="light-secondary">{{ `mdi-bank` }}</v-icon>
                  </template>
                </v-text-field>
              </template>
            </LazyFormGroup>
          </v-col>
          <v-col cols="12" class="pb-0" v-if="user_type !== 'company'">
            <LazyFormGroup
              name="iban"
              errorName="iban"
              :rules="{
                required: true,
                max: 22,
                min: 22,
              }"
            >
              <template #default="{ attrs }">
                <v-text-field
                  type="number"
                  suffix="SA"
                  oninput="this.value= this.value&&this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').replace(/\+/g,'').replace(/\./g,'');"
                  v-model="form.iban"
                  v-bind="attrs"
                  outlined
                  rounded
                  color="primary"
                  :placeholder="$t(`fields.iban`) + '...'"
                >
                  <template v-slot:prepend-inner>
                    <v-icon color="light-secondary">{{
                      `mdi-credit-card-edit-outline`
                    }}</v-icon>
                  </template>
                </v-text-field>
              </template>
            </LazyFormGroup>
          </v-col>
          <v-col cols="12" class="pb-0">
            <LazyFormGroup
              name="image"
              :rules="{
                required: true,
              }"
            >
              <template #default="{ attrs }">
                <LazyFileUpload
                  accept="image/*"
                  v-model="form.image"
                  :form="form"
                  fieldName="image"
                  v-bind="attrs"
                  attrs
                  :placeholder="$t(`fields.image`) + '...'"
                />
              </template>
            </LazyFormGroup>
          </v-col>
          <v-col cols="12" class="pb-0" v-if="user_type == 'company'">
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
          <v-col class="py-0" cols="12" lg="6">
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
                    <v-icon color="light-secondary">mdi-lock-outline</v-icon>
                  </template>
                </v-text-field>
              </template>
            </LazyFormGroup>
          </v-col>
          <v-col class="py-0" cols="12" lg="6">
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
                    <v-icon color="light-secondary">mdi-lock-outline</v-icon>
                  </template>
                </v-text-field>
              </template>
            </LazyFormGroup>
          </v-col>
          <LazyAllCitiesSelect
            :form="form"
            :cities="cities"
            v-if="user_type !== 'company'"
          />
          <!-- <v-col cols="12" class="py-0" v-if="user_type !== 'company'">
            <v-checkbox v-model="form.is_in_all_country">
              <template v-slot:label>
                <div class="text-small">
                  <span>{{ $t("all_cities") }}</span>
                </div>
              </template>
            </v-checkbox>
          </v-col> -->

          <v-col cols="12" class="py-0">
            <v-checkbox>
              <template v-slot:label>
                <div class="text-small">
                  <span>{{ $t("i_own_read") }}</span>
                  <v-btn
                    @click.stop.prevent="termsDialog = !termsDialog"
                    text
                    :ripple="false"
                    class="primary--text font-bold px-1"
                  >
                    <span>{{ $t("terms_and_conditions") }}</span>
                  </v-btn>
                  <span>{{ $t("3ared_website") }}</span>
                </div>
              </template>
            </v-checkbox>
          </v-col>
          <v-col cols="12">
            <v-btn
              :loading="loading"
              type="submit"
              class="primary py-5"
              block
              rounded
            >
              <span class="white--text">{{ $t("participation") }}</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </ValidationObserver>
    <LazyDialogsVerifySignup
      :dialog.sync="dialog"
      :user_type="user_type"
      :token="user_token"
    />
    <LazyDialogsTermsAndConditions :dialog.sync="termsDialog" />
  </main>
</template>

<script>
export default {
  name: "SignupForm",
  props: {
    user_type: {
      type: String,
      default: "company",
    },
  },

  data() {
    return {
      dialog: false,
      termsDialog: false,
      loading: false,
      user_token: "",
      cities: [],
      form: {
        commercial_image: "",
        image: "",
        name: "",
        password: "",
        confirm_password: "",
        email: "",
        phone: "",
        user_type: "",
        city_id: "",
        bank_name: "",
        iban: "",
        is_in_all_country: 0,
        city_list: [],
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
        if (
          key !== "city_list" &&
          key !== "is_in_all_country" &&
          key !== "iban" &&
          this.form[key] !== ""
        ) {
          formData.append(key, this.form[key]);
        }
      }
      this.form["iban"] && formData.append("iban", `SA${this.form["iban"]}`);
      // formData.append(
      //   "is_in_all_country",
      //   this.form["is_in_all_country"] ? 1 : 0
      // );

      this.form.city_list.forEach((city, index) => {
        formData.append(`city_list[${index}]`, city.id);
      });
      return formData;
    },
    onSubmit() {
      this.loading = true;
      this.$http
        .post({ path: "register", data: this.generateData() })
        .then((res) => {
          const { data } = res.data;

          this.user_token = data.user_token;
          this.dialog = !this.dialog;
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
