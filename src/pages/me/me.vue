<template>
  <div class="container">
    <div class="userinfo" @click="login">
      <img :src="userinfo.avatarUrl" alt="" >
      <p>{{userinfo.nickName}}</p>
    </div>

    <button>添加图书</button>
  </div>
</template>

<script>
import qcloud from 'wafer2-client-sdk'
import { config } from '@/utils/config'
import { showSuccess, post, get } from '@/utils/index'

export default {
  data () {
    return {
      userinfo: {
        avatarUrl: '/static/images/unlogin.png',
        nickName: '点击登录'
      }
    }
  },
  // 方法将被混入到 Vue 实例中。
  methods: {
    login(){
      const self = this;
      let user = wx.getStorageSync('userinfo');
      if(!user){
        // 设置登录地址
        qcloud.setLoginUrl(config.loginUrl);
        qcloud.login({
          success: function (userInfo) {
              console.log('登录成功', userInfo);
          },
          fail: function (err) {
              console.log('登录失败', err);
          }
        });
      }
    }
  },
  // 被新创建方法替换，并挂载到实例上去之后调用该钩子。
  mounted () {

  }
}
</script>

<style lang="scss" scoped>
.container{
  padding: 0 30rpx;
}

.userinfo{
  margin-top: 100rpx;
  text-align: center;
  img{
    width: 150rpx;
    height: 150rpx;
    margin: 20rpx;
    border-radius: 50%;
  }
}
</style>

