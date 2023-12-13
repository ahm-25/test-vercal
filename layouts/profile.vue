<template>
  <v-app style="background-color: #fafcff">
    <transition name="fade" mode="out-in">
      <Nuxt :key="$route.fullPath" />
    </transition>
  </v-app>
</template>

<script>
export default {
  name: "ProfileLayout",
  middleware: "isGuest",
  head() {
    return {
      htmlAttrs: {
        dir: this.$i18n.locale == "ar" ? "rtl" : "ltr",
      },
    };
  },
};
</script>
