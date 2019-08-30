import VueRouter from 'vue-router';

// 导入路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue';
import MemberContainer from './components/tabbar/MemberContainer.vue';
import CartContainer from './components/tabbar/CartContainer.vue';
import SearchContainer from './components/tabbar/SearchContainer.vue';
// 新闻
import NewsList from './components/news/newslist.vue';
import NewsInfo from './components/news/newsinfo.vue';
// 图片
import PicList from './components/pic/piclist.vue';
import PicInfo from './components/pic/picinfo.vue';
// 商品
import GoodsList from './components/goods/goodslist.vue';
import GoodsInfo from './components/goods/goodsinfo.vue';
import GoodsDesc from './components/goods/goodsdesc.vue';
import GoodsComment from './components/goods/goodscomment.vue';


const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: HomeContainer },
    { path: '/member', component: MemberContainer },
    { path: '/cart', component: CartContainer },
    { path: '/search', component: SearchContainer },
    { path: '/home/newslist', component: NewsList },
    { path: '/home/newsinfo/:id', component: NewsInfo },
    { path: '/home/piclist', component: PicList },
    { path: '/home/picinfo/:id', component: PicInfo },
    { path: '/home/goodslist', component: GoodsList },
    { path: '/home/goodsinfo:id', component: GoodsInfo, name: 'goodsinfo' },
    { path: '/home/goodsdesc:id', component: GoodsDesc, name: 'goodsdesc' },
    { path: '/home/goodscomment:id', component: GoodsComment, name: 'goodscomment' },
  ],
  linkActiveClass: 'mui-active'
})

export default router