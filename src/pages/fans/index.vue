<template>
  <div class="order">
    <div class="order-nav">
      <ul>
        <li :class="currentLeave==0?'cur':''" v-on:click="loadList(0,true)">全部粉丝</li>
        <li :class="currentLeave==1?'cur':''" v-on:click="loadList(1,true)">直属粉丝</li>
        <li :class="currentLeave==2?'cur':''" v-on:click="loadList(2,true)">推荐粉丝</li>
      </ul>
    </div>
    <div class="cartlist">
      <div class="item" v-for="(item,index) in listData" :key="index">
        <div class="con">
          <div class="left">
            <div class="img">
              <img :src="item.icon" alt="">
            </div>
            <div class="info">
              <p>{{item.nickName}}</p>
              <!-- <p>￥{{item.retail_price}}</p> -->
              <p class="odr-time">时间：{{item.createTime}}</p>
              <!-- <p class="odr-numb">电话：111110100011 </p> -->
              <!-- <div class="monery-bom">
                <span>消费金额 ¥100</span><i>预估价 ¥1008</i>
              </div> -->
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
        currentLeave:-1,
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
      this.loadList(0,true);
    },
    components: {},
    methods: {
      async loadList(leave,clearPageIndex) {
        console.log(1);
        //清空pageIndex
        if(clearPageIndex==true){
          if(this.currentLeave==leave){
            return;
          }
          this.pageIndex=1;
          this.listData=[];
        }
        console.log(2);
        this.currentLeave = leave;
        //请求参数
        let req = {
          pageSize:this.searchParams.pageSize,
          pageIndex:this.searchParams.pageIndex,
          condition:{leave:leave}
        };
        console.log(3);
        //获取数据
        let fansList = await api.fansList(req);
        //当前获取条数
        this.currentCount=fansList.length;
        //+1
        console.log(4);
        if(this.currentCount>0){
          this.pageIndex++;
          fansList.forEach(element => {
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
