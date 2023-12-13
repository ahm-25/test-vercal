<template>
  <main class="footer">
    <v-footer class="transparent">
      <v-container>
        <v-row>
          <v-col cols="12" class="image">
            <v-img
              class="d-block mx-auto"
              :src="require('@/assets/images/logo.svg')"
              height="100px"
              width="100px"
              contain
            ></v-img>
          </v-col>
          <v-col cols="12">
            <v-row>
              <v-col cols="12" md="4" class="text-center mb-sm-3 footer__links">
                <NuxtLink to="/" class="footer__links__condition mx-3">{{
                  $t("conditions")
                }}</NuxtLink>
                <NuxtLink to="/" class="mx-3">{{ $t("contact") }}</NuxtLink>
              </v-col>
              <v-col
                cols="12"
                md="4"
                class="text-center mb-sm-3 footer__rights"
                >{{ $t("rights") }}</v-col
              >
              <v-col cols="12" md="4" class="footer__social-icon mb-sm-3">
                <v-row no-gutters>
                  <v-col
                    cols="12"
                    md="10"
                    lg="8"
                    sm="4"
                    xs="6"
                    class="mx-auto d-flex"
                  >
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      v-for="(item, index) in socialIcon"
                      :key="index"
                      :href="settings && settings[item.icon]"
                      class="mx-2"
                    >
                      <v-img
                        :src="require(`@/assets/images/${item.icon}.svg`)"
                        height="24px"
                        width="24px"
                        contain
                      ></v-img>
                    </a>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </main>
</template>

<script>
export default {
  name: "Footer",
  created() {
    this.$store.dispatch("setSettings");
  },
  computed: {
    socialIcon() {
      return [
        { icon: "instagram" },
        { icon: "facebook" },
        { icon: "youtube" },
        { icon: "twitter" },
        { icon: "linkedin" },
      ];
    },
  },
};
</script>

<style></style>
