<template>
  <main class="company-profile">
    <v-container>
      <v-row>
        <v-col cols="12" class="text-center">
          <h1 class="dark-mint--text">{{ $t("comapny_profile") }}</h1>
          <p class="dark-secondary--text pt-2">
            {{ $t("company_profile_sub_title") }}
          </p>
        </v-col>
        <v-col cols="12" sm="6" lg="5" class="mx-auto">
          <v-card v-hover class="radius-8 pa-5" min-height="120px">
            <v-card-title class="primary--text justify-center">
              {{ $auth.user && $auth.user.name }}
            </v-card-title>
            <v-list class="transparent">
              <v-list-item v-for="(item, index) in listItems" :key="index">
                <v-list-item-content>
                  <v-list-item-title class="d-flex align-center">
                    <img
                      width="20px"
                      height="20px"
                      :src="require(`@/assets/icons/${item.icon}.svg`)"
                      alt="photo"
                    />
                    <span class="light-secondary--text size-14 px-2">{{
                      item.text
                    }}</span>
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon>
                  <template v-if="item.key_name == 'commercial_image'">
                    <v-img
                      width="100px"
                      :src="item.value"
                      v-if="!item.value.endsWith('.pdf')"
                    />
                    <a target="_blank" :href="item.value" v-else>رابط السجل </a>
                  </template>
                  <template v-else>
                    {{ item.value }}
                  </template>
                </v-list-item-icon>
              </v-list-item>
            </v-list>
            <v-card-actions class="d-flex justify-center">
              <v-btn
                @click="editDialog = !editDialog"
                color="primary "
                class="px-8"
                rounded
                outlined
                :ripple="false"
              >
                {{ $t("edit_information") }}
              </v-btn>
              <v-btn
                @click="changePasswordDialog = !changePasswordDialog"
                color="primary"
                text
                :ripple="false"
              >
                {{ $t("change_password") }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <LazyDialogsTermsAndConditions :dialog.sync="dialog" />
    <LazyDialogsPersonalInfo :dialog.sync="editDialog" />
    <LazyDialogsChangePassword :dialog.sync="changePasswordDialog" />
  </main>
</template>

<script>
export default {
  name: "Settings",
  data() {
    return {
      dialog: false,
      editDialog: false,
      changePasswordDialog: false,
    };
  },
  computed: {
    listItems() {
      return [
        {
          icon: "phone",
          text: "رقم الجوال",
          key_name: "phone",
          value: this.$auth.user.phone,
        },
        {
          icon: "email",
          text: "البريد اﻹلكتروني",
          key_name: "email",
          value: this.$auth.user.email,
        },
        {
          icon: "document",
          text: "السجل التجاري",
          key_name: "commercial_image",
          value:
            this.$auth.user.commercial_image &&
            this.$auth.user.commercial_image["media"],
        },
        {
          icon: "location",
          text: "المدينه",
          key_name: "city",
          value: this.$auth.user.city.name,
        },
      ];
    },
  },
};
</script>

<style scoped>
.v-list-item__title {
  white-space: pre-line !important;
}
</style>
