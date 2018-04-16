<template>
  <div class="pageContent">
    <transition :name="transitionName">
      <router-view class="Router"></router-view>
    </transition>
    <div v-show="isShowArea">
    <com-head :menuType="headType"></com-head>
    <transition name="leftTab">
      <div class="pageTab" v-show="showArea == 0">
        <div class="lineTab clearfix">
          <div class="halfWidth fl textArea">
            <p>本月已消费总额为：</p>
            <p class="textCenter"><span>{{singleSumPay}}</span>元</p>
            <p>花销最大的类型为：</p>
            <p class="textCenter"><span>{{singleMostType}}</span>：<span>{{singleMostPay}}%</span></p>
          </div>
          <div class="halfWidth fl echartsArea">
            <echart-pie :echartData="echartData1" ref="echartData1"></echart-pie>
          </div>
        </div>
        <div class="lineTab clearfix">
          <p class="outLine">
            <i class="fl" :class="[singleRedLineNum - singleSumPay > singleWarnLine ?'outLine-safe': 'outLine-warn']"></i>
            距离消费红线还有<span :class="[singleRedLineNum - singleSumPay > singleWarnLine ?'outLine-safe': 'outLine-warn']">{{singleRedLineNum - singleSumPay}}</span>元的距离，请<span :class="[singleRedLineNum - singleSumPay > singleWarnLine ?'outLine-safe': 'outLine-warn']" v-text="singleRedLineNum - singleSumPay > singleWarnLine ? '适度': '谨慎'"></span>消费</p>
        </div>
        <div class="lineTab">
          <div class="echartsArea2">
            <echart-bar :echartData="echartData3" ref="echartData3"></echart-bar>
          </div>
        </div>
        <div class="lineTab clearfix">
          <div class="topList">
            <p class="topListTitle">本月单次消费金额-Top3:</p>
            <p class="clearfix" v-for="(account, index) in singlePayList" :key="index">
              {{index+1}}.<span class="topTitle">{{account.title}}</span><span class="topPrice">-{{account.pay}}</span>
            </p>
          </div>
        </div>
      </div>
    </transition>
    <transition name="rightTab">
      <div class="pageTab noFamily" v-show="showArea == 1 && !memeryData.userInfo.familyId">
        <img src="@/assets/errorBG.jpg" />
        <h2>请组建或加入一个家庭组</h2>
        <h2>来使用家庭相关功能</h2>
      </div>
    </transition>
    <transition name="rightTab">
      <div class="pageTab" v-show="showArea == 1 && memeryData.userInfo.familyId">
        <div class="lineTab clearfix">
          <div class="halfWidth fl textArea">
            <p>本月已消费总额为：</p>
            <p class="textCenter"><span>{{familySumPay}}</span>元</p>
            <p>花销最大的类型为：</p>
            <p class="textCenter"><span>{{mostType}}</span>：<span>{{mostPay}}%</span></p>
          </div>
          <div class="halfWidth fl echartsArea">
            <echart-pie :echartData="echartData2" ref="echartData2"></echart-pie>
          </div>
        </div>
        <div class="lineTab clearfix">
          <p class="outLine">
            <i class="fl" :class="[redLineNum - familySumPay > warnLine ?'outLine-safe': 'outLine-warn']"></i>
            距离消费红线还有<span :class="[redLineNum - familySumPay > warnLine ?'outLine-safe': 'outLine-warn']">{{redLineNum - familySumPay}}</span>元的距离，请<span :class="[redLineNum - familySumPay > warnLine ?'outLine-safe': 'outLine-warn']" v-text="redLineNum - familySumPay > warnLine ? '适度': '谨慎'"></span>消费</p>
        </div>
        <div class="lineTab">
          <div class="echartsArea2">
            <echart-bar :echartData="echartData4" ref="echartData4"></echart-bar>
          </div>
        </div>
        <div class="lineTab clearfix">
          <div class="topList">
            <p class="topListTitle">本月单次消费金额-Top3:</p>
            <p class="clearfix" v-for="(account, index) in payList" :key="index">
              {{index+1}}.<span class="topTitle">{{account.title}}</span><span class="topPrice">-{{account.pay}}</span>
            </p>
          </div>
        </div>
      </div>
    </transition>
    <toast-msg :msg="toastMsg" ref="toastMsg"></toast-msg>
    <com-foot :footerTab="0"></com-foot>
    </div>
  </div>
</template>

<script>
import comHead from '@/components/common/comHead/commonHead'
import comFoot from '@/components/common/comFoot/commonFoot'
import echartPie from '@/components/common/echarts-pie/echartsPie'
import echartBar from '@/components/common/echarts-bar/echartsBar'
import eventBus from '@/components/common/eventBus.js'
import toastMsg from '@/components/common/message/toastMsg'
import dealDate from '@/components/common/dealDateInfo'
import dealType from '@/components/common/dealPayType'
export default {
  data () {
    return {
      headType: {
        title: ['个人', '家庭'],
        lTitleType: 1,
        rButtonType: 1
      },
      transitionName: 'slide-right',
      echartData1: {
        id: 'single-pie'
      },
      echartData3: {
        id: 'single-bar'
      },
      echartData2: {
        id: 'family-pie',
        style: {
          height: '10rem',
          width: this.memeryData.screenWidth / 2 + 'px'
        }
      },
      echartData4: {
        id: 'family-bar',
        style: {
          height: '15rem',
          width: this.memeryData.screenWidth - this.memeryData.remStyle + 'px'
        }
      },
      showArea: 0,
      isShowArea: true,
      toastMsg: '请先登录',
      familySumPay: 0,
      mostType: '',
      mostPay: '',
      redLineNum: 0,
      warnLine: 0,
      payList: [],
      singleSumPay: 0,
      singleMostType: '',
      singleMostPay: '',
      singleRedLineNum: 0,
      singleWarnLine: 0,
      singlePayList: []
    }
  },
  beforeRouteUpdate (to, from, next) {
    let _this = this
    if (this.$router.isBack) {
      this.transitionName = 'slide-right'
      this.isShowArea = true
    } else {
      this.transitionName = 'slide-left'
      setTimeout(function () { _this.isShowArea = false }, 550)
    }
    this.$router.isBack = false
    setTimeout(function () { next() }, 50)
  },
  components: {
    comHead,
    comFoot,
    echartPie,
    echartBar,
    toastMsg
  },
  mounted () {
    let _this = this
    eventBus.$on('changeLeftHeadTab', function (data) {
      _this.$set(_this.$data, 'showArea', data.leftTab)
    })
    eventBus.$on('rightBtnClick', function (data) {
      if (_this.memeryData.isLogin) {
        if (_this.memeryData.userInfo.familyId != null) {
          _this.toastMsg = '本账号已加入家庭组！'
          _this.$refs.toastMsg.openToast()
        } else {
          _this.$router.push('/index/createFamily')
        }
      } else {
        _this.toastMsg = '请先登录再使用新建家庭组功能！'
        _this.$refs.toastMsg.openToast()
      }
    })
    if (!this.memeryData.isLogin) this.dealSingleInfo()
    if (this.memeryData.isLogin) this.userInfo()
    if (this.memeryData.userInfo.familyId != null) this.familyPost()
  },
  methods: {
    userInfo: function () {
      let params = {}
      params.id = this.memeryData.userInfo.userId
      params.month = dealDate.getMonthStartDate()
      let _this = this
      this.$http.post(this.memeryData.serverUrl + '/index/getSingleData', params, {emulateJSON: true}).then(function (response) {
        if (response.body.msg === 'success') {
          let data = response.body.data
          localStorage.setItem('singleInfo', JSON.stringify(data))
          _this.dealSingleInfo()
        } else {
          _this.toastMsg = response.body.msgText
          _this.$refs.toastMsg.openToast()
        }
      }, function (response) {
        _this.toastMsg = '创建失败，请联系管理员！'
        _this.$refs.toastMsg.openToast()
        console.log(response)
      })
    },
    dealSingleInfo: function () {
      let newList
      let singleList
      if (localStorage.getItem('newAccount')) newList = JSON.parse(localStorage.getItem('newAccount'))
      if (localStorage.getItem('singleInfo')) singleList = JSON.parse(localStorage.getItem('singleInfo'))
      if (localStorage.getItem('newAccount')) {
        for (let i in newList) {
          singleList.push(newList[i])
        }
      }
      this.singleSumPay = 0
      let singleMost = {}
      let sumIncome = 0
      let payList = {}
      for (let i in singleList) {
        this.singleSumPay += parseFloat(singleList[i].fabook_account_pay)
        sumIncome += parseFloat(singleList[i].fabook_account_income)
        if (singleMost[singleList[i].fabook_account_type]) {
          singleMost[singleList[i].fabook_account_type] += parseFloat(singleList[i].fabook_account_pay)
        } else {
          singleMost[singleList[i].fabook_account_type] = parseFloat(singleList[i].fabook_account_pay)
        }
        payList[i] = {'title': singleList[i].fabook_account_title, 'pay': singleList[i].fabook_account_pay, 'hasPush': false}
      }
      let echartDataList = []
      let mostArr = []
      for (let i in singleMost) mostArr.push(singleMost[i])
      let afterArr = this.sortarr(mostArr)
      for (let i = 0; i < 5; i++) {
        for (let j in singleMost) {
          if (singleMost[j] === afterArr[i]) {
            if (singleMost[j] === afterArr[0]) {
              this.singleMostType = dealType.returnType(j)
            }
            echartDataList.push({'pay': singleMost[j], 'type': j})
            singleMost[j] = -1
          }
        }
      }
      if (this.singleSumPay > 0) this.singleMostPay = parseFloat(afterArr[0] / this.singleSumPay * 100).toFixed(2)
      if (this.memeryData.userInfo.redLine.indexOf('%')) {
        this.singleRedLineNum = parseInt(this.memeryData.userInfo.redLine.split('%')[0]) / 100 * sumIncome
      } else {
        this.singleRedLineNum = parseInt(this.memeryData.userInfo.redLine)
      }
      this.singleWarnLine = sumIncome * 0.2
      mostArr = afterArr = []
      for (let i in payList) mostArr.push(parseFloat(payList[i].pay))
      afterArr = this.sortarr(mostArr)
      this.singlePayList = []
      for (let i = 0; i < 3; i++) {
        for (let j in payList) {
          if (parseFloat(payList[j].pay) === afterArr[i]) {
            if (!payList[j].hasPush) {
              this.singlePayList.push(payList[j])
              payList[j].hasPush = true
            }
          }
        }
      }
      this.dealPieData(echartDataList, 'single')
      this.dealBarData(echartDataList, 'single')
    },
    sortarr: function (arr) {
      for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
          if (arr[j] < arr[j + 1]) {
            let temp = arr[j]
            arr[j] = arr[j + 1]
            arr[j + 1] = temp
          }
        }
      }
      return arr
    },
    familyPost: function () {
      let params = {}
      params.id = this.memeryData.userInfo.familyId
      params.month = dealDate.getMonthStartDate()
      let _this = this
      this.$http.post(this.memeryData.serverUrl + '/index/getFamilyData', params, {emulateJSON: true}).then(function (response) {
        if (response.body.msg === 'success') {
          let data = response.body.data
          _this.familySumPay = data.sumPay
          _this.mostType = dealType.returnType(data.echartDataList[0].type)
          if (data.sumPay) _this.mostPay = parseFloat(data.echartDataList[0].pay / data.sumPay * 100).toFixed(2)
          if (_this.memeryData.userInfo.redLine.indexOf('%')) {
            _this.redLineNum = parseInt(_this.memeryData.userInfo.redLine.split('%')[0]) / 100 * data.sumIncome
          } else {
            _this.redLineNum = parseInt(_this.memeryData.userInfo.redLine)
          }
          _this.warnLine = data.sumIncome * 0.2
          _this.payList = data.payList
          _this.dealPieData(data.echartDataList, 'family')
          _this.dealBarData(data.echartDataList, 'family')
        } else {
          _this.toastMsg = response.body.msgText
          _this.$refs.toastMsg.openToast()
        }
      }, function (response) {
        _this.toastMsg = '创建失败，请联系管理员！'
        _this.$refs.toastMsg.openToast()
        console.log(response)
      })
    },
    dealPieData: function (pieData, type) {
      let legend = []
      let data = []
      for (let i in pieData) {
        legend.push(dealType.returnType(pieData[i].type))
        data[i] = {value: pieData[i].pay, name: dealType.returnType(pieData[i].type)}
      }
      if (type === 'single') this.$refs.echartData1.chartOption(legend, data)
      if (type === 'family') this.$refs.echartData2.chartOption(legend, data)
    },
    dealBarData: function (barData, type) {
      let legend = []
      let data = []
      for (let i in barData) {
        legend.push(dealType.returnType(barData[i].type))
        data.push(barData[i].pay)
      }
      if (type === 'single') this.$refs.echartData3.chartOption(legend, data)
      if (type === 'family') this.$refs.echartData4.chartOption(legend, data)
    }
  },
  beforeDestroy () {
    eventBus.$off('changeLeftHeadTab')
    eventBus.$off('rightBtnClick')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../../../style/cssConfig.scss';
  .pageTab{
    overflow: hidden;
    width: 100%;
    position: relative;
    .lineTab{
      width: 100%;
      .textArea{
        padding: 1rem;
      }
      .topList{
        line-height: 1.5rem;
        p{
          color: $defaultGreen;
          border-bottom: 1px solid $defaultLightGray;
          &.topListTitle{
            padding: .5rem 1rem;
            border-top: 1px solid $defaultLightGray;
          }
          &.clearfix{
            padding: .25rem 1rem;
          }
        }
        span{
          font-size: .9rem;
          &.topTitle{
            padding-left: .5rem;
          }
          &.topPrice{
             float: right;
           }
        }
      }
      .outLine{
        font-size: .9rem;
        padding: .5rem 1rem;
        text-align: center;
        border-radius: .5rem;
        border: 1px solid $defaultGray;
        i{
          height: 1rem;
          width: 1rem;
          border-radius: 100%;
          display: inline-block;
          margin-top: .1rem;
          &.outLine-warn{
            background: $defaultRed;
          }
          &.outLine-safe{
            background: $defaultGreen;
          }
        }
        span{
          &.outLine-warn{
            color: $defaultRed;
          }
          &.outLine-safe{
            color: $defaultGreen;
          }
        }
      }
      .halfWidth{
        width: 50%;
          p{
            line-height: 2rem;
            &.textCenter{
              font-size: .9rem;
              text-align: center;
            }
          }
      }
      .echartsArea{
        height: 10rem
      }
      .echartsArea2{
        width: calc( 100% - 1rem );
        height: 15rem;
        margin: 1.5rem .5rem;
      }
    }
    &.noFamily{
      img{
        width: 60%;
        border-radius: 100%;
        margin: 3rem 20%;
      }
      h2{
        text-align: center;
      }
    }
  }
  .hideIt{
    visibility: hidden;
    position: fixed;
    z-index: -1;
  }
  .leftTab-enter-active, .leftTab-leave-active {
    position: fixed;
    transform: translate3d(0, 0, 0);
    transition: all .5s;
  }
  .leftTab-enter, .leftTab-leave-active {
    transform: translate3d(-100%, 0, 0);
    transition: all .5s;
  }
  .rightTab-enter-active, .rightTab-leave-active {
    position: fixed;
    transform: translate3d(0, 0, 0);
    transition: all .5s;
   }
  .rightTab-enter, .rightTab-leave-active {
    transform: translate3d(100%, 0, 0);
    transition: all .5s;
  }
</style>
