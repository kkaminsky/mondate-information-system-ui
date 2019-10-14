import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import Axios from "axios"
import 'vue-material-design-icons/styles.css'

Vue.config.productionTip = false

Vue.prototype.$http = Axios

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
