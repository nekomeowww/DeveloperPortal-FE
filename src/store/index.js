import Vue from 'vue'
import Vuex from 'vuex'

import { getUserProfile } from '@/api/user.js'
import { getAvatarUrl } from '../api/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {

  },
  state: {
    isLoggedIn: false,
    userInfo: '',
    userAvatar: ''
  },
  mutations: {
    setLoggedIn (state, login) {
      state.isLoggedIn = login
    },
    setUserInfo (state, info) {
      state.userInfo = info
    },
    setUserAvatar (state, avatar) {
      state.userAvatar = avatar
    }
  },
  actions: {
    setLoggedIn ({ commit }, login) {
      commit('setLoggedIn', login)
    },
    async setUserInfo ({ commit }, info) {
      const user = await getUserProfile(info.id)
      const avatar = await getAvatarUrl(user.data.data.avatar)
      commit('setUserInfo', user)
      commit('setUserAvatar', avatar)
    }
  }
})
