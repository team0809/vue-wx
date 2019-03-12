<template>
  <div class="index">
    <!-- 搜索 -->
    <div class="search">
      <div @click="toMappage">{{cityName}}</div>
      <div @click="toSearch">
        <input type="text" placeholder="搜索商品">
        <span class="icon iconfont iconsousuo"></span>
      </div>
    </div>
    <!-- banner轮播图 -->
    <div class="swiper">
      <swiper class="swiper-container" indicator-dots="true" autoplay="true" interval="3000" circular="true" duration="500">
        <block v-for="(item, index) in banner " :key="index">
          <swiper-item class="swiper-item">
            <image :src="item.image_url" class="slide-image" />
          </swiper-item>
        </block>
      </swiper>
    </div>
    <!-- 大家都在领 -->
    <div class="user-title">
      <div class="u-left">
        <span>&nbsp;</span> 大家都在领
      </div>
      <div class="u-right">
        <span>1111119999</span>  大家都在领
      </div>
    </div>
    <div class="our-cont">
    </div>
    <!-- 优惠列表 -->
    <div class="user-title">
      <div class="u-left">
        <span>&nbsp;</span> 优惠列表
      </div>
      <div class="u-right">
        <span>1111119999</span>  更多
      </div>
    </div>
    <div @click="goodsDetail(item.id)" class="shop-list" v-for="(item,index) in hotGoods" :key="index">
      <image class="imgs" :src="item.list_pic_url" alt="" />
      <div class="list-cont">
        <div class="goods_title">
          {{item.name}}
        </div>
        <div class="result_tm icon">
          <image class="imgs-icon" src="../../../static/list-img/1.jpg" alt="" />
          <span class="icon">包邮</span>
        </div>
        <div class="col-yuan">
          <span> 原价 ¥59.8</span>
          <span class="fr">已售2.6万件</span>
        </div>
        <div class="col-money">
          <p class="p-fr">
            <i class="quan">10元券</i>
          </p>
          券后 
          <span class="s-k">
            <i>¥</i>5.1
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get } from "../../utils";
import { mapState, mapMutations } from "vuex";
export default {
  onShow() {
  },
  computed: {
    ...mapState(["cityName"])
  },
  mounted() {
    this.getCityName();
    this.getData();
  },
  data() {
    return {
      banner: [],
      channel: [],
      brandList: [],
      newGoods: [],
      hotGoods: [],
      topicList: [],
      newCategoryList: []
    };
  },
  components: {},
  methods: {
    ...mapMutations(["update"]),
    toMappage() {
      var _this = this;
      // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
      wx.getSetting({
        success(res) {
          //如果没有同意授权,打开设置
          if (!res.authSetting["scope.userLocation"]) {
            wx.openSetting({
              success: res => {
                _this.getCityName();
              }
            });
          } else {
            wx.navigateTo({
              url: "/pages/mappage/main"
            });
          }
        }
      });
    },
    getCityName() {
      var _this = this;
      var myAmapFun = new amapFile.AMapWX({
        key: "e545e7f79a643f23aef187add14e4548"
      });
      myAmapFun.getRegeo({
        success: function (data) {
          //成功回调
          console.log(data);
          // data[0].regeocodeData.formatted_address
          // _this.cityName = data[0].regeocodeData.formatted_address;
          _this.update({ cityName: data[0].regeocodeData.formatted_address });
        },
        fail: function (info) {
          //失败回调
          console.log(info);
          //如果用户拒绝授权
          // 默认为北京
          _this.cityName = "北京市";
          _this.update({ cityName: "北京市" });
        }
      });
    },
    toSearch() {
      wx.navigateTo({
        url: "/pages/search/main"
      });
    },
    async getData() {
      const data = await get("/index/index");
      this.banner = data.banner;
      this.channel = data.channel;
      this.brandList = data.brandList;
      this.newGoods = data.newGoods;
      this.hotGoods = data.hotGoods;
      this.topicList = data.topicList;
      this.newCategoryList = data.newCategoryList;
    },
    goodsDetail(id) {
      wx.navigateTo({
        url: "/pages/goods/main?id=" + id
      });
    },
    categoryList(id) {
      wx.navigateTo({
        url: "/pages/categorylist/main?id=" + id
      });
    },
    goodsList(info) {
      if (info == "hot") {
        wx.navigateTo({
          url: "/pages/newgoods/main?isHot=" + 1
        });
      } else {
        wx.navigateTo({
          url: "/pages/newgoods/main?isNew=" + 1
        });
      }
    },
    topicdetail(id) {
      wx.navigateTo({
        url: "/pages/topicdetail/main?id=" + id
      });
    },
    totopic() {
      wx.navigateTo({
        url: "/pages/topic/main"
      });
    },
    tobrandList() {
      wx.navigateTo({
        url: "/pages/brandlist/main"
      });
    },
    branddetail(id) {
      wx.navigateTo({
        url: "/pages/branddetail/main?id=" + id
      });
    }
  },
  created() { }
};
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>
