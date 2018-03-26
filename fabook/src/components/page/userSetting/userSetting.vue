<template>
  <div class="pageContent">
    <transition :name="transitionName">
      <router-view class="Router"></router-view>
    </transition>
    <com-head :menuType="headType"></com-head>
    <ul class="settingArea">
      <li class="userInfo clearfix" @click="userLogin()">
        <img src="@/assets/userDefault.png" alt="用户头像" class="fl" v-show="!memeryData.isLogin">
        <img :src="userHeadImg" alt="用户头像" class="fl" v-show="memeryData.isLogin">
        <div class="userTab fl" >
          <p class="userName" v-text="userName"></p>
          <p v-text="userWord"></p>
        </div>
        <i class="iconfont fabook-bianji fr" @click="toEditUserInfo()" v-show="memeryData.isLogin"></i>
      </li>
      <li class="blank"></li>
      <li class="lineTab">
        固定收支
        <i class="iconfont fabook-iconfontjiantou4 fr"></i>
      </li>
      <li class="lineTab">
        消费红线
        <i class="iconfont fabook-iconfontjiantou4 fr"></i>
      </li>
      <li class="lineTab">
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
export default {
  data () {
    return {
      headType: {
        title: ['用户设置'],
        lTitleType: 0,
        rButtonType: 0
      },
      transitionName: 'slide-right',
      userName: '点击此处登录',
      userWord: '登录后可使用更多功能',
      userHeadImg: 'https://github.com/lu11086/familyAccountBook/blob/master/fabook/src/assets/userHeader7.png?raw=true'
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../../../style/cssConfig.scss';
  .pageContent{
    background: #f5f5f5;
    min-height: 100vh;
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
