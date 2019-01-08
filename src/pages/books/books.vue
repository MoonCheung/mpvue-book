<template>
  <div>
    <card v-for="book in books" :key="book.id" :book="book"></card>
    <p class="text-footer" v-if="!more">
      没有更多数据！
    </p>
  </div>
</template>

<script>
import { get } from '@/utils/index'
import Card from '@/components/Card'

export default {
  components: {
    Card
  },
  data () {
    return {
      books: [],
      page: 0,
      more: true
    }
  },
  onPullDownRefresh(){
    this.getList(true);
  },
  onReachBottom(){
    if(!this.more){
      return false;
    }
    this.page = this.page+1;
    this.getList();
  },
  methods: {
    async getList(init){
      if(init === true) {
        this.page = 0;
        this.more = true;
      }
      wx.showNavigationBarLoading();
      const books = await get('/api/booklist', {page: this.page});
      if(books.list.length < 10 && this.page > 0){
        this.more = false;
        console.log(this.more);
      }
      if(init){
        this.books = books.list;
        wx.stopPullDownRefresh();
      }else{
        //下拉刷新，不能直接覆盖books,而是累加
        this.books = this.books.concat(books.list)
      }
      wx.hideNavigationBarLoading();
    },
  },
  mounted () {
    this.getList(true);
  }
}
</script>

<style lang="scss" scoped>

</style>

