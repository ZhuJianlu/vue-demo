import Vue from 'vue';
// 导入包并安装路由
import VueRouter from 'vue-router';
Vue.use(VueRouter);
// 导入包并安装vue-resource
import VueResource from 'vue-resource';
Vue.use(VueResource);

// 导入 mui 相关
import './lib/mui/css/mui.min.css';
import './lib/mui/css/icons-extra.css';

// 导入 mint-ui相关
import { Header, Swipe, SwipeItem } from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

// 导入 App 根组件
import app from './App.vue';
// 导入路由
import router from './router.js';

const vm = new Vue({
  el: '#app',
  data: {},
  method: {},
  render: c => c(app),
  router
})