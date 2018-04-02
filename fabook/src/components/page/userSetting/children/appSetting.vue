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
      <li class="ceilLineTab" @click="changeLogin">
        切换登录状态
        <i class="iconfont fabook-iconfontjiantou4 fr"></i>
      </li>
      <li class="ceilLineTab" @click="changeFamilyAdmin">
        切换家庭管理员身份
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
    },
    changeLogin: function () {
      if (!this.memeryData.isLogin) {
        this.memeryData.isLogin = true
        this.memeryData.userInfo.username = '测试'
        this.memeryData.userInfo.tel = '18232251500'
        this.memeryData.userInfo.email = 'lu11086@qq.com'
        this.memeryData.userInfo.userId = '18218218182'
        this.memeryData.userInfo.isFamilyAdmin = false
        this.memeryData.userInfo.familyId = '110'
        this.toastMsg = '切换成功！已登录'
        this.$refs.toastMsg.openToast()
      } else {
        this.memeryData.isLogin = false
        this.memeryData.userInfo.username = ''
        this.memeryData.userInfo.tel = ''
        this.memeryData.userInfo.email = ''
        this.memeryData.userInfo.userId = ''
        this.memeryData.userInfo.isFamilyAdmin = false
        this.memeryData.userInfo.familyId = null
        this.toastMsg = '切换成功！已退出登录'
        this.$refs.toastMsg.openToast()
      }
    },
    changeFamilyAdmin: function () {
      if (this.memeryData.isLogin) {
        this.memeryData.userInfo.isFamilyAdmin = !this.memeryData.userInfo.isFamilyAdmin
        this.toastMsg = '切换成功！'
        this.$refs.toastMsg.openToast()
      } else {
        this.toastMsg = '未登录状态下不得切换'
        this.$refs.toastMsg.openToast()
      }
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
