<template>
  <div>
    <com-head :menuType="headType" :leftBtnClick="leftBtnClick"></com-head>
    <div class="fixedCtrlArea">
      <p>每月固定收入：（如工资）</p>
      <input type="number" v-model="fixedIncome" />
      <p>每月固定支出：（如话费）</p>
      <input type="number" v-model="fixedPay" />
      <p class="remark">说明：<br />固定收支会在每个月月初自动追加记录，省略用户每个月都要记录相同项目的过程</p>
      <button @click="saveFixedCtrl">保存设置</button>
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
        title: ['固定收支设置'],
        lTitleType: 2,
        rButtonType: 0
      },
      toastMsg: '保存成功!',
      fixedIncome: 0,
      fixedPay: 0
    }
  },
  components: {
    comHead,
    toastMsg
  },
  mounted () {
    this.fixedIncome = this.memeryData.userInfo.fixedIncome
    this.fixedPay = this.memeryData.userInfo.fixedPay
  },
  methods: {
    saveFixedCtrl: function () {
      this.memeryData.userInfo.fixedIncome = this.fixedIncome
      this.memeryData.userInfo.fixedPay = this.fixedPay
      let _this = this
      this.$http.post(this.memeryData.serverUrl + '/users/changeFixedCtrl', {
        'userId': this.memeryData.userInfo.userId,
        'fixedIncome': this.fixedIncome,
        'fixedPay': this.fixedPay
      }, {emulateJSON: true}).then(function (response) {
        if (response.body.msg === 'success') {
          _this.toastMsg = '保存成功！'
          _this.$refs.toastMsg.openToast()
          setTimeout(function () {
            _this.leftBtnClick()
          }, 1000)
        } else {
          _this.toastMsg = response.body.msgText
          _this.$refs.toastMsg.openToast()
        }
      }, function (response) {
        _this.toastMsg = '保存失败，请联系管理员！'
        _this.$refs.toastMsg.openToast()
        console.log(response)
      })
    },
    leftBtnClick: function () {
      this.$router.goBack()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../../../../style/cssConfig';
  p{
    padding: 1rem 1rem;
    &.remark{
      font-size: .9rem;
    }
  }
  input{
    width: 80%;
    height: 2rem;
    border-radius: .5rem;
    border: 1px solid $defaultBlue;
    padding: 0 .5rem;
    margin-left: 10%;
  }
  button{
    width: 70vw;
    height: 2.5rem;
    margin: 2rem 15vw;
    border-radius: 2rem;
    background: $defaultBlue;
    color: #fff;
    font-size: 1rem;
  }
</style>
