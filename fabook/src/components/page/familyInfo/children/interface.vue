<template>
  <div>
    <com-head :menuType="headType" :leftBtnClick="leftBtnClick"></com-head>
    <div class="interfaceArea">
    <ul>
      <li class="ceilLineTab" @click="waitToTrue">
        计算器
        <i class="iconfont fabook-iconfontjiantou4 fr"></i>
      </li>
      <li class="ceilLineTab" @click="waitToTrue">
        汇率转换
        <i class="iconfont fabook-iconfontjiantou4 fr"></i>
      </li>
    </ul>
    </div>
    <toast-msg :msg="toastMsg" ref="toastMsg"></toast-msg>
  </div>
</template>

<script>
import comHead from '@/components/common/comHead/commonHead'
import toastMsg from '@/components/common/message/toastMsg'
export default {
  data () {
    return {
      headType: {
        title: ['更多功能'],
        lTitleType: 2,
        rButtonType: 0
      },
      toastMsg: ''
    }
  },
  components: {
    comHead,
    toastMsg
  },
  mounted () {
  },
  methods: {
    waitToTrue: function () {
      this.toastMsg = '功能未对接请静候佳音！'
      this.$refs.toastMsg.openToast()
    },
    leftBtnClick: function () {
      this.$router.goBack()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../../../../style/cssConfig';
  .interfaceArea{
    background: #f5f5f5;
    min-height: calc( 100vh - 2.7rem);
  }
  ul{
    width: 100%;
    border-bottom: 1px solid #ddd;
    li{
      background: #fff;
      &.ceilLineTab{
        height: 2.8rem;
        line-height: 2.8rem;
        padding: 0 1rem;
        border-bottom: 1px solid $defaultLightGray;
        i{
          color: $defaultGray;
        }
      }
    }
  }
</style>
