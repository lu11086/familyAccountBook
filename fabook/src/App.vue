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
    this.memeryData.userInfo.sexNumber = 0
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
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100% 0);
}

.opacity-fade-enter-active, .opacity-fade-leave-active {
  transition: opacity .3s;
}

.opacity-fade-enter, .opacity-fade-leave-active {
  opacity: 0;
}
</style>
