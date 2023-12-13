<template>
  <v-sheet class="mx-auto">
    <v-slide-group :show-arrows="false" center-active>
      <template>
        <v-slide-item
          v-for="(rev, index) in reviewers"
          v-slot="{ toggle }"
          elevation="0"
          class="mx-2 radius-4"
          :key="index"
        >
          <v-hover v-slot="{ hover }">
            <v-card
              class="pa-2 card-transition"
              color="#E0F4FF"
              rounded
              max-width="230px"
              elevation="0"
              @click="toggle"
              :class="{ 'on-hover': hover }"
            >
              <v-card-title class="d-flex size-12 py-0 pr-1 blue-dark-1--text">
                <span>{{ rev.name }}</span>
                <v-rating dense size="12" :value="rev.rating" readonly>
                </v-rating>
              </v-card-title>
              <v-card-text
                class="products__dialog__description pb-0 d-flex pr-1 blue-dark-1--text"
              >
                <p class="mb-0 black--text">
                  {{ rev.opinion }}
                </p>
                <span class="align-self-end">....</span>
              </v-card-text>
              <v-card-actions class="py-0 d-flex align-center">
                <v-card-subtitle
                  class="size-12 py-0 pr-0 mint-light-1--text align-self-center"
                  >{{ rev.time }}</v-card-subtitle
                >

                <v-btn
                  @click="dialog2 = true"
                  :class="{ 'show-btn': hover }"
                  color="transparent"
                  text
                  ><span class="size-12">اقرأ المزيد</span></v-btn
                >
              </v-card-actions>
            </v-card>
          </v-hover>
        </v-slide-item>
      </template>
    </v-slide-group>
  </v-sheet>
</template>

<script>
export default {
  name: "Reviewers",
  props: ["reviewers"],
};
</script>

<style scoped>
.card-transition {
  transition: background 0.2s ease-in-out !important;
}
.show-btn {
  color: #006c4f !important;
}
.card-transition:not(.on-hover) {
  background: #f4faff !important;
}
</style>
