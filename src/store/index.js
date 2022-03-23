import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    listCurrentItems: [],
    movingData: []
  },
  mutations: {
    SET_CURRENT_ITEMS: function (state, value) {
      state.listCurrentItems.push(value)
    },
    SET_MOVING_DATA: function (state, value) {
      state.movingData.push(value);
    }
  },
  actions: {
  },
  modules: {
  }
})
