import Vue from 'vue'
import Router from 'vue-router'
// 首页
import index from '@/components/page/index/index'
// 收支列表页
import accountList from '@/components/page/accountList/accountList'
// 家庭圈页
import familyInfo from '@/components/page/familyInfo/familyInfo'
// 用户设置页
import userSetting from '@/components/page/userSetting/userSetting'
import userRegister from '@/components/page/userSetting/children/userRegister'
import userLogin from '@/components/page/userSetting/children/userLogin'

Router.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}
// 二级路由返回方法-防止互相影响
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
