<template>
  <div class="cart-container">
    <!-- 商品列表 -->
    <div class="goods-list">
      <div class="mui-card" v-for="(item, i) in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch v-model="$store.getters.getGoodsSelected[item.id]"
             @change="ifSelected(item.id, $store.getters.getGoodsSelected[item.id])"></mt-switch>
            <img :src="item.thumb_path" alt="">
            <div class="info">
              <h4>{{ item.title }}</h4>
              <p>
                <span class="price">￥{{ item.sell_price }}</span>
                <numbox :goodsid="item.id" :initcount="$store.getters.getGoodsCount[item.id]"></numbox>
                <a href="#" class="delete" @click.prevent="deleteGoods(item.id, i)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 结算 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner account">
          <div class="">
            <p>总计（不含运费）</p>
            <p>已勾选商品 <span class="red">{{ $store.getters.getGoodsAccount.count }}</span> 件，总价 <span class="red">￥{{ $store.getters.getGoodsAccount.amount }}</span></p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>



  </div>
</template>

<script>
import numbox from '../subcomponents/cart_numbox.vue';

export default {
  data(){
    return {
      goodslist: [] // 购物车中所有商品数据
    }
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList(){ // 获取购物车商品列表
      // 获取 store 中所有的商品 id，拼接出一个用逗号分隔的字符串
      const idArr = [];
      this.$store.state.cart.forEach(item => idArr.push(item.id));
      // 如果购物车中没有商品，则直接返回，不需要请求数据接口
      if(idArr <= 0) return;

      this.$http.get('api/goods/getshopcarlist/' + idArr.join(',')).then(result => {
        if(result.body.status === 0){
          this.goodslist = result.body.message;
        } else {
          Toast("获取商品列表失败");
        }
      })
    },
    deleteGoods(id, i){
      // id 是删除 store 中的，i 是删除 goodslist 中的
      this.goodslist.splice(i, 1);
      this.$store.commit('deleteGoodsFromCart', id);
    },
    ifSelected(id, val){
      this.$store.commit('updateGoodsSelected', {
        id,
        selected: val
      })
    }
  },
  components: {
    numbox
  }
}
</script>

<style lang="scss" scoped>
.cart-container{
  overflow: hidden;
  background: #eee;
  .goods-list{
    .mui-card-content-inner{
      display: flex;
      align-items: center;
      justify-content: space-around;
      img{
        width: 60px;
        height: 60px;
        margin: 0 10px;
      }
      h4{
        margin-bottom: 10px;
        font-size: 14px;
        line-height: 1.2em;
      }
      .info{
        display: flex;
        flex-direction: column;
        justify-items: center;
        justify-content: space-around;
        .price{
          font-weight: 600;
          color: #f00;
        }
        .delete{
          display: inline-block;
        }
      }
      .mui-numbox{
        height: 25px;
      }
    }
  }
  .account{
    display: flex;
    justify-content: space-between;
    align-items: center;
    p{
      margin-bottom: 0;
      line-height: 2em;
    }
    .red{
      color: #f00;
      font-size: 16px;
      font-weight: 600;
    }
  }
}
</style>
