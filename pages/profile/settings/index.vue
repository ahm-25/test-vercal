<template>
  <main class="profile-settings">
    <v-container>
      <v-row>
        <v-col cols="12" class="text-center">
          <h1 class="dark-mint--text">{{ $t("settings") }}</h1>
          <p class="dark-secondary--text pt-2">{{ $t("setting_sub_title") }}</p>
        </v-col>
        <v-col cols="12">
          <v-card
            v-hover
            class="radius-8 pa-5 align-center justify-space-between"
            min-height="120px"
          >
            <v-list class="transparent">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    <span class="dark-mint--text">{{
                      $t("terms_and_conditions")
                    }}</span>
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-btn
                    @click="dialog = !dialog"
                    color="primary "
                    rounded
                    large
                    outlined
                  >
                    {{ $t("view_terms_conditions") }}
                  </v-btn>
                </v-list-item-icon>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card
            v-hover
            class="radius-8 pa-5 align-center justify-space-between"
            min-height="120px"
          >
            <v-list class="transparent">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    <span class="dark-mint--text">{{
                      $t("you_face_problem_contact_with_support")
                    }}</span>
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-btn
                    color="primary "
                    rounded
                    large
                    outlined
                    :to="localePath('/contact-us')"
                  >
                    {{ $t("contact_with_us") }}
                  </v-btn>
                </v-list-item-icon>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <LazyDialogsTermsAndConditions :dialog.sync="dialog" />
  </main>
</template>

<script>
export default {
  name: "Settings",
  data() {
    return {
      dialog: false,
    };
  },
};
</script>

<style scoped>
.v-list-item__title {
  white-space: pre-line !important;
}
</style>
