<template>
    <div class="mui-numbox" data-numbox-min="1">
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countChanged" ref="numbox" readonly />
      <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
import { Toast } from "mint-ui";
import mui from "../../lib/mui/js/mui.min.js";

export default {
  mounted(){
    // 初始化数字选择框组件
    mui(".mui-numbox").numbox();
  },
  methods: {
    countChanged(){
      // count 改变时，立即把最新的 count 同步到购物车的 store 中，覆盖之前的 count
      this.$store.commit('updateGoodsInfo', {
        id: this.goodsid,
        count: this.$refs.numbox.value
      })
    }
  },
  props: ['goodsid', 'initcount']
};
</script>

<style lang="scss" scoped>
</style>