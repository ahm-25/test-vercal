import Vue from "vue";
export default ({
  store,
  app: { $axios, i18n, $auth, router, localePath },
}) => {
  $axios.onResponse((response) => {
    if (store.getters["errors/serverErrors"] !== null) {
      store.dispatch("errors/ClearServerErrors");
    }
    const { method } = response.config;

    if (method === "post" || method === "put" || method === "delete") {
      Vue.toasted.success(response.data.message);
    }

    return response;
  });
  $axios.onRequest((config) => {
    config.headers.common["Accept-Language"] = i18n.locale;
    return config;
  });

  $axios.onError((err) => {
    if (err.response && err.response.status === 403) {
      router.push(localePath("/"));
      // Vue.toasted.error(err.response.data.message)

      // $auth.logout()
    }
    if (err.response && err.response.status === 401) {
      Vue.toasted.error(err.response.data.message);
      // $auth.logout()
    }

    if (
      err.response &&
      err.response.status === 422 &&
      err.response.data.message
    ) {
      Vue.toasted.error(err.response.data.message);
      // $auth.logout()
    }

    if (err.response && err.response.data && err.response.data.errors) {
      store.dispatch("errors/SetServerErrors", err.response.data.errors);
    }
  });
};
