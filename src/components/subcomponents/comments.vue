<template>
  <div class="cmt-container">
    <h3>发表评论</h3>

    <textarea placeholder="请输入评论内容（120字以内）" maxlength="120" v-model="msg"></textarea>

    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

    <div class="cmt-list">
      <div class="cmt-item" v-for="(item, i) in comments" :key="item.add_time">
        <div class="cmt-title">
          第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat }}
        </div>
        <div class="cmt-body">
          {{ item.content === 'undefined' ? '用户尚未评论' : item.content }}
        </div>
      </div>
    </div>

    <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';

export default {
  data(){
    return{
      msg: '',
      comments: [],
      pageIndex: 1
    }
  },
  created(){
    this.getComments()
  },
  methods: {
    getComments(){
      this.$http.get('api/getcomments/' + this.id + '?pageindex=' + this.pageIndex ).then(result => {
        if( result.body.status === 0){
          // this.comments = result.body.message
          this.comments = this.comments.concat(result.body.message);
        }else{
          Toast('获取评论失败')
        }
      })
    },
    getMore(){
      this.pageIndex++;
      this.getComments();
    },
    postComment(){
      console.log(this.id ===  this.$route.params.id);
      if(this.msg.trim().length === 0){
        return Toast('评论内容不能为空')
      };
      this.$http.post('api/postcomment/' + this.id, { content: this.msg.trim() }).then(result => {
        if(result.body.status === 0){
          let cmt = {
            user_name: '匿名用户',
            add_time: Date.now(),
            content: this.msg.trim()
          };
          this.comments.unshift(cmt);
          this.msg = '';
        }
      })
    }
  },
  props: ['id']
}
</script>

<style lang="scss" scoped>
  .cmt-container{
    margin: 10px 0;
    h3{
      font-size: 16px;
    }
    textarea{
      margin: 0;
      height: 90px;
      font-size: 14px;
    }
    .cmt-list{
      margin-top: 5px;
      .cmt-item{
        font-size: 12px;
        .cmt-title{
          background: #ccc;
          line-height: 2em;
        }
        .cmt-body{
          line-height: 2em;
          text-indent: 2em;
        }
      }
    }
  }
</style>
