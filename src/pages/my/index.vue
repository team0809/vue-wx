<template>
  <div class="my">
    <div class="myinfo">
      <img :src="userInfo.icon" alt="">
      <div>
        <p>{{userInfo.nickname}}<span class="type">{{userInfo.typeText}}</span></p>
        <p class="integral" >邀请码: {{userInfo.userNo}}</p>
      </div>
    </div>
    <div class="list-w">
      <div class="my-monery-list">
        <p>
          ¥ <i>{{centerInfo.currentMountEstimateAmount}}</i>
          <span>本月预估</span>
        </p>
        <p>
          ¥ <i>{{centerInfo.todayAmount}}</i>
          <span>今日收益</span>
        </p>
      </div>
      <div class="my-monery-list bottom-radius">
        <p>
          上月预估 <i class="numb">¥{{centerInfo.lastMonthEstimateAmount}}</i>
        </p>
        <p>
          上月结算 <i class="numb">¥{{centerInfo.lastMonthBalanceAmount}}</i>
        </p>
      </div>
    </div>
    <div class="iconlist">
      <div @click="goTo(item.url)" v-for="(item, index) in listData" :key="index">
        <span class="iconfont" :class="item.icon"></span>
        <span class="text">{{item.title}}</span>
      </div>
    </div>
    <div class="wx-shouquan" v-if="aouth.show">
      <div class="concant">
        <h1>微信登录授权</h1>
        <div class="sq-info">
          <img :src="aouthImg" alt="">
        </div>
        <div class="bnt-info">
          <button open-type="getUserInfo" @getuserinfo="aouthLogin" class="bnt-rihgt bnt-max">授权</button>
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
    login,
    client,
    userOption,
    api
  } from "../../utils";
  export default { 
    data() {
      return {
        aouthImg:"/static/images/wechat-aouth.png",
        allcheck: false,
        Listids: [],
        userInfo: {},
        listData: [
          {
            title: "我的订单",
            icon: "icondingdan",
            url: "/pages/order/main"
          },
          {
            title: "我的粉丝",
            icon: "iconfensi",
            url: "/pages/fans/main"
          },
           {
            title: "收支明细",
            icon: "iconfensi",
            url: "/pages/myPayDetail/main"
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
          {
            title: "意见反馈",
            icon: "iconyijianfankui",
            url: "/pages/feedback/main"
          }
        ],
        aouth:{
          show:false
        },
        centerInfo:{},
      };
    },
    onShow() {
      // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
       //是否授权登录
      if(!userOption.hasAouthLogin()){
        this.aouthLogin();
      }else{
        this.userInfo = userOption.getUserInfo();
      }
      //加载个人中心数据
      this.initCenterInfo();
    },
    components: {},
    methods: {
      goTo(url) {
        if (userOption.hasAouthLogin()) {
          client.navigateTo({
            url: url
          });
        }else{
          this.aouthLogin();
        }
      },
      toLogin() {
        if (!this.userInfo.avatarUrl) {
          wx.navigateTo({
            url: "/pages/login/main"
          });
        }
      },
      //授权登录
      async aouthLogin(){
        var settings =  await client.getSetting();
        console.log(settings);
        if(settings.authSetting['scope.userInfo']){
          var loginRes =  await client.login();
          var userRes = await client.getUserInfo();
          console.log(loginRes);
          console.log(userRes);
          if(userRes!=null){
            //隐藏弹出层
            this.aouth.show = false;
            //获取用户信息
            const subData ={
                  code: loginRes.code,
                  tpNick: userRes.userInfo.nickName,
                  tpIcon: userRes.userInfo.avatarUrl,
                  tpSex: userRes.userInfo.gender,
                  tpProvince: userRes.userInfo.province,
                  tpCity: userRes.userInfo.city,
                };
                console.log(subData);
            //保存用户信息
            let userData = await api.saveUserInfo(subData);
            if(userData!=null){
              userOption.setUserInfo(userData);
              //设置用户信息
              this.userInfo =userOption.getUserInfo();
            }
          }
          console.log(userRes);
        }else{
          //提示用户授权
          this.aouth.show = true;
        }
      },
      //加载个人中心数据
      async initCenterInfo(){
          let centerInfo = await api.centerInfo();
          this.centerInfo = centerInfo;
          console.log(centerInfo);
      }
    },
    computed: {}
  };

</script>
<style lang='scss' scoped>
  @import "./style";

</style>
