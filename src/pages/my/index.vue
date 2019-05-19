<template>
<form @submit="formSubmit" report-submit="true">
  <div class="my" >
    <div v-if="userInfo.userType==20">
      <div class="myinfo">
        <img :src="userInfo.icon" alt="">
        <div>
          <p>{{userInfo.nickname}}</p>
          <p><span class="type">{{userInfo.typeText}}</span></p>
          <p style="display:none" class="integral" >邀请码: {{userInfo.userNo}}</p>
        </div>
      </div>
      <div class="list-w">
        <div class="context">
          <text class="amount">余额 <text class="price">￥{{centerInfo.surplusAmount}}</text></text>
          <button formType="submit" @click="goTo('/pages/myWithdraw/main')">提现</button>
        </div>
        <div class="my-monery-list shadow">
          <p>
            本月预估 <i class="numb">¥{{centerInfo.currentMountEstimateAmount}}</i>
          </p>
          <p>
            今日收益 <i class="numb">¥{{centerInfo.todayAmount}}</i>
          </p>
        </div>
        <div class="line-border">
          <div></div>
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
         <div @click="goTo('/pages/withdraws/main')" v-if="centerInfo.admin">
          <span class="iconfont iconactivite"></span>
          <span class="text">提现申请</span>
        </div>
      </div>
    </div>
    <div class="normal" v-else>
      <div class="normal-head">
          <div class="myinfo">
            <img :src="userInfo.icon" alt="">
            <div>
              <p>{{userInfo.nickname}}</p>
              <p><span class="type">{{userInfo.typeText}}</span></p>
            </div>
          </div>
        <!-- 优惠列表 -->
        <div class="user-title">
          <div class="u-left">
            <span>&nbsp;</span> 猜你喜欢
          </div>
        </div>
    </div>
    <div class="normal-empty"></div>
    <div @click="goodsDetail(item.goodsId,item.goodsType.type,item.goodsName)" class="shop-list" v-for="(item,index) in goodsList" :key="index">
      <image class="imgs" :src="item.thumbnailImgUrl" alt="" />
      <div class="list-cont">
        <div class="goods_title">
        <span class="platform">{{item.goodsType.name}}</span> {{item.goodsName}}
        </div>
          <div class="col-yuan">
          <span>
            <span class="afprice">
              <i>{{item.hasCoupon?'券后:':'售价'}}¥</i>{{item.couponAfterPrice}}
            </span>
            <span v-if="item.hasCoupon" class="price">原价:¥{{item.salePrice}} </span>
          </span>
          <span class="fr">已售{{item.volume}}件</span>
        </div>
        <div class="col-money">
          <p class="p-fr">
            <i class="quan">{{item.couponPrice}}元券</i>
          </p>
          <span class="s-k" v-if="item.showPromotion">
            <i>佣金 ¥</i>{{item.promotionPrice}}
          </span>
        </div>
      </div>
    </div>

    </div>

    <div class="wx-shouquan" v-if="aouth.show">
      <div class="concant">
        <div class="sq-info">
          <img :src="aouthImg" alt="">
        </div>
        <div class="bnt-info">
          <button open-type="getUserInfo" @getuserinfo="aouthLogin" class="bnt-rihgt bnt-max">登录授权</button>
        </div>
      </div>
      <div class="wx-gallery"></div>
    </div>
  </div>
  </form>
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
            url: "/pages/order/main",
          },
          {
            title: "我的粉丝",
            icon: "iconfensi",
            url: "/pages/fans/main",
          },
           {
            title: "收支明细",
            icon: "iconszdetail",
            url: "/pages/myPayDetail/main",
          },
           {
            title: "渠道商奖励活动",
            icon: "iconactivite",
            url: "/pages/agentActivity/main",
          }
        ],
        aouth:{
          show:false
        },
        centerInfo:{},
        goodsList:[],
        //参数
        params:{
          canLoadHotGoods:true,
          //热卖商品
          hotGoods:{
            pageIndex:1,
            pageSize:20,
            hasCoupon:true
          }
        }
      };
    },
   async onShow() {
      // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
       //是否授权登录
      if(!userOption.hasAouthLogin()){
       await this.aouthLogin();
      }
      //设置用户信息
      this.userInfo = userOption.getUserInfo();

      //加载个人中心数据
      if(this.userInfo.userType==20){
        await this.initCenterInfo();
      }else{
        await this.loadGoods();
      }
    },
    //滚动底部
    async onReachBottom(){ 
       await this.loadGoods();
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
      },
      //猜你喜欢商品
      async loadGoods(){
          if(this.params.canLoadHotGoods==false){
            return;
          }
          //热门商品
          this.params.canLoadHotGoods=false;
          let goodsData = await api.weekenGoods(this.params.hotGoods);
          //是否还有数据加载
          if(goodsData.length>0){
            this.params.canLoadHotGoods=true;
            //分页数+1
            this.params.hotGoods.pageIndex++;
          }
          //添加到数据集
          if(goodsData!=null){
            goodsData.forEach((item)=>{
              this.goodsList.push(item);
            })
          }
      },
      //form提交
      formSubmit(e){
        if(e.target.formId!='the formId is a mock one'){
          api.formIdAdd({formId:e.target.formId});
        }
      }
    },
    computed: {}
  };

</script>
<style lang='scss' scoped>
  @import "./style";

</style>
