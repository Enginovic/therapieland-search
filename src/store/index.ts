import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchHistory: [],
  },
  mutations: {
    addSearchHistory: (state, payload) => {
      (state.searchHistory as HistoryItem[]).push(payload);
    },
    removeSearchHistory: (state, payload) => {
      state.searchHistory = state.searchHistory.filter(
        (item: HistoryItem) => item.input !== payload
      );
    },
  },
  actions: {},
  modules: {},
});

export interface HistoryItem {
  input: string;
  date: Date;
}
