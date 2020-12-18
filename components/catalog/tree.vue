<template>
  <div
    :class="[scrollTop > 1000 ? 'catalog-tree' : 'catalog-tree-position']"
    :style="{ left: screenWidth + 'px' }"
    ref="tree"
    v-if="screenWidth > -225"
  >
    <catalog :catalogs="catalogs" :titleTop="titleTop" :activeIndex="activeIndex"></catalog>
  </div>
</template>

<script>
import catalog from './index.vue'
if (process.browser) {
  // 在这里根据环境引入wow.js
  // var { WOW } = require('wowjs')
  var scrollTo = require('../../utils/scroll.js').scrollTo
}
export default {
  props: {
    catalogs: {
      type: Array,
      defualt: [],
    },
    titleTop: {
      type: Array,
      defualt: [],
    },
  },
  components: {
    catalog,
  },
  data() {
    return {
      activeIndex: -1,
      scrollTop: 0,
      asideTop: 0,
      screenWidth: 20,
    }
  },
  methods: {
    onScroll() {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop

      for (let i = 0; i < this.titleTop.length; i++) {
        if (this.scrollTop - 500 >= this.titleTop[i]) {
          this.activeIndex = i
          // console.log(this.titleTop[i], this.scrollTop, this.activeIndex)
          this.autoScroll()
        }
      }
      // console.log(this.left)
    },
    autoScroll() {
      let distance = this.activeIndex * 32 + 32 - this.$refs.tree.scrollTop
      if (distance > 320) {
        scrollTo(this.$refs.tree, this.$refs.tree, (this.$refs.tree.scrollTop += 40), 50)
      }
      if (distance < 100) {
        scrollTo(this.$refs.tree, this.$refs.tree, (this.$refs.tree.scrollTop -= 40), 50)
      }
    },
  },
  computed: {
    left() {
      return document.getElementsByClassName('article_detail')[0].offsetWidth
    },
  },
  watch: {
    screenWidth(val, oldVal) {
      // console.log('val: ', val)
    },
    scrollTop() {
      if (this.scrollTop > 1000) {
        this.screenWidth = document.getElementsByClassName('article_detail')[0].getBoundingClientRect().left - 245
        // console.log(this.left)
      }
    },
  },
  mounted() {
    let that = this
    window.addEventListener('scroll', this.onScroll)
    this.asideTop = document.getElementsByClassName('bloger')[0].offsetTop + 200

    window.onresize = function () {
      that.screenWidth = document.getElementsByClassName('article_detail')[0].getBoundingClientRect().left - 245
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
  },
  destroy() {
    window.removeEventListener('scroll', this.onScroll)
  },
}
</script>

<style lang="scss" scoped>
.catalog-tree {
  position: fixed;
  top: 20vh;
  // left: 20px;
  width: 225px;
  height: 500px;
  background-color: #fff;
  border-radius: 10px;
  overflow-y: scroll;
  // max-height: 300px;
  // overflow-y: scroll;
  // overflow-x: hidden;
  opacity: 1;
  transition: opacity 0.5s linear;
}
.catalog-tree-position {
  overflow: hidden;
  // position: absolute;
  // top: 1020px;
  // left: -5px;
  // width: 225px;
  // background-color: #fff;
  // border-radius: 10px;
  position: fixed;
  opacity: 0;
  top: 20vh;
  height: 500px;
  // left: 20px;
  width: 225px;
  transition: opacity 0.5s linear;
}
</style>