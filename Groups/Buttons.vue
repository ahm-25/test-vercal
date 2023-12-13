<template>
  <div>
    <v-btn
      large
      depressed
      rounded
      outlined
      color="primary"
      class="mx-2"
      v-for="({ text, ...props }, index) in items"
      exact-active-class="active-button-group"
      :key="index"
      v-bind="props"
    >
      <span> {{ text }}</span>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "ButtonGroups",
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      active_button: "",
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/_variables.scss";
.active-button-group {
  background: $mint !important;
  border: 0 !important;
  span {
    color: $dark-green !important;
  }
}
.v-btn:before {
  background-color: transparent !important;
}
</style>
