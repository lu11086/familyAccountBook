<template>
  <div>
    <com-head :menuType="headType" :leftBtnClick="leftBtnClick"></com-head>
    <div class="interfaceArea">
    <ul>
      <li class="ceilLineTab" :class="[planType == 'default' ? 'active' : '']" @click="changePlan('default')">
        默认方案
        <i class="iconfont fabook-right-1"></i>
      </li>
      <li class="ceilLineTab" :class="[planType == '264' ? 'active' : '']" @click="changePlan('264')">
        2成员 - 64方案
        <i class="iconfont fabook-right-1"></i>
      </li>
      <li class="ceilLineTab" :class="[planType == '3442' ? 'active' : '']" @click="changePlan('3442')">
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
        title: ['更多功能'],
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
  },
  methods: {
    changePlan: function (type) {
      this.planType = type
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
</style>
