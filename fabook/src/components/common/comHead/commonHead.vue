<template>
<header>
  <!--单标题-头部左侧-->
  <p class="leftHeader" v-if="menuType.lTitleType == 0">{{menuType.title[0]}}</p>
  <!--多标签-可切换头部左侧-->
  <ul class="leftHeader fl clearfix" v-if="menuType.lTitleType == 1">
    <li class="fl" v-for="(tabName, index) in menuType.title" v-text="tabName" :class="[index == leftTab ? 'active':'']" @click="changeLeftHeadTab(index)" :key="index"></li>
  </ul>
  <!--左侧标签为后退按钮的-->
  <div v-if="menuType.lTitleType == 2" class="leftHeader iconfont fabook-guanbi fl backIcon" @click="leftBtnClick"></div>
  <p class="leftHeader typeCenter fl" v-if="menuType.lTitleType > 1" :style="'margin-left:' + memeryData.headerLeft + 'px'">{{menuType.title[0]}}</p>
  <!--单按钮-头部右侧-->
  <div v-if="menuType.rButtonType == 1" class="rightHeader iconfont fabook-tianjiayonghu fr" @click="rightBtnClick"></div>
  <div v-if="menuType.rButtonType == 2" class="rightHeader iconfont fabook-shaixuan fr" @click="rightBtnClick"></div>
  <div v-if="menuType.rButtonType == 4" class="rightHeader iconfont fabook-renyuanguanli fr" @click="rightBtnClick"></div>
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
    },
    leftBtnClick: {
      type: Function,
      default: function () {
        this.$router.goBack()
      }
    },
    rightBtnClick: {
      type: Function,
      default: function () {
        eventBus.$emit('rightBtnClick', 'click')
      }
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
    eventBus.$off('rightBtnClick')
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
    z-index: 8;
    .leftHeader{
      margin-left: 1rem;
      color: #fff;
      &.backIcon{
        font-size: 1.2rem;
        line-height: $headerHeight - .3rem;
      }
      &.typeCenter{
        font-size: 1.1rem;
        line-height: $headerHeight - .3rem;
        text-align: center;
      }
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
