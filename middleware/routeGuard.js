export default function ({ $http, route }) {
  const meta = route.meta.reduce((acc, metaData) => {
    acc = metaData
    return acc
  }, {})
  if (meta && meta['permissions']) {
    $http.get({ path: `has_permissions/${meta['permissions']}` })
  }
}
