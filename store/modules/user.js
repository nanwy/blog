import { MessageBox, Message } from 'element-ui'
const state = () => ({
  id: null,
  name: null,
  avatar: null,
  title: null,

})

export const mutations = {
  setname(state, res) {
    state.name = res
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
  async login({ commit }, data) {
    console.log(this);
    const res = await this.$axios.$post('/api/user/login', data)
    if (res.errno === 0) {
      Message({
        message: '登录成功！',
        type: 'success',
        duration: 1000
      })
    } else {

      console.log('账号或密码错误！！')
      Message({
        message: '账号或密码错误！',
        type: 'error',
        duration: 1000
      })
    }
    commit("setname", res.message)
    console.log(res.message);
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