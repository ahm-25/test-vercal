<template>
  <v-app>

    <transition name="fade" mode="out-in">
      <Nuxt :key="$route.fullPath" />
    </transition>
  </v-app>
</template>

<script>
export default {
  name: "AuthLayout",
  middleware: "isAuth",
  head() {
    return {
      htmlAttrs: {
        dir: this.$i18n.locale == "ar" ? "rtl" : "ltr",
      },
    };
  },
};
</script>
