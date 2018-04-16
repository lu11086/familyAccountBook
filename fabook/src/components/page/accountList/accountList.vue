<template>
  <div class="pageContent">
    <transition :name="transitionName">
      <router-view class="Router"></router-view>
    </transition>
    <com-head :menuType="headType"></com-head>
    <mt-loadmore :top-method="loadTop" ref="loadmore">
    <ul class="dayList" v-for="(accountData, index) in dataList" :key="index">
      <li class="listTitle clearfix">
        <span class="fl">{{accountData.date}}</span>
        <span class="fr">收入：{{accountData.income}} &emsp;支出：{{accountData.pay}}</span>
      </li>
      <li class="listItem clearfix" :class="[account.fabook_account_is_pay == 0 ? 'income' : 'pay']" v-for="(account, index) in accountData.data" :key="index" @click="openDetail(account.fabook_account_id)">
        <i class="fl"></i>
        <span class="fl">{{account.fabook_account_title}}</span>
        <span class="fr" v-text="account.fabook_account_is_pay == 0 ? '+'+account.fabook_account_income : '-'+account.fabook_account_pay"></span>
      </li>
    </ul>
    </mt-loadmore>
    <transition name="rightFilter">
      <data-filter v-show="isFilter"></data-filter>
    </transition>
    <transition name="opacity-fade">
      <div class="coverMask" v-show="isFilter" @click="closeFilter"></div>
    </transition>
    <toast-msg :msg="toastMsg" ref="toastMsg"></toast-msg>
    <com-foot :footerTab="1"></com-foot>
  </div>
</template>

<script>
import comHead from '@/components/common/comHead/commonHead'
import comFoot from '@/components/common/comFoot/commonFoot'
import dataFilter from '@/components/page/accountList/children/accountFilter'
import eventBus from '@/components/common/eventBus.js'
import toastMsg from '@/components/common/message/toastMsg'
export default {
  data () {
    return {
      headType: {
        title: ['账单列表'],
        lTitleType: 0,
        rButtonType: 2
      },
      transitionName: 'slide-right',
      dataList: [],
      isFilter: false,
      params: {},
      toastMsg: ''
    }
  },
  components: {
    comHead,
    comFoot,
    toastMsg,
    dataFilter
  },
  beforeRouteUpdate (to, from, next) {
    if (this.$router.isBack) {
      this.transitionName = 'slide-right'
    } else {
      this.transitionName = 'slide-left'
    }
    this.$router.isBack = false
    setTimeout(function () { next() }, 50)
  },
  mounted () {
    this.dataListInit()

    let _this = this
    eventBus.$on('rightBtnClick', function (data) {
      _this.isFilter = true
    })
    eventBus.$on('dataListFilter', function (data) {
      _this.isFilter = false
      _this.params.type = data.accountPay
      _this.params.pay = data.payType
      _this.params.income = data.incomeType
      _this.params.minA = data.minAmount
      _this.params.maxA = data.maxAmount
      _this.params.minD = data.minDateTime
      _this.params.maxD = data.maxDateTime
      _this.loadAccountList()
    })
  },
  methods: {
    dataListInit: function () {
      this.params.id = this.memeryData.userInfo.familyId
      this.params.type = 2
      this.params.pay = 200
      this.params.income = 100
      this.params.minA = 0
      this.params.maxA = 999999
      let myDate = new Date()
      this.params.maxD = myDate.getTime()
      var oldDate = new Date(myDate)
      oldDate.setDate(myDate.getDate() - 7)
      this.params.minD = oldDate.getTime()
      this.loadAccountList()
    },
    closeFilter: function () {
      this.isFilter = false
    },
    openDetail: function (index) {
      this.$router.push('/accountList/detail/' + index)
    },
    loadTop: function () {
      this.$refs.loadmore.onTopLoaded()
      this.loadAccountList()
    },
    loadAccountList: function () {
      // console.log(this.params)
      if (this.memeryData.isLogin) {
        if (this.memeryData.userInfo.familyId != null) {
          this.params.post = 'family'
        } else {
          this.params.post = 'user'
        }
        let _this = this
        this.$http.post(this.memeryData.serverUrl + '/account/filterAccountList', this.params, {emulateJSON: true}).then(function (response) {
          if (response.body.msg === 'success') {
            _this.dataList = response.body.data
            console.log(_this.dataList)
          } else {
            _this.toastMsg = response.body.msgText
            _this.$refs.toastMsg.openToast()
          }
        }, function (response) {
          _this.toastMsg = '创建失败，请联系管理员！'
          _this.$refs.toastMsg.openToast()
          console.log(response)
        })
      } else {
        let newList
        let singleList
        if (localStorage.getItem('newAccount')) newList = JSON.parse(localStorage.getItem('newAccount'))
        if (localStorage.getItem('singleInfo')) singleList = JSON.parse(localStorage.getItem('singleInfo'))
        if (localStorage.getItem('newAccount')) {
          for (let i in newList) {
            singleList.push(newList[i])
          }
        }
        let dataList = []
        let dataTab = {}
        for (let i in singleList) {
          if (dataTab[singleList[i].fabook_account_date]) {
            dataTab[singleList[i].fabook_account_date].pay += parseFloat(singleList[i].fabook_account_pay)
            dataTab[singleList[i].fabook_account_date].income += parseFloat(singleList[i].fabook_account_income)
            dataTab[singleList[i].fabook_account_date].data.push(singleList[i])
          } else {
            dataTab[singleList[i].fabook_account_date] = {}
            dataTab[singleList[i].fabook_account_date].date = singleList[i].fabook_account_date
            dataTab[singleList[i].fabook_account_date].pay = parseFloat(singleList[i].fabook_account_pay)
            dataTab[singleList[i].fabook_account_date].income = parseFloat(singleList[i].fabook_account_income)
            dataTab[singleList[i].fabook_account_date].data = []
            dataTab[singleList[i].fabook_account_date].data.push(singleList[i])
          }
        }
        for (let i in dataTab) dataList.push(dataTab[i])
        console.log(dataList)
        this.dataList = this.toggleArray(dataList)
      }
    },
    toggleArray: function (arr) {
      let newArray = []
      for (let i = 0; i < arr.length; i++) {
        newArray.push(arr[arr.length - i - 1])
      }
      return newArray
    }
  },
  beforeDestroy () {
    eventBus.$off('rightBtnClick')
    eventBus.$off('dataListFilter')
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
  .mint-loadmore{
    height: calc( 100vh - 5.7rem );
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
