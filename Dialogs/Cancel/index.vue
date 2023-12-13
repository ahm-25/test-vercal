<template>
  <v-dialog
    :value="dialog"
    @input="$emit('update:dialog')"
    max-width="500"
    close-delay="300"
    transition="translate"
    origin="top center"
  >
    <v-card max-width="500" class="pa-6">
      <v-spacer></v-spacer>
      <v-btn icon @click="$emit('update:dialog')">
        <v-icon color="secondary">mdi-close-circle-outline</v-icon>
      </v-btn>
      <v-card-title class="justify-center secondary--text">
        <slot name="title"></slot>
      </v-card-title>
      <v-card-subtitle
        class="d-flex pt-3 justify-center dark-secondary--text size-12"
      >
        <slot name="subtitle"></slot>
      </v-card-subtitle>
      <v-card-text class="text-center">
        <v-btn @click="$emit('on-cancel')" text block>
          <span class="error--text"> <slot name="actions"></slot></span>
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "CancelDialog",
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
