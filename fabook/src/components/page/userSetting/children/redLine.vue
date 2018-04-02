<template>
  <div>
    <com-head :menuType="headType" :leftBtnClick="leftBtnClick"></com-head>
    <div class="redLineArea">
      <p>选择红线设置方案：</p>
      <ul class="lineTab clearfix">
        <li class="chooseTab fl" :class="[isNumber ? '':'active']" @click="changeType(false)">百分比</li>
        <li class="chooseTab fl" :class="[isNumber ? 'active':'']" @click="changeType(true)">具体数值</li>
      </ul>
      <ul class="lineTab clearfix">
        <li v-show="!isNumber">支出上限占收入的 {{rangeValue}}%</li>
        <li v-show="!isNumber"><mt-range v-model="rangeValue" class="redLineRange"></mt-range></li>
        <li v-show="isNumber">支出上限将设置为 {{redLineValue}}元</li>
        <li v-show="isNumber"><input type="number" v-model="redLineValue" oninput="if(value.length > 14) value=value.slice(0,14)" /></li>
      </ul>
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
        title: ['个人红线设置'],
        lTitleType: 2,
        rButtonType: 0
      },
      toastMsg: '保存成功!',
      isNumber: false,
      rangeValue: 80,
      redLineValue: 0
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
    padding: .5rem;
  }
  .lineTab {
    padding: .5rem 1rem;
    li{
      position: relative;
      height: 2rem;
      &.chooseTab{
        width: 30%;
        border: 1px solid $defaultGray;
        text-align: center;
        border-radius: 1rem;
        margin-right: .5rem;
        line-height: 2rem;
        &.active{
          background: $defaultBlue;
          color: #fff;
          border: 1px solid #fff;
        }
      }
      input{
        width: 100%;
        height: 2rem;
        border-radius: .5rem;
        border: 1px solid $defaultBlue;
        padding: 0 .5rem;
      }
    }
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
