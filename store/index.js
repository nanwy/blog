import article from './modules/article'
import music from './modules/music'
import user from './modules/user'
import link from './modules/link'
const store = {
  modules: {
    article,
    music,
    user,
    link
  },
  actions: {
    async nuxtServerInit({ dispatch }) {
      await dispatch('article/blogList', { pageNum: 1, pageSize: 5 })
      await dispatch('link/getLink')
      await dispatch('music/setSongAll')
      // console.log('chufa触发了', music);
    }
  }
}

export default store