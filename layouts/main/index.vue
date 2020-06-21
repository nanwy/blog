<template>
  <div class="article">
    <!-- <router-view /> -->
    <nuxt-child keep-alive />
  </div>
</template>

<script>
export default {
  computed: {
    key() {
      console.log(this.$route.path);
      return this.$route.path;
    }
  },
  created() {
    // console.log(this.$refs.nuxt);
  },
  transition: "test"
};
</script>

<style scoped>
</style>