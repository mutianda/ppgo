<template>
    <div class="home-page">
      <div class="shop-head">
        <shop-header :shop="shop"></shop-header>
      </div>
      <div class="tab-list">
        <div class="tab-item">
          商品
        </div>
        <div class="tab-item">
          评价
        </div>
        <div class="tab-item">
          商家
        </div>
      </div>
      <div class="product-list">
        <div class="menu-left" ref="menuWrapper">
          <div class="menu-content">
          <div v-for="(item, index) in goods" class="menu-item" :class="{'current':currentIndex===index}" :key="index" @click="selectMenu(index,$event)">
          <div class="menu-box">
            <svg-icon v-if="item.type>0&&classMap[item.type]" :icon-class="classMap[item.type]" class-name="menu-icon"></svg-icon>
            <span class="menu-text">
              {{item.name}}
            </span>
            <div class="badge-num" v-if="item.count>0">{{item.count}}</div>
          </div>
          </div>
          </div>
        </div>
        <div class="product-right" ref="productWrapper">
          <div class="product-content">
          <div v-for="(item,index) in goods" :key="index" ref="productList" class="menu-product-list product-list-hook">
            <div class="menu-title">{{item.name}}</div>
            <div class="menu-product">
              <div v-for="(productItem,productIndex) in item.products" :key="productIndex" class="product-item product-item-hook">
                <div class="product-box">
                  <div class="product-img" @click="lookDetail(productItem)">
                    <img :src="productItem.image" class="img-detail"/>
                  </div>
                  <div class="product-detail">
                    <div class="product-name">
                      {{productItem.name}}
                    </div>
                    <div class="product-des">
                      {{productItem.description.substring(0,Math.min(10,productItem.description.length))}}
                    </div>
                    <div class="product-rate">
                      <span class="product-sell-num">月销：{{productItem.sellCount}}</span>
                      <span class="product-sell-num">好评：{{productItem.rating}}%</span>
                    </div>
                    <div class="product-price">
                      <span class="price-text" style="color: red">￥{{productItem.price}}</span>
                        <span v-show="productItem.oldPrice" class="old">￥{{ productItem.oldPrice }}</span>
                    </div>
                  </div>
                  <div class="select-this">
                    <cart-control :product="productItem" :shop-id="shop.shopId" :type-id="item.typeId" @addProduct="addProduct" ref="product"></cart-control>
                  </div>
                </div>
              </div>
              </div>
          </div>
          </div>
        </div>
      </div>
      <div class="page-foot">
        <shop-cart :productList="shopCartList" :deliveryPrice="shop.deliveryPrice" :minPrice="shop.minPrice" ref="shopcart"></shop-cart>
      </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import {mapActions, mapGetters} from 'vuex'
import {getProductList, getShopInfo} from '@/api/shop/home'
import ShopHeader from './components/shopHeader'
import ShopCart from './components/shopCart'
import CartControl from './components/cartControl'

export default {
  name: 'shopHome',
  components: {CartControl, ShopCart, ShopHeader},
  data () {
    return {
      selectedFoods: {},
      goods: [],
      listHeight: [],
      scrollY: 0,
      selectedFood: {},
      shop: {},
      product: {},
      classMap: ['hui', 'zhe', 'vip', 'decrease'],
      minPrice: 33

    }
  },
  computed: {
    ...mapGetters([
      'shopCart'
    ]),
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    },
    shopCartList () {
      let arr = []
      let shopcount = this.shop
      for (const item of this.goods) {
        if (this.shopCart[this.shop.shopId] && this.shopCart[this.shop.shopId][item.typeId]) {
          let itemcount = 0
          for (const childitem of item.products) {
            if (this.shopCart[this.shop.shopId][item.typeId][childitem.productId]) {
              childitem.count = this.shopCart[this.shop.shopId][item.typeId][childitem.productId].count
              itemcount += childitem.count
              arr.push(childitem)
            }
          }
          item.count = itemcount
          console.log(item.count, 'menuNum')
        }
        shopcount.count += item.count
      }
      return arr
    }
  },
  created () {
    let product = getProductList().data
    let shop = getShopInfo()
    shop.count = 0
    this.shop = shop
    console.log(product)
    console.log(shop)
    for (let i in product) {
      product[i].typeId = 'ptoductType-' + i
      product[i].count = 0
      for (let index in product[i].products) {
        product[i].products[index].productId = 'productId-' + index
        product[i].products[index].count = 0
      }
    }
    this.goods = JSON.parse(JSON.stringify(product))
  },
  mounted () {
    this._initScroll()
    this._calculateHeight()
  },
  methods: {
    ...mapActions([
      'addProductToCart'
    ]),
    _initScroll () {
      this.meunScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })

      this.productScroll = new BScroll(this.$refs.productWrapper, {
        click: true,
        probeType: 3
      })
      this.productScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    selectMenu (index, event) {
      // if (!event._constructed) {
      //   return
      // }
      console.log(index, event)
      let productList = this.$refs.productList
      console.log(productList)
      let el = productList[index]
      this.productScroll.scrollToElement(el, 300)
    },
    _calculateHeight () {
      let productList = this.$refs.productList
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < productList.length; i++) {
        let item = productList[i]
        height += item.clientHeight
        if (i === productList.length) {
          height += 600
        }
        this.listHeight.push(height)
      }
    },
    lookDetail (i) {
      console.log(i)
    },
    addProduct (target) {
      this._drop(target)
    },
    _drop (target) {
      // 体验优化,异步执行下落动画
      this.$nextTick(() => {
        this.$refs.shopcart.drop(target)
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .home-page{
    position: relative;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    .shop-head{
      width: 100%;
      height: 120px;
      position: relative;
    }
    .tab-list{
      width: 100%;
      height: 40px;
      background-color: #fff;
      color: #888;
      font-size: 13px;
      display: flex;
      line-height: 40px;
      justify-items: center;
      border-bottom: .5px #eee solid;
      .tab-item{
        flex: 1;
      }
    }
    .product-list{
      width:100%;
      display: flex;
      position: absolute;
      top: 160px;
      left: 0;
      right: 0;
      bottom: 50px;
      margin: 1px 0;
      overflow: hidden;
      .menu-left{
        width: 90px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-items: center;
        background-color: rgba(245,245,245,.8);
        .menu-item{
          color: #353535;
          font-size: 10px;
          margin: 0 auto;
          &.current{
            position: relative;
            z-index: 10;
            margin-top: -2px;
            background: #fff;
            font-weight: 900;
          }
          &:last-child{
            border:none;
          }
          .menu-box{
            padding: 13px 20px;
            height: auto;
            text-align: left;
            position: relative;
            .menu-text{
              text-align: left;
            }
            .menu-icon{
              width: 25px;
              vertical-align: top;
            }
            .badge-num{
              position: absolute;
              top:0;
              right: -10px;
              width: 18px;
              height: 18px;
              text-align: center;
              border-radius: 50%;
              background-color: red;
              color: #fff;
              line-height: 18px;
            }
          }
        }
      }
      .product-right{
        flex: 1;
        padding: 0px 5px;
        background-color: #fff;
        .menu-product-list{
          &:last-child{
            margin-bottom: 500px;
          }
          .menu-title{
            color: #aaa;
            font-size: 12px;
            text-align: left;
            line-height: 20px;
          }
          .product-item{
            color: #555;
            font-size: 10px;
            height: 100px;
            text-align: center;
            line-height: 80px;
            .product-box{
              display: flex;
              .product-img{
                width: 100px;
                height: 100%;
                .img-detail{
                  width: 60px;
                  height: 60px;
                }
              }
              .product-detail{
                flex: 1;
                height: 100%;
                text-align: left;
                .product-name{
                  font-size: 15px;
                  font-weight: 900;
                  line-height: 25px;
                  color: #222;
                }
                .product-des{
                  font-size: 10px;
                  line-height: 12px;
                  color: #aaa;
                }
                .product-rate{
                  font-size: 10px;
                  font-weight: 500;
                  color: #868686;
                  line-height: 16px;
                }
                .product-price{
                  font-size: 13px;
                  font-weight: 700;
                  color: #868686;
                  line-height: 16px;
                  .old{
                    text-decoration:line-through;
                    font-size: 8px;
                    padding-left: 20px;
                  }
                }

              }
              .select-this{
                width: 80px;
                position: relative;
              }
            }
          }
        }

      }

    }
  .page-foot{
    position: relative;
  }
  }

</style>
