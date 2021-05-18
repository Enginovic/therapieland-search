<template>
  <div class="search-history" v-if="searchHistory.length">
    <h5>History</h5>
    <div
      class="search-item"
      v-for="(item, index) in searchHistory"
      :key="`item-${index}`"
    >
      <div class="item-input">{{ item.input }}</div>
      <div class="item-date">{{ item.date }}</div>
      <div class="remove-history" @click="removeHistory(item)">x</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { HistoryItem } from "@/store";

export default Vue.extend({
  methods: {
    /**
     * Remove history item in store
     */
    removeHistory(item: HistoryItem) {
      this.$store.commit("removeSearchHistory", item.input);
    },
  },
  computed: {
    /**
     * Get the history in store
     */
    searchHistory() {
      return this.$store.state.searchHistory;
    },
  },
});
</script>

<style lang="scss">
.search-history {
  width: 100%;
  text-align: end;
  background-color: white;
  border-radius: 3px;
}

.search-item {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-top: 20px;
  padding-right: 14px;
}

.item-date {
  font-size: 9px;
  font-style: italic;
  color: #b2b2b2;
}

.remove-history {
  position: absolute;
  cursor: pointer;
  top: 2px;
  right: 0;
  font-size: 10px;
  color: red;
}
</style>
