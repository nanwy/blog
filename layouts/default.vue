<template>
  <div>
    <el-container class="container1" :class="{'container':isOpen}">
      <div class="content" style="width:100%;">
        <nheader></nheader>
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
        </el-container>
      </div>
    </el-container>
  </div>
</template>

<script>
import nheader from "./header";
import vaside from "./aside";
import vmain from "./main";
import backtop from "./backtop";
import { color } from "../plugins/color";
export default {
  data() {
    return {
      navBar: [],
      bran: []
    };
  },
  components: {
    nheader,
    vmain,
    vaside,
    backtop
  },
  mounted() {
    // console.log(color);
    color(window);
  },
  comments: {},
  methods: {},
  computed: {
    isOpen() {
      return this.$store.state.article.isOpen;
    }
  }
};
</script>

<style scoped>
.geren-enter-active,
.geren-leave-active {
  transition: transform linear 0.1s;
}
.geren-enter,
.geren-leave-to {
  transform: translateX(-300px);
}

.container1 {
  margin: 0 auto;
  width: 970px;
  /* background: #f1f3f4; */
}
.el-main {
  padding: 0 20px;
}
</style>
