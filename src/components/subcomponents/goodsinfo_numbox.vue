<template>
    <!-- <div class="mui-numbox" data-numbox-min="1" :data-numbox-max="max"> -->
    <!-- 通过 watch 监听 max -->
    <div class="mui-numbox" data-numbox-min="1">
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox" />
      <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";

export default {
  mounted(){
    // 初始化数字选择框组件
    mui(".mui-numbox").numbox();
  },
  methods: {
    countChanged(){
      // 每当文本框数字改变的时候，立即把最新的数据，通过事件调用，传递给父组件
      // console.log(this.$refs.numbox.value);
      this.$emit('getcount', parseInt(this.$refs.numbox.value));
    }
  },
  props: ['max'],
  watch: {
    'max': function(newVal, oldVal){
      mui('.mui-numbox').numbox().setOption('max', newVal);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>