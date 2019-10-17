<template>
<div class="shop-header">
  <div class="header-content">
    <div class="heaer-avatar">
      <img :src="shop.avatar"  style="width: 60px;height: 60px"/>
    </div>
    <div class="header-des">
      <div class="shop-name">{{shop.name}}</div>
      <div class="shop-deliver"><span>{{shop.description}}</span>/<span>{{shop.deliveryTime}}分钟送达</span></div>
      <div v-if="shop.supports" class="shop-supports">
<!--          <span class="icon" :class="classMap[shop.supports[0].type]"></span>-->
          <span class="text">{{shop.supports[0].description}}</span>
      </div>

    </div>
    <div class="header-detail">

    </div>
  </div>
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
    width: 100%;
    height: 100px;
    padding: 10px 15px;
    box-sizing: border-box;
    .header-content{
      display: flex;
      height: 80px;
      align-items: center;
      justify-items: left;
      .header-avatar{
        flex: 0 0 80px;
        img{
          width: 60px;
          height: 60px;
        }
      }
      .header-des{
        flex: 1;
        height: 80px;
        color: #eee;
        .shop-name{
          font-size: 18px;
        }
        .shop-deliver{
          font-size: 13px;
        }
        .shop-supports{
          font-size: 10px;
          .text{
            color: #aaa;
          }
        }
      }
      .header-detail{
        flex: 0 0 40px;
        height: 80px;
      }
    }
  }

</style>
