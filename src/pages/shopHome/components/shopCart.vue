<template>
  <div>
    <div class="shop-cart">
      <div class="cart-box">
        <div class="cart-left">
          <div class="cart-wrapper">
            <div class="cart-log" :class="{'highlight':totalPrice>0}" >
              <svg-icon icon-class="cart" class-name="cart-icon" />
            </div>
          </div>
          <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
        </div>
        <div class="cart-center">
          另需配送费￥{{deliveryPrice}}元
        </div>
        <div class="cart-right" @click="checkOut">
          <div class="pay-des"  :class="{'can-pay':totalPrice>minPrice}">
           {{payDesc}}
          </div>
        </div>
      </div>
<!--      <div class="content" @click="toggleList">-->
<!--        <div class="content-left">-->
<!--          <div class="logo-wrapper">-->
<!--            <div class="logo" :class="{'highlight':totalCount>0}">-->
<!--              <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>-->
<!--            </div>-->
<!--            <div class="num" v-show="totalCount>0">{{totalCount}}</div>-->
<!--          </div>-->
<!--&lt;!&ndash;          <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>&ndash;&gt;-->
<!--&lt;!&ndash;          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>&ndash;&gt;-->
<!--        </div>-->
<!--        <div class="content-right" @click="pay">-->
<!--          <div class="pay" :class="payClass">-->
<!--            {{payDesc}}-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
      <div class="ball-container">
        <div v-for="(ball,index) in balls" :key="index">
          <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
<!--      <transition name="fold">-->
<!--        <div class="shopcart-list" v-show="listShow">-->
<!--          <div class="list-header">-->
<!--            <h1 class="title">购物车</h1>-->
<!--            <span class="empty" @click="empty">清空</span>-->
<!--          </div>-->
<!--          <div class="list-content" ref="listContent">-->
<!--            <ul>-->
<!--              <li class="food" v-for="(food,index) in selectFoods" :key="index">-->
<!--                <span class="name">{{food.name}}</span>-->
<!--                <div class="price">-->
<!--                  <span>￥{{food.price*food.count}}</span>-->
<!--                </div>-->
<!--                <div class="cartcontrol-wrapper">-->
<!--                  <CartControl @add="addFood" :food="food"></CartControl>-->
<!--                </div>-->
<!--              </li>-->
<!--            </ul>-->
<!--          </div>-->
<!--        </div>-->
<!--      </transition>-->
    </div>
<!--    <transition name="fade">-->
<!--      <div class="list-mask" @click="hideList" v-show="listShow"></div>-->
<!--    </transition>-->
  </div>
</template>

<script type="text/ecmascript-6">
// import BScroll from 'better-scroll'
import { mapGetters } from 'vuex'
import CartControl from './cartControl'

export default {
  components: {
    CartControl
  },
  props: {
    productList: {
      type: Array,
      default () {
        return [
          {
            price: 10,
            count: 1
          }
        ]
      }
    },
    deliveryPrice: {
      type: Number,
      default: 4
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBalls: [],
      fold: true
    }
  },
  computed: {
    ...mapGetters([
      'shopCart'
    ]),

    totalPrice () {
      let total = 0
      this.productList.forEach((product) => {
        total += product.price * product.count
      })
      return total
    },
    totalCount () {
      let count = 0
      this.productList.forEach((product) => {
        count += product.count
      })
      return count
    },
    payDesc () {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice
        return `还差￥${diff}元起送`
      } else {
        return '去结算'
      }
    },
    payClass () {
      if (this.totalPrice < this.minPrice) {
        return 'not-enough'
      } else {
        return 'enough'
      }
    }
    // listShow () {
    //   if (!this.totalCount) {
    //     this.fold = true
    //     return false
    //   }
    //   let show = !this.fold
    //   if (show) {
    //     this.$nextTick(() => {
    //       if (!this.scroll) {
    //         this.scroll = new BScroll(this.$refs.listContent, {
    //           click: true
    //         })
    //       } else {
    //         this.scroll.refresh()
    //       }
    //     })
    //   }
    //   return show
    // }
  },
  mounted () {
    // console.log(this.productList)
    // console.log('list')
  },
  methods: {
    drop (el) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropBalls.push(ball)
          return
        }
      }
    },
    toggleList () {
      if (!this.totalCount) {
        return
      }
      this.fold = !this.fold
    },
    hideList () {
      this.fold = true
    },
    empty () {
      this.selectFoods.forEach((food) => {
        food.count = 0
      })
    },
    pay () {
      if (this.totalPrice < this.minPrice) {
        return
      }
      window.alert(`支付${this.totalPrice}元`)
    },
    addProduct (target) {
      this.drop(target)
    },
    beforeDrop (el) {
      let count = this.balls.length
      while (count--) {
        let ball = this.balls[count]
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect()
          let x = rect.left - 32
          let y = -(window.innerHeight - rect.top - 22)
          el.style.display = ''
          el.style.webkitTransform = `translate3d(0,${y}px,0)`
          el.style.transform = `translate3d(0,${y}px,0)`
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`
          inner.style.transform = `translate3d(${x}px,0,0)`
        }
      }
    },
    dropping (el, done) {
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0,0,0)'
        el.style.transform = 'translate3d(0,0,0)'
        let inner = el.getElementsByClassName('inner-hook')[0]
        inner.style.webkitTransform = 'translate3d(0,0,0)'
        inner.style.transform = 'translate3d(0,0,0)'
        el.addEventListener('transitionend', done)
      })
    },
    afterDrop (el) {
      let ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    },
    checkOut () {
      this.$router.push('/checkout')
    }
  }
}
</script>

<style lang="less" scoped>
  .shop-cart{
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
    .cart-box{
      width: 100%;
      display: flex;
      height: 48px;
      line-height: 48px;
      background: #141d27;
      font-weight: 700;
      color: rgba(255, 255, 255, 0.4);
      .cart-left{
        flex: 0 0 130px;
        background-color: #131d27;
        position: relative;
        .cart-wrapper{
          position: absolute;
          top:-10px;
          left: 0;
          margin: 0 12px;
          padding: 6px;
          width: 56px;
          height: 56px;
          box-sizing: border-box;
          border-radius: 50%;
          text-align: center;
          background: #131d27;
          .cart-log{
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border-radius: 50%;
            text-align: center;
            background: #2b343c;
            &.highlight{
              background: dodgerblue;
            }
            .cart-icon{
              line-height: 46px;
              margin-top: 10px;
              width: 25px;
              height: 25px;
              text-align: center;
            }
          }
        }
        .price{
          position: absolute;
          top: 0;
          right: 10px;
          width: 50px;
          height: 100%;
          line-height: 44px;
          color: #80858a;
          font-weight: 700;
          font-size: 18px;
          border-right: 1px #eee;
          &.highlight{
            color: #fff;
          }
          /*box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)*/
        }
      }
      .cart-center{
        flex: 1;
        font-size: 10px;
        color: #868686;
        background: #141d27;
        border-left: 1px solid rgba(255, 255, 255, 0.1)
      }
      .cart-right{
        width:  100px;
        height: 100%;
        background-color: #2b343b;
        .pay-des{
          width: 100px;
          height: 100%;
          line-height: 48px;
          text-align: center;
          color: #868686;
          font-size: 15px;
          font-weight: 600;
          &.can-pay{
            background: #00b43c;
            color: #fff;
          }
        }
      }
    }
    .ball-container{
      .ball{
        position: fixed;
        left: 32px;
        bottom: 22px;
        z-index: 200;
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
        .inner{
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: rgb(0, 160, 220);
          transition: all 0.4s linear;
        }
      }
    }
  }
</style>
