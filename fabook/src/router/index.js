import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/page/index/index'
import accountList from '@/components/page/accountList/accountList'
import familyInfo from '@/components/page/familyInfo/familyInfo'
import userSetting from '@/components/page/userSetting/userSetting'
import userRegister from '@/components/page/userSetting/children/userRegister'
import userLogin from '@/components/page/userSetting/children/userLogin'

Router.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}

Router.prototype.goBackSec = function () {
  this.isBackSec = true
  window.history.go(-1)
}

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
      component: userSetting,
      children: [
        {
          path: 'userLogin',
          name: 'userLogin',
          component: userLogin,
          children: [
            {
              path: 'userRegister',
              name: 'userRegister',
              component: userRegister
            }
          ]
        }
      ]
    },

    {path: '*', redirect: '/index'}
  ]
})
