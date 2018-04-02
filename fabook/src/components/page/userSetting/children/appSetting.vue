<template>
  <div>
    <com-head :menuType="headType" :leftBtnClick="leftBtnClick"></com-head>
    <div class="appSettingArea">
    <ul>
      <li class="ceilLineTab" @click="checkNewApp">
        检查更新
        <i class="iconfont fabook-iconfontjiantou4 fr"></i>
      </li>
      <li class="ceilLineTab" @click="showApp">
        关于本软件
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
        title: ['软件设置'],
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
    checkNewApp: function () {
      this.toastMsg = '软件已经是最新版本'
      this.$refs.toastMsg.openToast()
    },
    showApp: function () {
      this.toastMsg = '版本号  v0.4.2'
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
  .appSettingArea{
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
