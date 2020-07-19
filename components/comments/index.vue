<template>
  <div v-if="comments">
    <div class="comment wow fadeIn" ref="comment">
      <el-input
        class
        type="textarea"
        v-model="input"
        :placeholder="placeholder"
        @blur="moveLeave"
        resize:none
        :rows="5"
        ref="input"
      ></el-input>
      <p style="text-align:right;padding:5px 20px 5px 0;">
        <el-button type="primary" size="small" @click="restart">还原</el-button>
      </p>
      <div class="comment-author">
        <div
          v-for="(item,index) in originMes"
          class="author-cls wow"
          :class="[index%2==0? 'bounceInLeft':'bounceInRight']"
          :key="item.id"
        >
          {{item.title}}
          <el-input class="wow jackInTheBox" v-model="item.name" :placeholder="item.placeholder"></el-input>
        </div>
      </div>
      <p style="text-align:right;padding:5px 20px 5px 0;">
        <el-button type="primary" @click="addComment()">提交</el-button>
      </p>
    </div>
    <div class="comments wow fadeIn" v-for="(com,index) in comment">
      <div class="comments-detail">
        <el-avatar :src="com.img" :size="40"></el-avatar>
        <div class="author">
          <span v-if="com.name == '南浮宫魅影'" class="rank">博主</span>
          <span class="author-name">{{com.name}}</span>
          <div class="content">{{com.content}}</div>
          <span class="createtime">
            <i class="el-icon-date"></i>
            {{formatDate(com.createtime)}}
          </span>
          <span class="reply" @click="showinput(com)">回复</span>
          <!-- <transition name="hide">
              <div v-if="isShow === com.id" v-cloak class="father-comment">
                <el-input
                  type="textarea"
                  v-model="children_content"
                  :placeholder="placeholder"
                  @blur="moveLeave"
                  resize:none
                  :rows="3"
                ></el-input>
                <div class="comment-author">
                  <div v-for="item in originMes1" class="author-cls">
                    {{item.title}}
                    <el-input v-model="item.name" :placeholder="item.placeholder"></el-input>
                  </div>
                </div>
                <p style="text-align:right;">
                  <el-button type="primary" @click="add(com)" size="small">提交</el-button>
                </p>
              </div>
          </transition>-->
        </div>
      </div>
      <div class="comments-detail" style="margin-left:80px;" v-for="chl in com.children">
        <el-avatar :src="chl.img"></el-avatar>
        <div class="author">
          <span v-if="chl.name == '南浮宫魅影'" class="rank">博主</span>
          <span class="author-name">
            {{chl.name}}
            <span style="color:#000;font-size:12px;">回复</span>
            {{chl.toname}}
          </span>
          <div class="content">{{chl.content}}</div>
          <span class="createtime">
            <i class="el-icon-date"></i>
            {{formatDate(chl.createtime)}}
          </span>
          <span class="reply" @click="showinput(com,chl)">回复</span>
          <!-- <div class="son-comment" v-if="isShow === chl.id" v-cloak>
              <el-input
                type="textarea"
                v-model="children_content"
                :placeholder="placeholder"
                @blur="moveLeave"
                resize:none
                :rows="3"
              ></el-input>
              <div class="comment-author">
                <div v-for="item in originMes1" class="author-cls">
                  {{item.title}}
                  <el-input v-model="item.name" :placeholder="item.placeholder"></el-input>
                </div>
              </div>
              <p style="text-align:right;margin-top:5px;">
                <el-button type="primary" size="small" @click="add1(chl,com)">提交</el-button>
              </p>
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from '../../utils/utils'
// let scrollTo
if (process.browser) {
  // 在这里根据环境引入wow.js
  var { WOW } = require('wowjs')
  var scrollTo = require('../../utils/scroll.js').scrollTo
}
if (process.client) {
}
export default {
  data() {
    return {
      comment: [],
      count: 0,
      toname: '',
      parent_id: -1,
      input: null,
      placeholder: '来发条评论吧!',
      originMes: [
        { title: '昵称*', name: '', placeholder: '留下您的名称' },
        { title: '联系方式', name: '', placeholder: '输入QQ可快速获得头像噢' },
        { title: '友链', name: '', placeholder: '先不要填写' }
      ]
    }
  },
  props: {
    comments: {
      type: Array,
      default: []
    }
  },
  created() {
    console.log('this.comments', scrollTo)
    this.comment = this.comments
    // console.log(this.$route.params.id)
  },
  mounted() {
    new WOW({
      boxClass: 'wow',
      // animateClass: 'animated',
      offset: 0,
      mobile: true,
      live: false
    }).init()
  },
  methods: {
    formatDate(time) {
      return formatDate(time)
    },
    showinput(com, chl) {
      // this.isShow = index

      console.log(this.toname)
      if (chl) {
        this.toname = chl.name
        this.placeholder = `@${this.toname}:${chl.content}`
        console.log('子回复')
      } else {
        this.toname = com.name
        this.placeholder = `@${this.toname}:${com.content}`
      }

      this.parent_id = com.id
      console.log('this.toname: ', this.toname, this.parent_id)
      var body = document.body
      console.log(document.documentElement)
      scrollTo(body, document.documentElement, this.$refs.comment.offsetTop - 50, 800, this.$refs.input.focus)
    },
    moveLeave() {
      console.log(!this.toname)
      if (!this.input) {
        this.placeholder = '竟然什么都不说,555'
        if (this.toname) {
          this.placeholder = `竟然什么都不说,555;@${this.toname}`
        }
      }
    },
    async addComment(comments) {
      // console.log(this.originMes[0].name)
      var user = await this.$axios.$get('api/user/userinfo')
      // console.log(
      //   '!this.input: ',
      //   user,
      //   (this.originMes[0].name = '南浮宫魅影') && this.$store.state.user.name !== 'zhangsan'
      // )

      if (this.input != null) {
        if ((this.originMes[0].name = '南浮宫魅影') && user.errno === -1) {
          this.$message({
            message: '不可以使用博主的昵称哦~',
            type: 'warning'
          })
          return
        }
        if (this.$route.params.id) {
          var article_id = this.$route.params.id
        } else {
          var article_id = -1
        }

        var content = this.input
        var name = this.originMes[0].name
        var img = this.originMes[1].name
        var toname = this.toname
        var parent_id = this.parent_id
        console.log('parent_id: ', parent_id, toname)

        var res = await this.$axios.$post('/api/comment/new', {
          content,
          name,
          article_id,
          img,
          toname,
          parent_id
        })
        // console.log('res: ', res)
        if (!res.errno) {
          this.$axios.$get(`api/comment/detail?id=${article_id}`).then(res => {
            this.comment = res
            this.input = null
            this.originMes[0].name = ''
            this.originMes[1].name = ''
            this.$message({
              message: "发表成功(〃'▽'〃)",
              type: 'success'
            })
            // console.log(this.comments)
          })
        }
      } else {
        console.log('jinru')
        this.$message({
          message: '您还没输入内容呢~',
          type: 'warning'
        })
      }
    },
    restart() {
      this.parent_id = ''
      this.toname = ''
      this.placeholder = '来说点什么吧!'
    }
  }
}
</script>

<style lang='scss' scoped>
.rank {
  // margin-left: -36px;
  // margin-right: 15px;
  padding: 1.5px 4px;
  border-radius: 2px;
  background: #00a4ff;
  color: #fff;
  content: '作者';
  font-size: 11px;
  top: -1px;
  position: relative;
}
.comment {
  margin-top: 10px;
  background-color: #fff;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  .el-textarea {
    // margin: 5px;
    padding: 20px;
    box-sizing: border-box;

    ::v-deep .el-textarea__inner {
      resize: none;
      // max-width: 97%;
      ::v-deep placeholder {
        color: red;
      }
    }
  }
  .comment-author {
    display: flex;

    box-sizing: border-box;
    justify-content: space-between;
    .author-cls {
      box-sizing: border-box;
      padding: 20px;
      // margin: 5px;
      width: 33%;
      .el-input {
        /deep/ input::-webkit-input-placeholder {
          color: #c0c4cc;
        }
        /deep/ input::-moz-input-placeholder {
          color: #c0c4cc;
        }
        /deep/ input::-ms-input-placeholder {
          color: #c0c4cc;
        }
      }
    }
  }
}
.content {
  padding: 5px 0;
  font-size: 12px;
}
.comments {
  margin-top: 5px;
  border-radius: 5px;
  border-bottom: 1px dashed #f5f5f5;
  background-color: #fff;
  .comments-detail {
    display: flex;
    background-color: #fff;
    margin-top: 5px;
    border-bottom: 1px dashed #f5f5f5;
    .el-avatar {
      margin: 8px;
      min-width: 40px;
    }
    .author {
      width: 100%;
      padding: 5px;

      .author-name {
        color: pink;
      }

      .createtime {
        color: #b3b3b3;
        font-size: 12px;
      }
      .reply {
        float: right;
        cursor: pointer;
        padding: 0.2em 0.6em 0.3em;
        font-size: 75%;
        font-weight: 700;
        line-height: 1;
        color: #fff;
        text-align: center;
        white-space: nowrap;
        vertical-align: baseline;
        border-radius: 0.25em;
        font-weight: 700;
        text-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
        color: #dcf2f8;
        background-color: #23b7e5;
      }
      .father-comment {
        transform: translate3d(-3.4%, 0, 0);
        width: 100%;
      }
      .son-comment {
        transform: translate3d(-5%, 0, 0);
        width: 100%;
        box-sizing: border-box;
      }
      .comment-author {
        display: flex;
        box-sizing: border-box;
        justify-content: space-between;
        .author-cls {
          margin-top: 5px;
        }
      }
    }
  }
}
</style>