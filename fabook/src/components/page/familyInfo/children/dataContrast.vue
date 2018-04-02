<template>
  <div>
    <com-head :menuType="headType" :leftBtnClick="leftBtnClick"></com-head>
      <p>{{firstTitle}}</p>
      <div class="echartsArea">
        <echart-pie :echartData="echartData1"></echart-pie>
      </div>
      <p>
        {{timeType}}总收入为：{{sumIncome}}
        <br />
        总收入相比上月变化为：{{incomeChange}}
        <br />
        <br />
        {{timeType}}总支出为：{{sumPay}}
        <br />
        总支出相比上月变化为：{{payChange}}
      </p>
      <div class="echartsArea2" v-if="dateType == 0">
        <echart-bar-week :echartData="echartData2"></echart-bar-week>
      </div>
      <div class="echartsArea2" v-if="dateType == 1">
        <echart-bar :echartData="echartData2"></echart-bar>
      </div>
      <div class="echartsArea2" v-if="dateType == 2">
        <echart-bar-quarter :echartData="echartData2"></echart-bar-quarter>
      </div>
  </div>
</template>

<script>
import comHead from '@/components/common/comHead/commonHead'
import echartPie from '@/components/common/echarts-pie/echartsPieContrast'
import echartBar from '@/components/common/echarts-bar/echartsBar'
import echartBarWeek from '@/components/common/echarts-bar/echartsBarWeek'
import echartBarQuarter from '@/components/common/echarts-bar/echartsBarQuarter'
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
      payChange: '100%',
      incomeChange: '100%',
      sumIncome: 3000,
      sumPay: 1000,
      timeType: ''
    }
  },
  components: {
    comHead,
    echartPie,
    echartBar,
    echartBarWeek,
    echartBarQuarter
  },
  mounted () {
    if (this.$route.params.type === 'week') {
      this.dateType = 0
      this.headType.title = ['周度对比']
      this.firstTitle = '本周各类花销占比'
      this.timeType = '本周'
    } else if (this.$route.params.type === 'month') {
      this.dateType = 1
      this.headType.title = ['月度对比']
      this.firstTitle = '本月各类花销占比'
      this.timeType = '本月'
    } else if (this.$route.params.type === 'quarter') {
      this.dateType = 2
      this.headType.title = ['季度对比']
      this.firstTitle = '本季度各类花销占比'
      this.timeType = '本季度'
    }
  },
  methods: {
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
