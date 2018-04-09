<template>
  <div>
    <com-head :menuType="headType" :leftBtnClick="leftBtnClick"></com-head>
      <p>{{firstTitle}}</p>
      <div class="echartsArea">
        <echart-pie :echartData="echartData1" ref="echartPie"></echart-pie>
      </div>
      <p>
        本{{timeType}}总收入为：{{sumIncome}}
        <br />
        <span v-show="incomeChange != 'zero'">总收入相比上{{timeType}}变化为：{{incomeChange}}</span>
        <br />
        <br />
        本{{timeType}}总支出为：{{sumPay}}
        <br />
        <span v-show="payChange != 'zero'">总支出相比上{{timeType}}变化为：{{payChange}}</span>
      </p>
      <div class="echartsArea2" v-if="dateType == 0">
        <echart-bar-week :echartData="echartData2" ref="echartBar"></echart-bar-week>
      </div>
      <div class="echartsArea2" v-if="dateType == 1">
        <echart-bar :echartData="echartData2" ref="echartBar"></echart-bar>
      </div>
      <div class="echartsArea2" v-if="dateType == 2">
        <echart-bar-quarter :echartData="echartData2" ref="echartBar"></echart-bar-quarter>
      </div>
    <toast-msg :msg="toastMsg" ref="toastMsg"></toast-msg>
  </div>
</template>

<script>
import comHead from '@/components/common/comHead/commonHead'
import echartPie from '@/components/common/echarts-pie/echartsPieContrast'
import echartBar from '@/components/common/echarts-bar/echartsBar'
import echartBarWeek from '@/components/common/echarts-bar/echartsBarWeek'
import echartBarQuarter from '@/components/common/echarts-bar/echartsBarQuarter'
import toastMsg from '@/components/common/message/toastMsg'
import dealDate from '@/components/common/dealDateInfo'
import dealType from '@/components/common/dealPayType'
export default {
  data () {
    return {
      headType: {
        title: ['数据对比'],
        lTitleType: 2,
        rButtonType: 0
      },
      echartData1: {
        id: 'single-pie',
        style: {
          height: '70vw',
          width: '100vw'
        }
      },
      echartData2: {
        id: 'single-bar',
        style: {
          height: '18rem',
          width: '90vw'
        }
      },
      dateType: 0,
      firstTitle: '',
      payChange: '',
      incomeChange: '',
      sumIncome: 0,
      sumPay: 0,
      timeType: '',
      toastMsg: '',
      params: {}
    }
  },
  components: {
    comHead,
    echartPie,
    echartBar,
    echartBarWeek,
    echartBarQuarter,
    toastMsg
  },
  mounted () {
    this.params.id = this.memeryData.userInfo.familyId
    if (this.$route.params.type === 'week') {
      this.dateType = 0
      this.headType.title = ['周度对比']
      this.firstTitle = '本周各类花销占比'
      this.timeType = '周'
      this.params.minD = dealDate.getWeekStartDate()
      this.params.oldDS = dealDate.getLastWeekStartDate()
      this.params.oldDE = dealDate.getLastWeekEndDate()
    } else if (this.$route.params.type === 'month') {
      this.dateType = 1
      this.headType.title = ['月度对比']
      this.firstTitle = '本月各类花销占比'
      this.timeType = '月'
      this.params.minD = dealDate.getMonthStartDate()
      this.params.oldDS = dealDate.getLastMonthStartDate()
      this.params.oldDE = dealDate.getLastMonthEndDate()
    } else if (this.$route.params.type === 'quarter') {
      this.dateType = 2
      this.headType.title = ['季度对比']
      this.firstTitle = '本季度各类花销占比'
      this.timeType = '季度'
      this.params.minD = dealDate.getQuarterStartDate()
      this.params.oldDS = dealDate.getLastQuarterStartDate()
      this.params.oldDE = dealDate.getLastQuarterEndDate()
    }
    this.queryAccountInfo()
  },
  methods: {
    leftBtnClick: function () {
      this.$router.goBack()
    },
    queryAccountInfo: function () {
      let _this = this
      this.$http.post(this.memeryData.serverUrl + '/account/getContrastData', this.params, {emulateJSON: true}).then(function (response) {
        if (response.body.msg === 'success') {
          let data = response.body.data
          _this.sumIncome = data.sumIncome
          _this.sumPay = data.sumPay
          if (data.oldIncome > 0) {
            _this.incomeChange = parseFloat(data.sumIncome / data.oldIncome * 100).toFixed(2) + '%'
          } else {
            _this.incomeChange = 'zero'
          }
          if (data.oldPay > 0) {
            _this.payChange = parseFloat(data.sumPay / data.oldPay * 100).toFixed(2) + '%'
          } else {
            _this.payChange = 'zero'
          }
          this.dealPieData(data.pieDataList)
          this.dealBarData(data.barDataList)
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
    dealPieData: function (pieData) {
      let legend = []
      let data = []
      for (let i in pieData) {
        legend.push(dealType.returnType(pieData[i].type))
        data[i] = {value: pieData[i].pay, name: dealType.returnType(pieData[i].type)}
      }
      this.$refs.echartPie.chartOption(legend, data)
    },
    dealBarData: function (barData) {
      let legend = []
      let data = []
      let oldData = []
      for (let i in barData) {
        legend.push(dealType.returnType(barData[i].type))
        data.push(barData[i].pay)
        if (barData[i].old) {
          oldData.push(barData[i].old)
        } else {
          oldData.push(0)
        }
      }
      this.$refs.echartBar.chartOption(legend, data, oldData)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../../../../style/cssConfig';
  p{
    text-align: center;
    line-height: 1.5rem;
    padding: 1rem 0;
  }
  .echartsArea{
    width: 100vw;
    height: 70vw;
  }
  .echartsArea2{
    width: 90vw;
    margin: 1rem 5vw;
    height: 18rem;
  }
</style>
