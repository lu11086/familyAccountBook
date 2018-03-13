<template>
  <div>
    <com-head :menuType="headType"></com-head>
    <ul class="settingArea">
      <li class="userInfo clearfix">
        <img src="@/assets/userHeader.jpg" alt="用户头像" class="fl">
        <div class="userTab fl">
          <p class="userName">测试用管理员</p>
          <p>简介？tan90°</p>
        </div>
        <i class="iconfont fabook-bianji fr"></i>
      </li>
      <li class="blank"></li>
      <li class="lineTab">
        固定收支
        <i class="iconfont fabook-iconfontjiantou4 fr"></i>
      </li>
      <li class="lineTab">
        消费红线
        <i class="iconfont fabook-iconfontjiantou4 fr"></i>
      </li>
      <li class="lineTab">
        软件设置
        <i class="iconfont fabook-iconfontjiantou4 fr"></i>
      </li>
    </ul>
  </div>
</template>

<script>
import comHead from '@/components/common/comHead/commonHead'
export default {
  data () {
    return {
      headType: {
        title: ['注册用户'],
        lTitleType: 3,
        rButtonType: 0
      }
    }
  },
  components: {
    comHead
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../../../../style/cssConfig';
  .pageContent{
    background: #f5f5f5;
    min-height: 100vh;
  }
  ul.settingArea{
    font-size: .9rem;
    li{
      width: 100%;
      background: #fff;
      border-bottom: 1px solid $defaultLightGray;
      i{
        color: $defaultGray;
      }
      &.userInfo{
        height: 7rem;
        padding: 1rem;
        img{
          height: 5rem;
          width: 5rem;
          border-radius: 100%;
        }
        .userTab{
          padding-left: 1rem;
          height: 5rem;
          width: calc( 100% - 7rem);
          line-height: 2.5rem;
          p.userName{
            font-size: 1rem;
          }
        }
        i{
          height: 2rem;
          width: 2rem;
          font-size: 2rem;
          line-height: 5rem;
        }
      }
      &.blank{
        height: 1rem;
        background: #f5f5f5;
      }
      &.lineTab{
        height: 2.8rem;
        line-height: 2.8rem;
        padding: 0 1rem;
        border-bottom: 1px solid $defaultLightGray;
      }
    }
  }
</style>
