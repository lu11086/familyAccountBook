<template>
  <div>
    <transition :name="transitionName">
      <router-view class="Router"></router-view>
    </transition>
    <com-head :menuType="headType"></com-head>
    <div class="loginArea">
      <div class="inputArea clearfix">
        <i class="iconfont fabook-yonghu fl"></i>
        <input type="text" class="fl" name="username" v-model="username" placeholder="请输入手机号或邮箱"/>
      </div>
      <div class="inputArea clearfix">
        <i class="iconfont fabook-mima fl"></i>
        <input type="password" class="pwdNoSee fl" name="password-nosee" v-model="password" v-show="!isPwdSee" v-focus="!isPwdSee" @blur="checkPwd()"/>
        <input type="text" class="pwdCanSee fl" name="password-see" v-model="password" v-show="isPwdSee" placeholder="请输入密码" @focus="changeInput()"/>
      </div>
      <div><button class="submit">登&emsp;录</button></div>
      <div class="specialType clearfix">
        <span class="fl">忘记密码？</span>
        <span class="fr" @click="userRegister()">立即注册</span>
      </div>
    </div>
  </div>
</template>

<script>
import comHead from '@/components/common/comHead/commonHead'
export default {
  data () {
    return {
      headType: {
        title: ['用户登录'],
        lTitleType: 2,
        rButtonType: 0
      },
      transitionName: 'slide-right',
      username: '',
      password: '',
      isPwdSee: true
    }
  },
  components: {
    comHead
  },
  beforeRouteUpdate (to, from, next) {
    if (this.$router.isBackSec) {
      this.transitionName = 'slide-right'
    } else {
      this.transitionName = 'slide-left'
    }
    this.$router.isBackSec = false
    setTimeout(function () { next() }, 50)
  },
  directives: {
    focus: {
      update: function (el, {value}) {
        if (value) {
          el.focus()
        }
      }
    }
  },
  mounted () {
  },
  methods: {
    changeInput: function () {
      this.isPwdSee = false
    },
    checkPwd: function () {
      if (this.password === '') {
        this.isPwdSee = true
      }
    },
    userRegister: function () {
      this.$router.push('/userSetting/userLogin/userRegister')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../../../../style/cssConfig';
  .pageContent{
    background: #f5f5f5;
    min-height: 100vh;
  }
  .loginArea{
    margin-top: 3rem;
    .inputArea{
      width: 70%;
      height: 2.5rem;
      background: $defaultLightGray;
      overflow: hidden;
      margin: 1rem auto;
      border-radius: .3rem;
      i{
        font-size: 1.5rem;
        line-height: 2.7rem;
        display: inline-block;
        padding: 0 .8rem;
        color: $defaultGray;
      }
      input{
        outline: none;
        width: calc( 100% - 3.5rem );
        font-size: 1rem;
        height: 2.5rem;
        line-height: 2.5rem;
        background: transparent;
      }
    }
    button{
      width: 10rem;
      height: 2rem;
      line-height: 2rem;
      margin: 2rem auto;
      display: block;
      font-size: 1rem;
      border-radius: .5rem;
      background: $defaultBlue;
      color: #fff;
    }
    .specialType{
      width: 70%;
      margin: 0 auto;
      font-size: .9rem;
    }
  }
</style>
