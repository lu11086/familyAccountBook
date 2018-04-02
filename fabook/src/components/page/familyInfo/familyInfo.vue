<template>
  <div class="pageContent">
    <transition :name="transitionName">
      <router-view class="Router"></router-view>
    </transition>
    <com-head :menuType="headType"></com-head>
    <div class="pageTab noFamily" v-show="!memeryData.userInfo.familyId">
      <img src="@/assets/errorBG.jpg" />
      <h2>请组建或加入一个家庭组</h2>
      <h2>来使用家庭相关功能</h2>
    </div>
    <ul class="chooseTab clearfix" v-show="memeryData.userInfo.familyId">
      <li class="threePartTab fl" @click="toDataContrast('week')">
        <i class="iconfont fabook-benzhou"></i>
        <p>周度对比</p>
      </li>
      <li class="threePartTab fl" @click="toDataContrast('month')">
        <i class="iconfont fabook-benyue"></i>
        <p>月度对比</p>
      </li>
      <li class="threePartTab fl" @click="toDataContrast('quarter')">
        <i class="iconfont fabook-jidu"></i>
        <p>季度对比</p>
      </li>
      <li class="threePartTab fl" @click="toRedLine">
        <i class="iconfont fabook-linechart"></i>
        <p>家庭红线</p>
      </li>
      <li class="threePartTab fl" @click="toOtherPlan">
        <i class="iconfont fabook-toufangfangan"></i>
        <p>他人方案</p>
      </li>
      <li class="threePartTab fl" @click="toInterface">
        <i class="iconfont fabook-gengduo"></i>
        <p>更多功能</p>
      </li>
    </ul>
    <div class="familyNotice" v-show="memeryData.userInfo.familyId">
      <h1>家庭公告</h1>
      <p>本月花销过大，孩儿们注意着点花。以上。</p>
    </div>
    <toast-msg :msg="toastMsg" ref="toastMsg"></toast-msg>
    <com-foot :footerTab="3"></com-foot>
  </div>
</template>

<script>
import comHead from '@/components/common/comHead/commonHead'
import comFoot from '@/components/common/comFoot/commonFoot'
import eventBus from '@/components/common/eventBus.js'
import toastMsg from '@/components/common/message/toastMsg'
export default {
  data () {
    return {
      headType: {
        title: ['家庭圈'],
        lTitleType: 0,
        rButtonType: 4
      },
      transitionName: 'slide-right',
      toastMsg: ''
    }
  },
  components: {
    comHead,
    comFoot,
    toastMsg
  },
  beforeRouteUpdate (to, from, next) {
    if (this.$router.isBack) {
      this.transitionName = 'slide-right'
    } else {
      this.transitionName = 'slide-left'
    }
    this.$router.isBack = false
    setTimeout(function () { next() }, 50)
  },
  mounted () {
    let _this = this
    eventBus.$on('rightBtnClick', function (data) {
      if (_this.memeryData.isLogin) {
        _this.$router.push('/familyInfo/familyCtrl')
      } else {
        _this.toastMsg = '请先登录再使用家庭组管理功能！'
        _this.$refs.toastMsg.openToast()
      }
    })
  },
  methods: {
    toDataContrast: function (type) {
      this.$router.push('/familyInfo/contrast/' + type)
    },
    toRedLine: function () {
      this.$router.push('/familyInfo/redLine')
    },
    toOtherPlan: function () {
      this.$router.push('/familyInfo/otherPlan')
    },
    toInterface: function () {
      this.$router.push('/familyInfo/interface')
    }
  },
  beforeDestroy () {
    eventBus.$off('rightBtnClick')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../../../style/cssConfig.scss';
  .familyNotice{
    height: 10rem;
    margin: 1rem;
    border: 1px solid $defaultGray;
    border-radius: 1rem;
    background: $defaultLightBlue;
    padding: 0 .5rem;
    box-shadow: 0 0 1rem #369;
    h1{
      color: #fff;
      text-align: center;
      font-size: 1.2rem;
      font-weight: bold;
      line-height: 2rem;
      text-shadow: 0 0 .5rem $defaultBlue;
    }
    p{
      color: #fff;
      font-size: .9rem;
    }
  }
  .noFamily{
    img{
      width: 60%;
      border-radius: 100%;
      margin: 3rem 20%;
    }
    h2{
      text-align: center;
    }
  }
  ul.chooseTab{
    border-bottom: 1px solid $defaultBlue;
    border-radius: .5rem;
    li{
      &.threePartTab{
        width: 33.33%;
        height: 5rem;
        &:nth-child(3n){
          width: 33.34%;
        }
        i{
          width: 3rem;
          height: 3rem;
          font-size: 1.5rem;
          line-height: 3rem;
          text-align: center;
          margin: 0 auto;
          display: block;
          color: $defaultBlue;
          &.fabook-benyue{
            font-size: 1.4rem;
          }
          &.fabook-jidu{
            font-size: 2.1rem;
          }
          &.fabook-gengduo{
            font-weight: bold;
          }
        }
        p{
          font-size: .9rem;
          text-align: center;
          color: $defaultBlue;
        }
      }
    }
  }
</style>
