<template>
  <div class="my">
    <div class="myinfo">
      <img @click="toLogin" :src="avator" alt="">
      <div @click="toLogin">
        <p>{{userInfo.nickName}}</p>
        <p class="integral" v-if="userInfo.nickname">点击登录</p>
        <p class="integral" v-else>积分：1000</p>
      </div>
    </div>
    <div class="list-w">
      <div class="my-monery-list">
        <p>
          ¥ <i>10</i>
          <span>昨日收益</span>
        </p>
        <p>
          ¥ <i>101</i>
          <span>今日收益</span>
        </p>
      </div>
      <div class="my-monery-list bottom-radius">
        <p>
          上月结算 <i class="numb">¥10</i>
        </p>
        <p>
          本月结算 <i class="numb">¥101</i>
        </p>
      </div>
    </div>
    <div class="iconlist">
      <div @click="goTo(item.url)" v-for="(item, index) in listData" :key="index">
        <span class="iconfont" :class="item.icon"></span>
        <span class="text">{{item.title}}</span>
      </div>
    </div>
    <div class="wx-shouquan">
      <div class="concant">
        <h1>微信授权</h1>
        <div class="sq-info">
          <img :src="avator" alt="">
          <p>授权信息呢的了卡雷拉斯授权信息呢的了卡雷拉斯授权信息呢的了卡雷拉斯授权信息呢的了卡雷拉斯</p>
        </div>
        <div class="sq-info-dev">
          <span>申请获取您的信息：</span>
          <p>用户昵称：1111</p>
        </div>
        <div class="bnt-info">
          <button>取消</button><button class="bnt-rihgt">接受授权</button>
        </div>
      </div>
      <div class="wx-gallery"></div>
    </div>
  </div>
</template>

<script>
  import {
    get,
    toLogin,
    login
  } from "../../utils";
  export default {
    onShow() {
      // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
      if (login()) {
        this.userInfo = login();
        console.log(this.userInfo);
        this.avator = this.userInfo.avatarUrl;
      }
    },
    created() {},
    mounted() {},
    data() {
      return {
        avator: "http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png",
        allcheck: false,
        listData: [],
        Listids: [],
        userInfo: {},
        listData: [{
            title: "我的订单",
            icon: "icondingdan",
            url: "/pages/order/main"
          },
          // {
          //   title: "优惠券",
          //   icon: "icon-youhuiquan",
          //   url: ""
          // },
          {
            title: "我的粉丝",
            icon: "iconfensi",
            url: "/pages/fans/main"
          },
          {
            title: "我的收藏",
            icon: "iconshoucang",
            url: "/pages/collectlist/main"
          },
          {
            title: "地址管理",
            icon: "icondizhi",
            url: "/pages/address/main"
          },
          // {
          //   title: "联系客服",
          //   icon: "icon-lianxikefu",
          //   url: ""
          // },
          // {
          //   title: "帮助中心",
          //   icon: "icon-bangzhuzhongxin",
          //   url: ""
          // },
          {
            title: "意见反馈",
            icon: "iconyijianfankui",
            url: "/pages/feedback/main"
          }
        ]
      };
    },
    components: {},
    methods: {
      goTo(url) {
        if (toLogin()) {
          wx.navigateTo({
            url: url
          });
        }
      },
      toLogin() {
        if (!this.userInfo.avatarUrl) {
          wx.navigateTo({
            url: "/pages/login/main"
          });
        }
      }
    },
    computed: {}
  };

</script>
<style lang='scss' scoped>
  @import "./style";

</style>
