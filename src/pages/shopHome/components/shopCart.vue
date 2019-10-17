<template>
  <div>
    <div class="shop-cart">
      <div class="cart-box">
        <div class="cart-left">
          <svg-icon icon-class="cart" class-name="card-panel-icon" />
        </div>
        <div class="cart-center"></div>
        <div class="cart-right"></div>
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
<!--      <div class="ball-container">-->
<!--        <div v-for="(ball,index) in balls" :key="index">-->
<!--          <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">-->
<!--            <div class="ball" v-show="ball.show">-->
<!--              <div class="inner inner-hook"></div>-->
<!--            </div>-->
<!--          </transition>-->
<!--        </div>-->
<!--      </div>-->
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
import CartControl from './cartControl'

export default {
  components: {
    CartControl
  },
  props: {
    selectFoods: {
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
      default: 0
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
    totalPrice () {
      let total = 0
      // this.selectFoods.forEach((food) => {
      //   total += food.price * food.count
      // })
      return total
    },
    totalCount () {
      let count = 0
      // this.selectFoods.forEach((food) => {
      //   count += food.count
      // })
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
    addFood (target) {
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
      background: #141d27;
      font-size: 0;
      color: rgba(255, 255, 255, 0.4);
      .cart-left{
        flex: 150px;
        background-color: #131d26;
      }
      .cart-center{
        flex: 1;
        background: #141d27;
      }
      .cart-right{
        flex: 0 0 100px;
        background-color: #2b343b;
      }
    }

  }
</style>
