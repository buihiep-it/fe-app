import axios from 'axios'
import { WebStorageKey } from '@/globals/enums'
import WebStorageService from '../web-storage.service'
import moment from 'moment'

const webStorageService = new WebStorageService()
const request = axios.create()

request.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

request.interceptors.response.use(
  (response) => {
    if (response.headers.date) {
      webStorageService.setLocalStorage(
        WebStorageKey.ServerTime,
        moment.utc(response.headers.date).add(9, 'hours').format('YYYY-MM-DD HH:mm:ss')
      )
      webStorageService.setLocalStorage(
        WebStorageKey.ClientTime,
        moment().format('YYYY-MM-DD HH:mm:ss')
      )
    }
    return response
  }, (err) => {
    return Promise.reject(err)
  }
)

export default request
