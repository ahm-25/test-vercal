<template>
  <main class="text-center">
    <v-col cols="12" lg="8" class="mx-auto">
      <h2 class="primary--text text-center mb-5">{{ $t("confirmed_otp") }}</h2>
      <p class="dark-secondary--text" style="line-height: 1.5">
        {{ accountType[user_type] }}
      </p>
      <v-btn
        @click="handleClick"
        class="px-5"
        rounded
        large
        color="primary"
        :outlined="user_type !== 'company'"
      >
        <template v-if="user_type === 'company'">
          {{ $t("profile_personal") }}
        </template>
        <template v-else>
          {{ $t("close") }}
        </template>
      </v-btn>
    </v-col>
  </main>
</template>

<script>
export default {
  name: "SecondStep",
  props: {
    user_type: {
      type: String,
      default: "company",
    },
  },
  computed: {
    accountType() {
      return {
        company: this.$t("thank_you_for_subscription"),
        supplier: this.$t("thank_for_your_interest"),
        organizer: this.$t("thank_for_your_interest"),
      };
    },
  },
  methods: {
    handleClick() {
      this.$router.push(this.localePath("/login"));
    },
  },
};
</script>
