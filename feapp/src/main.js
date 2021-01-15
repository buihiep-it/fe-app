import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import router from '@/router'
import VModal from 'vue-js-modal'
import { ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import Highcharts from 'highcharts'
import HighchartsVue from 'highcharts-vue'
import underscore from 'vue-underscore'
import '@/directives/validations'
import '@/assets/scss/styles.scss'
import 'vue-js-modal/dist/styles.css'
import store from '@/store'

const customMode = ({ errors }) => {
  if (errors.length) {
    return {
      on: ['input', 'change']
    }
  }
  return {
    on: ['change', 'blur', 'keyup']
  }
}

Highcharts.setOptions({
  chart: {
    backgroundColor: 'transparent',
    style: {
      fontFamily: "TBUDGoStd, 'tbudgothic-std', sans-serif",
      color: '#191919',
      fontSize: '12px'
    }
  },
  tooltip: {
    backgroundColor: 'rgba(255,255,255,1)'
  }
})

setInteractionMode('eager', customMode)

Vue.config.productionTip = false

Vue.use(VModal, { dynamic: true, injectModalsContainer: true })
Vue.use(underscore)
Vue.use(HighchartsVue)

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
