import axios from 'axios'

const webStorageService = new WebStorageService()
const request = axios.create()

request.interceptors.request.use(function (config) {
  const token = webStorageService.getSessionStorage(WebStorageKey.Token)
  if (token) {
    config.headers.Authorization = 'Bearer ' + token.idToken
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

request.interceptors.response.use(
  (response) => {
    return response
  }, (err) => {
    return Promise.reject(err)
  }
)

export default request
