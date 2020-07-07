<template>
  <div class="bloger" @touchmove.prevent @mousewheel.prevent>
    <el-aside class="blog-aside">
      <el-col :span="24">
        <el-card class="box-card" style="height:100vh" shadow="hover">
          <div class="bloger-img">
            <img src="http://img.nanwayan.cn/1592539247967cc138bd2a23cbf2f1f75a333b9289381.png" alt />
          </div>
          <div class="blog-message">
            <span class="bloger-name">南浮宫魅影</span>
          </div>
        </el-card>
      </el-col>
    </el-aside>
    <div class="hide-aside" @click="slide" v-if="isOpen"></div>
  </div>
</template>

<script>
export default {
  methods: {
    slide() {
      // console.log('dianji')
      // document.body.removeAttribute('class', 'ban')
      this.$store.commit('article/isOpen', false)
    }
  },
  computed: {
    isOpen() {
      return this.$store.state.article.isOpen
    }
  }
}
</script>

<style scoped>
.hide-aside {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
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
.bloger {
  width: 225px;
  position: fixed;
  top: 200px;
  /* right: 0; */
  /* left: 0; */
  bottom: 0;
  transition: all 0.5s ease;
}
.blog-aside {
  width: 225px !important;
  position: relative;
  left: 0px;
  top: 0;
  z-index: 21;
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
  overflow: visible;
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
</style>