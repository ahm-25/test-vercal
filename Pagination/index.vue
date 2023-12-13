<template>
  <div v-if="meta.total > meta.per_page" class="text-center">
    <v-pagination
      v-model="meta.current_page"
      :length="meta.last_page"
      total-visible="10"
      circle
      @input="handelPagination"
    />
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    meta: {
      type: Object,
      default: () => ({
        current_page: "",
        last_page: "",
        total: "",
      }),
    },
  },
  data() {
    return {
      page: "",
    };
  },
  methods: {
    handelPagination(page) {
      this.$router.push(
        this.localePath({ query: { ...this.$route.query, page } })
      );
    },
  },
};
</script>
