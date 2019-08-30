<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in swiperList" :key="item.url">
        <img :src="item.img" :class="{'full': isfull}"/>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  props: ['swiperList', 'isfull']
}
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 150px;
  .mint-swipe-item {
    text-align: center;
    // &:nth-child(1) {
    //   background-color: silver;
    // }
    // &:nth-child(2) {
    //   background-color: skyblue;
    // }
    // &:nth-child(3) {
    //   background-color: slategray;
    // }
    img {
      max-width: 100%;
      height: 100%;
    }
    .full{
      width: 100%;
    }
  }
}
</style>