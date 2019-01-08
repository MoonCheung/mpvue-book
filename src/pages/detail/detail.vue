<template>
  <div>图书:{{bookid}}</div>
</template>

<script>
import { get } from '@/utils/index'

export default {
  data () {
    return {
      bookid: ''
    }
  },
  methods: {
    async getDtail(){
      const info = await get('/api/bookdetail', {id: this.bookid})
    }
  },
  mounted () {
    this.bookid = this.$root.$mp.query.id;
    this.getDtail();
  }
}
</script>

<style lang="scss" scoped>

</style>
