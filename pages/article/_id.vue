<template>
  <transition name="test">
    <div class="detail_content" v-if="res">
      <div class="title">
        <h1>{{res.title}}</h1>
        <div class="bottom clearfix">
          <span class="author">
            <i class="el-icon-s-custom"></i>
            {{res.author}}
          </span>
          <span class="createtime">
            <i class="el-icon-date"></i>
            {{formatDate(res.createtime)}}
          </span>
          <span>
            <i class="el-icon-view"></i>
            {{res.views}}次观看
          </span>
        </div>
      </div>
      <div class="article-content">
        <img :v-lazy="res.img" alt />
        <div class="post-content">
          <markdown :md="res.content"></markdown>
        </div>
      </div>
      <div class="comment">
        <el-input
          type="textarea"
          v-model="input"
          :placeholder="placeholder"
          @blur="moveLeave"
          resize:none
          :rows="5"
        ></el-input>
        <div class="comment-author">
          <div v-for="item in originMes" class="author-cls">
            {{item.title}}
            <el-input v-model="item.name" placeholder="请输入内容"></el-input>
          </div>
        </div>
        <p style="text-align:right;">
          <el-button type="primary" @click="addComment()">提交</el-button>
        </p>
      </div>
      <h1>{{count}}条评论</h1>
      <div class="comments" v-for="(com,index) in comments">
        <div class="comments-detail">
          <el-avatar :src="com.img"></el-avatar>
          <div class="author">
            <div class="author-name">{{com.name}}</div>
            <div>{{com.content}}</div>
            <span class="createtime">
              <i class="el-icon-date"></i>
              {{formatDate(com.createtime)}}
            </span>
            <span
              style="margin-left:auto;cursor:pointer;background-color:#409eff;border-radius:20px;padding:2px;"
              @click="showinput(com.id)"
            >回复</span>
            <div v-show="isShow === com.id">
              <el-input
                type="textarea"
                v-model="children_content"
                :placeholder="placeholder"
                @blur="moveLeave"
                resize:none
                :rows="3"
              ></el-input>
              <div v-for="item in originMes1" class="author-cls">
                {{item.title}}
                <el-input v-model="item.name" placeholder="请输入内容"></el-input>
              </div>
              <p style="text-align:right;">
                <el-button type="primary" @click="add(com)">提交</el-button>
              </p>
            </div>
          </div>
        </div>
        <div class="comments-detail" style="margin-left:80px;" v-for="chl in com.children">
          <el-avatar :src="chl.img"></el-avatar>
          <div class="author">
            <div class="author-name">
              {{chl.name}}
              <span style="color:#000;">回复</span>
              {{chl.toname}}
            </div>
            <div>{{chl.content}}</div>
            <span class="createtime">
              <i class="el-icon-date"></i>
              {{formatDate(chl.createtime)}}
            </span>
            <span
              style="margin-left:auto;cursor:pointer;background-color:#409eff;border-radius:20px;padding:2px;"
              @click="showinput(chl.id)"
            >回复</span>
            <div v-show="isShow === chl.id">
              <el-input
                type="textarea"
                v-model="children_content"
                :placeholder="placeholder"
                @blur="moveLeave"
                resize:none
                :rows="3"
              ></el-input>
              <div v-for="item in originMes1" class="author-cls">
                {{item.title}}
                <el-input v-model="item.name" placeholder="只填昵称就行"></el-input>
              </div>
              <p style="text-align:right;">
                <el-button type="primary" @click="add1(chl,com)">提交</el-button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
// import api from "@/api/article.js";
import { formatDate } from '../../utils/utils'
import markdown from '../../components/markdown'
export default {
  data() {
    return {
      blog: [],
      input: '',
      placeholder: '来发条评论吧!',
      originMes: [
        { title: '昵称*', name: '' },
        { title: '联系方式', tel: '' },
        { title: '友链', link: '' }
      ],
      originMes1: [
        { title: '昵称*', name: '' },
        { title: '联系方式', tel: '' },
        { title: '友链', link: '' }
      ],
      comments: [],
      count: 0,
      isShow: -1,
      children_content: ''
    }
  },
  components: {
    markdown
  },

  async asyncData({ $axios, store, params }) {
    var id = params.id
    console.log(id)

    await store.dispatch('article/getBlogDetail', { id })
    var res1 = await $axios.$get(`api/comment/detail?id=${id}`)
    console.log('res: ', res1)
    return { comments: res1 }

    // console.log(res)
    // this.blog = res.data
  },
  created() {
    // console.log(this.comments, this.count)
    // this.count = this.comments.length
    // var id = this.$route.params.id;
    // this.getBlogDetail(id)
    // console.log(this.$store.state.article.data)
    // console.log(this.formatDate(this.comments.createtime), this.comments.createtime)
  },
  computed: {
    res() {
      return this.$store.state.article.data[0]
    }
  },
  filters: {
    showDate(value) {
      // let createtime = new Date(value * 1000)
      return formatDate(value)
    }
  },
  methods: {
    formatDate(time) {
      return formatDate(time)
    },
    moveLeave() {
      // console.log('移除', e)
      if (!this.input) {
        this.placeholder = '竟然什么都不说,555'
      }
    },
    async add1(com, con) {
      var parent_id = con.id
      // console.log(parent_id)
      console.log('‘子回复')
      var article_id = this.$route.params.id
      var content = this.children_content
      var name = this.originMes1[0].name
      var toname = com.name
      var res = await this.$axios.$post('/api/comment/new', {
        content,
        name,
        article_id,
        parent_id,
        toname
      })
      console.log('res: ', res)
    },
    async add(com) {
      console.log('‘父回复')
      var parent_id = com.id
      console.log(parent_id)
      var article_id = this.$route.params.id
      var content = this.children_content
      var name = this.originMes1[0].name
      var toname = com.name
      var res = await this.$axios.$post('/api/comment/new', {
        content,
        name,
        article_id,
        parent_id,
        toname
      })
      console.log('res: ', res)
    },
    showinput(index) {
      this.isShow = index
      // console.log(this.isShow)
    },
    async addComment() {
      // console.log(this.originMes[0].name)
      var article_id = this.$route.params.id
      var content = this.input
      var name = this.originMes[0].name
      var res = await this.$axios.$post('/api/comment/new', {
        content,
        name,
        article_id
      })
      // console.log('res: ', res)
      if (!res.errno) {
        this.$axios.$get(`api/comment/detail?id=${article_id}`).then(res => {
          this.comments = res
          console.log(comments)
        })
      }
    }
  },
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
  // padding: 40px;
  .title {
    text-align: center;
    padding: 10px;
    background-color: rgb(247, 248, 248);
    font-size: 26px;
    h1 {
      margin: 0;
    }
    .clearfix {
      font-size: 13px;
    }
    img {
      height: 80%;
      width: 100%;
    }
  }
  .article-content {
    margin: 10px;
    img {
      display: block;
      width: 100%;
      max-height: 460px;
      background-position: 50% 50%;
      background-size: cover;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }
    .post-content {
      background-color: #fff;
      padding: 10px;
    }
  }
  .comment {
    margin: 10px;
    .comment-author {
      display: flex;
      justify-content: space-between;
      .author-cls {
        margin: 5px;
      }
    }
  }
  .comments {
    margin: 5px;
    border-radius: 5px;
    .comments-detail {
      display: flex;
      background-color: #fff;
      margin-top: 5px;
      .el-avatar {
        margin: 8px;
      }
      .author {
        padding: 5px;
        .author-name {
          color: pink;
        }
      }
    }
  }
}
</style>