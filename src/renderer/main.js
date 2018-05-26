import Vue from 'vue'
import axios from 'axios'
import moment from 'vue-moment'

import App from './App'
import router from './router'
import { APIServer, TokenStore } from '@/services/ipc'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

Vue.use(moment)
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  data () {
    return {
      initialized: false,
      token: ''
    }
  },
  async created () {
    const token = TokenStore.getToken()
    this.token = token
    if (!token) {
      this.initialized = true
      return
    }
    APIServer.start(token)
      .then(resp => {
        this.initialized = true
      })
  },
  router: (() => {
    let promise = new Promise(resolve => {
      router.start = resolve
    })

    router.beforeEach(async (to, from, next) => {
      await promise
      next()
    })

    return router
  })(),
  watch: {
    initialized () {
      this.$router.start()
      if (this.token) {
        router.replace('/repos')
      } else {
        router.replace('/settings')
      }
    }
  },
  template: '<App :initialized="initialized"/>'
}).$mount('#app')
