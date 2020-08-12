<template>
  <div class="tag-link">
    <div class="tags">
      <h3>标签云</h3>
      <div
        class="badge"
        v-for="item in tagList"
        :key="item.id"
        @click="toTags(item.id)"
      >{{item.title}}</div>
    </div>
    <div v-for="item in blogList" :key="item.id" class="article_content wow bounceInUp" ref="con">
      <!-- <span>{{item.blog.title}}</span> -->
      <div class="artilcl">
        <nuxt-link :to="'/article/'+item.blog.id" tag="h2">
          <img v-lazy="item.blog.img" class="image" />
        </nuxt-link>
      </div>
      <div class="description">
        <nuxt-link :to="'/article/'+item.blog.id" tag="h2" class="overtext">
          <span class="isTop" v-if="item.blog.stay_at_top">置顶</span>
          <span>{{item.blog.title}}</span>
        </nuxt-link>
        <div class="article_b">
          <!-- <div class="overtext article-content">{{item.blog.content}}</div> -->
          <div class="bottom clearfix">
            <p class="author">
              <i class="el-icon-s-custom"></i>
              {{item.blog.author}}
            </p>
            <span class="createtime">
              <i class="el-icon-date"></i>
              {{formatDate(item.blog.createtime)}}
            </span>
            <span>{{item.blog.views}}次观看</span>
            <div>
              <div class="badge" v-for="item1 in item.blog.tags" :key="item1.id">{{item1.title}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tag from '@/tags'
import { formatDate } from '@/../utils/utils'
export default {
  data() {
    return {
      blogList: [],
    }
  },
  components: {
    Tag,
  },
  methods: {
    formatDate(time) {
      return formatDate(time)
    },
    async toTags(id) {
      // var res = await this.$axios.$get(`api/tag/find?id=${id}&page=1&pageSize=3`)
      // this.blogList = res.data.rows
      this.$router.push({ path: `/tags/${id}` })
    },
  },
  computed: {
    tagList() {
      return this.$store.state.article.tagList.data.rows
    },
  },
  created() {
    // console.log(this.blogList[0].blog.id)
  },
  mounted() {
    // console.log(this.blogList)
  },
  async asyncData({ $axios, store, params }) {
    var id = params.id
    // console.log(id)

    var res = await $axios.$get(`api/tag/find?id=${id}&page=1&pageSize=3`)
    // console.log('res: ', res.data.rows[0].blog)
    return { blogList: res.data.rows }

    // console.log(res)
    // this.blog = res.data
  },
}
</script>

<style lang="scss" scoped>
.tag-link /deep/ .tags {
  margin-top: 0;
}
.tags {
  background-color: #fff;
  border-radius: 10px;
  margin-top: 30px;
  padding: 10px 10px;
  // width: 100%;
  h3 {
    margin-bottom: 10px;
  }
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
    cursor: pointer;
  }
}
.description {
  box-sizing: border-box;
  padding-left: 10px;
  padding-bottom: 10px;
  max-width: calc(100% - 196px);
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
  /* animation: move 5s infinite; */
  /* transform: translate3d(-100%, 0, 0); */
}
.artilcl {
  flex: 0 0 30%;
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