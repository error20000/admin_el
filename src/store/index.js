import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    test: ""
  },
  mutations: {
    setTest(state, val){
      state.test = val;
    }
  },
  actions: {
  },
  modules
})
