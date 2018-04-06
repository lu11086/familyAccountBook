<template>
  <div class="pageContent">
    <transition :name="transitionName">
      <router-view class="Router"></router-view>
    </transition>
    <com-head :menuType="headType"></com-head>
    <ul class="settingArea">
      <li class="userInfo clearfix" @click="userLogin()">
        <img src="@/assets/userDefault.png" alt="用户头像" class="fl" v-show="!memeryData.isLogin">
        <img :src="userHeadImg[memeryData.userInfo.userHeaderIndex]" alt="用户头像" class="fl" v-show="memeryData.isLogin">
        <div class="userTab fl" >
          <p class="userName" v-text="memeryData.userInfo.username"></p>
          <p class="userRemark" v-text="memeryData.userInfo.userRemark"></p>
        </div>
        <i class="iconfont fabook-bianji fr" @click="toEditUserInfo()" v-show="memeryData.isLogin"></i>
      </li>
      <li class="blank"></li>
      <li class="lineTab" @click="tofixedCtrl">
        固定收支
        <i class="iconfont fabook-iconfontjiantou4 fr"></i>
      </li>
      <li class="lineTab" @click="toRedLine">
        消费红线
        <i class="iconfont fabook-iconfontjiantou4 fr"></i>
      </li>
      <li class="lineTab" @click="toAppSetting">
        软件设置
        <i class="iconfont fabook-iconfontjiantou4 fr"></i>
      </li>
    </ul>
    <com-foot :footerTab="4"></com-foot>
  </div>
</template>

<script>
import comHead from '@/components/common/comHead/commonHead'
import comFoot from '@/components/common/comFoot/commonFoot'
const headerImg1 = require('@/assets/userHeader1.png')
const headerImg2 = require('@/assets/userHeader2.png')
const headerImg3 = require('@/assets/userHeader3.png')
const headerImg4 = require('@/assets/userHeader4.png')
const headerImg5 = require('@/assets/userHeader5.png')
const headerImg6 = require('@/assets/userHeader6.png')
const headerImg7 = require('@/assets/userHeader7.png')
const headerImg8 = require('@/assets/userHeader8.png')
const headerImg9 = require('@/assets/userHeader9.png')
const headerImg10 = require('@/assets/userHeader10.png')
const headerImg11 = require('@/assets/userHeader11.png')
const headerImg12 = require('@/assets/userHeader12.png')
export default {
  data () {
    return {
      headType: {
        title: ['用户设置'],
        lTitleType: 0,
        rButtonType: 0
      },
      transitionName: 'slide-right',
      userHeadImg: [headerImg1, headerImg2, headerImg3, headerImg4, headerImg5, headerImg6, headerImg7, headerImg8, headerImg9, headerImg10, headerImg11, headerImg12]
    }
  },
  beforeRouteUpdate (to, from, next) {
    if (this.$router.isBack) {
      this.transitionName = 'slide-right'
    } else {
      this.transitionName = 'slide-left'
    }
    this.$router.isBack = false
    setTimeout(function () { next() }, 50)
  },
  components: {
    comHead,
    comFoot
  },
  methods: {
    toEditUserInfo: function () {
      this.$router.push('/userSetting/userInfo')
    },
    userLogin: function () {
      if (!this.memeryData.isLogin) this.$router.push('/userSetting/userLogin')
    },
    toRedLine: function () {
      this.$router.push('/userSetting/redLine')
    },
    tofixedCtrl: function () {
      this.$router.push('/userSetting/fixedCtrl')
    },
    toAppSetting: function () {
      this.$router.push('/userSetting/appSetting')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../../../style/cssConfig.scss';
  .pageContent{
    background: #f5f5f5;
  }
  ul.settingArea{
    font-size: .9rem;
    li{
      width: 100%;
      background: #fff;
      border-bottom: 1px solid $defaultLightGray;
      i{
        color: $defaultGray;
      }
      &.userInfo{
        height: 7rem;
        padding: 1rem;
        img{
          height: 5rem;
          width: 5rem;
          border-radius: 100%;
        }
        .userTab{
          padding-left: 1rem;
          height: 5rem;
          width: calc( 100% - 7rem);
          line-height: 2.3rem;
          p.userName{
            font-size: 1rem;
          }
          p.userRemark{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        i{
          height: 2rem;
          width: 2rem;
          font-size: 2rem;
          line-height: 5rem;
        }
      }
      &.blank{
        height: 1rem;
        background: #f5f5f5;
      }
      &.lineTab{
        height: 2.8rem;
        line-height: 2.8rem;
        padding: 0 1rem;
        border-bottom: 1px solid $defaultLightGray;
      }
    }
  }
</style>
