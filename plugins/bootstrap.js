import Vue from "vue";

Vue.directive("hover", {
  bind(el) {
    el.style.boxShadow = "none";
    el.addEventListener("mouseenter", () => {
      el.classList.add("card-shadow");
    });
    el.addEventListener("mouseleave", () => {
      el.classList.remove("card-shadow");
    });
  },
});
Vue.prototype.$eventBus = new Vue();
