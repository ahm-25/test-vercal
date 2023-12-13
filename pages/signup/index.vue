<template>
  <main class="login bg-white">
    <v-container class="fill-height">
      <v-row>
        <v-col cols="12" lg="10" class="mx-auto">
          <v-card flat class="login__card transparent" min-height="500px">
            <v-card-title class="justify-center">
              <h1 class="primary--text py-10">
                {{ $t("subscription") }}
                {{ $t($route.query.type ? $route.query.type : activeAccount) }}
              </h1>
            </v-card-title>
            <v-card-text class="px-lg-16">
              <v-row>
                <v-col cols="12" lg="5">
                  <h2 class="secondary--text">
                    {{ $t("subscription_feature") }}
                  </h2>
                  <v-list class="pa-0">
                    <v-list-item
                      class="pa-0"
                      v-for="(feature, index) in features"
                      :key="index"
                    >
                      <v-list-item-icon class="mx-2">
                        <v-icon>mdi-check</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content class="py-0">
                        <v-list-item-title
                          style="
                            overflow: initial;
                            white-space: pre-wrap;
                            line-height: 2;
                          "
                          >{{ feature }}</v-list-item-title
                        >
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                  <v-list class="transparent">
                    <v-list-item-group
                      mandatory
                      v-model="selected_type"
                      active-class="active-item"
                    >
                      <v-list-item
                        :ripple="false"
                        class="login__card__item"
                        v-for="(item, index) in items"
                        :key="index"
                        :value="item.key"
                        :class="[index == 1 && 'my-2']"
                      >
                        <v-list-item-content>
                          <v-list-item-title>
                            {{ $t(item.title, { field: $t("accounts") }) }}
                          </v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-icon>
                          <v-icon>mdi-arrow-left-thin</v-icon>
                        </v-list-item-icon>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                  <nuxt-link
                    text
                    class="primary--text"
                    :to="localePath('/login')"
                  >
                    {{ $t("you_already_have_account") }}
                  </nuxt-link>
                </v-col>

                <v-col
                  cols="12"
                  lg="1"
                  class="text-center mx-auto hidden-md-and-down"
                >
                  <v-divider vertical />
                </v-col>
                <v-col cols="12" lg="6">
                  <h2 class="secondary--text">
                    {{ $t("Subscription data") }}
                  </h2>
                  <v-subheader class="px-0 dark-secondary--text">
                    {{ $t("complete_form") }}
                  </v-subheader>
                  <LazyFormsSignup
                    :account_type="activeType"
                    :user_type="activeAccount"
                  />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script>
export default {
  name: "Signup",
  layout: "auth",
  data() {
    return {
      selected_type: 0,
    };
  },
  computed: {
    activeType() {
      return this.items[this.selected_type]["type"];
    },
    activeAccount() {
      return this.items[this.selected_type]["active_key"];
    },
    items() {
      return [
        {
          title: "company_account",
          type: "company_account",
          active_key: "company",
        },
        {
          title: "supplier_account",
          type: "supplier_account",
          active_key: "supplier",
        },
        {
          title: "organizers_account",
          type: "organizers_account",
          active_key: "organizer",
        },
      ];
    },
    features() {
      return [
        this.$t("first_feature"),
        this.$t("sdcond_feature"),
        this.$t("third_feature"),
      ];
    },
  },
  watch: {
    $route: {
      handler({ query }) {
        if (query.type) {
          this.selected_type = this.items
            .map((item) => item.active_key)
            .indexOf(query.type || "company");
        }
      },
      immediate: true,
    },
  },
};
</script>
