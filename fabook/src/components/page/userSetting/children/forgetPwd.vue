<template>
  <div>
    <com-head :menuType="headType" :leftBtnClick="leftBtnClick"></com-head>
    <div class="forgetArea">
      <ul>
        <li>请回答以下问题：</li>
        <li class="blue">{{forgetQusetion}}</li>
        <li>请在下方输入答案：</li>
        <li class="blue"><input type="text" v-model="answer"/></li>
        <li v-if="isAnswerRight">回答正确！</li>
        <li class="blue" v-if="isAnswerRight">密码为：{{password}}</li>
      </ul>
      <div><button class="submit" @click="checkIsRight()">确定</button></div>
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
      forgetQusetion: '密码是123456',
      forgetAnswer: '怎么可能',
      answer: '',
      isAnswerRight: false,
      password: '654321'
    }
  },
  components: {
    comHead,
    toastMsg
  },
  mounted () {
  },
  methods: {
    checkIsRight: function () {
      if (this.answer === this.forgetAnswer) {
        this.isAnswerRight = true
        this.toastMsg = '回答正确！请牢记密码'
        this.$refs.toastMsg.openToast()
      } else {
        this.isAnswerRight = false
        this.toastMsg = '回答错误请重试'
        this.$refs.toastMsg.openToast()
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
