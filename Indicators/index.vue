<template>
  <div class="indicator">
    <span
      v-for="(item, index) in items"
      :key="index"
      :class="index == step && 'active'"
      @click="onPaginate(index)"
    ></span>
  </div>
</template>

<script>
export default {
  name: "Indicator",
  props: {
    items: {
      type: Number,
      default: 0,
    },
    activeIndex: {
      type: Number,
      default: 0,
    },
    needValidation: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      step: 0,
    };
  },
  methods: {
    onPaginate(index) {
      this.$emit("on-click", index);
      if (!this.needValidation) {
        this.step = index;
      }
    },
  },
  watch: {
    activeIndex: {
      handler(value) {
        this.step = value;
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss">
.indicator {
  display: flex;
  justify-content: center;
  span {
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: #b3ccbf;
    border-radius: 50%;
    margin: 0 3px;
    transition: all 0.3s ease;
    cursor: pointer;
  }
  .active {
    background-color: #006c4f;
    width: 16px;
    border-radius: 4px;
  }
}
</style>
