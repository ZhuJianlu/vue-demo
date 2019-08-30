<template>
  <div>
    <cmtbox :id="$route.params.id"></cmtbox>
  </div>
</template>

<script>
import cmtbox from '../subcomponents/comments.vue';

export default {
  components: {
    cmtbox
  }
}
</script>

<style lang="scss" scoped>

</style>