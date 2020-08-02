import { MessageBox, Message } from 'element-ui'
const state = () => ({
  friendLinks: [],

})

export const mutations = {
  setLink(state, res) {
    state.friendLinks = res
  },
  setid(state, res) {
    state.id = res
  },
  settitle(state, res) {
    state.title = res
  },
  setavatar(state, res) {
    state.avatar = res
  }
}

export const actions = {
  async getLink({ commit }, data) {
    const res = await this.$axios.$get('/api/link/detail')
    commit("setLink", res)
    // console.log(res);
  },
  logout({ commit }) {
    commit("settoken", null)
  },
  async getInfo({ commit, state }) {
    const res = await this.$axios.$get('/api/user/userinfo')
    if (res.code) {
      commit("setid", res.userinfo.id)
      commit("setname", res.userinfo.username)
      commit("setavatar", res.userinfo.avatar)
      commit("settitle", res.userinfo.title)
    } else {
      Cookies.remove('token')
    }
  },
  // async add({ commit }, data) {
  //     const res = await this.$axios.$post('/api/user/add', data)
  // }

}
export default {

  namespaced: true,
  state,
  mutations,
  actions
}