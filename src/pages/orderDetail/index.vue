<template>
<form @submit="formSubmit" report-submit="true">
  <div class="goods">
    
     <div class="swiper">
      <!--商品详情轮播图-->
      <swiper class="swiper-container" indicator-dots="true" autoplay="true" interval="3000" duration="1000">
        <block v-for="(item, index) in goodsInfo.goodsImg " :key="index">
          <swiper-item class="swiper-item">
            <image :src="item" class="slide-image" />
          </swiper-item>
        </block>
      </swiper>
    </div>

    <!--商品内容-->
    <div class="info-block">
        <div class="goods-title">
            <span class="platform">{{goodsInfo.goodsType.name}}</span> {{goodsInfo.goodsName}}
        </div>
        <!--优惠相关-->
        <div class="quan-warp">
            <div class="text1">
            <span class="quan-after" v-if="goodsInfo.hasCoupon">券后价</span>
            <span class=""><i></i>¥{{goodsInfo.couponAfterPrice}}</span>
            </div>
            <div class="text2">
            {{goodsInfo.volume}}人已买
            </div>
            <div class="text3">
            原价 ¥{{goodsInfo.salePrice}}
            </div>
            <div class="text4">
            佣金金额 ¥{{goodsInfo.promotionPrice}}
            </div>
        </div>
    </div>
    <!--订单信息-->
    <div class="order-info">
        <p class="title">订单信息</p>
        <ul>
            <li><span class="name">订单号：</span> <span class="value">{{orderInfo.orderNum}}</span> </li>
            <li><span class="name">订单状态：</span> <span>{{orderInfo.orderStatusText}}</span> </li>
             <li><span class="name">下单用户：</span> <span >{{orderInfo.balanceTypeText}}</span> </li>
            <li v-if="goodsInfo.showPromotion">
              <span class="name">佣金金额：</span> 
              <span class="price">￥{{orderInfo.balanceAmount}}</span>
              <span class="normal" v-if="orderInfo.balanceState==0" >预计{{orderInfo.balanceTime}}结算</span>
              <span class="normal" v-else>已结算</span>
            </li>
            <li><span class="name">下单金额：</span> <span class="price">￥{{orderInfo.orderPrice}} </span> </li>
            <li v-if="goodsInfo.hasCoupon"><span class="name">优惠券额：</span> <span class="price">￥{{goodsInfo.couponPrice}}</span> </li>
            <li class="last"><span class="name">下单时间：</span> <span>{{orderInfo.createTime}}</span> </li>
        </ul>
        <p class="desc">商品实惠记得分享给好友哦\(^o^)/</p>
    </div>

    <div class="again" @click="openApp(goodsInfo)">
        <button form-type="submit">再来一单</button>
    </div>

    <div class="bottom-fixed">
      <!--主页按钮  -->
      <div class="homes" @click="goHome">
        <span class="iconfont iconshouye"></span>
        <button class="pm" form-type="submit" data-name="home">首页</button>
      </div>
      <div class="nbnav4" >
        <span class="iconfont iconshare"></span>
        <button class="share" form-type="submit" open-type="share">分享好友</button>
      </div>
    </div>
  </div>
</form>
</template>
<script>
import { api,userOption,client,mta } from "../../utils";
export default {
  data() {
    return {
      goodsId:0,
      goodsType:1,
      goodsInfo:{
        goodsType:{name:'',showPromotion:false}
      },
      orderInfo:{},
      shareImgPath:''
    };
  },
  onShow() {
  },
 async mounted() {
    //登录
    await userOption.codeLogin();
    this.goodsId = this.$root.$mp.query.goodsId || 6849491165;
    this.goodsType = this.$root.$mp.query.goodsType || 1;
    let orderId = this.$root.$mp.query.orderId || 1;
    //商品详情
    await  this.goodsDetail();
    //订单详情
    await this.orderDetail(orderId);
    //统计
    mta.Page.init();
  },
  //商品转发
  onShareAppMessage() {
   let userId = userOption.getUserInfo().userId;
   let sharePath =  "/pages/goods/main?goodsId=" +this.goodsId+"&goodsType="+this.goodsType+"&userId="+userId;
   //获取生成后的图片地址
   api.createGoodsShareImg({imgUrl: encodeURIComponent(this.goodsInfo.goodsImg[0]),price:this.goodsInfo.couponAfterPrice});
   //埋点
   mta.Event.stat("order_detail_share",{goodsId:this.goodsId,goodsName:this.goodsInfo.goodsName});
    return {
      title: this.goodsInfo.goodsName,
      path: sharePath,
      imageUrl: this.goodsInfo.shareImgPath //拿第一张商品的图片
    };
  },
  methods: {
    //跳转至首页
    goHome(){
      mta.Event.stat("order_detail_home",{});
      client.switchTab({url:'/pages/index/main'});
    },
    async goodsDetail() {
      const data = await api.goodsDetail({goodsId: this.goodsId,goodsType: this.goodsType});
      if(data.goodsId==undefined){
        return;
      }
      let goodsLinks = data.goodsUrl.split('!@#');
      if(goodsLinks.length!=2){
        goodsLinks = ['',data.goodsUrl];
      }
      this.goodsInfo ={
        goodsId: data.goodsId,
        goodsName: data.goodsName,
        goodsMainImgs:data.goodsMainImg,
        salePrice:data.salePrice,
        volume:data.volume,
        hasCoupon:data.hasCoupon,
        couponPrice:data.couponPrice,
        shopName:data.shopName,
        goodsEvalCount:data.goodsEvalCount,
        goodsImg:data.goodsImg,
        goodsDesc:data.goodsDesc,
        miniAppId:goodsLinks[0],
        goodsUrl:goodsLinks[1],
        promotionPrice:data.promotionPrice,
        couponAfterPrice:data.couponAfterPrice,
        couponStartTime:data.couponStartTime,
        couponEndTime:data.couponEndTime,
        goodsType:data.goodsType,
        shareImgPath:data.shareImgPath,
        showPromotion: data.showPromotion
      };      
    },
    async orderDetail(orderId){
        const data = await api.orderDetail({orderId: orderId});
        this.orderInfo = data;
    },
    async openApp(goodsInfo){
     let openState = await client.navigateToMiniProgram({
            appId:goodsInfo.miniAppId,
            path:goodsInfo.goodsUrl
      });
      mta.Event.stat("order_detail_buy",{goodsName:goodsInfo.goodsName,goodsId:goodsInfo.goodsId});
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
@import url("~mpvue-wxparse/src/wxParse.css");
@import "./style.scss";
</style>