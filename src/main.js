import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import jQuery from 'jquery'
import Axios from 'axios'
import router from './components/extra/router'
import AxiosConfig from './components/extra/axios'
import 'bootstrap'
import './assets/style.scss'
window.$ = window.jQuery = jQuery

Vue.prototype.$axios = Axios.create(AxiosConfig)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
