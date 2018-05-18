import Vue from 'vue'
import Router from 'vue-router'

import SettingsPage from '@/components/SettingsPage'
import ReposPage from '@/components/ReposPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index-page',
      component: SettingsPage,
      beforeEnter: (to, from, next) => {
        // const loggedIn = true
        // if (loggedIn) {
        //   return next('/repos')
        // }
        next()
      }
    },
    {
      path: '/settings',
      name: 'settings-page',
      component: SettingsPage
    },
    {
      path: '/repos',
      name: 'repos-page',
      component: ReposPage
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
