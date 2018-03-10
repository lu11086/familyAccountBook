<template>
  <div class="pageContent">
    <com-head :menuType="headType"></com-head>
    <transition name="leftTab">
      <div class="pageTab" v-show="showArea == 0">
        <div class="lineTab clearfix">
          <div class="halfWidth fl textArea">
            <p>本月已消费总额为：</p>
            <p></p>
          </div>
          <div class="halfWidth fl echartsArea">
            <echart-pie :echartData="echartData1"></echart-pie>
          </div>
        </div>
      </div>
    </transition>
    <transition name="rightTab">
      <div class="pageTab" v-show="showArea == 1">
        <div class="lineTab clearfix">
          <div class="halfWidth fl">
            <p>本月消费金额为：</p>
          </div>
          <div class="halfWidth fl echartsArea">
            <echart-pie :echartData="echartData2"></echart-pie>
          </div>
        </div>
      </div>
    </transition>
    <com-foot :footerTab="0"></com-foot>
  </div>
</template>

<script>
import comHead from '@/components/common/comHead/commonHead'
import comFoot from '@/components/common/comFoot/commonFoot'
import echartPie from '@/components/common/echarts-pie/echartsPie'
import eventBus from '@/components/common/eventBus.js'
export default {
  data () {
    return {
      headType: {
        title: ['个人', '家庭'],
        lTitleType: 1,
        rButtonType: 0
      },
      echartData1: {
        id: 'single-pie'
      },
      echartData2: {
        id: 'family-pie',
        style: {
          height: '10rem',
          width: this.memeryData.screenWidth / 2 + 'px'
        }
      },
      showArea: 0
    }
  },
  components: {
    comHead,
    comFoot,
    echartPie
  },
  mounted () {
    let _this = this
    eventBus.$on('changeLeftHeadTab', function (data) {
      _this.$set(_this.$data, 'showArea', data.leftTab)
    })
    this.$http.post('http://192.168.31.245:3000/index/singleData', {id: '1001'}, {emulateJSON: true}).then(function (response) {
      console.log(response.body)
    }, function (response) {
      console.log(response)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .pageTab{
    overflow: hidden;
    width: 100%;
    .lineTab{
      width: 100%;
      .halfWidth{
        width: 50%;
        &.textArea{
          padding: 1rem;
        }
      }
      .echartsArea{
        height: 10rem
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
