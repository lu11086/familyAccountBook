import Vue from 'vue'
import Router from 'vue-router'
// 首页
import index from '@/components/page/index/index'
import createFamily from '@/components/page/index/children/createFamily'
// 收支列表页
import accountList from '@/components/page/accountList/accountList'
import accountDetail from '@/components/page/accountList/children/accountDetail'
// 家庭圈页
import familyInfo from '@/components/page/familyInfo/familyInfo'
import dataContrast from '@/components/page/familyInfo/children/dataContrast'
import familyCtrl from '@/components/page/familyInfo/children/familyCtrl'
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
      component: index,
      children: [
        {
          path: 'createFamily',
          name: 'createFamily',
          component: createFamily
        }
      ]
    },
    {
      path: '/accountList',
      name: 'accountList',
      component: accountList,
      children: [
        {
          path: 'detail',
          name: 'accountDetail',
          component: accountDetail
        }
      ]
    },
    {
      path: '/familyInfo',
      name: 'familyInfo',
      component: familyInfo,
      children: [
        {
          path: 'familyCtrl',
          name: 'familyCtrl',
          component: familyCtrl
        },
        {
          path: 'contrast/:type',
          name: 'dataContrast',
          component: dataContrast
        }
      ]
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
