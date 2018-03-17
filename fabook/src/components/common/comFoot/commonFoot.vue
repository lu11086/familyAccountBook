<template>
  <div>
    <transition :name="slideType">
      <new-account v-show="activeTab == 2" class="newAccount" ></new-account>
    </transition>
    <footer>
      <ul class="clearfix">
        <li class="fl"><i class="iconfont fabook-tijianbaogaochaxun" :class="[activeTab == 0 ? 'active animation_jumpShow':'']" @click="changeFooterTab(0)"></i></li>
        <li class="fl"><i class="iconfont fabook-liebiao" :class="[activeTab == 1 ? 'active animation_jumpShow':'']" @click="changeFooterTab(1)"></i></li>
        <li class="fl"><i class="iconfont fabook-xinzeng" :class="[activeTab == 2 ? 'active':'']" @click="changeFooterTab(2)"></i></li>
        <li class="fl"><i class="iconfont fabook-jiankangguanli" :class="[activeTab == 3 ? 'active animation_jumpShow':'']" @click="changeFooterTab(3)"></i></li>
        <li class="fl"><i class="iconfont" :class="[activeTab == 4 ? 'active animation_jumpShow':'',memeryData.userInfo.sexNumber == 1 ? 'fabook-nvxing' : 'fabook-nanxing']" @click="changeFooterTab(4)"></i></li>
      </ul>
    </footer>
  </div>
</template>

<script>
import newAccount from '@/components/page/newAccount/newAccount'
import eventBus from '@/components/common/eventBus.js'
export default {
  data () {
    return {
      activeTab: 0,
      oldTab: 0,
      slideType: 'slide-up'
    }
  },
  props: {
    footerTab: {
      type: Number,
      default: 0
    }
  },
  components: {
    newAccount
  },
  mounted () {
    this.activeTab = this.footerTab
    let _this = this
    eventBus.$on('closeNewAccount', function (data) {
      if (data.closeType === 'slide-down') _this.changeFooterTab(2)
    })
  },
  methods: {
    changeFooterTab ($index) {
      if (this.activeTab !== $index) {
        this.oldTab = this.activeTab
        this.activeTab = $index
      } else {
        if ($index === 2) {
          this.activeTab = this.oldTab
          this.$set(this.$data, 'slideType', 'slide-down')
          let _this = this
          setTimeout(function () {
            _this.$set(_this.$data, 'slideType', 'slide-up')
          }, 350)
        }
      }
      this.changPage(this.activeTab)
    },
    changPage ($index) {
      if ($index === 0) this.$router.push('/index')
      if ($index === 1) this.$router.push('/accountList')
      if ($index === 3) this.$router.push('/familyInfo')
      if ($index === 4) this.$router.push('/userSetting')
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
  .newAccount{
    min-height: 100vh;
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    background: #fff;
    transition: all .3s ease;
    padding-bottom: $footerHeight;
  }
</style>
