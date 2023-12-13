export default function ({ $axios }, inject) {
  class HttpClient {
    get({ path, query, param = '' }) {
      return $axios.get(`${path}${param && '/' + param}`, {
        params: { ...query },
      })
    }

    post({ path, data }) {
      return $axios.post(path, data)
    }
  }
  // Inject to context as $http
  inject('http', new HttpClient())
}
