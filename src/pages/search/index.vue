<template>
  <div class="search">
    <div class="head">
      <div>
        <span class="iconfont iconsousuo"></span>
        <input type="text" confirm-type="search" focus="true" v-model="words" @focus="inputFocus" @input="tipsearch" @confirm="searchWords" placeholder="商品搜索">
        <!-- <input name="input" class="keywrod" focus="true" value="{{keyword}}" confirm-type="search" bindinput="inputChange" bindfocus="inputFocus" bindconfirm="onKeywordConfirm" confirm-type="search" placeholder="{{defaultKeyword.keyword}}" /> -->
        <span @click="clearInput" class="iconfont iconguanbi del" src="/static/images/del-icon.png"></span>
      </div>
      <div @click="cancel">取消</div>
    </div>
    <div class="searchtips" v-if="words">
      <div @click="searchWords" v-if="tipsData.length!=0">
      搜索"{{ tipsData }}"
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
    <!--商品列表  -->
    <div v-if="listData.length!=0" class="goodsList">
      <div class="sortnav">
        <div @click="changeTab(0)" :class="[0==nowIndex ?'active':'']">综合<span class="iconfont iconpaixu"></span></div>
        <div @click="changeTab(1)" class="price" :class="[1==nowIndex ?'active':'', order =='desc'? 'desc':'asc']">价格<span class="iconfont iconpaixu"></span></div>
        <div @click="changeTab(2)" :class="[2==nowIndex ?'active':'']">分类<span class="iconfont iconpaixu"></span></div>
      </div>
      <div class="sortlist">
        <div @click="goodsDetail(item.goodsId)" v-for="(item, index) in listData" :key="index" :class="[(listData.length)%2==0?'active':'none']" class="item">
          <div class="img-box">
            <img :src="item.thumbnailImgUrl" alt="">
          <div class="coupon-wrapper theme-bg-color-1">
            券 <i>￥</i><b>{{item.couponPrice}}</b>
          </div>
          </div>
          <p class="name">{{item.goodsName}}</p>
          <div class="price-wrapper">
            <span class="span1">￥<span>{{item.salePrice - item.couponPrice}}</span></span>
            <span class="price_yj">￥{{item.salePrice}}</span>
            <span class="price_right">销量 {{item.volume}}</span>
          </div>
          <!-- <p class="price">￥{{item.retail_price}}</p> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  post,
  get,
  searchHistory,
} from "../../utils";
import { api } from "../../utils/api";
export default {
  created() { },
  mounted() {
    this.openid = wx.getStorageSync("openid") || "";
    this.getHotData();
  },
  data() {
    return {
      nowIndex: 0,
      words: "",
      historyData: [],
      hotData: [],
      tipsData: '',
      listData: [],
      openid: "",
      order: "",
      isHot: "",
      isNew: ""
    };
  },
  components: {},
  methods: {
    goodsDetail(id) {
      wx.navigateTo({
        url: "/pages/goods/main?id=" + id
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
    },
    inputFocus() {
      //商品清空
      this.listData = [];
      //展示搜索提示信息
      this.tipsearch();
    },
    async getlistData() {
      //获取商品列表
      // const data1 = await get("/search/helperaction", {
      //   keyword: this.words,
      //   order: this.order
      // });
      const goodsData = await api.searchGoods({condition:{keyword:this.words,goodsType:1}});
      this.listData = goodsData;
      this.tipsData = '';
    },
    changeTab(index) {
      this.nowIndex = index;
      if (index == 1) {
        this.order = this.order == "asc" ? "desc" : "asc";
      } else {
        this.order = "";
      }
      this.getlistData();
    },
    async clearHistory() {
      //清除搜索历史
     searchHistory.clear();
     this.historyData = [];
    },
    async searchWords(e) {
      var vaule = e.currentTarget.dataset.value;
      this.words = vaule || this.words;
      //添加历史搜索历史
      searchHistory.add(this.words)
      //获取历史数据
      this.getHotData();
      //获取商品列表
      this.getlistData();
    },
    async getHotData(first) {
      const data =  await api.hotKeyword();
      this.hotData = data;
      //搜索历史
      this.historyData = searchHistory.get();
    },
    async tipsearch(e) {
      const data = await get("/search/helperaction", {
        keyword: this.words
      });
      this.tipsData = this.words;
    },
    topicDetail(id) {
      wx.navigateTo({
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
