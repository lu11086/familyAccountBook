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
    chartOption: function (legend, data) {
      this.chart = echarts.init(this.$refs.myEchart)
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: legend
        },
        series: [
          {
            name: '支出情况',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '20',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
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
