<template>
  <v-row>
    <v-col cols="12" sm="2" class="mx-sm-auto mx-md-auto">
      <v-text-field
        dense
        outlined
        v-model="product[fieldName]"
        background-color="#ffffff"
        style="border: 1px solid #ddf7e8"
        color="blue-light-3"
        hide-details
        readonly
        class="radius-10 center-input"
      >
        <template #prepend-inner>
          <v-icon
            color="primary"
            v-if="product[fieldName] != 0"
            @click="product[fieldName] -= 1"
            >mdi-arrow-down-thin</v-icon
          >
          <v-icon v-else color="mint">mdi-arrow-down-thin</v-icon>
        </template>
        <template #append>
          <v-icon color="primary" @click="product[fieldName] += 1"
            >mdi-arrow-up-thin</v-icon
          >
        </template>
      </v-text-field>
    </v-col>
    <v-col cols="12" sm="10" class="text-center text-sm-end">
      <v-btn
        depressed
        large
        @click="handleAddToCart"
        :loading="loading"
        color="primary"
        class="white--text"
        rounded
        >شراء ({{ product.price }} ر.س.)</v-btn
      >
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Quantity",
  props: {
    product: {
      type: Object,
      default: () => {},
    },
    fieldName: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    handleAddToCart() {
      if (this.$auth.loggedIn) {
        this.loading = true;
        this.$http
          .post({
            path: "carts",
            data: {
              product_id: this.product.id,
              qty: this.product.available_qty,
            },
          })
          .then(() => {
            this.$router.push(this.localePath("/profile/cart"));
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        this.$router.push(this.localePath("/login"));
      }
    },
  },
};
</script>
