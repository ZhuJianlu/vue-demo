import Vue from 'vue';
// 导入包并安装路由
import VueRouter from 'vue-router';
Vue.use(VueRouter);
// 导入包并安装vue-resource
import VueResource from 'vue-resource';
Vue.use(VueResource);
// 导入包并安装vuex
import Vuex from 'vuex';
Vue.use(Vuex);
// 设置请求根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005';
// 设置 post 请求时表单数据格式组织形式
Vue.http.options.emulateJSON = true;

// 定义全局过滤器 时间格式化
import moment from 'moment';
Vue.filter('dateFormat', function(dataStr, pattern = "YYYY-MM-DD HH:mm:ss"){
  return moment(dataStr).format(pattern);
});

// 导入 mui 相关
import './lib/mui/css/mui.min.css';
import './lib/mui/css/icons-extra.css';
import './lib/mui/js/mui.min.js';

// 导入 mint-ui相关
// import { Header, Swipe, SwipeItem, Button } from 'mint-ui';
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// 按需导入在严格模式下报错，_Header is not defined ---- 不知原因

import MintUI from 'mint-ui';
Vue.use(MintUI);
import 'mint-ui/lib/style.css';

// 安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)
// with parameters install
// Vue.use(preview, {
//   mainClass: 'pswp--minimal--dark',
//   barsSize: {top: 0, bottom: 0},
//   captionEl: false,
//   fullscreenEl: false,
//   shareEl: false,
//   bgOpacity: 0.85,
//   tapToClose: true,
//   tapToToggleControls: false
// })

// 导入 App 根组件
import app from './App.vue';
// 导入路由
import router from './router.js';

const cart = JSON.parse(localStorage.getItem('cart') || '[]');

const store = new Vuex.Store({
  state: {  // this.$store.state.***
    cart  // 购物车中商品数据 { id: id, count: 数量, price: 价格, selected: 是否选中 }
  },
  mutations: {  // this.$store.commit('方法名', '按需传递唯一的参数')
    addGoodsToCart(state, goodsinfo){
      let flag = false;
      // 如果已存在对应商品，只需要更新商品数量
      state.cart.some(item => {
        if(item.id == goodsinfo.id){
          item.count += parseInt(goodsinfo.count);
          flag = true;
          return true;
        }
      });
      // 添加新的商品
      if(!flag){
        state.cart.push(goodsinfo);
      }

      // 更新 cart 后，存入 localStorage
      localStorage.setItem('cart', JSON.stringify(state.cart));
    }
  },
  getters: {
    getAllCount(state){
      let c = 0;
      state.cart.forEach(item => {
        c += item.count;
      });
      return c;
    }
  }
});

const vm = new Vue({
  el: '#app',
  data: {},
  method: {},
  render: c => c(app),
  router,
  store
});
