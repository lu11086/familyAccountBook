<template>
  <div class="pageContent">
    <com-head :menuType="headType"></com-head>
    <ul class="dayList">
      <li class="listTitle clearfix">
        <span class="fl">2018-3-11</span>
        <span class="fr">收入：50 &emsp;支出：100</span>
      </li>
      <li class="listItem pay clearfix">
        <i class="fl"></i>
        <span class="fl">捡的是假钱，被警察罚款倒贴了100</span>
        <span class="fr">-100</span>
      </li>
      <li class="listItem income clearfix">
        <i class="fl"></i>
        <span class="fl">我在马路边捡了50块钱~揣兜</span>
        <span class="fr">+50</span>
      </li>
    </ul>
    <ul class="dayList">
      <li class="listTitle clearfix">
        <span class="fl">2018-3-10</span>
        <span class="fr">收入：0 &emsp;支出：300</span>
      </li>
      <li class="listItem pay clearfix">
        <i class="fl"></i>
        <span class="fl">B85翻车啦，又去中关村买了块</span>
        <span class="fr">-170</span>
      </li>
      <li class="listItem pay clearfix">
        <i class="fl"></i>
        <span class="fl">淘宝买了块二手B85</span>
        <span class="fr">-130</span>
      </li>
    </ul>
    <com-foot :footerTab="1"></com-foot>
  </div>
</template>

<script>
import comHead from '@/components/common/comHead/commonHead'
import comFoot from '@/components/common/comFoot/commonFoot'
export default {
  data () {
    return {
      headType: {
        title: ['账单列表'],
        lTitleType: 0,
        rButtonType: 1
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
  ul.dayList{
    font-size: .9rem;
    li{
      &.listTitle{
        padding: .5rem 1rem;
      }
      &.listItem{
        line-height: 2rem;
        padding-right: 1rem;
        border-bottom: 1px solid $defaultLightGray;
        i.fl {
          width: .3rem;
          height: 2rem;
        }
        span.fl{
          margin-left: .7rem;
        }
        &.income{
          i.fl{
            background: $defaultRed;
          }
          span.fr{
            color: $defaultRed;
          }
        }
        &.pay{
          i.fl{
            background: $defaultGreen;
          }
          span.fr{
            color: $defaultGreen;
          }
        }
      }
    }
  }
</style>
