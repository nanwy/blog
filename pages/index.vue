<template>
  <div class="main">
    <el-row :gutter="20">
      <el-col :span="24">
        <div v-for="item in blogList" :key="item.id" class="article_content">
          <nuxt-link :to="'/article/'+item.id" tag="h2" class="overtext">
            <img src="../assets/logo.png" class="image" />
          </nuxt-link>
          <div class="jianjie">
            <nuxt-link :to="'/article/'+item.id" tag="h2" class="overtext">
              <span>{{item.title}}</span>
            </nuxt-link>
            <div class="overtext">{{item.content}}</div>
            <div class="bottom clearfix">
              <p>{{item.author}}</p>
              <time class="time">{{formatDate(item.createtime)}}</time>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { formatDate } from "../utils/utils";
export default {
  data() {
    return {
      // blogList: []
    };
  },
  created() {
    // console.log(api);
    // this._getBlogList();
  },
  async asyncData({ store, params }) {
    await store.dispatch("article/bloglist");
  },
  filters: {
    showDate(value) {
      let createtime = new Date(value * 1000);
      return formatDate(createtime);
    }
  },
  methods: {
    _getBlogList() {
      this.$store.dispatch("article/bloglist");
    },
    formatDate(time) {
      return formatDate(time);
    }
  },
  computed: {
    blogList() {
      return this.$store.state.article.list;
    }
  }
};
</script>

<style scoped>
.jianjie {
  box-sizing: border-box;
  padding: 10px;
  max-width: 60%;
}
.article_content {
  display: flex;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  background-color: #ffffff;
  overflow: hidden;
  color: #303133;
  transition: 0.3s;
}
.overtext {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>