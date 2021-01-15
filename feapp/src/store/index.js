import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

// import the auto exporter
import dialog from '@/store/modules/dialog'
import profiles from '@/store/modules/profiles'
import covid from '@/store/modules/covid'
import covidCase from '@/store/modules/covidCase'


Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    dialog,
    profiles,
    covid,
    covidCase
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
