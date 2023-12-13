<template>
  <main class="contact-form">
    <v-row>
      <v-col cols="12">
        <ValidationObserver v-slot="{ handleSubmit }" ref="form">
          <v-form @submit.prevent="handleSubmit(onSubmit)">
            <v-row>
              <v-col cols="12" class="pb-0">
                <LazyFormGroup
                  name="message_subject"
                  rules="required"
                  errorName="subject"
                >
                  <template #default="{ attrs }">
                    <v-select
                      outlined
                      v-model="form.message_type_id"
                      :items="messageTypes"
                      item-text="name"
                      item-value="id"
                      return-object
                      rounded
                      color="primary-80"
                      placeholder="موضوع الرساله"
                      flat
                      v-bind="attrs"
                    >
                      <template #prepend-inner>
                        <v-icon color="primary">mdi-email-outline</v-icon>
                      </template>
                    </v-select>
                  </template>
                </LazyFormGroup>
              </v-col>
              <v-col
                cols="12"
                class="pb-0"
                v-if="form.message_type_id.is_another"
              >
                <LazyFormGroup
                  name="contact_reason"
                  rules="required"
                  errorName="subject"
                >
                  <template #default="{ attrs }">
                    <v-text-field
                      outlined
                      v-model="form.contact_reason"
                      rounded
                      color="primary-80"
                      placeholder="سبب التواصل..."
                      flat
                      v-bind="attrs"
                    >
                    </v-text-field>
                  </template>
                </LazyFormGroup>
              </v-col>
              <v-col cols="12" class="py-0">
                <LazyFormGroup name="name" rules="required" errorName="name">
                  <template #default="{ attrs }">
                    <v-text-field
                      errorName="name"
                      v-model="form.name"
                      v-bind="attrs"
                      outlined
                      rounded
                      color="primary"
                      placeholder=" أدخل الاسم..."
                    >
                    </v-text-field>
                  </template>
                </LazyFormGroup>
              </v-col>
              <v-col cols="12" class="py-0">
                <LazyFormGroup
                  name="email"
                  rules="required|email"
                  errorName="email"
                >
                  <template #default="{ attrs }">
                    <v-text-field
                      type="email"
                      errorName="email"
                      v-model="form.email"
                      v-bind="attrs"
                      outlined
                      rounded
                      color="primary"
                      placeholder=" أدخل البريد الإلكتروني..."
                    >
                    </v-text-field>
                  </template>
                </LazyFormGroup>
              </v-col>
              <v-col cols="12" class="py-0">
                <LazyFormGroup name="phone" rules="required" errorName="phone">
                  <template #default="{ attrs }">
                    <v-text-field
                      type="number"
                      errorName="phone"
                      v-model="form.phone"
                      v-bind="attrs"
                      outlined
                      rounded
                      color="primary"
                      placeholder="أدخل رقم الجوال ..."
                    >
                    </v-text-field>
                  </template>
                </LazyFormGroup>
              </v-col>
              <v-col cols="12" class="py-0">
                <LazyFormGroup
                  name="message_details"
                  rules="required"
                  errorName="username"
                >
                  <template #default="{ attrs }">
                    <v-textarea
                      errorName="message_details"
                      v-model="form.content"
                      v-bind="attrs"
                      outlined
                      rounded
                      color="primary"
                      placeholder="تفاصيل الرسالة..."
                      no-resize
                    >
                    </v-textarea>
                  </template>
                </LazyFormGroup>
              </v-col>
              <v-col cols="12" lg="6">
                <v-btn
                  :loading="loading"
                  large
                  depressed
                  type="submit"
                  rounded
                  block
                  :ripple="false"
                  color="primary"
                  class="white--text font-bold"
                >
                  {{ $t("send_message") }}
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </ValidationObserver>
      </v-col>
    </v-row>
  </main>
</template>

<script>
export default {
  name: "Contact",
  props: {
    messageTypes: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      loading: false,
      form: {
        message_type_id: "",
        name: "",
        email: "",
        phone: "",
        content: "",
        contact_reason: "",
      },
    };
  },
  methods: {
    generateData() {
      const reqData = {
        ...this.form,
        message_type_id: this.form.message_type_id.id,
      };
      const formData = new FormData();
      for (const key in reqData) {
        if (reqData[key] !== "") {
          formData.append(key, reqData[key]);
        }
      }
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
        .post({ path: "contacts", data: this.generateData() })
        .then(() => {
          this.resetData();
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
