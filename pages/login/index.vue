<template>
  <main class="login pb-10">
    <v-container class="fill-height">
      <v-row>
        <v-col cols="12" sm="10" class="mx-auto">
          <v-card class="login__card" min-height="500px">
            <v-card-title class="justify-center">
              <h1 class="primary--text py-10">{{ $t("login") }}</h1>
            </v-card-title>
            <v-card-text class="px-lg-16">
              <v-row>
                <v-col cols="12" lg="5">
                  <h2 class="secondary--text">{{ $t("account_type") }}</h2>
                  <v-subheader class="px-0 dark-secondary--text">
                    {{ $t("choose_account_type") }}
                  </v-subheader>
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
                        :class="[index == 1 && 'my-4']"
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
                    {{ $t(activeType, { field: "" }) }}
                  </h2>
                  <v-subheader class="px-0 dark-secondary--text">
                    {{ $t("add_your_data_to_login") }}
                  </v-subheader>
                  <LazyFormsLogin :account_type="activeType" />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12 pb-13" class="d-flex justify-center">
          <nuxt-link
            class="light-mint--text"
            :to="
              localePath({ path: '/signup', query: { type: activeAccount } })
            "
          >
            {{ $t("create_new_account", { field: $t(activeAccount) }) }}
          </nuxt-link>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script>
export default {
  name: "Login",
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
  },
};
</script>
