<template>
<div class="check-page">
  <div class="title">
    <i class="el-icon-arrow-left go-back" @click="goBack"></i>
    <span class="pay-page">提交订单</span>
  </div>
  <div class="address">
    <div class="add-address"><el-button type="primary" icon="el-icon-plus">新增地址</el-button></div>
      <div class="address-box"><span class="address-text">江苏省南京市江宁区淳化街道修文路金侨华府2-3-606</span><i class="el-icon-edit edit-address"></i></div>
  </div>
  <div class="product">
    <div class="product-info">
      <div class="product-shop-name" @click="$router.go(-1)">南京市南京南站KFC皮鞋专卖店<i class="el-icon-arrow-right goshop"></i></div>
      <div class="product-box">
        <div class="product-img">产品</div>
        <div class="product-name">名称</div>
        <div class="product-count">数量</div>
        <div class="product-price">单价</div>
        <div class="product-price">共计</div>
      </div>
    </div>
        <div class="product-list" ref="productListWrapper">
          <div class="product-content">
            <div v-for="(item,index) in productList" :key="index" ref="productList" class="menu-product-list product-list-hook">
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
  <div class="check">
    <div class="check-now">合计{{allMoney}}元</div>
    <div class="pay-now" @click="$router.push('/pay/finished')">支付</div>
  </div>
</div>
</template>

<script>
import BScroll from 'better-scroll'
import {mapGetters} from 'vuex'
export default {
  name: 'checkOut',
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters(['shopCart']),
    productList () {
      console.log(this.shopCart)
      const arr = []
      for (const item in this.shopCart['shop-12']) {
        for (const childItem in this.shopCart['shop-12'][item]) {
          arr.push(this.shopCart['shop-12'][item][childItem])
        }
      }
      console.log(arr)
      return arr
    },
    allMoney () {
      let price = 0
      for (const item in this.shopCart['shop-12']) {
        for (const childItem in this.shopCart['shop-12'][item]) {
          price += this.shopCart['shop-12'][item][childItem].price * this.shopCart['shop-12'][item][childItem].count
        }
      }
      return price
    }
  },
  created () {

  },
  mounted () {
    console.log(this.productList)
    this.$nextTick(() => {
      this.init()
    })
    console.log(this.productScroll)
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    init () {
      this.productScroll = new BScroll(this.$refs.productListWrapper, {
        click: true
      })
    }
  }
}
</script>

<style scoped lang="less">
  .check-page{
    position: relative;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #00a0dc;
    .title{
      width: 100%;
      height: 40px;
      color: #eee;
      display: flex;
      align-items: center;
      justify-items: center;
      .go-back{
        flex: 0 0 40px;
        font-size: 20px;
      }
      .pay-page{
        flex: 1;
        text-align: center;
      }
    }
    .address{
      height: 160px;
      width: 90%;
      margin: 3px auto;
      background-color: #fff;
      .add-address{
        text-align: center;
        height: 70px;
        line-height: 70px;
        padding: 5px 10px;
        border-bottom: #eee 1px solid;
      }
      .address-box{
        display: flex;
        align-items: center;
        .address-text{
          flex: 1;
          text-align: left;
          height: 70px;
          font-size: 13px;
          color: #888888;
          line-height: 30px;
          padding: 5px 10px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
        }
        .edit-address{
          width: 30px;
          height: 70px;
          line-height: 70px;
        }
      }
    }
    .product{
      width:90%;
      position: absolute;
      top: 210px;
      left: 5%;
      right: 5%;
      bottom: 55px;
      overflow: hidden;
      background-color: #fff;
      .product-info{
        position: absolute;
        top:0;
        left: 0;;
        right: 0;
        height: 50px;
        width: 100%;
        font-size: 12px;
        z-index: 99999;
        border-radius: 15px;
        color: #888;
        .product-shop-name{
          background-color: #fff;
          text-align: left;
          height: 30px;
          line-height: 30px;
          padding: 0 10px;
          border-bottom: 1px #eee solid;
          .goshop{
            float: right;
            line-height: 30px;
            font-size: 15px;
          }
        }
        .product-box{
          display: flex;
          height: 25px;
          align-items: center;
          justify-items: center;
          background-color: #fff;
          font-size: 12px;
          .product-img{
            flex: 0 0 50px;
          }
          .product-name{
            flex: 1;
          }
          .product-count{
            flex:  0 0 30px;
          }
          .product-price{
            flex: 0 0 50px;
          }
        }
      }
      .product-list{
        width: 100%;
        height: 100px;
        position: absolute;
        top:60px;
        left: 0;
        left: 0;
        bottom: 0;
        text-align: center;
        background-color: #fff;
          .menu-product-list{
            padding: 5px 0px;
            background-color: #fff;
            border-bottom: 1px solid #eee;
            .product-box{
              display: flex;
              height: 60px;
              align-items: center;
              justify-items: center;
              background-color: #fff;
              font-size: 12px;
              .product-img{
                flex: 0 0 50px;
                .product-icon{
                  width: 30px;
                  height: 30px;
                }
              }
              .product-name{
                flex: 1;
                font-size: 13px;
              }
              .product-count{
                flex:  0 0 30px;
              }
              .product-price{
                flex: 0 0 50px;
              }
            }
          }
        }
    }
    .check{
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 40px;
      background-color: #fff;
      .check-now{
        width: 60%;
        height: 100%;
        line-height: 40px;
        display: inline-block;
        color: #888;
      }
      .pay-now{
        width: 39%;
        float: right;
        height: 100%;
        line-height: 40px;
        display: inline-block;
        background-color: #00b43c;
        color: #fff;
      }
    }
  }

</style>
