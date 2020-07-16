import article from './modules/article'
import music from './modules/music'
const store = {
  modules: {
    article,
    music
  },
  actions: {
    async nuxtServerInit({ dispatch }) {
      await dispatch('article/blogList', { pageNum: 1, pageSize: 5 })

      await dispatch('music/setSongAll')
      console.log('chufa触发了', music);
    }
  }
}

export default store