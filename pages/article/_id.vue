<template>
  <transition name="test">
    <div>
      <div v-if="res">
        <img :src="res.img" alt />
        <h2>{{res.title}}</h2>
        <markdown :md="res.content"></markdown>
      </div>
    </div>
  </transition>
</template>

<script>
// import api from "@/api/article.js";
import markdown from "../../components/markdown";
export default {
  data() {
    return {
      blog: []
    };
  },
  components: {
    markdown
  },
  created() {
    // console.log(this.$route.params.id);

    // var id = this.$route.params.id;
    // this.getBlogDetail(id)
    console.log(this.$store.state.article.data[0]);
  },
  async asyncData({ store, params }) {
    var id = params.id;
    await store.dispatch("article/getBlogDetail", { id });
    // this.blog = res.data
  },
  computed: {
    res() {
      return this.$store.state.article.data[0];
    }
  },
  methods: {
    async getBlogDetail(id) {
      this.$store.dispatch("article/getBlogDetail", { id });
      // console.log(res);
      // this.blog = res.data
      // console.log(this.blogList);
    }
  },
  transition: "test"
};
</script>

<style scoped>
.test-enter-active,
.test-leave-active {
  transition: all 0.5s;
}
.test-enter,
.test-leave-active {
  transform: translateX(100%, 0);
}
</style>