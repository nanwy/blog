<template>
  <div class="rbloger" :class="{'isOpen':isShow,'hidden':isHidden}">
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
            <!-- <span class="songer">{{currentSong.ar[0].name}} -{{ currentSong.al.name}}</span> -->
          </div>
          <!-- <el-button type="primary" @click="togglePlaying">播放</el-button> -->
          <div class="control">
            <i class="iconfont iconshangyishou2" @click="prevSong"></i>
            <round-circle :radius="32" :percent="percent" @click.native="togglePlaying">
              <i :class="playIcon" class="play iconfont control-iconfont"></i>
            </round-circle>
            <i class="iconfont iconxiayishou" @click="nextSong"></i>
            <i class="iconcaidan iconfont control-iconfont" @click="showMenu"></i>
          </div>
          <timer
            :duration="currentSongDt"
            :time="setTime(currentTime)"
            :percent="percent"
            @chengePercent="onChengePercent"
          ></timer>
          <div class="is-lyric-wrapper">
            <span class="mini-lyric">{{miniLyric}}</span>
          </div>

          <p class="time" @click="isLyric = !isLyric">{{changeLyric}}</p>
        </div>
        <div class="song-bank" ref="scroll" :class="{'ismeun':isMeun}">
          <div class="lyric-wrapper" v-show="isLyric">
            <p
              ref="lyricLine"
              class="text"
              :class="{'active':currentLineNum === index}"
              v-for="(line,index) in currentLyric.lines"
              :key="index"
            >{{line.txt}}</p>
          </div>
          <div v-show="!isLyric">
            <div
              class="list-item"
              v-for="(item,index) in songs"
              @click="select(index)"
              :class="{'songs-active':currentIndex === index}"
            >
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
        </div>
      </el-col>
    </el-aside>
    <div class="hide-aside"></div>
    <audio
      :src="currentUrl"
      ref="audio"
      @timeupdate="updateTime"
      @ended="end"
      @play="ready"
      @error="error"
    ></audio>
  </div>
</template>

<script>
import RoundCircle from '@/music/progress-circle'
import Timer from '@/timebar'
import Lyric from '@/../utils/lyric'
if (process.browser) {
  // 在这里根据环境引入wow.js
  var { WOW } = require('wowjs')
  var scrollTo = require('@/../utils/scroll.js').scrollTo
}
export default {
  data() {
    return {
      currentUrl: '',
      currentSongDt: 0,
      currentTime: 0,
      isShow: false,
      playList: [],
      isMeun: true,
      isHidden: true,
      currentLyric: '',
      songReady: false,
      currentLineNum: 0,
      lineEl: 0,
      isLyric: false,
      forindex: 0,
      prevIndex: 0,
      miniLyric: '',
      allTime: '',
      // playing: false
    }
  },
  components: {
    RoundCircle,
    Timer,
  },
  created() {
    this.getSong()
    // console.log(this.songs)
    this.playList = this.$store.state.music.playList.songs
    // console.log('Lyric: ', Lyric)
  },
  watch: {
    currentSong(val, oldval) {
      if (val.id === oldval.id) {
        return
      }
      // console.log('this.currentLyric: ', this.currentLyric)
      if (this.currentLyric) {
        // console.log('需要停止')
        this.currentLyric.stop()
      }
      if (this.currentLyric) {
        this.currentLyric = ''
      }
      this.allTime = val.dt
      console.log('val: ', val)
      this.playSong(val.id)
    },
    playing(val) {
      // console.log(this.percent);

      this.$nextTick(() => {
        const audio = this.$refs.audio
        val ? audio.play() : audio.pause()
        // console.log(this.$refs.audio)
      })
    },
  },
  methods: {
    slide() {
      // console.log('dianji')
      // document.body.removeAttribute('class', 'ban')
      this.$store.commit('article/isOpen', false)
    },
    showMenu() {
      this.isMeun = !this.isMeun
      if (!this.isHidden) {
        setTimeout(() => {
          this.isHidden = !this.isHidden
        }, 500)
        return
      }

      this.isHidden = !this.isHidden
    },
    showClick() {
      this.isShow = !this.isShow
      // console.log('this.isMeun: ', this.isMeun)
      if (!this.isMeun) {
        this.isMeun = true
        setTimeout(() => {
          this.isHidden = true
        }, 500)
      }
    },
    async select(index) {
      // console.log(index)
      this.forindex = index

      await this.$store.dispatch('music/changeIndex', { index })
    },
    async playSong(id) {
      var res = await this.$axios.$get(`music/check/music?id=${id}`)
      // console.log('res: ', res)
      if (!res.success) {
        this.songReady = true
        this.nextSong()
        return
      }
      // var id = this.$store.state.music.playList.songs[this.$store.state.music.currentIndex].id
      await this.$store.dispatch('music/startSong', { id })

      this.currentUrl = this.$store.state.music.currentSong.data[0].url
      // console.log('this.currentSong.url == null: ', !this.currentUrl)
      // console.log('this.$store.state.music.currentSong', this.$store.state.music.currentIndex)
      if (!this.currentUrl) {
        // console.log('jinru ')
        this.songReady = true
        if (this.forindex > this.prevIndex) {
          this.nextSong()
        } else {
          this.prevSong()
        }

        return
      }
      // console.log(
      //   'this.$store.state.music.currentSong',
      //   this.$store.state.music.currentSong.data[0].url,
      //   this.currentUrl
      // )
      // console.log('当前', this.forindex, 'shangyis', this.prevIndex)
      this.currentSongDt = this.$store.state.music.playList.songs[this.currentIndex].dt
      setTimeout(() => {
        this.toPlay()
        this.getlyric(id)
        if (!this.playing) {
          // console.log('暂停')
          this.togglePlaying()
        }
      }, 500)
    },
    async getSong() {
      var id = this.$store.state.music.playList.songs[this.currentIndex].id
      var index = 0
      // console.log('id: ', id)
      var res = await this.$axios.$get(`music/check/music?id=${id}`)
      // console.log('res: ', res)
      await this.$store.dispatch('music/startSong', { id })

      this.currentUrl = this.$store.state.music.currentSong.data[0].url
      this.currentSongDt = this.$store.state.music.playList.songs[this.currentIndex].dt
      // this.getlyric(id)
      var res = await this.$axios.$get(`/music/lyric?id=${id}`)
      this.currentLyric = new Lyric(res.lrc.lyric, this.handleLyric)
      // console.log('this.currentLyric: ', this.currentLyric)
      if (this.playing) {
        this.currentLyric.play()
      }

      // this.currentLyric.togglePlay()
      // setTimeout(() => {
      // that.togglePlaying()
      // }, 1000)
    },
    async getlyric(id) {
      var res = await this.$axios.$get(`/music/lyric?id=${id}`)
      if (res.nolyric) {
        // 当前歌曲没有歌词
        this.noLyric = true
        this.miniLyric = '纯音乐，请欣赏'
        let currentLyric = '[00:00.00]纯音乐，请欣赏'
        this.currentLyric = new Lyric(currentLyric, this.handleLyric)
        if (this.playing) {
          this.currentLyric.play()
        }

        return
      }
      if (res.uncollected) {
        this.noLyric = true
        this.miniLyric = '暂时没有歌词'
        let currentLyric = '[00:00.00]纯音乐，请欣赏'
        this.currentLyric = new Lyric(currentLyric, this.handleLyric)
        if (this.playing) {
          this.currentLyric.play()
        }

        return
      }
      this.noLyric = false
      this.currentLyric = new Lyric(res.lrc.lyric, this.handleLyric)
      // console.log('this.currentLyric : ', this.currentLyric)
      if (this.playing) {
        this.currentLyric.play()
      }

      // this.currentLyric = new Lyric(res.lrc.lyric, this.handleLyric)
      // console.log('currentLyric: ', this.currentLyric)
    },
    handleLyric({ lineNum, txt }) {
      if (!this.songReady) {
        return
      }
      this.currentLineNum = lineNum
      // console.log('lineNum: ', txt)
      // if (this.isTouchLyric) {
      //   return
      // }
      if (lineNum > 4 && this.isLyric) {
        this.lineEl = this.$refs.lyricLine[lineNum - 1]
        // console.log('this.lineEl: ', this.lineEl, this.$refs.scroll)
        scrollTo(this.$refs.scroll, this.$refs.scroll, this.lineEl.offsetTop - 100, 1000)
        // this.onTimeY = this.lineEl.offsetTop - 100
        // this.$refs.scroll.refresh()
        // console.log(lineEl.offsetTop);
      }
      this.miniLyric = txt
    },
    toPlay() {
      // console.log(this.$refs.audio)
      this.$refs.audio.play()
    },
    togglePlaying() {
      // console.log('暂停')
      // console.log(this.currentLyric)
      // console.log('this.songReady: ', this.songReady)
      if (!this.songReady) {
        return
      }
      if (this.currentLyric) {
        this.currentLyric.togglePlay()
      }
      this.$store.commit('music/SET_PLAY_STATE', !this.playing)
      // console.log(this.playing)
    },
    updateTime(e) {
      this.currentTime = e.target.currentTime
      // ,
      // console.log(e.target.currentTime)
    },
    //上一首
    prevSong() {
      // this.$refs.scroll.scrollTo(0, 0, 0)
      this.currentLyric.seek(0)
      if (!this.songReady) {
        return
      }
      let prev = this.currentIndex - 1
      this.prevIndex = prev + 1
      if (prev === -1) {
        prev = this.songs.length - 1
        // console.log(this.playList.length);
      }
      if (!this.playing) {
        this.togglePlaying()
      }

      this.select(prev)
      this.songReady = false
    },
    ready() {
      this.songReady = true
    },
    error() {
      this.songReady = true
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
      this.currentLyric.seek(0)

      if (!this.songReady) {
        return
      }
      // console.log('下一首')
      if (this.songs.length === 1) {
        this.loop()
        return
      } else {
        let index = this.currentIndex + 1
        this.prevIndex = index - 1
        if (index === this.songs.length) {
          index = 0
        }
        this.select(index)
        if (!this.playing) {
          // console.log('暂停')
          this.togglePlaying()
        }
      }
      this.songReady = false
    },
    onChengePercent(percent) {
      let currentTime = this.currentSongDt * percent
      this.$refs.audio.currentTime = (percent * this.currentSongDt) / 1000
      // console.log(percent * this.currentSong.dt);
      if (!this.playing) {
        this.setTogglePlaying(!this.playing)
      }
      console.log(currentTime)

      if (this.currentLyric) {
        this.currentLyric.seek(currentTime)
      }
    },
    setTime(interval) {
      interval = interval | 0
      let min = (interval / 60) | 0
      let sec = this._pad(interval % 60)
      min = '0' + min
      // sec = '0' + sec
      return `${min}:${sec}`
    },
    _pad(num, n = 2) {
      let len = num.toString().length
      while (len < n) {
        num = '0' + num
        len++
      }
      return num
    },
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
    currentIndex() {
      return this.$store.state.music.currentIndex
    },
    playing() {
      return this.$store.state.music.playing
    },
    percent() {
      return (this.currentTime / this.currentSongDt) * 1000
    },
    playIcon() {
      return this.playing ? 'iconzantingtingzhi' : 'iconbofang1 border-round'
    },
    changeLyric() {
      return this.isLyric ? '点击切换歌曲列表' : '点击切换歌词'
    },
  },
}
</script>

<style lang="scss" scoped>
.songs-active {
  color: red !important;
  border-left: 5px solid red;
  // font-size: 18px;
}
.active {
  color: red !important;
}
.mini-lyric {
  display: none;
}
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
  // overflow: hidden;
  /* top: 200px; */
  /* right: 0; */
  /* left: 0; */
  // bottom: 0;
  border-radius: 10px;
  margin-top: 10px;
  height: 500px;
  transition: all 0.5s ease;

  .song-bank {
    background-color: #f4f4f4;
    transition: all 0.5s linear;
    z-index: 9999;
    // position: fixed;
    border-radius: 10px;
    box-shadow: 0 0 4px #a8a8a8;
    height: 400px;
    overflow: auto;
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

    .lyric-wrapper {
      // margin: 0 auto;
      // padding-top: 500px;
      .text {
        line-height: 32px;
        text-align: center;
        color: #a9a9a9;
        transition: all 0.5s;
      }
    }
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
        // color: #9a9191;
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
  border-radius: 10px;
  width: 100%;
  // height: 500px;
  background-color: #fff;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .time {
    padding: 0.2em 0.6em 0.3em;
    cursor: pointer;
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
    position: absolute;
    top: 75px;
    right: 5px;
  }
  .item-info {
    margin-left: 5px;
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
    .name {
      width: 50px;

      margin: 0;
    }
    .songer::after {
      content: '/';
    }
    .songer:last-child::after {
      content: '';
    }
  }
  .is-lyric-wrapper {
    padding-top: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 20px;
    min-height: 14px;
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