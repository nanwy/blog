<template>
  <div class="footer">
    <p>
      本小站已苟延残喘的运行了 {{getRunSuc?getRunSuc:'不要急,还在加载'}}
      <!-- <span class="ani">(='◡'=)☆</span> -->
    </p>
    <p>托管于生锈了的阿里云 | 由七牛云强力驱动</p>
    <a href="http://www.beian.miit.gov.cn" class="bah">吉ICP备20002171号</a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      getRunSuc: ''
    }
  },
  created() {
    this.getRun()
  },
  methods: {
    getRun() {
      function format(n) {
        return n < 10 ? '0' + n : '' + n
      }
      setInterval(() => {
        const date = parseInt(new Date() - new Date('2020-06-15 22:38:00'))
        // 天数
        const day = Math.floor(date / 1000 / 60 / 60 / 24)
        // 小时
        const hour = Math.floor((date / 1000 / 60 / 60) % 24)
        // 分钟
        const minute = Math.floor((date / 1000 / 60) % 60)
        // 秒
        const second = Math.floor((date / 1000) % 60)
        // console.log(`${day}天${format(hour)}小时${format(minute)}分${format(second)}秒`)
        this.getRunSuc = `${day}天${format(hour)}小时${format(minute)}分${format(second)}秒`
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  padding: 20px 10px;
  background-color: #000;
  color: #8c8c8c;
  font-size: 12px;
  text-align: center;
  a {
    text-decoration: underline;
    color: azure;
  }
}
</style>