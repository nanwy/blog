<template>
  <div class="rbloger" :class="{'isOpen':isShow}">
    <el-aside class="blog-aside">
      <el-col :span="24">
        <div class="bottom-bar">
          <div
            class="front-cover"
            :style="{backgroundImage:'url(' + currentSong.al.picUrl + ')'}"
            @click="showClick"
          ></div>
          <div class="item-info">
            <div class="name">{{currentSong.name}}</div>

            <div class="is-lyric-wrapper">
              <span class="mini-lyric">{{}}</span>
            </div>
            <span class="songer">{{currentSong.name}}</span>
          </div>
          <!-- <el-button type="primary" @click="togglePlaying">播放</el-button> -->
          <div class="control">
            <i class="iconfont iconshangyishou2" @click="prevSong"></i>
            <round-circle :radius="32" :percent="percent">
              <i
                @click.stop="togglePlaying"
                :class="playIcon"
                class="play iconfont control-iconfont"
              ></i>
            </round-circle>
            <i class="iconfont iconxiayishou" @click="nextSong"></i>
            <i class="iconcaidan iconfont control-iconfont" @click="showMenu"></i>
          </div>
        </div>
        <div class="song-bank" :class="{'ismeun':isMeun}">
          <div class="list-item" v-for="(item,index) in songs" @click="select(index)">
            <span class="num">{{index+1}}</span>
            <div class="song-detail">
              <div class="song-name">{{item.name}}</div>
              <div class="creator">
                <!-- <span v-if="maxbr" class="maxbr">SQ</span> -->
                {{item.ar[0].name}}-{{item.al.name}}
              </div>
            </div>
            <div class="more">
              <i class="iconcaidan1 iconfont"></i>
            </div>
          </div>
        </div>
      </el-col>
    </el-aside>
    <div class="hide-aside"></div>
    <audio :src="currentUrl" ref="audio" @timeupdate="updateTime" @ended="end"></audio>
  </div>
</template>

<script>
import RoundCircle from '@/music/progress-circle'
export default {
  data() {
    return {
      currentUrl: '',
      currentSongDt: 0,
      currentTime: 0,
      isShow: false,
      playList: [],
      isMeun: true
      // playing: false
    }
  },
  components: {
    RoundCircle
  },
  created() {
    this.getSong()
    // console.log(this.songs)
    this.playList = this.$store.state.music.playList.songs
  },
  watch: {
    playing(val) {
      // console.log(this.percent);

      this.$nextTick(() => {
        const audio = this.$refs.audio
        val ? audio.play() : audio.pause()
        console.log(this.$refs.audio)
      })
    }
  },
  methods: {
    slide() {
      // console.log('dianji')
      // document.body.removeAttribute('class', 'ban')
      this.$store.commit('article/isOpen', false)
    },
    showMenu() {
      this.isMeun = !this.isMeun
    },
    showClick() {
      this.isShow = !this.isShow
    },
    async select(index) {
      console.log(index)
      await this.$store.dispatch('music/changeIndex', { index })
      var id = this.$store.state.music.playList.songs[this.$store.state.music.currentIndex].id
      await this.$store.dispatch('music/startSong', { id })
      console.log('this.$store.state.music.currentSong', this.$store.state.music.currentIndex)

      this.currentUrl = this.$store.state.music.currentSong.data[0].url
      console.log(
        'this.$store.state.music.currentSong',
        this.$store.state.music.currentSong.data[0].url,
        this.currentUrl
      )
      this.currentSongDt = this.$store.state.music.playList.songs[this.$store.state.music.currentIndex].dt
      setTimeout(() => {
        this.toPlay()
      }, 500)
    },
    async getSong() {
      var id = this.$store.state.music.playList.songs[this.$store.state.music.currentIndex].id
      var index = 0
      console.log('id: ', id)
      await this.$store.dispatch('music/startSong', { id })

      this.currentUrl = this.$store.state.music.currentSong.data[0].url
      this.currentSongDt = this.$store.state.music.playList.songs[this.$store.state.music.currentIndex].dt
      var that = this
      // setTimeout(() => {
      // that.togglePlaying()
      // }, 1000)
    },
    toPlay() {
      console.log(this.$refs.audio)
      this.$refs.audio.play()
    },
    togglePlaying() {
      console.log('暂停')
      this.$store.commit('music/SET_PLAY_STATE', !this.playing)
      console.log(this.playing)
    },
    updateTime(e) {
      this.currentTime = e.target.currentTime
      // ,
      // console.log(e.target.currentTime)
    },
    //上一首
    prevSong() {
      // this.$refs.scroll.scrollTo(0, 0, 0)
      // this.currentLyric.seek(0)
      // if (!this.songReady) {
      //   return
      // }
      let prev = this.$store.state.music.currentIndex - 1
      if (prev === -1) {
        prev = this.songs.length - 1
        // console.log(this.playList.length);
      }
      if (!this.playing) {
        this.setTogglePlaying(!this.playing)
      }
      this.select(prev)
      // this.songReady = false
    },
    end() {
      // if (this.mode === playMode.loop) {
      //   this.loop()
      // } else {
      this.nextSong()
      // }
    },
    loop() {
      // this.$refs.scroll.scrollTo(0, 0, 0)
      this.$refs.audio.currentTime = 0
      this.$refs.audio.play()
      // this.currentLyric.seek(0)
    },
    nextSong() {
      // this.$refs.scroll.scrollTo(0, 0, 0)
      // this.currentLyric.seek(0)

      // if (!this.songReady) {
      //   return
      // }
      if (this.songs.length === 1) {
        this.loop()
        return
      } else {
        let index = this.$store.state.music.currentIndex + 1
        if (index === this.songs.length) {
          index = 0
        }
        this.select(index)
        if (!this.playing) {
          this.togglePlaying()
        }
      }
      // this.songReady = false
    }
  },
  computed: {
    isOpen() {
      return this.$store.state.article.isOpen
    },
    songs() {
      return this.$store.state.music.playList.songs
    },
    currentSong() {
      return this.$store.state.music.playList.songs[this.$store.state.music.currentIndex]
    },
    playing() {
      return this.$store.state.music.playing
    },
    percent() {
      return (this.currentTime / this.currentSongDt) * 1000
    },
    playIcon() {
      return this.playing ? 'iconzantingtingzhi' : 'iconbofang1 border-round'
    }
  }
}
</script>

<style lang="scss" scoped>
.hide-aside {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  // height: 100vh;
  z-index: 15;
  display: none;
}
.box-card {
  /* align-items: center; */
  padding-top: 20px;
  background: #e2ebf0;
}
.to {
  background-color: red;
  width: 100px;
  height: 500px;
  display: block;
}
.rbloger {
  background-color: #fff;
  /* width: 225px; */
  /* position: fixed; */

  /* top: 200px; */
  /* right: 0; */
  /* left: 0; */
  // bottom: 0;
  margin-top: 10px;
  height: 600px;
  transition: all 0.5s ease;
  .song-bank {
    background-color: #f4f4f4;
    transition: all 0.5s linear;
    z-index: 9999;
    // position: fixed;

    box-shadow: 0 0 4px #a8a8a8;
    height: 300px;
    overflow: hidden;
    // top: 0;

    // bottom: 0;

    // position: fixed;
    position: relative;
    background-color: #fff;
    margin-top: -1px;
    z-index: 5;
    // height: 30px;
    padding: 10px 5px 10px 5px;
    overflow-y: scroll;

    overflow-x: hidden;
    .music-content {
      position: relative;
      background-color: #fff;
      margin-top: -1px;
      z-index: 5;
      height: 30px;
      padding: 10px 5px 10px 5px;
    }

    .list-item {
      display: flex;
      width: 100%;
      height: 30px;
      padding: 10px 5px 10px 5px;
      justify-content: space-between;

      .num {
        line-height: 27px;
        color: #9a9191;
      }
      .song-detail {
        width: 300px;
        margin-left: 10px;
        .song-name {
          width: 290px;
          text-overflow: ellipsis;
          font-weight: 100;
          overflow: hidden;
          -webkit-box-orient: vertical;
          white-space: nowrap;
        }
        .creator {
          width: 290px;
          text-overflow: ellipsis;

          overflow: hidden;
          -webkit-box-orient: vertical;
          white-space: nowrap;
          color: #9a9191;
          font-size: 12px;
          // padding: 5px 0;
        }
      }
    }

    .maxbr {
      border: 1px solid red;
      width: 18px;
      height: 13px;
      transform: scale(0.8, 0.8);
      display: inline-block;
      color: red;
      font-weight: 100;
    }
  }
}
.blog-aside {
  /* width: 225px !important; */
  overflow-x: hidden;
  position: relative;
  left: 0px;
  top: 0;
  z-index: 21;
  box-sizing: border-box;
}
.bloger-img {
  width: 80%;
  height: 0;
  padding-top: 80%;
  position: relative;
  border-radius: 50%;
  overflow: hidden;
}
.bloger-img img {
  width: 100%;
  height: 130%;
  position: absolute;
  top: 0;
  left: 0;
}
.blog-message {
  text-align: center;
}
.el-aside /deep/ .el-card {
  border: none;
}
.el-aside /deep/ .el-card.is-hover-shadow:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.bloger /deep/ .el-aside {
  // overflow: visible;
}
.bloger /deep/ .el-card__body {
  width: 100%;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding-top: 20px; */
  padding: 0;
}
.bottom-bar {
  padding: 10px;
  box-sizing: border-box;
  // position: fixed;
  // left: 0;
  // right: 0;
  // bottom: 0;
  z-index: 10;

  width: 100%;
  // height: 500px;
  background-color: #fff;
  display: flex;
  align-items: center;

  .item-info {
    margin-left: 5px;
    flex: 0 0 30%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    .songer::after {
      content: '/';
    }
    .songer:last-child::after {
      content: '';
    }
    .mini-lyric {
      font-size: 12px;
      font-family: KaiTi;
    }
  }
  .front-cover {
    width: 80px;
    height: 80px;
    // position: absolute;
    // border-radius: 50%;
    background-color: #000;
    // vertical-align: middle;
    background-size: cover;
    // animation: rotate5 24s linear infinite;
  }
  .control {
    /* width: 50px; */
    /* margin-left: auto; */
    // padding-right: 10px;
    display: flex;
    // justify-items: center;
    justify-content: space-between;
    align-items: center;
    position: relative;
    flex: 0 0 40%;
    width: 30px;
    /* padding: 0 10px; */
    .play {
      /* border: 1px solid #000; */
      /* border-radius: 50%; */
      /* height: 20px; */
      /* width: 20px; */
      position: absolute;
      top: 7px;
      left: 8px;
      z-index: 1;
      // display: flex;
      // justify-content: center;
      // align-items: center;
      // transform: translate(-50%, -50%);
      /* padding: 4px 4px 4px 8px; */
      font-size: 16px !important;
      // padding: 10px !important;
    }
    .border-round {
      left: 10px !important;
    }
  }
  .control-iconfont {
    color: #000 !important;
    border: 0 !important;
  }
}
.iconfont {
  font-family: 'iconfont' !important;
  font-size: 16px;
  font-style: normal;
  color: #000;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  cursor: pointer;
  // margin-left: 5px;
}
</style>