import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
// default router permission control
// import permission from './modules/permission'
// dynamic router permission control (Experimental)
import permission from './modules/async-router'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    permission
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters
})
