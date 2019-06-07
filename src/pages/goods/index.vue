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
      <button class="share" hover-class="none" open-type="share" value="">分享商品</button>
    </div>
    <div class="info-block">
      <!--商品标题 -->
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
        <div class="text4" v-if="goodsInfo.showPromotion">
          佣金 ¥{{goodsInfo.promotionPrice}}
        </div>
      </div>
    </div>
    <!--领取优惠券按钮-->
    <div class="coupon-box" v-if="goodsInfo.hasCoupon">
      <div class="left">
        <div class="top-txt"><span class="font">{{goodsInfo.couponPrice}}</span> 元优惠券</div>
        <div class="bottom-txt">
          使用期限:{{goodsInfo.couponStartTime}} - {{goodsInfo.couponEndTime}}					</div>
      </div>
      <div class="right" @click="openApp(goodsInfo)">
         <button formType="submit">立即领券</button>
      </div>
    </div>
    <!--商品描述-->
    <div v-if="goodsInfo.goodsDesc" class="detail-desc">
      <div class="context">{{goodsInfo.goodsDesc}}</div>
    </div> 

    <div class="bottom-fixed">
      <!--主页按钮-->
      <div class="homes" @click="goHome">
        <span class="iconfont iconshouye"></span>
        <button class="pm" form-type="submit">首页</button>
      </div>
      <div v-if="goodsInfo.hasCoupon" class="nbnav4" @click="openApp(goodsInfo)">
        <p class="buy-text">省¥ {{goodsInfo.couponPrice}}</p>
        <button class="buy-bnt" form-type="submit">领券购买</button>
      </div>
      <div v-else class="nbnav4" @click="openApp(goodsInfo)">
        <button class="buy-more" form-type="submit">下单购买</button>
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
      shareUserId:-1,
      goodsId:0,
      goodsType:1,
      goodsInfo:{
        goodsType:{name:'',showPromotion:false}
      },
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
    this.shareUserId = this.$root.$mp.query.userId || -1;
    //商品详情
    await  this.goodsDetail();
    //粉丝
    await this.fansAdd(this.shareUserId); 
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
   mta.Event.stat("goods_share",{goodsId:this.goodsId,goodsName:this.goodsInfo.goodsName});
    return {
      title: '【'+this.goodsInfo.goodsType.name+'】'+this.goodsInfo.goodsName,
      path: sharePath,
      imageUrl: this.goodsInfo.shareImgPath //拿第一张商品的图片
    };
  },
  methods: {
    //跳转至首页
    goHome(){
      mta.Event.stat("goods_home",{});
      client.switchTab({url:'/pages/index/main'});
    },
    async goodsDetail() {
      const data = await api.goodsDetail({goodsId: this.goodsId,goodsType: this.goodsType});
      if(data.goodsId==undefined){
         client.switchTab({url:'/pages/index/main'});
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
    async fansAdd(userId){
      if(userId!=-1){
        const data = await api.fansAdd({shareUserId:userId,msg:'商品页分享'})
      }
    },
    async openApp(goodsInfo){
     let openState = await client.navigateToMiniProgram({
            appId:goodsInfo.miniAppId,
            path:goodsInfo.goodsUrl
      });
     mta.Event.stat("goods_buy",{goodsName:goodsInfo.goodsName,goodsId:goodsInfo.goodsId});
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
@import "./style.scss";
</style>
