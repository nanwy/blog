<template>
  <div id="bg-canvas">
    <!-- <canvas id="demo-canvas" v-show="isShow"></canvas> -->
    <el-container class="container1" :class="{'container':isOpen}">
      <div class="content" style="width:100%;">
        <nheader @show="show"></nheader>
        <el-container>
          <!-- 侧边布局 -->
          <vaside />
          <!-- 主布局 -->

          <transition name="el-zoom-in-center">
            <el-main class="bg-light main1">
              <!-- 面包屑导航 -->
              <div
                class="border-bottom mb-3 bg-white"
                v-if="bran.length > 0"
                style="padding: 20px;margin: -20px;"
              >
                <el-breadcrumb separator-class="el-icon-arrow-right">
                  <el-breadcrumb-item
                    v-for="(item,index) in bran"
                    :key="index"
                    :to="{ path: item.path }"
                  >{{item.title}}</el-breadcrumb-item>
                </el-breadcrumb>
              </div>
              <!-- 主内容 -->
              <vmain keep-alive />
              <!-- <div style="height:1000px;"></div> -->
              <backtop />
            </el-main>
          </transition>
          <vasider />
        </el-container>
      </div>
    </el-container>
    <vfooter />
  </div>
</template>

<script>
import nheader from './header'
import vaside from './aside'
import vasider from './asider'
import vmain from './main'
import vfooter from './footer'
// if (process.browser) {
//   require('../plugins/TweenLite.min')
//   require('../plugins/EasePack.min')
//   require('../plugins/demo-1')
// }
// import { initHeader, initAnimation, addListeners } from '../plugins/demo-1'

import backtop from './backtop'
import { color } from '../plugins/color'
export default {
  data() {
    return {
      navBar: [],
      bran: [],
      isShow: true,
      dialogVisible: false,
      second: 3,
      timer: null,
      // currentSong: '',
      currentUrl: '',
    }
  },
  components: {
    nheader,
    vmain,
    vaside,
    backtop,
    vasider,
    vfooter,
  },
  mounted() {
    // this.show()
    // if (!window.matchMedia('(min-width: 400px)').matches) {
    //   this.$message({
    //     message: '当前为移动端,为确保流畅数秒后将关闭canvas动画',
    //     type: 'warning'
    //   })
    //   this.timer = setInterval(() => {
    //     // this.show()
    //     this.second--
    //     // console.log('this.second < 0: ', this.second < 0)
    //     if (this.second === 0) {
    //       clearInterval(this.timer)
    //       this.show()
    //       // this.second--
    //       this.dialogVisible = false
    //       // i.animateHeader = false
    //       // console.log('i', i)
    //     }
    //     // this.dialogVisible = false
    //   }, 1000)

    //   console.log('当前为移动端')
    // }
    // console.log('canvas', initHeader, initAnimation, addListeners)
    // if (process.browser) {
    //   initHeader()
    //   initAnimation()
    //   addListeners()
    // }
    // console.log(
    //   'songs: ',
    //   this.$store.state.music.playList,
    //   this.$store.state.music.playList.songs[this.$store.state.music.currentIndex]
    // )

    color(window)
  },
  comments: {},
  methods: {
    cancelClick() {
      this.dialogVisible = false
      clearInterval(this.timer)
    },
    show() {
      this.isShow = !this.isShow
      // console.log('点击', this.isShow)
    },
    async getSong() {
      var id = this.$store.state.music.playList.songs[this.$store.state.music.currentIndex].id
      // console.log('id: ', id)
      await this.$store.dispatch('music/startSong', { id })
      // console.log('this.$store.state.music.currentSong', this.$store.state.music.currentSong.data[0].url)
    },
  },
  computed: {
    isOpen() {
      return this.$store.state.article.isOpen
    },
  },
}
</script>

<style scoped>
#bg-canvas {
  position: relative;
  background-image: url('http://img.nanwayan.cn/shawu.png');
  background-size: cover;
  background-attachment: fixed;
  background-position: 50% 20%;
}

#demo-canvas {
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 0;
  opacity: 0.6;
}
.geren-enter-active,
.geren-leave-active {
  transition: transform linear 0.1s;
}
.geren-enter,
.geren-leave-to {
  transform: translateX(-300px);
}
.tips {
  position: absolute;
  top: -67px;
  right: -121px;
  transform: scale(0.5, 0.5);
}
.container1 {
  margin: 0 auto;
  width: 1200px;
  /* box-shadow: 0 0 30px rgba(255, 112, 173, 0.35); */
  position: relative;

  /* background: #f1f3f4; */
}
.el-container {
  display: flex;
  justify-content: space-between;
}
.el-main {
  padding: 10px;
  /* margin-left: 225px; */
  /* overflow: visible; */
  /* /* background-color: #f1f3f4; */
  /* background-color: #fff; */
  transition: all 0.5s ease;
}
.el-main::-webkit-scrollbar {
  display: none;
}
</style>
