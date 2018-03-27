<template>
  <transition name="opacity-fade">
    <div class="toastArea" v-show="isShow">
      <div class="toastMsg" :style="'width:'+ (msg.length * .9 + 2) + 'rem'">{{msg}}</div>
    </div>
  </transition>
</template>
<script>
export default {
  data () {
    return {
      isShow: false
    }
  },
  props: {
    msg: {
      type: String,
      default: ''
    },
    lateTime: {
      type: Number,
      default: 2000
    }
  },
  methods: {
    openToast () {
      this.isShow = true
      let _this = this
      setTimeout(function () {
        _this.isShow = false
      }, _this.lateTime)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../style/cssConfig';
  .toastArea{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    .toastMsg{
      padding: .5rem 0;
      background: rgba(0,0,0,.5);
      margin: auto;
      position: absolute;
      bottom: $footerHeight;
      left: 0;
      right: 0;
      border-radius: .5rem;
      font-size: .9rem;
      color: #fff;
      text-align: center;
    }
  }
</style>
