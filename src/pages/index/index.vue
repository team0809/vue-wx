<template>
  <div class="index">
    <!-- 搜索 -->
    <div class="search">
      <div @click="toSearch">
        <input type="text" placeholder="商品搜索">
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
       <div class="hidden">
          <div class="item" v-for="(item,index) in topicList" :key="index">
              <div class="icon">
                <img :src="item.icon" />
                <span>{{item.nickname}}</span>
              </div>
              <div class="time">
                {{item.timeText}}
              </div>
              <div class="desc" v-if="item.type==1">
                领取<span class="price">{{item.amount}}元优惠券</span>
              </div>
              <div class="desc" v-else-if="item.type==2">
                获得返利<span class="price">{{item.amount}}元</span>
              </div>
              <div class="desc" v-else-if="item.type==3">
                提现<span class="price">{{item.amount}}元</span>
              </div>
          </div>
      </div>
    </div>

    <!-- 未知领域 -->
    <div class="user-title">
      <div class="u-left">
        <span>&nbsp;</span> 本周热卖
      </div>
      <div class="u-right">
        <span></span>
      </div>
    </div>
    <!-- 热卖商品 -->
    <div class="user-ling-list">
      <div class="user-wrapper" v-for="item in weekenGoods" v-bind:key="item" @click="goodsDetail(item.goodsId,item.goodsType.type)" >
        <div class="swiper-cent">
          <div class="cent">
            <a href="javascript:;" @click="goFun" class="img">
              <img :src="item.thumbnailImgUrl" alt="">
              <p class="text">{{item.volume}}<span>人已领 </span> <i> |</i> {{item.couponPrice}}元券</p>
            </a>
              <p class="name">{{item.goodsName}}</p>
              <p class="money"><i>¥</i>{{item.couponAfterPrice}} <del>¥{{item.salePrice}}</del></p>
              <p class="progress"><i style="width: 46%;"></i></p>
          </div>
        </div>
      </div>
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

    <div @click="goodsDetail(item.goodsId,item.goodsType.type)" class="shop-list" v-for="(item,index) in hotGoods" :key="index">
      <image class="imgs" :src="item.thumbnailImgUrl" alt="" />
      <div class="list-cont">
        <div class="goods_title">
        <span class="platform">{{item.goodsType.name}}</span> {{item.goodsName}}
        </div>
        <div class="col-yuan">
          <span>
            <span class="afprice">
              <i>¥</i>{{item.couponAfterPrice}}
            </span>
            <span class="price"> ¥{{item.salePrice}} </span>
          </span>
          <span class="fr">已售{{item.volume}}件</span>
        </div>
        <div class="col-money">
          <p class="p-fr">
            <i class="quan">{{item.couponPrice}}元券</i>
          </p>
          <span class="s-k">
            <i>返现 ¥</i>{{item.promotionPrice}}
          </span>
        </div>
      </div>
    </div>
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
    <!-- 分享好友 -->
     <button class="share" hover-class="none" open-type="share" value="">分享好友</button>
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
      weekenGoods:[],
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
      },
      shareUserId:-1
    };
  },
  //商品转发
  onShareAppMessage() {
   let userId = userOption.getUserInfo().userId;
    return {
      title: '西瓜红包',
      path: "/pages/index/main?userId="+userId,
      imageUrl: '/static/images/img_index_share.png' //拿第一张商品的图片
    };
  },
  computed: {
    ...mapState(["cityName"])
  },
  mounted() {
    this.shareUserId = this.$root.$mp.query.userId || -1;
    this.init();
    this.getWeekenGoodsData();
    this.getHotGoodsData();
    this.fansAdd();
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
    //本周热卖
    async getWeekenGoodsData(){ 
      let goodsData = await api.weekenGoods({ hasCoupon:true});
     //添加到数据集
      if(goodsData!=null){
        goodsData.forEach((item)=>{
          this.weekenGoods.push(item);
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
    },
    async fansAdd(){
      if(this.shareUserId!=-1){
        const data = await api.fansAdd({shareUserId:shareUsreId,msg:'首页分享'});
      }
    },
    goFun () {
      console.log('ni dian le gan ma')
    }
  }
  };
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>
