<template>
  <main class="dialog">
    <LazyCustomDialog :dialog.sync="dialog">
      <v-card max-width="700" class="pa-5">
        <v-spacer></v-spacer>
        <v-btn icon @click="$emit('update:dialog')">
          <v-icon color="secondary">mdi-close-circle-outline</v-icon>
        </v-btn>
        <transition name="false" mode="out-in">
          <template v-if="activeIndex === 0">
            <v-card-title class="d-flex justify-center pt-5">
              <span class="secondary--text">
                {{ stepContent[activeIndex]["title"] }}</span
              >
            </v-card-title>
            <v-card-subtitle class="pt-2">
              <div
                class="text-center secondary--text"
                v-html="stepContent[activeIndex]['sub_title']"
              ></div>
            </v-card-subtitle>
          </template>
        </transition>
        <v-card-text>
          <div class="mt-5">
            <transition name="fade" mode="out-in">
              <component
                :token="token"
                :is="stepComponents[activeIndex]"
                :user_type="user_type"
                :dialog="dialog"
                @on-next="onNext"
                @close-dialog="$emit('update:dialog')"
              />
            </transition>
          </div>
        </v-card-text>
      </v-card>
    </LazyCustomDialog>
  </main>
</template>

<script>
import FirstStep from "./FirstStep.vue";
import SecondStep from "./SecondStep.vue";

export default {
  name: "VerifySignup",

  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    user_type: {
      type: String,
      default: "company",
    },
    token: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      activeIndex: 0,
      stepComponents: [FirstStep, SecondStep],
    };
  },
  methods: {
    onNext() {
      if (this.activeIndex < this.stepComponents.length - 1) {
        this.activeIndex++;
      }
    },
  },
  computed: {
    stepContent() {
      return {
        0: {
          title: this.$t("fields.otp_code"),
          sub_title: this.$t("sent_code_with"),
        },
        1: {
          title: this.$t("add_new_password"),
          sub_title: this.$t("confirmed_account"),
        },
      };
    },
  },
  watch: {
    dialog: {
      handler(value) {
        if (!value) {
          this.activeIndex = 0;
        }
      },
      immediate: true,
    },
  },
};
</script>
