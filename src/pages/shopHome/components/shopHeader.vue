<template>
<div class="shop-header">
  <div class="header-content">
    <div class="heaer-avatar">
      <img :src="shop.avatar"  style="width: 60px;height: 60px"/>
    </div>
    <div class="header-des" @click="showDetail=true">
      <div class="shop-name">
        <svg-icon icon-class="pinpai-min" class-name="pinpai-icon"></svg-icon>
        <span class="name-text">{{shop.name}}</span>
      </div>
      <div class="shop-deliver"><span>{{shop.description}}</span>/<span>{{shop.deliveryTime}}分钟送达</span></div>
      <div v-if="shop.supports" class="shop-supports" @click.stop.prevent="showDetail=true">
<!--          <span class="icon" :class="classMap[shop.supports[0].type]"></span>-->
        <svg-icon :icon-class="classMap[shop.supports[0].type]" class-name="support-icon"></svg-icon>
        <span class="support-text">{{shop.supports[0].description}}</span>
      </div>
    </div>
    <div class="header-detail">
      <div class="detail-botton" @click.stop.prevent="showDetail=true">
        <span class="detail-num">{{shop.supports.length}}个</span>
        <i class="el-icon-arrow-right detail-go"></i>
      </div>
    </div>
  </div>
  <div class="tip-detail">
    <svg-icon icon-class="tip-min" class-name="tip-icon"></svg-icon>
    <span class="tip-text" @click.stop.prevent="showDetail=true">{{shop.bulletin}}</span>
  </div>
  <div class="background">
    <img :src="shop.avatar" width="100%" height="100%">
  </div>
  <transition name="slide-fade">
    <div class="shop-detail" v-show="showDetail">
      <div class="shop-title">
        <div class="shop-name">
          <svg-icon icon-class="pinpai-min" class-name="pinpai-icon"></svg-icon>
          <span class="name-text">{{shop.name}}</span>
        <div class="shop-start">
          <el-rate
            v-model="shop.score"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}">
          </el-rate>
        </div>
        </div>
      </div>
      <div class="shop-support">
        <el-divider content-position="center">商家优惠</el-divider>
        <div class="support-item" v-for="(item,index) in shop.supports" :key="index">
          <svg-icon v-if="classMap[item.type]" :icon-class="classMap[item.type]" class-name="support-icon"></svg-icon>
          <span class="support-text">{{item.description}}</span>
        </div>
      </div>
      <div class="shop-tip">
        <el-divider content-position="center">商家公告</el-divider>
        <span>{{shop.bulletin}}</span>
      </div>
      <div class="close-detail" @click="showDetail=false">
        <div class="el-icon-close close-button" ></div>
      </div>

    </div>
  </transition>
</div>
</template>

<script>
export default {
  name: 'shopHeader',
  props: {
    shop: {
      type: Object
    }
  },
  data () {
    return {
      classMap: ['hui', 'zhe', 'vip', 'decrease'],
      showDetail: false
    }
  }
}
</script>

<style lang="less" scoped>
  .shop-header{
    text-align: center;
    width: 100%;
    height: 120px;
    padding: 10px 15px;
    box-sizing: border-box;
    position: relative;
    background: rgba(7, 17, 27, 0.1);
    overflow: hidden;
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
        padding: 10px 10px 5px 40px;
        text-align: left;
        .shop-name{
          height: 30px;
          .pinpai-icon{
            width: 40px;
            height: 30px;
            vertical-align:text-top;
          }
          .name-text{
            vertical-align: top;
            line-height: 30px;
            font-size: 18px;
          }
        }
        .shop-deliver{
          font-size: 13px;
          line-height: 20px;
        }
        .shop-supports{
          font-size: 10px;
          .support-icon{
            width: 22px;
            height: 18px;
          }
          .support-text{
            color: #eee;
          }
        }
      }
      .header-detail{
        flex: 0 0 50px;
        height: 80px;
        font-size: 5px;
        color: #eee;
        .detail-botton{
          margin: 50px 2px 5px 2px;
          background-color: rgba(1,1,1,.3);
          padding: 3px;
          border-radius: 55px;
          .detail-num{
            display: inline-block;
          }
          .detail-go{
            display: inline-block;
          }
        }
      }
    }
    .tip-detail{
      position: absolute;
      bottom: 2px;
      left: 0;
      right: 0;
      font-size: 4px;
      background: rgba(222, 222, 222, 0.2);
      height: 20px;
      color: #fff;
      line-height: 20px;
      margin: 0 10px 0 12px;
      padding: 0 9px;
      border-radius: 22px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      .tip-icon{
        width: 20px;
        height: 15px;
      }
    }
    .background{
        position: absolute;
        top: -30px;
        left: 0;
        width: 100%;
        z-index: -1;
        filter: blur(3px);
    }
   .shop-detail{
    position: fixed;
    top:0;
    left: 0;
    right: 0;
     bottom: 0;
     height: auto;
    background-color: rgba(1,1,1,.7);
    z-index:9999;
     color: #fff;
     padding: 20px 50px;
     opacity: 1;
     &.slide-fade-enter-active {
       transition: all .3s ease;
     }
     &.slide-fade-leave-active {
       transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
     }
     &.slide-fade-enter, &.slide-fade-leave-to{
       transform: translateY(-800px);
       opacity: 0;
     }
     .shop-title{
        height: 50px;
        vertical-align: bottom;
        margin-top: 120px;
       margin-bottom: 20px;
       .shop-name{
         font-size: 20px;
         line-height: 50px;
       }
       .pinpai-icon{
         width: 50px;
         height: 40px;
         vertical-align: top;
       }
     }
     .shop-support{
       padding: 10px;
       line-height: 30px;
       font-size: 13px;
       text-align: left;
     }
     .shop-tip{
       font-size: 13px;
       line-height: 20px;
       word-spacing: 2px;
       color: #eee;
       text-align: left;
     }
     .close-detail{
       height: 50px;
       margin: 20px auto;
       padding-top: 50px;
       .close-button{
         width: 30px;
       }
     }
   }
  }

</style>
