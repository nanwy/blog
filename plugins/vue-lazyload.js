import Vue from 'vue'

Vue.use(VueLazyLoad, {
  preLoad: 1,
  error: require('../assets/image/加载失败.png'),
  loading: require('../assets/image/loading.gif'),
  attempt: 2,
})
import VueLazyLoad from 'vue-lazyload'
