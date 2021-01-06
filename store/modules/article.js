
const state = () => ({
  // 总页数
  count: null,
  // 当前页数
  pageNum: 1,
  // 当前类型
  tagList: [],
  list: null,
  // 文章列表
  pageList: null,
  // 热门文章列表
  hotList: null,
  // 文章数据
  data: null,
  // 搜索数据
  search: null,
  // 分页大小
  pageSize: 5,
  // 历史文章分页大小
  historypagesize: 10,
  // 文章类型
  typeList: null,
  history: null,
  Detail: null,
  isOpen: false
})
const mutations = {
  list(state, res) {
    state.list = res
  },
  page(state, res) {
    state.list = res
  },
  isOpen(state, res) {
    state.isOpen = res
  },
  pageNum(state, res) {
    state.pageNum = res
  },
  pageSize(state, res) {
    state.pageSize = res
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
  pageList(state, res) {
    state.pageList = res
  },
  hotList(state, res) {

    state.hotList = res
  },
  getTagList(state, res) {
    state.tagList = res
  },
  history(state, res) {
    // slice截取指定元素
    state.history = res
  },
  count(state, res) {
    state.count = res
  }
}
const actions = {
  //文章列表
  async blogList({ commit, state }, data) {
    // console.log('data: ', data, root);
    var { pageNum } = data
    // console.log(state.pageNum);

    const res = await this.$axios.$get(`/api/blog/page?pageNum=${pageNum}&pageSize=${state.pageSize}`)
    // console.log(res);
    commit('count', res.data.count)
    commit('pageNum', pageNum)
    commit('list', res.data.rows)
  },
  //文章详情
  async getBlogDetail({ commit, ...root }, data) {
    console.log('data: ', data, { ...root });
    let { id } = data
    const res = await this.$axios.$get(`/api/blog/detail?id=${id}`)
    commit('data', res)
    // console.log(this.blogList);

  },
  async getTagList({ commit }) {
    const res = await this.$axios.$get('/api/tag/list')
    commit('getTagList', res)
  }
}

export default {

  namespaced: true,
  state,
  mutations,
  actions
}