<template>
<header>
  <!--单标题-头部左侧-->
  <p class="leftHeader" v-if="menuType.lTitleType == 0">{{menuType.title[0]}}</p>
  <!--多标签-可切换头部左侧-->
  <ul class="leftHeader fl clearfix" v-if="menuType.lTitleType == 1">
    <li class="fl" v-for="(tabName, index) in menuType.title" v-text="tabName" :class="[index == leftTab ? 'active':'']" @click="changeLeftHeadTab(index)" :key="index"></li>
  </ul>
  <!--单按钮-头部右侧-->
  <button v-if="menuType.rButtonType == 0" class="rightHeader iconfont fabook-tianjiayonghu fr"></button>
  <button v-if="menuType.rButtonType == 1" class="rightHeader iconfont fabook-shaixuan fr"></button>
</header>
</template>

<script>
import eventBus from '@/components/common/eventBus.js'
export default {
  data () {
    return {
      leftTab: 0
    }
  },
  props: {
    menuType: {
      type: Object,
      default: function () {
        return {
          headType: {
            title: '', // 标题
            lTitleType: 0,
            rButtonType: 0
          }
        }
      },
      required: true// 代表属性必须填
    }
  },
  mounted () {
  },
  methods: {
    changeLeftHeadTab ($index) {
      this.leftTab = $index
      let data = {leftTab: $index}
      eventBus.$emit('changeLeftHeadTab', data)
    }
  },
  beforeDestroy () {
    eventBus.$off('changeLeftHeadTab')
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../style/cssConfig.scss';
  header{
    height: $headerHeight;
    width: 100%;
    line-height: $headerHeight - .5rem;
    padding-top: .2rem;
    background: $defaultBlue;
    position: fixed;
    top: 0;
    left: 0;
    .leftHeader{
      margin-left: 1rem;
      color: #fff;
    }
    p{
      display: inline-block;
    }
    ul{
      li{
        margin: 0 .5rem;
        color: #fff;
        &:first-child{
          margin-left: 0;
        }
        &.active{
          border-bottom: .2rem solid $defaultLightBlue;
        }
      }
    }
    .rightHeader{
      height: $headerHeight - .5rem;
      width: $headerHeight - .5rem;
      margin-right: .5rem;
      margin-top: .05rem;
      background: transparent;
      border: none;
      color: #fff;
      font-size: 1.4rem;
    }
  }
</style>
