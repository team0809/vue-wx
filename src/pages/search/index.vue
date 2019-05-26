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
      <div class="order-nav" v-if="showCommodity==1">
        <ul>
            <li :class="sort.sortIndex==0?'cur':''" v-on:click="changeTab(0)">综合</li>
            <li :class="sort.sortIndex==1?'cur':''" v-on:click="changeTab(1)">价格
              <span :class="(sort.sortIndex==1?sort.order=='desc'?'arrow-bottom arrow-cur':'arrow-bottom':'arrow-bottom')"></span>
              <span :class="(sort.sortIndex==1?sort.order=='asc'?'arrow-top arrow-cur':'arrow-top':'arrow-top')"></span></li>
            <li :class="sort.sortIndex==2?'cur':''" v-on:click="changeTab(2,'desc')">券额
              <span :class="(sort.sortIndex==2?sort.order=='desc'?'arrow-bottom arrow-cur':'arrow-bottom':'arrow-bottom')"></span>
              <span :class="(sort.sortIndex==2?sort.order=='asc'?'arrow-top arrow-cur':'arrow-top':'arrow-top')"></span>
            </li>
            <li :class="sort.sortIndex==3?'cur':''" v-on:click="changeTab(3,'desc')">销量
              <span :class="(sort.sortIndex==3?sort.order=='desc'?'arrow-bottom arrow-cur':'arrow-bottom':'arrow-bottom')"></span>
              <span :class="(sort.sortIndex==3?sort.order=='asc'?'arrow-top arrow-cur':'arrow-top':'arrow-top')"></span>
            </li>
        </ul>
      </div>
    </div>
      <!--历史记录-->
      <div v-if="showCommodity==0" class="history-block">
        <div class="searchtips" v-if="words!=''">
          <div @click="searchWords"  style="color:orange">
          点此搜索："{{ tipsWords }}"
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
            <div @click="searchWords" :data-value="item.text" v-for="(item,index) in historyData" :key="index">
              {{item.showText}}
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
       <good-list :goodList="listData" eventName="search_click_goods"></good-list>
    </div>
    <!--未找到商品-->
    <div v-if="showCommodity==2" class="nogoods">
      未搜索到相关商品！请尝试更改搜索标题重试
    </div>
  </div>
</template>

<script>
import {
  post,
  get,
  searchHistory,
  client,
  mta,
  api
} from "../../utils";
import goodList from '../../components/goodList/goodList';
export default {
  components:{
   goodList
  }, 
  created() { },
  async mounted() {
   await this.getHotData();
    let keyword = this.$root.$mp.query.keyword || ""; 
    this.openid = wx.getStorageSync("openid") || "";
    if(keyword!=""){
      this.showCommodity=1;
     await this.searchWords({searchKeyword:keyword});
    }else{
      this.showCommodity=0
    }
    //统计
    mta.Page.init();
  },
  //滚动底部
 async onReachBottom(){
    if(this.listData.length!=0){
     await this.getlistData(false);
    }
  },
  data() {
    return {
      nowIndex: 0,
      words: "",
      historyData: [],
      hotData: [],
      tipsWords: '',
      listData: [],
      showCommodity:-1,
      openid: "",
      order: "",
      isHot: "",
      isNew: "",
      sort:{sortIndex:0,order:'asc'},
      searchParam:{
        canLoadGoods:true,
        pageSize:20,
        pageIndex:1,
        sortType:0
      }
    };
  },
  methods: {
    goodsDetail(id,type,goodsName) {
      mta.Event.stat("search_click_goods",{goodsId:id,goodsName:goodsName})
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
      this.tipsWords = '';
      this.showCommodity = 0;
    },
    inputFocus() {
      //商品清空
      this.showCommodity = 0;
      this.listData = [];
      //展示搜索提示信息
      this.tipsearch();
      client.pageScrollTo({scrollTop:'0px',duration:0});
    },
    async getlistData(hasNewLoad) { 
      if(this.searchParam.canLoadGoods==false){
        return;
      }
      //重新查询数据
      if(hasNewLoad==true){
        this.searchParam.pageSize=20;
        this.searchParam.pageIndex=1;
        this.listData=[];
      }
      this.searchParam.canLoadGoods=false;
      let goodsData = await api.searchGoods({
          pageSize:this.searchParam.pageSize,
          pageIndex:this.searchParam.pageIndex,
          condition:{keyword:this.words,goodsType:1,sortType:this.searchParam.sortType}
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
        this.tipsWords = '';
      }else if(this.searchParam.pageIndex==1&&goodsData.length==0){
        this.showCommodity = 2;
      }
    },
    changeTab(index,order) {
     if (index !== 0) {
        if(this.sort.sortIndex==index){
          this.sort.order = this.sort.order == "asc" ? "desc" : "asc";
        }else{
          this.sort.order = order || "asc";
        }
      }
      this.sort.sortIndex = index;
      switch(index){
        //综合排序
        case 0: this.searchParam.sortType =0; break;
        //价格升序或降序
        case 1: this.searchParam.sortType = (this.sort.order=="asc")?1:2;break;
         //券额
        case 2: this.searchParam.sortType = (this.sort.order=="asc")?5:6;break;
        //销量
        case 3: this.searchParam.sortType = (this.sort.order=="asc")?3:4;break;
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
      searchHistory.add(this.words);
      this.tipsWords = this.words;
      //获取历史数据
     await this.getHotData();
      //获取商品列表
     await this.getlistData(true);
     //埋点
     mta.Event.stat("search_keyword",{keyword:this.words})
    },
    async getHotData(first) {
      const data =  await api.hotKeyword();
      this.hotData = data;
      //搜索历史
      let historyData = searchHistory.get();
      //截取数据
      if(historyData.length>0){
       historyData = historyData.map((item)=>{
          if(item.length>6){
            return {text:item,showText:item.substring(0,6)+'..'};
          }else{
            return {text:item,showText:item};
          }
        })
      }
      this.historyData = historyData;
    },
    async tipsearch(e) {
      this.tipsWords = this.words;
    }
  }
};

</script>
<style lang='scss' scoped>
@import "./style";
</style>
