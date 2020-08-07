import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

import { setCookie, disassemble, clearAllCookie, removeCookie } from '../util/cookie'
import { getUserProfile } from '@/api/user.js'
import { loginWithEmail, getAvatarUrl } from '../api/user'

import appIcon from '@/assets/img/app.png'
import docIcon from '@/assets/img/doc.png'
import env from '../../env.json'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {

  },
  state: {
    isLoggedIn: false,
    userId: 0,
    userInfo: '',
    userProfile: '',
    userAvatar: '',
    accessToken: '',
    currentAppId: 0,
    currentAppIcon: '',
    thirdPartyUserId: 0,
    thirdPartyUserProfile: '',
    thirdPartyUserAvatar: '',
    menuItems: [
      {
        title: '应用 Application',
        icon: appIcon,
        path: '/apps'
      },
      {
        title: '开发文档 Documentation',
        icon: docIcon,
        path: '/doc'
      },
      {
        title: '起步',
        elicon: 'el-icon-success',
        path: '/doc/getstarted'
      }
    ]
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
    },
    setCurrentAppId (state, id) {
      state.currentAppId = id
    },
    setCurrentAppIcon (state, icon) {
      state.currentAppIcon = icon
    },
    setThirdPartyUserId (state, id) {
      state.thirdPartyUserId = id
    },
    setThirdPartyUserProfile (state, userprofile) {
      state.thirdPartyUserProfile = userprofile
    },
    setThirdPartyUserAvatar (state, avatar) {
      state.thirdPartyUserAvatar = avatar
    },
    setMenuItems (state, menuItems) {
      state.menuItems = menuItems
    }
  },
  getters: {
    getMenuItems (state, menuItems) {
      return state.menuItems
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
        Axios.get(env.DEVELOPERAPI + '/login?id=' + user.id + '&email=' + user.iss + '&nickname=' + res2.data.data.nickname + '&avatar=' + res2.data.data.avatar)
        commit('setUserProfile', res2.data.data)
        commit('setLoggedIn', true)
        commit('setUserId', user.id)
        return true
      }
    },
    async logout ({ commit }) {
      removeCookie('ACCESS-TOKEN')
      clearAllCookie()
      commit('setLoggedIn', false)
      return true
    },
    async setLoggedIn ({ commit }, login) {
      commit('setLoggedIn', login.status)
      let res2 = await getUserProfile(login.id)
      const avatar = await getAvatarUrl(res2.data.data.avatar)
      commit('setUserId', login.id)
      commit('setUserProfile', res2.data.data)
      commit('setUserAvatar', avatar)
    },
    async setUserInfo ({ commit }, info) {
      const user = await getUserProfile(info.id)
      const avatar = await getAvatarUrl(user.data.data.avatar)
      commit('setUserInfo', user.data.data)
      commit('setUserProfile', user.data.data)
      commit('setUserAvatar', avatar)
    },
    async setCurrentAppId ({ commit }, id) {
      commit('setCurrentAppId', id)
    },
    async setCurrentAppIcon ({ commit }, icon) {
      commit('setCurrentAppIcon', icon)
    },
    async setThirdPartyUserId ({ commit }, id) {
      commit('setThirdPartyUserId', id)
    },
    async setThirdPartyUserProfile ({ commit }, info) {
      const user = await getUserProfile(info.id)
      const avatar = await getAvatarUrl(user.data.data.avatar)
      commit('setThirdPartyUserProfile', user.data.data)
      commit('setThirdPartyUserAvatar', avatar)
    },
    setMenuItems ({ commit }, menuItems) {
      commit('setMenuItems', menuItems)
    }
  }
})
