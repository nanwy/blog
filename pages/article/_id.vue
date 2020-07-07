<template>
  <transition name="test">
    <div class="detail_content">
      <div class="title" v-if="res">
        <h1>{{res.title}}</h1>
        <p>{{res.views}}次观看</p>
        <img :src="res.img" alt />

        <markdown :md="res.content"></markdown>
      </div>
    </div>
  </transition>
</template>

<script>
// import api from "@/api/article.js";
import markdown from '../../components/markdown'
export default {
  data() {
    return {
      blog: []
    }
  },
  components: {
    markdown
  },
  created() {
    // console.log(this.$route.params.id);

    // var id = this.$route.params.id;
    // this.getBlogDetail(id)
    console.log(this.$store.state.article.data)
  },
  async asyncData({ store, params }) {
    var id = params.id
    console.log(id)

    await store.dispatch('article/getBlogDetail', { id })
    // this.blog = res.data
  },
  computed: {
    res() {
      return this.$store.state.article.data[0]
    }
  },
  methods: {},
  transition: 'test'
}
</script>

<style scoped lang="scss">
.test-enter-active,
.test-leave-active {
  transition: all 0.5s;
}
.test-enter,
.test-leave-active {
  transform: translateX(100%, 0);
}
.detail_content {
  padding: 40px;
  .title {
    text-align: center;
    img {
      height: 80%;
      width: 100%;
    }
  }
}
</style>