export const state = () => ({
  query: {},
})

export const mutations = {
  SET_QUERY(state, query) {
    state.query = { ...query }
  },
  REMOVE_QUERY(state, payload = {}) {
    state.query = payload
  },
}

export const actions = {
  removeQuery({ commit }, payload) {
    commit('REMOVE_QUERY', payload)
  },
  setQuery({ commit }, payload) {
    commit('SET_QUERY', payload)
  },
}
export const getters = {
  getQuery(state) {
    return state.query
  },
}
