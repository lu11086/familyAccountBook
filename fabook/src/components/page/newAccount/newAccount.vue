<template>
  <div>
    <header>
      <i class="leftHeader iconfont fabook-guanbi" @click="closeNewAccount()"></i>
      <p>新增记录</p>
    </header>
    <div class="newAccountArea">
      <div class="lineTab clearfix">
        <span class="fl">记录标题 :</span><input type="text" name="accountTitle" placeholder="限制15字以内" v-model="accountTitle" @input="checkUnderFifteen" @blur="closeError"/>
        <h6 v-show="titleError" class="title">标题不能超过15个字！</h6>
      </div>
      <div class="lineTab clearfix">
        <span class="fl">收支类型 :</span>
        <div class="chooseBtn fl" :class="[accountPay ? 'active' : '']" @click="changeAccountPay(true)">支出</div>
        <div class="chooseBtn fl" :class="[accountPay ? '' : 'active']" @click="changeAccountPay(false)">收入</div>
      </div>
      <div class="lineTab clearfix" :class="[accountPay ? 'pay':'income']">
        <p>记录类型 :</p>
        <transition name="opacity-fade">
          <ul v-show="accountPay" class="chooseTypeArea">
            <li @click="chooseType('201')" :class="[payType == 201 ? 'active': '']"><i class="iconfont fabook-canyin"></i><h5>餐饮</h5></li>
            <li @click="chooseType('202')" :class="[payType == 202 ? 'active': '']"><i class="iconfont fabook-fushi"></i><h5>服饰</h5></li>
            <li @click="chooseType('203')" :class="[payType == 203 ? 'active': '']"><i class="iconfont fabook-jiaotong"></i><h5>交通</h5></li>
            <li @click="chooseType('204')" :class="[payType == 204 ? 'active': '']"><i class="iconfont fabook-yule"></i><h5>娱乐</h5></li>
            <li @click="chooseType('205')" :class="[payType == 205 ? 'active': '']"><i class="iconfont fabook-shejiao"></i><h5>社交</h5></li>
          </ul>
        </transition>
        <transition name="opacity-fade">
          <ul v-show="accountPay" class="chooseTypeArea" style="top: 7rem">
            <li @click="chooseType('206')" :class="[payType == 206 ? 'active': '']"><i class="iconfont fabook-jiaju"></i><h5>家居</h5></li>
            <li @click="chooseType('207')" :class="[payType == 207 ? 'active': '']"><i class="iconfont fabook-tongxun"></i><h5>通讯</h5></li>
            <li @click="chooseType('208')" :class="[payType == 208 ? 'active': '']"><i class="iconfont fabook-shouye"></i><h5>美容</h5></li>
            <li @click="chooseType('209')" :class="[payType == 209 ? 'active': '']"><i class="iconfont fabook-yundong"></i><h5>运动</h5></li>
            <li @click="chooseType('210')" :class="[payType == 210 ? 'active': '']"><i class="iconfont fabook-yiliao"></i><h5>医疗</h5></li>
          </ul>
        </transition>
        <transition name="opacity-fade">
          <ul v-show="accountPay" class="chooseTypeArea" style="top: 11rem">
            <li @click="chooseType('211')" :class="[payType == 211 ? 'active': '']"><i class="iconfont fabook-xuexi"></i><h5>学习</h5></li>
            <li @click="chooseType('212')" :class="[payType == 212 ? 'active': '']"><i class="iconfont fabook-licai"></i><h5>理财</h5></li>
            <li @click="chooseType('213')" :class="[payType == 213 ? 'active': '']"><i class="iconfont fabook-chongwu"></i><h5>宠物</h5></li>
            <li @click="chooseType('299')" :class="[payType == 299 ? 'active': '']"><i class="iconfont fabook-qita"></i><h5>其他</h5></li>
          </ul>
        </transition>
        <transition name="opacity-fade">
          <ul v-show="!accountPay" class="chooseTypeArea">
            <li @click="chooseType('101')" :class="[incomeType == 101 ? 'active': '']"><i class="iconfont fabook-gongzi"></i><h5>工资</h5></li>
            <li @click="chooseType('102')" :class="[incomeType == 102 ? 'active': '']"><i class="iconfont fabook-jianzhi"></i><h5>兼职</h5></li>
            <li @click="chooseType('103')" :class="[incomeType == 103 ? 'active': '']"><i class="iconfont fabook-licaishouyi"></i><h5>理财收益</h5></li>
            <li @click="chooseType('104')" :class="[incomeType == 104 ? 'active': '']"><i class="iconfont fabook-red-packet_icon"></i><h5>人情</h5></li>
            <li @click="chooseType('199')" :class="[incomeType == 199 ? 'active': '']"><i class="iconfont fabook-qita"></i><h5>其他</h5></li>
          </ul>
        </transition>
      </div>
      <div class="lineTab clearfix">
        <span class="fl">记录备注 :</span><textarea name="remark" cols="30" rows="10" placeholder="限制100字以内" v-model="accountRemark" @input="checkUnderHundred" @blur="closeError"></textarea>
        <h6 v-show="remarkError" class="remark">备注不能超过100个字！</h6>
      </div>
      <div class="lineTab clearfix">
        <span class="fl">记录金额 :</span><input type="text" name="accountAmount" placeholder="单位：人民币" v-model="accountAmount" oninput="if(value.length > 14) value=value.slice(0,14)" />
      </div>
      <div class="lineTab clearfix">
        <span class="fl">记录时间 :</span><input type="text" name="accountDate" v-model="accountDate" @focus="showCalendar" readonly=true width="auto"/>
        <transition name="opacity-fade">
          <Calendar v-on:choseDay="clickDay" isHideOtherday=false v-show="isCalendarShow"></Calendar>
        </transition>
      </div>
      <div class="lineTab clearfix">
        <!--暂不开放预览功能-->
        <!--<button class="fl"><i class="iconfont fabook-yulan"></i>预览</button>-->
        <button class="fl" @click="saveNewAccount"><i class="iconfont fabook-right-1"></i>保存</button>
      </div>
      <toast-msg :msg="toastMsg" ref="toastMsg"></toast-msg>
    </div>
  </div>
</template>

<script>
import eventBus from '@/components/common/eventBus.js'
import toastMsg from '@/components/common/message/toastMsg'
export default {
  data () {
    return {
      accountPay: true,
      accountTitle: '',
      titleError: false,
      payType: 201,
      incomeType: 101,
      accountRemark: '',
      remarkError: false,
      accountDate: '',
      isCalendarShow: false,
      accountAmount: '',
      toastMsg: ''
    }
  },
  components: {
    toastMsg
  },
  mounted () {
    let myDate = new Date()
    let dealData = myDate.getFullYear() + '/' + (myDate.getMonth() + 1) + '/' + myDate.getDate()
    this.accountDate = this.dealDateInfo(dealData)
  },
  methods: {
    closeNewAccount: function () {
      let data = {closeType: 'slide-down'}
      eventBus.$emit('closeNewAccount', data)
    },
    changeAccountPay: function (index) {
      this.accountPay = index
    },
    checkUnderFifteen: function () {
      if (this.accountTitle.length > 15) {
        this.accountTitle = this.accountTitle.substr(0, 15)
        this.titleError = true
      }
    },
    checkUnderHundred: function () {
      if (this.accountRemark.length > 100) {
        this.accountRemark = this.accountRemark.substr(0, 100)
        this.remarkError = true
      }
    },
    closeError: function () {
      this.titleError = false
      this.remarkError = false
    },
    chooseType: function (index) {
      if (this.accountPay) {
        this.payType = index
      } else {
        this.incomeType = index
      }
    },
    showCalendar: function () {
      this.isCalendarShow = true
    },
    clickDay: function (data) {
      console.log(this.dealDateInfo(data))// 选中某天
      this.accountDate = this.dealDateInfo(data)
      this.isCalendarShow = false
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
    },
    saveNewAccount: function () {
      if (this.accountTitle === '') {
        this.toastMsg = '标题不能为空！'
        this.$refs.toastMsg.openToast()
        return
      } else if (this.accountAmount === '') {
        this.toastMsg = '金额不能为空！'
        this.$refs.toastMsg.openToast()
        return
      }
      if (!this.remarkError && !this.titleError) {
        let params = {}
        params.title = this.accountTitle
        params.isPay = Number(this.accountPay)
        if (this.accountPay) params.type = this.payType
        if (!this.accountPay) params.type = this.incomeType
        params.amount = this.accountAmount
        params.time = this.accountDate
        params.remark = this.accountRemark
        params.id = this.memeryData.userInfo.userId
        params.name = this.memeryData.userInfo.username
        params.family = this.memeryData.userInfo.familyId
        let _this = this
        this.$http.post(this.memeryData.serverUrl + '/account/newAccount', params, {emulateJSON: true}).then(function (response) {
          if (response.body.msg === 'success') {
            _this.toastMsg = '新增记录成功！'
            _this.$refs.toastMsg.openToast()
            setTimeout(function () {
              _this.closeNewAccount()
            }, 1000)
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
  },
  beforeDestroy () {
    eventBus.$off('closeNewAccount')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../../../style/cssConfig.scss';
  header{
    height: $headerHeight;
    width: 100%;
    line-height: $headerHeight;
    border-bottom: 1px solid $defaultLightGray;
    margin-bottom: 1rem;
    i{
      font-size: 1.2rem;
      margin-left: .5rem;
      color: $defaultBlue;
    }
    p{
      display: inline-block;
      margin-left: .5rem;
    }
  }
  .newAccountArea{
    .lineTab{
      width: 100%;
      position: relative;
        &.pay{
          height: 15rem;
        }
        &.income {
          height: 7rem;
        }
      span,p{
        padding: .8rem 1rem;
        color: $defaultBlue;
      }
      input{
        margin: .8rem 0;
        height: 1.5rem;
        font-size: .9rem;
        border: 1px solid $defaultLightGray;
        width: calc( 100% - 8rem);
        padding: .5rem;
        border-radius: .5rem;
      }
      textarea{
        margin: 0 1rem;
        height: 7.5rem;
        font-size: .9rem;
        border: 1px solid $defaultLightGray;
        width: calc( 100% - 2rem);
        padding: .5rem;
        border-radius: .5rem;
      }
      h6{
        color: $defaultRed;
        position: absolute;
        left: 7rem;
        &.title{
          top: 2.5rem;
        }
        &.remark{
          top: 1.2rem;
        }
      }
      .chooseBtn{
        padding: .2rem .5rem;
        margin: .5rem .5rem;
        border: 1px solid $defaultLightGray;
        border-radius: .5rem;
        &.active{
          color: $defaultBlue;
          border: 1px solid $defaultBlue;
        }
      }
      .chooseTypeArea{
        width: 100%;
        position: absolute;
        li{
          width: 16%;
          text-align: center;
          padding: .2rem 0;
          margin: .3rem 2%;
          float: left;
          &.active{
            margin: .2rem 2%;
            border: 1px solid $defaultBlue;
            border-radius: 1rem;
            i,h5{
              color: $defaultBlue
            }
          }
          i.iconfont{
            font-size: 1.5rem;
            &.fabook-chongwu{
              font-size: 1.85rem;
              line-height: 1.5rem;
            }
          }
          h5{
            font-size: .9rem;
          }
        }
      }
      button{
        width: 70%;
        height: 3rem;
        border-radius: .5rem;
        margin: 1rem 15%;
        font-size: 1rem;
        background: $defaultBlue;
        color: #fff;
        i{
          font-size: 1.5rem;
          margin-right: .5rem;
          color: #fff;
        }
      }
    }
  }
</style>
