<template>
  <div class="categoryList">
    <!-- <scroll-view scroll-x="true" :scroll-left="scrollLeft" class="head">
      <div @click="changeTab(index,item.id)" :class="[nowIndex==index ?'active':'']" v-for="(item, index) in navData" :key="index">
        {{item.name}}
      </div>
    </scroll-view> -->
    <div class="order-nav">
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
    <div class="list" v-if="listData.length!=0">
       <div @click="goodsDetail(item.goodsId,item.goodsType.type)" class="shop-list" v-for="(item,index) in listData" :key="index">
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
    </div>
    <div v-else class="none">
      {{searchParam.canLoadGoods?'未搜索到相关商品！':'正在加载商品...'}}
    </div>
  </div>
</template>

<script>
import {
  get,
  api,
  client
} from "../../utils";
export default {
  data() {
    return {
      categoryId: "",
      nowIndex: 0,
      listData: [],
      navData: [],
      currentNav: {},
      scrollLeft: 0,
      sort:{sortIndex:1,order:'asc'},
      searchParam:{
        canLoadGoods:true,
        catId:-1,
        pageSize:20,
        pageIndex:1,
        sortType:0
      }
    };
  }, 
  //滚动底部
  onReachBottom(){
    if(this.listData.length!=0){
      this.getlistData(false);
    }
  },
  created() { },
  mounted() {
    //获取页面传的参数
    this.searchParam.catId = this.$root.$mp.query.id || 1281;
    let title = this.$root.$mp.query.title || '商品分类';
    client.setNavigationBarTitle(title);
    console.log(this.searchParam);
    this.getlistData();
  },
  components: {},
  computed: {},
  methods: {
    async changeTab(index,order) {
      console.log(111);
      if (index !== 0) {
        if(this.sort.sortIndex==index){
          this.sort.order = this.sort.order == "asc" ? "desc" : "asc";
        }else{
          this.sort.order = order || "asc";
        }
      }
      console.log(222);
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
    async getAllData() {
      const navdata = await get("/category/categoryNav", {
        id: this.categoryId
      });
      this.navData = navdata.navData;
      this.currentNav = navdata.currentNav;
      for (let i = 0; i < this.navData.length; i++) {
        const id = this.navData[i].id;
        if (id == this.currentNav.id) {
          this.nowIndex = i;
        }
      }

      //需要让导航滚动到可见区域
      if (this.nowIndex > 4) {
        this.scrollLeft = this.nowIndex * 60;
      } else {
        this.scrollLeft = 0;
      }
      const listdata = await get("/goods/goodsList", {
        categoryId: this.categoryId
      });
      this.goodsList = listdata.data;
    },
    async getlistData(hasNewLoad) {
      console.log(hasNewLoad);
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
          condition:{keyword:this.words,goodsType:1,sortType:this.searchParam.sortType,hasCoupon:true,catId:this.searchParam.catId}
        }
      );
      if(goodsData.length>0){
        this.searchParam.canLoadGoods=true;
        this.searchParam.pageIndex++;
        //滚动拖动数据
        goodsData.forEach((item)=>{
          this.listData.push(item)
        });
      }
    },
    goodsDetail(goodsId,goodsType) {
     client.navigateTo({
        url: "/pages/goods/main?goodsId=" + goodsId+"&goodsType="+goodsType
      });
    }
  }
};

</script>
<style lang='scss' scoped>
@import "./style";
</style>
