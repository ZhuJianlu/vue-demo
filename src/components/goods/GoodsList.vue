<template>
  <div class="goods-list">
    <!-- <router-link class="goods-item" v-for="item in goodslist" :key="item.id" :to="'/home/goodsinfo/' + item.id" tag="div">
      <img :src="item.img_url" alt="">
      <h1 class="title">{{ item.title }}</h1>
      <div class="info">
        <p class="price">
          <span class="new">￥{{ item.sell_price }}</span>
          <span class="old">￥{{ item.market_price }}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩余{{ item.stock_quantity }}件</span>
        </p>
      </div>
    </router-link> -->

    <!-- 不用 router-link ，而是调用一个 goDeatil() 方法，通过 js 实现路由跳转  -->
    <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
      <img :src="item.img_url" alt="">
      <h1 class="title">{{ item.title }}</h1>
      <div class="info">
        <p class="price">
          <span class="new">￥{{ item.sell_price }}</span>
          <span class="old">￥{{ item.market_price }}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩余{{ item.stock_quantity }}件</span>
        </p>
      </div>
    </div>
    <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  data(){
    return {
      pageindex: 1,
      goodslist: []
    }
  },
  created(){
    this.getGoodsList();
  },
  methods: {
    getGoodsList(){
      this.$http.get('api/getgoods?pageindex=' + this.pageindex).then(result => {
        if(result.body.status === 0){
          this.goodslist = this.goodslist.concat(result.body.message);
        }else{
          Toast('获取商品列表失败');
        }
      })
    },
    getMore(){
      this.pageindex++;
      this.getGoodsList();
    },
    goDetail(id){
      // console.log(this);

      // 使用js进行路由导航
      // 区分 this.$route 和 this.$router 
      // this.$route 是路由【参数】对象，参数 params，query
      // this.$router 是路由【导航】对象，负责 前进，后退，跳转

      // 第一种 直接传递路径
      // this.$router.push("/home/goodsinfo/" + id);
      // 第二种 传递参数
      // this.$router.push({ path: "/home/goodsinfo/" + id });
      // 第三种 传递命名的路由
      this.$router.push({ name: "goodsinfo", params: { id }});
    }
  }
}
</script>

<style lang="scss" scoped>
.goods-list{
  display: flex;
  flex-wrap: wrap;
  padding: 2%;
  justify-content: space-between;
  .goods-item{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 49%;
    min-height: 300px;
    margin-bottom: 2%;
    padding: 2px;
    border: 1px solid #ccc;
    box-shadow: 0 0 5px #ccc;
    img{
      width: 100%;
    }
    .title{
      font-size: 14px;
    }
    .info{
      background: #eee;
      p{
        margin-bottom: 0;
        padding: 5px;
      }
      .price{
        .new{
          color: #f00;
          font-size: 16px;
          font-weight: 600;
        }
        .old{
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .sell{
        display: flex;
        justify-content: space-between;
        font-size: 12px;
      }
    }
  }
}
</style>