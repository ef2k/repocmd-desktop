import Vue from 'vue'
import Router from 'vue-router'

import SettingsPage from '@/components/SettingsPage'
import ReposPage from '@/components/ReposPage'

Vue.use(Router)

const router = new Router({
  props: ['token'],
  routes: [
    {
      path: '/',
      name: 'index-page',
      component: SettingsPage
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

export default router
