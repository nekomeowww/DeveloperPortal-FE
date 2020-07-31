import Vue from 'vue'
import Vuex from 'vuex'

import { setCookie, disassemble } from '../util/cookie'
import { getUserProfile } from '@/api/user.js'
import { loginWithEmail, getAvatarUrl } from '../api/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {

  },
  state: {
    isLoggedIn: false,
    userId: '',
    userInfo: '',
    userProfile: '',
    userAvatar: '',
    accessToken: ''
  },
  mutations: {
    setLoggedIn (state, login) {
      state.isLoggedIn = login
    },
    setUserId (state, id) {
      state.userId = id
    },
    setUserInfo (state, info) {
      state.userInfo = info
    },
    setUserProfile (state, userprofile) {
      state.userProfile = userprofile
    },
    setUserAvatar (state, avatar) {
      state.userAvatar = avatar
    },
    setToken (state, token) {
      state.accessToken = token
    }
  },
  actions: {
    async login ({ commit }, login) {
      const res = await loginWithEmail(login.email, login.pass)
      const accessToken = res.data.data
      if (res.data.message === '密码错误') {
        return false
      } else {
        setCookie('ACCESS-TOKEN', accessToken)
        const user = disassemble(accessToken)
        commit('setToken', accessToken)
        /**
         * user.iss: "username"
         * user.exp: 1594276659373
         * user.platform "email"
         * user.id 0
         */
        const res2 = await getUserProfile(user.id)
        const avatar = await getAvatarUrl(res2.data.data.avatar)
        commit('setUserAvatar', avatar)
        // Axios.get(process.env.VUE_APP_CMUAPI + '/user/login?id=' + user.id + '&email=' + data.email + '&nickname=' + res2.data.nickname + '&avatar=' + res2.data.avatar)
        res2.data.id = user.id
        commit('setUserProfile', res2.data.data)
        commit('setLoggedIn', true)
        commit('setUserId', user.id)
        return true
      }
    },
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
