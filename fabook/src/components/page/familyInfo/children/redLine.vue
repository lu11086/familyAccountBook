<template>
  <div>
    <com-head :menuType="headType" :leftBtnClick="leftBtnClick"></com-head>
    <p class="gray" v-show="!memeryData.userInfo.isFamilyAdmin">* 非家庭管理员不能保存红线配置 *</p>
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
      <p>家庭成员红线单独设置 :</p>
      <div class="lineTab clearfix">
        <ul>
          <li class="userTab clearfix" v-for="(user, index) in userList" :key="index">
            <span class="fl">{{user}}</span>
            <mt-range v-model="userValue[index]" class="redLineRange2 fr"></mt-range>
            <p class="fl">该用户占家庭总支出的 {{userValue[index]}}%</p>
          </li>
        </ul>
      </div>
      <button @click="saveRedLine" v-show="memeryData.userInfo.isFamilyAdmin">保存设置</button>
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
      redLineValue: 0,
      userList: [],
      userValue: []
    }
  },
  components: {
    comHead,
    toastMsg
  },
  mounted () {
    this.userList = this.memeryData.familyInfo.familyList
    if (this.memeryData.familyInfo.familyRedLine.length > 1) {
      if (this.memeryData.familyInfo.familyRedLine[0].indexOf('%') > -1) {
        this.isNumber = false
        this.rangeValue = parseInt(this.memeryData.familyInfo.familyRedLine[0].split('%')[0])
      } else {
        this.isNumber = true
        this.redLineValue = parseFloat(this.memeryData.familyInfo.familyRedLine[0])
      }
      for (let i = 1; i < this.memeryData.familyInfo.familyRedLine.length; i++) {
        this.userValue.push(parseInt(this.memeryData.familyInfo.familyRedLine[i]))
      }
    } else {
      let average = Math.floor(100 / this.userList.length)
      // eslint-disable-next-line
      for (let i in this.userList) this.userValue.push(average)
    }
  },
  methods: {
    changeType: function (type) {
      this.isNumber = type
    },
    saveRedLine: function () {
      let params = {}
      // 备份原有家庭红线
      let oldRedLine = []
      for (let i in this.memeryData.familyInfo.familyRedLine) {
        oldRedLine.push(this.memeryData.familyInfo.familyRedLine[i])
      }
      this.memeryData.familyInfo.familyRedLine = []
      params.id = this.memeryData.userInfo.familyId
      if (this.isNumber) {
        params.redLine = this.redLineValue + ';'
        this.memeryData.familyInfo.familyRedLine.push(this.redLineValue)
      } else {
        params.redLine = this.rangeValue + '%;'
        this.memeryData.familyInfo.familyRedLine.push(this.rangeValue + '%')
      }
      let sum = 0
      for (let i in this.userValue) {
        sum += this.userValue[i]
        params.redLine += this.userValue[i] + ';'
        this.memeryData.familyInfo.familyRedLine.push(this.userValue[i])
      }
      if (sum > 100) {
        this.memeryData.familyInfo = oldRedLine
        this.toastMsg = '家庭成员占比和不得超过100%'
        this.$refs.toastMsg.openToast()
      } else {
        let _this = this
        this.$http.post(this.memeryData.serverUrl + '/family/changeRedLine', params, {emulateJSON: true}).then(function (response) {
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
      }
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
      &.userTab{
        padding-bottom: .5rem;
        span{
          height: 2rem;
          line-height: 2rem;
          border: 1px solid #ccc;
          padding: 0 .5rem;
          margin-right: .5rem;
          width: 40vw;
          text-align: center;
          border-radius: .5rem;
        }
        .redLineRange2 {
          width: 40vw;
        }
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
  p.gray{
    color: $defaultLightGray;
    text-align: center;
    background: $defaultGray;
  }
</style>
