<template>
  <div>
    <com-head :menuType="headType" :leftBtnClick="leftBtnClick"></com-head>
    <div class="loginArea">
      <div class="inputArea clearfix" :class="[isUserNameRight ? '' : 'error']">
        <i class="iconfont fabook-yonghu fl"></i>
        <input type="text" class="fl" name="username" v-model="username" placeholder="请输入手机号或邮箱" @blur="checkUserNameFunc()" @focus="resetUserNameArea()" />
      </div>
      <div class="inputArea clearfix" :class="[isPwdRight ? '' : 'error']">
        <i class="iconfont fabook-mima fl"></i>
        <input type="text" class="pwdNoSee fl" name="password" v-model="password" placeholder="请输入密码" @blur="checkPwdFunc()" @focus="resetPwdArea()" />
      </div>
      <div class="inputArea clearfix" :class="[isRePwdRight ? '' : 'error']">
        <i class="iconfont fabook-mima fl"></i>
        <input type="text" class="pwdCanSee fl" name="rePassword" v-model="rePassword" placeholder="请再次输入密码" @blur="checkRePwdFunc()" @focus="resetRePwdArea()" />
      </div>
      <div class="inputArea clearfix code">
        <input type="text" class="input fl" :class="[isCodeRight ? [isCodeDefault ? '':'success'] : 'error']" name="codeArea" v-model="inputCode" placeholder="请输入验证码" @blur="checkCodeFunc()" @focus="resetCodeArea()" />
        <input type="text" class="code fr" name="codeArea" v-model="checkCode" @click="createCode()" readonly="true" />
      </div>
      <div><button class="submit" @click="registerNow()">注&emsp;册</button></div>
    </div>
    <toast-msg :msg="toastMsg" ref="toastMsg"></toast-msg>
  </div>
</template>

<script>
import comHead from '@/components/common/comHead/commonHead'
import toastMsg from '@/components/common/message/toastMsg'
export default {
  data () {
    return {
      headType: {
        title: ['注册用户'],
        lTitleType: 2,
        rButtonType: 0
      },
      username: '',
      password: '',
      rePassword: '',
      checkCode: '',
      inputCode: '',
      isUserNameRight: true,
      isPwdRight: true,
      isRePwdRight: true,
      isCodeRight: true,
      isCodeDefault: true,
      toastMsg: ''
    }
  },
  components: {
    comHead,
    toastMsg
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
    this.$nextTick(function () {
      this.createCode()
    })
  },
  methods: {
    createCode: function () {
      let code = ''
      let codeLength = 4
      let random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
      for (var i = 0; i < codeLength; i++) {
        code += random[Math.floor(Math.random() * 36)]
      }
      this.checkCode = code
    },
    resetUserNameArea: function () {
      if (!this.isUserNameRight) {
        this.username = ''
        this.isUserNameRight = true
      }
    },
    checkUserNameFunc: function () {
      if (this.username === '') {
        this.username = '用户名不能为空！'
        this.isUserNameRight = false
      } else {
        let checkPhone = /^1\d{10}$/
        let checkEmail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
        if (checkPhone.test(this.username) || checkEmail.test(this.username)) {} else {
          this.username = '请输入正确的手机号或邮箱！'
          this.isUserNameRight = false
        }
      }
    },
    resetPwdArea: function () {
      if (!this.isPwdRight) {
        this.password = ''
        this.isPwdRight = true
      }
    },
    checkPwdFunc: function () {
      if (this.password === '') {
        this.password = '密码不能为空！'
        this.isPwdRight = false
      }
    },
    resetRePwdArea: function () {
      if (!this.isRePwdRight) {
        this.rePassword = ''
        this.isRePwdRight = true
      }
    },
    checkRePwdFunc: function () {
      if (this.rePassword === '') {
        this.rePassword = '密码不能为空！'
        this.isRePwdRight = false
      } else if (this.rePassword !== this.password) {
        this.rePassword = '前后密码不一致！'
        this.isRePwdRight = false
      }
    },
    resetCodeArea: function () {
      if (!this.isCodeRight) {
        this.isCodeDefault = true
        this.isCodeRight = true
        this.inputCode = ''
      }
    },
    checkCodeFunc: function () {
      this.isCodeDefault = false
      let inputCode = this.inputCode.toUpperCase()
      if (inputCode.length <= 0) {
        this.inputCode = '请输入验证码！'
        this.isCodeRight = false
      } else if (inputCode !== this.checkCode) {
        this.inputCode = '验证码错误'
        this.isCodeRight = false
        this.createCode()
      }
    },
    registerNow: function () {
      this.checkUserNameFunc()
      this.checkPwdFunc()
      this.checkRePwdFunc()
      this.checkCodeFunc()
      if (this.isCodeRight && this.isRePwdRight && this.isPwdRight && this.isUserNameRight) {
        let _this = this
        this.$http.post(this.memeryData.serverUrl + '/users/register', {
          'username': this.username,
          'password': this.password
        }, {emulateJSON: true}).then(function (response) {
          if (response.body.msg === 'success') {
            _this.toastMsg = '注册成功！'
            _this.$refs.toastMsg.openToast()
            setTimeout(function () {
              _this.$router.goBackSec()
            }, 2000)
          } else {
            _this.toastMsg = response.body.msgText
            _this.$refs.toastMsg.openToast()
          }
        }, function (response) {
          _this.toastMsg = '注册失败，请联系管理员！'
          _this.$refs.toastMsg.openToast()
          console.log(response)
        })
      }
    },
    leftBtnClick: function () {
      this.$router.goBackSec()
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
      &.code{
        input.code{
          text-align: center;
          font-size: 1.2rem;
          width: 6rem;
          border:0;
          background-color:#ccc;
          font-family:Arial;
          font-style:italic;
          font-weight:bold;
          letter-spacing:2px;
          color:blue;
        }
        input.input{
          width: calc( 100% - 6rem );
          padding: 0 1rem;
          border-bottom-left-radius: .3rem;
          border-top-left-radius: .3rem;
        }
        input.success{
          border: 1px solid $defaultGreen;
        }
        input.error{
          color: $defaultRed;
          border: 1px solid $defaultRed;
        }
      }
      &.error{
        i,input{
          color: $defaultRed;
          line-height: 2.5rem;
        }
        border: 1px solid $defaultRed;
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
  }
</style>
