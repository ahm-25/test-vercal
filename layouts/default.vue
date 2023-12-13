<template>
  <v-app>

    <transition name="fade" mode="out-in">
      <LazyCustomLoader v-if="loading" />
      <Nuxt :key="$route.fullPath" v-else />
    </transition>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      loading: true,
    };
  },
  head() {
    return {
      htmlAttrs: {
        dir: this.$i18n.locale == "ar" ? "rtl" : "ltr",
      },
    };
  },

  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    });
  },
};
</script>
