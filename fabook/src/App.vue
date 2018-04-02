<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import $context from '../config/context.js'
export default {
  name: 'family-account-book-Area',
  data () {
    return {
    }
  },
  beforeCreate () {
    var html = document.documentElement
    var windowWidth = html.clientWidth
    if (windowWidth / 22.5 > 17) {
      html.style.fontSize = 17 + 'px'
      this.memeryData.remStyle = 17
    } else {
      html.style.fontSize = windowWidth / 22.5 + 'px'
      this.memeryData.remStyle = windowWidth / 22.5
    }
    this.memeryData.screenWidth = windowWidth
    this.memeryData.headerLeft = windowWidth / 2 - 4.5 * this.memeryData.remStyle
    this.memeryData.serverUrl = $context.serverUrl
    this.memeryData.userInfo = {}
    this.memeryData.userInfo.sexNumber = 0
    this.memeryData.userInfo.familyId = null
    this.memeryData.isLogin = false
    this.memeryData.isCloseNew = false

    // 测试用代码
    this.memeryData.isLogin = true
    this.memeryData.userInfo.username = '测试'
    this.memeryData.userInfo.tel = '18232251500'
    this.memeryData.userInfo.email = 'lu11086@qq.com'
    this.memeryData.userInfo.userId = '18218218182'
    this.memeryData.userInfo.sexNumber = 1
    this.memeryData.userInfo.familyId = '110'
  }
}
</script>

<style lang="scss">
@import './style/common';
@import './assets/iconfont/iconfont.css';
@import './style/cssConfig.scss';
.pageContent{
  padding-top: $headerHeight;
  padding-bottom: $footerHeight;
  min-height: 100vh;
}

.Router {
  position: absolute;
  width: 100%;
  transition: all .5s ease;
  top: 0;
  padding-top: $headerHeight;
  z-index: 11;
  min-height: 100vh;
  background: #fff;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate3d(100%, 0, 0);
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate3d(-100%, 0, 0);
  transform: translate3d(-100%, 0, 0);
}

.slide-up-enter,
.slide-down-leave-active {
  opacity: 0;
  -webkit-transform: translate3d(0, 2 * $headerHeight, 0);
  transform: translate3d(0, 2 * $headerHeight, 0);
}
.slide-up-leave-active,
.slide-down-enter {
  opacity: 0;
  -webkit-transform: translate3d(0, -2 * $headerHeight, 0);
  transform: translate3d(0, -2 * $headerHeight, 0);
}

.opacity-fade-enter-active, .opacity-fade-leave-active {
  transition: opacity .3s;
}
.opacity-fade-enter, .opacity-fade-leave-active {
  opacity: 0;
}

.wh_container .wh_content_all {
  background-color: $defaultBlue;
}
.wh_content_item div .wh_isToday {
  color: $defaultBlue;
}
.wh_content_item div, .wh_content_item div li {
   color: #fff;
}
.wh_container {
  width: 100%;
  margin: auto;
  position: absolute;
  bottom: 3rem;
}
</style>
