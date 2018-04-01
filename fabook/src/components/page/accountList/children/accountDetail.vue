<template>
  <div>
    <com-head :menuType="headType" :leftBtnClick="leftBtnClick"></com-head>
    <div class="lineTab leftShow " :class="[detailInfo.fabook_record_pay == 0 ? 'income' : 'pay']">
      <i></i><p>{{detailInfo.fabook_record_title}}</p>
    </div>
    <div class="lineTab leftShow " :class="[detailInfo.fabook_record_pay == 0 ? 'income' : 'pay']">
      <i></i>
      <p v-if="detailInfo.fabook_record_pay == 1">支出</p>
      <p v-else >收入</p>
    </div>
    <div class="lineTab ">
      <span>记录人 :</span>
      <p>&emsp;&emsp;{{detailInfo.fabook_user_name}}</p>
    </div>
    <div class="lineTab ">
      <span>类型 :</span>
      <p v-if="detailInfo.fabook_record_type == 201">&emsp;&emsp;餐饮</p>
      <p v-if="detailInfo.fabook_record_type == 202">&emsp;&emsp;服饰</p>
      <p v-if="detailInfo.fabook_record_type == 203">&emsp;&emsp;交通</p>
      <p v-if="detailInfo.fabook_record_type == 204">&emsp;&emsp;娱乐</p>
      <p v-if="detailInfo.fabook_record_type == 205">&emsp;&emsp;社交</p>
      <p v-if="detailInfo.fabook_record_type == 206">&emsp;&emsp;家居</p>
      <p v-if="detailInfo.fabook_record_type == 207">&emsp;&emsp;通讯</p>
      <p v-if="detailInfo.fabook_record_type == 208">&emsp;&emsp;美容</p>
      <p v-if="detailInfo.fabook_record_type == 209">&emsp;&emsp;运动</p>
      <p v-if="detailInfo.fabook_record_type == 210">&emsp;&emsp;医疗</p>
      <p v-if="detailInfo.fabook_record_type == 211">&emsp;&emsp;学习</p>
      <p v-if="detailInfo.fabook_record_type == 212">&emsp;&emsp;理财</p>
      <p v-if="detailInfo.fabook_record_type == 213">&emsp;&emsp;宠物</p>
      <p v-if="detailInfo.fabook_record_type == 299">&emsp;&emsp;其他</p>
      <p v-if="detailInfo.fabook_record_type == 101">&emsp;&emsp;工资</p>
      <p v-if="detailInfo.fabook_record_type == 102">&emsp;&emsp;兼职</p>
      <p v-if="detailInfo.fabook_record_type == 103">&emsp;&emsp;理财收益</p>
      <p v-if="detailInfo.fabook_record_type == 104">&emsp;&emsp;人情</p>
      <p v-if="detailInfo.fabook_record_type == 199">&emsp;&emsp;其他</p>
    </div>
    <div class="lineTab ">
      <span>备注 :</span>
      <p>&emsp;&emsp;{{detailInfo.fabook_record_remark}}</p>
    </div>
    <div class="lineTab ">
      <span>金额 :</span>
      <p>&emsp;&emsp;{{detailInfo.fabook_record_amount}}</p>
    </div>
    <div class="lineTab ">
      <span>时间 :</span>
      <p>&emsp;&emsp;{{detailInfo.fabook_record_time}}</p>
    </div>
    <div class="lineTab noLine" v-if="detailInfo.fabook_user_id == memeryData.userInfo.userId">
      <button @click="delAccount" ><i class="iconfont fabook-shibai"></i>删除该记录</button>
    </div>
    <click-msg :msg="clickMsg" ref="clickMsg"></click-msg>
  </div>
</template>

<script>
import comHead from '@/components/common/comHead/commonHead'
import clickMsg from '@/components/common/message/clickMsg'
import eventBus from '@/components/common/eventBus.js'
export default {
  data () {
    return {
      headType: {
        title: ['收支详情'],
        lTitleType: 2,
        rButtonType: 0
      },
      detailInfo: {},
      clickMsg: '确认删除吗？'
    }
  },
  components: {
    comHead,
    clickMsg
  },
  mounted () {
    this.detailInfo = {
      fabook_record_title: '捡的是假钱，被警察罚款倒贴了100',
      fabook_record_pay: 1,
      fabook_record_type: 299,
      fabook_record_amount: 100,
      fabook_record_time: '2018-03-22',
      fabook_record_remark: '不想说话',
      fabook_user_id: '18218218182',
      fabook_user_name: '测试名'
    }
    let _this = this
    eventBus.$on('clickMsgOk', function (data) {
      console.log('delete')
      _this.leftBtnClick()
      eventBus.$emit('reloadList', 'reloadList')
    })
    eventBus.$on('clickMsgCancel', function (data) {
      console.log('cancel')
      _this.$refs.clickMsg.closeClick()
    })
  },
  methods: {
    leftBtnClick: function () {
      this.$router.goBack()
    },
    delAccount: function () {
      this.$refs.clickMsg.openClick()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../../../style/cssConfig';

.lineTab{
  width: 100%;
  padding: .5rem 5%;
  position: relative;
  border-bottom: 1px solid $defaultLightGray;
  &.leftShow{
    i{
      width: .5rem;
      height: 2.5rem;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  &.pay{
    i{
      background: $defaultGreen;
    }
  }
  &.income{
    i{
      background: $defaultRed;
    }
  }
  p{
    height: 1.5rem;
    line-height: 1.5rem;
  }
  span{
    margin-bottom: .5rem;
    display: block;
  }
  &.noLine{
    border-bottom: none;
    button{
      width: 70%;
      margin: 0 15%;
      background: $defaultBlue;
      color: #fff;
      height: 3rem;
      line-height: 3rem;
      font-size: 1.1rem;
      border-radius: .5rem;
      margin-top: 2rem;
      i{
        font-size: 1.6rem;
        color: #fff;
        margin-right: .5rem;
      }
    }
  }
}
</style>
