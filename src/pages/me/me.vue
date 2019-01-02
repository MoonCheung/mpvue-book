<template>
  <div class="container">
    <div class="userinfo">
      <img :src="logged?userinfo.avatarUrl : '/static/images/unlogin.png'" alt="" >
      <!-- <p>{{userinfo.nickName}}</p> -->
      <!-- 需要使用 button 来授权登录 -->
      <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="doLogin">{{logged?userinfo.nickName : '点击登录'}}</button>
    </div>

    <button>添加图书</button>
  </div>
</template>

<script>
import qcloud from 'wafer2-client-sdk'
import { config } from '@/utils/config'
import { showSuccess, post, showModal } from '@/utils/index'

export default {
  data () {
    return {
      userinfo: {},
      logged: false
    }
  },
  // 方法将被混入到 Vue 实例中。
  methods: {
    doLogin(){
      let self = this;
      let user = wx.getStorageSync('userinfo');
      if(!user){
        //查看是否授权
        wx.getSetting({
          success(res) {
            if(res.authSetting['scope.userInfo'] === true){
              // 已授权，直接通过nodejsSDK登录获取用户信息
              qcloud.setLoginUrl(config.loginUrl);
              qcloud.login({
                success: function (res) {
                  qcloud.request({
                    login: true,
                    url: config.userUrl,
                    success: function (res) {
                      showSuccess('登录成功');
                      wx.setStorageSync('userinfo', res.data.data);
                      self.logged = true;
                      self.userinfo = res.data.data;
                    }
                  })
                }
              })
            }
          }
        })
      }


    }
  },
  // 被新创建方法替换，并挂载到实例上去之后调用该钩子。
  mounted () {
    this.doLogin();
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

