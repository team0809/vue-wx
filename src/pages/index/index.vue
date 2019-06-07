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
    <div class="banner">
      <image :src="imgs.bannerA" mode="widthFix" class="back" />
      <p class="title">网购 先领券 再购买 更省钱</p>
      <p class="desc"><span>80%</span>以上商品的都有隐藏优惠券<br />网购下单前一定要先领优惠券哦</p>
      <span class="lock" @click="toExplain">查看领券秘笈</span>
    </div>
    <!-- banner轮播图 -->
    <!-- <div class="swiper" style="display:none;">
      <swiper class="swiper-container" indicator-dots="true" autoplay="true" interval="3000" circular="true" duration="500">
        <block v-for="(item, index) in banner " :key="index">
          <swiper-item class="swiper-item">
            <image :src="item.imgSrc" class="slide-image" @click="bannerClick(item.linkAddress)" />
          </swiper-item>
        </block>
      </swiper>
    </div> -->

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

    <!-- 优惠列表 -->
    <div class="user-title">
      <div class="u-left">
        <span>&nbsp;</span> 优惠列表
      </div>
      <div class="u-right">
        <span></span> 
      </div>
    </div>
    <good-list :goodList="hotGoods" eventName="home_click_goods"></good-list>

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
import { get,client,userOption,mta,api,constant } from "../../utils";
import goodList from '../../components/goodList/goodList';
export default {
  components:{
   goodList
  },  
  data () {
    return {
      motto: 'Hello miniprograme',
      banner: [],
      hotGoods: [],
      weekenGoods:[],
      topicList: [],
      imgs:{
        layerSerachImg: constant.SHost+"/static/images/tanch-title-bg.png",
        bannerA: constant.SHost+"/static/images/banner-2.jpg",
        iconLogo: constant.SHost+"/static/images/logo.png"
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
    }
  },
  //商品转发
  onShareAppMessage() {
   let userIdInfo = userOption.getUserInfo();
   mta.Event.stat("home_click_share",{userId:userIdInfo.userId});
    return {
      path: "/pages/index/main?userId="+userIdInfo.userId,
      imageUrl: constant.SHost+'/static/images/img_index_share.png' //拿第一张商品的图片
    };
  },
  async mounted() {
   
    let shareUserId = this.$root.$mp.query.userId || -1;
    console.log("参数");
    console.log(this.$root.$mp.query);
    await this.init();
    await this.getHotGoodsData();
    await this.fansAdd(shareUserId);
    mta.Page.init();
    console.log(this.$refs);
  },
  //滚动底部
 async onReachBottom() { 
    await this.getHotGoodsData();
  },
  methods: {
    async init(){
      //用户登录
      let userInfo = await userOption.codeLogin();
      //默认数据
      const defaultInfo = await api.defaultInfo();
      this.banner = defaultInfo.banners;
      this.topicList = defaultInfo.hotNews;
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
    toExplain(){
      client.navigateTo({
        url: "/pages/useExplain/main"
      });
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