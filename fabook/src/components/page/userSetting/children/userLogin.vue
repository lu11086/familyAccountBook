<template>
  <div>
    <transition :name="transitionName">
      <router-view class="Router"></router-view>
    </transition>
    <com-head :menuType="headType" :leftBtnClick="leftBtnClick"></com-head>
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
      <div><button class="submit" @click="loginSystem()">登&emsp;录</button></div>
      <div class="specialType clearfix">
        <span class="fl" @click="toForgetPwd()">忘记密码？</span>
        <span class="fr" @click="userRegister()">立即注册</span>
      </div>
    </div>
    <toast-msg :msg="toastMsg" ref="toastMsg"></toast-msg>
    <click-msg :msg="clickMsg" :customStyle="customStyle" ref="clickMsg"></click-msg>
  </div>
</template>

<script>
import comHead from '@/components/common/comHead/commonHead'
import toastMsg from '@/components/common/message/toastMsg'
import clickMsg from '@/components/common/message/clickMsg'
import eventBus from '@/components/common/eventBus.js'
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
      isPwdSee: true,
      toastMsg: '登录成功!',
      clickMsg: '',
      customStyle: {}
    }
  },
  components: {
    comHead,
    clickMsg,
    toastMsg
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
    },
    toForgetPwd: function () {
      this.$router.push('/userSetting/userLogin/forget')
    },
    loginSystem: function () {
      let _this = this
      this.$http.post(this.memeryData.serverUrl + '/users/login', {
        'username': this.username,
        'password': this.password
      }, {emulateJSON: true}).then(function (response) {
        if (response.body.msg === 'success') {
          _this.toastMsg = '登录成功！'
          _this.$refs.toastMsg.openToast()
          _this.memeryData.isLogin = true
          let data = response.body.data[0]
          _this.memeryData.userInfo.username = data.fabook_name
          _this.memeryData.userInfo.tel = data.fabook_tel
          _this.memeryData.userInfo.email = data.fabook_email
          _this.memeryData.userInfo.userId = data.fabook_id
          _this.memeryData.userInfo.userRemark = data.fabook_remark
          _this.memeryData.userInfo.sexNumber = parseInt(data.fabook_sex)
          _this.memeryData.userInfo.isFamilyAdmin = parseInt(data.family_admin)
          _this.memeryData.userInfo.userHeaderIndex = parseInt(data.header_img)
          _this.memeryData.userInfo.familyId = data.family_id
          _this.memeryData.userInfo.fixedIncome = data.fixed_income
          _this.memeryData.userInfo.fixedPay = data.fixed_pay
          _this.memeryData.userInfo.redLine = data.red_line
          _this.memeryData.userInfo.rememberQuestion = data.remember_question
          _this.memeryData.userInfo.rememberAnswer = data.remember_answer
          sessionStorage.setItem('isLogin', true)
          sessionStorage.setItem('userInfo', JSON.stringify(_this.memeryData.userInfo))
          if (localStorage.getItem('newAccount')) {
            _this.customStyle = {'height': '10.5rem'}
            _this.clickMsg = '检测到本地有未上传记录，是否上传至该账户？' +
              '<br />' +
              '<span style="color: #ccc;font-size: .8rem;display: inline-block;padding-top: .5rem;text-align: left;">注：登录后所有数据对比只参考线上数据，未上传数据不会参与对比，因此会出现偏差值。</span>'
            _this.$refs.clickMsg.openClick()
            eventBus.$on('clickMsgOk', function (data) {
              _this.uploadData()
              _this.$refs.clickMsg.closeClick()
            })
            eventBus.$on('clickMsgCancel', function (data) {
              _this.$refs.clickMsg.closeClick()
            })
          } else {
            setTimeout(function () {
              _this.$router.goBack()
            }, 1000)
          }
        } else {
          _this.toastMsg = response.body.msgText
          _this.$refs.toastMsg.openToast()
        }
      }, function (response) {
        _this.toastMsg = '登录失败，请联系管理员！'
        _this.$refs.toastMsg.openToast()
        console.log(response)
      })
    },
    leftBtnClick: function () {
      this.$router.goBack()
    },
    uploadData: function () {
      let successIndex
      let newList = JSON.parse(localStorage.getItem('newAccount'))
      for (let i in newList) {
        let params = {}
        params.title = newList[i].fabook_account_title
        params.isPay = Number(newList[i].fabook_account_is_pay)
        params.type = newList[i].fabook_account_type
        if (newList[i].fabook_account_income > 0) params.amount = newList[i].fabook_account_income
        if (newList[i].fabook_account_pay > 0) params.amount = newList[i].fabook_account_pay
        params.time = newList[i].fabook_account_date
        params.remark = newList[i].fabook_account_remark
        if (this.memeryData.userInfo.userId) params.id = this.memeryData.userInfo.userId
        if (this.memeryData.userInfo.username) params.name = this.memeryData.userInfo.username
        if (this.memeryData.userInfo.familyId) params.family = this.memeryData.userInfo.familyId
        let _this = this
        this.$http.post(this.memeryData.serverUrl + '/account/newAccount', params, {emulateJSON: true}).then(function (response) {
          if (response.body.msg === 'success') {
            successIndex++
            if (successIndex === newList.length) {
              localStorage.removeItem('newAccount')
              _this.toastMsg = '新增记录成功！'
              _this.$refs.toastMsg.openToast()
              setTimeout(function () {
                _this.leftBtnClick()
              }, 1000)
            }
          } else {
            _this.toastMsg = response.body.msgText
            _this.$refs.toastMsg.openToast()
          }
        }, function (response) {
          _this.toastMsg = '创建失败，请联系管理员！'
          _this.$refs.toastMsg.openToast()
          console.log(response)
        })
      }
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
