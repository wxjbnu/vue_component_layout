import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import home from '@/views/home'
import cda from '@/views/cda'
import layout from '@/views/layout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/cda',
      name: 'cda',
      component: cda
    },
    {
      path: '/layout/:id',
      name: 'layout',
      component: layout
    },
  ]
})
