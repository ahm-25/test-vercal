<template>
  <v-dialog
    :value="dialog"
    @input="$emit('update:dialog')"
    max-width="1000"
    close-delay="300"
    transition="translate"
    origin="top center"
    scrollable
  >
    <v-card max-width="1000" class="pa-6">
      <v-card-title>
        <span class="dark-blue--text">{{ $t("terms_and_conditions") }}</span>
        <v-spacer></v-spacer>
        <v-btn icon @click="$emit('update:dialog')">
          <v-icon color="secondary">mdi-close-circle-outline</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <div class="dark-mint--text size-14" v-html="policy"></div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "TermsAndConditions",
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      policy: "",
    };
  },
  created() {
    this.getTerms();
  },
  methods: {
    async getTerms() {
      const res = await this.$http.get({ path: "policies" });
      const {
        data: { policy },
      } = res.data;
      this.policy = policy;
    },
  },
};
</script>
