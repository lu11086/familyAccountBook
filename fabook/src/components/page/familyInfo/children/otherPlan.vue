<template>
  <div>
    <com-head :menuType="headType" :leftBtnClick="leftBtnClick"></com-head>
    <div class="interfaceArea">
      <p class="gray" v-show="!memeryData.userInfo.isFamilyAdmin">* 非家庭管理员不能更改家庭方案 *</p>
      <ul>
        <li class="ceilLineTab" :class="[planType == 'default' ? 'active' : '']" @click="changePlan('default')">
          默认方案
          <i class="iconfont fabook-right-1"></i>
        </li>
        <li class="ceilLineTab" :class="[planType == '60;40;' ? 'active' : '']" @click="changePlan('60;40;')">
          2成员 - 64方案
          <i class="iconfont fabook-right-1"></i>
        </li>
        <li class="ceilLineTab" :class="[planType == '40;40;20;' ? 'active' : '']" @click="changePlan('40;40;20;')">
          3成员 - 442方案
          <i class="iconfont fabook-right-1"></i>
        </li>
        <li class="ceilLineTab" :class="[planType == 'other' ? 'active' : '']" @click="changePlan('other')">
          自定义
          <i class="iconfont fabook-right-1"></i>
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
        title: ['家庭方案'],
        lTitleType: 2,
        rButtonType: 0
      },
      toastMsg: '',
      planType: 'default'
    }
  },
  components: {
    comHead,
    toastMsg
  },
  mounted () {
    this.planType = this.memeryData.familyInfo.familyPlan
  },
  methods: {
    changePlan: function (type) {
      if (!this.memeryData.userInfo.isFamilyAdmin) return
      let oldType = this.planType
      this.planType = type
      this.memeryData.familyInfo.familyPlan = type
      if (type !== 'other') {
        let _this = this
        this.$http.post(this.memeryData.serverUrl + '/family/changePlan', {
          'id': this.memeryData.userInfo.familyId,
          'plan': type
        }, {emulateJSON: true}).then(function (response) {
          if (response.body.msg === 'success') {
            _this.toastMsg = '切换方案成功！'
            _this.$refs.toastMsg.openToast()
          } else {
            _this.planType = oldType
            _this.toastMsg = response.body.msgText
            _this.$refs.toastMsg.openToast()
          }
        }, function (response) {
          _this.toastMsg = '保存失败，请联系管理员！'
          _this.$refs.toastMsg.openToast()
          console.log(response)
        })
      }
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
          float: right;
          display: none;
        }
        &.active{
          i{
            font-size: 1.5rem;
            color: $defaultGreen;
            display: block;
          }
        }
      }
    }
  }
  p.gray{
    padding: .5rem;
    color: $defaultLightGray;
    text-align: center;
    background: $defaultGray;
  }
</style>
