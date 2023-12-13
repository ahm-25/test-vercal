<template>
  <main class="page-title">
    <v-fab-transition v-if="showBackButton">
      <v-btn
        dark
        depressed
        large
        absolute
        class="blue-light-5 radius-8 back-button"
        height="72"
        v-bind="$attrs"
      >
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </v-fab-transition>

    <LazyFrameShapes />
    <slot />
  </main>
</template>

<script>
export default {
  name: "PageTitle",
  inheritAttrs: false,
  props: {
    showBackButton: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style>
.page-title {
  min-height: 50vh;
  background: linear-gradient(#c2e8fc, #fff);
}
</style>
