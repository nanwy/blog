<template>
  <transition name="page">
    <div class="main">
      <el-row :gutter="24">
        <el-col :span="24">
          <div v-for="item in blogList" :key="item.id" class="article_content">
            <div class="artilcl">
              <nuxt-link :to="'/article/'+item.id" tag="h2" class="overtext">
                <img :src="item.img" class="image" />
              </nuxt-link>
            </div>

            <div class="jianjie">
              <nuxt-link :to="'/article/'+item.id" tag="h2" class="overtext">
                <span class="isTop" v-if="item.stay_at_top">置顶</span>
                <span>{{item.title}}</span>
              </nuxt-link>
              <div class="article_b">
                <div class="overtext article-content">{{item.content}}</div>
                <div class="bottom clearfix">
                  <p class="author">
                    <i class="el-icon-s-custom"></i>
                    {{item.author}}
                  </p>
                  <span class="createtime">
                    <i class="el-icon-date"></i>
                    {{formatDate(item.createtime)}}
                  </span>
                  <span>{{item.views}}次观看</span>
                </div>
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
              :current-page="pageNum"
              :page-sizes="[3,5,7]"
              @current-change="currentchange"
              @size-change="handleSizeChange"
              style="text-align:center;"
            ></el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
  </transition>
</template>
  
<script>
import { formatDate } from "../utils/utils";
export default {
  name: "list",
  data() {
    return {
      // blogList: []
      center: false
    };
  },
  created() {
    // console.log(this.$store.state.article.list);
    let res = this.$store.state.article.list.map(function(top) {
      return top.stay_at_top;
    });
    console.log(res);

    // this._getBlogList();
  },
  mounted() {
    console.log(
      this.$store.state.article.list.filter(function(top) {
        return top.stay_at_top;
      })
    );
  },
  async asyncData({ store, params }) {
    if (!process.server) return;
    await store.dispatch("article/bloglist", {
      pageNum: 1,
      pageSize: 5
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
    handleSizeChange(pageSize) {
      console.log(pageSize);
      this.$store.commit("article/pageSize", pageSize);
      console.log(this.$store.state.article.pageSize);
      this.$store.dispatch("article/bloglist", {
        pageNum: this.$store.state.article.pageNum
      });
    },
    currentchange(pageNum) {
      // console.log(pageNum,pageSize);
      if (
        pageNum >=
          Math.abs(
            this.$store.state.article.count /
              this.$store.state.article.pageSize /
              2 -
              1
          ) &&
        pageNum <
          this.$store.state.article.count / this.$store.state.article.pageSize -
            2
      ) {
        this.center = true;
        // console.log('dian吉',this.$store.state.article.count);
      } else {
        this.center = false;
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
    pageNum() {
      return this.$store.state.article.pageNum;
    },
    activeUsers: function() {
      return this.$store.state.article.list.map(function(top) {
        return top.stay_at_top;
      });
    }
  },
  transition: "page"
};
</script>

<style scoped>
.jianjie {
  box-sizing: border-box;
  padding: 10px;
  max-width: 100%;
}
.article_content {
  display: flex;
  border-radius: 4px;
  /* border: 1px solid #ebeef5; */
  background-color: #f7f8f8;
  overflow: hidden;
  color: #303133;
  transition: 0.3s;
  margin-bottom: 20px;
}
.artilcl {
  flex: 0 030%;
}
.artilcl img {
  width: 100%;
  height: 100%;
  min-height: 200px;
}
.author {
  color: darkblue;
}
.article-content {
  color: #8c8585;
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
.left {
  margin-left: -18px;
}
.bottom {
  font-size: 12px;
}
.isTop {
  padding: 2px;
  font-size: 12px;
  border-radius: 12px;
  background-color: #57c6e1;
}
.article_b {
  border-left: 1px solid #000;
  padding-left: 10px;
}
</style>