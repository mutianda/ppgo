<template>
<div class="shop-header">
  {{shop.name}}
</div>
</template>

<script>
export default {
  name: 'shopHeader',
  props: {
    shop: {
      type: Object
    }
  }
}
</script>

<style lang="less" scoped>
  .shop-header{
    text-align: center;
  }

</style>
