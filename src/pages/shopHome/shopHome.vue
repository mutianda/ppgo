<template>
    <div class="home-page">
      <div class="shop-head"></div>
      <div class="product-list">
        <div class="menu-left" ref="menuWrapper">
          <div class="menu-content">
          <div v-for="(item, index) in goods" class="menu-item" :class="{'current':currentIndex===index}" :key="index" @click="selectMenu(index,$event)">
            <div class="menu-item">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </div>
          </div>
          </div>
        </div>
        <div class="product-right" ref="productWrapper">
          <div class="product-content">
          <div v-for="(item,index) in goods" :key="index" ref="productList" class="menu-product-list product-list-hook">
            <div class="menu-title">{{item.name}}</div>
            <div class="menu-product">
              <div v-for="(productItem,productIndex) in item.foods" :key="productIndex" class="product-item product-item-hook">
                <div class="product-box">
                  <div class="product-img">
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
                      ￥<span class="price-text" style="color: red">{{productItem.price}}</span>
                    </div>
                  </div>
                  <div class="select-this">

                  </div>
                </div>
              </div>
              </div>
          </div>
          </div>
        </div>
      </div>
      <div class="page-foot"></div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import {getProductList} from '@/api/shop/home'

export default {
  name: 'shopHome',
  data () {
    return {
      selectedFoods: {},
      goods: [],
      listHeight: [],
      scrollY: 0,
      selectedFood: {}
    }
  },
  computed: {
    classMap () {
      return ['', '']
    },
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    }
  },
  created () {
    this.goods = getProductList().data
  },
  mounted () {
    this._initScroll()
    this._calculateHeight()
  },
  methods: {
    _initScroll () {
      this.meunScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })

      this.productScroll = new BScroll(this.$refs.productWrapper, {
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
    }
  }
}
</script>

<style lang="less" scoped>
  .home-page{
    background-color: #eee;
    position: relative;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    .shop-head{
      width: 100%;
      height: 100px;
      background-color: dodgerblue;
    }
    .product-list{
      width:100%;
      display: flex;
      position: absolute;
      top: 100px;
      left: 0;
      right: 0;
      bottom: 50px;
      margin: 5px 0;
      overflow: hidden;
      background-color: #42b983;
      .menu-left{
        width: 100px;
        background-color: #eee;
        .menu-item{
          color: #aaa;
          font-size: 10px;
          height: 50px;
          text-align: center;
          line-height: 50px;
          &.current{
            position: relative;
            z-index: 10;
            margin-top: -1px;
            background: #fff;
            font-weight: 700;
          }
          &:last-child{
            border:none;
          }
        }
      }
      .product-right{
        flex: 1;
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
                }

              }
              .select-this{
                width: 80px;
              }
            }
          }
        }

      }

    }
  .page-foot{
    position: absolute;
    width: 100%;
    left: 0;
    right: 0;
    bottom: 0;
    height: 50px;
    background-color: dodgerblue;
  }
  }

</style>
