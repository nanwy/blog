<template>
  <div class="message">
    <div class="title">
      <h2>大佬们</h2>
      <!-- <h4>还没有友链哦----------------</h4> -->
      <div class="container">
        <div class="container-content">
          <li v-for="item in friendLinks">
            <a :href="item.link">
              <img :src="item.avatar" alt />
              <div class="detail">
                <h4>{{item.name}}</h4>
                <span>{{item.description}}</span>
              </div>
            </a>
          </li>
        </div>
      </div>
      <h1>留下你们的友链吧!</h1>
      <el-button type="primary" @click="open">点击申请</el-button>
      <div class="dialog">
        <el-dialog
          title="友链"
          :modal-append-to-body="false"
          :visible.sync="dialogVisible"
          width="30%"
          style="text-align:left;"
        >
          网址：
          <el-input placeholder="请输入您的博客链接" v-model="link"></el-input>名字:
          <el-input placeholder="请输入您的博客名字" v-model="name"></el-input>头像链接:
          <el-input placeholder="请输入您的博客头像" v-model="avatar"></el-input>博客介绍:
          <el-input placeholder="请输入您的博客简介" v-model="description"></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="success" @click="login">确定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
    <!-- <comment :comments="comments" /> -->
  </div>
</template>

<script>
import { formatDate } from '@/../utils/utils'

import comment from '@/comments'
export default {
  data() {
    return {
      comments: [],
      link: '',
      name: '',
      avatar: '',
      description: '',
      dialogVisible: false,
      // friendLinks: [],
    }
  },
  components: {
    comment,
  },
  created() {
    this.$store.commit('article/isOpen', false)
    console.log('this.friendLinks : ', this.friendLinks)
  },
  // async asyncData({ $axios }) {
  //   var res1 = await $axios.$get(`api/comment/detail?id=-1`)
  //   // console.log('res: ', res1)
  //   return { comments: res1 }

  //   // console.log(res)
  //   // this.blog = res.data
  // }
  async asyncData({ $axios }) {
    var res = await $axios.$get('/api/link/detail')
    // this.friendLinks = res
  },
  methods: {
    open() {
      scrollTo({ top: 150, behavior: 'smooth' })
      this.dialogVisible = true
    },
    async login() {
      if (this.link != '' && this.name != '' && this.description != '' && this.avatar != '') {
        var name = this.name
        var link = this.link
        var description = this.description
        var avatar = this.avatar
        var res = await this.$axios.$post('/api/link/new', {
          name,
          link,
          description,
          avatar,
        })
        if (!res.errno) {
          this.$message({
            message: "提交成功(〃'▽'〃)",
            type: 'success',
          })
          this.dialogVisible = false
          // console.log(this.comments)
        } else {
          this.$message({
            message: '未知错误o(╥﹏╥)o)',
            type: 'success',
          })
        }
      } else {
        console.log('jinru')
        this.$message({
          message: '您还没输入内容呢~',
          type: 'warning',
        })
      }
    },
  },
  computed: {
    friendLinks() {
      return this.$store.state.link.friendLinks.data
    },
  },
}
</script>

<style lang="scss" scoped>
.message {
  background-color: #fff;
  border-radius: 5px;
  // background-image: url('http://img.nanwayan.cn/72722834.jpg');
  .title {
    text-align: center;
    padding-bottom: 100%;
    h1 {
      margin: 10px 0;
    }
    h2 {
      padding: 5px;
    }
    #link {
      background-color: #409eff;
    }
    .container {
      .container-content {
        display: flex;
        justify-content: center;
        align-content: center;
        flex-flow: wrap;

        li {
          width: 48%;
          height: 80px;
          margin: 5px;
          box-sizing: border-box;
          padding: 0 10px;
          border: 1px dashed #eee;
          a {
            display: flex;
            text-align: center;
            img {
              width: 70px;
              height: 70px;
              border-radius: 50%;
            }
            .detail {
              line-height: 30px;
              flex: 1 1 0%;
              span {
                font-size: 12px;
                color: #999;
                margin-top: 5px;
                border-top: 2px dashed #eee;
                line-height: 24px;
              }
            }
          }
        }
      }
    }
  }
}
</style>