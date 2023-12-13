<template>
  <main>
    <v-container class="p-5">
      <v-row>
        <v-col cols="12" lg="6">
          <h2 class="primary--text mb-2">
            {{ service.name }}
          </h2>
          <div class="dark-secondary--text" v-html="service.desc"></div>
          <v-row class="pt-4">
            <v-col cols="12" sm="6" lg="3">
              <v-btn
                :to="localePath('/events')"
                color="primary"
                block
                large
                outlined
                class="rounded-xl"
              >
                {{ $t("event_view") }}
                {{ $t(service.service_type) }}
              </v-btn>
            </v-col>
            <v-col cols="12" sm="6" lg="3">
              <v-btn
                :to="localePath('/login')"
                color="primary"
                block
                text
                class="rounded-xl"
              >
                {{ $t("signup_as_organizer") }}
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" lg="6" class="text-center">
          <v-img
            contain
            :aspect-ratio="16 / 8"
            :src="service.image && service.image['media']"
          />
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script>
export default {
  name: "ServiceCard",
  props: {
    service: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
<style lang="scss">
.v-image__image--cover {
  border-radius: 8px !important;
}
</style>
