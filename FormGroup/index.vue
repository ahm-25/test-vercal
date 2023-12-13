<template>
  <ValidationProvider
    ref="ValidationProvider_ref"
    v-slot="{ errors }"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot
      :attrs="{
        'error-messages':
          (serverErrors && serverErrors[$attrs.errorName]) || errors,
      }"
    />
  </ValidationProvider>
</template>

<script>
export default {
  name: "FormGroup",
  inheritAttrs: false,
  methods: {
    validateField(callbackFunction) {
      this.$refs.ValidationProvider_ref.validate().then(({ valid }) => {
        if (valid) {
          callbackFunction();
        }
      });
    },
  },
};
</script>
