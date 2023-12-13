import Vue from "vue";
import { mapGetters } from "vuex";

// Make sure to pick a unique name for the flag
// so it won't conflict with any other mixin.
if (!Vue.__my_mixin__) {
  Vue.__my_mixin__ = true;
  Vue.mixin({
    computed: {
      ...mapGetters({
        getQuery: "query/getQuery",
        serverErrors: "errors/serverErrors",
        settings: "settings",
      }),
    },
    data() {
      return {
        timeStamp: null,
      };
    },
    methods: {
      checkQuery(query, fn) {
        if (Object.keys(query).length > 0) {
          fn();
        }
      },
      handleDebounce(callback) {
        if (this.timeStamp) {
          clearTimeout(this.timeStamp);
        }
        this.timeStamp = setTimeout(() => {
          callback();
        }, 500);
      },
    },
  }); // Set up your mixin then
}
