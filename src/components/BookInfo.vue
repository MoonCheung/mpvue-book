<template>
  <div class="bookinfo">
    <div class="thumb">
      <img class="back"
           :src="info.image"
           mode="aspectFilt">
      <img class="img"
           :src="info.image"
           mode="aspectFit">
      <div class="info">
        <div class="title">
          {{info.title}}
        </div>
        <div class="author">
          {{info.author}}
        </div>
      </div>
    </div>
    <div class="detail">
      <img :src="userinfo.image" class="avatar" mode="aspectFit">
      {{userinfo.name}}
      <div class="right text-primary">
        {{info.rate}}分
        <Rate :value="info.rate"></Rate>
      </div>
    </div>
    <div class="detail">
      {{info.publisher}}
      <div class="right">
        {{info.price}}
      </div>
    </div>
    <div class="tags">
      <div class="badge" v-for="tag in info.tags" :key="tag">{{tag}}</div>
    </div>
    <div class="summary">
      <p class="" v-for="(sum, i) in info.summary" :key="i">{{sum}}</p>
    </div>

  </div>
</template>

<script>
import Rate from '@/components/Rate'

export default {
  props: ['info'],
  components: {
    Rate
  },
  // 计算属性将被混入到 Vue 实例中
  computed: {
    userinfo () {
      return this.info.user_info || {}
    }
  }
}
</script>

<style lang="scss" scoped>
.bookinfo {
  font-size: 14px;
  .right{
    float: right;
  }
  .badge{
    display: inline-block;
    margin: 5px;
    padding: 5px;
    border-radius: 10px;
    border: 1px #EA5A49 solid;
    color: #EA5A49
  }
  .summary{
    padding: 0 15px;
    margin-top: 10px;
    p{
      text-indent: 2em;
      font-size: 14px;
    }
  }
  .detail{
    padding: 5px 10px;
    .avatar{
      width: 20px;
      height: 20px;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
  .thumb {
    width: 750rpx;
    height: 500rpx;
    overflow: hidden;
    position: relative;
    .back {
      filter: blur(15px);
      width: 100%;
    }
    .img {
    position: absolute;
    width: 100%;
    height: 300rpx;
    left: 0;
    top: 30rpx;
    }
    .info {
      color: white;
      position: absolute;
      width: 100%;
      left: 0;
      top: 330rpx;
      text-align: center;
      .title{
        font-size: 20px;
      }
    }
  }
}
</style>
