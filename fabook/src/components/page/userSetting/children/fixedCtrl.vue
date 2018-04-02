<template>
  <div>
    <com-head :menuType="headType" :leftBtnClick="leftBtnClick"></com-head>
    <div class="fixedCtrlArea">
      <p>每月固定收入：（如工资）</p>
      <input type="number" v-model="fixedIncome" />
      <p>每月固定支出：（如话费）</p>
      <input type="number" v-model="fixedPay" />
      <p class="remark">说明：<br />固定收支会在每个月月初自动追加记录，省略用户每个月都要记录相同项目的过程</p>
      <button @click="saveRedLine">保存设置</button>
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
  },
  methods: {
    changeType: function (type) {
      this.isNumber = type
    },
    saveRedLine: function () {
      let params = {}
      if (this.isNumber) {
        params.isNumber = true
        params.redLineValue = this.redLineValue
      } else {
        params.isNumber = false
        params.rangeValue = this.rangeValue
      }
      console.log(params)
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
