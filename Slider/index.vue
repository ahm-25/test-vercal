<template>
  <v-card flat class="transparent">
    <v-card-actions class="justify-space-between">
      <v-btn icon @click="$emit('on-next')" :ripple="false">
        <img :src="require('@/assets/icons/arrow_right.svg')" alt="photo" />
      </v-btn>
      <v-item-group
        v-model="onboarding"
        class="text-center indicators d-flex"
        mandatory
      >
        <v-item v-for="(item, index) in items" :key="index" v-slot="{ active }">
          <span
            class="bolt mx-1"
            :class="active && 'active'"
            @click="$emit('on-active', index)"
          ></span>
        </v-item>
      </v-item-group>
      <v-btn icon @click="$emit('on-prev')" :ripple="false">
        <img :src="require('@/assets/icons/arrow_left.svg')" alt="photo" />
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    onboarding: {
      type: Number,
      default: 0,
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss">
.indicators {
  overflow-x: auto;
  overflow: hidden;
}
</style>
