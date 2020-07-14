<template>
  <div class="message">
    <h2>留言板</h2>
    <h3>本小站还在开发中,见谅</h3>
    <comment :comments="comments" />
  </div>
</template>

<script>
import { formatDate } from '../../utils/utils'

import comment from '../../components/comments'
export default {
  data() {
    return {
      comments: []
    }
  },
  components: {
    comment
  },
  async asyncData({ $axios }) {
    var res1 = await $axios.$get(`api/comment/detail?id=-1`)
    console.log('res: ', res1)
    return { comments: res1 }

    // console.log(res)
    // this.blog = res.data
  }
}
</script>

<style lang="scss" scoped>
.message {
  background-color: #fff;
  border-radius: 5px;
  h2 {
    padding: 5px;
  }
}
</style>