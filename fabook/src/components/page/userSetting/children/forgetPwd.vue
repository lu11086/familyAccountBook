<template>
  <div>
    <com-head :menuType="headType" :leftBtnClick="leftBtnClick"></com-head>
    <div class="forgetArea">
      <ul v-show="!inputUser">
        <li>请输入注册时使用的手机号或邮箱：</li>
        <li class="blue"><input type="text" v-model="username"/></li>
      </ul>
      <div v-show="!inputUser"><button class="submit" @click="checkIsUser()">查询密保问题</button></div>
      <ul v-show="inputUser">
        <li>请回答以下问题：</li>
        <li class="blue">{{forgetQusetion}}</li>
        <li>请在下方输入答案：</li>
        <li class="blue"><input type="text" v-model="answer"/></li>
        <li v-if="isAnswerRight">回答正确！</li>
        <li class="blue" v-if="isAnswerRight">密码为：{{password}}</li>
      </ul>
      <div v-show="inputUser"><button class="submit" @click="checkIsRight()">确定</button></div>
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
        title: ['忘记密码'],
        lTitleType: 2,
        rButtonType: 0
      },
      toastMsg: '',
      inputUser: false,
      username: '',
      forgetQusetion: '',
      answer: '',
      isAnswerRight: false,
      password: '',
      userId: ''
    }
  },
  components: {
    comHead,
    toastMsg
  },
  mounted () {
  },
  methods: {
    checkIsUser: function () {
      let _this = this
      this.$http.post(this.memeryData.serverUrl + '/users/checkQuestion', {
        'username': this.username
      }, {emulateJSON: true}).then(function (response) {
        if (response.body.msg === 'success') {
          _this.inputUser = true
          _this.userId = response.body.fabook_id
          _this.forgetQusetion = response.body.remember_question
          _this.toastMsg = '请回答问题'
          _this.$refs.toastMsg.openToast()
        } else {
          _this.toastMsg = response.body.msgText
          _this.$refs.toastMsg.openToast()
        }
      }, function (response) {
        _this.toastMsg = '查询失败，请联系管理员！'
        _this.$refs.toastMsg.openToast()
        console.log(response)
      })
    },
    checkIsRight: function () {
      let _this = this
      this.$http.post(this.memeryData.serverUrl + '/users/checkForgetAnswer', {
        'userId': this.userId,
        'answer': this.answer
      }, {emulateJSON: true}).then(function (response) {
        _this.isAnswerRight = true
        _this.password = response.body.password
        _this.toastMsg = response.body.msgText
        _this.$refs.toastMsg.openToast()
      }, function (response) {
        _this.toastMsg = '出现错误，请联系管理员！'
        _this.$refs.toastMsg.openToast()
        console.log(response)
      })
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
  ul{
    padding: .5rem 1rem;
    li{
      height: 2rem;
      line-height: 2rem;
      font-size: 1rem;
      &.blue{
        color: $defaultBlue;
        padding-left: 2rem;
        input{
          width: 90%;
          padding: 0 .5rem;
          font-size: 1rem;
          border-radius: .5rem;
          border: 1px solid $defaultBlue;
          color: $defaultBlue;
        }
      }
    }
  }
  button{
    width: 70vw;
    margin: 2rem 15vw;
    color: #fff;
    background: $defaultBlue;
    font-size: 1rem;
    height: 2rem;
    line-height: 2rem;
    border-radius: .5rem;
  }
</style>
