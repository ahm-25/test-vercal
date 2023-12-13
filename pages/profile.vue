<template>
  <main class="profile">
    <v-navigation-drawer
      :style="{
        top: lgAndUp ? '160px' : '0px',
        backgroundColor: lgAndUp ? 'transparent' : '#fff',
      }"
      v-model="drawer"
      :width="drawerWidth"
      :right="$i18n.locale === 'ar' ? true : false"
      :clipped="clipped"
      app
    >
      <v-list class="transparent px-5">
        <v-list-item
          :ripple="false"
          active-class="active-profile-item"
          v-for="(item, index) in listItems"
          :key="index"
          exact-path
          :to="localePath(item.to)"
        >
          <v-list-item-icon>
            <img :src="require(`@/assets/icons/${item.icon}`)" alt="icon" />
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action class="arrow-action d-none">
            <v-icon color="primary">mdi-arrow-left</v-icon>
          </v-list-item-action>
        </v-list-item>
        <v-list-item
          :ripple="false"
          @click="handleLogout"
          style="cursor: pointer"
        >
          <v-list-item-icon>
            <v-icon color="primary">mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t("logout") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- <v-list-item class="mt-16">
          <v-btn
            :to="localePath('/profile/cart')"
            small
            depressed
            fab
            rounded
            block
            class="mint"
          >
            <span style="font-size: 18px"> {{ $t("cart") }}</span>
          </v-btn>
        </v-list-item> -->
      </v-list>
    </v-navigation-drawer>
    <v-app-bar max-width="800px" class="mx-auto mt-10 profile__search">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <nuxt-link :to="localePath('/')">
        <img height="50px" :src="require('@/assets/images/logo.svg')"
      /></nuxt-link>
      <v-spacer />

      <!-- <v-text-field
        @focus="focused = true"
        @blur="focused = false"
        dense
        hide-details
        append-icon="mdi-magnify"
        :outlined="focused"
        rounded
        :placeholder="$t('search_on_events')"
      ></v-text-field> -->
      <!-- <v-menu
        style="top: 106px"
        max-width="300px"
        min-width="300px"
        rounded
        offset-y
        transition="slide-x-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <img
              :src="require('@/assets/icons/notification.svg')"
              alt="photo"
            />
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in items" :key="index">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu> -->
    </v-app-bar>
    <v-main class="mt-14">
      <v-container>
        <nuxt-child :nuxtChildKey="$route.fullPath" />
      </v-container>
    </v-main>
  </main>
</template>

<script>
export default {
  name: "Profile",
  layout: "profile",

  data() {
    return {
      lgAndUp: true,
      focused: false,
      items: [
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me 2" },
      ],
      clipped: false,
      drawer: true,
      miniVariant: false,
      drawerWidth: 320,
      right: true,
    };
  },
  methods: {
    handleLogout() {
      this.$auth.logout().then(() => {
        this.$router.push("/");
      });
    },
  },
  computed: {
    listItems() {
      return [
        // { title: this.$t("orders"), to: "/profile/orders", icon: "orders.svg" },
        {
          title: this.$t("reservations"),
          to: "/profile/reservations?status=upcoming",
          icon: "reservations.svg",
        },
        // {
        //   title: this.$t("fittings"),
        //   to: "/profile/fittings",
        //   icon: "products.svg",
        // },
        // {
        //   title: this.$t("suppliers"),
        //   to: "/profile/suppliers",
        //   icon: "suppliers.svg",
        // },
        // {
        //   title: this.$t("events.head_title"),
        //   to: "/profile/events",
        //   icon: "events.svg",
        // },
        {
          title: this.$t("settings"),
          to: "/profile/settings",
          icon: "settings.svg",
        },
        {
          title: this.$t("company_file"),
          to: "/profile/company",
          icon: "company.svg",
        },
      ];
    },
  },
  watch: {
    "$vuetify.breakpoint.lgAndUp": {
      handler(value) {
        this.lgAndUp = value;
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>
