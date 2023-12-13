<template>
  <main class="dialog">
    <LazyCustomDialog :dialog.sync="dialog">
      <v-card max-width="700" class="pa-5">
        <v-spacer></v-spacer>
        <v-btn icon @click="$emit('update:dialog')">
          <v-icon color="secondary">mdi-close-circle-outline</v-icon>
        </v-btn>
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
        <v-card-text>
          <LazyIndicators
            :items="stepComponents.length"
            :activeIndex="activeIndex"
            :needValidation="true"
          />
          <div class="mt-5">
            <transition name="fade" mode="out-in">
              <component
                :is="stepComponents[activeIndex]"
                :fieldType="fieldType"
                :dialog="dialog"
                :sharedData="sharedData"
                @on-next="onNext"
                @on-success="$emit('update:dialog')"
              />
            </transition>
          </div>
        </v-card-text>
      </v-card>
    </LazyCustomDialog>
  </main>
</template>

<script>
import FirstStepVue from "@/components/Forms/ResetPassword/FirstStep.vue";
import LastStepVue from "@/components/Forms/ResetPassword/LastStep.vue";
import SecondStepVue from "@/components/Forms/ResetPassword/SecondStep.vue";

export default {
  name: "ForgetPasswordDialog",

  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    fieldType: {
      type: String,
      default: "phone",
    },
  },
  data() {
    return {
      sharedData: {},
      activeIndex: 0,
      stepComponents: [FirstStepVue, SecondStepVue, LastStepVue],
    };
  },
  methods: {
    onNext(data) {
      console.log(data);
      this.sharedData = data;
      if (this.activeIndex < this.stepComponents.length - 1) {
        this.activeIndex++;
      }
    },
  },
  computed: {
    stepContent() {
      return {
        0: {
          title: this.$t("reset_password"),
          sub_title: this.$t("to_start_the_process", {
            field: this.$t(`fields.${this.fieldType}`),
          }),
        },
        1: {
          title: this.$t("fields.otp_code"),
          sub_title: this.$t("sent_code_with"),
        },
        2: {
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
