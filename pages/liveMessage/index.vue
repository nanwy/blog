<template>
  <div class="message">
    <div class="title">
      <h2>留言板</h2>
      <h3>这是一个留言板,留下您想说的话吧~ε=(´ο｀*)))</h3>
      <h3>本小站还在开发中,见谅</h3>
    </div>

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
  created() {
    this.$store.commit('article/isOpen', false)
  },
  async asyncData({ $axios }) {
    var res1 = await $axios.$get(`api/comment/detail?id=-1`)
    // console.log('res: ', res1)
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
  // background-image: url('http://img.nanwayan.cn/72722834.jpg');
  .title {
    text-align: center;

    h2 {
      padding: 5px;
    }
  }
}
</style>