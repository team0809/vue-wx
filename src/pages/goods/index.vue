<template>
  <div class="goods">
    <div class="swiper">
      <!--商品详情轮播图-->
      <swiper class="swiper-container" indicator-dots="true" autoplay="true" interval="3000" duration="1000">
        <block v-for="(item, index) in gallery " :key="index">
          <swiper-item class="swiper-item">
            <image :src="item.img_url" class="slide-image" />
          </swiper-item>
        </block>
      </swiper>
      <button class="share" hover-class="none" open-type="share" value="">分享商品</button>
    </div>
    <!--优惠相关-->
    <div class="quan-warp">
      <div class="text1">
        券后价
        <span class=""><i>¥</i>29.99</span>
      </div>
      <div class="text2">
       已售86.9万
      </div>
      <div class="text3">
       天猫价 ¥{{info.retail_price}}
      </div>
    </div>
    <!--领取优惠券按钮-->
    <div class="coupon-box">
      <div class="left">
        <div class="top-txt"><span class="font">300</span> 元优惠券</div>
        <div class="bottom-txt">
          使用期限:2019-03-25 - 2019-03-28					</div>
      </div>
      <div class="right" style="height: 70px;">立即领券</div>
    </div>
    <!--商品详情-->
    <div class="goods-info">
      <div class="c">
        <p>{{info.name}}</p>
        <p>{{info.goods_brief}}</p>
        <div v-if="brand.name" class="brand">
          <p>{{brand.name}}</p>
        </div>
      </div>
    </div>
    <div v-if="attribute.length!=0" class="attribute">
      <div class="head">
        商品参数
      </div>
    </div>
    <div v-if="goods_desc" class="detail">
      <wxParse :content="goods_desc" />
    </div>
    <div class="bottom-fixed">
      <!--主页按钮-->
      <div class="homes">
        <span class="iconfont iconshouye"></span>
        <p class="pm">首页</p>
      </div>
      <div class="share-box">
        <p class="pms">赚¥ 100</p>
        <span class="iconfont iconfenxiang"></span> 分享
      </div>
      <div class="nbnav4" @click="quanFun">
        <p class="buy-text">省¥100</p>
        <p class="buy-bnt">优惠购买</p>
      </div>
    </div>
  </div>
</template>

<script>
import { get, post, toLogin, login, getStorageOpenid } from "../../utils";
import wxParse from "mpvue-wxparse";

export default {
  onShow() {
  },
  mounted() {
    //判断是否登录获取用户信息
    if (login()) {
      this.userInfo = login();
    }
    console.log(this.$root.$mp.query.id);

    this.id = this.$root.$mp.query.id;

    this.openId = getStorageOpenid();
    this.goodsDetail();
  },
  //商品转发
  onShareAppMessage() {
    console.log(this.info.name);
    console.log(this.info.id);
    console.log(this.gallery[0].img_url);

    return {
      title: this.info.name,
      path: "/pages/goods/main?id=" + this.info.id,
      imageUrl: this.gallery[0].img_url //拿第一张商品的图片
    };
  },
  data() {
    return {
      allnumber: 0,
      openId: "",
      number: 0,
      gallery: [],
      info: {},
      brand: {},
      attribute: [],
      productList: [],
      goods_desc: "",
      id: "",
      userInfo: "",
      goodsId: "",
      allPrise: ""
    };
  },
  components: {
    wxParse
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
      const data = await get("/goods/detailaction", {
        id: this.id,
        openId: this.openId
      });
      this.gallery = data.gallery;
      this.info = data.info;
      this.allPrise = data.info.retail_price;
      this.goodsId = data.info.id;
      this.brand = data.brand;
      this.attribute = data.attribute;
      this.goods_desc = data.info.goods_desc;
      this.allnumber = data.allnumber;
      this.productList = data.productList;
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
