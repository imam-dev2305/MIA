import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bearer: localStorage.getItem('bearer'),
  },
  mutations: {
    USER_LOGIN (state) {
      if (localStorage.getItem('bearer')) {
        this.replaceState(Object.assign(state, {bearer: localStorage.getItem('bearer')}));
      }
    },
    USER_LOGOUT (state) {
      this.replaceState(Object.assign(state, {bearer: ''}))
      localStorage.removeItem('bearer')
    }
  },
  actions: {
    USER_LOGIN ({commit}) {
      commit('USER_LOGIN')
    },
    USER_LOGOUT ({commit}) {
      commit('USER_LOGOUT')
    }
  }
})
