<template>
  <transition name="opacity-fade">
    <div class="clickArea" v-show="isShow">
      <div class="clickMsg" :style="customStyle">
        <p v-html="msg"></p>
        <div class="chooseBtn">
          <button @click="clickOk">确认</button>
          <button @click="clickCancel">取消</button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import eventBus from '@/components/common/eventBus.js'
export default {
  data () {
    return {
      isShow: false,
      timeOutFunc: null
    }
  },
  props: {
    msg: {
      type: String,
      default: ''
    },
    customStyle: {
      type: Object,
      default: function () {
        return {}
      }
    },
    clickOk: {
      type: Function,
      default: function () { eventBus.$emit('clickMsgOk', 'ok') }
    },
    clickCancel: {
      type: Function,
      default: function () { eventBus.$emit('clickMsgCancel', 'cancel') }
    }
  },
  methods: {
    openClick () {
      this.isShow = true
    },
    closeClick () {
      this.isShow = false
    }
  },
  beforeDestroy () {
    eventBus.$off('clickMsgOk')
    eventBus.$off('clickMsgCancel')
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../style/cssConfig';
  .clickArea{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    .clickMsg{
      width: 60%;
      height: 8rem;
      padding: .5rem 0;
      background: rgba(0,0,0,.7);
      margin: auto;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      border-radius: .5rem;
      text-align: center;
      p{
        font-size: 1rem;
        color: #fff;
        padding: 1rem;
      }
      .chooseBtn{
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 2rem;
        border-top: 1px solid #fff;
        button{
          width: 50%;
          float: left;
          height: 100%;
          background: transparent;
          color: #fff;
          font-size: 1rem;
          &:first-child{
            border-right: 1px solid #fff;
          }
        }
      }
    }
  }
</style>
