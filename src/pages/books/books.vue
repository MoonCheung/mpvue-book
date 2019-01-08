<template>
  <div>
    <card v-for="book in books" :key="book.id" :book="book"></card>
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
      books: []
    }
  },
  methods: {
    async getList(){
      const books = await get('/api/booklist');
      this.books = books.list;
    }
  },
  mounted () {
    this.getList();
  }
}
</script>

<style lang="scss" scoped>

</style>

