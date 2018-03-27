<template>
    <div class="accountFilterArea">
      <p>选择收支类型</p>
      <ul class="chooseTab clearfix">
        <li :class="[accountPay == 2 ? 'active': '']" @click="changeAccountPay(2)">全部</li>
        <li :class="[accountPay == 0 ? 'active': '']" @click="changeAccountPay(0)">收入</li>
        <li :class="[accountPay == 1 ? 'active': '']" @click="changeAccountPay(1)">支出</li>
      </ul>
      <div v-show="accountPay != 2">
        <p>选择记录类型</p>
        <div class="pore" :class="[accountPay ? 'pay': 'income']">
          <transition name="opacity-fade">
            <ul class="chooseTab clearfix poab" v-show="accountPay">
              <li @click="chooseType('200')" :class="[payType == 200 ? 'active': '']">全部</li>
              <li @click="chooseType('201')" :class="[payType == 201 ? 'active': '']">餐饮</li>
              <li @click="chooseType('202')" :class="[payType == 202 ? 'active': '']">服饰</li>
              <li @click="chooseType('203')" :class="[payType == 203 ? 'active': '']">交通</li>
              <li @click="chooseType('204')" :class="[payType == 204 ? 'active': '']">娱乐</li>
              <li @click="chooseType('205')" :class="[payType == 205 ? 'active': '']">社交</li>
              <li @click="chooseType('206')" :class="[payType == 206 ? 'active': '']">家居</li>
              <li @click="chooseType('207')" :class="[payType == 207 ? 'active': '']">通讯</li>
              <li @click="chooseType('208')" :class="[payType == 208 ? 'active': '']">美容</li>
              <li @click="chooseType('209')" :class="[payType == 209 ? 'active': '']">运动</li>
              <li @click="chooseType('210')" :class="[payType == 210 ? 'active': '']">医疗</li>
              <li @click="chooseType('211')" :class="[payType == 211 ? 'active': '']">学习</li>
              <li @click="chooseType('212')" :class="[payType == 212 ? 'active': '']">理财</li>
              <li @click="chooseType('213')" :class="[payType == 213 ? 'active': '']">宠物</li>
              <li @click="chooseType('299')" :class="[payType == 299 ? 'active': '']">其他</li>
            </ul>
          </transition>
          <transition name="opacity-fade">
            <ul class="chooseTab clearfix poab" v-show="!accountPay">
              <li @click="chooseType('100')" :class="[incomeType == 100 ? 'active': '']">全部</li>
              <li @click="chooseType('101')" :class="[incomeType == 101 ? 'active': '']">工资</li>
              <li @click="chooseType('102')" :class="[incomeType == 102 ? 'active': '']">兼职</li>
              <li @click="chooseType('103')" :class="[incomeType == 103 ? 'active': '']">理财收益</li>
              <li @click="chooseType('104')" :class="[incomeType == 104 ? 'active': '']">人情</li>
              <li @click="chooseType('199')" :class="[incomeType == 199 ? 'active': '']">其他</li>
            </ul>
          </transition>
        </div>
      </div>
      <p>选择金额范围</p>
      <div class="chooseTab clearfix">
        <input type="text" class="fl" v-model="minAmount" /> <span class="fl">—</span>
        <input type="text" class="fr" v-model="maxAmount" />
      </div>
      <p>选择时间范围</p>
      <div class="chooseTab clearfix">
        <input type="text" class="fl" v-model="minDate"  @focus="showMinCalendar" readonly=true /> <span class="fl">—</span>
        <input type="text" class="fr" v-model="maxDate"  @focus="showMaxCalendar" readonly=true />
      </div>
      <transition name="opacity-fade">
        <Calendar v-on:choseDay="clickMinDay" isHideOtherday=false v-show="isMinCalendarShow"></Calendar>
      </transition>
      <transition name="opacity-fade">
        <Calendar v-on:choseDay="clickMaxDay" isHideOtherday=false v-show="isMaxCalendarShow"></Calendar>
      </transition>
    </div>
</template>

<script>
import eventBus from '@/components/common/eventBus.js'
export default {
  data () {
    return {
      accountPay: 2,
      payType: 200,
      incomeType: 100,
      minAmount: 0,
      maxAmount: 1000,
      minDate: '',
      maxDate: '',
      isMinCalendarShow: false,
      isMaxCalendarShow: false
    }
  },
  mounted () {
  },
  methods: {
    changeAccountPay: function (index) {
      this.accountPay = index
    },
    chooseType: function (index) {
      if (this.accountPay) {
        this.payType = index
      } else {
        this.incomeType = index
      }
    },
    showMinCalendar: function () {
      this.isMinCalendarShow = true
    },
    showMaxCalendar: function () {
      this.isMaxCalendarShow = true
    },
    clickMinDay: function (data) {
      console.log(this.dealDateInfo(data))// 选中某天
      this.minDate = this.dealDateInfo(data)
      this.isMinCalendarShow = false
    },
    clickMaxDay: function (data) {
      console.log(this.dealDateInfo(data))// 选中某天
      this.maxDate = this.dealDateInfo(data)
      this.isMaxCalendarShow = false
    },
    dealDateInfo: function (data) {
      let result = ''
      let info = data.split('/')
      result += info[0] + '-'
      if (parseInt(info[1]) < 10) result += '0'
      result += info[1] + '-'
      if (parseInt(info[2]) < 10) result += '0'
      result += info[2]
      return result
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../../../../style/cssConfig';
  .accountFilterArea{
    width: 70vw;
    height: 100vh;
    position: fixed;
    z-index: 13;
    top: 0;
    right: 0;
    background: #fff;
    p{
      font-size: 1rem;
      margin-top: 1rem;
      padding: 0 .5rem;
    }
    .pore{
      position: relative;
      &.pay{
        height: 13.6rem;
      }
      &.income{
        height: 5.5rem;
      }
    }
    .chooseTab{
      font-size: .9rem;
      padding: 0 .5rem;
      border-bottom: 1px solid $defaultLightGray;
      li{
        text-align: center;
        float: left;
        width: 30%;
        margin: .5rem 1.5%;
        padding: .2rem;
        border: 1px solid $defaultGray;
        border-radius: .2rem;
        &.active{
          color:#fff;
          background: $defaultBlue;
          border: 1px solid $defaultBlue;
        }
      }
      &.poab{
        position: absolute;
        top: 0;
      }
      span{
        width: 19%;
        text-align: center;
        height: 1.5rem;
        line-height: 1.5rem;
        margin: .5rem 0;
      }
      input{
        width: 40%;
        text-align: center;
        height: 1.5rem;
        line-height: 1.5rem;
        border: 1px solid $defaultGray;
        border-radius: .2rem;
        margin: .5rem 0;
      }
    }
    .wh_content_item div .wh_isToday {
      margin: 0;
    }
  }
</style>
