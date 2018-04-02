<template>
  <div>
    <com-head :menuType="headType" :leftBtnClick="leftBtnClick"></com-head>
    <div class="appSettingArea">
      <ul>
        <li class="ceilLineTab" @click="toChangeHeader(true)">
          更改头像
          <i class="iconfont fabook-iconfontjiantou4 fr"></i>
        </li>
        <li class="ceilLineTab">
          更改昵称
          <input type="text" v-model="username" placeholder="不得超过10个字" oninput="if(value.length > 10) value=value.slice(0,10)"/>
        </li>
        <li class="ceilLineTab" @click="toChangeSex">
          更改性别
          <span class="fr">{{sexNumber}}</span>
        </li>
        <transition name="opacity-fade">
          <li v-show="changeSex" @click="toChangeSex">
            <mt-radio v-model="sexNumber" :options="['男', '女']"></mt-radio>
          </li>
        </transition>
        <li class="ceilLineTab" @click="toChangeRemark">
          更改备注
          <i class="iconfont fabook-iconfontjiantou4 fr"></i>
        </li>
        <transition name="opacity-fade">
          <li v-show="changeRemark">
            <textarea cols="30" rows="5" v-model="userRemark"></textarea>
            <button @click="toChangeRemark">保存</button>
          </li>
        </transition>
        <li class="ceilLineTab" @click="toChangeQuestion">
          设置密保问题
          <i class="iconfont fabook-iconfontjiantou4 fr"></i>
        </li>
        <transition name="opacity-fade">
          <li v-show="changeQusetion">
            <textarea cols="30" rows="2" v-model="question"></textarea>
            <button @click="toChangeQuestion">保存</button>
          </li>
        </transition>
        <li class="ceilLineTab" @click="toChangeAnswer">
          设置密保答案
          <i class="iconfont fabook-iconfontjiantou4 fr"></i>
        </li>
        <transition name="opacity-fade">
          <li v-show="changeAnswer">
            <textarea cols="30" rows="2" v-model="answer"></textarea>
            <button @click="toChangeAnswer">保存</button>
          </li>
        </transition>
      </ul>
      <transition name="opacity-fade">
        <div class="changeUserHeader clearfix" v-show="changeHeader" @click="toChangeHeader(false)">
          <img :src="imgUrl" :alt="'用户头像'+index" v-for="(imgUrl, index) in imgUrlList" :key="index" :class="[userHeaderIndex == index ? 'active':'']" @click="changeUserHeaderImg(index)"/>
        </div>
      </transition>
    </div>
    <toast-msg :msg="toastMsg" ref="toastMsg"></toast-msg>
  </div>
</template>

<script>
import comHead from '@/components/common/comHead/commonHead'
import toastMsg from '@/components/common/message/toastMsg'
import eventBus from '@/components/common/eventBus.js'
const headerImg1 = require('@/assets/userHeader1.png')
const headerImg2 = require('@/assets/userHeader2.png')
const headerImg3 = require('@/assets/userHeader3.png')
const headerImg4 = require('@/assets/userHeader4.png')
const headerImg5 = require('@/assets/userHeader5.png')
const headerImg6 = require('@/assets/userHeader6.png')
const headerImg7 = require('@/assets/userHeader7.png')
const headerImg8 = require('@/assets/userHeader8.png')
const headerImg9 = require('@/assets/userHeader9.png')
const headerImg10 = require('@/assets/userHeader10.png')
const headerImg11 = require('@/assets/userHeader11.png')
const headerImg12 = require('@/assets/userHeader12.png')
export default {
  data () {
    return {
      headType: {
        title: ['软件设置'],
        lTitleType: 2,
        rButtonType: 5
      },
      toastMsg: '',
      username: '',
      changeHeader: false,
      imgUrlList: [headerImg1, headerImg2, headerImg3, headerImg4, headerImg5, headerImg6, headerImg7, headerImg8, headerImg9, headerImg10, headerImg11, headerImg12],
      userHeaderIndex: 6,
      sexNumber: '男',
      changeSex: false,
      changeRemark: false,
      userRemark: '',
      changeQusetion: false,
      question: '',
      changeAnswer: false,
      answer: ''
    }
  },
  components: {
    comHead,
    toastMsg
  },
  mounted () {
    let _this = this
    eventBus.$on('rightBtnClick', function (data) {
      console.log('save')
      _this.leftBtnClick()
    })
    this.username = this.memeryData.userInfo.username
  },
  methods: {
    toChangeHeader: function (type) {
      this.changeHeader = type
    },
    changeUserHeaderImg: function (index) {
      this.userHeaderIndex = index
    },
    toChangeSex: function () {
      this.changeSex = !this.changeSex
    },
    toChangeRemark: function () {
      this.changeRemark = !this.changeRemark
    },
    toChangeQuestion: function () {
      this.changeQusetion = !this.changeQusetion
    },
    toChangeAnswer: function () {
      this.changeAnswer = !this.changeAnswer
    },
    leftBtnClick: function () {
      this.$router.goBack()
    }
  },
  beforeDestroy () {
    eventBus.$off('rightBtnClick')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../../../../style/cssConfig';
  .appSettingArea{
    background: #f5f5f5;
    min-height: calc( 100vh - 2.7rem);
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
          input{
            width: 50vw;
            height: 2rem;
            line-height: 2rem;
            margin: .4rem 0;
            padding: 0 .5rem;
            background: $defaultLightGray;
            border-radius: .5rem;
            float: right;
            font-size: 1rem;
          }
        }
        textarea{
          padding: .5rem;
          width: 100%;
        }
        button{
          width: 100%;
          height: 2rem;
          font-size: 1rem;
          background: #369;
          color: #fff;
        }
      }
    }
    .changeUserHeader{
      height: 100vh;
      width: 100vw;
      background: rgba(0, 0, 0, .5);
      position: fixed;
      top: 0;
      left: 0;
      z-index: 12;
      padding-top: 10rem;
      img{
        width: 20vw;
        height: 20vw;
        padding: 2.5vw;
        float: left;
        &.active{
          background: $defaultGreen;
        }
      }
    }
  }
  .mint-radiolist{
    margin-bottom: 16px;
  }
</style>
