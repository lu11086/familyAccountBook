<template>
<footer>
  <ul class="clearfix">
    <li class="fl"><i class="iconfont fabook-tijianbaogaochaxun" :class="[activeTab == 0 ? 'active animation_jumpShow':'']" @click="changeFooterTab(0)"></i></li>
    <li class="fl"><i class="iconfont fabook-liebiao" :class="[activeTab == 1 ? 'active animation_jumpShow':'']" @click="changeFooterTab(1)"></i></li>
    <li class="fl"><i class="iconfont fabook-xinzeng" :class="[activeTab == 2 ? 'active':'']" @click="changeFooterTab(2)"></i></li>
    <li class="fl"><i class="iconfont fabook-jiankangguanli" :class="[activeTab == 3 ? 'active animation_jumpShow':'']" @click="changeFooterTab(3)"></i></li>
    <li class="fl"><i class="iconfont fabook-nanxing" :class="[activeTab == 4 ? 'active animation_jumpShow':'']" @click="changeFooterTab(4)"></i></li>
  </ul>
</footer>
</template>

<script>
export default {
  data () {
    return {
      activeTab: 0,
      oldTab: 0
    }
  },
  props: {
    footerTab: {
      type: Number,
      default: 0
    }
  },
  mounted () {
    this.activeTab = this.footerTab
  },
  methods: {
    changeFooterTab ($index) {
      if (this.activeTab !== $index) {
        this.oldTab = this.activeTab
        this.activeTab = $index
      } else {
        if ($index === 2) {
          this.activeTab = this.oldTab
        }
      }
      this.changPage(this.activeTab)
    },
    changPage ($index) {
      if ($index === 0) window.location.href = window.location.origin + '#/index'
      if ($index === 1) window.location.href = window.location.origin + '#/accountList'
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../style/cssConfig.scss';
  footer{
    height: $footerHeight;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 10;
    ul{
      height: $footerHeight - .5rem;
      width: 100%;
      margin-top: .5rem;
      background: $defaultBlue;
      li{
        width: 20%;
        text-align: center;
        i{
          height: $footerHeight - .5rem;
          width: $footerHeight - .5rem;
          font-size: $footerHeight - 1rem;
          line-height: $footerHeight - .5rem;
          color: #aaa;
          &.active{
            color: #fff;
            text-shadow: 0 0 .5rem $defaultLightBlue;
          }
        }
        &:nth-child(3){
          margin-top: -.5rem;
          i{
            height: $footerHeight;
            width: $footerHeight;
            line-height: $footerHeight;
            font-size: $footerHeight - .2rem;
            border-radius: 100%;
            background: $defaultBlue;
            color: #fff;
            transition: all .5s;
            display: block;
            margin: 0 auto;
            &.active{
              transform: rotate(135deg);
            }
          }
        }
      }
    }
  }
</style>
