<template>
  <div class="nav">
    <div class="menu" @click="showMenu">
      <i class="el-icon-s-operation"></i>
    </div>
    <nuxt-link to="/" class="link-home">
      <i class="el-icon-s-home"></i>
      <span class="blog-name">南浮宫魅影</span>
    </nuxt-link>
    <div class="time">{{time}}</div>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      state: "",
      time: null,
      isOpen: false
    };
  },
  created() {
    setInterval(this.nowTime, 1000);
  },
  methods: {
    showMenu() {
      this.isOpen = !this.$store.state.article.isOpen;
      console.log(this.isOpen);
      scrollTo({ top: 0, behavior: "smooth" });
      this.$store.commit("article/isOpen", this.isOpen);
      // console.log(this.isOpen);
      var b = document.querySelectorAll("body")[0];
      if (this.isOpen) {
        document.getElementsByTagName("body")[0].className = "ban";
      } else {
        document.body.removeAttribute("class", "ban");
      }
    },
    blurSearchFor() {
      // console.log(this.state);
      this.state = "";
    },
    handleSelect(item) {
      // console.log(item);
      let id = item.id;
      this.$router.push(`/article/${id}`);
    },
    async querySearchAsync(key, cb) {
      if (key) {
        const { data: res } = await this.$axios.$get(
          `/api/blog/list?keyword=${key}`
        );
        // console.log(res);

        cb(res);
      }
    },
    nowTime() {
      var date = new Date();

      var year = date.getFullYear();
      var month = date.getMonth();
      var day = date.getDate();

      var hour = date.getHours();
      var minute = date.getMinutes();
      var second = date.getSeconds();

      //这样写显示时间在1~9会挤占空间；所以要在1~9的数字前补零;
      if (hour < 10) {
        hour = "0" + hour;
      }
      if (minute < 10) {
        minute = "0" + minute;
      }
      if (second < 10) {
        second = "0" + second;
      }

      var x = date.getDay(); //获取星期
      this.time =
        year +
        "/" +
        month +
        "/" +
        day +
        "/" +
        hour +
        ":" +
        minute +
        ":" +
        second;
    }
  }
};
</script>

<style scoped>
.nav {
  padding: 0 20px;
  display: flex;
  align-items: center;
  background-image: url("http://img.nanwayan.cn/72722834.jpg");
  background-position: 0 30%;
  height: 200px;
  background-size: cover;
  padding: 0 20px;
  box-sizing: border-box;
  flex-shrink: 0;
  opacity: 0.8;
}
.menu {
  width: 35px;
  height: 35px;
  font-size: 25px;
  color: azure;
  display: none;
  cursor: pointer;
}
.link-home {
  text-align: center;
  /* flex: 1 0 0; */
  /* padding-right: 10%; */
  font-size: 26px;
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
}
.search {
  margin-left: auto;
}
.search /deep/ .el-input__inner {
  background-color: rgba(255, 255, 2555, 0.8);
  /* color: red; */
}
.search /deep/ .el-input__inner::placeholder {
  /* background-color: rgba(255, 255, 2555, 0.8); */
  color: #a6c1ee;
}
.ban {
  overflow-x: hidden !important;
  overflow-y: hidden !important;
}
</style>