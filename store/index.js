export const state = () => ({
  settings: {},
});
export const mutations = {
  SET_SETTINGS(state, payload) {
    state.settings = payload;
  },
};
export const getters = {
  settings(state) {
    return state.settings;
  },
};
export const actions = {
  async setSettings({ commit }) {
    const res = await this.$http.get({ path: "about" });
    const { data } = res.data;
    commit("SET_SETTINGS", data);
  },
};
