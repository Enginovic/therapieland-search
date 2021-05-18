import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchHistory: [],
  },
  mutations: {
    addSearchHistory: (state, payload) => {
      (state.searchHistory as string[]).push(payload);
    },
    removeSearchHistory: (state, payload) => {
      state.searchHistory = state.searchHistory.filter(
        (item) => item !== payload
      );
    },
  },
  actions: {},
  modules: {},
});
