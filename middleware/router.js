export default function ({ store }) {
  const queries = store.getters['query/getQuery']
  store.commit('tables/RESET_TABLE_ITEMS')
  if (Object.keys(queries).length > 0) {
    store.commit('query/REMOVE_QUERY')
  }
}
