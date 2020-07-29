import Vue from 'vue'
import Vuex from 'vuex'

import API from '@/api/api.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {

  },
  state: {
    isLoggedIn: false
  },
  mutations: {
    setLoggedIn (state, login) {
      this.state.isLoggedIn = login
    }
  },
  actions: {
    setLoggedIn ({ commit }, login) {
      commit('setLoggedIn', login)
    },
    async refreshUser ({ commit, rootGetters }, { id }) {
      const { isMe } = rootGetters
      const { data } = await (isMe(id) ? API.getMyUserData() : API.getUser(id))
      // console.log('数据：', isMe(id), data)
      commit('setUserInfo', data)
    }
  }
})
