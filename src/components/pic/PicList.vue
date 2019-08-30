<template>
  <div>
    <!-- 顶部滚动条 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']"
            v-for="item in cates"
            :key="item.id"
            @tap="getListByCateId(item.id)"
          >{{ item.title }}</a>
        </div>
      </div>
    </div>
    <!-- 列表 -->
    <ul class="pic-list">
      <router-link v-for="item in list" :key="item.id" :to="'/home/picinfo/' + item.id" tag="li">
        <img v-lazy="item.img_url" />
        <div class="info">
          <h3 class="info-title">{{ item.title }}</h3>
          <div class="info-body">{{ item.zhaiyao }}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import mui from "../../lib/mui/js/mui.min.js";

export default {
  data() {
    return {
      cates: [],
      list: []
    };
  },
  created() {
    this.getAllCategory();
    this.getListByCateId(0);
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getAllCategory() {
      this.$http.get("api/getimgcategory").then(result => {
        if (result.body.status === 0) {
          result.body.message.unshift({ title: "全部", id: 0 });
          this.cates = result.body.message;
        } else {
          Toast("获取图片列表失败");
        }
      });
    },
    getListByCateId(cateId) {
      // 根据分类 id 获取图片列表
      this.$http.get("api/getimages/" + cateId).then(result => {
        if (result.body.status === 0) {
          this.list = result.body.message;
        } else {
          Toast("获取图片列表失败");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  touch-action: pan-y;
}
.pic-list {
  margin: 0;
  padding: 0 10px;
  list-style: none;
  li {
    position: relative;
    margin-bottom: 10px;
    background-color: #f3f3f3;
    text-align: center;
    img{
      vertical-align: middle;
      width: 100%;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
    .info{
      position: absolute;
      bottom: 0;
      max-height: 5em;
      color: #fff;
      text-align: left;
      background-color: rgba(0,0,0,.3);
      .info-title{
        font-size: 13px;
        line-height: 1.5em;
      }
      .info-body{
        font-size: 12px;
        line-height: 1.5em;
      }
    }
  }
}
</style>