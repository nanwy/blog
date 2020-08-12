<template>
  <div>
    <div :class="{show:1,showminback:visible,fly:isGoTop}" @click="handleTo">
      <!-- <span class="triangle">UP</span> -->
    </div>
  </div>
</template>

<script>
if (process.browser) {
  // 在这里根据环境引入wow.js
  var scrollTo = require('../../utils/scroll.js').scrollTo
}
export default {
  data() {
    return {
      visible: false,
      toggle: false,
      isGoTop: false,
    }
  },
  methods: {
    handleTo() {
      // console.log(scrollTo)
      this.isGoTop = true
      // console.log('this.isGoTop: ', this.isGoTop)
      // scrollTo({ top: 0, behavior: 'smooth' })
      scrollTo(document.body, document.documentElement, 0, 800, this.removeClass)
      // console.log('this.isGoTop: ', this.isGoTop)
    },
    handleResize() {
      const { width } = document.documentElement.getBoundingClientRect()
      this.toggle = width > 1200
    },
    removeClass() {
      this.isGoTop = false
    },
    headershow() {
      // 头部高度为70px
      const height = 50
      const offsetTop = window.pageYOffset || document.documentElement.scrollTop
      this.visible = offsetTop > height
    },
  },
  created() {},
  mounted() {
    // this.handleResize()
    window.addEventListener('scroll', this.headershow)
    // window.addEventListener('resize', this.handleResize)
  },
  destroyed() {
    window.removeEventListener('scroll', this.headershow)
    // window.addEventListener('resize', this.handleResize)
  },
  computed: {},
}
</script>

<style scoped>
.triangle {
  height: 100%;
  width: 100%;
  /* background-color: #f2f5f6;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12); */
  text-align: center;
  line-height: 40px;
  color: #1989fa;
}
.show {
  position: fixed;
  /* bottom: -20px; */
  right: 10px;
  width: 132px;
  height: 150px;
  z-index: 999;
  background: url('https://img.nanwayan.cn/backTop.png') no-repeat;
  background-size: cover;
  animation: move 3s infinite linear;
  cursor: pointer;
  opacity: 0;
  transition: all 0.5s;
}
.show:hover {
  background: url('https://img.nanwayan.cn/backTophover.png') no-repeat;
  background-size: cover;
  position: fixed;
  /* bottom: 10px; */
  right: 10px;
  width: 200px;
  height: 226px;
  z-index: 999;
  animation: move 3s infinite linear;
  cursor: pointer;
}
.backtop {
  top: 0;
  transition: all 0.5s;
}
.minback {
  position: fixed;
  background-color: #fff;
  text-align: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  right: 12px;
  bottom: 50px;
  box-shadow: 0px 0px 1px 5px rgba(0, 0, 0, 0.1);

  opacity: 0;
  transition: all 1s;
  cursor: pointer;
  visibility: hidden;
}
.fly {
  bottom: 1000px !important;
  opacity: 0;
}
.showminback {
  bottom: 10px;
  opacity: 1;
  visibility: visible;
}
@keyframes move {
  50% {
    transform: translatey(-10px);
  }
}
</style>