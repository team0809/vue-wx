<template>
  <div class="login">
    <div class="logo">

    </div>
    <button class="login-btn" open-type="getUserInfo" lang="zh_CN" @getuserinfo="doLoginT">微信登录</button>
  </div>
</template>

<script>
  import {
    host,
    login,
    api
  } from "../../utils";
  var qcloud = require("wafer2-client-sdk/index.js");
  export default {
    created() {},
    mounted() {

      qcloud.setLoginUrl(host + "/login");
    },
    data() {
      return {};
    },
    components: {},
    methods: {
      doLogin() {
        wx.showLoading({
          title: "登录中...", //提示的内容,
          mask: true, //显示透明蒙层，防止触摸穿透,
          success: res => {}
        });
        const session = qcloud.Session.get();
        if (session) {
          // 第二次登录
          // 或者本地已经有登录态
          // 可使用本函数更新登录态
          qcloud.loginWithCode({
            success: res => {
              console.log(111111);
              console.log(res);
              // this.setData({ userInfo: res, logged: true });
              wx.setStorageSync("key", "value");
            },
            fail: err => {
              console.error(err);
            }
          });
        } else {
          // 首次登录
          qcloud.login({
            success: res => {
              console.log(res);
              wx.hideLoading();
              wx.setStorageSync("userInfo", res);
              var openId = res.openId;
              wx.setStorageSync("openId", openId);
              wx.navigateBack({});
            },
            fail: err => {
              console.log(err);
              wx.hideLoading();
              wx.navigateBack({});
            }
          });
        }
      },
      doLoginT(){ 
        //判断是否已经获取到用户信息
         this.codeLogin();
         return;
        if (login()) {
          codeLogin();
          return;
        }

        //判断用户是否授权
        wx.getSetting({
          success: function(res) {
            //是否授权
            if (res.authSetting['scope.userInfo']) {
              wx.login({success(lres){
                wx.getUserInfo({
                  success: (res) => {
                    const sub ={
                      code: lres.code,
                      tpNick: res.userInfo.nickName,
                      tpIcon: res.userInfo.avatarUrl,
                      tpSex: res.userInfo.gender,
                      tpProvince: res.userInfo.province,
                      tpCity: res.userInfo.city,
                    };
                    tools.ajax("api/user/wechatSave", JSON.stringify(sub),"JSON",function(hres){
                        if(hres.code==0){
                          tools.autoLogin(function(hasSuccess,userInfo){
                            callback(userInfo)
                          })
                        }
                    })
                  }
                });
              }
              });
            }
          }
        })
      },
      codeLogin(){
          wx.login({
            success(lres) {
              console.log(lres);
                let data = api.codeLogin({ code: lres.code});
                console.log(data);
                // if (res.code == 0 && res.data!=null) {
                //   const userInfo = {
                //     id: res.data.userInfo.userId,
                //     userNick: res.data.userInfo.tpNick,
                //     userIcon: res.data.userInfo.tpIcon,
                //     userSex: res.data.userInfo.tpSex,
                //     userTpId: res.data.userInfo.tpId
                //   }
                //   //设置用户信息
                //   getApp().userInfo = userInfo;
                //   //设置登录令牌
                //   getApp().config.authToken = res.data.token;
                //   callback(true,userInfo);
                // }else{
                //   callback(false,null)
                // }
            }
        });
      }
    },
    computed: {}
  };

</script>
<style lang='scss' scoped>
  @import "./style";

</style>
