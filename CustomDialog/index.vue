<template>
  <main class="dialog">
    <v-dialog
      :value="dialog"
      persistent
      max-width="700"
      close-delay="300"
      transition="translate"
      origin="top center"
    >
      <slot />
    </v-dialog>
  </main>
</template>

<script>
export default {
  name: "CustomDialog",

  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
