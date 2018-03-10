import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/page/index/index'
import accountList from '@/components/page/accountList/accountList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'home',
      component: index
    },
    {
      path: '/accountList',
      name: 'accountList',
      component: accountList
    },
    {path: '*', redirect: '/index'}
  ]
})
