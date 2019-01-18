<template>
  <div class="container">
    <CommentList
      v-if="userinfo.openId"
      :comments="comments"
      type="user" ></CommentList>
    <div v-if="userinfo.openId">
      <div class="page-title">我的图书</div>
      <Card
        v-for="book in books"
        :key="book.id"
        :book="book"></Card>
      <div v-if="!books.length">暂时还没添加过书,快去添加几本吧！</div>
    </div>
  </div>
</template>

<script>
import { get } from '@/utils/index'
import CommentList from '@/components/CommentList'
import Card from '@/components/Card'

export default {
  components: {
    CommentList,
    Card
  },
  data () {
    return {
      userinfo: {},
      comments: [],
      books: []
    }
  },
  onPullDownRefresh(){
    this.init();
    wx.stopPullDownRefresh();
  },
  //方法将会被混入vue实例中
  methods: {
    init(){
      wx.showNavigationBarLoading();
      this.getComments();
      this.getBooks();
      wx.hideNavigationBarLoading();
    },
    async getComments(){
      const commentList = await get('/api/commentlist',{
        openid: this.userinfo.openId
      })
      console.log(commentList.list);
      this.comments = commentList.list
    },
    async getBooks(){
      const book = await get('/api/booklist',{
        openid: this.userinfo.openId
      })
      this.books = book.list;
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
