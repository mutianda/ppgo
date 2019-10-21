<template>
    <div class="pay-page">
      <div class="box-card">
        <div class="pay-result">
          {{'支付成功 '}}<i class="el-icon-circle-check"></i>
        </div>
      </div>
      <div class="timeline">
        <el-timeline class="">
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :icon="activity.icon"
            :type="activity.type"
            :color="activity.color"
            :size="activity.size"
            :timestamp="activity.timestamp">
            {{activity.content}}
          </el-timeline-item>
        </el-timeline>
      </div>
      <div class="box-card">
        <div class="handle">
          <el-button type="success">返回主页</el-button>
          <el-button type="info" plain>我的订单</el-button>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'payFinished',
  data () {
    return {
      activities: [{
        content: '商家确认订单',
        timestamp: '2019-10-20 20:46',
        size: 'large',
        type: 'primary',
        icon: 'el-icon-more'
      }, {
        content: '商家开始揽收',
        timestamp: '2019-10-20 21:46',
        color: '#0bbd87'
      }, {
        content: '订单发出',
        timestamp: '2019-10-21 20:46',
        size: 'large'
      }, {
        content: '确认收货',
        timestamp: '2019-10-22 20:46'
      }]
    }
  }
}
</script>

<style scoped lang="less">
  .pay-page{
    height: 100%;
    overflow: hidden;
    .timeline{
      width: 100%;
      margin: 20px 10px;
      padding-top: 50px;
    }
    .box-card{
      width: 80%;
      padding-top: 50px;
      margin: 0 auto;
      height: 100px;
      .pay-result{
        color: #00b43c;
        font-size: 25px;
        height: 100%;
      }
    }
  }

</style>
