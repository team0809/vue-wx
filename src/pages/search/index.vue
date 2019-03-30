<template>
  <div class="search">
    <div class="search-head">
      <div class="head">
        <div>
          <span class="iconfont iconsousuo"></span>
          <input type="text" confirm-type="search" :focus="showCommodity==0" v-model="words" @focus="inputFocus" @input="tipsearch" placeholder="商品搜索">
          <!-- <input name="input" class="keywrod" focus="true" value="{{keyword}}" confirm-type="search" bindinput="inputChange" bindfocus="inputFocus" bindconfirm="onKeywordConfirm" confirm-type="search" placeholder="{{defaultKeyword.keyword}}" /> -->
          <span @click="clearInput" class="iconfont iconguanbi del" src="/static/images/del-icon.png"></span>
        </div>
        <div @click="cancel">取消</div>
      </div>
      <div class="sortnav" v-if="showCommodity==1">
        <div @click="changeTab(0)" :class="[0==nowIndex ?'active':'']">综合</div>
        <div @click="changeTab(1)" class="price" :class="[1==nowIndex ?'active':'', order =='desc'? 'desc':'asc']">价格<span class="iconfont iconpaixu"></span></div>
        <div @click="changeTab(3)" :class="[3==nowIndex ?'active':'', order =='desc'? 'desc':'asc']">销量<span class="iconfont iconpaixu"></span></div>
      </div>
    </div>
      <!--历史记录-->
      <div v-if="showCommodity==0">
        <div class="searchtips" v-if="words">
          <div @click="searchWords" v-if="tipsData.length!=0" style="color:orange">
          搜索："{{ tipsData }}"
          </div>
        </div>
        <div class="history" v-if="historyData.length!=0">
          <div class="t">
            <div>历史记录</div>
            <div @click="clearHistory">
              <span class="iconfont iconshanchu"></span>
            </div>
          </div>
          <div class="cont">
            <div @click="searchWords" :data-value="item" v-for="(item,index) in historyData" :key="index">
              {{item}}
            </div>
          </div>
        </div>
        <div class="history hotsearch">
          <div class="t">
            <div>热门搜索</div>
          </div>
          <div class="cont">
            <div @click="searchWords" v-for="(item,index) in hotData" :data-value="item" :class="{active:0==index}" :key="index">
              {{item}}
            </div>
          </div>
        </div>
      </div>

    <!--商品列表  -->
    <div v-if="showCommodity==1" class="goodsList">
      <div class="sortlist">
        <div @click="goodsDetail(item.goodsId,item.goodsType.type)" v-for="(item, index) in listData" :key="index" :class="[(listData.length)%2==0?'active':'none']" class="item">
          <div class="img-box">
            <img :src="item.thumbnailImgUrl" alt="">
          <div class="coupon-wrapper theme-bg-color-1">
            券 <i>￥</i><b>{{item.couponPrice}}</b>
          </div>
          </div>
          <p class="name"><span class="platform">{{item.goodsType.name}}</span>{{item.goodsName}}</p>
          <div class="price-wrapper">
            <span class="span1">￥<span>{{item.couponAfterPrice}}</span></span>
            <span class="price_yj">￥{{item.salePrice}}</span>
            <span class="price_right">销量 {{item.volume}}</span>
          </div>
          <!-- <p class="price">￥{{item.retail_price}}</p> -->
        </div>
      </div>
    </div>
    <!--未找到商品-->
    <div v-if="showCommodity==2" class="goodsList">
       未找搜索您到相关宝贝
    </div>
  </div>
</template>

<script>
import {
  post,
  get,
  searchHistory,
client,
} from "../../utils";
import { api } from "../../utils/api";
export default {
  created() { },
  mounted() {
    this.getHotData();
    let keyword = this.$root.$mp.query.keyword || ""; 
    this.openid = wx.getStorageSync("openid") || "";
    if(keyword!=""){
      this.showCommodity=1;
      this.searchWords({searchKeyword:keyword});
    }else{
      this.showCommodity=0
    }
  },
  //滚动底部
  onReachBottom(){
      this.getlistData(false);
  },
  data() {
    return {
      nowIndex: 0,
      words: "",
      historyData: [],
      hotData: [],
      tipsData: '',
      listData: [],
      showCommodity:-1,
      openid: "",
      order: "",
      isHot: "",
      isNew: "",
      searchParam:{
        canLoadGoods:true,
        pageSize:20,
        pageIndex:1,
        sortType:0
      }
    };
  },
  components: {},
  methods: {
    goodsDetail(id,type) {
       client.navigateTo({
        url: "/pages/goods/main?goodsId=" + id+"&goodsType="+type
      });
    },
    cancel() {
      wx.navigateBack({
        delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
      });
    },
    clearInput() {
      this.words = "";
      this.listData = [];
      this.tipsData = [];
      this.showCommodity = 2;
    },
    inputFocus() {
      //商品清空
      this.showCommodity = 0;
      this.listData = [];
      //展示搜索提示信息
      this.tipsearch();
    },
    async getlistData(hasNewLoad) {
      //重新查询数据
      if(hasNewLoad==true){
        this.searchParam.pageSize=20;
        this.searchParam.pageIndex=1;
        this.listData=[];
      }
      if(this.searchParam.canLoadGoods==false){
        return;
      }
      this.searchParam.canLoadGoods=false;
      let goodsData = await api.searchGoods({
          pageSize:this.searchParam.pageSize,
          pageIndex:this.searchParam.pageIndex,
          condition:{keyword:this.words,goodsType:1,sortType:this.searchParam.sortType,hasCoupon:true}
        }
      );
      if(goodsData.length>0){
        this.searchParam.canLoadGoods=true;
        this.searchParam.pageIndex++;
        //滚动拖动数据
        goodsData.forEach((item)=>{
          this.listData.push(item)
        });

        this.showCommodity = this.listData.length>0 ? 1 : 2;
        this.tipsData = '';
      }
    },
    changeTab(index) {
      this.nowIndex = index;

      if (index != 0) {
        this.order = this.order == "asc" ? "desc" : "asc";
      }

      switch(index){
        //综合排序
        case 0: this.searchParam.sortType =0; break;
        //价格升序或降序
        case 1: this.searchParam.sortType = (this.order=="asc")?1:2;break;
        case 3: this.searchParam.sortType = (this.order=="asc")?3:4;break;
      }
      this.getlistData(true);
    },
    async clearHistory() {
      //清除搜索历史
     searchHistory.clear();
     this.historyData = [];
    },
    async searchWords(e) {
      var vaule = e.searchKeyword || e.currentTarget.dataset.value;
      this.words = vaule || this.words;
      //添加历史搜索历史
      searchHistory.add(this.words)
      //获取历史数据
      this.getHotData();
      //获取商品列表
      this.getlistData(true);
    },
    async getHotData(first) {
      const data =  await api.hotKeyword();
      this.hotData = data;
      //搜索历史
      this.historyData = searchHistory.get();
    },
    async tipsearch(e) {
      // const data = await get("/search/helperaction", {
      //   keyword: this.words
      // });
      this.tipsData = this.words;
    },
    topicDetail(id) {
      client.navigateTo({
        url: "/pages/topicdetail/main?id=" + id
      });
    }
  },
  computed: {}
};

</script>
<style lang='scss' scoped>
@import "./style";
</style>
