<template>
  <div class="order">
    <div class="order-nav">
      <ul>
        <li :class="currentType==-1?'cur':''" v-on:click="loadList(-1,true)">全部</li>
        <li :class="currentType==0?'cur':''" v-on:click="loadList(0,true)">收入</li>
        <li :class="currentType==1?'cur':''" v-on:click="loadList(1,true)">支出</li>
      </ul>
    </div>
    <div class="cartlist">
      <div class="item" v-for="(item,index) in listData" :key="index">
        <div class="con">
          <div class="left">
            <div class="img">
            </div>
            <div class="info">
              <p>{{item.amount}}</p>
              <p class="odr-time">时间：{{item.createTime}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
   api,
   userOption
  } from "../../utils";
  export default {
    data() {
      return {
        listData: [],
        currentType:0,
        searchParams:{
          pageSize:20,
          pageIndex:1
        }
      };
    },
    onShow() {
      
    },
    created() {},
    mounted() {
      this.loadList(-1,true);
    },
    components: {},
    methods: {
      async loadList(type,clearPageIndex) {
        //清空pageIndex
        if(clearPageIndex==true){
          if(this.currentType==type){
            return;
          }
          this.pageIndex=1;
          this.listData=[];
        }
        this.currentType = type;
        //请求参数
        let req = {
          pageSize:this.searchParams.pageSize,
          pageIndex:this.searchParams.pageIndex,
          condition:{type:type}
        };
        //获取数据
        let accountList = await api.accountDetails(req);
        //当前获取条数
        this.currentCount=accountList.length;
        if(this.currentCount>0){
          this.pageIndex++;
          accountList.forEach(element => {
            this.listData.push(element);
          });
        }
      }
    },
    computed: {}
  };

</script>
<style lang='scss' scoped>
  @import "./style";

</style>
