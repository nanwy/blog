<template>
  <div class="tags">
    <div class="tag_content">
      <h3>标签云</h3>
      <div class="badge" v-for="item in tagList" :key="item.id" @click="toTags(item.id)">{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    tagList() {
      return this.$store.state.article.tagList.data.rows
    },
  },
  methods: {
    toTags(id) {
      this.$router.push({ path: `/tags/${id}` })
      console.log(id)
    },
  },
}
</script>

<style lang="scss" scoped>
.tags {
  background-color: #fff;
  border-radius: 10px;
  margin-top: 30px;
  // padding: 10px 10px;
  // width: 275px;
  width: 100%;
  .tag_content {
    padding: 10px 10px;
    width: 100%;
    h3 {
      margin-bottom: 10px;
    }
    .badge {
      display: inline-block;
      min-width: 10px;
      padding: 5px 7px;
      font-size: 12px;
      font-weight: 700;
      line-height: 1;
      color: #fff;
      text-align: center;
      white-space: nowrap;
      vertical-align: middle;
      background-color: #777;
      border-radius: 10px;
      font-weight: 700;
      text-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
      margin-left: 5px;
      margin-top: 5px;
      cursor: pointer;
    }
  }
}
</style>