<template>
<div class="cart-control">
  <transition name="move">
  <div class="item cart-decrease" v-show="productItem.count>0">
    <div class="innner el-icon-remove-outline" style="color: #009de0"  @click="deleteCartCount()" ></div>
  </div>
  </transition>
  <div class="item cat-count" >
    <span v-show="productItem.count>0">{{productItem.count}}</span>
  </div>
  <div class="item cart-add" style="color: #009de0">
    <div class="el-icon-circle-plus" @click="addCartCount"></div>
  </div>
</div>
</template>

<script>
export default {
  name: 'cartControl',
  props: {
    product: {
      type: Object
    }
  },
  data () {
    return {
      productItem: {
      }
    }
  },
  created () {
    this.productItem = this.product
  },
  methods: {
    addCartCount () {
      console.log('aaa')
      this.productItem.count++
    },
    deleteCartCount (event) {
      console.log('aaa')
      this.productItem.count--
    }
  }
}
</script>

<style lang="less" scoped>

  .cart-control{
    position: absolute;
    right: 0;
    font-size: 16px;
    padding:0 4px;
    .cart-decrease{
      display: inline-block;
      opacity: 1;
      transform: translate3d(0, 0, 0);
      &.move-enter-active, &.move-leave-active{
        transition: all 0.4s linear;
        transform: rotate(0);
      }
      /*cubic-bezier(.11,.87,1,.27)*/
      &.move-enter, &.move-leave-active{
        opacity: 0;
        transition: all 0.4s linear;
        transform: translate3d(26px, 0, 0) rotate(180deg);
      }
    }

    .item{
      /*flex: 1;*/
      width: 20px;
      display: inline-block;
      &:not(:nth-child(2)){
        color: rgb(0, 160, 220);
        font-size: 18px;
      }
    }
  }

</style>
