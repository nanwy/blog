<template>
  <div class="detail_content" v-if="res">
    <div class="article-content">
      <div class="title">
        <h1 class="wow swing">{{res.title}}</h1>
        <div class="bottom clearfix wow bounces">
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
      <!-- <img v-lazy="res.img" alt /> -->
      <div class="post-content wow bounceInRight">
        <article v-html="res.content_html" class="post_detail markdown-body" />
        <p style="text-align:right;font-size:12px;color:#666;">最后更新于{{formatDate(res.updatetime)}}</p>
      </div>
    </div>

    <comment :comments="comments" />
  </div>
</template>

<script>
// import api from "@/api/article.js";
import { formatDate } from '../../utils/utils'
// import markdown from '../../components/markdown'
import comment from '../../components/comments'
import '@/../assets/css/markdown.scss'
import '@/../assets/css/hljs.scss'
import hljs from 'highlight.js'
if (process.browser) {
  // 在这里根据环境引入wow.js
  var { WOW } = require('wowjs')
}
export default {
  data() {
    return {
      blog: [],
      input: '',
      placeholder: '来发条评论吧!',
      originMes: [
        { title: '昵称*', name: '', placeholder: '留下您的名称' },
        { title: '联系方式', name: '', placeholder: '输入QQ可快速获得头像噢' },
        { title: '友链', name: '', placeholder: '先不要填写' },
      ],
      originMes1: [
        { title: '昵称*', name: '', placeholder: '留下您的名称' },
        { title: '联系方式', name: '', placeholder: '输入QQ可快速获得头像噢' },
        { title: '友链', name: '', placeholder: '先不要填写' },
      ],
      comments: [],

      isShow: -1,
      children_content: '',
      class: ['jackInTheBox'],
      toname: '',
      parent_id: -1,
    }
  },
  components: {
    // markdown,
    comment,
  },
  mounted() {
    new WOW({
      boxClass: 'wow',
      // animateClass: 'animated',
      offset: 0,
      mobile: true,
      live: false,
    }).init()
    hljs.initHighlighting()
  },
  async asyncData({ $axios, store, params }) {
    var id = params.id
    // console.log(id)

    await store.dispatch('article/getBlogDetail', { id })
    var res1 = await $axios.$get(`api/comment/detail?id=${id}`)
    // console.log('res: ', res1)
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
    },
  },
  filters: {
    showDate(value) {
      // let createtime = new Date(value * 1000)
      return formatDate(value)
    },
  },
  methods: {
    formatDate(time) {
      return formatDate(time)
    },

    async add1(com, con) {
      var parent_id = con.id
      // console.log(parent_id)
      // console.log('‘子回复')
      var article_id = this.$route.params.id
      var content = this.children_content
      var name = this.originMes1[0].name
      var toname = com.name
      var res = await this.$axios.$post('/api/comment/new', {
        content,
        name,
        article_id,
        parent_id,
        toname,
      })
      // console.log('res: ', res)
      if (!res.errno) {
        this.$axios.$get(`api/comment/detail?id=${article_id}`).then((res) => {
          this.comments = res
          // console.log(comments)
        })
      }
      this.isShow = -1
    },
    add(com) {
      this.toname = com.name

      this.parent_id = com.id
      // console.log('this.toname: ', this.toname, this.parent_id)
      // console.log('‘父回复')
      // var parent_id = com.id
      // console.log(parent_id)
      // var article_id = this.$route.params.id
      // var content = this.children_content
      // var name = this.originMes1[0].name
      // var img = this.originMes1[1].name
      // console.log(img, this.originMes1[1])
      // var toname = com.name
      // this.addComment()
      // var res = await this.$axios.$post('/api/comment/new', {
      //   content,
      //   name,
      //   article_id,
      //   parent_id,
      //   toname,
      //   img
      // })
      // console.log('res: ', res)
      // if (!res.errno) {
      //   this.$axios.$get(`api/comment/detail?id=${article_id}`).then(res => {
      //     this.comments = res
      //     console.log(comments)
      //   })
      // }
      // this.isShow = -1
    },
  },
  transition: 'page',
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
    background-color: #fff;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
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
    // margin-top: 10px;
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
}
blockquote {
  border-left: 3px solid green;
  background-color: #ccc;
  margin-left: 4em;
}
</style>