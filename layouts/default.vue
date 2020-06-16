<template>
  <div>
    <el-container
      :class="{'container':isOpen}"
      style="position: absolute;left: 0;right: 0; overflow: hidden;"
    >
      <el-header class="nav" style="background: #545c64;">
        <div class="menu" @click="showMenu">
          <i class="el-icon-s-operation"></i>
        </div>
        <a href="www.nanwayan.cn" class="link-home">
          <i class="el-icon-s-home"></i>
          <span class="blog-name">南浮宫魅影</span>
        </a>
        <el-autocomplete
          v-model="state"
                value-key="title"
                suffix-icon="el-icon-search"
                :fetch-suggestions="querySearchAsync"
                size="small"
                placeholder="来调戏人家吧"
                @select="handleSelect"
                                
          :trigger-on-focus="false"
        >
        </el-autocomplete>
      </el-header>
      <el-container style="height: 100%;">
        <!-- 侧边布局 -->

        <el-aside class="bloger">
          <el-col :span="12">
            <el-card class="box-card" style="height:370px" shadow="never">
              <div slot="header" class="clearfix">
                <span>卡片名称</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
              </div>
              <div class="text item"></div>
            </el-card>
          </el-col>
        </el-aside>

        <!-- 主布局 -->
        <el-main class="bg-light">
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
          <vmain />

          <!-- <div style="height:1000px;"></div> -->
          <el-backtop target=".el-main" :bottom="100">
            <div
              style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }"
            >UP</div>
          </el-backtop>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import vmain from "./main";
export default {
  data() {
    return {
      navBar: [],
      bran: [],
      isOpen: false,
      state:''
    };
  },
  components: {
    vmain
  },
  methods: {
    showMenu() {
      this.isOpen = !this.isOpen;
    },
    handleSelect(item){
      console.log(item);
      let id = item.id
      this.$router.push(`/article/${id}`)
    },
    async querySearchAsync(key,cb){
      if(key){
        const {data:res} = await this.$axios.$get(`/api/blog/list?keyword=${key}`)
        console.log(res);
        
        cb(res)
      }
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
.nav {
  display: flex;
  align-items: center;
}
.menu {
  width: 20px;
  height: 35px;
  font-size: 25px;
  color: azure;
  display: none;
  cursor: pointer;
}
.link-home {
  text-align: center;

  font-size: 26px;
}
.link-home i {
  color: azure;
}
.blog-name {
  font-weight: 700;
  color: azure;
}
</style>
