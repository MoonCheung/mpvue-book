<template>
  <div>books页</div>
</template>

<script>
import { get } from '@/utils/index'

export default {
  async created () {
    const res = await get('/api/index')
    console.log(res)
  }
}
</script>
