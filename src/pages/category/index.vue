<template>
  <div class="category">
    <div class="search" @click="tosearch">
      <div class="ser">
        <span class="iconfont iconsousuo"></span>
        <span>商品搜索,共239款好物</span>
      </div>

    </div>
    <div class="content">
      <scroll-view class="left" scroll-y="true">
        <div class="iconText" @click="selectitem(item,index)" v-for="(item, index) in listData" :class="[index==nowIndex?'active':'']" :key="index">
          {{item.title}}
        </div>
      </scroll-view>
      <scroll-view class="right" scroll-y="true">
        <div class="banner">
          <img :src="detailData.imgPath" alt="">
        </div>
        <div class="title">
          <span>—</span>
          <span>{{detailData.title}}分类</span>
          <span>—</span>
        </div>
        <div class="bottom">
          <div @click="categoryList(jitem)" v-for="(jitem,jindex) in detailData.subList" :key="jindex" class="item">
            <img :src="jitem.imgPath" alt="">
            <span>{{jitem.title}}</span>
          </div>
        </div>
      </scroll-view>
    </div>
  </div>
</template>

<script>
import { api,client } from "../../utils";
export default {
  created() {},
 async mounted() {
    //获取列表数据
    await this.getListData();
    //获取默认右侧数据
    await this.selectitem(this.listData[0], this.nowIndex);
  },
  data() {
    return {
      id: -1,
      nowIndex: 0,
      listData: [],
      detailData: {}
    };
  },
  components: {},
  methods: {
    tosearch() {
      wx.navigateTo({ url: "/pages/search/main" });
    },
    async selectitem(item,index) {
      this.nowIndex = index;
      console.log(index);
      if(item.subList==undefined){
        const data = await api.goodsCategory({parentId:item.id});
        item.subList = data;
      }
      this.detailData = item;
    },
    async getListData() {
      const data = await api.goodsCategory({parentId:0});
      this.listData = data;
    },
    categoryList(item) {
      console.log(item)
      client.navigateTo({
        url: "../categorylist/main?id="+item.pddId+"&title="+item.title
      });
    }
  },
  computed: {}
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>
