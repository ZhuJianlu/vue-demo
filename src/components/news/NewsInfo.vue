<template>
  <div class="newsInfo-container">
    <h1 class="title">{{ newsinfo.title }}</h1>
    <p class="subTitle">
      <span>发表时间：{{ newsinfo.add_time | dateFormat }}</span>
      <span>点击：{{ newsinfo.click }}次</span>
    </p>

    <div class="content" v-html="newsinfo.content"></div>

    <comment-box :id="id"></comment-box>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import comment from '../subcomponents/comments.vue';

export default {
  data(){
    return {
      id: this.$route.params.id,
      newsinfo: {}
    }
  },
  created(){
    this.getNewsInfo()
  },
  methods: {
    getNewsInfo(){
      this.$http.get('api/getnew/' + this.id).then(result => {
        if(result.body.status === 0){
          this.newsinfo = result.body.message[0]
        }else{
          Toast('获取新闻详情失败')
        }
      })
    }
  },
  components: {
    'comment-box': comment
  }
}
</script>

<style lang="scss">
.newsInfo-container{
  padding: 0 10px;
  .title{
    margin-top: 10px;
    font-size: 18px;
    line-height: 1.5em;
  }
  .subTitle{
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #226aff;
  }
}
</style>
