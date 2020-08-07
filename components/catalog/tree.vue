<template>
  <div
    :class="[scrollTop>1000?'catalog-tree':'catalog-tree-position']"
    :style="{'left':scrollTop>1000?  screenWidth+'px':0+'px'}"
    ref="tree"
    v-if="screenWidth >-225"
  >
    <catalog :catalogs="catalogs" :titleTop="titleTop" :activeIndex="activeIndex"></catalog>
  </div>
</template>

<script>
import catalog from './index.vue'
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
        if (this.scrollTop >= this.titleTop[i] - 200) {
          // console.log(this.titleTop[i])

          this.activeIndex = i + 1
          // console.log('this.activeIndex: ', this.activeIndex, this.scrollTop, this.titleTop[i])
        }
      }
      // console.log(this.left)

      // this.autoScroll()
    },
    autoScroll() {
      let distance = this.activeIndex * 32 + 32 - this.$refs.tree.scrollTop
      if (distance > 320) {
        this.$refs.tree.scrollTop += 40
      }
      if (distance < 100) {
        this.$refs.tree.scrollTop -= 40
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
  top: 0;
  left: 20px;
  width: 225px;
  // height: 300px;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  // max-height: 300px;
  // overflow-y: scroll;
  // overflow-x: hidden;
}
.catalog-tree-position {
  overflow: hidden;
  position: absolute;
  top: 1020px;
  left: -5px;
  width: 225px;
  background-color: #fff;
  border-radius: 10px;
}
</style>