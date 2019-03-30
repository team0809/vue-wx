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
            <image :src="item.imgSrc" class="slide-image" />
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
        <span></span>
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
        <span></span> 
      </div>
    </div>
      <scroll-view @scrolltolower="toLower" :scroll-y="true">
        <div @click="goodsDetail(item.goodsId,item.goodsType.type)" class="shop-list" v-for="(item,index) in hotGoods" :key="index">
          <image class="imgs" :src="item.thumbnailImgUrl" alt="" />
          <div class="list-cont">
            <div class="goods_title">
            <span class="platform">{{item.goodsType.name}}</span> {{item.goodsName}}
            </div>
            <div class="result_tm icon">
              <span class="icon"></span>
            </div>
            <div class="col-yuan">
              <span> 原价 ¥{{item.salePrice}}</span>
              <span class="fr">已售{{item.volume}}万件</span>
            </div>
            <div class="col-money">
              <p class="p-fr">
                <i class="quan">{{item.couponPrice}}元券</i>
              </p>
              券后 
              <span class="s-k">
                <i>¥</i>{{item.couponAfterPrice}}
              </span>
            </div>
          </div>
        </div>
      </scroll-view>
    <!-- 弹窗 -->
    <div class="index-warps" v-show="clipboard.show">
      <div class="index-concant">
        <div class="title-img">
          <image class="imgs" :src="imgs.layerSerachImg" />
        </div>
        <div class="copy-cont">
          <p>{{clipboard.data}}</p>
        </div>
        <div class="copy-bnt">
          <button v-on:click="optionClipboard(false)">取消</button><button class="bnt-rihgt"  v-on:click="optionClipboard(true)">搜索</button>
        </div>
      </div>
      <div class="wx-gallery"></div>
    </div>
  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get,client,userOption } from "../../utils";
import { api } from "../../utils/api";
import { mapState, mapMutations } from "vuex";
export default {
  onShow() {
  },
  data() {
    return {
      banner: [],
      hotGoods: [],
      topicList: [],
      newCategoryList: [],
      imgs:{
        layerSerachImg:"/static/images/tanch-title-bg.png",
      },
      listLoading:false,
      //参数
      params:{
        canLoadHotGoods:true,
        //热卖商品
        hotGoods:{
          pageIndex:1,
          pageSize:20,
          hasCoupon:true
        }
      },
      clipboard:{
        show:false,
        data:'',
      }
    };
  },
  computed: {
    ...mapState(["cityName"])
  },
  mounted() {
    this.init();
    this.getCityName();
    this.getHotGoodsData();
  },
  //滚动底部
  onReachBottom(){ 
      this.getHotGoodsData();
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
    async init(){
      
      //用户登录
      let userInfo = userOption.codeLogin();
      
      //获取剪贴板内容
      let clipboardData = await client.getClipboardData();
      console.log('剪贴板内容：'+clipboardData);
      if(clipboardData!=""){
          this.clipboard.show = true;
          this.clipboard.data = clipboardData;
          //清空剪贴板
          await client.setClipboardData("");
      }
      //默认数据
      const defaultInfo = await api.defaultInfo();
      this.banner = defaultInfo.banners;
      this.topicList = defaultInfo.hotNews;
    },
    toLower(){
      console.log(1231231);
    },
    getCityName() {
      return;
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
    async getHotGoodsData() {
      if(this.params.canLoadHotGoods==false){
        return;
      }
      //热门商品
      this.params.canLoadHotGoods=false;
      let goodsData = await api.hotGoods(this.params.hotGoods);
      //是否还有数据加载
      if(goodsData.length>0){
        this.params.canLoadHotGoods=true;
         //分页数+1
        this.params.hotGoods.pageIndex++;
      }
      //添加到数据集
      if(goodsData!=null){
        goodsData.forEach((item)=>{
          this.hotGoods.push(item);
        })
      }
    },
    goodsDetail(id,type) {
      client.navigateTo({
        url: "/pages/goods/main?goodsId=" + id+"&goodsType="+type
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
    },
    optionClipboard(search){
      if(search){
         client.navigateTo({url:"/pages/search/main?keyword="+this.clipboard.data});
      }
      this.clipboard.show=false;
    }
  },
  created() { }
};
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>
