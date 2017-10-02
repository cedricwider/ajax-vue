import Vue from 'vue'
import Router from 'vue-router'
import Stations from '@/components/Stations'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Homes',
      component: Stations
    },
    {
      path: '/stations',
      name: 'Stations',
      component: Stations
    }
  ]
})
