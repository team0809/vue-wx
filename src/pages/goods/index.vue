<template>
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
          <span class="quan-after">券后价</span>
          <span class=""><i></i>¥{{goodsInfo.couponAfterPrice}}</span>
        </div>
        <div class="text2">
        {{goodsInfo.volume}}人已买
        </div>
        <div class="text3">
        原价 ¥{{goodsInfo.salePrice}}
        </div>
        <div class="text4">
          返现金额 ¥{{goodsInfo.promotionPrice}}
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
      <div class="right" style="height: 70px;">立即领券</div>
    </div>
      <!--商品描述-->
    <div v-if="goodsInfo.goodsDesc" class="detail-desc">
      <div class="context">{{goodsInfo.goodsDesc}}</div>
    </div>

    <!--商品详情-->
    <div class="goods-info">
      <div class="c">
        <p>{{goodsInfo.name}}</p>
        <p>{{goodsInfo.goods_brief}}</p>
        <div v-if="goodsInfo.name" class="brand">
          <p>{{goodsInfo.name}}</p>
        </div>
      </div>
    </div>

    <div class="bottom-fixed">
      <!--主页按钮-->
      <div class="homes">
        <span class="iconfont iconshouye"></span>
        <p class="pm">首页</p>
      </div>
      <div class="share-box">
        <p class="pms">返现¥ {{goodsInfo.promotionPrice}}</p>
        <span class="iconfont iconfenxiang"></span> 分享
      </div>
      <div class="nbnav4" @click="quanFun">
        <p class="buy-text">省¥ {{goodsInfo.couponPrice}}</p>
        <p class="buy-bnt">优惠购买</p>
      </div>
    </div>
  </div>
</template>

<script>
import { api,userOption } from "../../utils";
export default {
  data() {
    return {
      goodsId:0,
      goodsType:1,
      goodsInfo:{
        goodsType:{name:''}
      }
    };
  },
  onShow() {
  },
  mounted() {
    //登录
    userOption.codeLogin();
    this.goodsId = this.$root.$mp.query.goodsId || 6849491165;
    this.goodsType = this.$root.$mp.query.goodsType || 1;
    this.shareUserId = this.$root.$mp.query.userId || -1;
    //商品详情
    this.goodsDetail();
    //粉丝
    this.fansAdd(shareUserId);
  },
  //商品转发
  onShareAppMessage() {
    console.log(this.goodsInfo.name);
    console.log(this.goodsInfo.id);
    console.log(this.goodsInfo.goodsImg[0]);
   let userId = userOption.getUserInfo().userId;
    return {
      title: this.goodsInfo.name,
      path: "/pages/goods/main?goodsId=" + this.goodsInfo.id+"&goodsType="+this.goodsInfo.goodsType.type+"&userId="+userId,
      imageUrl: this.goodsInfo.goodsImg[0] //拿第一张商品的图片
    };
  },
  methods: {
    quanFun() {
      
    },
    togoodsDetail(id) {
      wx.redirectTo({ url: "/pages/goods/main?id=" + id });
    },
    add() {
      this.number = this.number + 1;
    },
    reduce() {
      if (this.number > 1) {
        this.number = this.number - 1;
      } else {
        return false;
      }
    },
    async goodsDetail() {
      const data = await api.goodsDetail({goodsId: this.goodsId,goodsType: this.goodsType});
      if(data.goodsId==undefined){
        return;
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
        goodsUrl:data.goodsUrl,
        promotionPrice:data.promotionPrice,
        couponAfterPrice:data.couponAfterPrice,
        couponStartTime:data.couponStartTime,
        couponEndTime:data.couponEndTime,
        goodsType:data.goodsType
      };      
    },
    async fansAdd(shareUsreId){
      const data = await api.fansAdd({shareUserId:shareUsreId})
    },
    showType() {
      this.showpop = !this.showpop;
    }
  },
  computed: {}
};
</script>
<style lang='scss' scoped>
@import url("~mpvue-wxparse/src/wxParse.css");
@import "./style.scss";
</style>
