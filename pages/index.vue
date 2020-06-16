<template>
  <div class="main">
    <el-row :gutter="24">
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
        <div class="yema" :class="{'left':center}">
      <el-pagination
        background
        layout=" sizes, prev, pager, next"
        :total="total"
        :page-size="5"
        :pager-count="5"
        :current-page='pageNum'
        :page-sizes="[3,5,7]"
        @current-change="currentchange"
        @size-change="handleSizeChange"
        style="text-align:center;"
      ></el-pagination>
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
      center:false
    };
  },
  created() {
    console.log(this.$store.state.article.count);
    // this._getBlogList();
  },
  async asyncData({ store, params }) {
    await store.dispatch("article/bloglist", {
      pageNum: 1,
      pageSize:5
    });
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
    },
    handleSizeChange(pageSize){
      console.log(pageSize);
       this.$store.commit("article/pageSize", pageSize);
       console.log(this.$store.state.article.pageSize);
       this.$store.dispatch("article/bloglist", {
        pageNum:this.$store.state.article.pageNum
      });
    },
    currentchange(pageNum) {
      // console.log(pageNum,pageSize);
      if(pageNum >= this.$store.state.article.count / this.$store.state.article.pageSize / 2 && pageNum < this.$store.state.article.count / this.$store.state.article.pageSize -2){
        this.center = true
        // console.log('dian吉',this.$store.state.article.count);
        
      }else{
        this.center = false
      }
      // console.log('dian吉',this.$store.state.article.count / this.$store.state.article.pageSize / 2);
      // this.$store.commit("article/nowpage", pageNum);
      this.$store.dispatch("article/bloglist", {
        pageNum
      });
    }
  },
  computed: {
    blogList() {
      return this.$store.state.article.list;
    },
    total() {
      return this.$store.state.article.count;
    },
    pageNum(){
      return this.$store.state.article.pageNum;
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
.yema {
  /* width: 80%; */
  text-align: center;
  padding: 50px 0;
  /* margin: 0 auto; */
}
.left{
  margin-left: -15px;
}
</style>