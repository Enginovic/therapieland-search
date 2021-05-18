<template>
  <div class="wrapper">
    <div class="search-bar">
      <input
        @input="searchPost"
        placeholder="Search post title"
        class="search-field"
      />
      <span v-if="typing">You are typing</span>
    </div>
    <SearchResults :posts="posts" />
    <SearchHistory />
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
      typing: "",
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
      this.typing = "Searching post";
      clearTimeout(this.debounce);

      // debounce for 1 second to reduce the amount of api calls.
      this.debounce = setTimeout(() => {
        this.typing = "";
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
  width: 100%;
}

.search-field {
  width: 100%;
  &:focus-visible {
    outline: none;
  }
}
</style>
