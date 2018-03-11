<template>
  <div :id="echartData.id" :style="echartData.style" ref="myEchart"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      chart: null
    }
  },
  props: {
    echartData: {
      type: Object,
      default: function () {
        return {
        }
      }
    }
  },
  mounted () {
    this.initChart()
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart () {
      if (this.echartData.style === undefined) {
        this.$refs.myEchart.style.height = this.$refs.myEchart.parentNode.clientHeight + 'px'
        this.$refs.myEchart.style.width = this.$refs.myEchart.parentNode.clientWidth + 'px'
      }
      this.chart = echarts.init(this.$refs.myEchart)
      this.chart.setOption({
        title: {
          text: '月度账单对比'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['2018年2月', '2018年3月'],
          top: 25,
          right: 20
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['服装', '饰品', '路费', '水电费', '食品食物']
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        series: [
          {
            name: '2018年2月',
            type: 'bar',
            data: [182, 234, 290, 1049, 1317]
          },
          {
            name: '2018年3月',
            type: 'bar',
            data: [335, 310, 234, 135, 1548]
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../style/cssConfig.scss';
</style>
