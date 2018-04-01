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
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: ['服装', '饰品', '路费', '水电费', '食品食物']
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
            data: [
              {value: 335, name: '服装'},
              {value: 310, name: '饰品'},
              {value: 234, name: '路费'},
              {value: 135, name: '水电费'},
              {value: 1548, name: '食品食物'}
            ]
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
