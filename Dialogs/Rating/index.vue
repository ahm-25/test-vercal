<template>
  <v-dialog
    :value="dialog"
    @input="$emit('update:dialog')"
    max-width="700"
    close-delay="300"
    transition="translate"
    origin="top center"
  >
    <v-card max-width="700">
      <v-card-title class="justify-center primary--text">
        {{ $t("product_rating") }}
      </v-card-title>
      <v-card-text class="text-center">
        <v-rating
          color="primary"
          hover
          length="5"
          size="30"
          value="3"
          v-model="form.rating"
        ></v-rating>
        <ValidationObserver v-slot="{ handleSubmit }" ref="form">
          <v-form @submit.prevent="handleSubmit(onSubmit)" ref="form">
            <v-row>
              <v-col cols="12" class="pb-0">
                <LazyFormGroup
                  name="rating_details"
                  :rules="{
                    required: true,
                  }"
                >
                  <template #default="{ attrs }">
                    <v-text-field
                      type="text"
                      errorName="comment"
                      v-model="form.comment"
                      v-bind="attrs"
                      outlined
                      rounded
                      color="primary"
                      :placeholder="$t(`fields.rating_details`) + '...'"
                    >
                    </v-text-field>
                  </template>
                </LazyFormGroup>
              </v-col>

              <v-col cols="12" class="mx-auto d-flex justify-center">
                <v-btn
                  type="submit"
                  class="py-5 px-5"
                  rounded
                  color="primary"
                  outlined
                >
                  <span>{{ $t("post_review") }}</span>
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </ValidationObserver>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Rating",
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        rating: "",
        comment: "",
      },
    };
  },
  methods: {
    resetForm() {
      if (this.$refs.form) {
        this.$refs.form.reset();
      }
      this.form = {
        rating: "",
        comment: "",
      };
    },
    onSubmit() {},
  },
  watch: {
    dialog: {
      handler(value) {
        if (!value) {
          this.resetForm();
        }
      },
      immediate: true,
    },
  },
};
</script>

<style></style>
