import store from '@/store'
import { get } from '@/services/https/oapi-http.service'

export default class CovidService {
    getCovidSummary (params = {}) {
        store.dispatch('covid/changeCovidData', { loading: true })
        return get('summary', params).then(
            (res) => {
                store.dispatch('covid/changeCovidData', res)
                return res
            }
        ).catch(function (error) {
            store.dispatch('covid/changeCovidData', { loading: false })
            throw error
        })
    }

    // https://api.covid19api.com/country/south-africa/status/confirmed
    // total/country/south-africa/status/confirmed?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z
    getCovidByCountry ( nameID, params = {}) {
        store.dispatch('covidCase/changeCovidCaseData', { loading: true })
        return get('country/' + nameID, params).then(
            (res) => {
                store.dispatch('covidCase/changeCovidCaseData', res)
                return res
            }
        ).catch(function (error) {
            store.dispatch('covidCase/changeCovidCaseData', { loading: false })
            throw error
        })
    }

}