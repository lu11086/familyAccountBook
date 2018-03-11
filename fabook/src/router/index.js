import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/page/index/index'
import accountList from '@/components/page/accountList/accountList'
import familyInfo from '@/components/page/familyInfo/familyInfo'
import userSetting from '@/components/page/userSetting/userSetting'

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
    {
      path: '/familyInfo',
      name: 'familyInfo',
      component: familyInfo
    },
    {
      path: '/userSetting',
      name: 'userSetting',
      component: userSetting
    },
    {path: '*', redirect: '/index'}
  ]
})
