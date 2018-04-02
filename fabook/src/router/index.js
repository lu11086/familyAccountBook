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
import familyRedLine from '@/components/page/familyInfo/children/redLine'
import moreInterface from '@/components/page/familyInfo/children/interface'
import otherPlan from '@/components/page/familyInfo/children/otherPlan'
// 用户设置页
import userSetting from '@/components/page/userSetting/userSetting'
import userRegister from '@/components/page/userSetting/children/userRegister'
import userLogin from '@/components/page/userSetting/children/userLogin'
import userRedLine from '@/components/page/userSetting/children/redLine'
import fixedCtrl from '@/components/page/userSetting/children/fixedCtrl'
import appSetting from '@/components/page/userSetting/children/appSetting'
import userInfo from '@/components/page/userSetting/children/userInfo'
import forgetPwd from '@/components/page/userSetting/children/forgetPwd'

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
        },
        {
          path: 'redLine',
          name: 'familyRedLine',
          component: familyRedLine
        },
        {
          path: 'otherPlan',
          name: 'otherPlan',
          component: otherPlan
        },
        {
          path: 'interface',
          name: 'interface',
          component: moreInterface
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
            },
            {
              path: 'forget',
              name: 'forgetPwd',
              component: forgetPwd
            }
          ]
        },
        {
          path: 'userInfo',
          name: 'userInfo',
          component: userInfo
        },
        {
          path: 'redLine',
          name: 'userRedLine',
          component: userRedLine
        },
        {
          path: 'fixedCtrl',
          name: 'fixedCtrl',
          component: fixedCtrl
        },
        {
          path: 'appSetting',
          name: 'appSetting',
          component: appSetting
        }
      ]
    },

    {path: '*', redirect: '/index'}
  ]
})
