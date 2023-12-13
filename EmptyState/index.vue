<template>
  <main class="empty-state text-center">
    <h2 class="dark-mint--text">{{ $t($attrs.title) }}</h2>
    <p v-html="$t($attrs.sub_title)" class="size-14 dark-secondary--text"></p>
    <slot />
  </main>
</template>

<script>
export default {
  name: "EmptyState",
};
</script>

<style>
.empty-state {
  margin-top: 200px;
}
</style>
