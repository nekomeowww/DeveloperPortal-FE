import Vue from 'vue'
import Vuex from 'vuex'

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
    }
  }
})
