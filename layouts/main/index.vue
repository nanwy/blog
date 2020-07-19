<template>
  <div class="article">
    <!-- <router-view /> -->
    <nuxt-child />
  </div>
</template>

<script>
export default {
  computed: {},
  created() {
    // console.log(this.$refs.nuxt);
  },
  transition: 'test'
}
</script>

<style scoped>
.article {
  padding-bottom: 50px;
}
</style>