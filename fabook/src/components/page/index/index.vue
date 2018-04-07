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
            <p class="textCenter"><span>2562</span>元</p>
            <p>花销最大的类型为：</p>
            <p class="textCenter"><span>食品餐饮</span>：<span>60.42%</span></p>
          </div>
          <div class="halfWidth fl echartsArea">
            <echart-pie :echartData="echartData1"></echart-pie>
          </div>
        </div>
        <div class="lineTab clearfix">
          <p class="outLine"><i class="outLine-warn fl"></i>距离消费红线还有<span class="outLine-warn">238</span>元的距离，请<span class="outLine-warn">谨慎</span>消费</p>
        </div>
        <div class="lineTab">
          <div class="echartsArea2">
            <echart-bar :echartData="echartData3"></echart-bar>
          </div>
        </div>
        <div class="lineTab clearfix">
          <div class="topList">
            <p class="topListTitle">本月单次消费金额-Top3:</p>
            <p class="clearfix">1.<span class="topTitle">同学聚会-吃饭K歌</span><span class="topPrice">-572</span></p>
            <p class="clearfix">2.<span class="topTitle">吃炫迈停不下来买了一箱子</span><span class="topPrice">-329</span></p>
            <p class="clearfix">3.<span class="topTitle">喝凉水塞了牙所以去拔牙了</span><span class="topPrice">-229</span></p>
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
            <p class="textCenter"><span>2562</span>元</p>
            <p>花销最大的类型为：</p>
            <p class="textCenter"><span>食品餐饮</span>：<span>60.42%</span></p>
          </div>
          <div class="halfWidth fl echartsArea">
            <echart-pie :echartData="echartData2"></echart-pie>
          </div>
        </div>
        <div class="lineTab clearfix">
          <p class="outLine"><i class="outLine-warn fl"></i>距离消费红线还有<span class="outLine-warn">238</span>元的距离，请<span class="outLine-warn">谨慎</span>消费</p>
        </div>
        <div class="lineTab">
          <div class="echartsArea2">
            <echart-bar :echartData="echartData4"></echart-bar>
          </div>
        </div>
        <div class="lineTab clearfix">
          <div class="topList">
            <p class="topListTitle">本月单次消费金额-Top3:</p>
            <p class="clearfix">1.<span class="topTitle">同学聚会-吃饭K歌</span><span class="topPrice">-572</span></p>
            <p class="clearfix">2.<span class="topTitle">吃炫迈停不下来买了一箱子</span><span class="topPrice">-329</span></p>
            <p class="clearfix">3.<span class="topTitle">喝凉水塞了牙所以去拔牙了</span><span class="topPrice">-229</span></p>
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
      toastMsg: '请先登录'
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
    this.$http.post(this.memeryData.serverUrl + '/users/login', {username: '18232251500', password: 'admin'}, {emulateJSON: true}).then(function (response) {
      console.log(response.body)
    }, function (response) {
      console.log(response)
    })
  },
  methods: {
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
