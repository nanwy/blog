
const playMode = {
  sequence: 0,
  loop: 1,
  random: 2
}
const state = () => ({
  key: 0,
  key1: 2,
  login: false,
  cur: 0,
  playList: [],
  sequenceList: [],
  playMode: playMode.sequence,
  isFindSwiper: true,
  playing: false,
  fullScreen: false,
  currentIndex: 0,
  currentSong: '',
  idsList: []
})


const mutations = {

  SET_PLAY_STATE(state, flag) {
    state.playing = flag
  },
  SET_FULL_SCREEN(state, flag) {
    state.fullScreen = flag
  },
  SET_SEQUENCE_LIST(state, list) {
    state.sequenceList = list
  },
  SET_PLAY_MODE(state, mode) {
    state.playMode = mode
    // console.log('改变了');

  },
  SET_CURRENT_INDEX(state, index) {
    state.currentIndex = index
  },
  SET_CURRENT_SONG(state, song) {
    state.currentSong = song
  },
  SET_IDS_LIST(state, list) {
    state.idsList = list
    // console.log(state.playList);

  },
  SET_PLAY_LIST(state, list) {
    state.playList = list
    // console.log(state.playList);

  },
  IS_FIND_SWIPER(state) {
    state.isFindSwiper = false
  },
  HIDE_FIND_SWIPER(state) {
    state.isFindSwiper = true
  }
}
const actions = {
  async setSongAll({
    commit, state
  }, data) {
    // const res = await this.$axios.$get('/music/playlist/detail?id=5069871738')
    // const res = await this.$axios.$get('/music/playlist/detail?id=4943654842')
    const res = await this.$axios.$get('/music/playlist/detail?id=4912972256')
    // console.log(res);
    var ids = []
    for (let i = 0; i < res.playlist.trackIds.length; i++) {
      ids.push(res.playlist.trackIds[i].id)
    }
    ids = ids.toString()
    //获取每首歌详情
    // const song = await this.$axios.$get(`/music/song/detail?ids=${ids}`)
    // console.log(song[0]);
    commit('SET_IDS_LIST', ids)
    // if (state.playMode === playMode.random) {
    //   let newList = shuffle(list)
    //   commit(types.SET_PLAY_LIST, newList)
    //   index = findIndex(newList, list[index])
    // } else {
    //   commit(types.SET_PLAY_LIST, list)
    // }

    // // commit(types.SET_FULL_SCREEN, true)
    // commit(types.SET_PLAY_STATE, true)
    // commit(types.SET_CURRENT_INDEX, index)
    // commit(types.SET_SEQUENCE_LIST, list)

  },
  async setSongList({ commit }, data) {
    let { songs } = data
    // console.log('songs: ', songs);
    commit('SET_PLAY_LIST', songs)
  },
  async startSong({ commit }, data) {
    // console.log(data);
    let { id } = data
    const res = await this.$axios.$get(`/music/song/url?id=${id}`)
    // console.log('res: ', res);
    // commit('SET_CURRENT_INDEX', index)
    commit('SET_CURRENT_SONG', res)

  },
  async changeIndex({ commit }, data) {
    // console.log(data);
    let { index } = data

    commit('SET_CURRENT_INDEX', index)
  }

}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}