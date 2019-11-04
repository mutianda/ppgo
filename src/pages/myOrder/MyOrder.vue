<template>
    <div class="order-page">
      <div class="order-title">订单详情</div>

      <div class="product-list" ref="productListWrapper">
        <div class="product-content">
     <div class="order-list" v-for="(it,index) in orders" :key="index">
       <div class="order-id">
        订单编号：{{it.orderId}} <span style="padding-left: 20px">订单时间：{{it.time}}</span>
       </div>
       <div class="product-content">
         <div v-for="(item,index) in it.productList" :key="index" ref="productList" class="menu-product-list product-list-hook">
           <div class="product-box">
             <div class="product-img"><img :src="item.icon" class="product-icon"/></div>
             <div class="product-name">{{item.name}}</div>
             <div class="product-count">{{item.count}}</div>
             <div class="product-price">￥{{item.price}}</div>
             <div class="product-price">￥{{item.count*item.price}}</div>
           </div>
         </div>
       </div>
       </div>
     </div>
      </div>
      <div class="handle">
        <el-button type="success" @click="$router.push('/')">返回主页</el-button>
      </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'MyOrder',
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'orderList'
    ]),
    orders () {
      const arr = []
      for (const i of this.orderList) {
        const order = {
          time: i.orderTime,
          orderId: i.orderId,
          productList: []
        }
        for (const item in i.orderContent['shop-12']) {
          for (const childItem in i.orderContent['shop-12'][item]) {
            order.productList.push(i.orderContent['shop-12'][item][childItem])
          }
        }
        arr.push(order)
      }
      console.log(arr)
      return arr
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    init () {
      this.productScroll = new BScroll(this.$refs.productListWrapper, {
        click: true
      })
    }
  }
}
</script>

<style scoped lang="less">
  .order-page{
    width: 100%;
    background-color: #00a0dc;
    height: 100%;
    position: relative;
    .handle{
      width: 100%;
      height: 60px;
      line-height: 60px;
      text-align: center;
      position: absolute;
      bottom: 0px;
      left: 0;
      right: 0;
    }
    .order-title{
      text-align: center;
      font-size: 18px;
      line-height: 30px;
      color: #fff;
    }
    .product-list {
      width:90%;
      position: absolute;
      top: 50px;
      left: 5%;
      right:5%;
      bottom: 64px;
      margin: 1px 0;
      overflow: hidden;
       .order-list{
         margin-bottom: 20px;
          .order-id{
            text-align: left;
            font-size: 15px;
            height: 50px;
            line-height: 50px;
            color: #fff;
            padding: 5px 20px;
          }
          .menu-product-list {
            border-radius: 10px;
            padding: 5px 0px;
            margin: 1px;
            background-color: #fff;
            border-bottom: 1px solid #eee;
          .product-box {
            display: flex;
            height: 60px;
            align-items: center;
            justify-items: center;
            background-color: #fff;
            font-size: 12px;
            .product-img {
              flex: 0 0 50px;

              .product-icon {
                width: 30px;
                height: 30px;
              }
            }

            .product-name {
              flex: 1;
              font-size: 13px;
            }

            .product-count {
              flex: 0 0 30px;
            }

            .product-price {
              flex: 0 0 50px;
            }
          }
        }
      }
    }
  }
</style>
