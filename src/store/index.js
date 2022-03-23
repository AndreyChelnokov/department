import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    moving: [],
    moving_data: []
  },
  mutations: {
    SET_MOVING: function (state, value) {
      state.moving.push({startCardName: value})
    },
    SET_MOVING_DATA: function (state, value) {
      state.moving_data.push(value);
    }
  },
  actions: {
  },
  modules: {
  }
})
