<template>
  <div class="nav">
    <div class="menu" @click="showMenu">
      <i class="el-icon-s-operation"></i>
    </div>

    <nuxt-link to="/" class="link-home">
      <div class="blog-name">南浮宫魅影</div>
      <span style="color: #fff;font-size:12px;margin-top:10px;">沉默不语,但仍奋力前行</span>
    </nuxt-link>

    <span id="pause" @click="dialogVisible = true">登录</span>
    <div class="dialog">
      <el-dialog title="登录" :modal-append-to-body="false" :visible.sync="dialogVisible" width="30%">
        账号：
        <el-input placeholder="请输入账号" v-model="uname"></el-input>密码：
        <el-input placeholder="请输入密码" v-model="upwd" show-password></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="success" @click="login">确定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: null,
      isOpen: false,
      isShow: true,
      uname: '',
      upwd: '',
      dialogVisible: false,
    }
  },
  created() {
    setInterval(this.nowTime, 1000)
  },

  methods: {
    show() {
      this.$emit('show')
    },
    showMenu() {
      this.isOpen = !this.$store.state.article.isOpen
      // console.log(this.isOpen)
      // console.log(
      //   'this.$store.state.music.playList[this.$store.state.music.currentIndex]',
      //   this.$store.state.music.playList[this.$store.state.music.currentIndex]
      // )
      // scrollTo({ top: 120, behavior: 'smooth' })
      this.$store.commit('article/isOpen', this.isOpen)
      // console.log(this.isOpen);
      var b = document.querySelectorAll('body')[0]
    },
    async login() {
      if (this.uname == '' || this.upwd == '') {
        this.$message({
          message: "发表成功(〃'▽'〃)",
          type: 'success',
        })
      } else {
        await this.$store.dispatch('user/login', {
          username: this.uname,
          password: this.upwd,
        })
      }
    },
    // handleScroll() {
    //   //改变元素#searchBar的top值
    //   var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    //   console.log(document.querySelector('#left-nav').offsetTop)

    //   var offsetTop = document.querySelector('#left-nav').offsetTop

    //   if (scrollTop <= 0) {
    //     offsetTop = 0 + Number(scrollTop)
    //     document.querySelector('#left-nav').style.top = offsetTop + 'px'
    //   }
    // },

    nowTime() {
      var date = new Date()

      var year = date.getFullYear()
      var month = date.getMonth()
      var day = date.getDate()

      var hour = date.getHours()
      var minute = date.getMinutes()
      var second = date.getSeconds()

      //这样写显示时间在1~9会挤占空间；所以要在1~9的数字前补零;
      if (hour < 10) {
        hour = '0' + hour
      }
      if (minute < 10) {
        minute = '0' + minute
      }
      if (second < 10) {
        second = '0' + second
      }

      var x = date.getDay() //获取星期
      this.time = year + '/' + month + '/' + day + '/' + hour + ':' + minute + ':' + second
    },
  },
}
</script>

<style lang="scss" scoped>
.nav {
  position: relative;
  padding: 0 20px;
  display: flex;
  align-items: center;
  background-image: url('http://img.nanwayan.cn/72722834.jpg');
  background-position: 0 30%;
  height: 500px;
  background-size: cover;
  /* padding: 0 20px; */
  box-sizing: border-box;
  flex-shrink: 0;
  /* opacity: 0.8; */
  transition: all 0.5s ease;
}
.menu {
  width: 35px;
  height: 35px;
  font-size: 25px;
  color: azure;
  display: none;
  cursor: pointer;
  // padding-top: 138px;
}
#pause {
  position: absolute;
  top: 10px;
  right: 5px;
  color: #ffffff;
  font-size: 12px;
  border: 1px solid #a6c1ee;
  border-radius: 10px;
  padding: 2px;
  cursor: pointer;
  opacity: 0;
}
.link-home {
  text-align: center;
  /* flex: 1 0 0; */
  display: block;
  /* line-height: 50%; */
  /* padding-right: 10%; */
  font-size: 60px;
  margin: auto;
  overflow: hidden;
}
.link-home i {
  color: azure;
}
.time {
  flex: 1;
  text-align: center;
  color: #a6c1ee;
}
.blog-name {
  font-weight: 700;
  color: azure;
  position: relative;
  overflow: hidden;
}
/* .blog-name::before {
  content: '';
  position: absolute;
  width: 150px;
  height: 10px;
  background-color: rgba(255, 255, 255, 0.5);
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  -webkit-animation: searchLights 1s ease-in 1s infinite;
  animation: searchLights 1s ease-in 1s infinite;
} */
@keyframes searchLights {
  0% {
    transform: translateX(-100%) rotate(-45deg);
  }
  100% {
    transform: translateX(100%) rotate(-45deg);
  }
}
.search {
  // margin-left: auto;
}

.ban {
  overflow-x: hidden !important;
  overflow-y: hidden !important;
}
</style>