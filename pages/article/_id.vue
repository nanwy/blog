<template>
  <div>
    <div v-if="res">  
        <h2>{{res.title}}</h2>
        <markdown :md="res.content"></markdown>
    </div>

  </div>
</template>

<script>
// import api from "@/api/article.js";
import markdown from "../../components/markdown";
export default {
data() {
  return {
    blog:[]
  }
},
components:{
  markdown
},
created() {
  // console.log(this.$route.params.id);
  
  // var id = this.$route.params.id;
// this.getBlogDetail(id)
// console.log(this.$store.state.article.data);

},
 async asyncData({ store, params }) {
    var id = params.id;
    await store.dispatch("article/getBlogDetail",{id})
      // this.blog = res.data
  },
computed: {
    res(){
      return this.$store.state.article.data;
    }
  },
methods: {
  async getBlogDetail(id) {
    
      this.$store.dispatch("article/getBlogDetail",{id})
      // console.log(res);
      // this.blog = res.data
      // console.log(this.blogList);
      
    },
},
}
</script>

<style>

</style>