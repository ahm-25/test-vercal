<template>
  <main>
    <ValidationObserver v-slot="{ handleSubmit }">
      <v-form @submit.prevent="handleSubmit(onSubmit)">
        <v-row>
          <v-col cols="12" class="pb-0">
            <LazyFormGroup
              name="email"
              :rules="{
                required: true,
                email: true,
              }"
            >
              <template #default="{ attrs }">
                <v-text-field
                  type="email"
                  errorName="username"
                  v-model="form.username"
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
                  :placeholder="$t(`fields.password`) + '...'"
                >
                  <template v-slot:prepend-inner>
                    <v-icon color="light-secondary">mdi-lock-outline</v-icon>
                  </template>
                </v-text-field>
              </template>
            </LazyFormGroup>
          </v-col>
          <v-col cols="12" lg="6">
            <v-btn
              :loading="loading"
              type="submit"
              class="primary py-5"
              block
              rounded
            >
              <span class="white--text">{{ $t("login") }}</span>
            </v-btn>
          </v-col>
          <v-col
            cols="12"
            lg="6"
            class="align-self-center d-flex justify-center justify-lg-start"
          >
            <v-btn
              @click="dialog = !dialog"
              rounded
              block
              :ripple="false"
              text
              class="primary--text font-bold"
            >
              {{ $t("forget_password") }}
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </ValidationObserver>
    <LazyDialogsForgetPassword :dialog.sync="dialog" :fieldType="username" />
    <LazyDialogsVerifySignup
      :dialog.sync="confirmDialog"
      :user_type="account_type"
      :token="user_token"
    />
  </main>
</template>

<script>
export default {
  name: "LoginForm",

  props: {
    account_type: {
      type: String,
      default: "company_account",
    },
  },
  data() {
    return {
      dialog: false,
      confirmDialog: false,
      user_token: "",
      loading: false,
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit() {
      this.loading = true;
      if (this.account_type === "company_account") {
        this.$auth
          .loginWith("local", { data: this.form })
          .then(() => {
            this.$router.push(this.localePath("/"));
          })
          .catch((err) => {
            const { user_token, is_active } = err.response.data.data;
            if (!is_active) {
              this.confirmDialog = true;
            }
            console.log(err.response.data.data);
            this.user_token = user_token;
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        this.$http
          .post({ path: "login", data: this.form })
          .then((res) => {
            const { data } = res.data;
            window.open(
              `https://admin.ared.sa/#/login?token=${data["token"]}`,
              "_blank"
            );
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
  },
  computed: {
    username() {
      if (this.account_type === "company_account") {
        return "phone";
      } else {
        return "email";
      }
    },
    textType() {
      if (this.account_type === "company_account") {
        return "number";
      } else {
        return "email";
      }
    },
  },
};
</script>
