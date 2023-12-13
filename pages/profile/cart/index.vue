<template>
  <main class="cart">
    <v-container>
      <v-row>
        <v-col md="10">
          <CardCart />
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script>
import CardCart from "@/components/Cards/Cart";
export default {
  name: "Cart",
  components: {
    CardCart,
  },
};
</script>

<style></style>
