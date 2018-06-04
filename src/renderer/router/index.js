import Vue from 'vue'
import Router from 'vue-router'

import NotFound from '@/components/NotFound'
import SettingsPage from '@/components/SettingsPage'
import ReposPage from '@/components/ReposPage'
import SelectionPage from '@/components/ReposPage/SelectionPage'
import FeedPage from '@/components/ReposPage/FeedPage'

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
      component: ReposPage,
      children: [
        {
          name: 'feed',
          path: 'feed/:owner/:name',
          component: FeedPage
        },
        {
          name: 'selection',
          path: 'selection',
          component: SelectionPage
        }
      ]
    },
    {
      path: '/404',
      component: NotFound
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})

export default router
