import Vue from 'vue';

import app from './App.vue';

import './lib/mui/css/mui.min.css';

import { Header } from 'mint-ui';
Vue.component(Header.name, Header);

const vm = new Vue({
  el: '#app',
  data: {},
  method: {},
  render: c => c(app)
})