// import { blogList } from "~/api/config"

export const state = () => ({
  // 总页数
  count: null,
  // 当前页数
  nowpage: 1,
  // 当前类型
  nowtype: null,
  // 历史文章列表
  list: null,
  // 文章列表
  pagelist: null,
  // 热门文章列表
  hotlist: null,
  // 文章数据
  data: null,
  // 搜索数据
  search: null,
  // 分页大小
  pagesize: 5,
  // 历史文章分页大小
  historypagesize: 10,
  // 文章类型
  typelist: null,
  history: null,
  Detail: null
})
export const mutations = {
  list(state, res) {
      state.list = res
  },
  page(state, res) {
      state.list = res
  },
  nowpage(state, res) {
      state.nowpage = res
  },
  nowtype(state, res) {
      state.nowtype = res
  },
  typelist(state, res) {
      state.typelist = res
  },
  data(state, res) {
      if (res != null) {
          // window.document.title = res.list.rows[0].title + " | vueblog"
          state.data = res.data
      } else {
          state.data = res
      }
  },
  search(state, res) {
      state.search = res
  },
  pagelist(state, res) {
      state.pagelist = res
  },
  hotlist(state, res) {
      // state.hotlist = res
      // slice截取指定元素
      // state.hotlist = res.slice(0, 3)
      state.hotlist = res
  },
  history(state, res) {
      // slice截取指定元素
      state.history = res
  },
  count(state, res) {
      state.count = res
  }
}
export const actions = {
  async bloglist({commit}){
    const res = await this.$axios.$get(`/api/blog/list`)
    commit('list',res.data)
  },
  async getBlogDetail({commit},data) {
    let {id} = data
      const res = await this.$axios.$get(`/api/blog/detail?id=${id}`)
      commit('data',res)
      // console.log(this.blogList);
      
    },
}