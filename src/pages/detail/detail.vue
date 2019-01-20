<template>
  <div>
    <BookInfo :info="info" ></BookInfo>
    <CommentList :comments="comments" ></CommentList>
    <div class="comment" v-if="showAdd">
      <textarea v-model="comment"
                class="textarea"
                :maxlength="100"
                placeholder="请输入图书短评"
                ></textarea>
      <div class="location">
        地理位置:
        <switch color="#EA5A49" :checked="location" @change="getGeo" ></switch>
        <span class="text-primary">{{ location }}</span>
      </div>
      <div class="phone">
        手机型号:
        <switch color="#EA5A49" :checked="phone" @change="getPhone" ></switch>
        <span class="text-primary">{{ phone }}</span>
      </div>
      <button class="btn" @click="addComment">评论</button>
    </div>
    <div v-else class="text-footer">
      未登录或者已经评论过
    </div>
    <button open-type="share" class="btn" >转发给好友</button>
  </div>
</template>

<script>
import { get, post, showModal, showSuccess } from '@/utils/index'
import BookInfo from '@/components/BookInfo'
import CommentList from '@/components/CommentList'

export default {
  components: {
    BookInfo,
    CommentList
  },
  data () {
    return {
      comments: [],
      userinfo: {},
      bookid: '',
      info: {},
      comment: '',
      location: '',
      phone: ''
    }
  },
  onShareAppMessage(res){
    if(res.from === "button"){
        // 来自页面内转发按钮
        console.log(res.target)
      }
      return {
        //这里的路径要这么写
        title: this.info.title,
        path: '/pages/detail/main?id=' + this.$root.$mp.query.id,
        imageUrl: this.info.image,
        success: function(res) {
          console.log("转发成功:" + JSON.stringify(res));
          //转发成功
          showSuccess('转发成功')
        },
        fail: function (res) {
          // 转发失败
          console.log("转发失败:" + JSON.stringify(res));
        }
      }

  },
  //计算属性
  computed: {
    showAdd(){
      //没登录
      if(!this.userinfo.openId) { return false; }
      if(this.comments.filter(v => v.openid === this.userinfo.openId).length){
        return false;
      }
      return true;
    }
  },
  methods: {
    async addComment(){
      if(!this.comment) { return true; }
      const data = {
        openid: this.userinfo.openId,
        bookid: this.bookid,
        comment: this.comment,
        location: this.location,
        phone: this.phone
      }
      console.log(data);
      try{
        await post('/api/addcomment', data);
        this.comment = '' //空评论
        this.getComments()
      }catch(e){
        showModal('失败', e.msg)
      }
    },
    async getComments(){
      const comments = await get('/api/commentlist', {bookid: this.bookid})
      this.comments = comments.list || [];
    },
    async getDtail(){
      const info = await get('/api/bookdetail', {id: this.bookid})
      wx.setNavigationBarTitle({
        title: info.title
      })
      this.info = info
    },
    getGeo(e){
      const ak = "KIeNfIUwXbDSlLTTsEy187HeBrNuQ7fI"
      let url = "http://api.map.baidu.com/geocoder/v2/"
      if(e.target.value){
        wx.getLocation({
          success: geo =>{
            wx.request({
              url,
              data: {
                ak,
                location: `${geo.latitude},${geo.longitude}`,
                output: 'json'
              },
              success: res =>{
                if(res.data.status == 0){
                  this.location = res.data.result.addressComponent.city
                }else{
                  this.location = '未知地点'
                }
              }
            })
          }
        })
      }else{
        //没选位置
        this.location = ''
      }
    },
    getPhone(e){
      console.log('手机型号获取:')
      if(e.target.value){
        const getPhone = wx.getSystemInfoSync();
        this.phone = getPhone.model
      }else{
        //没选手机
        this.phone = "";
      }
    }
  },
  mounted () {
    this.bookid = this.$root.$mp.query.id;
    this.getDtail();
    this.getComments();
    const userinfo = wx.getStorageSync('userinfo');
    if(userinfo){ return this.userinfo = userinfo; };
  }
}
</script>

<style lang="scss" scoped>
.comment{
  margin-top: 10px;
  font-size: 14px;
  .textarea{
    background: #eee;
    padding: 10rpx;
    width: 730rpx;
    height: 200rpx;
  }
  .location{
    margin-top:5px;
    padding:5px 10px;
  }
  .phone{
    margin-top:5px;
    padding:5px 10px;
  }
}
</style>
