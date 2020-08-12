<template>
  <div class="bloger">
    <div class="photo-background"></div>
    <el-aside class="blog-aside">
      <el-col :span="24">
        <el-card class="box-card" style="height:400px" shadow="never">
          <div class="bloger-img">
            <img src="http://img.nanwayan.cn/1592539247967cc138bd2a23cbf2f1f75a333b9289381.png" alt />
          </div>
          <div class="blog-message">
            <span class="aside-name">南浮宫魅影的Blog</span>
          </div>
          <span style="color: #98a6ad;font-size:12px;margin-top:10px;">沉默不语,但仍奋力前行</span>
          <div class="search">
            <el-autocomplete
              v-model="state"
              value-key="title"
              suffix-icon="el-icon-search"
              :fetch-suggestions="querySearchAsync"
              size="small"
              placeholder="来调戏人家"
              @select="handleSelect"
              :trigger-on-focus="false"
              :debounce="300"
              @focus="blurSearchFor"
            ></el-autocomplete>
          </div>
          <ul>
            <li>
              <nuxt-link to="/" class="link-home">
                <i class="el-icon-s-home"></i>
                <span class="aside-name">首页</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/liveMessage" class="link-home">
                <i class="el-icon-edit-outline"></i>
                <span class="aside-name">留言板</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/link" class="link-home">
                <i class="el-icon-paperclip"></i>
                <span class="aside-name">友链</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/about" class="link-home">
                <i class="el-icon-info"></i>
                <span class="aside-name">关于我</span>
              </nuxt-link>
            </li>
          </ul>
        </el-card>
        <div class="footer">
          <i class="el-icon-setting" style="margin-right:10px;"></i>
          <a href="http://superadmin.nanwayan.cn/">后台管理</a>
        </div>
      </el-col>
    </el-aside>
    <div class="hide-aside" @click="slide" v-if="isOpen"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      state: '',
    }
  },
  methods: {
    slide() {
      // console.log('dianji')
      // document.body.removeAttribute('class', 'ban')
      this.$store.commit('article/isOpen', false)
    },
    blurSearchFor() {
      // console.log(this.state);
      this.state = ''
    },
    handleSelect(item) {
      // console.log(item);
      let id = item.id
      this.$router.push(`/article/${id}`)
      this.$store.commit('article/isOpen', false)
    },
    async querySearchAsync(key, cb) {
      if (key) {
        const { data: res } = await this.$axios.$get(`/api/blog/list?keyword=${key}`)
        // console.log(res);

        cb(res)
      }
    },
  },
  computed: {
    isOpen() {
      return this.$store.state.article.isOpen
    },
  },
}
</script>

<style lang="scss" scoped>
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
.hide-aside {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 1000%;
  z-index: 15;
  display: none;
}
.box-card {
  /* align-items: center; */

  /* background: #e2ebf0; */
}
.to {
  background-color: red;
  width: 100px;
  height: 500px;
  display: block;
}
.bloger {
  width: 225px;
  margin-top: 10px;
  /* position: fixed; */
  /* top: 200px; */
  /* right: 0; */
  /* left: 0; */
  /* bottom: 0; */
  background-color: #fff;
  transition: all 0.5s ease;
  background-size: auto 225px;
  /* background-attachment: fixed; */
  height: 500px;
  border-radius: 10px;
  /* overflow: hidden; */

  ul {
    margin-top: 10px;
    margin-left: -10px;
    li {
      margin-top: 10px;
      .link-home {
        font-size: 20px !important;
        color: #ce98b0;
        .aside-name {
          color: #000;
          margin-left: 10px;
        }
      }
    }
  }
  .footer {
    position: relative;
    // margin: auto;
    left: 50%;
    font-size: 15px;
    transform: translateX(-25%);
    top: -20px;
    bottom: 0px;
    color: #000;
  }
}
.search {
  margin: 5px;
}
.search /deep/ .el-input__inner {
  background-color: rgba(255, 255, 2555, 0.8);
  /* color: red; */
}
.search /deep/ .el-input__inner::placeholder {
  /* background-color: rgba(255, 255, 2555, 0.8); */
  color: #a6c1ee;
}

.photo-background {
  height: 100px;
  background-image: url('http://img.nanwayan.cn/pink.jpg');
  background-size: cover;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.blog-aside {
  width: 225px !important;
  position: relative;
  left: 0px;
  top: 0;
  z-index: 21;
}
.bloger-img {
  position: absolute;
  width: 50%;
  height: 0;
  top: -80px;
  margin-top: 20px;
  padding-top: 50%;
  /* position: relative; */
  border-radius: 50%;
  overflow: hidden;
}
.bloger-img img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.blog-message {
  text-align: center;
  padding-top: 80px;
}
.el-aside /deep/ .el-card {
  border: none;
  background-color: transparent;
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