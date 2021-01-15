import { post as opost }  from '@/services/https/oapi-http.service'
import { post, put, get }  from '@/services/https/oapi-http.service'
import WebStorageService from '@/services/web-storage.service'
import { WebStorageKey } from '@/globals/enums'
import store from '@/store'
import moment from 'moment'

const webStorageService = new WebStorageService()

export default class AuthService {
    login (params = {}) {
        return opost('auth/access_token', params, false)
            .then(
                (res) => {
                    webStorageService.setLocalStorage(WebStorageKey.Token, res)
                    return res
                }
            )
    }

    logout () {
        return post('logout').then(
            (res) => {
                webStorageService.clearSessionStorage()
                webStorageService.clearLocalStorage()
                location.reload()
                return res
            }
        )
        .catch(function (error) {
            console.log(error)
        })
    }

    getProfile (params = {}) {
        return get('profile', params).then(
            (res) => {
                res.dayOfBirth = this.formatDate(res.dayOfBirth)
                store.dispatch('profiles/changeProfileData', res)
                return res
            }
        ).catch(function (error) {
            throw error
        })
    }

    putEditProfile (params = {}) {
        return put('profile', params)
    }

    formatDate (val, formatInput = 'YYYYMMDD', formatOutput = 'YYYY-MM-DD') {
        return moment(val, formatInput).format(formatOutput)
    }
}



