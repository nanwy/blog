<template>
  <div>
    <div v-if="!toggle" :class="{minback:1,showminback:visible}" @click="handleTo">
      <span class="triangle">UP</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      toggle: false
    }
  },
  methods: {
    handleTo() {
      console.log(scrollTo)

      scrollTo({ top: 0, behavior: 'smooth' })
    },
    handleResize() {
      const { width } = document.documentElement.getBoundingClientRect()
      this.toggle = width > 1200
    },
    headershow() {
      // 头部高度为70px
      const height = 50
      const offsetTop = window.pageYOffset || document.documentElement.scrollTop
      this.visible = offsetTop > height
    }
  },
  created() {},
  mounted() {
    this.handleResize()
    window.addEventListener('scroll', this.headershow)
    window.addEventListener('resize', this.handleResize)
  },
  destroyed() {
    window.removeEventListener('scroll', this.headershow)
    window.addEventListener('resize', this.handleResize)
  },
  computed: {}
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
  top: -700px;
  right: 10px;
  width: 100px;
  height: 700px;
  z-index: 999;
  animation: move 3s infinite linear;
  cursor: pointer;
  transition: all 0.5s;
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
  right: 30px;
  bottom: 70px;
  box-shadow: 0px 0px 1px 5px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transition: all 1s;
  cursor: pointer;
  visibility: hidden;
}

.showminback {
  opacity: 1;
  visibility: visible;
}
@keyframes move {
  0% {
    transform: translatey(0);
  }
  75% {
    transform: translatey(-10px);
  }
  100% {
    transform: translatey(0);
  }
}
</style>