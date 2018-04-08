<template>
  <div>
    <com-head :menuType="headType" :leftBtnClick="leftBtnClick"></com-head>
    <div class="createFamilyArea">
      <p class="gray" v-show="!memeryData.userInfo.isFamilyAdmin">* 非家庭管理员不能更改家庭组信息 *</p>
      <div class="lineTab clearfix">
        <p>家庭昵称 :</p>
        <input type="text" name="familyName" placeholder="限制10字以内；可为空；" v-model="familyName" @input="checkUnderTen" @blur="closeError" :disabled="!memeryData.userInfo.isFamilyAdmin"/>
        <h6 v-show="titleError" class="title">昵称不能超过10个字！</h6>
      </div>
      <div class="lineTab clearfix">
        <p>家庭简介 :</p>
        <textarea name="familyRemark" cols="30" rows="10" placeholder="限制100字以内；可为空；" v-model="familyRemark" @input="checkUnderHundred" @blur="closeError" :disabled="!memeryData.userInfo.isFamilyAdmin"></textarea>
        <h6 v-show="remarkError" class="remark">简介不能超过100个字！</h6>
      </div>
      <div class="lineTab clearfix">
        <p>家庭公告 :</p>
        <textarea name="familyRemark" cols="30" rows="10" placeholder="限制100字以内；可为空；" v-model="familyNotice" @input="checkUnderHundred2" @blur="closeError" :disabled="!memeryData.userInfo.isFamilyAdmin"></textarea>
        <h6 v-show="remarkError" class="remark">公告不能超过100个字！</h6>
      </div>
      <div class="lineTab clearfix">
        <p>家庭成员 :</p>
        <ul>
          <li class="userTab clearfix" v-for="(user, index) in userList" :key="index">
            <span class="fl">{{user}}</span><span class="fr" :class="[index == 0 ? 'noDel' : '']" @click="index == 0 || delUser(user)" v-if="memeryData.userInfo.isFamilyAdmin">删除</span>
          </li>
          <li class="userTab clearfix textIn" v-show="!userAdd" v-if="memeryData.userInfo.isFamilyAdmin">
            <span class="fl" :class="[isUserNameRight ? '' : 'error']">
              <input type="text" placeholder="请输入注册手机号/邮箱 " v-model="username" @input="checkUserNameFunc()" @focus="resetUserNameArea()" />
            </span>
            <span class="fr" @click="cancelAdd" v-show="!showClick">取消</span>
            <span class="fr sure" @click="addUserClick" v-show="showClick">确定</span>
          </li>
          <li class="userTab clearfix add" v-show="userAdd" v-if="memeryData.userInfo.isFamilyAdmin"><span class="fl" @click="addIn">+</span></li>
        </ul>
      </div>
      <transition name="opacity-fade">
        <div class="lineTab" v-show="userList.length >= 2" v-if="memeryData.userInfo.isFamilyAdmin">
          <button @click="changeFamily"><i class="iconfont fabook-right-1"></i>确认修改</button>
        </div>
      </transition>
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
        title: ['家庭组设置'],
        lTitleType: 2,
        rButtonType: 0
      },
      toastMsg: '保存成功!',
      familyName: '',
      familyRemark: '',
      titleError: false,
      remarkError: false,
      userList: [],
      userAdd: true,
      username: '',
      isUserNameRight: true,
      showClick: false,
      familyNotice: '',
      noticeError: false
    }
  },
  components: {
    comHead,
    toastMsg
  },
  mounted () {
    this.familyName = this.memeryData.familyInfo.familyName
    this.familyRemark = this.memeryData.familyInfo.familyRemark
    this.userList = this.memeryData.familyInfo.familyList
    this.familyNotice = this.memeryData.familyInfo.familyNotice
  },
  methods: {
    checkUnderTen: function () {
      if (this.familyName.length > 10) {
        this.familyName = this.familyName.substr(0, 10)
        this.titleError = true
      }
    },
    checkUnderHundred: function () {
      if (this.familyRemark.length > 100) {
        this.familyRemark = this.familyRemark.substr(0, 100)
        this.remarkError = true
      }
    },
    checkUnderHundred2: function () {
      if (this.familyNotice.length > 100) {
        this.familyNotice = this.familyNotice.substr(0, 100)
        this.noticeError = true
      }
    },
    closeError: function () {
      this.titleError = false
      this.remarkError = false
      this.noticeError = false
    },
    addIn: function () {
      this.userAdd = false
      this.isUserNameRight = true
    },
    cancelAdd: function () {
      this.userAdd = true
      this.username = ''
    },
    addUserClick: function () {
      let isSame = false
      for (var i in this.userList) {
        if (this.username === this.userList[i]) isSame = true
      }
      if (isSame) {
        this.username = '该用户名已存在！'
        this.isUserNameRight = false
      } else if (this.username.toString() === this.memeryData.userInfo.tel || this.username.toString() === this.memeryData.userInfo.email) {
        this.username = '禁止用自己的号冒充！（￣へ￣）'
        this.isUserNameRight = false
      } else {
        this.userList.push(this.username)
        this.username = ''
        this.userAdd = true
      }
      this.showClick = false
    },
    delUser: function (username) {
      for (var i in this.userList) {
        if (username === this.userList[i]) this.userList.splice(i, 1)
      }
    },
    resetUserNameArea: function () {
      if (!this.isUserNameRight) {
        this.username = ''
        this.isUserNameRight = true
      }
    },
    checkUserNameFunc: function () {
      let checkPhone = /^1\d{10}$/
      let checkEmail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
      if (checkPhone.test(this.username) || checkEmail.test(this.username)) {
        this.showClick = true
      } else {
        this.showClick = false
      }
    },
    leftBtnClick: function () {
      this.$router.goBack()
    },
    changeFamily: function () {
      this.memeryData.familyInfo.familyName = this.familyName
      this.memeryData.familyInfo.familyRemark = this.familyRemark
      this.memeryData.familyInfo.familyList = this.userList
      this.memeryData.familyInfo.familyNotice = this.familyNotice
      let userList = ''
      for (let i in this.userList) {
        userList += this.userList[i] + ';'
      }
      let _this = this
      this.$http.post(this.memeryData.serverUrl + '/family/changeFamily', {
        'id': this.memeryData.userInfo.familyId,
        'name': this.familyName,
        'remark': this.familyRemark,
        'userList': userList,
        'notice': this.familyNotice
      }, {emulateJSON: true}).then(function (response) {
        if (response.body.msg === 'success') {
          _this.toastMsg = '修改成功！'
          _this.$refs.toastMsg.openToast()
          setTimeout(function () {
            _this.leftBtnClick()
          }, 1000)
        } else {
          _this.toastMsg = response.body.msgText
          _this.$refs.toastMsg.openToast()
        }
      }, function (response) {
        _this.toastMsg = '保存失败，请联系管理员！'
        _this.$refs.toastMsg.openToast()
        console.log(response)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../../../../style/cssConfig';
  .lineTab {
    position: relative;
    span, p {
      padding: .8rem 1rem;
      color: $defaultBlue;
    }
    input {
      margin: 0 1rem;
      height: 1.5rem;
      line-height: 1.5rem;
      font-size: .9rem;
      border: 1px solid $defaultLightGray;
      width: calc(100% - 2rem);
      padding: .5rem;
      border-radius: .5rem;
    }
    textarea {
      margin: 0 1rem;
      height: 7.5rem;
      font-size: .9rem;
      border: 1px solid $defaultLightGray;
      width: calc(100% - 2rem);
      padding: .5rem;
      border-radius: .5rem;
    }
    h6{
      color: $defaultRed;
      position: absolute;
      top: 1.1rem;
      left: 7rem;
    }
    .userTab{
      span{
        height: 2rem;
        line-height: 2rem;
        border-radius: .2rem;
        text-align: center;
        margin-bottom: .5rem;
        padding: 0;
        &.fl{
          width: 70%;
          margin-left: 1rem;
          color: #333333;
          border: 1px solid $defaultBlue;
          input{
            border: none;
            width: 100%;
            margin: 0;
            text-align: center;
          }
        }
        &.fr{
          width: 20%;
          margin-right: 1rem;
          color: #fff;
          background: $defaultRed;
          border: 1px solid #fff;
          &.noDel{
            background: $defaultLightGray;
          }
        }
      }
      &.add{
        span.fl{
          line-height: 1.7rem;
          font-size: 2rem;
          color: $defaultBlue;
        }
      }
      &.textIn{
        span.fl.error{
          border: 1px solid $defaultRed;
          input{
            color: $defaultRed;
          }
        }
        span.fr{
          background: $defaultGray;
          &.sure{
            background: $defaultGreen;
          }
        }
      }
    }
    button{
      width: 80%;
      height: 3rem;
      border-radius: .5rem;
      margin: 1rem 10%;
      font-size: 1rem;
      background: $defaultGreen;
      color: #fff;
      i{
        font-size: 1.5rem;
        margin-right: .5rem;
        color: #fff;
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
