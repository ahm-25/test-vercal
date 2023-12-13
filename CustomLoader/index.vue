<template>
  <div class="custom-loader">
    <v-progress-circular
      indeterminate
      size="50"
      class="d-flex justify-center mx-auto"
      color="primary"
    ></v-progress-circular>
  </div>
</template>

<script>
export default {};
</script>

<style>
.custom-loader {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 900000000000;

  background: #fff;
}
</style>
