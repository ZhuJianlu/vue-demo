<template>
  <div class="picinfo-container">
    <h1>{{ picinfo.title }}</h1>
    <p class="subtitle">
      <span>发表时间：{{ picinfo.add_time | dateFormat }}</span>
      <span>点击：{{ picinfo.click }}次</span>
    </p>

    <hr />

    <!-- 缩略图 -->
    <div class="thumbs">
      <vue-preview :slides="list" @close="getThumbs"></vue-preview>
    </div>

    <!-- 内容 -->
    <div class="content" v-html="picinfo.content"></div>

    <!-- 评论 -->
    <cmt-box :id="id"></cmt-box>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import comment from "../subcomponents/comments.vue";

export default {
  data() {
    return {
      id: this.$route.params.id,
      picinfo: {},
      list: []
    };
  },
  created() {
    this.getPicInfo();
    this.getThumbs();
  },
  methods: {
    getPicInfo() {
      this.$http.get("api/getimageInfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.picinfo = result.body.message[0];
        } else {
          Toast("获取图片详情失败");
        }
      });
    },
    getThumbs() {
      // 获取缩略图
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          // 循环每个图片顺序，补全图片宽高
          result.body.message.forEach(element => {
            element.msrc = element.src;
            element.w = 600;
            element.h = 400;
          });
          this.list = result.body.message;
        } else {
          Toast("获取图片详情失败");
        }
      });
    }
  },
  components: {
    "cmt-box": comment
  }
};
</script>

<style lang="scss" scoped>
.picinfo-container {
  padding: 0 5px;
  h1 {
    margin: 12px 0;
    color: #26a2ff;
    font-size: 14px;
    line-height: 1.5em;
    text-align: center;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
  }
  .content {
    font-size: 13px;
    line-height: 1.5em;
  }
  .thumbs{
    /deep/ .my-gallery{
      display: flex;
      figure{
        margin: 5px;
        img{
          width: 100%;
        }
      }
    }
  }
}
</style>