<template>
  <div>
    <com-head :menuType="headType" :leftBtnClick="leftBtnClick"></com-head>
    <div class="appSettingArea">
    <ul>
      <li class="ceilLineTab" @click="loadData" v-show="memeryData.isLogin">
        上传离线数据至本账户
        <i class="iconfont fabook-iconfontjiantou4 fr"></i>
      </li>
      <li class="ceilLineTab" @click="checkNewApp">
        检查更新
        <i class="iconfont fabook-iconfontjiantou4 fr"></i>
      </li>
      <li class="ceilLineTab" @click="showApp">
        关于本软件
        <i class="iconfont fabook-iconfontjiantou4 fr"></i>
      </li>
      <li class="ceilLineTab" @click="quitLogin" v-show="memeryData.isLogin">
        退出登录
        <i class="iconfont fabook-iconfontjiantou4 fr"></i>
      </li>
    </ul>
    </div>
    <toast-msg :msg="toastMsg" ref="toastMsg"></toast-msg>
    <click-msg :msg="clickMsg" ref="clickMsg"></click-msg>
  </div>
</template>

<script>
import comHead from '@/components/common/comHead/commonHead'
import toastMsg from '@/components/common/message/toastMsg'
import clickMsg from '@/components/common/message/clickMsg'
import eventBus from '@/components/common/eventBus.js'
export default {
  data () {
    return {
      headType: {
        title: ['软件设置'],
        lTitleType: 2,
        rButtonType: 0
      },
      clickMsg: '',
      toastMsg: ''
    }
  },
  components: {
    comHead,
    clickMsg,
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
    quitLogin: function () {
      this.clickMsg = '确认退出登录吗？'
      this.$refs.clickMsg.openClick()
      let _this = this
      eventBus.$on('clickMsgOk', function (data) {
        _this.memeryData.isLogin = false
        _this.memeryData.userInfo = {}
        _this.memeryData.userInfo.sexNumber = 0
        _this.memeryData.userInfo.familyId = null
        _this.memeryData.userInfo.username = '点击此处登录'
        _this.memeryData.userInfo.userRemark = '登录后可使用更多功能'
        _this.memeryData.userInfo.redLine = '80%'
        _this.memeryData.userInfo.fixedIncome = 0
        _this.memeryData.userInfo.fixedPay = 0
        _this.memeryData.familyInfo = {}
        _this.memeryData.familyInfo.familyNotice = '暂无公告'
        _this.$refs.clickMsg.closeClick()
        _this.toastMsg = '成功退出登录！'
        _this.$refs.toastMsg.openToast()
        setTimeout(function () {
          _this.leftBtnClick()
        }, 1000)
      })
      eventBus.$on('clickMsgCancel', function (data) {
        _this.$refs.clickMsg.closeClick()
      })
    },
    loadData: function () {
      this.clickMsg = '确认上传本地离线数据至 ' + this.memeryData.userInfo.username + ' 吗？'
      this.$refs.clickMsg.openClick()
      let _this = this
      eventBus.$on('clickMsgOk', function (data) {
        console.log('上传')
        _this.$refs.clickMsg.closeClick()
      })
      eventBus.$on('clickMsgCancel', function (data) {
        console.log('取消')
        _this.$refs.clickMsg.closeClick()
      })
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
