<template>
  <div class="goodsinfo-container">

    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>

    <!-- 轮播图 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :swiperList="swiperList"></swiper>
        </div>
      </div>
    </div>

    <!-- 购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{ goodsInfo.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：<del>￥{{ goodsInfo.market_price }}</del>
            &nbsp;&nbsp;
            销售价：<span class="new">￥{{ goodsInfo.sell_price }}</span>
          </p>
          <p>购买数量：<numbox @getcount="getSelectedCount" :max="goodsInfo.stock_quantity"></numbox></p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToCart()">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>

    <!-- 参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{ goodsInfo.goods_no }}</p>
          <p>库存情况：{{ goodsInfo.stock_quantity }}件</p>
          <p>上架时间：{{ goodsInfo.add_time | dateFormat }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import swiper from "../subcomponents/swiper.vue";
import numbox from "../subcomponents/goodsinfo_numbox.vue";

export default {
  data() {
    return {
      id: this.$route.params.id,  // 将路由参数对象中的 id 挂载到 data，方便调用
      swiperList: [], // 轮播图数据
      goodsInfo: {},  // 商品信息数据
      ballFlag: false, // 小球的显示隐藏
      selectedCount: 1  // 要加入购物车的商品数量，默认为1
    };
  },
  created() {
    this.getSwiper();
    this.getGoodsInfo();
  },
  methods: {
    getSwiper() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          result.body.message.forEach(element => {
            element.img = element.src;
          });
          this.swiperList = result.body.message;
        } else {
          Toast("获取轮播图失败");
        }
      });
    },
    getGoodsInfo(){
      // 获取商品信息
      this.$http.get('api/goods/getinfo/' + this.id).then((result) => {
        if(result.body.status === 0){
          this.goodsInfo = result.body.message[0];
        }else{
          Toast("获取商品信息失败");
        }
      })
    },
    goDesc(id){
      // 使用编程式导航跳转到 图文介绍页面
      this.$router.push({name: 'goodsdesc', params: { id }})
    },
    goComment(id){
      // 使用编程式导航跳转到 商品评论页面
      this.$router.push({name: 'goodscomment', params: { id }})
    },
    addToCart(){  // 加入购物车
      this.ballFlag = !this.ballFlag;
      // { id: id, count: 数量, price: 价格, selected: 是否选中 }
      const goodsinfo = {
        id: this.id,
        count: this.selectedCount,
        price: this.goodsInfo.sell_price,
        selected: true
      };
      // 调用 store 中的 mutations
      this.$store.commit('addGoodsToCart', goodsinfo);
    },
    // 小球动画
    beforeEnter(el){
      el.style.transform = 'translate(0, 0)';
    },
    enter(el, done){
      el.offsetWidth;
      
      // 获取小球位置
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      // 获取徽标位置
      const badgePosition = document.getElementById('badge').getBoundingClientRect();

      // 小球移动的距离
      const xDistence = badgePosition.left - ballPosition.left;
      const yDistence = badgePosition.top - ballPosition.top;

      el.style.transform = `translate(${xDistence}px, ${yDistence}px)`;
      el.style.transition = 'all .5s cubic-bezier(.4,-0.3,1,.6)';
      done();
    },
    afterEnter(el){
      this.ballFlag = !this.ballFlag;
    },
    getSelectedCount(count){
      this.selectedCount = count;
      console.log(this.selectedCount)
    }
  },
  components: {
    swiper,
    numbox
  }
};
</script>

<style lang="scss" scoped>
.goodsinfo-container {
  background: #eee;
  overflow: hidden;
  .price{
    .new{
      color: #f00;
      font-size: 16px;
      font-weight: 600;
    }
  }
  .mui-card-footer{
    display: block;
    button{
      margin: 15px 0;
    }
  }
  .ball{
    position: absolute;
    top: 390px;
    left: 146px;
    z-index: 99;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #f00;
  }
}
</style>