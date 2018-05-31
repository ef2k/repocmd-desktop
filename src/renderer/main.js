import Vue from 'vue'
import axios from 'axios'
import moment from 'vue-moment'
import vmodal from 'vue-js-modal'

import App from './App'
import router from './router'
import { APIServer, TokenStore } from '@/services/ipc'
import { ipcRenderer } from 'electron'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

Vue.use(moment)
Vue.use(vmodal)

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

ipcRenderer.on('shortcut-settings', () => {
  router.replace('/settings')
})

/* eslint-disable no-new */
new Vue({
  components: { App },
  data () {
    return {
      initialized: false,
      token: '',
      port: ''
    }
  },
  created () {
    const token = TokenStore.getToken()
    this.token = token
    if (!token) {
      this.initialized = true
      return
    }
    APIServer.start(token)
      .then(port => {
        this.port = port
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
  template: '<App :initialized="initialized" :port="port" />'
}).$mount('#app')
