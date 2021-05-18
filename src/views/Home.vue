<template>
  <div id="home">
    <div class="wrapper">
      <SearchBar />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import SearchBar from "@/components/SearchBar.vue";

export default Vue.extend({
  name: "Home",
  components: {
    SearchBar,
  },
});
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

#home {
  background-color: #d8f1ff;
  padding: 100px 0;
}

.wrapper {
  width: 800px;
  height: 100vh;
  margin: 0 auto;
}
</style>
