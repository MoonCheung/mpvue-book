<template>
  <div>
    <BookInfo :info="info" ></BookInfo>
    <div class="comment">
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
    </div>
  </div>
</template>

<script>
import { get } from '@/utils/index'
import BookInfo from '@/components/BookInfo'

export default {
  components: {
    BookInfo
  },
  data () {
    return {
      bookid: '',
      info: {},
      comment: '',
      location: '',
      phone: ''
    }
  },
  methods: {
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
