<template>
<form @submit="formSubmit" report-submit="true">
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
            <image :src="item.imgSrc" class="slide-image" @click="bannerClick(item.linkAddress)" />
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

    <!-- 渠道合作商 -->
    <div class="user-title" v-if="estimateRate.onceRate!=0">
      <div class="u-left">
        <span>&nbsp;</span> 邀您为渠道伙伴享以下福利
      </div>
      <div class="u-right"><span></span></div>
    </div>
    <div class="channel" v-if="estimateRate.onceRate!=0">
        <ul>
          <li>1.直属粉丝下单额外享有<span class="rate">{{estimateRate.onceRate}}%</span>的返现奖励</li>
          <li>2.推荐粉丝下单额外享有<span class="rate">{{estimateRate.twoRate}}%</span>的返现奖励</li>
          <li>3.参与完成渠道商活动获得<span class="rate">丰厚赏金</span>奖励</li>
        </ul>
        <div class="button" @click="goAgentActivity">
          <button form-type="submit">立即参与</button>
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

    <div @click="goodsDetail(item.goodsId,item.goodsType.type,item.goodsName)" class="shop-list" v-for="(item,index) in hotGoods" :key="index">
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
     <button class="share" hover-class="none" form-type="submit" open-type="share" value="">分享好友</button>
  </div>
</form>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get,client,userOption,mta } from "../../utils";
import { api } from "../../utils/api";
import { mapState, mapMutations } from "vuex";
export default {
  onShow() {
    this.loadClipboard();
  },
  data(){
    return {
      banner: [],
      hotGoods: [],
      weekenGoods:[],
      topicList: [],
      estimateRate:{onceRate:0,twoRate:0},
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
  //商品转发
  onShareAppMessage() {
   let userIdInfo = userOption.getUserInfo();
   mta.Event.stat("home_click_share",{userId:userIdInfo.userId});
    return {
      path: "/pages/index/main?userId="+userIdInfo.userId,
      imageUrl: '/static/images/img_index_share.png' //拿第一张商品的图片
    };
  },
  computed: {
    ...mapState(["cityName"])
  },
  async mounted() {
    let shareUserId = this.$root.$mp.query.userId || -1;
    console.log("参数");
    console.log(this.$root.$mp.query);
    await this.init();
    await this.getWeekenGoodsData();
    await this.getHotGoodsData();
    await this.fansAdd(shareUserId);
    mta.Page.init();
  },
  //滚动底部
  onReachBottom(){ 
      this.getHotGoodsData();
  },
  components: {},
  methods: {
    ...mapMutations(["update"]),
    async init(){
      //用户登录
      let userInfo = await userOption.codeLogin();
      //默认数据
      const defaultInfo = await api.defaultInfo();
      this.banner = defaultInfo.banners;
      this.topicList = defaultInfo.hotNews;
      this.estimateRate = defaultInfo.estimateRate;
    },
    // 剪贴板内容
    async loadClipboard(){
       //获取剪贴板内容
      let clipboardData = await client.getClipboardData();
      //判断是否包含中文
      if(clipboardData.trim()!="" && escape(clipboardData).indexOf("%u")>=0){
          this.clipboard.show = true;
          this.clipboard.data = clipboardData;
         let success = await client.setClipboardData("  ");
      }
    },
    toSearch() {
      client.navigateTo({
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
    goodsDetail(id,type,goodsName) {
      mta.Event.stat("home_click_goods",{goodsName:goodsName,goodsId:id});
      client.navigateTo({
        url:"/pages/goods/main?goodsId="+id+"&goodsType="+type
      });
    },
    //跳转渠道商
    goAgentActivity(){
      client.navigateTo({
        url:"/pages/agentActivity/main"
      });
    },
    optionClipboard(search){
      if(search){
         client.navigateTo({url:"/pages/search/main?keyword="+this.clipboard.data});
      }
      this.clipboard.show=false;
    },
    async fansAdd(userId){
      if(userId!=-1){
        let data = await api.fansAdd({shareUserId:userId,msg:'首页分享'});
      }
    },
    bannerClick (linkAddress) {
       client.navigateTo({
        url:linkAddress
      });
    },
    //form提交
    formSubmit(e){
      if(e.target.formId!='the formId is a mock one'){
        api.formIdAdd({formId:e.target.formId});
      }
    }
  }
  };
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>
