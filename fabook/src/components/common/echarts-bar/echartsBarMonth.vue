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
    if (this.echartData.style === undefined) {
      this.$refs.myEchart.style.height = this.$refs.myEchart.parentNode.clientHeight + 'px'
      this.$refs.myEchart.style.width = this.$refs.myEchart.parentNode.clientWidth + 'px'
    }
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    chartOption: function (legend, data, oldData) {
      this.chart = echarts.init(this.$refs.myEchart)
      this.chart.setOption({
        title: {
          text: '本月花销前五对比'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['上月', '本月'],
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
          data: legend
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        series: [
          {
            name: '上月',
            type: 'bar',
            data: oldData
          },
          {
            name: '本月',
            type: 'bar',
            data: data
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
