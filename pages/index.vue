<template>
  <div class="main">
    <el-row :gutter="24">
      <el-col :span="24" v-if="blogList">
        <div
          v-for="(item, index) in blogList"
          :key="item.id"
          class="article_content wow bounceInUp"
          :class="{ article_loaded: isImgLoad }"
          ref="con"
        >
          <div class="artilcl">
            <nuxt-link :to="'/article/' + item.id" tag="div" class="article_img" :class="{ artilcl_loaded: isImgLoad }">
              <img v-lazy="item.img" class="image" @load="imgLoad" />
            </nuxt-link>
          </div>

          <div class="description">
            <nuxt-link :to="'/article/' + item.id" tag="h2" class="overtext">
              <span class="isTop" v-if="item.stay_at_top">置顶</span>
              <span>{{ item.title }}</span>
            </nuxt-link>
            <div class="article_b">
              <div class="overtext article-content">{{ item.content }}</div>
              <div class="bottom clearfix">
                <p class="author">
                  <i class="el-icon-s-custom"></i>
                  {{ item.author }}
                </p>
                <span class="createtime">
                  <i class="el-icon-date"></i>
                  {{ formatDate(item.createtime) }}
                </span>
                <span>{{ item.views }}次观看</span>
                <div>
                  <div class="badge" v-for="item1 in item.tags" :key="item1.id">{{ item1.title }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="yema" :class="{ left: center }">
          <el-pagination
            background
            layout=" sizes, prev, pager, next"
            :total="total"
            :page-size="5"
            :pager-count="5"
            :current-page="pageNum"
            :page-sizes="[3, 5, 7]"
            @current-change="currentchange"
            @size-change="handleSizeChange"
            style="text-align: center"
            class="wow fadeInUp"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
  
<script>
import { formatDate } from '../utils/utils'
// import './wow'
// import scrollReveal from 'scrollreveal'
if (process.browser) {
  // 在这里根据环境引入wow.js
  var { WOW } = require('wowjs')
}
export default {
  name: 'list',
  data() {
    return {
      // blogList: []
      center: false,
      anim: false,
      isImgLoad: true,
    }
  },

  created() {
    // console.log(this.$store.state.article)
    let res = this.$store.state.article.list.map(function (top) {
      return top.stay_at_top
    })
    // console.log('res: ', this.$store.state.article)
    // console.log(this.$store.state.article.pageNum)
    this.$store.commit('article/isOpen', false)
    // this._getBlogList();
  },

  mounted() {
    // console.log('mounted')
    if (process.browser) {
      // console.log('搜索')
      //
      // 在页面mounted生命周期里面 根据环境实例化WOW
      new WOW({
        boxClass: 'wow',
        // animateClass: 'animated',
        offset: 0,
        mobile: true,
        live: false,
      }).init()
    }
  },

  // async fetch({ store, params }) {
  //   // if (!process.server) return;

  //   await store.dispatch('article/blogList', {
  //     pageNum: store.state.article.pageNum,
  //     pageSize: 5,
  //   })
  // },
  filters: {
    showDate(value) {
      let createtime = new Date(value * 1000)
      return formatDate(createtime)
    },
  },
  methods: {
    // _getBlogList() {
    //   this.$store.dispatch('article/bloglist')
    // },
    imgLoad() {
      this.isImgLoad = false
    },
    formatDate(time) {
      return formatDate(time)
    },
    handleSizeChange(pageSize) {
      // console.log(pageSize)
      this.$store.commit('article/pageSize', pageSize)
      // console.log(this.$store.state.article.pageSize)
      // console.log('pagesize', pageSize)
      this.$store.dispatch('article/bloglist', {
        pageNum: this.$store.state.article.pageNum,
      })
    },
    currentchange(pageNum) {
      // console.log(pageNum,pageSize);

      // console.log(this.$refs.con[0])
      this.anim = true
      // console.log(this.anim)

      if (
        pageNum >= Math.abs(this.$store.state.article.count / this.$store.state.article.pageSize / 2) &&
        pageNum < this.$store.state.article.count / this.$store.state.article.pageSize
      ) {
        this.center = true
        // console.log('dian吉',this.$store.state.article.count);
      } else {
        this.center = false
      }
      // console.log('dian吉',this.$store.state.article.count / this.$store.state.article.pageSize / 2);
      // this.$store.commit("article/nowpage", pageNum);
      this.$store.dispatch('article/blogList', {
        pageNum,
      })
      scrollTo({ top: 0, behavior: 'instant' })
      // this.$refs.con[pageNum].removeClass('animated')
      setTimeout(() => {}, 2000)
    },
  },
  computed: {
    blogList() {
      return this.$store.state.article.list
    },
    total() {
      return this.$store.state.article.count
    },
    pageNum() {
      return this.$store.state.article.pageNum
    },
    activeUsers: function () {
      return this.$store.state.article.list.map(function (top) {
        return top.stay_at_top
      })
    },
  },
  watch: {
    blogList(val, pageNum) {
      // console.log('wo盖面', val)

      // 在页面mounted生命周期里面 根据环境实例化WOW
      // console.log('this.$refs.con', this)
      this.$nextTick(function () {
        if (process.browser) {
          // console.log('搜索')

          // 在页面mounted生命周期里面 根据环境实例化WOW
          new WOW({
            boxClass: 'wow',
            // animateClass: 'animated',
            offset: 0,
            mobile: true,
            live: false,
          }).init()
        }
      })

      // this.$refs.con.removeAttribute('class', 'animated')
    },
  },
  transition: 'page',
}
</script>

<style lang="scss" scoped>
.description {
  box-sizing: border-box;
  padding-left: 10px;
  padding-bottom: 10px;
  max-width: calc(100% - 196px);
  cursor: pointer;
}
.main::-webkit-scrollbar {
  display: none;
}
.article_content {
  display: flex;
  border-radius: 4px;
  /* border: 1px solid #ebeef5; */
  background-color: #fff;
  overflow: hidden;
  color: #303133;
  transition: 0.3s;
  margin-bottom: 20px;
  height: 100%;
  /* animation: move 5s infinite; */
  /* transform: translate3d(-100%, 0, 0); */
  .article_img {
    width: 100%;
    height: 100%;
  }
}
.artilcl {
  flex: 0 0 30%;
  cursor: pointer;
  height: 100%;
  /* padding-left: 10px; */
}
.artilcl img {
  width: 100%;
  height: 100%;
  padding: 10px;
  vertical-align: middle;
  box-sizing: border-box;
  /* max-height: 300px; */
}
@keyframes move {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
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
  /* display: -webkit-box;
  -webkit-line-clamp: 2; */
  white-space: nowrap;
  /* -webkit-box-orient: vertical; */
}
.yema {
  /* width: 80%; */
  text-align: center;
  padding: 50px 0;
  /* margin: 0 auto; */
}
.left {
  margin-left: -8px;
}
.bottom {
  font-size: 12px;
  .badge {
    display: inline-block;
    min-width: 10px;
    padding: 5px 7px;
    font-size: 12px;
    font-weight: 700;
    line-height: 1;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    background-color: #777;
    border-radius: 10px;
    font-weight: 700;
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
    margin-left: 5px;
    margin-top: 5px;
  }
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
  max-width: 300px;
}
</style>