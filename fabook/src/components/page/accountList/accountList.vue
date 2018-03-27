<template>
  <div class="pageContent">
    <com-head :menuType="headType"></com-head>
    <ul class="dayList" v-for="(accountData, index) in dataList" :key="index">
      <li class="listTitle clearfix">
        <span class="fl">{{accountData.date}}</span>
        <span class="fr">收入：{{accountData.income}} &emsp;支出：{{accountData.pay}}</span>
      </li>
      <li class="listItem clearfix" :class="[account.fabook_record_pay == 1 ? 'income' : 'pay']" v-for="(account, index) in accountData.data" :key="index">
        <i class="fl"></i>
        <span class="fl">{{account.fabook_record_title}}</span>
        <span class="fr" v-text="[account.fabook_record_pay == 1 ? '+' : '-'] + account.fabook_record_amount"></span>
      </li>
    </ul>
    <transition name="rightFilter">
      <data-filter v-show="isFilter"></data-filter>
    </transition>
    <transition name="opacity-fade">
      <div class="coverMask" v-show="isFilter" @click="closeFilter"></div>
    </transition>
    <com-foot :footerTab="1"></com-foot>
  </div>
</template>

<script>
import comHead from '@/components/common/comHead/commonHead'
import comFoot from '@/components/common/comFoot/commonFoot'
import dataFilter from '@/components/page/accountList/children/accountFilter'
import eventBus from '@/components/common/eventBus.js'
export default {
  data () {
    return {
      headType: {
        title: ['账单列表'],
        lTitleType: 0,
        rButtonType: 2
      },
      dataList: [],
      isFilter: false
    }
  },
  components: {
    comHead,
    comFoot,
    dataFilter
  },
  mounted () {
    this.dataList = [
      {
        date: '2018-3-11',
        income: 50,
        pay: 100,
        data: [
          {fabook_record_title: '捡的是假钱，被警察罚款倒贴了100', fabook_record_pay: 1, fabook_record_amount: 100},
          {fabook_record_title: '我在马路边捡了50块钱~揣兜', fabook_record_pay: 0, fabook_record_amount: 50}
        ]
      },
      {
        date: '2018-3-10',
        income: 0,
        pay: 300,
        data: [
          {fabook_record_title: 'B85翻车啦，又去中关村买了块', fabook_record_pay: 1, fabook_record_amount: 170},
          {fabook_record_title: '淘宝买了块二手B85', fabook_record_pay: 0, fabook_record_amount: 130}
        ]
      }
    ]

    let _this = this
    eventBus.$on('rightBtnClick', function (data) {
      _this.isFilter = true
    })
  },
  methods: {
    closeFilter: function () {
      this.isFilter = false
    }
  },
  beforeDestroy () {
    eventBus.$off('rightBtnClick')
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
  .coverMask{
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 12;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.5);
  }
  .rightFilter-enter-active, .rightFilter-leave-active {
    position: fixed;
    transform: translate3d(0, 0, 0);
    transition: all .3s;
  }
  .rightFilter-enter, .rightFilter-leave-active {
    transform: translate3d(100%, 0, 0);
    transition: all .3s;
  }
</style>
