<template>
  <div class="about">
    <div class="content">
      <markdown :md="content"></markdown>
    </div>
  </div>
</template>

<script>
import markdown from '@/markdown'
export default {
  data() {
    return {
      content:
        '# 关于博客\n' +
        '本站是一个从0开始的项目，前端的技术栈为 **Vue.js** + **element-ui**,后端使用 **node + express**，数据库为 **mysql** ，管理端使用**vue-admin-template** ，现在托管于阿里云服务器,使用**nuxt.js**创建服务端渲染 (SSR) ,使本站的访问速度大幅减少,使用七牛云储存保 存图片。目前本站的文章还要等我完善博客后才会写,虽然也没人看,就当是给自己总结的笔记吧!\n' +
        '# 关于我\n' +
        '普通大学生,喜欢捅咕电脑,不爱说话,但还是有一个目标的:努力成为一个程序猿。\n' +
        '![20200318224136Aicy.png](http://img.nanwayan.cn/20200318224136Aicy.png)'
    }
  },
  created() {
    this.$store.commit('article/isOpen', false)
  },
  components: {
    markdown
  }
}
</script>

<style lang="scss" scoped>
.about {
  border-radius: 10px;
  background-color: #fff;
  .content {
    padding: 0 10px;
  }
}
</style>