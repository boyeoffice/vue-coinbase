import Vue from 'vue'
import App from './App'
import './assets/app.css'
import Vue2Filters from 'vue2-filters'
Vue.use(Vue2Filters)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
