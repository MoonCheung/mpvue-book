<template>
  <div>
    <TopSwiper :tops="tops"></TopSwiper>
    <card v-for="book in books"
          :key="book.id"
          :book="book"></card>
    <p class="text-footer"
       v-if="!more">
      没有更多数据！
    </p>
  </div>
</template>

<script>
import { get } from "@/utils/index";
import Card from "@/components/Card";
import TopSwiper from "@/components/TopSwiper";

export default {
  components: {
    Card,
    TopSwiper
  },
  data() {
    return {
      books: [],
      page: 0,
      more: true,
      tops: []
    };
  },
  onPullDownRefresh() {
    this.getList(true);
  },
  onReachBottom() {
    if (!this.more) {
      return false;
    }
    this.page = this.page + 1;
    this.getList();
  },
  methods: {
    async getList(init) {
      if (init === true) {
        this.page = 0;
        this.more = true;
      }
      wx.showNavigationBarLoading();
      const books = await get("/api/booklist", { page: this.page });
      if (books.list.length < 10 && this.page > 0) {
        this.more = false;
        console.log(this.more);
      }
      if (init) {
        this.books = books.list;
        wx.stopPullDownRefresh();
      } else {
        // 下拉刷新，不能直接覆盖books,而是累加
        this.books = this.books.concat(books.list);
      }
      wx.hideNavigationBarLoading();
    },
    async getTop() {
      const tops = await get("/api/top");
      this.tops = tops.list;
    }
  },
  mounted() {
    this.getList(true);
    this.getTop();
  }
};
</script>

<style lang="scss" scoped>

</style>

