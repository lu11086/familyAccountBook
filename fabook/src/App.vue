<template>
  <div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
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
.router-fade-enter-active, .router-fade-leave-active {
  transition: opacity .3s;
}
.router-fade-enter, .router-fade-leave-active {
  opacity: 0;
}
</style>
