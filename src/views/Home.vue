<template>
  <SearchBar />
</template>

<script lang="ts">
import Vue from "vue";
import SearchBar from "@/components/SearchBar.vue";

export default Vue.extend({
  components: {
    SearchBar,
  },
});
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
