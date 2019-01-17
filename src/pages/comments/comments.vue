<template>
  <div class="container">
    <CommentList :comments="comments" type="user" ></CommentList>
  </div>
</template>

<script>
import { get } from '@/utils/index'
import CommentList from '@/components/CommentList'

export default {
  components: {
    CommentList
  },
  data () {
    return {
      userinfo: {},
      comments: []
    }
  },
  //方法将会被混入vue实例中
  methods: {
    init(){
      wx.showNavigationBarLoading();
      this.getComments();
      wx.hideNavigationBarLoading();
    },
    async getComments(){
      const commentList = await get('/api/commentlist',{
        openid: this.userinfo.openId
      })
      console.log(commentList.list);
      this.comments = commentList.list
    }
  },
  // el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。
  mounted () {
    if(!this.userinfo.openId){
      let userinfo = wx.getStorageSync('userinfo')
      if(userinfo) {
        this.userinfo = userinfo
        this.init();
      }
    }
  }
}
</script>
