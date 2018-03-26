<template>
  <div class="pageContent">
    <com-head :menuType="headType"></com-head>
    <ul class="chooseTab clearfix">
      <li class="threePartTab fl">
        <i class="iconfont fabook-benzhou"></i>
        <p>周度对比</p>
      </li>
      <li class="threePartTab fl">
        <i class="iconfont fabook-benyue"></i>
        <p>月度对比</p>
      </li>
      <li class="threePartTab fl">
        <i class="iconfont fabook-jidu"></i>
        <p>季度对比</p>
      </li>
      <li class="threePartTab fl">
        <i class="iconfont fabook-linechart"></i>
        <p>家庭红线</p>
      </li>
      <li class="threePartTab fl">
        <i class="iconfont fabook-toufangfangan"></i>
        <p>他人方案</p>
      </li>
      <li class="threePartTab fl">
        <i class="iconfont fabook-gengduo"></i>
        <p>更多功能</p>
      </li>
    </ul>
    <div class="familyNotice">
      <h1>家庭公告</h1>
      <p>本月花销过大，孩儿们注意着点花。以上。</p>
    </div>
    <com-foot :footerTab="3"></com-foot>
  </div>
</template>

<script>
import comHead from '@/components/common/comHead/commonHead'
import comFoot from '@/components/common/comFoot/commonFoot'
export default {
  data () {
    return {
      headType: {
        title: ['家庭圈'],
        lTitleType: 0,
        rButtonType: 4
      }
    }
  },
  components: {
    comHead,
    comFoot
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../../../style/cssConfig.scss';
  .familyNotice{
    height: 10rem;
    margin: 1rem;
    border: 1px solid $defaultGray;
    border-radius: 1rem;
    background: $defaultLightBlue;
    padding: 0 .5rem;
    box-shadow: 0 0 1rem #369;
    h1{
      color: #fff;
      text-align: center;
      font-size: 1.2rem;
      font-weight: bold;
      line-height: 2rem;
      text-shadow: 0 0 .5rem $defaultBlue;
    }
    p{
      color: #fff;
      font-size: .9rem;
    }
  }
  ul.chooseTab{
    border-bottom: 1px solid $defaultBlue;
    border-radius: .5rem;
    li{
      &.threePartTab{
        width: 33.33%;
        height: 5rem;
        &:nth-child(3n){
          width: 33.34%;
        }
        i{
          width: 3rem;
          height: 3rem;
          font-size: 1.5rem;
          line-height: 3rem;
          text-align: center;
          margin: 0 auto;
          display: block;
          color: $defaultBlue;
          &.fabook-benyue{
            font-size: 1.4rem;
          }
          &.fabook-jidu{
            font-size: 2.1rem;
          }
          &.fabook-gengduo{
            font-weight: bold;
          }
        }
        p{
          font-size: .9rem;
          text-align: center;
          color: $defaultBlue;
        }
      }
    }
  }
</style>
