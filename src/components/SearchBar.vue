<template>
  <div class="wrapper">
    <div class="search-bar">
      <h1>Search for a posts</h1>
      <input
        @input="searchPost"
        placeholder="Search post by title"
        class="search-field"
      />
    </div>
    <div style="display: flex">
      <span v-if="isSearching">Searching...</span>
      <SearchResults v-if="posts.length && !isSearching" :posts="posts" />
      <h3 style="width: 100%" v-if="!posts.length && !isSearching">
        No posts found
      </h3>
      <SearchHistory />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import _ from "lodash"; // type is added though..

import SearchResults from "@/components/SearchResults.vue";
import SearchHistory from "@/components/SearchHistory.vue";

export default Vue.extend({
  components: {
    SearchResults,
    SearchHistory,
  },
  data() {
    return {
      isSearching: false,
      posts: [],
      debounce: 0,
    };
  },
  methods: {
    /**
     * Search for the post
     */
    searchPost(event: any) {
      const searchInput = event.target.value;
      if (!searchInput) {
        this.posts = [];
        return;
      }

      const date = this.formatDate;
      this.isSearching = true;
      clearTimeout(this.debounce);

      // debounce for 1 second to reduce the amount of api calls.
      this.debounce = setTimeout(() => {
        this.$store.commit("addSearchHistory", {
          input: searchInput,
          date,
        });

        // search for the post title that match the input value
        axios
          .get("https://jsonplaceholder.typicode.com/posts")
          .then((response) => {
            this.posts = response.data.filter((post: Post) => {
              return post.title.includes(searchInput);
            });
            this.isSearching = false;
          })
          .catch((error) => {
            console.log(error);
          });
      }, 1000);
    },
  },
  computed: {
    /**
     * Format the date when a new search is done
     */
    formatDate() {
      return new Date(_.now()).toTimeString().substr(0, 8);
    },
  },
});

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 800px;
  margin: 0 auto;
  padding: 100px 0;
}

.search-bar {
  margin-bottom: 35px;
}

.search-field {
  width: 100%;
  border: 0;
  border-bottom: 1px solid;
  padding: 10px 0;
  &:focus-visible {
    outline: none;
  }
}
</style>
