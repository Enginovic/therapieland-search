<template>
  <div class="search-history">
    <div
      class="search-input"
      v-for="(item, index) in searchHistory"
      :key="`item-${index}`"
    >
      {{ item.input }}
      {{ item.date }}
      <div class="remove-history" @click="removeHistory(item)">Remove</div>
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
  background-color: white;
  padding: 10px;
  margin-top: 50px;
  border-radius: 3px;
}
</style>