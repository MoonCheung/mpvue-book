<template>
  <div class="comment-list">
    <div class="page-title" v-if="comments.length">
      评价
    </div>
    <div class="comment"
      v-for="item in comments"
      :key="item.id"
      @click="handleClick(item)">
      <div class="user">
        <div class="inline">
          <img class="avatar" :src="item.image" mode="aspectFit">
          {{item.title}}
        </div>
        <div class="right">
          {{item.location || '未知地点'}}
          <span class="text-primary">--</span>
          {{item.phone || '未知型号'}}
        </div>
      </div>
      <div class="content">
        {{item.comment}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['comments','type'],
  methods: {
    handleClick(item){
      if(this.type === 'user'){
        wx.navigateTo({
          url: '/pages/detail/main?id='+item.bookid
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-list{
  background: #eee;
  font-size: 14px;
  .comment{
    background: white;
    margin-bottom: 10px;
    padding: 5px 20px;
    .user{
      .inline{
        display: inline;
        .avatar{
          height: 20px;
          width: 20px;
          border-radius: 50%;
        }
      }
    }
    .content{
      margin: 10px 0;
    }
  }
}
</style>
